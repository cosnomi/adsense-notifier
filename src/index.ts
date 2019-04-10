import { google } from "googleapis";
import { getReportData } from "./report";
import { getAuthenticatedOAuth2Client } from "./adsense_auth";
import { notify } from "./slack";

export async function lambda_handler(event: any, context: any) {
  if (
    !process.env.CLIENT_ID ||
    !process.env.CLIENT_SECRET ||
    !process.env.REDIRECT_URI
  ) {
    throw new Error("No client config");
  }
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const redirect_uri = process.env.REDIRECT_URI;

  if (!process.env.REFRESH_TOKEN) {
    throw new Error("No REFRESH_TOKEN");
  }
  const refresh_token = process.env.REFRESH_TOKEN;
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
  const report = await getReportData(adsense, yesterday);
  await notify(report);
}
