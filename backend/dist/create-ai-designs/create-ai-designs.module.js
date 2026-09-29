"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAiDesignsModule = void 0;
const common_1 = require("@nestjs/common");
const create_ai_designs_controller_1 = require("./create-ai-designs.controller");
const create_ai_designs_service_1 = require("./create-ai-designs.service");
let CreateAiDesignsModule = class CreateAiDesignsModule {
};
exports.CreateAiDesignsModule = CreateAiDesignsModule;
exports.CreateAiDesignsModule = CreateAiDesignsModule = __decorate([
    (0, common_1.Module)({
        controllers: [create_ai_designs_controller_1.CreateAiDesignsController],
        providers: [create_ai_designs_service_1.CreateAiDesignsService],
        exports: [create_ai_designs_service_1.CreateAiDesignsService],
    })
], CreateAiDesignsModule);
//# sourceMappingURL=create-ai-designs.module.js.map