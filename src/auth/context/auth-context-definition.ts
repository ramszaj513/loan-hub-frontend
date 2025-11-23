import { createContext } from "react";
import type { User, AuthState } from "@/types/user";

export interface AuthContextValue extends AuthState {
  login: (user: User, token?: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  updateProfile: (profile: User["profile"]) => void;
  showLoginModal: () => void;
  hideLoginModal: () => void;
  isLoginModalOpen: boolean;
  showSignupModal: () => void;
  hideSignupModal: () => void;
  isSignupModalOpen: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
