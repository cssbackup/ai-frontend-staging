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
exports.SitesController = void 0;
const common_1 = require("@nestjs/common");
const sites_service_1 = require("./sites.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_auth_guard_1 = require("../auth/user-auth.guard");
const public_decorator_1 = require("../auth/public.decorator");
let SitesController = class SitesController {
    constructor(sitesService) {
        this.sitesService = sitesService;
    }
    listMine(req) {
        return this.sitesService.listMine(req.user.sub);
    }
    listPublished() {
        return this.sitesService.listPublishedPublic();
    }
    findPublished(slug) {
        return this.sitesService.findPublishedPublic(slug);
    }
    createPublicLead(slug, body) {
        return this.sitesService.createPublicLead(slug, body);
    }
    listLeadsMine(req) {
        return this.sitesService.listLeadsForOwner(req.user.sub);
    }
    updateTitle(req, id, body) {
        return this.sitesService.updateTitle(req.user.sub, id, body.title);
    }
    updateSlug(req, id, body) {
        return this.sitesService.updateSlug(req.user.sub, id, body.slug);
    }
    findMine(req, id) {
        return this.sitesService.findMineById(req.user.sub, id);
    }
    remove(req, id) {
        return this.sitesService.deleteMine(req.user.sub, id);
    }
    migrate(req, body) {
        if (!body.templateId?.trim() &&
            (!body.config ||
                !Array.isArray(body.config.sections) ||
                !body.config.sections.length)) {
            throw new common_1.BadRequestException('templateId and at least one section are required');
        }
        return this.sitesService.migrateGuestSite(req.user.sub, body);
    }
    publish(req, id) {
        return this.sitesService.publish(req.user.sub, id);
    }
};
exports.SitesController = SitesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Get)('mine'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SitesController.prototype, "listMine", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('public'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SitesController.prototype, "listPublished", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('public/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SitesController.prototype, "findPublished", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('public/:slug/leads'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SitesController.prototype, "createPublicLead", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Get)('leads/mine'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SitesController.prototype, "listLeadsMine", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Patch)(':id/title'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], SitesController.prototype, "updateTitle", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Patch)(':id/slug'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], SitesController.prototype, "updateSlug", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SitesController.prototype, "findMine", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SitesController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Post)('migrate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SitesController.prototype, "migrate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    (0, common_1.Post)(':id/publish'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SitesController.prototype, "publish", null);
exports.SitesController = SitesController = __decorate([
    (0, common_1.Controller)('sites'),
    __metadata("design:paramtypes", [sites_service_1.SitesService])
], SitesController);
//# sourceMappingURL=sites.controller.js.map