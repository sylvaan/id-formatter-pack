export interface FormatPhoneOptions {
  /**
   * Sertakan kode negara +62 di awal nomor.
   * - `true`: "+62 812-3456-789"
   * - `false`: "0812-3456-789"
   * @default true
   */
  withCountryCode?: boolean;

  /**
   * Gunakan pemisah strip "-" agar mudah dibaca.
   * @default true
   */
  pretty?: boolean;
}

/**
 * Format nomor telepon Indonesia.
 * Contoh: formatNoHP("08123456789") -> "+62 812-3456-789"
 */
export function formatNoHP(
  phone: string,
  options: FormatPhoneOptions = {},
): string {
  const { withCountryCode = true, pretty = true } = options;

  if (!phone) return "";

  let cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  } else if (cleaned.startsWith("8")) {
    cleaned = "62" + cleaned;
  }

  if (!cleaned.startsWith("62") || cleaned.length < 9) {
    return phone;
  }

  const subscriberNumber = cleaned.slice(2);

  const prefix = withCountryCode ? "+62 " : "0";

  if (!pretty) {
    return withCountryCode ? `+${cleaned}` : `0${subscriberNumber}`;
  }

  const part1 = subscriberNumber.slice(0, 3);
  const part2 = subscriberNumber.slice(3, 7);
  const part3 = subscriberNumber.slice(7);

  const formattedNumber = [part1, part2, part3].filter(Boolean).join("-");

  return `${prefix}${formattedNumber}`;
}
