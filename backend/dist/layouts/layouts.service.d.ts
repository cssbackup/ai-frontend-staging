import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class LayoutsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(sectionType?: string): Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        description: string | null;
        status: string;
        key: string;
        sectionType: string;
        sectionNumber: number;
        categorySlug: string | null;
        scope: string;
        thumbnailUrl: string | null;
        defaultContent: Prisma.JsonValue | null;
    }[]>;
    create(data: {
        key: string;
        name: string;
        sectionType: string;
        sectionNumber?: number;
        categorySlug?: string | null;
        scope?: string;
        order?: number;
        status?: string;
        thumbnailUrl?: string;
        description?: string;
        defaultContent?: Prisma.InputJsonValue;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        description: string | null;
        status: string;
        key: string;
        sectionType: string;
        sectionNumber: number;
        categorySlug: string | null;
        scope: string;
        thumbnailUrl: string | null;
        defaultContent: Prisma.JsonValue | null;
    }>;
    update(id: string, data: {
        key?: string;
        name?: string;
        sectionType?: string;
        sectionNumber?: number;
        categorySlug?: string | null;
        scope?: string;
        order?: number;
        status?: string;
        thumbnailUrl?: string | null;
        description?: string | null;
        defaultContent?: Prisma.InputJsonValue | null;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        description: string | null;
        status: string;
        key: string;
        sectionType: string;
        sectionNumber: number;
        categorySlug: string | null;
        scope: string;
        thumbnailUrl: string | null;
        defaultContent: Prisma.JsonValue | null;
    }>;
    private syncContentBags;
    remove(id: string): Promise<{
        message: string;
    }>;
}
