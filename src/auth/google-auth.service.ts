import { type User } from "@/types";

export const handleGoogleLogin = async (token: string): Promise<User> => {
  const baseUrl = import.meta.env.VITE_API_URL || "";
  console.log(token);

  try {
    const response = await fetch(`${baseUrl}/api/auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ IdToken: token }),
    });

    if (!response.ok) {
      throw new Error("Backend verification failed");
    }

    const data = await response.json();

    localStorage.setItem("token", data.Token);

    const user: User = {
      userId: data.id,
      email: data.email,
      role: data.role,
      createdAt: data.createdAt,
      profile: {
        firstName: data.profile.firstName,
        lastName: data.profile.lastName,
        income: data.profile.income ?? null,
      },
    };

    return user;
  } catch (err) {
    console.error("Fetch error inside service:", err);
    throw err;
  }
};
