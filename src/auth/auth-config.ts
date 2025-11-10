import type { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://${import.meta.env.VITE_AZURE_TENANT}.b2clogin.com/${
      import.meta.env.VITE_AZURE_TENANT
    }.onmicrosoft.com/${import.meta.env.VITE_AZURE_POLICY}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage", // or 'localStorage'
    storeAuthStateInCookie: false,
  },
};
