import { type User } from "@/types/user";

interface GoogleUserInfo {
  sub: string;
  email: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

export const handleGoogleLogin = async (accessToken: string): Promise<User> => {
  // Get user info from Google
  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!userInfoResponse.ok) {
    throw new Error("Failed to fetch Google user info");
  }

  const userInfo: GoogleUserInfo = await userInfoResponse.json();

  // TODO: Send accessToken to your backend for verification
  // Your backend should verify the token and create/return a user

  // Map Google user info to your User type
  const user: User = {
    email: userInfo.email,
    role: "User" as const,
    createdAt: new Date().toISOString(),
    profile: {
      id: userInfo.sub,
      userId: userInfo.sub,
      firstName: userInfo.given_name || "",
      lastName: userInfo.family_name || "",
      avatarUrl: userInfo.picture,
    },
  };

  return user;
};
