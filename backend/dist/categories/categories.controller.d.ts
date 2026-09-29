import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
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
    create(body: {
        order?: number;
        name?: string;
        slug?: string;
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
    update(id: string, body: {
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
    remove(id?: string): Promise<{
        message: string;
    }>;
}
