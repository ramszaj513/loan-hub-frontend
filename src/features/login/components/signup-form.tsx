import { useState } from "react";
import { useAuth } from "@/hooks";
import { Button, Input, Separator } from "@/components/ui";
import { GoogleIcon } from "@/components/icons/google-icon";
import { GitHubIcon } from "@/components/icons/github-icon";
import { useGoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "@/auth/google-auth.service";
import { initiateGitHubLogin } from "@/auth/github-auth.service";

function SignupForm() {
  const { login, hideSignupModal } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const user = await handleGoogleLogin(tokenResponse.access_token);
        login(user, tokenResponse.access_token);
        hideSignupModal();
      } catch (error) {
        console.error("Google signup failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google signup failed:", error);
    },
  });

  const handleEmailSignup = async () => {
    if (!email || !password) return;

    setIsLoading(true);
    try {
      // TODO: Implement email signup with your backend
      console.log("Signing up with email:", email);

      const user = {
        email: email,
        role: "User" as const,
        createdAt: new Date().toISOString(),
      };

      login(user);
      hideSignupModal();
    } catch (error) {
      console.error("Email signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHub = () => {
    try {
      initiateGitHubLogin();
    } catch (error) {
      console.error("GitHub signup failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />

      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />

      <Button
        onClick={handleEmailSignup}
        className="w-full"
        disabled={isLoading || !email || !password}
      >
        Sign Up
      </Button>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          Or continue with
        </span>
      </div>

      <div className="grid grid-rows-2 gap-4">
        <Button
          variant="outline"
          onClick={() => googleSignup()}
          disabled={isLoading}
        >
          <GoogleIcon />
          Google
        </Button>
        <Button variant="outline" onClick={handleGitHub} disabled={isLoading}>
          <GitHubIcon />
          GitHub
        </Button>
      </div>
    </div>
  );
}

export default SignupForm;
