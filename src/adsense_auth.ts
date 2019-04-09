import { google } from "googleapis";
export function getAuthenticatedOAuth2Client(
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  refreshToken: string
) {
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );
  const tokens = {}; // get from env var?
  const scope = "https://www.googleapis.com/auth/adsense.readonly";
  const key = "something";
  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });
  return oauth2Client;
}
