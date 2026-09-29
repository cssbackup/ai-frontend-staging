const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";
export const USER_TOKEN_COOKIE = "user_token";

export function getBackendUrl() {
  return BACKEND_URL;
}

/** Secure cookies only work on HTTPS — HTTP production (EC2 IP) must stay insecure. */
export function userAuthCookieOptions(maxAgeSeconds = 60 * 60 * 24 * 7) {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_PUBLISH_BASE_URL ||
    "";
  const forceSecure = process.env.COOKIE_SECURE === "true";
  const forceInsecure = process.env.COOKIE_SECURE === "false";
  const secure = forceInsecure
    ? false
    : forceSecure ||
      (process.env.NODE_ENV === "production" && /^https:/i.test(appUrl));

  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
