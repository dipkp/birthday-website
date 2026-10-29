(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // assets/_astro/pricing-region-controls.B3QK6_Sx.js
  function i(t2) {
    if (typeof t2 != "string") return;
    const r3 = document.querySelectorAll("[data-header-region], [data-footer-region]");
    let n3;
    for (const e2 of r3) {
      const o3 = Array.from(e2.options).find((c3) => c3.value === t2);
      o3 && (e2.value = t2, n3 = o3.textContent?.trim());
    }
    n3 && (document.documentElement.dataset.pricingRegion = t2, document.querySelectorAll("[data-header-currency]").forEach((e2) => {
      e2.textContent = n3;
    }));
  }
  function a(t2) {
    return document.documentElement.dataset.pricingRegion || t2;
  }

  // assets/_astro/HeaderV2.astro_astro_type_script_index_0_lang.DKQMm5Va.js
  (() => {
    const i6 = window, A4 = document.getElementById("lv2-header-config"), r3 = A4 ? JSON.parse(A4.textContent || "{}") : {}, g3 = document.querySelector("[data-lv2-header]"), c3 = document.querySelector("[data-menu-button]"), h3 = document.querySelector("[data-menu-panel]"), U = document.querySelector("[data-menu-icon-open]"), x2 = document.querySelector("[data-menu-icon-close]"), l3 = document.querySelector("[data-theme-toggle]"), F = document.querySelector('[data-theme-icon="system"]'), V = document.querySelector('[data-theme-icon="moon"]'), Y = document.querySelector('[data-theme-icon="sun"]'), w3 = document.querySelector("[data-blog-post-drawer-nav]"), f2 = w3 ? Array.from(w3.querySelectorAll('a[href^="#"]')) : [], d4 = f2.reduce((e2, t2) => {
      const n3 = p2(t2.getAttribute("href") || "").slice(1), o3 = n3 ? document.getElementById(n3) : null;
      return o3 && e2.push({ link: t2, target: o3 }), e2;
    }, []);
    let v3 = false, y3 = 0;
    const u3 = r3.themeLabels || { system: "System", light: "Light", dark: "Dark" }, j = r3.themeStateTemplate || "Theme: {current}. Switch to {next}.", J = ["system", "light", "dark"], W = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null, q2 = (e2, t2) => {
      document.cookie = `${e2}=${encodeURIComponent(t2)};path=/;max-age=31536000;samesite=lax`;
    }, I2 = (e2) => {
      document.cookie = `${e2}=;path=/;max-age=0;samesite=lax`;
    }, m3 = (e2, t2) => {
      e2?.classList.toggle("lv2-icon-hidden", t2);
    };
    function p2(e2) {
      try {
        return decodeURIComponent(e2);
      } catch {
        return e2;
      }
    }
    const S4 = (e2) => typeof e2 == "string" && J.includes(e2) ? e2 : "system", X = (e2) => e2 === "dark" ? "dark" : "light", $ = (e2) => e2 === "system" && W?.matches || e2 === "dark" ? "dark" : "light", P = () => {
      try {
        return S4(window.localStorage.getItem("theme"));
      } catch {
        return "system";
      }
    }, _2 = (e2, t2 = true) => {
      const n3 = S4(e2), o3 = $(n3), a3 = o3 === "dark";
      document.documentElement.classList.toggle("dark", a3), document.documentElement.dataset.theme = n3, document.documentElement.dataset.resolvedTheme = o3, document.documentElement.style.colorScheme = o3;
      try {
        window.localStorage.setItem("theme", n3);
      } catch {
      }
      return t2 && window.dispatchEvent(new CustomEvent("lv2:theme-change", { detail: { theme: n3, resolvedTheme: o3, dark: a3 } })), { theme: n3, resolvedTheme: o3, dark: a3 };
    }, C3 = () => {
      const e2 = i6.__2luvTheme, t2 = S4(e2?.getTheme ? e2.getTheme() : P()), n3 = e2?.getResolvedTheme ? X(e2.getResolvedTheme()) : $(t2);
      return { theme: t2, resolvedTheme: n3, dark: n3 === "dark" };
    }, D = (e2) => e2 === "system" ? "light" : e2 === "light" ? "dark" : "system", s4 = (e2) => {
      e2 && k4(), v3 = e2, h3 && (h3.hidden = !e2), c3 && (c3.setAttribute("aria-expanded", String(e2)), c3.setAttribute("aria-label", e2 ? r3.closeMenu : r3.openMenu)), m3(U, e2), m3(x2, !e2), e2 && window.setTimeout(() => {
        w3?.querySelector('[aria-current="location"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
      }, 40);
    }, E2 = (e2) => {
      f2.forEach((t2) => {
        const n3 = t2 === e2;
        t2.classList.toggle("is-active", n3), n3 ? t2.setAttribute("aria-current", "location") : t2.removeAttribute("aria-current");
      });
    }, k4 = () => {
      if (y3 = 0, !d4.length) return;
      const e2 = p2(window.location.hash || ""), t2 = e2 ? d4.find((a3) => p2(a3.link.getAttribute("href") || "") === e2)?.link : null;
      if (t2) {
        E2(t2);
        return;
      }
      const n3 = window.scrollY + Math.max(120, window.innerHeight * 0.24);
      let o3 = d4[0].link;
      d4.forEach((a3) => {
        a3.target.offsetTop <= n3 && (o3 = a3.link);
      }), E2(o3);
    }, B = () => {
      !d4.length || y3 || (y3 = window.requestAnimationFrame(k4));
    }, G2 = (e2) => {
      if (!e2) {
        s4(false);
        return;
      }
      const t2 = document.getElementById(e2);
      if (t2) {
        const n3 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        t2.scrollIntoView({ behavior: n3 ? "auto" : "smooth", block: "start" });
      }
      s4(false);
    }, T = () => {
      const e2 = C3();
      m3(F, e2.theme !== "system"), m3(Y, e2.theme !== "light"), m3(V, e2.theme !== "dark");
      const t2 = u3[e2.theme] || u3.system, n3 = u3[D(e2.theme)] || u3.light, o3 = j.replace("{current}", t2).replace("{next}", n3);
      l3?.setAttribute("aria-label", o3), l3?.setAttribute("title", o3);
    }, K = () => {
      i6.__2luvTheme?.applyTheme || _2(P(), false), T();
    }, M = () => {
      const e2 = D(C3().theme), t2 = i6.__2luvTheme?.setTheme ? i6.__2luvTheme.setTheme(e2) : _2(e2);
      return T(), t2;
    }, R3 = (e2) => {
      if (!r3.supportedLocales?.includes(e2) || e2 === r3.locale) return;
      q2("2luv-locale", e2), I2("NEXT_LOCALE"), window.localStorage.removeItem("preferredLanguage");
      const t2 = window.location.pathname.split("/");
      if (t2[2] === "blog") {
        const o3 = `/${e2}`, a3 = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((b2) => b2.href).find((b2) => {
          const L4 = new URL(b2, window.location.href);
          return L4.origin === window.location.origin && (L4.pathname === o3 || L4.pathname.startsWith(`${o3}/`));
        });
        window.location.assign(`${a3 || `/${e2}/blog`}${window.location.search}${window.location.hash}`);
        return;
      }
      const n3 = r3.localePaths?.[e2];
      if (n3) {
        window.location.assign(`${n3}${window.location.search}${window.location.hash}`);
        return;
      }
      r3.supportedLocales.includes(t2[1]) ? t2[1] = e2 : t2.splice(1, 0, e2), window.location.assign(`${t2.join("/")}${window.location.search}${window.location.hash}`);
    }, O2 = (e2) => {
      if (!r3.activeRegions?.includes(e2) || e2 === a(r3.region)) return;
      q2("2luv-region", e2), I2("user-region");
      const t2 = new URL(window.location.href);
      t2.searchParams.set("region", e2), window.location.assign(t2.toString());
    };
    l3 && K(), i6.__lv2Preferences = { changeLocale: R3, changeRegion: O2, toggleTheme: M }, l3 && window.addEventListener("lv2:theme-change", T), c3?.addEventListener("click", () => s4(!v3)), document.querySelectorAll("[data-scroll-target]").forEach((e2) => {
      e2.addEventListener("click", () => G2(e2.getAttribute("data-scroll-target")));
    }), document.querySelectorAll("[data-close-drawer]").forEach((e2) => {
      e2.addEventListener("click", () => s4(false));
    }), f2.forEach((e2) => {
      e2.addEventListener("click", () => E2(e2));
    });
    const H = document.querySelector("[data-header-locale]");
    H?.addEventListener("change", () => R3(H.value));
    const N = document.querySelector("[data-header-region]");
    N?.addEventListener("change", () => O2(N.value)), l3?.addEventListener("click", M);
    const z = () => {
      g3?.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", z, { passive: true }), window.addEventListener("scroll", B, { passive: true }), window.addEventListener("hashchange", B), z(), k4(), document.addEventListener("pointerdown", (e2) => {
      const t2 = e2.target;
      t2 instanceof Node && v3 && h3 && c3 && !h3.contains(t2) && !c3.contains(t2) && s4(false);
    }, true), window.addEventListener("keydown", (e2) => {
      e2.key === "Escape" && s4(false);
    }), window.addEventListener("2luv:card-preview", (e2) => {
      const n3 = (e2 instanceof CustomEvent ? e2.detail : null)?.phase === "open";
      g3?.classList.toggle("is-hidden", n3), g3?.setAttribute("aria-hidden", String(n3));
    });
  })();

  // assets/_astro/consent.ngPTbJBt.js
  var p = "cookie-consent";
  var C = "cookie-consent";
  var m = ["cookieConsent", "cookie_consent"];
  function y(e2 = {}, n3 = (/* @__PURE__ */ new Date()).toISOString()) {
    const t2 = { necessary: true, preferences: !!e2.preferences, analytics: !!e2.analytics, marketing: !!e2.marketing };
    return { version: 2, updatedAt: n3, categories: t2, google: S(t2) };
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
      const o3 = l(e2).trim();
      if (!o3) return null;
      const a3 = o3.toLowerCase();
      if (["accepted", "accept", "granted", "true", "all"].includes(a3)) return O();
      if (["rejected", "reject", "declined", "denied", "false", "necessary"].includes(a3)) return k();
      try {
        return d(JSON.parse(o3));
      } catch {
        return null;
      }
    }
    if (typeof e2 != "object" || Array.isArray(e2)) return null;
    const n3 = e2, t2 = R(n3);
    if (!t2) return null;
    const r3 = typeof n3.updatedAt == "string" && n3.updatedAt ? n3.updatedAt : (/* @__PURE__ */ new Date()).toISOString();
    return { version: Number.isFinite(Number(n3.version)) ? Number(n3.version) : 2, updatedAt: r3, categories: t2, google: S(t2) };
  }
  function A(e2) {
    const n3 = L(e2 || ""), t2 = n3.get(p);
    if (t2) return d(t2);
    for (const r3 of m) {
      const o3 = n3.get(r3), a3 = d(o3);
      if (a3) return a3;
    }
    return null;
  }
  function w() {
    if (!s()) return null;
    try {
      const e2 = window.localStorage.getItem(C), n3 = d(e2);
      if (n3) return n3;
    } catch {
    }
    return A(document.cookie);
  }
  function G(e2, n3 = w()) {
    return e2 === "necessary" ? true : !!n3?.categories[e2];
  }
  function S(e2) {
    return { security_storage: "granted", functionality_storage: e2.preferences ? "granted" : "denied", personalization_storage: e2.preferences ? "granted" : "denied", analytics_storage: e2.analytics ? "granted" : "denied", ad_storage: e2.marketing ? "granted" : "denied", ad_user_data: e2.marketing ? "granted" : "denied", ad_personalization: e2.marketing ? "granted" : "denied" };
  }
  function L(e2) {
    const n3 = /* @__PURE__ */ new Map();
    for (const t2 of e2.split(";")) {
      const r3 = t2.trim();
      if (!r3) continue;
      const o3 = r3.indexOf("="), a3 = o3 >= 0 ? r3.slice(0, o3) : r3, N = o3 >= 0 ? r3.slice(o3 + 1) : "", u3 = l(a3);
      !u3 || n3.has(u3) || n3.set(u3, l(N));
    }
    return n3;
  }
  function R(e2) {
    const n3 = g(e2.categories) ? e2.categories : e2, t2 = g(e2.google) ? e2.google : e2, r3 = c(n3.preferences) ?? i2(t2.functionality_storage) ?? i2(t2.personalization_storage) ?? false, o3 = c(n3.analytics) ?? i2(t2.analytics_storage) ?? false, a3 = c(n3.marketing) ?? c(n3.ads) ?? i2(t2.ad_storage) ?? i2(t2.ad_user_data) ?? i2(t2.ad_personalization) ?? false;
    return { necessary: true, preferences: r3, analytics: o3, marketing: a3 };
  }
  function c(e2) {
    if (typeof e2 == "boolean") return e2;
    if (typeof e2 != "string") return null;
    const n3 = e2.trim().toLowerCase();
    return ["true", "1", "yes", "accepted", "granted"].includes(n3) ? true : ["false", "0", "no", "rejected", "declined", "denied"].includes(n3) ? false : null;
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
    return !d2() || !A2(e2) ? [] : w2(y2()).sort((r3, t2) => Date.parse(t2.accessedAt) - Date.parse(r3.accessedAt));
  }
  function R2(e2) {
    if (!d2()) return;
    const n3 = `${e2.type}:${E(e2.shareableLink)}`;
    if (!n3.includes(":") || n3.endsWith(":")) return;
    const r3 = w2(y2()).filter((t2) => c2(t2) !== n3);
    L2(r3), h(r3);
  }
  function b(e2, n3) {
    const r3 = k2(n3), t2 = encodeURIComponent(e2.shareableLink);
    return `/${r3}/letter/${t2}`;
  }
  function S2(e2) {
    if (!d2()) return () => {
    };
    const n3 = () => e2(), r3 = (t2) => {
      t2.storageArea && t2.storageArea !== window.localStorage || (t2.key === null || t2.key === i3 || t2.key === "cookie-consent") && e2();
    };
    return window.addEventListener(a2, n3), window.addEventListener("2luv:cookie-consent-updated", n3), window.addEventListener("storage", r3), () => {
      window.removeEventListener(a2, n3), window.removeEventListener("2luv:cookie-consent-updated", n3), window.removeEventListener("storage", r3);
    };
  }
  function w2(e2) {
    if (!e2) return [];
    try {
      const n3 = JSON.parse(e2);
      if (!Array.isArray(n3)) return [];
      const r3 = /* @__PURE__ */ new Map();
      for (const t2 of n3) {
        if (!t2 || typeof t2 != "object" || Array.isArray(t2)) continue;
        const s4 = t2, u3 = s4.type === "letter" || s4.type === "gift" ? s4.type : null, f2 = E(s4.shareableLink), p2 = typeof s4.accessedAt == "string" && Number.isFinite(Date.parse(s4.accessedAt)) ? s4.accessedAt : null;
        if (!u3 || !f2 || !p2) continue;
        const o3 = { type: u3, shareableLink: f2, accessedAt: p2 }, l3 = r3.get(c2(o3));
        (!l3 || Date.parse(o3.accessedAt) > Date.parse(l3.accessedAt)) && r3.set(c2(o3), o3);
      }
      return Array.from(r3.values());
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
  function e(_2) {
    const t2 = _2 === "/api" ? "/api" : _2.startsWith("/api/") ? _2 : `/api${_2.startsWith("/") ? _2 : `/${_2}`}`;
    return `${s2}${t2}`;
  }

  // assets/_astro/RecentLandingItems.astro_astro_type_script_index_0_lang.C-2nAEMN.js
  var f = /* @__PURE__ */ new WeakSet();
  var u = { lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>', clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>', arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7"></path><path d="M7 7h10v10"></path></svg>' };
  function v2() {
    if (typeof window > "u" || typeof document > "u") return;
    const n3 = () => {
      document.querySelectorAll("[data-recent-items-section]").forEach((t2) => {
        if (f.has(t2)) return;
        f.add(t2), new A3(t2).init();
      });
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", n3, { once: true });
      return;
    }
    n3();
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
      }, t2 = window;
      if (t2.requestIdleCallback) {
        t2.requestIdleCallback(e2, { timeout: 1500 });
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
      const t2 = new AbortController();
      this.request = t2;
      const r3 = v().slice(0, this.config.maxItems);
      if (!r3.length) {
        this.details = [], this.renderSection(), this.resetHero();
        return;
      }
      const s4 = await Promise.all(r3.map((i6) => this.loadDetail(i6, t2.signal)));
      if (!(this.disposed || t2.signal.aborted || e2 !== this.loadVersion)) {
        this.pruning = true;
        try {
          s4.forEach((i6) => {
            (i6.missing || i6.expired) && R2(i6.item);
          });
        } finally {
          this.pruning = false;
        }
        this.details = s4.flatMap((i6) => i6.detail ? [i6.detail] : []), this.renderSection(), this.applyHero(this.details[0] ?? null);
      }
    }
    async loadDetail(e2, t2) {
      const r3 = await C2(e2, t2), s4 = e2.type === "gift" ? this.text("giftCardEyebrow", this.config.locale === "pt" ? "Presente" : "Gift") : this.text("cardEyebrow", this.config.locale === "pt" ? "Carta" : "Letter");
      if (!r3.record) return { item: e2, detail: r3.missing ? null : this.fallbackDetail(e2, s4), missing: r3.missing, expired: false };
      const i6 = g2(r3.record.expiresAt);
      if (!!(i6 && Date.parse(i6) < Date.now())) return { item: e2, detail: null, missing: false, expired: true };
      const o3 = !!(r3.record.hasPassword || r3.record.isPasswordProtected) && r3.record.disablePasswordProtection !== true, c3 = g2(r3.record.lovedOneName ?? r3.record.recipientName ?? r3.record.title), a3 = o3 || t2?.aborted ? null : await x(e2, t2);
      return { item: e2, detail: { type: e2.type, shareableLink: e2.shareableLink, href: b(e2, this.config.locale), title: o3 ? s4 : c3 || s4, eyebrow: s4, expiresAt: i6, imageUrl: a3, locked: o3 }, missing: false, expired: false };
    }
    fallbackDetail(e2, t2) {
      return { type: e2.type, shareableLink: e2.shareableLink, href: b(e2, this.config.locale), title: t2, eyebrow: t2, expiresAt: null, imageUrl: null, locked: false };
    }
    renderSection() {
      if (!this.grid) return;
      if (!this.details.length) {
        this.section.hidden = true, this.grid.replaceChildren(), delete this.grid.dataset.recentItemsCount, this.toggle && (this.toggle.hidden = true);
        return;
      }
      this.section.hidden = false;
      const e2 = this.showAll ? this.details : this.details.slice(0, this.config.initialVisibleCount);
      this.grid.dataset.recentItemsCount = String(e2.length), this.grid.replaceChildren(...e2.map((t2, r3) => this.renderCard(t2, r3))), this.toggle && (this.toggle.hidden = this.details.length <= this.config.initialVisibleCount, this.toggle.textContent = this.showAll ? this.text("viewLess", "View less") : this.text("viewAll", "View all ({count})").replace("{count}", String(this.details.length)));
    }
    renderCard(e2, t2) {
      const r3 = document.createElement("a");
      if (r3.className = "lv2-recent-card", r3.href = e2.href, r3.style.setProperty("--recent-delay", `${Math.min(t2 * 70, 420)}ms`), e2.imageUrl) {
        r3.classList.add("has-image");
        const a3 = document.createElement("span");
        a3.className = "lv2-recent-card-image", a3.setAttribute("aria-hidden", "true");
        const d4 = document.createElement("img");
        d4.src = e2.imageUrl, d4.alt = "", d4.loading = "lazy", d4.decoding = "async", a3.append(d4), r3.append(a3);
      }
      const s4 = document.createElement("span");
      s4.className = "lv2-recent-card-copy";
      const i6 = document.createElement("span");
      i6.className = "lv2-recent-card-eyebrow", e2.locked && i6.insertAdjacentHTML("beforeend", u.lock), i6.append(document.createTextNode(e2.eyebrow));
      const l3 = document.createElement("strong");
      l3.textContent = e2.title, s4.append(i6, l3), r3.append(s4);
      const o3 = document.createElement("span");
      if (o3.className = "lv2-recent-card-footer", e2.expiresAt) {
        o3.classList.add("has-date");
        const a3 = document.createElement("span");
        a3.insertAdjacentHTML("beforeend", u.clock), a3.append(document.createTextNode(k3(e2.expiresAt, this.config.locale))), o3.append(a3);
      }
      const c3 = document.createElement("span");
      return c3.className = "lv2-recent-card-arrow", c3.setAttribute("aria-hidden", "true"), c3.innerHTML = u.arrow, o3.append(c3), r3.append(o3), r3;
    }
    applyHero(e2) {
      const t2 = document.getElementById("hero");
      if (!t2) return;
      const r3 = t2.querySelector(".lv2-hero-content"), s4 = t2.querySelector("[data-recent-hero-content]"), i6 = t2.querySelector("[data-recent-hero-media]"), l3 = t2.querySelector("[data-recent-open-link]");
      if (!e2 || !r3 || !s4 || !l3) {
        this.resetHero();
        return;
      }
      t2.classList.add("has-recent-item"), t2.dataset.recentState = "ready", r3.inert = true, s4.inert = false, t2.setAttribute("aria-labelledby", "hero-returning-title"), r3?.setAttribute("aria-hidden", "true"), s4?.setAttribute("aria-hidden", "false"), l3 && (l3.href = e2.href), e2.imageUrl && i6 ? (i6.style.setProperty("--lv2-recent-hero-image", q(e2.imageUrl)), t2.classList.add("has-recent-image")) : (i6?.style.removeProperty("--lv2-recent-hero-image"), t2.classList.remove("has-recent-image"));
    }
    resetHero() {
      const e2 = document.getElementById("hero");
      if (!e2) return;
      const t2 = e2.querySelector(".lv2-hero-content"), r3 = e2.querySelector("[data-recent-hero-content]"), s4 = e2.querySelector("[data-recent-hero-media]");
      e2.classList.remove("has-recent-item", "has-recent-image"), delete e2.dataset.recentState, e2.setAttribute("aria-labelledby", e2.dataset.recentDefaultTitle || "hero-title"), t2 && (t2.inert = false), r3 && (r3.inert = true), t2?.removeAttribute("aria-hidden"), r3?.setAttribute("aria-hidden", "true"), s4?.style.removeProperty("--lv2-recent-hero-image");
    }
    text(e2, t2) {
      const r3 = this.config.copy[e2];
      return typeof r3 == "string" && r3.trim() ? r3 : t2;
    }
  };
  async function C2(n3, e2) {
    const t2 = n3.type === "gift" ? e(`/api/gifts/${encodeURIComponent(n3.shareableLink)}/metadata`) : e(`/api/letter/${encodeURIComponent(n3.shareableLink)}/metadata`);
    try {
      const r3 = await fetch(t2, { credentials: "include", headers: { accept: "application/json" }, signal: e2 });
      if (r3.status === 404 || r3.status === 410) return { record: null, missing: true };
      if (!r3.ok) return { record: null, missing: false };
      const s4 = await r3.json().catch(() => null), i6 = L3(s4, n3.type === "gift" ? "gift" : "letter");
      return { record: i6, missing: !i6 };
    } catch {
      return { record: null, missing: false };
    }
  }
  async function x(n3, e2) {
    const t2 = n3.type === "gift" ? e(`/api/gifts/${encodeURIComponent(n3.shareableLink)}/photos?take=1`) : e(`/api/letter/${encodeURIComponent(n3.shareableLink)}/photos?take=1`);
    try {
      const r3 = await fetch(t2, { credentials: "include", headers: { accept: "application/json" }, signal: e2 });
      if (!r3.ok) return null;
      const s4 = await r3.json().catch(() => null);
      if (!s4 || typeof s4 != "object" || Array.isArray(s4)) return null;
      const i6 = s4.photoUrls;
      return Array.isArray(i6) && typeof i6[0] == "string" && i6[0] ? i6[0] : null;
    } catch {
      return null;
    }
  }
  function L3(n3, e2) {
    if (!n3 || typeof n3 != "object" || Array.isArray(n3)) return null;
    const r3 = n3[e2];
    return r3 && typeof r3 == "object" && !Array.isArray(r3) ? r3 : null;
  }
  function g2(n3) {
    return typeof n3 == "string" && n3.trim() ? n3 : null;
  }
  function k3(n3, e2) {
    const t2 = new Date(n3);
    return Number.isNaN(t2.getTime()) ? "" : new Intl.DateTimeFormat(e2 || "en", { day: "2-digit", month: "short", year: "numeric" }).format(t2);
  }
  function q(n3) {
    return `url(${JSON.stringify(n3)})`;
  }
  function S3(n3) {
    const e2 = n3.querySelector("[data-recent-items-config]");
    if (!e2?.textContent) return {};
    try {
      const t2 = JSON.parse(e2.textContent);
      return t2 && typeof t2 == "object" && !Array.isArray(t2) ? t2 : {};
    } catch {
      return {};
    }
  }
  function I(n3) {
    return { locale: typeof n3.locale == "string" && n3.locale.trim() ? n3.locale : "en", copy: n3.copy && typeof n3.copy == "object" && !Array.isArray(n3.copy) ? n3.copy : {}, maxItems: m2(n3.maxItems, 8), initialVisibleCount: m2(n3.initialVisibleCount, 4) };
  }
  function m2(n3, e2) {
    return typeof n3 == "number" && Number.isInteger(n3) && n3 > 0 ? n3 : e2;
  }
  v2();

  // assets/_astro/themes.config.-2Q2DiBL.js
  var r = { halloween: { en: "hotel-halloween", pt: "hotel-halloween", es: "hotel-halloween", fr: "hotel-halloween", de: "hotel-halloween", zh: "hotel-halloween", "zh-tw": "hotel-halloween", ar: "hotel-halloween", ms: "hotel-halloween", ja: "hotel-halloween", ru: "hotel-halloween", ko: "hotel-halloween" }, "love-letter": { pt: "carta-de-amor", en: "love-letter", es: "carta-de-amor", fr: "lettre-damour", de: "liebesbrief", zh: "qingshu", "zh-tw": "qing-shu-tw", ar: "risalat-hub", ms: "surat-cinta", ja: "rabureta", ru: "lyubovnoe-pismo", ko: "sarang-pyeonji" }, birthday: { pt: "aniversario", en: "birthday", es: "cumpleanos", fr: "anniversaire", de: "geburtstag", zh: "shengri", "zh-tw": "sheng-ri-tw", ar: "eid-milad", ms: "hari-jadi", ja: "tanjobi", ru: "den-rozhdeniya", ko: "saengil" }, christmas: { pt: "cartao-de-natal", en: "christmas-card", es: "tarjeta-de-navidad", fr: "carte-de-noel", de: "weihnachtskarte", zh: "shengdan-ka", "zh-tw": "sheng-dan-ka-tw", ar: "bitaqat-eid-milad", ms: "kad-krismas", ja: "kurisumasu-kado", ru: "rozhdestvenskaya-otkrytka", ko: "keuriseumaseu-kadeu" }, valentines: { pt: "dia-dos-namorados", en: "valentines", es: "san-valentin", fr: "saint-valentin", de: "valentinstag", zh: "qingrenjie", "zh-tw": "qing-ren-jie-tw", ar: "eid-al-hob", ms: "hari-valentine", ja: "barentain-dee", ru: "den-svyatogo-valentina", ko: "ballentain-dei" }, "white-day": { pt: "white-day", en: "white-day", es: "white-day", fr: "white-day", de: "white-day", zh: "white-day", "zh-tw": "white-day-tw", ar: "white-day", ms: "white-day", ja: "white-day", ru: "white-day", ko: "hwaiteu-dei" }, "digital-love-gift": { pt: "presente-digital-amor", en: "digital-gift-for-loved-one", es: "regalo-digital-para-tu-amor", fr: "cadeau-digital-pour-etre-aime", de: "digitales-geschenk-fur-geliebte", zh: "shuzi-liwu-ai-ren", "zh-tw": "shu-zi-li-wu-ai-ren-tw", ar: "hadiya-raqmiya-lilhabib", ms: "hadiah-digital-untuk-yang-tersayang", ja: "dejitaru-gifuto-aisuru-hito", ru: "tsifrovoy-podarok-dlya-lyubimogo", ko: "saranghaneun-saram-digital-seonmul" }, anniversary: { pt: "presente-para-namorada", en: "anniversary-gift", es: "regalo-de-aniversario", fr: "cadeau-anniversaire-couple", de: "jahrestag-geschenk", zh: "zhounian-liwu", "zh-tw": "zhou-nian-liwu-tw", ar: "hadiya-dhikra-zawaj", ms: "hadiah-ulang-tahun-percintaan", ja: "kinenbi-okurimono", ru: "podarok-na-godovshchinu", ko: "ginyeomil-seonmul" }, "mothers-day": { pt: "presente-para-mae", en: "gift-for-mom", es: "regalo-para-mama", fr: "cadeau-pour-maman", de: "geschenk-fuer-mama", zh: "song-mama-liwu", "zh-tw": "song-mama-liwu-tw", ar: "hadiya-lilomm", ms: "hadiah-untuk-ibu", ja: "okasan-okurimono", ru: "podarok-dlya-mamy", ko: "eomma-seonmul" }, "fathers-day": { pt: "presente-para-pai", en: "gift-for-dad", es: "regalo-para-papa", fr: "cadeau-pour-papa", de: "geschenk-fuer-papa", zh: "song-baba-liwu", "zh-tw": "song-baba-liwu-tw", ar: "hadiya-lilab", ms: "hadiah-untuk-ayah", ja: "otosan-okurimono", ru: "podarok-dlya-papy", ko: "appa-seonmul" }, friendship: { pt: "presente-para-amiga", en: "gift-for-best-friend", es: "regalo-para-amiga", fr: "cadeau-pour-meilleure-amie", de: "geschenk-fuer-freundin", zh: "song-pengyou-liwu", "zh-tw": "song-pengyou-liwu-tw", ar: "hadiya-lissadiqa", ms: "hadiah-untuk-sahabat", ja: "tomodachi-okurimono", ru: "podarok-dlya-podrugi", ko: "chingu-seonmul" }, graduation: { pt: "presente-de-formatura", en: "graduation-gift", es: "regalo-de-graduacion", fr: "cadeau-diplome", de: "abschluss-geschenk", zh: "biye-liwu", "zh-tw": "bi-ye-liwu-tw", ar: "hadiya-takharruj", ms: "hadiah-graduasi", ja: "sotsugyou-okurimono", ru: "podarok-na-vypusknoj", ko: "joreop-seonmul" }, wedding: { pt: "presente-de-casamento", en: "wedding-gift", es: "regalo-de-boda", fr: "cadeau-de-mariage", de: "hochzeitsgeschenk", zh: "hunli-liwu", "zh-tw": "hun-li-liwu-tw", ar: "hadiya-azzifaf", ms: "hadiah-perkahwinan", ja: "kekkon-okurimono", ru: "svadebnyy-podarok", ko: "gyeolhon-seonmul" }, "new-year": { pt: "mensagem-de-ano-novo", en: "new-year-message", es: "mensaje-de-ano-nuevo", fr: "message-de-nouvel-an", de: "neujahrsbotschaft", zh: "xinnian-zhufu", "zh-tw": "xin-nian-zhufu-tw", ar: "risalat-ras-alsana", ms: "pesan-tahun-baru", ja: "shinnen-messeeji", ru: "novogodnee-soobshchenie", ko: "saehae-mesiji" } };
  var n2 = {};
  var t = (a3, e2) => {
    a3 && (n2[a3] && n2[a3] !== e2 || (n2[a3] = e2));
  };
  Object.entries(r).forEach(([a3, e2]) => {
    Object.values(e2).forEach((i6) => {
      t(i6, a3);
    });
  });
  var h2 = { "love-letter": ["nota-de-amor", "qing-shu"], valentines: ["valentines", "dia-dos-namorados", "san-valentin", "saint-valentin", "valentinstag", "qingrenjie", "qing-ren-jie-tw", "eid-al-hob", "hari-valentine", "barentain-dee", "den-svyatogo-valentina", "den-sviatogo-valentina", "ballentain-dei", "qing-ren-jie"], "white-day": ["white-day", "whiteday", "white_day"], birthday: ["hadiah-ulang-tahun", "sheng-ri", "tanjoubi"], christmas: ["sheng-dan-he-ka", "sheng-dan-ka"], "digital-love-gift": ["presente-digital-amor", "presente-digital-para-amado", "presente-digital-para-amada", "presente-digital-para-alguem-amado", "presente-digital-para-quem-voce-ama", "presente-digital-para-pessoa-amada", "digitales-geschenk-fuer-einen-geliebten-menschen", "digitales-geschenk-fuer-geliebte-menschen", "digitales-geschenk-fuer-liebste", "digital-gift-for-loved-one", "digital-love-gift", "gift-for-loved-one", "regalo-digital-para-alguien-que-quieres", "regalo-digital-para-un-ser-querido", "cadeau-numerique-pour-un-etre-cher", "cadeau-numerique-pour-un-proche", "shu-zi-ai-yi-li-wu", "shu-zi-li-wu-gei-ai-ren", "shu-zi-li-wu-gei-suo-ai-zhi-ren", "shu-zi-li-wu-song-gei-ai-ren", "shuzi-liwu-gei-ai-de-ren", "shuzi-liwu-song-gei-ai-de-ren", "shu-wei-li-wu-gei-suo-ai-de-ren", "shu-wei-li-wu-gei-suo-ai-zhi-ren", "hadiya-raqmiya-liman-toheb", "hadiya-raqmiya-liman-tuhib", "hadiah-digital-untuk-orang-tersayang", "koibito-e-no-dejitaru-gifuto", "podarok-dlya-lyubimogo-cheloveka-v-cifrovom-formate", "podarok-lyubimomu-cheloveku-v-cifrovom-formate"], anniversary: ["aniversario-de-casamento", "anniversary", "aniversario", "presente-de-aniversario", "anniversaire-amoureux", "cadeau-anniversaire", "jahrestag", "jahrestagsgeschenk", "jubil\xE4um-geschenk", "jubilaeum-geschenk", "zhounian", "zhou-nian-tw", "ji-nian-ri-li-wu", "zhou-nian-ji-nian-li-wu", "dhikra-zawaj", "dhikra-sanawiya-gift", "hadiyat-dhikra-sanawiya", "ulang-tahun-percintaan", "kinenbi", "godovshchina", "ginyeomil"], "mothers-day": ["mothers-day", "dia-das-maes", "diadasmaes", "dia-de-la-madre", "fete-des-meres", "muttertag", "muqinjie", "mu-qin-jie-tw", "eid-al-omm", "hari-ibu", "hahanohiokuri", "den-materi", "eomeoninal", "song-gei-ma-ma-de-li-wu"], "fathers-day": ["fathers-day", "dia-dos-pais", "dia-del-padre", "fete-des-peres", "vatertag", "fuqinjie", "fu-qin-jie-tw", "eid-al-ab", "hadiya-lil-ab", "hari-bapa", "chichinohi", "den-otsa", "abeojinal", "podarok-pape", "presente-para-o-pai", "song-gei-ba-ba-de-li-wu", "songgeibabadelIwu"], friendship: ["friendship-day", "dia-da-amizade", "dia-de-la-amistad", "journee-amitie", "freundschaftstag", "geschenk-fuer-den-besten-freund", "youyiri", "you-yi-ri-tw", "eid-as-sadaqa", "hari-persahabatan", "yuujounohi", "den-druzhby", "ujeongeuninal", "hadiah-untuk-sahabat-karib", "presente-para-melhor-amiga", "regalo-para-mejor-amigo", "song-gei-zui-hao-de-peng-you-de-li-wu"], graduation: ["graduation", "formatura", "graduacion", "remise-des-diplomes", "abschlussfeier", "biyejidian", "bi-ye-ji-dian-tw", "haflet-takharruj", "majlis-graduasi", "sotsugyou", "vypusknoj", "joreop"], wedding: ["wedding", "casamento", "boda", "hadiyat-zafaf", "mariage", "hochzeit", "hunli", "hun-li-tw", "zifaf", "perkahwinan", "kekkon", "svadba", "svadebnyj-podarok", "gyeolhon", "hun-li-li-wu"], "new-year": ["new-year", "ano-novo", "ano-nuevo", "nouvel-an", "neujahr", "neujahrsnachricht", "xinnian", "xin-nian-tw", "eid-ras-alsana", "ras-al-sana-message", "tahun-baru", "mesej-tahun-baru", "shinnen", "shinnen-no-aisatsu", "novyy-god", "saehae", "saehae-message", "xin-nian-zhu-fu", "new_year", "newyear"] };
  Object.entries(h2).forEach(([a3, e2]) => {
    (e2 || []).forEach((i6) => t(i6, a3));
  });
  var o = { "love-letter": { en: "love-letter", pt: "carta-de-amor", es: "carta-de-amor", fr: "lettre-damour", de: "liebesbrief", zh: "qingshu", "zh-tw": "qing-shu-tw", ar: "risalat-hub", ms: "surat-cinta", ja: "rabureta", ru: "lyubovnoe-pismo", ko: "sarang-pyeonji" }, birthday: { en: "birthday", pt: "aniversario", es: "cumpleanos", fr: "anniversaire", de: "geburtstag", zh: "shengri", "zh-tw": "sheng-ri-tw", ar: "eid-milad", ms: "hari-jadi", ja: "tanjobi", ru: "den-rozhdeniya", ko: "saengil" }, christmas: { en: "christmas-card", pt: "cartao-de-natal", es: "tarjeta-de-navidad", fr: "carte-de-noel", de: "weihnachtskarte", zh: "shengdan-ka", "zh-tw": "sheng-dan-ka-tw", ar: "bitaqat-eid-milad", ms: "kad-krismas", ja: "kurisumasu-kado", ru: "rozhdestvenskaya-otkrytka", ko: "keuriseumaseu-kadeu" }, party: { en: "birthday-party", pt: "festa-de-aniversario", es: "fiesta-de-cumpleanos", fr: "fete-anniversaire", de: "geburtstagsparty", zh: "shengri-paidui", "zh-tw": "sheng-ri-pai-dui-tw", ar: "haflat-eid-milad", ms: "parti-hari-jadi", ja: "tanjobi-party", ru: "vecherinka-den-rozhdeniya", ko: "saengil-pati" }, bloom: { en: "bloom-letter", pt: "carta-florescer", es: "carta-florecer", fr: "lettre-floraison", de: "bluetenbrief", zh: "kaihua-xin", "zh-tw": "kai-hua-xin-tw", ar: "risalat-zuhur", ms: "surat-mekar", ja: "hana-no-tegami", ru: "tsvetushchee-pismo", ko: "kkot-pyeonji" }, halloween: { en: "halloween", pt: "halloween", es: "halloween", fr: "halloween", de: "halloween", zh: "halloween", "zh-tw": "halloween", ar: "halloween", ms: "halloween", ja: "halloween", ru: "halloween", ko: "halloween" }, "white-day": { en: "white-day", pt: "white-day", es: "white-day", fr: "white-day", de: "white-day", zh: "white-day", "zh-tw": "white-day-tw", ar: "white-day", ms: "white-day", ja: "white-day", ru: "white-day", ko: "hwaiteu-dei" } };
  var s3 = {};
  Object.entries(o).forEach(([a3, e2]) => {
    Object.values(e2).forEach((i6) => {
      s3[i6] = a3;
    });
  });

  // assets/_astro/consent-theme.6ywPEaCg.js
  var o2 = new Set(Object.keys(r.halloween));

  // assets/_astro/BaseLayout.astro_astro_type_script_index_0_lang.DJpd15VC.js
  function _(t2, o3) {
    return !t2 || !!(o3?.categories.analytics || o3?.categories.marketing);
  }
  var d3 = "../_lazy/privacy-controls-DtZB9K6_.js";
  function i5(t2) {
    const o3 = window;
    return o3.__TWOLUV_PRIVACY_BOOT__ ? (o3.__TWOLUV_PRIVACY_BOOT__(), t2 && window.dispatchEvent(new CustomEvent("2luv:open-cookie-preferences", { detail: t2 })), o3.__TWOLUV_PRIVACY_BUNDLE__) : (o3.__TWOLUV_PRIVACY_BUNDLE__ || (o3.__TWOLUV_PRIVACY_BUNDLE__ = import(d3).then((e2) => {
      const n3 = e2.bootPrivacyControls;
      n3 && (o3.__TWOLUV_PRIVACY_BOOT__ = n3, n3());
    }).catch((e2) => {
      o3.__TWOLUV_PRIVACY_BUNDLE__ = void 0, console.error("[2luv] Failed to load privacy controls.", e2);
    })), o3.__TWOLUV_PRIVACY_BUNDLE__.then(() => {
      t2 && o3.__TWOLUV_PRIVACY_BOOT__ && window.dispatchEvent(new CustomEvent("2luv:open-cookie-preferences", { detail: t2 }));
    }));
  }
  function u2() {
    try {
      return window.localStorage.getItem("cookie-consent") ? true : document.cookie.split(";").some((t2) => t2.trim().startsWith("cookie-consent="));
    } catch {
      return false;
    }
  }
  function r2() {
    if (!_(!!document.querySelector("[data-privacy-cookie-ssr]"), w())) return;
    const t2 = u2() ? 1600 : 700, o3 = () => {
      i5();
    }, e2 = window.requestIdleCallback;
    e2 ? e2(o3, { timeout: t2 }) : globalThis.setTimeout(o3, t2);
  }
  document.addEventListener("click", (t2) => {
    const o3 = t2.target instanceof Element ? t2.target.closest("[data-privacy-cookie-ssr] [data-consent-action]") : null, e2 = o3?.closest("[data-privacy-cookie-ssr]");
    if (e2?.hasAttribute("data-consent-action-pending")) {
      t2.preventDefault(), t2.stopImmediatePropagation();
      return;
    }
    if (window.__TWOLUV_PRIVACY_BOOT__) return;
    if (o3) {
      t2.preventDefault(), t2.stopImmediatePropagation(), e2?.setAttribute("data-consent-action-pending", ""), o3.setAttribute("aria-busy", "true");
      const c3 = o3.getAttribute("data-consent-action");
      Promise.resolve(i5()).then(() => {
        e2?.removeAttribute("data-consent-action-pending"), o3.removeAttribute("aria-busy"), window.__TWOLUV_PRIVACY_BOOT__ && window.dispatchEvent(new CustomEvent("2luv:cookie-banner-action", { detail: { action: c3 } }));
      });
      return;
    }
    const n3 = t2.target instanceof Element ? t2.target.closest("[data-2luv-open-cookie-preferences]") : null;
    if (!n3) return;
    t2.preventDefault();
    const a3 = n3.getAttribute("data-2luv-cookie-focus") || void 0;
    i5(a3 ? { focusCategory: a3 } : {});
  }, true);
  window.addEventListener("2luv:open-cookie-preferences", (t2) => {
    if (window.__TWOLUV_PRIVACY_BOOT__) return;
    t2.stopImmediatePropagation();
    const o3 = t2 instanceof CustomEvent ? t2.detail : void 0;
    i5(o3);
  });
  r2();
  document.addEventListener("astro:page-load", r2);

  // assets/_astro/HalloweenEvent.astro_astro_type_script_index_0_lang.Ce7l61cM.js
  window.addEventListener("twoluv:pricing-region", (e2) => i(e2.detail?.region));
  document.querySelectorAll('meta[name="theme-color"]').forEach((e2) => e2.setAttribute("content", "#0d0b09"));
})();
