import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class AdminUsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboardSummary(): Promise<{
        totalUsers: number;
        totalSites: number;
        usersThisMonth: number;
        sitesThisMonth: number;
        aiInstantWeeklyOrders: {
            name: string;
            orders: number;
        }[];
        websiteOrdersOverview: {
            name: string;
            orders: number;
        }[];
        websiteOrdersMonthLabel: string;
        pendingPayments: number;
        pendingPaymentsThisMonth: number;
        activeSubscriptions: number;
        activeSubscriptionsThisMonth: number;
        supportTickets: number;
        supportTicketsThisMonth: number;
        flowBreakdown: {
            redesign: number;
            createAi: number;
            createCustom: number;
            unlabeled: number;
        };
    }>;
    private asConfigRecord;
    private inferSiteFlow;
    private asSubscriptionMap;
    private isActiveCoreSubscription;
    findAll(search?: string): Promise<{
        users: {
            lastUpdatedAt: Date;
            websiteCount: number;
            publishedWebsiteCount: number;
            draftWebsiteCount: number;
            createAiDesignCount: number;
            flows: {
                redesign: boolean;
                createAi: boolean;
                createCustom: boolean;
            };
            id: string;
            email: string;
            name: string | null;
            avatarUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            status: string;
        }[];
        stats: {
            totalUsers: number;
            activeUsers: number;
            inactiveUsers: number;
            totalSites: number;
            publishedSites: number;
            draftSites: number;
        };
    }>;
    findOne(userId: string): Promise<{
        sites: {
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
        }[];
        createAiDesigns: {
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
        }[];
        lastUpdatedAt: Date;
        websiteCount: number;
        publishedWebsiteCount: number;
        draftWebsiteCount: number;
        createAiDesignCount: number;
        plans: {
            siteId: string;
            siteTitle: string | null;
            siteSlug: string | null;
            planId: string;
            cycle: string | null;
            paymentId: string | null;
            orderId: string | null;
            upgradedAt: string | null;
            expiresAt: string | null;
            status: string;
        }[];
        addons: {
            siteId: string;
            siteTitle: string | null;
            siteSlug: string | null;
            addonId: string;
            label: string;
            cycle: string | null;
            paymentId: string | null;
            orderId: string | null;
            purchasedAt: string | null;
            expiresAt: string | null;
            cancelledAt: string | null;
            status: string;
        }[];
        exports: {
            siteId: string;
            siteTitle: string | null;
            siteSlug: string | null;
            format: string;
            downloadsRemaining: number;
            downloadsMax: number;
            paymentId: string | null;
            orderId: string | null;
            purchasedAt: string | null;
            amountInr: number | null;
            status: string;
        }[];
        domains: {
            id: string | null;
            domain: string;
            status: string;
            purchasedAt: string | null;
            expiresAt: string | null;
            autoRenew: boolean;
            price: string | null;
            siteId: string;
            siteTitle: string | null;
            siteSlug: string | null;
            connectionStatus: string | null;
        }[];
        domainConnections: {
            id: string | null;
            domain: string;
            method: string | null;
            status: string | null;
            siteId: string;
            siteTitle: string | null;
            siteSlug: string | null;
            createdAt: string | null;
            verifiedAt: string | null;
        }[];
        billingSummary: {
            activePlans: number;
            activeAddons: number;
            exportPurchases: number;
            domains: number;
            domainConnections: number;
            createAiDesigns: number;
        };
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        birthday: string | null;
        address: string | null;
    }>;
    updatePlan(userId: string, body: {
        action?: string;
        siteId?: string;
        cycle?: string;
        days?: number;
    }): Promise<{
        sites: {
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
        }[];
        createAiDesigns: {
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
        }[];
        lastUpdatedAt: Date;
        websiteCount: number;
        publishedWebsiteCount: number;
        draftWebsiteCount: number;
        createAiDesignCount: number;
        plans: {
            siteId: string;
            siteTitle: string | null;
            siteSlug: string | null;
            planId: string;
            cycle: string | null;
            paymentId: string | null;
            orderId: string | null;
            upgradedAt: string | null;
            expiresAt: string | null;
            status: string;
        }[];
        addons: {
            siteId: string;
            siteTitle: string | null;
            siteSlug: string | null;
            addonId: string;
            label: string;
            cycle: string | null;
            paymentId: string | null;
            orderId: string | null;
            purchasedAt: string | null;
            expiresAt: string | null;
            cancelledAt: string | null;
            status: string;
        }[];
        exports: {
            siteId: string;
            siteTitle: string | null;
            siteSlug: string | null;
            format: string;
            downloadsRemaining: number;
            downloadsMax: number;
            paymentId: string | null;
            orderId: string | null;
            purchasedAt: string | null;
            amountInr: number | null;
            status: string;
        }[];
        domains: {
            id: string | null;
            domain: string;
            status: string;
            purchasedAt: string | null;
            expiresAt: string | null;
            autoRenew: boolean;
            price: string | null;
            siteId: string;
            siteTitle: string | null;
            siteSlug: string | null;
            connectionStatus: string | null;
        }[];
        domainConnections: {
            id: string | null;
            domain: string;
            method: string | null;
            status: string | null;
            siteId: string;
            siteTitle: string | null;
            siteSlug: string | null;
            createdAt: string | null;
            verifiedAt: string | null;
        }[];
        billingSummary: {
            activePlans: number;
            activeAddons: number;
            exportPurchases: number;
            domains: number;
            domainConnections: number;
            createAiDesigns: number;
        };
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        birthday: string | null;
        address: string | null;
    }>;
    private asObjectArray;
    private addonLabel;
    updateStatus(userId: string, requestedStatus?: string): Promise<{
        id: string;
        updatedAt: Date;
        status: string;
    }>;
    remove(userId: string): Promise<{
        id: string;
        message: string;
    }>;
}
