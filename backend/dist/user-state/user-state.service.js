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
exports.UserStateService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
function asArray(value) {
    return Array.isArray(value) ? value : [];
}
function asRecord(value) {
    return value && typeof value === 'object' && !Array.isArray(value)
        ? value
        : {};
}
function asStringArray(value) {
    if (!Array.isArray(value))
        return [];
    return value.filter((item) => typeof item === 'string' && item.trim().length > 0);
}
let UserStateService = class UserStateService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getState(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                siteSubscriptions: true,
                purchasedAddons: true,
                purchasedDomains: true,
                domainConnections: true,
            },
        });
        return {
            siteSubscriptions: asRecord(user?.siteSubscriptions),
            purchasedAddons: asArray(user?.purchasedAddons),
            purchasedDomains: asArray(user?.purchasedDomains),
            domainConnections: asArray(user?.domainConnections),
        };
    }
    async saveState(userId, input) {
        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...(input.siteSubscriptions !== undefined
                    ? {
                        siteSubscriptions: asRecord(input.siteSubscriptions),
                    }
                    : {}),
                ...(input.purchasedAddons !== undefined
                    ? {
                        purchasedAddons: asArray(input.purchasedAddons),
                    }
                    : {}),
                ...(input.purchasedDomains !== undefined
                    ? {
                        purchasedDomains: asArray(input.purchasedDomains),
                    }
                    : {}),
                ...(input.domainConnections !== undefined
                    ? {
                        domainConnections: asArray(input.domainConnections),
                    }
                    : {}),
            },
            select: {
                siteSubscriptions: true,
                purchasedAddons: true,
                purchasedDomains: true,
                domainConnections: true,
            },
        });
        return {
            siteSubscriptions: asRecord(updated.siteSubscriptions),
            purchasedAddons: asArray(updated.purchasedAddons),
            purchasedDomains: asArray(updated.purchasedDomains),
            domainConnections: asArray(updated.domainConnections),
        };
    }
    async getRazorpayMeta(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                razorpayCustomerId: true,
                razorpayTokenIds: true,
            },
        });
        return {
            customerId: user?.razorpayCustomerId || null,
            tokenIds: asStringArray(user?.razorpayTokenIds),
        };
    }
    async setRazorpayCustomerId(userId, customerId) {
        const trimmed = customerId.trim();
        if (!trimmed) {
            return this.getRazorpayMeta(userId);
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: { razorpayCustomerId: trimmed },
        });
        return this.getRazorpayMeta(userId);
    }
    async addRazorpayTokenId(userId, tokenId, customerId) {
        const trimmed = tokenId.trim();
        if (!trimmed) {
            return this.getRazorpayMeta(userId);
        }
        const current = await this.getRazorpayMeta(userId);
        const tokenIds = current.tokenIds.includes(trimmed)
            ? current.tokenIds
            : [...current.tokenIds, trimmed];
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                razorpayTokenIds: tokenIds,
                ...(customerId?.trim()
                    ? { razorpayCustomerId: customerId.trim() }
                    : {}),
            },
        });
        return this.getRazorpayMeta(userId);
    }
    async removeRazorpayTokenId(userId, tokenId) {
        const trimmed = tokenId.trim();
        const current = await this.getRazorpayMeta(userId);
        const tokenIds = current.tokenIds.filter((id) => id !== trimmed);
        await this.prisma.user.update({
            where: { id: userId },
            data: { razorpayTokenIds: tokenIds },
        });
        return this.getRazorpayMeta(userId);
    }
};
exports.UserStateService = UserStateService;
exports.UserStateService = UserStateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserStateService);
//# sourceMappingURL=user-state.service.js.map