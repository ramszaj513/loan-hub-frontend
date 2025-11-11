export type UserRole = "User" | "BankEmployee" | "Admin";

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  income?: number;
  address?: string;
  dependents?: number;
}

export interface User {
  azureAdObjectId: string;
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
