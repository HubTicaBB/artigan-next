import { NextResponse } from "next/server";
import { API_URL } from "@/src/constants/auth";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const response = await fetch(`${API_URL}/User/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Login failed" }, { status: 401 });
    }

    const { token } = await response.json();

    const isSecure = process.env.NODE_ENV === "production";
    const responseHeaders = new Headers();
    responseHeaders.set(
      "Set-Cookie",
      `accessToken=${token}; HttpOnly; ${isSecure ? "Secure;" : ""} Path=/;`
    );

    return NextResponse.json({ success: true }, { headers: responseHeaders });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
