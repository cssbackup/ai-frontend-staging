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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.category.findMany({
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        });
    }
    async create(data) {
        const slug = data.slug.trim();
        const existing = await this.prisma.category.findUnique({ where: { slug } });
        if (existing) {
            throw new common_1.ConflictException('Slug already exists');
        }
        return this.prisma.category.create({
            data: {
                order: data.order ?? 1,
                name: data.name.trim(),
                slug,
                icon: data.icon?.trim() || null,
                description: data.description?.trim() || null,
                status: data.status || 'Active',
            },
        });
    }
    async update(id, data) {
        const current = await this.prisma.category.findUnique({ where: { id } });
        if (!current)
            throw new common_1.NotFoundException('Category not found');
        if (data.slug && data.slug !== current.slug) {
            const taken = await this.prisma.category.findUnique({
                where: { slug: data.slug },
            });
            if (taken)
                throw new common_1.ConflictException('Slug already exists');
        }
        return this.prisma.category.update({
            where: { id },
            data: {
                order: data.order,
                name: data.name?.trim(),
                slug: data.slug?.trim(),
                icon: data.icon === undefined ? undefined : data.icon?.trim() || null,
                description: data.description === undefined
                    ? undefined
                    : data.description?.trim() || null,
                status: data.status,
            },
        });
    }
    async remove(id) {
        const current = await this.prisma.category.findUnique({ where: { id } });
        if (!current)
            throw new common_1.NotFoundException('Category not found');
        await this.prisma.category.delete({ where: { id } });
        return { message: 'Category Deleted' };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map