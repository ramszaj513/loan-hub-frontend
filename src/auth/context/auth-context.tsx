import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types";
import { AuthContext } from "./auth-context-definition";
import type { AuthContextValue } from "./auth-context-definition";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as User;
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function - sets user and stores in localStorage
  const login = (userData: User, token?: string) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  // Logout function - clears user and removes from localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Update user data
  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Update user data specifically
  const updateUserData = (userData: User["userData"]) => {
    if (user) {
      const updatedUser = { ...user, userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const showLoginModal = () => setIsLoginModalOpen(true);
  const hideLoginModal = () => setIsLoginModalOpen(false);

  const showSignupModal = () => setIsSignupModalOpen(true);
  const hideSignupModal = () => setIsSignupModalOpen(false);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
    updateUserData,
    showLoginModal,
    hideLoginModal,
    isLoginModalOpen,
    showSignupModal,
    hideSignupModal,
    isSignupModalOpen,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
