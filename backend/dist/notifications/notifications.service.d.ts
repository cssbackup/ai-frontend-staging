import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private getTicketIdFromMeta;
    private dedupeByTicket;
    createAdminNotification(input: {
        title: string;
        body: string;
        type?: string;
        href?: string | null;
        meta?: Prisma.InputJsonValue;
    }): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        audience: string;
        userId: string | null;
        body: string;
        href: string | null;
        readAt: Date | null;
        meta: Prisma.JsonValue | null;
    }>;
    createUserNotification(input: {
        userId: string;
        title: string;
        body: string;
        type?: string;
        href?: string | null;
        meta?: Prisma.InputJsonValue;
    }): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        audience: string;
        userId: string | null;
        body: string;
        href: string | null;
        readAt: Date | null;
        meta: Prisma.JsonValue | null;
    }>;
    listForAdmin(limit?: number): Promise<{
        items: {
            id: string;
            createdAt: Date;
            type: string;
            title: string;
            audience: string;
            userId: string | null;
            body: string;
            href: string | null;
            readAt: Date | null;
            meta: Prisma.JsonValue | null;
        }[];
        unreadCount: number;
    }>;
    listForUser(userId: string, limit?: number): Promise<{
        items: ({
            id: string;
            createdAt: Date;
            type: string;
            title: string;
            audience: string;
            userId: string | null;
            body: string;
            href: string | null;
            readAt: Date | null;
            meta: Prisma.JsonValue | null;
        } | {
            body: string;
            meta: {
                topic: string;
                message: string;
                status: string;
            };
            id: string;
            createdAt: Date;
            type: string;
            title: string;
            audience: string;
            userId: string | null;
            href: string | null;
            readAt: Date | null;
        })[];
        unreadCount: number;
    }>;
    markReadForAdmin(id: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        audience: string;
        userId: string | null;
        body: string;
        href: string | null;
        readAt: Date | null;
        meta: Prisma.JsonValue | null;
    }>;
    markAllReadForAdmin(): Promise<{
        updated: number;
    }>;
    markReadForUser(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        audience: string;
        userId: string | null;
        body: string;
        href: string | null;
        readAt: Date | null;
        meta: Prisma.JsonValue | null;
    }>;
    markAllReadForUser(userId: string): Promise<{
        updated: number;
    }>;
}
