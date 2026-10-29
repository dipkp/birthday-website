(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e2) {
      throw err = [e2], e2;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // assets/_astro/config.DBa5QnYF.js
  function o3(e2) {
    return c4[e2.toUpperCase()] || null;
  }
  function a3(e2) {
    return r3[e2];
  }
  function y4(e2) {
    return !!(e2 && Object.prototype.hasOwnProperty.call(r3, e2));
  }
  function s6(e2) {
    return r3[e2]?.isActive ?? false;
  }
  var r3, i6, t2, n4, c4;
  var init_config_DBa5QnYF = __esm({
    "assets/_astro/config.DBa5QnYF.js"() {
      r3 = { PH: { code: "PH", name: "Philippines", currency: "PHP", currencySymbol: "\u20B1", locale: "en-PH", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 15, isActive: true }, ID: { code: "ID", name: "Indonesia", currency: "IDR", currencySymbol: "Rp", locale: "id-ID", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2200, isActive: true }, MY: { code: "MY", name: "Malaysia", currency: "MYR", currencySymbol: "RM", locale: "ms-MY", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, SG: { code: "SG", name: "Singapore", currency: "SGD", currencySymbol: "S$", locale: "en-SG", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 0.5, isActive: true }, VN: { code: "VN", name: "Vietnam", currency: "VND", currencySymbol: "\u20AB", locale: "vi-VN", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 4e3, isActive: true }, TH: { code: "TH", name: "Thailand", currency: "THB", currencySymbol: "\u0E3F", locale: "th-TH", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 11, isActive: true }, MM: { code: "MM", name: "Myanmar", currency: "MMK", currencySymbol: "K", locale: "en-MM", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 100, isActive: true }, IN: { code: "IN", name: "India", currency: "INR", currencySymbol: "\u20B9", locale: "en-IN", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 3, isActive: true }, PK: { code: "PK", name: "Pakistan", currency: "PKR", currencySymbol: "Rs", locale: "en-PK", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 5, isActive: true }, BD: { code: "BD", name: "Bangladesh", currency: "BDT", currencySymbol: "\u09F3", locale: "en-BD", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 5, isActive: true }, NP: { code: "NP", name: "Nepal", currency: "NPR", currencySymbol: "Rs", locale: "en-NP", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 5, isActive: true }, BR: { code: "BR", name: "Brazil", currency: "BRL", currencySymbol: "R$", locale: "pt-BR", type: "major", stripeFeePercentage: 0.034, stripeFixedFee: 40, isActive: true }, MX: { code: "MX", name: "Mexico", currency: "MXN", currencySymbol: "MX$", locale: "es-MX", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 3, isActive: true }, AR: { code: "AR", name: "Argentina", currency: "ARS", currencySymbol: "AR$", locale: "es-AR", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 10, isActive: true }, CO: { code: "CO", name: "Colombia", currency: "COP", currencySymbol: "COL$", locale: "es-CO", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 900, isActive: true }, PE: { code: "PE", name: "Peru", currency: "PEN", currencySymbol: "S/", locale: "es-PE", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, CL: { code: "CL", name: "Chile", currency: "CLP", currencySymbol: "CLP$", locale: "es-CL", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 250, isActive: true }, GT: { code: "GT", name: "Guatemala", currency: "GTQ", currencySymbol: "Q", locale: "es-GT", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, BO: { code: "BO", name: "Bolivia", currency: "BOB", currencySymbol: "Bs", locale: "es-BO", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, CR: { code: "CR", name: "Costa Rica", currency: "CRC", currencySymbol: "\u20A1", locale: "es-CR", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 100, isActive: true }, HN: { code: "HN", name: "Honduras", currency: "HNL", currencySymbol: "L", locale: "es-HN", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, EG: { code: "EG", name: "Egypt", currency: "EGP", currencySymbol: "E\xA3", locale: "ar-EG", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 3, isActive: true }, SA: { code: "SA", name: "Saudi Arabia", currency: "SAR", currencySymbol: "SR", locale: "ar-SA", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, AE: { code: "AE", name: "United Arab Emirates", currency: "AED", currencySymbol: "\u062F.\u0625", locale: "ar-AE", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, DZ: { code: "DZ", name: "Algeria", currency: "DZD", currencySymbol: "DA", locale: "ar-DZ", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 5, isActive: true }, MA: { code: "MA", name: "Morocco", currency: "MAD", currencySymbol: "MAD", locale: "ar-MA", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, US: { code: "US", name: "United States", currency: "USD", currencySymbol: "$", locale: "en-US", type: "major", stripeFeePercentage: 0.029, stripeFixedFee: 30, isActive: true }, CA: { code: "CA", name: "Canada", currency: "CAD", currencySymbol: "CA$", locale: "en-CA", type: "minor", stripeFeePercentage: 0.029, stripeFixedFee: 30, isActive: true }, GB: { code: "GB", name: "United Kingdom", currency: "GBP", currencySymbol: "\xA3", locale: "en-GB", type: "major", stripeFeePercentage: 0.032, stripeFixedFee: 25, isActive: true }, EU: { code: "EU", name: "European Union", currency: "EUR", currencySymbol: "\u20AC", locale: "en-EU", type: "major", stripeFeePercentage: 0.032, stripeFixedFee: 25, isActive: true }, TR: { code: "TR", name: "Turkey", currency: "TRY", currencySymbol: "\u20BA", locale: "tr-TR", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, AU: { code: "AU", name: "Australia", currency: "AUD", currencySymbol: "A$", locale: "en-AU", type: "minor", stripeFeePercentage: 0.029, stripeFixedFee: 30, isActive: true }, JP: { code: "JP", name: "Japan", currency: "JPY", currencySymbol: "\xA5", locale: "ja-JP", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 50, isActive: true }, KR: { code: "KR", name: "South Korea", currency: "KRW", currencySymbol: "\u20A9", locale: "ko-KR", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 500, isActive: true }, HK: { code: "HK", name: "Hong Kong", currency: "HKD", currencySymbol: "HK$", locale: "zh-HK", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2.35, isActive: true }, ZA: { code: "ZA", name: "South Africa", currency: "ZAR", currencySymbol: "R", locale: "en-ZA", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, NG: { code: "NG", name: "Nigeria", currency: "NGN", currencySymbol: "\u20A6", locale: "en-NG", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 100, isActive: true }, KE: { code: "KE", name: "Kenya", currency: "KES", currencySymbol: "KSh", locale: "en-KE", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 10, isActive: true } };
      i6 = { USD: 1, AED: 3.67, ARS: 1e3, AUD: 1.5, BDT: 122, BOB: 6.9, BRL: 5.2, CAD: 1.35, CLP: 920, COP: 4e3, CRC: 500, DZD: 135, EGP: 48, EUR: 0.85, GBP: 0.78, GTQ: 7.7, HKD: 7.8, HNL: 25, IDR: 16e3, INR: 83, JPY: 155, KES: 130, KRW: 1350, MAD: 10, MMK: 2100, MXN: 17, MYR: 4.7, NGN: 1500, NPR: 133, PEN: 3.7, PHP: 56, PKR: 278, SAR: 3.75, SGD: 1.35, THB: 35, TRY: 32, VND: 25e3, ZAR: 18 };
      t2 = { "5days": { priceAmount: 499, originalPriceAmount: 999 }, "30days": { priceAmount: 1499, originalPriceAmount: 2999 }, "1year": { priceAmount: 2999, originalPriceAmount: 17999 }, lifetime: { priceAmount: 4999, originalPriceAmount: 179999 } };
      n4 = { PH: 0.4, ID: 0.35, MY: 0.5, SG: 0.9, VN: 0.3, TH: 0.45, MM: 0.3, IN: 0.35, PK: 0.3, BD: 0.3, NP: 0.3, BR: 0.5, MX: 0.45, AR: 0.35, CO: 0.4, PE: 0.4, CL: 0.5, GT: 0.4, BO: 0.35, CR: 0.45, HN: 0.35, EG: 0.25, SA: 0.7, AE: 0.8, DZ: 0.3, MA: 0.35, US: 1, CA: 0.9, GB: 1.05, EU: 1.05, TR: 0.45, AU: 0.95, JP: 0.85, KR: 0.75, HK: 0.8, ZA: 0.4, NG: 0.25, KE: 0.3 };
      c4 = { PH: "PH", ID: "ID", MY: "MY", SG: "SG", VN: "VN", TH: "TH", MM: "MM", IN: "IN", PK: "PK", BD: "BD", NP: "NP", BR: "BR", MX: "MX", AR: "AR", CO: "CO", PE: "PE", CL: "CL", GT: "GT", BO: "BO", CR: "CR", HN: "HN", EG: "EG", SA: "SA", AE: "AE", DZ: "DZ", MA: "MA", US: "US", CA: "CA", GB: "GB", TR: "TR", DE: "EU", FR: "EU", IT: "EU", ES: "EU", PT: "EU", NL: "EU", BE: "EU", AT: "EU", FI: "EU", SE: "EU", DK: "EU", NO: "EU", CH: "EU", PL: "EU", CZ: "EU", HU: "EU", SK: "EU", SI: "EU", EE: "EU", LV: "EU", LT: "EU", IE: "EU", LU: "EU", MT: "EU", CY: "EU", HR: "EU", BG: "EU", RO: "EU", GR: "EU", AU: "AU", NZ: "AU", JP: "JP", KR: "KR", HK: "HK", TW: "HK", ZA: "ZA", NG: "NG", KE: "KE" };
    }
  });

  // assets/_astro/client-pricing-request.HjSk9Omf.js
  function w3(e2, n6 = {}) {
    const i8 = c5(n6.region) || m3(n6.currentUrl), r5 = new URL(e2 || "/", l2(n6.currentUrl));
    for (const [s7, t3] of Object.entries(n6.params || {})) t3 == null || t3 === "" || r5.searchParams.set(s7, String(t3));
    i8 && r5.searchParams.set("region", i8);
    const o6 = g3();
    o6 && r5.searchParams.set("tz", o6);
    const u5 = { accept: "application/json" };
    return { url: r5.toString(), headers: u5, explicitRegion: i8 };
  }
  function m3(e2) {
    try {
      const n6 = new URL(e2?.toString() || l2());
      return c5(n6.searchParams.get("region"));
    } catch {
      return null;
    }
  }
  function c5(e2) {
    const n6 = d5(e2)?.toUpperCase();
    return n6 && y4(n6) ? n6 : null;
  }
  function l2(e2) {
    return e2 ? e2.toString() : typeof window < "u" ? window.location.href : f2;
  }
  function g3() {
    try {
      return typeof Intl < "u" && Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    } catch {
      return null;
    }
  }
  function d5(e2) {
    const n6 = e2?.trim();
    return n6 || null;
  }
  var f2;
  var init_client_pricing_request_HjSk9Omf = __esm({
    "assets/_astro/client-pricing-request.HjSk9Omf.js"() {
      init_config_DBa5QnYF();
      f2 = "https://www.2-luv.com/";
    }
  });

  // assets/_astro/index.B3-yPIWO.js
  var index_B3_yPIWO_exports = {};
  __export(index_B3_yPIWO_exports, {
    BASE_PRICING_STRUCTURE: () => t2,
    COUNTRY_TO_REGION: () => c4,
    CURRENCY_RATES: () => i6,
    REGIONAL_PRICE_ADJUSTMENTS: () => n4,
    REGION_CONFIGS: () => r3,
    buildClientPricingRequest: () => w3,
    calculateNetRevenue: () => T,
    calculateRegionalPrice: () => U,
    calculateStripeFees: () => C3,
    convertCurrency: () => f3,
    detectRegionFromHeaders: () => I2,
    detectUserRegion: () => v4,
    explicitPricingRegionFromUrl: () => m3,
    formatRegionalPrice: () => d6,
    getLocalizedPlanInfo: () => h4,
    getRegionByCountry: () => o3,
    getRegionConfig: () => a3,
    getRegionFromRequest: () => x2,
    getRegionalPricingSet: () => O2,
    isRegionActive: () => s6,
    isSupportedRegionCode: () => y4,
    normalizeClientPricingRegion: () => c5,
    resolvePassiveRegion: () => m4
  });
  function f3(n6, r5) {
    const e2 = i6[r5];
    return Math.round(n6 * e2);
  }
  function U(n6, r5) {
    const e2 = t2[n6];
    if (!e2) throw new Error(`Unknown plan type: ${n6}`);
    const c6 = a3(r5), i8 = n4[r5], t3 = Math.round(e2.priceAmount * i8), a4 = e2.originalPriceAmount ? Math.round(e2.originalPriceAmount * i8) : void 0, s7 = f3(t3, c6.currency), u5 = a4 ? f3(a4, c6.currency) : void 0;
    return { priceAmount: s7, originalPriceAmount: u5 };
  }
  function d6(n6, r5) {
    const e2 = a3(r5), i8 = { JPY: 0, KRW: 0, IDR: 0, VND: 0, COP: 0, CLP: 0, MMK: 0, NGN: 0 }[e2.currency] ?? 2, t3 = i8 === 0 ? n6 : n6 / 100, s7 = new Intl.NumberFormat(e2.locale, { minimumFractionDigits: i8, maximumFractionDigits: i8 }).format(t3), u5 = e2.currencySymbol;
    return r5 === "BR" || r5 === "EU" || r5 === "AR" || r5 === "MX" || r5 === "CO" || r5 === "CL" ? `${u5} ${s7}` : `${u5}${s7}`;
  }
  function O2(n6) {
    const r5 = Object.keys(t2), e2 = a3(n6);
    return r5.map((c6) => {
      const i8 = U(c6, n6);
      return { planType: c6, regionCode: n6, currency: e2.currency, currencySymbol: e2.currencySymbol, priceAmount: i8.priceAmount, originalPriceAmount: i8.originalPriceAmount, formattedPrice: d6(i8.priceAmount, n6), formattedOriginalPrice: i8.originalPriceAmount ? d6(i8.originalPriceAmount, n6) : void 0, stripeFeePercentage: e2.stripeFeePercentage, stripeFixedFee: e2.stripeFixedFee };
    });
  }
  function h4(n6, r5) {
    const e2 = a3(r5), i8 = { "5days": { name: { "pt-BR": "5 Dias", "en-US": "5 Days", "en-EU": "5 Days" }, description: { "pt-BR": "Acesso por 5 dias completos.", "en-US": "Access for 5 complete days.", "en-EU": "Access for 5 complete days." } }, "30days": { name: { "pt-BR": "Plano Mensal", "en-US": "Monthly Plan", "en-EU": "Monthly Plan" }, description: { "pt-BR": "Acesso por 1 m\xEAs completo.", "en-US": "Access for 1 complete month.", "en-EU": "Access for 1 complete month." } }, "1year": { name: { "pt-BR": "Plano Anual", "en-US": "Annual Plan", "en-EU": "Annual Plan" }, description: { "pt-BR": "Acesso por 1 ano completo.", "en-US": "Access for 1 complete year.", "en-EU": "Access for 1 complete year." } }, lifetime: { name: { "pt-BR": "Acesso Vital\xEDcio", "en-US": "Lifetime Access", "en-EU": "Lifetime Access" }, description: { "pt-BR": "Acesso vital\xEDcio ao conte\xFAdo.", "en-US": "Lifetime access to content.", "en-EU": "Lifetime access to content." } } }[n6];
    return i8 ? { name: i8.name[e2.locale] || i8.name["en-US"], description: i8.description[e2.locale] || i8.description["en-US"] } : { name: n6, description: `${n6} plan` };
  }
  function C3(n6, r5) {
    const e2 = a3(r5);
    return Math.round(n6 * e2.stripeFeePercentage) + e2.stripeFixedFee;
  }
  function T(n6, r5) {
    const e2 = C3(n6, r5);
    return n6 - e2;
  }
  function v4(n6, r5, e2) {
    return m4({ countryCode: n6, locale: r5, timezone: e2 }) ?? "US";
  }
  function m4(n6) {
    const r5 = /* @__PURE__ */ new Map(), e2 = (t3, a4) => {
      t3 && r5.set(t3, (r5.get(t3) ?? 0) + a4);
    };
    e2(n6.countryCode ? p2(n6.countryCode) : null, 100), e2(n6.timezone ? N(n6.timezone) : null, 70), e2(n6.locale ? _(n6.locale) : null, 20);
    let c6 = null, i8 = 0;
    for (const [t3, a4] of r5) a4 > i8 && (c6 = t3, i8 = a4);
    return i8 >= E2 ? c6 : null;
  }
  function p2(n6) {
    const r5 = n6.trim().toUpperCase();
    return r5 ? y4(r5) ? r5 : o3(r5) : null;
  }
  function N(n6) {
    return n6.includes("America/Sao_Paulo") || n6.includes("Brazil") ? "BR" : n6.includes("America/New_York") || n6.includes("America/Los_Angeles") || n6.includes("America/Chicago") || n6.includes("America/Denver") ? "US" : n6.includes("America/Toronto") || n6.includes("America/Vancouver") ? "CA" : n6.includes("America/Mexico_City") ? "MX" : n6.includes("America/Buenos_Aires") ? "AR" : n6.includes("America/Bogota") ? "CO" : n6.includes("America/Lima") ? "PE" : n6.includes("America/Santiago") ? "CL" : n6.includes("America/Guatemala") ? "GT" : n6.includes("America/La_Paz") ? "BO" : n6.includes("America/Costa_Rica") ? "CR" : n6.includes("America/Tegucigalpa") ? "HN" : n6.includes("Europe/London") ? "GB" : n6.includes("Europe/Istanbul") || n6.includes("Asia/Istanbul") ? "TR" : n6.includes("Europe/") ? "EU" : n6.includes("Asia/Manila") ? "PH" : n6.includes("Asia/Jakarta") ? "ID" : n6.includes("Asia/Kuala_Lumpur") ? "MY" : n6.includes("Asia/Singapore") ? "SG" : n6.includes("Asia/Bangkok") ? "TH" : n6.includes("Asia/Ho_Chi_Minh") ? "VN" : n6.includes("Asia/Yangon") || n6.includes("Asia/Rangoon") ? "MM" : n6.includes("Asia/Kolkata") || n6.includes("Asia/Mumbai") ? "IN" : n6.includes("Asia/Karachi") ? "PK" : n6.includes("Asia/Dhaka") ? "BD" : n6.includes("Asia/Kathmandu") ? "NP" : n6.includes("Asia/Tokyo") ? "JP" : n6.includes("Asia/Seoul") ? "KR" : n6.includes("Asia/Hong_Kong") ? "HK" : n6.includes("Asia/Dubai") ? "AE" : n6.includes("Asia/Riyadh") ? "SA" : n6.includes("Africa/Cairo") ? "EG" : n6.includes("Africa/Algiers") ? "DZ" : n6.includes("Africa/Casablanca") ? "MA" : n6.includes("Africa/Johannesburg") ? "ZA" : n6.includes("Africa/Lagos") ? "NG" : n6.includes("Africa/Nairobi") ? "KE" : n6.includes("Australia/Sydney") || n6.includes("Australia/Melbourne") ? "AU" : null;
  }
  function _(n6) {
    return n6.split(",").map((r5, e2) => {
      const [c6, ...i8] = r5.trim().split(";"), t3 = i8.find((s7) => s7.trim().startsWith("q=")), a4 = t3 ? Number.parseFloat(t3.split("=")[1] || "0") : 1;
      return { tag: c6.trim(), index: e2, quality: Number.isFinite(a4) ? a4 : 0 };
    }).filter((r5) => r5.tag).sort((r5, e2) => e2.quality - r5.quality || r5.index - e2.index).reduce((r5, e2) => r5 || F(e2.tag), null);
  }
  function F(n6) {
    const r5 = n6.replace("_", "-").split("-").slice(1).find((e2) => /^[a-z]{2}$/i.test(e2) || e2.toUpperCase() === "EU");
    return r5 ? p2(r5) : null;
  }
  function I2(n6) {
    const r5 = l3(n6, M), e2 = R3(r5);
    if (e2) return e2;
    const c6 = m4({ countryCode: l3(n6, b2), locale: l3(n6, ["accept-language"]), timezone: l3(n6, ["x-timezone"]) });
    return c6 || "US";
  }
  function x2(n6, r5) {
    try {
      const e2 = new URL(n6, "http://localhost").searchParams.get("region"), c6 = R3(e2);
      if (c6) return c6;
    } catch {
    }
    return I2(r5);
  }
  function l3(n6, r5) {
    for (const e2 of r5) {
      const c6 = n6[e2] || n6[e2.toLowerCase()];
      if (c6?.trim()) return c6.trim();
    }
    return null;
  }
  function R3(n6) {
    const r5 = n6?.trim().toUpperCase();
    return r5 && y4(r5) ? r5 : null;
  }
  var E2, M, b2;
  var init_index_B3_yPIWO = __esm({
    "assets/_astro/index.B3-yPIWO.js"() {
      init_config_DBa5QnYF();
      init_config_DBa5QnYF();
      init_client_pricing_request_HjSk9Omf();
      init_client_pricing_request_HjSk9Omf();
      E2 = 60;
      M = ["x-2luv-region"];
      b2 = ["x-2luv-country"];
    }
  });

  // assets/_astro/pricing-region-controls.B3QK6_Sx.js
  function i(t3) {
    if (typeof t3 != "string") return;
    const r5 = document.querySelectorAll("[data-header-region], [data-footer-region]");
    let n6;
    for (const e2 of r5) {
      const o6 = Array.from(e2.options).find((c6) => c6.value === t3);
      o6 && (e2.value = t3, n6 = o6.textContent?.trim());
    }
    n6 && (document.documentElement.dataset.pricingRegion = t3, document.querySelectorAll("[data-header-currency]").forEach((e2) => {
      e2.textContent = n6;
    }));
  }
  function a(t3) {
    return document.documentElement.dataset.pricingRegion || t3;
  }

  // assets/_astro/HeaderV2.astro_astro_type_script_index_0_lang.DKQMm5Va.js
  (() => {
    const i8 = window, A4 = document.getElementById("lv2-header-config"), r5 = A4 ? JSON.parse(A4.textContent || "{}") : {}, g4 = document.querySelector("[data-lv2-header]"), c6 = document.querySelector("[data-menu-button]"), h5 = document.querySelector("[data-menu-panel]"), U2 = document.querySelector("[data-menu-icon-open]"), x3 = document.querySelector("[data-menu-icon-close]"), l5 = document.querySelector("[data-theme-toggle]"), F2 = document.querySelector('[data-theme-icon="system"]'), V2 = document.querySelector('[data-theme-icon="moon"]'), Y = document.querySelector('[data-theme-icon="sun"]'), w4 = document.querySelector("[data-blog-post-drawer-nav]"), f4 = w4 ? Array.from(w4.querySelectorAll('a[href^="#"]')) : [], d8 = f4.reduce((e2, t3) => {
      const n6 = p3(t3.getAttribute("href") || "").slice(1), o6 = n6 ? document.getElementById(n6) : null;
      return o6 && e2.push({ link: t3, target: o6 }), e2;
    }, []);
    let v5 = false, y5 = 0;
    const u5 = r5.themeLabels || { system: "System", light: "Light", dark: "Dark" }, j2 = r5.themeStateTemplate || "Theme: {current}. Switch to {next}.", J2 = ["system", "light", "dark"], W = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null, q3 = (e2, t3) => {
      document.cookie = `${e2}=${encodeURIComponent(t3)};path=/;max-age=31536000;samesite=lax`;
    }, I4 = (e2) => {
      document.cookie = `${e2}=;path=/;max-age=0;samesite=lax`;
    }, m5 = (e2, t3) => {
      e2?.classList.toggle("lv2-icon-hidden", t3);
    };
    function p3(e2) {
      try {
        return decodeURIComponent(e2);
      } catch {
        return e2;
      }
    }
    const S4 = (e2) => typeof e2 == "string" && J2.includes(e2) ? e2 : "system", X = (e2) => e2 === "dark" ? "dark" : "light", $2 = (e2) => e2 === "system" && W?.matches || e2 === "dark" ? "dark" : "light", P2 = () => {
      try {
        return S4(window.localStorage.getItem("theme"));
      } catch {
        return "system";
      }
    }, _5 = (e2, t3 = true) => {
      const n6 = S4(e2), o6 = $2(n6), a4 = o6 === "dark";
      document.documentElement.classList.toggle("dark", a4), document.documentElement.dataset.theme = n6, document.documentElement.dataset.resolvedTheme = o6, document.documentElement.style.colorScheme = o6;
      try {
        window.localStorage.setItem("theme", n6);
      } catch {
      }
      return t3 && window.dispatchEvent(new CustomEvent("lv2:theme-change", { detail: { theme: n6, resolvedTheme: o6, dark: a4 } })), { theme: n6, resolvedTheme: o6, dark: a4 };
    }, C5 = () => {
      const e2 = i8.__2luvTheme, t3 = S4(e2?.getTheme ? e2.getTheme() : P2()), n6 = e2?.getResolvedTheme ? X(e2.getResolvedTheme()) : $2(t3);
      return { theme: t3, resolvedTheme: n6, dark: n6 === "dark" };
    }, D = (e2) => e2 === "system" ? "light" : e2 === "light" ? "dark" : "system", s7 = (e2) => {
      e2 && k4(), v5 = e2, h5 && (h5.hidden = !e2), c6 && (c6.setAttribute("aria-expanded", String(e2)), c6.setAttribute("aria-label", e2 ? r5.closeMenu : r5.openMenu)), m5(U2, e2), m5(x3, !e2), e2 && window.setTimeout(() => {
        w4?.querySelector('[aria-current="location"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
      }, 40);
    }, E3 = (e2) => {
      f4.forEach((t3) => {
        const n6 = t3 === e2;
        t3.classList.toggle("is-active", n6), n6 ? t3.setAttribute("aria-current", "location") : t3.removeAttribute("aria-current");
      });
    }, k4 = () => {
      if (y5 = 0, !d8.length) return;
      const e2 = p3(window.location.hash || ""), t3 = e2 ? d8.find((a4) => p3(a4.link.getAttribute("href") || "") === e2)?.link : null;
      if (t3) {
        E3(t3);
        return;
      }
      const n6 = window.scrollY + Math.max(120, window.innerHeight * 0.24);
      let o6 = d8[0].link;
      d8.forEach((a4) => {
        a4.target.offsetTop <= n6 && (o6 = a4.link);
      }), E3(o6);
    }, B3 = () => {
      !d8.length || y5 || (y5 = window.requestAnimationFrame(k4));
    }, G2 = (e2) => {
      if (!e2) {
        s7(false);
        return;
      }
      const t3 = document.getElementById(e2);
      if (t3) {
        const n6 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        t3.scrollIntoView({ behavior: n6 ? "auto" : "smooth", block: "start" });
      }
      s7(false);
    }, T2 = () => {
      const e2 = C5();
      m5(F2, e2.theme !== "system"), m5(Y, e2.theme !== "light"), m5(V2, e2.theme !== "dark");
      const t3 = u5[e2.theme] || u5.system, n6 = u5[D(e2.theme)] || u5.light, o6 = j2.replace("{current}", t3).replace("{next}", n6);
      l5?.setAttribute("aria-label", o6), l5?.setAttribute("title", o6);
    }, K2 = () => {
      i8.__2luvTheme?.applyTheme || _5(P2(), false), T2();
    }, M3 = () => {
      const e2 = D(C5().theme), t3 = i8.__2luvTheme?.setTheme ? i8.__2luvTheme.setTheme(e2) : _5(e2);
      return T2(), t3;
    }, R5 = (e2) => {
      if (!r5.supportedLocales?.includes(e2) || e2 === r5.locale) return;
      q3("2luv-locale", e2), I4("NEXT_LOCALE"), window.localStorage.removeItem("preferredLanguage");
      const t3 = window.location.pathname.split("/");
      if (t3[2] === "blog") {
        const o6 = `/${e2}`, a4 = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((b3) => b3.href).find((b3) => {
          const L4 = new URL(b3, window.location.href);
          return L4.origin === window.location.origin && (L4.pathname === o6 || L4.pathname.startsWith(`${o6}/`));
        });
        window.location.assign(`${a4 || `/${e2}/blog`}${window.location.search}${window.location.hash}`);
        return;
      }
      const n6 = r5.localePaths?.[e2];
      if (n6) {
        window.location.assign(`${n6}${window.location.search}${window.location.hash}`);
        return;
      }
      r5.supportedLocales.includes(t3[1]) ? t3[1] = e2 : t3.splice(1, 0, e2), window.location.assign(`${t3.join("/")}${window.location.search}${window.location.hash}`);
    }, O3 = (e2) => {
      if (!r5.activeRegions?.includes(e2) || e2 === a(r5.region)) return;
      q3("2luv-region", e2), I4("user-region");
      const t3 = new URL(window.location.href);
      t3.searchParams.set("region", e2), window.location.assign(t3.toString());
    };
    l5 && K2(), i8.__lv2Preferences = { changeLocale: R5, changeRegion: O3, toggleTheme: M3 }, l5 && window.addEventListener("lv2:theme-change", T2), c6?.addEventListener("click", () => s7(!v5)), document.querySelectorAll("[data-scroll-target]").forEach((e2) => {
      e2.addEventListener("click", () => G2(e2.getAttribute("data-scroll-target")));
    }), document.querySelectorAll("[data-close-drawer]").forEach((e2) => {
      e2.addEventListener("click", () => s7(false));
    }), f4.forEach((e2) => {
      e2.addEventListener("click", () => E3(e2));
    });
    const H2 = document.querySelector("[data-header-locale]");
    H2?.addEventListener("change", () => R5(H2.value));
    const N3 = document.querySelector("[data-header-region]");
    N3?.addEventListener("change", () => O3(N3.value)), l5?.addEventListener("click", M3);
    const z2 = () => {
      g4?.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", z2, { passive: true }), window.addEventListener("scroll", B3, { passive: true }), window.addEventListener("hashchange", B3), z2(), k4(), document.addEventListener("pointerdown", (e2) => {
      const t3 = e2.target;
      t3 instanceof Node && v5 && h5 && c6 && !h5.contains(t3) && !c6.contains(t3) && s7(false);
    }, true), window.addEventListener("keydown", (e2) => {
      e2.key === "Escape" && s7(false);
    }), window.addEventListener("2luv:card-preview", (e2) => {
      const n6 = (e2 instanceof CustomEvent ? e2.detail : null)?.phase === "open";
      g4?.classList.toggle("is-hidden", n6), g4?.setAttribute("aria-hidden", String(n6));
    });
  })();

  // assets/_astro/consent.ngPTbJBt.js
  var p = "cookie-consent";
  var C = "cookie-consent";
  var m = ["cookieConsent", "cookie_consent"];
  function y(e2 = {}, n6 = (/* @__PURE__ */ new Date()).toISOString()) {
    const t3 = { necessary: true, preferences: !!e2.preferences, analytics: !!e2.analytics, marketing: !!e2.marketing };
    return { version: 2, updatedAt: n6, categories: t3, google: S(t3) };
  }
  function O(e2) {
    return y({ preferences: true, analytics: true, marketing: true }, e2);
  }
  function k(e2) {
    return y({ preferences: false, analytics: false, marketing: false }, e2);
  }
  function d(e2) {
    if (e2 == null) return null;
    if (typeof e2 == "string") {
      const o6 = l(e2).trim();
      if (!o6) return null;
      const a4 = o6.toLowerCase();
      if (["accepted", "accept", "granted", "true", "all"].includes(a4)) return O();
      if (["rejected", "reject", "declined", "denied", "false", "necessary"].includes(a4)) return k();
      try {
        return d(JSON.parse(o6));
      } catch {
        return null;
      }
    }
    if (typeof e2 != "object" || Array.isArray(e2)) return null;
    const n6 = e2, t3 = R(n6);
    if (!t3) return null;
    const r5 = typeof n6.updatedAt == "string" && n6.updatedAt ? n6.updatedAt : (/* @__PURE__ */ new Date()).toISOString();
    return { version: Number.isFinite(Number(n6.version)) ? Number(n6.version) : 2, updatedAt: r5, categories: t3, google: S(t3) };
  }
  function A(e2) {
    const n6 = L(e2 || ""), t3 = n6.get(p);
    if (t3) return d(t3);
    for (const r5 of m) {
      const o6 = n6.get(r5), a4 = d(o6);
      if (a4) return a4;
    }
    return null;
  }
  function w() {
    if (!s()) return null;
    try {
      const e2 = window.localStorage.getItem(C), n6 = d(e2);
      if (n6) return n6;
    } catch {
    }
    return A(document.cookie);
  }
  function G(e2, n6 = w()) {
    return e2 === "necessary" ? true : !!n6?.categories[e2];
  }
  function S(e2) {
    return { security_storage: "granted", functionality_storage: e2.preferences ? "granted" : "denied", personalization_storage: e2.preferences ? "granted" : "denied", analytics_storage: e2.analytics ? "granted" : "denied", ad_storage: e2.marketing ? "granted" : "denied", ad_user_data: e2.marketing ? "granted" : "denied", ad_personalization: e2.marketing ? "granted" : "denied" };
  }
  function L(e2) {
    const n6 = /* @__PURE__ */ new Map();
    for (const t3 of e2.split(";")) {
      const r5 = t3.trim();
      if (!r5) continue;
      const o6 = r5.indexOf("="), a4 = o6 >= 0 ? r5.slice(0, o6) : r5, N3 = o6 >= 0 ? r5.slice(o6 + 1) : "", u5 = l(a4);
      !u5 || n6.has(u5) || n6.set(u5, l(N3));
    }
    return n6;
  }
  function R(e2) {
    const n6 = g(e2.categories) ? e2.categories : e2, t3 = g(e2.google) ? e2.google : e2, r5 = c(n6.preferences) ?? i2(t3.functionality_storage) ?? i2(t3.personalization_storage) ?? false, o6 = c(n6.analytics) ?? i2(t3.analytics_storage) ?? false, a4 = c(n6.marketing) ?? c(n6.ads) ?? i2(t3.ad_storage) ?? i2(t3.ad_user_data) ?? i2(t3.ad_personalization) ?? false;
    return { necessary: true, preferences: r5, analytics: o6, marketing: a4 };
  }
  function c(e2) {
    if (typeof e2 == "boolean") return e2;
    if (typeof e2 != "string") return null;
    const n6 = e2.trim().toLowerCase();
    return ["true", "1", "yes", "accepted", "granted"].includes(n6) ? true : ["false", "0", "no", "rejected", "declined", "denied"].includes(n6) ? false : null;
  }
  function i2(e2) {
    return e2 === "granted" ? true : e2 === "denied" ? false : c(e2);
  }
  function g(e2) {
    return !!e2 && typeof e2 == "object" && !Array.isArray(e2);
  }
  function l(e2) {
    try {
      return decodeURIComponent(e2);
    } catch {
      return e2;
    }
  }
  function s() {
    return typeof window < "u" && typeof document < "u";
  }

  // assets/_astro/recent-items.jFp7o2xl.js
  var i3 = "2luv:recent-items:v1";
  var a2 = "2luv:recent-items-updated";
  function A2(e2 = w()) {
    return G("preferences", e2);
  }
  function v(e2 = w()) {
    return !d2() || !A2(e2) ? [] : w2(y2()).sort((r5, t3) => Date.parse(t3.accessedAt) - Date.parse(r5.accessedAt));
  }
  function R2(e2) {
    if (!d2()) return;
    const n6 = `${e2.type}:${E(e2.shareableLink)}`;
    if (!n6.includes(":") || n6.endsWith(":")) return;
    const r5 = w2(y2()).filter((t3) => c2(t3) !== n6);
    L2(r5), h(r5);
  }
  function b(e2, n6) {
    const r5 = k2(n6), t3 = encodeURIComponent(e2.shareableLink);
    return `/${r5}/letter/${t3}`;
  }
  function S2(e2) {
    if (!d2()) return () => {
    };
    const n6 = () => e2(), r5 = (t3) => {
      t3.storageArea && t3.storageArea !== window.localStorage || (t3.key === null || t3.key === i3 || t3.key === "cookie-consent") && e2();
    };
    return window.addEventListener(a2, n6), window.addEventListener("2luv:cookie-consent-updated", n6), window.addEventListener("storage", r5), () => {
      window.removeEventListener(a2, n6), window.removeEventListener("2luv:cookie-consent-updated", n6), window.removeEventListener("storage", r5);
    };
  }
  function w2(e2) {
    if (!e2) return [];
    try {
      const n6 = JSON.parse(e2);
      if (!Array.isArray(n6)) return [];
      const r5 = /* @__PURE__ */ new Map();
      for (const t3 of n6) {
        if (!t3 || typeof t3 != "object" || Array.isArray(t3)) continue;
        const s7 = t3, u5 = s7.type === "letter" || s7.type === "gift" ? s7.type : null, f4 = E(s7.shareableLink), p3 = typeof s7.accessedAt == "string" && Number.isFinite(Date.parse(s7.accessedAt)) ? s7.accessedAt : null;
        if (!u5 || !f4 || !p3) continue;
        const o6 = { type: u5, shareableLink: f4, accessedAt: p3 }, l5 = r5.get(c2(o6));
        (!l5 || Date.parse(o6.accessedAt) > Date.parse(l5.accessedAt)) && r5.set(c2(o6), o6);
      }
      return Array.from(r5.values());
    } catch {
      return [];
    }
  }
  function y2() {
    try {
      return window.localStorage.getItem(i3);
    } catch {
      return null;
    }
  }
  function L2(e2) {
    try {
      window.localStorage.setItem(i3, JSON.stringify(e2));
    } catch {
    }
  }
  function h(e2) {
    try {
      window.dispatchEvent(new CustomEvent(a2, { detail: { items: e2 } }));
    } catch {
    }
  }
  function c2(e2) {
    return `${e2.type}:${e2.shareableLink}`;
  }
  function E(e2) {
    return typeof e2 == "string" && e2.trim().length <= 200 ? e2.trim() : "";
  }
  function k2(e2) {
    return /^[a-z]{2}(?:-[a-z]{2})?$/i.test(e2) ? e2.toLowerCase() : "en";
  }
  function d2() {
    return typeof window < "u" && typeof document < "u";
  }

  // assets/_astro/public-api-url.C77a8FtR.js
  var i4 = { PUBLIC_2LUV_API_BASE_URL: "http://127.0.0.1:8788" };
  var n = i4;
  var s2 = n.PUBLIC_2LUV_API_BASE_URL.replace(/\/$/, "");
  function e(_5) {
    const t3 = _5 === "/api" ? "/api" : _5.startsWith("/api/") ? _5 : `/api${_5.startsWith("/") ? _5 : `/${_5}`}`;
    return `${s2}${t3}`;
  }

  // assets/_astro/RecentLandingItems.astro_astro_type_script_index_0_lang.C-2nAEMN.js
  var f = /* @__PURE__ */ new WeakSet();
  var u = { lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>', clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>', arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7"></path><path d="M7 7h10v10"></path></svg>' };
  function v2() {
    if (typeof window > "u" || typeof document > "u") return;
    const n6 = () => {
      document.querySelectorAll("[data-recent-items-section]").forEach((t3) => {
        if (f.has(t3)) return;
        f.add(t3), new A3(t3).init();
      });
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", n6, { once: true });
      return;
    }
    n6();
  }
  var A3 = class {
    constructor(e2) {
      __publicField(this, "section");
      __publicField(this, "config");
      __publicField(this, "grid");
      __publicField(this, "toggle");
      __publicField(this, "details", []);
      __publicField(this, "showAll", false);
      __publicField(this, "loadVersion", 0);
      __publicField(this, "request", null);
      __publicField(this, "unsubscribe", null);
      __publicField(this, "pruning", false);
      __publicField(this, "queued", false);
      __publicField(this, "disposed", false);
      __publicField(this, "events", new AbortController());
      this.section = e2, this.config = I(S3(e2)), this.grid = e2.querySelector("[data-recent-items-grid]"), this.toggle = e2.querySelector("[data-recent-items-toggle]");
    }
    init() {
      this.toggle?.addEventListener("click", () => {
        this.showAll = !this.showAll, this.renderSection();
      }, { signal: this.events.signal }), this.unsubscribe = S2(() => {
        this.pruning || this.disposed || (this.showAll = false, this.scheduleReload());
      }), window.addEventListener("pagehide", (e2) => {
        this.request?.abort(), this.loadVersion++, e2.persisted || this.dispose();
      }, { signal: this.events.signal }), window.addEventListener("pageshow", (e2) => {
        e2.persisted && this.scheduleReload();
      }, { signal: this.events.signal }), document.addEventListener("astro:before-swap", () => this.dispose(), { signal: this.events.signal }), this.scheduleInitialLoad();
    }
    scheduleInitialLoad() {
      const e2 = () => {
        this.loadVersion === 0 && this.scheduleReload();
      }, t3 = window;
      if (t3.requestIdleCallback) {
        t3.requestIdleCallback(e2, { timeout: 1500 });
        return;
      }
      window.setTimeout(e2, 0);
    }
    scheduleReload() {
      this.queued || this.disposed || (this.request?.abort(), this.loadVersion++, this.queued = true, queueMicrotask(() => {
        this.queued = false, this.disposed || this.loadRecentDetails();
      }));
    }
    dispose() {
      this.disposed = true, this.loadVersion++, this.request?.abort(), this.unsubscribe?.(), this.events.abort();
    }
    async loadRecentDetails() {
      if (this.disposed) return;
      const e2 = ++this.loadVersion;
      this.request?.abort();
      const t3 = new AbortController();
      this.request = t3;
      const r5 = v().slice(0, this.config.maxItems);
      if (!r5.length) {
        this.details = [], this.renderSection(), this.resetHero();
        return;
      }
      const s7 = await Promise.all(r5.map((i8) => this.loadDetail(i8, t3.signal)));
      if (!(this.disposed || t3.signal.aborted || e2 !== this.loadVersion)) {
        this.pruning = true;
        try {
          s7.forEach((i8) => {
            (i8.missing || i8.expired) && R2(i8.item);
          });
        } finally {
          this.pruning = false;
        }
        this.details = s7.flatMap((i8) => i8.detail ? [i8.detail] : []), this.renderSection(), this.applyHero(this.details[0] ?? null);
      }
    }
    async loadDetail(e2, t3) {
      const r5 = await C2(e2, t3), s7 = e2.type === "gift" ? this.text("giftCardEyebrow", this.config.locale === "pt" ? "Presente" : "Gift") : this.text("cardEyebrow", this.config.locale === "pt" ? "Carta" : "Letter");
      if (!r5.record) return { item: e2, detail: r5.missing ? null : this.fallbackDetail(e2, s7), missing: r5.missing, expired: false };
      const i8 = g2(r5.record.expiresAt);
      if (!!(i8 && Date.parse(i8) < Date.now())) return { item: e2, detail: null, missing: false, expired: true };
      const o6 = !!(r5.record.hasPassword || r5.record.isPasswordProtected) && r5.record.disablePasswordProtection !== true, c6 = g2(r5.record.lovedOneName ?? r5.record.recipientName ?? r5.record.title), a4 = o6 || t3?.aborted ? null : await x(e2, t3);
      return { item: e2, detail: { type: e2.type, shareableLink: e2.shareableLink, href: b(e2, this.config.locale), title: o6 ? s7 : c6 || s7, eyebrow: s7, expiresAt: i8, imageUrl: a4, locked: o6 }, missing: false, expired: false };
    }
    fallbackDetail(e2, t3) {
      return { type: e2.type, shareableLink: e2.shareableLink, href: b(e2, this.config.locale), title: t3, eyebrow: t3, expiresAt: null, imageUrl: null, locked: false };
    }
    renderSection() {
      if (!this.grid) return;
      if (!this.details.length) {
        this.section.hidden = true, this.grid.replaceChildren(), delete this.grid.dataset.recentItemsCount, this.toggle && (this.toggle.hidden = true);
        return;
      }
      this.section.hidden = false;
      const e2 = this.showAll ? this.details : this.details.slice(0, this.config.initialVisibleCount);
      this.grid.dataset.recentItemsCount = String(e2.length), this.grid.replaceChildren(...e2.map((t3, r5) => this.renderCard(t3, r5))), this.toggle && (this.toggle.hidden = this.details.length <= this.config.initialVisibleCount, this.toggle.textContent = this.showAll ? this.text("viewLess", "View less") : this.text("viewAll", "View all ({count})").replace("{count}", String(this.details.length)));
    }
    renderCard(e2, t3) {
      const r5 = document.createElement("a");
      if (r5.className = "lv2-recent-card", r5.href = e2.href, r5.style.setProperty("--recent-delay", `${Math.min(t3 * 70, 420)}ms`), e2.imageUrl) {
        r5.classList.add("has-image");
        const a4 = document.createElement("span");
        a4.className = "lv2-recent-card-image", a4.setAttribute("aria-hidden", "true");
        const d8 = document.createElement("img");
        d8.src = e2.imageUrl, d8.alt = "", d8.loading = "lazy", d8.decoding = "async", a4.append(d8), r5.append(a4);
      }
      const s7 = document.createElement("span");
      s7.className = "lv2-recent-card-copy";
      const i8 = document.createElement("span");
      i8.className = "lv2-recent-card-eyebrow", e2.locked && i8.insertAdjacentHTML("beforeend", u.lock), i8.append(document.createTextNode(e2.eyebrow));
      const l5 = document.createElement("strong");
      l5.textContent = e2.title, s7.append(i8, l5), r5.append(s7);
      const o6 = document.createElement("span");
      if (o6.className = "lv2-recent-card-footer", e2.expiresAt) {
        o6.classList.add("has-date");
        const a4 = document.createElement("span");
        a4.insertAdjacentHTML("beforeend", u.clock), a4.append(document.createTextNode(k3(e2.expiresAt, this.config.locale))), o6.append(a4);
      }
      const c6 = document.createElement("span");
      return c6.className = "lv2-recent-card-arrow", c6.setAttribute("aria-hidden", "true"), c6.innerHTML = u.arrow, o6.append(c6), r5.append(o6), r5;
    }
    applyHero(e2) {
      const t3 = document.getElementById("hero");
      if (!t3) return;
      const r5 = t3.querySelector(".lv2-hero-content"), s7 = t3.querySelector("[data-recent-hero-content]"), i8 = t3.querySelector("[data-recent-hero-media]"), l5 = t3.querySelector("[data-recent-open-link]");
      if (!e2 || !r5 || !s7 || !l5) {
        this.resetHero();
        return;
      }
      t3.classList.add("has-recent-item"), t3.dataset.recentState = "ready", r5.inert = true, s7.inert = false, t3.setAttribute("aria-labelledby", "hero-returning-title"), r5?.setAttribute("aria-hidden", "true"), s7?.setAttribute("aria-hidden", "false"), l5 && (l5.href = e2.href), e2.imageUrl && i8 ? (i8.style.setProperty("--lv2-recent-hero-image", q(e2.imageUrl)), t3.classList.add("has-recent-image")) : (i8?.style.removeProperty("--lv2-recent-hero-image"), t3.classList.remove("has-recent-image"));
    }
    resetHero() {
      const e2 = document.getElementById("hero");
      if (!e2) return;
      const t3 = e2.querySelector(".lv2-hero-content"), r5 = e2.querySelector("[data-recent-hero-content]"), s7 = e2.querySelector("[data-recent-hero-media]");
      e2.classList.remove("has-recent-item", "has-recent-image"), delete e2.dataset.recentState, e2.setAttribute("aria-labelledby", e2.dataset.recentDefaultTitle || "hero-title"), t3 && (t3.inert = false), r5 && (r5.inert = true), t3?.removeAttribute("aria-hidden"), r5?.setAttribute("aria-hidden", "true"), s7?.style.removeProperty("--lv2-recent-hero-image");
    }
    text(e2, t3) {
      const r5 = this.config.copy[e2];
      return typeof r5 == "string" && r5.trim() ? r5 : t3;
    }
  };
  async function C2(n6, e2) {
    const t3 = n6.type === "gift" ? e(`/api/gifts/${encodeURIComponent(n6.shareableLink)}/metadata`) : e(`/api/letter/${encodeURIComponent(n6.shareableLink)}/metadata`);
    try {
      const r5 = await fetch(t3, { credentials: "include", headers: { accept: "application/json" }, signal: e2 });
      if (r5.status === 404 || r5.status === 410) return { record: null, missing: true };
      if (!r5.ok) return { record: null, missing: false };
      const s7 = await r5.json().catch(() => null), i8 = L3(s7, n6.type === "gift" ? "gift" : "letter");
      return { record: i8, missing: !i8 };
    } catch {
      return { record: null, missing: false };
    }
  }
  async function x(n6, e2) {
    const t3 = n6.type === "gift" ? e(`/api/gifts/${encodeURIComponent(n6.shareableLink)}/photos?take=1`) : e(`/api/letter/${encodeURIComponent(n6.shareableLink)}/photos?take=1`);
    try {
      const r5 = await fetch(t3, { credentials: "include", headers: { accept: "application/json" }, signal: e2 });
      if (!r5.ok) return null;
      const s7 = await r5.json().catch(() => null);
      if (!s7 || typeof s7 != "object" || Array.isArray(s7)) return null;
      const i8 = s7.photoUrls;
      return Array.isArray(i8) && typeof i8[0] == "string" && i8[0] ? i8[0] : null;
    } catch {
      return null;
    }
  }
  function L3(n6, e2) {
    if (!n6 || typeof n6 != "object" || Array.isArray(n6)) return null;
    const r5 = n6[e2];
    return r5 && typeof r5 == "object" && !Array.isArray(r5) ? r5 : null;
  }
  function g2(n6) {
    return typeof n6 == "string" && n6.trim() ? n6 : null;
  }
  function k3(n6, e2) {
    const t3 = new Date(n6);
    return Number.isNaN(t3.getTime()) ? "" : new Intl.DateTimeFormat(e2 || "en", { day: "2-digit", month: "short", year: "numeric" }).format(t3);
  }
  function q(n6) {
    return `url(${JSON.stringify(n6)})`;
  }
  function S3(n6) {
    const e2 = n6.querySelector("[data-recent-items-config]");
    if (!e2?.textContent) return {};
    try {
      const t3 = JSON.parse(e2.textContent);
      return t3 && typeof t3 == "object" && !Array.isArray(t3) ? t3 : {};
    } catch {
      return {};
    }
  }
  function I(n6) {
    return { locale: typeof n6.locale == "string" && n6.locale.trim() ? n6.locale : "en", copy: n6.copy && typeof n6.copy == "object" && !Array.isArray(n6.copy) ? n6.copy : {}, maxItems: m2(n6.maxItems, 8), initialVisibleCount: m2(n6.initialVisibleCount, 4) };
  }
  function m2(n6, e2) {
    return typeof n6 == "number" && Number.isInteger(n6) && n6 > 0 ? n6 : e2;
  }
  v2();

  // assets/_astro/themes.config.-2Q2DiBL.js
  var r = { halloween: { en: "hotel-halloween", pt: "hotel-halloween", es: "hotel-halloween", fr: "hotel-halloween", de: "hotel-halloween", zh: "hotel-halloween", "zh-tw": "hotel-halloween", ar: "hotel-halloween", ms: "hotel-halloween", ja: "hotel-halloween", ru: "hotel-halloween", ko: "hotel-halloween" }, "love-letter": { pt: "carta-de-amor", en: "love-letter", es: "carta-de-amor", fr: "lettre-damour", de: "liebesbrief", zh: "qingshu", "zh-tw": "qing-shu-tw", ar: "risalat-hub", ms: "surat-cinta", ja: "rabureta", ru: "lyubovnoe-pismo", ko: "sarang-pyeonji" }, birthday: { pt: "aniversario", en: "birthday", es: "cumpleanos", fr: "anniversaire", de: "geburtstag", zh: "shengri", "zh-tw": "sheng-ri-tw", ar: "eid-milad", ms: "hari-jadi", ja: "tanjobi", ru: "den-rozhdeniya", ko: "saengil" }, christmas: { pt: "cartao-de-natal", en: "christmas-card", es: "tarjeta-de-navidad", fr: "carte-de-noel", de: "weihnachtskarte", zh: "shengdan-ka", "zh-tw": "sheng-dan-ka-tw", ar: "bitaqat-eid-milad", ms: "kad-krismas", ja: "kurisumasu-kado", ru: "rozhdestvenskaya-otkrytka", ko: "keuriseumaseu-kadeu" }, valentines: { pt: "dia-dos-namorados", en: "valentines", es: "san-valentin", fr: "saint-valentin", de: "valentinstag", zh: "qingrenjie", "zh-tw": "qing-ren-jie-tw", ar: "eid-al-hob", ms: "hari-valentine", ja: "barentain-dee", ru: "den-svyatogo-valentina", ko: "ballentain-dei" }, "white-day": { pt: "white-day", en: "white-day", es: "white-day", fr: "white-day", de: "white-day", zh: "white-day", "zh-tw": "white-day-tw", ar: "white-day", ms: "white-day", ja: "white-day", ru: "white-day", ko: "hwaiteu-dei" }, "digital-love-gift": { pt: "presente-digital-amor", en: "digital-gift-for-loved-one", es: "regalo-digital-para-tu-amor", fr: "cadeau-digital-pour-etre-aime", de: "digitales-geschenk-fur-geliebte", zh: "shuzi-liwu-ai-ren", "zh-tw": "shu-zi-li-wu-ai-ren-tw", ar: "hadiya-raqmiya-lilhabib", ms: "hadiah-digital-untuk-yang-tersayang", ja: "dejitaru-gifuto-aisuru-hito", ru: "tsifrovoy-podarok-dlya-lyubimogo", ko: "saranghaneun-saram-digital-seonmul" }, anniversary: { pt: "presente-para-namorada", en: "anniversary-gift", es: "regalo-de-aniversario", fr: "cadeau-anniversaire-couple", de: "jahrestag-geschenk", zh: "zhounian-liwu", "zh-tw": "zhou-nian-liwu-tw", ar: "hadiya-dhikra-zawaj", ms: "hadiah-ulang-tahun-percintaan", ja: "kinenbi-okurimono", ru: "podarok-na-godovshchinu", ko: "ginyeomil-seonmul" }, "mothers-day": { pt: "presente-para-mae", en: "gift-for-mom", es: "regalo-para-mama", fr: "cadeau-pour-maman", de: "geschenk-fuer-mama", zh: "song-mama-liwu", "zh-tw": "song-mama-liwu-tw", ar: "hadiya-lilomm", ms: "hadiah-untuk-ibu", ja: "okasan-okurimono", ru: "podarok-dlya-mamy", ko: "eomma-seonmul" }, "fathers-day": { pt: "presente-para-pai", en: "gift-for-dad", es: "regalo-para-papa", fr: "cadeau-pour-papa", de: "geschenk-fuer-papa", zh: "song-baba-liwu", "zh-tw": "song-baba-liwu-tw", ar: "hadiya-lilab", ms: "hadiah-untuk-ayah", ja: "otosan-okurimono", ru: "podarok-dlya-papy", ko: "appa-seonmul" }, friendship: { pt: "presente-para-amiga", en: "gift-for-best-friend", es: "regalo-para-amiga", fr: "cadeau-pour-meilleure-amie", de: "geschenk-fuer-freundin", zh: "song-pengyou-liwu", "zh-tw": "song-pengyou-liwu-tw", ar: "hadiya-lissadiqa", ms: "hadiah-untuk-sahabat", ja: "tomodachi-okurimono", ru: "podarok-dlya-podrugi", ko: "chingu-seonmul" }, graduation: { pt: "presente-de-formatura", en: "graduation-gift", es: "regalo-de-graduacion", fr: "cadeau-diplome", de: "abschluss-geschenk", zh: "biye-liwu", "zh-tw": "bi-ye-liwu-tw", ar: "hadiya-takharruj", ms: "hadiah-graduasi", ja: "sotsugyou-okurimono", ru: "podarok-na-vypusknoj", ko: "joreop-seonmul" }, wedding: { pt: "presente-de-casamento", en: "wedding-gift", es: "regalo-de-boda", fr: "cadeau-de-mariage", de: "hochzeitsgeschenk", zh: "hunli-liwu", "zh-tw": "hun-li-liwu-tw", ar: "hadiya-azzifaf", ms: "hadiah-perkahwinan", ja: "kekkon-okurimono", ru: "svadebnyy-podarok", ko: "gyeolhon-seonmul" }, "new-year": { pt: "mensagem-de-ano-novo", en: "new-year-message", es: "mensaje-de-ano-nuevo", fr: "message-de-nouvel-an", de: "neujahrsbotschaft", zh: "xinnian-zhufu", "zh-tw": "xin-nian-zhufu-tw", ar: "risalat-ras-alsana", ms: "pesan-tahun-baru", ja: "shinnen-messeeji", ru: "novogodnee-soobshchenie", ko: "saehae-mesiji" } };
  var n2 = {};
  var t = (a4, e2) => {
    a4 && (n2[a4] && n2[a4] !== e2 || (n2[a4] = e2));
  };
  Object.entries(r).forEach(([a4, e2]) => {
    Object.values(e2).forEach((i8) => {
      t(i8, a4);
    });
  });
  var h2 = { "love-letter": ["nota-de-amor", "qing-shu"], valentines: ["valentines", "dia-dos-namorados", "san-valentin", "saint-valentin", "valentinstag", "qingrenjie", "qing-ren-jie-tw", "eid-al-hob", "hari-valentine", "barentain-dee", "den-svyatogo-valentina", "den-sviatogo-valentina", "ballentain-dei", "qing-ren-jie"], "white-day": ["white-day", "whiteday", "white_day"], birthday: ["hadiah-ulang-tahun", "sheng-ri", "tanjoubi"], christmas: ["sheng-dan-he-ka", "sheng-dan-ka"], "digital-love-gift": ["presente-digital-amor", "presente-digital-para-amado", "presente-digital-para-amada", "presente-digital-para-alguem-amado", "presente-digital-para-quem-voce-ama", "presente-digital-para-pessoa-amada", "digitales-geschenk-fuer-einen-geliebten-menschen", "digitales-geschenk-fuer-geliebte-menschen", "digitales-geschenk-fuer-liebste", "digital-gift-for-loved-one", "digital-love-gift", "gift-for-loved-one", "regalo-digital-para-alguien-que-quieres", "regalo-digital-para-un-ser-querido", "cadeau-numerique-pour-un-etre-cher", "cadeau-numerique-pour-un-proche", "shu-zi-ai-yi-li-wu", "shu-zi-li-wu-gei-ai-ren", "shu-zi-li-wu-gei-suo-ai-zhi-ren", "shu-zi-li-wu-song-gei-ai-ren", "shuzi-liwu-gei-ai-de-ren", "shuzi-liwu-song-gei-ai-de-ren", "shu-wei-li-wu-gei-suo-ai-de-ren", "shu-wei-li-wu-gei-suo-ai-zhi-ren", "hadiya-raqmiya-liman-toheb", "hadiya-raqmiya-liman-tuhib", "hadiah-digital-untuk-orang-tersayang", "koibito-e-no-dejitaru-gifuto", "podarok-dlya-lyubimogo-cheloveka-v-cifrovom-formate", "podarok-lyubimomu-cheloveku-v-cifrovom-formate"], anniversary: ["aniversario-de-casamento", "anniversary", "aniversario", "presente-de-aniversario", "anniversaire-amoureux", "cadeau-anniversaire", "jahrestag", "jahrestagsgeschenk", "jubil\xE4um-geschenk", "jubilaeum-geschenk", "zhounian", "zhou-nian-tw", "ji-nian-ri-li-wu", "zhou-nian-ji-nian-li-wu", "dhikra-zawaj", "dhikra-sanawiya-gift", "hadiyat-dhikra-sanawiya", "ulang-tahun-percintaan", "kinenbi", "godovshchina", "ginyeomil"], "mothers-day": ["mothers-day", "dia-das-maes", "diadasmaes", "dia-de-la-madre", "fete-des-meres", "muttertag", "muqinjie", "mu-qin-jie-tw", "eid-al-omm", "hari-ibu", "hahanohiokuri", "den-materi", "eomeoninal", "song-gei-ma-ma-de-li-wu"], "fathers-day": ["fathers-day", "dia-dos-pais", "dia-del-padre", "fete-des-peres", "vatertag", "fuqinjie", "fu-qin-jie-tw", "eid-al-ab", "hadiya-lil-ab", "hari-bapa", "chichinohi", "den-otsa", "abeojinal", "podarok-pape", "presente-para-o-pai", "song-gei-ba-ba-de-li-wu", "songgeibabadelIwu"], friendship: ["friendship-day", "dia-da-amizade", "dia-de-la-amistad", "journee-amitie", "freundschaftstag", "geschenk-fuer-den-besten-freund", "youyiri", "you-yi-ri-tw", "eid-as-sadaqa", "hari-persahabatan", "yuujounohi", "den-druzhby", "ujeongeuninal", "hadiah-untuk-sahabat-karib", "presente-para-melhor-amiga", "regalo-para-mejor-amigo", "song-gei-zui-hao-de-peng-you-de-li-wu"], graduation: ["graduation", "formatura", "graduacion", "remise-des-diplomes", "abschlussfeier", "biyejidian", "bi-ye-ji-dian-tw", "haflet-takharruj", "majlis-graduasi", "sotsugyou", "vypusknoj", "joreop"], wedding: ["wedding", "casamento", "boda", "hadiyat-zafaf", "mariage", "hochzeit", "hunli", "hun-li-tw", "zifaf", "perkahwinan", "kekkon", "svadba", "svadebnyj-podarok", "gyeolhon", "hun-li-li-wu"], "new-year": ["new-year", "ano-novo", "ano-nuevo", "nouvel-an", "neujahr", "neujahrsnachricht", "xinnian", "xin-nian-tw", "eid-ras-alsana", "ras-al-sana-message", "tahun-baru", "mesej-tahun-baru", "shinnen", "shinnen-no-aisatsu", "novyy-god", "saehae", "saehae-message", "xin-nian-zhu-fu", "new_year", "newyear"] };
  Object.entries(h2).forEach(([a4, e2]) => {
    (e2 || []).forEach((i8) => t(i8, a4));
  });
  var o = { "love-letter": { en: "love-letter", pt: "carta-de-amor", es: "carta-de-amor", fr: "lettre-damour", de: "liebesbrief", zh: "qingshu", "zh-tw": "qing-shu-tw", ar: "risalat-hub", ms: "surat-cinta", ja: "rabureta", ru: "lyubovnoe-pismo", ko: "sarang-pyeonji" }, birthday: { en: "birthday", pt: "aniversario", es: "cumpleanos", fr: "anniversaire", de: "geburtstag", zh: "shengri", "zh-tw": "sheng-ri-tw", ar: "eid-milad", ms: "hari-jadi", ja: "tanjobi", ru: "den-rozhdeniya", ko: "saengil" }, christmas: { en: "christmas-card", pt: "cartao-de-natal", es: "tarjeta-de-navidad", fr: "carte-de-noel", de: "weihnachtskarte", zh: "shengdan-ka", "zh-tw": "sheng-dan-ka-tw", ar: "bitaqat-eid-milad", ms: "kad-krismas", ja: "kurisumasu-kado", ru: "rozhdestvenskaya-otkrytka", ko: "keuriseumaseu-kadeu" }, party: { en: "birthday-party", pt: "festa-de-aniversario", es: "fiesta-de-cumpleanos", fr: "fete-anniversaire", de: "geburtstagsparty", zh: "shengri-paidui", "zh-tw": "sheng-ri-pai-dui-tw", ar: "haflat-eid-milad", ms: "parti-hari-jadi", ja: "tanjobi-party", ru: "vecherinka-den-rozhdeniya", ko: "saengil-pati" }, bloom: { en: "bloom-letter", pt: "carta-florescer", es: "carta-florecer", fr: "lettre-floraison", de: "bluetenbrief", zh: "kaihua-xin", "zh-tw": "kai-hua-xin-tw", ar: "risalat-zuhur", ms: "surat-mekar", ja: "hana-no-tegami", ru: "tsvetushchee-pismo", ko: "kkot-pyeonji" }, halloween: { en: "halloween", pt: "halloween", es: "halloween", fr: "halloween", de: "halloween", zh: "halloween", "zh-tw": "halloween", ar: "halloween", ms: "halloween", ja: "halloween", ru: "halloween", ko: "halloween" }, "white-day": { en: "white-day", pt: "white-day", es: "white-day", fr: "white-day", de: "white-day", zh: "white-day", "zh-tw": "white-day-tw", ar: "white-day", ms: "white-day", ja: "white-day", ru: "white-day", ko: "hwaiteu-dei" } };
  var s3 = {};
  Object.entries(o).forEach(([a4, e2]) => {
    Object.values(e2).forEach((i8) => {
      s3[i8] = a4;
    });
  });

  // assets/_astro/routes.CXc0Od-a.js
  var n3 = [{ kind: "landing", owner: "astro", pattern: "/:lang", requiresApi: false }, { kind: "event", owner: "astro", pattern: "/:lang/event/:eventSlug", requiresApi: false }, { kind: "blog-index", owner: "astro", pattern: "/:lang/blog", requiresApi: true }, { kind: "blog-index", owner: "astro", pattern: "/:lang/blog/page/:page", requiresApi: true }, { kind: "blog-post", owner: "astro", pattern: "/:lang/blog/:slug", requiresApi: true }, { kind: "blog-category", owner: "astro", pattern: "/:lang/blog/category/:slug", requiresApi: true }, { kind: "blog-tag", owner: "astro", pattern: "/:lang/blog/tag/:slug", requiresApi: true }, { kind: "contact", owner: "astro", pattern: "/:lang/contact", requiresApi: true }, { kind: "privacy", owner: "astro", pattern: "/:lang/privacy", requiresApi: false }, { kind: "cookies", owner: "astro", pattern: "/:lang/cookies", requiresApi: false }, { kind: "dmca", owner: "astro", pattern: "/:lang/dmca", requiresApi: false }, { kind: "copyright", owner: "astro", pattern: "/:lang/copyright", requiresApi: false }, { kind: "legal-document", owner: "astro", pattern: "/:lang/legal-document", requiresApi: false, noindex: true }, { kind: "terms", owner: "astro", pattern: "/:lang/terms", requiresApi: false }, { kind: "about", owner: "astro", pattern: "/:lang/about", requiresApi: false }, { kind: "pricing", owner: "astro", pattern: "/:lang/pricing", requiresApi: true }, { kind: "payment-success", owner: "astro", pattern: "/:lang/payment-success", requiresApi: true, noindex: true }, { kind: "my-gifts", owner: "astro", pattern: "/:lang/my-gifts", requiresApi: true }, { kind: "thank-you", owner: "astro", pattern: "/:lang/thank-you/:link", requiresApi: true, noindex: true }];
  var i5 = [{ kind: "create", owner: "sveltekit", pattern: "/:lang/create", requiresApi: true }, { kind: "create-ecards", owner: "sveltekit", pattern: "/:lang/create/ecards", requiresApi: true }, { kind: "create-theme", owner: "sveltekit", pattern: "/:lang/create/:theme", requiresApi: true }, { kind: "letter", owner: "sveltekit", pattern: "/:lang/letter/:link", requiresApi: true }, { kind: "letter-edit", owner: "sveltekit", pattern: "/:lang/letter/:link/edit", requiresApi: true, noindex: true }, { kind: "cards", owner: "sveltekit", pattern: "/:lang/cards/:link", requiresApi: true }, { kind: "cards-edit", owner: "sveltekit", pattern: "/:lang/cards/:link/edit", requiresApi: true, noindex: true }, { kind: "password-reset", owner: "sveltekit", pattern: "/:lang/reset-password", requiresApi: true, noindex: true }];
  var s4 = [...n3, ...i5];
  function o2(r5, e2 = "") {
    const t3 = e2.startsWith("/") ? e2 : `/${e2}`;
    return t3 === "/" ? `/${r5}` : `/${r5}${t3}`;
  }

  // assets/_astro/OpenGift.astro_astro_type_script_index_0_lang.CuBrHGVX.js
  var u2 = ["https://www.2-luv.com", "https://2-luv.com"];
  var s5 = /^[A-Za-z0-9_-]{3,160}$/;
  var c3 = /^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?(letter|cards)\/([A-Za-z0-9_-]+)\/?$/;
  function d3(e2, n6, i8) {
    const t3 = e2.trim();
    if (!t3 || t3.length > 2048) return null;
    if (t3.includes("/") || t3.includes(":")) try {
      const o6 = new URL(t3, i8 || u2[0]);
      if (!new Set([...u2, i8].filter(Boolean)).has(o6.origin) || o6.username || o6.password) return null;
      const a4 = o6.pathname.match(c3);
      return !a4 || !s5.test(a4[2]) ? null : o2(n6, `/${a4[1]}/${a4[2]}`);
    } catch {
      return null;
    }
    return s5.test(t3) ? o2(n6, `/letter/${t3}`) : null;
  }
  var r2 = document.querySelector("[data-lv3-open-form]");
  if (r2) {
    const e2 = r2.querySelector("input"), n6 = r2.querySelector(".lv3-open-error");
    r2.addEventListener("submit", (i8) => {
      i8.preventDefault();
      const t3 = d3(e2?.value || "", r2.dataset.locale || "en", window.location.origin);
      if (!t3) {
        n6 && (n6.hidden = false), e2?.setAttribute("aria-invalid", "true"), e2?.focus();
        return;
      }
      window.location.assign(t3);
    }), e2?.addEventListener("input", () => {
      n6 && (n6.hidden = true), e2.removeAttribute("aria-invalid");
    });
  }

  // assets/_astro/preload-helper.CVfkMyKi.js
  var h3 = (function() {
    const s7 = typeof document < "u" && document.createElement("link").relList;
    return s7 && s7.supports && s7.supports("modulepreload") ? "modulepreload" : "preload";
  })();
  var v3 = function(l5) {
    return "/" + l5;
  };
  var d4 = {};
  var y3 = function(s7, i8, E3) {
    let a4 = Promise.resolve();
    if (i8 && i8.length > 0) {
      let f4 = function(e2) {
        return Promise.all(e2.map((o6) => Promise.resolve(o6).then((c6) => ({ status: "fulfilled", value: c6 }), (c6) => ({ status: "rejected", reason: c6 }))));
      };
      document.getElementsByTagName("link");
      const r5 = document.querySelector("meta[property=csp-nonce]"), t3 = r5?.nonce || r5?.getAttribute("nonce");
      a4 = f4(i8.map((e2) => {
        if (e2 = v3(e2), e2 in d4) return;
        d4[e2] = true;
        const o6 = e2.endsWith(".css"), c6 = o6 ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${e2}"]${c6}`)) return;
        const n6 = document.createElement("link");
        if (n6.rel = o6 ? "stylesheet" : h3, o6 || (n6.as = "script"), n6.crossOrigin = "", n6.href = e2, t3 && n6.setAttribute("nonce", t3), document.head.appendChild(n6), o6) return new Promise((m5, p3) => {
          n6.addEventListener("load", m5), n6.addEventListener("error", () => p3(new Error(`Unable to preload CSS for ${e2}`)));
        });
      }));
    }
    function u5(r5) {
      const t3 = new Event("vite:preloadError", { cancelable: true });
      if (t3.payload = r5, window.dispatchEvent(t3), !t3.defaultPrevented) throw r5;
    }
    return a4.then((r5) => {
      for (const t3 of r5 || []) t3.status === "rejected" && u5(t3.reason);
      return s7().catch(u5);
    });
  };

  // assets/_astro/reveal.D3SOoAzP.js
  var __vite__mapDeps = () => [];
  function _2(i8) {
    const u5 = (c6) => {
      if (!(!c6 || typeof c6.formatted != "string" || !c6.formatted.trim()) && !(!Number.isFinite(c6.priceAmount) || c6.priceAmount < 0)) return c6.formatted.trim();
    }, m5 = i8.bundle?.formattedBundle?.trim() || i8.bundle?.formattedCard?.trim() || void 0, r5 = u5(i8.themes?.halloween), s7 = u5(i8.themes?.christmas), g4 = u5(i8.themes?.party);
    return { letter: u5(i8.letter), bundle: m5, halloween: r5, christmas: s7, party: g4, cinematic: g4 || r5 || s7 };
  }
  function M2(i8, u5 = {}) {
    const m5 = i8.dataset.lv3PricingEndpoint || "/api/pricing/landing", r5 = i8.dataset.lv3Locale || document.documentElement.lang || "en", s7 = new AbortController();
    let g4, c6 = 0, v5 = 0, f4 = false, h5 = false, y5 = false, p3;
    const b3 = () => Array.from(document.querySelectorAll("[data-lv3-price]"));
    function C5(n6, d8 = {}) {
      document.documentElement.dataset.lv3Pricing = n6;
      for (const l5 of b3()) {
        const e2 = l5.dataset.lv3Price, t3 = d8[e2], a4 = n6 === "ready" ? t3 ? "ready" : "missing" : n6;
        if (l5.dataset.lv3PriceState = a4, a4 === "ready" && t3) {
          const A4 = l5.dataset.lv3Template;
          l5.textContent = A4 ? A4.replace("{price}", t3) : t3;
        }
        const w4 = l5.closest("[data-lv3-price-wrap]");
        w4 && (w4.dataset.lv3PriceState = a4);
      }
      document.querySelectorAll("[data-lv3-price-status]").forEach((l5) => {
        l5.setAttribute("aria-busy", String(n6 === "loading")), l5.dataset.lv3PriceState = n6;
      });
    }
    async function P2(n6 = 0) {
      if (f4 || y5) return;
      h5 = true, p3?.disconnect(), window.clearTimeout(v5), v5 = 0, y5 = true, C5("loading");
      const d8 = new AbortController();
      g4 = d8, c6 = window.setTimeout(() => d8.abort(), 8e3);
      try {
        const { buildClientPricingRequest: l5 } = await y3(async () => {
          const { buildClientPricingRequest: T2 } = await Promise.resolve().then(() => (init_index_B3_yPIWO(), index_B3_yPIWO_exports));
          return { buildClientPricingRequest: T2 };
        }, __vite__mapDeps([0, 1, 2]));
        if (f4) return;
        if (d8.signal.aborted) throw new Error("Price unavailable");
        const { url: e2, headers: t3 } = l5(m5, { locale: r5 }), a4 = await fetch(e2, { headers: t3, cache: "default", credentials: "omit", signal: d8.signal });
        if (!a4.ok) throw new Error("Price unavailable");
        const w4 = await a4.json(), A4 = _2(w4);
        if (!A4.letter) throw new Error("Invalid price");
        if (f4) return;
        i(w4.regionCode), C5("ready", A4);
      } catch {
        if (f4) return;
        n6 === 0 && navigator.onLine !== false ? v5 = window.setTimeout(() => {
          v5 = 0, P2(1);
        }, 800) : C5("error");
      } finally {
        window.clearTimeout(c6), c6 = 0, g4 = void 0, y5 = false;
      }
    }
    function E3() {
      h5 || f4 || (h5 = true, P2());
    }
    let k4 = false;
    function L4() {
      h5 || f4 || k4 || (k4 = true, window.requestAnimationFrame(() => window.setTimeout(E3, 0)));
    }
    document.querySelectorAll("[data-lv3-price-retry]").forEach((n6) => {
      n6.addEventListener("click", () => {
        P2();
      }, { signal: s7.signal });
    }), window.addEventListener("online", () => {
      document.documentElement.dataset.lv3Pricing === "error" && P2();
    }, { signal: s7.signal });
    const S4 = () => {
      const n6 = window.requestIdleCallback;
      n6 ? n6(E3, { timeout: 1500 }) : window.setTimeout(E3, 300);
    };
    if (u5.activation === "proximity" && typeof IntersectionObserver < "u") {
      p3 = new IntersectionObserver((n6) => {
        n6.some((d8) => d8.isIntersecting) && E3();
      }, { rootMargin: "300px 0px" });
      for (const n6 of b3()) p3.observe(n6.closest("[data-lv3-price-wrap]") || n6);
      i8.querySelectorAll('a[href="#pricing"], a[href="#presentes"]').forEach((n6) => {
        n6.addEventListener("pointerenter", L4, { once: true, signal: s7.signal }), n6.addEventListener("focus", L4, { once: true, signal: s7.signal }), n6.addEventListener("click", L4, { once: true, signal: s7.signal });
      });
    } else document.readyState === "complete" ? S4() : window.addEventListener("load", S4, { once: true, signal: s7.signal });
    return document.querySelector("[data-menu-button]")?.addEventListener("click", L4, { once: true, signal: s7.signal }), () => {
      f4 = true, p3?.disconnect(), s7.abort(), g4?.abort(), window.clearTimeout(c6), window.clearTimeout(v5);
    };
  }
  function B(i8) {
    const u5 = Array.from(i8.querySelectorAll("[data-lv3-reveal]"));
    if (!u5.length) return () => {
    };
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {
    };
    let m5 = false;
    const r5 = /* @__PURE__ */ new Map(), s7 = [], g4 = window.CSS?.supports("content-visibility", "auto") && window.CSS.supports("contain-intrinsic-block-size", "auto 1px");
    for (const e2 of u5) {
      const t3 = g4 ? e2.closest("[data-lv3-render-section]") : null;
      if (!t3 || !i8.contains(t3)) {
        s7.push(e2);
        continue;
      }
      const a4 = r5.get(t3) ?? [];
      a4.push(e2), r5.set(t3, a4);
    }
    const c6 = new Set(r5.keys()), v5 = /* @__PURE__ */ new Set(), f4 = /* @__PURE__ */ new Set(), h5 = (e2) => {
      m5 || (e2.classList.add("is-in"), v5.delete(e2) && y5.unobserve(e2));
    }, y5 = new IntersectionObserver((e2) => {
      if (!m5) for (const t3 of e2) t3.isIntersecting && h5(t3.target);
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }), p3 = r5.size ? new IntersectionObserver((e2) => {
      m5 || b3(e2.filter((t3) => t3.isIntersecting && c6.has(t3.target)).map((t3) => t3.target));
    }, { rootMargin: "600px 0px", threshold: 0 }) : null, b3 = (e2, t3 = false, a4 = []) => {
      if (m5) return;
      const w4 = [...a4, ...e2.flatMap((o6) => r5.get(o6) ?? [])], A4 = window.innerHeight || document.documentElement.clientHeight, T2 = t3 ? w4 : w4.filter((o6) => {
        const q3 = o6.getBoundingClientRect();
        return q3.top < A4 && q3.bottom > 0;
      });
      for (const o6 of T2) h5(o6);
      const I4 = [];
      for (const o6 of e2) c6.delete(o6) && I4.push(o6), o6.setAttribute("data-lv3-render-active", ""), f4.delete(o6) && p3?.unobserve(o6);
      for (const o6 of w4) !o6.classList.contains("is-in") && !v5.has(o6) && (v5.add(o6), y5.observe(o6));
      for (const o6 of I4) o6.dispatchEvent(new Event("lv3:section-active"));
    }, C5 = window.innerHeight || document.documentElement.clientHeight, P2 = [...r5.keys()].filter((e2) => {
      const t3 = e2.getBoundingClientRect();
      return t3.top < C5 + 600 && t3.bottom > -600;
    });
    b3(P2, false, s7), i8.classList.add("js-reveal");
    for (const e2 of c6) f4.add(e2), p3?.observe(e2);
    const E3 = (e2) => {
      if (!e2 || !i8.contains(e2)) return;
      const t3 = e2.closest("[data-lv3-render-section]");
      if (t3 && r5.has(t3)) b3([t3], true);
      else for (const a4 of u5) (a4 === e2 || a4.contains(e2)) && h5(a4);
    }, k4 = (e2 = window.location.hash) => {
      if (e2.startsWith("#")) try {
        E3(document.getElementById(decodeURIComponent(e2.slice(1))));
      } catch {
      }
    }, L4 = () => k4(), S4 = (e2) => E3(e2.target), n6 = (e2) => {
      const t3 = e2.target?.closest?.("a[href]")?.getAttribute("href");
      t3?.startsWith("#") && k4(t3);
    }, d8 = (e2) => {
      e2.skipped === false && b3([e2.currentTarget], true);
    }, l5 = () => b3([...r5.keys()], true, s7);
    window.addEventListener("beforeprint", l5), window.addEventListener("hashchange", L4), i8.addEventListener("focusin", S4), i8.addEventListener("beforematch", S4), i8.addEventListener("click", n6, true);
    for (const e2 of r5.keys()) e2.addEventListener("contentvisibilityautostatechange", d8);
    return k4(), () => {
      m5 = true, y5.disconnect(), p3?.disconnect(), window.removeEventListener("beforeprint", l5), window.removeEventListener("hashchange", L4), i8.removeEventListener("focusin", S4), i8.removeEventListener("beforematch", S4), i8.removeEventListener("click", n6, true);
      for (const e2 of r5.keys()) e2.removeEventListener("contentvisibilityautostatechange", d8);
    };
  }

  // assets/_astro/index.DWg2_xtr.js
  function n5(e2, t3) {
    return e2.replace(/\{([a-zA-Z]+)\}/g, (l5, r5) => Object.prototype.hasOwnProperty.call(t3, r5) ? String(t3[r5]) : l5);
  }
  function o4(e2, t3, l5) {
    let r5 = "other";
    try {
      r5 = new Intl.PluralRules(l5).select(t3);
    } catch {
      r5 = t3 === 1 ? "one" : "other";
    }
    return n5(e2[r5] || e2.other, { count: new Intl.NumberFormat(l5).format(t3) });
  }

  // assets/_astro/HomeLanding.astro_astro_type_script_index_0_lang.DMItkbyZ.js
  var z = 120;
  var P = 250;
  function V(e2) {
    const t3 = window.matchMedia("(prefers-reduced-motion: reduce)").matches, n6 = !!navigator.connection?.saveData;
    if (t3 || n6) return;
    const r5 = Array.from(e2.querySelectorAll("[data-lv3-card-video]")), l5 = (a4) => a4.querySelector("video"), c6 = /* @__PURE__ */ new Map(), h5 = (a4, o6) => {
      c6.has(a4) || c6.set(a4, window.setTimeout(() => {
        const s7 = l5(a4);
        !s7 || !c6.has(a4) || (s7.dataset.src && (s7.src = s7.dataset.src, delete s7.dataset.src), s7.play().then(() => {
          c6.has(a4) ? a4.classList.add("is-playing") : s7.pause();
        }).catch(() => {
        }));
      }, o6));
    }, m5 = (a4) => {
      c6.has(a4) && (window.clearTimeout(c6.get(a4)), c6.delete(a4), a4.classList.remove("is-playing"), l5(a4)?.pause());
    };
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const a4 = (o6, s7) => {
        c6.forEach((i8, p3) => {
          p3 !== o6 && m5(p3);
        }), h5(o6, s7);
      };
      r5.forEach((o6) => {
        const s7 = o6.closest("a") ?? o6;
        s7.addEventListener("pointerenter", () => a4(o6, z)), s7.addEventListener("pointerleave", () => m5(o6)), s7.addEventListener("focusin", () => a4(o6, 0)), s7.addEventListener("focusout", () => m5(o6));
      });
      return;
    }
    if (!("IntersectionObserver" in window)) return;
    const v5 = new IntersectionObserver((a4) => {
      a4.forEach((o6) => {
        const s7 = o6.target, i8 = o6.boundingClientRect.width ? o6.intersectionRect.width / o6.boundingClientRect.width : 0;
        o6.isIntersecting && i8 >= 0.6 ? h5(s7, P) : m5(s7);
      });
    }, { rootMargin: "-40% 0px -40% 0px", threshold: Array.from({ length: 21 }, (a4, o6) => o6 / 20) });
    r5.forEach((a4) => v5.observe(a4));
  }
  var $ = { month: 10, day: 31 };
  var N2 = { month: 12, day: 25 };
  var H = 25;
  function B2(e2, t3) {
    try {
      const n6 = new Intl.DateTimeFormat("en-US", { timeZone: t3, year: "numeric", month: "numeric", day: "numeric" }).formatToParts(e2), r5 = (c6) => Number(n6.find((h5) => h5.type === c6)?.value), l5 = { year: r5("year"), month: r5("month"), day: r5("day") };
      if (Number.isFinite(l5.year) && Number.isFinite(l5.month) && Number.isFinite(l5.day)) return l5;
    } catch {
    }
    return { year: e2.getFullYear(), month: e2.getMonth() + 1, day: e2.getDate() };
  }
  function _3(e2, t3) {
    const n6 = t3 || "", r5 = !n6 || n6.startsWith("America/") || n6.startsWith("Brazil/");
    return e2 === "pt" && r5 ? { month: 6, day: 12 } : { month: 2, day: 14 };
  }
  function R4(e2) {
    return { month: 11, day: 1 + (4 - new Date(Date.UTC(e2, 10, 1)).getUTCDay() + 7) % 7 + 21 + 1 };
  }
  function q2(e2) {
    return Date.UTC(e2.year, e2.month - 1, e2.day, 12);
  }
  function I3(e2, t3) {
    const n6 = Z(e2, t3);
    return Math.round((q2(n6) - q2(e2)) / 864e5);
  }
  function Z(e2, t3) {
    const n6 = { year: e2.year, month: t3.month, day: t3.day };
    return q2(n6) >= q2(e2) ? n6 : { ...n6, year: e2.year + 1 };
  }
  function J(e2, t3) {
    return e2.month > t3.month || e2.month === t3.month && e2.day >= t3.day;
  }
  function K(e2, t3, n6) {
    return e2.month === 10 ? "halloween" : e2.month === 11 || e2.month === 12 && e2.day <= N2.day ? "christmas" : I3(e2, _3(t3, n6)) <= H ? "valentines" : "love";
  }
  function j(e2) {
    return e2.month === 12 ? true : e2.month === 11 && J(e2, R4(e2.year));
  }
  function C4(e2, t3, n6 = 2026) {
    try {
      return new Intl.DateTimeFormat(e2, { day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(n6, t3.month - 1, t3.day, 12)));
    } catch {
      return `${t3.day}/${t3.month}`;
    }
  }
  var u3 = document.querySelector("[data-lv3-root]");
  if (u3) {
    const e2 = JSON.parse(document.querySelector("[data-lv3-home-config]")?.textContent || "{}");
    let t3;
    try {
      t3 = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      t3 = void 0;
    }
    const n6 = B2(/* @__PURE__ */ new Date(), t3);
    let r5 = e2.occasion ?? K(n6, e2.locale, t3);
    const l5 = new URLSearchParams(location.search).get("season");
    !e2.occasion && (l5 === "love" || l5 === "valentines" || l5 === "halloween" || l5 === "christmas") && (r5 = l5);
    const c6 = j(n6), h5 = R4(n6.year), m5 = _3(e2.locale, t3), v5 = { valentines: m5, halloween: $, christmas: N2 }, a4 = { ...v5, christmas: c6 ? N2 : h5 }, o6 = (d8) => {
      const g4 = I3(n6, d8);
      return g4 === 0 ? e2.today : o4(e2.days, g4, e2.locale);
    }, s7 = u3.querySelector("[data-lv3-hero]");
    s7 && (s7.dataset.season = r5);
    const i8 = u3.querySelector("[data-lv3-season-pill]"), p3 = i8?.querySelector("[data-lv3-pill-text]"), D = i8?.querySelector("[data-lv3-pill-tag]"), E3 = i8?.querySelector("[data-lv3-pill-name]"), T2 = i8?.querySelector("[data-lv3-pill-date]"), S4 = i8?.querySelector("[data-lv3-pill-count]");
    i8 && p3 && D && E3 && T2 && S4 && (r5 === "love" ? (i8.dataset.season = e2.evergreen.key, p3.textContent = e2.evergreen.label, E3.textContent = e2.evergreen.tag, T2.textContent = "", D.hidden = !e2.evergreen.tag, i8.href = e2.links.love || i8.href, S4.hidden = true) : (i8.dataset.season = r5, p3.textContent = r5 === "christmas" && !c6 ? n5(e2.pills.christmasSoon, { date: C4(e2.locale, h5, n6.year) }) : e2.pills[r5], E3.textContent = e2.seasonNames[r5], T2.textContent = ` \xB7 ${C4(e2.locale, v5[r5], n6.year)}`, D.hidden = false, i8.href = e2.links[r5] || i8.href, S4.textContent = o6(a4[r5]), S4.hidden = false));
    const M3 = u3.querySelector("[data-lv3-gift-featured]"), A4 = u3.querySelector("[data-lv3-gift-grid]"), x3 = !e2.occasion && e2.bloomLive ? "bloom" : "love", b3 = r5 === "halloween" || r5 === "christmas" ? r5 : x3, w4 = A4?.querySelector(`li[data-gift="${b3}"]`);
    if (M3 && A4 && w4 && (A4.querySelectorAll("li[data-featured]").forEach((d8) => d8.removeAttribute("data-featured")), w4.setAttribute("data-featured", ""), M3.append(w4), r5 !== "love")) {
      const d8 = w4.querySelector("[data-lv3-gift-now]");
      d8 && (d8.textContent = o6(a4[r5]), d8.hidden = false);
    }
    const L4 = u3.querySelector("[data-lv3-dates-list]"), U2 = u3.querySelector('[data-lv3-season-when="valentines"]');
    if (U2 && (U2.textContent = C4(e2.locale, m5, n6.year)), L4) {
      const d8 = Array.from(L4.querySelectorAll("li[data-season]")), g4 = (f4) => {
        const y5 = v5[f4.dataset.season || ""];
        return y5 ? I3(n6, y5) : Number.POSITIVE_INFINITY;
      };
      d8.sort((f4, y5) => g4(f4) - g4(y5)).forEach((f4) => L4.append(f4)), d8.forEach((f4) => {
        const y5 = v5[f4.dataset.season || ""], O3 = f4.querySelector("[data-lv3-season-count]");
        y5 && O3 && (O3.textContent = o6(y5), O3.hidden = false);
      });
    }
    u3.querySelectorAll("[data-lv3-christmas-opens]").forEach((d8) => {
      d8.textContent = n5(e2.christmasOpens, { date: C4(e2.locale, h5, n6.year) }), d8.hidden = c6;
    }), B(u3), M2(u3, { activation: "proximity" }), V(u3);
  }

  // assets/_astro/consent-theme.6ywPEaCg.js
  var o5 = new Set(Object.keys(r.halloween));

  // assets/_astro/BaseLayout.astro_astro_type_script_index_0_lang.DJpd15VC.js
  function _4(t3, o6) {
    return !t3 || !!(o6?.categories.analytics || o6?.categories.marketing);
  }
  var d7 = "../_lazy/privacy-controls-DtZB9K6_.js";
  function i7(t3) {
    const o6 = window;
    return o6.__TWOLUV_PRIVACY_BOOT__ ? (o6.__TWOLUV_PRIVACY_BOOT__(), t3 && window.dispatchEvent(new CustomEvent("2luv:open-cookie-preferences", { detail: t3 })), o6.__TWOLUV_PRIVACY_BUNDLE__) : (o6.__TWOLUV_PRIVACY_BUNDLE__ || (o6.__TWOLUV_PRIVACY_BUNDLE__ = import(d7).then((e2) => {
      const n6 = e2.bootPrivacyControls;
      n6 && (o6.__TWOLUV_PRIVACY_BOOT__ = n6, n6());
    }).catch((e2) => {
      o6.__TWOLUV_PRIVACY_BUNDLE__ = void 0, console.error("[2luv] Failed to load privacy controls.", e2);
    })), o6.__TWOLUV_PRIVACY_BUNDLE__.then(() => {
      t3 && o6.__TWOLUV_PRIVACY_BOOT__ && window.dispatchEvent(new CustomEvent("2luv:open-cookie-preferences", { detail: t3 }));
    }));
  }
  function u4() {
    try {
      return window.localStorage.getItem("cookie-consent") ? true : document.cookie.split(";").some((t3) => t3.trim().startsWith("cookie-consent="));
    } catch {
      return false;
    }
  }
  function r4() {
    if (!_4(!!document.querySelector("[data-privacy-cookie-ssr]"), w())) return;
    const t3 = u4() ? 1600 : 700, o6 = () => {
      i7();
    }, e2 = window.requestIdleCallback;
    e2 ? e2(o6, { timeout: t3 }) : globalThis.setTimeout(o6, t3);
  }
  document.addEventListener("click", (t3) => {
    const o6 = t3.target instanceof Element ? t3.target.closest("[data-privacy-cookie-ssr] [data-consent-action]") : null, e2 = o6?.closest("[data-privacy-cookie-ssr]");
    if (e2?.hasAttribute("data-consent-action-pending")) {
      t3.preventDefault(), t3.stopImmediatePropagation();
      return;
    }
    if (window.__TWOLUV_PRIVACY_BOOT__) return;
    if (o6) {
      t3.preventDefault(), t3.stopImmediatePropagation(), e2?.setAttribute("data-consent-action-pending", ""), o6.setAttribute("aria-busy", "true");
      const c6 = o6.getAttribute("data-consent-action");
      Promise.resolve(i7()).then(() => {
        e2?.removeAttribute("data-consent-action-pending"), o6.removeAttribute("aria-busy"), window.__TWOLUV_PRIVACY_BOOT__ && window.dispatchEvent(new CustomEvent("2luv:cookie-banner-action", { detail: { action: c6 } }));
      });
      return;
    }
    const n6 = t3.target instanceof Element ? t3.target.closest("[data-2luv-open-cookie-preferences]") : null;
    if (!n6) return;
    t3.preventDefault();
    const a4 = n6.getAttribute("data-2luv-cookie-focus") || void 0;
    i7(a4 ? { focusCategory: a4 } : {});
  }, true);
  window.addEventListener("2luv:open-cookie-preferences", (t3) => {
    if (window.__TWOLUV_PRIVACY_BOOT__) return;
    t3.stopImmediatePropagation();
    const o6 = t3 instanceof CustomEvent ? t3.detail : void 0;
    i7(o6);
  });
  r4();
  document.addEventListener("astro:page-load", r4);
})();
