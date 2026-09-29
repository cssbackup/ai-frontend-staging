import { UserStateService } from './user-state.service';
export declare class UserStateController {
    private readonly userStateService;
    constructor(userStateService: UserStateService);
    getState(req: {
        user: {
            sub: string;
        };
    }): Promise<{
        siteSubscriptions: import("@prisma/client/runtime/library").JsonValue;
        purchasedAddons: import("@prisma/client/runtime/library").JsonValue;
        purchasedDomains: import("@prisma/client/runtime/library").JsonValue;
        domainConnections: import("@prisma/client/runtime/library").JsonValue;
    }>;
    saveState(req: {
        user: {
            sub: string;
        };
    }, body: {
        siteSubscriptions?: unknown;
        purchasedAddons?: unknown;
        purchasedDomains?: unknown;
        domainConnections?: unknown;
    }): Promise<{
        siteSubscriptions: import("@prisma/client/runtime/library").JsonValue;
        purchasedAddons: import("@prisma/client/runtime/library").JsonValue;
        purchasedDomains: import("@prisma/client/runtime/library").JsonValue;
        domainConnections: import("@prisma/client/runtime/library").JsonValue;
    }>;
    getRazorpay(req: {
        user: {
            sub: string;
        };
    }): Promise<{
        customerId: string | null;
        tokenIds: string[];
    }>;
    addRazorpayToken(req: {
        user: {
            sub: string;
        };
    }, body: {
        tokenId?: string;
        customerId?: string;
    }): Promise<{
        customerId: string | null;
        tokenIds: string[];
    }>;
    removeRazorpayToken(req: {
        user: {
            sub: string;
        };
    }, tokenId: string): Promise<{
        customerId: string | null;
        tokenIds: string[];
    }>;
    setRazorpayCustomer(req: {
        user: {
            sub: string;
        };
    }, body: {
        customerId?: string;
    }): Promise<{
        customerId: string | null;
        tokenIds: string[];
    }>;
}
