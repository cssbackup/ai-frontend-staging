"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSmtpTransportOptions = buildSmtpTransportOptions;
exports.describeSmtpEncryption = describeSmtpEncryption;
exports.normalizeSmtpSecure = normalizeSmtpSecure;
function buildSmtpTransportOptions(input) {
    const port = Math.floor(input.port);
    const secure = port === 465 ? true : port === 587 ? false : Boolean(input.secure);
    return {
        host: input.host,
        port,
        secure,
        requireTLS: !secure,
        tls: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true,
        },
        auth: {
            user: input.username,
            pass: input.password,
        },
    };
}
function describeSmtpEncryption(port, secureFlag) {
    if (port === 465 || secureFlag) {
        return {
            encrypted: true,
            mode: 'SSL/TLS',
            detail: 'Connection uses TLS from the start (port 465).',
        };
    }
    if (port === 587) {
        return {
            encrypted: true,
            mode: 'STARTTLS',
            detail: 'Connection upgrades to TLS via STARTTLS (port 587).',
        };
    }
    return {
        encrypted: !secureFlag ? true : Boolean(secureFlag),
        mode: secureFlag ? 'SSL/TLS' : 'STARTTLS',
        detail: secureFlag
            ? 'Connection uses TLS from the start.'
            : 'Connection upgrades to TLS via STARTTLS.',
    };
}
function normalizeSmtpSecure(port, secure) {
    if (port === 465)
        return true;
    if (port === 587)
        return false;
    return Boolean(secure);
}
//# sourceMappingURL=smtp-transport.js.map