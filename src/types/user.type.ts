export type UserRole = "User" | "BankEmployee" | "Admin";

export interface UserProfile {
  
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  income?: number;
  address?: string;
  dependents?: number;
}

export interface User {
  userId: string;
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
