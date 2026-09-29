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
exports.CreateAiDesignsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let CreateAiDesignsService = class CreateAiDesignsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async upsertMine(ownerId, body) {
        const designKey = body.designKey?.trim();
        if (!designKey || !/^ca_/i.test(designKey)) {
            throw new common_1.BadRequestException('Valid create-ai designKey (ca_…) is required');
        }
        const existing = await this.prisma.createAiDesign.findUnique({
            where: { designKey },
            select: { id: true, ownerId: true },
        });
        if (existing && existing.ownerId !== ownerId) {
            throw new common_1.ForbiddenException('This Create-AI design belongs to another user');
        }
        const pageCount = typeof body.pageCount === 'number' && Number.isFinite(body.pageCount)
            ? Math.min(50, Math.max(1, Math.floor(body.pageCount)))
            : 1;
        const statusRaw = body.status?.trim().toLowerCase();
        const status = statusRaw === 'exported' || statusRaw === 'published'
            ? statusRaw
            : 'draft';
        const labels = Array.isArray(body.pageLabels)
            ? body.pageLabels
                .filter((item) => typeof item === 'string')
                .map((item) => item.trim())
                .filter(Boolean)
                .slice(0, 50)
            : [];
        const data = {
            title: body.title?.trim() || body.brandName?.trim() || null,
            brandName: body.brandName?.trim() || null,
            category: body.category?.trim() || null,
            pageType: body.pageType?.trim() || null,
            pageCount,
            pageLabels: labels,
            status,
            lastSyncedAt: new Date(),
        };
        if (body.payload !== undefined && body.payload !== null) {
            data.payload = body.payload;
        }
        if (body.site !== undefined && body.site !== null) {
            data.site = body.site;
        }
        if (body.chat !== undefined && body.chat !== null) {
            data.chat = body.chat;
        }
        return this.prisma.createAiDesign.upsert({
            where: { designKey },
            create: {
                designKey,
                ownerId,
                title: data.title ?? null,
                brandName: data.brandName ?? null,
                category: data.category ?? null,
                pageType: data.pageType ?? null,
                pageCount,
                pageLabels: labels,
                payload: body.payload !== undefined && body.payload !== null
                    ? body.payload
                    : client_1.Prisma.JsonNull,
                site: body.site !== undefined && body.site !== null
                    ? body.site
                    : client_1.Prisma.JsonNull,
                chat: body.chat !== undefined && body.chat !== null
                    ? body.chat
                    : client_1.Prisma.JsonNull,
                status,
                lastSyncedAt: new Date(),
            },
            update: data,
            select: {
                id: true,
                designKey: true,
                title: true,
                brandName: true,
                category: true,
                pageType: true,
                pageCount: true,
                status: true,
                lastSyncedAt: true,
                updatedAt: true,
            },
        });
    }
    async listMine(ownerId) {
        return this.prisma.createAiDesign.findMany({
            where: { ownerId },
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                designKey: true,
                title: true,
                brandName: true,
                category: true,
                pageType: true,
                pageCount: true,
                pageLabels: true,
                status: true,
                lastSyncedAt: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async getMine(ownerId, designKeyRaw) {
        const designKey = designKeyRaw?.trim();
        if (!designKey || !/^ca_/i.test(designKey)) {
            throw new common_1.BadRequestException('Valid create-ai designKey (ca_…) is required');
        }
        const row = await this.prisma.createAiDesign.findFirst({
            where: { designKey, ownerId },
            select: {
                id: true,
                designKey: true,
                title: true,
                brandName: true,
                category: true,
                pageType: true,
                pageCount: true,
                pageLabels: true,
                payload: true,
                site: true,
                chat: true,
                status: true,
                lastSyncedAt: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!row) {
            throw new common_1.NotFoundException('Create-AI design not found');
        }
        return row;
    }
    async removeMine(ownerId, designKeyRaw) {
        const designKey = designKeyRaw?.trim();
        if (!designKey) {
            throw new common_1.BadRequestException('designKey is required');
        }
        const existing = await this.prisma.createAiDesign.findFirst({
            where: { designKey, ownerId },
            select: { id: true },
        });
        if (!existing) {
            throw new common_1.ForbiddenException('Create-AI design not found');
        }
        await this.prisma.createAiDesign.delete({ where: { id: existing.id } });
        return { ok: true, designKey };
    }
};
exports.CreateAiDesignsService = CreateAiDesignsService;
exports.CreateAiDesignsService = CreateAiDesignsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CreateAiDesignsService);
//# sourceMappingURL=create-ai-designs.service.js.map