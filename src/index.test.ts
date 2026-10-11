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
});

describe('terbilang', () => {
  it('should convert number to Indonesian words', () => {
    expect(terbilang(150000)).toBe('Seratus Lima Puluh Ribu Rupiah');
  });

  it('should handle zero correctly', () => {
    expect(terbilang(0)).toBe('Nol Rupiah');
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
});
