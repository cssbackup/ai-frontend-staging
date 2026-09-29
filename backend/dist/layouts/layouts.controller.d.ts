import { Prisma } from '@prisma/client';
import { LayoutsService } from './layouts.service';
export declare class LayoutsController {
    private readonly layoutsService;
    constructor(layoutsService: LayoutsService);
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
    create(body: {
        key?: string;
        name?: string;
        sectionType?: string;
        sectionNumber?: number;
        categorySlug?: string | null;
        scope?: string;
        order?: number;
        status?: string;
        thumbnailUrl?: string;
        description?: string;
        defaultContent?: Record<string, unknown>;
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
    update(id: string, body: {
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
        defaultContent?: Record<string, unknown> | null;
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
    remove(id?: string): Promise<{
        message: string;
    }>;
}
