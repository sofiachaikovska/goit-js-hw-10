import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as n}from"./assets/vendor-77e16229.js";document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".form");t.addEventListener("submit",function(o){o.preventDefault();const i=t.elements.delay,r=t.elements.state,s=parseInt(i.value,10),m=r.value;t.reset(),new Promise((e,l)=>{setTimeout(()=>{m==="fulfilled"?e(s):l(s)},s)}).then(e=>{n.success({title:"Fulfilled Promise",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{n.error({title:"Rejected Promise",message:`❌ Rejected promise in ${e}ms`})})})});
//# sourceMappingURL=commonHelpers2.js.map