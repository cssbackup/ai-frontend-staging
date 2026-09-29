import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService implements OnModuleInit {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    onModuleInit(): Promise<void>;
    private ensureAdminSeed;
    login(email: string, password: string): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: string;
        };
    }>;
    me(adminId: string): Promise<{
        role: string;
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        location: string | null;
        state: string | null;
        zip: string | null;
        avatarUrl: string | null;
    }>;
    updateProfile(adminId: string, data: {
        name?: string;
        email?: string;
        phone?: string;
        location?: string;
        state?: string;
        zip?: string;
        avatarUrl?: string;
    }): Promise<{
        role: string;
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        location: string | null;
        state: string | null;
        zip: string | null;
        avatarUrl: string | null;
    }>;
    changePassword(adminId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
}
