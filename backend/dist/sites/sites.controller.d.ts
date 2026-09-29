import { SitesService } from './sites.service';
export declare class SitesController {
    private readonly sitesService;
    constructor(sitesService: SitesService);
    listMine(req: {
        user: {
            sub: string;
        };
    }): Promise<{
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
    listPublished(): Promise<{
        slug: string;
        title: string;
        updatedAt: Date;
        publishedAt: Date | null;
    }[]>;
    findPublished(slug: string): Promise<{
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
    createPublicLead(slug: string, body: {
        formName?: string;
        formSection?: string;
        formPage?: string;
        fields?: Record<string, string>;
    }): Promise<{
        id: string;
        createdAt: Date;
    }>;
    listLeadsMine(req: {
        user: {
            sub: string;
        };
    }): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        siteTitle: string;
        siteSlug: string;
        formName: string;
        formSection: string;
        formPage: string | null;
        fields: import("@prisma/client/runtime/library").JsonValue;
        siteId: string;
    }[]>;
    updateTitle(req: {
        user: {
            sub: string;
        };
    }, id: string, body: {
        title?: string;
    }): Promise<{
        id: string;
        updatedAt: Date;
        slug: string;
        title: string;
    }>;
    updateSlug(req: {
        user: {
            sub: string;
        };
    }, id: string, body: {
        slug?: string;
    }): Promise<{
        id: string;
        slug: string;
        status: string;
        published: boolean;
    }>;
    findMine(req: {
        user: {
            sub: string;
        };
    }, id: string): Promise<{
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
    remove(req: {
        user: {
            sub: string;
        };
    }, id: string): Promise<{
        message: string;
        id: string;
    }>;
    migrate(req: {
        user: {
            sub: string;
        };
    }, body: {
        title?: string;
        templateId?: string;
        category?: string;
        siteId?: string;
        config?: {
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
        };
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
        config: import("@prisma/client/runtime/library").JsonValue | null;
        ownerId: string;
    }>;
    publish(req: {
        user: {
            sub: string;
        };
    }, id: string): Promise<{
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
        config: import("@prisma/client/runtime/library").JsonValue | null;
        ownerId: string;
    }>;
}
