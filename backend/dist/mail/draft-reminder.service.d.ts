import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailDispatchService } from './mail-dispatch.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class DraftReminderService implements OnModuleInit, OnModuleDestroy {
    private readonly prisma;
    private readonly mailDispatch;
    private readonly notifications;
    private readonly logger;
    private timer;
    private startTimer;
    private running;
    constructor(prisma: PrismaService, mailDispatch: MailDispatchService, notifications: NotificationsService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    private appOrigin;
    tick(): Promise<void>;
}
