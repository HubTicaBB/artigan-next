import { Session } from "@/src/types/auth";
import { redirect } from "next/navigation";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { isAccessTokenValid } from "./isAccessTokenValid";

export const getSession = async (
  cookies: ReadonlyRequestCookies
): Promise<Session> => {
  const accessToken = cookies.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/");
  }

  try {
    if (!isAccessTokenValid(cookies)) {
      redirect("/");
    }

    // TODO: Fetch currently logged in user from the server
    const user = {
      firstName: "John",
      lastName: "Doe",
      company: "Avalato AB",
      role: "superAdmin",
    };

    return { user, accessToken };
  } catch (error) {
    console.error("Auth error", error);
    redirect("/");
  }
};
