"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailDispatchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailDispatchService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
const prisma_service_1 = require("../prisma/prisma.service");
const admin_mail_service_1 = require("../admin-mail/admin-mail.service");
const smtp_transport_1 = require("../smtp/smtp-transport");
let MailDispatchService = MailDispatchService_1 = class MailDispatchService {
    constructor(prisma, adminMailService) {
        this.prisma = prisma;
        this.adminMailService = adminMailService;
        this.logger = new common_1.Logger(MailDispatchService_1.name);
    }
    async sendBillingSupportAlert(input) {
        const inbox = await this.adminMailService.getActiveInbox();
        if (!inbox) {
            this.logger.warn('Admin mail not configured; skipping billing alert.');
            return { sent: false, reason: 'admin_mail_missing' };
        }
        const smtp = await this.prisma.smtpSetting.findFirst({
            where: { enabled: true },
            orderBy: { createdAt: 'asc' },
        });
        if (!smtp) {
            this.logger.warn('SMTP not configured; skipping billing alert.');
            return { sent: false, reason: 'smtp_missing' };
        }
        const transporter = nodemailer.createTransport((0, smtp_transport_1.buildSmtpTransportOptions)({
            host: smtp.host,
            port: smtp.port,
            secure: smtp.secure,
            username: smtp.username,
            password: smtp.password,
        }));
        const fromName = smtp.fromName?.trim() || 'CSS Founder';
        const subject = `[Billing Support] ${input.topic}`;
        const text = [
            'New billing support message received.',
            '',
            `Topic: ${input.topic}`,
            ...(input.service ? [`Service: ${input.service}`] : []),
            `Category: ${input.category}`,
            `From: ${input.userName || '—'} <${input.userEmail}>`,
            '',
            'Message:',
            input.message,
        ].join('\n');
        const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px">New billing support message</h2>
        <p><strong>Topic:</strong> ${escapeHtml(input.topic)}</p>
        ${input.service
            ? `<p><strong>Service:</strong> ${escapeHtml(input.service)}</p>`
            : ''}
        <p><strong>Category:</strong> ${escapeHtml(input.category)}</p>
        <p><strong>From:</strong> ${escapeHtml(input.userName || '—')} &lt;${escapeHtml(input.userEmail)}&gt;</p>
        <p style="margin-top:16px"><strong>Message</strong></p>
        <pre style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px">${escapeHtml(input.message)}</pre>
      </div>
    `;
        try {
            await transporter.sendMail({
                from: `"${fromName}" <${smtp.fromEmail}>`,
                to: inbox.email,
                replyTo: input.userEmail,
                subject,
                text,
                html,
            });
            return { sent: true };
        }
        catch (error) {
            this.logger.error(`Failed to send billing support mail to ${inbox.email}`, error instanceof Error ? error.stack : undefined);
            return { sent: false, reason: 'send_failed' };
        }
    }
    async sendSignupNotifications(input) {
        const smtp = await this.prisma.smtpSetting.findFirst({
            where: { enabled: true },
            orderBy: { createdAt: 'asc' },
        });
        if (!smtp) {
            this.logger.warn('SMTP not configured; skipping signup mails.');
            return {
                user: { sent: false, reason: 'smtp_missing' },
                admin: { sent: false, reason: 'smtp_missing' },
            };
        }
        const transporter = nodemailer.createTransport((0, smtp_transport_1.buildSmtpTransportOptions)({
            host: smtp.host,
            port: smtp.port,
            secure: smtp.secure,
            username: smtp.username,
            password: smtp.password,
        }));
        const fromName = smtp.fromName?.trim() || 'Lestow';
        const from = `"${fromName}" <${smtp.fromEmail}>`;
        const displayName = input.userName?.trim() || 'there';
        const providerLabel = input.provider === 'google'
            ? 'Google'
            : input.provider === 'apple'
                ? 'Apple'
                : 'Email';
        const userSubject = `Welcome to ${fromName}`;
        const userText = [
            `Hi ${displayName},`,
            '',
            `Welcome to ${fromName}! Your account is ready.`,
            '',
            'Start building your first website anytime from your dashboard.',
            '',
            'If you did not create this account, please contact support.',
            '',
            `— ${fromName}`,
        ].join('\n');
        const userHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111;max-width:560px">
        <h2 style="margin:0 0 12px">Welcome to ${escapeHtml(fromName)}</h2>
        <p>Hi ${escapeHtml(displayName)},</p>
        <p>Thanks for joining. Your account was created successfully via <strong>${escapeHtml(providerLabel)}</strong> sign-up.</p>
        <p>You can start building your website anytime from your dashboard.</p>
        <p style="color:#666;font-size:13px;margin-top:24px">If you did not create this account, please contact support.</p>
        <p style="margin-top:20px">— ${escapeHtml(fromName)}</p>
      </div>
    `;
        let userResult = { sent: false };
        try {
            await transporter.sendMail({
                from,
                to: input.userEmail,
                subject: userSubject,
                text: userText,
                html: userHtml,
            });
            userResult = { sent: true };
        }
        catch (error) {
            this.logger.error(`Failed to send signup welcome mail to ${input.userEmail}`, error instanceof Error ? error.stack : undefined);
            userResult = { sent: false, reason: 'send_failed' };
        }
        const inbox = await this.adminMailService.getActiveInbox();
        if (!inbox) {
            this.logger.warn('Admin mail not configured; skipping signup admin alert.');
            return {
                user: userResult,
                admin: { sent: false, reason: 'admin_mail_missing' },
            };
        }
        const adminSubject = `[New signup] ${input.userEmail}`;
        const adminText = [
            'A new user signed up.',
            '',
            `Name: ${input.userName || '—'}`,
            `Email: ${input.userEmail}`,
            `Method: ${providerLabel}`,
            `Time: ${new Date().toISOString()}`,
        ].join('\n');
        const adminHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px">New user signup</h2>
        <p><strong>Name:</strong> ${escapeHtml(input.userName || '—')}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.userEmail)}</p>
        <p><strong>Method:</strong> ${escapeHtml(providerLabel)}</p>
        <p><strong>Time:</strong> ${escapeHtml(new Date().toISOString())}</p>
      </div>
    `;
        let adminResult = { sent: false };
        try {
            await transporter.sendMail({
                from,
                to: inbox.email,
                replyTo: input.userEmail,
                subject: adminSubject,
                text: adminText,
                html: adminHtml,
            });
            adminResult = { sent: true };
        }
        catch (error) {
            this.logger.error(`Failed to send signup admin mail to ${inbox.email}`, error instanceof Error ? error.stack : undefined);
            adminResult = { sent: false, reason: 'send_failed' };
        }
        return { user: userResult, admin: adminResult };
    }
    async sendLoginOtp(input) {
        const smtp = await this.prisma.smtpSetting.findFirst({
            where: { enabled: true },
            orderBy: { createdAt: 'asc' },
        });
        if (!smtp) {
            this.logger.warn('SMTP not configured; skipping login OTP mail.');
            return { sent: false, reason: 'smtp_missing' };
        }
        const transporter = nodemailer.createTransport((0, smtp_transport_1.buildSmtpTransportOptions)({
            host: smtp.host,
            port: smtp.port,
            secure: smtp.secure,
            username: smtp.username,
            password: smtp.password,
        }));
        const fromName = smtp.fromName?.trim() || 'Lestow';
        const from = `"${fromName}" <${smtp.fromEmail}>`;
        const subject = `${input.code} is your ${fromName} login code`;
        const text = [
            `Your login code is ${input.code}.`,
            '',
            'It expires in 5 minutes. If you did not request this, you can ignore this email.',
            '',
            `— ${fromName}`,
        ].join('\n');
        const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111;max-width:560px">
        <h2 style="margin:0 0 12px">Your login code</h2>
        <p style="font-size:28px;font-weight:700;letter-spacing:6px;margin:16px 0">${escapeHtml(input.code)}</p>
        <p>This code expires in 5 minutes.</p>
        <p style="color:#666;font-size:13px;margin-top:24px">If you did not request this, you can ignore this email.</p>
        <p style="margin-top:20px">— ${escapeHtml(fromName)}</p>
      </div>
    `;
        try {
            await transporter.sendMail({
                from,
                to: input.userEmail,
                subject,
                text,
                html,
            });
            return { sent: true };
        }
        catch (error) {
            this.logger.error(`Failed to send login OTP to ${input.userEmail}`, error instanceof Error ? error.stack : undefined);
            return { sent: false, reason: 'send_failed' };
        }
    }
    async sendDraftWebsiteReminder(input) {
        const smtp = await this.prisma.smtpSetting.findFirst({
            where: { enabled: true },
            orderBy: { createdAt: 'asc' },
        });
        if (!smtp) {
            this.logger.warn('SMTP not configured; skipping draft reminder mail.');
            return { sent: false, reason: 'smtp_missing' };
        }
        const transporter = nodemailer.createTransport((0, smtp_transport_1.buildSmtpTransportOptions)({
            host: smtp.host,
            port: smtp.port,
            secure: smtp.secure,
            username: smtp.username,
            password: smtp.password,
        }));
        const fromName = smtp.fromName?.trim() || 'Lestow';
        const from = `"${fromName}" <${smtp.fromEmail}>`;
        const displayName = input.userName?.trim() || 'there';
        const draftCount = input.drafts.length;
        const firstTitle = input.drafts[0]?.title || 'your website';
        const subject = draftCount > 1
            ? `Your ${draftCount} draft websites are waiting`
            : `Your draft website is waiting: ${firstTitle}`;
        const draftLines = input.drafts
            .map((draft, index) => `${index + 1}. ${draft.title}\n   ${draft.editorUrl}`)
            .join('\n');
        const draftHtml = input.drafts
            .map((draft) => `<li style="margin:0 0 10px"><strong>${escapeHtml(draft.title)}</strong><br /><a href="${escapeHtml(draft.editorUrl)}" style="color:#2563eb">Continue editing</a></li>`)
            .join('');
        const text = [
            `Hi ${displayName},`,
            '',
            draftCount > 1
                ? `You still have ${draftCount} unpublished draft websites on ${fromName}.`
                : `Your draft website "${firstTitle}" is still unpublished on ${fromName}.`,
            '',
            'Finish it and publish when you are ready:',
            draftLines,
            '',
            `Dashboard: ${input.dashboardUrl}`,
            '',
            'We will remind you again in 3 days if it is still a draft.',
            '',
            `— ${fromName}`,
        ].join('\n');
        const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111;max-width:560px">
        <h2 style="margin:0 0 12px">Your draft website is waiting</h2>
        <p>Hi ${escapeHtml(displayName)},</p>
        <p>${draftCount > 1
            ? `You still have <strong>${draftCount} unpublished draft websites</strong> on ${escapeHtml(fromName)}.`
            : `Your draft website <strong>${escapeHtml(firstTitle)}</strong> is still unpublished.`}</p>
        <p>Pick up where you left off and publish when you are ready.</p>
        <ul style="padding-left:18px;margin:16px 0">${draftHtml}</ul>
        <p><a href="${escapeHtml(input.dashboardUrl)}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px">Open dashboard</a></p>
        <p style="color:#666;font-size:13px;margin-top:24px">We will send another reminder in 3 days if it is still a draft.</p>
        <p style="margin-top:20px">— ${escapeHtml(fromName)}</p>
      </div>
    `;
        try {
            await transporter.sendMail({
                from,
                to: input.userEmail,
                subject,
                text,
                html,
            });
            return { sent: true };
        }
        catch (error) {
            this.logger.error(`Failed to send draft reminder to ${input.userEmail}`, error instanceof Error ? error.stack : undefined);
            return { sent: false, reason: 'send_failed' };
        }
    }
};
exports.MailDispatchService = MailDispatchService;
exports.MailDispatchService = MailDispatchService = MailDispatchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        admin_mail_service_1.AdminMailService])
], MailDispatchService);
function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
//# sourceMappingURL=mail-dispatch.service.js.map