import{_ as Va}from"../interactive-cards-showcase-gTTDtsxv.js";import{p as Za,n as Ka,o as Le,F as p,q as Ja,z as i,A as e,T as Wt,t as w,C as Ue,u as Qa,v as es,g as ts,j as as,Q as ge,m as R,y as ss,G as m,w as Ye,L as U,R as He,M as d,x as K,N as ye,V as C,O as qe,K as H,X as We,P as Fe,W as Xe,av as ba,S as va,D as G,a1 as ns}from"./x-yhwoFgYm.js";import{m as ma,g as rs,c as is,r as os,I as st}from"./InteractiveCardPreviewHost-CnaQEpXU.js";import{o as ls}from"./effect-visibility-_Zql5Rw5.js";import"./page-scroll-lock-Djd195Vl.js";const za=15e3;function $e(T){return T.reason instanceof Error?T.reason:new Error("Presentation images cancelled")}function cs(T,g){return new Promise((x,I)=>{if(g.aborted){I($e(g));return}const u=()=>{A(),I($e(g))},A=()=>g.removeEventListener("abort",u);g.addEventListener("abort",u,{once:!0}),Promise.resolve(T).then(ie=>{A(),g.aborted?I($e(g)):x(ie)},ie=>{A(),I(ie)})})}function fa(T,g,x){if(ma(g)||ma(x))return null;const I=T?.getDecodedImage?.(g,{src:g});return I?.source&&Number.isFinite(I.width)&&I.width>0&&Number.isFinite(I.height)&&I.height>0?I:null}async function ds(T,g,x,I){if(x.aborted)throw $e(x);const u=()=>g?.resolveSrc?.(T,{src:T})??T;let A=u();if(!A)return null;const ie=fa(g,T,A);if(ie)return ie;if(g&&!g.hasLoaded?.(T,{src:T})){const P=await cs(Promise.resolve(g.preload?.(T,{src:T})).catch(()=>{}),x);if(A=u(),!A)return null;const ve=fa(g,T,A);if(ve)return ve;!g.resolveSrc&&typeof P=="string"&&P&&(A=P)}if(x.aborted)throw $e(x);const D=u();return new Promise((P,ve)=>{const E=I();let oe=!1;const ke=()=>{E.onload=null,E.onerror=null,x.removeEventListener("abort",Ce)},Ce=()=>{oe||(oe=!0,ke(),E.removeAttribute("src"),ve($e(x)))},Ae=()=>{if(!(oe||x.aborted)){if(oe=!0,ke(),!D||u()!==D||!E.naturalWidth||!E.naturalHeight){P(null);return}try{g?.rememberElement?.(E,{src:A})}catch{}P({source:E,width:E.naturalWidth,height:E.naturalHeight})}};E.decoding="async";const Ee=g?.crossOrigin?.(A);Ee&&(E.crossOrigin=Ee),E.onload=Ae,E.onerror=()=>{oe||(oe=!0,ke(),P(null))},x.addEventListener("abort",Ce,{once:!0}),E.src=A,E.complete&&E.naturalWidth&&E.naturalHeight&&Ae()})}async function hs(T,g,x,I=()=>new Image){const u=new AbortController,A=()=>u.abort(x.reason);x.aborted?A():x.addEventListener("abort",A,{once:!0});const ie=setTimeout(()=>u.abort(new Error("Presentation images timed out")),za);try{const D=await Promise.all(T.map(P=>ds(P,g,u.signal,I)));if(u.signal.aborted)throw $e(u.signal);return D.filter(P=>P!==null)}finally{clearTimeout(ie),x.removeEventListener("abort",A),u.abort()}}var ps=G('<span aria-hidden="true"> </span>'),bs=G('<div><p class="svelte-1bz3jhs"> </p></div>'),vs=G('<p class="bday-paper-title svelte-1bz3jhs"> </p>'),ms=G('<p class="bday-paper-msg svelte-1bz3jhs"> </p>'),fs=G("<article><!></article>"),ua=G('<i aria-hidden="true" class="svelte-1bz3jhs"></i>'),ga=ns('<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svelte-1bz3jhs"><polyline points="9 18 15 12 9 6" class="svelte-1bz3jhs"></polyline></svg>'),us=G('<div class="birthday-papers svelte-1bz3jhs"><div class="birthday-paper-stage svelte-1bz3jhs"></div> <div class="birthday-cta-layer svelte-1bz3jhs"><p class="svelte-1bz3jhs"> </p> <h3 class="svelte-1bz3jhs"> </h3> <button type="button" class="svelte-1bz3jhs"><span class="svelte-1bz3jhs"> </span> <!></button> <div class="presentation-branding svelte-1bz3jhs"><span class="svelte-1bz3jhs"> </span> <img src="/icons/logo-optimized/logo-medium.webp" alt="2luv" class="svelte-1bz3jhs"/></div></div></div>'),gs=G('<section><canvas class="birthday-canvas svelte-1bz3jhs" aria-hidden="true"></canvas> <div class="birthday-grid svelte-1bz3jhs" aria-hidden="true"></div> <div class="birthday-entrance svelte-1bz3jhs"><div class="birthday-stage svelte-1bz3jhs"><!> <div><!></div> <div class="birthday-banner svelte-1bz3jhs"><span> </span> <span> </span></div> <div> </div> <!></div></div> <!></section>'),ys=G('<div class="classic-grid-bg svelte-1bz3jhs" aria-hidden="true"></div>'),ya=G('<span class="svelte-1bz3jhs"> </span>'),zs=G('<div class="image-surface svelte-1bz3jhs"><!></div>'),xs=G('<div class="svelte-1bz3jhs"><!></div>'),ws=G('<div class="photo-grid-layer svelte-1bz3jhs"></div>'),js=G('<div class="grid-stage svelte-1bz3jhs"><div class="photo-grid svelte-1bz3jhs"><!> <div class="photo-grid-layer photo-grid-center svelte-1bz3jhs"><div style="grid-column:3;grid-row:2;" class="svelte-1bz3jhs"><!></div></div></div></div>'),_s=G('<small class="svelte-1bz3jhs"> </small>'),Us=G('<section><!> <div class="classic-loader svelte-1bz3jhs"><div class="name-row svelte-1bz3jhs"><div class="name-half start svelte-1bz3jhs"></div> <div class="image-slot svelte-1bz3jhs"><div class="image-box svelte-1bz3jhs"><div class="image-inner svelte-1bz3jhs"></div></div></div> <div class="name-half end svelte-1bz3jhs"></div></div></div> <!> <div class="bands-stage svelte-1bz3jhs"><!> <div class="bands-mount svelte-1bz3jhs"></div> <div class="bands-vignette svelte-1bz3jhs" aria-hidden="true"></div> <div><p class="svelte-1bz3jhs"> </p> <h3 class="svelte-1bz3jhs"> </h3> <!> <button type="button" class="pres-cta-button svelte-1bz3jhs"><span class="svelte-1bz3jhs"> </span> <!></button> <div class="presentation-branding svelte-1bz3jhs"><span class="svelte-1bz3jhs"> </span> <img src="/icons/logo-optimized/logo-medium.webp" alt="2luv" class="svelte-1bz3jhs"/></div></div></div></section>');const Fs={hash:"svelte-1bz3jhs",code:`
  @font-face {font-family:"Abril Fatface";font-style:normal;font-weight:400;font-display:swap;src:url("/fonts/abril-fatface-latin-ext.woff2") format("woff2");unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  @font-face {font-family:"Abril Fatface";font-style:normal;font-weight:400;font-display:swap;src:url("/fonts/abril-fatface-latin.woff2") format("woff2");unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {font-family:"Shadows Into Light";font-style:normal;font-weight:400;font-display:swap;src:url("/fonts/shadows-into-light-latin-ext.woff2") format("woff2");unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  @font-face {font-family:"Shadows Into Light";font-style:normal;font-weight:400;font-display:swap;src:url("/fonts/shadows-into-light-latin.woff2") format("woff2");unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {font-family:"Zeyada";font-style:normal;font-weight:400;font-display:swap;src:url("/fonts/zeyada-latin-ext.woff2") format("woff2");unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }

  @font-face {font-family:"Zeyada";font-style:normal;font-weight:400;font-display:swap;src:url("/fonts/zeyada-latin.woff2") format("woff2");unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }.presentation-card.svelte-1bz3jhs {position:relative;width:100%;height:100%;min-height:inherit;overflow:hidden;color:inherit;isolation:isolate;contain:layout paint;}.presentation-card.compact-view.svelte-1bz3jhs .classic-loader:where(.svelte-1bz3jhs) {min-height:100%;}.presentation-card.compact-view.svelte-1bz3jhs .name-row:where(.svelte-1bz3jhs) {font-size:clamp(2.6rem, 16cqw, 5.2rem);}.presentation-card.compact-view.svelte-1bz3jhs .image-box:where(.svelte-1bz3jhs) {width:112cqw;height:104cqh;}.presentation-card.compact-view.svelte-1bz3jhs .photo-grid-layer:where(.svelte-1bz3jhs) {gap:clamp(8px, 2.3cqw, 16px);}.presentation-card.compact-view.svelte-1bz3jhs .photo-grid-layer:where(.svelte-1bz3jhs) > div:where(.svelte-1bz3jhs),
  .presentation-card.compact-view.svelte-1bz3jhs .photo-grid-layer:where(.svelte-1bz3jhs) .interactive-card-image {border-radius:clamp(6px, 1.3cqw, 12px);}.presentation-card.compact-view.svelte-1bz3jhs :is(.bands-cta:where(.svelte-1bz3jhs) h3:where(.svelte-1bz3jhs), .birthday-cta-layer:where(.svelte-1bz3jhs) h3:where(.svelte-1bz3jhs)) {font-size:clamp(28px, 10cqw, 42px);}.presentation-card.compact-view.svelte-1bz3jhs .birthday-stage:where(.svelte-1bz3jhs) {max-width:100%;min-height:100%;padding:clamp(20px, 4.5cqh, 32px) clamp(16px, 5.5cqw, 24px);}.presentation-card.compact-view.svelte-1bz3jhs .birthday-photo:where(.svelte-1bz3jhs) {width:clamp(140px, 56cqw, 240px);height:clamp(126px, 50cqw, 216px);padding:clamp(8px, 2.4cqw, 10px) clamp(8px, 2.4cqw, 10px) clamp(24px, 9cqw, 44px);}.presentation-card.compact-view.svelte-1bz3jhs .birthday-banner:where(.svelte-1bz3jhs) {gap:clamp(6px, 1.8cqh, 8px);font-size:clamp(28px, 10cqw, 42px);}.presentation-card.compact-view.svelte-1bz3jhs .birthday-banner:where(.svelte-1bz3jhs) span:where(.svelte-1bz3jhs) {padding:clamp(10px, 2.8cqh, 12px) clamp(14px, 5.5cqw, 20px);}.presentation-card.compact-view.svelte-1bz3jhs .birthday-banner:where(.svelte-1bz3jhs) span:where(.svelte-1bz3jhs):nth-child(2) {margin-inline-start:clamp(14px, 6cqw, 24px);}.presentation-card.compact-view.svelte-1bz3jhs .birthday-name:where(.svelte-1bz3jhs) {margin-top:clamp(12px, 3.8cqh, 16px);font-size:clamp(18px, 6.5cqw, 28px);}.presentation-card.compact-view.svelte-1bz3jhs .birthday-note:where(.svelte-1bz3jhs) {max-width:86%;margin-top:clamp(16px, 4.5cqh, 22px);padding:clamp(18px, 4.8cqh, 26px) clamp(14px, 5cqw, 20px);font-size:clamp(15px, 4.6cqw, 18px);line-height:clamp(24px, 7.4cqw, 30px);}.presentation-card.compact-view.svelte-1bz3jhs .birthday-paper-stage:where(.svelte-1bz3jhs) {width:92%;max-width:440px;min-height:100%;}.presentation-card.compact-view.svelte-1bz3jhs .bday-paper:where(.svelte-1bz3jhs) {max-width:clamp(150px, 40cqw, 230px);padding:clamp(14px, 3.8cqw, 18px);}.presentation-card.compact-view.svelte-1bz3jhs .bday-paper--title:where(.svelte-1bz3jhs),
  .presentation-card.compact-view.svelte-1bz3jhs .bday-paper--message:where(.svelte-1bz3jhs) {min-width:min(58cqw, 230px);max-width:min(72cqw, 290px);padding:clamp(12px, 3.6cqh, 16px) clamp(16px, 6cqw, 24px);}.presentation-card.compact-view.svelte-1bz3jhs .bday-paper-title:where(.svelte-1bz3jhs) {font-size:clamp(28px, 9cqw, 36px);}.presentation-card.compact-view.svelte-1bz3jhs .bday-paper-msg:where(.svelte-1bz3jhs) {font-size:clamp(18px, 5.8cqw, 24px);}.presentation-card.compact-view.svelte-1bz3jhs .bday-paper:where(.svelte-1bz3jhs) .interactive-card-image {max-height:clamp(110px, 26cqh, 190px);}.classic.svelte-1bz3jhs {--pres-bg: #f4f4f4;--pres-bg-revealed: #f4f0ea;--pres-border: rgba(0, 0, 0, 0.06);--pres-grid: rgba(0, 0, 0, 0.04);--pres-text: #201d1d;--pres-overlay-strong: rgba(244, 240, 234, 0.72);--pres-overlay-soft: rgba(244, 240, 234, 0.28);--pres-cta-text: #201d1d;--pres-cta-bg: rgba(0, 0, 0, 0.06);--pres-cta-bg-hover: rgba(0, 0, 0, 0.1);--pres-cta-border: rgba(0, 0, 0, 0.12);--pres-text-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);background:var(--pres-bg);box-shadow:inset 0 0 0 1px var(--pres-border);color:var(--pres-text);transition:background 1s ease;}.dark .classic.svelte-1bz3jhs {--pres-bg: #0a0e1a;--pres-bg-revealed: #000;--pres-border: rgba(255, 255, 255, 0.05);--pres-grid: rgba(255, 255, 255, 0.06);--pres-text: #f4f4f4;--pres-overlay-strong: rgba(0, 0, 0, 0.55);--pres-overlay-soft: rgba(0, 0, 0, 0.25);--pres-cta-text: #fff;--pres-cta-bg: rgba(255, 255, 255, 0.1);--pres-cta-bg-hover: rgba(255, 255, 255, 0.15);--pres-cta-border: rgba(255, 255, 255, 0.2);--pres-text-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);}.classic.phase-bands.svelte-1bz3jhs {background:var(--pres-bg-revealed);}.classic-grid-bg.svelte-1bz3jhs {position:absolute;inset:0;background-image:linear-gradient(var(--pres-grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--pres-grid) 1px, transparent 1px);background-size:28px 28px;opacity:0.25;pointer-events:none;transition:opacity 700ms ease;}.phase-letters-in.svelte-1bz3jhs .classic-grid-bg:where(.svelte-1bz3jhs),
  .phase-image-grow.svelte-1bz3jhs .classic-grid-bg:where(.svelte-1bz3jhs),
  .phase-image-expand.svelte-1bz3jhs .classic-grid-bg:where(.svelte-1bz3jhs),
  .phase-grid.svelte-1bz3jhs .classic-grid-bg:where(.svelte-1bz3jhs) {opacity:0.1;}.classic-loader.svelte-1bz3jhs {position:absolute;inset:0;z-index:18;display:flex;min-height:480px;align-items:center;justify-content:center;overflow:hidden;opacity:1;pointer-events:auto;transition:opacity 800ms ease;}.phase-grid.svelte-1bz3jhs .classic-loader:where(.svelte-1bz3jhs) {opacity:0;transition:opacity 300ms ease 1.6s;}.phase-bands.svelte-1bz3jhs .classic-loader:where(.svelte-1bz3jhs) {opacity:0;pointer-events:none;}.name-row.svelte-1bz3jhs {--name-direction: 1;--name-shift: calc((var(--image-window-width) - 1.2em) / 2);position:absolute;inset:0;display:flex;width:100%;height:100%;align-items:center;justify-content:center;overflow:hidden;contain:layout paint;color:var(--pres-text);font-family:Georgia, "Times New Roman", serif;font-size:clamp(3.5rem, 10vw, 7rem);font-weight:500;line-height:0.82;white-space:nowrap;}.name-half.svelte-1bz3jhs {display:flex;min-width:0;overflow:hidden;transition:transform var(--image-duration) var(--image-easing);will-change:transform;}.classic[dir='rtl'].svelte-1bz3jhs .name-row:where(.svelte-1bz3jhs) {--name-direction: -1;}.name-half.start.svelte-1bz3jhs {justify-content:flex-end;transform:translateX(calc(-1 * var(--name-direction) * var(--name-shift)));}.name-half.end.svelte-1bz3jhs {justify-content:flex-start;transform:translateX(calc(var(--name-direction) * var(--name-shift)));}.name-half.svelte-1bz3jhs span:where(.svelte-1bz3jhs) {display:block;white-space:pre;transform:translateY(120%);transition:transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) var(--d);will-change:transform;}.phase-letters-in.svelte-1bz3jhs .name-half:where(.svelte-1bz3jhs) span:where(.svelte-1bz3jhs),
  .phase-image-grow.svelte-1bz3jhs .name-half:where(.svelte-1bz3jhs) span:where(.svelte-1bz3jhs),
  .phase-image-expand.svelte-1bz3jhs .name-half:where(.svelte-1bz3jhs) span:where(.svelte-1bz3jhs),
  .phase-grid.svelte-1bz3jhs .name-half:where(.svelte-1bz3jhs) span:where(.svelte-1bz3jhs),
  .phase-bands.svelte-1bz3jhs .name-half:where(.svelte-1bz3jhs) span:where(.svelte-1bz3jhs) {transform:translateY(0);}.image-slot.svelte-1bz3jhs {position:relative;flex:0 0 auto;width:1.2em;height:0.92em;}.image-box.svelte-1bz3jhs {position:absolute;top:50%;left:50%;width:110vw;height:100vh;transform:translate(calc(-50% + var(--image-center-offset)), -50%);overflow:hidden;clip-path:inset(calc((100% - var(--image-window-height)) / 2) calc((100% - var(--image-window-width)) / 2));transition:clip-path var(--image-duration) var(--image-easing), transform var(--image-duration) var(--image-easing);will-change:clip-path, transform;pointer-events:none;}.image-inner.svelte-1bz3jhs {position:absolute;top:50%;left:50%;width:1.2em;height:0.92em;transform:translate(-50%, -50%);}.image-surface.svelte-1bz3jhs {position:absolute;inset:0;}.image-inner.svelte-1bz3jhs .interactive-card-image {position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;pointer-events:none;transform:scale(1);transition:opacity 300ms ease, transform var(--image-duration) var(--image-easing);will-change:transform;user-select:none;}.phase-image-expand.svelte-1bz3jhs .image-inner:where(.svelte-1bz3jhs) .interactive-card-image,
  .phase-grid.svelte-1bz3jhs .image-inner:where(.svelte-1bz3jhs) .interactive-card-image {transition:opacity 800ms ease, transform var(--image-duration) var(--image-easing);}.image-inner.svelte-1bz3jhs .interactive-card-image.active {opacity:1;}.grid-stage.svelte-1bz3jhs,
  .bands-stage.svelte-1bz3jhs {position:absolute;inset:0;overflow:hidden;opacity:0;pointer-events:none;transition:opacity 800ms ease;}.grid-stage.svelte-1bz3jhs {z-index:17;display:flex;align-items:center;justify-content:center;background:var(--pres-bg-revealed);}.phase-grid.svelte-1bz3jhs .grid-stage:where(.svelte-1bz3jhs) {opacity:1;pointer-events:auto;}.photo-grid.svelte-1bz3jhs {position:relative;width:92%;max-width:1000px;aspect-ratio:5 / 3.5;}.photo-grid-layer.svelte-1bz3jhs {position:absolute;inset:0;display:grid;grid-template-columns:repeat(5, 1fr);grid-template-rows:repeat(3, 1fr);gap:clamp(8px, 2.5vw, 20px);
    animation:
      svelte-1bz3jhs-pres-layer-scale var(--layer-duration) var(--layer-easing) var(--layer-delay) both,
      svelte-1bz3jhs-pres-layer-fade var(--layer-duration) cubic-bezier(0.61, 1, 0.88, 1) var(--layer-delay) both;}.photo-grid-center.svelte-1bz3jhs {z-index:2;pointer-events:none;}.photo-grid-layer.svelte-1bz3jhs > div:where(.svelte-1bz3jhs) {overflow:hidden;border-radius:clamp(6px, 1.5vw, 16px);}.photo-grid-layer.svelte-1bz3jhs .interactive-card-image {display:block;width:100%;aspect-ratio:4 / 5;border-radius:clamp(6px, 1.5vw, 16px);object-fit:cover;}.bands-stage.svelte-1bz3jhs {z-index:15;background:var(--pres-bg-revealed);}.phase-bands.svelte-1bz3jhs .bands-stage:where(.svelte-1bz3jhs) {opacity:1;pointer-events:auto;}.bands-mount.svelte-1bz3jhs,
  .bands-vignette.svelte-1bz3jhs {position:absolute;inset:0;}.bands-vignette.svelte-1bz3jhs {z-index:2;background:radial-gradient(ellipse at center, transparent 15%, var(--pres-overlay-strong) 100%);pointer-events:none;}.bands-cta.svelte-1bz3jhs,
  .birthday-cta-layer.svelte-1bz3jhs {position:absolute;inset:0;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;background:radial-gradient(ellipse at center, var(--pres-overlay-strong) 0%, var(--pres-overlay-soft) 60%, transparent 100%);text-align:center;opacity:0;pointer-events:none;transition:opacity 1.4s ease;}.bands-cta.visible.svelte-1bz3jhs {opacity:1;}.bands-cta.svelte-1bz3jhs p:where(.svelte-1bz3jhs),
  .bands-cta.svelte-1bz3jhs h3:where(.svelte-1bz3jhs),
  .bands-cta.svelte-1bz3jhs small:where(.svelte-1bz3jhs),
  .birthday-cta-layer.svelte-1bz3jhs p:where(.svelte-1bz3jhs),
  .birthday-cta-layer.svelte-1bz3jhs h3:where(.svelte-1bz3jhs) {margin:0;color:var(--pres-cta-text);}.bands-cta.svelte-1bz3jhs p:where(.svelte-1bz3jhs),
  .birthday-cta-layer.svelte-1bz3jhs p:where(.svelte-1bz3jhs) {font-size:14px;font-weight:650;letter-spacing:0.25em;opacity:0.5;text-transform:uppercase;
    animation: svelte-1bz3jhs-pres-cta-up 1s ease 0.2s both;}.bands-cta.svelte-1bz3jhs h3:where(.svelte-1bz3jhs),
  .birthday-cta-layer.svelte-1bz3jhs h3:where(.svelte-1bz3jhs) {margin-top:8px;font-size:clamp(38px, 7vw, 52px);font-weight:750;line-height:1.02;text-shadow:var(--pres-text-shadow);
    animation: svelte-1bz3jhs-pres-cta-up 1s ease 0.4s both;}.bands-cta.svelte-1bz3jhs small:where(.svelte-1bz3jhs) {margin-top:10px;opacity:0.55;}.pres-cta-button.svelte-1bz3jhs,
  .birthday-cta-layer.svelte-1bz3jhs button:where(.svelte-1bz3jhs) {display:inline-flex;min-height:44px;align-items:center;justify-content:center;gap:10px;border:1px solid var(--pres-cta-border);border-radius:999px;margin-top:24px;padding:0 24px;background:var(--pres-cta-bg);color:var(--pres-cta-text);cursor:pointer;font:inherit;font-size:13px;font-weight:650;letter-spacing:0;pointer-events:auto;transition:transform 200ms ease, background 200ms ease, opacity 200ms ease;
    animation: svelte-1bz3jhs-pres-cta-up 1s ease 0.7s both;backdrop-filter:blur(12px);}.pres-cta-button.svelte-1bz3jhs:hover,
  .birthday-cta-layer.svelte-1bz3jhs button:where(.svelte-1bz3jhs):hover {background:var(--pres-cta-bg-hover);}.pres-cta-button.svelte-1bz3jhs:active,
  .birthday-cta-layer.svelte-1bz3jhs button:where(.svelte-1bz3jhs):active {transform:scale(0.95);}.pres-cta-button.svelte-1bz3jhs:disabled,
  .birthday-cta-layer.svelte-1bz3jhs button:where(.svelte-1bz3jhs):disabled {opacity:0.7;pointer-events:none;transform:scale(0.95);}.pres-cta-button.svelte-1bz3jhs svg:where(.svelte-1bz3jhs),
  .birthday-cta-layer.svelte-1bz3jhs svg:where(.svelte-1bz3jhs) {opacity:0.7;
    animation: svelte-1bz3jhs-pres-chevron-pulse 1.5s ease-in-out infinite;}.pres-cta-button.svelte-1bz3jhs i:where(.svelte-1bz3jhs),
  .birthday-cta-layer.svelte-1bz3jhs i:where(.svelte-1bz3jhs) {width:14px;height:14px;border:2px solid color-mix(in srgb, currentColor 30%, transparent);border-top-color:currentColor;border-radius:50%;
    animation: svelte-1bz3jhs-pres-spin 800ms linear infinite;}.presentation-branding.svelte-1bz3jhs {position:absolute;right:0;bottom:24px;left:0;display:flex;flex-direction:column;align-items:center;gap:6px;
    animation: svelte-1bz3jhs-pres-cta-up 1s ease 1s both;}.presentation-branding.svelte-1bz3jhs span:where(.svelte-1bz3jhs) {color:currentColor;font-size:10px;font-weight:650;letter-spacing:0.2em;opacity:0.7;text-transform:uppercase;}.presentation-branding.svelte-1bz3jhs img:where(.svelte-1bz3jhs) {height:56px;width:auto;}.birthday.svelte-1bz3jhs {background:#e8e4da;color:#1c0c5b;}.birthday-grid.svelte-1bz3jhs {position:absolute;inset:0;background-color:#e8e4da;background-image:linear-gradient(rgba(0, 0, 100, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 100, 0.06) 1px, transparent 1px);background-size:20px 20px;}.birthday-canvas.svelte-1bz3jhs {position:absolute;inset:0;z-index:30;width:100%;height:100%;pointer-events:none;}.birthday-entrance.svelte-1bz3jhs {position:absolute;inset:0;z-index:3;display:flex;align-items:center;justify-content:center;opacity:1;transition:opacity 1s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1);}.is-papers.svelte-1bz3jhs .birthday-entrance:where(.svelte-1bz3jhs) {opacity:0;pointer-events:none;transform:translateY(18px) scale(0.94);}.birthday-stage.svelte-1bz3jhs {position:relative;display:flex;width:100%;max-width:480px;min-height:480px;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;}.birthday-decoration.svelte-1bz3jhs {position:absolute;z-index:2;opacity:0;pointer-events:none;}.birthday-decoration.bday-float.svelte-1bz3jhs {
    animation:
      svelte-1bz3jhs-bday-decor-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--decor-delay) both,
      svelte-1bz3jhs-bday-float 1.9s ease-in-out var(--loop-delay) infinite;}.birthday-decoration.bday-float-delayed.svelte-1bz3jhs {
    animation:
      svelte-1bz3jhs-bday-decor-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--decor-delay) both,
      svelte-1bz3jhs-bday-float 2.3s ease-in-out var(--loop-delay) infinite;}.birthday-decoration.bday-pulse.svelte-1bz3jhs {
    animation:
      svelte-1bz3jhs-bday-decor-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--decor-delay) both,
      svelte-1bz3jhs-bday-pulse 1.3s ease-in-out var(--loop-delay) infinite;}.birthday-decoration.bday-spin.svelte-1bz3jhs {
    animation:
      svelte-1bz3jhs-bday-decor-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--decor-delay) both,
      svelte-1bz3jhs-bday-spin 3s linear var(--loop-delay) infinite;}.birthday-decoration.bday-zoom.svelte-1bz3jhs {
    animation:
      svelte-1bz3jhs-bday-decor-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--decor-delay) both,
      svelte-1bz3jhs-bday-zoom-left-in-out 1.75s ease-in-out var(--loop-delay) infinite;}.birthday-photo.svelte-1bz3jhs {z-index:1;display:flex;width:220px;height:200px;align-items:center;justify-content:center;border-radius:4px;background:white;box-shadow:4px 4px 15px rgba(0, 0, 0, 0.15);margin-bottom:-20px;opacity:0;padding:8px 8px 40px;transform:rotate(-8deg) scale(0.6);}.birthday-photo.entered.svelte-1bz3jhs {
    animation: svelte-1bz3jhs-bday-photo-in 800ms cubic-bezier(0.34, 1.56, 0.64, 1) 200ms both;}.birthday-photo.svelte-1bz3jhs .interactive-card-image {width:100%;height:100%;object-fit:cover;}.birthday-banner.svelte-1bz3jhs {z-index:2;display:flex;flex-direction:column;align-items:baseline;gap:8px;margin-top:16px;font-family:"Abril Fatface", Georgia, serif;font-size:clamp(32px, 8vw, 42px);line-height:1;text-transform:uppercase;transform:rotate(-5deg);}.birthday-banner.svelte-1bz3jhs span:where(.svelte-1bz3jhs) {display:inline-flex;background:#1c0c5b;color:white;opacity:0;padding:12px 20px;transform:translateX(-40px);}.birthday-banner.svelte-1bz3jhs span:where(.svelte-1bz3jhs):nth-child(2) {margin-inline-start:24px;}.birthday-banner.svelte-1bz3jhs span.entered:where(.svelte-1bz3jhs) {
    animation: svelte-1bz3jhs-bday-banner-in 600ms cubic-bezier(0.16, 1, 0.3, 1) 500ms both;}.birthday-banner.svelte-1bz3jhs span:nth-child(2).entered:where(.svelte-1bz3jhs) {animation-delay:700ms;}.birthday-name.svelte-1bz3jhs {margin-top:16px;color:#1c0c5b;font-family:"Abril Fatface", Georgia, serif;font-size:clamp(20px, 5vw, 28px);letter-spacing:0.05em;opacity:0;text-align:center;transform:translateY(12px);}.birthday-name.entered.svelte-1bz3jhs {
    animation: svelte-1bz3jhs-bday-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 950ms both;}.birthday-note.svelte-1bz3jhs {position:relative;max-width:85%;margin-top:20px;padding:28px 16px;background:repeating-linear-gradient(#f1ede9, #f1ede9 31px, #94acd4 31px, #94acd4 32px);box-shadow:4px 4px 15px rgba(0, 0, 0, 0.15);color:#333;font-family:"Shadows Into Light", "Comic Sans MS", cursive;font-size:18px;line-height:32px;opacity:0;text-align:center;transform:translateY(24px);}.birthday-note.entered.svelte-1bz3jhs {
    animation: svelte-1bz3jhs-bday-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 1150ms both;}.birthday-note.svelte-1bz3jhs p:where(.svelte-1bz3jhs) {margin:0;}.birthday-papers.svelte-1bz3jhs {position:absolute;inset:0;z-index:4;display:flex;align-items:center;justify-content:center;overflow:hidden;}.birthday-paper-stage.svelte-1bz3jhs {position:relative;width:90%;max-width:520px;height:100%;min-height:480px;}.bday-paper.svelte-1bz3jhs {position:absolute;max-width:200px;padding:16px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='20' height='20' fill='%23f5f2eb'/%3E%3Cline x1='20' y1='0' x2='20' y2='20' stroke='%23c8d8e8' stroke-width='0.4'/%3E%3Cline x1='0' y1='20' x2='20' y2='20' stroke='%23c8d8e8' stroke-width='0.4'/%3E%3C/svg%3E");background-size:20px 20px;box-shadow:5px 8px 14px rgba(0, 0, 0, 0.35);opacity:0;transform:rotate(var(--rot));user-select:none;
    animation: svelte-1bz3jhs-bday-paper-drop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay) both;}.bday-paper--title.svelte-1bz3jhs,
  .bday-paper--message.svelte-1bz3jhs {min-width:240px;max-width:340px;padding:14px 28px;z-index:2;}.bday-paper--title.svelte-1bz3jhs {top:5%;right:5%;left:auto;}.bday-paper--image.svelte-1bz3jhs {z-index:1;}.bday-paper.svelte-1bz3jhs:nth-child(2) {top:25%;left:2%;}.bday-paper.svelte-1bz3jhs:nth-child(3) {top:auto;bottom:10%;left:3%;}.bday-paper.svelte-1bz3jhs:nth-child(4) {top:35%;right:2%;left:auto;}.bday-paper-title.svelte-1bz3jhs,
  .bday-paper-msg.svelte-1bz3jhs {margin:0;color:rgba(0, 0, 100, 0.75);font-family:"Zeyada", "Comic Sans MS", cursive;font-weight:600;white-space:pre-line;}.bday-paper-title.svelte-1bz3jhs {font-size:36px;line-height:1.2;text-align:center;}.bday-paper-msg.svelte-1bz3jhs {font-size:24px;line-height:1.4;}.bday-paper.svelte-1bz3jhs .interactive-card-image {display:block;width:100%;max-height:160px;object-fit:cover;pointer-events:none;}.birthday-cta-layer.svelte-1bz3jhs {--pres-cta-text: #1c0c5b;--pres-cta-bg: rgba(28, 12, 91, 0.08);--pres-cta-bg-hover: rgba(28, 12, 91, 0.12);--pres-cta-border: rgba(28, 12, 91, 0.2);--pres-text-shadow: 0 2px 12px rgba(28, 12, 91, 0.1);background:radial-gradient(ellipse at center, rgba(232, 228, 218, 0.92) 0%, rgba(232, 228, 218, 0.75) 60%, rgba(232, 228, 218, 0.5) 100%);color:#1c0c5b;opacity:1;backdrop-filter:blur(2px);
    animation: svelte-1bz3jhs-bday-cta-up 1.2s ease 800ms both;}.birthday-cta-layer.svelte-1bz3jhs h3:where(.svelte-1bz3jhs) {font-family:"Abril Fatface", Georgia, serif;}

  @keyframes svelte-1bz3jhs-pres-layer-scale {
    0% {
      transform: scale(0);
    }
    30% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes svelte-1bz3jhs-pres-layer-fade {
    0% {
      opacity: 0;
    }
    55% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes svelte-1bz3jhs-pres-cta-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes svelte-1bz3jhs-pres-chevron-pulse {
    0%,
    100% {
      opacity: 0.6;
      transform: translateX(0);
    }
    50% {
      opacity: 1;
      transform: translateX(4px);
    }
  }

  @keyframes svelte-1bz3jhs-pres-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes svelte-1bz3jhs-bday-photo-in {
    from {
      opacity: 0;
      transform: rotate(-8deg) scale(0.6);
    }
    to {
      opacity: 1;
      transform: rotate(3deg) scale(1);
    }
  }

  @keyframes svelte-1bz3jhs-bday-banner-in {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes svelte-1bz3jhs-bday-fade-up {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes svelte-1bz3jhs-bday-decor-pop {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes svelte-1bz3jhs-bday-float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes svelte-1bz3jhs-bday-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes svelte-1bz3jhs-bday-zoom-left-in-out {
    0%,
    100% {
      transform: scale(0.95) rotate(2deg);
    }
    50% {
      transform: scale(1.05) rotate(-2deg);
    }
  }

  @keyframes svelte-1bz3jhs-bday-pulse {
    0%,
    100% {
      transform: translateX(-50%) scale(0.9);
    }
    50% {
      transform: translateX(-50%) scale(1.05);
    }
  }

  @keyframes svelte-1bz3jhs-bday-paper-drop {
    from {
      opacity: 0;
      margin-top: -40px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }

  @keyframes svelte-1bz3jhs-bday-cta-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: 640px) {.birthday-photo.svelte-1bz3jhs {width:300px;height:270px;padding:10px 10px 52px;}.birthday-banner.svelte-1bz3jhs {font-size:52px;}.birthday-banner.svelte-1bz3jhs span:where(.svelte-1bz3jhs) {padding:14px 28px;}.birthday-banner.svelte-1bz3jhs span:where(.svelte-1bz3jhs):nth-child(2) {margin-inline-start:32px;}.birthday-name.svelte-1bz3jhs {margin-top:20px;font-size:34px;}.birthday-note.svelte-1bz3jhs {max-width:380px;margin-top:28px;padding:32px 24px;font-size:20px;line-height:34px;}.bday-paper.svelte-1bz3jhs {max-width:320px;padding:20px;}.bday-paper--title.svelte-1bz3jhs,
    .bday-paper--message.svelte-1bz3jhs {min-width:300px;max-width:400px;padding:18px 36px;}.bday-paper--title.svelte-1bz3jhs {top:5%;right:8%;}.bday-paper.svelte-1bz3jhs:nth-child(2) {top:22%;left:4%;}.bday-paper.svelte-1bz3jhs:nth-child(3) {bottom:8%;left:4%;}.bday-paper.svelte-1bz3jhs:nth-child(4) {top:30%;right:4%;}.bday-paper-title.svelte-1bz3jhs {font-size:42px;}.bday-paper-msg.svelte-1bz3jhs {font-size:28px;}.bday-paper.svelte-1bz3jhs .interactive-card-image {max-height:280px;}
  }

  @media (max-width: 720px) {.classic-loader.svelte-1bz3jhs {min-height:460px;}.name-row.svelte-1bz3jhs {font-size:clamp(3rem, 15vw, 5.4rem);}.bands-cta.svelte-1bz3jhs,
    .birthday-cta-layer.svelte-1bz3jhs {padding:24px;}.presentation-branding.svelte-1bz3jhs {bottom:18px;}
  }

  @media (prefers-reduced-motion: reduce) {.name-half.svelte-1bz3jhs,
    .name-half.svelte-1bz3jhs span:where(.svelte-1bz3jhs),
    .image-box.svelte-1bz3jhs,
    .image-inner.svelte-1bz3jhs,
    .grid-stage.svelte-1bz3jhs,
    .bands-stage.svelte-1bz3jhs,
    .bands-cta.svelte-1bz3jhs,
    .birthday-entrance.svelte-1bz3jhs,
    .pres-cta-button.svelte-1bz3jhs,
    .birthday-cta-layer.svelte-1bz3jhs button:where(.svelte-1bz3jhs) {transition:none;}.image-inner.svelte-1bz3jhs .interactive-card-image {transition:none;}
  }`};function Ts(T,g){Za(g,!1),Ka(T,Fs);const x=p(),I=p(),u=p(),A=p(),ie=p(),D=p(),P=p(),ve=p(),E=p(),oe=p(),ke=p(),Ce=p(),Ae=p(),Ee=p(),Ge=p(),nt=p(),Xt=p(),Se=p(),Ut=p(),$t=p(),rt=p(),Ft=p(),it=p(),Ct=p(),At=p(),Et=p(),St=p();let J=Le(g,"card",8),Gt=Le(g,"definition",8,void 0),xa=Le(g,"dictionary",24,()=>({})),Vt=Le(g,"locale",8,"en"),yt=Le(g,"compact",8,!1),Zt=Le(g,"onAdvance",8,null),ze=Le(g,"initiallyVisible",8,!1);const wa="Marina",zt="/og-image-home.jpg",ja="We prepared something special",Kt="For {name}",_a="Open my gift",Ua="An experience",Mt=rs(),Fa=[{cells:[[1,1],[5,1],[1,2],[5,2],[1,3],[5,3]],duration:2.5,delay:.5,easing:"cubic-bezier(0.42,0,0.58,1)"},{cells:[[2,1],[4,1],[2,2],[4,2],[2,3],[4,3]],duration:2.3,delay:.3,easing:"cubic-bezier(0.76,0,0.24,1)"},{cells:[[3,1],[3,3]],duration:2.1,delay:.1,easing:"cubic-bezier(0.87,0,0.13,1)"}],Ca="varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",Aa=`
precision highp float;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uTextureHeight, uSequenceHeight, uBandWidth;
uniform float uScroll, uSpeed, uScrollDirection, uOffsetX;
uniform float uRotation, uRotationType, uHasRotation;
uniform float uCurveAmount, uCurveDirection, uOpacity;
varying vec2 vUv;
mat2 rot2(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }
void main(){
  vec2 px=vUv*uResolution, opx=px;
  float nY=px.y/uResolution.y;
  float cf=4.0*(nY-0.5)*(nY-0.5);
  float co=(0.5-cf)*uCurveAmount*uCurveDirection;
  float blb=(uResolution.x-uBandWidth)*0.5+uOffsetX;
  float bl=blb+co, br=bl+uBandWidth, bcx=blb+uBandWidth*0.5;
  if(uHasRotation>0.5){
    vec2 rc=uRotationType>0.5?vec2(bcx,0.0):vec2(bcx,uResolution.y*0.5);
    px=rot2(uRotation)*(px-rc)+rc;
    opx=rot2(uRotation)*(opx-rc)+rc;
  }
  float m=3.0;
  if(px.x<bl-m||px.x>br+m){discard;return;}
  float sp=uScroll*uSpeed*uScrollDirection;
  float wy=mod(opx.y+sp,uSequenceHeight);
  float ty=(wy+uSequenceHeight)/uTextureHeight;
  float tx=(px.x-bl)/(br-bl);
  if(tx<0.0||tx>1.0||ty<0.0||ty>1.0){discard;return;}
  vec4 c=texture2D(uTexture,vec2(tx,ty));
  if(c.a<0.5){discard;return;}
  float edge=min(px.x-bl,br-px.x);
  if(edge<m) c.a*=smoothstep(0.0,m,edge);
  if(c.a<0.01){discard;return;}
  gl_FragColor=vec4(c.rgb, c.a * uOpacity);
}`,Jt=[{ox:0,spd:1,rot:-7*Math.PI/180,rt:1,crv:40,cd:1,sd:1},{ox:200,spd:1.3,rot:-26*Math.PI/180,rt:0,crv:30,cd:-1,sd:-1},{ox:400,spd:1.6,rot:18*Math.PI/180,rt:1,crv:20,cd:1,sd:1},{ox:-100,spd:.7,rot:47*Math.PI/180,rt:1,crv:55,cd:1,sd:-1},{ox:-200,spd:.4,rot:24*Math.PI/180,rt:1,crv:45,cd:1,sd:1}],Tt=120,Dt=100,Rt=20,Qt=3,ea=[.67,.75,1,1.33,.75,.56,1,.67],ta=["#f472b6","#fb7185","#c084fc","#818cf8","#34d399","#fbbf24","#60a5fa","#f9a8d4"],Ea=120,aa=90,Be=1/60,Sa=[{char:"🎈",className:"bday-float",style:"top:8%;right:8%;font-size:48px;"},{char:"🎈",className:"bday-float-delayed",style:"top:12%;left:6%;font-size:36px;"},{char:"🎁",className:"bday-pulse",style:"top:5%;left:50%;font-size:32px;transform:translateX(-50%);"},{char:"✨",className:"bday-spin",style:"bottom:15%;left:8%;font-size:28px;"},{char:"🎉",className:"bday-zoom",style:"bottom:10%;right:10%;font-size:40px;"}];let le=p(),Pe=p(),Ve=p(),ot=p(),xt=p(),It=p(),W=p(!1),wt=p(""),F=p(ze()?"image-grow":"idle"),xe=p("entrance"),we=p(ze()),lt=p(0),Ze=[],ct=null,ne=p(!1),dt=0,ht=0,pt=null,bt=p(!1),he=p(null),pe=p(null),Ke=p({}),Ne=null,vt=0,Me="",Je=0,mt=null,Te=null,jt=p(!1),De=!1,Qe=!1,qt=null,kt="";Ja(()=>{i(W,!0),i(wt,e(Se));const a=ls(e(le),s=>{De=s.visible,Qe=s.reducedMotion,ha(),Te?.(),oa()});return typeof ResizeObserver<"u"&&(Ne=new ResizeObserver(Bt)),na(),window.addEventListener("resize",Bt),()=>{i(W,!1),a(),sa(),ca(),Nt(),Ot(),Lt(),window.cancelAnimationFrame(vt),window.removeEventListener("resize",Bt),Ne?.disconnect(),Ne=null}});function _t(a){return a?.trim()??""}function Ma(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function Oe(a,s){const n=a.split(".").reduce((l,o)=>{if(Ma(l)&&o in l)return l[o]},xa());return typeof n=="string"&&n.trim()?n:s}function Ta(a){const s=new Set,n=[];for(const l of a){const o=l?.trim(),c=Da(o);!o||!c||s.has(c)||(s.add(c),n.push(o))}return n}function Da(a){return a?is(os(a)):""}function sa(){Ze.forEach(clearTimeout),Ze=[]}function na(){if(sa(),ca(),Nt(),Lt(),Ot(),i(lt,0),i(ne,!1),i(bt,!1),i(he,null),Wt().then(()=>{e(W)&&(Ne?.disconnect(),Ne?.observe(e(le)),e(x)==="classic"&&(e(Pe)&&Ne?.observe(e(Pe)),e(Ve)&&Ne?.observe(e(Ve)),Pt(),e(u).forEach((a,s)=>{const n=e(ot)?.querySelector(`.presentation-image-${s}`);n?.complete&&ia(a,n)})))}),e(x)==="birthday"){i(we,ze()),i(xe,"entrance"),window.cancelAnimationFrame(vt),Ze=[setTimeout(()=>{i(we,!0)},100),setTimeout(()=>{i(xe,"confetti"),Ya()},600),setTimeout(()=>{i(xe,"papers")},4500)];return}i(F,ze()?"image-grow":"idle"),Ze=ze()?[setTimeout(()=>Re("image-expand"),1600),setTimeout(()=>Re("grid"),3600),setTimeout(()=>Re("bands"),7300)]:[setTimeout(()=>Re("letters-in"),800),setTimeout(()=>Re("image-grow"),2e3),setTimeout(()=>Re("image-expand"),3600),setTimeout(()=>Re("grid"),5600),setTimeout(()=>Re("bands"),9300)]}function Re(a){i(F,a),a==="grid"?Wt().then(ra):i(he,null),a==="bands"?(i(bt,!1),Ze=[...Ze,setTimeout(()=>{i(bt,!0)},3e3)]):i(bt,!1)}function ra(){if(e(F)!=="grid"||!e(le))return;const a=e(le).clientWidth*.92,s=Math.min(20,Math.max(8,e(le).clientWidth*.025)),n=(a-4*s)/5,o=(a*(3.5/5)-2*s)/3;i(he,{w:n,h:o})}function Bt(){e(W)&&(Pt(),ra())}function Pt(){if(e(x)!=="classic"||!e(Ve)||!e(ot)||!e(Pe))return;const a=getComputedStyle(e(ot)),s=getComputedStyle(e(Ve)),n=e(Pe).previousElementSibling,l=e(Pe).nextElementSibling,o=n?Number.parseFloat(getComputedStyle(n).width):0,c=l?Number.parseFloat(getComputedStyle(l).width):0,b={initial:{w:Number.parseFloat(a.width),h:Number.parseFloat(a.height)},expanded:{w:Number.parseFloat(s.width),h:Number.parseFloat(s.height)},centerOffset:(c-o)*.5};![b.initial.w,b.initial.h,b.expanded.w,b.expanded.h].every(y=>Number.isFinite(y)&&y>0)||!Number.isFinite(b.centerOffset)||e(pe)&&b.initial.w===e(pe).initial.w&&b.initial.h===e(pe).initial.h&&b.expanded.w===e(pe).expanded.w&&b.expanded.h===e(pe).expanded.h&&b.centerOffset===e(pe).centerOffset||i(pe,b)}function ia(a,s){if(!s.naturalWidth||!s.naturalHeight)return;const n={w:s.naturalWidth,h:s.naturalHeight};e(Ke)[a]?.w===n.w&&e(Ke)[a]?.h===n.h||i(Ke,{...e(Ke),[a]:n})}function Ra(a,s){!e(W)||!(s.currentTarget instanceof HTMLImageElement)||(Pt(),ia(a,s.currentTarget))}function oa(){if(!De||Qe||e(F)!=="image-grow"||e(u).length<2){Nt();return}ct||(ct=setInterval(()=>{!e(W)||!De||Qe||i(lt,(e(lt)+1)%e(u).length)},400))}function Nt(){ct&&(clearInterval(ct),ct=null)}function la(){if(e(ne))return;const a=++dt;i(ne,!0),Te?.(),ht=requestAnimationFrame(()=>{!e(W)||a!==dt||(ht=requestAnimationFrame(()=>{ht=0,!(!e(W)||a!==dt)&&(Zt()?Zt()():e(le)?.dispatchEvent(new CustomEvent("icard-next",{bubbles:!0})))}))}),pt=setTimeout(()=>{!e(W)||a!==dt||(pt=null,i(ne,!1),Te?.())},1200)}function ca(){dt+=1,cancelAnimationFrame(ht),ht=0,pt!==null&&clearTimeout(pt),pt=null}function Ia(a,s,n,l,o,c,b){const y=a&&l?`${l.w}px`:s?c?"112cqw":"110vw":n?"1.2em":"0px",t=a&&l?`${l.h}px`:s?c?"104cqh":"100vh":"0.92em",r=a?"1.8s":s?"2s":"1.3s",v=a?"cubic-bezier(0.65,0,0.35,1)":"cubic-bezier(0.16,1,0.3,1)",f=a||s?(o?.centerOffset??0)*(b?-1:1):0;return`--image-window-width:${y};--image-window-height:${t};--image-duration:${r};--image-easing:${v};--image-center-offset:${f}px;`}function qa(a,s,n,l,o){if(!s)return{surface:"",image:""};const c=n&&o?o:l?s.expanded:s.initial;if(!a)return{surface:"",image:`transform:scale(${Math.max(c.w/s.initial.w,c.h/s.initial.h)});`};const b=Math.min(s.initial.w/a.w,s.initial.h/a.h),y=Math.max(s.initial.w/a.w,s.initial.h/a.h),t=Math.max(c.w/a.w,c.h/a.h),r=y/b,v=t/y;return{surface:`transform:scale(${r});`,image:`object-fit:contain;transform:scale(${v});`}}function da(a,s){return(a||Kt).replace("{name}",s)}function ka(a,s,n){const l=[{type:"title",text:`${e(Et)} ${e(St)}
${s}!`,rot:-6},{type:"image",src:a[0]||zt,rot:-12}];return n.trim()&&l.push({type:"message",text:n,rot:7}),a[1]&&l.push({type:"image",src:a[1],rot:11}),l.slice(0,4)}function ha(){const a=e(x)==="classic"&&e(F)==="bands"?e(u).join("|"):"";a!==Me&&(a&&!De||(Ot(),Me=a,a&&Ba(a)))}function Ot(){Je+=1,mt?.(),mt=null,Te=null,Me=""}async function Ba(a){const s=++Je,n=e(xt);if(!n)return;let l;try{l=await Va(()=>import("./three.module-CuzN0wor.js"),[])}catch{e(W)&&s===Je&&a===Me&&i(jt,!0);return}if(s!==Je||a!==Me||e(xt)!==n)return;if(!De){Me="";return}const o=e(u).slice(),c=new AbortController;let b=0,y=0,t=0,r=0,v=!0,f=null,S=null,re=!0,V=!1,Q=0;const me=[],$=[],ee=[],ce=[],fe=()=>{if(!v)return;v=!1,Q+=1,c.abort(),cancelAnimationFrame(b),b=0,S?.disconnect();const te=N=>{try{N()}catch{}};$.forEach(N=>te(()=>N.dispose())),ee.forEach(N=>te(()=>N.dispose())),ce.forEach(N=>te(()=>N.dispose())),me.forEach(N=>te(N)),te(()=>f?.dispose()),te(()=>{f&&n.contains(f.domElement)&&n.removeChild(f.domElement)})};try{const te=new l.Scene,N=new l.OrthographicCamera(-1,1,1,-1,.1,10);N.position.z=1;const et=n.clientWidth<768;f=new l.WebGLRenderer({antialias:!et,alpha:!0,powerPreference:"low-power"}),mt=fe,i(jt,!1),f.setPixelRatio(Math.min(window.devicePixelRatio||1,et?1.25:2)),f.setSize(n.clientWidth,n.clientHeight),n.replaceChildren(f.domElement),o.forEach(z=>{const O=Mt?.retain?.(z,{src:z});O&&me.push(O)});const q=performance.now(),M=await hs(o,Mt,c.signal);if(!v||s!==Je||a!==Me){fe();return}if(!M.length)throw new Error("Presentation images unavailable");o.forEach(z=>{const O=Mt?.retain?.(z,{src:z});O&&me.push(O)});const k=[7,12,8,13,15];Jt.forEach((z,O)=>{if(c.signal.aborted||performance.now()-q>=za)throw new Error("Presentation composition timed out");const L=Pa(M,k[O]??8),Z=new l.CanvasTexture(L.canvas);ce.push(Z),Z.needsUpdate=!0;const Ie=new l.ShaderMaterial({vertexShader:Ca,fragmentShader:Aa,uniforms:{uResolution:{value:new l.Vector2(n.clientWidth,n.clientHeight)},uTexture:{value:Z},uTextureHeight:{value:L.totalH},uSequenceHeight:{value:L.seqH},uBandWidth:{value:Tt},uScroll:{value:0},uSpeed:{value:z.spd},uScrollDirection:{value:z.sd},uOffsetX:{value:z.ox*(n.clientWidth/1200)},uRotation:{value:z.rot},uRotationType:{value:z.rt},uHasRotation:{value:z.rot!==0?1:0},uCurveAmount:{value:z.crv},uCurveDirection:{value:z.cd},uOpacity:{value:0}},transparent:!0,depthTest:!1,depthWrite:!1});$.push(Ie);const h=new l.PlaneGeometry(2,2);ee.push(h);const _=new l.Mesh(h,Ie);_.position.z=O*-.1,te.add(_)});const Y=()=>{if(!v||!De||!f||!re)return;re=!1;const z=n.clientWidth,O=n.clientHeight;f.setSize(z,O),$.forEach((L,Z)=>{L.uniforms.uResolution.value.set(z,O),L.uniforms.uOffsetX.value=(Jt[Z]?.ox??0)*(z/1200)})},de=()=>{const z=Q;b=requestAnimationFrame(O=>ft(O,z))},ft=(z,O)=>{if(O!==Q||(b=0,!v||!e(W)||!De||Qe||e(ne)))return;const L=r?Math.min(64,Math.max(0,z-r)):0;r=z,t+=L,y+=L*.12,Y(),$.forEach((Z,Ie)=>{Z.uniforms.uScroll.value=y,Z.uniforms.uOpacity.value=Math.min(1,Math.max(0,(t-Ie*250)/500))}),f?.render(te,N),V=!1,de()};Te=()=>{if(Q+=1,cancelAnimationFrame(b),b=0,r=0,!v||!e(W)||!De||e(ne)){V=!1;return}Y(),Qe?V||($.forEach(z=>{z.uniforms.uOpacity.value=1}),f?.render(te,N),V=!0):de()},typeof ResizeObserver<"u"&&(S=new ResizeObserver(()=>{v&&(re=!0,V=!1,Qe&&Te?.())}),S.observe(n)),Te()}catch{v&&e(W)&&s===Je&&a===Me&&i(jt,!0),fe(),mt===fe&&(mt=null,Te=null)}}function Pa(a,s){const n=[];let l=0;for(let t=0;t<s;t+=1){const r=Math.round(Dt/(ea[t%ea.length]??1));n.push(r),l+=r+Rt}l-=Rt;const o=l*Qt,c=document.createElement("canvas");c.width=Tt,c.height=o;const b=c.getContext("2d");if(!b)return{canvas:c,totalH:o,seqH:l};let y=0;for(let t=0;t<Qt;t+=1)for(let r=0;r<s;r+=1){const v=a[r%a.length]??a[0],f=Dt,S=n[r]??Dt,re=(Tt-f)/2,V=v.width/v.height,Q=f/S;let me=0,$=0,ee=v.width,ce=v.height;V>Q?(ee=ce*Q,me=(v.width-ee)/2):(ce=ee/Q,$=(v.height-ce)/2),b.globalAlpha=.9,b.drawImage(v.source,me,$,ee,ce,re,y,f,S),y+=S+Rt}return{canvas:c,totalH:o,seqH:l}}function Na(a,s){const n=a/s-1;return n*n*n+1}function Oa(a,s,n,l,o){const c=1-o;return{x:c*c*c*a.x+3*c*c*o*s.x+3*c*o*o*n.x+o*o*o*l.x,y:c*c*c*a.y+3*c*c*o*s.y+3*c*o*o*n.y+o*o*o*l.y}}function La(a,s){const n=a<768,l=n?80:180,o=n?1:1.4,c=n?1:1.3;return Array.from({length:l},()=>{const b=a*(.1+Math.random()*.8),y=s*(.1+Math.random()*.4),t=(Math.random()-.5)*a*.8;return{p0:{x:b,y:s+10},p1:{x:b+t*.3,y:s*.5},p2:{x:b+t*.7,y},p3:{x:b+t,y},time:0,dur:.8+Math.random()*.6,fallTime:0,vy:0,drift:(Math.random()-.5)*35*c,sway1Amp:(40+Math.random()*50)*c,sway1Freq:1.2+Math.random()*1.5,sway2Amp:15+Math.random()*25,sway2Freq:2.8+Math.random()*2.5,swayPhase:Math.random()*Math.PI*2,spinSpeed:(Math.random()-.5)*6,falling:!1,color:ta[Math.floor(Math.random()*ta.length)]??"#f472b6",w:8*o,h:6*o,x:b,y:s+10,r:0,sy:1,done:!1}})}function Ya(){const a=e(It);if(!a)return;const s=a.clientWidth||320,n=a.clientHeight||460,l=Math.min(window.devicePixelRatio||1,2);a.width=s*l,a.height=n*l;const o=a.getContext("2d");if(!o)return;o.setTransform(l,0,0,l,0,0);const c=La(s,n);cancelAnimationFrame(vt);const b=()=>{o.clearRect(0,0,s,n);let y=!0;for(const t of c)if(!t.done){if(y=!1,t.falling){t.fallTime+=Be;const r=Math.min(1,t.fallTime*1.2);t.vy=Math.min(aa,t.vy+Ea*r*Be),t.y+=t.vy*Be;const v=t.fallTime*Math.PI*2,f=Math.sin(v*t.sway1Freq+t.swayPhase)*t.sway1Amp,S=Math.sin(v*t.sway2Freq+t.swayPhase*1.7)*t.sway2Amp;t.x+=(t.drift+(f+S)*(.6+t.vy/aa*.4))*Be;const re=Math.cos(v*t.sway1Freq+t.swayPhase);t.r+=(t.spinSpeed+re*1.5)*Be,t.sy=Math.cos(v*t.sway2Freq*.8+t.swayPhase),t.y>n+20&&(t.done=!0)}else{const r=t.x,v=t.y;t.time=Math.min(t.dur,t.time+Be);const f=Na(t.time,t.dur),S=Oa(t.p0,t.p1,t.p2,t.p3,f);t.r=Math.atan2(S.y-v,S.x-r)+Math.PI*.5,t.sy=Math.sin(Math.PI*f*10),t.x=S.x,t.y=S.y,t.time>=t.dur&&(t.falling=!0,t.vy=0,t.fallTime=0)}o.save(),o.translate(t.x,t.y),o.rotate(t.r),o.scale(1,t.sy),o.fillStyle=t.color,o.fillRect(-t.w*.5,-t.h*.5,t.w,t.h),o.restore()}y||(vt=requestAnimationFrame(b))};vt=requestAnimationFrame(b)}function Ha(){const a=e(x)==="birthday"&&e(xe)==="papers"?`${e(Se)}:papers`:"";a!==kt&&(Lt(),kt=a,a&&Wt().then(Wa))}function Lt(){qt?.(),qt=null,kt=""}function Wa(){if(!e(le)||e(xe)!=="papers")return;const s=Array.from(e(le).querySelectorAll(".bday-paper")).map(t=>{const r=Number.parseFloat(t.dataset.rotation||"0"),v=t.dataset.calm==="true",f=v?.15:.35;return{el:t,baseRot:r,rot:r,phase:Math.random()*Math.PI*2,wx:0,wy:0,targetX:0,targetY:0,targetRot:r,prevX:0,prevY:0,prevRot:r,wanderT:0,wanderDur:v?8+Math.random()*4:4+Math.random()*4,floatAmpY:(2+Math.random()*3)*f,floatFreqY:.35+Math.random()*.2,floatAmpRot:(.6+Math.random()*.8)*f,floatFreqRot:.25+Math.random()*.15,wanderScale:f,rotRange:v?4:20}}),n=t=>{const r=t.el.parentElement;if(!r)return;const v=Math.max(0,(r.clientWidth-t.el.offsetWidth)/2-20),f=Math.max(0,(r.clientHeight-t.el.offsetHeight)/2-20);t.prevX=t.wx,t.prevY=t.wy,t.prevRot=t.rot,t.targetX=(Math.random()-.5)*v*2*t.wanderScale,t.targetY=(Math.random()-.5)*f*2*t.wanderScale,t.targetRot=t.baseRot+(Math.random()-.5)*t.rotRange,t.wanderT=0,t.wanderDur=t.wanderScale<1?8+Math.random()*4:4+Math.random()*4};s.forEach(n);const l=performance.now();let o=0,c=!0;const b=t=>t<.5?2*t*t:1-(-2*t+2)**2/2,y=()=>{if(c){if(!e(ne)){const t=(performance.now()-l)/1e3;s.forEach(r=>{r.wanderT+=Be;const v=Math.min(1,r.wanderT/r.wanderDur),f=b(v);r.wx=r.prevX+(r.targetX-r.prevX)*f,r.wy=r.prevY+(r.targetY-r.prevY)*f,r.rot=r.prevRot+(r.targetRot-r.prevRot)*f,v>=1&&n(r);const S=Math.sin(t*r.floatFreqY*Math.PI*2+r.phase)*r.floatAmpY,re=Math.sin(t*r.floatFreqRot*Math.PI*2+r.phase*1.3)*r.floatAmpRot;r.el.style.transform=`translate(${r.wx}px, ${r.wy+S}px) rotate(${r.rot+re}deg)`})}o=requestAnimationFrame(y)}};o=requestAnimationFrame(y),qt=()=>{c=!1,cancelAnimationFrame(o)}}w(()=>Ue(J()),()=>{i(x,J().presentationTheme==="birthday"?"birthday":"classic")}),w(()=>Ue(J()),()=>{i(I,Ta([J().presentationData?.imageSrc,...J().presentationData?.images??[]]))}),w(()=>e(I),()=>{i(u,e(I).length?e(I):[zt])}),w(()=>Ue(Vt()),()=>{i(A,Vt()==="ar")}),w(()=>Ue(Gt()),()=>{i(ie,Oe("interactiveCards.presets.birthday.demo.presentation.name",Gt()?.label||wa))}),w(()=>(Ue(J()),e(ie)),()=>{i(D,_t(J().presentationData?.name)||_t(J().title)||e(ie))}),w(()=>Ue(J()),()=>{i(P,_t(J().body))}),w(()=>Ue(J()),()=>{i(ve,_t(J().presentationData?.senderName))}),w(()=>e(D),()=>{i(E,Math.ceil(e(D).length/2))}),w(()=>(e(D),e(E)),()=>{i(oe,e(D).slice(0,e(E)))}),w(()=>(e(D),e(E)),()=>{i(ke,e(D).slice(e(E)))}),w(()=>e(F),()=>{i(Ce,e(F)==="image-grow"||e(F)==="image-expand"||e(F)==="grid"||e(F)==="bands")}),w(()=>(e(F),e(he)),()=>{i(Ae,e(F)==="image-expand"||e(F)==="grid"&&!e(he))}),w(()=>(e(F),e(he)),()=>{i(Ee,e(F)==="grid"&&!!e(he))}),w(()=>(e(Ce),e(lt),e(u)),()=>{i(Ge,e(Ce)?e(lt)%e(u).length:0)}),w(()=>(e(u),e(Ge)),()=>{i(nt,e(u)[e(Ge)]??zt)}),w(()=>(e(u),e(D),e(P)),()=>{i(Xt,ka(e(u),e(D),e(P)))}),w(()=>(Ue(J()),e(x),e(D),e(P),e(ve),e(u)),()=>{i(Se,JSON.stringify({id:J().id,theme:e(x),name:e(D),message:e(P),senderName:e(ve),images:e(u)}))}),w(()=>(e(x),e(F),e(xe),e(Se)),()=>{i(Ut,`${e(x)}:${e(F)}:${e(xe)}:${e(Se)}`)}),w(()=>(e(Ee),e(Ae),e(Ce),e(he),e(pe),Ue(yt()),e(A)),()=>{i($t,Ia(e(Ee),e(Ae),e(Ce),e(he),e(pe),yt(),e(A)))}),w(()=>(e(u),e(Ke),e(pe),e(Ee),e(Ae),e(he)),()=>{i(rt,e(u).map(a=>qa(e(Ke)[a],e(pe),e(Ee),e(Ae),e(he))))}),w(()=>{},()=>{i(Ft,Oe("interactiveCards.config.presentation.ctaText1",ja))}),w(()=>{},()=>{i(it,Oe("interactiveCards.config.presentation.ctaText2",Kt))}),w(()=>{},()=>{i(Ct,Oe("interactiveCards.config.presentation.ctaButton",_a))}),w(()=>{},()=>{i(At,Oe("interactiveCards.config.presentation.brandingText",Ua))}),w(()=>{},()=>{i(Et,Oe("interactiveCards.presets.birthday.banner.line1","Happy"))}),w(()=>{},()=>{i(St,Oe("interactiveCards.presets.birthday.banner.line2","Birthday"))}),w(()=>(e(W),e(Se),e(wt)),()=>{e(W)&&e(Se)!==e(wt)&&(i(wt,e(Se)),na())}),w(()=>(e(W),e(Ut)),()=>{e(W)&&e(Ut)&&(oa(),ha(),Ha())}),Qa(),es();var pa=ts(),Xa=as(pa);{var $a=a=>{var s=gs();let n;var l=m(s);Ye(l,q=>i(It,q),()=>e(It));var o=U(l,4),c=m(o),b=m(c);He(b,1,()=>Sa,We,(q,M,k)=>{var Y=ps(),de=m(Y,!0);d(Y),K(()=>{ye(Y,1,(e(we),e(M),C(()=>`birthday-decoration ${e(we)?e(M).className:""}`)),"svelte-1bz3jhs"),qe(Y,(e(M),C(()=>`${e(M).style}--decor-delay:${1.4+k*.15}s;--loop-delay:${1.9+k*.15}s;`))),H(de,(e(M),C(()=>e(M).char)))}),R(q,Y)});var y=U(b,2);let t;var r=m(y);{let q=Xe(()=>(e(u),C(()=>e(u)[0]??zt))),M=Xe(()=>ze()?"eager":"lazy"),k=Xe(()=>ze()?"high":void 0);st(r,{get src(){return e(q)},alt:"",get loading(){return e(M)},get fetchPriority(){return e(k)}})}d(y);var v=U(y,2),f=m(v);let S;var re=m(f,!0);d(f);var V=U(f,2);let Q;var me=m(V,!0);d(V),d(v);var $=U(v,2);let ee;var ce=m($,!0);d($);var fe=U($,2);{var te=q=>{var M=bs();let k;var Y=m(M),de=m(Y,!0);d(Y),d(M),K(()=>{k=ye(M,1,"birthday-note svelte-1bz3jhs",null,k,{entered:e(we)}),H(de,e(P))}),R(q,M)};ge(fe,q=>{e(P)&&q(te)})}d(c),d(o);var N=U(o,2);{var et=q=>{var M=us(),k=m(M);He(k,5,()=>e(Xt),We,(ae,j,ue)=>{var je=fs(),at=m(je);{var Yt=se=>{st(se,{get src(){return e(j),C(()=>e(j).src)},alt:"",loading:"lazy"})},ut=se=>{var _e=vs(),gt=m(_e,!0);d(_e),K(()=>H(gt,(e(j),C(()=>e(j).text)))),R(se,_e)},Ht=se=>{var _e=ms(),gt=m(_e,!0);d(_e),K(()=>H(gt,(e(j),C(()=>e(j).text)))),R(se,_e)};ge(at,se=>{e(j),C(()=>e(j).type==="image"&&e(j).src)?se(Yt):(e(j),C(()=>e(j).type==="title")?se(ut,1):se(Ht,-1))})}d(je),K(()=>{ye(je,1,(e(j),C(()=>`bday-paper bday-paper--${e(j).type}`)),"svelte-1bz3jhs"),Fe(je,"data-rotation",(e(j),C(()=>e(j).rot))),Fe(je,"data-calm",(e(j),C(()=>e(j).type!=="image"))),qe(je,(e(j),C(()=>`--rot:${e(j).rot}deg;--delay:${.15+ue*.12}s;`)))}),R(ae,je)}),d(k);var Y=U(k,2),de=m(Y),ft=m(de,!0);d(de);var z=U(de,2),O=m(z,!0);d(z);var L=U(z,2),Z=m(L),Ie=m(Z,!0);d(Z);var h=U(Z,2);{var _=ae=>{var j=ua();R(ae,j)},X=ae=>{var j=ga();R(ae,j)};ge(h,ae=>{e(ne)?ae(_):ae(X,-1)})}d(L);var B=U(L,2),be=m(B),tt=m(be,!0);d(be),ba(2),d(B),d(Y),d(M),K(ae=>{H(ft,e(Ft)),H(O,ae),L.disabled=e(ne),Fe(L,"aria-busy",e(ne)),H(Ie,e(Ct)),H(tt,e(At))},[()=>(e(it),e(D),C(()=>da(e(it),e(D))))]),va("click",L,la),R(q,M)};ge(N,q=>{e(xe)==="papers"&&q(et)})}d(s),Ye(s,q=>i(le,q),()=>e(le)),K(()=>{n=ye(s,1,"presentation-card birthday svelte-1bz3jhs",null,n,{"compact-view":yt(),"is-papers":e(xe)==="papers"}),Fe(s,"dir",e(A)?"rtl":"ltr"),t=ye(y,1,"birthday-photo svelte-1bz3jhs",null,t,{entered:e(we)}),S=ye(f,1,"svelte-1bz3jhs",null,S,{entered:e(we)}),H(re,e(Et)),Q=ye(V,1,"svelte-1bz3jhs",null,Q,{entered:e(we)}),H(me,e(St)),ee=ye($,1,"birthday-name svelte-1bz3jhs",null,ee,{entered:e(we)}),H(ce,e(D)),s.dir=s.dir}),R(a,s)},Ga=a=>{var s=Us();let n;var l=m(s);{var o=h=>{var _=ys();R(h,_)};ge(l,h=>{e(F)!=="bands"&&h(o)})}var c=U(l,2),b=m(c),y=m(b);He(y,5,()=>(e(oe),C(()=>e(oe).split(""))),We,(h,_,X)=>{var B=ya();qe(B,`--d:${X*.06}s`);var be=m(B,!0);d(B),K(()=>H(be,e(_))),R(h,B)}),d(y);var t=U(y,2),r=m(t),v=m(r);He(v,5,()=>e(u),We,(h,_,X)=>{var B=zs(),be=m(B);{let tt=Xe(()=>`presentation-image-${X} ${X===e(Ge)?"active":""}`),ae=Xe(()=>ze()&&X===e(Ge)?"eager":"lazy"),j=Xe(()=>ze()&&X===e(Ge)?"high":void 0);st(be,{get className(){return e(tt)},get style(){return e(rt),C(()=>e(rt)[X].image)},get src(){return e(_)},alt:"",get loading(){return e(ae)},get fetchPriority(){return e(j)},onLoad:ue=>Ra(e(_),ue)})}d(B),K(()=>qe(B,(e(rt),C(()=>e(rt)[X].surface)))),R(h,B)}),d(v),Ye(v,h=>i(ot,h),()=>e(ot)),d(r),Ye(r,h=>i(Ve,h),()=>e(Ve)),d(t),Ye(t,h=>i(Pe,h),()=>e(Pe));var f=U(t,2);He(f,5,()=>(e(ke),C(()=>e(ke).split(""))),We,(h,_,X)=>{var B=ya(),be=m(B,!0);d(B),K(()=>{qe(B,(e(oe),C(()=>`--d:${(e(oe).length+X)*.06}s`))),H(be,e(_))}),R(h,B)}),d(f),d(b),d(c);var S=U(c,2);{var re=h=>{var _=js(),X=m(_),B=m(X);He(B,1,()=>Fa,We,(j,ue,je)=>{var at=ws();He(at,5,()=>(e(ue),C(()=>e(ue).cells)),We,(Yt,ut,Ht)=>{var se=xs(),_e=m(se);{let gt=Xe(()=>(e(u),e(nt),C(()=>e(u)[(je*6+Ht+1)%e(u).length]??e(nt))));st(_e,{get src(){return e(gt)},alt:"",loading:"lazy"})}d(se),K(()=>qe(se,(e(ut),C(()=>`grid-column:${e(ut)[0]};grid-row:${e(ut)[1]};`)))),R(Yt,se)}),d(at),K(()=>qe(at,(e(ue),C(()=>`--layer-duration:${e(ue).duration}s;--layer-delay:${e(ue).delay}s;--layer-easing:${e(ue).easing};`)))),R(j,at)});var be=U(B,2),tt=m(be),ae=m(tt);st(ae,{get src(){return e(nt)},alt:"",loading:"lazy"}),d(tt),d(be),d(X),d(_),K(()=>Fe(_,"aria-hidden",e(F)!=="grid")),R(h,_)};ge(S,h=>{(e(F)==="grid"||e(F)==="bands")&&h(re)})}var V=U(S,2),Q=m(V);{var me=h=>{st(h,{className:"bands-fallback",style:"position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.4;",get src(){return e(nt)},alt:"",loading:"lazy"})};ge(Q,h=>{e(jt)&&h(me)})}var $=U(Q,2);Ye($,h=>i(xt,h),()=>e(xt));var ee=U($,4);let ce;var fe=m(ee),te=m(fe,!0);d(fe);var N=U(fe,2),et=m(N,!0);d(N);var q=U(N,2);{var M=h=>{var _=_s(),X=m(_,!0);d(_),K(()=>H(X,e(ve))),R(h,_)};ge(q,h=>{e(ve)&&h(M)})}var k=U(q,2),Y=m(k),de=m(Y,!0);d(Y);var ft=U(Y,2);{var z=h=>{var _=ua();R(h,_)},O=h=>{var _=ga();R(h,_)};ge(ft,h=>{e(ne)?h(z):h(O,-1)})}d(k);var L=U(k,2),Z=m(L),Ie=m(Z,!0);d(Z),ba(2),d(L),d(ee),d(V),d(s),Ye(s,h=>i(le,h),()=>e(le)),K(h=>{n=ye(s,1,`presentation-card classic phase-${e(F)}`,"svelte-1bz3jhs",n,{"compact-view":yt()}),Fe(s,"dir",e(A)?"rtl":"ltr"),Fe(c,"aria-hidden",e(F)==="bands"),qe(b,e($t)),Fe(V,"aria-hidden",e(F)!=="bands"),ce=ye(ee,1,"bands-cta svelte-1bz3jhs",null,ce,{visible:e(bt)}),H(te,e(Ft)),H(et,h),k.disabled=e(ne),Fe(k,"aria-busy",e(ne)),H(de,e(Ct)),H(Ie,e(At)),s.dir=s.dir},[()=>(e(it),e(D),C(()=>da(e(it),e(D))))]),va("click",k,la),R(a,s)};ge(Xa,a=>{e(x)==="birthday"?a($a):a(Ga,-1)})}R(T,pa),ss()}export{Ts as default};
