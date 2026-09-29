import { CreateAiDesignsService } from './create-ai-designs.service';
export declare class CreateAiDesignsController {
    private readonly createAiDesignsService;
    constructor(createAiDesignsService: CreateAiDesignsService);
    listMine(req: {
        user: {
            sub: string;
        };
    }): Promise<{
        category: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string | null;
        designKey: string;
        brandName: string | null;
        pageType: string | null;
        pageCount: number;
        pageLabels: import("@prisma/client/runtime/library").JsonValue;
        lastSyncedAt: Date;
    }[]>;
    getMine(req: {
        user: {
            sub: string;
        };
    }, designKey: string): Promise<{
        category: string | null;
        site: import("@prisma/client/runtime/library").JsonValue;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string | null;
        designKey: string;
        brandName: string | null;
        pageType: string | null;
        pageCount: number;
        pageLabels: import("@prisma/client/runtime/library").JsonValue;
        payload: import("@prisma/client/runtime/library").JsonValue;
        chat: import("@prisma/client/runtime/library").JsonValue;
        lastSyncedAt: Date;
    }>;
    upsertMine(req: {
        user: {
            sub: string;
        };
    }, body: {
        designKey?: string;
        title?: string;
        brandName?: string;
        category?: string;
        pageType?: string;
        pageCount?: number;
        pageLabels?: unknown;
        status?: string;
        payload?: unknown;
        site?: unknown;
        chat?: unknown;
    }): Promise<{
        category: string | null;
        id: string;
        updatedAt: Date;
        status: string;
        title: string | null;
        designKey: string;
        brandName: string | null;
        pageType: string | null;
        pageCount: number;
        lastSyncedAt: Date;
    }>;
    removeMine(req: {
        user: {
            sub: string;
        };
    }, designKey: string): Promise<{
        ok: boolean;
        designKey: string;
    }>;
}
