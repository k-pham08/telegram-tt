"use strict";(self.webpackChunktelegram_t=self.webpackChunktelegram_t||[]).push([[3103],{13103:(e,n,t)=>{t.d(n,{Z:()=>v});var o=t(60748),r=t(517),c=t(46752),a=t(98069),s=t(18674),l=t(25190),i=t(31212),d=t(72645),u=t(59107),m=t(46590),f=t(231),p=t(62898);const v=e=>{let{dialogRef:n,title:t,className:v,isOpen:E,isSlim:h,header:Z,hasCloseButton:k,noBackdrop:b,noBackdropClose:g,children:y,style:w,onClose:P,onCloseAnimationEnd:C,onEnter:N,shouldSkipHistoryAnimations:L}=e;const{shouldRender:A,transitionClassNames:B}=(0,i.Z)(E,C,L,void 0,L),D=(0,o.sO)(null);(0,o.d4)((()=>{if(E)return(0,a.l_)(),a.In}),[E]);const O=(0,l.Z)((e=>!!N&&(e.preventDefault(),N(),!0)));(0,o.d4)((()=>E?(0,r.Z)({onEsc:P,onEnter:O}):void 0),[E,P,O]),(0,o.d4)((()=>E&&D.current?function(e){function n(n){if("Tab"!==n.key)return;n.preventDefault(),n.stopPropagation();const t=Array.from(e.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));if(!t.length)return;const o=t.findIndex((e=>e.isSameNode(document.activeElement)));let r=0;o>=0&&(r=n.shiftKey?o>0?o-1:t.length-1:o<t.length-1?o+1:0),t[r].focus()}return document.addEventListener("keydown",n,!1),()=>{document.removeEventListener("keydown",n,!1)}}(D.current):void 0),[E]),(0,m.Z)({isActive:E,onBack:P}),(0,d.Z)((e=>{let[n]=e;return document.body.classList.toggle("has-open-dialog",Boolean(E)),(E||!E&&void 0!==n)&&(0,s.YW)(200),()=>{document.body.classList.remove("has-open-dialog")}}),[E]);const x=(0,u.Z)();if(!A)return;const I=(0,c.Z)("Modal",v,B,b&&"transparent-backdrop",h&&"slim");return o.ZP.createElement(p.Z,null,o.ZP.createElement("div",{ref:D,className:I,tabIndex:-1,role:"dialog"},o.ZP.createElement("div",{className:"modal-container"},o.ZP.createElement("div",{className:"modal-backdrop",onClick:g?void 0:P}),o.ZP.createElement("div",{className:"modal-dialog",ref:n},Z||(t?o.ZP.createElement("div",{className:"modal-header"},k&&o.ZP.createElement(f.Z,{round:!0,color:"translucent",size:"smaller",ariaLabel:x("Close"),onClick:P},o.ZP.createElement("i",{className:"icon icon-close"})),o.ZP.createElement("div",{className:"modal-title"},t)):void 0),o.ZP.createElement("div",{className:"modal-content custom-scroll",style:w},y)))))}},62898:(e,n,t)=>{t.d(n,{Z:()=>c});var o=t(60748),r=t(31664);const c=e=>{let{containerId:n,className:t,children:c}=e;const a=(0,o.sO)();return a.current||(a.current=document.createElement("div")),(0,o.bt)((()=>{const e=document.querySelector(n||"#portals");if(!e)return;const o=a.current;return t&&o.classList.add(t),e.appendChild(o),()=>{r.ZP.render(void 0,o),e.removeChild(o)}}),[t,n]),r.ZP.render(c,a.current)}},72645:(e,n,t)=>{t.d(n,{Z:()=>r});var o=t(60748);const r=(e,n,t)=>{const r=(0,o.sO)();return(0,o.bt)((()=>{const t=r.current;return r.current=n,e(t||[])}),n,t)}},517:(e,n,t)=>{t.d(n,{Z:()=>c});const o={Enter:"onEnter",Backspace:"onBackspace",Delete:"onDelete",Esc:"onEsc",Escape:"onEsc",ArrowUp:"onUp",ArrowDown:"onDown",ArrowLeft:"onLeft",ArrowRight:"onRight",Tab:"onTab"},r={onEnter:[],onDelete:[],onBackspace:[],onEsc:[],onUp:[],onDown:[],onLeft:[],onRight:[],onTab:[]};function c(e){return a()||document.addEventListener("keydown",s,!0),Object.keys(e).forEach((n=>{const t=e[n];if(!t)return;const o=r[n];o&&o.push(t)})),()=>{!function(e){Object.keys(e).forEach((n=>{const t=e[n],o=r[n];if(o){const e=o.findIndex((e=>e===t));-1!==e&&o.splice(e,1)}})),a()||document.removeEventListener("keydown",s,!1)}(e)}}function a(){return Object.values(r).some((e=>Boolean(e.length)))}function s(e){const n=o[e.key];if(!n)return;const{length:t}=r[n];if(t)for(let o=t-1;o>=0;o--)if(!1!==(0,r[n][o])(e)){e.stopPropagation();break}}},98069:(e,n,t)=>{t.d(n,{In:()=>c,l_:()=>r,wT:()=>a});let o=0;function r(){o+=1}function c(){o-=1}function a(){return o>0}}}]);
//# sourceMappingURL=3103.9702fdb001acc04d4d12.js.map