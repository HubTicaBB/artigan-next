import { NextRequest, NextResponse } from "next/server";
import { isAccessTokenValid } from "./src/utils/auth";

export function middleware(req: NextRequest) {
  // const accessToken = req.cookies.get("accessToken")?.value;
  // if (!accessToken) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  // try {
  //   if (!isAccessTokenValid()) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // } catch {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  // return NextResponse.next();
}

const allRoutesExceptApiAndStaticAssets = [
  "/((?!api|_next|static|favicon.ico).*)",
];
export const config = {
  matcher: [allRoutesExceptApiAndStaticAssets],
};
