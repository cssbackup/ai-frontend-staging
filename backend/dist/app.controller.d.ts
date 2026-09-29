import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
export declare class AppController {
    private readonly appService;
    private readonly prisma;
    constructor(appService: AppService, prisma: PrismaService);
    getHello(): {
        name: string;
        message: string;
    };
    health(): Promise<{
        status: string;
        database: string;
    }>;
}
