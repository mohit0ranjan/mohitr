
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdmin = nextUrl.pathname.startsWith('/admin')
            const isOnLogin = nextUrl.pathname.startsWith('/admin/login')

            if (isOnAdmin) {
                if (isOnLogin) return true // Always allow access to login page
                if (isLoggedIn) return true // Allow access if logged in
                return false // Redirect unauthenticated users to login page
            }

            // Allow access to all other routes
            return true
        },
        async session({ session, token }) {
            if (token?.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
        async jwt({ token }) {
            return token
        }
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig
