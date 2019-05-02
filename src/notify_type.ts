type NotifyType = "daily" | "weekly" | "monthly";

export async function getNotificationType(date: Date): Promise<NotifyType> {
  if (
    date.getDate() ===
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  )
    return "monthly";
  // Yesterday is Saturday.
  else if (date.getDay() === 6) return "weekly";
  else return "daily";
}
