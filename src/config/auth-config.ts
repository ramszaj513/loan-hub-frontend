import type { Configuration, PopupRequest } from "@azure/msal-browser";

// These values come from Azure AD B2C setup
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || "", // app's client ID
    authority: import.meta.env.VITE_AZURE_AUTHORITY || "", //  https://yourtenantname.b2clogin.com/yourtenantname.onmicrosoft.com/B2C_1_signupsignin
    knownAuthorities: [import.meta.env.VITE_AZURE_KNOWN_AUTHORITY || ""], // e.g., yourtenantname.b2clogin.com
    redirectUri: window.location.origin, // e.g., http://localhost:5173
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["openid", "profile", "email"],
};
