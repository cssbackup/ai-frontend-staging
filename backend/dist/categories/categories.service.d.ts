import { PrismaService } from '../prisma/prisma.service';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        slug: string;
        icon: string | null;
        description: string | null;
        status: string;
    }[]>;
    create(data: {
        order?: number;
        name: string;
        slug: string;
        icon?: string;
        description?: string;
        status?: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        slug: string;
        icon: string | null;
        description: string | null;
        status: string;
    }>;
    update(id: string, data: {
        order?: number;
        name?: string;
        slug?: string;
        icon?: string | null;
        description?: string | null;
        status?: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        slug: string;
        icon: string | null;
        description: string | null;
        status: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
