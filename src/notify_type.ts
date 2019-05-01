type NotifyType = "daily" | "weekly" | "monthly";

export async function getNotifyType(date: Date): Promise<NotifyType> {
  if (
    date.getTime() ===
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime()
  )
    return "monthly";
  else if (date.getDay() === 0) return "weekly";
  else return "daily";
}
