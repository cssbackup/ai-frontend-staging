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
exports.LayoutsController = void 0;
const common_1 = require("@nestjs/common");
const layouts_service_1 = require("./layouts.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let LayoutsController = class LayoutsController {
    constructor(layoutsService) {
        this.layoutsService = layoutsService;
    }
    findAll(sectionType) {
        return this.layoutsService.findAll(sectionType);
    }
    create(body) {
        if (!body.key?.trim() || !body.name?.trim() || !body.sectionType?.trim()) {
            throw new common_1.BadRequestException('key, name, and section type are required');
        }
        return this.layoutsService.create({
            key: body.key,
            name: body.name,
            sectionType: body.sectionType,
            sectionNumber: body.sectionNumber,
            categorySlug: body.categorySlug,
            scope: body.scope,
            order: body.order,
            status: body.status,
            thumbnailUrl: body.thumbnailUrl,
            description: body.description,
            defaultContent: body.defaultContent,
        });
    }
    update(id, body) {
        return this.layoutsService.update(id, {
            ...body,
            defaultContent: body.defaultContent === undefined
                ? undefined
                : body.defaultContent === null
                    ? null
                    : body.defaultContent,
        });
    }
    remove(id) {
        if (!id)
            throw new common_1.BadRequestException('ID is required');
        return this.layoutsService.remove(id);
    }
};
exports.LayoutsController = LayoutsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('sectionType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LayoutsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LayoutsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LayoutsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LayoutsController.prototype, "remove", null);
exports.LayoutsController = LayoutsController = __decorate([
    (0, common_1.Controller)('layouts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [layouts_service_1.LayoutsService])
], LayoutsController);
//# sourceMappingURL=layouts.controller.js.map