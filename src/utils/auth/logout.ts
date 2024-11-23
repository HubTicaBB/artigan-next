import { API_URL } from "@/src/constants/auth";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const logout = async (cookies: ReadonlyRequestCookies) => {
  try {
    const accessToken = cookies.get("accessToken")?.value;

    if (accessToken) {
      await fetch(`${API_URL}/User/revoke-refreshToken`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }

    cookies.delete("accessToken");
  } catch (error) {
    console.error("Logout error", error);
  }
};
