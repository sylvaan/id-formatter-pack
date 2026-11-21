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

  // `new Date(null)` is the epoch, not an invalid date, so guard explicitly.
  if (dateInput === null || dateInput === undefined) {
    return "Invalid Date";
  }

  // JavaScript silently rolls impossible calendar dates over
  // ("2026-02-31" becomes 3 March), so verify ISO date strings round-trip.
  if (typeof dateInput === "string") {
    const match = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const year = Number(match[1]);
      const month = Number(match[2]);
      const day = Number(match[3]);
      const probe = new Date(year, month - 1, day);
      if (
        probe.getFullYear() !== year ||
        probe.getMonth() !== month - 1 ||
        probe.getDate() !== day
      ) {
        return "Invalid Date";
      }
    }
  }

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
