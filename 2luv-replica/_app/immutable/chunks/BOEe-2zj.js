const S=["letter","cards"],j=Object.freeze({background:"#fffafc",surface:"#ffe4ee",ink:"#24131f",muted:"#6f5a69",accent:"#c2185b",accentInk:"#ffffff",paper:"#ffffff",paperInk:"#2a1626",border:"#efc3d4",displayFont:"Georgia, serif",bodyFont:"system-ui, sans-serif",radius:"16px"}),T=new Set(["en","pt","es","fr","de","ar","ja","ko","ru","ms","zh","zh-tw"]);function k(t){const n=(t??"").trim().toLowerCase().replace(/^giftcontent/,"");return n==="halloween"||n==="christmas"||n==="party"||n==="bloom"?n:null}function L(t){if(t.preview||!t.shareableLink||!/^[a-zA-Z0-9_-]{1,128}$/.test(t.shareableLink)||!T.has(t.lang))return null;const n=t.target==="cards"?"cards":"letter";try{const s=new URL(t.origin);return!["http:","https:"].includes(s.protocol)||s.username||s.password?null:new URL(`/${t.lang}/${n}/${encodeURIComponent(t.shareableLink)}?actions=0`,s.origin).href}catch{return null}}function A(t,n,s,i){const r=new URL(i),[,R,b,y]=r.pathname.split("/"),g=S.find(e=>e===b);if(!g||i!==r.href||L({origin:r.origin,lang:R,shareableLink:y,target:g})!==r.href||r.search!=="?actions=0"||r.hash||r.pathname.split("/").length!==4||r.username||r.password)throw new Error("invalid_public_gift_url");const h=new TextEncoder,d=[],l=[0];let a=0;const o=e=>{const f=typeof e=="string"?h.encode(e):e;d.push(f),a+=f.length},c=(e,f)=>{l[e]=a,o(`${e} 0 obj
${f}
endobj
`)};o(`%PDF-1.4
`),c(1,"<< /Type /Catalog /Pages 2 0 R >>"),c(2,"<< /Type /Pages /Kids [3 0 R] /Count 1 >>"),c(3,"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /QrPage 4 0 R >> >> /Contents 5 0 R /Annots [6 0 R] >>"),l[4]=a,o(`4 0 obj
<< /Type /XObject /Subtype /Image /Width ${n} /Height ${s} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${t.length} >>
stream
`),o(t),o(`
endstream
endobj
`);const p=`q 595.28 0 0 841.89 0 0 cm /QrPage Do Q
`;c(5,`<< /Length ${h.encode(p).length} >>
stream
${p}endstream`);const $=i.replace(/[\\()]/g,"\\$&");c(6,`<< /Type /Annot /Subtype /Link /Rect [40 40 555 800] /Border [0 0 0] /A << /S /URI /URI (${$}) >> >>`);const w=a;o(`xref
0 7
0000000000 65535 f 
`);for(let e=1;e<=6;e++)o(`${String(l[e]).padStart(10,"0")} 00000 n 
`);o(`trailer
<< /Size 7 /Root 1 0 R >>
startxref
${w}
%%EOF
`);const u=new Uint8Array(a);let m=0;for(const e of d)u.set(e,m),m+=e.length;return u}export{j as E,k as g,A as j,L as p};
