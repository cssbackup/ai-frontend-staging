import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailDispatchService } from '../mail/mail-dispatch.service';
import { NotificationsService } from '../notifications/notifications.service';
type SupportAttachment = {
    name?: string;
    url?: string;
    size?: number;
    mimeType?: string;
};
export declare class SupportTicketsService {
    private readonly prisma;
    private readonly mailDispatch;
    private readonly notifications;
    constructor(prisma: PrismaService, mailDispatch: MailDispatchService, notifications: NotificationsService);
    createForUser(userId: string, input: {
        topic?: string;
        message?: string;
        category?: string;
        service?: string;
    }): Promise<{
        category: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        userId: string;
        topic: string;
        message: string;
        userName: string | null;
        userEmail: string | null;
    }>;
    listForAdmin(input?: {
        search?: string;
        status?: string;
        category?: string;
    }): Promise<{
        tickets: ({
            user: {
                id: string;
                email: string;
                name: string | null;
                phone: string | null;
                avatarUrl: string | null;
                status: string;
                address: string | null;
            };
            replies: {
                id: string;
                createdAt: Date;
                ticketId: string;
                body: string;
                readAt: Date | null;
                attachments: Prisma.JsonValue | null;
                authorRole: string;
            }[];
        } & {
            category: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            userId: string;
            topic: string;
            message: string;
            userName: string | null;
            userEmail: string | null;
        })[];
        stats: {
            total: number;
            open: number;
            inProgress: number;
            resolved: number;
            closed: number;
        };
    }>;
    touchUserPresence(userId: string): Promise<{
        online: boolean;
        lastSeenAt: string;
    }>;
    touchAdminPresence(adminId: string): Promise<{
        online: boolean;
        lastSeenAt: string;
    }>;
    private isSupportOnline;
    private isUserOnline;
    private markRepliesRead;
    findOneForAdmin(id: string, adminId?: string): Promise<{
        presence: {
            userOnline: boolean;
            supportOnline: boolean;
        };
        user: {
            id: string;
            email: string;
            name: string | null;
            phone: string | null;
            avatarUrl: string | null;
            lastSeenAt: Date | null;
            createdAt: Date;
            status: string;
            address: string | null;
        };
        replies: {
            id: string;
            createdAt: Date;
            ticketId: string;
            body: string;
            readAt: Date | null;
            attachments: Prisma.JsonValue | null;
            authorRole: string;
        }[];
        category: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        userId: string;
        topic: string;
        message: string;
        userName: string | null;
        userEmail: string | null;
    }>;
    findOneForUser(userId: string, id: string): Promise<{
        presence: {
            supportOnline: boolean;
            userOnline: boolean;
        };
        replies: {
            id: string;
            createdAt: Date;
            ticketId: string;
            body: string;
            readAt: Date | null;
            attachments: Prisma.JsonValue | null;
            authorRole: string;
        }[];
        category: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        userId: string;
        topic: string;
        message: string;
        userName: string | null;
        userEmail: string | null;
    }>;
    getPresenceForUser(userId: string): Promise<{
        supportOnline: boolean;
        userOnline: boolean;
    }>;
    getPresenceForAdmin(adminId: string, userId?: string): Promise<{
        supportOnline: boolean;
        userOnline: boolean;
    }>;
    replyForAdmin(id: string, input: {
        message?: string;
        status?: string;
        attachments?: SupportAttachment[];
    }): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            phone: string | null;
            status: string;
            address: string | null;
        };
        replies: {
            id: string;
            createdAt: Date;
            ticketId: string;
            body: string;
            readAt: Date | null;
            attachments: Prisma.JsonValue | null;
            authorRole: string;
        }[];
    } & {
        category: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        userId: string;
        topic: string;
        message: string;
        userName: string | null;
        userEmail: string | null;
    }>;
    replyForUser(userId: string, id: string, input: {
        message?: string;
        attachments?: SupportAttachment[];
    }): Promise<{
        replies: {
            id: string;
            createdAt: Date;
            ticketId: string;
            body: string;
            readAt: Date | null;
            attachments: Prisma.JsonValue | null;
            authorRole: string;
        }[];
    } & {
        category: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        userId: string;
        topic: string;
        message: string;
        userName: string | null;
        userEmail: string | null;
    }>;
    updateStatusForAdmin(id: string, status?: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string | null;
            phone: string | null;
            status: string;
            address: string | null;
        };
        replies: {
            id: string;
            createdAt: Date;
            ticketId: string;
            body: string;
            readAt: Date | null;
            attachments: Prisma.JsonValue | null;
            authorRole: string;
        }[];
    } & {
        category: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        userId: string;
        topic: string;
        message: string;
        userName: string | null;
        userEmail: string | null;
    }>;
}
export {};
