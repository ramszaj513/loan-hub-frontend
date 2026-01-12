import { type User } from "@/types";

function parseJwt(token: string): { sub: string; email: string; preferred_username?: string; role: string; provider: string } {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export const handleGoogleLogin = async (idToken: string): Promise<{ user: User; token: string }> => {
  const baseUrl = import.meta.env.VITE_API_URL || "";

  try {
    const response = await fetch(`${baseUrl}/api/Auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error("Backend verification failed");
    }

    const data = await response.json();
    const token = data.token;

    localStorage.setItem("token", token);

    const claims = parseJwt(token);

    const user: User = {
      userId: claims.sub,
      email: claims.email,
      username: claims.preferred_username,
      role: claims.role as User["role"],
      userData: undefined,
    };

    return { user, token };
  } catch (err) {
    console.error("Fetch error inside service:", err);
    throw err;
  }
};
