"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const fs_1 = require("fs");
const app_module_1 = require("./app.module");
const REQUEST_BODY_LIMIT = '50mb';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: false });
    app.use(express_1.default.json({ limit: REQUEST_BODY_LIMIT }));
    app.use(express_1.default.urlencoded({ extended: true, limit: REQUEST_BODY_LIMIT }));
    const uploadsDir = (0, path_1.join)(process.cwd(), 'uploads');
    (0, fs_1.mkdirSync)(uploadsDir, { recursive: true });
    app.use('/uploads', express_1.default.static(uploadsDir));
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
        ],
        credentials: true,
    });
    const port = process.env.PORT ? Number(process.env.PORT) : 4000;
    await app.listen(port);
    console.log(`Backend running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map