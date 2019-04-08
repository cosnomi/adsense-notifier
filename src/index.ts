import { getReportData } from "./report";
(async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  console.log(await getReportData(adsense, yesterday));
})();
