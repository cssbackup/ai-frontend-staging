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
var DraftReminderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftReminderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_dispatch_service_1 = require("./mail-dispatch.service");
const notifications_service_1 = require("../notifications/notifications.service");
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
const TICK_MS = 60 * 60 * 1000;
const START_DELAY_MS = 20_000;
const DRAFT_REMINDER_TYPE = 'draft_reminder';
let DraftReminderService = DraftReminderService_1 = class DraftReminderService {
    constructor(prisma, mailDispatch, notifications) {
        this.prisma = prisma;
        this.mailDispatch = mailDispatch;
        this.notifications = notifications;
        this.logger = new common_1.Logger(DraftReminderService_1.name);
        this.timer = null;
        this.startTimer = null;
        this.running = false;
    }
    onModuleInit() {
        this.startTimer = setTimeout(() => {
            void this.tick();
        }, START_DELAY_MS);
        this.timer = setInterval(() => {
            void this.tick();
        }, TICK_MS);
    }
    onModuleDestroy() {
        if (this.startTimer)
            clearTimeout(this.startTimer);
        if (this.timer)
            clearInterval(this.timer);
    }
    appOrigin() {
        return (process.env.APP_URL ||
            process.env.FRONTEND_URL ||
            process.env.NEXT_PUBLIC_APP_URL ||
            'http://localhost:3000').replace(/\/$/, '');
    }
    async tick() {
        if (this.running)
            return;
        this.running = true;
        try {
            const cutoff = new Date(Date.now() - THREE_DAYS_MS);
            const idleDrafts = await this.prisma.site.findMany({
                where: {
                    published: false,
                    status: { not: 'published' },
                    updatedAt: { lte: cutoff },
                    owner: { status: 'Active' },
                },
                select: {
                    id: true,
                    title: true,
                    templateId: true,
                    category: true,
                    updatedAt: true,
                    ownerId: true,
                    owner: {
                        select: { id: true, email: true, name: true },
                    },
                },
                orderBy: { updatedAt: 'desc' },
            });
            if (!idleDrafts.length)
                return;
            const byOwner = new Map();
            for (const site of idleDrafts) {
                const list = byOwner.get(site.ownerId) || [];
                list.push(site);
                byOwner.set(site.ownerId, list);
            }
            const origin = this.appOrigin();
            const dashboardUrl = `${origin}/user/dashboard`;
            for (const [ownerId, sites] of byOwner) {
                const owner = sites[0]?.owner;
                if (!owner?.email)
                    continue;
                const last = await this.prisma.notification.findFirst({
                    where: {
                        audience: 'user',
                        userId: ownerId,
                        type: DRAFT_REMINDER_TYPE,
                    },
                    orderBy: { createdAt: 'desc' },
                    select: { createdAt: true },
                });
                if (last && last.createdAt > cutoff)
                    continue;
                const drafts = sites.slice(0, 5).map((site) => ({
                    title: site.title?.trim() || 'Untitled website',
                    editorUrl: `${origin}/editor?siteId=${encodeURIComponent(site.id)}&templateId=${encodeURIComponent(site.templateId)}&category=${encodeURIComponent(site.category)}`,
                }));
                const mailed = await this.mailDispatch.sendDraftWebsiteReminder({
                    userName: owner.name,
                    userEmail: owner.email,
                    drafts,
                    dashboardUrl,
                });
                if (!mailed.sent)
                    continue;
                const firstTitle = drafts[0]?.title || 'your website';
                await this.notifications.createUserNotification({
                    userId: ownerId,
                    title: 'Draft website reminder',
                    body: drafts.length > 1
                        ? `You have ${drafts.length} unpublished draft websites waiting.`
                        : `"${firstTitle}" is still a draft. Continue editing or publish it.`,
                    type: DRAFT_REMINDER_TYPE,
                    href: '/user/dashboard',
                    meta: { siteIds: sites.map((site) => site.id) },
                });
            }
        }
        catch (error) {
            this.logger.error('Draft reminder tick failed', error instanceof Error ? error.stack : undefined);
        }
        finally {
            this.running = false;
        }
    }
};
exports.DraftReminderService = DraftReminderService;
exports.DraftReminderService = DraftReminderService = DraftReminderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_dispatch_service_1.MailDispatchService,
        notifications_service_1.NotificationsService])
], DraftReminderService);
//# sourceMappingURL=draft-reminder.service.js.map