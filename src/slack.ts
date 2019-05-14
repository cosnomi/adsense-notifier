import axios from "axios";
import { Report } from "./report";
import { getNotificationType, NotifyType } from "./notify_type";
if (!process.env.SLACK_WEBHOOK_URL) {
  throw Error("SLACK_WEBHOOK_URL is not defined.");
}
const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const slackUsername = "Adsense";

export async function notify(report: Report, notifyType: NotifyType) {
  // If it is both the end of the week and the end of the month, 3 notif should be pushed to Slack.
  await notifyDailyReport(report);
  if (notifyType === "weekly") await notifyWeeklyReport(report);
  if (notifyType === "monthly") await notifyMonthlyReport(report);
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
