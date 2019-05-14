import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env);
(async () => {
  const lambda_handler = (await import("./index")).lambda_handler;
  await lambda_handler(undefined, undefined);
})();
