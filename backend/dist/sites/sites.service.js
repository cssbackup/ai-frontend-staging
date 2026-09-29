"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const crypto_1 = require("crypto");
function asRecord(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return null;
    return value;
}
function isRemoveBrandingActive(purchasedAddons, siteId, siteSlug) {
    if (!Array.isArray(purchasedAddons))
        return false;
    const now = Date.now();
    return purchasedAddons.some((item) => {
        if (!item || typeof item !== 'object' || Array.isArray(item))
            return false;
        const rec = item;
        if (rec.addonId !== 'remove-branding')
            return false;
        const addonSiteId = typeof rec.siteId === 'string' ? rec.siteId : '';
        if (addonSiteId !== siteId && addonSiteId !== siteSlug)
            return false;
        if (typeof rec.cancelledAt === 'string' && rec.cancelledAt.trim()) {
            return false;
        }
        const paymentId = typeof rec.paymentId === 'string' ? rec.paymentId : '';
        const orderId = typeof rec.orderId === 'string' ? rec.orderId : '';
        if (paymentId.startsWith('pay_mock_') || orderId.startsWith('order_mock_')) {
            return false;
        }
        if (typeof rec.expiresAt === 'string' && rec.expiresAt) {
            const expires = new Date(rec.expiresAt).getTime();
            if (!Number.isNaN(expires) && expires <= now)
                return false;
        }
        return true;
    });
}
function hasManualSeoValues(value) {
    const record = asRecord(value);
    if (!record)
        return false;
    const fields = [
        'metaTitle',
        'metaDescription',
        'metaKeywords',
        'ogTitle',
        'ogDescription',
        'ogImage',
        'schemaJson',
    ];
    if (fields.some((key) => typeof record[key] === 'string' &&
        String(record[key]).trim().length > 0)) {
        return true;
    }
    const pages = asRecord(record.pages);
    if (!pages)
        return false;
    return Object.values(pages).some((page) => hasManualSeoValues(page));
}
function normalizePageSeoKey(pageLabel) {
    const slug = pageLabel.trim().toLowerCase().replace(/\s+/g, '-');
    if (!slug || slug === 'home')
        return 'home';
    if (slug === 'service')
        return 'services';
    if (slug === 'about-us')
        return 'about';
    if (slug === 'contact-us')
        return 'contact';
    return slug;
}
function resolveManualPageSeo(manual, pageLabel = 'Home') {
    if (!manual)
        return null;
    const key = normalizePageSeoKey(pageLabel);
    const pages = asRecord(manual.pages);
    const pageSpecific = pages ? asRecord(pages[key]) : null;
    if (pageSpecific)
        return { ...manual, ...pageSpecific };
    if (['metaTitle', 'metaDescription', 'metaKeywords', 'ogTitle', 'ogDescription', 'ogImage'].some((field) => typeof manual[field] === 'string' &&
        String(manual[field]).trim().length > 0)) {
        return manual;
    }
    return manual;
}
function collectImageUrls(value, out = []) {
    if (!value)
        return out;
    if (typeof value === 'string') {
        if (/^(https?:\/\/|\/|data:image\/)/i.test(value) &&
            !value.startsWith('data:image/')) {
            out.push(value);
        }
        return out;
    }
    if (Array.isArray(value)) {
        for (const item of value)
            collectImageUrls(item, out);
        return out;
    }
    const record = asRecord(value);
    if (!record)
        return out;
    for (const [key, nested] of Object.entries(record)) {
        if (/image|img|src|logo|thumbnail|photo|background/i.test(key) &&
            typeof nested === 'string' &&
            /^(https?:\/\/|\/)/i.test(nested)) {
            out.push(nested);
        }
        else {
            collectImageUrls(nested, out);
        }
    }
    return out;
}
const PRESERVE_CONTENT_KEYS = [
    'logo',
    'logoImage',
    'logoImageTitle',
    'title',
    'pretitle',
    'desc',
    'subtitle',
    'backgroundImage',
    'backgroundImageTitle',
    'sideImage',
    'sideImageTitle',
];
function asPageLink(value) {
    const record = asRecord(value);
    if (!record)
        return null;
    return record;
}
function flattenPageLinks(links) {
    const out = [];
    for (const item of links) {
        const link = asPageLink(item);
        if (!link)
            continue;
        out.push(link);
        if (Array.isArray(link.children)) {
            out.push(...flattenPageLinks(link.children));
        }
    }
    return out;
}
function countSitePages(pageLinks) {
    const links = flattenPageLinks(pageLinks).filter((link) => {
        if (link.hidden === true)
            return false;
        const kind = typeof link.kind === 'string' ? link.kind : '';
        return kind !== 'blog';
    });
    const hasHome = links.some((link) => {
        const label = typeof link.label === 'string' ? link.label.trim().toLowerCase() : '';
        const href = typeof link.href === 'string' ? link.href.trim() : '';
        return label === 'home' || href === '#' || href === '';
    });
    return Math.max(1, hasHome ? links.length : links.length + 1);
}
function isMultiPageSite(templateId, pageLinks) {
    const id = (templateId || '').toLowerCase();
    const match = id.match(/-(\d+)$/);
    if (match) {
        const n = Number(match[1]);
        if (Number.isFinite(n))
            return n % 2 === 0;
    }
    return flattenPageLinks(pageLinks).some((link) => {
        const href = typeof link.href === 'string' ? link.href.trim().toLowerCase() : '';
        const kind = typeof link.kind === 'string' ? link.kind : '';
        if (kind === 'document' || kind === 'blog' || kind === 'blogIndex')
            return false;
        return href.startsWith('#page-');
    });
}
function preserveSectionContentFromPrevious(previousSections, incomingSections) {
    if (!Array.isArray(previousSections) || !Array.isArray(incomingSections)) {
        return incomingSections;
    }
    const previousMedia = collectImageUrls(previousSections).length;
    const incomingMedia = collectImageUrls(incomingSections).length;
    if (previousMedia < 1 || incomingMedia >= previousMedia) {
        return incomingSections;
    }
    const previousByKey = new Map();
    for (const section of previousSections) {
        const record = asRecord(section);
        if (!record)
            continue;
        const type = typeof record.type === 'string' ? record.type : '';
        const page = typeof record.page === 'string' ? record.page : '';
        if (type)
            previousByKey.set(`${type}::${page}`, record);
    }
    return incomingSections.map((section) => {
        const record = asRecord(section);
        if (!record)
            return section;
        const type = typeof record.type === 'string' ? record.type : '';
        const page = typeof record.page === 'string' ? record.page : '';
        const previous = previousByKey.get(`${type}::${page}`);
        const previousData = asRecord(previous?.data);
        const incomingData = asRecord(record.data);
        if (!previousData || !incomingData)
            return section;
        const nextData = { ...incomingData };
        for (const [variant, variantData] of Object.entries(incomingData)) {
            const incomingVariant = asRecord(variantData);
            const previousVariant = asRecord(previousData[variant]) ||
                asRecord(previousData[typeof previous?.variant === 'string' ? previous.variant : '']);
            if (!incomingVariant || !previousVariant)
                continue;
            const merged = { ...incomingVariant };
            for (const key of PRESERVE_CONTENT_KEYS) {
                const incomingValue = merged[key];
                const previousValue = previousVariant[key];
                const incomingEmpty = incomingValue == null ||
                    incomingValue === '' ||
                    (typeof incomingValue === 'string' && !incomingValue.trim());
                const previousFilled = typeof previousValue === 'string' && previousValue.trim().length > 0;
                if (incomingEmpty && previousFilled) {
                    merged[key] = previousValue;
                }
            }
            nextData[variant] = merged;
        }
        return { ...record, data: nextData };
    });
}
function extractOgImage(sections) {
    const list = Array.isArray(sections) ? sections : [];
    for (const section of list) {
        const record = asRecord(section);
        if (!record)
            continue;
        const type = String(record.type || '');
        if (!/banner|hero|header|about/i.test(type))
            continue;
        const urls = collectImageUrls(record.data);
        if (urls[0])
            return urls[0];
    }
    const all = collectImageUrls(sections);
    return all[0] ?? null;
}
function parseKeywords(value) {
    if (Array.isArray(value)) {
        return value
            .map((item) => (typeof item === 'string' ? item.trim() : ''))
            .filter(Boolean);
    }
    if (typeof value !== 'string' || !value.trim())
        return [];
    return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}
