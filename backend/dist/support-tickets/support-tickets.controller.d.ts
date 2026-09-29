import { SupportTicketsService } from './support-tickets.service';
export declare class SupportTicketsController {
    private readonly supportTicketsService;
    constructor(supportTicketsService: SupportTicketsService);
    create(req: {
        user: {
            sub: string;
        };
    }, body: {
        topic?: string;
        message?: string;
        category?: string;
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
    touchUserPresence(req: {
        user: {
            sub: string;
        };
    }): Promise<{
        supportOnline: boolean;
        userOnline: boolean;
    }>;
    touchAdminPresence(req: {
        user: {
            sub: string;
        };
    }, body: {
        userId?: string;
    }): Promise<{
        supportOnline: boolean;
        userOnline: boolean;
    }>;
    listForAdmin(search?: string, status?: string, category?: string): Promise<{
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
                attachments: import("@prisma/client/runtime/library").JsonValue | null;
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
    findOneForAdmin(req: {
        user: {
            sub: string;
        };
    }, id: string): Promise<{
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
            attachments: import("@prisma/client/runtime/library").JsonValue | null;
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
    findOneForUser(req: {
        user: {
            sub: string;
        };
    }, id: string): Promise<{
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
            attachments: import("@prisma/client/runtime/library").JsonValue | null;
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
    replyForUser(req: {
        user: {
            sub: string;
        };
    }, id: string, body: {
        message?: string;
        attachments?: Array<{
            name?: string;
            url?: string;
            size?: number;
            mimeType?: string;
        }>;
    }): Promise<{
        replies: {
            id: string;
            createdAt: Date;
            ticketId: string;
            body: string;
            readAt: Date | null;
            attachments: import("@prisma/client/runtime/library").JsonValue | null;
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
    replyForAdmin(id: string, body: {
        message?: string;
        status?: string;
        attachments?: Array<{
            name?: string;
            url?: string;
            size?: number;
            mimeType?: string;
        }>;
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
            attachments: import("@prisma/client/runtime/library").JsonValue | null;
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
    updateStatus(id: string, body: {
        status?: string;
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
            attachments: import("@prisma/client/runtime/library").JsonValue | null;
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
