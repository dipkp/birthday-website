import{p as D,n as T,o as p,t as l,z as d,C as o,A as e,u as B,v as F,G as H,M,x as S,P as _,m as j,y as q,F as c,D as A}from"./x-yhwoFgYm.js";var G=A('<section class="blank-card svelte-1gxzf2"><iframe sandbox="allow-scripts" referrerpolicy="no-referrer" class="svelte-1gxzf2"></iframe></section>');const I={hash:"svelte-1gxzf2",code:".blank-card.svelte-1gxzf2 {position:relative;display:grid;min-height:inherit;overflow:hidden;background:linear-gradient(180deg, hsl(var(--icard-bg-start, 230 15% 12%)), hsl(var(--icard-bg-mid, 230 14% 16%)), hsl(var(--icard-bg-end, 230 15% 10%)));}iframe.svelte-1gxzf2 {width:100%;min-height:inherit;border:0;background:transparent;}"};function P(b,i){D(i,!1),T(b,I);const m=c(),f=c(),r=c(),u=c();let t=p(i,"card",8),y=p(i,"definition",8,void 0),w=p(i,"dictionary",24,()=>({}));function z(a,n){const g=a.split(".").reduce((s,k)=>{if(s&&typeof s=="object"&&k in s)return s[k]},w());return typeof g=="string"&&g.trim()?g:n}function v(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function C(a,n){return n?`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    *{box-sizing:border-box}
    html,body{margin:0;min-height:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#1e1b4b}
    body{display:grid;place-items:center;padding:32px;background:linear-gradient(135deg,#fdf2f8,#ede9fe)}
    main{max-width:560px;text-align:center}
    h1{margin:0 0 12px;font-size:clamp(1.6rem,7vw,3rem);line-height:1.05}
    p{margin:0;font-size:clamp(1rem,3vw,1.25rem);line-height:1.65;color:rgba(30,27,75,.72)}
  </style>
</head>
<body>
  <main>
    <h1>${v(a)}</h1>
    <p>${v(n)}</p>
  </main>
</body>
</html>`:'<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;min-height:100%;background:transparent}</style></head><body></body></html>'}l(()=>o(t()),()=>{d(m,t().blankData?.htmlContent?.trim()??"")}),l(()=>o(t()),()=>{d(f,t().body?.trim()??"")}),l(()=>(o(t()),o(y())),()=>{d(r,t().title||z("interactiveCards.cards.blank.defaultTitle",y()?.label||"Custom HTML"))}),l(()=>(e(m),e(r),e(f)),()=>{d(u,e(m)||C(e(r),e(f)))}),B(),F();var h=G(),x=H(h);M(h),S(()=>{_(x,"title",e(r)),_(x,"srcdoc",e(u))}),j(b,h),q()}export{P as default};
