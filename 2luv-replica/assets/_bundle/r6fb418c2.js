(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // assets/_astro/christmas-pointer-motion.DqozlT8j.js
  function F(s3, { stage: r5, propertyPrefix: c3, scale: a2 = 1.035, overscan: f2 = 0, isEnabled: C2 = () => true, observeAttributes: m3 = [] }) {
    if (typeof window > "u") return () => {
    };
    const p2 = new AbortController(), { signal: e } = p2, M = window.matchMedia("(prefers-reduced-motion: reduce)"), E = window.matchMedia("(hover: hover) and (pointer: fine)"), L2 = navigator.connection;
    let b = false, u2 = false, d5 = 0, h3 = 0, l4 = 0;
    const v2 = () => !u2 && b && !document.hidden && s3.isConnected && !M.matches && E.matches && !L2?.saveData && C2();
    function y4(i4, t2, w3) {
      s3.style.setProperty(`${c3}-x`, `${i4.toFixed(2)}px`), s3.style.setProperty(`${c3}-y`, `${t2.toFixed(2)}px`), s3.style.setProperty(`${c3}-scale`, String(w3));
    }
    function n2() {
      window.cancelAnimationFrame(d5), d5 = 0, h3 = l4 = 0, y4(0, 0, 1);
    }
    function o3() {
      v2() || n2();
    }
    function A2(i4) {
      if (i4.pointerType === "touch" || !v2()) return;
      const t2 = r5.getBoundingClientRect();
      if (t2.width <= 0 || t2.height <= 0) return;
      const w3 = Math.max(-1, Math.min(1, ((i4.clientX - t2.left) / t2.width - 0.5) * 2)), P = Math.max(-1, Math.min(1, ((i4.clientY - t2.top) / t2.height - 0.5) * 2));
      h3 = w3 * Math.min(12, t2.width * (a2 - 1) / 2 + f2), l4 = P * Math.min(12, t2.height * (a2 - 1) / 2 + f2), !d5 && (d5 = window.requestAnimationFrame(() => {
        if (d5 = 0, !v2()) {
          n2();
          return;
        }
        y4(h3, l4, a2);
      }));
    }
    const g3 = new IntersectionObserver((i4) => {
      b = i4[0]?.isIntersecting ?? false, o3();
    });
    g3.observe(r5);
    const x = m3.length ? new MutationObserver(o3) : void 0;
    return x?.observe(s3, { attributes: true, attributeFilter: m3 }), r5.addEventListener("pointerenter", A2, { passive: true, signal: e }), r5.addEventListener("pointermove", A2, { passive: true, signal: e }), r5.addEventListener("pointerleave", n2, { passive: true, signal: e }), r5.addEventListener("pointercancel", n2, { passive: true, signal: e }), window.addEventListener("blur", n2, { signal: e }), window.addEventListener("resize", n2, { passive: true, signal: e }), document.addEventListener("visibilitychange", o3, { signal: e }), M.addEventListener("change", o3, { signal: e }), E.addEventListener("change", o3, { signal: e }), L2?.addEventListener("change", o3, { signal: e }), n2(), () => {
      u2 || (u2 = true, p2.abort(), g3.disconnect(), x?.disconnect(), n2());
    };
  }
  var init_christmas_pointer_motion_DqozlT8j = __esm({
    "assets/_astro/christmas-pointer-motion.DqozlT8j.js"() {
    }
  });

  // assets/_astro/christmas-landing-moments.RzD3ivFt.js
  var christmas_landing_moments_RzD3ivFt_exports = {};
  __export(christmas_landing_moments_RzD3ivFt_exports, {
    initChristmasMoments: () => Ue
  });
  function j(t2) {
    const d5 = t2.startsWith(Ee + "/") ? t2.slice(Ee.length) : t2;
    return !/^\/(?:art|scene-media)\//.test(d5) || d5.includes("..") || d5.includes("\\") ? "" : Ee + d5;
  }
  function Le(t2, d5) {
    if (!Ve.includes(t2) || d5 !== "room" && !$e.includes(d5)) throw new RangeError("Unknown Christmas scene or composition");
    const f2 = `/scene-media/${t2}`, H = d5 === "room" ? `${f2}/room-poster` : `${f2}/${d5}/poster`;
    return { poster: { avif: j(`${H}.avif`), webp: j(`${H}.webp`) }, ...d5 === "room" ? {} : { forward: j(`${f2}/${d5}/forward.mp4`), reverse: j(`${f2}/${d5}/reverse.mp4`) } };
  }
  function De(t2, d5) {
    if (t2 !== "landscape" && t2 !== "portrait") throw new RangeError("Unknown Christmas preview composition");
    return { poster: Le(t2, d5).poster, forward: j(`/scene-media/${t2}/${d5}/forward-scroll-hd.mp4`), reverse: j(`/scene-media/${t2}/${d5}/reverse-scroll-hd.mp4`) };
  }
  function We({ root: t2, stage: d5, count: f2, getIndex: H, isBusy: G, isEnabled: O2 = () => true, onChoose: r5 }) {
    const E = new AbortController(), { signal: m3 } = E, _2 = /* @__PURE__ */ new Set();
    let M = -1 / 0, L2 = 0, T = false, q, z = 0, y4 = 0, J = 0, $ = false;
    const V = () => performance.now(), D2 = (n2) => n2.target instanceof Element ? n2.target : null, Y = (n2) => {
      const i4 = D2(n2);
      return !!(i4 && d5.contains(i4));
    }, I = () => Math.abs(d5.getBoundingClientRect().top) <= 2, A2 = (n2) => {
      const i4 = H() + n2;
      return i4 >= 0 && i4 < f2 ? i4 : void 0;
    }, w3 = (n2) => {
      n2.cancelable && n2.preventDefault();
    };
    function Z(n2, i4) {
      const l4 = d5.getBoundingClientRect();
      if (l4.bottom <= 0 || l4.top >= innerHeight) return false;
      const g3 = l4.top > 2 && n2 > 0 && i4 >= l4.top, p2 = l4.top < -2 && n2 < 0 && i4 >= -l4.top;
      return !g3 && !p2 ? false : (window.scrollTo({ top: Math.round(scrollY + l4.top), behavior: "instant" }), true);
    }
    function x(n2) {
      if (!O2() || document.hidden || n2.defaultPrevented || n2.ctrlKey || n2.metaKey || !n2.deltaY || Math.abs(n2.deltaX) > Math.abs(n2.deltaY) || !Y(n2) || D2(n2)?.closest(Re)) return;
      const i4 = n2.deltaMode === 1 ? Number.parseFloat(getComputedStyle(t2).lineHeight) || 20 : n2.deltaMode === 2 ? innerHeight : 1, l4 = n2.deltaY * i4, g3 = Math.sign(l4), p2 = V();
      if (p2 - M >= ze && (L2 = 0, T = false), M = p2, !I()) {
        Z(g3, Math.abs(l4)) && (w3(n2), T = true, L2 = 0);
        return;
      }
      if (G() || T) {
        w3(n2), T = true;
        return;
      }
      const b = A2(g3);
      if (b === void 0) {
        L2 = 0;
        return;
      }
      w3(n2), Math.sign(L2) !== g3 && (L2 = 0), L2 += l4, !(Math.abs(L2) < _e) && (T = true, L2 = 0, r5(b));
    }
    function ee(n2) {
      if (q = void 0, !O2() || document.hidden || n2.touches.length !== 1 || !Y(n2) || D2(n2)?.closest(Fe2)) return;
      const i4 = n2.touches[0];
      q = i4.identifier, z = i4.clientX, y4 = J = i4.clientY, $ = false;
    }
    function fe(n2) {
      if (!O2() || document.hidden || n2.defaultPrevented) return;
      if (q === void 0 || n2.touches.length !== 1) {
        q = void 0;
        return;
      }
      const i4 = Array.from(n2.touches).find((F2) => F2.identifier === q);
      if (!i4) return;
      const l4 = y4 - i4.clientY, g3 = Math.abs(i4.clientX - z);
      if (g3 > 8 && g3 > Math.abs(l4)) {
        q = void 0;
        return;
      }
      const p2 = J - i4.clientY;
      if (J = i4.clientY, !l4) return;
      if (!I()) {
        Z(Math.sign(p2), Math.abs(p2)) && (w3(n2), $ = true);
        return;
      }
      if (G() || $) {
        w3(n2), $ = true;
        return;
      }
      const b = A2(Math.sign(l4));
      b !== void 0 && (w3(n2), !(Math.abs(l4) < Ye) && ($ = true, r5(b)));
    }
    function o3() {
      q = void 0, $ = false;
    }
    function h3(n2) {
      if (!O2() || document.hidden || n2.defaultPrevented || n2.altKey || n2.ctrlKey || n2.metaKey || !I()) return;
      const i4 = D2(n2);
      if (i4?.closest(Fe2) || i4 && i4 !== document.body && i4 !== document.documentElement && !d5.contains(i4)) return;
      const l4 = ["ArrowDown", "PageDown"].includes(n2.key) || n2.key === " " && !n2.shiftKey ? 1 : ["ArrowUp", "PageUp"].includes(n2.key) || n2.key === " " && n2.shiftKey ? -1 : 0, g3 = n2.key === "Home" ? 0 : n2.key === "End" ? f2 - 1 : void 0;
      if (!l4 && g3 === void 0) return;
      if (_2.has(n2.key)) {
        w3(n2);
        return;
      }
      if (n2.repeat) return;
      if (G()) {
        w3(n2), _2.add(n2.key);
        return;
      }
      const p2 = g3 ?? A2(l4);
      p2 !== void 0 && (w3(n2), _2.add(n2.key), p2 !== H() && r5(p2));
    }
    function P() {
      M = V(), L2 = 0, T = true, $ = true;
    }
    function v2() {
      P(), _2.clear(), o3();
    }
    return window.addEventListener("wheel", x, { capture: true, passive: false, signal: m3 }), window.addEventListener("touchstart", ee, { passive: true, signal: m3 }), window.addEventListener("touchmove", fe, { capture: true, passive: false, signal: m3 }), window.addEventListener("touchend", o3, { passive: true, signal: m3 }), window.addEventListener("touchcancel", o3, { passive: true, signal: m3 }), window.addEventListener("keydown", h3, { signal: m3 }), window.addEventListener("keyup", (n2) => _2.delete(n2.key), { signal: m3 }), window.addEventListener("blur", v2, { signal: m3 }), window.addEventListener("pagehide", v2, { signal: m3 }), document.addEventListener("visibilitychange", () => {
      document.hidden && v2();
    }, { signal: m3 }), { reset: P, destroy() {
      v2(), E.abort();
    } };
  }
  function Ke(t2) {
    if (typeof window > "u") return () => {
    };
    const d5 = t2.querySelector("[data-christmas-scroll-stage]");
    return d5 ? F(t2, { stage: d5, propertyPrefix: "--room-motion", isEnabled: () => t2.dataset.activeScene === "room" && t2.dataset.presentationState === "exploring", observeAttributes: ["data-active-scene", "data-presentation-state"] }) : () => {
    };
  }
  function Ue(t2, d5 = {}) {
    const f2 = t2.querySelector("[data-christmas-scene-image]"), H = t2.querySelector("[data-christmas-scene-source]"), G = t2.querySelector("[data-christmas-scene-mobile-source]"), O2 = t2.querySelector("[data-christmas-scene-mobile-webp]"), r5 = t2.querySelector("[data-christmas-travel-video]"), E = t2.querySelector("[data-christmas-transition-freeze]"), m3 = t2.querySelector("[data-christmas-scroll-stage]"), _2 = t2.querySelector("[data-christmas-room-hotspots]"), M = t2.querySelector("[data-christmas-moments-motion]"), L2 = t2.querySelector("[data-christmas-moments-index]"), T = t2.querySelector("[data-christmas-scene-prev]"), q = t2.querySelector("[data-christmas-scene-next]"), z = t2.querySelector("[data-christmas-scene-menu-toggle]"), y4 = t2.querySelector("[data-christmas-scene-menu]"), J = t2.querySelector("[data-christmas-scene-controls]"), $ = t2.querySelector("[data-christmas-moments-exit]"), V = t2.querySelector("[data-christmas-room-choice]"), D2 = Array.from(t2.querySelectorAll("[data-christmas-scene-menu-item]")), Y = Array.from(t2.querySelectorAll("[data-christmas-moment]")), I = Array.from(t2.querySelectorAll("[data-christmas-slide-anchor]"));
    if (!f2 || !H || !G || !O2 || !r5 || !E || !m3 || !M || !Y.length) return;
    const A2 = Y.map((e) => e.dataset.christmasMoment);
    let w3 = d5.initialScene ? A2.findIndex((e) => e === d5.initialScene) : -1;
    const Z = matchMedia("(prefers-reduced-motion: reduce)"), x = matchMedia("(max-width: 720px)"), ee = navigator.connection, fe = new AbortController(), { signal: o3 } = fe;
    let h3 = -1, P = -1, v2 = false, n2 = false, i4 = false, l4 = false, g3 = false, p2 = false, b = false, F2 = 0, me, te = x.matches ? "portrait" : "landscape";
    const B = () => !Z.matches && !ee?.saveData && !["slow-2g", "2g"].includes(ee?.effectiveType || ""), S2 = (e) => e === F2 && v2 && !document.hidden && t2.isConnected, ae = (e) => e < 0 ? "room" : A2[e], Q = "#christmas-slide-room";
    t2.dataset.scrollEnhanced = "true", t2.dataset.navigationMode = "direction", t2.dataset.videoFrameReady = "false", t2.dataset.frozenFrame = "false", t2.dataset.presentationState = "exploring", t2.style.setProperty("--scene-copy-opacity", "1");
    const Te = Ke(t2);
    function N() {
      M.hidden = !B() || (p2 ? l4 : !v2 || g3), M.dataset.paused = String(i4), M.setAttribute("aria-label", (i4 ? M.dataset.playLabel : M.dataset.pauseLabel) || "");
    }
    function ne(e) {
      n2 = e, t2.dataset.navigationState = e ? "transitioning" : "idle", t2.setAttribute("aria-busy", String(e)), I.forEach((a2) => {
        e ? a2.setAttribute("aria-disabled", "true") : a2.removeAttribute("aria-disabled");
      }), D2.forEach((a2) => {
        a2.disabled = e;
      }), V && (V.disabled = e), Ae(), e && R2();
    }
    function Ae() {
      T && (T.disabled = n2 || h3 < 0), q && (q.disabled = n2 || h3 === A2.length - 1);
    }
    function we2(e) {
      p2 = e, t2.dataset.presentationState = e ? "active" : "exploring", _2 && (_2.inert = e), N(), ve2.reset();
    }
    function R2(e = false) {
      if (!y4 || !z) return;
      const a2 = y4.contains(document.activeElement);
      y4.hidden = true, z.setAttribute("aria-expanded", "false"), (e || a2) && z.focus({ preventScroll: true });
    }
    function he(e) {
      h3 = e, t2.dataset.activeScene = ae(e), Y.forEach((a2, s3) => {
        const c3 = s3 === e;
        a2.open = c3, a2.dataset.active = String(c3);
      }), I.forEach((a2, s3) => {
        s3 === e ? a2.setAttribute("aria-current", "step") : a2.removeAttribute("aria-current");
      }), D2.forEach((a2, s3) => {
        s3 === e ? a2.setAttribute("aria-current", "step") : a2.removeAttribute("aria-current");
      }), e < 0 ? V?.setAttribute("aria-current", "step") : V?.removeAttribute("aria-current"), Ae(), L2 && (L2.textContent = e < 0 ? L2.dataset.roomLabel || t2.dataset.roomLabel || "" : `${String(e + 1).padStart(2, "0")} / ${String(A2.length).padStart(2, "0")}`);
    }
    function pe() {
      t2.dataset.frozenFrame = "false", (!v2 || document.hidden) && (E.width = E.height = 0);
    }
    function re(e) {
      return !S2(e) || o3.aborted ? Promise.resolve(false) : new Promise((a2) => {
        let s3 = 0;
        const c3 = (X) => {
          cancelAnimationFrame(s3), clearTimeout(K), document.removeEventListener("visibilitychange", u2), o3.removeEventListener("abort", C2), a2(X && S2(e));
        }, u2 = () => {
          document.hidden && c3(false);
        }, C2 = () => c3(false), K = setTimeout(() => c3(false), 500);
        document.addEventListener("visibilitychange", u2), o3.addEventListener("abort", C2, { once: true }), s3 = requestAnimationFrame(() => {
          s3 = requestAnimationFrame(() => c3(true));
        });
      });
    }
    function se() {
      if (t2.dataset.frozenFrame === "true") return;
      const e = t2.dataset.videoFrameReady === "true" && r5.readyState >= 2 && r5.videoWidth > 0;
      if (!e && (!f2.complete || !f2.naturalWidth)) return;
      const a2 = E.getContext("2d");
      if (!a2) return;
      const s3 = e ? r5.videoWidth : f2.naturalWidth, c3 = e ? r5.videoHeight : f2.naturalHeight;
      E.width !== s3 && (E.width = s3), E.height !== c3 && (E.height = c3), a2.drawImage(e ? r5 : f2, 0, 0, E.width, E.height), t2.dataset.frozenFrame = "true";
    }
    async function ie(e = true) {
      const a2 = F2;
      return e ? se() : pe(), me?.(), me = void 0, r5.pause(), e && v2 && !document.hidden && !await re(a2) && S2(a2) || a2 !== F2 ? false : (t2.dataset.videoFrameReady = "false", r5.hasAttribute("src") && (r5.removeAttribute("src"), r5.load()), true);
    }
    async function Ce(e, a2) {
      const s3 = Le("landscape", ae(e)).poster, c3 = Le("portrait", ae(e)).poster;
      if (se(), H.getAttribute("srcset") !== s3.avif && (G.srcset = c3.avif, O2.srcset = c3.webp, H.srcset = s3.avif, f2.src = s3.webp), f2.alt = e < 0 ? t2.dataset.roomAlt || "" : Y[e].dataset.sceneAlt || "", t2.dataset.environment = ae(e), !await re(a2)) return false;
      let u2;
      const C2 = await Promise.race([f2.decode().then(() => true, () => false), new Promise((K) => {
        u2 = setTimeout(() => K(false), 4e3);
      })]);
      return clearTimeout(u2), !C2 || !S2(a2) || !await re(a2) ? false : (t2.dataset.videoFrameReady = "false", pe(), true);
    }
    async function ye2(e, a2, s3 = false) {
      if (a2 !== F2 || s3 && (se(), t2.dataset.scenePhase = "settling", t2.dataset.transitionState = "settling", await new Promise((u2) => setTimeout(u2, 180)), !S2(a2))) return;
      if (b && e >= 0) {
        await ge(e, a2);
        return;
      }
      he(e), t2.dataset.scenePhase = "hold", t2.dataset.transitionState = "idle", t2.style.setProperty("--scene-copy-opacity", "1");
      const c3 = v2 && !document.hidden ? await Ce(e, a2) : false;
      if (a2 === F2) {
        if (b && e >= 0) {
          await ge(e, a2);
          return;
        }
        if (await ie(v2 && !document.hidden && !c3), a2 === F2) {
          if (b && e >= 0) {
            await ge(e, a2);
            return;
          }
          if (ne(false), e < 0) {
            const u2 = p2;
            b = false, we2(false), u2 && (history.replaceState(null, "", Q), t2.querySelector("[data-christmas-room-intro] h3")?.focus({ preventScroll: true }));
          }
          delete t2.dataset.targetScene, ve2.reset(), N(), e < 0 && Ie(a2);
        }
      }
    }
    async function ge(e, a2) {
      if (!S2(a2)) return;
      P = -1, t2.dataset.targetScene = "room", t2.style.setProperty("--scene-copy-opacity", "0");
      const s3 = B() && !i4 && !l4 && await be(e, "reverse", a2);
      S2(a2) && await ye2(-1, a2, s3);
    }
    function Ie(e) {
      const a2 = () => S2(e) && h3 < 0 && !p2 && !n2;
      if (!a2() || !B() || i4) return;
      g3 = false, N(), se(), t2.dataset.roomVideoState = "loading";
      let s3 = false, c3 = 0;
      const u2 = setTimeout(() => X(), 12e3), C2 = () => {
        s3 || (s3 = true, clearTimeout(u2), c3 && r5.cancelVideoFrameCallback(c3), r5.removeEventListener("loadeddata", le2), r5.removeEventListener("playing", de), r5.removeEventListener("error", X), t2.dataset.roomVideoState = "stopped");
      }, K = async (ue = false) => {
        s3 || !a2() || (C2(), ue ? i4 = true : g3 = true, await ie(true), a2() && (await Ce(-1, e), a2() && (t2.dataset.roomVideoState = ue ? "paused" : "unavailable", N())));
      }, X = () => {
        K();
      }, k2 = async () => {
        c3 = 0, !(s3 || !a2() || !B() || i4 || r5.readyState < 2) && (t2.dataset.videoFrameReady = "true", !(!await re(e) || s3 || !a2()) && (clearTimeout(u2), pe(), t2.dataset.roomVideoState = "playing"));
      }, de = () => {
        s3 || !a2() || i4 || ("requestVideoFrameCallback" in r5 ? c3 = r5.requestVideoFrameCallback(k2) : k2());
      }, le2 = () => {
        s3 || !a2() || !B() || i4 || r5.play().catch(() => {
          K(true);
        });
      };
      me = C2, r5.addEventListener("loadeddata", le2, { once: true }), r5.addEventListener("playing", de, { once: true }), r5.addEventListener("error", X, { once: true }), r5.muted = true, r5.playsInline = true, r5.loop = true, r5.playbackRate = 1, r5.src = j(`/scene-media/${te}/room-idle.mp4`), r5.load();
    }
    async function be(e, a2, s3) {
      return !await ie(true) || !S2(s3) ? false : (t2.dataset.scenePhase = a2, t2.dataset.transitionPoint = A2[e], t2.dataset.transitionDirection = a2, t2.dataset.transitionFormat = te, t2.dataset.transitionState = "loading", new Promise((c3) => {
        let u2 = false, C2 = 0;
        const K = setTimeout(() => k2(false), 12e3), X = () => {
          clearTimeout(K), C2 && r5.cancelVideoFrameCallback(C2), r5.removeEventListener("loadeddata", ue), r5.removeEventListener("playing", le2), r5.removeEventListener("ended", qe), r5.removeEventListener("error", Pe);
        }, k2 = (ke) => {
          u2 || (u2 = true, X(), c3(ke));
        }, de = async () => {
          C2 = 0, !(!S2(s3) || u2 || r5.readyState < 2) && (t2.dataset.videoFrameReady = "true", !(!await re(s3) || u2) && (t2.dataset.transitionState = "playing", pe(), a2 === "forward" && t2.style.setProperty("--scene-copy-opacity", "1")));
        }, le2 = () => {
          if (!S2(s3)) {
            k2(false);
            return;
          }
          "requestVideoFrameCallback" in r5 ? C2 = r5.requestVideoFrameCallback(de) : de();
        }, ue = () => {
          if (!S2(s3)) {
            k2(false);
            return;
          }
          r5.play().catch(() => k2(false));
        }, qe = () => {
          se(), k2(true);
        }, Pe = () => k2(false);
        me = () => k2(false), r5.addEventListener("loadeddata", ue, { once: true }), r5.addEventListener("playing", le2, { once: true }), r5.addEventListener("ended", qe, { once: true }), r5.addEventListener("error", Pe, { once: true }), r5.muted = true, r5.playsInline = true, r5.loop = false, r5.playbackRate = 0.85, r5.src = De(te, A2[e])[a2], r5.load();
      }));
    }
    async function W(e, a2 = false) {
      if (e < -1 || e >= A2.length || n2 && !a2 || e === h3 && !a2) return;
      e >= 0 && (b = false), P = e;
      const s3 = ++F2;
      if (a2 || !B() || i4 || !v2 || document.hidden) {
        if (ne(true), await ie(v2 && !document.hidden), s3 !== F2) return;
        await ye2(e, s3);
        return;
      }
      l4 = false, N(), ne(true), t2.dataset.targetScene = ae(e), t2.style.setProperty("--scene-copy-opacity", "0");
      const c3 = h3 < 0 || await be(h3, "reverse", s3);
      if (S2(s3)) {
        if (b) {
          P = -1, await ye2(-1, s3, c3);
          return;
        }
        if (c3) {
          he(e);
          const u2 = e < 0 || await be(e, "forward", s3);
          if (!S2(s3)) return;
          l4 = !u2;
        } else l4 = true;
        await ye2(e, s3, c3 && !l4);
      }
    }
    const ve2 = We({ root: t2, stage: m3, count: A2.length + 1, getIndex: () => h3 + 1, isBusy: () => n2, isEnabled: () => p2, onChoose: (e) => {
      W(e - 1);
    } });
    function oe(e = false) {
      F2++, b = false, ie(e), he(P), ne(false), t2.dataset.scenePhase = "hold", t2.dataset.transitionState = "idle", t2.style.setProperty("--scene-copy-opacity", "1"), delete t2.dataset.targetScene, ve2.reset();
    }
    const Me = new IntersectionObserver((e) => {
      if (v2 = e[0]?.isIntersecting ?? false, !v2) {
        P = -1, we2(false), R2(), oe();
        return;
      }
      if (document.hidden) {
        oe();
        return;
      }
      if (w3 >= 0) {
        const a2 = w3;
        w3 = -1, U2(a2);
        return;
      }
      n2 || W(h3, true);
    }, { threshold: 0.1 });
    Me.observe(m3);
    function U2(e) {
      if (n2 || e < -1 || e >= A2.length) return;
      w3 = -1, R2();
      const a2 = e < 0 ? Q : I[e]?.hash;
      a2 && location.hash !== a2 && history.pushState(null, "", a2), m3.scrollIntoView({ block: "start", behavior: "instant" }), e >= 0 && we2(true), W(e);
    }
    I.forEach((e, a2) => e.addEventListener("click", (s3) => {
      s3.preventDefault(), U2(a2);
    }, { signal: o3 })), T?.addEventListener("click", () => U2(h3 - 1), { signal: o3 }), q?.addEventListener("click", () => U2(h3 + 1), { signal: o3 }), z?.addEventListener("click", () => {
      if (!y4) return;
      if (!y4.hidden) {
        R2(true);
        return;
      }
      y4.hidden = false, z.setAttribute("aria-expanded", "true");
      const e = h3 < 0 ? V : D2[h3];
      e && (y4.scrollTop = Math.max(0, e.offsetTop + e.offsetHeight / 2 - y4.clientHeight / 2), e.disabled || e.focus({ preventScroll: true }));
    }, { signal: o3 }), D2.forEach((e, a2) => e.addEventListener("click", () => {
      n2 || (R2(true), U2(a2));
    }, { signal: o3 })), V?.addEventListener("click", () => U2(-1), { signal: o3 }), document.addEventListener("keydown", (e) => {
      e.key === "Escape" && y4 && !y4.hidden && (e.preventDefault(), R2(true)), e.key === "Tab" && y4 && !y4.hidden && requestAnimationFrame(() => {
        !o3.aborted && !J?.contains(document.activeElement) && R2();
      });
    }, { signal: o3 }), document.addEventListener("pointerdown", (e) => {
      y4 && !y4.hidden && e.target instanceof Node && !J?.contains(e.target) && R2();
    }, { signal: o3 }), $?.addEventListener("click", (e) => {
      if (e.preventDefault(), R2(), b = true, P = -1, history.pushState(null, "", Q), !n2) {
        W(-1);
        return;
      }
      t2.dataset.scenePhase === "forward" && t2.dataset.transitionState === "loading" && t2.dataset.videoFrameReady !== "true" && W(-1, true);
    }, { signal: o3 });
    const Se = () => {
      if (o3.aborted) return;
      const e = location.hash === Q ? -1 : I.findIndex((a2) => a2.hash === location.hash);
      e < 0 && location.hash !== Q || (R2(), m3.scrollIntoView({ block: "start", behavior: "instant" }), W(p2 ? e : -1, true));
    };
    if (window.addEventListener("hashchange", Se, { signal: o3 }), I.findIndex((e) => e.hash === location.hash) >= 0 || location.hash === Q) {
      const e = location.hash;
      let a2 = false;
      const s3 = () => {
        a2 = true;
      };
      for (const u2 of ["wheel", "touchstart", "pointerdown", "keydown"]) window.addEventListener(u2, s3, { once: true, passive: true, signal: o3 });
      requestAnimationFrame(Se);
      const c3 = document.readyState === "complete" ? Promise.resolve() : new Promise((u2) => window.addEventListener("load", () => u2(), { once: true, signal: o3 }));
      Promise.all([c3, document.fonts.ready]).then(() => requestAnimationFrame(() => {
        o3.aborted || a2 || location.hash !== e || Math.abs(m3.getBoundingClientRect().top) > 2 && Se();
      }));
    }
    he(h3), ne(false), t2.dataset.scenePhase = "hold", t2.dataset.transitionState = "idle", Y.forEach((e, a2) => {
      e.querySelector("summary")?.addEventListener("click", (s3) => {
        (n2 || a2 !== h3) && (s3.preventDefault(), n2 || U2(a2));
      }, { signal: o3 });
    }), M.addEventListener("click", () => {
      i4 = !i4, (n2 || h3 < 0) && W(P, true), N();
    }, { signal: o3 });
    const ce2 = () => {
      const e = x.matches ? "portrait" : "landscape", a2 = e !== te;
      te = e, document.hidden ? (R2(), oe()) : v2 && (!B() || a2 || !n2) && W(P, true), N();
    };
    document.addEventListener("visibilitychange", ce2, { signal: o3 }), window.addEventListener("pagehide", () => oe(), { signal: o3 }), window.addEventListener("pageshow", ce2, { signal: o3 }), Z.addEventListener("change", ce2, { signal: o3 }), x.addEventListener("change", ce2, { signal: o3 }), ee?.addEventListener("change", ce2, { signal: o3 }), N(), w3 >= 0 && (t2.setAttribute("aria-busy", "true"), m3.scrollIntoView({ block: "start", behavior: "instant" })), document.addEventListener("astro:before-swap", () => {
      oe(), Te(), ve2.destroy(), Me.disconnect(), fe.abort();
    }, { once: true });
  }
  var Ee, $e, Ve, _e, ze, Ye, Ne, Re, Fe2;
  var init_christmas_landing_moments_RzD3ivFt = __esm({
    "assets/_astro/christmas-landing-moments.RzD3ivFt.js"() {
      init_christmas_pointer_motion_DqozlT8j();
      Ee = "/themes/christmas/v1";
      $e = ["letter", "tree", "story", "dreams", "photos", "places", "date", "music"];
      Ve = ["landscape", "square", "portrait"];
      _e = 40;
      ze = 250;
      Ye = 45;
      Ne = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
      Re = `${Ne}, [data-christmas-scene-menu]`;
      Fe2 = `${Re}, button, a, summary`;
    }
  });

  // assets/_astro/pricing-region-controls.B3QK6_Sx.js
  function i(t2) {
    if (typeof t2 != "string") return;
    const r5 = document.querySelectorAll("[data-header-region], [data-footer-region]");
    let n2;
    for (const e of r5) {
      const o3 = Array.from(e.options).find((c3) => c3.value === t2);
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
    const i4 = window, A2 = document.getElementById("lv2-header-config"), r5 = A2 ? JSON.parse(A2.textContent || "{}") : {}, g3 = document.querySelector("[data-lv2-header]"), c3 = document.querySelector("[data-menu-button]"), h3 = document.querySelector("[data-menu-panel]"), U2 = document.querySelector("[data-menu-icon-open]"), x = document.querySelector("[data-menu-icon-close]"), l4 = document.querySelector("[data-theme-toggle]"), F2 = document.querySelector('[data-theme-icon="system"]'), V = document.querySelector('[data-theme-icon="moon"]'), Y = document.querySelector('[data-theme-icon="sun"]'), w3 = document.querySelector("[data-blog-post-drawer-nav]"), f2 = w3 ? Array.from(w3.querySelectorAll('a[href^="#"]')) : [], d5 = f2.reduce((e, t2) => {
      const n2 = p2(t2.getAttribute("href") || "").slice(1), o3 = n2 ? document.getElementById(n2) : null;
      return o3 && e.push({ link: t2, target: o3 }), e;
    }, []);
    let v2 = false, y4 = 0;
    const u2 = r5.themeLabels || { system: "System", light: "Light", dark: "Dark" }, j2 = r5.themeStateTemplate || "Theme: {current}. Switch to {next}.", J = ["system", "light", "dark"], W = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null, q = (e, t2) => {
      document.cookie = `${e}=${encodeURIComponent(t2)};path=/;max-age=31536000;samesite=lax`;
    }, I = (e) => {
      document.cookie = `${e}=;path=/;max-age=0;samesite=lax`;
    }, m3 = (e, t2) => {
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
    }, D2 = (e) => e === "system" ? "light" : e === "light" ? "dark" : "system", s3 = (e) => {
      e && k2(), v2 = e, h3 && (h3.hidden = !e), c3 && (c3.setAttribute("aria-expanded", String(e)), c3.setAttribute("aria-label", e ? r5.closeMenu : r5.openMenu)), m3(U2, e), m3(x, !e), e && window.setTimeout(() => {
        w3?.querySelector('[aria-current="location"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
      }, 40);
    }, E = (e) => {
      f2.forEach((t2) => {
        const n2 = t2 === e;
        t2.classList.toggle("is-active", n2), n2 ? t2.setAttribute("aria-current", "location") : t2.removeAttribute("aria-current");
      });
    }, k2 = () => {
      if (y4 = 0, !d5.length) return;
      const e = p2(window.location.hash || ""), t2 = e ? d5.find((a2) => p2(a2.link.getAttribute("href") || "") === e)?.link : null;
      if (t2) {
        E(t2);
        return;
      }
      const n2 = window.scrollY + Math.max(120, window.innerHeight * 0.24);
      let o3 = d5[0].link;
      d5.forEach((a2) => {
        a2.target.offsetTop <= n2 && (o3 = a2.link);
      }), E(o3);
    }, B = () => {
      !d5.length || y4 || (y4 = window.requestAnimationFrame(k2));
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
      m3(F2, e.theme !== "system"), m3(Y, e.theme !== "light"), m3(V, e.theme !== "dark");
      const t2 = u2[e.theme] || u2.system, n2 = u2[D2(e.theme)] || u2.light, o3 = j2.replace("{current}", t2).replace("{next}", n2);
      l4?.setAttribute("aria-label", o3), l4?.setAttribute("title", o3);
    }, K = () => {
      i4.__2luvTheme?.applyTheme || _2(P(), false), T();
    }, M = () => {
      const e = D2(C2().theme), t2 = i4.__2luvTheme?.setTheme ? i4.__2luvTheme.setTheme(e) : _2(e);
      return T(), t2;
    }, R2 = (e) => {
      if (!r5.supportedLocales?.includes(e) || e === r5.locale) return;
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
      const n2 = r5.localePaths?.[e];
      if (n2) {
        window.location.assign(`${n2}${window.location.search}${window.location.hash}`);
        return;
      }
      r5.supportedLocales.includes(t2[1]) ? t2[1] = e : t2.splice(1, 0, e), window.location.assign(`${t2.join("/")}${window.location.search}${window.location.hash}`);
    }, O2 = (e) => {
      if (!r5.activeRegions?.includes(e) || e === a(r5.region)) return;
      q("2luv-region", e), I("user-region");
      const t2 = new URL(window.location.href);
      t2.searchParams.set("region", e), window.location.assign(t2.toString());
    };
    l4 && K(), i4.__lv2Preferences = { changeLocale: R2, changeRegion: O2, toggleTheme: M }, l4 && window.addEventListener("lv2:theme-change", T), c3?.addEventListener("click", () => s3(!v2)), document.querySelectorAll("[data-scroll-target]").forEach((e) => {
      e.addEventListener("click", () => G(e.getAttribute("data-scroll-target")));
    }), document.querySelectorAll("[data-close-drawer]").forEach((e) => {
      e.addEventListener("click", () => s3(false));
    }), f2.forEach((e) => {
      e.addEventListener("click", () => E(e));
    });
    const H = document.querySelector("[data-header-locale]");
    H?.addEventListener("change", () => R2(H.value));
    const N = document.querySelector("[data-header-region]");
    N?.addEventListener("change", () => O2(N.value)), l4?.addEventListener("click", M);
    const z = () => {
      g3?.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", z, { passive: true }), window.addEventListener("scroll", B, { passive: true }), window.addEventListener("hashchange", B), z(), k2(), document.addEventListener("pointerdown", (e) => {
      const t2 = e.target;
      t2 instanceof Node && v2 && h3 && c3 && !h3.contains(t2) && !c3.contains(t2) && s3(false);
    }, true), window.addEventListener("keydown", (e) => {
      e.key === "Escape" && s3(false);
    }), window.addEventListener("2luv:card-preview", (e) => {
      const n2 = (e instanceof CustomEvent ? e.detail : null)?.phase === "open";
      g3?.classList.toggle("is-hidden", n2), g3?.setAttribute("aria-hidden", String(n2));
    });
  })();

  // assets/_astro/christmas-landing-ready.DJVJWn94.js
  function r(a2) {
    const e = document.querySelector("[data-christmas-launch-page]");
    if (!e || e.dataset.launchState === "open") {
      a2();
      return;
    }
    const t2 = new MutationObserver(() => {
      e.dataset.launchState === "open" && (t2.disconnect(), document.removeEventListener("astro:before-swap", n2), a2());
    }), n2 = () => t2.disconnect();
    t2.observe(e, { attributes: true, attributeFilter: ["data-launch-state"] }), document.addEventListener("astro:before-swap", n2, { once: true });
  }

  // assets/_astro/ChristmasGiftSurprise.astro_astro_type_script_index_0_lang.CiMxf8FB.js
  var D = 6e3;
  function U(e) {
    const n2 = e.querySelector("[data-gift-trigger]"), g3 = e.querySelector("[data-gift-art-template]"), k2 = e.querySelector("[data-gift-art]"), F2 = e.querySelector("[data-gift-parts-template]"), C2 = e.querySelector("[data-gift-parts]"), R2 = e.querySelector("[data-gift-speech]"), m3 = e.querySelector("[data-gift-status]"), y4 = e.querySelector("[data-gift-retry]"), w3 = e.querySelector("[data-gift-replay]");
    if (!n2 || !g3 || !k2 || !R2 || !m3 || !y4 || !w3) return () => {
    };
    const v2 = [{ template: g3, container: k2 }];
    F2 && C2 && v2.push({ template: F2, container: C2 });
    const P = () => v2.flatMap(({ container: t2 }) => [...t2.querySelectorAll("img")]), r5 = new AbortController();
    let a2 = false, T = false, I = false, h3 = false, S2 = false, c3 = 0, s3 = 0, f2;
    function b() {
      window.cancelAnimationFrame(s3), s3 = 0;
    }
    function q() {
      c3 += 1, b(), f2?.();
    }
    function l4(t2) {
      e.dataset.giftState = t2, e.setAttribute("aria-busy", String(t2 === "loading")), n2.setAttribute("aria-label", (e.open ? e.dataset.giftClose : e.dataset.giftOpen) || ""), R2.textContent = t2 === "revealed" && e.dataset.giftFoundGold || "", m3.textContent = t2 === "loading" ? e.dataset.giftPreparing || "" : t2 === "error" && (e.dataset.giftErrorLabel || e.dataset.giftRetryLabel) || "", m3.hidden = t2 !== "loading" && t2 !== "error", y4.hidden = t2 !== "error", w3.hidden = t2 !== "revealed";
    }
    function M() {
      return new Promise((t2) => {
        let d5 = false, i4 = 0;
        const L2 = window.setTimeout(() => o3(false), D), G = () => o3(false);
        function o3(u2) {
          d5 || (d5 = true, window.clearTimeout(L2), window.cancelAnimationFrame(i4), f2 === G && (f2 = void 0), t2(u2));
        }
        f2 = G, i4 = window.requestAnimationFrame(() => {
          i4 = window.requestAnimationFrame(() => {
            i4 = 0;
            const u2 = P();
            if (!u2.length) {
              o3(false);
              return;
            }
            Promise.all(u2.map((p2) => p2.decode())).then(() => o3(u2.every((p2) => p2.complete && p2.naturalWidth > 0)), () => o3(false));
          });
        });
      });
    }
    async function O2() {
      const t2 = ++c3;
      f2?.(), (!I || S2) && (v2.forEach(({ container: i4, template: L2 }) => i4.replaceChildren(L2.content.cloneNode(true))), P().forEach((i4) => {
        i4.loading = "eager";
      }), I = true, S2 = false), l4("loading");
      const d5 = await M();
      a2 || t2 !== c3 || !e.open || (d5 ? (h3 = true, e.dataset.giftReady = "true", l4("revealed")) : (S2 = true, l4("error")));
    }
    function E() {
      if (!a2) {
        if (!e.open) {
          e.dataset.giftState !== "closed" && q(), l4("closed");
          return;
        }
        b(), h3 ? l4("revealed") : e.dataset.giftState !== "loading" && O2();
      }
    }
    function V() {
      q(), e.open = false, l4("closed");
    }
    function A2() {
      e.dataset.giftVisible = String(!a2 && T && !document.hidden);
    }
    e.dataset.giftState = "closed", e.dataset.giftReady = "false", e.dataset.giftVisible = "false", e.addEventListener("toggle", E, { signal: r5.signal }), n2.addEventListener("click", b, { signal: r5.signal }), y4.addEventListener("click", () => {
      !a2 && e.open && e.dataset.giftState === "error" && O2();
    }, { signal: r5.signal }), w3.addEventListener("click", () => {
      if (a2 || !h3) return;
      n2.focus({ preventScroll: true }), V();
      const t2 = c3;
      s3 = window.requestAnimationFrame(() => {
        s3 = window.requestAnimationFrame(() => {
          s3 = 0, !(a2 || t2 !== c3) && (e.open = true, E());
        });
      });
    }, { signal: r5.signal }), e.addEventListener("keydown", (t2) => {
      t2.key !== "Escape" || !e.open && !s3 || (t2.preventDefault(), V(), n2.focus({ preventScroll: true }));
    }, { signal: r5.signal }), document.addEventListener("visibilitychange", A2, { signal: r5.signal });
    const x = "IntersectionObserver" in window ? new IntersectionObserver((t2) => {
      T = t2.some((d5) => d5.isIntersecting), A2();
    }) : void 0;
    return x?.observe(e), E(), () => {
      a2 || (a2 = true, q(), r5.abort(), x?.disconnect(), A2());
    };
  }
  r(() => {
    document.querySelectorAll("[data-christmas-gift]").forEach((e) => {
      const n2 = U(e);
      document.addEventListener("astro:before-swap", n2, { once: true }), window.addEventListener("pagehide", (g3) => {
        g3.persisted || n2();
      }, { once: true });
    });
  });

  // assets/_astro/ChristmasAudiencePolaroids.astro_astro_type_script_index_0_lang.CGjORKF9.js
  r(() => {
    document.querySelectorAll("[data-christmas-polaroids]").forEach((t2) => {
      const r5 = [...t2.querySelectorAll("details")], o3 = new AbortController(), { signal: s3 } = o3;
      r5.forEach((e) => e.addEventListener("toggle", () => {
        e.open && r5.forEach((n2) => {
          n2 !== e && (n2.open = false);
        });
      }, { signal: s3 })), t2.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        const n2 = r5.find((a2) => a2.open);
        n2 && (e.preventDefault(), n2.open = false, n2.querySelector("summary")?.focus({ preventScroll: true }));
      }, { signal: s3 }), document.addEventListener("astro:before-swap", () => o3.abort(), { once: true });
    });
  });

  // assets/_astro/ChristmasHowItWorks.astro_astro_type_script_index_0_lang.B6MC4tSv.js
  init_christmas_pointer_motion_DqozlT8j();
  r(() => {
    document.querySelectorAll("[data-christmas-how]").forEach((e) => {
      if (e.dataset.howEnhanced === "true") return;
      const a2 = [...e.querySelectorAll("[data-how-slide]")], l4 = [...e.querySelectorAll("[data-how-index]")], m3 = e.querySelector("[data-how-navigation]"), n2 = e.querySelector("[data-how-previous]"), s3 = e.querySelector("[data-how-next]"), y4 = e.querySelector("[data-how-slides]");
      if (!a2.length || !m3 || !n2 || !s3 || !y4) return;
      const w3 = a2.map((t2) => t2.querySelector("h3")?.textContent?.trim() || ""), b = new AbortController(), { signal: d5 } = b, A2 = F(e, { stage: e, propertyPrefix: "--paper-motion", scale: 1, overscan: 12 });
      let r5 = 0;
      const o3 = (t2) => {
        r5 = Math.max(0, Math.min(a2.length - 1, t2)), a2.forEach((c3, g3) => {
          const h3 = r5 === g3;
          c3.dataset.active = String(h3), c3.setAttribute("aria-hidden", String(!h3)), c3.inert = !h3, h3 ? l4[g3]?.setAttribute("aria-current", "step") : l4[g3]?.removeAttribute("aria-current");
        }), n2.setAttribute("aria-disabled", String(r5 === 0)), s3.setAttribute("aria-disabled", String(r5 === a2.length - 1));
        const i4 = w3[Math.max(0, r5 - 1)], u2 = w3[Math.min(a2.length - 1, r5 + 1)];
        n2.setAttribute("aria-label", i4), n2.title = i4, s3.setAttribute("aria-label", u2), s3.title = u2;
      };
      l4.forEach((t2, i4) => t2.addEventListener("click", () => o3(i4), { signal: d5 })), n2.addEventListener("click", () => o3(r5 - 1), { signal: d5 }), s3.addEventListener("click", () => o3(r5 + 1), { signal: d5 }), m3.addEventListener("keydown", (t2) => {
        if (t2.altKey || t2.ctrlKey || t2.metaKey || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(t2.key)) return;
        const i4 = getComputedStyle(e).direction === "rtl", u2 = t2.key === "ArrowRight" ? i4 ? -1 : 1 : i4 ? 1 : -1, c3 = t2.key === "Home" ? 0 : t2.key === "End" ? a2.length - 1 : r5 + u2;
        t2.preventDefault(), o3(c3), l4[r5]?.focus({ preventScroll: true });
      }, { signal: d5 }), o3(0), e.dataset.howEnhanced = "true", m3.hidden = false, y4.setAttribute("aria-live", "polite"), y4.setAttribute("aria-atomic", "true"), document.addEventListener("astro:before-swap", () => {
        b.abort(), A2();
      }, { once: true });
    });
  });

  // assets/_astro/config.DBa5QnYF.js
  var r2 = { PH: { code: "PH", name: "Philippines", currency: "PHP", currencySymbol: "\u20B1", locale: "en-PH", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 15, isActive: true }, ID: { code: "ID", name: "Indonesia", currency: "IDR", currencySymbol: "Rp", locale: "id-ID", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2200, isActive: true }, MY: { code: "MY", name: "Malaysia", currency: "MYR", currencySymbol: "RM", locale: "ms-MY", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, SG: { code: "SG", name: "Singapore", currency: "SGD", currencySymbol: "S$", locale: "en-SG", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 0.5, isActive: true }, VN: { code: "VN", name: "Vietnam", currency: "VND", currencySymbol: "\u20AB", locale: "vi-VN", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 4e3, isActive: true }, TH: { code: "TH", name: "Thailand", currency: "THB", currencySymbol: "\u0E3F", locale: "th-TH", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 11, isActive: true }, MM: { code: "MM", name: "Myanmar", currency: "MMK", currencySymbol: "K", locale: "en-MM", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 100, isActive: true }, IN: { code: "IN", name: "India", currency: "INR", currencySymbol: "\u20B9", locale: "en-IN", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 3, isActive: true }, PK: { code: "PK", name: "Pakistan", currency: "PKR", currencySymbol: "Rs", locale: "en-PK", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 5, isActive: true }, BD: { code: "BD", name: "Bangladesh", currency: "BDT", currencySymbol: "\u09F3", locale: "en-BD", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 5, isActive: true }, NP: { code: "NP", name: "Nepal", currency: "NPR", currencySymbol: "Rs", locale: "en-NP", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 5, isActive: true }, BR: { code: "BR", name: "Brazil", currency: "BRL", currencySymbol: "R$", locale: "pt-BR", type: "major", stripeFeePercentage: 0.034, stripeFixedFee: 40, isActive: true }, MX: { code: "MX", name: "Mexico", currency: "MXN", currencySymbol: "MX$", locale: "es-MX", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 3, isActive: true }, AR: { code: "AR", name: "Argentina", currency: "ARS", currencySymbol: "AR$", locale: "es-AR", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 10, isActive: true }, CO: { code: "CO", name: "Colombia", currency: "COP", currencySymbol: "COL$", locale: "es-CO", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 900, isActive: true }, PE: { code: "PE", name: "Peru", currency: "PEN", currencySymbol: "S/", locale: "es-PE", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, CL: { code: "CL", name: "Chile", currency: "CLP", currencySymbol: "CLP$", locale: "es-CL", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 250, isActive: true }, GT: { code: "GT", name: "Guatemala", currency: "GTQ", currencySymbol: "Q", locale: "es-GT", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, BO: { code: "BO", name: "Bolivia", currency: "BOB", currencySymbol: "Bs", locale: "es-BO", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, CR: { code: "CR", name: "Costa Rica", currency: "CRC", currencySymbol: "\u20A1", locale: "es-CR", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 100, isActive: true }, HN: { code: "HN", name: "Honduras", currency: "HNL", currencySymbol: "L", locale: "es-HN", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, EG: { code: "EG", name: "Egypt", currency: "EGP", currencySymbol: "E\xA3", locale: "ar-EG", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 3, isActive: true }, SA: { code: "SA", name: "Saudi Arabia", currency: "SAR", currencySymbol: "SR", locale: "ar-SA", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, AE: { code: "AE", name: "United Arab Emirates", currency: "AED", currencySymbol: "\u062F.\u0625", locale: "ar-AE", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, DZ: { code: "DZ", name: "Algeria", currency: "DZD", currencySymbol: "DA", locale: "ar-DZ", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 5, isActive: true }, MA: { code: "MA", name: "Morocco", currency: "MAD", currencySymbol: "MAD", locale: "ar-MA", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, US: { code: "US", name: "United States", currency: "USD", currencySymbol: "$", locale: "en-US", type: "major", stripeFeePercentage: 0.029, stripeFixedFee: 30, isActive: true }, CA: { code: "CA", name: "Canada", currency: "CAD", currencySymbol: "CA$", locale: "en-CA", type: "minor", stripeFeePercentage: 0.029, stripeFixedFee: 30, isActive: true }, GB: { code: "GB", name: "United Kingdom", currency: "GBP", currencySymbol: "\xA3", locale: "en-GB", type: "major", stripeFeePercentage: 0.032, stripeFixedFee: 25, isActive: true }, EU: { code: "EU", name: "European Union", currency: "EUR", currencySymbol: "\u20AC", locale: "en-EU", type: "major", stripeFeePercentage: 0.032, stripeFixedFee: 25, isActive: true }, TR: { code: "TR", name: "Turkey", currency: "TRY", currencySymbol: "\u20BA", locale: "tr-TR", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, AU: { code: "AU", name: "Australia", currency: "AUD", currencySymbol: "A$", locale: "en-AU", type: "minor", stripeFeePercentage: 0.029, stripeFixedFee: 30, isActive: true }, JP: { code: "JP", name: "Japan", currency: "JPY", currencySymbol: "\xA5", locale: "ja-JP", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 50, isActive: true }, KR: { code: "KR", name: "South Korea", currency: "KRW", currencySymbol: "\u20A9", locale: "ko-KR", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 500, isActive: true }, HK: { code: "HK", name: "Hong Kong", currency: "HKD", currencySymbol: "HK$", locale: "zh-HK", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2.35, isActive: true }, ZA: { code: "ZA", name: "South Africa", currency: "ZAR", currencySymbol: "R", locale: "en-ZA", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 2, isActive: true }, NG: { code: "NG", name: "Nigeria", currency: "NGN", currencySymbol: "\u20A6", locale: "en-NG", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 100, isActive: true }, KE: { code: "KE", name: "Kenya", currency: "KES", currencySymbol: "KSh", locale: "en-KE", type: "minor", stripeFeePercentage: 0.034, stripeFixedFee: 10, isActive: true } };
  function y(e) {
    return !!(e && Object.prototype.hasOwnProperty.call(r2, e));
  }

  // assets/_astro/client-pricing-request.HjSk9Omf.js
  var f = "https://www.2-luv.com/";
  function w(e, n2 = {}) {
    const i4 = c(n2.region) || m(n2.currentUrl), r5 = new URL(e || "/", l(n2.currentUrl));
    for (const [s3, t2] of Object.entries(n2.params || {})) t2 == null || t2 === "" || r5.searchParams.set(s3, String(t2));
    i4 && r5.searchParams.set("region", i4);
    const o3 = g();
    o3 && r5.searchParams.set("tz", o3);
    const u2 = { accept: "application/json" };
    return { url: r5.toString(), headers: u2, explicitRegion: i4 };
  }
  function m(e) {
    try {
      const n2 = new URL(e?.toString() || l());
      return c(n2.searchParams.get("region"));
    } catch {
      return null;
    }
  }
  function c(e) {
    const n2 = d(e)?.toUpperCase();
    return n2 && y(n2) ? n2 : null;
  }
  function l(e) {
    return e ? e.toString() : typeof window < "u" ? window.location.href : f;
  }
  function g() {
    try {
      return typeof Intl < "u" && Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    } catch {
      return null;
    }
  }
  function d(e) {
    const n2 = e?.trim();
    return n2 || null;
  }

  // assets/_astro/ChristmasPricingSection.astro_astro_type_script_index_0_lang.O-efDd0Q.js
  function ce(a2) {
    const t2 = a2.querySelector("[data-christmas-price-value]"), S2 = a2.querySelector("[data-christmas-price-loading]"), p2 = a2.querySelector("[data-christmas-price-error]"), k2 = a2.querySelector("[data-christmas-price-retry]"), I = a2.querySelector("[data-christmas-price-status]");
    if (!t2 || !S2 || !p2 || !k2 || !I) return () => {
    };
    const E = new AbortController(), x = document.querySelector("[data-menu-button]");
    let r5, s3, A2 = 0, v2 = 0, L2 = false, d5 = false, h3 = false;
    function F2(i4) {
      a2.dataset.pricingStatus = i4, I.setAttribute("aria-busy", String(i4 === "loading")), t2.hidden = i4 !== "ready", S2.hidden = i4 !== "loading", p2.hidden = i4 !== "error", k2.hidden = i4 !== "error";
    }
    async function C2(i4 = 0) {
      if (d5 || h3) return;
      h3 = true, F2("loading");
      const u2 = new AbortController();
      s3 = u2, A2 = window.setTimeout(() => u2.abort(), 8e3);
      try {
        const { url: g3, headers: c3 } = w(a2.dataset.pricingEndpoint || "/api/pricing/landing", { locale: a2.dataset.locale }), P = await fetch(g3, { headers: c3, cache: "default", credentials: "omit", signal: u2.signal });
        if (!P.ok) throw new Error("Price unavailable");
        const T = await P.json(), f2 = T.themes?.christmas;
        if (!f2 || typeof f2.formatted != "string" || !f2.formatted.trim() || !Number.isFinite(f2.priceAmount) || f2.priceAmount < 0 || typeof f2.currency != "string" || !f2.currency.trim()) throw new Error("Invalid Christmas price");
        if (d5) return;
        t2.textContent = f2.formatted, i(T.regionCode), F2("ready");
      } catch {
        if (d5) return;
        i4 === 0 && navigator.onLine !== false ? v2 = window.setTimeout(() => {
          v2 = 0, C2(1);
        }, 800) : F2("error");
      } finally {
        window.clearTimeout(A2), A2 = 0, s3 = void 0, h3 = false;
      }
    }
    function l4() {
      L2 || d5 || (L2 = true, r5?.disconnect(), C2());
    }
    return k2.addEventListener("click", () => {
      C2();
    }, { signal: E.signal }), window.addEventListener("online", () => {
      a2.dataset.pricingStatus === "error" && C2();
    }, { signal: E.signal }), x?.addEventListener("click", l4, { once: true, signal: E.signal }), "IntersectionObserver" in window ? (r5 = new IntersectionObserver((i4) => {
      i4.some((u2) => u2.isIntersecting) && l4();
    }, { rootMargin: "700px 0px" }), r5.observe(a2)) : l4(), () => {
      d5 = true, E.abort(), r5?.disconnect(), s3?.abort(), window.clearTimeout(A2), window.clearTimeout(v2);
    };
  }
  function le(a2) {
    if (typeof window > "u") return () => {
    };
    const t2 = a2.querySelector("video[data-santa-video]"), S2 = a2.querySelector("picture img");
    if (!t2 || !S2 || typeof IntersectionObserver > "u") return () => {
    };
    const p2 = a2.querySelector("[data-santa-toggle]"), k2 = window.matchMedia("(prefers-reduced-motion: reduce)"), I = window.matchMedia("(forced-colors: active)"), E = navigator.connection, x = new AbortController(), { signal: r5 } = x;
    let s3 = false, A2 = false, v2 = false, L2 = false, d5 = false, h3 = false, F2 = null, C2, l4 = false, i4 = false, u2 = false, g3 = false, c3 = 0, P = 0, T = false, f2 = false, R2 = 0, K = 0, M, U2, H;
    const O2 = /* @__PURE__ */ new Map(), Q = () => !!E?.saveData || ["slow-2g", "2g", "3g"].includes(E?.effectiveType || ""), X = () => !s3 && !h3 && a2.isConnected && !document.hidden && !k2.matches && !I.matches && !Q() && !L2 && !d5, m3 = () => X() && v2, Y = () => X() && A2, w3 = (e) => {
      if (a2.dataset.santaState = e, p2) {
        p2.hidden = k2.matches || I.matches || Q() || d5 || !F2, p2.dataset.paused = String(L2);
        const n2 = L2 ? p2.dataset.playLabel : p2.dataset.pauseLabel;
        n2 && p2.setAttribute("aria-label", n2);
      }
    }, V = () => {
      clearTimeout(U2), U2 = void 0;
    };
    function z() {
      P && typeof t2.cancelVideoFrameCallback == "function" && t2.cancelVideoFrameCallback(P), P = 0, T = false;
      for (const [e, n2] of O2) cancelAnimationFrame(e), n2();
      O2.clear();
    }
    const Z = () => new Promise((e) => {
      const n2 = requestAnimationFrame(() => {
        O2.delete(n2), e();
      });
      O2.set(n2, e);
    });
    async function G(e) {
      return await Z(), e !== c3 || s3 || h3 || !v2 || document.hidden ? false : (await Z(), e === c3 && !s3 && !h3 && v2 && !document.hidden);
    }
    function N() {
      M !== void 0 && (R2 = Math.max(0, R2 - (performance.now() - K))), clearTimeout(M), M = void 0;
    }
    function B(e) {
      const n2 = ++c3;
      z(), V(), g3 = false, u2 = false, t2.pause(), a2.dataset.santaPictureHidden = "false", w3(e);
      const o3 = () => {
        a2.dataset.santaFrameReady = "false", d5 && t2.getAttribute("src") && (t2.removeAttribute("src"), t2.preload = "none", t2.load());
      };
      a2.dataset.santaFrameReady === "true" && v2 && !document.hidden && !h3 ? G(n2).then((y4) => {
        y4 && o3();
      }) : o3();
    }
    function W(e) {
      s3 || d5 || (d5 = true, i4 = false, N(), a2.dataset.santaError = e, B("error"));
    }
    function _2(e, n2) {
      const o3 = e === "hevc" ? (n2 ? t2.dataset.hevcMobileSrc : void 0) || t2.dataset.hevcSrc : (n2 ? t2.dataset.webmMobileSrc : void 0) || t2.dataset.webmSrc;
      if (!o3) return null;
      try {
        const y4 = new URL(o3, document.baseURI);
        if (!["http:", "https:"].includes(y4.protocol)) return null;
        const D2 = e === "hevc" ? t2.dataset.hevcType || 'video/mp4; codecs="hvc1.1.6.L120.B0"' : t2.dataset.webmType || 'video/webm; codecs="vp09.00.10.08"';
        return t2.canPlayType(D2) ? { url: y4.href, type: D2, format: e } : null;
      } catch {
        return null;
      }
    }
    async function ne(e) {
      if (!navigator.mediaCapabilities?.decodingInfo) return;
      let n2 = false;
      const o3 = { contentType: e.type, width: Number(a2.dataset.santaWidth) || 720, height: Number(a2.dataset.santaHeight) || 960, bitrate: Number(a2.dataset.santaBitrate) || 2e6, framerate: Number(a2.dataset.santaFramerate) || 24, get hasAlphaChannel() {
        return n2 = true, true;
      } };
      try {
        const y4 = await navigator.mediaCapabilities.decodingInfo({ type: "file", video: o3 });
        return n2 ? y4.supported : void 0;
      } catch {
        return;
      }
    }
    async function ie() {
      const e = window.matchMedia("(max-width: 760px)").matches, n2 = [_2("hevc", e), _2("webm", e)].filter((b) => !!b), o3 = await Promise.all(n2.map(async (b) => ({ source: b, supported: await ne(b) }))), y4 = o3.find((b) => b.supported === true);
      if (y4) return s3 || (a2.dataset.santaSelection = "alpha-capability"), y4.source;
      const D2 = typeof t2.webkitSupportsPresentationMode == "function", ae = o3.find((b) => b.supported === void 0 && b.source.format === (D2 ? "hevc" : "webm"));
      return s3 || (a2.dataset.santaSelection = ae ? "verified-engine-mapping" : "static-fallback"), ae?.source || null;
    }
    function re() {
      if (f2) return true;
      try {
        const e = document.createElement("canvas");
        e.width = e.height = 1;
        const n2 = e.getContext("2d", { willReadFrequently: true });
        return n2 ? (n2.drawImage(t2, 0, 0, 1, 1, 0, 0, 1, 1), f2 = n2.getImageData(0, 0, 1, 1).data[3] < 32, e.width = e.height = 0, f2) : false;
      } catch {
        return false;
      }
    }
    function J() {
      if (T || a2.dataset.santaPictureHidden === "true" || !g3 || !m3() || t2.readyState < 2 || !t2.videoWidth) return;
      const e = c3;
      T = true;
      const n2 = () => {
        if (P = 0, T = false, !(e !== c3 || !g3 || !m3())) {
          if (!re()) {
            W("alpha-unverified");
            return;
          }
          V(), a2.dataset.santaFrameReady = "true", w3("playing"), G(e).then((o3) => {
            o3 && g3 && m3() && (a2.dataset.santaPictureHidden = "true");
          });
        }
      };
      typeof t2.requestVideoFrameCallback == "function" ? P = t2.requestVideoFrameCallback(n2) : G(e).then((o3) => {
        o3 ? n2() : T = false;
      });
    }
    function $() {
      if (!(!m3() || M !== void 0)) {
        if (R2 <= 0) {
          j2();
          return;
        }
        w3("resting"), K = performance.now(), M = setTimeout(() => {
          M = void 0, R2 = 0, j2();
        }, R2);
      }
    }
    function j2() {
      if (!l4 || !m3() || u2 || g3) return;
      ++c3, z();
      const e = c3;
      if (!i4) {
        i4 = true;
        try {
          t2.currentTime = 0;
        } catch {
        }
      }
      u2 = true, w3("loading"), V(), U2 = setTimeout(() => {
        e === c3 && m3() && W("frame-timeout");
      }, 12e3), t2.play().then(() => {
        e !== c3 || !m3() || (u2 = false, g3 = true, J());
      }).catch(() => {
        e === c3 && m3() && W("playback-rejected");
      });
    }
    function q() {
      if (!s3) {
        if (m3() || (N(), B(d5 ? "error" : l4 ? "paused" : "static")), !Y() || l4) {
          l4 && m3() && (R2 > 0 ? $() : j2());
          return;
        }
        w3("loading"), C2 || (C2 = Promise.race([ie(), new Promise((e) => {
          H = setTimeout(() => e(null), 1500);
        })]).finally(() => {
          clearTimeout(H), H = void 0;
        })), C2.then((e) => {
          if (!(s3 || l4)) {
            if (F2 = e, !e) {
              w3("static");
              return;
            }
            Y() && (l4 = true, t2.muted = true, t2.playsInline = true, t2.loop = false, t2.crossOrigin = "anonymous", t2.preload = "auto", t2.src = e.url, t2.load(), a2.dataset.santaFormat = e.format, m3() ? j2() : w3("loading"));
          }
        });
      }
    }
    t2.addEventListener("playing", () => {
      i4 && m3() && (g3 = true, u2 = false, J());
    }, { signal: r5 }), t2.addEventListener("loadeddata", J, { signal: r5 }), t2.addEventListener("ended", () => {
      !i4 || s3 || d5 || (i4 = false, R2 = 15e3 + Math.floor(Math.random() * 10001), B("resting"), $());
    }, { signal: r5 }), t2.addEventListener("error", () => {
      l4 && W("media-error");
    }, { signal: r5 }), p2?.addEventListener("click", () => {
      L2 = !L2, q();
    }, { signal: r5 }), k2.addEventListener("change", q, { signal: r5 }), I.addEventListener("change", q, { signal: r5 }), E?.addEventListener("change", q, { signal: r5 }), document.addEventListener("visibilitychange", q, { signal: r5 }), window.addEventListener("pagehide", () => {
      h3 = true, N(), B(l4 ? "paused" : "static");
    }, { signal: r5 }), window.addEventListener("pageshow", (e) => {
      e.persisted && (h3 = false, g3 = false, u2 = false, q());
    }, { signal: r5 });
    const ee = new IntersectionObserver((e) => {
      A2 = e[0]?.isIntersecting ?? false, q();
    }, { rootMargin: "150px" }), te = new IntersectionObserver((e) => {
      v2 = e[0]?.isIntersecting ?? false, q();
    }, { threshold: 0 });
    return ee.observe(a2), te.observe(a2), a2.dataset.santaFrameReady = a2.dataset.santaPictureHidden = "false", w3("static"), () => {
      s3 || (s3 = true, ++c3, N(), V(), clearTimeout(H), z(), x.abort(), ee.disconnect(), te.disconnect(), t2.pause(), a2.dataset.santaPictureHidden = a2.dataset.santaFrameReady = "false", t2.removeAttribute("src"), t2.load(), F2 = null, w3("static"));
    };
  }
  r(() => {
    document.querySelectorAll("[data-christmas-pricing]").forEach((a2) => {
      const t2 = ce(a2);
      document.addEventListener("astro:before-swap", t2, { once: true }), window.addEventListener("pagehide", (S2) => {
        S2.persisted || t2();
      }, { once: true });
    }), document.querySelectorAll("[data-christmas-santa-motion]").forEach((a2) => {
      const t2 = le(a2);
      document.addEventListener("astro:before-swap", t2, { once: true }), window.addEventListener("pagehide", (S2) => {
        S2.persisted || t2();
      }, { once: true });
    });
  });

  // assets/_astro/ChristmasClosingRibbon.astro_astro_type_script_index_0_lang.DpEeLpoL.js
  function ve({ video: e, canvas: t2, fps: w3, canDraw: m3, onFrame: E, onError: O2 }) {
    const X = Number.isFinite(w3) && w3 > 0 ? w3 : 24, F2 = document.createElement("canvas");
    F2.width = 32, F2.height = 18;
    const s3 = document.createElement("canvas");
    let C2 = null, o3 = null, d5 = null, P = 0, $ = 0, A2, V = false, l4 = false, L2 = false, j2 = false, M = false, g3, r5, p2;
    const W = (i4) => !M && A2 !== void 0 && i4 === P;
    function z() {
      g3 !== void 0 && typeof e.cancelVideoFrameCallback == "function" && e.cancelVideoFrameCallback(g3), r5 !== void 0 && cancelAnimationFrame(r5), clearTimeout(p2), g3 = r5 = p2 = void 0;
    }
    function S2() {
      ++P, z(), A2 = void 0, V = l4 = false, $ = 0;
    }
    function u2(i4) {
      S2(), M || O2(i4);
    }
    function v2(i4) {
      return W(i4) ? m3() ? true : (S2(), false) : false;
    }
    function G() {
      return l4 && !e.seeking && e.readyState >= 2 && e.videoWidth > 0 && e.videoHeight > 0 && Number.isFinite(e.currentTime) && Math.floor(e.currentTime * X) === A2;
    }
    function h3(i4) {
      !W(i4) || r5 !== void 0 || (r5 = requestAnimationFrame(() => {
        v2(i4) && (r5 = requestAnimationFrame(() => {
          v2(i4) && (r5 = void 0, T(i4));
        }));
      }));
    }
    function T(i4, B = false) {
      if (!v2(i4)) return;
      if (!G()) {
        B && u2("frame-timeout");
        return;
      }
      try {
        if (j2 || (s3.width = e.videoWidth, s3.height = e.videoHeight, j2 = true), o3 ?? (o3 = s3.getContext("2d", { alpha: true })), C2 ?? (C2 = F2.getContext("2d", { willReadFrequently: true })), !o3 || !C2) {
          u2("frame-render-error");
          return;
        }
        o3.globalCompositeOperation = "source-over", o3.clearRect(0, 0, s3.width, s3.height), o3.drawImage(e, 0, 0, s3.width, s3.height), C2.globalCompositeOperation = "source-over", C2.clearRect(0, 0, F2.width, F2.height), C2.drawImage(s3, 0, 0, F2.width, F2.height);
        const I = C2.getImageData(0, 0, F2.width, F2.height).data;
        if (I[3] >= 32) {
          u2("alpha-unverified");
          return;
        }
        let D2 = false;
        for (let K = 3; K < I.length; K += 4) if (I[K] > 200) {
          D2 = true;
          break;
        }
        if (!D2) {
          ++$ >= 3 || B ? u2("frame-empty") : h3(i4);
          return;
        }
        if (L2 || (t2.width !== s3.width && (t2.width = s3.width), t2.height !== s3.height && (t2.height = s3.height)), d5 ?? (d5 = t2.getContext("2d", { alpha: true })), !d5) {
          u2("frame-render-error");
          return;
        }
        d5.globalCompositeOperation = "source-over", d5.clearRect(0, 0, t2.width, t2.height), d5.drawImage(s3, 0, 0, t2.width, t2.height), L2 = true;
      } catch {
        u2("frame-render-error");
        return;
      }
      const q = A2;
      S2(), E(q);
    }
    function x(i4) {
      if (!(!W(i4) || typeof e.requestVideoFrameCallback != "function")) try {
        g3 = e.requestVideoFrameCallback((B, q) => {
          v2(i4) && (g3 = void 0, Number.isFinite(q.mediaTime) && Math.round(q.mediaTime * X) === A2 ? (V = true, l4 && T(i4)) : x(i4));
        });
      } catch {
        g3 = void 0, l4 && h3(i4);
      }
    }
    function J(i4) {
      if (!M) {
        if (S2(), !Number.isFinite(i4) || i4 < 0) {
          u2("frame-invalid");
          return;
        }
        A2 = Math.floor(i4), x(P);
      }
    }
    function Q() {
      if (A2 === void 0 || !v2(P) || e.seeking || e.readyState < 2 || e.videoWidth <= 0 || e.videoHeight <= 0) return;
      l4 = true;
      const i4 = P;
      p2 === void 0 && (p2 = setTimeout(() => {
        v2(i4) && (p2 = void 0, T(i4, true));
      }, 120)), V ? T(i4) : (typeof e.requestVideoFrameCallback != "function" || g3 === void 0) && h3(i4);
    }
    function Y() {
      M || (M = true, S2(), F2.width = F2.height = 0, s3.width = s3.height = 0, C2 = o3 = d5 = null);
    }
    return { prepare: J, ready: Q, cancel: S2, destroy: Y };
  }
  function ye(e, t2, w3) {
    return w3 <= 0 || t2 <= 0 ? 0 : Math.max(0, Math.min(1, (w3 - e) / ((w3 + t2) / 2)));
  }
  function we(e, t2, w3) {
    const m3 = Math.max(0, Math.min(w3, 0.05));
    if (!m3) return e;
    const E = t2 - e, O2 = Math.abs(E) * (1 - Math.exp(-m3 / 0.075));
    return e + Math.sign(E) * O2;
  }
  function Fe(e) {
    if (typeof window > "u") return () => {
    };
    const t2 = e.querySelector("video[data-closing-ribbon-video]"), w3 = e.querySelector("canvas[data-closing-ribbon-frame]"), m3 = e.querySelector("picture img"), E = e.querySelector("[data-ribbon-poster-avif]"), O2 = e.closest("#christmas-closing");
    if (!t2 || !w3 || !O2 || typeof IntersectionObserver > "u") return () => {
    };
    const X = window.matchMedia("(prefers-reduced-motion: reduce)"), F2 = window.matchMedia("(forced-colors: active)"), s3 = navigator.connection, C2 = new AbortController(), { signal: o3 } = C2, d5 = Math.max(1, Number(e.dataset.ribbonFramerate) || 24), P = Number(e.dataset.ribbonEndFrame), $ = () => {
      const a2 = Math.max(0, Math.round(t2.duration * d5) - 1);
      return Number.isFinite(P) && P >= 1 ? Math.min(a2, Math.floor(P)) : a2;
    }, A2 = (a2, n2) => a2 >= 1 ? n2 : Math.min(Math.max(0, n2 - 1), Math.round(a2 * n2));
    let V = false, l4 = false, L2 = false, j2 = false, M = false, g3 = false, r5 = false, p2 = false, W = false, z = -1, S2 = 0, u2 = 0, v2 = 0, G = 0, h3 = 0, T = 0, x, J, Q = true, Y, i4, B, q, I, D2 = null;
    const K = () => X.matches || F2.matches || !!s3?.saveData || ["slow-2g", "2g", "3g"].includes(s3?.effectiveType || ""), N = () => !L2 && !M && !j2 && !document.hidden && e.isConnected && !K(), H = (a2) => {
      e.dataset.ribbonState = a2;
    }, R2 = () => {
      clearTimeout(B), B = void 0, q = void 0;
    }, U2 = ve({ video: t2, canvas: w3, fps: d5, canDraw: () => N() && l4, onFrame: (a2) => {
      p2 = false, z = a2, e.dataset.ribbonFrame = e.dataset.ribbonPresentedFrame = String(a2), R2(), re(), k2();
    }, onError: (a2) => {
      p2 = false, Z(a2);
    } });
    function ee() {
      ++T, cancelAnimationFrame(G), cancelAnimationFrame(h3), clearTimeout(I), I = void 0, G = h3 = 0, x = void 0, U2.cancel(), p2 = false, J = void 0, Q = true, v2 = Math.floor(t2.currentTime * d5) / d5, e.dataset.ribbonSettling = "false";
    }
    function ae() {
      R2(), g3 = r5 = p2 = W = false, U2.cancel(), t2.pause(), t2.getAttribute("src") && (t2.removeAttribute("src"), t2.preload = "none", t2.load());
    }
    function ie(a2) {
      const n2 = a2 ? "final" : "loose";
      if (e.dataset.ribbonPoster === n2) return;
      e.dataset.ribbonPoster = n2;
      const b = a2 ? E?.dataset.finalSrcset : E?.dataset.looseSrcset, y4 = a2 ? m3?.dataset.finalSrcset : m3?.dataset.looseSrcset, c3 = a2 ? m3?.dataset.finalSrc : m3?.dataset.looseSrc;
      E && b && (E.srcset = b), m3 && y4 && (m3.srcset = y4), m3 && c3 && (m3.src = c3);
    }
    function oe(a2) {
      ee(), R2(), t2.pause(), W = true;
      const n2 = e.dataset.ribbonFrameReady === "true";
      ie(true), H(a2);
      const b = T;
      let y4 = false;
      const c3 = () => {
        y4 || b !== T || (y4 = true, clearTimeout(I), I = void 0, e.dataset.ribbonFrameReady = "false", n2 && l4 && !document.hidden && !j2 ? h3 = requestAnimationFrame(() => {
          h3 = requestAnimationFrame(() => {
            h3 = 0, b === T && ae();
          });
        }) : ae());
      };
      n2 && m3 && !m3.complete && l4 && !document.hidden ? (I = setTimeout(c3, 6e3), m3.decode().then(c3, c3)) : c3();
    }
    function Z(a2) {
      L2 || M || (M = true, e.dataset.ribbonError = a2, oe("error"));
    }
    function ne(a2) {
      R2(), q = a2, B = setTimeout(() => {
        B = void 0, q = void 0;
        const n2 = a2 === "load" ? t2.readyState < 2 : r5 || t2.seeking || p2;
        N() && V && n2 && Z("frame-timeout");
      }, 12e3);
    }
    function de(a2, n2) {
      const b = a2 === "hevc" ? (n2 ? t2.dataset.hevcMobileSrc : void 0) || t2.dataset.hevcSrc : (n2 ? t2.dataset.webmMobileSrc : void 0) || t2.dataset.webmSrc;
      if (!b) return null;
      const y4 = a2 === "hevc" ? 'video/mp4; codecs="hvc1.1.6.L120.B0"' : 'video/webm; codecs="vp09.00.10.08"';
      try {
        const c3 = new URL(b, document.baseURI);
        return ["http:", "https:"].includes(c3.protocol) && t2.canPlayType(y4) ? { url: c3.href, type: y4, format: a2, width: n2 ? 852 : 1918, height: n2 ? 480 : 1080 } : null;
      } catch {
        return null;
      }
    }
    async function me(a2) {
      if (!navigator.mediaCapabilities?.decodingInfo) return;
      let n2 = false;
      try {
        const b = await navigator.mediaCapabilities.decodingInfo({ type: "file", video: { contentType: a2.type, width: a2.width, height: a2.height, bitrate: 3e6, framerate: d5, get hasAlphaChannel() {
          return n2 = true, true;
        } } });
        return n2 ? b.supported : void 0;
      } catch {
        return;
      }
    }
    async function he() {
      const a2 = window.matchMedia("(max-width: 720px)").matches, n2 = [de("hevc", a2), de("webm", a2)].filter((f2) => !!f2), b = await Promise.all(n2.map(async (f2) => ({ candidate: f2, alpha: await me(f2) }))), y4 = b.find((f2) => f2.alpha === true);
      if (y4) return y4.candidate;
      const c3 = typeof t2.webkitSupportsPresentationMode == "function" ? "hevc" : "webm";
      return b.find((f2) => f2.alpha === void 0 && f2.candidate.format === c3)?.candidate || null;
    }
    function re() {
      if (h3 || e.dataset.ribbonFrameReady === "true" || !N() || !l4 || r5 || p2 || t2.seeking || z < 0) return;
      const a2 = T;
      h3 = requestAnimationFrame(() => {
        h3 = requestAnimationFrame(() => {
          h3 = 0, !(a2 !== T || !N() || !l4 || r5 || p2 || t2.seeking) && (Q = false, v2 = u2 = z / d5, x = J = void 0, e.dataset.ribbonPlayhead = u2.toFixed(4), e.dataset.ribbonFrameReady = "true", H("ready"), R2(), k2());
        });
      });
    }
    function te(a2) {
      p2 = true, U2.prepare(a2);
    }
    function ce2(a2) {
      r5 = true, ne("seek"), te(a2);
      const n2 = Math.min(t2.duration - 1e-6, (a2 + 0.5) / d5);
      e.dataset.ribbonSeekTime = n2.toFixed(4);
      try {
        t2.currentTime = n2;
      } catch {
        r5 = false, Z("seek-failed");
      }
    }
    function be(a2) {
      if (G = 0, !N() || !l4) return;
      const n2 = O2.getBoundingClientRect(), b = ye(n2.top, n2.height, window.innerHeight);
      if (e.dataset.ribbonProgress = b.toFixed(4), !g3 || !Number.isFinite(t2.duration) || t2.duration <= 0 || t2.readyState < 2) return;
      const y4 = $(), c3 = A2(b, y4), f2 = Math.min(y4, Math.max(0, Math.floor(t2.currentTime * d5))), fe = c3 / d5;
      if ((J === void 0 || fe !== S2) && (J = a2), S2 = fe, e.dataset.ribbonTime = S2.toFixed(4), e.dataset.ribbonTargetFrame = String(c3), h3 && e.dataset.ribbonFrameReady !== "true" || r5 || p2 || t2.seeking) return;
      if (e.dataset.ribbonFrame = String(z), e.dataset.ribbonFrameReady !== "true") {
        z !== f2 ? (te(f2), U2.ready()) : re();
        return;
      }
      if (Q) {
        if (v2 = u2 = S2, x = void 0, e.dataset.ribbonPlayhead = u2.toFixed(4), f2 !== c3) {
          ++T, cancelAnimationFrame(h3), h3 = 0, e.dataset.ribbonSettling = "true", ce2(c3);
          return;
        }
        if (z !== f2) {
          te(f2), U2.ready();
          return;
        }
        Q = false, e.dataset.ribbonSettling = "false", e.dataset.ribbonFrameReady === "true" && (R2(), H("ready")), re();
        return;
      }
      if (f2 === c3) {
        v2 = u2 = S2, x = void 0, e.dataset.ribbonPlayhead = u2.toFixed(4), e.dataset.ribbonSettling = "false", R2(), H("ready");
        return;
      }
      const ge = x === void 0 ? 1 / 60 : (a2 - x) / 1e3;
      x = a2, v2 = a2 - J >= 220 ? S2 : we(v2, S2, ge);
      const se = Math.min(y4, Math.max(0, Math.round(v2 * d5)));
      if (u2 = se / d5, e.dataset.ribbonPlayhead = u2.toFixed(4), e.dataset.ribbonSettling = "true", f2 !== se) {
        ce2(se);
        return;
      }
      k2();
    }
    function k2() {
      !G && N() && l4 && (G = requestAnimationFrame(be));
    }
    function _2() {
      if (!L2) {
        if (M || K()) {
          oe(M ? "error" : "static");
          return;
        }
        if ((!N() || !l4) && (ee(), R2(), t2.pause(), g3 && H("paused")), !(!N() || !V)) {
          if (W && (ee(), W = false), ie(false), r5 && !t2.seeking && (r5 = false), k2(), g3) {
            l4 && (r5 || t2.readyState < 2) && ne(r5 ? "seek" : "load");
            return;
          }
          Y || (Y = Promise.race([he(), new Promise((a2) => {
            i4 = setTimeout(() => a2(null), 1500);
          })]).finally(() => {
            clearTimeout(i4), i4 = void 0;
          })), Y.then((a2) => {
            if (!(L2 || g3 || !N() || !V)) {
              if (D2 = a2, !D2) {
                Z("alpha-codec-unavailable");
                return;
              }
              g3 = true, r5 = false, v2 = u2 = 0, x = void 0, H("loading"), e.dataset.ribbonFormat = D2.format, t2.muted = true, t2.playsInline = true, t2.loop = false, l4 && te(0), t2.crossOrigin = "anonymous", t2.preload = "auto", t2.src = D2.url, t2.load(), t2.pause(), ne("load"), k2();
            }
          });
        }
      }
    }
    t2.addEventListener("loadedmetadata", k2, { signal: o3 }), t2.addEventListener("loadeddata", () => {
      q === "load" && R2(), U2.ready(), k2();
    }, { signal: o3 }), t2.addEventListener("seeked", () => {
      r5 = false, U2.ready(), k2();
    }, { signal: o3 }), t2.addEventListener("error", () => {
      g3 && Z("media-error");
    }, { signal: o3 }), window.addEventListener("scroll", k2, { passive: true, signal: o3 }), window.addEventListener("resize", k2, { passive: true, signal: o3 }), X.addEventListener("change", _2, { signal: o3 }), F2.addEventListener("change", _2, { signal: o3 }), s3?.addEventListener("change", _2, { signal: o3 }), document.addEventListener("visibilitychange", _2, { signal: o3 }), window.addEventListener("pagehide", () => {
      j2 = true, _2();
    }, { signal: o3 }), window.addEventListener("pageshow", (a2) => {
      a2.persisted && (j2 = false, _2());
    }, { signal: o3 });
    const le2 = new IntersectionObserver((a2) => {
      V = a2[0]?.isIntersecting ?? false, _2();
    }, { rootMargin: "180px" }), ue = new IntersectionObserver((a2) => {
      l4 = a2[0]?.isIntersecting ?? false, _2();
    }, { threshold: 0 });
    return le2.observe(O2), ue.observe(O2), e.dataset.ribbonFrameReady = "false", H("static"), ie(K()), () => {
      L2 || (L2 = true, ee(), R2(), clearTimeout(i4), C2.abort(), le2.disconnect(), ue.disconnect(), ae(), U2.destroy(), e.dataset.ribbonFrameReady = "false", D2 = null, H("static"));
    };
  }
  r(() => {
    document.querySelectorAll("[data-christmas-closing-ribbon]").forEach((e) => {
      const t2 = Fe(e);
      document.addEventListener("astro:before-swap", t2, { once: true }), window.addEventListener("pagehide", (w3) => {
        w3.persisted || t2();
      });
    });
  });

  // assets/_astro/preload-helper.CVfkMyKi.js
  var h = (function() {
    const s3 = typeof document < "u" && document.createElement("link").relList;
    return s3 && s3.supports && s3.supports("modulepreload") ? "modulepreload" : "preload";
  })();
  var v = function(l4) {
    return "/" + l4;
  };
  var d2 = {};
  var y2 = function(s3, i4, E) {
    let a2 = Promise.resolve();
    if (i4 && i4.length > 0) {
      let f2 = function(e) {
        return Promise.all(e.map((o3) => Promise.resolve(o3).then((c3) => ({ status: "fulfilled", value: c3 }), (c3) => ({ status: "rejected", reason: c3 }))));
      };
      document.getElementsByTagName("link");
      const r5 = document.querySelector("meta[property=csp-nonce]"), t2 = r5?.nonce || r5?.getAttribute("nonce");
      a2 = f2(i4.map((e) => {
        if (e = v(e), e in d2) return;
        d2[e] = true;
        const o3 = e.endsWith(".css"), c3 = o3 ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${e}"]${c3}`)) return;
        const n2 = document.createElement("link");
        if (n2.rel = o3 ? "stylesheet" : h, o3 || (n2.as = "script"), n2.crossOrigin = "", n2.href = e, t2 && n2.setAttribute("nonce", t2), document.head.appendChild(n2), o3) return new Promise((m3, p2) => {
          n2.addEventListener("load", m3), n2.addEventListener("error", () => p2(new Error(`Unable to preload CSS for ${e}`)));
        });
      }));
    }
    function u2(r5) {
      const t2 = new Event("vite:preloadError", { cancelable: true });
      if (t2.payload = r5, window.dispatchEvent(t2), !t2.defaultPrevented) throw r5;
    }
    return a2.then((r5) => {
      for (const t2 of r5 || []) t2.status === "rejected" && u2(t2.reason);
      return s3().catch(u2);
    });
  };

  // assets/_astro/ChristmasLandingPage.astro_astro_type_script_index_0_lang.Bt8LzeXJ.js
  var __vite__mapDeps = (i4, m3 = __vite__mapDeps, d5 = m3.f || (m3.f = ["_astro/christmas-landing-moments.RzD3ivFt.js", "_astro/christmas-pointer-motion.DqozlT8j.js"])) => i4.map((i5) => d5[i5]);
  r(() => {
    const w3 = [...document.querySelectorAll("[data-christmas-audience-backdrop], [data-christmas-parallax]")];
    if (w3.length && "IntersectionObserver" in window) {
      const t2 = /* @__PURE__ */ new Set(), e = window.matchMedia("(prefers-reduced-motion: reduce)"), n2 = new AbortController(), { signal: i4 } = n2;
      let a2 = 0;
      const d5 = () => {
        if (a2 = 0, document.hidden || e.matches) return;
        const o3 = window.innerHeight;
        t2.forEach((c3) => {
          const u2 = c3.getBoundingClientRect(), h3 = Math.max(-1, Math.min(1, (o3 - 2 * u2.top - u2.height) / (o3 + u2.height)));
          c3.style.setProperty("--christmas-text-progress", h3.toFixed(4));
        });
      }, r5 = () => {
        !a2 && t2.size && !document.hidden && !e.matches && (a2 = requestAnimationFrame(d5));
      }, s3 = () => {
        cancelAnimationFrame(a2), a2 = 0;
      }, m3 = new IntersectionObserver((o3) => {
        o3.forEach((c3) => c3.isIntersecting ? t2.add(c3.target) : t2.delete(c3.target)), r5();
      }, { threshold: 0 });
      w3.forEach((o3) => m3.observe(o3)), window.addEventListener("scroll", r5, { passive: true, signal: i4 }), window.addEventListener("resize", r5, { passive: true, signal: i4 }), document.addEventListener("visibilitychange", () => document.hidden ? s3() : r5(), { signal: i4 }), e.addEventListener("change", () => {
        s3(), e.matches ? w3.forEach((o3) => o3.style.removeProperty("--christmas-text-progress")) : r5();
      }, { signal: i4 }), window.addEventListener("pagehide", s3, { signal: i4 }), window.addEventListener("pageshow", r5, { signal: i4 }), document.addEventListener("astro:before-swap", () => {
        s3(), m3.disconnect(), n2.abort();
      }, { once: true });
    }
    document.querySelectorAll("#christmas-hero").forEach((t2) => {
      const e = t2.querySelector("[data-christmas-hero-video]"), n2 = t2.querySelector("[data-christmas-video-toggle]");
      if (!e || !n2) return;
      const i4 = window.matchMedia("(prefers-reduced-motion: reduce)"), a2 = window.matchMedia("(max-width: 720px)"), d5 = navigator.connection, r5 = new AbortController(), { signal: s3 } = r5;
      let m3 = t2.getBoundingClientRect().bottom > 0 && t2.getBoundingClientRect().top < window.innerHeight, o3 = false, c3 = false, u2 = false, h3, g3;
      const L2 = () => !i4.matches && !d5?.saveData && !["slow-2g", "2g"].includes(d5?.effectiveType || ""), v2 = () => {
        t2.dataset.videoReady = String(!e.paused && !e.ended), n2.dataset.paused = String(e.paused), n2.setAttribute("aria-label", (e.paused ? n2.dataset.playLabel : n2.dataset.pauseLabel) || "");
      }, l4 = () => {
        if (!L2()) {
          e.pause(), e.hasAttribute("src") && (e.removeAttribute("src"), e.load()), n2.hidden = true;
          return;
        }
        if (n2.hidden = !o3 || u2, v2(), !o3 || !m3 || document.hidden || c3 || u2) {
          e.pause();
          return;
        }
        const b = `/themes/christmas/v1/scene-media/${a2.matches ? "portrait" : "landscape"}/room-idle.mp4`;
        e.getAttribute("src") !== b && (e.src = b, e.muted = true, e.load()), n2.hidden = false, e.play().catch(() => {
          v2();
        });
      }, f2 = new IntersectionObserver((b) => {
        m3 = b[0]?.isIntersecting ?? false, l4();
      }, { threshold: 0.01 });
      f2.observe(t2), n2.addEventListener("click", () => {
        c3 = !e.paused, l4();
      }, { signal: s3 }), e.addEventListener("playing", v2, { signal: s3 }), e.addEventListener("pause", v2, { signal: s3 }), e.addEventListener("error", () => {
        u2 = true, e.pause(), t2.dataset.videoReady = "false", n2.hidden = true;
      }, { signal: s3 }), document.addEventListener("visibilitychange", l4, { signal: s3 }), i4.addEventListener("change", l4, { signal: s3 }), a2.addEventListener("change", l4, { signal: s3 }), d5?.addEventListener("change", l4, { signal: s3 });
      const y4 = () => {
        h3 = setTimeout(() => {
          "requestIdleCallback" in window ? g3 = window.requestIdleCallback(() => {
            o3 = true, l4();
          }, { timeout: 1500 }) : (o3 = true, l4());
        }, a2.matches ? 1800 : 450);
      };
      document.readyState === "complete" ? y4() : window.addEventListener("load", y4, { once: true, signal: s3 }), window.addEventListener("pagehide", () => e.pause(), { signal: s3 }), window.addEventListener("pageshow", l4, { signal: s3 }), document.addEventListener("astro:before-swap", () => {
        r5.abort(), f2.disconnect(), clearTimeout(h3), g3 !== void 0 && window.cancelIdleCallback(g3), e.pause();
      }, { once: true });
    });
    const p2 = [...document.querySelectorAll("[data-christmas-moments]")].map((t2) => {
      const e = new AbortController();
      let n2;
      const i4 = (a2) => {
        const d5 = a2.target instanceof Element ? a2.target.closest("summary") : null;
        a2.type !== "wheel" && a2.type !== "touchmove" && d5 && t2.contains(d5) || (n2 = void 0, t2.removeAttribute("aria-busy"), t2.querySelectorAll("summary[aria-busy]").forEach((r5) => r5.removeAttribute("aria-busy")));
      };
      for (const a2 of ["pointerdown", "keydown", "wheel", "touchmove"]) window.addEventListener(a2, i4, { passive: true, signal: e.signal });
      return t2.dataset.momentsEnhancement = "loading", t2.addEventListener("click", (a2) => {
        const d5 = a2.target instanceof Element ? a2.target.closest("summary") : null, r5 = d5?.closest("[data-christmas-moment]");
        !d5 || !r5 || !t2.contains(r5) || (n2 = r5.open ? void 0 : r5.dataset.christmasMoment, t2.querySelectorAll("summary[aria-busy]").forEach((s3) => s3.removeAttribute("aria-busy")), d5.setAttribute("aria-busy", "true"), t2.setAttribute("aria-busy", "true"));
      }, { signal: e.signal }), { root: t2, pending: e, initialScene: () => n2 };
    }), E = () => p2.forEach(({ pending: t2 }) => t2.abort());
    document.addEventListener("astro:before-swap", E, { once: true }), y2(async () => {
      const { initChristmasMoments: t2 } = await Promise.resolve().then(() => (init_christmas_landing_moments_RzD3ivFt(), christmas_landing_moments_RzD3ivFt_exports));
      return { initChristmasMoments: t2 };
    }, __vite__mapDeps([0, 1])).then(({ initChristmasMoments: t2 }) => {
      p2.forEach(({ root: e, pending: n2, initialScene: i4 }) => {
        n2.signal.aborted || !e.isConnected || (n2.abort(), e.querySelectorAll("summary[aria-busy]").forEach((a2) => a2.removeAttribute("aria-busy")), t2(e, { initialScene: i4() }), e.dataset.momentsEnhancement = "ready");
      });
    }, () => {
      p2.forEach(({ root: t2, pending: e }) => {
        e.abort(), t2.isConnected && (t2.dataset.momentsEnhancement = "unavailable", t2.removeAttribute("aria-busy"), t2.querySelectorAll("summary[aria-busy]").forEach((n2) => n2.removeAttribute("aria-busy")));
      });
    });
  });

  // assets/_astro/consent.ngPTbJBt.js
  var p = "cookie-consent";
  var C = "cookie-consent";
  var m2 = ["cookieConsent", "cookie_consent"];
  function y3(e = {}, n2 = (/* @__PURE__ */ new Date()).toISOString()) {
    const t2 = { necessary: true, preferences: !!e.preferences, analytics: !!e.analytics, marketing: !!e.marketing };
    return { version: 2, updatedAt: n2, categories: t2, google: S(t2) };
  }
  function O(e) {
    return y3({ preferences: true, analytics: true, marketing: true }, e);
  }
  function k(e) {
    return y3({ preferences: false, analytics: false, marketing: false }, e);
  }
  function d3(e) {
    if (e == null) return null;
    if (typeof e == "string") {
      const o3 = l2(e).trim();
      if (!o3) return null;
      const a2 = o3.toLowerCase();
      if (["accepted", "accept", "granted", "true", "all"].includes(a2)) return O();
      if (["rejected", "reject", "declined", "denied", "false", "necessary"].includes(a2)) return k();
      try {
        return d3(JSON.parse(o3));
      } catch {
        return null;
      }
    }
    if (typeof e != "object" || Array.isArray(e)) return null;
    const n2 = e, t2 = R(n2);
    if (!t2) return null;
    const r5 = typeof n2.updatedAt == "string" && n2.updatedAt ? n2.updatedAt : (/* @__PURE__ */ new Date()).toISOString();
    return { version: Number.isFinite(Number(n2.version)) ? Number(n2.version) : 2, updatedAt: r5, categories: t2, google: S(t2) };
  }
  function A(e) {
    const n2 = L(e || ""), t2 = n2.get(p);
    if (t2) return d3(t2);
    for (const r5 of m2) {
      const o3 = n2.get(r5), a2 = d3(o3);
      if (a2) return a2;
    }
    return null;
  }
  function w2() {
    if (!s()) return null;
    try {
      const e = window.localStorage.getItem(C), n2 = d3(e);
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
      const r5 = t2.trim();
      if (!r5) continue;
      const o3 = r5.indexOf("="), a2 = o3 >= 0 ? r5.slice(0, o3) : r5, N = o3 >= 0 ? r5.slice(o3 + 1) : "", u2 = l2(a2);
      !u2 || n2.has(u2) || n2.set(u2, l2(N));
    }
    return n2;
  }
  function R(e) {
    const n2 = g2(e.categories) ? e.categories : e, t2 = g2(e.google) ? e.google : e, r5 = c2(n2.preferences) ?? i2(t2.functionality_storage) ?? i2(t2.personalization_storage) ?? false, o3 = c2(n2.analytics) ?? i2(t2.analytics_storage) ?? false, a2 = c2(n2.marketing) ?? c2(n2.ads) ?? i2(t2.ad_storage) ?? i2(t2.ad_user_data) ?? i2(t2.ad_personalization) ?? false;
    return { necessary: true, preferences: r5, analytics: o3, marketing: a2 };
  }
  function c2(e) {
    if (typeof e == "boolean") return e;
    if (typeof e != "string") return null;
    const n2 = e.trim().toLowerCase();
    return ["true", "1", "yes", "accepted", "granted"].includes(n2) ? true : ["false", "0", "no", "rejected", "declined", "denied"].includes(n2) ? false : null;
  }
  function i2(e) {
    return e === "granted" ? true : e === "denied" ? false : c2(e);
  }
  function g2(e) {
    return !!e && typeof e == "object" && !Array.isArray(e);
  }
  function l2(e) {
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
  var r3 = { halloween: { en: "hotel-halloween", pt: "hotel-halloween", es: "hotel-halloween", fr: "hotel-halloween", de: "hotel-halloween", zh: "hotel-halloween", "zh-tw": "hotel-halloween", ar: "hotel-halloween", ms: "hotel-halloween", ja: "hotel-halloween", ru: "hotel-halloween", ko: "hotel-halloween" }, "love-letter": { pt: "carta-de-amor", en: "love-letter", es: "carta-de-amor", fr: "lettre-damour", de: "liebesbrief", zh: "qingshu", "zh-tw": "qing-shu-tw", ar: "risalat-hub", ms: "surat-cinta", ja: "rabureta", ru: "lyubovnoe-pismo", ko: "sarang-pyeonji" }, birthday: { pt: "aniversario", en: "birthday", es: "cumpleanos", fr: "anniversaire", de: "geburtstag", zh: "shengri", "zh-tw": "sheng-ri-tw", ar: "eid-milad", ms: "hari-jadi", ja: "tanjobi", ru: "den-rozhdeniya", ko: "saengil" }, christmas: { pt: "cartao-de-natal", en: "christmas-card", es: "tarjeta-de-navidad", fr: "carte-de-noel", de: "weihnachtskarte", zh: "shengdan-ka", "zh-tw": "sheng-dan-ka-tw", ar: "bitaqat-eid-milad", ms: "kad-krismas", ja: "kurisumasu-kado", ru: "rozhdestvenskaya-otkrytka", ko: "keuriseumaseu-kadeu" }, valentines: { pt: "dia-dos-namorados", en: "valentines", es: "san-valentin", fr: "saint-valentin", de: "valentinstag", zh: "qingrenjie", "zh-tw": "qing-ren-jie-tw", ar: "eid-al-hob", ms: "hari-valentine", ja: "barentain-dee", ru: "den-svyatogo-valentina", ko: "ballentain-dei" }, "white-day": { pt: "white-day", en: "white-day", es: "white-day", fr: "white-day", de: "white-day", zh: "white-day", "zh-tw": "white-day-tw", ar: "white-day", ms: "white-day", ja: "white-day", ru: "white-day", ko: "hwaiteu-dei" }, "digital-love-gift": { pt: "presente-digital-amor", en: "digital-gift-for-loved-one", es: "regalo-digital-para-tu-amor", fr: "cadeau-digital-pour-etre-aime", de: "digitales-geschenk-fur-geliebte", zh: "shuzi-liwu-ai-ren", "zh-tw": "shu-zi-li-wu-ai-ren-tw", ar: "hadiya-raqmiya-lilhabib", ms: "hadiah-digital-untuk-yang-tersayang", ja: "dejitaru-gifuto-aisuru-hito", ru: "tsifrovoy-podarok-dlya-lyubimogo", ko: "saranghaneun-saram-digital-seonmul" }, anniversary: { pt: "presente-para-namorada", en: "anniversary-gift", es: "regalo-de-aniversario", fr: "cadeau-anniversaire-couple", de: "jahrestag-geschenk", zh: "zhounian-liwu", "zh-tw": "zhou-nian-liwu-tw", ar: "hadiya-dhikra-zawaj", ms: "hadiah-ulang-tahun-percintaan", ja: "kinenbi-okurimono", ru: "podarok-na-godovshchinu", ko: "ginyeomil-seonmul" }, "mothers-day": { pt: "presente-para-mae", en: "gift-for-mom", es: "regalo-para-mama", fr: "cadeau-pour-maman", de: "geschenk-fuer-mama", zh: "song-mama-liwu", "zh-tw": "song-mama-liwu-tw", ar: "hadiya-lilomm", ms: "hadiah-untuk-ibu", ja: "okasan-okurimono", ru: "podarok-dlya-mamy", ko: "eomma-seonmul" }, "fathers-day": { pt: "presente-para-pai", en: "gift-for-dad", es: "regalo-para-papa", fr: "cadeau-pour-papa", de: "geschenk-fuer-papa", zh: "song-baba-liwu", "zh-tw": "song-baba-liwu-tw", ar: "hadiya-lilab", ms: "hadiah-untuk-ayah", ja: "otosan-okurimono", ru: "podarok-dlya-papy", ko: "appa-seonmul" }, friendship: { pt: "presente-para-amiga", en: "gift-for-best-friend", es: "regalo-para-amiga", fr: "cadeau-pour-meilleure-amie", de: "geschenk-fuer-freundin", zh: "song-pengyou-liwu", "zh-tw": "song-pengyou-liwu-tw", ar: "hadiya-lissadiqa", ms: "hadiah-untuk-sahabat", ja: "tomodachi-okurimono", ru: "podarok-dlya-podrugi", ko: "chingu-seonmul" }, graduation: { pt: "presente-de-formatura", en: "graduation-gift", es: "regalo-de-graduacion", fr: "cadeau-diplome", de: "abschluss-geschenk", zh: "biye-liwu", "zh-tw": "bi-ye-liwu-tw", ar: "hadiya-takharruj", ms: "hadiah-graduasi", ja: "sotsugyou-okurimono", ru: "podarok-na-vypusknoj", ko: "joreop-seonmul" }, wedding: { pt: "presente-de-casamento", en: "wedding-gift", es: "regalo-de-boda", fr: "cadeau-de-mariage", de: "hochzeitsgeschenk", zh: "hunli-liwu", "zh-tw": "hun-li-liwu-tw", ar: "hadiya-azzifaf", ms: "hadiah-perkahwinan", ja: "kekkon-okurimono", ru: "svadebnyy-podarok", ko: "gyeolhon-seonmul" }, "new-year": { pt: "mensagem-de-ano-novo", en: "new-year-message", es: "mensaje-de-ano-nuevo", fr: "message-de-nouvel-an", de: "neujahrsbotschaft", zh: "xinnian-zhufu", "zh-tw": "xin-nian-zhufu-tw", ar: "risalat-ras-alsana", ms: "pesan-tahun-baru", ja: "shinnen-messeeji", ru: "novogodnee-soobshchenie", ko: "saehae-mesiji" } };
  var n = {};
  var t = (a2, e) => {
    a2 && (n[a2] && n[a2] !== e || (n[a2] = e));
  };
  Object.entries(r3).forEach(([a2, e]) => {
    Object.values(e).forEach((i4) => {
      t(i4, a2);
    });
  });
  var h2 = { "love-letter": ["nota-de-amor", "qing-shu"], valentines: ["valentines", "dia-dos-namorados", "san-valentin", "saint-valentin", "valentinstag", "qingrenjie", "qing-ren-jie-tw", "eid-al-hob", "hari-valentine", "barentain-dee", "den-svyatogo-valentina", "den-sviatogo-valentina", "ballentain-dei", "qing-ren-jie"], "white-day": ["white-day", "whiteday", "white_day"], birthday: ["hadiah-ulang-tahun", "sheng-ri", "tanjoubi"], christmas: ["sheng-dan-he-ka", "sheng-dan-ka"], "digital-love-gift": ["presente-digital-amor", "presente-digital-para-amado", "presente-digital-para-amada", "presente-digital-para-alguem-amado", "presente-digital-para-quem-voce-ama", "presente-digital-para-pessoa-amada", "digitales-geschenk-fuer-einen-geliebten-menschen", "digitales-geschenk-fuer-geliebte-menschen", "digitales-geschenk-fuer-liebste", "digital-gift-for-loved-one", "digital-love-gift", "gift-for-loved-one", "regalo-digital-para-alguien-que-quieres", "regalo-digital-para-un-ser-querido", "cadeau-numerique-pour-un-etre-cher", "cadeau-numerique-pour-un-proche", "shu-zi-ai-yi-li-wu", "shu-zi-li-wu-gei-ai-ren", "shu-zi-li-wu-gei-suo-ai-zhi-ren", "shu-zi-li-wu-song-gei-ai-ren", "shuzi-liwu-gei-ai-de-ren", "shuzi-liwu-song-gei-ai-de-ren", "shu-wei-li-wu-gei-suo-ai-de-ren", "shu-wei-li-wu-gei-suo-ai-zhi-ren", "hadiya-raqmiya-liman-toheb", "hadiya-raqmiya-liman-tuhib", "hadiah-digital-untuk-orang-tersayang", "koibito-e-no-dejitaru-gifuto", "podarok-dlya-lyubimogo-cheloveka-v-cifrovom-formate", "podarok-lyubimomu-cheloveku-v-cifrovom-formate"], anniversary: ["aniversario-de-casamento", "anniversary", "aniversario", "presente-de-aniversario", "anniversaire-amoureux", "cadeau-anniversaire", "jahrestag", "jahrestagsgeschenk", "jubil\xE4um-geschenk", "jubilaeum-geschenk", "zhounian", "zhou-nian-tw", "ji-nian-ri-li-wu", "zhou-nian-ji-nian-li-wu", "dhikra-zawaj", "dhikra-sanawiya-gift", "hadiyat-dhikra-sanawiya", "ulang-tahun-percintaan", "kinenbi", "godovshchina", "ginyeomil"], "mothers-day": ["mothers-day", "dia-das-maes", "diadasmaes", "dia-de-la-madre", "fete-des-meres", "muttertag", "muqinjie", "mu-qin-jie-tw", "eid-al-omm", "hari-ibu", "hahanohiokuri", "den-materi", "eomeoninal", "song-gei-ma-ma-de-li-wu"], "fathers-day": ["fathers-day", "dia-dos-pais", "dia-del-padre", "fete-des-peres", "vatertag", "fuqinjie", "fu-qin-jie-tw", "eid-al-ab", "hadiya-lil-ab", "hari-bapa", "chichinohi", "den-otsa", "abeojinal", "podarok-pape", "presente-para-o-pai", "song-gei-ba-ba-de-li-wu", "songgeibabadelIwu"], friendship: ["friendship-day", "dia-da-amizade", "dia-de-la-amistad", "journee-amitie", "freundschaftstag", "geschenk-fuer-den-besten-freund", "youyiri", "you-yi-ri-tw", "eid-as-sadaqa", "hari-persahabatan", "yuujounohi", "den-druzhby", "ujeongeuninal", "hadiah-untuk-sahabat-karib", "presente-para-melhor-amiga", "regalo-para-mejor-amigo", "song-gei-zui-hao-de-peng-you-de-li-wu"], graduation: ["graduation", "formatura", "graduacion", "remise-des-diplomes", "abschlussfeier", "biyejidian", "bi-ye-ji-dian-tw", "haflet-takharruj", "majlis-graduasi", "sotsugyou", "vypusknoj", "joreop"], wedding: ["wedding", "casamento", "boda", "hadiyat-zafaf", "mariage", "hochzeit", "hunli", "hun-li-tw", "zifaf", "perkahwinan", "kekkon", "svadba", "svadebnyj-podarok", "gyeolhon", "hun-li-li-wu"], "new-year": ["new-year", "ano-novo", "ano-nuevo", "nouvel-an", "neujahr", "neujahrsnachricht", "xinnian", "xin-nian-tw", "eid-ras-alsana", "ras-al-sana-message", "tahun-baru", "mesej-tahun-baru", "shinnen", "shinnen-no-aisatsu", "novyy-god", "saehae", "saehae-message", "xin-nian-zhu-fu", "new_year", "newyear"] };
  Object.entries(h2).forEach(([a2, e]) => {
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
  var o2 = new Set(Object.keys(r3.halloween));

  // assets/_astro/BaseLayout.astro_astro_type_script_index_0_lang.DJpd15VC.js
  function _(t2, o3) {
    return !t2 || !!(o3?.categories.analytics || o3?.categories.marketing);
  }
  var d4 = "../_lazy/privacy-controls-DtZB9K6_.js";
  function i3(t2) {
    const o3 = window;
    return o3.__TWOLUV_PRIVACY_BOOT__ ? (o3.__TWOLUV_PRIVACY_BOOT__(), t2 && window.dispatchEvent(new CustomEvent("2luv:open-cookie-preferences", { detail: t2 })), o3.__TWOLUV_PRIVACY_BUNDLE__) : (o3.__TWOLUV_PRIVACY_BUNDLE__ || (o3.__TWOLUV_PRIVACY_BUNDLE__ = import(d4).then((e) => {
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
  function r4() {
    if (!_(!!document.querySelector("[data-privacy-cookie-ssr]"), w2())) return;
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
      const c3 = o3.getAttribute("data-consent-action");
      Promise.resolve(i3()).then(() => {
        e?.removeAttribute("data-consent-action-pending"), o3.removeAttribute("aria-busy"), window.__TWOLUV_PRIVACY_BOOT__ && window.dispatchEvent(new CustomEvent("2luv:cookie-banner-action", { detail: { action: c3 } }));
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
  r4();
  document.addEventListener("astro:page-load", r4);
})();
