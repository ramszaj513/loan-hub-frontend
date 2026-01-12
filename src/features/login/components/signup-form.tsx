import { useState } from "react";
import { useAuth } from "@/hooks";
import { Button, Input, Separator } from "@/components/ui";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { handleGoogleLogin } from "@/auth/google-auth.service";
import { handleEmailRegister, handleEmailLogin } from "@/auth/email-auth.service";
import { Label } from "@/components/ui/label";

function SignupForm() {
  const { login, hideSignupModal } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGoogleSignupSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google");
      }
      const { user, token } = await handleGoogleLogin(credentialResponse.credential);
      login(user, token);
      hideSignupModal();
    } catch (err) {
      console.error("Google signup failed:", err);
      setError("Google signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username) return;

    setIsLoading(true);
    setError(null);
    try {
      await handleEmailRegister(email, password, username);
      const { user, token } = await handleEmailLogin(email, password);
      login(user, token);
      hideSignupModal();
    } catch (err) {
      console.error("Email signup failed:", err);
      setError(
        err instanceof Error ? err.message : "Signup failed. Please try again."
      );
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

      <form onSubmit={handleEmailSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-username">Username</Label>
          <Input
            id="signup-username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            autoComplete="username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="new-password"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !email || !password || !username}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
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
          onSuccess={onGoogleSignupSuccess}
          onError={() => {
            console.error("Google signup failed");
            setError("Google signup failed. Please try again.");
          }}
          theme="outline"
          shape="rectangular"
          width="400"
        />
      </div>
    </div>
  );
}

export default SignupForm;
