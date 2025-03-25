import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session and trying to access admin routes
  if (!session && req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.includes("/admin/login")) {
    const redirectUrl = new URL("/admin/login", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If session exists and trying to access login page
  if (session && req.nextUrl.pathname === "/admin/login") {
    const redirectUrl = new URL("/admin/dashboard", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}

