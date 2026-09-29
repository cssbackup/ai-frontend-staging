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
exports.SupportTicketsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const admin_auth_guard_1 = require("../auth/admin-auth.guard");
const user_auth_guard_1 = require("../auth/user-auth.guard");
const support_tickets_service_1 = require("./support-tickets.service");
let SupportTicketsController = class SupportTicketsController {
    constructor(supportTicketsService) {
        this.supportTicketsService = supportTicketsService;
    }
    create(req, body) {
        return this.supportTicketsService.createForUser(req.user.sub, body);
    }
    touchUserPresence(req) {
        return this.supportTicketsService.getPresenceForUser(req.user.sub);
    }
    touchAdminPresence(req, body) {
        return this.supportTicketsService.getPresenceForAdmin(req.user.sub, body?.userId);
    }
    listForAdmin(search, status, category) {
        return this.supportTicketsService.listForAdmin({
            search,
            status,
            category,
        });
    }
    findOneForAdmin(req, id) {
        return this.supportTicketsService.findOneForAdmin(id, req.user.sub);
    }
    findOneForUser(req, id) {
        return this.supportTicketsService.findOneForUser(req.user.sub, id);
    }
    replyForUser(req, id, body) {
        return this.supportTicketsService.replyForUser(req.user.sub, id, body);
    }
    replyForAdmin(id, body) {
        return this.supportTicketsService.replyForAdmin(id, body);
    }
    updateStatus(id, body) {
        return this.supportTicketsService.updateStatusForAdmin(id, body.status);
    }
};
exports.SupportTicketsController = SupportTicketsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Post)('support-tickets'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SupportTicketsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Post)('user/presence'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SupportTicketsController.prototype, "touchUserPresence", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.Post)('admin/presence'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SupportTicketsController.prototype, "touchAdminPresence", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.Get)('admin/support-tickets'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], SupportTicketsController.prototype, "listForAdmin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.Get)('admin/support-tickets/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SupportTicketsController.prototype, "findOneForAdmin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Get)('user/support-tickets/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SupportTicketsController.prototype, "findOneForUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Post)('user/support-tickets/:id/replies'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], SupportTicketsController.prototype, "replyForUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.Post)('admin/support-tickets/:id/replies'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SupportTicketsController.prototype, "replyForAdmin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.Patch)('admin/support-tickets/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SupportTicketsController.prototype, "updateStatus", null);
exports.SupportTicketsController = SupportTicketsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [support_tickets_service_1.SupportTicketsService])
], SupportTicketsController);
//# sourceMappingURL=support-tickets.controller.js.map