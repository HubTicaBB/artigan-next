import { NextResponse } from "next/server";
import { isAccessTokenValid } from "@/src/utils/auth/isAccessTokenValid";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  console.log("Cookies:", cookieStore.getAll());
  try {
    const cookiesHeader = request.headers.get("cookie");

    const cookies = Object.fromEntries(
      cookiesHeader?.split("; ").map((c) => c.split("=")) || []
    );

    const accessToken = cookies["accessToken"];

    if (!accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const isValid = await isAccessTokenValid(accessToken);
    if (!isValid) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // TODO: replace with real API call
    const user = {
      firstName: "John",
      lastName: "Doe",
      company: "Avalato AB",
      role: "superAdmin",
    };

    return NextResponse.json({ user, accessToken });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
