import { google } from "googleapis";
import { getReportData } from "./report";
import { getAuthenticatedOAuth2Client } from "./adsense_auth";
(async () => {
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
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  console.log(await getReportData(adsense, yesterday));
})();
