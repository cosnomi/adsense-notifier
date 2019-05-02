import axios from "axios";
import { Report } from "./report";
import { getNotificationType } from "./notify_type";
if (!process.env.SLACK_WEBHOOK_URL) {
  throw Error("SLACK_WEBHOOK_URL is not defined.");
}
const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const slackUsername = "Adsense";

export async function notify(date: Date, report: Report) {
  const notifyType = await getNotificationType(date);
  if (notifyType === "monthly") await notifyMonthlyReport(report);
  else if (notifyType === "weekly") await notifyWeeklyReport(report);
  else await notifyDailyReport(report);
}

async function notifyDailyReport(report: Report) {
  const { today, lastWeekSameDay } = report;
  await axios.post(webhookUrl, {
    username: slackUsername,
    icon_url: process.env.SLACK_ICON_URL,
    text: `Daily Report: ${today.earnings} JPY / ${today.clicks} clicks / ${
      today.pageViews
    } views`
  });
}

async function notifyWeeklyReport(report: Report) {
  const { week, unpaid } = report;
  await axios.post(webhookUrl, {
    username: slackUsername,
    icon_url: process.env.SLACK_ICON_URL,
    text: `Weekly Report: ${week.earnings}JPY ${week.clicks} clicks ${
      week.pageViews
    } views / (unpaid: ${unpaid} JPY)`
  });
}

async function notifyMonthlyReport(report: Report) {
  const { month } = report;
  await axios.post(webhookUrl, {
    username: slackUsername,
    icon_url: process.env.SLACK_ICON_URL,
    text: `Monthly Report: ${month.earnings}JPY ${month.clicks} clicks ${
      month.pageViews
    } views`
  });
}
