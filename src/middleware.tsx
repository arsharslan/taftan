import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const userId = request.cookies.get('user_id')?.value
    console.log("user id", userId);
    console.log("pathname", request.nextUrl.pathname);

    if (request.nextUrl.pathname !== "/" && allowedUrls.every((x) => !request.nextUrl.pathname.startsWith(x))) {
        if (userId && request.nextUrl.pathname.startsWith('/sign-in')) {
            return Response.redirect(new URL('/', request.url))
        }

        if (!userId && !request.nextUrl.pathname.startsWith('/sign-in')) {
            return Response.redirect(new URL(`/sign-in${request.nextUrl.pathname.length === 0 ? "" : `?redirect=${request.nextUrl.pathname.replaceAll("/", "")}`}`, request.url))
        }
    }
}

const allowedUrls = [
    // "/",
    "/sign-up",
    "/onboard",
    "/images",
    "/style.css",
    "/script.js",
    "/about-us",
    "/contact-us",
    "/catering-venue",
    "/catering-corporate",
    "/catering-home",
    "/catering-wedding",
    "/culinary-delights",
    "/online-order"
];

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|svg|.*\\.png$).*)'],
}