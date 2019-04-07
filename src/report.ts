import { adsense_v1_4 } from "googleapis";
import { formatDate } from "./util";
export type DailyReportItem = {
  earnings: number;
  clicks: number;
  pageViews: number;
};
export type WeeklyReportItem = {} & DailyReportItem; // A weekly report shows the totals of this month so far.
export type MonthlyReportItem = WeeklyReportItem;

export type Report = {
  today: DailyReportItem;
  lastWeekSameDay: DailyReportItem;
  week: WeeklyReportItem;
  month: MonthlyReportItem;
  unpaid: any;
};

export async function getReportData(
  adsense: adsense_v1_4.Adsense,
  date: Date
): Promise<Report> {
  const firstDayOfLastMonth = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    1
  );
  const lastDayOfThisMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  );
  const firstDayofThisWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay()
  ); // Sunday
  const rowList = (await adsense.reports.generate({
    useTimezoneReporting: true,
    startDate: formatDate(firstDayOfLastMonth),
    endDate: formatDate(lastDayOfThisMonth),
    dimension: ["MONTH", "WEEK", "DATE"],
    metric: ["EARNINGS", "CLICKS", "PAGE_VIEWS"]
  })).data.rows;
  if (!rowList) throw Error(`Cannot get day report on ${formatDate(date)}`);
  const weeklyReport: WeeklyReportItem = {
    earnings: 0,
    clicks: 0,
    pageViews: 0
  };
  const monthlyReport: MonthlyReportItem = {
    earnings: 0,
    clicks: 0,
    pageViews: 0
  };
  let dailyReport: DailyReportItem | undefined;
  let lastWeekSameDay: DailyReportItem | undefined;
  for (let row of rowList) {
    const [month, week, day, earnings, clicks, pageViews] = row;
    if (
      month ===
      formatDate(date)
        .split("-")
        .slice(0, 2)
        .join("-")
    ) {
      monthlyReport.earnings += parseInt(earnings);
      monthlyReport.clicks += parseInt(clicks);
      monthlyReport.pageViews += parseInt(pageViews);
    }
    if (week === formatDate(firstDayofThisWeek)) {
      weeklyReport.earnings += parseInt(earnings);
      weeklyReport.clicks += parseInt(clicks);
      weeklyReport.pageViews += parseInt(pageViews);
    }
    if (day === formatDate(date)) {
      dailyReport = {
        earnings: parseInt(earnings),
        clicks: parseInt(clicks),
        pageViews: parseInt(pageViews)
      };
    }
    if (
      day ===
      formatDate(
        new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
      )
    ) {
      lastWeekSameDay = {
        earnings: parseInt(earnings),
        clicks: parseInt(clicks),
        pageViews: parseInt(pageViews)
      };
    }
  }
  if (!dailyReport) throw Error("No data for today");
  if (!lastWeekSameDay) throw Error("No data for same day in last week");
  return {
    month: monthlyReport,
    week: weeklyReport,
    today: dailyReport,
    lastWeekSameDay,
    unpaid: await getUnpaid(adsense) // TODO
  };
}
async function getUnpaid(adsense: adsense_v1_4.Adsense): Promise<number> {
  const paymentItems = (await adsense.payments.list()).data.items;
  if (!paymentItems) throw Error("Cannot fetch payment data");
  return paymentItems.reduce((prev, current) => {
    if (current.id === "unpaid") {
      if (!current.paymentAmount) {
        console.error("No paymentAmount column");
        return prev;
      }
      return prev + parseInt(current.paymentAmount);
    }
    return prev;
  }, 0);
}
