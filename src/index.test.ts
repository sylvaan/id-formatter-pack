import { describe, it, expect } from 'vitest';
import { formatIndoDate, formatRupiah, terbilang, formatNoHP } from './index';

describe('formatIndoDate', () => {
  it('should format date string correctly in long format', () => {
    expect(formatIndoDate('2026-10-10')).toBe('10 Oktober 2026');
  });

  it('should format date in short month format', () => {
    expect(formatIndoDate('2026-10-10', { monthFormat: 'short' })).toBe('10 Okt 2026');
  });

  it('should return Invalid Date for invalid inputs', () => {
    expect(formatIndoDate('invalid-date')).toBe('Invalid Date');
  });

  it('should return Invalid Date for null instead of the epoch date', () => {
    expect(formatIndoDate(null as unknown as Date)).toBe('Invalid Date');
  });

  it('should return Invalid Date for impossible calendar dates', () => {
    expect(formatIndoDate('2026-02-31')).toBe('Invalid Date');
  });
});

describe('formatRupiah', () => {
  it('should format number to Rupiah string', () => {
    expect(formatRupiah(50000)).toBe('Rp 50.000');
  });

  it('should format without symbol when withSymbol is false', () => {
    expect(formatRupiah(50000, { withSymbol: false })).toBe('50.000');
  });

  it('should format with decimal when withDecimal is true', () => {
    expect(formatRupiah(50000, { withDecimal: true })).toBe('Rp 50.000,00');
  });

  it('should parse string amounts using Indonesian separators', () => {
    expect(formatRupiah('50.000')).toBe('Rp 50.000');
    expect(formatRupiah('1,5', { withDecimal: true })).toBe('Rp 1,50');
  });

  it('should accept strings that carry the Rp symbol', () => {
    expect(formatRupiah('Rp 50000')).toBe('Rp 50.000');
  });

  it('should not partially parse strings with trailing junk', () => {
    expect(formatRupiah('12abc')).toBe('Rp 0');
  });

  it('should not format Infinity as a currency amount', () => {
    expect(formatRupiah(Infinity)).toBe('Rp 0');
  });

  it('should not print a negative sign for amounts that round to zero', () => {
    expect(formatRupiah(-0.4)).toBe('Rp 0');
  });
});

describe('terbilang', () => {
  it('should convert number to Indonesian words', () => {
    expect(terbilang(150000)).toBe('Seratus Lima Puluh Ribu Rupiah');
  });

  it('should handle zero correctly', () => {
    expect(terbilang(0)).toBe('Nol Rupiah');
  });

  it('should spell amounts below one rupiah as zero', () => {
    expect(terbilang(0.5)).toBe('Nol Rupiah');
    expect(terbilang(-0.5)).toBe('Nol Rupiah');
  });

  it('should not crash on Infinity', () => {
    expect(terbilang(Infinity)).toBe('Nol Rupiah');
  });
});

describe('formatNoHP', () => {
  it('should format Indonesian phone number with country code by default', () => {
    expect(formatNoHP('08123456789')).toBe('+62 812-3456-789');
  });

  it('should format local phone number when withCountryCode is false', () => {
    expect(formatNoHP('08123456789', { withCountryCode: false })).toBe('0812-3456-789');
  });

  it('should return unformatted phone number without pretty option', () => {
    expect(formatNoHP('08123456789', { pretty: false })).toBe('+628123456789');
  });

  it('should strip the trunk zero after the country code', () => {
    expect(formatNoHP('+62 0812 3456 789')).toBe('+62 812-3456-789');
  });

  it('should leave overly long numbers unformatted', () => {
    expect(formatNoHP('08123456789012345')).toBe('08123456789012345');
  });
});
