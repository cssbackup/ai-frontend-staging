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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthController = void 0;
const common_1 = require("@nestjs/common");
const user_auth_service_1 = require("./user-auth.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_auth_guard_1 = require("../auth/user-auth.guard");
const public_decorator_1 = require("../auth/public.decorator");
let UserAuthController = class UserAuthController {
    constructor(userAuthService) {
        this.userAuthService = userAuthService;
    }
    register(body) {
        const email = body.email?.trim();
        const password = body.password;
        if (!email || !password) {
            throw new common_1.UnauthorizedException('Email and password are required');
        }
        return this.userAuthService.register(email, password, body.name);
    }
    login(body) {
        const email = body.email?.trim();
        const password = body.password;
        if (!email || !password) {
            throw new common_1.UnauthorizedException('Email and password are required');
        }
        return this.userAuthService.login(email, password);
    }
    sendLoginOtp(body) {
        const email = body.email?.trim();
        if (!email) {
            throw new common_1.BadRequestException('Email is required');
        }
        return this.userAuthService.sendLoginOtp(email);
    }
    verifyLoginOtp(body) {
        const email = body.email?.trim();
        const code = body.code?.trim();
        if (!email || !code) {
            throw new common_1.UnauthorizedException('Email and code are required');
        }
        return this.userAuthService.verifyLoginOtp(email, code);
    }
    oauth(body) {
        if (body.provider !== 'google' &&
            body.provider !== 'apple') {
            throw new common_1.BadRequestException('Unsupported OAuth provider');
        }
        return this.userAuthService.oauthLogin({
            provider: body.provider,
            providerId: body.providerId || '',
            email: body.email || '',
            name: body.name,
            avatarUrl: body.avatarUrl,
        });
    }
    me(req) {
        return this.userAuthService.me(req.user.sub);
    }
    updateProfile(req, body) {
        if (body.name === undefined &&
            body.avatarUrl === undefined &&
            body.gender === undefined &&
            body.birthday === undefined &&
            body.phone === undefined &&
            body.nationality === undefined &&
            body.location === undefined &&
            body.address === undefined &&
            !body.newPassword) {
            throw new common_1.BadRequestException('Nothing to update');
        }
        return this.userAuthService.updateProfile(req.user.sub, body);
    }
};
exports.UserAuthController = UserAuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('otp/send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "sendLoginOtp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('otp/verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "verifyLoginOtp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('oauth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "oauth", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "me", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserAuthController.prototype, "updateProfile", null);
exports.UserAuthController = UserAuthController = __decorate([
    (0, common_1.Controller)('auth/user'),
    __metadata("design:paramtypes", [user_auth_service_1.UserAuthService])
], UserAuthController);
//# sourceMappingURL=user-auth.controller.js.map