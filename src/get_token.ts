import { google } from "googleapis";
import { question } from "readline-sync";
import { Credentials } from "google-auth-library";
import * as fs from "fs";
async function get_token(
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  scopes: string | string[]
): Promise<Credentials> {
  const oauth2 = new google.auth.OAuth2({
    clientId,
    clientSecret,
    redirectUri
  });
  const url = oauth2.generateAuthUrl({
    access_type: "offline",
    scope: scopes
  });
  console.log(url);
  const code = question();
  const { tokens } = await oauth2.getToken(code);
  return tokens;
}
async function main() {
  const { installed } = require("./client.json");
  const { client_id, client_secret, redirect_uris } = installed;
  fs.writeFileSync(
    ".token.json",
    JSON.stringify(
      await get_token(
        client_id,
        client_secret,
        redirect_uris[1],
        "https://www.googleapis.com/auth/adsense.readonly"
      )
    )
  );
}
main();
