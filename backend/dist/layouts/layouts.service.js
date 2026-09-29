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
exports.LayoutsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const VARIANT_KEY_RE = /^[A-Za-z][A-Za-z0-9]*-\d+$/;
function isVariantKeyedMap(pack) {
    if (!pack || typeof pack !== 'object' || Array.isArray(pack))
        return false;
    return Object.keys(pack).some((k) => VARIANT_KEY_RE.test(k));
}
function cloneJson(value) {
    return structuredClone(value);
}
function extractTemplate(pack, sectionType) {
    if (!pack || typeof pack !== 'object' || Array.isArray(pack))
        return {};
    const obj = pack;
    if (isVariantKeyedMap(obj)) {
        const preferredKey = `${sectionType}-1`;
        const preferred = obj[preferredKey];
        if (preferred && typeof preferred === 'object' && !Array.isArray(preferred)) {
            return cloneJson(preferred);
        }
        for (const [key, value] of Object.entries(obj)) {
            if (VARIANT_KEY_RE.test(key) &&
                value &&
                typeof value === 'object' &&
                !Array.isArray(value)) {
                return cloneJson(value);
            }
        }
        return {};
    }
    return cloneJson(obj);
}
function writeVariantBag(existing, sectionType, variantKey, content) {
    const pack = existing && typeof existing === 'object' && !Array.isArray(existing)
        ? existing
        : {};
    if (isVariantKeyedMap(pack)) {
        return { ...pack, [variantKey]: content };
    }
    if (Object.keys(pack).length) {
        const baseKey = `${sectionType}-1`;
        return {
            [baseKey]: cloneJson(pack),
            [variantKey]: content,
        };
    }
    return { [variantKey]: content };
}
let LayoutsService = class LayoutsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(sectionType) {
        return this.prisma.layout.findMany({
            where: sectionType ? { sectionType } : undefined,
            orderBy: [
                { sectionType: 'asc' },
                { order: 'asc' },
                { sectionNumber: 'asc' },
            ],
        });
    }
    async create(data) {
        const key = data.key.trim();
        const sectionType = data.sectionType.trim();
        const existing = await this.prisma.layout.findUnique({ where: { key } });
        if (existing) {
            throw new common_1.ConflictException('Layout key already exists');
        }
        const categorySlug = data.categorySlug?.trim() || null;
        if (categorySlug) {
            const category = await this.prisma.category.findUnique({
                where: { slug: categorySlug },
            });
            if (!category)
                throw new common_1.NotFoundException('Category not found');
            const categoryContent = await this.prisma.categoryContent.findUnique({
                where: { categorySlug },
                select: { id: true },
            });
            if (!categoryContent) {
                throw new common_1.NotFoundException('Category content not found');
            }
        }
        const shared = await this.prisma.sharedContent.findUnique({
            where: { key: 'common' },
        });
        const sharedSections = shared?.sections && typeof shared.sections === 'object'
            ? shared.sections
            : {};
        const provided = data.defaultContent &&
            typeof data.defaultContent === 'object' &&
            !Array.isArray(data.defaultContent)
            ? data.defaultContent
            : null;
        const defaultContent = provided && Object.keys(provided).length
            ? provided
            : extractTemplate(sharedSections[sectionType], sectionType);
        const row = await this.prisma.layout.create({
            data: {
                key,
                name: data.name.trim(),
                sectionType,
                sectionNumber: data.sectionNumber ?? 1,
                categorySlug,
                scope: data.scope || 'home',
                order: data.order ?? 1,
                status: data.status || 'Active',
                thumbnailUrl: data.thumbnailUrl?.trim() || null,
                description: data.description?.trim() || null,
                defaultContent: defaultContent,
            },
        });
        await this.syncContentBags(row.key, row.sectionType, defaultContent, row.categorySlug);
        return row;
    }
    async update(id, data) {
        const current = await this.prisma.layout.findUnique({ where: { id } });
        if (!current)
            throw new common_1.NotFoundException('Layout not found');
        if (data.key && data.key !== current.key) {
            const taken = await this.prisma.layout.findUnique({
                where: { key: data.key },
            });
            if (taken)
                throw new common_1.ConflictException('Layout key already exists');
        }
        const categorySlug = data.categorySlug === undefined
            ? undefined
            : data.categorySlug?.trim() || null;
        if (categorySlug) {
            const category = await this.prisma.category.findUnique({
                where: { slug: categorySlug },
            });
            if (!category)
                throw new common_1.NotFoundException('Category not found');
            const categoryContent = await this.prisma.categoryContent.findUnique({
                where: { categorySlug },
                select: { id: true },
            });
            if (!categoryContent) {
                throw new common_1.NotFoundException('Category content not found');
            }
        }
        const row = await this.prisma.layout.update({
            where: { id },
            data: {
                key: data.key?.trim(),
                name: data.name?.trim(),
                sectionType: data.sectionType?.trim(),
                sectionNumber: data.sectionNumber,
                categorySlug,
                scope: data.scope,
                order: data.order,
                status: data.status,
                thumbnailUrl: data.thumbnailUrl === undefined
                    ? undefined
                    : data.thumbnailUrl?.trim() || null,
                description: data.description === undefined
                    ? undefined
                    : data.description?.trim() || null,
                defaultContent: data.defaultContent === undefined
                    ? undefined
                    : data.defaultContent,
            },
        });
        const content = row.defaultContent &&
            typeof row.defaultContent === 'object' &&
            !Array.isArray(row.defaultContent)
            ? row.defaultContent
            : {};
        if (Object.keys(content).length) {
            await this.syncContentBags(row.key, row.sectionType, content, row.categorySlug);
        }
        return row;
    }
    async syncContentBags(variantKey, sectionType, content, categorySlug) {
        if (categorySlug) {
            const categoryContent = await this.prisma.categoryContent.findUnique({
                where: { categorySlug },
            });
            if (!categoryContent) {
                throw new common_1.NotFoundException('Category content not found');
            }
            const sections = categoryContent.sections &&
                typeof categoryContent.sections === 'object'
                ? categoryContent.sections
                : {};
            await this.prisma.categoryContent.update({
                where: { id: categoryContent.id },
                data: {
                    sections: {
                        ...sections,
                        [sectionType]: writeVariantBag(sections[sectionType], sectionType, variantKey, content),
                    },
                },
            });
            return;
        }
        const shared = await this.prisma.sharedContent.findUnique({
            where: { key: 'common' },
        });
        const sharedSections = shared?.sections && typeof shared.sections === 'object'
            ? shared.sections
            : {};
        const nextSharedSections = {
            ...sharedSections,
            [sectionType]: writeVariantBag(sharedSections[sectionType], sectionType, variantKey, content),
        };
        await this.prisma.sharedContent.upsert({
            where: { key: 'common' },
            create: {
                key: 'common',
                sections: nextSharedSections,
            },
            update: {
                sections: nextSharedSections,
            },
        });
        const categories = await this.prisma.categoryContent.findMany();
        for (const cat of categories) {
            const sections = cat.sections && typeof cat.sections === 'object'
                ? cat.sections
                : {};
            const nextSections = {
                ...sections,
                [sectionType]: writeVariantBag(sections[sectionType], sectionType, variantKey, content),
            };
            await this.prisma.categoryContent.update({
                where: { id: cat.id },
                data: { sections: nextSections },
            });
        }
    }
    async remove(id) {
        const current = await this.prisma.layout.findUnique({ where: { id } });
        if (!current)
            throw new common_1.NotFoundException('Layout not found');
        await this.prisma.layout.delete({ where: { id } });
        return { message: 'Layout Deleted' };
    }
};
exports.LayoutsService = LayoutsService;
exports.LayoutsService = LayoutsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LayoutsService);
//# sourceMappingURL=layouts.service.js.map