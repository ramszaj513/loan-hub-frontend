import { type User } from "@/types";

export const handleGoogleLogin = async (token: string): Promise<User> => {
  const response = await fetch("https://your-api.com/api/auth/google-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ googleIdToken: token }),
  });

  if (!response.ok) {
    throw new Error("Backend verification failed");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);

  const user: User = {
    email: data.email,
    role: data.role, 
    createdAt: data.createdAt,
    profile: {
      id: data.profile.id,
      userId: data.profile.userId,
      firstName: data.profile.firstName,
      lastName: data.profile.lastName,
      avatarUrl: data.profile.picture,
    },
  };

  return user;
};
