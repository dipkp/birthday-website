(() => {
  // assets/_astro/pricing-region-controls.B3QK6_Sx.js
  function i(t2) {
    if (typeof t2 != "string") return;
    const r3 = document.querySelectorAll("[data-header-region], [data-footer-region]");
    let n2;
    for (const e of r3) {
      const o3 = Array.from(e.options).find((c2) => c2.value === t2);
      o3 && (e.value = t2, n2 = o3.textContent?.trim());
    }
    n2 && (document.documentElement.dataset.pricingRegion = t2, document.querySelectorAll("[data-header-currency]").forEach((e) => {
      e.textContent = n2;
    }));
  }
  function a(t2) {
    return document.documentElement.dataset.pricingRegion || t2;
  }

  // assets/_astro/HeaderV2.astro_astro_type_script_index_0_lang.DKQMm5Va.js
  (() => {
    const i4 = window, A2 = document.getElementById("lv2-header-config"), r3 = A2 ? JSON.parse(A2.textContent || "{}") : {}, g2 = document.querySelector("[data-lv2-header]"), c2 = document.querySelector("[data-menu-button]"), h2 = document.querySelector("[data-menu-panel]"), U = document.querySelector("[data-menu-icon-open]"), x = document.querySelector("[data-menu-icon-close]"), l3 = document.querySelector("[data-theme-toggle]"), F = document.querySelector('[data-theme-icon="system"]'), V = document.querySelector('[data-theme-icon="moon"]'), Y = document.querySelector('[data-theme-icon="sun"]'), w2 = document.querySelector("[data-blog-post-drawer-nav]"), f = w2 ? Array.from(w2.querySelectorAll('a[href^="#"]')) : [], d3 = f.reduce((e, t2) => {
      const n2 = p2(t2.getAttribute("href") || "").slice(1), o3 = n2 ? document.getElementById(n2) : null;
      return o3 && e.push({ link: t2, target: o3 }), e;
    }, []);
    let v = false, y2 = 0;
    const u2 = r3.themeLabels || { system: "System", light: "Light", dark: "Dark" }, j = r3.themeStateTemplate || "Theme: {current}. Switch to {next}.", J = ["system", "light", "dark"], W = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null, q = (e, t2) => {
      document.cookie = `${e}=${encodeURIComponent(t2)};path=/;max-age=31536000;samesite=lax`;
    }, I = (e) => {
      document.cookie = `${e}=;path=/;max-age=0;samesite=lax`;
    }, m2 = (e, t2) => {
      e?.classList.toggle("lv2-icon-hidden", t2);
    };
    function p2(e) {
      try {
        return decodeURIComponent(e);
      } catch {
        return e;
      }
    }
    const S2 = (e) => typeof e == "string" && J.includes(e) ? e : "system", X = (e) => e === "dark" ? "dark" : "light", $ = (e) => e === "system" && W?.matches || e === "dark" ? "dark" : "light", P = () => {
      try {
        return S2(window.localStorage.getItem("theme"));
      } catch {
        return "system";
      }
    }, _2 = (e, t2 = true) => {
      const n2 = S2(e), o3 = $(n2), a2 = o3 === "dark";
      document.documentElement.classList.toggle("dark", a2), document.documentElement.dataset.theme = n2, document.documentElement.dataset.resolvedTheme = o3, document.documentElement.style.colorScheme = o3;
      try {
        window.localStorage.setItem("theme", n2);
      } catch {
      }
      return t2 && window.dispatchEvent(new CustomEvent("lv2:theme-change", { detail: { theme: n2, resolvedTheme: o3, dark: a2 } })), { theme: n2, resolvedTheme: o3, dark: a2 };
    }, C2 = () => {
      const e = i4.__2luvTheme, t2 = S2(e?.getTheme ? e.getTheme() : P()), n2 = e?.getResolvedTheme ? X(e.getResolvedTheme()) : $(t2);
      return { theme: t2, resolvedTheme: n2, dark: n2 === "dark" };
    }, D = (e) => e === "system" ? "light" : e === "light" ? "dark" : "system", s3 = (e) => {
      e && k2(), v = e, h2 && (h2.hidden = !e), c2 && (c2.setAttribute("aria-expanded", String(e)), c2.setAttribute("aria-label", e ? r3.closeMenu : r3.openMenu)), m2(U, e), m2(x, !e), e && window.setTimeout(() => {
        w2?.querySelector('[aria-current="location"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
      }, 40);
    }, E = (e) => {
      f.forEach((t2) => {
        const n2 = t2 === e;
        t2.classList.toggle("is-active", n2), n2 ? t2.setAttribute("aria-current", "location") : t2.removeAttribute("aria-current");
      });
    }, k2 = () => {
      if (y2 = 0, !d3.length) return;
      const e = p2(window.location.hash || ""), t2 = e ? d3.find((a2) => p2(a2.link.getAttribute("href") || "") === e)?.link : null;
      if (t2) {
        E(t2);
        return;
      }
      const n2 = window.scrollY + Math.max(120, window.innerHeight * 0.24);
      let o3 = d3[0].link;
      d3.forEach((a2) => {
        a2.target.offsetTop <= n2 && (o3 = a2.link);
      }), E(o3);
    }, B = () => {
      !d3.length || y2 || (y2 = window.requestAnimationFrame(k2));
    }, G = (e) => {
      if (!e) {
        s3(false);
        return;
      }
      const t2 = document.getElementById(e);
      if (t2) {
        const n2 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        t2.scrollIntoView({ behavior: n2 ? "auto" : "smooth", block: "start" });
      }
      s3(false);
    }, T = () => {
      const e = C2();
      m2(F, e.theme !== "system"), m2(Y, e.theme !== "light"), m2(V, e.theme !== "dark");
      const t2 = u2[e.theme] || u2.system, n2 = u2[D(e.theme)] || u2.light, o3 = j.replace("{current}", t2).replace("{next}", n2);
      l3?.setAttribute("aria-label", o3), l3?.setAttribute("title", o3);
    }, K = () => {
      i4.__2luvTheme?.applyTheme || _2(P(), false), T();
    }, M = () => {
      const e = D(C2().theme), t2 = i4.__2luvTheme?.setTheme ? i4.__2luvTheme.setTheme(e) : _2(e);
      return T(), t2;
    }, R2 = (e) => {
      if (!r3.supportedLocales?.includes(e) || e === r3.locale) return;
      q("2luv-locale", e), I("NEXT_LOCALE"), window.localStorage.removeItem("preferredLanguage");
      const t2 = window.location.pathname.split("/");
      if (t2[2] === "blog") {
        const o3 = `/${e}`, a2 = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((b) => b.href).find((b) => {
          const L2 = new URL(b, window.location.href);
          return L2.origin === window.location.origin && (L2.pathname === o3 || L2.pathname.startsWith(`${o3}/`));
        });
        window.location.assign(`${a2 || `/${e}/blog`}${window.location.search}${window.location.hash}`);
        return;
      }
      const n2 = r3.localePaths?.[e];
      if (n2) {
        window.location.assign(`${n2}${window.location.search}${window.location.hash}`);
        return;
      }
      r3.supportedLocales.includes(t2[1]) ? t2[1] = e : t2.splice(1, 0, e), window.location.assign(`${t2.join("/")}${window.location.search}${window.location.hash}`);
    }, O2 = (e) => {
      if (!r3.activeRegions?.includes(e) || e === a(r3.region)) return;
      q("2luv-region", e), I("user-region");
      const t2 = new URL(window.location.href);
      t2.searchParams.set("region", e), window.location.assign(t2.toString());
    };
    l3 && K(), i4.__lv2Preferences = { changeLocale: R2, changeRegion: O2, toggleTheme: M }, l3 && window.addEventListener("lv2:theme-change", T), c2?.addEventListener("click", () => s3(!v)), document.querySelectorAll("[data-scroll-target]").forEach((e) => {
      e.addEventListener("click", () => G(e.getAttribute("data-scroll-target")));
    }), document.querySelectorAll("[data-close-drawer]").forEach((e) => {
      e.addEventListener("click", () => s3(false));
    }), f.forEach((e) => {
      e.addEventListener("click", () => E(e));
    });
    const H = document.querySelector("[data-header-locale]");
    H?.addEventListener("change", () => R2(H.value));
    const N = document.querySelector("[data-header-region]");
    N?.addEventListener("change", () => O2(N.value)), l3?.addEventListener("click", M);
    const z = () => {
      g2?.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", z, { passive: true }), window.addEventListener("scroll", B, { passive: true }), window.addEventListener("hashchange", B), z(), k2(), document.addEventListener("pointerdown", (e) => {
      const t2 = e.target;
      t2 instanceof Node && v && h2 && c2 && !h2.contains(t2) && !c2.contains(t2) && s3(false);
    }, true), window.addEventListener("keydown", (e) => {
      e.key === "Escape" && s3(false);
    }), window.addEventListener("2luv:card-preview", (e) => {
      const n2 = (e instanceof CustomEvent ? e.detail : null)?.phase === "open";
      g2?.classList.toggle("is-hidden", n2), g2?.setAttribute("aria-hidden", String(n2));
    });
  })();

  // assets/_astro/PricingSection.astro_astro_type_script_index_0_lang.CGUoorh4.js
  (() => {
    const i4 = document.querySelector("[data-pricing-controller]"), A2 = document.getElementById("pricing-section-config");
    if (!(i4 instanceof HTMLElement) || !A2) return;
    const u2 = JSON.parse(A2.textContent || "{}"), s3 = i4.querySelector("[data-pricing-card]"), W = i4.querySelectorAll("[data-pricing-aurora]"), _2 = i4.querySelector("[data-pricing-letter-label]"), V = i4.querySelector("[data-pricing-cards-label]"), ee = i4.querySelector("[data-pricing-letter-underline]"), te = i4.querySelector("[data-pricing-cards-underline]"), re = i4.querySelector("[data-pricing-track-runner]"), H = i4.querySelector("[data-pricing-ghost-value]"), S2 = i4.querySelector("[data-pricing-letter-price-slot]"), E = i4.querySelector("[data-pricing-cards-price-slot]"), O2 = i4.querySelector("[data-pricing-letter-static-price]"), I = i4.querySelector("[data-pricing-cards-static-price]"), b = i4.querySelector("[data-pricing-letter-stage]"), $ = i4.querySelector("[data-pricing-cards-stage]"), R2 = i4.querySelector("[data-pricing-letter-cta]"), U = i4.querySelector("[data-pricing-cards-cta]"), B = i4.querySelector("[data-pricing-cards-feature-list]");
    if (!(s3 instanceof HTMLElement) || !(S2 instanceof HTMLElement) || !(E instanceof HTMLElement) || !(b instanceof HTMLElement) || !($ instanceof HTMLElement) || !(R2 instanceof HTMLElement) || !(U instanceof HTMLElement) || !(B instanceof HTMLElement)) return;
    let c2 = 0, m2 = "letter", x = false, o3 = false, h2 = 0, y2 = false, Y = null, M = null, k2 = false, z = false, L2 = null;
    const j = Array.isArray(u2.baseCardsFeatures) ? u2.baseCardsFeatures : [], ne = X(u2.companionAddOnTemplate) || "+ unlock Letter for {price}", C2 = w2(u2.loadingPriceLabel, "Loading current price"), ie = w2(u2.priceErrorLabel, "Unable to load current price"), ce = w2(u2.priceLead, "for"), oe = w2(u2.pricingEndpoint, "");
    w2(u2.locale, "en");
    const ae = /^[A-Z]{2}$/;
    function w2(e, t2 = "") {
      return typeof e == "string" && e.trim() ? e : t2;
    }
    function X(e, t2 = "") {
      return typeof e == "string" && e.trim() ? e : t2;
    }
    function g2(e) {
      return String(e).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
    }
    function se(e) {
      const t2 = e ? decodeURIComponent(e).trim().toUpperCase() : "";
      return ae.test(t2) ? t2 : "";
    }
    function le() {
      const e = new URLSearchParams(window.location.search).get("region");
      return se(e);
    }
    function de() {
      return le();
    }
    function pe() {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      } catch {
        return "";
      }
    }
    function T(e) {
      return typeof e == "string" ? { text: e, included: true } : e && typeof e == "object" ? { text: X(e.text), included: e.included !== false, loading: e.loading === true } : { text: "", included: true };
    }
    function l3(e, t2, r3) {
      if (e <= t2[0]) return r3[0];
      const n2 = t2.length - 1;
      if (e >= t2[n2]) return r3[n2];
      for (let a2 = 0; a2 < n2; a2 += 1) {
        const d3 = t2[a2], p2 = t2[a2 + 1];
        if (e < d3 || e > p2) continue;
        const F = (e - d3) / (p2 - d3);
        return r3[a2] + (r3[a2 + 1] - r3[a2]) * F;
      }
      return r3[n2];
    }
    function ue(e) {
      let r3;
      e < 0.35 ? r3 = 86 : e > 0.46 ? r3 = 0 : r3 = 86 * (1 - (e - 0.35) / 0.11);
      let n2;
      e < 0.44 ? n2 = 0 : e > 0.55 ? n2 = 86 : n2 = 86 * ((e - 0.44) / 0.11);
      const a2 = 35, d3 = 0.45;
      let p2 = 0;
      return e > 0.35 && e <= d3 ? p2 = a2 * ((e - 0.35) / (d3 - 0.35)) : e > d3 && e < 0.55 && (p2 = a2 * (1 - (e - d3) / (0.55 - d3))), `inset(${p2.toFixed(1)}% ${r3.toFixed(1)}% ${p2.toFixed(1)}% ${n2.toFixed(1)}% round 200px)`;
    }
    function f(e, t2) {
      (e instanceof HTMLElement || e instanceof SVGElement) && e.setAttribute("style", t2);
    }
    function J() {
      const e = Y?.formatted ?? "", t2 = M?.formattedBundle ?? M?.formattedCard ?? "", r3 = e ? ne.replace("{price}", e) : "";
      return { cardsFeatures: r3 ? [...j.map(T), { text: r3, included: true }] : [...j.map(T), { text: "", included: true, loading: true }], cardsFormatted: t2, cardsLoading: !t2, letterFormatted: e, letterLoading: !e };
    }
    function ge(e) {
      return `
          <span class="pricing-check ${e}" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </span>`;
    }
    function fe() {
      return `
          <span class="pricing-check pricing-x" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>`;
    }
    function me() {
      const { cardsFeatures: e } = J();
      B.innerHTML = e.map((t2) => {
        const r3 = T(t2);
        return r3.loading ? `<li><span class="pricing-check-placeholder" aria-hidden="true"></span><span class="pricing-feature-skeleton"><span class="pricing-sr-only">${g2(C2)}</span></span></li>` : r3.included ? `<li>${ge("pricing-check-cards")}<span>${g2(r3.text)}</span></li>` : `<li>${fe()}<span class="pricing-feature-negative">${g2(r3.text)}</span></li>`;
      }).join("");
    }
    function q() {
      const { letterFormatted: e, cardsFormatted: t2, letterLoading: r3, cardsLoading: n2 } = J();
      H && (H.textContent = t2), S2.innerHTML = r3 ? `<span class="pricing-price-skeleton"><span class="pricing-sr-only">${g2(C2)}</span></span>` : `<span class="pricing-price-text pricing-price-value-free">${g2(e)}</span>`, E.innerHTML = `<span class="pricing-price-text pricing-price-lead">${g2(ce)}</span>${n2 ? `<span class="pricing-price-skeleton"><span class="pricing-sr-only">${g2(C2)}</span></span>` : `<span class="pricing-price-text pricing-price-value-premium">${g2(t2)}</span>`}`, O2 && (O2.innerHTML = S2.innerHTML), I && (I.innerHTML = E.innerHTML), me(), he();
    }
    function he() {
      const e = i4.querySelector("[data-pricing-error]");
      if (!k2) {
        e?.remove();
        return;
      }
      if (e) return;
      const t2 = document.createElement("p");
      t2.className = "pricing-error", t2.role = "status", t2.dataset.pricingError = "", t2.textContent = ie, s3.appendChild(t2);
    }
    function N() {
      m2 = c2 >= 0.5 ? "cards" : "letter";
      const e = o3 ? 1 : l3(c2, [0, 0.4, 0.55], [1, 1, 0]), t2 = o3 ? 1 : l3(c2, [0.45, 0.6, 1], [0, 1, 1]), r3 = o3 ? 1 : l3(c2, [0.35, 0.7], [0, 1]), n2 = o3 ? 0 : l3(c2, [0.38, 0.55], [0, -100]), a2 = o3 ? 1 : l3(c2, [0.38, 0.52], [1, 0]), d3 = o3 ? 0 : l3(c2, [0.38, 0.55], [100, 0]), p2 = o3 ? 1 : l3(c2, [0.42, 0.55], [0, 1]), F = ue(c2), Se = l3(c2, [0.35, 0.55], [1, 0.78]), Ee = l3(c2, [0.35, 0.55], [0.78, 1]), Pe = l3(c2, [0.35, 0.5], [0, 1e3]), be = l3(c2, [0.42, 0.58], [1e3, 0]);
      i4.classList.toggle("is-reduced-motion", o3), W.forEach(($e) => f($e, `opacity:${r3};`)), f(_2, `opacity:${Se};`), f(V, `opacity:${Ee};`), f(ee, `stroke-dashoffset:${Pe};`), f(te, `stroke-dashoffset:${be};`), f(re, `clip-path:${F};`), f(S2, `transform:translateY(${n2}%);opacity:${a2};`), f(E, `transform:translateY(${d3}%);opacity:${p2};`), b.setAttribute("aria-hidden", String(!o3 && m2 !== "letter")), b.setAttribute("style", `opacity:${e};pointer-events:${o3 || m2 === "letter" ? "auto" : "none"};`), R2.setAttribute("tabindex", String(o3 || m2 === "letter" ? 0 : -1)), $.setAttribute("aria-hidden", String(!o3 && m2 !== "cards")), $.setAttribute("style", `opacity:${t2};pointer-events:${o3 || m2 === "cards" ? "auto" : "none"};`), U.setAttribute("tabindex", String(o3 || m2 === "cards" ? 0 : -1));
    }
    function P() {
      h2 || (h2 = window.requestAnimationFrame(() => {
        h2 = 0, Z();
      }));
    }
    function Z() {
      if (o3) {
        c2 = 0, N();
        return;
      }
      const e = i4.getBoundingClientRect(), t2 = Math.max(1, e.height - window.innerHeight);
      if (c2 = Math.min(1, Math.max(0, -e.top / t2)), !x) {
        const r3 = Math.sin(c2 * Math.PI * 3) * 120, n2 = Math.cos(c2 * Math.PI * 2) * 80;
        s3.style.setProperty("--posX", r3.toFixed(1)), s3.style.setProperty("--posY", n2.toFixed(1));
      }
      N();
    }
    function D(e) {
      x = true;
      const t2 = s3.getBoundingClientRect();
      s3.style.setProperty("--posX", String(e.clientX - t2.left - t2.width / 2)), s3.style.setProperty("--posY", String(e.clientY - t2.top - t2.height / 2));
    }
    function G() {
      x = false;
    }
    function ye(e, t2, r3) {
      const n2 = new URL(e, window.location.origin);
      return t2 && n2.searchParams.set("region", t2), r3 && n2.searchParams.set("tz", r3), n2.toString();
    }
    async function Le(e) {
      const t2 = await fetch(ye(e, de(), pe()), { cache: "default", credentials: "omit" });
      if (!t2.ok) throw new Error(`HTTP ${t2.status}`);
      return await t2.json();
    }
    async function K(e = 0) {
      try {
        k2 = false;
        const t2 = await Le(oe), r3 = t2.letter, n2 = t2.bundle;
        if (!r3 || !n2) throw new Error("Incomplete pricing response");
        if (y2) return;
        Y = r3, M = n2, i(t2.regionCode), q();
      } catch {
        if (y2) return;
        if (e < 1) {
          window.setTimeout(() => {
            y2 || K(e + 1);
          }, 800);
          return;
        }
        k2 = true, q();
      }
    }
    function v() {
      z || y2 || (z = true, L2?.disconnect(), L2 = null, K());
    }
    function we() {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => v(), { timeout: 2500 });
        return;
      }
      window.setTimeout(v, 1200);
    }
    function ve() {
      if (!("IntersectionObserver" in window)) {
        we();
        return;
      }
      L2 = new IntersectionObserver((e) => {
        e.some((t2) => t2.isIntersecting) && v();
      }, { rootMargin: "700px 0px", threshold: 0 }), L2.observe(i4);
    }
    o3 = window.matchMedia("(prefers-reduced-motion: reduce)").matches, q(), Z(), ve();
    const Q = document.querySelector("[data-menu-button]");
    Q?.addEventListener("click", v, { once: true }), s3.addEventListener("pointermove", D), s3.addEventListener("pointerleave", G), window.addEventListener("scroll", P, { passive: true }), window.addEventListener("resize", P, { passive: true }), window.addEventListener("pagehide", () => {
      y2 = true, window.removeEventListener("scroll", P), window.removeEventListener("resize", P), s3.removeEventListener("pointermove", D), s3.removeEventListener("pointerleave", G), L2?.disconnect(), Q?.removeEventListener("click", v), h2 && window.cancelAnimationFrame(h2);
    }, { once: true });
  })();

  // assets/_astro/consent.ngPTbJBt.js
  var p = "cookie-consent";
  var C = "cookie-consent";
  var m = ["cookieConsent", "cookie_consent"];
  function y(e = {}, n2 = (/* @__PURE__ */ new Date()).toISOString()) {
    const t2 = { necessary: true, preferences: !!e.preferences, analytics: !!e.analytics, marketing: !!e.marketing };
    return { version: 2, updatedAt: n2, categories: t2, google: S(t2) };
  }
  function O(e) {
    return y({ preferences: true, analytics: true, marketing: true }, e);
  }
  function k(e) {
    return y({ preferences: false, analytics: false, marketing: false }, e);
  }
  function d(e) {
    if (e == null) return null;
    if (typeof e == "string") {
      const o3 = l(e).trim();
      if (!o3) return null;
      const a2 = o3.toLowerCase();
      if (["accepted", "accept", "granted", "true", "all"].includes(a2)) return O();
      if (["rejected", "reject", "declined", "denied", "false", "necessary"].includes(a2)) return k();
      try {
        return d(JSON.parse(o3));
      } catch {
        return null;
      }
    }
    if (typeof e != "object" || Array.isArray(e)) return null;
    const n2 = e, t2 = R(n2);
    if (!t2) return null;
    const r3 = typeof n2.updatedAt == "string" && n2.updatedAt ? n2.updatedAt : (/* @__PURE__ */ new Date()).toISOString();
    return { version: Number.isFinite(Number(n2.version)) ? Number(n2.version) : 2, updatedAt: r3, categories: t2, google: S(t2) };
  }
  function A(e) {
    const n2 = L(e || ""), t2 = n2.get(p);
    if (t2) return d(t2);
    for (const r3 of m) {
      const o3 = n2.get(r3), a2 = d(o3);
      if (a2) return a2;
    }
    return null;
  }
  function w() {
    if (!s()) return null;
    try {
      const e = window.localStorage.getItem(C), n2 = d(e);
      if (n2) return n2;
    } catch {
    }
    return A(document.cookie);
  }
  function S(e) {
    return { security_storage: "granted", functionality_storage: e.preferences ? "granted" : "denied", personalization_storage: e.preferences ? "granted" : "denied", analytics_storage: e.analytics ? "granted" : "denied", ad_storage: e.marketing ? "granted" : "denied", ad_user_data: e.marketing ? "granted" : "denied", ad_personalization: e.marketing ? "granted" : "denied" };
  }
  function L(e) {
    const n2 = /* @__PURE__ */ new Map();
    for (const t2 of e.split(";")) {
      const r3 = t2.trim();
      if (!r3) continue;
      const o3 = r3.indexOf("="), a2 = o3 >= 0 ? r3.slice(0, o3) : r3, N = o3 >= 0 ? r3.slice(o3 + 1) : "", u2 = l(a2);
      !u2 || n2.has(u2) || n2.set(u2, l(N));
    }
    return n2;
  }
  function R(e) {
    const n2 = g(e.categories) ? e.categories : e, t2 = g(e.google) ? e.google : e, r3 = c(n2.preferences) ?? i2(t2.functionality_storage) ?? i2(t2.personalization_storage) ?? false, o3 = c(n2.analytics) ?? i2(t2.analytics_storage) ?? false, a2 = c(n2.marketing) ?? c(n2.ads) ?? i2(t2.ad_storage) ?? i2(t2.ad_user_data) ?? i2(t2.ad_personalization) ?? false;
    return { necessary: true, preferences: r3, analytics: o3, marketing: a2 };
  }
  function c(e) {
    if (typeof e == "boolean") return e;
    if (typeof e != "string") return null;
    const n2 = e.trim().toLowerCase();
    return ["true", "1", "yes", "accepted", "granted"].includes(n2) ? true : ["false", "0", "no", "rejected", "declined", "denied"].includes(n2) ? false : null;
  }
  function i2(e) {
    return e === "granted" ? true : e === "denied" ? false : c(e);
  }
  function g(e) {
    return !!e && typeof e == "object" && !Array.isArray(e);
  }
  function l(e) {
    try {
      return decodeURIComponent(e);
    } catch {
      return e;
    }
  }
  function s() {
    return typeof window < "u" && typeof document < "u";
  }

  // assets/_astro/themes.config.-2Q2DiBL.js
  var r = { halloween: { en: "hotel-halloween", pt: "hotel-halloween", es: "hotel-halloween", fr: "hotel-halloween", de: "hotel-halloween", zh: "hotel-halloween", "zh-tw": "hotel-halloween", ar: "hotel-halloween", ms: "hotel-halloween", ja: "hotel-halloween", ru: "hotel-halloween", ko: "hotel-halloween" }, "love-letter": { pt: "carta-de-amor", en: "love-letter", es: "carta-de-amor", fr: "lettre-damour", de: "liebesbrief", zh: "qingshu", "zh-tw": "qing-shu-tw", ar: "risalat-hub", ms: "surat-cinta", ja: "rabureta", ru: "lyubovnoe-pismo", ko: "sarang-pyeonji" }, birthday: { pt: "aniversario", en: "birthday", es: "cumpleanos", fr: "anniversaire", de: "geburtstag", zh: "shengri", "zh-tw": "sheng-ri-tw", ar: "eid-milad", ms: "hari-jadi", ja: "tanjobi", ru: "den-rozhdeniya", ko: "saengil" }, christmas: { pt: "cartao-de-natal", en: "christmas-card", es: "tarjeta-de-navidad", fr: "carte-de-noel", de: "weihnachtskarte", zh: "shengdan-ka", "zh-tw": "sheng-dan-ka-tw", ar: "bitaqat-eid-milad", ms: "kad-krismas", ja: "kurisumasu-kado", ru: "rozhdestvenskaya-otkrytka", ko: "keuriseumaseu-kadeu" }, valentines: { pt: "dia-dos-namorados", en: "valentines", es: "san-valentin", fr: "saint-valentin", de: "valentinstag", zh: "qingrenjie", "zh-tw": "qing-ren-jie-tw", ar: "eid-al-hob", ms: "hari-valentine", ja: "barentain-dee", ru: "den-svyatogo-valentina", ko: "ballentain-dei" }, "white-day": { pt: "white-day", en: "white-day", es: "white-day", fr: "white-day", de: "white-day", zh: "white-day", "zh-tw": "white-day-tw", ar: "white-day", ms: "white-day", ja: "white-day", ru: "white-day", ko: "hwaiteu-dei" }, "digital-love-gift": { pt: "presente-digital-amor", en: "digital-gift-for-loved-one", es: "regalo-digital-para-tu-amor", fr: "cadeau-digital-pour-etre-aime", de: "digitales-geschenk-fur-geliebte", zh: "shuzi-liwu-ai-ren", "zh-tw": "shu-zi-li-wu-ai-ren-tw", ar: "hadiya-raqmiya-lilhabib", ms: "hadiah-digital-untuk-yang-tersayang", ja: "dejitaru-gifuto-aisuru-hito", ru: "tsifrovoy-podarok-dlya-lyubimogo", ko: "saranghaneun-saram-digital-seonmul" }, anniversary: { pt: "presente-para-namorada", en: "anniversary-gift", es: "regalo-de-aniversario", fr: "cadeau-anniversaire-couple", de: "jahrestag-geschenk", zh: "zhounian-liwu", "zh-tw": "zhou-nian-liwu-tw", ar: "hadiya-dhikra-zawaj", ms: "hadiah-ulang-tahun-percintaan", ja: "kinenbi-okurimono", ru: "podarok-na-godovshchinu", ko: "ginyeomil-seonmul" }, "mothers-day": { pt: "presente-para-mae", en: "gift-for-mom", es: "regalo-para-mama", fr: "cadeau-pour-maman", de: "geschenk-fuer-mama", zh: "song-mama-liwu", "zh-tw": "song-mama-liwu-tw", ar: "hadiya-lilomm", ms: "hadiah-untuk-ibu", ja: "okasan-okurimono", ru: "podarok-dlya-mamy", ko: "eomma-seonmul" }, "fathers-day": { pt: "presente-para-pai", en: "gift-for-dad", es: "regalo-para-papa", fr: "cadeau-pour-papa", de: "geschenk-fuer-papa", zh: "song-baba-liwu", "zh-tw": "song-baba-liwu-tw", ar: "hadiya-lilab", ms: "hadiah-untuk-ayah", ja: "otosan-okurimono", ru: "podarok-dlya-papy", ko: "appa-seonmul" }, friendship: { pt: "presente-para-amiga", en: "gift-for-best-friend", es: "regalo-para-amiga", fr: "cadeau-pour-meilleure-amie", de: "geschenk-fuer-freundin", zh: "song-pengyou-liwu", "zh-tw": "song-pengyou-liwu-tw", ar: "hadiya-lissadiqa", ms: "hadiah-untuk-sahabat", ja: "tomodachi-okurimono", ru: "podarok-dlya-podrugi", ko: "chingu-seonmul" }, graduation: { pt: "presente-de-formatura", en: "graduation-gift", es: "regalo-de-graduacion", fr: "cadeau-diplome", de: "abschluss-geschenk", zh: "biye-liwu", "zh-tw": "bi-ye-liwu-tw", ar: "hadiya-takharruj", ms: "hadiah-graduasi", ja: "sotsugyou-okurimono", ru: "podarok-na-vypusknoj", ko: "joreop-seonmul" }, wedding: { pt: "presente-de-casamento", en: "wedding-gift", es: "regalo-de-boda", fr: "cadeau-de-mariage", de: "hochzeitsgeschenk", zh: "hunli-liwu", "zh-tw": "hun-li-liwu-tw", ar: "hadiya-azzifaf", ms: "hadiah-perkahwinan", ja: "kekkon-okurimono", ru: "svadebnyy-podarok", ko: "gyeolhon-seonmul" }, "new-year": { pt: "mensagem-de-ano-novo", en: "new-year-message", es: "mensaje-de-ano-nuevo", fr: "message-de-nouvel-an", de: "neujahrsbotschaft", zh: "xinnian-zhufu", "zh-tw": "xin-nian-zhufu-tw", ar: "risalat-ras-alsana", ms: "pesan-tahun-baru", ja: "shinnen-messeeji", ru: "novogodnee-soobshchenie", ko: "saehae-mesiji" } };
  var n = {};
  var t = (a2, e) => {
    a2 && (n[a2] && n[a2] !== e || (n[a2] = e));
  };
  Object.entries(r).forEach(([a2, e]) => {
    Object.values(e).forEach((i4) => {
      t(i4, a2);
    });
  });
  var h = { "love-letter": ["nota-de-amor", "qing-shu"], valentines: ["valentines", "dia-dos-namorados", "san-valentin", "saint-valentin", "valentinstag", "qingrenjie", "qing-ren-jie-tw", "eid-al-hob", "hari-valentine", "barentain-dee", "den-svyatogo-valentina", "den-sviatogo-valentina", "ballentain-dei", "qing-ren-jie"], "white-day": ["white-day", "whiteday", "white_day"], birthday: ["hadiah-ulang-tahun", "sheng-ri", "tanjoubi"], christmas: ["sheng-dan-he-ka", "sheng-dan-ka"], "digital-love-gift": ["presente-digital-amor", "presente-digital-para-amado", "presente-digital-para-amada", "presente-digital-para-alguem-amado", "presente-digital-para-quem-voce-ama", "presente-digital-para-pessoa-amada", "digitales-geschenk-fuer-einen-geliebten-menschen", "digitales-geschenk-fuer-geliebte-menschen", "digitales-geschenk-fuer-liebste", "digital-gift-for-loved-one", "digital-love-gift", "gift-for-loved-one", "regalo-digital-para-alguien-que-quieres", "regalo-digital-para-un-ser-querido", "cadeau-numerique-pour-un-etre-cher", "cadeau-numerique-pour-un-proche", "shu-zi-ai-yi-li-wu", "shu-zi-li-wu-gei-ai-ren", "shu-zi-li-wu-gei-suo-ai-zhi-ren", "shu-zi-li-wu-song-gei-ai-ren", "shuzi-liwu-gei-ai-de-ren", "shuzi-liwu-song-gei-ai-de-ren", "shu-wei-li-wu-gei-suo-ai-de-ren", "shu-wei-li-wu-gei-suo-ai-zhi-ren", "hadiya-raqmiya-liman-toheb", "hadiya-raqmiya-liman-tuhib", "hadiah-digital-untuk-orang-tersayang", "koibito-e-no-dejitaru-gifuto", "podarok-dlya-lyubimogo-cheloveka-v-cifrovom-formate", "podarok-lyubimomu-cheloveku-v-cifrovom-formate"], anniversary: ["aniversario-de-casamento", "anniversary", "aniversario", "presente-de-aniversario", "anniversaire-amoureux", "cadeau-anniversaire", "jahrestag", "jahrestagsgeschenk", "jubil\xE4um-geschenk", "jubilaeum-geschenk", "zhounian", "zhou-nian-tw", "ji-nian-ri-li-wu", "zhou-nian-ji-nian-li-wu", "dhikra-zawaj", "dhikra-sanawiya-gift", "hadiyat-dhikra-sanawiya", "ulang-tahun-percintaan", "kinenbi", "godovshchina", "ginyeomil"], "mothers-day": ["mothers-day", "dia-das-maes", "diadasmaes", "dia-de-la-madre", "fete-des-meres", "muttertag", "muqinjie", "mu-qin-jie-tw", "eid-al-omm", "hari-ibu", "hahanohiokuri", "den-materi", "eomeoninal", "song-gei-ma-ma-de-li-wu"], "fathers-day": ["fathers-day", "dia-dos-pais", "dia-del-padre", "fete-des-peres", "vatertag", "fuqinjie", "fu-qin-jie-tw", "eid-al-ab", "hadiya-lil-ab", "hari-bapa", "chichinohi", "den-otsa", "abeojinal", "podarok-pape", "presente-para-o-pai", "song-gei-ba-ba-de-li-wu", "songgeibabadelIwu"], friendship: ["friendship-day", "dia-da-amizade", "dia-de-la-amistad", "journee-amitie", "freundschaftstag", "geschenk-fuer-den-besten-freund", "youyiri", "you-yi-ri-tw", "eid-as-sadaqa", "hari-persahabatan", "yuujounohi", "den-druzhby", "ujeongeuninal", "hadiah-untuk-sahabat-karib", "presente-para-melhor-amiga", "regalo-para-mejor-amigo", "song-gei-zui-hao-de-peng-you-de-li-wu"], graduation: ["graduation", "formatura", "graduacion", "remise-des-diplomes", "abschlussfeier", "biyejidian", "bi-ye-ji-dian-tw", "haflet-takharruj", "majlis-graduasi", "sotsugyou", "vypusknoj", "joreop"], wedding: ["wedding", "casamento", "boda", "hadiyat-zafaf", "mariage", "hochzeit", "hunli", "hun-li-tw", "zifaf", "perkahwinan", "kekkon", "svadba", "svadebnyj-podarok", "gyeolhon", "hun-li-li-wu"], "new-year": ["new-year", "ano-novo", "ano-nuevo", "nouvel-an", "neujahr", "neujahrsnachricht", "xinnian", "xin-nian-tw", "eid-ras-alsana", "ras-al-sana-message", "tahun-baru", "mesej-tahun-baru", "shinnen", "shinnen-no-aisatsu", "novyy-god", "saehae", "saehae-message", "xin-nian-zhu-fu", "new_year", "newyear"] };
  Object.entries(h).forEach(([a2, e]) => {
    (e || []).forEach((i4) => t(i4, a2));
  });
  var o = { "love-letter": { en: "love-letter", pt: "carta-de-amor", es: "carta-de-amor", fr: "lettre-damour", de: "liebesbrief", zh: "qingshu", "zh-tw": "qing-shu-tw", ar: "risalat-hub", ms: "surat-cinta", ja: "rabureta", ru: "lyubovnoe-pismo", ko: "sarang-pyeonji" }, birthday: { en: "birthday", pt: "aniversario", es: "cumpleanos", fr: "anniversaire", de: "geburtstag", zh: "shengri", "zh-tw": "sheng-ri-tw", ar: "eid-milad", ms: "hari-jadi", ja: "tanjobi", ru: "den-rozhdeniya", ko: "saengil" }, christmas: { en: "christmas-card", pt: "cartao-de-natal", es: "tarjeta-de-navidad", fr: "carte-de-noel", de: "weihnachtskarte", zh: "shengdan-ka", "zh-tw": "sheng-dan-ka-tw", ar: "bitaqat-eid-milad", ms: "kad-krismas", ja: "kurisumasu-kado", ru: "rozhdestvenskaya-otkrytka", ko: "keuriseumaseu-kadeu" }, party: { en: "birthday-party", pt: "festa-de-aniversario", es: "fiesta-de-cumpleanos", fr: "fete-anniversaire", de: "geburtstagsparty", zh: "shengri-paidui", "zh-tw": "sheng-ri-pai-dui-tw", ar: "haflat-eid-milad", ms: "parti-hari-jadi", ja: "tanjobi-party", ru: "vecherinka-den-rozhdeniya", ko: "saengil-pati" }, bloom: { en: "bloom-letter", pt: "carta-florescer", es: "carta-florecer", fr: "lettre-floraison", de: "bluetenbrief", zh: "kaihua-xin", "zh-tw": "kai-hua-xin-tw", ar: "risalat-zuhur", ms: "surat-mekar", ja: "hana-no-tegami", ru: "tsvetushchee-pismo", ko: "kkot-pyeonji" }, halloween: { en: "halloween", pt: "halloween", es: "halloween", fr: "halloween", de: "halloween", zh: "halloween", "zh-tw": "halloween", ar: "halloween", ms: "halloween", ja: "halloween", ru: "halloween", ko: "halloween" }, "white-day": { en: "white-day", pt: "white-day", es: "white-day", fr: "white-day", de: "white-day", zh: "white-day", "zh-tw": "white-day-tw", ar: "white-day", ms: "white-day", ja: "white-day", ru: "white-day", ko: "hwaiteu-dei" } };
  var s2 = {};
  Object.entries(o).forEach(([a2, e]) => {
    Object.values(e).forEach((i4) => {
      s2[i4] = a2;
    });
  });

  // assets/_astro/consent-theme.6ywPEaCg.js
  var o2 = new Set(Object.keys(r.halloween));

  // assets/_astro/BaseLayout.astro_astro_type_script_index_0_lang.DJpd15VC.js
  function _(t2, o3) {
    return !t2 || !!(o3?.categories.analytics || o3?.categories.marketing);
  }
  var d2 = "../_lazy/privacy-controls-DtZB9K6_.js";
  function i3(t2) {
    const o3 = window;
    return o3.__TWOLUV_PRIVACY_BOOT__ ? (o3.__TWOLUV_PRIVACY_BOOT__(), t2 && window.dispatchEvent(new CustomEvent("2luv:open-cookie-preferences", { detail: t2 })), o3.__TWOLUV_PRIVACY_BUNDLE__) : (o3.__TWOLUV_PRIVACY_BUNDLE__ || (o3.__TWOLUV_PRIVACY_BUNDLE__ = import(d2).then((e) => {
      const n2 = e.bootPrivacyControls;
      n2 && (o3.__TWOLUV_PRIVACY_BOOT__ = n2, n2());
    }).catch((e) => {
      o3.__TWOLUV_PRIVACY_BUNDLE__ = void 0, console.error("[2luv] Failed to load privacy controls.", e);
    })), o3.__TWOLUV_PRIVACY_BUNDLE__.then(() => {
      t2 && o3.__TWOLUV_PRIVACY_BOOT__ && window.dispatchEvent(new CustomEvent("2luv:open-cookie-preferences", { detail: t2 }));
    }));
  }
  function u() {
    try {
      return window.localStorage.getItem("cookie-consent") ? true : document.cookie.split(";").some((t2) => t2.trim().startsWith("cookie-consent="));
    } catch {
      return false;
    }
  }
  function r2() {
    if (!_(!!document.querySelector("[data-privacy-cookie-ssr]"), w())) return;
    const t2 = u() ? 1600 : 700, o3 = () => {
      i3();
    }, e = window.requestIdleCallback;
    e ? e(o3, { timeout: t2 }) : globalThis.setTimeout(o3, t2);
  }
  document.addEventListener("click", (t2) => {
    const o3 = t2.target instanceof Element ? t2.target.closest("[data-privacy-cookie-ssr] [data-consent-action]") : null, e = o3?.closest("[data-privacy-cookie-ssr]");
    if (e?.hasAttribute("data-consent-action-pending")) {
      t2.preventDefault(), t2.stopImmediatePropagation();
      return;
    }
    if (window.__TWOLUV_PRIVACY_BOOT__) return;
    if (o3) {
      t2.preventDefault(), t2.stopImmediatePropagation(), e?.setAttribute("data-consent-action-pending", ""), o3.setAttribute("aria-busy", "true");
      const c2 = o3.getAttribute("data-consent-action");
      Promise.resolve(i3()).then(() => {
        e?.removeAttribute("data-consent-action-pending"), o3.removeAttribute("aria-busy"), window.__TWOLUV_PRIVACY_BOOT__ && window.dispatchEvent(new CustomEvent("2luv:cookie-banner-action", { detail: { action: c2 } }));
      });
      return;
    }
    const n2 = t2.target instanceof Element ? t2.target.closest("[data-2luv-open-cookie-preferences]") : null;
    if (!n2) return;
    t2.preventDefault();
    const a2 = n2.getAttribute("data-2luv-cookie-focus") || void 0;
    i3(a2 ? { focusCategory: a2 } : {});
  }, true);
  window.addEventListener("2luv:open-cookie-preferences", (t2) => {
    if (window.__TWOLUV_PRIVACY_BOOT__) return;
    t2.stopImmediatePropagation();
    const o3 = t2 instanceof CustomEvent ? t2.detail : void 0;
    i3(o3);
  });
  r2();
  document.addEventListener("astro:page-load", r2);
})();
