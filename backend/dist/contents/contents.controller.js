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
exports.ContentsController = void 0;
const common_1 = require("@nestjs/common");
const contents_service_1 = require("./contents.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const public_decorator_1 = require("../auth/public.decorator");
let ContentsController = class ContentsController {
    constructor(contentsService) {
        this.contentsService = contentsService;
    }
    getBundle() {
        return this.contentsService.getBundle();
    }
    getShared() {
        return this.contentsService.getShared();
    }
    upsertShared(body) {
        if (!body.sections) {
            throw new common_1.BadRequestException('sections is required');
        }
        return this.contentsService.upsertShared(body.sections);
    }
    findAllCategoryContents() {
        return this.contentsService.findAllCategoryContents();
    }
    findCategoryContent(slug) {
        return this.contentsService.findCategoryContent(slug);
    }
    createCategoryContent(body) {
        if (!body.categorySlug?.trim() ||
            !body.categoryName?.trim() ||
            !body.templateKeys ||
            !body.sections) {
            throw new common_1.BadRequestException('categorySlug, categoryName, templateKeys, and sections are required');
        }
        return this.contentsService.createCategoryContent({
            categorySlug: body.categorySlug,
            categoryName: body.categoryName,
            templateKeys: body.templateKeys,
            sections: body.sections,
            status: body.status,
        });
    }
    updateCategoryContent(id, body) {
        return this.contentsService.updateCategoryContent(id, body);
    }
    removeCategoryContent(id) {
        if (!id)
            throw new common_1.BadRequestException('ID is required');
        return this.contentsService.removeCategoryContent(id);
    }
};
exports.ContentsController = ContentsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('bundle'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentsController.prototype, "getBundle", null);
__decorate([
    (0, common_1.Get)('shared'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentsController.prototype, "getShared", null);
__decorate([
    (0, common_1.Put)('shared'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContentsController.prototype, "upsertShared", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentsController.prototype, "findAllCategoryContents", null);
__decorate([
    (0, common_1.Get)('categories/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentsController.prototype, "findCategoryContent", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContentsController.prototype, "createCategoryContent", null);
__decorate([
    (0, common_1.Patch)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ContentsController.prototype, "updateCategoryContent", null);
__decorate([
    (0, common_1.Delete)('categories'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentsController.prototype, "removeCategoryContent", null);
exports.ContentsController = ContentsController = __decorate([
    (0, common_1.Controller)('contents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [contents_service_1.ContentsService])
], ContentsController);
//# sourceMappingURL=contents.controller.js.map