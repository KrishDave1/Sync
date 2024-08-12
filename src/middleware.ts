/** @format */

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const isAuth = await getToken({ req });
    const isLoginPage = pathname.startsWith("/login");

    const sensitiveRoutes = ["/dashboard"];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      if (isAuth) {
        return Response.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next(); // Continue to the next middleware
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return Response.redirect(new URL("/login", req.url));
    }

    if (pathname === "/") {
      return Response.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true; // Allow all users to access the route,all which is not protected also.A workaround to avoid infinite redirect loop
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
