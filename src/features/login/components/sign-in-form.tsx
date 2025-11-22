import { useState } from "react";
import { useAuth } from "@/hooks";
import { Button, Input, Separator } from "@/components/ui";
import { GoogleIcon } from "@/components/icons/google-icon";
import { GitHubIcon } from "@/components/icons/github-icon";
import { useGoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "@/auth/google-auth.service";
import { handleEmailLogin } from "@/auth/email-auth.service";
import { initiateGitHubLogin } from "@/auth/github-auth.service";

function SignInForm() {
  const { login, hideLoginModal } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const user = await handleGoogleLogin(tokenResponse.access_token);
        login(user, tokenResponse.access_token);
        hideLoginModal();
      } catch (error) {
        console.error("Google login failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
    },
  });

  const handleEmailSubmit = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      const user = await handleEmailLogin(email);
      login(user);
      hideLoginModal();
    } catch (error) {
      console.error("Email login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHub = () => {
    try {
      initiateGitHubLogin();
    } catch (error) {
      console.error("GitHub login failed:", error);
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
        onClick={handleEmailSubmit}
        className="w-full"
        disabled={isLoading || !email || !password}
      >
        Sign In
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
          onClick={() => googleLogin()}
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

export default SignInForm;
