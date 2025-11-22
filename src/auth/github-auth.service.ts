export const initiateGitHubLogin = (): void => {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

  if (!clientId) {
    throw new Error("GitHub Client ID is not configured");
  }

  const redirectUri = `${window.location.origin}/auth/github/callback`;
  const scope = "read:user user:email";

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  window.location.href = githubAuthUrl;
};

export const handleGitHubCallback = async (code: string): Promise<void> => {
  // TODO: Send code to your backend
  // Your backend will exchange it for an access token with GitHub
  // and return user data

  console.log("GitHub OAuth code:", code);
  throw new Error("GitHub callback handler not implemented yet");
};
