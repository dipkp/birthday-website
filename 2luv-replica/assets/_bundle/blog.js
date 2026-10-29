(() => {
  // assets/_astro/pricing-region-controls.B3QK6_Sx.js
  function a(t) {
    return document.documentElement.dataset.pricingRegion || t;
  }

  // assets/_astro/HeaderV2.astro_astro_type_script_index_0_lang.DKQMm5Va.js
  (() => {
    const i = window, A = document.getElementById("lv2-header-config"), r = A ? JSON.parse(A.textContent || "{}") : {}, g = document.querySelector("[data-lv2-header]"), c = document.querySelector("[data-menu-button]"), h = document.querySelector("[data-menu-panel]"), U = document.querySelector("[data-menu-icon-open]"), x = document.querySelector("[data-menu-icon-close]"), l = document.querySelector("[data-theme-toggle]"), F = document.querySelector('[data-theme-icon="system"]'), V = document.querySelector('[data-theme-icon="moon"]'), Y = document.querySelector('[data-theme-icon="sun"]'), w = document.querySelector("[data-blog-post-drawer-nav]"), f = w ? Array.from(w.querySelectorAll('a[href^="#"]')) : [], d = f.reduce((e, t) => {
      const n = p(t.getAttribute("href") || "").slice(1), o = n ? document.getElementById(n) : null;
      return o && e.push({ link: t, target: o }), e;
    }, []);
    let v = false, y = 0;
    const u = r.themeLabels || { system: "System", light: "Light", dark: "Dark" }, j = r.themeStateTemplate || "Theme: {current}. Switch to {next}.", J = ["system", "light", "dark"], W = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null, q = (e, t) => {
      document.cookie = `${e}=${encodeURIComponent(t)};path=/;max-age=31536000;samesite=lax`;
    }, I = (e) => {
      document.cookie = `${e}=;path=/;max-age=0;samesite=lax`;
    }, m = (e, t) => {
      e?.classList.toggle("lv2-icon-hidden", t);
    };
    function p(e) {
      try {
        return decodeURIComponent(e);
      } catch {
        return e;
      }
    }
    const S = (e) => typeof e == "string" && J.includes(e) ? e : "system", X = (e) => e === "dark" ? "dark" : "light", $ = (e) => e === "system" && W?.matches || e === "dark" ? "dark" : "light", P = () => {
      try {
        return S(window.localStorage.getItem("theme"));
      } catch {
        return "system";
      }
    }, _ = (e, t = true) => {
      const n = S(e), o = $(n), a2 = o === "dark";
      document.documentElement.classList.toggle("dark", a2), document.documentElement.dataset.theme = n, document.documentElement.dataset.resolvedTheme = o, document.documentElement.style.colorScheme = o;
      try {
        window.localStorage.setItem("theme", n);
      } catch {
      }
      return t && window.dispatchEvent(new CustomEvent("lv2:theme-change", { detail: { theme: n, resolvedTheme: o, dark: a2 } })), { theme: n, resolvedTheme: o, dark: a2 };
    }, C = () => {
      const e = i.__2luvTheme, t = S(e?.getTheme ? e.getTheme() : P()), n = e?.getResolvedTheme ? X(e.getResolvedTheme()) : $(t);
      return { theme: t, resolvedTheme: n, dark: n === "dark" };
    }, D = (e) => e === "system" ? "light" : e === "light" ? "dark" : "system", s = (e) => {
      e && k(), v = e, h && (h.hidden = !e), c && (c.setAttribute("aria-expanded", String(e)), c.setAttribute("aria-label", e ? r.closeMenu : r.openMenu)), m(U, e), m(x, !e), e && window.setTimeout(() => {
        w?.querySelector('[aria-current="location"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
      }, 40);
    }, E = (e) => {
      f.forEach((t) => {
        const n = t === e;
        t.classList.toggle("is-active", n), n ? t.setAttribute("aria-current", "location") : t.removeAttribute("aria-current");
      });
    }, k = () => {
      if (y = 0, !d.length) return;
      const e = p(window.location.hash || ""), t = e ? d.find((a2) => p(a2.link.getAttribute("href") || "") === e)?.link : null;
      if (t) {
        E(t);
        return;
      }
      const n = window.scrollY + Math.max(120, window.innerHeight * 0.24);
      let o = d[0].link;
      d.forEach((a2) => {
        a2.target.offsetTop <= n && (o = a2.link);
      }), E(o);
    }, B = () => {
      !d.length || y || (y = window.requestAnimationFrame(k));
    }, G = (e) => {
      if (!e) {
        s(false);
        return;
      }
      const t = document.getElementById(e);
      if (t) {
        const n = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        t.scrollIntoView({ behavior: n ? "auto" : "smooth", block: "start" });
      }
      s(false);
    }, T = () => {
      const e = C();
      m(F, e.theme !== "system"), m(Y, e.theme !== "light"), m(V, e.theme !== "dark");
      const t = u[e.theme] || u.system, n = u[D(e.theme)] || u.light, o = j.replace("{current}", t).replace("{next}", n);
      l?.setAttribute("aria-label", o), l?.setAttribute("title", o);
    }, K = () => {
      i.__2luvTheme?.applyTheme || _(P(), false), T();
    }, M = () => {
      const e = D(C().theme), t = i.__2luvTheme?.setTheme ? i.__2luvTheme.setTheme(e) : _(e);
      return T(), t;
    }, R = (e) => {
      if (!r.supportedLocales?.includes(e) || e === r.locale) return;
      q("2luv-locale", e), I("NEXT_LOCALE"), window.localStorage.removeItem("preferredLanguage");
      const t = window.location.pathname.split("/");
      if (t[2] === "blog") {
        const o = `/${e}`, a2 = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((b) => b.href).find((b) => {
          const L = new URL(b, window.location.href);
          return L.origin === window.location.origin && (L.pathname === o || L.pathname.startsWith(`${o}/`));
        });
        window.location.assign(`${a2 || `/${e}/blog`}${window.location.search}${window.location.hash}`);
        return;
      }
      const n = r.localePaths?.[e];
      if (n) {
        window.location.assign(`${n}${window.location.search}${window.location.hash}`);
        return;
      }
      r.supportedLocales.includes(t[1]) ? t[1] = e : t.splice(1, 0, e), window.location.assign(`${t.join("/")}${window.location.search}${window.location.hash}`);
    }, O = (e) => {
      if (!r.activeRegions?.includes(e) || e === a(r.region)) return;
      q("2luv-region", e), I("user-region");
      const t = new URL(window.location.href);
      t.searchParams.set("region", e), window.location.assign(t.toString());
    };
    l && K(), i.__lv2Preferences = { changeLocale: R, changeRegion: O, toggleTheme: M }, l && window.addEventListener("lv2:theme-change", T), c?.addEventListener("click", () => s(!v)), document.querySelectorAll("[data-scroll-target]").forEach((e) => {
      e.addEventListener("click", () => G(e.getAttribute("data-scroll-target")));
    }), document.querySelectorAll("[data-close-drawer]").forEach((e) => {
      e.addEventListener("click", () => s(false));
    }), f.forEach((e) => {
      e.addEventListener("click", () => E(e));
    });
    const H = document.querySelector("[data-header-locale]");
    H?.addEventListener("change", () => R(H.value));
    const N = document.querySelector("[data-header-region]");
    N?.addEventListener("change", () => O(N.value)), l?.addEventListener("click", M);
    const z = () => {
      g?.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", z, { passive: true }), window.addEventListener("scroll", B, { passive: true }), window.addEventListener("hashchange", B), z(), k(), document.addEventListener("pointerdown", (e) => {
      const t = e.target;
      t instanceof Node && v && h && c && !h.contains(t) && !c.contains(t) && s(false);
    }, true), window.addEventListener("keydown", (e) => {
      e.key === "Escape" && s(false);
    }), window.addEventListener("2luv:card-preview", (e) => {
      const n = (e instanceof CustomEvent ? e.detail : null)?.phase === "open";
      g?.classList.toggle("is-hidden", n), g?.setAttribute("aria-hidden", String(n));
    });
  })();
})();
