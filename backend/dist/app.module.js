"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const categories_module_1 = require("./categories/categories.module");
const layouts_module_1 = require("./layouts/layouts.module");
const templates_module_1 = require("./templates/templates.module");
const contents_module_1 = require("./contents/contents.module");
const user_auth_module_1 = require("./user-auth/user-auth.module");
const sites_module_1 = require("./sites/sites.module");
const admin_users_module_1 = require("./admin-users/admin-users.module");
const user_state_module_1 = require("./user-state/user-state.module");
const support_tickets_module_1 = require("./support-tickets/support-tickets.module");
const smtp_module_1 = require("./smtp/smtp.module");
const admin_mail_module_1 = require("./admin-mail/admin-mail.module");
const mail_module_1 = require("./mail/mail.module");
const notifications_module_1 = require("./notifications/notifications.module");
const create_ai_designs_module_1 = require("./create-ai-designs/create-ai-designs.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_auth_module_1.UserAuthModule,
            sites_module_1.SitesModule,
            user_state_module_1.UserStateModule,
            admin_users_module_1.AdminUsersModule,
            support_tickets_module_1.SupportTicketsModule,
            smtp_module_1.SmtpModule,
            admin_mail_module_1.AdminMailModule,
            mail_module_1.MailModule,
            notifications_module_1.NotificationsModule,
            create_ai_designs_module_1.CreateAiDesignsModule,
            categories_module_1.CategoriesModule,
            layouts_module_1.LayoutsModule,
            templates_module_1.TemplatesModule,
            contents_module_1.ContentsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map