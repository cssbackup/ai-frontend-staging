import { PrismaService } from '../prisma/prisma.service';
export type SmtpUpsertInput = {
    host?: string;
    port?: number;
    secure?: boolean;
    username?: string;
    password?: string;
    fromEmail?: string;
    fromName?: string | null;
    enabled?: boolean;
};
export declare class SmtpService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSettings(): Promise<{
        configured: boolean;
        settings: null;
    } | {
        configured: boolean;
        settings: {
            id: string;
            host: string;
            port: number;
            secure: boolean;
            username: string;
            fromEmail: string;
            fromName: string | null;
            enabled: boolean;
            hasPassword: boolean;
            passwordSet: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    upsertSettings(input: SmtpUpsertInput): Promise<{
        configured: boolean;
        message: string;
        settings: {
            id: string;
            host: string;
            port: number;
            secure: boolean;
            username: string;
            fromEmail: string;
            fromName: string | null;
            enabled: boolean;
            hasPassword: boolean;
            passwordSet: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    checkConnection(input?: SmtpUpsertInput): Promise<{
        ok: boolean;
        message: string;
        testedWith: {
            host: string;
            port: number;
            secure: boolean;
            encryption: string;
            encrypted: boolean;
            username: string;
            fromEmail: string;
            to: string;
        };
    }>;
    private toPublic;
    private isValidEmail;
}
