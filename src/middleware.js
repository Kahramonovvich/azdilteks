import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["uz", "ru"];
const defaultLocale = "uz";

export function middleware(req) {
    const url = req.nextUrl.clone();
    const path = url.pathname;

    const token = req.cookies.get("token")?.value || "";

    const currentLocale =
        locales.find((l) => path === `/${l}` || path.startsWith(`/${l}/`)) ||
        defaultLocale;

    const isAuthPage = /^\/(uz|ru)\/(login|register|forgot-password)$/.test(path);

    const isPublicFile =
        PUBLIC_FILE.test(path) ||
        path.startsWith("/api") ||
        path.startsWith("/_next");

    const isAdminPath =
        path === "/admin" ||
        new RegExp(`^\\/(?:${locales.join("|")})\\/admin(?:\\/|$)?`).test(path);

    if (isAdminPath && !token) {
        url.pathname = `/${currentLocale}/login`;
        return NextResponse.redirect(url);
    };

    if (token && isAuthPage) {
        url.pathname = `/${currentLocale}/admin`;
        return NextResponse.redirect(url);
    };

    const missingLocale = locales.every(
        (l) => !path.startsWith(`/${l}`) && path !== `/${l}`
    );

    if (!isPublicFile && missingLocale) {
        url.pathname = `/${defaultLocale}${path}`;
        return NextResponse.redirect(url);
    };

    return NextResponse.next();
};

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};