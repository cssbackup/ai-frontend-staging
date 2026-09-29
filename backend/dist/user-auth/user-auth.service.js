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
var UserAuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const prisma_service_1 = require("../prisma/prisma.service");
const mail_dispatch_service_1 = require("../mail/mail-dispatch.service");
const notifications_service_1 = require("../notifications/notifications.service");
const userPublicSelect = {
    id: true,
    email: true,
    name: true,
    avatarUrl: true,
    gender: true,
    birthday: true,
    phone: true,
    nationality: true,
    location: true,
    address: true,
};
function normalizeOptionalText(value) {
    if (value === undefined)
        return undefined;
    if (value === null)
        return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}
let UserAuthService = UserAuthService_1 = class UserAuthService {
    constructor(prisma, jwt, mailDispatch, notifications) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.mailDispatch = mailDispatch;
        this.notifications = notifications;
        this.logger = new common_1.Logger(UserAuthService_1.name);
        this.loginOtps = new Map();
    }
    notifyNewSignup(input) {
        const providerLabel = input.provider === 'google'
            ? 'Google'
            : input.provider === 'apple'
                ? 'Apple'
                : 'Email';
        void this.mailDispatch
            .sendSignupNotifications({
            userEmail: input.email,
            userName: input.name || null,
            provider: input.provider,
        })
            .catch(() => undefined);
        void this.notifications
            .createAdminNotification({
            title: 'New user signup',
            body: `${input.name || input.email} joined via ${providerLabel}`,
            type: 'user_signup',
            href: '/users',
            meta: {
                userId: input.userId,
                email: input.email,
                provider: input.provider,
            },
        })
            .catch(() => undefined);
        void this.notifications
            .createUserNotification({
            userId: input.userId,
            title: 'Welcome to Lestow',
            body: 'Thanks for joining. Your account is ready — start building your first website anytime.',
            type: 'system',
            href: '/user/dashboard',
        })
            .catch(() => undefined);
    }
    async register(email, password, name) {
        const normalizedEmail = email.toLowerCase().trim();
        const existing = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });
        if (existing) {
            throw new common_1.ConflictException('Email already registered');
        }
        if (!password || password.length < 6) {
            throw new common_1.ConflictException('Password must be at least 6 characters');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: normalizedEmail,
                name: name?.trim() || null,
                passwordHash,
            },
            select: userPublicSelect,
        });
        this.notifyNewSignup({
            userId: user.id,
            email: user.email,
            name: user.name,
            provider: 'local',
        });
        const accessToken = await this.signToken(user);
        return { accessToken, user, isNewUser: true };
    }
    async sendLoginOtp(email) {
        const normalizedEmail = email.toLowerCase().trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            throw new common_1.BadRequestException('Enter a valid email');
        }
        const existing = this.loginOtps.get(normalizedEmail);
        if (existing && Date.now() - existing.sentAt < 45_000) {
            throw new common_1.BadRequestException('Please wait before requesting another code');
        }
        const code = String(Math.floor(100000 + Math.random() * 900000));
        this.loginOtps.set(normalizedEmail, {
            code,
            expiresAt: Date.now() + 5 * 60 * 1000,
            sentAt: Date.now(),
            attempts: 0,
        });
        const mailed = await this.mailDispatch.sendLoginOtp({
            userEmail: normalizedEmail,
            code,
        });
        if (!mailed.sent) {
            this.logger.warn(`Login OTP for ${normalizedEmail} not emailed (${mailed.reason}). Code: ${code}`);
        }
        return { message: 'We sent a 6-digit code to your email.' };
    }
    async verifyLoginOtp(email, code) {
        const normalizedEmail = email.toLowerCase().trim();
        const otp = (code || '').replace(/\D/g, '');
        const entry = this.loginOtps.get(normalizedEmail);
        if (!entry || Date.now() > entry.expiresAt) {
            this.loginOtps.delete(normalizedEmail);
            throw new common_1.UnauthorizedException('Code expired. Request a new one.');
        }
        entry.attempts += 1;
        if (entry.attempts > 5) {
            this.loginOtps.delete(normalizedEmail);
            throw new common_1.UnauthorizedException('Too many attempts. Request a new code.');
        }
        if (otp !== entry.code) {
            throw new common_1.UnauthorizedException('Invalid code');
        }
        this.loginOtps.delete(normalizedEmail);
        let user = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: { ...userPublicSelect, status: true },
        });
        let isNewUser = false;
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email: normalizedEmail,
                    authProvider: 'local',
                },
                select: { ...userPublicSelect, status: true },
            });
            isNewUser = true;
            this.notifyNewSignup({
                userId: user.id,
                email: user.email,
                name: user.name,
                provider: 'local',
            });
        }
        if (user.status !== 'Active') {
            throw new common_1.UnauthorizedException('Your account is inactive');
        }
        const publicUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatarUrl: user.avatarUrl,
            gender: user.gender,
            birthday: user.birthday,
            phone: user.phone,
            nationality: user.nationality,
            location: user.location,
            address: user.address,
        };
        return {
            accessToken: await this.signToken(publicUser),
            user: publicUser,
            isNewUser,
        };
    }
    async login(email, password) {
        const normalizedEmail = email.toLowerCase().trim();
        const user = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
            select: { ...userPublicSelect, passwordHash: true, status: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (user.status !== 'Active') {
            throw new common_1.UnauthorizedException('Your account is inactive');
        }
        if (!user.passwordHash) {
            throw new common_1.UnauthorizedException('This account uses Google or Apple sign-in. Continue with that provider.');
        }
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const publicUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatarUrl: user.avatarUrl,
            gender: user.gender,
            birthday: user.birthday,
            phone: user.phone,
            nationality: user.nationality,
            location: user.location,
            address: user.address,
        };
        const accessToken = await this.signToken(publicUser);
        return {
            accessToken,
            user: publicUser,
        };
    }
    async oauthLogin(input) {
        const provider = input.provider;
        const providerId = input.providerId?.trim();
        const normalizedEmail = input.email?.toLowerCase().trim();
        if (!providerId || !normalizedEmail) {
            throw new common_1.BadRequestException('OAuth profile is incomplete');
        }
        const byProvider = await this.prisma.user.findFirst({
            where: { authProvider: provider, providerId },
            select: { ...userPublicSelect, status: true },
        });
        let user = byProvider;
        let isNewUser = false;
        if (!user) {
            const byEmail = await this.prisma.user.findUnique({
                where: { email: normalizedEmail },
                select: { ...userPublicSelect, status: true, authProvider: true },
            });
            if (byEmail) {
                user = await this.prisma.user.update({
                    where: { id: byEmail.id },
                    data: {
                        authProvider: provider,
                        providerId,
                        name: byEmail.name || input.name?.trim() || null,
                        avatarUrl: byEmail.avatarUrl || input.avatarUrl || null,
                    },
                    select: { ...userPublicSelect, status: true },
                });
            }
            else {
                user = await this.prisma.user.create({
                    data: {
                        email: normalizedEmail,
                        name: input.name?.trim() || null,
                        avatarUrl: input.avatarUrl || null,
                        passwordHash: null,
                        authProvider: provider,
                        providerId,
                    },
                    select: { ...userPublicSelect, status: true },
                });
                isNewUser = true;
            }
        }
        else if (input.name || input.avatarUrl) {
            user = await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    name: user.name || input.name?.trim() || null,
                    avatarUrl: user.avatarUrl || input.avatarUrl || null,
                },
                select: { ...userPublicSelect, status: true },
            });
        }
        if (user.status !== 'Active') {
            throw new common_1.UnauthorizedException('Your account is inactive');
        }
        if (isNewUser) {
            this.notifyNewSignup({
                userId: user.id,
                email: user.email,
                name: user.name,
                provider,
            });
        }
        const publicUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatarUrl: user.avatarUrl,
            gender: user.gender,
            birthday: user.birthday,
            phone: user.phone,
            nationality: user.nationality,
            location: user.location,
            address: user.address,
        };
        const accessToken = await this.signToken(publicUser);
        return { accessToken, user: publicUser, isNewUser };
    }
    async me(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { ...userPublicSelect, createdAt: true },
        });
        if (!user)
            throw new common_1.UnauthorizedException();
        return user;
    }
    async updateProfile(userId, body) {
        const current = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!current)
            throw new common_1.UnauthorizedException();
        const nextName = body.name !== undefined ? body.name.trim() || null : current.name;
        const nextAvatarUrl = body.avatarUrl !== undefined ? body.avatarUrl : current.avatarUrl;
        const nextGender = body.gender !== undefined
            ? normalizeOptionalText(body.gender)
            : current.gender;
        const nextBirthday = body.birthday !== undefined
            ? normalizeOptionalText(body.birthday)
            : current.birthday;
        const nextPhone = body.phone !== undefined
            ? normalizeOptionalText(body.phone)
            : current.phone;
        const nextNationality = body.nationality !== undefined
            ? normalizeOptionalText(body.nationality)
            : current.nationality;
        const nextLocation = body.location !== undefined
            ? normalizeOptionalText(body.location)
            : current.location;
        const nextAddress = body.address !== undefined
            ? normalizeOptionalText(body.address)
            : current.address;
        let passwordHash = current.passwordHash;
        if (body.newPassword) {
            if (current.passwordHash) {
                if (!body.currentPassword) {
                    throw new common_1.BadRequestException('Current password is required to set a new password');
                }
                const ok = await bcrypt.compare(body.currentPassword, current.passwordHash);
                if (!ok) {
                    throw new common_1.UnauthorizedException('Current password is incorrect');
                }
            }
            if (body.newPassword.length < 6) {
                throw new common_1.BadRequestException('New password must be at least 6 characters');
            }
            passwordHash = await bcrypt.hash(body.newPassword, 10);
        }
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                name: nextName,
                avatarUrl: nextAvatarUrl,
                gender: nextGender,
                birthday: nextBirthday,
                phone: nextPhone,
                nationality: nextNationality,
                location: nextLocation,
                address: nextAddress,
                passwordHash,
            },
            select: userPublicSelect,
        });
        const accessToken = await this.signToken(user);
        return { accessToken, user };
    }
    signToken(user) {
        return this.jwt.signAsync({
            sub: user.id,
            email: user.email,
            name: user.name,
            type: 'user',
        });
    }
};
exports.UserAuthService = UserAuthService;
exports.UserAuthService = UserAuthService = UserAuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mail_dispatch_service_1.MailDispatchService,
        notifications_service_1.NotificationsService])
], UserAuthService);
//# sourceMappingURL=user-auth.service.js.map