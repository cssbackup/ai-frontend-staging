import { PrismaService } from '../prisma/prisma.service';
export type AdminMailUpsertInput = {
    email?: string;
    name?: string | null;
    enabled?: boolean;
};
export declare class AdminMailService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    upsertSettings(input: AdminMailUpsertInput): Promise<{
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
    getActiveInbox(): Promise<{
        id: string;
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        enabled: boolean;
    } | null>;
    private isValidEmail;
}
