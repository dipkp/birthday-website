import"./DsnmJJEf.js";import{i as z}from"./MUDqykI0.js";import{p as B,l,s as o,d,g as e,e as D,o as H,r as F,t as M,k as S,c as j,m,v as q}from"./DxC0FJX8.js";import{a as I}from"./T2VlFwLk.js";import{s as _}from"./CI31nQ7a.js";import{p as g}from"./BpeeFNrX.js";var L=q('<section class="blank-card svelte-m4fkux"><iframe sandbox="allow-scripts" referrerpolicy="no-referrer" class="svelte-m4fkux"></iframe></section>');const U={hash:"svelte-m4fkux",code:".blank-card.svelte-m4fkux {position:relative;display:grid;min-height:inherit;overflow:hidden;background:linear-gradient(180deg, hsl(var(--icard-bg-start, 230 15% 12%)), hsl(var(--icard-bg-mid, 230 14% 16%)), hsl(var(--icard-bg-end, 230 15% 10%)));}iframe.svelte-m4fkux {width:100%;min-height:inherit;border:0;background:transparent;}"};function O(b,i){B(i,!1),I(b,U);const c=m(),f=m(),r=m(),u=m();let t=g(i,"card",8),y=g(i,"definition",8,void 0),w=g(i,"dictionary",24,()=>({}));function C(a,n){const h=a.split(".").reduce((s,x)=>{if(s&&typeof s=="object"&&x in s)return s[x]},w());return typeof h=="string"&&h.trim()?h:n}function v(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function T(a,n){return n?`<!doctype html>
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
</html>`:'<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;min-height:100%;background:transparent}</style></head><body></body></html>'}l(()=>d(t()),()=>{o(c,t().blankData?.htmlContent?.trim()??"")}),l(()=>d(t()),()=>{o(f,t().body?.trim()??"")}),l(()=>(d(t()),d(y())),()=>{o(r,t().title||C("interactiveCards.cards.blank.defaultTitle",y()?.label||"Custom HTML"))}),l(()=>(e(c),e(r),e(f)),()=>{o(u,e(c)||T(e(r),e(f)))}),D(),z();var p=L(),k=H(p);F(p),M(()=>{_(k,"title",e(r)),_(k,"srcdoc",e(u))}),S(b,p),j()}export{O as default};
