import { useAuth } from "@/auth/context/use-auth-context";
import type { User } from "@/types/user.type";

export function useHasRole(allowedRoles: User["role"] | User["role"][]) {
  const { user } = useAuth();

  if (!user) return false;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return roles.includes(user.role);
}

export function useIsAdmin() {
  const { user } = useAuth();
  return user?.role === "Admin";
}

export function useIsBankEmployee() {
  const { user } = useAuth();
  return user?.role === "BankEmployee";
}

export function useHasProfile() {
  const { user } = useAuth();
  return !!(user?.userData?.firstName && user?.userData?.lastName);
}
