import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
type PersistedUserState = {
    siteSubscriptions: Prisma.JsonValue;
    purchasedAddons: Prisma.JsonValue;
    purchasedDomains: Prisma.JsonValue;
    domainConnections: Prisma.JsonValue;
};
export declare class UserStateService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getState(userId: string): Promise<PersistedUserState>;
    saveState(userId: string, input: Partial<PersistedUserState>): Promise<PersistedUserState>;
    getRazorpayMeta(userId: string): Promise<{
        customerId: string | null;
        tokenIds: string[];
    }>;
    setRazorpayCustomerId(userId: string, customerId: string): Promise<{
        customerId: string | null;
        tokenIds: string[];
    }>;
    addRazorpayTokenId(userId: string, tokenId: string, customerId?: string | null): Promise<{
        customerId: string | null;
        tokenIds: string[];
    }>;
    removeRazorpayTokenId(userId: string, tokenId: string): Promise<{
        customerId: string | null;
        tokenIds: string[];
    }>;
}
export {};
