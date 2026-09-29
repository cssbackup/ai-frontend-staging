import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email?: string;
        password?: string;
    }): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: string;
        };
    }>;
    me(req: {
        user: {
            sub: string;
        };
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
    updateProfile(req: {
        user: {
            sub: string;
        };
    }, body: {
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
    changePassword(req: {
        user: {
            sub: string;
        };
    }, body: {
        currentPassword?: string;
        newPassword?: string;
    }): Promise<{
        message: string;
    }>;
}
