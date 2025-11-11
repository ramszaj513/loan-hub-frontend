import { createContext } from "react";
import type { User, AuthState } from "@/types/user";

export interface AuthContextValue extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  updateProfile: (profile: User["profile"]) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
