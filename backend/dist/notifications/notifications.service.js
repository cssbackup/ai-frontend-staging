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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getTicketIdFromMeta(meta) {
        if (!meta || typeof meta !== 'object' || Array.isArray(meta))
            return null;
        const ticketId = meta.ticketId;
        return typeof ticketId === 'string' && ticketId.trim() ? ticketId : null;
    }
    dedupeByTicket(items) {
        const seen = new Set();
        const result = [];
        for (const item of items) {
            const meta = item.meta && typeof item.meta === 'object' && !Array.isArray(item.meta)
                ? item.meta
                : null;
            const ticketId = typeof meta?.ticketId === 'string' ? meta.ticketId : null;
            if (ticketId) {
                if (seen.has(ticketId))
                    continue;
                seen.add(ticketId);
            }
            result.push(item);
        }
        return result;
    }
    async createAdminNotification(input) {
        const type = input.type?.trim() || 'system';
        const ticketId = this.getTicketIdFromMeta(input.meta);
        if (ticketId &&
            (type === 'billing_support' ||
                type === 'user_reply' ||
                type === 'support_reply')) {
            const recent = await this.prisma.notification.findMany({
                where: {
                    audience: 'admin',
                    type: { in: ['billing_support', 'user_reply', 'support_reply'] },
                },
                orderBy: { createdAt: 'desc' },
                take: 100,
            });
            const existing = recent.find((row) => {
                const meta = row.meta && typeof row.meta === 'object' && !Array.isArray(row.meta)
                    ? row.meta
                    : null;
                return meta?.ticketId === ticketId;
            });
            if (existing) {
                return this.prisma.notification.update({
                    where: { id: existing.id },
                    data: {
                        title: input.title.trim(),
                        body: input.body.trim(),
                        type,
                        href: input.href || existing.href,
                        meta: input.meta,
                        readAt: null,
                        createdAt: new Date(),
                    },
                });
            }
        }
        return this.prisma.notification.create({
            data: {
                audience: 'admin',
                title: input.title.trim(),
                body: input.body.trim(),
                type,
                href: input.href || null,
                meta: input.meta,
            },
        });
    }
    async createUserNotification(input) {
        const type = input.type?.trim() || 'system';
        const ticketId = this.getTicketIdFromMeta(input.meta);
        if (ticketId &&
            (type === 'billing_support' ||
                type === 'support_reply' ||
                type === 'ticket_status')) {
            const recent = await this.prisma.notification.findMany({
                where: {
                    audience: 'user',
                    userId: input.userId,
                    type: {
                        in: ['billing_support', 'support_reply', 'ticket_status'],
                    },
                },
                orderBy: { createdAt: 'desc' },
                take: 100,
            });
            const existing = recent.find((row) => {
                const meta = row.meta && typeof row.meta === 'object' && !Array.isArray(row.meta)
                    ? row.meta
                    : null;
                return meta?.ticketId === ticketId;
            });
            if (existing) {
                return this.prisma.notification.update({
                    where: { id: existing.id },
                    data: {
                        title: input.title.trim(),
                        body: input.body.trim(),
                        type,
                        href: input.href || existing.href,
                        meta: input.meta,
                        readAt: null,
                        createdAt: new Date(),
                    },
                });
            }
        }
        return this.prisma.notification.create({
            data: {
                audience: 'user',
                userId: input.userId,
                title: input.title.trim(),
                body: input.body.trim(),
                type,
                href: input.href || null,
                meta: input.meta,
            },
        });
    }
    async listForAdmin(limit = 30) {
        const take = Math.min(Math.max(limit, 1), 100);
        const rawItems = await this.prisma.notification.findMany({
            where: { audience: 'admin' },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        const deduped = this.dedupeByTicket(rawItems);
        return {
            items: deduped.slice(0, take),
            unreadCount: deduped.filter((item) => !item.readAt).length,
        };
    }
    async listForUser(userId, limit = 30) {
        const take = Math.min(Math.max(limit, 1), 100);
        const rawItems = await this.prisma.notification.findMany({
            where: { audience: 'user', userId },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
        const deduped = this.dedupeByTicket(rawItems);
        const items = deduped.slice(0, take);
        const unreadCount = deduped.filter((item) => !item.readAt).length;
        const ticketIds = items
            .map((item) => {
            const meta = item.meta && typeof item.meta === 'object' && !Array.isArray(item.meta)
                ? item.meta
                : null;
            return typeof meta?.ticketId === 'string' ? meta.ticketId : null;
        })
            .filter((id) => Boolean(id));
        const tickets = ticketIds.length > 0
            ? await this.prisma.supportTicket.findMany({
                where: { userId, id: { in: ticketIds } },
                select: { id: true, topic: true, message: true, status: true },
            })
            : [];
        const ticketById = new Map(tickets.map((ticket) => [ticket.id, ticket]));
        const enriched = items.map((item) => {
            const meta = item.meta && typeof item.meta === 'object' && !Array.isArray(item.meta)
                ? { ...item.meta }
                : {};
            const ticketId = typeof meta.ticketId === 'string' ? meta.ticketId : null;
            const ticket = ticketId ? ticketById.get(ticketId) : null;
            if (!ticket)
                return item;
            const topic = typeof meta.topic === 'string' && meta.topic.trim()
                ? meta.topic
                : ticket.topic;
            const message = typeof meta.message === 'string' && meta.message.trim()
                ? meta.message
                : ticket.message;
            return {
                ...item,
                body: item.type === 'billing_support'
                    ? `Topic: ${topic}\n\n${message}`
                    : item.body.includes(message)
                        ? item.body
                        : `${item.body}\n\nYour message:\n${message}`,
                meta: {
                    ...meta,
                    topic,
                    message,
                    status: ticket.status,
                },
            };
        });
        return { items: enriched, unreadCount };
    }
    async markReadForAdmin(id) {
        const existing = await this.prisma.notification.findFirst({
            where: { id, audience: 'admin' },
        });
        if (!existing)
            throw new common_1.NotFoundException('Notification not found.');
        if (existing.readAt)
            return existing;
        return this.prisma.notification.update({
            where: { id },
            data: { readAt: new Date() },
        });
    }
    async markAllReadForAdmin() {
        const result = await this.prisma.notification.updateMany({
            where: { audience: 'admin', readAt: null },
            data: { readAt: new Date() },
        });
        return { updated: result.count };
    }
    async markReadForUser(userId, id) {
        const existing = await this.prisma.notification.findFirst({
            where: { id, audience: 'user', userId },
        });
        if (!existing)
            throw new common_1.NotFoundException('Notification not found.');
        if (existing.readAt)
            return existing;
        return this.prisma.notification.update({
            where: { id },
            data: { readAt: new Date() },
        });
    }
    async markAllReadForUser(userId) {
        const result = await this.prisma.notification.updateMany({
            where: { audience: 'user', userId, readAt: null },
            data: { readAt: new Date() },
        });
        return { updated: result.count };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map