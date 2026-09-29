import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
type SiteConfigInput = {
    templateId?: string;
    category?: string;
    clientUpdatedAt?: number;
    pageLinks?: unknown;
    sections?: unknown;
    templateVariables?: unknown;
    businessInfo?: {
        audience?: string;
        name?: string;
        description?: string;
    } | null;
    seo?: Record<string, unknown> | null;
    taxonomies?: Record<string, unknown> | null;
    createPath?: string | null;
    designId?: string | null;
    createAiSite?: {
        pages?: Array<{
            id?: string;
            label?: string;
            html?: string;
        }>;
        activePageId?: string;
    } | null;
};
export declare class SitesService {
    private readonly prisma;
    private readonly notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    listMine(ownerId: string): Promise<{
        pageCount: number;
        isMultiPage: boolean;
        createPath: string;
        designId: string | null;
        flow: string;
        flowLabel: string;
        category: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        status: string;
        title: string;
        templateId: string;
        published: boolean;
        publishedAt: Date | null;
    }[]>;
    findMineById(ownerId: string, siteId: string): Promise<{
        id: string;
        title: string;
        slug: string;
        status: string;
        templateId: string;
        category: string;
        published: boolean;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        pageCount: number;
        isMultiPage: boolean;
        config: {
            templateId: string;
            category: string;
            clientUpdatedAt: number | undefined;
            pageLinks: {};
            sections: {};
            templateVariables: {};
            businessInfo: {
                audience?: string;
                name?: string;
                description?: string;
            } | null;
            seo: Record<string, unknown> | null;
            taxonomies: Record<string, unknown> | null;
        };
    }>;
    updateSlug(ownerId: string, siteId: string, requestedSlug?: string): Promise<{
        id: string;
        slug: string;
        status: string;
        published: boolean;
    }>;
    updateTitle(ownerId: string, siteId: string, requestedTitle?: string): Promise<{
        id: string;
        updatedAt: Date;
        slug: string;
        title: string;
    }>;
    migrateGuestSite(ownerId: string, body: {
        title?: string;
        templateId?: string;
        category?: string;
        config?: SiteConfigInput;
        siteId?: string;
    }): Promise<{
        category: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        status: string;
        title: string;
        templateId: string;
        published: boolean;
        publishedAt: Date | null;
        config: Prisma.JsonValue | null;
        ownerId: string;
    }>;
    publish(ownerId: string, siteId: string): Promise<{
        category: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        status: string;
        title: string;
        templateId: string;
        published: boolean;
        publishedAt: Date | null;
        config: Prisma.JsonValue | null;
        ownerId: string;
    }>;
    deleteMine(ownerId: string, siteId: string): Promise<{
        message: string;
        id: string;
    }>;
    findPublishedPublic(slug: string): Promise<{
        id: string;
        title: string;
        slug: string;
        templateId: string;
        category: string;
        pageLinks: {};
        sections: {};
        templateVariables: {};
        businessInfo: {
            audience?: string;
            name?: string;
            description?: string;
        } | null;
        createPath: string | null;
        designId: string | null;
        createAiSite: {
            pages?: Array<{
                id?: string;
                label?: string;
                html?: string;
            }>;
            activePageId?: string;
        } | null;
        seo: {
            title: string;
            description: string;
            keywords: string[];
            ogTitle: string;
            ogDescription: string;
            ogImage: string | null;
            ogType: string;
            schemaType: string;
            schemaJson: string;
            sitemapEnabled: boolean;
            robotsIndex: boolean;
            robotsFollow: boolean;
            metaTitle: string;
            metaDescription: string;
            metaKeywords: string;
        };
        publishedAt: string;
        updatedAt: string;
        removeBranding: boolean;
    }>;
    listPublishedPublic(): Promise<{
        slug: string;
        title: string;
        updatedAt: Date;
        publishedAt: Date | null;
    }[]>;
    createPublicLead(slug: string, body: {
        formName?: string;
        formSection?: string;
        formPage?: string;
        fields?: Record<string, string>;
    }): Promise<{
        id: string;
        createdAt: Date;
    }>;
    listLeadsForOwner(ownerId: string): Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        siteTitle: string;
        siteSlug: string;
        formName: string;
        formSection: string;
        formPage: string | null;
        fields: Prisma.JsonValue;
        siteId: string;
    }[]>;
}
export {};
