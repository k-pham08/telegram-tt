(()=>{"use strict";const e="tt-media-progressive",t="tt-assets";"undefined"!=typeof window&&window.innerHeight,Math.round(425),new Set(["newMessage","newScheduledMessage","deleteMessages","deleteScheduledMessages","deleteHistory"]),new Set(["image/png","image/gif","image/jpeg","video/mp4","video/avi","video/quicktime"]);const s=524288,n=new Map;var a,i;self.addEventListener("message",(e=>{const{type:t,messageId:s,result:a}=e.data;if("partResponse"===t){const e=n.get(s);e&&e.resolve(a)}})),(i=a||(a={})).True="1",i.False="0";let o=(new Date).valueOf();const r=new Set,c={};function d(e){return e.custom.from_id?parseInt(e.custom.from_id,10):e.custom.chat_id?-1*parseInt(e.custom.chat_id,10):e.custom.channel_id?-1*parseInt(e.custom.channel_id,10):void 0}function l(e){if(e.custom.msg_id)return parseInt(e.custom.msg_id,10)}async function u(e){const t=(await self.clients.matchAll({type:"window"})).filter((e=>e.url===self.registration.scope)),s=t[0];s&&0!==t.length&&s.postMessage({type:"playNotificationSound",payload:{id:e}})}function f({chatId:e,messageId:t,body:s,title:n,icon:a}){const i=(new Date).valueOf()-o<1e3,r={body:s,data:{chatId:e,messageId:t,count:1},icon:a||"icon-192x192.png",badge:"icon-192x192.png",tag:String(i?0:e||0),vibrate:[200,100,200]};return Promise.all([u(t||e||0),self.registration.showNotification(n,r)])}async function g(e,t){const{chatId:s,messageId:n}=t;if(s){e.postMessage({type:"focusMessage",payload:{chatId:s,messageId:n}});try{await e.focus()}catch(e){}}}self.onsync=()=>{o=(new Date).valueOf()};const p=/[0-9a-f]{20}.*\.(js|css|woff2?|svg|png|jpg|jpeg|json|wasm)$/;self.addEventListener("install",(e=>{e.waitUntil(self.skipWaiting())})),self.addEventListener("activate",(e=>{e.waitUntil(self.caches.delete(t)),e.waitUntil(self.clients.claim())})),self.addEventListener("fetch",(a=>{const{url:i}=a.request;return i.includes("/progressive/")?(a.respondWith(async function(t){const{url:a}=t.request,i=t.request.headers.get("range"),o=/^bytes=(\d+)-(\d+)?$/g.exec(i||""),r=Number(o[1]);let c=Number(o[2]);if((!c||c-r+1>s)&&(c=r+s-1),0===r&&1===c){const e=t.request.url.match(/fileSize=(\d+)&mimeType=([\w/]+)/),s=e&&Number(e[1]),n=e&&e[2];if(s&&n)return new Response(new Uint8Array(2).buffer,{status:206,statusText:"Partial Content",headers:[["Content-Range",`bytes 0-1/${s}`],["Accept-Ranges","bytes"],["Content-Length","2"],["Content-Type",n]]})}const d=`${a}?start=${r}&end=${c}`,[l,u]=await async function(t){const s=await self.caches.open(e);return Promise.all([s.match(`${t}&type=arrayBuffer`).then((e=>e?e.arrayBuffer():void 0)),s.match(`${t}&type=headers`).then((e=>e?e.json():void 0))])}(d);if(l)return new Response(l,{status:206,statusText:"Partial Content",headers:u});let f;try{f=await async function(e,t){if(!e.clientId)return;const s=await self.clients.get(e.clientId);if(!s)return;const a=(e=>{let t;do{t=String(Math.random()).replace("0.","id")}while(e.hasOwnProperty(t));return t})(n),i={},o=Promise.race([(r=6e4,new Promise((e=>{setTimeout((()=>e()),r)}))).then((()=>Promise.reject(new Error("ERROR_PART_TIMEOUT")))),new Promise(((e,t)=>{Object.assign(i,{resolve:e,reject:t})}))]);var r;return n.set(a,i),o.catch((()=>{})).finally((()=>{n.delete(a)})),s.postMessage({type:"requestPart",messageId:a,params:t}),o}(t,{url:a,start:r,end:c})}catch(e){}if(!f)return new Response("",{status:500,statusText:"Failed to fetch progressive part"});const{arrayBuffer:g,fullSize:p,mimeType:m}=f,w=Math.min(c-r+1,g.byteLength);c=r+w-1;const h=g.slice(0,w),y=[["Content-Range",`bytes ${r}-${c}/${p}`],["Accept-Ranges","bytes"],["Content-Length",String(w)],["Content-Type",m]];return w<=524288&&c<2097151&&async function(t,s,n){const a=await self.caches.open(e);Promise.all([a.put(new Request(`${t}&type=arrayBuffer`),new Response(s)),a.put(new Request(`${t}&type=headers`),new Response(JSON.stringify(n)))])}(d,h,y),new Response(h,{status:206,statusText:"Partial Content",headers:y})}(a)),!0):!(!i.startsWith("http")||!i.match(p)||(a.respondWith(async function(e){const s=await self.caches.open(t),n=await s.match(e.request);if(n)return n;const a=await fetch(e.request);return s.put(e.request,a.clone()),a}(a)),0))})),self.addEventListener("push",(function(e){const t=function(e){try{return e.data.json()}catch(e){return}}(e);if(!t||t.mute===a.True)return;const s=function(e){return{chatId:d(e),messageId:l(e),title:e.title||"Telegram WebZ",body:e.description}}(t);r.has(s.messageId)?r.delete(s.messageId):e.waitUntil(f(s))})),self.addEventListener("notificationclick",(function(e){const t=new URL(self.registration.scope).origin;e.notification.close();const{data:s}=e.notification;e.waitUntil((async()=>{const e=(await self.clients.matchAll({type:"window"})).filter((e=>new URL(e.url).origin===t));if(await Promise.all(e.map((e=>(c[e.id]=s,g(e,s))))),self.clients.openWindow&&!(e.length>0)){c[0]=s;try{const e=await self.clients.openWindow(t);e&&(c[e.id]=s)}catch(e){}}})())})),self.addEventListener("message",(function(e){if(!e.data)return;const t=e.source;if("clientReady"===e.data.type){const s=c[t.id]||c[0];s&&(delete c[t.id],delete c[0],e.waitUntil(g(t,s)))}if("newMessageNotification"===e.data.type){const t=e.data.payload;r.add(t.messageId),e.waitUntil(f(t))}"closeMessageNotifications"===e.data.type&&e.waitUntil(async function({chatId:e,lastReadInboxMessageId:t}){const s=await self.registration.getNotifications(),n=t||Number.MAX_VALUE;s.forEach((t=>{("0"===t.tag||t.data.chatId===e&&t.data.messageId<=n)&&t.close()}))}(e.data.payload))}))})();
//# sourceMappingURL=524.3e36769947bddb999a2f.js.map