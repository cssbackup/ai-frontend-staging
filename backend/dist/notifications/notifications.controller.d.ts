import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    listForAdmin(limit?: string): Promise<{
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
            meta: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        unreadCount: number;
    }>;
    markAllReadForAdmin(): Promise<{
        updated: number;
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
        meta: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    listForUser(req: {
        user: {
            sub: string;
        };
    }, limit?: string): Promise<{
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
            meta: import("@prisma/client/runtime/library").JsonValue | null;
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
    markAllReadForUser(req: {
        user: {
            sub: string;
        };
    }): Promise<{
        updated: number;
    }>;
    markReadForUser(req: {
        user: {
            sub: string;
        };
    }, id: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        title: string;
        audience: string;
        userId: string | null;
        body: string;
        href: string | null;
        readAt: Date | null;
        meta: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
