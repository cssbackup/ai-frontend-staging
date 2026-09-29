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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async onModuleInit() {
        await this.ensureAdminSeed();
    }
    async ensureAdminSeed() {
        const email = process.env.ADMIN_EMAIL || 'admin@cssfounder.com';
        const password = process.env.ADMIN_PASSWORD || 'Admin@123';
        const existing = await this.prisma.admin.findUnique({ where: { email } });
        if (existing)
            return;
        const passwordHash = await bcrypt.hash(password, 10);
        await this.prisma.admin.create({
            data: {
                email,
                name: 'Admin User',
                passwordHash,
            },
        });
        console.log(`Seeded admin: ${email}`);
    }
    async login(email, password) {
        const admin = await this.prisma.admin.findUnique({
            where: { email: email.toLowerCase().trim() },
        });
        if (!admin) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const ok = await bcrypt.compare(password, admin.passwordHash);
        if (!ok) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const accessToken = await this.jwt.signAsync({
            sub: admin.id,
            email: admin.email,
            name: admin.name,
            role: 'ADMIN',
            type: 'admin',
        });
        return {
            accessToken,
            user: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: 'ADMIN',
            },
        };
    }
    async me(adminId) {
        const admin = await this.prisma.admin.findUnique({
            where: { id: adminId },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                location: true,
                state: true,
                zip: true,
                avatarUrl: true,
            },
        });
        if (!admin)
            throw new common_1.UnauthorizedException();
        return { ...admin, role: 'ADMIN' };
    }
    async updateProfile(adminId, data) {
        if (data.email) {
            const email = data.email.toLowerCase().trim();
            const taken = await this.prisma.admin.findFirst({
                where: { email, NOT: { id: adminId } },
            });
            if (taken)
                throw new common_1.ConflictException('Email already in use');
            data.email = email;
        }
        const admin = await this.prisma.admin.update({
            where: { id: adminId },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                location: data.location,
                state: data.state,
                zip: data.zip,
                avatarUrl: data.avatarUrl,
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                location: true,
                state: true,
                zip: true,
                avatarUrl: true,
            },
        });
        return { ...admin, role: 'ADMIN' };
    }
    async changePassword(adminId, currentPassword, newPassword) {
        const admin = await this.prisma.admin.findUnique({
            where: { id: adminId },
        });
        if (!admin)
            throw new common_1.UnauthorizedException();
        const ok = await bcrypt.compare(currentPassword, admin.passwordHash);
        if (!ok) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        if (!newPassword || newPassword.length < 6) {
            throw new common_1.ConflictException('New password must be at least 6 characters');
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await this.prisma.admin.update({
            where: { id: adminId },
            data: { passwordHash },
        });
        return { message: 'Password updated' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map