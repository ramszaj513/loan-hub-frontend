import { useState } from "react";
import { useAuth } from "@/hooks";
import { Button, Input, Separator } from "@/components/ui";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { handleGoogleLogin } from "@/auth/google-auth.service";
import type { User } from "@/types";

function SignupForm() {
  const { login, hideSignupModal } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onGoogleSignupSuccess = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google");
      }
      const user = await handleGoogleLogin(credentialResponse.credential);
      login(user, credentialResponse.credential);
      hideSignupModal();
    } catch (error) {
      console.error("Google signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async () => {
    if (!email || !password) return;

    setIsLoading(true);
    try {
      // TODO: Implement email signup with your backend
      console.log("Signing up with email:", email);

      // Placeholder implementation
        const user: User = {
            userId: '',
            email: '',
            role: 'User',
            createdAt: '',
            profile: {
              firstName: '',
              lastName: '',
            },
          };

      login(user);
      hideSignupModal();
    } catch (error) {
      console.error("Email signup failed:", error);
    } finally {
      setIsLoading(false);
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
          Or
        </span>
      </div>

      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={onGoogleSignupSuccess}
          onError={() => console.error("Google signup failed")}
          useOneTap
          theme="outline"
          shape="rectangular"
          width="400"
        />
      </div>
    </div>
  );
}

export default SignupForm;
