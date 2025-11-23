export type UserRole = "User" | "BankEmployee" | "Admin";

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  income?: number;
  address?: string;
  dependents?: number;
}

export interface User {
  email: string;
  role: UserRole;
  createdAt: string;
  profile?: UserProfile;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
