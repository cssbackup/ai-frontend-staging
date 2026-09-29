import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class ContentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getBundle(): Promise<{
        templates: {
            id: string;
            numericId: number;
            title: string;
            type: string;
            image: string | null;
            previewimage: string | null;
            preview_description: string | null;
            prebuilt_pages: number;
            pages: Prisma.JsonValue;
            homeSectionOrder: Prisma.JsonValue;
            sectionVariants: Prisma.JsonValue;
            variables: Prisma.JsonValue;
            status: string;
        }[];
        common: string | number | boolean | Prisma.JsonObject | Prisma.JsonArray;
        categories: Record<string, {
            templates: unknown;
            sections: unknown;
            description?: string | null;
            icon?: string | null;
            slug?: string;
            status?: string;
        }>;
        layouts: {
            id: string;
            key: string;
            name: string;
            sectionType: string;
            sectionNumber: number;
            categorySlug: string | null;
            scope: string;
            order: number;
            status: string;
            thumbnailUrl: string | null;
            description: string | null;
        }[];
    }>;
    getShared(): Prisma.Prisma__SharedContentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        sections: Prisma.JsonValue;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    upsertShared(sections: Prisma.InputJsonValue): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        sections: Prisma.JsonValue;
    }>;
    findAllCategoryContents(): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        categorySlug: string;
        categoryName: string;
        templateKeys: Prisma.JsonValue;
        sections: Prisma.JsonValue;
    }[]>;
    findCategoryContent(slug: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        categorySlug: string;
        categoryName: string;
        templateKeys: Prisma.JsonValue;
        sections: Prisma.JsonValue;
    }>;
    createCategoryContent(data: {
        categorySlug: string;
        categoryName: string;
        templateKeys: Prisma.InputJsonValue;
        sections: Prisma.InputJsonValue;
        status?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        categorySlug: string;
        categoryName: string;
        templateKeys: Prisma.JsonValue;
        sections: Prisma.JsonValue;
    }>;
    updateCategoryContent(id: string, data: {
        categorySlug?: string;
        categoryName?: string;
        templateKeys?: Prisma.InputJsonValue;
        sections?: Prisma.InputJsonValue;
        status?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        categorySlug: string;
        categoryName: string;
        templateKeys: Prisma.JsonValue;
        sections: Prisma.JsonValue;
    }>;
    removeCategoryContent(id: string): Promise<{
        message: string;
    }>;
}
