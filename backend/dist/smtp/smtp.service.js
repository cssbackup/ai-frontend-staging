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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmtpService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
const prisma_service_1 = require("../prisma/prisma.service");
const smtp_transport_1 = require("./smtp-transport");
let SmtpService = class SmtpService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSettings() {
        const setting = await this.prisma.smtpSetting.findFirst({
            orderBy: { createdAt: 'asc' },
        });
        if (!setting) {
            return {
                configured: false,
                settings: null,
            };
        }
        return {
            configured: true,
            settings: this.toPublic(setting),
        };
    }
    async upsertSettings(input) {
        const host = input.host?.trim() || '';
        const username = input.username?.trim() || '';
        const fromEmail = input.fromEmail?.trim() || '';
        const fromName = input.fromName?.trim() || null;
        const passwordInput = typeof input.password === 'string' ? input.password : '';
        const port = Number(input.port);
        const enabled = input.enabled !== false;
        if (!host)
            throw new common_1.BadRequestException('SMTP host is required.');
        if (!Number.isFinite(port) || port < 1 || port > 65535) {
            throw new common_1.BadRequestException('SMTP port must be between 1 and 65535.');
        }
        if (!username)
            throw new common_1.BadRequestException('SMTP username is required.');
        if (!fromEmail || !this.isValidEmail(fromEmail)) {
            throw new common_1.BadRequestException('A valid from email is required.');
        }
        const secure = (0, smtp_transport_1.normalizeSmtpSecure)(Math.floor(port), input.secure);
        const existing = await this.prisma.smtpSetting.findFirst({
            orderBy: { createdAt: 'asc' },
        });
        if (!existing && !passwordInput.trim()) {
            throw new common_1.BadRequestException('SMTP password is required.');
        }
        const data = {
            host,
            port: Math.floor(port),
            secure,
            username,
            fromEmail,
            fromName,
            enabled,
            ...(passwordInput.trim()
                ? { password: passwordInput.trim() }
                : existing
                    ? {}
                    : { password: '' }),
        };
        const saved = existing
            ? await this.prisma.smtpSetting.update({
                where: { id: existing.id },
                data,
            })
            : await this.prisma.smtpSetting.create({
                data: {
                    ...data,
                    password: passwordInput.trim(),
                },
            });
        return {
            configured: true,
            message: existing ? 'SMTP settings updated.' : 'SMTP settings saved.',
            settings: this.toPublic(saved),
        };
    }
    async checkConnection(input) {
        const existing = await this.prisma.smtpSetting.findFirst({
            orderBy: { createdAt: 'asc' },
        });
        const host = input?.host?.trim() || existing?.host || '';
        const username = input?.username?.trim() || existing?.username || '';
        const fromEmail = input?.fromEmail?.trim() || existing?.fromEmail || '';
        const fromName = input?.fromName !== undefined
            ? input.fromName?.trim() || null
            : existing?.fromName || null;
        const portRaw = input?.port !== undefined && input?.port !== null
            ? Number(input.port)
            : existing?.port;
        const passwordInput = typeof input?.password === 'string' ? input.password.trim() : '';
        const password = passwordInput || existing?.password || '';
        if (!host)
            throw new common_1.BadRequestException('SMTP host is required.');
        if (!Number.isFinite(portRaw) || !portRaw || portRaw < 1 || portRaw > 65535) {
            throw new common_1.BadRequestException('SMTP port must be between 1 and 65535.');
        }
        if (!username)
            throw new common_1.BadRequestException('SMTP username is required.');
        if (!password) {
            throw new common_1.BadRequestException('SMTP password is required to check the connection.');
        }
        if (!fromEmail || !this.isValidEmail(fromEmail)) {
            throw new common_1.BadRequestException('A valid from email is required.');
        }
        const port = Math.floor(portRaw);
        const secure = (0, smtp_transport_1.normalizeSmtpSecure)(port, input?.secure !== undefined ? input.secure : existing?.secure);
        const encryption = (0, smtp_transport_1.describeSmtpEncryption)(port, secure);
        const transporter = nodemailer.createTransport((0, smtp_transport_1.buildSmtpTransportOptions)({
            host,
            port,
            secure,
            username,
            password,
        }));
        try {
            await transporter.verify();
        }
        catch (error) {
            const detail = error instanceof Error ? error.message : 'SMTP connection failed.';
            throw new common_1.BadRequestException(`SMTP check failed: ${detail}`);
        }
        const adminInbox = await this.prisma.adminMailSetting.findFirst({
            where: { enabled: true },
            orderBy: { createdAt: 'asc' },
        });
        const testTo = adminInbox?.email || fromEmail;
        const displayFrom = fromName?.trim() || 'CSS Founder';
        try {
            await transporter.sendMail({
                from: `"${displayFrom}" <${fromEmail}>`,
                to: testTo,
                subject: 'CSS Founder SMTP check',
                text: [
                    'SMTP connection check succeeded.',
                    '',
                    `Host: ${host}`,
                    `Port: ${port}`,
                    `Encryption: ${encryption.mode} (encrypted: yes)`,
                    encryption.detail,
                    `From: ${fromEmail}`,
                    `To: ${testTo}`,
                    `Time: ${new Date().toISOString()}`,
                ].join('\n'),
                html: `<p>SMTP connection check succeeded.</p><ul><li><strong>Host:</strong> ${host}</li><li><strong>Port:</strong> ${port}</li><li><strong>Encryption:</strong> ${encryption.mode} (encrypted)</li><li><strong>From:</strong> ${fromEmail}</li><li><strong>To:</strong> ${testTo}</li></ul><p>${encryption.detail}</p>`,
            });
        }
        catch (error) {
            const detail = error instanceof Error ? error.message : 'Unable to send test email.';
            throw new common_1.BadRequestException(`SMTP verified, but test email failed: ${detail}`);
        }
        return {
            ok: true,
            message: `SMTP working with ${encryption.mode}. Test email sent to ${testTo}.`,
            testedWith: {
                host,
                port,
                secure,
                encryption: encryption.mode,
                encrypted: true,
                username,
                fromEmail,
                to: testTo,
            },
        };
    }
    toPublic(setting) {
        return {
            id: setting.id,
            host: setting.host,
            port: setting.port,
            secure: setting.secure,
            username: setting.username,
            fromEmail: setting.fromEmail,
            fromName: setting.fromName,
            enabled: setting.enabled,
            hasPassword: Boolean(setting.password),
            passwordSet: Boolean(setting.password),
            createdAt: setting.createdAt,
            updatedAt: setting.updatedAt,
        };
    }
    isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
};
exports.SmtpService = SmtpService;
exports.SmtpService = SmtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SmtpService);
//# sourceMappingURL=smtp.service.js.map