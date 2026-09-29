import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreateAiDesignsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upsertMine(ownerId: string, body: {
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
    listMine(ownerId: string): Promise<{
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
        pageLabels: Prisma.JsonValue;
        lastSyncedAt: Date;
    }[]>;
    getMine(ownerId: string, designKeyRaw: string): Promise<{
        category: string | null;
        site: Prisma.JsonValue;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string | null;
        designKey: string;
        brandName: string | null;
        pageType: string | null;
        pageCount: number;
        pageLabels: Prisma.JsonValue;
        payload: Prisma.JsonValue;
        chat: Prisma.JsonValue;
        lastSyncedAt: Date;
    }>;
    removeMine(ownerId: string, designKeyRaw: string): Promise<{
        ok: boolean;
        designKey: string;
    }>;
}
