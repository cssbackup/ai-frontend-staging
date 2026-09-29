import { PrismaService } from '../prisma/prisma.service';
import { AdminMailService } from '../admin-mail/admin-mail.service';
export declare class MailDispatchService {
    private readonly prisma;
    private readonly adminMailService;
    private readonly logger;
    constructor(prisma: PrismaService, adminMailService: AdminMailService);
    sendBillingSupportAlert(input: {
        topic: string;
        message: string;
        category: string;
        service?: string;
        userName: string | null;
        userEmail: string;
    }): Promise<{
        sent: boolean;
        reason: "admin_mail_missing";
    } | {
        sent: boolean;
        reason: "smtp_missing";
    } | {
        sent: true;
        reason?: undefined;
    } | {
        sent: boolean;
        reason: "send_failed";
    }>;
    sendSignupNotifications(input: {
        userName: string | null;
        userEmail: string;
        provider: 'local' | 'google' | 'apple';
    }): Promise<{
        user: {
            sent: boolean;
            reason?: string;
        };
        admin: {
            sent: boolean;
            reason?: string;
        };
    }>;
    sendLoginOtp(input: {
        userEmail: string;
        code: string;
    }): Promise<{
        sent: boolean;
        reason: "smtp_missing";
    } | {
        sent: true;
        reason?: undefined;
    } | {
        sent: boolean;
        reason: "send_failed";
    }>;
    sendDraftWebsiteReminder(input: {
        userName: string | null;
        userEmail: string;
        drafts: Array<{
            title: string;
            editorUrl: string;
        }>;
        dashboardUrl: string;
    }): Promise<{
        sent: boolean;
        reason: "smtp_missing";
    } | {
        sent: true;
        reason?: undefined;
    } | {
        sent: boolean;
        reason: "send_failed";
    }>;
}
