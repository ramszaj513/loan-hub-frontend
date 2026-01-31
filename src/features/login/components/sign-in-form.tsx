import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks";
import { Button, Input, Separator } from "@/components/ui";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { handleGoogleLogin } from "@/auth/google-auth.service";
import { handleEmailLogin } from "@/auth/email-auth.service";
import { Label } from "@/components/ui/label";
import { getUserData } from "@/features/profile/api/user-data.api";

function SignInForm() {
  const { login, hideLoginModal } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google");
      }
      const { user, token } = await handleGoogleLogin(credentialResponse.credential);
      
      // Fetch user profile data
      localStorage.setItem("token", token); // Token needed for getUserData
      try {
        const userData = await getUserData();
        if (userData) {
          user.userData = { ...userData, id: user.userId, userId: user.userId };
        }
      } catch (profileError) {
        console.warn("Failed to fetch user profile:", profileError);
      }

      login(user, token);
      hideLoginModal();
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError(null);
    try {
      if (email === "admin@admin.com" && password === "adminpassword") {
        sessionStorage.setItem("isAdmin", "true");
        hideLoginModal();
        navigate("/admin");
        return;
      }

      const { user, token } = await handleEmailLogin(email, password);
      
      localStorage.setItem("token", token);
      try {
        const userData = await getUserData();
        if (userData) {
           user.userData = { ...userData, id: user.userId, userId: user.userId };
        }
      } catch (profileError) {
        console.warn("Failed to fetch user profile:", profileError);
      }

      login(user, token);
      hideLoginModal();
    } catch (err) {
      console.error("Email login failed:", err);
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email">Email</Label>
          <Input
            id="signin-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signin-password">Password</Label>
          <Input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="current-password"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !email || !password}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          Or
        </span>
      </div>

      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={onGoogleLoginSuccess}
          onError={() => {
            console.error("Google login failed");
            setError("Google login failed. Please try again.");
          }}
          theme={isDark ? "filled_black" : "outline"}
          shape="rectangular"
          width="400"
        />
      </div>
    </div>
  );
}

export default SignInForm;
