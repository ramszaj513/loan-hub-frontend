import { useState } from "react";
import { useAuth } from "@/hooks";
import { Button, Input, Separator } from "@/components/ui";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { handleGoogleLogin } from "@/auth/google-auth.service";
import { handleEmailLogin } from "@/auth/email-auth.service";

function SignInForm() {
  const { login, hideLoginModal } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true);
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received from Google");
      }
      const user = await handleGoogleLogin(credentialResponse.credential);
      login(user, credentialResponse.credential);
      hideLoginModal();
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          Or
        </span>
      </div>

      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={onGoogleLoginSuccess}
          onError={() => console.error("Google login failed")}
          useOneTap
          theme="outline"
          shape="rectangular"
          width="400"
        />
      </div>
    </div>
  );
}

export default SignInForm;
