import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { MailDispatchService } from '../mail/mail-dispatch.service';
import { NotificationsService } from '../notifications/notifications.service';
type ProfileUpdateBody = {
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
};
export declare class UserAuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly mailDispatch;
    private readonly notifications;
    private readonly logger;
    private readonly loginOtps;
    constructor(prisma: PrismaService, jwt: JwtService, mailDispatch: MailDispatchService, notifications: NotificationsService);
    private notifyNewSignup;
    register(email: string, password: string, name?: string): Promise<{
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
    sendLoginOtp(email: string): Promise<{
        message: string;
    }>;
    verifyLoginOtp(email: string, code: string): Promise<{
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
    login(email: string, password: string): Promise<{
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
    oauthLogin(input: {
        provider: 'google' | 'apple';
        providerId: string;
        email: string;
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
    me(userId: string): Promise<{
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
    updateProfile(userId: string, body: ProfileUpdateBody): Promise<{
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
    private signToken;
}
export {};