function mergeManualSeo(manual, auto, pageLabel = 'Home') {
    const pageManual = resolveManualPageSeo(manual, pageLabel) || manual;
    const metaTitle = typeof pageManual?.metaTitle === 'string' && pageManual.metaTitle.trim()
        ? pageManual.metaTitle.trim()
        : auto.title;
    const metaDescription = typeof pageManual?.metaDescription === 'string' &&
        pageManual.metaDescription.trim()
        ? pageManual.metaDescription.trim()
        : auto.description;
    const metaKeywords = parseKeywords(pageManual?.metaKeywords);
    const ogTitle = typeof pageManual?.ogTitle === 'string' && pageManual.ogTitle.trim()
        ? pageManual.ogTitle.trim()
        : metaTitle;
    const ogDescription = typeof pageManual?.ogDescription === 'string' &&
        pageManual.ogDescription.trim()
        ? pageManual.ogDescription.trim()
        : metaDescription;
    const ogImage = typeof pageManual?.ogImage === 'string' && pageManual.ogImage.trim()
        ? pageManual.ogImage.trim()
        : auto.ogImage;
    const ogType = typeof pageManual?.ogType === 'string' && pageManual.ogType.trim()
        ? pageManual.ogType.trim()
        : 'website';
    const schemaType = typeof manual?.schemaType === 'string' && manual.schemaType.trim()
        ? manual.schemaType.trim()
        : 'Organization';
    const schemaJson = typeof manual?.schemaJson === 'string' ? manual.schemaJson : '';
    const rawMetaTitle = typeof pageManual?.metaTitle === 'string' ? pageManual.metaTitle : '';
    const rawMetaDescription = typeof pageManual?.metaDescription === 'string'
        ? pageManual.metaDescription
        : '';
    const rawMetaKeywords = typeof pageManual?.metaKeywords === 'string'
        ? pageManual.metaKeywords
        : '';
    return {
        ...(manual || {}),
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords.length ? metaKeywords : auto.keywords,
        ogTitle,
        ogDescription,
        ogImage,
        ogType,
        schemaType,
        schemaJson,
        sitemapEnabled: manual?.sitemapEnabled !== false,
        robotsIndex: manual?.robotsIndex !== false,
        robotsFollow: manual?.robotsFollow !== false,
        metaTitle: rawMetaTitle,
        metaDescription: rawMetaDescription,
        metaKeywords: rawMetaKeywords,
    };
}
function slugify(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
async function uniqueSlug(prisma, baseTitle, excludeId) {
    const base = slugify(baseTitle) || 'website';
    let candidate = base;
    let attempt = 0;
    while (attempt < 20) {
        const existing = await prisma.site.findUnique({
            where: { slug: candidate },
        });
        if (!existing || existing.id === excludeId)
            return candidate;
        attempt += 1;
        candidate = `${base}-${(0, crypto_1.randomBytes)(2).toString('hex')}`;
    }
    return `${base}-${Date.now().toString(36)}`;
}
let SitesService = class SitesService {
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async listMine(ownerId) {
        const sites = await this.prisma.site.findMany({
            where: { ownerId },
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                status: true,
                templateId: true,
                category: true,
                published: true,
                publishedAt: true,
                createdAt: true,
                updatedAt: true,
                config: true,
            },
        });
        return sites.map(({ config, ...site }) => {
            const cfg = (config ?? {});
            const pageLinks = Array.isArray(cfg.pageLinks) ? cfg.pageLinks : [];
            const createPath = typeof cfg.createPath === 'string' ? cfg.createPath.trim().toLowerCase() : '';
            const designId = typeof cfg.designId === 'string' ? cfg.designId.trim() : '';
            const vars = cfg.templateVariables && typeof cfg.templateVariables === 'object'
                ? cfg.templateVariables
                : {};
            const flowMarker = typeof vars['--lestow-create-path'] === 'string'
                ? String(vars['--lestow-create-path']).trim().toLowerCase()
                : '';
            let flow = 'create-custom';
            let flowLabel = 'Create Custom';
            if (createPath === 'redesign' ||
                flowMarker === 'redesign' ||
                /^rd_/i.test(site.id) ||
                /^rd_/i.test(designId)) {
                flow = 'redesign';
                flowLabel = 'Redesign';
            }
            else if (createPath === 'create-ai' ||
                flowMarker === 'create-ai' ||
                /^ca_/i.test(site.id) ||
                /^ca_/i.test(designId)) {
                flow = 'create-ai';
                flowLabel = 'Create with AI';
            }
            else if (createPath === 'create-custom') {
                flow = 'create-custom';
                flowLabel = 'Create Custom';
            }
            return {
                ...site,
                pageCount: countSitePages(pageLinks),
                isMultiPage: isMultiPageSite(site.templateId, pageLinks),
                createPath: createPath || flow,
                designId: designId || null,
                flow,
                flowLabel,
            };
        });
    }
    async findMineById(ownerId, siteId) {
        const site = await this.prisma.site.findUnique({ where: { id: siteId } });
        if (!site || site.ownerId !== ownerId) {
            throw new common_1.NotFoundException('Site not found');
        }
        const config = (site.config ?? {});
        const pageLinks = Array.isArray(config.pageLinks) ? config.pageLinks : [];
        return {
            id: site.id,
            title: site.title,
            slug: site.slug,
            status: site.status,
            templateId: site.templateId,
            category: site.category,
            published: site.published,
            publishedAt: site.publishedAt,
            createdAt: site.createdAt,
            updatedAt: site.updatedAt,
            pageCount: countSitePages(pageLinks),
            isMultiPage: isMultiPageSite(site.templateId, pageLinks),
            config: {
                templateId: config.templateId ?? site.templateId,
                category: config.category ?? site.category,
                clientUpdatedAt: config.clientUpdatedAt,
                pageLinks: config.pageLinks ?? [],
                sections: config.sections ?? [],
                templateVariables: config.templateVariables ?? {},
                businessInfo: config.businessInfo ?? null,
                seo: config.seo ?? null,
                taxonomies: config.taxonomies ?? null,
            },
        };
    }
    async updateSlug(ownerId, siteId, requestedSlug) {
        const site = await this.prisma.site.findUnique({ where: { id: siteId } });
        if (!site || site.ownerId !== ownerId) {
            throw new common_1.NotFoundException('Site not found');
        }
        if (typeof requestedSlug !== 'string' || !requestedSlug.trim()) {
            throw new common_1.BadRequestException('Enter a website URL');
        }
        const slug = slugify(requestedSlug);
        if (slug.length < 3 || slug.length > 60) {
            throw new common_1.BadRequestException('Website URL must be between 3 and 60 characters');
        }
        const existing = await this.prisma.site.findUnique({ where: { slug } });
        if (existing && existing.id !== siteId) {
            throw new common_1.ConflictException('This website URL is already taken');
        }
        try {
            return await this.prisma.site.update({
                where: { id: siteId },
                data: { slug },
                select: {
                    id: true,
                    slug: true,
                    published: true,
                    status: true,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new common_1.ConflictException('This website URL is already taken');
            }
            throw error;
        }
    }
    async updateTitle(ownerId, siteId, requestedTitle) {
        const site = await this.prisma.site.findUnique({ where: { id: siteId } });
        if (!site || site.ownerId !== ownerId) {
            throw new common_1.NotFoundException('Site not found');
        }
        const title = requestedTitle?.trim();
        if (!title) {
            throw new common_1.BadRequestException('Enter a website name');
        }
        if (title.length < 2 || title.length > 80) {
            throw new common_1.BadRequestException('Website name must be between 2 and 80 characters');
        }
        return this.prisma.site.update({
            where: { id: siteId },
            data: { title },
            select: {
                id: true,
                title: true,
                slug: true,
                updatedAt: true,
            },
        });
    }
    async migrateGuestSite(ownerId, body) {
        const templateId = body.templateId?.trim() || 'template-1';
        const category = body.category?.trim() || 'Business';
        const previous = body.siteId
            ? await this.prisma.site.findUnique({ where: { id: body.siteId } })
            : null;
        const previousConfig = (previous?.config ?? {});
        const incomingClientUpdatedAt = Number(body.config?.clientUpdatedAt);
        const previousClientUpdatedAt = Number(previousConfig.clientUpdatedAt);
        const configRecord = asRecord(body.config) || {};
        const seoKeyPresent = Object.prototype.hasOwnProperty.call(configRecord, 'seo');
        const incomingSeo = body.config?.seo;
        let nextSeo = previousConfig.seo ?? null;
        if (seoKeyPresent) {
            if (incomingSeo === undefined ||
                incomingSeo === null ||
                !hasManualSeoValues(incomingSeo)) {
                nextSeo = null;
            }
            else {
                nextSeo = incomingSeo;
            }
        }
        const homeSeo = resolveManualPageSeo(asRecord(nextSeo), 'Home');
        const seoTitle = typeof homeSeo?.metaTitle === 'string' ? homeSeo.metaTitle.trim() : '';
        const businessName = body.config?.businessInfo?.name?.trim() ||
            '';
        const incomingTitle = body.title?.trim() || '';
        const genericTitle = `${category} Website`;
        const isGenericTitle = (value) => value.trim().toLowerCase() === genericTitle.toLowerCase();
        const previousTitle = previous?.title?.trim() || '';
        const title = previous
            ? incomingTitle && !isGenericTitle(incomingTitle)
                ? incomingTitle
                : (!isGenericTitle(previousTitle) ? previousTitle : '') ||
                    seoTitle ||
                    businessName ||
                    previousTitle ||
                    genericTitle
            : incomingTitle || businessName || seoTitle || genericTitle;
        if (previous &&
            Number.isFinite(incomingClientUpdatedAt) &&
            Number.isFinite(previousClientUpdatedAt) &&
            incomingClientUpdatedAt < previousClientUpdatedAt) {
            return previous;
        }
        const taxonomyKeyPresent = Object.prototype.hasOwnProperty.call(configRecord, 'taxonomies');
        const nextTaxonomies = taxonomyKeyPresent
            ? body.config?.taxonomies ?? null
            : (previousConfig.taxonomies ?? null);
        const createPathKeyPresent = Object.prototype.hasOwnProperty.call(configRecord, 'createPath');
        const incomingCreatePath = typeof body.config?.createPath === 'string'
            ? body.config.createPath.trim().toLowerCase()
            : '';
        const validCreatePath = incomingCreatePath === 'redesign' ||
            incomingCreatePath === 'create-ai' ||
            incomingCreatePath === 'create-custom'
            ? incomingCreatePath
            : null;
        const previousCreatePath = typeof previousConfig.createPath === 'string'
            ? previousConfig.createPath.trim().toLowerCase()
            : '';
        let nextCreatePath = createPathKeyPresent
            ? validCreatePath
            : previousCreatePath === 'redesign' ||
                previousCreatePath === 'create-ai' ||
                previousCreatePath === 'create-custom'
                ? previousCreatePath
                : null;
        if (nextCreatePath === 'create-custom' &&
            previousCreatePath === 'redesign') {
            nextCreatePath = 'redesign';
        }
        const designIdKeyPresent = Object.prototype.hasOwnProperty.call(configRecord, 'designId');
        const incomingDesignId = typeof body.config?.designId === 'string'
            ? body.config.designId.trim()
            : '';
        const previousDesignId = typeof previousConfig.designId === 'string'
            ? previousConfig.designId.trim()
            : '';
        const nextDesignId = designIdKeyPresent
            ? incomingDesignId || null
            : previousDesignId || null;
        if (nextDesignId && /^rd_/i.test(nextDesignId)) {
            nextCreatePath = 'redesign';
        }
        const createAiSiteKeyPresent = Object.prototype.hasOwnProperty.call(configRecord, 'createAiSite');
        const nextCreateAiSite = createAiSiteKeyPresent
            ? body.config?.createAiSite ?? null
            : previousConfig.createAiSite ?? null;
        const configPayload = {
            templateId,
            category,
            clientUpdatedAt: Number.isFinite(incomingClientUpdatedAt)
                ? incomingClientUpdatedAt
                : Number.isFinite(previousClientUpdatedAt)
                    ? previousClientUpdatedAt
                    : Date.now(),
            pageLinks: body.config?.pageLinks ?? previousConfig.pageLinks ?? [],
            sections: preserveSectionContentFromPrevious(previousConfig.sections, body.config?.sections ?? previousConfig.sections ?? []),
            templateVariables: body.config?.templateVariables ??
                previousConfig.templateVariables ??
                {},
            businessInfo: body.config?.businessInfo !== undefined
                ? body.config.businessInfo
                : (previousConfig.businessInfo ?? null),
            seo: nextSeo,
            taxonomies: nextTaxonomies,
            ...(nextCreatePath ? { createPath: nextCreatePath } : {}),
            ...(nextDesignId ? { designId: nextDesignId } : {}),
            ...(nextCreateAiSite ? { createAiSite: nextCreateAiSite } : {}),
        };
        if (body.siteId) {
            if (!previous || previous.ownerId !== ownerId) {
                throw new common_1.ForbiddenException('Site not found');
            }
            return this.prisma.site.update({
                where: { id: previous.id },
                data: {
                    title,
                    templateId,
                    category,
                    config: configPayload,
                },
            });
        }
        const slug = await uniqueSlug(this.prisma, title);
        return this.prisma.site.create({
            data: {
                ownerId,
                title,
                slug,
                templateId,
                category,
                status: 'draft',
                config: configPayload,
            },
        });
    }
    async publish(ownerId, siteId) {
        const site = await this.prisma.site.findUnique({ where: { id: siteId } });
        if (!site || site.ownerId !== ownerId) {
            throw new common_1.NotFoundException('Site not found');
        }
        const config = (site.config ?? {});
        const createAiPages = Array.isArray(config.createAiSite?.pages)
            ? config.createAiSite.pages.filter((page) => typeof page?.html === 'string' && page.html.trim().length > 80)
            : [];
        if ((!Array.isArray(config.sections) || !config.sections.length) &&
            !createAiPages.length) {
            throw new common_1.ConflictException('Add at least one section before publishing');
        }
        const publishedAt = new Date();
        return this.prisma.site.update({
            where: { id: siteId },
            data: {
                published: true,
                status: 'published',
                publishedAt,
            },
        });
    }
    async deleteMine(ownerId, siteId) {
        const site = await this.prisma.site.findUnique({ where: { id: siteId } });
        if (!site || site.ownerId !== ownerId) {
            throw new common_1.NotFoundException('Site not found');
        }
        await this.prisma.site.delete({ where: { id: siteId } });
        return { message: 'Site deleted', id: siteId };
    }
    async findPublishedPublic(slug) {
        const site = await this.prisma.site.findFirst({
            where: { slug, published: true, status: 'published' },
            include: { owner: { select: { purchasedAddons: true } } },
        });
        if (!site)
            throw new common_1.NotFoundException('Published site not found');
        const config = (site.config ?? {});
        const businessInfo = asRecord(config.businessInfo);
        const title = site.title ||
            (typeof businessInfo?.name === 'string' ? businessInfo.name : '') ||
            `${site.category} Website`;
        const description = (typeof businessInfo?.description === 'string' &&
            businessInfo.description.trim()) ||
            `Official ${title} website.`;
        const audience = typeof businessInfo?.audience === 'string' ? businessInfo.audience : '';
        const keywords = [
            title,
            site.category,
            audience,
            'website',
        ].filter(Boolean);
        const seo = mergeManualSeo(asRecord(config.seo), {
            title,
            description,
            keywords,
            ogImage: extractOgImage(config.sections),
        });
        return {
            id: site.slug,
            title: seo.title || title,
            slug: site.slug,
            templateId: site.templateId,
            category: site.category,
            pageLinks: config.pageLinks ?? [],
            sections: config.sections ?? [],
            templateVariables: config.templateVariables ?? {},
            businessInfo: config.businessInfo ?? null,
            createPath: config.createPath ?? null,
            designId: config.designId ?? null,
            createAiSite: config.createAiSite ?? null,
            seo,
            publishedAt: site.publishedAt?.toISOString() ?? site.updatedAt.toISOString(),
            updatedAt: site.updatedAt.toISOString(),
            removeBranding: isRemoveBrandingActive(site.owner?.purchasedAddons, site.id, site.slug),
        };
    }
    async listPublishedPublic() {
        const sites = await this.prisma.site.findMany({
            where: { published: true, status: 'published' },
            orderBy: { publishedAt: 'desc' },
            select: {
                slug: true,
                title: true,
                updatedAt: true,
                publishedAt: true,
                config: true,
            },
        });
        return sites
            .filter((site) => {
            const config = (site.config ?? {});
            const seo = asRecord(config.seo);
            return seo?.sitemapEnabled !== false;
        })
            .map(({ slug, title, updatedAt, publishedAt }) => ({
            slug,
            title,
            updatedAt,
            publishedAt,
        }));
    }
    async createPublicLead(slug, body) {
        const site = await this.prisma.site.findFirst({
            where: { slug, published: true, status: 'published' },
        });
        if (!site) {
            throw new common_1.NotFoundException('Published site not found');
        }
        const fields = asRecord(body.fields);
        if (!fields || !Object.keys(fields).length) {
            throw new common_1.BadRequestException('Form data is required');
        }
        const sanitizedFields = Object.fromEntries(Object.entries(fields)
            .filter((entry) => {
            const [key, value] = entry;
            return (typeof key === 'string' &&
                key.trim().length > 0 &&
                typeof value === 'string' &&
                value.trim().length > 0);
        })
            .map(([key, value]) => [key.trim(), value.trim()]));
        if (!Object.keys(sanitizedFields).length) {
            throw new common_1.BadRequestException('Form data is required');
        }
        const rawFormName = body.formName?.trim() || '';
        const formSection = body.formSection?.trim() || 'Form';
        const formName = !rawFormName ||
            rawFormName.length > 40 ||
            /conversation|our team|get in touch|contact us|reach out|let'?s talk|clear conversation/i.test(rawFormName)
            ? /^contact/i.test(formSection)
                ? 'Contact form'
                : /^form/i.test(formSection)
                    ? 'Form'
                    : formSection || 'Contact form'
            : rawFormName;
        const lead = await this.prisma.siteLead.create({
            data: {
                siteId: site.id,
                siteTitle: site.title,
                siteSlug: site.slug,
                formName,
                formSection,
                formPage: body.formPage?.trim() || null,
                fields: sanitizedFields,
            },
            select: {
                id: true,
                createdAt: true,
            },
        });
        if (site.ownerId) {
            const summaryParts = [
                sanitizedFields.name,
                sanitizedFields.fullName,
                sanitizedFields.email,
                sanitizedFields.phone,
                sanitizedFields.message,
            ]
                .filter((value) => typeof value === 'string' && value.trim().length > 0)
                .slice(0, 2);
            const summary = summaryParts.join(' · ') ||
                Object.values(sanitizedFields).slice(0, 2).join(' · ') ||
                'New form submission';
            void this.notifications
                .createUserNotification({
                userId: site.ownerId,
                title: `New lead on ${site.title}`,
                body: summary,
                type: 'website_lead',
                href: '/user/websites-lead',
                meta: {
                    leadId: lead.id,
                    siteId: site.id,
                    siteSlug: site.slug,
                    siteTitle: site.title,
                    formName,
                    formSection,
                    formPage: body.formPage?.trim() || null,
                },
            })
                .catch(() => undefined);
        }
        return lead;
    }
    listLeadsForOwner(ownerId) {
        return this.prisma.siteLead.findMany({
            where: {
                site: {
                    ownerId,
                },
            },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                siteId: true,
                siteTitle: true,
                siteSlug: true,
                formName: true,
                formSection: true,
                formPage: true,
                fields: true,
                createdAt: true,
            },
        });
    }
};
exports.SitesService = SitesService;
exports.SitesService = SitesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], SitesService);
//# sourceMappingURL=sites.service.js.map