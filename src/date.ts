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
  }).format(date);

  if (!withTime) {
    return formattedDate;
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${formattedDate}, ${hours}.${minutes} WIB`;
}
