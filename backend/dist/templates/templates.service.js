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
exports.TemplatesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let TemplatesService = class TemplatesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.template.findMany({
            orderBy: [{ order: 'asc' }, { numericId: 'asc' }],
        });
    }
    async findByKey(key) {
        const row = await this.prisma.template.findUnique({ where: { key } });
        if (!row)
            throw new common_1.NotFoundException('Template not found');
        return row;
    }
    async create(data) {
        const key = data.key.trim();
        const existing = await this.prisma.template.findUnique({ where: { key } });
        if (existing)
            throw new common_1.ConflictException('Template key already exists');
        const takenId = await this.prisma.template.findUnique({
            where: { numericId: data.numericId },
        });
        if (takenId)
            throw new common_1.ConflictException('numericId already exists');
        return this.prisma.template.create({
            data: {
                key,
                numericId: data.numericId,
                title: data.title.trim(),
                type: data.type.trim(),
                image: data.image?.trim() || null,
                previewImage: data.previewImage?.trim() || null,
                previewDescription: data.previewDescription?.trim() || null,
                prebuiltPages: data.prebuiltPages ?? 0,
                pages: data.pages ?? undefined,
                homeSectionOrder: data.homeSectionOrder ?? undefined,
                sectionVariants: data.sectionVariants,
                variables: data.variables ?? undefined,
                order: data.order ?? data.numericId,
                status: data.status || 'Active',
            },
        });
    }
    async update(id, data) {
        const current = await this.prisma.template.findUnique({ where: { id } });
        if (!current)
            throw new common_1.NotFoundException('Template not found');
        if (data.key && data.key !== current.key) {
            const taken = await this.prisma.template.findUnique({
                where: { key: data.key },
            });
            if (taken)
                throw new common_1.ConflictException('Template key already exists');
        }
        if (data.numericId && data.numericId !== current.numericId) {
            const taken = await this.prisma.template.findUnique({
                where: { numericId: data.numericId },
            });
            if (taken)
                throw new common_1.ConflictException('numericId already exists');
        }
        return this.prisma.template.update({
            where: { id },
            data: {
                key: data.key?.trim(),
                numericId: data.numericId,
                title: data.title?.trim(),
                type: data.type?.trim(),
                image: data.image === undefined ? undefined : data.image?.trim() || null,
                previewImage: data.previewImage === undefined
                    ? undefined
                    : data.previewImage?.trim() || null,
                previewDescription: data.previewDescription === undefined
                    ? undefined
                    : data.previewDescription?.trim() || null,
                prebuiltPages: data.prebuiltPages,
                pages: data.pages === undefined
                    ? undefined
                    : data.pages === null
                        ? client_1.Prisma.DbNull
                        : data.pages,
                homeSectionOrder: data.homeSectionOrder === undefined
                    ? undefined
                    : data.homeSectionOrder === null
                        ? client_1.Prisma.DbNull
                        : data.homeSectionOrder,
                sectionVariants: data.sectionVariants,
                variables: data.variables === undefined
                    ? undefined
                    : data.variables === null
                        ? client_1.Prisma.DbNull
                        : data.variables,
                order: data.order,
                status: data.status,
            },
        });
    }
    async remove(id) {
        const current = await this.prisma.template.findUnique({ where: { id } });
        if (!current)
            throw new common_1.NotFoundException('Template not found');
        await this.prisma.template.delete({ where: { id } });
        return { message: 'Template Deleted' };
    }
};
exports.TemplatesService = TemplatesService;
exports.TemplatesService = TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TemplatesService);
//# sourceMappingURL=templates.service.js.map