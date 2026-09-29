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
exports.UserStateController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_auth_guard_1 = require("../auth/user-auth.guard");
const user_state_service_1 = require("./user-state.service");
let UserStateController = class UserStateController {
    constructor(userStateService) {
        this.userStateService = userStateService;
    }
    getState(req) {
        return this.userStateService.getState(req.user.sub);
    }
    saveState(req, body) {
        return this.userStateService.saveState(req.user.sub, {
            siteSubscriptions: body.siteSubscriptions,
            purchasedAddons: body.purchasedAddons,
            purchasedDomains: body.purchasedDomains,
            domainConnections: body.domainConnections,
        });
    }
    getRazorpay(req) {
        return this.userStateService.getRazorpayMeta(req.user.sub);
    }
    addRazorpayToken(req, body) {
        return this.userStateService.addRazorpayTokenId(req.user.sub, body.tokenId || '', body.customerId);
    }
    removeRazorpayToken(req, tokenId) {
        return this.userStateService.removeRazorpayTokenId(req.user.sub, tokenId);
    }
    setRazorpayCustomer(req, body) {
        return this.userStateService.setRazorpayCustomerId(req.user.sub, body.customerId || '');
    }
};
exports.UserStateController = UserStateController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserStateController.prototype, "getState", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserStateController.prototype, "saveState", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Get)('razorpay'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserStateController.prototype, "getRazorpay", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Post)('razorpay/tokens'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserStateController.prototype, "addRazorpayToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Delete)('razorpay/tokens/:tokenId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('tokenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserStateController.prototype, "removeRazorpayToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Put)('razorpay/customer'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserStateController.prototype, "setRazorpayCustomer", null);
exports.UserStateController = UserStateController = __decorate([
    (0, common_1.Controller)('user-state'),
    __metadata("design:paramtypes", [user_state_service_1.UserStateService])
], UserStateController);
//# sourceMappingURL=user-state.controller.js.map