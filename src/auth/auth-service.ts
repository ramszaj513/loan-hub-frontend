import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/config/auth-config";

const msalInstance = new PublicClientApplication(msalConfig);

export const login = async () => {
  try {
    const response = await msalInstance.loginPopup({
      scopes: ["openid", "profile", "email"],
    });

    // Send authorization code to YOUR backend
    const backendResponse = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authCode: response.code,
        azureObjectId: response.account.homeAccountId,
      }),
    });

    const { token, user } = await backendResponse.json();

    // Store token securely
    localStorage.setItem("token", token);
    return user;
  } catch (error) {
    console.error("Login failed", error);
  }
};
