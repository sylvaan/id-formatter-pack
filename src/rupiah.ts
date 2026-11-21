export interface FormatRupiahOptions {
  /**
   * Sertakan simbol "Rp " di depan nominal.
   * @default true
   */
  withSymbol?: boolean;

  /**
   * Sertakan 2 digit desimal (contoh: "Rp 50.000,00").
   * @default false
   */
  withDecimal?: boolean;
}

/**
 * Format angka ke mata uang Rupiah.
 * Contoh: formatRupiah(50000) -> "Rp 50.000"
 */
/**
 * Parse string amounts using Indonesian conventions: "." is the thousands
 * separator and "," is the decimal separator ("50.000" -> 50000, "1,5" -> 1.5).
 * A leading "Rp" is allowed. Anything that is not a well-formed amount
 * returns NaN instead of being partially parsed.
 */
function parseRupiahString(amount: string): number {
  const cleaned = amount.replace(/rp/gi, "").replace(/\s+/g, "");

  if (
    !/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(cleaned) &&
    !/^-?\d+(,\d+)?$/.test(cleaned)
  ) {
    return NaN;
  }

  return parseFloat(cleaned.replace(/\./g, "").replace(",", "."));
}

export function formatRupiah(
  amount: number | string,
  options: FormatRupiahOptions = {},
): string {
  const { withSymbol = true, withDecimal = false } = options;
  const num = typeof amount === "string" ? parseRupiahString(amount) : amount;

  if (isNaN(num) || !isFinite(num)) {
    return withSymbol ? "Rp 0" : "0";
  }

  // Avoid printing "-0" for small negative amounts that round to zero.
  const value = Number(num.toFixed(withDecimal ? 2 : 0)) === 0 ? 0 : num;

  const formatted = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: withDecimal ? 2 : 0,
    maximumFractionDigits: withDecimal ? 2 : 0,
  }).format(value);

  return withSymbol ? `Rp ${formatted}` : formatted;
}

/**
 * Konversi angka ke kalimat terbilang Rupiah.
 * Contoh: terbilang(150000) -> "Seratus Lima Puluh Ribu Rupiah"
 */
export function terbilang(amount: number): string {
  if (isNaN(amount) || !isFinite(amount)) {
    return "Nol Rupiah";
  }

  // Only whole rupiah are spelled out; an amount below one rupiah is zero.
  if (Math.floor(Math.abs(amount)) === 0) {
    return "Nol Rupiah";
  }

  if (amount < 0) {
    return `Minus ${terbilang(Math.abs(amount))}`;
  }

  const units = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];

  function toWords(n: number): string {
    if (n < 12) return units[n]!;
    if (n < 20) return `${toWords(n - 10)} Belas`;
    if (n < 100)
      return `${toWords(Math.floor(n / 10))} Puluh ${toWords(n % 10)}`.trim();
    if (n < 200) return `Seratus ${toWords(n - 100)}`.trim();
    if (n < 1000)
      return `${toWords(Math.floor(n / 100))} Ratus ${toWords(n % 100)}`.trim();
    if (n < 2000) return `Seribu ${toWords(n - 1000)}`.trim();
    if (n < 1000000)
      return `${toWords(Math.floor(n / 1000))} Ribu ${toWords(n % 1000)}`.trim();
    if (n < 1000000000)
      return `${toWords(Math.floor(n / 1000000))} Juta ${toWords(n % 1000000)}`.trim();
    if (n < 1000000000000)
      return `${toWords(Math.floor(n / 1000000000))} Miliar ${toWords(n % 1000000000)}`.trim();
    return `${toWords(Math.floor(n / 1000000000000))} Triliun ${toWords(n % 1000000000000)}`.trim();
  }

  const result = toWords(Math.floor(amount));
  return `${result} Rupiah`.replace(/\s+/g, " ").trim();
}
