import type SMTPTransport from 'nodemailer/lib/smtp-transport';
export type SmtpTransportInput = {
    host: string;
    port: number;
    secure?: boolean;
    username: string;
    password: string;
};
export declare function buildSmtpTransportOptions(input: SmtpTransportInput): SMTPTransport.Options;
export declare function describeSmtpEncryption(port: number, secureFlag: boolean): {
    encrypted: boolean;
    mode: string;
    detail: string;
};
export declare function normalizeSmtpSecure(port: number, secure?: boolean): boolean;
