import{p as S,n as q,v as _,R as l,A as c,x as v,O as x,m as h,M as f,y as b,D as g}from"./x-yhwoFgYm.js";var w=g('<div class="shootingStar svelte-1hq8g88"></div>'),O=g('<div class="shootingStarContainer svelte-1hq8g88"></div>'),A=g('<div class="shootingStars svelte-1hq8g88" aria-hidden="true"></div>');const C={hash:"svelte-1hq8g88",code:`.shootingStars.svelte-1hq8g88 {position:absolute;inset:0;z-index:1;overflow:hidden;border-radius:inherit;contain:paint;pointer-events:none;}.shootingStarContainer.svelte-1hq8g88 {position:absolute;top:0;left:-10%;z-index:10;width:112%;height:130%;pointer-events:none;transform:rotate(var(--shooting-star-container-rotation));transform-origin:46% 50%;}.shootingStar.svelte-1hq8g88 {position:absolute;top:var(--shooting-star-top);left:var(--shooting-star-left);width:0;height:1px;background:linear-gradient(-70deg, rgba(255,235,235,1), rgba(0,0,0,1));opacity:var(--shooting-star-opacity);
    animation: svelte-1hq8g88-shootingFrames var(--shooting-star-duration) ease-in-out var(--shooting-star-delay);will-change:transform, width;}

  @keyframes svelte-1hq8g88-shootingFrames {
    0% {
      width: 0;
      transform: translateX(0);
    }

    30% {
      width: 200px;
    }

    100% {
      width: 0;
      transform: translateX(var(--shooting-star-travel));
    }
  }

  @media (prefers-reduced-motion: reduce) {.shootingStar.svelte-1hq8g88 {
      animation: none;opacity:0;}
  }`};function R(d,m){S(m,!1),q(d,C);const u=[{id:"container-1",style:e({"--shooting-star-container-rotation":"39deg"}),stars:[s("c1-1","-12%","7%","0.6s","2.4s","0.78","842px"),s("c1-2","0%","15%","8.4s","4.2s","0.46","876px"),s("c1-3","14%","4%","15.2s","3s","0.84","816px"),s("c1-4","27%","26%","22.8s","5s","0.52","894px"),s("c1-5","-7%","38%","29.6s","3.8s","0.66","858px"),s("c1-6","9%","51%","36.2s","2.2s","0.38","827px"),s("c1-7","31%","43%","43.8s","4.6s","0.72","881px"),s("c1-8","-15%","64%","49.4s","3.5s","0.48","809px"),s("c1-9","3%","78%","55.8s","4.4s","0.59","867px"),s("c1-10","20%","91%","60.2s","2.7s","0.82","839px")]},{id:"container-2",style:e({"--shooting-star-container-rotation":"44deg"}),stars:[s("c2-1","-14%","19%","3.8s","3.9s","0.62","872px"),s("c2-2","-2%","2%","10.6s","2s","0.4","818px"),s("c2-3","11%","31%","17.4s","4.9s","0.86","899px"),s("c2-4","25%","11%","24.2s","2.8s","0.54","833px"),s("c2-5","-9%","47%","31.8s","5.2s","0.68","885px"),s("c2-6","6%","63%","38.6s","3.2s","0.44","811px"),s("c2-7","29%","55%","45.2s","4.5s","0.76","861px"),s("c2-8","-5%","72%","51.6s","2.3s","0.5","824px"),s("c2-9","17%","87%","56.4s","5.4s","0.7","892px"),s("c2-10","32%","41%","59.2s","3.4s","0.57","846px")]},{id:"container-3",style:e({"--shooting-star-container-rotation":"36deg"}),stars:[s("c3-1","-6%","9%","5.2s","4.3s","0.74","888px"),s("c3-2","8%","22%","12.8s","2.5s","0.49","821px"),s("c3-3","22%","6%","19.6s","5.1s","0.88","874px"),s("c3-4","-16%","35%","26.4s","3.1s","0.42","807px"),s("c3-5","1%","54%","33.2s","4.8s","0.64","896px"),s("c3-6","16%","44%","40.8s","2.1s","0.55","829px"),s("c3-7","30%","68%","47.2s","4.5s","0.8","870px"),s("c3-8","-10%","82%","52.8s","2.9s","0.46","815px"),s("c3-9","11%","95%","57.6s","4.1s","0.69","854px"),s("c3-10","26%","74%","60s","3.6s","0.6","883px")]}];function s(o,n,t,a,p,r,y){return{id:o,style:e({"--shooting-star-left":n,"--shooting-star-top":t,"--shooting-star-delay":a,"--shooting-star-duration":p,"--shooting-star-opacity":r,"--shooting-star-travel":y})}}function e(o){return Object.entries(o).map(([n,t])=>`${n}:${t}`).join(";")}_();var i=A();l(i,5,()=>u,o=>o.id,(o,n)=>{var t=O();l(t,5,()=>c(n).stars,a=>a.id,(a,p)=>{var r=w();v(()=>x(r,c(p).style)),h(a,r)}),f(t),v(()=>x(t,c(n).style)),h(o,t)}),f(i),h(d,i),b()}export{R as S};
