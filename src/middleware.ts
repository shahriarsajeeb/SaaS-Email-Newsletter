import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

// export function middleware(req: NextRequest, event: NextFetchEvent) {
//   // Create a response object for OPTIONS requests or a default response for others
//   let response = req.method === "OPTIONS" ? new NextResponse(null, {
//     status: 204,
//     headers: {
//       "Access-Control-Allow-Origin": "*", // Adjust as necessary
//       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   }) : NextResponse.next();

//   // Ensure CORS headers are applied to all responses, not just OPTIONS
//   if (req.method !== "OPTIONS") {
//     response.headers.set("Access-Control-Allow-Origin", "*");
//     response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
//     response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   }

//   return response;
// }

export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up", "/api/webhook", "/api/subscribe"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
