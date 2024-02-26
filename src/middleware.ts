import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up", "/api/webhook", "/api/subscribe"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
