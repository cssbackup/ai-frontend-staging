import { UserAuthService } from './user-auth.service';
export declare class UserAuthController {
    private readonly userAuthService;
    constructor(userAuthService: UserAuthService);
    register(body: {
        email?: string;
        password?: string;
        name?: string;
    }): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            phone: string | null;
            location: string | null;
            avatarUrl: string | null;
            gender: string | null;
            birthday: string | null;
            nationality: string | null;
            address: string | null;
        };
        isNewUser: boolean;
    }>;
    login(body: {
        email?: string;
        password?: string;
    }): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            avatarUrl: string | null;
            gender: string | null;
            birthday: string | null;
            phone: string | null;
            nationality: string | null;
            location: string | null;
            address: string | null;
        };
    }>;
    sendLoginOtp(body: {
        email?: string;
    }): Promise<{
        message: string;
    }>;
    verifyLoginOtp(body: {
        email?: string;
        code?: string;
    }): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            avatarUrl: string | null;
            gender: string | null;
            birthday: string | null;
            phone: string | null;
            nationality: string | null;
            location: string | null;
            address: string | null;
        };
        isNewUser: boolean;
    }>;
    oauth(body: {
        provider?: 'google' | 'apple';
        providerId?: string;
        email?: string;
        name?: string | null;
        avatarUrl?: string | null;
    }): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            avatarUrl: string | null;
            gender: string | null;
            birthday: string | null;
            phone: string | null;
            nationality: string | null;
            location: string | null;
            address: string | null;
        };
        isNewUser: boolean;
    }>;
    me(req: {
        user: {
            sub: string;
        };
    }): Promise<{
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
        location: string | null;
        avatarUrl: string | null;
        createdAt: Date;
        gender: string | null;
        birthday: string | null;
        nationality: string | null;
        address: string | null;
    }>;
    updateProfile(req: {
        user: {
            sub: string;
        };
    }, body: {
        name?: string;
        avatarUrl?: string | null;
        gender?: string | null;
        birthday?: string | null;
        phone?: string | null;
        nationality?: string | null;
        location?: string | null;
        address?: string | null;
        currentPassword?: string;
        newPassword?: string;
    }): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            phone: string | null;
            location: string | null;
            avatarUrl: string | null;
            gender: string | null;
            birthday: string | null;
            nationality: string | null;
            address: string | null;
        };
    }>;
}
