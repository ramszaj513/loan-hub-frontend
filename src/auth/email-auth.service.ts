import { type User } from "@/types";

export const handleEmailLogin = async (email: string): Promise<User> => {
  // TODO: Implement email login with backend
  // Should validate the email and create/return a user

  console.log("Logging in with email:", email);

  // Placeholder implementation
  const user: User = {
    email: email,
    role: "User" as const,
    createdAt: new Date().toISOString(),
  };

  return user;
};
