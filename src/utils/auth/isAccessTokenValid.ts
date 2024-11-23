import { jwtDecode } from "jwt-decode";

export const isAccessTokenValid = async (
  accessToken: string
): Promise<boolean> => {
  try {
    const decodedToken = jwtDecode(accessToken);
    return !!decodedToken.exp && decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    console.error("Invalid access token", error);
    return false;
  }
};
