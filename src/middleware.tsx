import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const userId = request.cookies.get('user_id')?.value
    console.log("user id", userId);
    console.log("pathname", request.nextUrl.pathname);

    if (request.nextUrl.pathname !== "/" && !request.nextUrl.pathname.startsWith("/images") && !request.nextUrl.pathname.startsWith("/style.css") && !request.nextUrl.pathname.startsWith("/script.js")) {
        if (userId && request.nextUrl.pathname.startsWith('/sign-in')) {
            return Response.redirect(new URL('/', request.url))
        }

        if (!userId && !request.nextUrl.pathname.startsWith('/sign-in')) {
            return Response.redirect(new URL(`/sign-in${request.nextUrl.pathname.length === 0 ? "" : `?redirect=${request.nextUrl.pathname.replaceAll("/", "")}`}`, request.url))
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|svg|.*\\.png$).*)'],
}