import{_ as Va}from"./Bw7ja3gV.js";import"./DsnmJJEf.js";import{i as Za}from"./MUDqykI0.js";import{o as Ja}from"./DdHxj34X.js";import{p as Ka,m as p,s as i,g as e,y as Xt,l as w,d as Fe,e as Qa,f as er,j as tr,k as I,c as ar,o as h,n as F,r as d,t as J,u as A,w as W,q as Ye,ad as va,x as ya,v as G,ae as rr}from"./DxC0FJX8.js";import{i as ge}from"./CP8GhvXb.js";import{e as He,i as We}from"./D24R5D80.js";import{a as sr}from"./T2VlFwLk.js";import{c as be,d as ke,s as Ce}from"./CI31nQ7a.js";import{b as Xe}from"./O4oYc4-S.js";import{p as $e}from"./BpeeFNrX.js";import{m as ha,g as nr}from"./WPqOauuR.js";import{o as ir}from"./_Zql5Rw5.js";import{I as rt}from"./DElzh6KO.js";import{b as or,d as lr}from"./Cb7Clj8g.js";const za=15e3;function je(D){return D.reason instanceof Error?D.reason:new Error("Presentation images cancelled")}function cr(D,g){return new Promise((x,q)=>{if(g.aborted){q(je(g));return}const u=()=>{E(),q(je(g))},E=()=>g.removeEventListener("abort",u);g.addEventListener("abort",u,{once:!0}),Promise.resolve(D).then(ie=>{E(),g.aborted?q(je(g)):x(ie)},ie=>{E(),q(ie)})})}function fa(D,g,x){if(ha(g)||ha(x))return null;const q=D?.getDecodedImage?.(g,{src:g});return q?.source&&Number.isFinite(q.width)&&q.width>0&&Number.isFinite(q.height)&&q.height>0?q:null}async function dr(D,g,x,q){if(x.aborted)throw je(x);const u=()=>g?.resolveSrc?.(D,{src:D})??D;let E=u();if(!E)return null;const ie=fa(g,D,E);if(ie)return ie;if(g&&!g.hasLoaded?.(D,{src:D})){const N=await cr(Promise.resolve(g.preload?.(D,{src:D})).catch(()=>{}),x);if(E=u(),!E)return null;const ye=fa(g,D,E);if(ye)return ye;!g.resolveSrc&&typeof N=="string"&&N&&(E=N)}if(x.aborted)throw je(x);const R=u();return new Promise((N,ye)=>{const S=q();let oe=!1;const Be=()=>{S.onload=null,S.onerror=null,x.removeEventListener("abort",Ae)},Ae=()=>{oe||(oe=!0,Be(),S.removeAttribute("src"),ye(je(x)))},Ee=()=>{if(!(oe||x.aborted)){if(oe=!0,Be(),!R||u()!==R||!S.naturalWidth||!S.naturalHeight){N(null);return}try{g?.rememberElement?.(S,{src:E})}catch{}N({source:S,width:S.naturalWidth,height:S.naturalHeight})}};S.decoding="async";const Se=g?.crossOrigin?.(E);Se&&(S.crossOrigin=Se),S.onload=Ee,S.onerror=()=>{oe||(oe=!0,Be(),N(null))},x.addEventListener("abort",Ae,{once:!0}),S.src=E,S.complete&&S.naturalWidth&&S.naturalHeight&&Ee()})}async function mr(D,g,x,q=()=>new Image){const u=new AbortController,E=()=>u.abort(x.reason);x.aborted?E():x.addEventListener("abort",E,{once:!0});const ie=setTimeout(()=>u.abort(new Error("Presentation images timed out")),za);try{const R=await Promise.all(D.map(N=>dr(N,g,u.signal,q)));if(u.signal.aborted)throw je(u.signal);return R.filter(N=>N!==null)}finally{clearTimeout(ie),x.removeEventListener("abort",E),u.abort()}}var pr=G('<span aria-hidden="true"> </span>'),vr=G('<div><p class="svelte-yramsz"> </p></div>'),yr=G('<p class="bday-paper-title svelte-yramsz"> </p>'),hr=G('<p class="bday-paper-msg svelte-yramsz"> </p>'),fr=G("<article><!></article>"),ua=G('<i aria-hidden="true" class="svelte-yramsz"></i>'),ga=rr('<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svelte-yramsz"><polyline points="9 18 15 12 9 6" class="svelte-yramsz"></polyline></svg>'),ur=G('<div class="birthday-papers svelte-yramsz"><div class="birthday-paper-stage svelte-yramsz"></div> <div class="birthday-cta-layer svelte-yramsz"><p class="svelte-yramsz"> </p> <h3 class="svelte-yramsz"> </h3> <button type="button" class="svelte-yramsz"><span class="svelte-yramsz"> </span> <!></button> <div class="presentation-branding svelte-yramsz"><span class="svelte-yramsz"> </span> <img src="/icons/logo-optimized/logo-medium.webp" alt="2luv" class="svelte-yramsz"/></div></div></div>'),gr=G('<section><canvas class="birthday-canvas svelte-yramsz" aria-hidden="true"></canvas> <div class="birthday-grid svelte-yramsz" aria-hidden="true"></div> <div class="birthday-entrance svelte-yramsz"><div class="birthday-stage svelte-yramsz"><!> <div><!></div> <div class="birthday-banner svelte-yramsz"><span> </span> <span> </span></div> <div> </div> <!></div></div> <!></section>'),br=G('<div class="classic-grid-bg svelte-yramsz" aria-hidden="true"></div>'),ba=G('<span class="svelte-yramsz"> </span>'),zr=G('<div class="image-surface svelte-yramsz"><!></div>'),xr=G('<div class="svelte-yramsz"><!></div>'),wr=G('<div class="photo-grid-layer svelte-yramsz"></div>'),_r=G('<div class="grid-stage svelte-yramsz"><div class="photo-grid svelte-yramsz"><!> <div class="photo-grid-layer photo-grid-center svelte-yramsz"><div style="grid-column:3;grid-row:2;" class="svelte-yramsz"><!></div></div></div></div>'),Ur=G('<small class="svelte-yramsz"> </small>'),Fr=G('<section><!> <div class="classic-loader svelte-yramsz"><div class="name-row svelte-yramsz"><div class="name-half start svelte-yramsz"></div> <div class="image-slot svelte-yramsz"><div class="image-box svelte-yramsz"><div class="image-inner svelte-yramsz"></div></div></div> <div class="name-half end svelte-yramsz"></div></div></div> <!> <div class="bands-stage svelte-yramsz"><!> <div class="bands-mount svelte-yramsz"></div> <div class="bands-vignette svelte-yramsz" aria-hidden="true"></div> <div><p class="svelte-yramsz"> </p> <h3 class="svelte-yramsz"> </h3> <!> <button type="button" class="pres-cta-button svelte-yramsz"><span class="svelte-yramsz"> </span> <!></button> <div class="presentation-branding svelte-yramsz"><span class="svelte-yramsz"> </span> <img src="/icons/logo-optimized/logo-medium.webp" alt="2luv" class="svelte-yramsz"/></div></div></div></section>');const Cr={hash:"svelte-yramsz",code:`
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
  }.presentation-card.svelte-yramsz {position:relative;width:100%;height:100%;min-height:inherit;overflow:hidden;color:inherit;isolation:isolate;contain:layout paint;}.presentation-card.compact-view.svelte-yramsz .classic-loader:where(.svelte-yramsz) {min-height:100%;}.presentation-card.compact-view.svelte-yramsz .name-row:where(.svelte-yramsz) {font-size:clamp(2.6rem, 16cqw, 5.2rem);}.presentation-card.compact-view.svelte-yramsz .image-box:where(.svelte-yramsz) {width:112cqw;height:104cqh;}.presentation-card.compact-view.svelte-yramsz .photo-grid-layer:where(.svelte-yramsz) {gap:clamp(8px, 2.3cqw, 16px);}.presentation-card.compact-view.svelte-yramsz .photo-grid-layer:where(.svelte-yramsz) > div:where(.svelte-yramsz),
  .presentation-card.compact-view.svelte-yramsz .photo-grid-layer:where(.svelte-yramsz) .interactive-card-image {border-radius:clamp(6px, 1.3cqw, 12px);}.presentation-card.compact-view.svelte-yramsz :is(.bands-cta:where(.svelte-yramsz) h3:where(.svelte-yramsz), .birthday-cta-layer:where(.svelte-yramsz) h3:where(.svelte-yramsz)) {font-size:clamp(28px, 10cqw, 42px);}.presentation-card.compact-view.svelte-yramsz .birthday-stage:where(.svelte-yramsz) {max-width:100%;min-height:100%;padding:clamp(20px, 4.5cqh, 32px) clamp(16px, 5.5cqw, 24px);}.presentation-card.compact-view.svelte-yramsz .birthday-photo:where(.svelte-yramsz) {width:clamp(140px, 56cqw, 240px);height:clamp(126px, 50cqw, 216px);padding:clamp(8px, 2.4cqw, 10px) clamp(8px, 2.4cqw, 10px) clamp(24px, 9cqw, 44px);}.presentation-card.compact-view.svelte-yramsz .birthday-banner:where(.svelte-yramsz) {gap:clamp(6px, 1.8cqh, 8px);font-size:clamp(28px, 10cqw, 42px);}.presentation-card.compact-view.svelte-yramsz .birthday-banner:where(.svelte-yramsz) span:where(.svelte-yramsz) {padding:clamp(10px, 2.8cqh, 12px) clamp(14px, 5.5cqw, 20px);}.presentation-card.compact-view.svelte-yramsz .birthday-banner:where(.svelte-yramsz) span:where(.svelte-yramsz):nth-child(2) {margin-inline-start:clamp(14px, 6cqw, 24px);}.presentation-card.compact-view.svelte-yramsz .birthday-name:where(.svelte-yramsz) {margin-top:clamp(12px, 3.8cqh, 16px);font-size:clamp(18px, 6.5cqw, 28px);}.presentation-card.compact-view.svelte-yramsz .birthday-note:where(.svelte-yramsz) {max-width:86%;margin-top:clamp(16px, 4.5cqh, 22px);padding:clamp(18px, 4.8cqh, 26px) clamp(14px, 5cqw, 20px);font-size:clamp(15px, 4.6cqw, 18px);line-height:clamp(24px, 7.4cqw, 30px);}.presentation-card.compact-view.svelte-yramsz .birthday-paper-stage:where(.svelte-yramsz) {width:92%;max-width:440px;min-height:100%;}.presentation-card.compact-view.svelte-yramsz .bday-paper:where(.svelte-yramsz) {max-width:clamp(150px, 40cqw, 230px);padding:clamp(14px, 3.8cqw, 18px);}.presentation-card.compact-view.svelte-yramsz .bday-paper--title:where(.svelte-yramsz),
  .presentation-card.compact-view.svelte-yramsz .bday-paper--message:where(.svelte-yramsz) {min-width:min(58cqw, 230px);max-width:min(72cqw, 290px);padding:clamp(12px, 3.6cqh, 16px) clamp(16px, 6cqw, 24px);}.presentation-card.compact-view.svelte-yramsz .bday-paper-title:where(.svelte-yramsz) {font-size:clamp(28px, 9cqw, 36px);}.presentation-card.compact-view.svelte-yramsz .bday-paper-msg:where(.svelte-yramsz) {font-size:clamp(18px, 5.8cqw, 24px);}.presentation-card.compact-view.svelte-yramsz .bday-paper:where(.svelte-yramsz) .interactive-card-image {max-height:clamp(110px, 26cqh, 190px);}.classic.svelte-yramsz {--pres-bg: #f4f4f4;--pres-bg-revealed: #f4f0ea;--pres-border: rgba(0, 0, 0, 0.06);--pres-grid: rgba(0, 0, 0, 0.04);--pres-text: #201d1d;--pres-overlay-strong: rgba(244, 240, 234, 0.72);--pres-overlay-soft: rgba(244, 240, 234, 0.28);--pres-cta-text: #201d1d;--pres-cta-bg: rgba(0, 0, 0, 0.06);--pres-cta-bg-hover: rgba(0, 0, 0, 0.1);--pres-cta-border: rgba(0, 0, 0, 0.12);--pres-text-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);background:var(--pres-bg);box-shadow:inset 0 0 0 1px var(--pres-border);color:var(--pres-text);transition:background 1s ease;}.dark .classic.svelte-yramsz {--pres-bg: #0a0e1a;--pres-bg-revealed: #000;--pres-border: rgba(255, 255, 255, 0.05);--pres-grid: rgba(255, 255, 255, 0.06);--pres-text: #f4f4f4;--pres-overlay-strong: rgba(0, 0, 0, 0.55);--pres-overlay-soft: rgba(0, 0, 0, 0.25);--pres-cta-text: #fff;--pres-cta-bg: rgba(255, 255, 255, 0.1);--pres-cta-bg-hover: rgba(255, 255, 255, 0.15);--pres-cta-border: rgba(255, 255, 255, 0.2);--pres-text-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);}.classic.phase-bands.svelte-yramsz {background:var(--pres-bg-revealed);}.classic-grid-bg.svelte-yramsz {position:absolute;inset:0;background-image:linear-gradient(var(--pres-grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--pres-grid) 1px, transparent 1px);background-size:28px 28px;opacity:0.25;pointer-events:none;transition:opacity 700ms ease;}.phase-letters-in.svelte-yramsz .classic-grid-bg:where(.svelte-yramsz),
  .phase-image-grow.svelte-yramsz .classic-grid-bg:where(.svelte-yramsz),
  .phase-image-expand.svelte-yramsz .classic-grid-bg:where(.svelte-yramsz),
  .phase-grid.svelte-yramsz .classic-grid-bg:where(.svelte-yramsz) {opacity:0.1;}.classic-loader.svelte-yramsz {position:absolute;inset:0;z-index:18;display:flex;min-height:480px;align-items:center;justify-content:center;overflow:hidden;opacity:1;pointer-events:auto;transition:opacity 800ms ease;}.phase-grid.svelte-yramsz .classic-loader:where(.svelte-yramsz) {opacity:0;transition:opacity 300ms ease 1.6s;}.phase-bands.svelte-yramsz .classic-loader:where(.svelte-yramsz) {opacity:0;pointer-events:none;}.name-row.svelte-yramsz {--name-direction: 1;--name-shift: calc((var(--image-window-width) - 1.2em) / 2);position:absolute;inset:0;display:flex;width:100%;height:100%;align-items:center;justify-content:center;overflow:hidden;contain:layout paint;color:var(--pres-text);font-family:Georgia, "Times New Roman", serif;font-size:clamp(3.5rem, 10vw, 7rem);font-weight:500;line-height:0.82;white-space:nowrap;}.name-half.svelte-yramsz {display:flex;min-width:0;overflow:hidden;transition:transform var(--image-duration) var(--image-easing);will-change:transform;}.classic[dir='rtl'].svelte-yramsz .name-row:where(.svelte-yramsz) {--name-direction: -1;}.name-half.start.svelte-yramsz {justify-content:flex-end;transform:translateX(calc(-1 * var(--name-direction) * var(--name-shift)));}.name-half.end.svelte-yramsz {justify-content:flex-start;transform:translateX(calc(var(--name-direction) * var(--name-shift)));}.name-half.svelte-yramsz span:where(.svelte-yramsz) {display:block;white-space:pre;transform:translateY(120%);transition:transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) var(--d);will-change:transform;}.phase-letters-in.svelte-yramsz .name-half:where(.svelte-yramsz) span:where(.svelte-yramsz),
  .phase-image-grow.svelte-yramsz .name-half:where(.svelte-yramsz) span:where(.svelte-yramsz),
  .phase-image-expand.svelte-yramsz .name-half:where(.svelte-yramsz) span:where(.svelte-yramsz),
  .phase-grid.svelte-yramsz .name-half:where(.svelte-yramsz) span:where(.svelte-yramsz),
  .phase-bands.svelte-yramsz .name-half:where(.svelte-yramsz) span:where(.svelte-yramsz) {transform:translateY(0);}.image-slot.svelte-yramsz {position:relative;flex:0 0 auto;width:1.2em;height:0.92em;}.image-box.svelte-yramsz {position:absolute;top:50%;left:50%;width:110vw;height:100vh;transform:translate(calc(-50% + var(--image-center-offset)), -50%);overflow:hidden;clip-path:inset(calc((100% - var(--image-window-height)) / 2) calc((100% - var(--image-window-width)) / 2));transition:clip-path var(--image-duration) var(--image-easing), transform var(--image-duration) var(--image-easing);will-change:clip-path, transform;pointer-events:none;}.image-inner.svelte-yramsz {position:absolute;top:50%;left:50%;width:1.2em;height:0.92em;transform:translate(-50%, -50%);}.image-surface.svelte-yramsz {position:absolute;inset:0;}.image-inner.svelte-yramsz .interactive-card-image {position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;pointer-events:none;transform:scale(1);transition:opacity 300ms ease, transform var(--image-duration) var(--image-easing);will-change:transform;user-select:none;}.phase-image-expand.svelte-yramsz .image-inner:where(.svelte-yramsz) .interactive-card-image,
  .phase-grid.svelte-yramsz .image-inner:where(.svelte-yramsz) .interactive-card-image {transition:opacity 800ms ease, transform var(--image-duration) var(--image-easing);}.image-inner.svelte-yramsz .interactive-card-image.active {opacity:1;}.grid-stage.svelte-yramsz,
  .bands-stage.svelte-yramsz {position:absolute;inset:0;overflow:hidden;opacity:0;pointer-events:none;transition:opacity 800ms ease;}.grid-stage.svelte-yramsz {z-index:17;display:flex;align-items:center;justify-content:center;background:var(--pres-bg-revealed);}.phase-grid.svelte-yramsz .grid-stage:where(.svelte-yramsz) {opacity:1;pointer-events:auto;}.photo-grid.svelte-yramsz {position:relative;width:92%;max-width:1000px;aspect-ratio:5 / 3.5;}.photo-grid-layer.svelte-yramsz {position:absolute;inset:0;display:grid;grid-template-columns:repeat(5, 1fr);grid-template-rows:repeat(3, 1fr);gap:clamp(8px, 2.5vw, 20px);
    animation:
      svelte-yramsz-pres-layer-scale var(--layer-duration) var(--layer-easing) var(--layer-delay) both,
      svelte-yramsz-pres-layer-fade var(--layer-duration) cubic-bezier(0.61, 1, 0.88, 1) var(--layer-delay) both;}.photo-grid-center.svelte-yramsz {z-index:2;pointer-events:none;}.photo-grid-layer.svelte-yramsz > div:where(.svelte-yramsz) {overflow:hidden;border-radius:clamp(6px, 1.5vw, 16px);}.photo-grid-layer.svelte-yramsz .interactive-card-image {display:block;width:100%;aspect-ratio:4 / 5;border-radius:clamp(6px, 1.5vw, 16px);object-fit:cover;}.bands-stage.svelte-yramsz {z-index:15;background:var(--pres-bg-revealed);}.phase-bands.svelte-yramsz .bands-stage:where(.svelte-yramsz) {opacity:1;pointer-events:auto;}.bands-mount.svelte-yramsz,
  .bands-vignette.svelte-yramsz {position:absolute;inset:0;}.bands-vignette.svelte-yramsz {z-index:2;background:radial-gradient(ellipse at center, transparent 15%, var(--pres-overlay-strong) 100%);pointer-events:none;}.bands-cta.svelte-yramsz,
  .birthday-cta-layer.svelte-yramsz {position:absolute;inset:0;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;background:radial-gradient(ellipse at center, var(--pres-overlay-strong) 0%, var(--pres-overlay-soft) 60%, transparent 100%);text-align:center;opacity:0;pointer-events:none;transition:opacity 1.4s ease;}.bands-cta.visible.svelte-yramsz {opacity:1;}.bands-cta.svelte-yramsz p:where(.svelte-yramsz),
  .bands-cta.svelte-yramsz h3:where(.svelte-yramsz),
  .bands-cta.svelte-yramsz small:where(.svelte-yramsz),
  .birthday-cta-layer.svelte-yramsz p:where(.svelte-yramsz),
  .birthday-cta-layer.svelte-yramsz h3:where(.svelte-yramsz) {margin:0;color:var(--pres-cta-text);}.bands-cta.svelte-yramsz p:where(.svelte-yramsz),
  .birthday-cta-layer.svelte-yramsz p:where(.svelte-yramsz) {font-size:14px;font-weight:650;letter-spacing:0.25em;opacity:0.5;text-transform:uppercase;
    animation: svelte-yramsz-pres-cta-up 1s ease 0.2s both;}.bands-cta.svelte-yramsz h3:where(.svelte-yramsz),
  .birthday-cta-layer.svelte-yramsz h3:where(.svelte-yramsz) {margin-top:8px;font-size:clamp(38px, 7vw, 52px);font-weight:750;line-height:1.02;text-shadow:var(--pres-text-shadow);
    animation: svelte-yramsz-pres-cta-up 1s ease 0.4s both;}.bands-cta.svelte-yramsz small:where(.svelte-yramsz) {margin-top:10px;opacity:0.55;}.pres-cta-button.svelte-yramsz,
  .birthday-cta-layer.svelte-yramsz button:where(.svelte-yramsz) {display:inline-flex;min-height:44px;align-items:center;justify-content:center;gap:10px;border:1px solid var(--pres-cta-border);border-radius:999px;margin-top:24px;padding:0 24px;background:var(--pres-cta-bg);color:var(--pres-cta-text);cursor:pointer;font:inherit;font-size:13px;font-weight:650;letter-spacing:0;pointer-events:auto;transition:transform 200ms ease, background 200ms ease, opacity 200ms ease;
    animation: svelte-yramsz-pres-cta-up 1s ease 0.7s both;backdrop-filter:blur(12px);}.pres-cta-button.svelte-yramsz:hover,
  .birthday-cta-layer.svelte-yramsz button:where(.svelte-yramsz):hover {background:var(--pres-cta-bg-hover);}.pres-cta-button.svelte-yramsz:active,
  .birthday-cta-layer.svelte-yramsz button:where(.svelte-yramsz):active {transform:scale(0.95);}.pres-cta-button.svelte-yramsz:disabled,
  .birthday-cta-layer.svelte-yramsz button:where(.svelte-yramsz):disabled {opacity:0.7;pointer-events:none;transform:scale(0.95);}.pres-cta-button.svelte-yramsz svg:where(.svelte-yramsz),
  .birthday-cta-layer.svelte-yramsz svg:where(.svelte-yramsz) {opacity:0.7;
    animation: svelte-yramsz-pres-chevron-pulse 1.5s ease-in-out infinite;}.pres-cta-button.svelte-yramsz i:where(.svelte-yramsz),
  .birthday-cta-layer.svelte-yramsz i:where(.svelte-yramsz) {width:14px;height:14px;border:2px solid color-mix(in srgb, currentColor 30%, transparent);border-top-color:currentColor;border-radius:50%;
    animation: svelte-yramsz-pres-spin 800ms linear infinite;}.presentation-branding.svelte-yramsz {position:absolute;right:0;bottom:24px;left:0;display:flex;flex-direction:column;align-items:center;gap:6px;
    animation: svelte-yramsz-pres-cta-up 1s ease 1s both;}.presentation-branding.svelte-yramsz span:where(.svelte-yramsz) {color:currentColor;font-size:10px;font-weight:650;letter-spacing:0.2em;opacity:0.7;text-transform:uppercase;}.presentation-branding.svelte-yramsz img:where(.svelte-yramsz) {height:56px;width:auto;}.birthday.svelte-yramsz {background:#e8e4da;color:#1c0c5b;}.birthday-grid.svelte-yramsz {position:absolute;inset:0;background-color:#e8e4da;background-image:linear-gradient(rgba(0, 0, 100, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 100, 0.06) 1px, transparent 1px);background-size:20px 20px;}.birthday-canvas.svelte-yramsz {position:absolute;inset:0;z-index:30;width:100%;height:100%;pointer-events:none;}.birthday-entrance.svelte-yramsz {position:absolute;inset:0;z-index:3;display:flex;align-items:center;justify-content:center;opacity:1;transition:opacity 1s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1);}.is-papers.svelte-yramsz .birthday-entrance:where(.svelte-yramsz) {opacity:0;pointer-events:none;transform:translateY(18px) scale(0.94);}.birthday-stage.svelte-yramsz {position:relative;display:flex;width:100%;max-width:480px;min-height:480px;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;}.birthday-decoration.svelte-yramsz {position:absolute;z-index:2;opacity:0;pointer-events:none;}.birthday-decoration.bday-float.svelte-yramsz {
    animation:
      svelte-yramsz-bday-decor-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--decor-delay) both,
      svelte-yramsz-bday-float 1.9s ease-in-out var(--loop-delay) infinite;}.birthday-decoration.bday-float-delayed.svelte-yramsz {
    animation:
      svelte-yramsz-bday-decor-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--decor-delay) both,
      svelte-yramsz-bday-float 2.3s ease-in-out var(--loop-delay) infinite;}.birthday-decoration.bday-pulse.svelte-yramsz {
    animation:
      svelte-yramsz-bday-decor-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--decor-delay) both,
      svelte-yramsz-bday-pulse 1.3s ease-in-out var(--loop-delay) infinite;}.birthday-decoration.bday-spin.svelte-yramsz {
    animation:
      svelte-yramsz-bday-decor-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--decor-delay) both,
      svelte-yramsz-bday-spin 3s linear var(--loop-delay) infinite;}.birthday-decoration.bday-zoom.svelte-yramsz {
    animation:
      svelte-yramsz-bday-decor-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--decor-delay) both,
      svelte-yramsz-bday-zoom-left-in-out 1.75s ease-in-out var(--loop-delay) infinite;}.birthday-photo.svelte-yramsz {z-index:1;display:flex;width:220px;height:200px;align-items:center;justify-content:center;border-radius:4px;background:white;box-shadow:4px 4px 15px rgba(0, 0, 0, 0.15);margin-bottom:-20px;opacity:0;padding:8px 8px 40px;transform:rotate(-8deg) scale(0.6);}.birthday-photo.entered.svelte-yramsz {
    animation: svelte-yramsz-bday-photo-in 800ms cubic-bezier(0.34, 1.56, 0.64, 1) 200ms both;}.birthday-photo.svelte-yramsz .interactive-card-image {width:100%;height:100%;object-fit:cover;}.birthday-banner.svelte-yramsz {z-index:2;display:flex;flex-direction:column;align-items:baseline;gap:8px;margin-top:16px;font-family:"Abril Fatface", Georgia, serif;font-size:clamp(32px, 8vw, 42px);line-height:1;text-transform:uppercase;transform:rotate(-5deg);}.birthday-banner.svelte-yramsz span:where(.svelte-yramsz) {display:inline-flex;background:#1c0c5b;color:white;opacity:0;padding:12px 20px;transform:translateX(-40px);}.birthday-banner.svelte-yramsz span:where(.svelte-yramsz):nth-child(2) {margin-inline-start:24px;}.birthday-banner.svelte-yramsz span.entered:where(.svelte-yramsz) {
    animation: svelte-yramsz-bday-banner-in 600ms cubic-bezier(0.16, 1, 0.3, 1) 500ms both;}.birthday-banner.svelte-yramsz span:nth-child(2).entered:where(.svelte-yramsz) {animation-delay:700ms;}.birthday-name.svelte-yramsz {margin-top:16px;color:#1c0c5b;font-family:"Abril Fatface", Georgia, serif;font-size:clamp(20px, 5vw, 28px);letter-spacing:0.05em;opacity:0;text-align:center;transform:translateY(12px);}.birthday-name.entered.svelte-yramsz {
    animation: svelte-yramsz-bday-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 950ms both;}.birthday-note.svelte-yramsz {position:relative;max-width:85%;margin-top:20px;padding:28px 16px;background:repeating-linear-gradient(#f1ede9, #f1ede9 31px, #94acd4 31px, #94acd4 32px);box-shadow:4px 4px 15px rgba(0, 0, 0, 0.15);color:#333;font-family:"Shadows Into Light", "Comic Sans MS", cursive;font-size:18px;line-height:32px;opacity:0;text-align:center;transform:translateY(24px);}.birthday-note.entered.svelte-yramsz {
    animation: svelte-yramsz-bday-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 1150ms both;}.birthday-note.svelte-yramsz p:where(.svelte-yramsz) {margin:0;}.birthday-papers.svelte-yramsz {position:absolute;inset:0;z-index:4;display:flex;align-items:center;justify-content:center;overflow:hidden;}.birthday-paper-stage.svelte-yramsz {position:relative;width:90%;max-width:520px;height:100%;min-height:480px;}.bday-paper.svelte-yramsz {position:absolute;max-width:200px;padding:16px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='20' height='20' fill='%23f5f2eb'/%3E%3Cline x1='20' y1='0' x2='20' y2='20' stroke='%23c8d8e8' stroke-width='0.4'/%3E%3Cline x1='0' y1='20' x2='20' y2='20' stroke='%23c8d8e8' stroke-width='0.4'/%3E%3C/svg%3E");background-size:20px 20px;box-shadow:5px 8px 14px rgba(0, 0, 0, 0.35);opacity:0;transform:rotate(var(--rot));user-select:none;
    animation: svelte-yramsz-bday-paper-drop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay) both;}.bday-paper--title.svelte-yramsz,
  .bday-paper--message.svelte-yramsz {min-width:240px;max-width:340px;padding:14px 28px;z-index:2;}.bday-paper--title.svelte-yramsz {top:5%;right:5%;left:auto;}.bday-paper--image.svelte-yramsz {z-index:1;}.bday-paper.svelte-yramsz:nth-child(2) {top:25%;left:2%;}.bday-paper.svelte-yramsz:nth-child(3) {top:auto;bottom:10%;left:3%;}.bday-paper.svelte-yramsz:nth-child(4) {top:35%;right:2%;left:auto;}.bday-paper-title.svelte-yramsz,
  .bday-paper-msg.svelte-yramsz {margin:0;color:rgba(0, 0, 100, 0.75);font-family:"Zeyada", "Comic Sans MS", cursive;font-weight:600;white-space:pre-line;}.bday-paper-title.svelte-yramsz {font-size:36px;line-height:1.2;text-align:center;}.bday-paper-msg.svelte-yramsz {font-size:24px;line-height:1.4;}.bday-paper.svelte-yramsz .interactive-card-image {display:block;width:100%;max-height:160px;object-fit:cover;pointer-events:none;}.birthday-cta-layer.svelte-yramsz {--pres-cta-text: #1c0c5b;--pres-cta-bg: rgba(28, 12, 91, 0.08);--pres-cta-bg-hover: rgba(28, 12, 91, 0.12);--pres-cta-border: rgba(28, 12, 91, 0.2);--pres-text-shadow: 0 2px 12px rgba(28, 12, 91, 0.1);background:radial-gradient(ellipse at center, rgba(232, 228, 218, 0.92) 0%, rgba(232, 228, 218, 0.75) 60%, rgba(232, 228, 218, 0.5) 100%);color:#1c0c5b;opacity:1;backdrop-filter:blur(2px);
    animation: svelte-yramsz-bday-cta-up 1.2s ease 800ms both;}.birthday-cta-layer.svelte-yramsz h3:where(.svelte-yramsz) {font-family:"Abril Fatface", Georgia, serif;}

  @keyframes svelte-yramsz-pres-layer-scale {
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

  @keyframes svelte-yramsz-pres-layer-fade {
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

  @keyframes svelte-yramsz-pres-cta-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes svelte-yramsz-pres-chevron-pulse {
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

  @keyframes svelte-yramsz-pres-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes svelte-yramsz-bday-photo-in {
    from {
      opacity: 0;
      transform: rotate(-8deg) scale(0.6);
    }
    to {
      opacity: 1;
      transform: rotate(3deg) scale(1);
    }
  }

  @keyframes svelte-yramsz-bday-banner-in {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes svelte-yramsz-bday-fade-up {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes svelte-yramsz-bday-decor-pop {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes svelte-yramsz-bday-float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes svelte-yramsz-bday-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes svelte-yramsz-bday-zoom-left-in-out {
    0%,
    100% {
      transform: scale(0.95) rotate(2deg);
    }
    50% {
      transform: scale(1.05) rotate(-2deg);
    }
  }

  @keyframes svelte-yramsz-bday-pulse {
    0%,
    100% {
      transform: translateX(-50%) scale(0.9);
    }
    50% {
      transform: translateX(-50%) scale(1.05);
    }
  }

  @keyframes svelte-yramsz-bday-paper-drop {
    from {
      opacity: 0;
      margin-top: -40px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }

  @keyframes svelte-yramsz-bday-cta-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: 640px) {.birthday-photo.svelte-yramsz {width:300px;height:270px;padding:10px 10px 52px;}.birthday-banner.svelte-yramsz {font-size:52px;}.birthday-banner.svelte-yramsz span:where(.svelte-yramsz) {padding:14px 28px;}.birthday-banner.svelte-yramsz span:where(.svelte-yramsz):nth-child(2) {margin-inline-start:32px;}.birthday-name.svelte-yramsz {margin-top:20px;font-size:34px;}.birthday-note.svelte-yramsz {max-width:380px;margin-top:28px;padding:32px 24px;font-size:20px;line-height:34px;}.bday-paper.svelte-yramsz {max-width:320px;padding:20px;}.bday-paper--title.svelte-yramsz,
    .bday-paper--message.svelte-yramsz {min-width:300px;max-width:400px;padding:18px 36px;}.bday-paper--title.svelte-yramsz {top:5%;right:8%;}.bday-paper.svelte-yramsz:nth-child(2) {top:22%;left:4%;}.bday-paper.svelte-yramsz:nth-child(3) {bottom:8%;left:4%;}.bday-paper.svelte-yramsz:nth-child(4) {top:30%;right:4%;}.bday-paper-title.svelte-yramsz {font-size:42px;}.bday-paper-msg.svelte-yramsz {font-size:28px;}.bday-paper.svelte-yramsz .interactive-card-image {max-height:280px;}
  }

  @media (max-width: 720px) {.classic-loader.svelte-yramsz {min-height:460px;}.name-row.svelte-yramsz {font-size:clamp(3rem, 15vw, 5.4rem);}.bands-cta.svelte-yramsz,
    .birthday-cta-layer.svelte-yramsz {padding:24px;}.presentation-branding.svelte-yramsz {bottom:18px;}
  }

  @media (prefers-reduced-motion: reduce) {.name-half.svelte-yramsz,
    .name-half.svelte-yramsz span:where(.svelte-yramsz),
    .image-box.svelte-yramsz,
    .image-inner.svelte-yramsz,
    .grid-stage.svelte-yramsz,
    .bands-stage.svelte-yramsz,
    .bands-cta.svelte-yramsz,
    .birthday-entrance.svelte-yramsz,
    .pres-cta-button.svelte-yramsz,
    .birthday-cta-layer.svelte-yramsz button:where(.svelte-yramsz) {transition:none;}.image-inner.svelte-yramsz .interactive-card-image {transition:none;}
  }`};function Yr(D,g){Ka(g,!1),sr(D,Cr);const x=p(),q=p(),u=p(),E=p(),ie=p(),R=p(),N=p(),ye=p(),S=p(),oe=p(),Be=p(),Ae=p(),Ee=p(),Se=p(),Ge=p(),st=p(),$t=p(),Me=p(),Ft=p(),jt=p(),nt=p(),Ct=p(),it=p(),At=p(),Et=p(),St=p(),Mt=p();let K=$e(g,"card",8),Gt=$e(g,"definition",8,void 0),xa=$e(g,"dictionary",24,()=>({})),Vt=$e(g,"locale",8,"en"),bt=$e(g,"compact",8,!1),Zt=$e(g,"onAdvance",8,null),ze=$e(g,"initiallyVisible",8,!1);const wa="Marina",zt="/og-image-home.jpg",_a="We prepared something special",Jt="For {name}",Ua="Open my gift",Fa="An experience",Tt=nr(),Ca=[{cells:[[1,1],[5,1],[1,2],[5,2],[1,3],[5,3]],duration:2.5,delay:.5,easing:"cubic-bezier(0.42,0,0.58,1)"},{cells:[[2,1],[4,1],[2,2],[4,2],[2,3],[4,3]],duration:2.3,delay:.3,easing:"cubic-bezier(0.76,0,0.24,1)"},{cells:[[3,1],[3,3]],duration:2.1,delay:.1,easing:"cubic-bezier(0.87,0,0.13,1)"}],Aa="varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",Ea=`
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
}`,Kt=[{ox:0,spd:1,rot:-7*Math.PI/180,rt:1,crv:40,cd:1,sd:1},{ox:200,spd:1.3,rot:-26*Math.PI/180,rt:0,crv:30,cd:-1,sd:-1},{ox:400,spd:1.6,rot:18*Math.PI/180,rt:1,crv:20,cd:1,sd:1},{ox:-100,spd:.7,rot:47*Math.PI/180,rt:1,crv:55,cd:1,sd:-1},{ox:-200,spd:.4,rot:24*Math.PI/180,rt:1,crv:45,cd:1,sd:1}],Dt=120,Rt=100,It=20,Qt=3,ea=[.67,.75,1,1.33,.75,.56,1,.67],ta=["#f472b6","#fb7185","#c084fc","#818cf8","#34d399","#fbbf24","#60a5fa","#f9a8d4"],Sa=120,aa=90,Pe=1/60,Ma=[{char:"🎈",className:"bday-float",style:"top:8%;right:8%;font-size:48px;"},{char:"🎈",className:"bday-float-delayed",style:"top:12%;left:6%;font-size:36px;"},{char:"🎁",className:"bday-pulse",style:"top:5%;left:50%;font-size:32px;transform:translateX(-50%);"},{char:"✨",className:"bday-spin",style:"bottom:15%;left:8%;font-size:28px;"},{char:"🎉",className:"bday-zoom",style:"bottom:10%;right:10%;font-size:40px;"}];let le=p(),Ne=p(),Ve=p(),ot=p(),xt=p(),qt=p(),X=p(!1),wt=p(""),C=p(ze()?"image-grow":"idle"),xe=p("entrance"),we=p(ze()),lt=p(0),Ze=[],ct=null,se=p(!1),dt=0,mt=0,pt=null,vt=p(!1),me=p(null),pe=p(null),Je=p({}),Oe=null,yt=0,Te="",Ke=0,ht=null,De=null,_t=p(!1),Re=!1,Qe=!1,kt=null,Bt="";Ja(()=>{i(X,!0),i(wt,e(Me));const a=ir(e(le),r=>{Re=r.visible,Qe=r.reducedMotion,ma(),De?.(),oa()});return typeof ResizeObserver<"u"&&(Oe=new ResizeObserver(Pt)),sa(),window.addEventListener("resize",Pt),()=>{i(X,!1),a(),ra(),ca(),Ot(),Lt(),Yt(),window.cancelAnimationFrame(yt),window.removeEventListener("resize",Pt),Oe?.disconnect(),Oe=null}});function Ut(a){return a?.trim()??""}function Ta(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function Le(a,r){const s=a.split(".").reduce((l,o)=>{if(Ta(l)&&o in l)return l[o]},xa());return typeof s=="string"&&s.trim()?s:r}function Da(a){const r=new Set,s=[];for(const l of a){const o=l?.trim(),c=Ra(o);!o||!c||r.has(c)||(r.add(c),s.push(o))}return s}function Ra(a){return a?or(lr(a)):""}function ra(){Ze.forEach(clearTimeout),Ze=[]}function sa(){if(ra(),ca(),Ot(),Yt(),Lt(),i(lt,0),i(se,!1),i(vt,!1),i(me,null),Xt().then(()=>{e(X)&&(Oe?.disconnect(),Oe?.observe(e(le)),e(x)==="classic"&&(e(Ne)&&Oe?.observe(e(Ne)),e(Ve)&&Oe?.observe(e(Ve)),Nt(),e(u).forEach((a,r)=>{const s=e(ot)?.querySelector(`.presentation-image-${r}`);s?.complete&&ia(a,s)})))}),e(x)==="birthday"){i(we,ze()),i(xe,"entrance"),window.cancelAnimationFrame(yt),Ze=[setTimeout(()=>{i(we,!0)},100),setTimeout(()=>{i(xe,"confetti"),Ha()},600),setTimeout(()=>{i(xe,"papers")},4500)];return}i(C,ze()?"image-grow":"idle"),Ze=ze()?[setTimeout(()=>Ie("image-expand"),1600),setTimeout(()=>Ie("grid"),3600),setTimeout(()=>Ie("bands"),7300)]:[setTimeout(()=>Ie("letters-in"),800),setTimeout(()=>Ie("image-grow"),2e3),setTimeout(()=>Ie("image-expand"),3600),setTimeout(()=>Ie("grid"),5600),setTimeout(()=>Ie("bands"),9300)]}function Ie(a){i(C,a),a==="grid"?Xt().then(na):i(me,null),a==="bands"?(i(vt,!1),Ze=[...Ze,setTimeout(()=>{i(vt,!0)},3e3)]):i(vt,!1)}function na(){if(e(C)!=="grid"||!e(le))return;const a=e(le).clientWidth*.92,r=Math.min(20,Math.max(8,e(le).clientWidth*.025)),s=(a-4*r)/5,o=(a*(3.5/5)-2*r)/3;i(me,{w:s,h:o})}function Pt(){e(X)&&(Nt(),na())}function Nt(){if(e(x)!=="classic"||!e(Ve)||!e(ot)||!e(Ne))return;const a=getComputedStyle(e(ot)),r=getComputedStyle(e(Ve)),s=e(Ne).previousElementSibling,l=e(Ne).nextElementSibling,o=s?Number.parseFloat(getComputedStyle(s).width):0,c=l?Number.parseFloat(getComputedStyle(l).width):0,v={initial:{w:Number.parseFloat(a.width),h:Number.parseFloat(a.height)},expanded:{w:Number.parseFloat(r.width),h:Number.parseFloat(r.height)},centerOffset:(c-o)*.5};![v.initial.w,v.initial.h,v.expanded.w,v.expanded.h].every(b=>Number.isFinite(b)&&b>0)||!Number.isFinite(v.centerOffset)||e(pe)&&v.initial.w===e(pe).initial.w&&v.initial.h===e(pe).initial.h&&v.expanded.w===e(pe).expanded.w&&v.expanded.h===e(pe).expanded.h&&v.centerOffset===e(pe).centerOffset||i(pe,v)}function ia(a,r){if(!r.naturalWidth||!r.naturalHeight)return;const s={w:r.naturalWidth,h:r.naturalHeight};e(Je)[a]?.w===s.w&&e(Je)[a]?.h===s.h||i(Je,{...e(Je),[a]:s})}function Ia(a,r){!e(X)||!(r.currentTarget instanceof HTMLImageElement)||(Nt(),ia(a,r.currentTarget))}function oa(){if(!Re||Qe||e(C)!=="image-grow"||e(u).length<2){Ot();return}ct||(ct=setInterval(()=>{!e(X)||!Re||Qe||i(lt,(e(lt)+1)%e(u).length)},400))}function Ot(){ct&&(clearInterval(ct),ct=null)}function la(){if(e(se))return;const a=++dt;i(se,!0),De?.(),mt=requestAnimationFrame(()=>{!e(X)||a!==dt||(mt=requestAnimationFrame(()=>{mt=0,!(!e(X)||a!==dt)&&(Zt()?Zt()():e(le)?.dispatchEvent(new CustomEvent("icard-next",{bubbles:!0})))}))}),pt=setTimeout(()=>{!e(X)||a!==dt||(pt=null,i(se,!1),De?.())},1200)}function ca(){dt+=1,cancelAnimationFrame(mt),mt=0,pt!==null&&clearTimeout(pt),pt=null}function qa(a,r,s,l,o,c,v){const b=a&&l?`${l.w}px`:r?c?"112cqw":"110vw":s?"1.2em":"0px",t=a&&l?`${l.h}px`:r?c?"104cqh":"100vh":"0.92em",n=a?"1.8s":r?"2s":"1.3s",y=a?"cubic-bezier(0.65,0,0.35,1)":"cubic-bezier(0.16,1,0.3,1)",f=a||r?(o?.centerOffset??0)*(v?-1:1):0;return`--image-window-width:${b};--image-window-height:${t};--image-duration:${n};--image-easing:${y};--image-center-offset:${f}px;`}function ka(a,r,s,l,o){if(!r)return{surface:"",image:""};const c=s&&o?o:l?r.expanded:r.initial;if(!a)return{surface:"",image:`transform:scale(${Math.max(c.w/r.initial.w,c.h/r.initial.h)});`};const v=Math.min(r.initial.w/a.w,r.initial.h/a.h),b=Math.max(r.initial.w/a.w,r.initial.h/a.h),t=Math.max(c.w/a.w,c.h/a.h),n=b/v,y=t/b;return{surface:`transform:scale(${n});`,image:`object-fit:contain;transform:scale(${y});`}}function da(a,r){return(a||Jt).replace("{name}",r)}function Ba(a,r,s){const l=[{type:"title",text:`${e(St)} ${e(Mt)}
${r}!`,rot:-6},{type:"image",src:a[0]||zt,rot:-12}];return s.trim()&&l.push({type:"message",text:s,rot:7}),a[1]&&l.push({type:"image",src:a[1],rot:11}),l.slice(0,4)}function ma(){const a=e(x)==="classic"&&e(C)==="bands"?e(u).join("|"):"";a!==Te&&(a&&!Re||(Lt(),Te=a,a&&Pa(a)))}function Lt(){Ke+=1,ht?.(),ht=null,De=null,Te=""}async function Pa(a){const r=++Ke,s=e(xt);if(!s)return;let l;try{l=await Va(()=>import("./-MGUDD-H.js"),[],import.meta.url)}catch{e(X)&&r===Ke&&a===Te&&i(_t,!0);return}if(r!==Ke||a!==Te||e(xt)!==s)return;if(!Re){Te="";return}const o=e(u).slice(),c=new AbortController;let v=0,b=0,t=0,n=0,y=!0,f=null,M=null,ne=!0,V=!1,Q=0;const he=[],j=[],ee=[],ce=[],fe=()=>{if(!y)return;y=!1,Q+=1,c.abort(),cancelAnimationFrame(v),v=0,M?.disconnect();const te=O=>{try{O()}catch{}};j.forEach(O=>te(()=>O.dispose())),ee.forEach(O=>te(()=>O.dispose())),ce.forEach(O=>te(()=>O.dispose())),he.forEach(O=>te(O)),te(()=>f?.dispose()),te(()=>{f&&s.contains(f.domElement)&&s.removeChild(f.domElement)})};try{const te=new l.Scene,O=new l.OrthographicCamera(-1,1,1,-1,.1,10);O.position.z=1;const et=s.clientWidth<768;f=new l.WebGLRenderer({antialias:!et,alpha:!0,powerPreference:"low-power"}),ht=fe,i(_t,!1),f.setPixelRatio(Math.min(window.devicePixelRatio||1,et?1.25:2)),f.setSize(s.clientWidth,s.clientHeight),s.replaceChildren(f.domElement),o.forEach(z=>{const L=Tt?.retain?.(z,{src:z});L&&he.push(L)});const k=performance.now(),T=await mr(o,Tt,c.signal);if(!y||r!==Ke||a!==Te){fe();return}if(!T.length)throw new Error("Presentation images unavailable");o.forEach(z=>{const L=Tt?.retain?.(z,{src:z});L&&he.push(L)});const B=[7,12,8,13,15];Kt.forEach((z,L)=>{if(c.signal.aborted||performance.now()-k>=za)throw new Error("Presentation composition timed out");const Y=Na(T,B[L]??8),Z=new l.CanvasTexture(Y.canvas);ce.push(Z),Z.needsUpdate=!0;const qe=new l.ShaderMaterial({vertexShader:Aa,fragmentShader:Ea,uniforms:{uResolution:{value:new l.Vector2(s.clientWidth,s.clientHeight)},uTexture:{value:Z},uTextureHeight:{value:Y.totalH},uSequenceHeight:{value:Y.seqH},uBandWidth:{value:Dt},uScroll:{value:0},uSpeed:{value:z.spd},uScrollDirection:{value:z.sd},uOffsetX:{value:z.ox*(s.clientWidth/1200)},uRotation:{value:z.rot},uRotationType:{value:z.rt},uHasRotation:{value:z.rot!==0?1:0},uCurveAmount:{value:z.crv},uCurveDirection:{value:z.cd},uOpacity:{value:0}},transparent:!0,depthTest:!1,depthWrite:!1});j.push(qe);const m=new l.PlaneGeometry(2,2);ee.push(m);const U=new l.Mesh(m,qe);U.position.z=L*-.1,te.add(U)});const H=()=>{if(!y||!Re||!f||!ne)return;ne=!1;const z=s.clientWidth,L=s.clientHeight;f.setSize(z,L),j.forEach((Y,Z)=>{Y.uniforms.uResolution.value.set(z,L),Y.uniforms.uOffsetX.value=(Kt[Z]?.ox??0)*(z/1200)})},de=()=>{const z=Q;v=requestAnimationFrame(L=>ft(L,z))},ft=(z,L)=>{if(L!==Q||(v=0,!y||!e(X)||!Re||Qe||e(se)))return;const Y=n?Math.min(64,Math.max(0,z-n)):0;n=z,t+=Y,b+=Y*.12,H(),j.forEach((Z,qe)=>{Z.uniforms.uScroll.value=b,Z.uniforms.uOpacity.value=Math.min(1,Math.max(0,(t-qe*250)/500))}),f?.render(te,O),V=!1,de()};De=()=>{if(Q+=1,cancelAnimationFrame(v),v=0,n=0,!y||!e(X)||!Re||e(se)){V=!1;return}H(),Qe?V||(j.forEach(z=>{z.uniforms.uOpacity.value=1}),f?.render(te,O),V=!0):de()},typeof ResizeObserver<"u"&&(M=new ResizeObserver(()=>{y&&(ne=!0,V=!1,Qe&&De?.())}),M.observe(s)),De()}catch{y&&e(X)&&r===Ke&&a===Te&&i(_t,!0),fe(),ht===fe&&(ht=null,De=null)}}function Na(a,r){const s=[];let l=0;for(let t=0;t<r;t+=1){const n=Math.round(Rt/(ea[t%ea.length]??1));s.push(n),l+=n+It}l-=It;const o=l*Qt,c=document.createElement("canvas");c.width=Dt,c.height=o;const v=c.getContext("2d");if(!v)return{canvas:c,totalH:o,seqH:l};let b=0;for(let t=0;t<Qt;t+=1)for(let n=0;n<r;n+=1){const y=a[n%a.length]??a[0],f=Rt,M=s[n]??Rt,ne=(Dt-f)/2,V=y.width/y.height,Q=f/M;let he=0,j=0,ee=y.width,ce=y.height;V>Q?(ee=ce*Q,he=(y.width-ee)/2):(ce=ee/Q,j=(y.height-ce)/2),v.globalAlpha=.9,v.drawImage(y.source,he,j,ee,ce,ne,b,f,M),b+=M+It}return{canvas:c,totalH:o,seqH:l}}function Oa(a,r){const s=a/r-1;return s*s*s+1}function La(a,r,s,l,o){const c=1-o;return{x:c*c*c*a.x+3*c*c*o*r.x+3*c*o*o*s.x+o*o*o*l.x,y:c*c*c*a.y+3*c*c*o*r.y+3*c*o*o*s.y+o*o*o*l.y}}function Ya(a,r){const s=a<768,l=s?80:180,o=s?1:1.4,c=s?1:1.3;return Array.from({length:l},()=>{const v=a*(.1+Math.random()*.8),b=r*(.1+Math.random()*.4),t=(Math.random()-.5)*a*.8;return{p0:{x:v,y:r+10},p1:{x:v+t*.3,y:r*.5},p2:{x:v+t*.7,y:b},p3:{x:v+t,y:b},time:0,dur:.8+Math.random()*.6,fallTime:0,vy:0,drift:(Math.random()-.5)*35*c,sway1Amp:(40+Math.random()*50)*c,sway1Freq:1.2+Math.random()*1.5,sway2Amp:15+Math.random()*25,sway2Freq:2.8+Math.random()*2.5,swayPhase:Math.random()*Math.PI*2,spinSpeed:(Math.random()-.5)*6,falling:!1,color:ta[Math.floor(Math.random()*ta.length)]??"#f472b6",w:8*o,h:6*o,x:v,y:r+10,r:0,sy:1,done:!1}})}function Ha(){const a=e(qt);if(!a)return;const r=a.clientWidth||320,s=a.clientHeight||460,l=Math.min(window.devicePixelRatio||1,2);a.width=r*l,a.height=s*l;const o=a.getContext("2d");if(!o)return;o.setTransform(l,0,0,l,0,0);const c=Ya(r,s);cancelAnimationFrame(yt);const v=()=>{o.clearRect(0,0,r,s);let b=!0;for(const t of c)if(!t.done){if(b=!1,t.falling){t.fallTime+=Pe;const n=Math.min(1,t.fallTime*1.2);t.vy=Math.min(aa,t.vy+Sa*n*Pe),t.y+=t.vy*Pe;const y=t.fallTime*Math.PI*2,f=Math.sin(y*t.sway1Freq+t.swayPhase)*t.sway1Amp,M=Math.sin(y*t.sway2Freq+t.swayPhase*1.7)*t.sway2Amp;t.x+=(t.drift+(f+M)*(.6+t.vy/aa*.4))*Pe;const ne=Math.cos(y*t.sway1Freq+t.swayPhase);t.r+=(t.spinSpeed+ne*1.5)*Pe,t.sy=Math.cos(y*t.sway2Freq*.8+t.swayPhase),t.y>s+20&&(t.done=!0)}else{const n=t.x,y=t.y;t.time=Math.min(t.dur,t.time+Pe);const f=Oa(t.time,t.dur),M=La(t.p0,t.p1,t.p2,t.p3,f);t.r=Math.atan2(M.y-y,M.x-n)+Math.PI*.5,t.sy=Math.sin(Math.PI*f*10),t.x=M.x,t.y=M.y,t.time>=t.dur&&(t.falling=!0,t.vy=0,t.fallTime=0)}o.save(),o.translate(t.x,t.y),o.rotate(t.r),o.scale(1,t.sy),o.fillStyle=t.color,o.fillRect(-t.w*.5,-t.h*.5,t.w,t.h),o.restore()}b||(yt=requestAnimationFrame(v))};yt=requestAnimationFrame(v)}function Wa(){const a=e(x)==="birthday"&&e(xe)==="papers"?`${e(Me)}:papers`:"";a!==Bt&&(Yt(),Bt=a,a&&Xt().then(Xa))}function Yt(){kt?.(),kt=null,Bt=""}function Xa(){if(!e(le)||e(xe)!=="papers")return;const r=Array.from(e(le).querySelectorAll(".bday-paper")).map(t=>{const n=Number.parseFloat(t.dataset.rotation||"0"),y=t.dataset.calm==="true",f=y?.15:.35;return{el:t,baseRot:n,rot:n,phase:Math.random()*Math.PI*2,wx:0,wy:0,targetX:0,targetY:0,targetRot:n,prevX:0,prevY:0,prevRot:n,wanderT:0,wanderDur:y?8+Math.random()*4:4+Math.random()*4,floatAmpY:(2+Math.random()*3)*f,floatFreqY:.35+Math.random()*.2,floatAmpRot:(.6+Math.random()*.8)*f,floatFreqRot:.25+Math.random()*.15,wanderScale:f,rotRange:y?4:20}}),s=t=>{const n=t.el.parentElement;if(!n)return;const y=Math.max(0,(n.clientWidth-t.el.offsetWidth)/2-20),f=Math.max(0,(n.clientHeight-t.el.offsetHeight)/2-20);t.prevX=t.wx,t.prevY=t.wy,t.prevRot=t.rot,t.targetX=(Math.random()-.5)*y*2*t.wanderScale,t.targetY=(Math.random()-.5)*f*2*t.wanderScale,t.targetRot=t.baseRot+(Math.random()-.5)*t.rotRange,t.wanderT=0,t.wanderDur=t.wanderScale<1?8+Math.random()*4:4+Math.random()*4};r.forEach(s);const l=performance.now();let o=0,c=!0;const v=t=>t<.5?2*t*t:1-(-2*t+2)**2/2,b=()=>{if(c){if(!e(se)){const t=(performance.now()-l)/1e3;r.forEach(n=>{n.wanderT+=Pe;const y=Math.min(1,n.wanderT/n.wanderDur),f=v(y);n.wx=n.prevX+(n.targetX-n.prevX)*f,n.wy=n.prevY+(n.targetY-n.prevY)*f,n.rot=n.prevRot+(n.targetRot-n.prevRot)*f,y>=1&&s(n);const M=Math.sin(t*n.floatFreqY*Math.PI*2+n.phase)*n.floatAmpY,ne=Math.sin(t*n.floatFreqRot*Math.PI*2+n.phase*1.3)*n.floatAmpRot;n.el.style.transform=`translate(${n.wx}px, ${n.wy+M}px) rotate(${n.rot+ne}deg)`})}o=requestAnimationFrame(b)}};o=requestAnimationFrame(b),kt=()=>{c=!1,cancelAnimationFrame(o)}}w(()=>Fe(K()),()=>{i(x,K().presentationTheme==="birthday"?"birthday":"classic")}),w(()=>Fe(K()),()=>{i(q,Da([K().presentationData?.imageSrc,...K().presentationData?.images??[]]))}),w(()=>e(q),()=>{i(u,e(q).length?e(q):[zt])}),w(()=>Fe(Vt()),()=>{i(E,Vt()==="ar")}),w(()=>Fe(Gt()),()=>{i(ie,Le("interactiveCards.presets.birthday.demo.presentation.name",Gt()?.label||wa))}),w(()=>(Fe(K()),e(ie)),()=>{i(R,Ut(K().presentationData?.name)||Ut(K().title)||e(ie))}),w(()=>Fe(K()),()=>{i(N,Ut(K().body))}),w(()=>Fe(K()),()=>{i(ye,Ut(K().presentationData?.senderName))}),w(()=>e(R),()=>{i(S,Math.ceil(e(R).length/2))}),w(()=>(e(R),e(S)),()=>{i(oe,e(R).slice(0,e(S)))}),w(()=>(e(R),e(S)),()=>{i(Be,e(R).slice(e(S)))}),w(()=>e(C),()=>{i(Ae,e(C)==="image-grow"||e(C)==="image-expand"||e(C)==="grid"||e(C)==="bands")}),w(()=>(e(C),e(me)),()=>{i(Ee,e(C)==="image-expand"||e(C)==="grid"&&!e(me))}),w(()=>(e(C),e(me)),()=>{i(Se,e(C)==="grid"&&!!e(me))}),w(()=>(e(Ae),e(lt),e(u)),()=>{i(Ge,e(Ae)?e(lt)%e(u).length:0)}),w(()=>(e(u),e(Ge)),()=>{i(st,e(u)[e(Ge)]??zt)}),w(()=>(e(u),e(R),e(N)),()=>{i($t,Ba(e(u),e(R),e(N)))}),w(()=>(Fe(K()),e(x),e(R),e(N),e(ye),e(u)),()=>{i(Me,JSON.stringify({id:K().id,theme:e(x),name:e(R),message:e(N),senderName:e(ye),images:e(u)}))}),w(()=>(e(x),e(C),e(xe),e(Me)),()=>{i(Ft,`${e(x)}:${e(C)}:${e(xe)}:${e(Me)}`)}),w(()=>(e(Se),e(Ee),e(Ae),e(me),e(pe),Fe(bt()),e(E)),()=>{i(jt,qa(e(Se),e(Ee),e(Ae),e(me),e(pe),bt(),e(E)))}),w(()=>(e(u),e(Je),e(pe),e(Se),e(Ee),e(me)),()=>{i(nt,e(u).map(a=>ka(e(Je)[a],e(pe),e(Se),e(Ee),e(me))))}),w(()=>{},()=>{i(Ct,Le("interactiveCards.config.presentation.ctaText1",_a))}),w(()=>{},()=>{i(it,Le("interactiveCards.config.presentation.ctaText2",Jt))}),w(()=>{},()=>{i(At,Le("interactiveCards.config.presentation.ctaButton",Ua))}),w(()=>{},()=>{i(Et,Le("interactiveCards.config.presentation.brandingText",Fa))}),w(()=>{},()=>{i(St,Le("interactiveCards.presets.birthday.banner.line1","Happy"))}),w(()=>{},()=>{i(Mt,Le("interactiveCards.presets.birthday.banner.line2","Birthday"))}),w(()=>(e(X),e(Me),e(wt)),()=>{e(X)&&e(Me)!==e(wt)&&(i(wt,e(Me)),sa())}),w(()=>(e(X),e(Ft)),()=>{e(X)&&e(Ft)&&(oa(),ma(),Wa())}),Qa(),Za();var pa=er(),$a=tr(pa);{var ja=a=>{var r=gr();let s;var l=h(r);Xe(l,k=>i(qt,k),()=>e(qt));var o=F(l,4),c=h(o),v=h(c);He(v,1,()=>Ma,We,(k,T,B)=>{var H=pr(),de=h(H,!0);d(H),J(()=>{be(H,1,(e(we),e(T),A(()=>`birthday-decoration ${e(we)?e(T).className:""}`)),"svelte-yramsz"),ke(H,(e(T),A(()=>`${e(T).style}--decor-delay:${1.4+B*.15}s;--loop-delay:${1.9+B*.15}s;`))),W(de,(e(T),A(()=>e(T).char)))}),I(k,H)});var b=F(v,2);let t;var n=h(b);{let k=Ye(()=>(e(u),A(()=>e(u)[0]??zt))),T=Ye(()=>ze()?"eager":"lazy"),B=Ye(()=>ze()?"high":void 0);rt(n,{get src(){return e(k)},alt:"",get loading(){return e(T)},get fetchPriority(){return e(B)}})}d(b);var y=F(b,2),f=h(y);let M;var ne=h(f,!0);d(f);var V=F(f,2);let Q;var he=h(V,!0);d(V),d(y);var j=F(y,2);let ee;var ce=h(j,!0);d(j);var fe=F(j,2);{var te=k=>{var T=vr();let B;var H=h(T),de=h(H,!0);d(H),d(T),J(()=>{B=be(T,1,"birthday-note svelte-yramsz",null,B,{entered:e(we)}),W(de,e(N))}),I(k,T)};ge(fe,k=>{e(N)&&k(te)})}d(c),d(o);var O=F(o,2);{var et=k=>{var T=ur(),B=h(T);He(B,5,()=>e($t),We,(ae,_,ue)=>{var _e=fr(),at=h(_e);{var Ht=re=>{rt(re,{get src(){return e(_),A(()=>e(_).src)},alt:"",loading:"lazy"})},ut=re=>{var Ue=yr(),gt=h(Ue,!0);d(Ue),J(()=>W(gt,(e(_),A(()=>e(_).text)))),I(re,Ue)},Wt=re=>{var Ue=hr(),gt=h(Ue,!0);d(Ue),J(()=>W(gt,(e(_),A(()=>e(_).text)))),I(re,Ue)};ge(at,re=>{e(_),A(()=>e(_).type==="image"&&e(_).src)?re(Ht):(e(_),A(()=>e(_).type==="title")?re(ut,1):re(Wt,-1))})}d(_e),J(()=>{be(_e,1,(e(_),A(()=>`bday-paper bday-paper--${e(_).type}`)),"svelte-yramsz"),Ce(_e,"data-rotation",(e(_),A(()=>e(_).rot))),Ce(_e,"data-calm",(e(_),A(()=>e(_).type!=="image"))),ke(_e,(e(_),A(()=>`--rot:${e(_).rot}deg;--delay:${.15+ue*.12}s;`)))}),I(ae,_e)}),d(B);var H=F(B,2),de=h(H),ft=h(de,!0);d(de);var z=F(de,2),L=h(z,!0);d(z);var Y=F(z,2),Z=h(Y),qe=h(Z,!0);d(Z);var m=F(Z,2);{var U=ae=>{var _=ua();I(ae,_)},$=ae=>{var _=ga();I(ae,_)};ge(m,ae=>{e(se)?ae(U):ae($,-1)})}d(Y);var P=F(Y,2),ve=h(P),tt=h(ve,!0);d(ve),va(2),d(P),d(H),d(T),J(ae=>{W(ft,e(Ct)),W(L,ae),Y.disabled=e(se),Ce(Y,"aria-busy",e(se)),W(qe,e(At)),W(tt,e(Et))},[()=>(e(it),e(R),A(()=>da(e(it),e(R))))]),ya("click",Y,la),I(k,T)};ge(O,k=>{e(xe)==="papers"&&k(et)})}d(r),Xe(r,k=>i(le,k),()=>e(le)),J(()=>{s=be(r,1,"presentation-card birthday svelte-yramsz",null,s,{"compact-view":bt(),"is-papers":e(xe)==="papers"}),Ce(r,"dir",e(E)?"rtl":"ltr"),t=be(b,1,"birthday-photo svelte-yramsz",null,t,{entered:e(we)}),M=be(f,1,"svelte-yramsz",null,M,{entered:e(we)}),W(ne,e(St)),Q=be(V,1,"svelte-yramsz",null,Q,{entered:e(we)}),W(he,e(Mt)),ee=be(j,1,"birthday-name svelte-yramsz",null,ee,{entered:e(we)}),W(ce,e(R)),r.dir=r.dir}),I(a,r)},Ga=a=>{var r=Fr();let s;var l=h(r);{var o=m=>{var U=br();I(m,U)};ge(l,m=>{e(C)!=="bands"&&m(o)})}var c=F(l,2),v=h(c),b=h(v);He(b,5,()=>(e(oe),A(()=>e(oe).split(""))),We,(m,U,$)=>{var P=ba();ke(P,`--d:${$*.06}s`);var ve=h(P,!0);d(P),J(()=>W(ve,e(U))),I(m,P)}),d(b);var t=F(b,2),n=h(t),y=h(n);He(y,5,()=>e(u),We,(m,U,$)=>{var P=zr(),ve=h(P);{let tt=Ye(()=>`presentation-image-${$} ${$===e(Ge)?"active":""}`),ae=Ye(()=>ze()&&$===e(Ge)?"eager":"lazy"),_=Ye(()=>ze()&&$===e(Ge)?"high":void 0);rt(ve,{get className(){return e(tt)},get style(){return e(nt),A(()=>e(nt)[$].image)},get src(){return e(U)},alt:"",get loading(){return e(ae)},get fetchPriority(){return e(_)},onLoad:ue=>Ia(e(U),ue)})}d(P),J(()=>ke(P,(e(nt),A(()=>e(nt)[$].surface)))),I(m,P)}),d(y),Xe(y,m=>i(ot,m),()=>e(ot)),d(n),Xe(n,m=>i(Ve,m),()=>e(Ve)),d(t),Xe(t,m=>i(Ne,m),()=>e(Ne));var f=F(t,2);He(f,5,()=>(e(Be),A(()=>e(Be).split(""))),We,(m,U,$)=>{var P=ba(),ve=h(P,!0);d(P),J(()=>{ke(P,(e(oe),A(()=>`--d:${(e(oe).length+$)*.06}s`))),W(ve,e(U))}),I(m,P)}),d(f),d(v),d(c);var M=F(c,2);{var ne=m=>{var U=_r(),$=h(U),P=h($);He(P,1,()=>Ca,We,(_,ue,_e)=>{var at=wr();He(at,5,()=>(e(ue),A(()=>e(ue).cells)),We,(Ht,ut,Wt)=>{var re=xr(),Ue=h(re);{let gt=Ye(()=>(e(u),e(st),A(()=>e(u)[(_e*6+Wt+1)%e(u).length]??e(st))));rt(Ue,{get src(){return e(gt)},alt:"",loading:"lazy"})}d(re),J(()=>ke(re,(e(ut),A(()=>`grid-column:${e(ut)[0]};grid-row:${e(ut)[1]};`)))),I(Ht,re)}),d(at),J(()=>ke(at,(e(ue),A(()=>`--layer-duration:${e(ue).duration}s;--layer-delay:${e(ue).delay}s;--layer-easing:${e(ue).easing};`)))),I(_,at)});var ve=F(P,2),tt=h(ve),ae=h(tt);rt(ae,{get src(){return e(st)},alt:"",loading:"lazy"}),d(tt),d(ve),d($),d(U),J(()=>Ce(U,"aria-hidden",e(C)!=="grid")),I(m,U)};ge(M,m=>{(e(C)==="grid"||e(C)==="bands")&&m(ne)})}var V=F(M,2),Q=h(V);{var he=m=>{rt(m,{className:"bands-fallback",style:"position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.4;",get src(){return e(st)},alt:"",loading:"lazy"})};ge(Q,m=>{e(_t)&&m(he)})}var j=F(Q,2);Xe(j,m=>i(xt,m),()=>e(xt));var ee=F(j,4);let ce;var fe=h(ee),te=h(fe,!0);d(fe);var O=F(fe,2),et=h(O,!0);d(O);var k=F(O,2);{var T=m=>{var U=Ur(),$=h(U,!0);d(U),J(()=>W($,e(ye))),I(m,U)};ge(k,m=>{e(ye)&&m(T)})}var B=F(k,2),H=h(B),de=h(H,!0);d(H);var ft=F(H,2);{var z=m=>{var U=ua();I(m,U)},L=m=>{var U=ga();I(m,U)};ge(ft,m=>{e(se)?m(z):m(L,-1)})}d(B);var Y=F(B,2),Z=h(Y),qe=h(Z,!0);d(Z),va(2),d(Y),d(ee),d(V),d(r),Xe(r,m=>i(le,m),()=>e(le)),J(m=>{s=be(r,1,`presentation-card classic phase-${e(C)}`,"svelte-yramsz",s,{"compact-view":bt()}),Ce(r,"dir",e(E)?"rtl":"ltr"),Ce(c,"aria-hidden",e(C)==="bands"),ke(v,e(jt)),Ce(V,"aria-hidden",e(C)!=="bands"),ce=be(ee,1,"bands-cta svelte-yramsz",null,ce,{visible:e(vt)}),W(te,e(Ct)),W(et,m),B.disabled=e(se),Ce(B,"aria-busy",e(se)),W(de,e(At)),W(qe,e(Et)),r.dir=r.dir},[()=>(e(it),e(R),A(()=>da(e(it),e(R))))]),ya("click",B,la),I(a,r)};ge($a,a=>{e(x)==="birthday"?a(ja):a(Ga,-1)})}I(D,pa),ar()}export{Yr as default};
