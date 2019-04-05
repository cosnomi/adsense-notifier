import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  "CLIENT_ID",
  "CLIENT_SECRET",
  "REDIRECT_URL"
);
const tokens = {}; // get from env var?
const scope = "https://www.googleapis.com/auth/adsense.readonly";
const key = "something";
oauth2Client.setCredentials(tokens);
const adsense = google.adsense({ version: "v1_4", auth: oauth2Client });
