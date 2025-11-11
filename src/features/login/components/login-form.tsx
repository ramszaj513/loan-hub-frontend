import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/config/auth-config";
import { useAuth } from "@/hooks";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

function LoginForm() {
  const { instance } = useMsal();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);

      // Map Azure AD B2C user to your User type
      const user = {
        azureAdObjectId: response.account?.homeAccountId || "",
        email: response.account?.username || "",
        role: "User" as const, // You'll determine this from your backend
        createdAt: new Date().toISOString(),
      };

      login(user);

      // TODO: Send token to your backend to create/verify user
      console.log("Access Token:", response.accessToken);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Sign in with your Microsoft account</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleLogin} className="w-full">
          Sign In with Microsoft
        </Button>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
