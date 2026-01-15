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

export const handleEmailRegister = async (
  email: string,
  password: string,
  username: string
): Promise<string> => {
  const baseUrl = import.meta.env.VITE_API_URL || "";

  const response = await fetch(`${baseUrl}/api/Auth/email-register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("User with this email already exists.");
    }
    throw new Error(`Registration failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.token;
};

export const handleEmailLogin = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const baseUrl = import.meta.env.VITE_API_URL || "";

  const response = await fetch(`${baseUrl}/api/Auth/email-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid email or password.");
    }
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const data = await response.json();
  const token = data.token;

  localStorage.setItem("token", token);

  // Decode JWT to get user info
  const claims = parseJwt(token);

  const user: User = {
    userId: claims.sub,
    email: claims.email,
    username: claims.preferred_username,
    role: claims.role as User["role"],
    userData: undefined,
  };

  return { user, token };
};
