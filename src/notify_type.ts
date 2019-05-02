export type NotifyType = "daily" | "weekly" | "monthly";

export function getNotificationType(date: Date): NotifyType {
  if (
    date.getDate() ===
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  )
    return "monthly";
  // Yesterday is Saturday.
  else if (date.getDay() === 6) return "weekly";
  else return "daily";
}
