import { google } from "googleapis";
import { oauth2 } from "googleapis/build/src/apis/oauth2";
function getAuthenticatedOAuth2Client(
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
const {
  installed: { client_id, client_secret, redirect_uri }
} = require("./client.json");
const { refresh_token } = require("./token.json");
const adsense = google.adsense({
  version: "v1.4",
  auth: getAuthenticatedOAuth2Client(
    client_id,
    client_secret,
    redirect_uri,
    refresh_token
  )
});
