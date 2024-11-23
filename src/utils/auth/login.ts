import { API_URL } from "@/src/constants/auth";
import { LoginCredentials, Session } from "@/src/types/auth";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const login = async (
  loginCredentials: LoginCredentials,
  cookies: ReadonlyRequestCookies
): Promise<Session> => {
  try {
    const response = await fetch(`${API_URL}/User/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCredentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    const { accessToken } = data;

    // TODO: Fetch currently logged in user from the server
    const user = {
      firstName: "John",
      lastName: "Doe",
      company: "Avalato AB",
      role: "superAdmin",
    };

    cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return { user, accessToken };
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};
