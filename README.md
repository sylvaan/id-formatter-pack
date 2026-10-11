# 🇮🇩 id-formatter-pack

> A lightweight, zero-dependency TypeScript library for formatting Indonesian **Currency (Rupiah & Terbilang)**, **Dates**, and **Phone Numbers**.

[![npm version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/sylvaan/id-formatter-pack)
[![license](https://img.shields.io/badge/license-ISC-green.svg)](https://github.com/sylvaan/id-formatter-pack)

---

## 📦 Installation

```bash
npm install @sylvaan/id-formatter-pack
# or
npm install id-formatter-pack
```

---

## 🚀 Features & Usage

### 1. Format Mata Uang Rupiah (`formatRupiah`)

Format angka ke format standar mata uang Rupiah dengan opsi desimal dan simbol.

```typescript
import { formatRupiah } from "@sylvaan/id-formatter-pack";

// Standar
formatRupiah(50000);
// -> "Rp 50.000"

// Tanpa Simbol "Rp"
formatRupiah(50000, { withSymbol: false });
// -> "50.000"

// Dengan Desimal Sen
formatRupiah(50000, { withDecimal: true });
// -> "Rp 50.000,00"

// Menerima input string numerik
formatRupiah("1250000");
// -> "Rp 1.250.000"
```

---

### 2. Terbilang Angka ke Kata (`terbilang`)

Mengubah angka nominal menjadi ejaan kalimat Rupiah bahasa Indonesia secara otomatis.

```typescript
import { terbilang } from "@sylvaan/id-formatter-pack";

terbilang(150000);
// -> "Seratus Lima Puluh Ribu Rupiah"

terbilang(2500000);
// -> "Dua Juta Lima Ratus Ribu Rupiah"

terbilang(0);
// -> "Nol Rupiah"
```

---

### 3. Format Tanggal Indonesia (`formatIndoDate`)

Format objek `Date`, string ISO, atau timestamp ke penanggalan standar Indonesia.

```typescript
import { formatIndoDate } from "@sylvaan/id-formatter-pack";

// Default (Bulan Panjang)
formatIndoDate("2026-10-10");
// -> "10 Oktober 2026"

// Bulan Pendek
formatIndoDate("2026-10-10", { monthFormat: "short" });
// -> "10 Okt 2026"

// Dengan Waktu (WIB)
formatIndoDate(new Date(), { withTime: true });
// -> "11 Oktober 2026, 16.11 WIB"
```

---

### 4. Format Nomor Telepon Indonesia (`formatNoHP`)

Normalisasi input nomor HP yang berantakan menjadi format standar internasional (+62) atau lokal (08).

```typescript
import { formatNoHP } from "@sylvaan/id-formatter-pack";

// Default (+62 dengan strip)
formatNoHP("08123456789");
// -> "+62 812-3456-789"

// Format Lokal (08)
formatNoHP("08123456789", { withCountryCode: false });
// -> "0812-3456-789"

// Format Polos tanpa Strip
formatNoHP("08123456789", { pretty: false });
// -> "+628123456789"

// Menerima input kotor dengan spasi / karakter khusus
formatNoHP("+62 812 3456 7890");
// -> "+62 812-3456-7890"
```

---

## 🛠️ Tech Stack & Build

- **Language**: TypeScript
- **Bundler**: `tsup` (ESM & CJS + Type Declarations)

## 📄 License

ISC © [sylvaan](https://github.com/sylvaan)
