import { SmtpService, type SmtpUpsertInput } from './smtp.service';
export declare class SmtpController {
    private readonly smtpService;
    constructor(smtpService: SmtpService);
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
    upsertSettings(body: SmtpUpsertInput): Promise<{
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
    checkConnection(body: SmtpUpsertInput): Promise<{
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
}
