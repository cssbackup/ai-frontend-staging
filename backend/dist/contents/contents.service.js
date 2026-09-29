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
exports.ContentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContentsService = class ContentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBundle() {
        const [templates, shared, categoryContents, categoryMeta, layouts] = await Promise.all([
            this.prisma.template.findMany({
                where: { status: 'Active' },
                orderBy: [{ order: 'asc' }, { numericId: 'asc' }],
            }),
            this.prisma.sharedContent.findUnique({ where: { key: 'common' } }),
            this.prisma.categoryContent.findMany({
                orderBy: { categoryName: 'asc' },
            }),
            this.prisma.category.findMany({
                where: { status: 'Active' },
                orderBy: { order: 'asc' },
            }),
            this.prisma.layout.findMany({
                where: { status: 'Active' },
                orderBy: [
                    { sectionType: 'asc' },
                    { order: 'asc' },
                    { sectionNumber: 'asc' },
                ],
            }),
        ]);
        const metaByName = new Map(categoryMeta.map((c) => [c.name.toLowerCase(), c]));
        const metaBySlug = new Map(categoryMeta.map((c) => [c.slug, c]));
        const categoriesMap = {};
        for (const row of categoryContents) {
            if (row.status && row.status !== 'Active')
                continue;
            const meta = metaBySlug.get(row.categorySlug) ||
                metaByName.get(row.categoryName.toLowerCase());
            if (meta && meta.status !== 'Active')
                continue;
            categoriesMap[row.categoryName] = {
                templates: row.templateKeys,
                sections: row.sections,
                description: meta?.description ?? null,
                icon: meta?.icon ?? null,
                slug: row.categorySlug,
                status: meta?.status ?? row.status,
            };
        }
        return {
            templates: templates.map((t) => ({
                id: t.key,
                numericId: t.numericId,
                title: t.title,
                type: t.type,
                image: t.image,
                previewimage: t.previewImage,
                preview_description: t.previewDescription,
                prebuilt_pages: t.prebuiltPages,
                pages: t.pages,
                homeSectionOrder: t.homeSectionOrder,
                sectionVariants: t.sectionVariants,
                variables: t.variables,
                status: t.status,
            })),
            common: shared?.sections ?? {},
            categories: categoriesMap,
            layouts: layouts.map((layout) => ({
                id: layout.id,
                key: layout.key,
                name: layout.name,
                sectionType: layout.sectionType,
                sectionNumber: layout.sectionNumber,
                categorySlug: layout.categorySlug,
                scope: layout.scope,
                order: layout.order,
                status: layout.status,
                thumbnailUrl: layout.thumbnailUrl,
                description: layout.description,
            })),
        };
    }
    getShared() {
        return this.prisma.sharedContent.findUnique({ where: { key: 'common' } });
    }
    async upsertShared(sections) {
        return this.prisma.sharedContent.upsert({
            where: { key: 'common' },
            create: { key: 'common', sections },
            update: { sections },
        });
    }
    findAllCategoryContents() {
        return this.prisma.categoryContent.findMany({
            orderBy: { categoryName: 'asc' },
        });
    }
    async findCategoryContent(slug) {
        const row = await this.prisma.categoryContent.findUnique({
            where: { categorySlug: slug },
        });
        if (!row)
            throw new common_1.NotFoundException('Category content not found');
        return row;
    }
    async createCategoryContent(data) {
        const categorySlug = data.categorySlug.trim().toLowerCase();
        const existing = await this.prisma.categoryContent.findUnique({
            where: { categorySlug },
        });
        if (existing) {
            throw new common_1.ConflictException('Category content already exists');
        }
        return this.prisma.categoryContent.create({
            data: {
                categorySlug,
                categoryName: data.categoryName.trim(),
                templateKeys: data.templateKeys,
                sections: data.sections,
                status: data.status || 'Active',
            },
        });
    }
    async updateCategoryContent(id, data) {
        const current = await this.prisma.categoryContent.findUnique({
            where: { id },
        });
        if (!current)
            throw new common_1.NotFoundException('Category content not found');
        if (data.categorySlug && data.categorySlug !== current.categorySlug) {
            const taken = await this.prisma.categoryContent.findUnique({
                where: { categorySlug: data.categorySlug },
            });
            if (taken)
                throw new common_1.ConflictException('Category slug already exists');
        }
        return this.prisma.categoryContent.update({
            where: { id },
            data: {
                categorySlug: data.categorySlug?.trim().toLowerCase(),
                categoryName: data.categoryName?.trim(),
                templateKeys: data.templateKeys,
                sections: data.sections,
                status: data.status,
            },
        });
    }
    async removeCategoryContent(id) {
        const current = await this.prisma.categoryContent.findUnique({
            where: { id },
        });
        if (!current)
            throw new common_1.NotFoundException('Category content not found');
        await this.prisma.categoryContent.delete({ where: { id } });
        return { message: 'Category content deleted' };
    }
};
exports.ContentsService = ContentsService;
exports.ContentsService = ContentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentsService);
//# sourceMappingURL=contents.service.js.map