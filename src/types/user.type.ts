export type UserRole = "User" | "BankEmployee" | "Admin";

export interface UserData {
  id?: string;
  userId?: string;
  // Personal Data
  firstName: string;
  lastName: string;
  birthDate: string;
  avatarUrl?: string;
  // Government Document
  governmentDocumentTypeId: number;
  governmentDocumentNumber: string;
  // Job Details
  jobTypeId: number;
  jobStartDate: string;
  jobEndDate?: string | null;
  // Income
  incomeAmount: number;
  incomeCurrency: string;
}

export interface User {
  userId: string;
  email: string;
  username?: string;
  role: UserRole;
  userData?: UserData;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
