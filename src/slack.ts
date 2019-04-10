import axios from "axios";
import { Report } from "./report";
if (!process.env.SLACK_WEBHOOK_URL) {
  throw Error("SLACK_WEBHOOK_URL is not defined.");
}
const webhookUrl = process.env.SLACK_WEBHOOK_URL;

export async function notify(report: Report) {
  const date = new Date();
  if (
    date.getTime() ===
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime()
  )
    notifyMonthlyReport(report);
  else if (date.getDate() === 6) notifyWeeklyReport(report);
  else notifyDailyReport(report);
}

async function notifyDailyReport(report: Report) {
  const { today, lastWeekSameDay } = report;
  axios.post(webhookUrl, {
    text: `Daily Report: ${today.earnings} JPY / ${today.clicks} clicks / ${
      today.pageViews
    } views`
  });
}

async function notifyWeeklyReport(report: Report) {
  const { week, unpaid } = report;
  axios.post(webhookUrl, {
    text: `Weekly Report: ${week.earnings}JPY ${week.clicks} clicks ${
      week.pageViews
    } views / (unpaid: ${unpaid} JPY)`
  });
}

function notifyMonthlyReport(report: Report) {
  const { month } = report;
  axios.post(webhookUrl, {
    text: `Monthly Report: ${month.earnings}JPY ${month.clicks} clicks ${
      month.pageViews
    } views`
  });
}
