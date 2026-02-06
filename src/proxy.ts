import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")
    const isLoginRoute = req.nextUrl.pathname.startsWith("/login")

    if (isOnAdmin) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.nextUrl))
        }
    }

    if (isLoginRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
