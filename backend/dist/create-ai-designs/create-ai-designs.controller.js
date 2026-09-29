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
exports.CreateAiDesignsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_auth_guard_1 = require("../auth/user-auth.guard");
const create_ai_designs_service_1 = require("./create-ai-designs.service");
let CreateAiDesignsController = class CreateAiDesignsController {
    constructor(createAiDesignsService) {
        this.createAiDesignsService = createAiDesignsService;
    }
    listMine(req) {
        return this.createAiDesignsService.listMine(req.user.sub);
    }
    getMine(req, designKey) {
        return this.createAiDesignsService.getMine(req.user.sub, designKey);
    }
    upsertMine(req, body) {
        return this.createAiDesignsService.upsertMine(req.user.sub, body);
    }
    removeMine(req, designKey) {
        return this.createAiDesignsService.removeMine(req.user.sub, designKey);
    }
};
exports.CreateAiDesignsController = CreateAiDesignsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CreateAiDesignsController.prototype, "listMine", null);
__decorate([
    (0, common_1.Get)(':designKey'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('designKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CreateAiDesignsController.prototype, "getMine", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CreateAiDesignsController.prototype, "upsertMine", null);
__decorate([
    (0, common_1.Delete)(':designKey'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('designKey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CreateAiDesignsController.prototype, "removeMine", null);
exports.CreateAiDesignsController = CreateAiDesignsController = __decorate([
    (0, common_1.Controller)('user/create-ai-designs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_auth_guard_1.UserAuthGuard),
    __metadata("design:paramtypes", [create_ai_designs_service_1.CreateAiDesignsService])
], CreateAiDesignsController);
//# sourceMappingURL=create-ai-designs.controller.js.map