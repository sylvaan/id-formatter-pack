export interface FormatDateOptions {
  /**
   * Format bulan: 'long' (Oktober) atau 'short' (Okt).
   * @default 'long'
   */
  monthFormat?: "long" | "short";

  /**
   * Include jam dan menit (contoh: "10 Oktober 2026, 10.50 WIB")
   * @default false
   */
  withTime?: boolean;
}

export function formatIndoDate(
  dateInput: Date | string | number,
  options: FormatDateOptions = {},
): string {
  const { monthFormat = "long", withTime = false } = options;
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: monthFormat,
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);

  if (!withTime) {
    return formattedDate;
  }

  const time = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Jakarta",
  }).formatToParts(date);
  const hours = time.find((p) => p.type === "hour")!.value;
  const minutes = time.find((p) => p.type === "minute")!.value;

  return `${formattedDate}, ${hours}.${minutes} WIB`;
}
