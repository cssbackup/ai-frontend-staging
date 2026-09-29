import { AdminMailService, type AdminMailUpsertInput } from './admin-mail.service';
export declare class AdminMailController {
    private readonly adminMailService;
    constructor(adminMailService: AdminMailService);
    getSettings(): Promise<{
        configured: boolean;
        settings: null;
    } | {
        configured: boolean;
        settings: {
            id: string;
            email: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            enabled: boolean;
        };
    }>;
    upsertSettings(body: AdminMailUpsertInput): Promise<{
        configured: boolean;
        message: string;
        settings: {
            id: string;
            email: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            enabled: boolean;
        };
    }>;
}
