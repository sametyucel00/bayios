System.register(["./index-legacy.js"],function(e,t){"use strict";var n,r,i,s,o;return{setters:[e=>{n=e.R,r=e.C,i=e.r,s=e.j,o=e._}],execute:function(){e({o:Yd,q:ip});const a=e=>{let t;const n=new Set,r=(e,r)=>{const i="function"==typeof e?e(t):e;if(!Object.is(i,t)){const e=t;t=(null!=r?r:"object"!=typeof i||null===i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,s={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,s);return s},c=e=>e,l=e=>{const t=(e=>e?a(e):a)(e),r=e=>function(e,t=c){const r=n.useSyncExternalStore(e.subscribe,n.useCallback(()=>t(e.getState()),[e,t]),n.useCallback(()=>t(e.getInitialState()),[e,t]));return n.useDebugValue(r),r}(t,e);return Object.assign(r,t),r};function u(e,t){let n;try{n=e()}catch(i){return}const r={getItem:e=>{var t;const r=e=>null===e?null:JSON.parse(e,void 0),i=null!=(t=n.getItem(e))?t:null;return i instanceof Promise?i.then(r):r(i)},setItem:(e,t)=>n.setItem(e,JSON.stringify(t,void 0)),removeItem:e=>n.removeItem(e)};return r}const h=e=>t=>{try{const n=e(t);return n instanceof Promise?n:{then:e=>h(e)(n),catch(e){return this}}}catch(n){return{then(e){return this},catch:e=>h(e)(n)}}},d=(e,t)=>(n,r,i)=>{let s={storage:u(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},o=!1,a=0;const c=new Set,l=new Set;let d=s.storage;if(!d)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),n(...e)},r,i);const f=()=>{const e=s.partialize({...r()});return d.setItem(s.name,{state:e,version:s.version})},p=i.setState;i.setState=(e,t)=>(p(e,t),f());const m=e((...e)=>(n(...e),f()),r,i);let g;i.getInitialState=()=>m;const y=()=>{var e,t;if(!d)return;const i=++a;o=!1,c.forEach(e=>{var t;return e(null!=(t=r())?t:m)});const u=(null==(t=s.onRehydrateStorage)?void 0:t.call(s,null!=(e=r())?e:m))||void 0;return h(d.getItem.bind(d))(s.name).then(e=>{if(e){if("number"!=typeof e.version||e.version===s.version)return[!1,e.state];if(s.migrate){const t=s.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}return[!1,void 0]}).then(e=>{var t;if(i!==a)return;const[o,c]=e;return g=s.merge(c,null!=(t=r())?t:m),n(g,!0),o?f():void 0}).then(()=>{i===a&&(null==u||u(g,void 0),g=r(),o=!0,l.forEach(e=>e(g)))}).catch(e=>{i===a&&(null==u||u(void 0,e))})};return i.persist={setOptions:e=>{s={...s,...e},e.storage&&(d=e.storage)},clearStorage:()=>{null==d||d.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>y(),hasHydrated:()=>o,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(l.add(e),()=>{l.delete(e)})},s.skipHydration||y(),g||m};var f={};
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const p="${JSCORE_VERSION}",m=function(e,t){if(!e)throw g(t)},g=function(e){return new Error("Firebase Database ("+p+") INTERNAL ASSERT FAILED: "+e)},y=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],s=i+1<e.length,o=s?e[i+1]:0,a=i+2<e.length,c=a?e[i+2]:0,l=t>>2,u=(3&t)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,s||(h=64)),r.push(n[l],n[u],n[h],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(y(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(s>>10)),t[r++]=String.fromCharCode(56320+(1023&s))}else{const s=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],s=i<e.length?n[e.charAt(i)]:0;++i;const o=i<e.length?n[e.charAt(i)]:64;++i;const a=i<e.length?n[e.charAt(i)]:64;if(++i,null==t||null==s||null==o||null==a)throw new w;const c=t<<2|s>>4;if(r.push(c),64!==o){const e=s<<4&240|o>>2;if(r.push(e),64!==a){const e=o<<6&192|a;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class w extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const v=function(e){const t=y(e);return _.encodeByteArray(t,!0)},b=function(e){return v(e).replace(/\./g,"")},x=function(e){try{return _.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
function I(e){return C(void 0,e)}function C(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&T(n)&&(e[n]=C(e[n],t[n]));return e}function T(e){return"__proto__"!==e}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function S(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const E=()=>{try{return S().__FIREBASE_DEFAULTS__||(()=>{if("undefined"==typeof process)return;const e=f.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&x(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},k=e=>{const t=(e=>E()?.emulatorHosts?.[e])(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},N=()=>E()?.config;
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class A{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
       * @license
       * Copyright 2025 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function D(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function P(e){return(await fetch(e,{credentials:"include"})).ok}
/**
       * @license
       * Copyright 2021 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function R(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const s={iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...e};return[b(JSON.stringify({alg:"none",type:"JWT"})),b(JSON.stringify(s)),""].join(".")}const O={};let M=!1;function L(e,t){if("undefined"==typeof window||"undefined"==typeof document||!D(window.location.host)||O[e]===t||O[e]||M)return;function n(e){return`__firebase__banner__${e}`}O[e]=t;const r="__firebase__banner",i=function(){const e={prod:[],emulator:[]};for(const t of Object.keys(O))O[t]?e.emulator.push(t):e.prod.push(t);return e}().prod.length>0;function s(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{M=!0,function(){const e=document.getElementById(r);e&&e.remove()}()},e}function o(){const e=function(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}(r),t=n("text"),o=document.getElementById(t)||document.createElement("span"),a=n("learnmore"),c=document.getElementById(a)||document.createElement("a"),l=n("preprendIcon"),u=document.getElementById(l)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;!function(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}(t),function(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}(c,a);const n=s();!function(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}(u,l),t.append(u,o,c,n),document.body.appendChild(t)}i?(o.innerText="Preview backend disconnected.",u.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(u.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',o.innerText="Preview backend running in this workspace."),o.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",o):o()}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function F(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function j(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(F())}function V(){const e=E()?.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(t){return!1}}function q(){return!V()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function U(){return!V()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function z(){try{return"object"==typeof indexedDB}catch(e){return!1}}function B(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(Ap){t(Ap)}})}class K extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,K.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,$.prototype.create)}}class ${constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?function(e,t){return e.replace(G,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}(i,n):"Error",o=`${this.serviceName}: ${s} (${r}).`;return new K(r,o,n)}}const G=/\{\$([^}]+)}/g;
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function H(e){return JSON.parse(e)}function W(e){return JSON.stringify(e)}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Y=function(e){let t={},n={},r={},i="";try{const s=e.split(".");t=H(x(s[0])||""),n=H(x(s[1])||""),i=s[2],r=n.d||{},delete n.d}catch(s){}return{header:t,claims:n,data:r,signature:i}};
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
function Q(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function J(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0}function X(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function Z(e,t,n){const r={};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=t.call(n,e[i],i,e));return r}function ee(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],s=t[i];if(te(n)&&te(s)){if(!ee(n,s))return!1}else if(n!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function te(e){return null!==e&&"object"==typeof e}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class ne{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const n=this.W_;if("string"==typeof e)for(let u=0;u<16;u++)n[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)n[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const e=n[u-3]^n[u-8]^n[u-14]^n[u-16];n[u]=4294967295&(e<<1|e>>>31)}let r,i,s=this.chain_[0],o=this.chain_[1],a=this.chain_[2],c=this.chain_[3],l=this.chain_[4];for(let u=0;u<80;u++){u<40?u<20?(r=c^o&(a^c),i=1518500249):(r=o^a^c,i=1859775393):u<60?(r=o&a|c&(o|a),i=2400959708):(r=o^a^c,i=3395469782);const e=(s<<5|s>>>27)+r+l+i+n[u]&4294967295;l=c,c=a,a=4294967295&(o<<30|o>>>2),o=s,s=e}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(null==e)return;void 0===t&&(t=e.length);const n=t-this.blockSize;let r=0;const i=this.buf_;let s=this.inbuf_;for(;r<t;){if(0===s)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if("string"==typeof e){for(;r<t;)if(i[s]=e.charCodeAt(r),++s,++r,s===this.blockSize){this.compress_(i),s=0;break}}else for(;r<t;)if(i[s]=e[r],++s,++r,s===this.blockSize){this.compress_(i),s=0;break}}this.inbuf_=s,this.total_+=t}digest(){const e=[];let t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=255&t,t/=256;this.compress_(this.buf_);let n=0;for(let r=0;r<5;r++)for(let t=24;t>=0;t-=8)e[n]=this.chain_[r]>>t&255,++n;return e}}function re(e,t){return`${e} failed: ${t} argument `}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const ie=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.charCodeAt(n);r<128?t++:r<2048?t+=2:r>=55296&&r<=56319?(t+=4,n++):t+=3}return t};
/**
       * @license
       * Copyright 2021 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
function se(e){return e&&e._delegate?e._delegate:e}class oe{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const ae="[DEFAULT]";
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class ce{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new A;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(n)return null;throw r}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e))try{this.getOrInitializeService({instanceIdentifier:ae})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(e=ae){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=ae){return this.instances.has(e)}getOptions(e=ae){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,s]of this.instancesDeferred.entries())n===this.normalizeInstanceIdentifier(i)&&s.resolve(r);return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===ae?void 0:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}var r;return n||null}normalizeInstanceIdentifier(e=ae){return this.component?this.component.multipleInstances?e:ae:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class le{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ce(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */var ue;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(ue||(ue={}));const he={debug:ue.DEBUG,verbose:ue.VERBOSE,info:ue.INFO,warn:ue.WARN,error:ue.ERROR,silent:ue.SILENT},de=ue.INFO,fe={[ue.DEBUG]:"log",[ue.VERBOSE]:"log",[ue.INFO]:"info",[ue.WARN]:"warn",[ue.ERROR]:"error"},pe=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=fe[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class me{constructor(e){this.name=e,this._logLevel=de,this._logHandler=pe,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ue))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?he[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ue.DEBUG,...e),this._logHandler(this,ue.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ue.VERBOSE,...e),this._logHandler(this,ue.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ue.INFO,...e),this._logHandler(this,ue.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ue.WARN,...e),this._logHandler(this,ue.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ue.ERROR,...e),this._logHandler(this,ue.ERROR,...e)}}let ge,ye;const _e=new WeakMap,we=new WeakMap,ve=new WeakMap,be=new WeakMap,xe=new WeakMap;let Ie={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return we.get(e);if("objectStoreNames"===t)return e.objectStoreNames||ve.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Se(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Ce(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(ye||(ye=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(Ee(this),t),Se(_e.get(this))}:function(...t){return Se(e.apply(Ee(this),t))}:function(t,...n){const r=e.call(Ee(this),t,...n);return ve.set(r,t.sort?t.sort():[t]),Se(r)}}function Te(e){return"function"==typeof e?Ce(e):(e instanceof IDBTransaction&&function(e){if(we.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});we.set(e,t)}(e),t=e,(ge||(ge=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,Ie):e);var t}function Se(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(Se(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&_e.set(t,e)}).catch(()=>{}),xe.set(t,e),t}(e);if(be.has(e))return be.get(e);const t=Te(e);return t!==e&&(be.set(e,t),xe.set(t,e)),t}const Ee=e=>xe.get(e);function ke(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(e,t),a=Se(o);return r&&o.addEventListener("upgradeneeded",e=>{r(Se(o.result),e.oldVersion,e.newVersion,Se(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}function Ne(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",e=>t(e.oldVersion,e)),Se(n).then(()=>{})}const Ae=["get","getKey","getAll","getAllKeys","count"],De=["put","add","delete","clear"],Pe=new Map;function Re(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(Pe.get(t))return Pe.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=De.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!Ae.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,i?"readwrite":"readonly");let o=s.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&s.done]))[0]};return Pe.set(t,s),s}var Oe;Oe=Ie,Ie={...Oe,get:(e,t,n)=>Re(e,t)||Oe.get(e,t,n),has:(e,t)=>!!Re(e,t)||Oe.has(e,t)};
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class Me{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===t?.type}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const Le="@firebase/app",Fe="0.14.8",je=new me("@firebase/app"),Ve="@firebase/app-compat",qe="@firebase/analytics-compat",Ue="@firebase/analytics",ze="@firebase/app-check-compat",Be="@firebase/app-check",Ke="@firebase/auth",$e="@firebase/auth-compat",Ge="@firebase/database",He="@firebase/data-connect",We="@firebase/database-compat",Ye="@firebase/functions",Qe="@firebase/functions-compat",Je="@firebase/installations",Xe="@firebase/installations-compat",Ze="@firebase/messaging",et="@firebase/messaging-compat",tt="@firebase/performance",nt="@firebase/performance-compat",rt="@firebase/remote-config",it="@firebase/remote-config-compat",st="@firebase/storage",ot="@firebase/storage-compat",at="@firebase/firestore",ct="@firebase/ai",lt="@firebase/firestore-compat",ut="firebase",ht="[DEFAULT]",dt={[Le]:"fire-core",[Ve]:"fire-core-compat",[Ue]:"fire-analytics",[qe]:"fire-analytics-compat",[Be]:"fire-app-check",[ze]:"fire-app-check-compat",[Ke]:"fire-auth",[$e]:"fire-auth-compat",[Ge]:"fire-rtdb",[He]:"fire-data-connect",[We]:"fire-rtdb-compat",[Ye]:"fire-fn",[Qe]:"fire-fn-compat",[Je]:"fire-iid",[Xe]:"fire-iid-compat",[Ze]:"fire-fcm",[et]:"fire-fcm-compat",[tt]:"fire-perf",[nt]:"fire-perf-compat",[rt]:"fire-rc",[it]:"fire-rc-compat",[st]:"fire-gcs",[ot]:"fire-gcs-compat",[at]:"fire-fst",[lt]:"fire-fst-compat",[ct]:"fire-vertex","fire-js":"fire-js",[ut]:"fire-js-all"},ft=new Map,pt=new Map,mt=new Map;function gt(e,t){try{e.container.addComponent(t)}catch(n){je.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function yt(e){const t=e.name;if(mt.has(t))return je.debug(`There were multiple attempts to register component ${t}.`),!1;mt.set(t,e);for(const n of ft.values())gt(n,e);for(const n of pt.values())gt(n,e);return!0}function _t(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function wt(e){return null!=e&&void 0!==e.settings}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const vt=new $("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class bt{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new oe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw vt.create("app-deleted",{appName:this._name})}}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const xt="12.9.0";function It(e,t={}){let n=e;"object"!=typeof t&&(t={name:t});const r={name:ht,automaticDataCollectionEnabled:!0,...t},i=r.name;if("string"!=typeof i||!i)throw vt.create("bad-app-name",{appName:String(i)});if(n||(n=N()),!n)throw vt.create("no-options");const s=ft.get(i);if(s){if(ee(n,s.options)&&ee(r,s.config))return s;throw vt.create("duplicate-app",{appName:i})}const o=new le(i);for(const c of mt.values())o.addComponent(c);const a=new bt(n,r,o);return ft.set(i,a),a}function Ct(e=ht){const t=ft.get(e);if(!t&&e===ht&&N())return It();if(!t)throw vt.create("no-app",{appName:e});return t}function Tt(e,t,n){let r=dt[e]??e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=t.match(/\s|\//);if(i||s){const e=[`Unable to register library "${r}" with version "${t}":`];return i&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void je.warn(e.join(" "))}yt(new oe(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}
/**
       * @license
       * Copyright 2021 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const St="firebase-heartbeat-store";let Et=null;function kt(){return Et||(Et=ke("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(St)}catch(n){console.warn(n)}}}).catch(e=>{throw vt.create("idb-open",{originalErrorMessage:e.message})})),Et}async function Nt(e,t){try{const n=(await kt()).transaction(St,"readwrite"),r=n.objectStore(St);await r.put(t,At(e)),await n.done}catch(n){if(n instanceof K)je.warn(n.message);else{const e=vt.create("idb-set",{originalErrorMessage:n?.message});je.warn(e.message)}}}function At(e){return`${e.name}!${e.options.appId}`}
/**
       * @license
       * Copyright 2021 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Dt{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Rt(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=Pt();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===t||this._heartbeatsCache.heartbeats.some(e=>e.date===t))return;if(this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){je.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=Pt(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){const n=[];let r=e.slice();for(const i of e){const e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),Ot(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ot(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),r=b(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return je.warn(e),""}}}function Pt(){return(new Date).toISOString().substring(0,10)}class Rt{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!z()&&B().then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await kt()).transaction(St),n=await t.objectStore(St).get(At(e));return await t.done,n}catch(t){if(t instanceof K)je.warn(t.message);else{const e=vt.create("idb-get",{originalErrorMessage:t?.message});je.warn(e.message)}}}(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Nt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Nt(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function Ot(e){return b(JSON.stringify({version:2,heartbeats:e})).length}var Mt;Mt="",yt(new oe("platform-logger",e=>new Me(e),"PRIVATE")),yt(new oe("heartbeat",e=>new Dt(e),"PRIVATE")),Tt(Le,Fe,Mt),Tt(Le,Fe,"esm2020"),Tt("fire-js",""),
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
Tt("firebase","12.9.0","app");var Lt,Ft,jt="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
      Copyright The Closure Library Authors.
      SPDX-License-Identifier: Apache-2.0
      */(function(){var e;
/** @license

       Copyright The Closure Library Authors.
       SPDX-License-Identifier: Apache-2.0
      */function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function n(e,t,n){n||(n=0);const r=Array(16);if("string"==typeof t)for(var i=0;i<16;++i)r[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;i<16;++i)r[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];let s,o=e.g[3];s=t+(o^n&(i^o))+r[0]+3614090360&4294967295,s=o+(i^(t=n+(s<<7&4294967295|s>>>25))&(n^i))+r[1]+3905402710&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[2]+606105819&4294967295,s=n+(t^(i=o+(s<<17&4294967295|s>>>15))&(o^t))+r[3]+3250441966&4294967295,s=t+(o^(n=i+(s<<22&4294967295|s>>>10))&(i^o))+r[4]+4118548399&4294967295,s=o+(i^(t=n+(s<<7&4294967295|s>>>25))&(n^i))+r[5]+1200080426&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[6]+2821735955&4294967295,s=n+(t^(i=o+(s<<17&4294967295|s>>>15))&(o^t))+r[7]+4249261313&4294967295,s=t+(o^(n=i+(s<<22&4294967295|s>>>10))&(i^o))+r[8]+1770035416&4294967295,s=o+(i^(t=n+(s<<7&4294967295|s>>>25))&(n^i))+r[9]+2336552879&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[10]+4294925233&4294967295,s=n+(t^(i=o+(s<<17&4294967295|s>>>15))&(o^t))+r[11]+2304563134&4294967295,s=t+(o^(n=i+(s<<22&4294967295|s>>>10))&(i^o))+r[12]+1804603682&4294967295,s=o+(i^(t=n+(s<<7&4294967295|s>>>25))&(n^i))+r[13]+4254626195&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[14]+2792965006&4294967295,s=n+(t^(i=o+(s<<17&4294967295|s>>>15))&(o^t))+r[15]+1236535329&4294967295,s=t+(i^o&((n=i+(s<<22&4294967295|s>>>10))^i))+r[1]+4129170786&4294967295,s=o+(n^i&((t=n+(s<<5&4294967295|s>>>27))^n))+r[6]+3225465664&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[11]+643717713&4294967295,s=n+(o^t&((i=o+(s<<14&4294967295|s>>>18))^o))+r[0]+3921069994&4294967295,s=t+(i^o&((n=i+(s<<20&4294967295|s>>>12))^i))+r[5]+3593408605&4294967295,s=o+(n^i&((t=n+(s<<5&4294967295|s>>>27))^n))+r[10]+38016083&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[15]+3634488961&4294967295,s=n+(o^t&((i=o+(s<<14&4294967295|s>>>18))^o))+r[4]+3889429448&4294967295,s=t+(i^o&((n=i+(s<<20&4294967295|s>>>12))^i))+r[9]+568446438&4294967295,s=o+(n^i&((t=n+(s<<5&4294967295|s>>>27))^n))+r[14]+3275163606&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[3]+4107603335&4294967295,s=n+(o^t&((i=o+(s<<14&4294967295|s>>>18))^o))+r[8]+1163531501&4294967295,s=t+(i^o&((n=i+(s<<20&4294967295|s>>>12))^i))+r[13]+2850285829&4294967295,s=o+(n^i&((t=n+(s<<5&4294967295|s>>>27))^n))+r[2]+4243563512&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[7]+1735328473&4294967295,s=n+(o^t&((i=o+(s<<14&4294967295|s>>>18))^o))+r[12]+2368359562&4294967295,s=t+((n=i+(s<<20&4294967295|s>>>12))^i^o)+r[5]+4294588738&4294967295,s=o+((t=n+(s<<4&4294967295|s>>>28))^n^i)+r[8]+2272392833&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[11]+1839030562&4294967295,s=n+((i=o+(s<<16&4294967295|s>>>16))^o^t)+r[14]+4259657740&4294967295,s=t+((n=i+(s<<23&4294967295|s>>>9))^i^o)+r[1]+2763975236&4294967295,s=o+((t=n+(s<<4&4294967295|s>>>28))^n^i)+r[4]+1272893353&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[7]+4139469664&4294967295,s=n+((i=o+(s<<16&4294967295|s>>>16))^o^t)+r[10]+3200236656&4294967295,s=t+((n=i+(s<<23&4294967295|s>>>9))^i^o)+r[13]+681279174&4294967295,s=o+((t=n+(s<<4&4294967295|s>>>28))^n^i)+r[0]+3936430074&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[3]+3572445317&4294967295,s=n+((i=o+(s<<16&4294967295|s>>>16))^o^t)+r[6]+76029189&4294967295,s=t+((n=i+(s<<23&4294967295|s>>>9))^i^o)+r[9]+3654602809&4294967295,s=o+((t=n+(s<<4&4294967295|s>>>28))^n^i)+r[12]+3873151461&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[15]+530742520&4294967295,s=n+((i=o+(s<<16&4294967295|s>>>16))^o^t)+r[2]+3299628645&4294967295,s=t+(i^((n=i+(s<<23&4294967295|s>>>9))|~o))+r[0]+4096336452&4294967295,s=o+(n^((t=n+(s<<6&4294967295|s>>>26))|~i))+r[7]+1126891415&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[14]+2878612391&4294967295,s=n+(o^((i=o+(s<<15&4294967295|s>>>17))|~t))+r[5]+4237533241&4294967295,s=t+(i^((n=i+(s<<21&4294967295|s>>>11))|~o))+r[12]+1700485571&4294967295,s=o+(n^((t=n+(s<<6&4294967295|s>>>26))|~i))+r[3]+2399980690&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[10]+4293915773&4294967295,s=n+(o^((i=o+(s<<15&4294967295|s>>>17))|~t))+r[1]+2240044497&4294967295,s=t+(i^((n=i+(s<<21&4294967295|s>>>11))|~o))+r[8]+1873313359&4294967295,s=o+(n^((t=n+(s<<6&4294967295|s>>>26))|~i))+r[15]+4264355552&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[6]+2734768916&4294967295,s=n+(o^((i=o+(s<<15&4294967295|s>>>17))|~t))+r[13]+1309151649&4294967295,s=t+(i^((n=i+(s<<21&4294967295|s>>>11))|~o))+r[4]+4149444226&4294967295,s=o+(n^((t=n+(s<<6&4294967295|s>>>26))|~i))+r[11]+3174756917&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[2]+718787259&4294967295,s=n+(o^((i=o+(s<<15&4294967295|s>>>17))|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(s<<21&4294967295|s>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+o&4294967295}function r(e,t){this.h=t;const n=[];let r=!0;for(let i=e.length-1;i>=0;i--){const s=0|e[i];r&&s==t||(n[i]=s,r=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.F=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.D=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}(t,function(){this.blockSize=-1}),t.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.v=function(e,t){void 0===t&&(t=e.length);const r=t-this.blockSize,i=this.C;let s=this.h,o=0;for(;o<t;){if(0==s)for(;o<=r;)n(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(i[s++]=e.charCodeAt(o++),s==this.blockSize){n(this,i),s=0;break}}else for(;o<t;)if(i[s++]=e[o++],s==this.blockSize){n(this,i),s=0;break}}this.h=s,this.o+=t},t.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=8*this.o;for(var n=e.length-8;n<e.length;++n)e[n]=255&t,t/=256;for(this.v(e),e=Array(16),t=0,n=0;n<4;++n)for(let r=0;r<32;r+=8)e[t++]=this.g[n]>>>r&255;return e};var i={};function s(e){return-128<=e&&e<128?function(e,t){var n=i;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}(e,function(e){return new r([0|e],e<0?-1:0)}):new r([0|e],e<0?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(e<0)return d(o(-e));const t=[];let n=1;for(let r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new r(t,0)}var a=s(0),c=s(1),l=s(16777216);function u(e){if(0!=e.h)return!1;for(let t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function h(e){return-1==e.h}function d(e){const t=e.g.length,n=[];for(let r=0;r<t;r++)n[r]=~e.g[r];return new r(n,~e.h).add(c)}function f(e,t){return e.add(d(t))}function p(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function m(e,t){this.g=e,this.h=t}function g(e,t){if(u(t))throw Error("division by zero");if(u(e))return new m(a,a);if(h(e))return t=g(d(e),t),new m(d(t.g),d(t.h));if(h(t))return t=g(e,d(t)),new m(d(t.g),t.h);if(e.g.length>30){if(h(e)||h(t))throw Error("slowDivide_ only works with positive integers.");for(var n=c,r=t;r.l(e)<=0;)n=y(n),r=y(r);var i=_(n,1),s=_(r,1);for(r=_(r,2),n=_(n,2);!u(r);){var l=s.add(r);l.l(e)<=0&&(i=i.add(n),s=l),r=_(r,1),n=_(n,1)}return t=f(e,i.j(t)),new m(i,t)}for(i=a;e.l(t)>=0;){for(n=Math.max(1,Math.floor(e.m()/t.m())),r=(r=Math.ceil(Math.log(n)/Math.LN2))<=48?1:Math.pow(2,r-48),l=(s=o(n)).j(t);h(l)||l.l(e)>0;)l=(s=o(n-=r)).j(t);u(s)&&(s=c),i=i.add(s),e=f(e,l)}return new m(i,e)}function y(e){const t=e.g.length+1,n=[];for(let r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new r(n,e.h)}function _(e,t){const n=t>>5;t%=32;const i=e.g.length-n,s=[];for(let r=0;r<i;r++)s[r]=t>0?e.i(r+n)>>>t|e.i(r+n+1)<<32-t:e.i(r+n);return new r(s,e.h)}(e=r.prototype).m=function(){if(h(this))return-d(this).m();let e=0,t=1;for(let n=0;n<this.g.length;n++){const r=this.i(n);e+=(r>=0?r:4294967296+r)*t,t*=4294967296}return e},e.toString=function(e){if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if(u(this))return"0";if(h(this))return"-"+d(this).toString(e);const t=o(Math.pow(e,6));var n=this;let r="";for(;;){const i=g(n,t).g;let s=(((n=f(n,i.j(t))).g.length>0?n.g[0]:n.h)>>>0).toString(e);if(u(n=i))return s+r;for(;s.length<6;)s="0"+s;r=s+r}},e.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return h(e=f(this,e))?-1:u(e)?0:1},e.abs=function(){return h(this)?d(this):this},e.add=function(e){const t=Math.max(this.g.length,e.g.length),n=[];let i=0;for(let r=0;r<=t;r++){let t=i+(65535&this.i(r))+(65535&e.i(r)),s=(t>>>16)+(this.i(r)>>>16)+(e.i(r)>>>16);i=s>>>16,t&=65535,s&=65535,n[r]=s<<16|t}return new r(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(u(this)||u(e))return a;if(h(this))return h(e)?d(this).j(d(e)):d(d(this).j(e));if(h(e))return d(this.j(d(e)));if(this.l(l)<0&&e.l(l)<0)return o(this.m()*e.m());const t=this.g.length+e.g.length,n=[];for(var i=0;i<2*t;i++)n[i]=0;for(i=0;i<this.g.length;i++)for(let t=0;t<e.g.length;t++){const r=this.i(i)>>>16,s=65535&this.i(i),o=e.i(t)>>>16,a=65535&e.i(t);n[2*i+2*t]+=s*a,p(n,2*i+2*t),n[2*i+2*t+1]+=r*a,p(n,2*i+2*t+1),n[2*i+2*t+1]+=s*o,p(n,2*i+2*t+1),n[2*i+2*t+2]+=r*o,p(n,2*i+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new r(n,0)},e.B=function(e){return g(this,e).h},e.and=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new r(n,this.h&e.h)},e.or=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new r(n,this.h|e.h)},e.xor=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new r(n,this.h^e.h)},t.prototype.digest=t.prototype.A,t.prototype.reset=t.prototype.u,t.prototype.update=t.prototype.v,Ft=t,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=o,r.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if((n=n||10)<2||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character');const r=o(Math.pow(n,8));let i=a;for(let a=0;a<t.length;a+=8){var s=Math.min(8,t.length-a);const e=parseInt(t.substring(a,a+s),n);s<8?(s=o(Math.pow(n,s)),i=i.j(s).add(o(e))):(i=i.j(r),i=i.add(o(e)))}return i},Lt=r}).apply(void 0!==jt?jt:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var Vt,qt,Ut,zt,Bt,Kt,$t,Gt,Ht="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
      Copyright The Closure Library Authors.
      SPDX-License-Identifier: Apache-2.0
      */(function(){var e,t=Object.defineProperty,n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof Ht&&Ht];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);function r(e,r){if(r)e:{var i=n;e=e.split(".");for(var s=0;s<e.length-1;s++){var o=e[s];if(!(o in i))break e;i=i[o]}(r=r(s=i[e=e[e.length-1]]))!=s&&null!=r&&t(i,e,{configurable:!0,writable:!0,value:r})}}r("Symbol.dispose",function(e){return e||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(e){return e||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(e){return e||function(e){var t,n=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.push([t,e[t]]);return n}});
/** @license

       Copyright The Closure Library Authors.
       SPDX-License-Identifier: Apache-2.0
      */
var i=i||{},s=this||self;function o(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function a(e,t,n){return e.call.apply(e.bind,arguments)}function c(e,t,n){return(c=a).apply(null,arguments)}function l(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function u(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Ob=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}var h="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function d(e){const t=e.length;if(t>0){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function f(e,t){for(let r=1;r<arguments.length;r++){const t=arguments[r];var n=typeof t;if("array"==(n="object"!=n?n:t?Array.isArray(t)?"array":n:"null")||"object"==n&&"number"==typeof t.length){n=e.length||0;const r=t.length||0;e.length=n+r;for(let i=0;i<r;i++)e[n+i]=t[i]}else e.push(t)}}function p(e){s.setTimeout(()=>{throw e},0)}function m(){var e=v;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var g=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new y,e=>e.reset());class y{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let _,w=!1,v=new class{constructor(){this.h=this.g=null}add(e,t){const n=g.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},b=()=>{const e=Promise.resolve(void 0);_=()=>{e.then(x)}};function x(){for(var e;e=m();){try{e.h.call(e.g)}catch(n){p(n)}var t=g;t.j(e),t.h<100&&(t.h++,e.next=t.g,t.g=e)}w=!1}function I(){this.u=this.u,this.C=this.C}function C(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},C.prototype.h=function(){this.defaultPrevented=!0};var T=function(){if(!s.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};s.addEventListener("test",e,t),s.removeEventListener("test",e,t)}catch(n){}return e}();function S(e){return/^[\s\xa0]*$/.test(e)}function E(e,t){C.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,t)}u(E,C),E.prototype.init=function(e,t){const n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,(t=e.relatedTarget)||("mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement)),this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&E.Z.h.call(this)},E.prototype.h=function(){E.Z.h.call(this);const e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var k="closure_listenable_"+(1e6*Math.random()|0),N=0;function A(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=i,this.key=++N,this.da=this.fa=!1}function D(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function P(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function R(e){const t={};for(const n in e)t[n]=e[n];return t}const O="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function M(e,t){let n,r;for(let i=1;i<arguments.length;i++){for(n in r=arguments[i],r)e[n]=r[n];for(let t=0;t<O.length;t++)n=O[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function L(e){this.src=e,this.g={},this.h=0}function F(e,t){const n=t.type;if(n in e.g){var r,i=e.g[n],s=Array.prototype.indexOf.call(i,t,void 0);(r=s>=0)&&Array.prototype.splice.call(i,s,1),r&&(D(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function j(e,t,n,r){for(let i=0;i<e.length;++i){const s=e[i];if(!s.da&&s.listener==t&&s.capture==!!n&&s.ha==r)return i}return-1}L.prototype.add=function(e,t,n,r,i){const s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);const o=j(e,t,r,i);return o>-1?(t=e[o],n||(t.fa=!1)):((t=new A(t,this.src,s,!!r,i)).fa=n,e.push(t)),t};var V="closure_lm_"+(1e6*Math.random()|0),q={};function U(e,t,n,r,i){if(Array.isArray(t)){for(let s=0;s<t.length;s++)U(e,t[s],n,r,i);return null}return n=W(n),e&&e[k]?e.J(t,n,!!o(r)&&!!r.capture,i):function(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");const a=o(i)?!!i.capture:!!i;let c=G(e);if(c||(e[V]=c=new L(e)),(n=c.add(t,n,r,a,s)).proxy)return n;if(r=function(){function e(n){return t.call(e.src,e.listener,n)}const t=$;return e}(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)T||(i=a),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(K(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}(e,t,n,!1,r,i)}function z(e,t,n,r,i){if(Array.isArray(t))for(var s=0;s<t.length;s++)z(e,t[s],n,r,i);else r=o(r)?!!r.capture:!!r,n=W(n),e&&e[k]?(e=e.i,(s=String(t).toString())in e.g&&(n=j(t=e.g[s],n,r,i))>-1&&(D(t[n]),Array.prototype.splice.call(t,n,1),0==t.length&&(delete e.g[s],e.h--))):e&&(e=G(e))&&(t=e.g[t.toString()],e=-1,t&&(e=j(t,n,r,i)),(n=e>-1?t[e]:null)&&B(n))}function B(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[k])F(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(K(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=G(t))?(F(n,e),0==n.h&&(n.src=null,t[V]=null)):D(e)}}}function K(e){return e in q?q[e]:q[e]="on"+e}function $(e,t){if(e.da)e=!0;else{t=new E(t,this);const n=e.listener,r=e.ha||e.src;e.fa&&B(e),e=n.call(r,t)}return e}function G(e){return(e=e[V])instanceof L?e:null}var H="__closure_events_fn_"+(1e9*Math.random()>>>0);function W(e){return"function"==typeof e?e:(e[H]||(e[H]=function(t){return e.handleEvent(t)}),e[H])}function Y(){I.call(this),this.i=new L(this),this.M=this,this.G=null}function Q(e,t){var n,r=e.G;if(r)for(n=[];r;r=r.G)n.push(r);if(e=e.M,r=t.type||t,"string"==typeof t)t=new C(t,e);else if(t instanceof C)t.target=t.target||e;else{var i=t;M(t=new C(r,e),i)}let s,o;if(i=!0,n)for(o=n.length-1;o>=0;o--)s=t.g=n[o],i=J(s,r,!0,t)&&i;if(s=t.g=e,i=J(s,r,!0,t)&&i,i=J(s,r,!1,t)&&i,n)for(o=0;o<n.length;o++)s=t.g=n[o],i=J(s,r,!1,t)&&i}function J(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();let i=!0;for(let s=0;s<t.length;++s){const o=t[s];if(o&&!o.da&&o.capture==n){const t=o.listener,n=o.ha||o.src;o.fa&&F(e.i,o),i=!1!==t.call(n,r)&&i}}return i&&!r.defaultPrevented}function X(e){e.g=function(e,t){if("function"!=typeof e){if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=c(e.handleEvent,e)}return Number(t)>2147483647?-1:s.setTimeout(e,t||0)}(()=>{e.g=null,e.i&&(e.i=!1,X(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}u(Y,I),Y.prototype[k]=!0,Y.prototype.removeEventListener=function(e,t,n,r){z(this,e,t,n,r)},Y.prototype.N=function(){if(Y.Z.N.call(this),this.i){var e=this.i;for(const t in e.g){const n=e.g[t];for(let e=0;e<n.length;e++)D(n[e]);delete e.g[t],e.h--}}this.G=null},Y.prototype.J=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},Y.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};class Z extends I{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:X(this)}N(){super.N(),this.g&&(s.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ee(e){I.call(this),this.h=e,this.g={}}u(ee,I);var te=[];function ne(e){P(e.g,function(e,t){this.g.hasOwnProperty(t)&&B(e)},e),e.g={}}ee.prototype.N=function(){ee.Z.N.call(this),ne(this)},ee.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var re=s.JSON.stringify,ie=s.JSON.parse,se=class{stringify(e){return s.JSON.stringify(e,void 0)}parse(e){return s.JSON.parse(e,void 0)}};function oe(){}function ae(){}var ce={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function le(){C.call(this,"d")}function ue(){C.call(this,"c")}u(le,C),u(ue,C);var he={},de=null;function fe(){return de=de||new Y}function pe(e){C.call(this,he.Ia,e)}function me(e){const t=fe();Q(t,new pe(t))}function ge(e,t){C.call(this,he.STAT_EVENT,e),this.stat=t}function ye(e){const t=fe();Q(t,new ge(t,e))}function _e(e,t){C.call(this,he.Ja,e),this.size=t}function we(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return s.setTimeout(function(){e()},t)}function ve(){this.g=!0}function be(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{const s=JSON.parse(t);if(s)for(e=0;e<s.length;e++)if(Array.isArray(s[e])){var n=s[e];if(!(n.length<2)){var r=n[1];if(Array.isArray(r)&&!(r.length<1)){var i=r[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(let e=1;e<r.length;e++)r[e]=""}}}return re(s)}catch(s){return t}}(e,n)+(r?" "+r:"")})}he.Ia="serverreachability",u(pe,C),he.STAT_EVENT="statevent",u(ge,C),he.Ja="timingevent",u(_e,C),ve.prototype.ua=function(){this.g=!1},ve.prototype.info=function(){};var xe,Ie={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ce={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function Te(){}function Se(e){return encodeURIComponent(String(e))}function Ee(e){var t=1;e=e.split(":");const n=[];for(;t>0&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function ke(e,t,n,r){this.j=e,this.i=t,this.l=n,this.S=r||1,this.V=new ee(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ne}function Ne(){this.i=null,this.g="",this.h=!1}u(Te,oe),Te.prototype.g=function(){return new XMLHttpRequest},xe=new Te;var Ae={},De={};function Pe(e,t,n){e.M=1,e.A=rt(Xe(t)),e.u=n,e.R=!0,Re(e,null)}function Re(e,t){e.F=Date.now(),Le(e),e.B=Xe(e.A);var n=e.B,r=e.S;Array.isArray(r)||(r=[String(r)]),yt(n.i,"t",r),e.C=0,n=e.j.L,e.h=new Ne,e.g=fn(e.j,n?t:null,!e.u),e.P>0&&(e.O=new Z(c(e.Y,e,e.g),e.P)),t=e.V,n=e.g,r=e.ba;var i="readystatechange";Array.isArray(i)||(i&&(te[0]=i.toString()),i=te);for(let s=0;s<i.length;s++){const e=U(n,i[s],r||t.handleEvent,!1,t.h||t);if(!e)break;t.g[e.key]=e}t=e.J?R(e.J):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,t)):(e.v="GET",e.g.ea(e.B,e.v,null,t)),me(),function(e,t,n,r,i,s){e.info(function(){if(e.g)if(s){var o="",a=s.split("&");for(let e=0;e<a.length;e++){var c=a[e].split("=");if(c.length>1){const e=c[0];c=c[1];const t=e.split("_");o=t.length>=2&&"type"==t[1]?o+(e+"=")+c+"&":o+(e+"=redacted&")}}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o})}(e.i,e.v,e.B,e.l,e.S,e.u)}function Oe(e){return!!e.g&&"GET"==e.v&&2!=e.M&&e.j.Aa}function Me(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?De:(n=Number(t.substring(n,r)),isNaN(n)?Ae:(r+=1)+n>t.length?De:(t=t.slice(r,r+n),e.C=r+n,t))}function Le(e){e.T=Date.now()+e.H,Fe(e,e.H)}function Fe(e,t){if(null!=e.D)throw Error("WatchDog timer not null");e.D=we(c(e.aa,e),t)}function je(e){e.D&&(s.clearTimeout(e.D),e.D=null)}function Ve(e){0==e.j.I||e.K||cn(e.j,e)}function qe(e){je(e);var t=e.O;t&&"function"==typeof t.dispose&&t.dispose(),e.O=null,ne(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function Ue(e,t){try{var n=e.j;if(0!=n.I&&(n.g==e||Ge(n.h,e)))if(!e.L&&Ge(n.h,e)&&3==n.I){try{var r=n.Ba.g.parse(t)}catch(u){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.v){if(n.g){if(!(n.g.F+3e3<e.F))break e;an(n),Qt(n)}rn(n),ye(18)}}else n.xa=i[1],0<n.xa-n.K&&i[2]<37500&&n.F&&0==n.A&&!n.C&&(n.C=we(c(n.Va,n),6e3));$e(n.h)<=1&&n.ta&&(n.ta=void 0)}else un(n,11)}else if((e.L||n.g==e)&&an(n),!S(t))for(i=n.Ba.g.parse(t),t=0;t<i.length;t++){let c=i[t];const u=c[0];if(!(u<=n.K))if(n.K=u,c=c[1],2==n.I)if("c"==c[0]){n.M=c[1],n.ba=c[2];const t=c[3];null!=t&&(n.ka=t,n.j.info("VER="+n.ka));const i=c[4];null!=i&&(n.za=i,n.j.info("SVER="+n.za));const u=c[5];null!=u&&"number"==typeof u&&u>0&&(r=1.5*u,n.O=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=r.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(He(s,s.h),s.h=null))}if(r.G){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.wa=e,nt(r.J,r.G,e))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-e.F,n.j.info("Handshake RTT: "+n.T+"ms"));var o=e;if((r=n).na=dn(r,r.L?r.ba:null,r.W),o.L){We(r.h,o);var a=o,l=r.O;l&&(a.H=l),a.D&&(je(a),Le(a)),r.g=o}else nn(r);n.i.length>0&&Xt(n)}else"stop"!=c[0]&&"close"!=c[0]||un(n,7);else 3==n.I&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?un(n,7):Yt(n):"noop"!=c[0]&&n.l&&n.l.qa(c),n.A=0)}me()}catch(u){}}ke.prototype.ba=function(e){e=e.target;const t=this.O;t&&3==Lt(e)?t.j():this.Y(e)},ke.prototype.Y=function(e){try{if(e==this.g)e:{const c=Lt(this.g),l=this.g.ya();if(this.g.ca(),!(c<3)&&(3!=c||this.g&&(this.h.h||this.g.la()||Ft(this.g)))){this.K||4!=c||7==l||me(),je(this);var t=this.g.ca();this.X=t;var n=function(e){if(!Oe(e))return e.g.la();const t=Ft(e.g);if(""===t)return"";let n="";const r=t.length,i=4==Lt(e.g);if(!e.h.i){if("undefined"==typeof TextDecoder)return qe(e),Ve(e),"";e.h.i=new s.TextDecoder}for(let s=0;s<r;s++)e.h.h=!0,n+=e.h.i.decode(t[s],{stream:!(i&&s==r-1)});return t.length=0,e.h.g+=n,e.C=0,e.h.g}(this);if(this.o=200==t,function(e,t,n,r,i,s,o){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+o})}(this.i,this.v,this.B,this.l,this.S,c,t),this.o){if(this.U&&!this.L){t:{if(this.g){var r,i=this.g;if((r=i.g?i.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!S(r)){var o=r;break t}}o=null}if(!(e=o)){this.o=!1,this.m=3,ye(12),qe(this),Ve(this);break e}be(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ue(this,e)}if(this.R){let t;for(e=!0;!this.K&&this.C<n.length;){if(t=Me(this,n),t==De){4==c&&(this.m=4,ye(14),e=!1),be(this.i,this.l,null,"[Incomplete Response]");break}if(t==Ae){this.m=4,ye(15),be(this.i,this.l,n,"[Invalid Chunk]"),e=!1;break}be(this.i,this.l,t,null),Ue(this,t)}if(Oe(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=c||0!=n.length||this.h.h||(this.m=1,ye(16),e=!1),this.o=this.o&&e,e){if(n.length>0&&!this.W){this.W=!0;var a=this.j;a.g==this&&a.aa&&!a.P&&(a.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),sn(a),a.P=!0,ye(11))}}else be(this.i,this.l,n,"[Invalid Chunked Response]"),qe(this),Ve(this)}else be(this.i,this.l,n,null),Ue(this,n);4==c&&qe(this),this.o&&!this.K&&(4==c?cn(this.j,this):(this.o=!1,Le(this)))}else(function(e){const t={};e=(e.g&&Lt(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(S(e[r]))continue;var n=Ee(e[r]);const i=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const s=t[i]||[];t[i]=s,s.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==t&&n.indexOf("Unknown SID")>0?(this.m=3,ye(12)):(this.m=0,ye(13)),qe(this),Ve(this)}}}catch(rr){}},ke.prototype.cancel=function(){this.K=!0,qe(this)},ke.prototype.aa=function(){this.D=null;const e=Date.now();e-this.T>=0?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.B),2!=this.M&&(me(),ye(17)),qe(this),this.m=2,Ve(this)):Fe(this,this.T-e)};var ze=class{constructor(e,t){this.g=e,this.map=t}};function Be(e){this.l=e||10,e=s.PerformanceNavigationTiming?(e=s.performance.getEntriesByType("navigation")).length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!(s.chrome&&s.chrome.loadTimes&&s.chrome.loadTimes()&&s.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ke(e){return!!e.h||!!e.g&&e.g.size>=e.j}function $e(e){return e.h?1:e.g?e.g.size:0}function Ge(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function He(e,t){e.g?e.g.add(t):e.h=t}function We(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Ye(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.G);return t}return d(e.i)}Be.prototype.cancel=function(){if(this.i=Ye(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var Qe=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Je(e){let t;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof Je?(this.l=e.l,Ze(this,e.j),this.o=e.o,this.g=e.g,et(this,e.u),this.h=e.h,tt(this,_t(e.i)),this.m=e.m):e&&(t=String(e).match(Qe))?(this.l=!1,Ze(this,t[1]||"",!0),this.o=it(t[2]||""),this.g=it(t[3]||"",!0),et(this,t[4]),this.h=it(t[5]||"",!0),tt(this,t[6]||"",!0),this.m=it(t[7]||"")):(this.l=!1,this.i=new dt(null,this.l))}function Xe(e){return new Je(e)}function Ze(e,t,n){e.j=n?it(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function et(e,t){if(t){if(t=Number(t),isNaN(t)||t<0)throw Error("Bad port number "+t);e.u=t}else e.u=null}function tt(e,t,n){t instanceof dt?(e.i=t,function(e,t){t&&!e.j&&(ft(e),e.i=null,e.g.forEach(function(e,t){const n=t.toLowerCase();t!=n&&(pt(this,t),yt(this,n,e))},e)),e.j=t}(e.i,e.l)):(n||(t=st(t,ut)),e.i=new dt(t,e.l))}function nt(e,t,n){e.i.set(t,n)}function rt(e){return nt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function it(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function st(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,ot),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function ot(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}Je.prototype.toString=function(){const e=[];var t=this.j;t&&e.push(st(t,at,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(st(t,at,!0),"@"),e.push(Se(n).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.u)&&e.push(":",String(n))),(n=this.h)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(st(n,"/"==n.charAt(0)?lt:ct,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",st(n,ht)),e.join("")},Je.prototype.resolve=function(e){const t=Xe(this);let n=!!e.j;n?Ze(t,e.j):n=!!e.o,n?t.o=e.o:n=!!e.g,n?t.g=e.g:n=null!=e.u;var r=e.h;if(n)et(t,e.u);else if(n=!!e.h){if("/"!=r.charAt(0))if(this.g&&!this.h)r="/"+r;else{var i=t.h.lastIndexOf("/");-1!=i&&(r=t.h.slice(0,i+1)+r)}if(".."==(i=r)||"."==i)r="";else if(-1!=i.indexOf("./")||-1!=i.indexOf("/.")){r=0==i.lastIndexOf("/",0),i=i.split("/");const e=[];for(let t=0;t<i.length;){const n=i[t++];"."==n?r&&t==i.length&&e.push(""):".."==n?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),r&&t==i.length&&e.push("")):(e.push(n),r=!0)}r=e.join("/")}else r=i}return n?t.h=r:n=""!==e.i.toString(),n?tt(t,_t(e.i)):n=!!e.m,n&&(t.m=e.m),t};var at=/[#\/\?@]/g,ct=/[#\?:]/g,lt=/[#\?]/g,ut=/[#\?@]/g,ht=/#/g;function dt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function ft(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(let n=0;n<e.length;n++){const r=e[n].indexOf("=");let i,s=null;r>=0?(i=e[n].substring(0,r),s=e[n].substring(r+1)):i=e[n],t(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function pt(e,t){ft(e),t=wt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function mt(e,t){return ft(e),t=wt(e,t),e.g.has(t)}function gt(e,t){ft(e);let n=[];if("string"==typeof t)mt(e,t)&&(n=n.concat(e.g.get(wt(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)n=n.concat(e[t]);return n}function yt(e,t,n){pt(e,t),n.length>0&&(e.i=null,e.g.set(wt(e,t),d(n)),e.h+=n.length)}function _t(e){const t=new dt;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function wt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function vt(e,t,n,r,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),r(n)}catch(s){}}function bt(){this.g=new se}function xt(e){this.i=e.Sb||null,this.h=e.ab||!1}function It(e,t){Y.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function Ct(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function Tt(e){e.readyState=4,e.l=null,e.j=null,e.B=null,St(e)}function St(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function Et(e){let t="";return P(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function kt(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=Et(n),"string"==typeof e?null!=n&&Se(n):nt(e,t,n))}function Nt(e){Y.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(e=dt.prototype).add=function(e,t){ft(this),this.i=null,e=wt(this,e);let n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){ft(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},e.set=function(e,t){return ft(this),this.i=null,mt(this,e=wt(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&(e=gt(this,e)).length>0?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(let r=0;r<t.length;r++){var n=t[r];const i=Se(n);n=gt(this,n);for(let t=0;t<n.length;t++){let r=i;""!==n[t]&&(r+="="+Se(n[t])),e.push(r)}}return this.i=e.join("&")},u(xt,oe),xt.prototype.g=function(){return new It(this.i,this.h)},u(It,Y),(e=It.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=t,this.readyState=1,St(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||s).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,Tt(this)),this.readyState=0},e.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,St(this)),this.g&&(this.readyState=3,St(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==s.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ct(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))},e.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Tt(this):St(this),3==this.readyState&&Ct(this)}},e.Oa=function(e){this.g&&(this.response=this.responseText=e,Tt(this))},e.Na=function(e){this.g&&(this.response=e,Tt(this))},e.ga=function(){this.g&&Tt(this)},e.setRequestHeader=function(e,t){this.A.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(It.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),u(Nt,Y);var At=/^https?$/i,Dt=["POST","PUT"];function Pt(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,Rt(e),Mt(e)}function Rt(e){e.A||(e.A=!0,Q(e,"complete"),Q(e,"error"))}function Ot(e){if(e.h&&void 0!==i)if(e.v&&4==Lt(e))setTimeout(e.Ca.bind(e),0);else if(Q(e,"readystatechange"),4==Lt(e)){e.h=!1;try{const i=e.ca();e:switch(i){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===i){let t=String(e.D).match(Qe)[1]||null;!t&&s.self&&s.self.location&&(t=s.self.location.protocol.slice(0,-1)),r=!At.test(t?t.toLowerCase():"")}n=r}if(n)Q(e,"complete"),Q(e,"success");else{e.o=6;try{var o=Lt(e)>2?e.g.statusText:""}catch(a){o=""}e.l=o+" ["+e.ca()+"]",Rt(e)}}finally{Mt(e)}}}function Mt(e,t){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);const r=e.g;e.g=null,t||Q(e,"ready");try{r.onreadystatechange=null}catch(n){}}}function Lt(e){return e.g?e.g.readyState:0}function Ft(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function jt(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Wt(e){this.za=0,this.i=[],this.j=new ve,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=jt("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=jt("baseRetryDelayMs",5e3,e),this.Za=jt("retryDelaySeedMs",1e4,e),this.Ta=jt("forwardChannelMaxRetries",2,e),this.va=jt("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new Be(e&&e.concurrentRequestLimit),this.Ba=new bt,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function Yt(e){if(Jt(e),3==e.I){var t=e.V++,n=Xe(e.J);if(nt(n,"SID",e.M),nt(n,"RID",t),nt(n,"TYPE","terminate"),en(e,n),(t=new ke(e,e.j,t)).M=2,t.A=rt(Xe(n)),n=!1,s.navigator&&s.navigator.sendBeacon)try{n=s.navigator.sendBeacon(t.A.toString(),"")}catch(r){}!n&&s.Image&&((new Image).src=t.A,n=!0),n||(t.g=fn(t.j,null),t.g.ea(t.A)),t.F=Date.now(),Le(t)}hn(e)}function Qt(e){e.g&&(sn(e),e.g.cancel(),e.g=null)}function Jt(e){Qt(e),e.v&&(s.clearTimeout(e.v),e.v=null),an(e),e.h.cancel(),e.m&&("number"==typeof e.m&&s.clearTimeout(e.m),e.m=null)}function Xt(e){if(!Ke(e.h)&&!e.m){e.m=!0;var t=e.Ea;_||b(),w||(_(),w=!0),v.add(t,e),e.D=0}}function Zt(e,t){var n;n=t?t.l:e.V++;const r=Xe(e.J);nt(r,"SID",e.M),nt(r,"RID",n),nt(r,"AID",e.K),en(e,r),e.u&&e.o&&kt(r,e.u,e.o),n=new ke(e,e.j,n,e.D+1),null===e.u&&(n.J=e.o),t&&(e.i=t.G.concat(e.i)),t=tn(e,n,1e3),n.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),He(e.h,n),Pe(n,r,t)}function en(e,t){e.H&&P(e.H,function(e,n){nt(t,n,e)}),e.l&&P({},function(e,n){nt(t,n,e)})}function tn(e,t,n){n=Math.min(e.i.length,n);const r=e.l?c(e.l.Ka,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?n>0?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let c=!0;for(let l=0;l<n;l++){var s=i[l].g;const n=i[l].map;if((s-=t)<0)t=Math.max(0,i[l].g-100),c=!1;else try{s="req"+s+"_"||"";try{var a=n instanceof Map?n:Object.entries(n);for(const[t,n]of a){let r=n;o(n)&&(r=re(n)),e.push(s+t+"="+encodeURIComponent(r))}}catch(En){throw e.push(s+"type="+encodeURIComponent("_badmap")),En}}catch(En){r&&r(n)}}if(c){a=e.join("&");break e}}a=void 0}return e=e.i.splice(0,n),t.G=e,a}function nn(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;_||b(),w||(_(),w=!0),v.add(t,e),e.A=0}}function rn(e){return!(e.g||e.v||e.A>=3||(e.Y++,e.v=we(c(e.Da,e),ln(e,e.A)),e.A++,0))}function sn(e){null!=e.B&&(s.clearTimeout(e.B),e.B=null)}function on(e){e.g=new ke(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var t=Xe(e.na);nt(t,"RID","rpc"),nt(t,"SID",e.M),nt(t,"AID",e.K),nt(t,"CI",e.F?"0":"1"),!e.F&&e.ia&&nt(t,"TO",e.ia),nt(t,"TYPE","xmlhttp"),en(e,t),e.u&&e.o&&kt(t,e.u,e.o),e.O&&(e.g.H=e.O);var n=e.g;e=e.ba,n.M=1,n.A=rt(Xe(t)),n.u=null,n.R=!0,Re(n,e)}function an(e){null!=e.C&&(s.clearTimeout(e.C),e.C=null)}function cn(e,t){var n=null;if(e.g==t){an(e),sn(e),e.g=null;var r=2}else{if(!Ge(e.h,t))return;n=t.G,We(e.h,t),r=1}if(0!=e.I)if(t.o)if(1==r){n=t.u?t.u.length:0,t=Date.now()-t.F;var i=e.D;Q(r=fe(),new _e(r,n)),Xt(e)}else nn(e);else if(3==(i=t.m)||0==i&&t.X>0||!(1==r&&function(e,t){return!($e(e.h)>=e.h.j-(e.m?1:0)||(e.m?(e.i=t.G.concat(e.i),0):1==e.I||2==e.I||e.D>=(e.Sa?0:e.Ta)||(e.m=we(c(e.Ea,e,t),ln(e,e.D)),e.D++,0)))}(e,t)||2==r&&rn(e)))switch(n&&n.length>0&&(t=e.h,t.i=t.i.concat(n)),i){case 1:un(e,5);break;case 4:un(e,10);break;case 3:un(e,6);break;default:un(e,2)}}function ln(e,t){let n=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(n*=2),n*t}function un(e,t){if(e.j.info("Error code "+t),2==t){var n=c(e.bb,e),r=e.Ua;const t=!r;r=new Je(r||"//www.google.com/images/cleardot.gif"),s.location&&"http"==s.location.protocol||Ze(r,"https"),rt(r),t?function(e,t){const n=new ve;if(s.Image){const r=new Image;r.onload=l(vt,n,"TestLoadImage: loaded",!0,t,r),r.onerror=l(vt,n,"TestLoadImage: error",!1,t,r),r.onabort=l(vt,n,"TestLoadImage: abort",!1,t,r),r.ontimeout=l(vt,n,"TestLoadImage: timeout",!1,t,r),s.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}(r.toString(),n):function(e,t){new ve;const n=new AbortController,r=setTimeout(()=>{n.abort(),vt(0,0,!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(r),e.ok?vt(0,0,!0,t):vt(0,0,!1,t)}).catch(()=>{clearTimeout(r),vt(0,0,!1,t)})}(r.toString(),n)}else ye(2);e.I=0,e.l&&e.l.pa(t),hn(e),Jt(e)}function hn(e){if(e.I=0,e.ja=[],e.l){const t=Ye(e.h);0==t.length&&0==e.i.length||(f(e.ja,t),f(e.ja,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.oa()}}function dn(e,t,n){var r=n instanceof Je?Xe(n):new Je(n);if(""!=r.g)t&&(r.g=t+"."+r.g),et(r,r.u);else{var i=s.location;r=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;const e=new Je(null);r&&Ze(e,r),t&&(e.g=t),i&&et(e,i),n&&(e.h=n),r=e}return n=e.G,t=e.wa,n&&t&&nt(r,n,t),nt(r,"VER",e.ka),en(e,r),r}function fn(e,t,n){if(t&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Aa&&!e.ma?new Nt(new xt({ab:n})):new Nt(e.ma)).Fa(e.L),t}function pn(){}function mn(){}function gn(e,t){Y.call(this),this.g=new Wt(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e["X-WebChannel-Client-Profile"]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!S(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!S(t)&&(this.g.G=t,null!==(e=this.h)&&t in e&&t in(e=this.h)&&delete e[t]),this.j=new wn(this)}function yn(e){le.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function _n(){ue.call(this),this.status=1}function wn(e){this.g=e}(e=Nt.prototype).Fa=function(e){this.H=e},e.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():xe.g(),this.g.onreadystatechange=h(c(this.Ca,this));try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(o){return void Pt(this,o)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),i=s.FormData&&e instanceof s.FormData,!(Array.prototype.indexOf.call(Dt,t,void 0)>=0)||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[s,a]of n)this.g.setRequestHeader(s,a);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(e),this.v=!1}catch(o){Pt(this,o)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,Q(this,"complete"),Q(this,"abort"),Mt(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Mt(this,!0)),Nt.Z.N.call(this)},e.Ca=function(){this.u||(this.B||this.v||this.j?Ot(this):this.Xa())},e.Xa=function(){Ot(this)},e.isActive=function(){return!!this.g},e.ca=function(){try{return Lt(this)>2?this.g.status:-1}catch(e){return-1}},e.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.La=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),ie(t)}},e.ya=function(){return this.o},e.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=Wt.prototype).ka=8,e.I=1,e.connect=function(e,t,n,r){ye(0),this.W=e,this.H=t||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.J=dn(this,null,this.W),Xt(this)},e.Ea=function(e){if(this.m)if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const i=new ke(this,this.j,e);let s=this.o;if(this.U&&(s?(s=R(s),M(s,this.U)):s=this.U),null!==this.u||this.R||(i.J=s,s=null),this.S)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(void 0===(r="__data__"in r.map&&"string"==typeof(r=r.map.__data__)?r.length:void 0))break;if((t+=r)>4096){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=tn(this,i,t),nt(n=Xe(this.J),"RID",e),nt(n,"CVER",22),this.G&&nt(n,"X-HTTP-Session-Id",this.G),en(this,n),s&&(this.R?t="headers="+Se(Et(s))+"&"+t:this.u&&kt(n,this.u,s)),He(this.h,i),this.Ra&&nt(n,"TYPE","init"),this.S?(nt(n,"$req",t),nt(n,"SID","null"),i.U=!0,Pe(i,n,null)):Pe(i,n,t),this.I=2}}else 3==this.I&&(e?Zt(this,e):0==this.i.length||Ke(this.h)||Zt(this))},e.Da=function(){if(this.v=null,on(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=we(c(this.Wa,this),e)}},e.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ye(10),Qt(this),on(this))},e.Va=function(){null!=this.C&&(this.C=null,Qt(this),rn(this),ye(19))},e.bb=function(e){e?(this.j.info("Successfully pinged google.com"),ye(2)):(this.j.info("Failed to ping google.com"),ye(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=pn.prototype).ra=function(){},e.qa=function(){},e.pa=function(){},e.oa=function(){},e.isActive=function(){return!0},e.Ka=function(){},mn.prototype.g=function(e,t){return new gn(e,t)},u(gn,Y),gn.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},gn.prototype.close=function(){Yt(this.g)},gn.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=re(e),e=n);t.i.push(new ze(t.Ya++,e)),3==t.I&&Xt(t)},gn.prototype.N=function(){this.g.l=null,delete this.j,Yt(this.g),delete this.g,gn.Z.N.call(this)},u(yn,le),u(_n,ue),u(wn,pn),wn.prototype.ra=function(){Q(this.g,"a")},wn.prototype.qa=function(e){Q(this.g,new yn(e))},wn.prototype.pa=function(e){Q(this.g,new _n)},wn.prototype.oa=function(){Q(this.g,"b")},mn.prototype.createWebChannel=mn.prototype.g,gn.prototype.send=gn.prototype.o,gn.prototype.open=gn.prototype.m,gn.prototype.close=gn.prototype.close,Gt=function(){return new mn},$t=function(){return fe()},Kt=he,Bt={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ie.NO_ERROR=0,Ie.TIMEOUT=8,Ie.HTTP_ERROR=6,zt=Ie,Ce.COMPLETE="complete",Ut=Ce,ae.EventType=ce,ce.OPEN="a",ce.CLOSE="b",ce.ERROR="c",ce.MESSAGE="d",Y.prototype.listen=Y.prototype.J,qt=ae,Nt.prototype.listenOnce=Nt.prototype.K,Nt.prototype.getLastError=Nt.prototype.Ha,Nt.prototype.getLastErrorCode=Nt.prototype.ya,Nt.prototype.getStatus=Nt.prototype.ca,Nt.prototype.getResponseJson=Nt.prototype.La,Nt.prototype.getResponseText=Nt.prototype.la,Nt.prototype.send=Nt.prototype.ea,Nt.prototype.setWithCredentials=Nt.prototype.Fa,Vt=Nt}).apply(void 0!==Ht?Ht:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
let Wt=class{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};Wt.UNAUTHENTICATED=new Wt(null),Wt.GOOGLE_CREDENTIALS=new Wt("google-credentials-uid"),Wt.FIRST_PARTY=new Wt("first-party-uid"),Wt.MOCK_USER=new Wt("mock-user");
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
let Yt="12.9.0";
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
const Qt=new me("@firebase/firestore");function Jt(){return Qt.logLevel}function Xt(e,...t){if(Qt.logLevel<=ue.DEBUG){const n=t.map(tn);Qt.debug(`Firestore (${Yt}): ${e}`,...n)}}function Zt(e,...t){if(Qt.logLevel<=ue.ERROR){const n=t.map(tn);Qt.error(`Firestore (${Yt}): ${e}`,...n)}}function en(e,...t){if(Qt.logLevel<=ue.WARN){const n=t.map(tn);Qt.warn(`Firestore (${Yt}): ${e}`,...n)}}function tn(e){if("string"==typeof e)return e;try{return function(e){return JSON.stringify(e)}(e)}catch(t){return e}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function nn(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,rn(e,r,n)}function rn(e,t,n){let r=`FIRESTORE (${Yt}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw Zt(r),new Error(r)}function sn(e,t,n,r){let i="Unexpected state";"string"==typeof n?i=n:r=n,e||rn(t,i,r)}function on(e,t){return e}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const an={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class cn extends K{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class ln{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class un{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class hn{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Wt.UNAUTHENTICATED))}shutdown(){}}class dn{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class fn{constructor(e){this.t=e,this.currentUser=Wt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){sn(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new ln;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ln,e.enqueueRetryable(()=>r(this.currentUser))};const s=()=>{const t=i;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{Xt("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(Xt("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ln)}},0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(Xt("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(sn("string"==typeof t.accessToken,31837,{l:t}),new un(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return sn(null===e||"string"==typeof e,2055,{h:e}),new Wt(e)}}class pn{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Wt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class mn{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new pn(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Wt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class gn{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class yn{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,wt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){sn(void 0===this.o,3512);const n=e=>{null!=e.error&&Xt("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,Xt("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{Xt("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):Xt("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new gn(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(sn("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new gn(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function _n(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class wn{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=_n(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function vn(e,t){return e<t?-1:e>t?1:0}function bn(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),i=t.charAt(r);if(n!==i)return Cn(n)===Cn(i)?vn(n,i):Cn(n)?1:-1}return vn(e.length,t.length)}const xn=55296,In=57343;function Cn(e){const t=e.charCodeAt(0);return t>=xn&&t<=In}function Tn(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}function Sn(e){return e+"\0"}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const En="__name__";class kn{constructor(e,t,n){void 0===t?t=0:t>e.length&&nn(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&nn(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===kn.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof kn?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=kn.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return vn(e.length,t.length)}static compareSegments(e,t){const n=kn.isNumericId(e),r=kn.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?kn.extractNumericId(e).compare(kn.extractNumericId(t)):bn(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Lt.fromString(e.substring(4,e.length-2))}}class Nn extends kn{construct(e,t,n){return new Nn(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new cn(an.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new Nn(t)}static emptyPath(){return new Nn([])}}const An=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Dn extends kn{construct(e,t,n){return new Dn(e,t,n)}static isValidIdentifier(e){return An.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Dn.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===En}static keyField(){return new Dn([En])}static fromServerFormat(e){const t=[];let n="",r=0;const i=()=>{if(0===n.length)throw new cn(an.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let s=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new cn(an.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new cn(an.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(s=!s,r++):"."!==t||s?(n+=t,r++):(i(),r++)}if(i(),s)throw new cn(an.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Dn(t)}static emptyPath(){return new Dn([])}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Pn{constructor(e){this.path=e}static fromPath(e){return new Pn(Nn.fromString(e))}static fromName(e){return new Pn(Nn.fromString(e).popFirst(5))}static empty(){return new Pn(Nn.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===Nn.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return Nn.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Pn(new Nn(e.slice()))}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Rn(e,t,n){if(!n)throw new cn(an.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function On(e){if(!Pn.isDocumentKey(e))throw new cn(an.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function Mn(e){if(Pn.isDocumentKey(e))throw new cn(an.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function Ln(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function Fn(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":nn(12329,{type:typeof e})}function jn(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new cn(an.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Fn(e);throw new cn(an.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
       * @license
       * Copyright 2025 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Vn(e,t){const n={typeString:e};return t&&(n.value=t),n}function qn(e,t){if(!Ln(e))throw new cn(an.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const i=t[r].typeString,s="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const o=e[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(void 0!==s&&o!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new cn(an.INVALID_ARGUMENT,n);return!0}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Un=-62135596800,zn=1e6;class Bn{static now(){return Bn.fromMillis(Date.now())}static fromDate(e){return Bn.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*zn);return new Bn(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new cn(an.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new cn(an.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Un)throw new cn(an.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new cn(an.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/zn}_compareTo(e){return this.seconds===e.seconds?vn(this.nanoseconds,e.nanoseconds):vn(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Bn._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(qn(e,Bn._jsonSchema))return new Bn(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Un;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Bn._jsonSchemaVersion="firestore/timestamp/1.0",Bn._jsonSchema={type:Vn("string",Bn._jsonSchemaVersion),seconds:Vn("number"),nanoseconds:Vn("number")};
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class Kn{static fromTimestamp(e){return new Kn(e)}static min(){return new Kn(new Bn(0,0))}static max(){return new Kn(new Bn(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
       * @license
       * Copyright 2021 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class $n{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}function Gn(e){return e.fields.find(e=>2===e.kind)}function Hn(e){return e.fields.filter(e=>2!==e.kind)}$n.UNKNOWN_ID=-1;class Wn{constructor(e,t){this.fieldPath=e,this.kind=t}}class Yn{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Yn(0,Jn.min())}}function Qn(e){return new Jn(e.readTime,e.key,-1)}class Jn{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Jn(Kn.min(),Pn.empty(),-1)}static max(){return new Jn(Kn.max(),Pn.empty(),-1)}}function Xn(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=Pn.comparator(e.documentKey,t.documentKey),0!==n?n:vn(e.largestBatchId,t.largestBatchId)
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */)}const Zn="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class er{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */async function tr(e){if(e.code!==an.FAILED_PRECONDITION||e.message!==Zn)throw e;Xt("LocalStore","Unexpectedly lost primary lease")}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class nr{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&nn(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new nr((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof nr?t:nr.resolve(t)}catch(e){return nr.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):nr.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):nr.reject(t)}static resolve(e){return new nr((t,n)=>{t(e)})}static reject(e){return new nr((t,n)=>{n(e)})}static waitFor(e){return new nr((t,n)=>{let r=0,i=0,s=!1;e.forEach(e=>{++r,e.next(()=>{++i,s&&i===r&&t()},e=>n(e))}),s=!0,i===r&&t()})}static or(e){let t=nr.resolve(!1);for(const n of e)t=t.next(e=>e?nr.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new nr((n,r)=>{const i=e.length,s=new Array(i);let o=0;for(let a=0;a<i;a++){const c=a;t(e[c]).next(e=>{s[c]=e,++o,o===i&&n(s)},e=>r(e))}})}static doWhile(e,t){return new nr((n,r)=>{const i=()=>{!0===e()?t().next(()=>{i()},r):n()};i()})}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const rr="SimpleDb";class ir{static open(e,t,n,r){try{return new ir(t,e.transaction(r,n))}catch(e){throw new cr(t,e)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new ln,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new cr(e,t.error)):this.S.resolve()},this.transaction.onerror=t=>{const n=fr(t.target.error);this.S.reject(new cr(e,n))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(Xt(rr,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||"function"!=typeof e.commit||e.commit()}store(e){const t=this.transaction.objectStore(e);return new ur(t)}}class sr{static delete(e){return Xt(rr,"Removing database:",e),hr(S().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!z())return!1;if(sr.F())return!0;const e=F(),t=sr.M(e),n=0<t&&t<10,r=or(e),i=0<r&&r<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){return"undefined"!=typeof process&&"YES"===process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,12.2===sr.M(F())&&Zt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(Xt(rr,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=e=>{const n=e.target.result;t(n)},r.onblocked=()=>{n(new cr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=t=>{const r=t.target.error;"VersionError"===r.name?n(new cn(an.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):"InvalidStateError"===r.name?n(new cn(an.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+r)):n(new cr(e,r))},r.onupgradeneeded=e=>{Xt(rr,'Database "'+this.name+'" requires upgrade from version:',e.oldVersion);const t=e.target.result;this.N.k(t,r.transaction,e.oldVersion,this.version).next(()=>{Xt(rr,"Database upgrade to version "+this.version+" complete")})}})),this.K&&(this.db.onversionchange=e=>this.K(e)),this.db}q(e){this.K=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,r){const i="readonly"===t;let s=0;for(;;){++s;try{this.db=await this.L(e);const t=ir.open(this.db,e,i?"readonly":"readwrite",n),s=r(t).next(e=>(t.C(),e)).catch(e=>(t.abort(e),nr.reject(e))).toPromise();return s.catch(()=>{}),await t.D,s}catch(e){const t=e,n="FirebaseError"!==t.name&&s<3;if(Xt(rr,"Transaction failed with error:",t.message,"Retrying:",n),this.close(),!n)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}function or(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}class ar{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return hr(this.U.delete())}}class cr extends cn{constructor(e,t){super(an.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function lr(e){return"IndexedDbTransactionError"===e.name}class ur{constructor(e){this.store=e}put(e,t){let n;return void 0!==t?(Xt(rr,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(Xt(rr,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),hr(n)}add(e){return Xt(rr,"ADD",this.store.name,e,e),hr(this.store.add(e))}get(e){return hr(this.store.get(e)).next(t=>(void 0===t&&(t=null),Xt(rr,"GET",this.store.name,e,t),t))}delete(e){return Xt(rr,"DELETE",this.store.name,e),hr(this.store.delete(e))}count(){return Xt(rr,"COUNT",this.store.name),hr(this.store.count())}H(e,t){const n=this.options(e,t),r=n.index?this.store.index(n.index):this.store;if("function"==typeof r.getAll){const e=r.getAll(n.range);return new nr((t,n)=>{e.onerror=e=>{n(e.target.error)},e.onsuccess=e=>{t(e.target.result)}})}{const e=this.cursor(n),t=[];return this.J(e,(e,n)=>{t.push(n)}).next(()=>t)}}Z(e,t){const n=this.store.getAll(e,null===t?void 0:t);return new nr((e,t)=>{n.onerror=e=>{t(e.target.error)},n.onsuccess=t=>{e(t.target.result)}})}X(e,t){Xt(rr,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Y=!1;const r=this.cursor(n);return this.J(r,(e,t,n)=>n.delete())}ee(e,t){let n;t?n=e:(n={},t=e);const r=this.cursor(n);return this.J(r,t)}te(e){const t=this.cursor({});return new nr((n,r)=>{t.onerror=e=>{const t=fr(e.target.error);r(t)},t.onsuccess=t=>{const r=t.target.result;r?e(r.primaryKey,r.value).next(e=>{e?r.continue():n()}):n()}})}J(e,t){const n=[];return new nr((r,i)=>{e.onerror=e=>{i(e.target.error)},e.onsuccess=e=>{const i=e.target.result;if(!i)return void r();const s=new ar(i),o=t(i.primaryKey,i.value,s);if(o instanceof nr){const e=o.catch(e=>(s.done(),nr.reject(e)));n.push(e)}s.isDone?r():null===s.G?i.continue():i.continue(s.G)}}).next(()=>nr.waitFor(n))}options(e,t){let n;return void 0!==e&&("string"==typeof e?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Y?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function hr(e){return new nr((t,n)=>{e.onsuccess=e=>{const n=e.target.result;t(n)},e.onerror=e=>{const t=fr(e.target.error);n(t)}})}let dr=!1;function fr(e){const t=sr.M(F());if(t>=12.2&&t<13){const t="An internal error was encountered in the Indexed Database server";if(e.message.indexOf(t)>=0){const e=new cn("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return dr||(dr=!0,setTimeout(()=>{throw e},0)),e}}return e}const pr="IndexBackfiller";class mr{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return null!==this.task}re(e){Xt(pr,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const e=await this.ne.ie();Xt(pr,`Documents written: ${e}`)}catch(e){lr(e)?Xt(pr,"Ignoring IndexedDB error during index backfill: ",e):await tr(e)}await this.re(6e4)})}}class gr{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const n=new Set;let r=t,i=!0;return nr.doWhile(()=>!0===i&&r>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(t=>{if(null!==t&&!n.has(t))return Xt(pr,`Processing collection: ${t}`),this.oe(e,t,r).next(e=>{r-=e,n.add(t)});i=!1})).next(()=>t-r)}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(r=>this.localStore.localDocuments.getNextDocuments(e,t,r,n).next(n=>{const i=n.changes;return this.localStore.indexManager.updateIndexEntries(e,i).next(()=>this._e(r,n)).next(n=>(Xt(pr,`Updating offset: ${n}`),this.localStore.indexManager.updateCollectionGroup(e,t,n))).next(()=>i.size)}))}_e(e,t){let n=e;return t.changes.forEach((e,t)=>{const r=Qn(t);Xn(r,n)>0&&(n=r)}),new Jn(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}
/**
       * @license
       * Copyright 2018 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class yr{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}yr.ce=-1;
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const _r=-1;function wr(e){return null==e}function vr(e){return 0===e&&1/e==-1/0}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
const br="";function xr(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=Cr(t)),t=Ir(e.get(n),t);return Cr(t)}function Ir(e,t){let n=t;const r=e.length;for(let i=0;i<r;i++){const t=e.charAt(i);switch(t){case"\0":n+="";break;case br:n+="";break;default:n+=t}}return n}function Cr(e){return e+br+""}function Tr(e){const t=e.length;if(sn(t>=2,64408,{path:e}),2===t)return sn(e.charAt(0)===br&&""===e.charAt(1),56145,{path:e}),Nn.emptyPath();const n=t-2,r=[];let i="";for(let s=0;s<t;){const t=e.indexOf(br,s);switch((t<0||t>n)&&nn(50515,{path:e}),e.charAt(t+1)){case"":const n=e.substring(s,t);let o;0===i.length?o=n:(i+=n,o=i,i=""),r.push(o);break;case"":i+=e.substring(s,t),i+="\0";break;case"":i+=e.substring(s,t+1);break;default:nn(61167,{path:e})}s=t+2}return new Nn(r)}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Sr="remoteDocuments",Er="owner",kr="owner",Nr="mutationQueues",Ar="mutations",Dr="batchId",Pr="userMutationsIndex",Rr=["userId","batchId"];
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Or(e,t){return[e,xr(t)]}function Mr(e,t,n){return[e,xr(t),n]}const Lr={},Fr="documentMutations",jr="remoteDocumentsV14",Vr=["prefixPath","collectionGroup","readTime","documentId"],qr="documentKeyIndex",Ur=["prefixPath","collectionGroup","documentId"],zr="collectionGroupIndex",Br=["collectionGroup","readTime","prefixPath","documentId"],Kr="remoteDocumentGlobal",$r="remoteDocumentGlobalKey",Gr="targets",Hr="queryTargetsIndex",Wr=["canonicalId","targetId"],Yr="targetDocuments",Qr=["targetId","path"],Jr="documentTargetsIndex",Xr=["path","targetId"],Zr="targetGlobalKey",ei="targetGlobal",ti="collectionParents",ni=["collectionId","parent"],ri="clientMetadata",ii="bundles",si="namedQueries",oi="indexConfiguration",ai="collectionGroupIndex",ci="indexState",li=["indexId","uid"],ui="sequenceNumberIndex",hi=["uid","sequenceNumber"],di="indexEntries",fi=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],pi="documentKeyIndex",mi=["indexId","uid","orderedDocumentKey"],gi="documentOverlays",yi=["userId","collectionPath","documentId"],_i="collectionPathOverlayIndex",wi=["userId","collectionPath","largestBatchId"],vi="collectionGroupOverlayIndex",bi=["userId","collectionGroup","largestBatchId"],xi="globals",Ii=[Nr,Ar,Fr,Sr,Gr,Er,ei,Yr,ri,Kr,ti,ii,si],Ci=[...Ii,gi],Ti=[Nr,Ar,Fr,jr,Gr,Er,ei,Yr,ri,Kr,ti,ii,si,gi],Si=Ti,Ei=[...Si,oi,ci,di],ki=Ei,Ni=[...Ei,xi],Ai=Ni;
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Di extends er{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Pi(e,t){const n=on(e);return sr.O(n.le,t)}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Ri(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Oi(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function Mi(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */let Li=class e{constructor(e,t){this.comparator=e,this.root=t||ji.EMPTY}insert(t,n){return new e(this.comparator,this.root.insert(t,n,this.comparator).copy(null,null,ji.BLACK,null,null))}remove(t){return new e(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ji.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Fi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Fi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Fi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Fi(this.root,e,this.comparator,!0)}},Fi=class{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},ji=class e{constructor(t,n,r,i,s){this.key=t,this.value=n,this.color=null!=r?r:e.RED,this.left=null!=i?i:e.EMPTY,this.right=null!=s?s:e.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,n,r,i,s){return new e(null!=t?t:this.key,null!=n?n:this.value,null!=r?r:this.color,null!=i?i:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return e.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,n){let r,i=this;if(n(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),0===n(t,i.key)){if(i.right.isEmpty())return e.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const t=this.copy(null,null,e.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,e.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw nn(43730,{key:this.key,value:this.value});if(this.right.isRed())throw nn(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw nn(27949);return e+(this.isRed()?0:1)}};ji.EMPTY=null,ji.RED=!0,ji.BLACK=!1,ji.EMPTY=new class{constructor(){this.size=0}get key(){throw nn(57766)}get value(){throw nn(16141)}get color(){throw nn(16727)}get left(){throw nn(29726)}get right(){throw nn(36894)}copy(e,t,n,r,i){return this}insert(e,t,n){return new ji(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class Vi{constructor(e){this.comparator=e,this.data=new Li(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new qi(this.data.getIterator())}getIteratorFrom(e){return new qi(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof Vi))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Vi(this.comparator);return t.data=e,t}}class qi{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Ui(e){return e.hasNext()?e.getNext():void 0}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class zi{constructor(e){this.fields=e,e.sort(Dn.comparator)}static empty(){return new zi([])}unionWith(e){let t=new Vi(Dn.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new zi(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Tn(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
       * @license
       * Copyright 2023 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Bi extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Ki{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new Bi("Invalid base64 string: "+e):e}}(e);return new Ki(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new Ki(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return vn(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ki.EMPTY_BYTE_STRING=new Ki("");const $i=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Gi(e){if(sn(!!e,39018),"string"==typeof e){let t=0;const n=$i.exec(e);if(sn(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Hi(e.seconds),nanos:Hi(e.nanos)}}function Hi(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Wi(e){return"string"==typeof e?Ki.fromBase64String(e):Ki.fromUint8Array(e)}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Yi="server_timestamp",Qi="__type__",Ji="__previous_value__",Xi="__local_write_time__";function Zi(e){const t=(e?.mapValue?.fields||{})[Qi]?.stringValue;return t===Yi}function es(e){const t=e.mapValue.fields[Ji];return Zi(t)?es(t):t}function ts(e){const t=Gi(e.mapValue.fields[Xi].timestampValue);return new Bn(t.seconds,t.nanos)}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class ns{constructor(e,t,n,r,i,s,o,a,c,l,u){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=l,this.apiKey=u}}const rs="(default)";class is{constructor(e,t){this.projectId=e,this.database=t||rs}static empty(){return new is("","")}get isDefaultDatabase(){return this.database===rs}isEqual(e){return e instanceof is&&e.projectId===this.projectId&&e.database===this.database}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
const ss="__type__",os="__max__",as={mapValue:{fields:{__type__:{stringValue:os}}}},cs="__vector__",ls="value",us={nullValue:"NULL_VALUE"};function hs(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?Zi(e)?4:ks(e)?9007199254740991:Ss(e)?10:11:nn(28295,{value:e})}function ds(e,t){if(e===t)return!0;const n=hs(e);if(n!==hs(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return ts(e).isEqual(ts(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=Gi(e.timestampValue),r=Gi(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return Wi(e.bytesValue).isEqual(Wi(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Hi(e.geoPointValue.latitude)===Hi(t.geoPointValue.latitude)&&Hi(e.geoPointValue.longitude)===Hi(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Hi(e.integerValue)===Hi(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Hi(e.doubleValue),r=Hi(t.doubleValue);return n===r?vr(n)===vr(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return Tn(e.arrayValue.values||[],t.arrayValue.values||[],ds);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(Ri(n)!==Ri(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!ds(n[i],r[i])))return!1;return!0}(e,t);default:return nn(52216,{left:e})}}function fs(e,t){return void 0!==(e.values||[]).find(e=>ds(e,t))}function ps(e,t){if(e===t)return 0;const n=hs(e),r=hs(t);if(n!==r)return vn(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return vn(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Hi(e.integerValue||e.doubleValue),r=Hi(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return ms(e.timestampValue,t.timestampValue);case 4:return ms(ts(e),ts(t));case 5:return bn(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Wi(e),r=Wi(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let i=0;i<n.length&&i<r.length;i++){const e=vn(n[i],r[i]);if(0!==e)return e}return vn(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=vn(Hi(e.latitude),Hi(t.latitude));return 0!==n?n:vn(Hi(e.longitude),Hi(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return gs(e.arrayValue,t.arrayValue);case 10:return function(e,t){const n=e.fields||{},r=t.fields||{},i=n[ls]?.arrayValue,s=r[ls]?.arrayValue,o=vn(i?.values?.length||0,s?.values?.length||0);return 0!==o?o:gs(i,s)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===as.mapValue&&t===as.mapValue)return 0;if(e===as.mapValue)return 1;if(t===as.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let o=0;o<r.length&&o<s.length;++o){const e=bn(r[o],s[o]);if(0!==e)return e;const t=ps(n[r[o]],i[s[o]]);if(0!==t)return t}return vn(r.length,s.length)}(e.mapValue,t.mapValue);default:throw nn(23264,{he:n})}}function ms(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return vn(e,t);const n=Gi(e),r=Gi(t),i=vn(n.seconds,r.seconds);return 0!==i?i:vn(n.nanos,r.nanos)}function gs(e,t){const n=e.values||[],r=t.values||[];for(let i=0;i<n.length&&i<r.length;++i){const e=ps(n[i],r[i]);if(e)return e}return vn(n.length,r.length)}function ys(e){return _s(e)}function _s(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=Gi(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?function(e){return Wi(e).toBase64()}(e.bytesValue):"referenceValue"in e?function(e){return Pn.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=_s(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const i of t)r?r=!1:n+=",",n+=`${i}:${_s(e.fields[i])}`;return n+"}"}(e.mapValue):nn(61005,{value:e})}function ws(e){switch(hs(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=es(e);return t?16+ws(t):16;case 5:return 2*e.stringValue.length;case 6:return Wi(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return function(e){return(e.values||[]).reduce((e,t)=>e+ws(t),0)}(e.arrayValue);case 10:case 11:return function(e){let t=0;return Oi(e.fields,(e,n)=>{t+=e.length+ws(n)}),t}(e.mapValue);default:throw nn(13486,{value:e})}}function vs(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function bs(e){return!!e&&"integerValue"in e}function xs(e){return!!e&&"arrayValue"in e}function Is(e){return!!e&&"nullValue"in e}function Cs(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Ts(e){return!!e&&"mapValue"in e}function Ss(e){const t=(e?.mapValue?.fields||{})[ss]?.stringValue;return t===cs}function Es(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return Oi(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=Es(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=Es(e.arrayValue.values[n]);return t}return{...e}}function ks(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===os}const Ns={mapValue:{fields:{[ss]:{stringValue:cs},[ls]:{arrayValue:{}}}}};function As(e){return"nullValue"in e?us:"booleanValue"in e?{booleanValue:!1}:"integerValue"in e||"doubleValue"in e?{doubleValue:NaN}:"timestampValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in e?{stringValue:""}:"bytesValue"in e?{bytesValue:""}:"referenceValue"in e?vs(is.empty(),Pn.empty()):"geoPointValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in e?{arrayValue:{}}:"mapValue"in e?Ss(e)?Ns:{mapValue:{}}:nn(35942,{value:e})}function Ds(e){return"nullValue"in e?{booleanValue:!1}:"booleanValue"in e?{doubleValue:NaN}:"integerValue"in e||"doubleValue"in e?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in e?{stringValue:""}:"stringValue"in e?{bytesValue:""}:"bytesValue"in e?vs(is.empty(),Pn.empty()):"referenceValue"in e?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in e?{arrayValue:{}}:"arrayValue"in e?Ns:"mapValue"in e?Ss(e)?{mapValue:{}}:as:nn(61959,{value:e})}function Ps(e,t){const n=ps(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?-1:!e.inclusive&&t.inclusive?1:0}function Rs(e,t){const n=ps(e.value,t.value);return 0!==n?n:e.inclusive&&!t.inclusive?1:!e.inclusive&&t.inclusive?-1:0}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Os{constructor(e){this.value=e}static empty(){return new Os({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Ts(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Es(t)}setAll(e){let t=Dn.emptyPath(),n={},r=[];e.forEach((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=Es(e):r.push(i.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){const t=this.field(e.popLast());Ts(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ds(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];Ts(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){Oi(t,(t,n)=>e[t]=n);for(const r of n)delete e[r]}clone(){return new Os(Es(this.value))}}function Ms(e){const t=[];return Oi(e.fields,(e,n)=>{const r=new Dn([e]);if(Ts(n)){const e=Ms(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new zi(t)
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */}class Ls{constructor(e,t,n,r,i,s,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=o}static newInvalidDocument(e){return new Ls(e,0,Kn.min(),Kn.min(),Kn.min(),Os.empty(),0)}static newFoundDocument(e,t,n,r){return new Ls(e,1,t,Kn.min(),n,r,0)}static newNoDocument(e,t){return new Ls(e,2,t,Kn.min(),Kn.min(),Os.empty(),0)}static newUnknownDocument(e,t){return new Ls(e,3,t,Kn.min(),Kn.min(),Os.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Kn.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Os.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Os.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Kn.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof Ls&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ls(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Fs{constructor(e,t){this.position=e,this.inclusive=t}}function js(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){const s=t[i],o=e.position[i];if(r=s.field.isKeyField()?Pn.comparator(Pn.fromName(o.referenceValue),n.key):ps(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function Vs(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!ds(e.position[n],t.position[n]))return!1;return!0}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class qs{constructor(e,t="asc"){this.field=e,this.dir=t}}function Us(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class zs{}class Bs extends zs{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new Zs(e,t,n):"array-contains"===t?new ro(e,n):"in"===t?new io(e,n):"not-in"===t?new so(e,n):"array-contains-any"===t?new oo(e,n):new Bs(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new eo(e,n):new to(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(ps(t,this.value)):null!==t&&hs(this.value)===hs(t)&&this.matchesComparison(ps(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return nn(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ks extends zs{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Ks(e,t)}matches(e){return $s(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function $s(e){return"and"===e.op}function Gs(e){return"or"===e.op}function Hs(e){return Ws(e)&&$s(e)}function Ws(e){for(const t of e.filters)if(t instanceof Ks)return!1;return!0}function Ys(e){if(e instanceof Bs)return e.field.canonicalString()+e.op.toString()+ys(e.value);if(Hs(e))return e.filters.map(e=>Ys(e)).join(",");{const t=e.filters.map(e=>Ys(e)).join(",");return`${e.op}(${t})`}}function Qs(e,t){return e instanceof Bs?function(e,t){return t instanceof Bs&&e.op===t.op&&e.field.isEqual(t.field)&&ds(e.value,t.value)}(e,t):e instanceof Ks?function(e,t){return t instanceof Ks&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&Qs(n,t.filters[r]),!0)}(e,t):void nn(19439)}function Js(e,t){const n=e.filters.concat(t);return Ks.create(n,e.op)}function Xs(e){return e instanceof Bs?function(e){return`${e.field.canonicalString()} ${e.op} ${ys(e.value)}`}(e):e instanceof Ks?function(e){return e.op.toString()+" {"+e.getFilters().map(Xs).join(" ,")+"}"}(e):"Filter"}class Zs extends Bs{constructor(e,t,n){super(e,t,n),this.key=Pn.fromName(n.referenceValue)}matches(e){const t=Pn.comparator(e.key,this.key);return this.matchesComparison(t)}}class eo extends Bs{constructor(e,t){super(e,"in",t),this.keys=no(0,t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class to extends Bs{constructor(e,t){super(e,"not-in",t),this.keys=no(0,t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function no(e,t){return(t.arrayValue?.values||[]).map(e=>Pn.fromName(e.referenceValue))}class ro extends Bs{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return xs(t)&&fs(t.arrayValue,this.value)}}class io extends Bs{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&fs(this.value.arrayValue,t)}}class so extends Bs{constructor(e,t){super(e,"not-in",t)}matches(e){if(fs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!fs(this.value.arrayValue,t)}}class oo extends Bs{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!xs(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>fs(this.value.arrayValue,e))}}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class ao{constructor(e,t=null,n=[],r=[],i=null,s=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.Te=null}}function co(e,t=null,n=[],r=[],i=null,s=null,o=null){return new ao(e,t,n,r,i,s,o)}function lo(e){const t=on(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>Ys(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>function(e){return e.field.canonicalString()+e.dir}(e)).join(","),wr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>ys(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>ys(e)).join(",")),t.Te=e}return t.Te}function uo(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!Us(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!Qs(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Vs(e.startAt,t.startAt)&&Vs(e.endAt,t.endAt)}function ho(e){return Pn.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function fo(e,t){return e.filters.filter(e=>e instanceof Bs&&e.field.isEqual(t))}function po(e,t,n){let r=us,i=!0;for(const s of fo(e,t)){let e=us,t=!0;switch(s.op){case"<":case"<=":e=As(s.value);break;case"==":case"in":case">=":e=s.value;break;case">":e=s.value,t=!1;break;case"!=":case"not-in":e=us}Ps({value:r,inclusive:i},{value:e,inclusive:t})<0&&(r=e,i=t)}if(null!==n)for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){const e=n.position[s];Ps({value:r,inclusive:i},{value:e,inclusive:n.inclusive})<0&&(r=e,i=n.inclusive);break}return{value:r,inclusive:i}}function mo(e,t,n){let r=as,i=!0;for(const s of fo(e,t)){let e=as,t=!0;switch(s.op){case">=":case">":e=Ds(s.value),t=!1;break;case"==":case"in":case"<=":e=s.value;break;case"<":e=s.value,t=!1;break;case"!=":case"not-in":e=as}Rs({value:r,inclusive:i},{value:e,inclusive:t})>0&&(r=e,i=t)}if(null!==n)for(let s=0;s<e.orderBy.length;++s)if(e.orderBy[s].field.isEqual(t)){const e=n.position[s];Rs({value:r,inclusive:i},{value:e,inclusive:n.inclusive})>0&&(r=e,i=n.inclusive);break}return{value:r,inclusive:i}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class go{constructor(e,t=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function yo(e){return new go(e)}function _o(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function wo(e){return null!==e.collectionGroup}function vo(e){const t=on(e);if(null===t.Ie){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",r=function(e){let t=new Vi(Dn.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t}(t);r.forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ie.push(new qs(r,n))}),e.has(Dn.keyField().canonicalString())||t.Ie.push(new qs(Dn.keyField(),n))}return t.Ie}function bo(e){const t=on(e);return t.Ee||(t.Ee=function(e,t){if("F"===e.limitType)return co(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new qs(e.field,t)});const n=e.endAt?new Fs(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Fs(e.startAt.position,e.startAt.inclusive):null;return co(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}(t,vo(e))),t.Ee}function xo(e,t){const n=e.filters.concat([t]);return new go(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Io(e,t,n){return new go(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Co(e,t){return uo(bo(e),bo(t))&&e.limitType===t.limitType}function To(e){return`${lo(bo(e))}|lt:${e.limitType}`}function So(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>Xs(e)).join(", ")}]`),wr(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>ys(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>ys(e)).join(",")),`Target(${t})`}(bo(e))}; limitType=${e.limitType})`}function Eo(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):Pn.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of vo(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const r=js(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,vo(e),t)||e.endAt&&!function(e,t,n){const r=js(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,vo(e),t))}(e,t)}function ko(e){return(t,n)=>{let r=!1;for(const i of vo(e)){const e=No(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}function No(e,t,n){const r=e.field.isKeyField()?Pn.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?ps(r,i):nn(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return nn(19790,{direction:e.dir})}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Ao{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,i]of n)if(this.equalsFn(r,e))return i}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Oi(this.inner,(t,n)=>{for(const[r,i]of n)e(r,i)})}isEmpty(){return Mi(this.inner)}size(){return this.innerSize}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Do=new Li(Pn.comparator);function Po(){return Do}const Ro=new Li(Pn.comparator);function Oo(...e){let t=Ro;for(const n of e)t=t.insert(n.key,n);return t}function Mo(e){let t=Ro;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Lo(){return jo()}function Fo(){return jo()}function jo(){return new Ao(e=>e.toString(),(e,t)=>e.isEqual(t))}const Vo=new Li(Pn.comparator),qo=new Vi(Pn.comparator);function Uo(...e){let t=qo;for(const n of e)t=t.add(n);return t}const zo=new Vi(vn);
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
function Bo(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:vr(t)?"-0":t}}function Ko(e){return{integerValue:""+e}}function $o(e,t){return function(e){return"number"==typeof e&&Number.isInteger(e)&&!vr(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}(t)?Ko(t):Bo(e,t)}
/**
       * @license
       * Copyright 2018 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Go{constructor(){this._=void 0}}function Ho(e,t,n){return e instanceof Qo?function(e,t){const n={fields:{[Qi]:{stringValue:Yi},[Xi]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&Zi(t)&&(t=es(t)),t&&(n.fields[Ji]=t),{mapValue:n}}(n,t):e instanceof Jo?Xo(e,t):e instanceof Zo?ea(e,t):function(e,t){const n=Yo(e,t),r=na(n)+na(e.Ae);return bs(n)&&bs(e.Ae)?Ko(r):Bo(e.serializer,r)}(e,t)}function Wo(e,t,n){return e instanceof Jo?Xo(e,t):e instanceof Zo?ea(e,t):n}function Yo(e,t){return e instanceof ta?function(e){return bs(e)||function(e){return!!e&&"doubleValue"in e}(e)}(t)?t:{integerValue:0}:null}class Qo extends Go{}class Jo extends Go{constructor(e){super(),this.elements=e}}function Xo(e,t){const n=ra(t);for(const r of e.elements)n.some(e=>ds(e,r))||n.push(r);return{arrayValue:{values:n}}}class Zo extends Go{constructor(e){super(),this.elements=e}}function ea(e,t){let n=ra(t);for(const r of e.elements)n=n.filter(e=>!ds(e,r));return{arrayValue:{values:n}}}class ta extends Go{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function na(e){return Hi(e.integerValue||e.doubleValue)}function ra(e){return xs(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class ia{constructor(e,t){this.field=e,this.transform=t}}class sa{constructor(e,t){this.version=e,this.transformResults=t}}class oa{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new oa}static exists(e){return new oa(void 0,e)}static updateTime(e){return new oa(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function aa(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class ca{}function la(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new wa(e.key,oa.none()):new pa(e.key,e.data,oa.none());{const n=e.data,r=Os.empty();let i=new Vi(Dn.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new ma(e.key,r,new zi(i.toArray()),oa.none())}}function ua(e,t,n){e instanceof pa?function(e,t,n){const r=e.value.clone(),i=ya(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof ma?function(e,t,n){if(!aa(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=ya(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(ga(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function ha(e,t,n,r){return e instanceof pa?function(e,t,n,r){if(!aa(e.precondition,t))return n;const i=e.value.clone(),s=_a(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof ma?function(e,t,n,r){if(!aa(e.precondition,t))return n;const i=_a(e.fieldTransforms,r,t),s=t.data;return s.setAll(ga(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):function(e,t,n){return aa(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function da(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),i=Yo(r.transform,e||null);null!=i&&(null===n&&(n=Os.empty()),n.set(r.field,i))}return n||null}function fa(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&Tn(e,t,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof Jo&&t instanceof Jo||e instanceof Zo&&t instanceof Zo?Tn(e.elements,t.elements,ds):e instanceof ta&&t instanceof ta?ds(e.Ae,t.Ae):e instanceof Qo&&t instanceof Qo}(e.transform,t.transform)}(e,t))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class pa extends ca{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class ma extends ca{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function ga(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function ya(e,t,n){const r=new Map;sn(e.length===n.length,32656,{Ve:n.length,de:e.length});for(let i=0;i<n.length;i++){const s=e[i],o=s.transform,a=t.data.field(s.field);r.set(s.field,Wo(o,a,n[i]))}return r}function _a(e,t,n){const r=new Map;for(const i of e){const e=i.transform,s=n.data.field(i.field);r.set(i.field,Ho(e,s,t))}return r}class wa extends ca{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class va extends ca{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class ba{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&ua(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=ha(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=ha(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Fo();return this.mutations.forEach(r=>{const i=e.get(r.key),s=i.overlayedDocument;let o=this.applyToLocalView(s,i.mutatedFields);o=t.has(r.key)?null:o;const a=la(s,o);null!==a&&n.set(r.key,a),s.isValidDocument()||s.convertToNoDocument(Kn.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Uo())}isEqual(e){return this.batchId===e.batchId&&Tn(this.mutations,e.mutations,(e,t)=>fa(e,t))&&Tn(this.baseMutations,e.baseMutations,(e,t)=>fa(e,t))}}class xa{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){sn(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let r=Vo;const i=e.mutations;for(let s=0;s<i.length;s++)r=r.insert(i[s].key,n[s].version);return new xa(e,t,n,r)}}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Ia{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Ca{constructor(e,t){this.count=e,this.unchangedNames=t}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */var Ta,Sa;function Ea(e){if(void 0===e)return Zt("GRPC error has no .code"),an.UNKNOWN;switch(e){case Ta.OK:return an.OK;case Ta.CANCELLED:return an.CANCELLED;case Ta.UNKNOWN:return an.UNKNOWN;case Ta.DEADLINE_EXCEEDED:return an.DEADLINE_EXCEEDED;case Ta.RESOURCE_EXHAUSTED:return an.RESOURCE_EXHAUSTED;case Ta.INTERNAL:return an.INTERNAL;case Ta.UNAVAILABLE:return an.UNAVAILABLE;case Ta.UNAUTHENTICATED:return an.UNAUTHENTICATED;case Ta.INVALID_ARGUMENT:return an.INVALID_ARGUMENT;case Ta.NOT_FOUND:return an.NOT_FOUND;case Ta.ALREADY_EXISTS:return an.ALREADY_EXISTS;case Ta.PERMISSION_DENIED:return an.PERMISSION_DENIED;case Ta.FAILED_PRECONDITION:return an.FAILED_PRECONDITION;case Ta.ABORTED:return an.ABORTED;case Ta.OUT_OF_RANGE:return an.OUT_OF_RANGE;case Ta.UNIMPLEMENTED:return an.UNIMPLEMENTED;case Ta.DATA_LOSS:return an.DATA_LOSS;default:return nn(39323,{code:e})}}(Sa=Ta||(Ta={}))[Sa.OK=0]="OK",Sa[Sa.CANCELLED=1]="CANCELLED",Sa[Sa.UNKNOWN=2]="UNKNOWN",Sa[Sa.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Sa[Sa.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Sa[Sa.NOT_FOUND=5]="NOT_FOUND",Sa[Sa.ALREADY_EXISTS=6]="ALREADY_EXISTS",Sa[Sa.PERMISSION_DENIED=7]="PERMISSION_DENIED",Sa[Sa.UNAUTHENTICATED=16]="UNAUTHENTICATED",Sa[Sa.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Sa[Sa.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Sa[Sa.ABORTED=10]="ABORTED",Sa[Sa.OUT_OF_RANGE=11]="OUT_OF_RANGE",Sa[Sa.UNIMPLEMENTED=12]="UNIMPLEMENTED",Sa[Sa.INTERNAL=13]="INTERNAL",Sa[Sa.UNAVAILABLE=14]="UNAVAILABLE",Sa[Sa.DATA_LOSS=15]="DATA_LOSS";
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
const ka=new Lt([4294967295,4294967295],0);function Na(e){const t=(new TextEncoder).encode(e),n=new Ft;return n.update(t),new Uint8Array(n.digest())}function Aa(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),s=t.getUint32(12,!0);return[new Lt([n,r],0),new Lt([i,s],0)]}class Da{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Pa(`Invalid padding: ${t}`);if(n<0)throw new Pa(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new Pa(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new Pa(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Lt.fromNumber(this.ge)}ye(e,t,n){let r=e.add(t.multiply(Lt.fromNumber(n)));return 1===r.compare(ka)&&(r=new Lt([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=Na(e),[n,r]=Aa(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,r,i);if(!this.we(e))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),s=new Da(i,r,t);return n.forEach(e=>s.insert(e)),s}insert(e){if(0===this.ge)return;const t=Na(e),[n,r]=Aa(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,r,i);this.be(e)}}be(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Pa extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Ra{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,Oa.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Ra(Kn.min(),r,new Li(vn),Po(),Uo())}}class Oa{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Oa(n,t,Uo(),Uo(),Uo())}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Ma{constructor(e,t,n,r){this.Se=e,this.removedTargetIds=t,this.key=n,this.De=r}}class La{constructor(e,t){this.targetId=e,this.Ce=t}}class Fa{constructor(e,t,n=Ki.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class ja{constructor(){this.ve=0,this.Fe=Ua(),this.Me=Ki.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Uo(),t=Uo(),n=Uo();return this.Fe.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:nn(38017,{changeType:i})}}),new Oa(this.Me,this.xe,e,t,n)}Ke(){this.Oe=!1,this.Fe=Ua()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,sn(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Va{constructor(e){this.Ge=e,this.ze=new Map,this.je=Po(),this.He=qa(),this.Je=qa(),this.Ze=new Li(vn)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.Ke(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:nn(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){const t=e.targetId,n=e.Ce.count,r=this.ot(t);if(r){const i=r.target;if(ho(i))if(0===n){const e=new Pn(i.path);this.et(t,e,Ls.newNoDocument(e,Kn.min()))}else sn(1===n,20013,{expectedCount:n});else{const r=this._t(t);if(r!==n){const n=this.ut(e),i=n?this.ct(n,e,r):1;if(0!==i){this.it(t);const e=2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,e)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:i=0}=t;let s,o;try{s=Wi(n).toUint8Array()}catch(e){if(e instanceof Bi)return en("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{o=new Da(s,r,i)}catch(e){return en(e instanceof Pa?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===o.ge?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const i=this.Ge.ht(),s=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(s)||(this.et(t,n,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((n,r)=>{const i=this.ot(r);if(i){if(n.current&&ho(i.target)){const t=new Pn(i.target.path);this.It(t).has(r)||this.Et(r,t)||this.et(r,t,Ls.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.Ke())}});let n=Uo();this.Je.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));const r=new Ra(e,t,this.Ze,this.je,n);return this.je=Po(),this.He=qa(),this.Je=qa(),this.Ze=new Li(vn),r}Ye(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,n),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.qe(t,1):r.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new ja,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new Vi(vn),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new Vi(vn),this.He=this.He.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||Xt("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new ja),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function qa(){return new Li(Pn.comparator)}function Ua(){return new Li(Pn.comparator)}const za={asc:"ASCENDING",desc:"DESCENDING"},Ba={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Ka={and:"AND",or:"OR"};class $a{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ga(e,t){return e.useProto3Json||wr(t)?t:{value:t}}function Ha(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Wa(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Ya(e,t){return Ha(e,t.toTimestamp())}function Qa(e){return sn(!!e,49232),Kn.fromTimestamp(function(e){const t=Gi(e);return new Bn(t.seconds,t.nanos)}(e))}function Ja(e,t){return Xa(e,t).canonicalString()}function Xa(e,t){const n=function(e){return new Nn(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?n:n.child(t)}function Za(e){const t=Nn.fromString(e);return sn(vc(t),10190,{key:t.toString()}),t}function ec(e,t){return Ja(e.databaseId,t.path)}function tc(e,t){const n=Za(t);if(n.get(1)!==e.databaseId.projectId)throw new cn(an.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new cn(an.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new Pn(sc(n))}function nc(e,t){return Ja(e.databaseId,t)}function rc(e){const t=Za(e);return 4===t.length?Nn.emptyPath():sc(t)}function ic(e){return new Nn(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function sc(e){return sn(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function oc(e,t,n){return{name:ec(e,t),fields:n.value.mapValue.fields}}function ac(e,t){let n;if(t instanceof pa)n={update:oc(e,t.key,t.value)};else if(t instanceof wa)n={delete:ec(e,t.key)};else if(t instanceof ma)n={update:oc(e,t.key,t.data),updateMask:wc(t.fieldMask)};else{if(!(t instanceof va))return nn(16599,{dt:t.type});n={verify:ec(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof Qo)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Jo)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Zo)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof ta)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw nn(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:Ya(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:nn(27497)}(e,t.precondition)),n}function cc(e,t){const n=t.currentDocument?function(e){return void 0!==e.updateTime?oa.updateTime(Qa(e.updateTime)):void 0!==e.exists?oa.exists(e.exists):oa.none()}(t.currentDocument):oa.none(),r=t.updateTransforms?t.updateTransforms.map(t=>function(e,t){let n=null;if("setToServerValue"in t)sn("REQUEST_TIME"===t.setToServerValue,16630,{proto:t}),n=new Qo;else if("appendMissingElements"in t){const e=t.appendMissingElements.values||[];n=new Jo(e)}else if("removeAllFromArray"in t){const e=t.removeAllFromArray.values||[];n=new Zo(e)}else"increment"in t?n=new ta(e,t.increment):nn(16584,{proto:t});const r=Dn.fromServerFormat(t.fieldPath);return new ia(r,n)}(e,t)):[];if(t.update){t.update.name;const i=tc(e,t.update.name),s=new Os({mapValue:{fields:t.update.fields}});if(t.updateMask){const e=function(e){const t=e.fieldPaths||[];return new zi(t.map(e=>Dn.fromServerFormat(e)))}(t.updateMask);return new ma(i,s,e,n,r)}return new pa(i,s,n,r)}if(t.delete){const r=tc(e,t.delete);return new wa(r,n)}if(t.verify){const r=tc(e,t.verify);return new va(r,n)}return nn(1463,{proto:t})}function lc(e,t){return{documents:[nc(e,t.path)]}}function uc(e,t){const n={structuredQuery:{}},r=t.path;let i;null!==t.collectionGroup?(i=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=nc(e,i);const s=function(e){if(0!==e.length)return _c(Ks.create(e,"and"))}(t.filters);s&&(n.structuredQuery.where=s);const o=function(e){if(0!==e.length)return e.map(e=>function(e){return{field:gc(e.field),direction:fc(e.dir)}}(e))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Ga(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt=function(e){return{before:e.inclusive,values:e.position}}(t.startAt)),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:n,parent:i}}function hc(e){let t=rc(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){sn(1===r,65062);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let s=[];n.where&&(s=function(e){const t=dc(e);return t instanceof Ks&&Hs(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=function(e){return e.map(e=>function(e){return new qs(yc(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e))}(n.orderBy));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,wr(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new Fs(n,t)}(n.startAt));let l=null;return n.endAt&&(l=function(e){const t=!e.before,n=e.values||[];return new Fs(n,t)}(n.endAt)),function(e,t,n,r,i,s,o,a){return new go(e,t,n,r,i,s,o,a)}(t,i,o,s,a,"F",c,l)}function dc(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=yc(e.unaryFilter.field);return Bs.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=yc(e.unaryFilter.field);return Bs.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=yc(e.unaryFilter.field);return Bs.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=yc(e.unaryFilter.field);return Bs.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return nn(61313);default:return nn(60726)}}(e):void 0!==e.fieldFilter?function(e){return Bs.create(yc(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return nn(58110);default:return nn(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return Ks.create(e.compositeFilter.filters.map(e=>dc(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return nn(1026)}}(e.compositeFilter.op))}(e):nn(30097,{filter:e})}function fc(e){return za[e]}function pc(e){return Ba[e]}function mc(e){return Ka[e]}function gc(e){return{fieldPath:e.canonicalString()}}function yc(e){return Dn.fromServerFormat(e.fieldPath)}function _c(e){return e instanceof Bs?function(e){if("=="===e.op){if(Cs(e.value))return{unaryFilter:{field:gc(e.field),op:"IS_NAN"}};if(Is(e.value))return{unaryFilter:{field:gc(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(Cs(e.value))return{unaryFilter:{field:gc(e.field),op:"IS_NOT_NAN"}};if(Is(e.value))return{unaryFilter:{field:gc(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:gc(e.field),op:pc(e.op),value:e.value}}}(e):e instanceof Ks?function(e){const t=e.getFilters().map(e=>_c(e));return 1===t.length?t[0]:{compositeFilter:{op:mc(e.op),filters:t}}}(e):nn(54877,{filter:e})}function wc(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function vc(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function bc(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class xc{constructor(e,t,n,r,i=Kn.min(),s=Kn.min(),o=Ki.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new xc(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new xc(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new xc(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new xc(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Ic{constructor(e){this.yt=e}}function Cc(e,t){let n;if(t.document)n=function(e,t,n){const r=tc(e,t.name),i=Qa(t.updateTime),s=t.createTime?Qa(t.createTime):Kn.min(),o=new Os({mapValue:{fields:t.fields}}),a=Ls.newFoundDocument(r,i,s,o);return n&&a.setHasCommittedMutations(),n?a.setHasCommittedMutations():a}(e.yt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const e=Pn.fromSegments(t.noDocument.path),r=kc(t.noDocument.readTime);n=Ls.newNoDocument(e,r),t.hasCommittedMutations&&n.setHasCommittedMutations()}else{if(!t.unknownDocument)return nn(56709);{const e=Pn.fromSegments(t.unknownDocument.path),r=kc(t.unknownDocument.version);n=Ls.newUnknownDocument(e,r)}}return t.readTime&&n.setReadTime(function(e){const t=new Bn(e[0],e[1]);return Kn.fromTimestamp(t)}(t.readTime)),n}function Tc(e,t){const n=t.key,r={prefixPath:n.getCollectionPath().popLast().toArray(),collectionGroup:n.collectionGroup,documentId:n.path.lastSegment(),readTime:Sc(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())r.document=function(e,t){return{name:ec(e,t.key),fields:t.data.value.mapValue.fields,updateTime:Ha(e,t.version.toTimestamp()),createTime:Ha(e,t.createTime.toTimestamp())}}(e.yt,t);else if(t.isNoDocument())r.noDocument={path:n.path.toArray(),readTime:Ec(t.version)};else{if(!t.isUnknownDocument())return nn(57904,{document:t});r.unknownDocument={path:n.path.toArray(),version:Ec(t.version)}}return r}function Sc(e){const t=e.toTimestamp();return[t.seconds,t.nanoseconds]}function Ec(e){const t=e.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function kc(e){const t=new Bn(e.seconds,e.nanoseconds);return Kn.fromTimestamp(t)}function Nc(e,t){const n=(t.baseMutations||[]).map(t=>cc(e.yt,t));for(let s=0;s<t.mutations.length-1;++s){const e=t.mutations[s];if(s+1<t.mutations.length&&void 0!==t.mutations[s+1].transform){const n=t.mutations[s+1];e.updateTransforms=n.transform.fieldTransforms,t.mutations.splice(s+1,1),++s}}const r=t.mutations.map(t=>cc(e.yt,t)),i=Bn.fromMillis(t.localWriteTimeMs);return new ba(t.batchId,i,n,r)}function Ac(e){const t=kc(e.readTime),n=void 0!==e.lastLimboFreeSnapshotVersion?kc(e.lastLimboFreeSnapshotVersion):Kn.min();let r;return r=function(e){return void 0!==e.documents}(e.query)?function(e){const t=e.documents.length;return sn(1===t,1966,{count:t}),bo(yo(rc(e.documents[0])))}(e.query):function(e){return bo(hc(e))}(e.query),new xc(r,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,n,Ki.fromBase64String(e.resumeToken))}function Dc(e,t){const n=Ec(t.snapshotVersion),r=Ec(t.lastLimboFreeSnapshotVersion);let i;i=ho(t.target)?lc(e.yt,t.target):uc(e.yt,t.target).ft;const s=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:lo(t.target),readTime:n,resumeToken:s,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Pc(e){const t=hc({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Io(t,t.limit,"L"):t}function Rc(e,t){return new Ia(t.largestBatchId,cc(e.yt,t.overlayMutation))}function Oc(e,t){const n=t.path.lastSegment();return[e,xr(t.path.popLast()),n]}function Mc(e,t,n,r){return{indexId:e,uid:t,sequenceNumber:n,readTime:Ec(r.readTime),documentKey:xr(r.documentKey.path),largestBatchId:r.largestBatchId}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Lc{getBundleMetadata(e,t){return Fc(e).get(t).next(e=>{if(e)return function(e){return{id:e.bundleId,createTime:kc(e.createTime),version:e.version}}(e)})}saveBundleMetadata(e,t){return Fc(e).put(function(e){return{bundleId:e.id,createTime:Ec(Qa(e.createTime)),version:e.version}}(t))}getNamedQuery(e,t){return jc(e).get(t).next(e=>{if(e)return function(e){return{name:e.name,query:Pc(e.bundledQuery),readTime:kc(e.readTime)}}(e)})}saveNamedQuery(e,t){return jc(e).put(function(e){return{name:e.name,readTime:Ec(Qa(e.readTime)),bundledQuery:e.bundledQuery}}(t))}}function Fc(e){return Pi(e,ii)}function jc(e){return Pi(e,si)}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Vc{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new Vc(e,n)}getOverlay(e,t){return qc(e).get(Oc(this.userId,t)).next(e=>e?Rc(this.serializer,e):null)}getOverlays(e,t){const n=Lo();return nr.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){const r=[];return n.forEach((n,i)=>{const s=new Ia(t,i);r.push(this.bt(e,s))}),nr.waitFor(r)}removeOverlaysForBatchId(e,t,n){const r=new Set;t.forEach(e=>r.add(xr(e.getCollectionPath())));const i=[];return r.forEach(t=>{const r=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,n+1],!1,!0);i.push(qc(e).X(_i,r))}),nr.waitFor(i)}getOverlaysForCollection(e,t,n){const r=Lo(),i=xr(t),s=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return qc(e).H(_i,s).next(e=>{for(const t of e){const e=Rc(this.serializer,t);r.set(e.getKey(),e)}return r})}getOverlaysForCollectionGroup(e,t,n,r){const i=Lo();let s;const o=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return qc(e).ee({index:vi,range:o},(e,t,n)=>{const o=Rc(this.serializer,t);i.size()<r||o.largestBatchId===s?(i.set(o.getKey(),o),s=o.largestBatchId):n.done()}).next(()=>i)}bt(e,t){return qc(e).put(function(e,t,n){const[r,i,s]=Oc(t,n.mutation.key);return{userId:t,collectionPath:i,documentId:s,collectionGroup:n.mutation.key.getCollectionGroup(),largestBatchId:n.largestBatchId,overlayMutation:ac(e.yt,n.mutation)}}(this.serializer,this.userId,t))}}function qc(e){return Pi(e,gi)}
/**
       * @license
       * Copyright 2024 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Uc{St(e){return Pi(e,xi)}getSessionToken(e){return this.St(e).get("sessionToken").next(e=>{const t=e?.value;return t?Ki.fromUint8Array(t):Ki.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.St(e).put({name:"sessionToken",value:t.toUint8Array()})}}
/**
       * @license
       * Copyright 2021 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class zc{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(Hi(e.integerValue));else if("doubleValue"in e){const n=Hi(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),vr(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),"string"==typeof n&&(n=Gi(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Wi(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?ks(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):Ss(e)?this.kt(e.mapValue,t):(this.Kt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Nt(t)):nn(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}Kt(e,t){const n=e.fields||{};this.Ft(t,55);for(const r of Object.keys(n))this.Ot(r,t),this.Ct(n[r],t)}kt(e,t){const n=e.fields||{};this.Ft(t,53);const r=ls,i=n[r].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(Hi(i)),this.Ot(r,t),this.Ct(n[r],t)}qt(e,t){const n=e.values||[];this.Ft(t,50);for(const r of n)this.Ct(r,t)}Lt(e,t){this.Ft(t,37),Pn.fromName(e).path.forEach(e=>{this.Ft(t,60),this.$t(e,t)})}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}zc.Wt=new zc;
/**
       * @license
       * Copyright 2021 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law | agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Bc=255;function Kc(e){if(0===e)return 8;let t=0;return e>>4||(t+=4,e<<=4),e>>6||(t+=2,e<<=2),e>>7||(t+=1),t}function $c(e){const t=64-function(e){let t=0;for(let n=0;n<8;++n){const r=Kc(255&e[n]);if(t+=r,8!==r)break}return t}(e);return Math.ceil(t/8)}class Gc{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ht(n.value),n=t.next();this.Jt()}Zt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Gt(e);else if(e<2048)this.Gt(960|e>>>6),this.Gt(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Gt(480|e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e);else{const e=t.codePointAt(0);this.Gt(240|e>>>18),this.Gt(128|63&e>>>12),this.Gt(128|63&e>>>6),this.Gt(128|63&e)}}this.zt()}Xt(e){for(const t of e){const e=t.charCodeAt(0);if(e<128)this.Ht(e);else if(e<2048)this.Ht(960|e>>>6),this.Ht(128|63&e);else if(t<"\ud800"||"\udbff"<t)this.Ht(480|e>>>12),this.Ht(128|63&e>>>6),this.Ht(128|63&e);else{const e=t.codePointAt(0);this.Ht(240|e>>>18),this.Ht(128|63&e>>>12),this.Ht(128|63&e>>>6),this.Ht(128|63&e)}}this.Jt()}Yt(e){const t=this.en(e),n=$c(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let r=t.length-n;r<t.length;++r)this.buffer[this.position++]=255&t[r]}nn(e){const t=this.en(e),n=$c(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let r=t.length-n;r<t.length;++r)this.buffer[this.position++]=~(255&t[r])}rn(){this.sn(Bc),this.sn(255)}_n(){this.an(Bc),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=function(e){const t=new DataView(new ArrayBuffer(8));return t.setFloat64(0,e,!1),new Uint8Array(t.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let r=1;r<t.length;++r)t[r]^=n?255:0;return t}Gt(e){const t=255&e;0===t?(this.sn(0),this.sn(255)):t===Bc?(this.sn(Bc),this.sn(0)):this.sn(t)}Ht(e){const t=255&e;0===t?(this.an(0),this.an(255)):t===Bc?(this.an(Bc),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Jt(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const r=new Uint8Array(n);r.set(this.buffer),this.buffer=r}}class Hc{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class Wc{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class Yc{constructor(){this.cn=new Gc,this.ascending=new Hc(this.cn),this.descending=new Wc(this.cn)}seed(e){this.cn.seed(e)}ln(e){return 0===e?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Qc{constructor(e,t,n,r){this.hn=e,this.Pn=t,this.Tn=n,this.In=r}En(){const e=this.In.length,t=0===e||255===this.In[e-1]?e+1:e,n=new Uint8Array(t);return n.set(this.In,0),t!==e?n.set([0],this.In.length):++n[n.length-1],new Qc(this.hn,this.Pn,this.Tn,n)}Rn(e,t,n){return{indexId:this.hn,uid:e,arrayValue:Zc(this.Tn),directionalValue:Zc(this.In),orderedDocumentKey:Zc(t),documentKey:n.path.toArray()}}An(e,t,n){const r=this.Rn(e,t,n);return[r.indexId,r.uid,r.arrayValue,r.directionalValue,r.orderedDocumentKey,r.documentKey]}}function Jc(e,t){let n=e.hn-t.hn;return 0!==n?n:(n=Xc(e.Tn,t.Tn),0!==n?n:(n=Xc(e.In,t.In),0!==n?n:Pn.comparator(e.Pn,t.Pn)))}function Xc(e,t){for(let n=0;n<e.length&&n<t.length;++n){const r=e[n]-t[n];if(0!==r)return r}return e.length-t.length}function Zc(e){return U()?function(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t}(e):e}function el(e){return"string"!=typeof e?e:function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e)}class tl{constructor(e){this.Vn=new Vi((e,t)=>Dn.comparator(e.field,t.field)),this.collectionId=null!=e.collectionGroup?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const e=t;e.isInequality()?this.Vn=this.Vn.add(e):this.mn.push(e)}}get fn(){return this.Vn.size>1}gn(e){if(sn(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=Gn(e);if(void 0!==t&&!this.pn(t))return!1;const n=Hn(e);let r=new Set,i=0,s=0;for(;i<n.length&&this.pn(n[i]);++i)r=r.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const e=this.Vn.getIterator().getNext();if(!r.has(e.field.canonicalString())){const t=n[i];if(!this.yn(e,t)||!this.wn(this.dn[s++],t))return!1}++i}for(;i<n.length;++i){const e=n[i];if(s>=this.dn.length||!this.wn(this.dn[s++],e))return!1}return!0}bn(){if(this.fn)return null;let e=new Vi(Dn.comparator);const t=[];for(const n of this.mn)if(!n.field.isKeyField())if("array-contains"===n.op||"array-contains-any"===n.op)t.push(new Wn(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Wn(n.field,0))}for(const n of this.dn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Wn(n.field,"asc"===n.dir?0:1)));return new $n($n.UNKNOWN_ID,this.collectionId,t,Yn.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(void 0===e||!e.field.isEqual(t.fieldPath))return!1;const n="array-contains"===e.op||"array-contains-any"===e.op;return 2===t.kind===n}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(0===t.kind&&"asc"===e.dir||1===t.kind&&"desc"===e.dir)}}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function nl(e){if(sn(e instanceof Bs||e instanceof Ks,20012),e instanceof Bs){if(e instanceof io){const t=e.value.arrayValue?.values?.map(t=>Bs.create(e.field,"==",t))||[];return Ks.create(t,"or")}return e}const t=e.filters.map(e=>nl(e));return Ks.create(t,e.op)}function rl(e){if(0===e.getFilters().length)return[];const t=al(nl(e));return sn(ol(t),7391),il(t)||sl(t)?[t]:t.getFilters()}function il(e){return e instanceof Bs}function sl(e){return e instanceof Ks&&Hs(e)}function ol(e){return il(e)||sl(e)||function(e){if(e instanceof Ks&&Gs(e)){for(const t of e.getFilters())if(!il(t)&&!sl(t))return!1;return!0}return!1}(e)}function al(e){if(sn(e instanceof Bs||e instanceof Ks,34018),e instanceof Bs)return e;if(1===e.filters.length)return al(e.filters[0]);const t=e.filters.map(e=>al(e));let n=Ks.create(t,e.op);return n=ul(n),ol(n)?n:(sn(n instanceof Ks,64498),sn($s(n),40251),sn(n.filters.length>1,57927),n.filters.reduce((e,t)=>cl(e,t)))}function cl(e,t){let n;return sn(e instanceof Bs||e instanceof Ks,38388),sn(t instanceof Bs||t instanceof Ks,25473),n=e instanceof Bs?t instanceof Bs?function(e,t){return Ks.create([e,t],"and")}(e,t):ll(e,t):t instanceof Bs?ll(t,e):function(e,t){if(sn(e.filters.length>0&&t.filters.length>0,48005),$s(e)&&$s(t))return Js(e,t.getFilters());const n=Gs(e)?e:t,r=Gs(e)?t:e,i=n.filters.map(e=>cl(e,r));return Ks.create(i,"or")}(e,t),ul(n)}function ll(e,t){if($s(t))return Js(t,e.getFilters());{const n=t.filters.map(t=>cl(e,t));return Ks.create(n,"or")}}function ul(e){if(sn(e instanceof Bs||e instanceof Ks,11850),e instanceof Bs)return e;const t=e.getFilters();if(1===t.length)return ul(t[0]);if(Ws(e))return e;const n=t.map(e=>ul(e)),r=[];return n.forEach(t=>{t instanceof Bs?r.push(t):t instanceof Ks&&(t.op===e.op?r.push(...t.filters):r.push(t))}),1===r.length?r[0]:Ks.create(r,e.op)
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */}class hl{constructor(){this.Sn=new dl}addToCollectionParentIndex(e,t){return this.Sn.add(t),nr.resolve()}getCollectionParents(e,t){return nr.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return nr.resolve()}deleteFieldIndex(e,t){return nr.resolve()}deleteAllFieldIndexes(e){return nr.resolve()}createTargetIndexes(e,t){return nr.resolve()}getDocumentsMatchingTarget(e,t){return nr.resolve(null)}getIndexType(e,t){return nr.resolve(0)}getFieldIndexes(e,t){return nr.resolve([])}getNextCollectionGroupToUpdate(e){return nr.resolve(null)}getMinOffset(e,t){return nr.resolve(Jn.min())}getMinOffsetFromCollectionGroup(e,t){return nr.resolve(Jn.min())}updateCollectionGroup(e,t,n){return nr.resolve()}updateIndexEntries(e,t){return nr.resolve()}}class dl{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new Vi(Nn.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new Vi(Nn.comparator)).toArray()}}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const fl="IndexedDbIndexManager",pl=new Uint8Array(0);class ml{constructor(e,t){this.databaseId=t,this.Dn=new dl,this.Cn=new Ao(e=>lo(e),(e,t)=>uo(e,t)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const n=t.lastSegment(),r=t.popLast();e.addOnCommittedListener(()=>{this.Dn.add(t)});const i={collectionId:n,parent:xr(r)};return gl(e).put(i)}return nr.resolve()}getCollectionParents(e,t){const n=[],r=IDBKeyRange.bound([t,""],[Sn(t),""],!1,!0);return gl(e).H(r).next(e=>{for(const r of e){if(r.collectionId!==t)break;n.push(Tr(r.parent))}return n})}addFieldIndex(e,t){const n=_l(e),r=function(e){return{indexId:e.indexId,collectionGroup:e.collectionGroup,fields:e.fields.map(e=>[e.fieldPath.canonicalString(),e.kind])}}(t);delete r.indexId;const i=n.add(r);if(t.indexState){const n=wl(e);return i.next(e=>{n.put(Mc(e,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const n=_l(e),r=wl(e),i=yl(e);return n.delete(t.indexId).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=_l(e),n=yl(e),r=wl(e);return t.X().next(()=>n.X()).next(()=>r.X())}createTargetIndexes(e,t){return nr.forEach(this.vn(t),t=>this.getIndexType(e,t).next(n=>{if(0===n||1===n){const n=new tl(t).bn();if(null!=n)return this.addFieldIndex(e,n)}}))}getDocumentsMatchingTarget(e,t){const n=yl(e);let r=!0;const i=new Map;return nr.forEach(this.vn(t),t=>this.Fn(e,t).next(e=>{r&&(r=!!e),i.set(t,e)})).next(()=>{if(r){let e=Uo();const r=[];return nr.forEach(i,(i,s)=>{Xt(fl,`Using index ${function(e){return`id=${e.indexId}|cg=${e.collectionGroup}|f=${e.fields.map(e=>`${e.fieldPath}:${e.kind}`).join(",")}`}(i)} to execute ${lo(t)}`);const o=function(e,t){const n=Gn(t);if(void 0===n)return null;for(const r of fo(e,n.fieldPath))switch(r.op){case"array-contains-any":return r.value.arrayValue.values||[];case"array-contains":return[r.value]}return null}(s,i),a=function(e,t){const n=new Map;for(const r of Hn(t))for(const t of fo(e,r.fieldPath))switch(t.op){case"==":case"in":n.set(r.fieldPath.canonicalString(),t.value);break;case"not-in":case"!=":return n.set(r.fieldPath.canonicalString(),t.value),Array.from(n.values())}return null}(s,i),c=function(e,t){const n=[];let r=!0;for(const i of Hn(t)){const t=0===i.kind?po(e,i.fieldPath,e.startAt):mo(e,i.fieldPath,e.startAt);n.push(t.value),r&&(r=t.inclusive)}return new Fs(n,r)}(s,i),l=function(e,t){const n=[];let r=!0;for(const i of Hn(t)){const t=0===i.kind?mo(e,i.fieldPath,e.endAt):po(e,i.fieldPath,e.endAt);n.push(t.value),r&&(r=t.inclusive)}return new Fs(n,r)}(s,i),u=this.Mn(i,s,c),h=this.Mn(i,s,l),d=this.xn(i,s,a),f=this.On(i.indexId,o,u,c.inclusive,h,l.inclusive,d);return nr.forEach(f,i=>n.Z(i,t.limit).next(t=>{t.forEach(t=>{const n=Pn.fromSegments(t.documentKey);e.has(n)||(e=e.add(n),r.push(n))})}))}).next(()=>r)}return nr.resolve(null)})}vn(e){let t=this.Cn.get(e);return t||(t=0===e.filters.length?[e]:rl(Ks.create(e.filters,"and")).map(t=>co(e.path,e.collectionGroup,e.orderBy,t.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}On(e,t,n,r,i,s,o){const a=(null!=t?t.length:1)*Math.max(n.length,i.length),c=a/(null!=t?t.length:1),l=[];for(let u=0;u<a;++u){const a=t?this.Nn(t[u/c]):pl,h=this.Bn(e,a,n[u%c],r),d=this.Ln(e,a,i[u%c],s),f=o.map(t=>this.Bn(e,a,t,!0));l.push(...this.createRange(h,d,f))}return l}Bn(e,t,n,r){const i=new Qc(e,Pn.empty(),t,n);return r?i:i.En()}Ln(e,t,n,r){const i=new Qc(e,Pn.empty(),t,n);return r?i.En():i}Fn(e,t){const n=new tl(t),r=null!=t.collectionGroup?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,r).next(e=>{let t=null;for(const r of e)n.gn(r)&&(!t||r.fields.length>t.fields.length)&&(t=r);return t})}getIndexType(e,t){let n=2;const r=this.vn(t);return nr.forEach(r,t=>this.Fn(e,t).next(e=>{e?0!==n&&e.fields.length<function(e){let t=new Vi(Dn.comparator),n=!1;for(const r of e.filters)for(const e of r.getFlattenedFilters())e.field.isKeyField()||("array-contains"===e.op||"array-contains-any"===e.op?n=!0:t=t.add(e.field));for(const r of e.orderBy)r.field.isKeyField()||(t=t.add(r.field));return t.size+(n?1:0)}(t)&&(n=1):n=0})).next(()=>function(e){return null!==e.limit}(t)&&r.length>1&&2===n?1:n)}kn(e,t){const n=new Yc;for(const r of Hn(e)){const e=t.data.field(r.fieldPath);if(null==e)return null;const i=n.ln(r.kind);zc.Wt.Dt(e,i)}return n.un()}Nn(e){const t=new Yc;return zc.Wt.Dt(e,t.ln(0)),t.un()}Kn(e,t){const n=new Yc;return zc.Wt.Dt(vs(this.databaseId,t),n.ln(function(e){const t=Hn(e);return 0===t.length?0:t[t.length-1].kind}(e))),n.un()}xn(e,t,n){if(null===n)return[];let r=[];r.push(new Yc);let i=0;for(const s of Hn(e)){const e=n[i++];for(const n of r)if(this.qn(t,s.fieldPath)&&xs(e))r=this.Un(r,s,e);else{const t=n.ln(s.kind);zc.Wt.Dt(e,t)}}return this.$n(r)}Mn(e,t,n){return this.xn(e,t,n.position)}$n(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Un(e,t,n){const r=[...e],i=[];for(const s of n.arrayValue.values||[])for(const e of r){const n=new Yc;n.seed(e.un()),zc.Wt.Dt(s,n.ln(t.kind)),i.push(n)}return i}qn(e,t){return!!e.filters.find(e=>e instanceof Bs&&e.field.isEqual(t)&&("in"===e.op||"not-in"===e.op))}getFieldIndexes(e,t){const n=_l(e),r=wl(e);return(t?n.H(ai,IDBKeyRange.bound(t,t)):n.H()).next(e=>{const t=[];return nr.forEach(e,e=>r.get([e.indexId,this.uid]).next(n=>{t.push(function(e,t){const n=t?new Yn(t.sequenceNumber,new Jn(kc(t.readTime),new Pn(Tr(t.documentKey)),t.largestBatchId)):Yn.empty(),r=e.fields.map(([e,t])=>new Wn(Dn.fromServerFormat(e),t));return new $n(e.indexId,e.collectionGroup,r,n)}(e,n))})).next(()=>t)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(e=>0===e.length?null:(e.sort((e,t)=>{const n=e.indexState.sequenceNumber-t.indexState.sequenceNumber;return 0!==n?n:vn(e.collectionGroup,t.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(e,t,n){const r=_l(e),i=wl(e);return this.Wn(e).next(e=>r.H(ai,IDBKeyRange.bound(t,t)).next(t=>nr.forEach(t,t=>i.put(Mc(t.indexId,this.uid,e,n)))))}updateIndexEntries(e,t){const n=new Map;return nr.forEach(t,(t,r)=>{const i=n.get(t.collectionGroup);return(i?nr.resolve(i):this.getFieldIndexes(e,t.collectionGroup)).next(i=>(n.set(t.collectionGroup,i),nr.forEach(i,n=>this.Qn(e,t,n).next(t=>{const i=this.Gn(r,n);return t.isEqual(i)?nr.resolve():this.zn(e,r,n,t,i)}))))})}jn(e,t,n,r){return yl(e).put(r.Rn(this.uid,this.Kn(n,t.key),t.key))}Hn(e,t,n,r){return yl(e).delete(r.An(this.uid,this.Kn(n,t.key),t.key))}Qn(e,t,n){const r=yl(e);let i=new Vi(Jc);return r.ee({index:pi,range:IDBKeyRange.only([n.indexId,this.uid,Zc(this.Kn(n,t))])},(e,r)=>{i=i.add(new Qc(n.indexId,t,el(r.arrayValue),el(r.directionalValue)))}).next(()=>i)}Gn(e,t){let n=new Vi(Jc);const r=this.kn(t,e);if(null==r)return n;const i=Gn(t);if(null!=i){const s=e.data.field(i.fieldPath);if(xs(s))for(const i of s.arrayValue.values||[])n=n.add(new Qc(t.indexId,e.key,this.Nn(i),r))}else n=n.add(new Qc(t.indexId,e.key,pl,r));return n}zn(e,t,n,r,i){Xt(fl,"Updating index entries for document '%s'",t.key);const s=[];return function(e,t,n,r,i){const s=e.getIterator(),o=t.getIterator();let a=Ui(s),c=Ui(o);for(;a||c;){let e=!1,t=!1;if(a&&c){const r=n(a,c);r<0?t=!0:r>0&&(e=!0)}else null!=a?t=!0:e=!0;e?(r(c),c=Ui(o)):t?(i(a),a=Ui(s)):(a=Ui(s),c=Ui(o))}}(r,i,Jc,r=>{s.push(this.jn(e,t,n,r))},r=>{s.push(this.Hn(e,t,n,r))}),nr.waitFor(s)}Wn(e){let t=1;return wl(e).ee({index:ui,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(e,n,r)=>{r.done(),t=n.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((e,t)=>Jc(e,t)).filter((e,t,n)=>!t||0!==Jc(e,n[t-1]));const r=[];r.push(e);for(const s of n){const n=Jc(s,e),i=Jc(s,t);if(0===n)r[0]=e.En();else if(n>0&&i<0)r.push(s),r.push(s.En());else if(i>0)break}r.push(t);const i=[];for(let s=0;s<r.length;s+=2){if(this.Jn(r[s],r[s+1]))return[];const e=r[s].An(this.uid,pl,Pn.empty()),t=r[s+1].An(this.uid,pl,Pn.empty());i.push(IDBKeyRange.bound(e,t))}return i}Jn(e,t){return Jc(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(vl)}getMinOffset(e,t){return nr.mapArray(this.vn(t),t=>this.Fn(e,t).next(e=>e||nn(44426))).next(vl)}}function gl(e){return Pi(e,ti)}function yl(e){return Pi(e,di)}function _l(e){return Pi(e,oi)}function wl(e){return Pi(e,ci)}function vl(e){sn(0!==e.length,28825);let t=e[0].indexState.offset,n=t.largestBatchId;for(let r=1;r<e.length;r++){const i=e[r].indexState.offset;Xn(i,t)<0&&(t=i),n<i.largestBatchId&&(n=i.largestBatchId)}return new Jn(t.readTime,t.documentKey,n)}
/**
       * @license
       * Copyright 2018 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const bl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},xl=41943040;class Il{static withCacheSize(e){return new Il(e,Il.DEFAULT_COLLECTION_PERCENTILE,Il.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Cl(e,t,n){const r=e.store(Ar),i=e.store(Fr),s=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.ee({range:o},(e,t,n)=>(a++,n.delete()));s.push(c.next(()=>{sn(1===a,47070,{batchId:n.batchId})}));const l=[];for(const u of n.mutations){const e=Mr(t,u.key.path,n.batchId);s.push(i.delete(e)),l.push(u.key)}return nr.waitFor(s).next(()=>l)}function Tl(e){if(!e)return 0;let t;if(e.document)t=e.document;else if(e.unknownDocument)t=e.unknownDocument;else{if(!e.noDocument)throw nn(14731);t=e.noDocument}return JSON.stringify(t).length}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */Il.DEFAULT_COLLECTION_PERCENTILE=10,Il.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Il.DEFAULT=new Il(xl,Il.DEFAULT_COLLECTION_PERCENTILE,Il.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Il.DISABLED=new Il(-1,0,0);class Sl{constructor(e,t,n,r){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=r,this.Zn={}}static wt(e,t,n,r){sn(""!==e.uid,64387);const i=e.isAuthenticated()?e.uid:"";return new Sl(i,t,n,r)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return kl(e).ee({index:Pr,range:n},(e,n,r)=>{t=!1,r.done()}).next(()=>t)}addMutationBatch(e,t,n,r){const i=Nl(e),s=kl(e);return s.add({}).next(o=>{sn("number"==typeof o,49019);const a=new ba(o,t,n,r),c=function(e,t,n){const r=n.baseMutations.map(t=>ac(e.yt,t)),i=n.mutations.map(t=>ac(e.yt,t));return{userId:t,batchId:n.batchId,localWriteTimeMs:n.localWriteTime.toMillis(),baseMutations:r,mutations:i}}(this.serializer,this.userId,a),l=[];let u=new Vi((e,t)=>vn(e.canonicalString(),t.canonicalString()));for(const e of r){const t=Mr(this.userId,e.key.path,o);u=u.add(e.key.path.popLast()),l.push(s.put(c)),l.push(i.put(t,Lr))}return u.forEach(t=>{l.push(this.indexManager.addToCollectionParentIndex(e,t))}),e.addOnCommittedListener(()=>{this.Zn[o]=a.keys()}),nr.waitFor(l).next(()=>a)})}lookupMutationBatch(e,t){return kl(e).get(t).next(e=>e?(sn(e.userId===this.userId,48,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),Nc(this.serializer,e)):null)}Xn(e,t){return this.Zn[t]?nr.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(e=>{if(e){const n=e.keys();return this.Zn[t]=n,n}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return kl(e).ee({index:Pr,range:r},(e,t,r)=>{t.userId===this.userId&&(sn(t.batchId>=n,47524,{Yn:n}),i=Nc(this.serializer,t)),r.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=_r;return kl(e).ee({index:Pr,range:t,reverse:!0},(e,t,r)=>{n=t.batchId,r.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,_r],[this.userId,Number.POSITIVE_INFINITY]);return kl(e).H(Pr,t).next(e=>e.map(e=>Nc(this.serializer,e)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=Or(this.userId,t.path),r=IDBKeyRange.lowerBound(n),i=[];return Nl(e).ee({range:r},(n,r,s)=>{const[o,a,c]=n,l=Tr(a);if(o===this.userId&&t.path.isEqual(l))return kl(e).get(c).next(e=>{if(!e)throw nn(61480,{er:n,batchId:c});sn(e.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:e.userId,batchId:c}),i.push(Nc(this.serializer,e))});s.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Vi(vn);const r=[];return t.forEach(t=>{const i=Or(this.userId,t.path),s=IDBKeyRange.lowerBound(i),o=Nl(e).ee({range:s},(e,r,i)=>{const[s,o,a]=e,c=Tr(o);s===this.userId&&t.path.isEqual(c)?n=n.add(a):i.done()});r.push(o)}),nr.waitFor(r).next(()=>this.tr(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1,i=Or(this.userId,n),s=IDBKeyRange.lowerBound(i);let o=new Vi(vn);return Nl(e).ee({range:s},(e,t,i)=>{const[s,a,c]=e,l=Tr(a);s===this.userId&&n.isPrefixOf(l)?l.length===r&&(o=o.add(c)):i.done()}).next(()=>this.tr(e,o))}tr(e,t){const n=[],r=[];return t.forEach(t=>{r.push(kl(e).get(t).next(e=>{if(null===e)throw nn(35274,{batchId:t});sn(e.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:e.userId,batchId:t}),n.push(Nc(this.serializer,e))}))}),nr.waitFor(r).next(()=>n)}removeMutationBatch(e,t){return Cl(e.le,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.nr(t.batchId)}),nr.forEach(n,t=>this.referenceDelegate.markPotentiallyOrphaned(e,t))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return nr.resolve();const n=IDBKeyRange.lowerBound(function(e){return[e]}(this.userId)),r=[];return Nl(e).ee({range:n},(e,t,n)=>{if(e[0]===this.userId){const t=Tr(e[1]);r.push(t)}else n.done()}).next(()=>{sn(0===r.length,56720,{rr:r.map(e=>e.canonicalString())})})})}containsKey(e,t){return El(e,this.userId,t)}ir(e){return Al(e).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:_r,lastStreamToken:""})}}function El(e,t,n){const r=Or(t,n.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Nl(e).ee({range:s,Y:!0},(e,n,r)=>{const[s,a,c]=e;s===t&&a===i&&(o=!0),r.done()}).next(()=>o)}function kl(e){return Pi(e,Ar)}function Nl(e){return Pi(e,Fr)}function Al(e){return Pi(e,Nr)}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Dl{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Dl(0)}static ar(){return new Dl(-1)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Pl{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next(t=>{const n=new Dl(t.highestTargetId);return t.highestTargetId=n.next(),this.cr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.ur(e).next(e=>Kn.fromTimestamp(new Bn(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.ur(e).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.ur(e).next(r=>(r.highestListenSequenceNumber=t,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),t>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=t),this.cr(e,r)))}addTargetData(e,t){return this.lr(e,t).next(()=>this.ur(e).next(n=>(n.targetCount+=1,this.hr(t,n),this.cr(e,n))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Rl(e).delete(t.targetId)).next(()=>this.ur(e)).next(t=>(sn(t.targetCount>0,8065),t.targetCount-=1,this.cr(e,t)))}removeTargets(e,t,n){let r=0;const i=[];return Rl(e).ee((s,o)=>{const a=Ac(o);a.sequenceNumber<=t&&null===n.get(a.targetId)&&(r++,i.push(this.removeTargetData(e,a)))}).next(()=>nr.waitFor(i)).next(()=>r)}forEachTarget(e,t){return Rl(e).ee((e,n)=>{const r=Ac(n);t(r)})}ur(e){return Ol(e).get(Zr).next(e=>(sn(null!==e,2888),e))}cr(e,t){return Ol(e).put(Zr,t)}lr(e,t){return Rl(e).put(Dc(this.serializer,t))}hr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.ur(e).next(e=>e.targetCount)}getTargetData(e,t){const n=lo(t),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Rl(e).ee({range:r,index:Hr},(e,n,r)=>{const s=Ac(n);uo(t,s.target)&&(i=s,r.done())}).next(()=>i)}addMatchingKeys(e,t,n){const r=[],i=Ml(e);return t.forEach(t=>{const s=xr(t.path);r.push(i.put({targetId:n,path:s})),r.push(this.referenceDelegate.addReference(e,n,t))}),nr.waitFor(r)}removeMatchingKeys(e,t,n){const r=Ml(e);return nr.forEach(t,t=>{const i=xr(t.path);return nr.waitFor([r.delete([n,i]),this.referenceDelegate.removeReference(e,n,t)])})}removeMatchingKeysForTargetId(e,t){const n=Ml(e),r=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),r=Ml(e);let i=Uo();return r.ee({range:n,Y:!0},(e,t,n)=>{const r=Tr(e[1]),s=new Pn(r);i=i.add(s)}).next(()=>i)}containsKey(e,t){const n=xr(t.path),r=IDBKeyRange.bound([n],[Sn(n)],!1,!0);let i=0;return Ml(e).ee({index:Jr,Y:!0,range:r},([e,t],n,r)=>{0!==e&&(i++,r.done())}).next(()=>i>0)}At(e,t){return Rl(e).get(t).next(e=>e?Ac(e):null)}}function Rl(e){return Pi(e,Gr)}function Ol(e){return Pi(e,ei)}function Ml(e){return Pi(e,Yr)}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Ll="LruGarbageCollector",Fl=1048576;function jl([e,t],[n,r]){const i=vn(e,n);return 0===i?vn(t,r):i}class Vl{constructor(e){this.Pr=e,this.buffer=new Vi(jl),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();jl(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class ql{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Ar(e){Xt(Ll,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){lr(e)?Xt(Ll,"Ignoring IndexedDB error during garbage collection: ",e):await tr(e)}await this.Ar(3e5)})}}class Ul{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return nr.resolve(yr.ce);const n=new Vl(t);return this.Vr.forEachTarget(e,e=>n.Er(e.sequenceNumber)).next(()=>this.Vr.mr(e,e=>n.Er(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(Xt("LruGarbageCollector","Garbage collection skipped; disabled"),nr.resolve(bl)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(Xt("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),bl):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let n,r,i,s,o,a,c;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(Xt("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,s=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(i=t,a=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(c=Date.now(),Jt()<=ue.DEBUG&&Xt("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${s-l}ms\n\tDetermined least recently used ${r} in `+(o-s)+"ms\n"+`\tRemoved ${i} targets in `+(a-o)+"ms\n"+`\tRemoved ${e} documents in `+(c-a)+"ms\n"+`Total Duration: ${c-l}ms`),nr.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e})))}}function zl(e,t){return new Ul(e,t)}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Bl{constructor(e,t){this.db=e,this.garbageCollector=zl(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,(e,n)=>t(n))}addReference(e,t,n){return Kl(e,n)}removeReference(e,t,n){return Kl(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Kl(e,t)}wr(e,t){return function(e,t){let n=!1;return Al(e).te(r=>El(e,r,t).next(e=>(e&&(n=!0),nr.resolve(!e)))).next(()=>n)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let i=0;return this.yr(e,(s,o)=>{if(o<=t){const t=this.wr(e,s).next(t=>{if(!t)return i++,n.getEntry(e,s).next(()=>(n.removeEntry(s,Kn.min()),Ml(e).delete(function(e){return[0,xr(e.path)]}(s))))});r.push(t)}}).next(()=>nr.waitFor(r)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Kl(e,t)}yr(e,t){const n=Ml(e);let r,i=yr.ce;return n.ee({index:Jr},([e,n],{path:s,sequenceNumber:o})=>{0===e?(i!==yr.ce&&t(new Pn(Tr(r)),i),i=o,r=s):i=yr.ce}).next(()=>{i!==yr.ce&&t(new Pn(Tr(r)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Kl(e,t){return Ml(e).put(function(e,t){return{targetId:0,path:xr(e.path),sequenceNumber:t}}(t,e.currentSequenceNumber))}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class $l{constructor(){this.changes=new Ao(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ls.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?nr.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Gl{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Ql(e).put(n)}removeEntry(e,t,n){return Ql(e).delete(function(e,t){const n=e.path.toArray();return[n.slice(0,n.length-2),n[n.length-2],Sc(t),n[n.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.br(e,n)))}getEntry(e,t){let n=Ls.newInvalidDocument(t);return Ql(e).ee({index:qr,range:IDBKeyRange.only(Jl(t))},(e,r)=>{n=this.Sr(t,r)}).next(()=>n)}Dr(e,t){let n={size:0,document:Ls.newInvalidDocument(t)};return Ql(e).ee({index:qr,range:IDBKeyRange.only(Jl(t))},(e,r)=>{n={document:this.Sr(t,r),size:Tl(r)}}).next(()=>n)}getEntries(e,t){let n=Po();return this.Cr(e,t,(e,t)=>{const r=this.Sr(e,t);n=n.insert(e,r)}).next(()=>n)}vr(e,t){let n=Po(),r=new Li(Pn.comparator);return this.Cr(e,t,(e,t)=>{const i=this.Sr(e,t);n=n.insert(e,i),r=r.insert(e,Tl(t))}).next(()=>({documents:n,Fr:r}))}Cr(e,t,n){if(t.isEmpty())return nr.resolve();let r=new Vi(Zl);t.forEach(e=>r=r.add(e));const i=IDBKeyRange.bound(Jl(r.first()),Jl(r.last())),s=r.getIterator();let o=s.getNext();return Ql(e).ee({index:qr,range:i},(e,t,r)=>{const i=Pn.fromSegments([...t.prefixPath,t.collectionGroup,t.documentId]);for(;o&&Zl(o,i)<0;)n(o,null),o=s.getNext();o&&o.isEqual(i)&&(n(o,t),o=s.hasNext()?s.getNext():null),o?r.j(Jl(o)):r.done()}).next(()=>{for(;o;)n(o,null),o=s.hasNext()?s.getNext():null})}getDocumentsMatchingQuery(e,t,n,r,i){const s=t.path,o=[s.popLast().toArray(),s.lastSegment(),Sc(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],a=[s.popLast().toArray(),s.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Ql(e).H(IDBKeyRange.bound(o,a,!0)).next(e=>{i?.incrementDocumentReadCount(e.length);let n=Po();for(const i of e){const e=this.Sr(Pn.fromSegments(i.prefixPath.concat(i.collectionGroup,i.documentId)),i);e.isFoundDocument()&&(Eo(t,e)||r.has(e.key))&&(n=n.insert(e.key,e))}return n})}getAllFromCollectionGroup(e,t,n,r){let i=Po();const s=Xl(t,n),o=Xl(t,Jn.max());return Ql(e).ee({index:zr,range:IDBKeyRange.bound(s,o,!0)},(e,t,n)=>{const s=this.Sr(Pn.fromSegments(t.prefixPath.concat(t.collectionGroup,t.documentId)),t);i=i.insert(s.key,s),i.size===r&&n.done()}).next(()=>i)}newChangeBuffer(e){return new Wl(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(e=>e.byteSize)}getMetadata(e){return Yl(e).get($r).next(e=>(sn(!!e,20021),e))}br(e,t){return Yl(e).put($r,t)}Sr(e,t){if(t){const e=Cc(this.serializer,t);if(!e.isNoDocument()||!e.version.isEqual(Kn.min()))return e}return Ls.newInvalidDocument(e)}}function Hl(e){return new Gl(e)}class Wl extends $l{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new Ao(e=>e.toString(),(e,t)=>e.isEqual(t))}applyChanges(e){const t=[];let n=0,r=new Vi((e,t)=>vn(e.canonicalString(),t.canonicalString()));return this.changes.forEach((i,s)=>{const o=this.Or.get(i);if(t.push(this.Mr.removeEntry(e,i,o.readTime)),s.isValidDocument()){const a=Tc(this.Mr.serializer,s);r=r.add(i.path.popLast());const c=Tl(a);n+=c-o.size,t.push(this.Mr.addEntry(e,i,a))}else if(n-=o.size,this.trackRemovals){const n=Tc(this.Mr.serializer,s.convertToNoDocument(Kn.min()));t.push(this.Mr.addEntry(e,i,n))}}),r.forEach(n=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,n))}),t.push(this.Mr.updateMetadata(e,n)),nr.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next(e=>(this.Or.set(t,{size:e.size,readTime:e.document.readTime}),e.document))}getAllFromCache(e,t){return this.Mr.vr(e,t).next(({documents:e,Fr:t})=>(t.forEach((t,n)=>{this.Or.set(t,{size:n,readTime:e.get(t).readTime})}),e))}}function Yl(e){return Pi(e,Kr)}function Ql(e){return Pi(e,jr)}function Jl(e){const t=e.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Xl(e,t){const n=t.documentKey.path.toArray();return[e,Sc(t.readTime),n.slice(0,n.length-2),n.length>0?n[n.length-1]:""]}function Zl(e,t){const n=e.path.toArray(),r=t.path.toArray();let i=0;for(let s=0;s<n.length-2&&s<r.length-2;++s)if(i=vn(n[s],r[s]),i)return i;return i=vn(n.length,r.length),i||(i=vn(n[n.length-2],r[r.length-2]),i||vn(n[n.length-1],r[r.length-1])
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */)}class eu{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class tu{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&ha(n.mutation,e,zi.empty(),Bn.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,Uo()).next(()=>t))}getLocalViewOfDocuments(e,t,n=Uo()){const r=Lo();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=Oo();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=Lo();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,Uo()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let i=Po();const s=jo(),o=jo();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof ma)?i=i.insert(t.key,t):void 0!==o?(s.set(t.key,o.mutation.getFieldMask()),ha(o.mutation,t,o.mutation.getFieldMask(),Bn.now())):s.set(t.key,zi.empty())}),this.recalculateAndSaveOverlays(e,i).next(e=>(e.forEach((e,t)=>s.set(e,t)),t.forEach((e,t)=>o.set(e,new eu(t,s.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const n=jo();let r=new Li((e,t)=>e-t),i=Uo();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const i of e)i.keys().forEach(e=>{const s=t.get(e);if(null===s)return;let o=n.get(e)||zi.empty();o=i.applyToLocalView(s,o),n.set(e,o);const a=(r.get(i.batchId)||Uo()).add(e);r=r.insert(i.batchId,a)})}).next(()=>{const s=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,l=Fo();c.forEach(e=>{if(!i.has(e)){const r=la(t.get(e),n.get(e));null!==r&&l.set(e,r),i=i.add(e)}}),s.push(this.documentOverlayCache.saveOverlays(e,a,l))}return nr.waitFor(s)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return function(e){return Pn.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):wo(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(i=>{const s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):nr.resolve(Lo());let o=-1,a=i;return s.next(t=>nr.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?nr.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,i)).next(()=>this.computeViews(e,a,t,Uo())).next(e=>({batchId:o,changes:Mo(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Pn(t)).next(e=>{let t=Oo();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const i=t.collectionGroup;let s=Oo();return this.indexManager.getCollectionParents(e,i).next(o=>nr.forEach(o,o=>{const a=function(e,t){return new go(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(i));return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{s=s.insert(e,t)})})}).next(()=>s))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r))).next(e=>{i.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,Ls.newInvalidDocument(r)))});let n=Oo();return e.forEach((e,r)=>{const s=i.get(e);void 0!==s&&ha(s.mutation,r,zi.empty(),Bn.now()),Eo(t,r)&&(n=n.insert(e,r))}),n})}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class nu{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return nr.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(e){return{id:e.id,version:e.version,createTime:Qa(e.createTime)}}(t)),nr.resolve()}getNamedQuery(e,t){return nr.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(e){return{name:e.name,query:Pc(e.bundledQuery),readTime:Qa(e.readTime)}}(t)),nr.resolve()}}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class ru{constructor(){this.overlays=new Li(Pn.comparator),this.Lr=new Map}getOverlay(e,t){return nr.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Lo();return nr.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.bt(e,t,r)}),nr.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.Lr.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.Lr.delete(n)),nr.resolve()}getOverlaysForCollection(e,t,n){const r=Lo(),i=t.length+1,s=new Pn(t.child("")),o=this.overlays.getIteratorFrom(s);for(;o.hasNext();){const e=o.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return nr.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new Li((e,t)=>e-t);const s=this.overlays.getIterator();for(;s.hasNext();){const e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=Lo(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=Lo(),a=i.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return nr.resolve(o)}bt(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.Lr.get(r.largestBatchId).delete(n.key);this.Lr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new Ia(t,n));let i=this.Lr.get(t);void 0===i&&(i=Uo(),this.Lr.set(t,i)),this.Lr.set(t,i.add(n.key))}}
/**
       * @license
       * Copyright 2024 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class iu{constructor(){this.sessionToken=Ki.EMPTY_BYTE_STRING}getSessionToken(e){return nr.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,nr.resolve()}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class su{constructor(){this.kr=new Vi(ou.Kr),this.qr=new Vi(ou.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const n=new ou(e,t);this.kr=this.kr.add(n),this.qr=this.qr.add(n)}$r(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Wr(new ou(e,t))}Qr(e,t){e.forEach(e=>this.removeReference(e,t))}Gr(e){const t=new Pn(new Nn([])),n=new ou(t,e),r=new ou(t,e+1),i=[];return this.qr.forEachInRange([n,r],e=>{this.Wr(e),i.push(e.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new Pn(new Nn([])),n=new ou(t,e),r=new ou(t,e+1);let i=Uo();return this.qr.forEachInRange([n,r],e=>{i=i.add(e.key)}),i}containsKey(e){const t=new ou(e,0),n=this.kr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class ou{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return Pn.comparator(e.key,t.key)||vn(e.Hr,t.Hr)}static Ur(e,t){return vn(e.Hr,t.Hr)||Pn.comparator(e.key,t.key)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class au{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new Vi(ou.Kr)}checkEmpty(e){return nr.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new ba(i,t,n,r);this.mutationQueue.push(s);for(const o of r)this.Jr=this.Jr.add(new ou(o.key,i)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return nr.resolve(s)}lookupMutationBatch(e,t){return nr.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.Xr(n),i=r<0?0:r;return nr.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return nr.resolve(0===this.mutationQueue.length?_r:this.Yn-1)}getAllMutationBatches(e){return nr.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new ou(t,0),r=new ou(t,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([n,r],e=>{const t=this.Zr(e.Hr);i.push(t)}),nr.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Vi(vn);return t.forEach(e=>{const t=new ou(e,0),r=new ou(e,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([t,r],e=>{n=n.add(e.Hr)})}),nr.resolve(this.Yr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let i=n;Pn.isDocumentKey(i)||(i=i.child(""));const s=new ou(new Pn(i),0);let o=new Vi(vn);return this.Jr.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.Hr)),!0)},s),nr.resolve(this.Yr(o))}Yr(e){const t=[];return e.forEach(e=>{const n=this.Zr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){sn(0===this.ei(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Jr;return nr.forEach(t.mutations,r=>{const i=new ou(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Jr=n})}nr(e){}containsKey(e,t){const n=new ou(t,0),r=this.Jr.firstAfterOrEqual(n);return nr.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,nr.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class cu{constructor(e){this.ti=e,this.docs=new Li(Pn.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.ti(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return nr.resolve(n?n.document.mutableCopy():Ls.newInvalidDocument(t))}getEntries(e,t){let n=Po();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():Ls.newInvalidDocument(e))}),nr.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=Po();const s=t.path,o=new Pn(s.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||Xn(Qn(o),n)<=0||(r.has(o.key)||Eo(t,o))&&(i=i.insert(o.key,o.mutableCopy()))}return nr.resolve(i)}getAllFromCollectionGroup(e,t,n,r){nn(9500)}ni(e,t){return nr.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new lu(this)}getSize(e){return nr.resolve(this.size)}}class lu extends $l{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Mr.addEntry(e,r)):this.Mr.removeEntry(n)}),nr.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class uu{constructor(e){this.persistence=e,this.ri=new Ao(e=>lo(e),uo),this.lastRemoteSnapshotVersion=Kn.min(),this.highestTargetId=0,this.ii=0,this.si=new su,this.targetCount=0,this.oi=Dl._r()}forEachTarget(e,t){return this.ri.forEach((e,n)=>t(n)),nr.resolve()}getLastRemoteSnapshotVersion(e){return nr.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return nr.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),nr.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ii&&(this.ii=t),nr.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Dl(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,nr.resolve()}updateTargetData(e,t){return this.lr(t),nr.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,nr.resolve()}removeTargets(e,t,n){let r=0;const i=[];return this.ri.forEach((s,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.ri.delete(s),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),nr.waitFor(i).next(()=>r)}getTargetCount(e){return nr.resolve(this.targetCount)}getTargetData(e,t){const n=this.ri.get(t)||null;return nr.resolve(n)}addMatchingKeys(e,t,n){return this.si.$r(t,n),nr.resolve()}removeMatchingKeys(e,t,n){this.si.Qr(t,n);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(t=>{i.push(r.markPotentiallyOrphaned(e,t))}),nr.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),nr.resolve()}getMatchingKeysForTargetId(e,t){const n=this.si.jr(t);return nr.resolve(n)}containsKey(e,t){return nr.resolve(this.si.containsKey(t))}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class hu{constructor(e,t){this._i={},this.overlays={},this.ai=new yr(0),this.ui=!1,this.ui=!0,this.ci=new iu,this.referenceDelegate=e(this),this.li=new uu(this),this.indexManager=new hl,this.remoteDocumentCache=function(e){return new cu(e)}(e=>this.referenceDelegate.hi(e)),this.serializer=new Ic(t),this.Pi=new nu(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new ru,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this._i[e.toKey()];return n||(n=new au(t,this.referenceDelegate),this._i[e.toKey()]=n),n}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,n){Xt("MemoryPersistence","Starting transaction:",e);const r=new du(this.ai.next());return this.referenceDelegate.Ti(),n(r).next(e=>this.referenceDelegate.Ii(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ei(e,t){return nr.or(Object.values(this._i).map(n=>()=>n.containsKey(e,t)))}}class du extends er{constructor(e){super(),this.currentSequenceNumber=e}}class fu{constructor(e){this.persistence=e,this.Ri=new su,this.Ai=null}static Vi(e){return new fu(e)}get di(){if(this.Ai)return this.Ai;throw nn(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.di.delete(n.toString()),nr.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.di.add(n.toString()),nr.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),nr.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(e=>this.di.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.di.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return nr.forEach(this.di,n=>{const r=Pn.fromPath(n);return this.mi(e,r).next(e=>{e||t.removeEntry(r,Kn.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(e=>{e?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return nr.or([()=>nr.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class pu{constructor(e,t){this.persistence=e,this.fi=new Ao(e=>xr(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=zl(this,t)}static Vi(e,t){return new pu(e,t)}Ti(){}Ii(e){return nr.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}pr(e){let t=0;return this.mr(e,e=>{t++}).next(()=>t)}mr(e,t){return nr.forEach(this.fi,(n,r)=>this.wr(e,n,r).next(e=>e?nr.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ni(e,r=>this.wr(e,r,t).next(e=>{e||(n++,i.removeEntry(r,Kn.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),nr.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),nr.resolve()}removeReference(e,t,n){return this.fi.set(n,e.currentSequenceNumber),nr.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),nr.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ws(e.data.value)),t}wr(e,t,n){return nr.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.fi.get(t);return nr.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class mu{constructor(e){this.serializer=e}k(e,t,n,r){const i=new ir("createOrUpgrade",t);n<1&&r>=1&&(function(e){e.createObjectStore(Er)}(e),function(e){e.createObjectStore(Nr,{keyPath:"userId"}),e.createObjectStore(Ar,{keyPath:Dr,autoIncrement:!0}).createIndex(Pr,Rr,{unique:!0}),e.createObjectStore(Fr)}(e),gu(e),function(e){e.createObjectStore(Sr)}(e));let s=nr.resolve();return n<3&&r>=3&&(0!==n&&(function(e){e.deleteObjectStore(Yr),e.deleteObjectStore(Gr),e.deleteObjectStore(ei)}(e),gu(e)),s=s.next(()=>function(e){const t=e.store(ei),n={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:Kn.min().toTimestamp(),targetCount:0};return t.put(Zr,n)}(i))),n<4&&r>=4&&(0!==n&&(s=s.next(()=>function(e,t){return t.store(Ar).H().next(n=>{e.deleteObjectStore(Ar),e.createObjectStore(Ar,{keyPath:Dr,autoIncrement:!0}).createIndex(Pr,Rr,{unique:!0});const r=t.store(Ar),i=n.map(e=>r.put(e));return nr.waitFor(i)})}(e,i))),s=s.next(()=>{!function(e){e.createObjectStore(ri,{keyPath:"clientId"})}(e)})),n<5&&r>=5&&(s=s.next(()=>this.gi(i))),n<6&&r>=6&&(s=s.next(()=>(function(e){e.createObjectStore(Kr)}(e),this.pi(i)))),n<7&&r>=7&&(s=s.next(()=>this.yi(i))),n<8&&r>=8&&(s=s.next(()=>this.wi(e,i))),n<9&&r>=9&&(s=s.next(()=>{!function(e){e.objectStoreNames.contains("remoteDocumentChanges")&&e.deleteObjectStore("remoteDocumentChanges")}(e)})),n<10&&r>=10&&(s=s.next(()=>this.bi(i))),n<11&&r>=11&&(s=s.next(()=>{!function(e){e.createObjectStore(ii,{keyPath:"bundleId"})}(e),function(e){e.createObjectStore(si,{keyPath:"name"})}(e)})),n<12&&r>=12&&(s=s.next(()=>{!function(e){const t=e.createObjectStore(gi,{keyPath:yi});t.createIndex(_i,wi,{unique:!1}),t.createIndex(vi,bi,{unique:!1})}(e)})),n<13&&r>=13&&(s=s.next(()=>function(e){const t=e.createObjectStore(jr,{keyPath:Vr});t.createIndex(qr,Ur),t.createIndex(zr,Br)}(e)).next(()=>this.Si(e,i)).next(()=>e.deleteObjectStore(Sr))),n<14&&r>=14&&(s=s.next(()=>this.Di(e,i))),n<15&&r>=15&&(s=s.next(()=>function(e){e.createObjectStore(oi,{keyPath:"indexId",autoIncrement:!0}).createIndex(ai,"collectionGroup",{unique:!1}),e.createObjectStore(ci,{keyPath:li}).createIndex(ui,hi,{unique:!1}),e.createObjectStore(di,{keyPath:fi}).createIndex(pi,mi,{unique:!1})}(e))),n<16&&r>=16&&(s=s.next(()=>{t.objectStore(ci).clear()}).next(()=>{t.objectStore(di).clear()})),n<17&&r>=17&&(s=s.next(()=>{!function(e){e.createObjectStore(xi,{keyPath:"name"})}(e)})),n<18&&r>=18&&U()&&(s=s.next(()=>{t.objectStore(ci).clear()}).next(()=>{t.objectStore(di).clear()})),s}pi(e){let t=0;return e.store(Sr).ee((e,n)=>{t+=Tl(n)}).next(()=>{const n={byteSize:t};return e.store(Kr).put($r,n)})}gi(e){const t=e.store(Nr),n=e.store(Ar);return t.H().next(t=>nr.forEach(t,t=>{const r=IDBKeyRange.bound([t.userId,_r],[t.userId,t.lastAcknowledgedBatchId]);return n.H(Pr,r).next(n=>nr.forEach(n,n=>{sn(n.userId===t.userId,18650,"Cannot process batch from unexpected user",{batchId:n.batchId});const r=Nc(this.serializer,n);return Cl(e,t.userId,r).next(()=>{})}))}))}yi(e){const t=e.store(Yr),n=e.store(Sr);return e.store(ei).get(Zr).next(e=>{const r=[];return n.ee((n,i)=>{const s=new Nn(n),o=function(e){return[0,xr(e)]}(s);r.push(t.get(o).next(n=>n?nr.resolve():(n=>t.put({targetId:0,path:xr(n),sequenceNumber:e.highestListenSequenceNumber}))(s)))}).next(()=>nr.waitFor(r))})}wi(e,t){e.createObjectStore(ti,{keyPath:ni});const n=t.store(ti),r=new dl,i=e=>{if(r.add(e)){const t=e.lastSegment(),r=e.popLast();return n.put({collectionId:t,parent:xr(r)})}};return t.store(Sr).ee({Y:!0},(e,t)=>{const n=new Nn(e);return i(n.popLast())}).next(()=>t.store(Fr).ee({Y:!0},([e,t,n],r)=>{const s=Tr(t);return i(s.popLast())}))}bi(e){const t=e.store(Gr);return t.ee((e,n)=>{const r=Ac(n),i=Dc(this.serializer,r);return t.put(i)})}Si(e,t){const n=t.store(Sr),r=[];return n.ee((e,n)=>{const i=t.store(jr),s=function(e){return e.document?new Pn(Nn.fromString(e.document.name).popFirst(5)):e.noDocument?Pn.fromSegments(e.noDocument.path):e.unknownDocument?Pn.fromSegments(e.unknownDocument.path):nn(36783)}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(n).path.toArray(),o={prefixPath:s.slice(0,s.length-2),collectionGroup:s[s.length-2],documentId:s[s.length-1],readTime:n.readTime||[0,0],unknownDocument:n.unknownDocument,noDocument:n.noDocument,document:n.document,hasCommittedMutations:!!n.hasCommittedMutations};r.push(i.put(o))}).next(()=>nr.waitFor(r))}Di(e,t){const n=t.store(Ar),r=Hl(this.serializer),i=new hu(fu.Vi,this.serializer.yt);return n.H().next(e=>{const n=new Map;return e.forEach(e=>{let t=n.get(e.userId)??Uo();Nc(this.serializer,e).keys().forEach(e=>t=t.add(e)),n.set(e.userId,t)}),nr.forEach(n,(e,n)=>{const s=new Wt(n),o=Vc.wt(this.serializer,s),a=i.getIndexManager(s),c=Sl.wt(s,this.serializer,a,i.referenceDelegate);return new tu(r,c,o,a).recalculateAndSaveOverlaysForDocumentKeys(new Di(t,yr.ce),e).next()})})}}function gu(e){e.createObjectStore(Yr,{keyPath:Qr}).createIndex(Jr,Xr,{unique:!0}),e.createObjectStore(Gr,{keyPath:"targetId"}).createIndex(Hr,Wr,{unique:!0}),e.createObjectStore(ei)}const yu="IndexedDbPersistence",_u=18e5,wu=5e3,vu="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class bu{constructor(e,t,n,r,i,s,o,a,c,l,u=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Ci=i,this.window=s,this.document=o,this.Fi=c,this.Mi=l,this.xi=u,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=e=>Promise.resolve(),!bu.v())throw new cn(an.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Bl(this,r),this.Ki=t+"main",this.serializer=new Ic(a),this.qi=new sr(this.Ki,this.xi,new mu(this.serializer)),this.ci=new Uc,this.li=new Pl(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Hl(this.serializer),this.Pi=new Lc,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,!1===l&&Zt(yu,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new cn(an.FAILED_PRECONDITION,vu);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.li.getHighestSequenceNumber(e))}).then(e=>{this.ai=new yr(e,this.Fi)}).then(()=>{this.ui=!0}).catch(e=>(this.qi&&this.qi.close(),Promise.reject(e)))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.qi.q(async t=>{null===t.newVersion&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget(async()=>{this.started&&await this.$i()}))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Iu(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.ji(e).next(e=>{e||(this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)))})}).next(()=>this.Hi(e)).next(t=>this.isPrimary&&!t?this.Ji(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(lr(e))return Xt(yu,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return Xt(yu,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable(()=>this.ki(e)),this.isPrimary=e})}ji(e){return xu(e).get(kr).next(e=>nr.resolve(this.Xi(e)))}Yi(e){return Iu(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,_u)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const t=Pi(e,ri);return t.H().next(e=>{const n=this.ns(e,_u),r=e.filter(e=>-1===n.indexOf(e));return nr.forEach(r,e=>t.delete(e.clientId)).next(()=>r)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.$i().then(()=>this.es()).then(()=>this.Gi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Hi(e){return this.Mi?nr.resolve(!0):xu(e).get(kr).next(t=>{if(null!==t&&this.ts(t.leaseTimestampMs,wu)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new cn(an.FAILED_PRECONDITION,vu);return!1}}return!(!this.networkEnabled||!this.inForeground)||Iu(e).H().next(e=>void 0===this.ns(e,wu).find(e=>{if(this.clientId!==e.clientId){const t=!this.networkEnabled&&e.networkEnabled,n=!this.inForeground&&e.inForeground,r=this.networkEnabled===e.networkEnabled;if(t||n&&r)return!0}return!1}))}).next(e=>(this.isPrimary!==e&&Xt(yu,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.qi.runTransaction("shutdown","readwrite",[Er,ri],e=>{const t=new Di(e,yr.ce);return this.Ji(t).next(()=>this.Yi(t))}),this.qi.close(),this.ls()}ns(e,t){return e.filter(e=>this.ts(e.updateTimeMs,t)&&!this.ss(e.clientId))}hs(){return this.runTransaction("getActiveClients","readonly",e=>Iu(e).H().next(e=>this.ns(e,_u).map(e=>e.clientId)))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return Sl.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new ml(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return Vc.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,n){Xt(yu,"Starting transaction:",e);const r="readonly"===t?"readonly":"readwrite",i=function(e){return 18===e?Ai:17===e?Ni:16===e?ki:15===e?Ei:14===e?Si:13===e?Ti:12===e?Ci:11===e?Ii:void nn(60245)}(this.xi);let s;return this.qi.runTransaction(e,r,i,r=>(s=new Di(r,this.ai?this.ai.next():yr.ce),"readwrite-primary"===t?this.ji(s).next(e=>!!e||this.Hi(s)).next(t=>{if(!t)throw Zt(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable(()=>this.ki(!1)),new cn(an.FAILED_PRECONDITION,Zn);return n(s)}).next(e=>this.Zi(s).next(()=>e)):this.Ps(s).next(()=>n(s)))).then(e=>(s.raiseOnCommittedEvent(),e))}Ps(e){return xu(e).get(kr).next(e=>{if(null!==e&&this.ts(e.leaseTimestampMs,wu)&&!this.ss(e.ownerId)&&!this.Xi(e)&&!(this.Mi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new cn(an.FAILED_PRECONDITION,vu)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return xu(e).put(kr,t)}static v(){return sr.v()}Ji(e){const t=xu(e);return t.get(kr).next(e=>this.Xi(e)?(Xt(yu,"Releasing primary lease."),t.delete(kr)):nr.resolve())}ts(e,t){const n=Date.now();return!(e<n-t||e>n&&(Zt(`Detected an update time that is in the future: ${e} > ${n}`),1))}Wi(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.Ni=()=>{this.Ci.enqueueAndForget(()=>(this.inForeground="visible"===this.document.visibilityState,this.$i()))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground="visible"===this.document.visibilityState)}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){"function"==typeof this.window?.addEventListener&&(this.Oi=()=>{this._s();const e=/(?:Version|Mobile)\/1[456]/;q()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){try{const t=null!==this.Ui?.getItem(this.rs(e));return Xt(yu,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(e){return Zt(yu,"Failed to get zombied client id.",e),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){Zt("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch(e){}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function xu(e){return Pi(e,Er)}function Iu(e){return Pi(e,ri)}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class Cu{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Ts=n,this.Is=r}static Es(e,t){let n=Uo(),r=Uo();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Cu(e,t.fromCache,n,r)}}
/**
       * @license
       * Copyright 2023 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Tu{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Su{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=q()?8:or(F())>0?6:4}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,r){const i={result:null};return this.gs(e,t).next(e=>{i.result=e}).next(()=>{if(!i.result)return this.ps(e,t,r,n).next(e=>{i.result=e})}).next(()=>{if(i.result)return;const n=new Tu;return this.ys(e,t,n).next(r=>{if(i.result=r,this.As)return this.ws(e,t,n,r.size)})}).next(()=>i.result)}ws(e,t,n,r){return n.documentReadCount<this.Vs?(Jt()<=ue.DEBUG&&Xt("QueryEngine","SDK will not create cache indexes for query:",So(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),nr.resolve()):(Jt()<=ue.DEBUG&&Xt("QueryEngine","Query:",So(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.ds*r?(Jt()<=ue.DEBUG&&Xt("QueryEngine","The SDK decides to create cache indexes for query:",So(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,bo(t))):nr.resolve())}gs(e,t){if(_o(t))return nr.resolve(null);let n=bo(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=Io(t,null,"F"),n=bo(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const i=Uo(...r);return this.fs.getDocuments(e,i).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const s=this.bs(t,r);return this.Ss(t,s,i,n.readTime)?this.gs(e,Io(t,null,"F")):this.Ds(e,s,t,n)}))})))}ps(e,t,n,r){return _o(t)||r.isEqual(Kn.min())?nr.resolve(null):this.fs.getDocuments(e,n).next(i=>{const s=this.bs(t,i);return this.Ss(t,s,n,r)?nr.resolve(null):(Jt()<=ue.DEBUG&&Xt("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),So(t)),this.Ds(e,s,t,function(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=Kn.fromTimestamp(1e9===r?new Bn(n+1,0):new Bn(n,r));return new Jn(i,Pn.empty(),t)}(r,-1)).next(e=>e))})}bs(e,t){let n=new Vi(ko(e));return t.forEach((t,r)=>{Eo(e,r)&&(n=n.add(r))}),n}Ss(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}ys(e,t,n){return Jt()<=ue.DEBUG&&Xt("QueryEngine","Using full collection scan to execute query:",So(t)),this.fs.getDocumentsMatchingQuery(e,t,Jn.min(),n)}Ds(e,t,n,r){return this.fs.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Eu="LocalStore";class ku{constructor(e,t,n,r){this.persistence=e,this.Cs=t,this.serializer=r,this.vs=new Li(vn),this.Fs=new Ao(e=>lo(e),uo),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(n)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new tu(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function Nu(e,t,n,r){return new ku(e,t,n,r)}async function Au(e,t){const n=on(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(i=>(r=i,n.Os(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const i=[],s=[];let o=Uo();for(const e of r){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ns:e,removedBatchIds:i,addedBatchIds:s}))})})}function Du(e){const t=on(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.li.getLastRemoteSnapshotVersion(e))}function Pu(e,t){const n=on(e),r=t.snapshotVersion;let i=n.vs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const s=n.xs.newChangeBuffer({trackRemovals:!0});i=n.vs;const o=[];t.targetChanges.forEach((s,a)=>{const c=i.get(a);if(!c)return;o.push(n.li.removeMatchingKeys(e,s.removedDocuments,a).next(()=>n.li.addMatchingKeys(e,s.addedDocuments,a)));let l=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?l=l.withResumeToken(Ki.EMPTY_BYTE_STRING,Kn.min()).withLastLimboFreeSnapshotVersion(Kn.min()):s.resumeToken.approximateByteSize()>0&&(l=l.withResumeToken(s.resumeToken,r)),i=i.insert(a,l),function(e,t,n){return 0===e.resumeToken.approximateByteSize()||(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0)}(c,l,s)&&o.push(n.li.updateTargetData(e,l))});let a=Po(),c=Uo();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(function(e,t,n){let r=Uo(),i=Uo();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=Po();return n.forEach((n,s)=>{const o=e.get(n);s.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(Kn.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!o.isValidDocument()||s.version.compareTo(o.version)>0||0===s.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):Xt(Eu,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",s.version)}),{Bs:r,Ls:i}})}(e,s,t.documentUpdates).next(e=>{a=e.Bs,c=e.Ls})),!r.isEqual(Kn.min())){const t=n.li.getLastRemoteSnapshotVersion(e).next(t=>n.li.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return nr.waitFor(o).next(()=>s.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.vs=i,e))}function Ru(e,t){const n=on(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=_r),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}async function Ou(e,t,n){const r=on(e),i=r.vs.get(t),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,e=>r.persistence.referenceDelegate.removeTarget(e,i))}catch(e){if(!lr(e))throw e;Xt(Eu,`Failed to update sequence numbers for target ${t}: ${e}`)}r.vs=r.vs.remove(t),r.Fs.delete(i.target)}function Mu(e,t,n){const r=on(e);let i=Kn.min(),s=Uo();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=on(e),i=r.Fs.get(n);return void 0!==i?nr.resolve(r.vs.get(i)):r.li.getTargetData(t,n)}(r,e,bo(t)).next(t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(e,t.targetId).next(e=>{s=e})}).next(()=>r.Cs.getDocumentsMatchingQuery(e,t,n?i:Kn.min(),n?s:Uo())).next(e=>(function(e,t,n){let r=e.Ms.get(t)||Kn.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Ms.set(t,r)}(r,function(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}(t),e),{documents:e,ks:s})))}class Lu{constructor(){this.activeTargetIds=zo}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Fu{constructor(){this.vo=new Lu,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,n){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Lu,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class ju{Mo(e){}shutdown(){}}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Vu="ConnectivityMonitor";class qu{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){Xt(Vu,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){Xt(Vu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
       * @license
       * Copyright 2023 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */let Uu=null;function zu(){return null===Uu?Uu=268435456+Math.round(2147483648*Math.random()):Uu++,"0x"+Uu.toString(16)
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */}const Bu="RestConnection",Ku={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class $u{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${n}/databases/${r}`,this.$o=this.databaseId.database===rs?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Wo(e,t,n,r,i){const s=zu(),o=this.Qo(e,t.toUriEncodedString());Xt(Bu,`Sending RPC '${e}' ${s}:`,o,n);const a={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(a,r,i);const{host:c}=new URL(o),l=D(c);return this.zo(e,o,a,n,l).then(t=>(Xt(Bu,`Received RPC '${e}' ${s}: `,t),t),t=>{throw en(Bu,`RPC '${e}' ${s} failed with error: `,t,"url: ",o,"request:",n),t})}jo(e,t,n,r,i,s){return this.Wo(e,t,n,r,i)}Go(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+Yt,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}Qo(e,t){const n=Ku[e];let r=`${this.qo}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Gu{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Hu="WebChannelConnection",Wu=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};class Yu extends $u{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Yu.c_){const e=$t();Wu(e,Kt.STAT_EVENT,e=>{e.stat===Bt.PROXY?Xt(Hu,"STAT_EVENT: detected buffering proxy"):e.stat===Bt.NOPROXY&&Xt(Hu,"STAT_EVENT: detected no buffering proxy")}),Yu.c_=!0}}zo(e,t,n,r,i){const s=zu();return new Promise((i,o)=>{const a=new Vt;a.setWithCredentials(!0),a.listenOnce(Ut.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case zt.NO_ERROR:const t=a.getResponseJson();Xt(Hu,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(t)),i(t);break;case zt.TIMEOUT:Xt(Hu,`RPC '${e}' ${s} timed out`),o(new cn(an.DEADLINE_EXCEEDED,"Request time out"));break;case zt.HTTP_ERROR:const n=a.getStatus();if(Xt(Hu,`RPC '${e}' ${s} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=e?.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(an).indexOf(t)>=0?t:an.UNKNOWN}(t.status);o(new cn(e,t.message))}else o(new cn(an.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new cn(an.UNAVAILABLE,"Connection failed."));break;default:nn(9055,{l_:e,streamId:s,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{Xt(Hu,`RPC '${e}' ${s} completed.`)}});const c=JSON.stringify(r);Xt(Hu,`RPC '${e}' ${s} sending request:`,r),a.send(t,"POST",c,n,15)})}T_(e,t,n){const r=zu(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=this.createWebChannelTransport(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},a=this.longPollingOptions.timeoutSeconds;void 0!==a&&(o.longPollingTimeout=Math.round(1e3*a)),this.useFetchStreams&&(o.useFetchStreams=!0),this.Go(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;const c=i.join("");Xt(Hu,`Creating RPC '${e}' stream ${r}: ${c}`,o);const l=s.createWebChannel(c,o);this.I_(l);let u=!1,h=!1;const d=new Gu({Ho:t=>{h?Xt(Hu,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(u||(Xt(Hu,`Opening RPC '${e}' stream ${r} transport.`),l.open(),u=!0),Xt(Hu,`RPC '${e}' stream ${r} sending:`,t),l.send(t))},Jo:()=>l.close()});return Wu(l,qt.EventType.OPEN,()=>{h||(Xt(Hu,`RPC '${e}' stream ${r} transport opened.`),d.i_())}),Wu(l,qt.EventType.CLOSE,()=>{h||(h=!0,Xt(Hu,`RPC '${e}' stream ${r} transport closed`),d.o_(),this.E_(l))}),Wu(l,qt.EventType.ERROR,t=>{h||(h=!0,en(Hu,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),d.o_(new cn(an.UNAVAILABLE,"The operation could not be completed")))}),Wu(l,qt.EventType.MESSAGE,t=>{if(!h){const n=t.data[0];sn(!!n,16349);const i=n,s=i?.error||i[0]?.error;if(s){Xt(Hu,`RPC '${e}' stream ${r} received error:`,s);const t=s.status;let n=function(e){const t=Ta[e];if(void 0!==t)return Ea(t)}(t),i=s.message;"NOT_FOUND"===t&&i.includes("database")&&i.includes("does not exist")&&i.includes(this.databaseId.database)&&en(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),void 0===n&&(n=an.INTERNAL,i="Unknown error status: "+t+" with message "+s.message),h=!0,d.o_(new cn(n,i)),l.close()}else Xt(Hu,`RPC '${e}' stream ${r} received:`,n),d.__(n)}}),Yu.u_(),setTimeout(()=>{d.s_()},0),d}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,n){super.Go(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Gt()}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Qu(){return"undefined"!=typeof document?document:null}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Ju(e){return new $a(e,!0)}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */Yu.c_=!1;class Xu{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=n,this.A_=r,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-n);r>0&&Xt("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Zu="PersistentStream";class eh{constructor(e,t,n,r,i,s,o,a){this.Ci=e,this.b_=n,this.S_=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Xu(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,()=>this.k_()))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===an.RESOURCE_EXHAUSTED?(Zt(t.toString()),Zt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===an.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{const e=new cn(an.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const n=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.Yo(()=>{n(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.H_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return Xt(Zu,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(Xt(Zu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class th extends eh{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:nn(39313,{state:e})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],s=function(e,t){return e.useProto3Json?(sn(void 0===t||"string"==typeof t,58123),Ki.fromBase64String(t||"")):(sn(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),Ki.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?an.UNKNOWN:Ea(e.code);return new cn(t,e.message||"")}(o);n=new Fa(r,i,s,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=tc(e,r.document.name),s=Qa(r.document.updateTime),o=r.document.createTime?Qa(r.document.createTime):Kn.min(),a=new Os({mapValue:{fields:r.document.fields}}),c=Ls.newFoundDocument(i,s,o,a),l=r.targetIds||[],u=r.removedTargetIds||[];n=new Ma(l,u,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=tc(e,r.document),s=r.readTime?Qa(r.readTime):Kn.min(),o=Ls.newNoDocument(i,s),a=r.removedTargetIds||[];n=new Ma([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=tc(e,r.document),s=r.removedTargetIds||[];n=new Ma([],s,i,null)}else{if(!("filter"in t))return nn(11601,{Vt:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:i}=e,s=new Ca(r,i),o=e.targetId;n=new La(o,s)}}return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return Kn.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?Kn.min():t.readTime?Qa(t.readTime):Kn.min()}(e);return this.listener.J_(t,n)}Z_(e){const t={};t.database=ic(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=ho(r)?{documents:lc(e,r)}:{query:uc(e,r).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=Wa(e,t.resumeToken);const r=Ga(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(Kn.min())>0){n.readTime=Ha(e,t.snapshotVersion.toTimestamp());const r=Ga(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return nn(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.K_(t)}X_(e){const t={};t.database=ic(this.serializer),t.removeTarget=e,this.K_(t)}}class nh extends eh{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return sn(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,sn(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){sn(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=function(e,t){return e&&e.length>0?(sn(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?Qa(e.updateTime):Qa(t);return n.isEqual(Kn.min())&&(n=Qa(t)),new sa(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=Qa(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=ic(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>ac(this.serializer,e))};this.K_(t)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class rh{}class ih extends rh{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new cn(an.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,s])=>this.connection.Wo(e,Xa(t,n),r,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===an.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new cn(an.UNKNOWN,e.toString())})}jo(e,t,n,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.jo(e,Xa(t,n),r,s,o,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===an.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new cn(an.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class sh{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Zt(t),this.aa=!1):Xt("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const oh="RemoteStore";class ah{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(e=>{n.enqueueAndForget(async()=>{gh(this)&&(Xt(oh,"Restarting streams for network reachability change."),await async function(e){const t=on(e);t.Ea.add(4),await lh(t),t.Va.set("Unknown"),t.Ea.delete(4),await ch(t)}(this))})}),this.Va=new sh(n,r)}}async function ch(e){if(gh(e))for(const t of e.Ra)await t(!0)}async function lh(e){for(const t of e.Ra)await t(!1)}function uh(e,t){const n=on(e);n.Ia.has(t.targetId)||(n.Ia.set(t.targetId,t),mh(n)?ph(n):Oh(n).O_()&&dh(n,t))}function hh(e,t){const n=on(e),r=Oh(n);n.Ia.delete(t),r.O_()&&fh(n,t),0===n.Ia.size&&(r.O_()?r.L_():gh(n)&&n.Va.set("Unknown"))}function dh(e,t){if(e.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(Kn.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Oh(e).Z_(t)}function fh(e,t){e.da.$e(t),Oh(e).X_(t)}function ph(e){e.da=new Va({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),Oh(e).start(),e.Va.ua()}function mh(e){return gh(e)&&!Oh(e).x_()&&e.Ia.size>0}function gh(e){return 0===on(e).Ea.size}function yh(e){e.da=void 0}async function _h(e){e.Va.set("Online")}async function wh(e){e.Ia.forEach((t,n)=>{dh(e,t)})}async function vh(e,t){yh(e),mh(e)?(e.Va.ha(t),ph(e)):e.Va.set("Unknown")}async function bh(e,t,n){if(e.Va.set("Online"),t instanceof Fa&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.Ia.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Ia.delete(r),e.da.removeTarget(r))}(e,t)}catch(n){Xt(oh,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await xh(e,n)}else if(t instanceof Ma?e.da.Xe(t):t instanceof La?e.da.st(t):e.da.tt(t),!n.isEqual(Kn.min()))try{const t=await Du(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.da.Tt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.Ia.get(r);i&&e.Ia.set(r,i.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.Ia.get(t);if(!r)return;e.Ia.set(t,r.withResumeToken(Ki.EMPTY_BYTE_STRING,r.snapshotVersion)),fh(e,t);const i=new xc(r.target,t,n,r.sequenceNumber);dh(e,i)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){Xt(oh,"Failed to raise snapshot:",t),await xh(e,t)}}async function xh(e,t,n){if(!lr(t))throw t;e.Ea.add(1),await lh(e),e.Va.set("Offline"),n||(n=()=>Du(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{Xt(oh,"Retrying IndexedDB access"),await n(),e.Ea.delete(1),await ch(e)})}function Ih(e,t){return t().catch(n=>xh(e,n,t))}async function Ch(e){const t=on(e),n=Mh(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:_r;for(;Th(t);)try{const e=await Ru(t.localStore,r);if(null===e){0===t.Ta.length&&n.L_();break}r=e.batchId,Sh(t,e)}catch(e){await xh(t,e)}Eh(t)&&kh(t)}function Th(e){return gh(e)&&e.Ta.length<10}function Sh(e,t){e.Ta.push(t);const n=Mh(e);n.O_()&&n.Y_&&n.ea(t.mutations)}function Eh(e){return gh(e)&&!Mh(e).x_()&&e.Ta.length>0}function kh(e){Mh(e).start()}async function Nh(e){Mh(e).ra()}async function Ah(e){const t=Mh(e);for(const n of e.Ta)t.ea(n.mutations)}async function Dh(e,t,n){const r=e.Ta.shift(),i=xa.from(r,t,n);await Ih(e,()=>e.remoteSyncer.applySuccessfulWrite(i)),await Ch(e)}async function Ph(e,t){t&&Mh(e).Y_&&await async function(e,t){if(function(e){return function(e){switch(e){case an.OK:return nn(64938);case an.CANCELLED:case an.UNKNOWN:case an.DEADLINE_EXCEEDED:case an.RESOURCE_EXHAUSTED:case an.INTERNAL:case an.UNAVAILABLE:case an.UNAUTHENTICATED:return!1;case an.INVALID_ARGUMENT:case an.NOT_FOUND:case an.ALREADY_EXISTS:case an.PERMISSION_DENIED:case an.FAILED_PRECONDITION:case an.ABORTED:case an.OUT_OF_RANGE:case an.UNIMPLEMENTED:case an.DATA_LOSS:return!0;default:return nn(15467,{code:e})}}(e)&&e!==an.ABORTED}(t.code)){const n=e.Ta.shift();Mh(e).B_(),await Ih(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await Ch(e)}}(e,t),Eh(e)&&kh(e)}async function Rh(e,t){const n=on(e);n.asyncQueue.verifyOperationInProgress(),Xt(oh,"RemoteStore received new credentials");const r=gh(n);n.Ea.add(3),await lh(n),r&&n.Va.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ea.delete(3),await ch(n)}function Oh(e){return e.ma||(e.ma=function(e,t,n){const r=on(e);return r.sa(),new th(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)
/**
       * @license
       * Copyright 2018 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */}(e.datastore,e.asyncQueue,{Zo:_h.bind(null,e),Yo:wh.bind(null,e),t_:vh.bind(null,e),J_:bh.bind(null,e)}),e.Ra.push(async t=>{t?(e.ma.B_(),mh(e)?ph(e):e.Va.set("Unknown")):(await e.ma.stop(),yh(e))})),e.ma}function Mh(e){return e.fa||(e.fa=function(e,t,n){const r=on(e);return r.sa(),new nh(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Nh.bind(null,e),t_:Ph.bind(null,e),ta:Ah.bind(null,e),na:Dh.bind(null,e)}),e.Ra.push(async t=>{t?(e.fa.B_(),await Ch(e)):(await e.fa.stop(),e.Ta.length>0&&(Xt(oh,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */}class Lh{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new ln,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,i){const s=Date.now()+n,o=new Lh(e,t,s,r,i);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new cn(an.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Fh(e,t){if(Zt("AsyncQueue",`${t}: ${e}`),lr(e))return new cn(an.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class jh{static emptySet(e){return new jh(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||Pn.comparator(t.key,n.key):(e,t)=>Pn.comparator(e.key,t.key),this.keyedMap=Oo(),this.sortedSet=new Li(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof jh))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new jh;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Vh{constructor(){this.ga=new Li(Pn.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):nn(63341,{Vt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class qh{constructor(e,t,n,r,i,s,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,i){const s=[];return t.forEach(e=>{s.push({type:0,doc:e})}),new qh(e,t,jh.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Co(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Uh{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some(e=>e.Da())}}class zh{constructor(){this.queries=Bh(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){const n=on(e),r=n.queries;n.queries=Bh(),r.forEach((e,n)=>{for(const r of n.ba)r.onError(t)})}(this,new cn(an.ABORTED,"Firestore shutting down"))}}function Bh(){return new Ao(e=>To(e),Co)}async function Kh(e,t){const n=on(e);let r=3;const i=t.query;let s=n.queries.get(i);s?!s.Sa()&&t.Da()&&(r=2):(s=new Uh,r=t.Da()?0:1);try{switch(r){case 0:s.wa=await n.onListen(i,!0);break;case 1:s.wa=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(e){const n=Fh(e,`Initialization of query '${So(t.query)}' failed`);return void t.onError(n)}n.queries.set(i,s),s.ba.push(t),t.va(n.onlineState),s.wa&&t.Fa(s.wa)&&Wh(n)}async function $h(e,t){const n=on(e),r=t.query;let i=3;const s=n.queries.get(r);if(s){const e=s.ba.indexOf(t);e>=0&&(s.ba.splice(e,1),0===s.ba.length?i=t.Da()?0:1:!s.Sa()&&t.Da()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function Gh(e,t){const n=on(e);let r=!1;for(const i of t){const e=i.query,t=n.queries.get(e);if(t){for(const e of t.ba)e.Fa(i)&&(r=!0);t.wa=i}}r&&Wh(n)}function Hh(e,t,n){const r=on(e),i=r.queries.get(t);if(i)for(const s of i.ba)s.onError(n);r.queries.delete(t)}function Wh(e){e.Ca.forEach(e=>{e.next()})}var Yh,Qh;(Qh=Yh||(Yh={})).Ma="default",Qh.Cache="cache";class Jh{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new qh(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==t;return(!this.options.Ka||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=qh.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Yh.Cache}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Xh{constructor(e){this.key=e}}class Zh{constructor(e){this.key=e}}class ed{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=Uo(),this.mutatedKeys=Uo(),this.eu=ko(e),this.tu=new jh(this.eu)}get nu(){return this.Za}ru(e,t){const n=t?t.iu:new Vh,r=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,s=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const l=r.get(e),u=Eo(this.query,t)?t:null,h=!!l&&this.mutatedKeys.has(l.key),d=!!u&&(u.hasLocalMutations||this.mutatedKeys.has(u.key)&&u.hasCommittedMutations);let f=!1;l&&u?l.data.isEqual(u.data)?h!==d&&(n.track({type:3,doc:u}),f=!0):this.su(l,u)||(n.track({type:2,doc:u}),f=!0,(a&&this.eu(u,a)>0||c&&this.eu(u,c)<0)&&(o=!0)):!l&&u?(n.track({type:0,doc:u}),f=!0):l&&!u&&(n.track({type:1,doc:l}),f=!0,(a||c)&&(o=!0)),f&&(u?(s=s.add(u),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))}),null!==this.query.limit)for(;s.size>this.query.limit;){const e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{tu:s,iu:n,Ss:o,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const s=e.iu.ya();s.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return nn(20277,{Vt:e})}};return n(e)-n(t)}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),r=r??!1;const o=t&&!r?this._u():[],a=0===this.Ya.size&&this.current&&!r?1:0,c=a!==this.Xa;return this.Xa=a,0!==s.length||c?{snapshot:new qh(this.query,e.tu,i,s,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Vh,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Za=this.Za.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Za=this.Za.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=Uo(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Ya=this.Ya.add(e.key))});const t=[];return e.forEach(e=>{this.Ya.has(e)||t.push(new Zh(e))}),this.Ya.forEach(n=>{e.has(n)||t.push(new Xh(n))}),t}cu(e){this.Za=e.ks,this.Ya=Uo();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return qh.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Xa,this.hasCachedResults)}}const td="SyncEngine";class nd{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class rd{constructor(e){this.key=e,this.hu=!1}}class id{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Pu={},this.Tu=new Ao(e=>To(e),Co),this.Iu=new Map,this.Eu=new Set,this.Ru=new Li(Pn.comparator),this.Au=new Map,this.Vu=new su,this.du={},this.mu=new Map,this.fu=Dl.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function sd(e,t,n=!0){const r=Td(e);let i;const s=r.Tu.get(t);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await ad(r,t,n,!0),i}async function od(e,t){const n=Td(e);await ad(n,t,!0,!1)}async function ad(e,t,n,r){const i=await function(e,t){const n=on(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.li.getTargetData(e,t).next(i=>i?(r=i,nr.resolve(r)):n.li.allocateTargetId(e).next(i=>(r=new xc(t,i,"TargetPurposeListen",e.currentSequenceNumber),n.li.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.vs.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.vs=n.vs.insert(e.targetId,e),n.Fs.set(t,e.targetId)),e})}(e.localStore,bo(t)),s=i.targetId,o=e.sharedClientState.addLocalQueryTarget(s,n);let a;return r&&(a=await async function(e,t,n,r,i){e.pu=(t,n,r)=>async function(e,t,n,r){let i=t.view.ru(n);i.Ss&&(i=await Mu(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,i)));const s=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(i,e.isPrimaryClient,s,o);return wd(e,t.targetId,a.au),a.snapshot}(e,t,n,r);const s=await Mu(e.localStore,t,!0),o=new ed(t,s.ks),a=o.ru(s.documents),c=Oa.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),l=o.applyChanges(a,e.isPrimaryClient,c);wd(e,n,l.au);const u=new nd(t,n,o);return e.Tu.set(t,u),e.Iu.has(n)?e.Iu.get(n).push(t):e.Iu.set(n,[t]),l.snapshot}(e,t,s,"current"===o,i.resumeToken)),e.isPrimaryClient&&n&&uh(e.remoteStore,i),a}async function cd(e,t,n){const r=on(e),i=r.Tu.get(t),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter(e=>!Co(e,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ou(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&hh(r.remoteStore,i.targetId),yd(r,i.targetId)}).catch(tr)):(yd(r,i.targetId),await Ou(r.localStore,i.targetId,!0))}async function ld(e,t){const n=on(e),r=n.Tu.get(t),i=n.Iu.get(r.targetId);n.isPrimaryClient&&1===i.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),hh(n.remoteStore,r.targetId))}async function ud(e,t){const n=on(e);try{const e=await Pu(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.Au.get(t);r&&(sn(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.hu=!0:e.modifiedDocuments.size>0?sn(r.hu,14607):e.removedDocuments.size>0&&(sn(r.hu,42227),r.hu=!1))}),await xd(n,e,t)}catch(e){await tr(e)}}function hd(e,t,n){const r=on(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.Tu.forEach((n,r)=>{const i=r.view.va(t);i.snapshot&&e.push(i.snapshot)}),function(e,t){const n=on(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const i of n.ba)i.va(t)&&(r=!0)}),r&&Wh(n)}(r.eventManager,t),e.length&&r.Pu.J_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function dd(e,t,n){const r=on(e);r.sharedClientState.updateQueryState(t,"rejected",n);const i=r.Au.get(t),s=i&&i.key;if(s){let e=new Li(Pn.comparator);e=e.insert(s,Ls.newNoDocument(s,Kn.min()));const n=Uo().add(s),i=new Ra(Kn.min(),new Map,new Li(vn),e,n);await ud(r,i),r.Ru=r.Ru.remove(s),r.Au.delete(t),bd(r)}else await Ou(r.localStore,t,!1).then(()=>yd(r,t,n)).catch(tr)}async function fd(e,t){const n=on(e),r=t.batch.batchId;try{const e=await function(e,t){const n=on(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),i=n.xs.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const i=n.batch,s=i.keys();let o=nr.resolve();return s.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const s=n.docVersions.get(e);sn(null!==s,48541),t.version.compareTo(s)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,i))}(n,e,t,i).next(()=>i.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=Uo();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}(n.localStore,t);gd(n,r,null),md(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await xd(n,e)}catch(e){await tr(e)}}async function pd(e,t,n){const r=on(e);try{const e=await function(e,t){const n=on(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(sn(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);gd(r,t,n),md(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await xd(r,e)}catch(n){await tr(n)}}function md(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function gd(e,t,n){const r=on(e);let i=r.du[r.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.du[r.currentUser.toKey()]=i}}function yd(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Iu.get(t))e.Tu.delete(r),n&&e.Pu.yu(r,n);e.Iu.delete(t),e.isPrimaryClient&&e.Vu.Gr(t).forEach(t=>{e.Vu.containsKey(t)||_d(e,t)})}function _d(e,t){e.Eu.delete(t.path.canonicalString());const n=e.Ru.get(t);null!==n&&(hh(e.remoteStore,n),e.Ru=e.Ru.remove(t),e.Au.delete(n),bd(e))}function wd(e,t,n){for(const r of n)r instanceof Xh?(e.Vu.addReference(r.key,t),vd(e,r)):r instanceof Zh?(Xt(td,"Document no longer in limbo: "+r.key),e.Vu.removeReference(r.key,t),e.Vu.containsKey(r.key)||_d(e,r.key)):nn(19791,{wu:r})}function vd(e,t){const n=t.key,r=n.path.canonicalString();e.Ru.get(n)||e.Eu.has(r)||(Xt(td,"New document in limbo: "+n),e.Eu.add(r),bd(e))}function bd(e){for(;e.Eu.size>0&&e.Ru.size<e.maxConcurrentLimboResolutions;){const t=e.Eu.values().next().value;e.Eu.delete(t);const n=new Pn(Nn.fromString(t)),r=e.fu.next();e.Au.set(r,new rd(n)),e.Ru=e.Ru.insert(n,r),uh(e.remoteStore,new xc(bo(yo(n.path)),r,"TargetPurposeLimboResolution",yr.ce))}}async function xd(e,t,n){const r=on(e),i=[],s=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((e,a)=>{o.push(r.pu(a,t,n).then(e=>{if((e||n)&&r.isPrimaryClient){const t=e?!e.fromCache:n?.targetChanges.get(a.targetId)?.current;r.sharedClientState.updateQueryState(a.targetId,t?"current":"not-current")}if(e){i.push(e);const t=Cu.Es(a.targetId,e);s.push(t)}}))}),await Promise.all(o),r.Pu.J_(i),await async function(e,t){const n=on(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>nr.forEach(t,t=>nr.forEach(t.Ts,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>nr.forEach(t.Is,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(e){if(!lr(e))throw e;Xt(Eu,"Failed to update sequence numbers: "+e)}for(const r of t){const e=r.targetId;if(!r.fromCache){const t=n.vs.get(e),r=t.snapshotVersion,i=t.withLastLimboFreeSnapshotVersion(r);n.vs=n.vs.insert(e,i)}}}(r.localStore,s))}async function Id(e,t){const n=on(e);if(!n.currentUser.isEqual(t)){Xt(td,"User change. New user:",t.toKey());const e=await Au(n.localStore,t);n.currentUser=t,function(e,t){e.mu.forEach(e=>{e.forEach(e=>{e.reject(new cn(an.CANCELLED,t))})}),e.mu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await xd(n,e.Ns)}}function Cd(e,t){const n=on(e),r=n.Au.get(t);if(r&&r.hu)return Uo().add(r.key);{let e=Uo();const r=n.Iu.get(t);if(!r)return e;for(const t of r){const r=n.Tu.get(t);e=e.unionWith(r.view.nu)}return e}}function Td(e){const t=on(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=ud.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Cd.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=dd.bind(null,t),t.Pu.J_=Gh.bind(null,t.eventManager),t.Pu.yu=Hh.bind(null,t.eventManager),t}function Sd(e){const t=on(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=fd.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=pd.bind(null,t),t}class Ed{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ju(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Nu(this.persistence,new Su,e.initialUser,this.serializer)}Cu(e){return new hu(fu.Vi,this.serializer)}Du(e){return new Fu}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ed.provider={build:()=>new Ed};class kd extends Ed{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){sn(this.persistence.referenceDelegate instanceof pu,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new ql(n,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?Il.withCacheSize(this.cacheSizeBytes):Il.DEFAULT;return new hu(e=>pu.Vi(e,t),this.serializer)}}class Nd extends Ed{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await Sd(this.xu.syncEngine),await Ch(this.xu.remoteStore),await this.persistence.zi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return Nu(this.persistence,new Su,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new ql(n,e.asyncQueue,t)}Mu(e,t){const n=new gr(t,this.persistence);return new mr(e.asyncQueue,n)}Cu(e){const t=function(e,t){let n=e.projectId;return e.isDefaultDatabase||(n+="."+e.database),"firestore/"+t+"/"+n+"/"}(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?Il.withCacheSize(this.cacheSizeBytes):Il.DEFAULT;return new bu(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,"undefined"!=typeof window?window:null,Qu(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new Fu}}class Ad{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>hd(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=Id.bind(null,this.syncEngine),await async function(e,t){const n=on(e);t?(n.Ea.delete(2),await ch(n)):t||(n.Ea.add(2),await lh(n),n.Va.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new zh}createDatastore(e){const t=Ju(e.databaseInfo.databaseId),n=function(e){return new Yu(e)}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e.databaseInfo);return function(e,t,n,r){return new ih(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(e,t,n,r,i){return new ah(e,t,n,r,i)}(this.localStore,this.datastore,e.asyncQueue,e=>hd(this.syncEngine,e,0),qu.v()?new qu:new ju)}createSyncEngine(e,t){return function(e,t,n,r,i,s,o){const a=new id(e,t,n,r,i,s);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){const t=on(e);Xt(oh,"RemoteStore shutting down."),t.Ea.add(5),await lh(t),t.Aa.shutdown(),t.Va.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Ad.provider={build:()=>new Ad};
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class Dd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Zt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Pd="FirestoreClient";class Rd{constructor(e,t,n,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=r,this.user=Wt.UNAUTHENTICATED,this.clientId=wn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async e=>{Xt(Pd,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(Xt(Pd,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ln;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Fh(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Od(e,t){e.asyncQueue.verifyOperationInProgress(),Xt(Pd,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Au(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function Md(e,t){e.asyncQueue.verifyOperationInProgress();const n=await async function(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){Xt(Pd,"Using user provided OfflineComponentProvider");try{await Od(e,e._uninitializedComponentsProvider._offline)}catch(t){const r=t;if(!function(e){return"FirebaseError"===e.name?e.code===an.FAILED_PRECONDITION||e.code===an.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code}(r))throw r;en("Error using user provided cache. Falling back to memory cache: "+r),await Od(e,new Ed)}}else Xt(Pd,"Using default OfflineComponentProvider"),await Od(e,new kd(void 0));return e._offlineComponents}(e);Xt(Pd,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>Rh(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>Rh(t.remoteStore,n)),e._onlineComponents=t}async function Ld(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(Xt(Pd,"Using user provided OnlineComponentProvider"),await Md(e,e._uninitializedComponentsProvider._online)):(Xt(Pd,"Using default OnlineComponentProvider"),await Md(e,new Ad))),e._onlineComponents}async function Fd(e){const t=await Ld(e),n=t.eventManager;return n.onListen=sd.bind(null,t.syncEngine),n.onUnlisten=cd.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=od.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=ld.bind(null,t.syncEngine),n}function jd(e,t){const n=new ln;return e.asyncQueue.enqueueAndForget(async()=>async function(e,t,n){const r=Sd(e);try{const e=await function(e,t){const n=on(e),r=Bn.now(),i=t.reduce((e,t)=>e.add(t.key),Uo());let s,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=Po(),c=Uo();return n.xs.getEntries(e,i).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(i=>{s=i;const o=[];for(const e of t){const t=da(e,s.get(e.key).overlayedDocument);null!=t&&o.push(new ma(e.key,t,Ms(t.value.mapValue),oa.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(s,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:Mo(s)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.du[e.currentUser.toKey()];r||(r=new Li(vn)),r=r.insert(t,n),e.du[e.currentUser.toKey()]=r}(r,e.batchId,n),await xd(r,e.changes),await Ch(r.remoteStore)}catch(e){const t=Fh(e,"Failed to persist write");n.reject(t)}}(await function(e){return Ld(e).then(e=>e.syncEngine)}(e),t,n)),n.promise
/**
       * @license
       * Copyright 2023 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */}function Vd(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */}const qd=new Map,Ud="firestore.googleapis.com",zd=!0;class Bd{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new cn(an.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ud,this.ssl=zd}else this.host=e.host,this.ssl=e.ssl??zd;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=xl;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<Fl)throw new cn(an.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,r){if(!0===t&&!0===r)throw new cn(an.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Vd(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new cn(an.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new cn(an.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new cn(an.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Kd{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Bd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new cn(an.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new cn(an.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Bd(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new hn;switch(e.type){case"firstParty":return new mn(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new cn(an.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=qd.get(e);t&&(Xt("ComponentProvider","Removing Datastore"),qd.delete(e),t.terminate())}(this),Promise.resolve()}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class $d{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new $d(this.firestore,e,this._query)}}class Gd{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Hd(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Gd(this.firestore,e,this._key)}toJSON(){return{type:Gd._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(qn(t,Gd._jsonSchema))return new Gd(e,n||null,new Pn(Nn.fromString(t.referencePath)))}}Gd._jsonSchemaVersion="firestore/documentReference/1.0",Gd._jsonSchema={type:Vn("string",Gd._jsonSchemaVersion),referencePath:Vn("string")};class Hd extends $d{constructor(e,t,n){super(e,t,yo(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Gd(this.firestore,null,new Pn(e))}withConverter(e){return new Hd(this.firestore,e,this._path)}}function Wd(e,t,...n){if(e=se(e),Rn("collection","path",t),e instanceof Kd){const r=Nn.fromString(t,...n);return Mn(r),new Hd(e,null,r)}{if(!(e instanceof Gd||e instanceof Hd))throw new cn(an.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Nn.fromString(t,...n));return Mn(r),new Hd(e.firestore,null,r)}}function Yd(e,t,...n){if(e=se(e),1===arguments.length&&(t=wn.newId()),Rn("doc","path",t),e instanceof Kd){const r=Nn.fromString(t,...n);return On(r),new Gd(e,null,new Pn(r))}{if(!(e instanceof Gd||e instanceof Hd))throw new cn(an.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Nn.fromString(t,...n));return On(r),new Gd(e.firestore,e instanceof Hd?e.converter:null,new Pn(r))}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Qd="AsyncQueue";class Jd{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Xu(this,"async_queue_retry"),this._c=()=>{const e=Qu();e&&Xt(Qd,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=Qu();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Qu();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new ln;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(0!==this.Yu.length){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!lr(e))throw e;Xt(Qd,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,Zt("INTERNAL UNHANDLED ERROR: ",Xd(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=Lh.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(r),r}uc(){this.nc&&nn(47125,{Pc:Xd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Xd(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}class Zd extends Kd{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new Jd,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Jd(e),this._firestoreClient=void 0,await e}}}function ef(e,t,n){n||(n=rs);const r=_t(e,"firestore");if(r.isInitialized(n)){const e=r.getImmediate({identifier:n});if(ee(r.getOptions(n),t))return e;throw new cn(an.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(void 0!==t.cacheSizeBytes&&void 0!==t.localCache)throw new cn(an.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(void 0!==t.cacheSizeBytes&&-1!==t.cacheSizeBytes&&t.cacheSizeBytes<Fl)throw new cn(an.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&D(t.host)&&P(t.host),r.initialize({options:t,instanceIdentifier:n})}function tf(e,t){const n="object"==typeof e?e:Ct(),r="string"==typeof e?e:rs,i=_t(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const e=k("firestore");e&&function(e,t,n,r={}){e=jn(e,Kd);const i=D(t),s=e._getSettings(),o={...s,emulatorOptions:e._getEmulatorOptions()},a=`${t}:${n}`;i&&(P(`https://${a}`),L("Firestore",!0)),s.host!==Ud&&s.host!==a&&en("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...s,host:a,ssl:i,emulatorOptions:r};if(!ee(c,o)&&(e._setSettings(c),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=Wt.MOCK_USER;else{t=R(r.mockUserToken,e._app?.options.projectId);const i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new cn(an.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new Wt(i)}e._authCredentials=new dn(new un(t,n))}}(i,...e)}return i}function nf(e){if(e._terminated)throw new cn(an.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){const t=e._freezeSettings(),n=function(e,t,n,r,i){return new ns(e,t,n,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,Vd(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e._databaseId,e._app?.options.appId||"",e._persistenceKey,e._app?.options.apiKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new Rd(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e),e._firestoreClient}class rf{constructor(e){this._byteString=e}static fromBase64String(e){try{return new rf(Ki.fromBase64String(e))}catch(e){throw new cn(an.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new rf(Ki.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:rf._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(qn(e,rf._jsonSchema))return rf.fromBase64String(e.bytes)}}rf._jsonSchemaVersion="firestore/bytes/1.0",rf._jsonSchema={type:Vn("string",rf._jsonSchemaVersion),bytes:Vn("string")};
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class sf{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new cn(an.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Dn(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class of{constructor(e){this._methodName=e}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class af{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new cn(an.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new cn(an.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return vn(this._lat,e._lat)||vn(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:af._jsonSchemaVersion}}static fromJSON(e){if(qn(e,af._jsonSchema))return new af(e.latitude,e.longitude)}}af._jsonSchemaVersion="firestore/geoPoint/1.0",af._jsonSchema={type:Vn("string",af._jsonSchemaVersion),latitude:Vn("number"),longitude:Vn("number")};
/**
       * @license
       * Copyright 2024 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class cf{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:cf._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(qn(e,cf._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new cf(e.vectorValues);throw new cn(an.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}cf._jsonSchemaVersion="firestore/vectorValue/1.0",cf._jsonSchema={type:Vn("string",cf._jsonSchemaVersion),vectorValues:Vn("object")};
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
const lf=/^__.*__$/;class uf{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new ma(e,this.data,this.fieldMask,t,this.fieldTransforms):new pa(e,this.data,t,this.fieldTransforms)}}class hf{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new ma(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function df(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw nn(40011,{dataSource:e})}}class ff{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new ff({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){const t=this.path?.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Ef(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(0===e.length)throw this.createError("Document fields must not be empty");if(df(this.dataSource)&&lf.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class pf{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Ju(e)}createContext(e,t,n,r=!1){return new ff({dataSource:e,methodName:t,targetDoc:n,path:Dn.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function mf(e){const t=e._freezeSettings(),n=Ju(e._databaseId);return new pf(e._databaseId,!!t.ignoreUndefinedProperties,n)}function gf(e,t,n,r,i,s={}){const o=e.createContext(s.merge||s.mergeFields?2:0,t,n,i);If("Data must be an object, but it was:",o,r);const a=bf(r,o);let c,l;if(s.merge)c=new zi(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){const e=[];for(const r of s.mergeFields){const i=Cf(t,r,n);if(!o.contains(i))throw new cn(an.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);kf(e,i)||e.push(i)}c=new zi(e),l=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,l=o.fieldTransforms;return new uf(new Os(a),c,l)}class yf extends of{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof yf}}function _f(e,t,n,r){const i=e.createContext(1,t,n);If("Data must be an object, but it was:",i,r);const s=[],o=Os.empty();Oi(r,(e,r)=>{const a=Sf(t,e,n);r=se(r);const c=i.childContextForFieldPath(a);if(r instanceof yf)s.push(a);else{const e=vf(r,c);null!=e&&(s.push(a),o.set(a,e))}});const a=new zi(s);return new hf(o,a,i.fieldTransforms)}function wf(e,t,n,r,i,s){const o=e.createContext(1,t,n),a=[Cf(t,r,n)],c=[i];if(s.length%2!=0)throw new cn(an.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<s.length;d+=2)a.push(Cf(t,s[d])),c.push(s[d+1]);const l=[],u=Os.empty();for(let d=a.length-1;d>=0;--d)if(!kf(l,a[d])){const e=a[d];let t=c[d];t=se(t);const n=o.childContextForFieldPath(e);if(t instanceof yf)l.push(e);else{const r=vf(t,n);null!=r&&(l.push(e),u.set(e,r))}}const h=new zi(l);return new hf(u,h,o.fieldTransforms)}function vf(e,t){if(xf(e=se(e)))return If("Unsupported field value:",t,e),bf(e,t);if(e instanceof of)return function(e,t){if(!df(t.dataSource))throw t.createError(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.createError(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.createError("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const i of e){let e=vf(i,t.childContextForArray(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=se(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return $o(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=Bn.fromDate(e);return{timestampValue:Ha(t.serializer,n)}}if(e instanceof Bn){const n=new Bn(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Ha(t.serializer,n)}}if(e instanceof af)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof rf)return{bytesValue:Wa(t.serializer,e._byteString)};if(e instanceof Gd){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.createError(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Ja(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof cf)return function(e,t){const n=e instanceof cf?e.toArray():e,r={fields:{[ss]:{stringValue:cs},[ls]:{arrayValue:{values:n.map(e=>{if("number"!=typeof e)throw t.createError("VectorValues must only contain numeric values.");return Bo(t.serializer,e)})}}}};return{mapValue:r}}(e,t);if(bc(e))return e._toProto(t.serializer);throw t.createError(`Unsupported field value: ${Fn(e)}`)}(e,t)}function bf(e,t){const n={};return Mi(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Oi(e,(e,r)=>{const i=vf(r,t.childContextForField(e));null!=i&&(n[e]=i)}),{mapValue:{fields:n}}}function xf(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof Bn||e instanceof af||e instanceof rf||e instanceof Gd||e instanceof of||e instanceof cf||bc(e))}function If(e,t,n){if(!xf(n)||!Ln(n)){const r=Fn(n);throw"an object"===r?t.createError(e+" a custom object"):t.createError(e+" "+r)}}function Cf(e,t,n){if((t=se(t))instanceof sf)return t._internalPath;if("string"==typeof t)return Sf(e,t);throw Ef("Field path arguments must be of type string or ",e,!1,void 0,n)}const Tf=new RegExp("[~\\*/\\[\\]]");function Sf(e,t,n){if(t.search(Tf)>=0)throw Ef(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new sf(...t.split("."))._internalPath}catch(r){throw Ef(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Ef(e,t,n,r,i){const s=r&&!r.isEmpty(),o=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new cn(an.INVALID_ARGUMENT,a+e+c)}function kf(e,t){return e.some(e=>e.isEqual(t))}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Nf{convertValue(e,t="none"){switch(hs(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Hi(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Wi(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw nn(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Oi(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){const t=e.fields?.[ls].arrayValue?.values?.map(e=>Hi(e.doubleValue));return new cf(t)}convertGeoPoint(e){return new af(Hi(e.latitude),Hi(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=es(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ts(e));default:return null}}convertTimestamp(e){const t=Gi(e);return new Bn(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=Nn.fromString(e);sn(vc(n),9688,{name:e});const r=new is(n.get(1),n.get(3)),i=new Pn(n.popFirst(5));return r.isEqual(t)||Zt(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
/**
       * @license
       * Copyright 2024 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Af extends Nf{constructor(e){super(),this.firestore=e}convertBytes(e){return new rf(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Gd(this.firestore,null,t)}}const Df="@firebase/firestore",Pf="4.11.0";
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Rf(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const r of t)if(r in n&&"function"==typeof n[r])return!0;return!1}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e,["next","error","complete"])}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Of{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Gd(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new Mf(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(Cf("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class Mf extends Of{data(){return super.data()}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Lf(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new cn(an.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ff{}let jf=class extends Ff{};class Vf extends jf{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Vf(e,t,n)}_apply(e){const t=this._parse(e);return Bf(e._query,t),new $d(e.firestore,e.converter,xo(e._query,t))}_parse(e){const t=mf(e.firestore),n=function(e,t,n,r,i,s,o){let a;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new cn(an.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){zf(o,s);const t=[];for(const n of o)t.push(Uf(r,e,n));a={arrayValue:{values:t}}}else a=Uf(r,e,o)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||zf(o,s),a=function(e,t,n,r=!1){return vf(n,e.createContext(r?4:3,t))}(n,t,o,"in"===s||"not-in"===s);return Bs.create(i,s,a)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}class qf extends Ff{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new qf(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:Ks.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const r=t.getFlattenedFilters();for(const i of r)Bf(n,i),n=xo(n,i)}(e._query,t),new $d(e.firestore,e.converter,xo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}function Uf(e,t,n){if("string"==typeof(n=se(n))){if(""===n)throw new cn(an.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!wo(t)&&-1!==n.indexOf("/"))throw new cn(an.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(Nn.fromString(n));if(!Pn.isDocumentKey(r))throw new cn(an.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return vs(e,new Pn(r))}if(n instanceof Gd)return vs(e,n._key);throw new cn(an.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Fn(n)}.`)}function zf(e,t){if(!Array.isArray(e)||0===e.length)throw new cn(an.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Bf(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new cn(an.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new cn(an.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}function Kf(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class $f{constructor(e){this.kind="memory",this._onlineComponentProvider=Ad.provider,this._offlineComponentProvider=e?.garbageCollector?e.garbageCollector._offlineComponentProvider:{build:()=>new kd(void 0)}}toJSON(){return{kind:this.kind}}}class Gf{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Yf(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function Hf(e){return new $f(e)}class Wf{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ad.provider,this._offlineComponentProvider={build:t=>new Nd(t,e?.cacheSizeBytes,this.forceOwnership)}}}function Yf(e){return new Wf(e?.forceOwnership)}class Qf{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Jf extends Of{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Xf(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Cf("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new cn(an.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Jf._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}Jf._jsonSchemaVersion="firestore/documentSnapshot/1.0",Jf._jsonSchema={type:Vn("string",Jf._jsonSchemaVersion),bundleSource:Vn("string","DocumentSnapshot"),bundleName:Vn("string"),bundle:Vn("string")};class Xf extends Jf{data(e={}){return super.data(e)}}class Zf{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Qf(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Xf(this._firestore,this._userDataWriter,n.key,n,new Qf(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new cn(an.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const r=new Xf(e._firestore,e._userDataWriter,n.doc.key,n.doc,new Qf(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new Xf(e._firestore,e._userDataWriter,t.doc.key,t.doc,new Qf(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),s=n.indexOf(t.doc.key)),{type:ep(t.type),doc:r,oldIndex:i,newIndex:s}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new cn(an.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Zf._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=wn.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],r=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),r.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function ep(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return nn(61501,{type:e})}}
/**
       * @license
       * Copyright 2022 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */Zf._jsonSchemaVersion="firestore/querySnapshot/1.0",Zf._jsonSchema={type:Vn("string",Zf._jsonSchemaVersion),bundleSource:Vn("string","QuerySnapshot"),bundleName:Vn("string"),bundle:Vn("string")};
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class tp{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=mf(e)}set(e,t,n){this._verifyNotCommitted();const r=np(e,this._firestore),i=Kf(r.converter,t,n),s=gf(this._dataReader,"WriteBatch.set",r._key,i,null!==r.converter,n);return this._mutations.push(s.toMutation(r._key,oa.none())),this}update(e,t,n,...r){this._verifyNotCommitted();const i=np(e,this._firestore);let s;return s="string"==typeof(t=se(t))||t instanceof sf?wf(this._dataReader,"WriteBatch.update",i._key,t,n,r):_f(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(s.toMutation(i._key,oa.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=np(e,this._firestore);return this._mutations=this._mutations.concat(new wa(t._key,oa.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new cn(an.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function np(e,t){if((e=se(e)).firestore!==t)throw new cn(an.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}function rp(e){e=jn(e,$d);const t=jn(e.firestore,Zd),n=nf(t),r=new Af(t);return Lf(e._query),function(e,t,n={}){const r=new ln;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,i){const s=new Dd({next:n=>{s.Nu(),t.enqueueAndForget(()=>$h(e,o)),n.fromCache&&"server"===r.source?i.reject(new cn(an.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),o=new Jh(n,s,{includeMetadataChanges:!0,Ka:!0});return Kh(e,o)}(await Fd(e),e.asyncQueue,t,n,r)),r.promise}(n,e._query).then(n=>new Zf(t,r,e,n))}function ip(e,t,n){e=jn(e,Gd);const r=jn(e.firestore,Zd),i=Kf(e.converter,t,n);return lp(r,[gf(mf(r),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,oa.none())])}function sp(e,t,n,...r){e=jn(e,Gd);const i=jn(e.firestore,Zd),s=mf(i);let o;return o="string"==typeof(t=se(t))||t instanceof sf?wf(s,"updateDoc",e._key,t,n,r):_f(s,"updateDoc",e._key,t),lp(i,[o.toMutation(e._key,oa.exists(!0))])}function op(e){return lp(jn(e.firestore,Zd),[new wa(e._key,oa.none())])}function ap(e,t){const n=jn(e.firestore,Zd),r=Yd(e),i=Kf(e.converter,t);return lp(n,[gf(mf(e.firestore),"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,oa.exists(!1))]).then(()=>r)}function cp(e,...t){e=se(e);let n={includeMetadataChanges:!1,source:"default"},r=0;"object"!=typeof t[r]||Rf(t[r])||(n=t[r++]);const i={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(Rf(t[r])){const e=t[r];t[r]=e.next?.bind(e),t[r+1]=e.error?.bind(e),t[r+2]=e.complete?.bind(e)}let s,o,a;if(e instanceof Gd)o=jn(e.firestore,Zd),a=yo(e._key.path),s={next:n=>{t[r]&&t[r](function(e,t,n){const r=n.docs.get(t._key),i=new Af(e);return new Jf(e,i,t._key,r,new Qf(n.hasPendingWrites,n.fromCache),t.converter)}(o,e,n))},error:t[r+1],complete:t[r+2]};else{const n=jn(e,$d);o=jn(n.firestore,Zd),a=n._query;const i=new Af(o);s={next:e=>{t[r]&&t[r](new Zf(o,i,n,e))},error:t[r+1],complete:t[r+2]},Lf(e._query)}return function(e,t,n,r){const i=new Dd(r),s=new Jh(t,i,n);return e.asyncQueue.enqueueAndForget(async()=>Kh(await Fd(e),s)),()=>{i.Nu(),e.asyncQueue.enqueueAndForget(async()=>$h(await Fd(e),s))}}(nf(o),a,i,s)}function lp(e,t){return jd(nf(e),t)}function up(e){return nf(e=jn(e,Zd)),new tp(e,t=>lp(e,t))}!function(e,t=!0){Yt=xt,yt(new oe("firestore",(e,{instanceIdentifier:n,options:r})=>{const i=e.getProvider("app").getImmediate(),s=new Zd(new fn(e.getProvider("auth-internal")),new yn(i,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new cn(an.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new is(e.options.projectId,t)}(i,n),i);return r={useFetchStreams:t,...r},s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),Tt(Df,Pf,e),Tt(Df,Pf,"esm2020")}();var hp={};const dp="@firebase/database",fp="1.1.0";
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
let pp="";function mp(e){pp=e}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class gp{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){null==t?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),W(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return null==t?null:H(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class yp{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){null==t?delete this.cache_[e]:this.cache_[e]=t}get(e){return Q(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const _p=function(e){try{if("undefined"!=typeof window&&void 0!==window[e]){const t=window[e];return t.setItem("firebase:sentinel","cache"),t.removeItem("firebase:sentinel"),new gp(t)}}catch(t){}return new yp},wp=_p("localStorage"),vp=_p("sessionStorage"),bp=new me("@firebase/database"),xp=function(){let e=1;return function(){return e++}}(),Ip=function(e){const t=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);if(i>=55296&&i<=56319){const t=i-55296;r++,m(r<e.length,"Surrogate pair missing trail surrogate."),i=65536+(t<<10)+(e.charCodeAt(r)-56320)}i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):i<65536?(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t}(e),n=new ne;n.update(t);const r=n.digest();return _.encodeByteArray(r)},Cp=function(...e){let t="";for(let n=0;n<e.length;n++){const r=e[n];Array.isArray(r)||r&&"object"==typeof r&&"number"==typeof r.length?t+=Cp.apply(null,r):t+="object"==typeof r?W(r):r,t+=" "}return t};let Tp=null,Sp=!0;const Ep=function(e,t){m(!t||!0===e||!1===e,"Can't turn on custom loggers persistently."),!0===e?(bp.logLevel=ue.VERBOSE,Tp=bp.log.bind(bp),t&&vp.set("logging_enabled",!0)):"function"==typeof e?Tp=e:(Tp=null,vp.remove("logging_enabled"))},kp=function(...e){if(!0===Sp&&(Sp=!1,null===Tp&&!0===vp.get("logging_enabled")&&Ep(!0)),Tp){const t=Cp.apply(null,e);Tp(t)}},Np=function(e){return function(...t){kp(e,...t)}},Ap=function(...e){const t="FIREBASE INTERNAL ERROR: "+Cp(...e);bp.error(t)},Dp=function(...e){const t=`FIREBASE FATAL ERROR: ${Cp(...e)}`;throw bp.error(t),new Error(t)},Pp=function(...e){const t="FIREBASE WARNING: "+Cp(...e);bp.warn(t)},Rp=function(e){return"number"==typeof e&&(e!=e||e===Number.POSITIVE_INFINITY||e===Number.NEGATIVE_INFINITY)},Op="[MIN_NAME]",Mp="[MAX_NAME]",Lp=function(e,t){if(e===t)return 0;if(e===Op||t===Mp)return-1;if(t===Op||e===Mp)return 1;{const n=Kp(e),r=Kp(t);return null!==n?null!==r?n-r===0?e.length-t.length:n-r:-1:null!==r?1:e<t?-1:1}},Fp=function(e,t){return e===t?0:e<t?-1:1},jp=function(e,t){if(t&&e in t)return t[e];throw new Error("Missing required key ("+e+") in object: "+W(t))},Vp=function(e){if("object"!=typeof e||null===e)return W(e);const t=[];for(const r in e)t.push(r);t.sort();let n="{";for(let r=0;r<t.length;r++)0!==r&&(n+=","),n+=W(t[r]),n+=":",n+=Vp(e[t[r]]);return n+="}",n},qp=function(e,t){const n=e.length;if(n<=t)return[e];const r=[];for(let i=0;i<n;i+=t)i+t>n?r.push(e.substring(i,n)):r.push(e.substring(i,i+t));return r};function Up(e,t){for(const n in e)e.hasOwnProperty(n)&&t(n,e[n])}const zp=function(e){m(!Rp(e),"Invalid JSON number");const t=1023;let n,r,i,s,o;0===e?(r=0,i=0,n=1/e==-1/0?1:0):(n=e<0,(e=Math.abs(e))>=Math.pow(2,-1022)?(s=Math.min(Math.floor(Math.log(e)/Math.LN2),t),r=s+t,i=Math.round(e*Math.pow(2,52-s)-Math.pow(2,52))):(r=0,i=Math.round(e/Math.pow(2,-1074))));const a=[];for(o=52;o;o-=1)a.push(i%2?1:0),i=Math.floor(i/2);for(o=11;o;o-=1)a.push(r%2?1:0),r=Math.floor(r/2);a.push(n?1:0),a.reverse();const c=a.join("");let l="";for(o=0;o<64;o+=8){let e=parseInt(c.substr(o,8),2).toString(16);1===e.length&&(e="0"+e),l+=e}return l.toLowerCase()},Bp=new RegExp("^-?(0*)\\d{1,10}$"),Kp=function(e){if(Bp.test(e)){const t=Number(e);if(t>=-2147483648&&t<=2147483647)return t}return null},$p=function(e){try{e()}catch(t){setTimeout(()=>{const e=t.stack||"";throw Pp("Exception was thrown by user callback.",e),t},Math.floor(0))}},Gp=function(e,t){const n=setTimeout(e,t);return"number"==typeof n&&"undefined"!=typeof Deno&&Deno.unrefTimer?Deno.unrefTimer(n):"object"==typeof n&&n.unref&&n.unref(),n};
/**
       * @license
       * Copyright 2021 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class Hp{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,wt(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(e=>this.appCheck=e)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,n)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){Pp(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Wp{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(e=>this.auth_=e)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(e=>e&&"auth/token-not-initialized"===e.code?(kp("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(e)):new Promise((t,n)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Pp(e)}}class Yp{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Yp.OWNER="owner";
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
const Qp=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Jp="ac",Xp="websocket",Zp="long_polling";
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class em{constructor(e,t,n,r,i=!1,s="",o=!1,a=!1,c=null){this.secure=t,this.namespace=n,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=s,this.includeNamespaceInQueryParams=o,this.isUsingEmulator=a,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=wp.get("host:"+e)||this._host}isCacheableHost(){return"s-"===this.internalHost.substr(0,2)}isCustomHost(){return"firebaseio.com"!==this._domain&&"firebaseio-demo.com"!==this._domain}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&wp.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function tm(e,t,n){let r;if(m("string"==typeof t,"typeof type must == string"),m("object"==typeof n,"typeof params must == object"),t===Xp)r=(e.secure?"wss://":"ws://")+e.internalHost+"/.ws?";else{if(t!==Zp)throw new Error("Unknown connection type: "+t);r=(e.secure?"https://":"http://")+e.internalHost+"/.lp?"}(function(e){return e.host!==e.internalHost||e.isCustomHost()||e.includeNamespaceInQueryParams})(e)&&(n.ns=e.namespace);const i=[];return Up(n,(e,t)=>{i.push(e+"="+t)}),r+i.join("&")}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class nm{constructor(){this.counters_={}}incrementCounter(e,t=1){Q(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return I(this.counters_)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const rm={},im={};function sm(e){const t=e.toString();return rm[t]||(rm[t]=new nm),rm[t]}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class om{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const e=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let t=0;t<e.length;++t)e[t]&&$p(()=>{this.onMessage_(e[t])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const am="start";class cm{constructor(e,t,n,r,i,s,o){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.transportSessionId=s,this.lastSessionId=o,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Np(e),this.stats_=sm(t),this.urlFn=e=>(this.appCheckToken&&(e[Jp]=this.appCheckToken),tm(t,Zp,e))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new om(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(3e4)),function(e){if("complete"===document.readyState)e();else{let t=!1;const n=function(){document.body?t||(t=!0,e()):setTimeout(n,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{"complete"===document.readyState&&n()}),window.attachEvent("onload",n))}}(()=>{if(this.isClosed_)return;this.scriptTagHolder=new lm((...e)=>{const[t,n,r,i,s]=e;if(this.incrementIncomingBytes_(e),this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,t===am)this.id=n,this.password=r;else{if("close"!==t)throw new Error("Unrecognized command received: "+t);n?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(n,()=>{this.onClosed_()})):this.onClosed_()}},(...e)=>{const[t,n]=e;this.incrementIncomingBytes_(e),this.myPacketOrderer.handleResponse(t,n)},()=>{this.onClosed_()},this.urlFn);const e={};e[am]="t",e.ser=Math.floor(1e8*Math.random()),this.scriptTagHolder.uniqueCallbackIdentifier&&(e.cb=this.scriptTagHolder.uniqueCallbackIdentifier),e.v="5",this.transportSessionId&&(e.s=this.transportSessionId),this.lastSessionId&&(e.ls=this.lastSessionId),this.applicationId&&(e.p=this.applicationId),this.appCheckToken&&(e[Jp]=this.appCheckToken),"undefined"!=typeof location&&location.hostname&&Qp.test(location.hostname)&&(e.r="f");const t=this.urlFn(e);this.log_("Connecting via long-poll to "+t),this.scriptTagHolder.addTag(t,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){cm.forceAllow_=!0}static forceDisallow(){cm.forceDisallow_=!0}static isAvailable(){return!!cm.forceAllow_||!(cm.forceDisallow_||"undefined"==typeof document||null==document.createElement||"object"==typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href)||"object"==typeof Windows&&"object"==typeof Windows.UI)}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=W(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=v(t),r=qp(n,1840);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const n={dframe:"t"};n.id=e,n.pw=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=W(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class lm{constructor(e,t,n,r){this.onDisconnect=n,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(1e8*Math.random()),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=xp(),window["pLPCommand"+this.uniqueCallbackIdentifier]=e,window["pRTLPCB"+this.uniqueCallbackIdentifier]=t,this.myIFrame=lm.createIFrame_();let n="";this.myIFrame.src&&"javascript:"===this.myIFrame.src.substr(0,11)&&(n='<script>document.domain="'+document.domain+'";<\/script>');const r="<html><body>"+n+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(r),this.myIFrame.doc.close()}catch(i){kp("frame writing exception"),i.stack&&kp(i.stack),kp(i)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",!document.body)throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";document.body.appendChild(e);try{e.contentWindow.document||kp("No IE domain setting required")}catch(t){const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{null!==this.myIFrame&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e.id=this.myID,e.pw=this.myPW,e.ser=this.currentSerial;let t=this.urlFn(e),n="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+30+n.length<=1870;){const e=this.pendingSegs.shift();n=n+"&seg"+r+"="+e.seg+"&ts"+r+"="+e.ts+"&d"+r+"="+e.d,r++}return t+=n,this.addLongPollTag_(t,this.currentSerial),!0}return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},r=setTimeout(n,Math.floor(25e3));this.addTag(e,()=>{clearTimeout(r),n()})}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const e=n.readyState;e&&"loaded"!==e&&"complete"!==e||(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{kp("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch(n){}},Math.floor(1))}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */let um=null;"undefined"!=typeof MozWebSocket?um=MozWebSocket:"undefined"!=typeof WebSocket&&(um=WebSocket);class hm{constructor(e,t,n,r,i,s,o){this.connId=e,this.applicationId=n,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Np(this.connId),this.stats_=sm(t),this.connURL=hm.connectionURL_(t,s,o,r,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,r,i){const s={v:"5"};return"undefined"!=typeof location&&location.hostname&&Qp.test(location.hostname)&&(s.r="f"),t&&(s.s=t),n&&(s.ls=n),r&&(s[Jp]=r),i&&(s.p=i),tm(e,Xp,s)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,wp.set("previous_websocket_failure",!0);try{let e;this.mySock=new um(this.connURL,[],e)}catch(n){this.log_("Error instantiating WebSocket.");const e=n.message||n.data;return e&&this.log_(e),void this.onClosed_()}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=e=>{this.handleIncomingFrame(e)},this.mySock.onerror=e=>{this.log_("WebSocket error.  Closing connection.");const t=e.message||e.data;t&&this.log_(t),this.onClosed_()}}start(){}static forceDisallow(){hm.forceDisallow_=!0}static isAvailable(){let e=!1;if("undefined"!=typeof navigator&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&null!==um&&!hm.forceDisallow_}static previouslyFailed(){return wp.isInMemoryStorage||!0===wp.get("previous_websocket_failure")}markConnectionHealthy(){wp.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const e=this.frames.join("");this.frames=null;const t=H(e);this.onMessage(t)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(m(null===this.frames,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(null===this.mySock)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),null!==this.frames)this.appendFrame_(t);else{const e=this.extractFrameCount_(t);null!==e&&this.appendFrame_(e)}}send(e){this.resetKeepAlive();const t=W(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=qp(t,16384);n.length>1&&this.sendString_(String(n.length));for(let r=0;r<n.length;r++)this.sendString_(n[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(45e3))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}hm.responsesRequiredToBeHealthy=2,hm.healthyTimeout=3e4;
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class dm{static get ALL_TRANSPORTS(){return[cm,hm]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=hm&&hm.isAvailable();let n=t&&!hm.previouslyFailed();if(e.webSocketOnly&&(t||Pp("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[hm];else{const e=this.transports_=[];for(const t of dm.ALL_TRANSPORTS)t&&t.isAvailable()&&e.push(t);dm.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}dm.globalTransportInitialized_=!1;class fm{constructor(e,t,n,r,i,s,o,a,c,l){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=s,this.onReady_=o,this.onDisconnect_=a,this.onKill_=c,this.lastSessionId=l,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Np("c:"+this.id+":"),this.transportManager_=new dm(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,n)},Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=Gp(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>102400?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>10240?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{2!==this.state_&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if("t"in e){const t=e.t;"a"===t?this.upgradeIfSecondaryHealthy_():"r"===t?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),this.tx_!==this.secondaryConn_&&this.rx_!==this.secondaryConn_||this.close()):"o"===t&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=jp("t",e),n=jp("d",e);if("c"===t)this.onSecondaryControl_(n);else{if("d"!==t)throw new Error("Unknown protocol layer: "+t);this.pendingDataMessages.push(n)}}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:"p",d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:"a",d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:"n",d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=jp("t",e),n=jp("d",e);"c"===t?this.onControl_(n):"d"===t&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=jp("t",e);if("d"in e){const n=e.d;if("h"===t){const e={...n};this.repoInfo_.isUsingEmulator&&(e.h=this.repoInfo_.host),this.onHandshake_(e)}else if("n"===t){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let e=0;e<this.pendingDataMessages.length;++e)this.onDataMessage_(this.pendingDataMessages[e]);this.pendingDataMessages=[],this.tryCleanupConnection()}else"s"===t?this.onConnectionShutdown_(n):"r"===t?this.onReset_(n):"e"===t?Ap("Server Error: "+n):"o"===t?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ap("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,0===this.state_&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),"5"!==n&&Pp("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),Gp(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(6e4))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,1===this.state_?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),0===this.primaryResponsesRequired_?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Gp(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(5e3))}sendPingOnPrimaryIfNecessary_(){this.isHealthy_||1!==this.state_||(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:"p",d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,this.tx_!==e&&this.rx_!==e||this.close()}onConnectionLost_(e){this.conn_=null,e||0!==this.state_?1===this.state_&&this.log_("Realtime connection lost."):(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(wp.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(1!==this.state_)throw"Connection is not connected";this.tx_.send(e)}close(){2!==this.state_&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class pm{put(e,t,n,r){}merge(e,t,n,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class mm{constructor(e){this.allowedEvents_=e,this.listeners_={},m(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const n=[...this.listeners_[e]];for(let e=0;e<n.length;e++)n[e].callback.apply(n[e].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const r=this.getInitialEvent(e);r&&t.apply(n,r)}off(e,t,n){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===t&&(!n||n===r[i].context))return void r.splice(i,1)}validateEventType_(e){m(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class gm extends mm{static getInstance(){return new gm}constructor(){super(["online"]),this.online_=!0,"undefined"==typeof window||void 0===window.addEventListener||j()||(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return m("online"===e,"Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class ym{constructor(e,t){if(void 0===t){this.pieces_=e.split("/");let t=0;for(let e=0;e<this.pieces_.length;e++)this.pieces_[e].length>0&&(this.pieces_[t]=this.pieces_[e],t++);this.pieces_.length=t,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)""!==this.pieces_[t]&&(e+="/"+this.pieces_[t]);return e||"/"}}function _m(){return new ym("")}function wm(e){return e.pieceNum_>=e.pieces_.length?null:e.pieces_[e.pieceNum_]}function vm(e){return e.pieces_.length-e.pieceNum_}function bm(e){let t=e.pieceNum_;return t<e.pieces_.length&&t++,new ym(e.pieces_,t)}function xm(e){return e.pieceNum_<e.pieces_.length?e.pieces_[e.pieces_.length-1]:null}function Im(e,t=0){return e.pieces_.slice(e.pieceNum_+t)}function Cm(e){if(e.pieceNum_>=e.pieces_.length)return null;const t=[];for(let n=e.pieceNum_;n<e.pieces_.length-1;n++)t.push(e.pieces_[n]);return new ym(t,0)}function Tm(e,t){const n=[];for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);if(t instanceof ym)for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);else{const e=t.split("/");for(let t=0;t<e.length;t++)e[t].length>0&&n.push(e[t])}return new ym(n,0)}function Sm(e){return e.pieceNum_>=e.pieces_.length}function Em(e,t){const n=wm(e),r=wm(t);if(null===n)return t;if(n===r)return Em(bm(e),bm(t));throw new Error("INTERNAL ERROR: innerPath ("+t+") is not within outerPath ("+e+")")}function km(e,t){const n=Im(e,0),r=Im(t,0);for(let i=0;i<n.length&&i<r.length;i++){const e=Lp(n[i],r[i]);if(0!==e)return e}return n.length===r.length?0:n.length<r.length?-1:1}function Nm(e,t){if(vm(e)!==vm(t))return!1;for(let n=e.pieceNum_,r=t.pieceNum_;n<=e.pieces_.length;n++,r++)if(e.pieces_[n]!==t.pieces_[r])return!1;return!0}function Am(e,t){let n=e.pieceNum_,r=t.pieceNum_;if(vm(e)>vm(t))return!1;for(;n<e.pieces_.length;){if(e.pieces_[n]!==t.pieces_[r])return!1;++n,++r}return!0}class Dm{constructor(e,t){this.errorPrefix_=t,this.parts_=Im(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let n=0;n<this.parts_.length;n++)this.byteLength_+=ie(this.parts_[n]);Pm(this)}}function Pm(e){if(e.byteLength_>768)throw new Error(e.errorPrefix_+"has a key path longer than 768 bytes ("+e.byteLength_+").");if(e.parts_.length>32)throw new Error(e.errorPrefix_+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Rm(e))}function Rm(e){return 0===e.parts_.length?"":"in property '"+e.parts_.join(".")+"'"}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Om extends mm{static getInstance(){return new Om}constructor(){let e,t;super(["visible"]),"undefined"!=typeof document&&void 0!==document.addEventListener&&(void 0!==document.hidden?(t="visibilitychange",e="hidden"):void 0!==document.mozHidden?(t="mozvisibilitychange",e="mozHidden"):void 0!==document.msHidden?(t="msvisibilitychange",e="msHidden"):void 0!==document.webkitHidden&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const t=!document[e];t!==this.visible_&&(this.visible_=t,this.trigger("visible",t))},!1)}getInitialEvent(e){return m("visible"===e,"Unknown event type: "+e),[this.visible_]}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Mm=1e3;class Lm extends pm{constructor(e,t,n,r,i,s,o,a){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=s,this.appCheckTokenProvider_=o,this.authOverride_=a,this.id=Lm.nextPersistentConnectionId_++,this.log_=Np("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Mm,this.maxReconnectDelay_=3e5,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Om.getInstance().on("visible",this.onVisible_,this),-1===e.host.indexOf("fblocal")&&gm.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const r=++this.requestNumber_,i={r:r,a:e,b:t};this.log_(W(i)),m(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),n&&(this.requestCBHash_[r]=n)}get(e){this.initConnection_();const t=new A,n={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:e=>{const n=e.d;"ok"===e.s?t.resolve(n):t.reject(n)}};this.outstandingGets_.push(n),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,n,r){this.initConnection_();const i=e._queryIdentifier,s=e._path.toString();this.log_("Listen called for "+s+" "+i),this.listens.has(s)||this.listens.set(s,new Map),m(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),m(!this.listens.get(s).has(i),"listen() called twice for same path/queryId.");const o={onComplete:r,hashFn:t,query:e,tag:n};this.listens.get(s).set(i,o),this.connected_&&this.sendListen_(o)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,0===this.outstandingGetCount_&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)})}sendListen_(e){const t=e.query,n=t._path.toString(),r=t._queryIdentifier;this.log_("Listen on "+n+" for "+r);const i={p:n};e.tag&&(i.q=t._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest("q",i,i=>{const s=i.d,o=i.s;Lm.warnOnListenWarnings_(s,t),(this.listens.get(n)&&this.listens.get(n).get(r))===e&&(this.log_("listen response",i),"ok"!==o&&this.removeListen_(n,r),e.onComplete&&e.onComplete(o,s))})}static warnOnListenWarnings_(e,t){if(e&&"object"==typeof e&&Q(e,"w")){const n=J(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const e='".indexOn": "'+t._queryParams.getIndex().toString()+'"',n=t._path.toString();Pp(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${e} at ${n} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&40===e.length||function(e){const t=Y(e).claims;return"object"==typeof t&&!0===t.admin}(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=3e4)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=function(e){const t=Y(e).claims;return!!t&&"object"==typeof t&&t.hasOwnProperty("iat")}(e)?"auth":"gauth",n={cred:e};null===this.authOverride_?n.noauth=!0:"object"==typeof this.authOverride_&&(n.authvar=this.authOverride_),this.sendRequest(t,n,t=>{const n=t.s,r=t.d||"error";this.authToken_===e&&("ok"===n?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(n,r))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,n=e.d||"error";"ok"===t?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)})}unlisten(e,t){const n=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+r),m(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(n,r)&&this.connected_&&this.sendUnlisten_(n,r,e._queryObject,t)}sendUnlisten_(e,t,n,r){this.log_("Unlisten on "+e+" for "+t);const i={p:e};r&&(i.q=n,i.t=r),this.sendRequest("n",i)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,r){const i={p:t,d:n};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,e=>{r&&setTimeout(()=>{r(e.s,e.d)},Math.floor(0))})}put(e,t,n,r){this.putInternal("p",e,t,n,r)}merge(e,t,n,r){this.putInternal("m",e,t,n,r)}putInternal(e,t,n,r,i){this.initConnection_();const s={p:t,d:n};void 0!==i&&(s.h=i),this.outstandingPuts_.push({action:e,request:s,onComplete:r}),this.outstandingPutCount_++;const o=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(o):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,n=>{this.log_(t+" response",n),delete this.outstandingPuts_[e],this.outstandingPutCount_--,0===this.outstandingPutCount_&&(this.outstandingPuts_=[]),r&&r(n.s,n.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,e=>{if("ok"!==e.s){const t=e.d;this.log_("reportStats","Error sending stats: "+t)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+W(e));const t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),"d"===e?this.onDataUpdate_(t.p,t.d,!1,t.t):"m"===e?this.onDataUpdate_(t.p,t.d,!0,t.t):"c"===e?this.onListenRevoked_(t.p,t.q):"ac"===e?this.onAuthRevoked_(t.s,t.d):"apc"===e?this.onAppCheckRevoked_(t.s,t.d):"sd"===e?this.onSecurityDebugPacket_(t):Ap("Unrecognized action received from server: "+W(e)+"\nAre you using the latest client?")}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=(new Date).getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){m(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Mm,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Mm,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&((new Date).getTime()-this.lastConnectionEstablishedTime_>3e4&&(this.reconnectDelay_=Mm),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=(new Date).getTime());const e=Math.max(0,(new Date).getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,1.3*this.reconnectDelay_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=(new Date).getTime(),this.lastConnectionEstablishedTime_=null;const t=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Lm.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,r())},l=function(e){m(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(e)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[e,c]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?kp("getToken() completed but was canceled"):(kp("getToken() completed. Creating connection."),this.authToken_=e&&e.accessToken,this.appCheckToken_=c&&c.token,a=new fm(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,t,n,r,e=>{Pp(e+" ("+this.repoInfo_.toString()+")"),this.interrupt("server_kill")},s))}catch(e){this.log_("Failed to get token: "+e),o||(this.repoInfo_.nodeAdmin&&Pp(e),c())}}}interrupt(e){kp("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){kp("Resuming connection for reason: "+e),delete this.interruptReasons_[e],X(this.interruptReasons_)&&(this.reconnectDelay_=Mm,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-(new Date).getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}0===this.outstandingPutCount_&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;n=t?t.map(e=>Vp(e)).join("$"):"default";const r=this.removeListen_(e,n);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,t){const n=new ym(e).toString();let r;if(this.listens.has(n)){const e=this.listens.get(n);r=e.get(t),e.delete(t),0===e.size&&this.listens.delete(n)}else r=void 0;return r}onAuthRevoked_(e,t){kp("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=3&&(this.reconnectDelay_=3e4,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){kp("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,"invalid_token"!==e&&"permission_denied"!==e||(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=3&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace("\n","\nFIREBASE: "))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};e["sdk.js."+pp.replace(/\./g,"-")]=1,j()?e["framework.cordova"]=1:"object"==typeof navigator&&"ReactNative"===navigator.product&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=gm.getInstance().currentlyOnline();return X(this.interruptReasons_)&&e}}Lm.nextPersistentConnectionId_=0,Lm.nextConnectionId_=0;
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class Fm{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new Fm(e,t)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class jm{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new Fm(Op,e),r=new Fm(Op,t);return 0!==this.compare(n,r)}minPost(){return Fm.MIN}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */let Vm;class qm extends jm{static get __EMPTY_NODE(){return Vm}static set __EMPTY_NODE(e){Vm=e}compare(e,t){return Lp(e.name,t.name)}isDefinedOn(e){throw g("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return Fm.MIN}maxPost(){return new Fm(Mp,Vm)}makePost(e,t){return m("string"==typeof e,"KeyIndex indexValue must always be a string."),new Fm(e,Vm)}toString(){return".key"}}const Um=new qm;
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class zm{constructor(e,t,n,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,r&&(s*=-1),s<0)e=this.isReverse_?e.left:e.right;else{if(0===s){this.nodeStack_.push(e);break}this.nodeStack_.push(e),e=this.isReverse_?e.right:e.left}}getNext(){if(0===this.nodeStack_.length)return null;let e,t=this.nodeStack_.pop();if(e=this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value},this.isReverse_)for(t=t.left;!t.isEmpty();)this.nodeStack_.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack_.push(t),t=t.left;return e}hasNext(){return this.nodeStack_.length>0}peek(){if(0===this.nodeStack_.length)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Bm{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:Bm.RED,this.left=null!=r?r:Km.EMPTY_NODE,this.right=null!=i?i:Km.EMPTY_NODE}copy(e,t,n,r,i){return new Bm(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return Km.EMPTY_NODE;let e=this;return e.left.isRed_()||e.left.left.isRed_()||(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,r;if(n=this,t(e,n.key)<0)n.left.isEmpty()||n.left.isRed_()||n.left.left.isRed_()||(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),n.right.isEmpty()||n.right.isRed_()||n.right.left.isRed_()||(n=n.moveRedRight_()),0===t(e,n.key)){if(n.right.isEmpty())return Km.EMPTY_NODE;r=n.right.min_(),n=n.copy(r.key,r.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Bm.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Bm.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Bm.RED=!0,Bm.BLACK=!1;class Km{constructor(e,t=Km.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Km(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Bm.BLACK,null,null))}remove(e){return new Km(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Bm.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,r=null;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),0===t){if(n.left.isEmpty())return r?r.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}t<0?n=n.left:t>0&&(r=n,n=n.right)}throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new zm(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new zm(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new zm(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new zm(this.root_,null,this.comparator_,!0,e)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
function $m(e,t){return Lp(e.name,t.name)}function Gm(e,t){return Lp(e,t)}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */let Hm;Km.EMPTY_NODE=new class{copy(e,t,n,r,i){return this}insert(e,t,n){return new Bm(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}};const Wm=function(e){return"number"==typeof e?"number:"+zp(e):"string:"+e},Ym=function(e){if(e.isLeafNode()){const t=e.val();m("string"==typeof t||"number"==typeof t||"object"==typeof t&&Q(t,".sv"),"Priority must be a string or number.")}else m(e===Hm||e.isEmpty(),"priority of unexpected type.");m(e===Hm||e.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
let Qm,Jm,Xm;class Zm{static set __childrenNodeConstructor(e){Qm=e}static get __childrenNodeConstructor(){return Qm}constructor(e,t=Zm.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,m(void 0!==this.value_&&null!==this.value_,"LeafNode shouldn't be created with null/undefined value."),Ym(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Zm(this.value_,e)}getImmediateChild(e){return".priority"===e?this.priorityNode_:Zm.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return Sm(e)?this:".priority"===wm(e)?this.priorityNode_:Zm.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return".priority"===e?this.updatePriority(t):t.isEmpty()&&".priority"!==e?this:Zm.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=wm(e);return null===n?t:t.isEmpty()&&".priority"!==n?this:(m(".priority"!==n||1===vm(e),".priority must be the last token in a path"),this.updateImmediateChild(n,Zm.__childrenNodeConstructor.EMPTY_NODE.updateChild(bm(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(null===this.lazyHash_){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Wm(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",e+="number"===t?zp(this.value_):this.value_,this.lazyHash_=Ip(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Zm.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Zm.__childrenNodeConstructor?-1:(m(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,r=Zm.VALUE_TYPE_ORDER.indexOf(t),i=Zm.VALUE_TYPE_ORDER.indexOf(n);return m(r>=0,"Unknown leaf type: "+t),m(i>=0,"Unknown leaf type: "+n),r===i?"object"===n?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}return!1}}Zm.VALUE_TYPE_ORDER=["object","boolean","number","string"];const eg=new class extends jm{compare(e,t){const n=e.node.getPriority(),r=t.node.getPriority(),i=n.compareTo(r);return 0===i?Lp(e.name,t.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return Fm.MIN}maxPost(){return new Fm(Mp,new Zm("[PRIORITY-POST]",Xm))}makePost(e,t){const n=Jm(e);return new Fm(t,new Zm("[PRIORITY-POST]",n))}toString(){return".priority"}},tg=Math.log(2);
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class ng{constructor(e){var t;this.count=(t=e+1,parseInt(Math.log(t)/tg,10)),this.current_=this.count-1;const n=(r=this.count,parseInt(Array(r+1).join("1"),2));var r;this.bits_=e+1&n}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const rg=function(e,t,n,r){e.sort(t);const i=function(t,r){const s=r-t;let o,a;if(0===s)return null;if(1===s)return o=e[t],a=n?n(o):o,new Bm(a,o.node,Bm.BLACK,null,null);{const c=parseInt(s/2,10)+t,l=i(t,c),u=i(c+1,r);return o=e[c],a=n?n(o):o,new Bm(a,o.node,Bm.BLACK,l,u)}},s=function(t){let r=null,s=null,o=e.length;const a=function(t,r){const s=o-t,a=o;o-=t;const l=i(s+1,a),u=e[s],h=n?n(u):u;c(new Bm(h,u.node,r,null,l))},c=function(e){r?(r.left=e,r=e):(s=e,r=e)};for(let e=0;e<t.count;++e){const n=t.nextBitIsOne(),r=Math.pow(2,t.count-(e+1));n?a(r,Bm.BLACK):(a(r,Bm.BLACK),a(r,Bm.RED))}return s}(new ng(e.length));return new Km(r||t,s)};
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */let ig;const sg={};class og{static get Default(){return m(sg&&eg,"ChildrenNode.ts has not been loaded"),ig=ig||new og({".priority":sg},{".priority":eg}),ig}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=J(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Km?t:null}hasIndex(e){return Q(this.indexSet_,e.toString())}addIndex(e,t){m(e!==Um,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let r=!1;const i=t.getIterator(Fm.Wrap);let s,o=i.getNext();for(;o;)r=r||e.isDefinedOn(o.node),n.push(o),o=i.getNext();s=r?rg(n,e.getCompare()):sg;const a=e.toString(),c={...this.indexSet_};c[a]=e;const l={...this.indexes_};return l[a]=s,new og(l,c)}addToIndexes(e,t){const n=Z(this.indexes_,(n,r)=>{const i=J(this.indexSet_,r);if(m(i,"Missing index implementation for "+r),n===sg){if(i.isDefinedOn(e.node)){const n=[],r=t.getIterator(Fm.Wrap);let s=r.getNext();for(;s;)s.name!==e.name&&n.push(s),s=r.getNext();return n.push(e),rg(n,i.getCompare())}return sg}{const r=t.get(e.name);let i=n;return r&&(i=i.remove(new Fm(e.name,r))),i.insert(e,e.node)}});return new og(n,this.indexSet_)}removeFromIndexes(e,t){const n=Z(this.indexes_,n=>{if(n===sg)return n;{const r=t.get(e.name);return r?n.remove(new Fm(e.name,r)):n}});return new og(n,this.indexSet_)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */let ag;class cg{static get EMPTY_NODE(){return ag||(ag=new cg(new Km(Gm),null,og.Default))}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&Ym(this.priorityNode_),this.children_.isEmpty()&&m(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ag}updatePriority(e){return this.children_.isEmpty()?this:new cg(this.children_,e,this.indexMap_)}getImmediateChild(e){if(".priority"===e)return this.getPriority();{const t=this.children_.get(e);return null===t?ag:t}}getChild(e){const t=wm(e);return null===t?this:this.getImmediateChild(t).getChild(bm(e))}hasChild(e){return null!==this.children_.get(e)}updateImmediateChild(e,t){if(m(t,"We should always be passing snapshot nodes"),".priority"===e)return this.updatePriority(t);{const n=new Fm(e,t);let r,i;t.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(n,this.children_)):(r=this.children_.insert(e,t),i=this.indexMap_.addToIndexes(n,this.children_));const s=r.isEmpty()?ag:this.priorityNode_;return new cg(r,s,i)}}updateChild(e,t){const n=wm(e);if(null===n)return t;{m(".priority"!==wm(e)||1===vm(e),".priority must be the last token in a path");const r=this.getImmediateChild(n).updateChild(bm(e),t);return this.updateImmediateChild(n,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,r=0,i=!0;if(this.forEachChild(eg,(s,o)=>{t[s]=o.val(e),n++,i&&cg.INTEGER_REGEXP_.test(s)?r=Math.max(r,Number(s)):i=!1}),!e&&i&&r<2*n){const e=[];for(const n in t)e[n]=t[n];return e}return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(null===this.lazyHash_){let e="";this.getPriority().isEmpty()||(e+="priority:"+Wm(this.getPriority().val())+":"),this.forEachChild(eg,(t,n)=>{const r=n.hash();""!==r&&(e+=":"+t+":"+r)}),this.lazyHash_=""===e?"":Ip(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const r=this.resolveIndex_(n);if(r){const n=r.getPredecessorKey(new Fm(e,t));return n?n.name:null}return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.minKey();return e&&e.name}return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new Fm(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const e=t.maxKey();return e&&e.name}return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new Fm(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal(e=>t(e.name,e.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,e=>e);{const n=this.children_.getIteratorFrom(e.name,Fm.Wrap);let r=n.peek();for(;null!=r&&t.compare(r,e)<0;)n.getNext(),r=n.peek();return n}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,e=>e);{const n=this.children_.getReverseIteratorFrom(e.name,Fm.Wrap);let r=n.peek();for(;null!=r&&t.compare(r,e)>0;)n.getNext(),r=n.peek();return n}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===lg?-1:0}withIndex(e){if(e===Um||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new cg(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Um||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority())){if(this.children_.count()===t.children_.count()){const e=this.getIterator(eg),n=t.getIterator(eg);let r=e.getNext(),i=n.getNext();for(;r&&i;){if(r.name!==i.name||!r.node.equals(i.node))return!1;r=e.getNext(),i=n.getNext()}return null===r&&null===i}return!1}return!1}}resolveIndex_(e){return e===Um?null:this.indexMap_.get(e.toString())}}cg.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;const lg=new class extends cg{constructor(){super(new Km(Gm),cg.EMPTY_NODE,og.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return cg.EMPTY_NODE}isEmpty(){return!1}};function ug(e,t=null){if(null===e)return cg.EMPTY_NODE;if("object"==typeof e&&".priority"in e&&(t=e[".priority"]),m(null===t||"string"==typeof t||"number"==typeof t||"object"==typeof t&&".sv"in t,"Invalid priority type found: "+typeof t),"object"==typeof e&&".value"in e&&null!==e[".value"]&&(e=e[".value"]),"object"!=typeof e||".sv"in e)return new Zm(e,ug(t));if(e instanceof Array){let n=cg.EMPTY_NODE;return Up(e,(t,r)=>{if(Q(e,t)&&"."!==t.substring(0,1)){const e=ug(r);!e.isLeafNode()&&e.isEmpty()||(n=n.updateImmediateChild(t,e))}}),n.updatePriority(ug(t))}{const n=[];let r=!1;if(Up(e,(e,t)=>{if("."!==e.substring(0,1)){const i=ug(t);i.isEmpty()||(r=r||!i.getPriority().isEmpty(),n.push(new Fm(e,i)))}}),0===n.length)return cg.EMPTY_NODE;const i=rg(n,$m,e=>e.name,Gm);if(r){const e=rg(n,eg.getCompare());return new cg(i,ug(t),new og({".priority":e},{".priority":eg}))}return new cg(i,ug(t),og.Default)}}Object.defineProperties(Fm,{MIN:{value:new Fm(Op,cg.EMPTY_NODE)},MAX:{value:new Fm(Mp,lg)}}),qm.__EMPTY_NODE=cg.EMPTY_NODE,Zm.__childrenNodeConstructor=cg,Hm=lg,function(e){Xm=e}(lg),function(e){Jm=e}(ug);
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class hg extends jm{constructor(e){super(),this.indexPath_=e,m(!Sm(e)&&".priority"!==wm(e),"Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),r=this.extractChild(t.node),i=n.compareTo(r);return 0===i?Lp(e.name,t.name):i}makePost(e,t){const n=ug(e),r=cg.EMPTY_NODE.updateChild(this.indexPath_,n);return new Fm(t,r)}maxPost(){const e=cg.EMPTY_NODE.updateChild(this.indexPath_,lg);return new Fm(Mp,e)}toString(){return Im(this.indexPath_,0).join("/")}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const dg=new class extends jm{compare(e,t){const n=e.node.compareTo(t.node);return 0===n?Lp(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return Fm.MIN}maxPost(){return Fm.MAX}makePost(e,t){const n=ug(e);return new Fm(t,n)}toString(){return".value"}};
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function fg(e){return{type:"value",snapshotNode:e}}function pg(e,t){return{type:"child_added",snapshotNode:t,childName:e}}function mg(e,t){return{type:"child_removed",snapshotNode:t,childName:e}}function gg(e,t,n){return{type:"child_changed",snapshotNode:t,childName:e,oldSnap:n}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class yg{constructor(e){this.index_=e}updateChild(e,t,n,r,i,s){m(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const o=e.getImmediateChild(t);return o.getChild(r).equals(n.getChild(r))&&o.isEmpty()===n.isEmpty()?e:(null!=s&&(n.isEmpty()?e.hasChild(t)?s.trackChildChange(mg(t,o)):m(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):o.isEmpty()?s.trackChildChange(pg(t,n)):s.trackChildChange(gg(t,n,o))),e.isLeafNode()&&n.isEmpty()?e:e.updateImmediateChild(t,n).withIndex(this.index_))}updateFullNode(e,t,n){return null!=n&&(e.isLeafNode()||e.forEachChild(eg,(e,r)=>{t.hasChild(e)||n.trackChildChange(mg(e,r))}),t.isLeafNode()||t.forEachChild(eg,(t,r)=>{if(e.hasChild(t)){const i=e.getImmediateChild(t);i.equals(r)||n.trackChildChange(gg(t,r,i))}else n.trackChildChange(pg(t,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?cg.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class _g{constructor(e){this.indexedFilter_=new yg(e.getIndex()),this.index_=e.getIndex(),this.startPost_=_g.getStartPost_(e),this.endPost_=_g.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,r,i,s){return this.matches(new Fm(t,n))||(n=cg.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,r,i,s)}updateFullNode(e,t,n){t.isLeafNode()&&(t=cg.EMPTY_NODE);let r=t.withIndex(this.index_);r=r.updatePriority(cg.EMPTY_NODE);const i=this;return t.forEachChild(eg,(e,t)=>{i.matches(new Fm(e,t))||(r=r.updateImmediateChild(e,cg.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}return e.getIndex().maxPost()}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class wg{constructor(e){this.withinDirectionalStart=e=>this.reverse_?this.withinEndPost(e):this.withinStartPost(e),this.withinDirectionalEnd=e=>this.reverse_?this.withinStartPost(e):this.withinEndPost(e),this.withinStartPost=e=>{const t=this.index_.compare(this.rangedFilter_.getStartPost(),e);return this.startIsInclusive_?t<=0:t<0},this.withinEndPost=e=>{const t=this.index_.compare(e,this.rangedFilter_.getEndPost());return this.endIsInclusive_?t<=0:t<0},this.rangedFilter_=new _g(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,r,i,s){return this.rangedFilter_.matches(new Fm(t,n))||(n=cg.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,r,i,s):this.fullLimitUpdateChild_(e,t,n,i,s)}updateFullNode(e,t,n){let r;if(t.isLeafNode()||t.isEmpty())r=cg.EMPTY_NODE.withIndex(this.index_);else if(2*this.limit_<t.numChildren()&&t.isIndexed(this.index_)){let e;r=cg.EMPTY_NODE.withIndex(this.index_),e=this.reverse_?t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let n=0;for(;e.hasNext()&&n<this.limit_;){const t=e.getNext();if(this.withinDirectionalStart(t)){if(!this.withinDirectionalEnd(t))break;r=r.updateImmediateChild(t.name,t.node),n++}}}else{let e;r=t.withIndex(this.index_),r=r.updatePriority(cg.EMPTY_NODE),e=this.reverse_?r.getReverseIterator(this.index_):r.getIterator(this.index_);let n=0;for(;e.hasNext();){const t=e.getNext();n<this.limit_&&this.withinDirectionalStart(t)&&this.withinDirectionalEnd(t)?n++:r=r.updateImmediateChild(t.name,cg.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,r,i){let s;if(this.reverse_){const e=this.index_.getCompare();s=(t,n)=>e(n,t)}else s=this.index_.getCompare();const o=e;m(o.numChildren()===this.limit_,"");const a=new Fm(t,n),c=this.reverse_?o.getFirstChild(this.index_):o.getLastChild(this.index_),l=this.rangedFilter_.matches(a);if(o.hasChild(t)){const e=o.getImmediateChild(t);let u=r.getChildAfterChild(this.index_,c,this.reverse_);for(;null!=u&&(u.name===t||o.hasChild(u.name));)u=r.getChildAfterChild(this.index_,u,this.reverse_);const h=null==u?1:s(u,a);if(l&&!n.isEmpty()&&h>=0)return null!=i&&i.trackChildChange(gg(t,n,e)),o.updateImmediateChild(t,n);{null!=i&&i.trackChildChange(mg(t,e));const n=o.updateImmediateChild(t,cg.EMPTY_NODE);return null!=u&&this.rangedFilter_.matches(u)?(null!=i&&i.trackChildChange(pg(u.name,u.node)),n.updateImmediateChild(u.name,u.node)):n}}return n.isEmpty()?e:l&&s(c,a)>=0?(null!=i&&(i.trackChildChange(mg(c.name,c.node)),i.trackChildChange(pg(t,n))),o.updateImmediateChild(t,n).updateImmediateChild(c.name,cg.EMPTY_NODE)):e}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class vg{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=eg}hasStart(){return this.startSet_}isViewFromLeft(){return""===this.viewFrom_?this.startSet_:"l"===this.viewFrom_}getIndexStartValue(){return m(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return m(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Op}hasEnd(){return this.endSet_}getIndexEndValue(){return m(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return m(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Mp}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&""!==this.viewFrom_}getLimit(){return m(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===eg}copy(){const e=new vg;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function bg(e,t,n){const r=e.copy();return r.startSet_=!0,void 0===t&&(t=null),r.indexStartValue_=t,null!=n?(r.startNameSet_=!0,r.indexStartName_=n):(r.startNameSet_=!1,r.indexStartName_=""),r}function xg(e,t,n){const r=e.copy();return r.endSet_=!0,void 0===t&&(t=null),r.indexEndValue_=t,void 0!==n?(r.endNameSet_=!0,r.indexEndName_=n):(r.endNameSet_=!1,r.indexEndName_=""),r}function Ig(e,t){const n=e.copy();return n.index_=t,n}function Cg(e){const t={};if(e.isDefault())return t;let n;if(e.index_===eg?n="$priority":e.index_===dg?n="$value":e.index_===Um?n="$key":(m(e.index_ instanceof hg,"Unrecognized index type!"),n=e.index_.toString()),t.orderBy=W(n),e.startSet_){const n=e.startAfterSet_?"startAfter":"startAt";t[n]=W(e.indexStartValue_),e.startNameSet_&&(t[n]+=","+W(e.indexStartName_))}if(e.endSet_){const n=e.endBeforeSet_?"endBefore":"endAt";t[n]=W(e.indexEndValue_),e.endNameSet_&&(t[n]+=","+W(e.indexEndName_))}return e.limitSet_&&(e.isViewFromLeft()?t.limitToFirst=e.limit_:t.limitToLast=e.limit_),t}function Tg(e){const t={};if(e.startSet_&&(t.sp=e.indexStartValue_,e.startNameSet_&&(t.sn=e.indexStartName_),t.sin=!e.startAfterSet_),e.endSet_&&(t.ep=e.indexEndValue_,e.endNameSet_&&(t.en=e.indexEndName_),t.ein=!e.endBeforeSet_),e.limitSet_){t.l=e.limit_;let n=e.viewFrom_;""===n&&(n=e.isViewFromLeft()?"l":"r"),t.vf=n}return e.index_!==eg&&(t.i=e.index_.toString()),t}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Sg extends pm{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return void 0!==t?"tag$"+t:(m(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,n,r){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=r,this.log_=Np("p:rest:"),this.listens_={}}listen(e,t,n,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const s=Sg.getListenId_(e,n),o={};this.listens_[s]=o;const a=Cg(e._queryParams);this.restRequest_(i+".json",a,(e,t)=>{let a=t;if(404===e&&(a=null,e=null),null===e&&this.onDataUpdate_(i,a,!1,n),J(this.listens_,s)===o){let t;t=e?401===e?"permission_denied":"rest_error:"+e:"ok",r(t,null)}})}unlisten(e,t){const n=Sg.getListenId_(e,t);delete this.listens_[n]}get(e){const t=Cg(e._queryParams),n=e._path.toString(),r=new A;return this.restRequest_(n+".json",t,(e,t)=>{let i=t;404===e&&(i=null,e=null),null===e?(this.onDataUpdate_(n,i,!1,null),r.resolve(i)):r.reject(new Error(i))}),r.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(t.auth=r.accessToken),i&&i.token&&(t.ac=i.token);const s=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+function(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}(t);this.log_("Sending REST request for "+s);const o=new XMLHttpRequest;o.onreadystatechange=()=>{if(n&&4===o.readyState){this.log_("REST Response for "+s+" received. status:",o.status,"response:",o.responseText);let t=null;if(o.status>=200&&o.status<300){try{t=H(o.responseText)}catch(e){Pp("Failed to parse JSON response for "+s+": "+o.responseText)}n(null,t)}else 401!==o.status&&404!==o.status&&Pp("Got unsuccessful REST response for "+s+" Status: "+o.status),n(o.status);n=null}},o.open("GET",s,!0),o.send()})}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Eg{constructor(){this.rootNode_=cg.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function kg(){return{value:null,children:new Map}}function Ng(e,t,n){if(Sm(t))e.value=n,e.children.clear();else if(null!==e.value)e.value=e.value.updateChild(t,n);else{const r=wm(t);e.children.has(r)||e.children.set(r,kg()),Ng(e.children.get(r),t=bm(t),n)}}function Ag(e,t){if(Sm(t))return e.value=null,e.children.clear(),!0;if(null!==e.value){if(e.value.isLeafNode())return!1;{const n=e.value;return e.value=null,n.forEachChild(eg,(t,n)=>{Ng(e,new ym(t),n)}),Ag(e,t)}}if(e.children.size>0){const n=wm(t);return t=bm(t),e.children.has(n)&&Ag(e.children.get(n),t)&&e.children.delete(n),0===e.children.size}return!0}function Dg(e,t,n){null!==e.value?n(t,e.value):function(e,t){e.children.forEach((e,n)=>{t(n,e)})}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e,(e,r)=>{Dg(r,new ym(t.toString()+"/"+e),n)})}class Pg{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&Up(this.last_,(e,n)=>{t[e]=t[e]-n}),this.last_=e,t}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Rg{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Pg(e);const n=1e4+2e4*Math.random();Gp(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;Up(e,(e,r)=>{r>0&&Q(this.statsToReport_,e)&&(t[e]=r,n=!0)}),n&&this.server_.reportStats(t),Gp(this.reportStats_.bind(this),Math.floor(2*Math.random()*3e5))}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */var Og,Mg;function Lg(e){return{fromUser:!1,fromServer:!0,queryId:e,tagged:!0}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(Mg=Og||(Og={}))[Mg.OVERWRITE=0]="OVERWRITE",Mg[Mg.MERGE=1]="MERGE",Mg[Mg.ACK_USER_WRITE=2]="ACK_USER_WRITE",Mg[Mg.LISTEN_COMPLETE=3]="LISTEN_COMPLETE";class Fg{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=Og.ACK_USER_WRITE,this.source={fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}operationForChild(e){if(Sm(this.path)){if(null!=this.affectedTree.value)return m(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new ym(e));return new Fg(_m(),t,this.revert)}}return m(wm(this.path)===e,"operationForChild called for unrelated child."),new Fg(bm(this.path),this.affectedTree,this.revert)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class jg{constructor(e,t){this.source=e,this.path=t,this.type=Og.LISTEN_COMPLETE}operationForChild(e){return Sm(this.path)?new jg(this.source,_m()):new jg(this.source,bm(this.path))}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Vg{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=Og.OVERWRITE}operationForChild(e){return Sm(this.path)?new Vg(this.source,_m(),this.snap.getImmediateChild(e)):new Vg(this.source,bm(this.path),this.snap)}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class qg{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=Og.MERGE}operationForChild(e){if(Sm(this.path)){const t=this.children.subtree(new ym(e));return t.isEmpty()?null:t.value?new Vg(this.source,_m(),t.value):new qg(this.source,_m(),t)}return m(wm(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new qg(this.source,bm(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Ug{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(Sm(e))return this.isFullyInitialized()&&!this.filtered_;const t=wm(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class zg{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Bg(e,t,n,r,i,s){const o=r.filter(e=>e.type===n);o.sort((t,n)=>function(e,t,n){if(null==t.childName||null==n.childName)throw g("Should only compare child_ events.");const r=new Fm(t.childName,t.snapshotNode),i=new Fm(n.childName,n.snapshotNode);return e.index_.compare(r,i)}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e,t,n)),o.forEach(n=>{const r=function(e,t,n){return"value"===t.type||"child_removed"===t.type||(t.prevName=n.getPredecessorChildName(t.childName,t.snapshotNode,e.index_)),t}(e,n,s);i.forEach(i=>{i.respondsTo(n.type)&&t.push(i.createEvent(r,e.query_))})})}function Kg(e,t){return{eventCache:e,serverCache:t}}function $g(e,t,n,r){return Kg(new Ug(t,n,r),e.serverCache)}function Gg(e,t,n,r){return Kg(e.eventCache,new Ug(t,n,r))}function Hg(e){return e.eventCache.isFullyInitialized()?e.eventCache.getNode():null}function Wg(e){return e.serverCache.isFullyInitialized()?e.serverCache.getNode():null}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */let Yg;class Qg{static fromObject(e){let t=new Qg(null);return Up(e,(e,n)=>{t=t.set(new ym(e),n)}),t}constructor(e,t=(()=>(Yg||(Yg=new Km(Fp)),Yg))()){this.value=e,this.children=t}isEmpty(){return null===this.value&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(null!=this.value&&t(this.value))return{path:_m(),value:this.value};if(Sm(e))return null;{const n=wm(e),r=this.children.get(n);if(null!==r){const i=r.findRootMostMatchingPathAndValue(bm(e),t);return null!=i?{path:Tm(new ym(n),i.path),value:i.value}:null}return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(Sm(e))return this;{const t=wm(e),n=this.children.get(t);return null!==n?n.subtree(bm(e)):new Qg(null)}}set(e,t){if(Sm(e))return new Qg(t,this.children);{const n=wm(e),r=(this.children.get(n)||new Qg(null)).set(bm(e),t),i=this.children.insert(n,r);return new Qg(this.value,i)}}remove(e){if(Sm(e))return this.children.isEmpty()?new Qg(null):new Qg(null,this.children);{const t=wm(e),n=this.children.get(t);if(n){const r=n.remove(bm(e));let i;return i=r.isEmpty()?this.children.remove(t):this.children.insert(t,r),null===this.value&&i.isEmpty()?new Qg(null):new Qg(this.value,i)}return this}}get(e){if(Sm(e))return this.value;{const t=wm(e),n=this.children.get(t);return n?n.get(bm(e)):null}}setTree(e,t){if(Sm(e))return t;{const n=wm(e),r=(this.children.get(n)||new Qg(null)).setTree(bm(e),t);let i;return i=r.isEmpty()?this.children.remove(n):this.children.insert(n,r),new Qg(this.value,i)}}fold(e){return this.fold_(_m(),e)}fold_(e,t){const n={};return this.children.inorderTraversal((r,i)=>{n[r]=i.fold_(Tm(e,r),t)}),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,_m(),t)}findOnPath_(e,t,n){const r=!!this.value&&n(t,this.value);if(r)return r;if(Sm(e))return null;{const r=wm(e),i=this.children.get(r);return i?i.findOnPath_(bm(e),Tm(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,_m(),t)}foreachOnPath_(e,t,n){if(Sm(e))return this;{this.value&&n(t,this.value);const r=wm(e),i=this.children.get(r);return i?i.foreachOnPath_(bm(e),Tm(t,r),n):new Qg(null)}}foreach(e){this.foreach_(_m(),e)}foreach_(e,t){this.children.inorderTraversal((n,r)=>{r.foreach_(Tm(e,n),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,n)=>{n.value&&e(t,n.value)})}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Jg{constructor(e){this.writeTree_=e}static empty(){return new Jg(new Qg(null))}}function Xg(e,t,n){if(Sm(t))return new Jg(new Qg(n));{const r=e.writeTree_.findRootMostValueAndPath(t);if(null!=r){const i=r.path;let s=r.value;const o=Em(i,t);return s=s.updateChild(o,n),new Jg(e.writeTree_.set(i,s))}{const r=new Qg(n),i=e.writeTree_.setTree(t,r);return new Jg(i)}}}function Zg(e,t,n){let r=e;return Up(n,(e,n)=>{r=Xg(r,Tm(t,e),n)}),r}function ey(e,t){if(Sm(t))return Jg.empty();{const n=e.writeTree_.setTree(t,new Qg(null));return new Jg(n)}}function ty(e,t){return null!=ny(e,t)}function ny(e,t){const n=e.writeTree_.findRootMostValueAndPath(t);return null!=n?e.writeTree_.get(n.path).getChild(Em(n.path,t)):null}function ry(e){const t=[],n=e.writeTree_.value;return null!=n?n.isLeafNode()||n.forEachChild(eg,(e,n)=>{t.push(new Fm(e,n))}):e.writeTree_.children.inorderTraversal((e,n)=>{null!=n.value&&t.push(new Fm(e,n.value))}),t}function iy(e,t){if(Sm(t))return e;{const n=ny(e,t);return new Jg(null!=n?new Qg(n):e.writeTree_.subtree(t))}}function sy(e){return e.writeTree_.isEmpty()}function oy(e,t){return ay(_m(),e.writeTree_,t)}function ay(e,t,n){if(null!=t.value)return n.updateChild(e,t.value);{let r=null;return t.children.inorderTraversal((t,i)=>{".priority"===t?(m(null!==i.value,"Priority writes must always be leaf nodes"),r=i.value):n=ay(Tm(e,t),i,n)}),n.getChild(e).isEmpty()||null===r||(n=n.updateChild(Tm(e,".priority"),r)),n}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function cy(e,t){return by(t,e)}function ly(e,t){const n=e.allWrites.findIndex(e=>e.writeId===t);m(n>=0,"removeWrite called with nonexistent writeId.");const r=e.allWrites[n];e.allWrites.splice(n,1);let i=r.visible,s=!1,o=e.allWrites.length-1;for(;i&&o>=0;){const t=e.allWrites[o];t.visible&&(o>=n&&uy(t,r.path)?i=!1:Am(r.path,t.path)&&(s=!0)),o--}return!!i&&(s?(function(e){e.visibleWrites=dy(e.allWrites,hy,_m()),e.allWrites.length>0?e.lastWriteId=e.allWrites[e.allWrites.length-1].writeId:e.lastWriteId=-1}(e),!0):(r.snap?e.visibleWrites=ey(e.visibleWrites,r.path):Up(r.children,t=>{e.visibleWrites=ey(e.visibleWrites,Tm(r.path,t))}),!0))}function uy(e,t){if(e.snap)return Am(e.path,t);for(const n in e.children)if(e.children.hasOwnProperty(n)&&Am(Tm(e.path,n),t))return!0;return!1}function hy(e){return e.visible}function dy(e,t,n){let r=Jg.empty();for(let i=0;i<e.length;++i){const s=e[i];if(t(s)){const e=s.path;let t;if(s.snap)Am(n,e)?(t=Em(n,e),r=Xg(r,t,s.snap)):Am(e,n)&&(t=Em(e,n),r=Xg(r,_m(),s.snap.getChild(t)));else{if(!s.children)throw g("WriteRecord should have .snap or .children");if(Am(n,e))t=Em(n,e),r=Zg(r,t,s.children);else if(Am(e,n))if(t=Em(e,n),Sm(t))r=Zg(r,_m(),s.children);else{const e=J(s.children,wm(t));if(e){const n=e.getChild(bm(t));r=Xg(r,_m(),n)}}}}}return r}function fy(e,t,n,r,i){if(r||i){const s=iy(e.visibleWrites,t);if(!i&&sy(s))return n;if(i||null!=n||ty(s,_m())){const s=function(e){return(e.visible||i)&&(!r||!~r.indexOf(e.writeId))&&(Am(e.path,t)||Am(t,e.path))};return oy(dy(e.allWrites,s,t),n||cg.EMPTY_NODE)}return null}{const r=ny(e.visibleWrites,t);if(null!=r)return r;{const r=iy(e.visibleWrites,t);return sy(r)?n:null!=n||ty(r,_m())?oy(r,n||cg.EMPTY_NODE):null}}}function py(e,t,n,r){return fy(e.writeTree,e.treePath,t,n,r)}function my(e,t){return function(e,t,n){let r=cg.EMPTY_NODE;const i=ny(e.visibleWrites,t);if(i)return i.isLeafNode()||i.forEachChild(eg,(e,t)=>{r=r.updateImmediateChild(e,t)}),r;if(n){const i=iy(e.visibleWrites,t);return n.forEachChild(eg,(e,t)=>{const n=oy(iy(i,new ym(e)),t);r=r.updateImmediateChild(e,n)}),ry(i).forEach(e=>{r=r.updateImmediateChild(e.name,e.node)}),r}return ry(iy(e.visibleWrites,t)).forEach(e=>{r=r.updateImmediateChild(e.name,e.node)}),r}(e.writeTree,e.treePath,t)}function gy(e,t,n,r){return function(e,t,n,r,i){m(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=Tm(t,n);if(ty(e.visibleWrites,s))return null;{const t=iy(e.visibleWrites,s);return sy(t)?i.getChild(n):oy(t,i.getChild(n))}}(e.writeTree,e.treePath,t,n,r)}function yy(e,t){return function(e,t){return ny(e.visibleWrites,t)}(e.writeTree,Tm(e.treePath,t))}function _y(e,t,n,r,i,s){return function(e,t,n,r,i,s,o){let a;const c=iy(e.visibleWrites,t),l=ny(c,_m());if(null!=l)a=l;else{if(null==n)return[];a=oy(c,n)}if(a=a.withIndex(o),a.isEmpty()||a.isLeafNode())return[];{const e=[],t=o.getCompare(),n=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let c=n.getNext();for(;c&&e.length<i;)0!==t(c,r)&&e.push(c),c=n.getNext();return e}}(e.writeTree,e.treePath,t,n,r,i,s)}function wy(e,t,n){return function(e,t,n,r){const i=Tm(t,n),s=ny(e.visibleWrites,i);return null!=s?s:r.isCompleteForChild(n)?oy(iy(e.visibleWrites,i),r.getNode().getImmediateChild(n)):null}(e.writeTree,e.treePath,t,n)}function vy(e,t){return by(Tm(e.treePath,t),e.writeTree)}function by(e,t){return{treePath:e,writeTree:t}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class xy{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;m("child_added"===t||"child_changed"===t||"child_removed"===t,"Only child changes supported for tracking"),m(".priority"!==n,"Only non-priority child changes can be tracked.");const r=this.changeMap.get(n);if(r){const i=r.type;if("child_added"===t&&"child_removed"===i)this.changeMap.set(n,gg(n,e.snapshotNode,r.snapshotNode));else if("child_removed"===t&&"child_added"===i)this.changeMap.delete(n);else if("child_removed"===t&&"child_changed"===i)this.changeMap.set(n,mg(n,r.oldSnap));else if("child_changed"===t&&"child_added"===i)this.changeMap.set(n,pg(n,e.snapshotNode));else{if("child_changed"!==t||"child_changed"!==i)throw g("Illegal combination of changes: "+e+" occurred after "+r);this.changeMap.set(n,gg(n,e.snapshotNode,r.oldSnap))}}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Iy=new class{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}};class Cy{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const t=null!=this.optCompleteServerCache_?new Ug(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return wy(this.writes_,e,t)}}getChildAfterChild(e,t,n){const r=null!=this.optCompleteServerCache_?this.optCompleteServerCache_:Wg(this.viewCache_),i=_y(this.writes_,r,t,1,n,e);return 0===i.length?null:i[0]}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Ty(e,t,n,r,i){const s=new xy;let o,a;if(n.type===Og.OVERWRITE){const c=n;c.source.fromUser?o=ky(e,t,c.path,c.snap,r,i,s):(m(c.source.fromServer,"Unknown source."),a=c.source.tagged||t.serverCache.isFiltered()&&!Sm(c.path),o=Ey(e,t,c.path,c.snap,r,i,a,s))}else if(n.type===Og.MERGE){const c=n;c.source.fromUser?o=function(e,t,n,r,i,s,o){let a=t;return r.foreach((r,c)=>{const l=Tm(n,r);Ny(t,wm(l))&&(a=ky(e,a,l,c,i,s,o))}),r.foreach((r,c)=>{const l=Tm(n,r);Ny(t,wm(l))||(a=ky(e,a,l,c,i,s,o))}),a}(e,t,c.path,c.children,r,i,s):(m(c.source.fromServer,"Unknown source."),a=c.source.tagged||t.serverCache.isFiltered(),o=Dy(e,t,c.path,c.children,r,i,a,s))}else if(n.type===Og.ACK_USER_WRITE){const a=n;o=a.revert?function(e,t,n,r,i,s){let o;if(null!=yy(r,n))return t;{const a=new Cy(r,t,i),c=t.eventCache.getNode();let l;if(Sm(n)||".priority"===wm(n)){let n;if(t.serverCache.isFullyInitialized())n=py(r,Wg(t));else{const e=t.serverCache.getNode();m(e instanceof cg,"serverChildren would be complete if leaf node"),n=my(r,e)}l=e.filter.updateFullNode(c,n,s)}else{const i=wm(n);let u=wy(r,i,t.serverCache);null==u&&t.serverCache.isCompleteForChild(i)&&(u=c.getImmediateChild(i)),l=null!=u?e.filter.updateChild(c,i,u,bm(n),a,s):t.eventCache.getNode().hasChild(i)?e.filter.updateChild(c,i,cg.EMPTY_NODE,bm(n),a,s):c,l.isEmpty()&&t.serverCache.isFullyInitialized()&&(o=py(r,Wg(t)),o.isLeafNode()&&(l=e.filter.updateFullNode(l,o,s)))}return o=t.serverCache.isFullyInitialized()||null!=yy(r,_m()),$g(t,l,o,e.filter.filtersNodes())}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e,t,a.path,r,i,s):function(e,t,n,r,i,s,o){if(null!=yy(i,n))return t;const a=t.serverCache.isFiltered(),c=t.serverCache;if(null!=r.value){if(Sm(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Ey(e,t,n,c.getNode().getChild(n),i,s,a,o);if(Sm(n)){let r=new Qg(null);return c.getNode().forEachChild(Um,(e,t)=>{r=r.set(new ym(e),t)}),Dy(e,t,n,r,i,s,a,o)}return t}{let l=new Qg(null);return r.foreach((e,t)=>{const r=Tm(n,e);c.isCompleteForPath(r)&&(l=l.set(e,c.getNode().getChild(r)))}),Dy(e,t,n,l,i,s,a,o)}}(e,t,a.path,a.affectedTree,r,i,s)}else{if(n.type!==Og.LISTEN_COMPLETE)throw g("Unknown operation type: "+n.type);o=function(e,t,n,r,i){const s=t.serverCache,o=Gg(t,s.getNode(),s.isFullyInitialized()||Sm(n),s.isFiltered());return Sy(e,o,n,r,Iy,i)}(e,t,n.path,r,s)}const c=s.getChanges();return function(e,t,n){const r=t.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=Hg(e);(n.length>0||!e.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&n.push(fg(Hg(t)))}}(t,o,c),{viewCache:o,changes:c}}function Sy(e,t,n,r,i,s){const o=t.eventCache;if(null!=yy(r,n))return t;{let a,c;if(Sm(n))if(m(t.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),t.serverCache.isFiltered()){const n=Wg(t),i=my(r,n instanceof cg?n:cg.EMPTY_NODE);a=e.filter.updateFullNode(t.eventCache.getNode(),i,s)}else{const n=py(r,Wg(t));a=e.filter.updateFullNode(t.eventCache.getNode(),n,s)}else{const l=wm(n);if(".priority"===l){m(1===vm(n),"Can't have a priority with additional path components");const i=o.getNode();c=t.serverCache.getNode();const s=gy(r,n,i,c);a=null!=s?e.filter.updatePriority(i,s):o.getNode()}else{const u=bm(n);let h;if(o.isCompleteForChild(l)){c=t.serverCache.getNode();const e=gy(r,n,o.getNode(),c);h=null!=e?o.getNode().getImmediateChild(l).updateChild(u,e):o.getNode().getImmediateChild(l)}else h=wy(r,l,t.serverCache);a=null!=h?e.filter.updateChild(o.getNode(),l,h,u,i,s):o.getNode()}}return $g(t,a,o.isFullyInitialized()||Sm(n),e.filter.filtersNodes())}}function Ey(e,t,n,r,i,s,o,a){const c=t.serverCache;let l;const u=o?e.filter:e.filter.getIndexedFilter();if(Sm(n))l=u.updateFullNode(c.getNode(),r,null);else if(u.filtersNodes()&&!c.isFiltered()){const e=c.getNode().updateChild(n,r);l=u.updateFullNode(c.getNode(),e,null)}else{const e=wm(n);if(!c.isCompleteForPath(n)&&vm(n)>1)return t;const i=bm(n),s=c.getNode().getImmediateChild(e).updateChild(i,r);l=".priority"===e?u.updatePriority(c.getNode(),s):u.updateChild(c.getNode(),e,s,i,Iy,null)}const h=Gg(t,l,c.isFullyInitialized()||Sm(n),u.filtersNodes());return Sy(e,h,n,i,new Cy(i,h,s),a)}function ky(e,t,n,r,i,s,o){const a=t.eventCache;let c,l;const u=new Cy(i,t,s);if(Sm(n))l=e.filter.updateFullNode(t.eventCache.getNode(),r,o),c=$g(t,l,!0,e.filter.filtersNodes());else{const i=wm(n);if(".priority"===i)l=e.filter.updatePriority(t.eventCache.getNode(),r),c=$g(t,l,a.isFullyInitialized(),a.isFiltered());else{const s=bm(n),l=a.getNode().getImmediateChild(i);let h;if(Sm(s))h=r;else{const e=u.getCompleteChild(i);h=null!=e?".priority"===xm(s)&&e.getChild(Cm(s)).isEmpty()?e:e.updateChild(s,r):cg.EMPTY_NODE}c=l.equals(h)?t:$g(t,e.filter.updateChild(a.getNode(),i,h,s,u,o),a.isFullyInitialized(),e.filter.filtersNodes())}}return c}function Ny(e,t){return e.eventCache.isCompleteForChild(t)}function Ay(e,t,n){return n.foreach((e,n)=>{t=t.updateChild(e,n)}),t}function Dy(e,t,n,r,i,s,o,a){if(t.serverCache.getNode().isEmpty()&&!t.serverCache.isFullyInitialized())return t;let c,l=t;c=Sm(n)?r:new Qg(null).setTree(n,r);const u=t.serverCache.getNode();return c.children.inorderTraversal((n,r)=>{if(u.hasChild(n)){const c=Ay(0,t.serverCache.getNode().getImmediateChild(n),r);l=Ey(e,l,new ym(n),c,i,s,o,a)}}),c.children.inorderTraversal((n,r)=>{const c=!t.serverCache.isCompleteForChild(n)&&null===r.value;if(!u.hasChild(n)&&!c){const c=Ay(0,t.serverCache.getNode().getImmediateChild(n),r);l=Ey(e,l,new ym(n),c,i,s,o,a)}}),l}class Py{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const n=this.query_._queryParams,r=new yg(n.getIndex()),i=(s=n).loadsAllData()?new yg(s.getIndex()):s.hasLimit()?new wg(s):new _g(s);var s;this.processor_=function(e){return{filter:e}}(i);const o=t.serverCache,a=t.eventCache,c=r.updateFullNode(cg.EMPTY_NODE,o.getNode(),null),l=i.updateFullNode(cg.EMPTY_NODE,a.getNode(),null),u=new Ug(c,o.isFullyInitialized(),r.filtersNodes()),h=new Ug(l,a.isFullyInitialized(),i.filtersNodes());this.viewCache_=Kg(h,u),this.eventGenerator_=new zg(this.query_)}get query(){return this.query_}}function Ry(e,t){const n=Wg(e.viewCache_);return n&&(e.query._queryParams.loadsAllData()||!Sm(t)&&!n.getImmediateChild(wm(t)).isEmpty())?n.getChild(t):null}function Oy(e){return 0===e.eventRegistrations_.length}function My(e,t,n){const r=[];if(n){m(null==t,"A cancel should cancel all event registrations.");const i=e.query._path;e.eventRegistrations_.forEach(e=>{const t=e.createCancelEvent(n,i);t&&r.push(t)})}if(t){let n=[];for(let r=0;r<e.eventRegistrations_.length;++r){const i=e.eventRegistrations_[r];if(i.matches(t)){if(t.hasAnyCallback()){n=n.concat(e.eventRegistrations_.slice(r+1));break}}else n.push(i)}e.eventRegistrations_=n}else e.eventRegistrations_=[];return r}function Ly(e,t,n,r){t.type===Og.MERGE&&null!==t.source.queryId&&(m(Wg(e.viewCache_),"We should always have a full cache before handling merges"),m(Hg(e.viewCache_),"Missing event cache, even though we have a server cache"));const i=e.viewCache_,s=Ty(e.processor_,i,t,n,r);var o,a;return o=e.processor_,a=s.viewCache,m(a.eventCache.getNode().isIndexed(o.filter.getIndex()),"Event snap not indexed"),m(a.serverCache.getNode().isIndexed(o.filter.getIndex()),"Server snap not indexed"),m(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),e.viewCache_=s.viewCache,Fy(e,s.changes,s.viewCache.eventCache.getNode(),null)}function Fy(e,t,n,r){const i=r?[r]:e.eventRegistrations_;return function(e,t,n,r){const i=[],s=[];return t.forEach(t=>{var n;"child_changed"===t.type&&e.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)&&s.push((n=t.childName,{type:"child_moved",snapshotNode:t.snapshotNode,childName:n}))}),Bg(e,i,"child_removed",t,r,n),Bg(e,i,"child_added",t,r,n),Bg(e,i,"child_moved",s,r,n),Bg(e,i,"child_changed",t,r,n),Bg(e,i,"value",t,r,n),i}(e.eventGenerator_,t,n,i)}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */let jy,Vy;class qy{constructor(){this.views=new Map}}function Uy(e,t,n,r){const i=t.source.queryId;if(null!==i){const s=e.views.get(i);return m(null!=s,"SyncTree gave us an op for an invalid query."),Ly(s,t,n,r)}{let i=[];for(const s of e.views.values())i=i.concat(Ly(s,t,n,r));return i}}function zy(e,t,n,r,i){const s=t._queryIdentifier,o=e.views.get(s);if(!o){let e=py(n,i?r:null),s=!1;e?s=!0:r instanceof cg?(e=my(n,r),s=!1):(e=cg.EMPTY_NODE,s=!1);const o=Kg(new Ug(e,s,!1),new Ug(r,i,!1));return new Py(t,o)}return o}function By(e,t,n,r,i,s){const o=zy(e,t,r,i,s);return e.views.has(t._queryIdentifier)||e.views.set(t._queryIdentifier,o),function(e,t){e.eventRegistrations_.push(t)}(o,n),function(e,t){const n=e.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(eg,(e,t)=>{r.push(pg(e,t))}),n.isFullyInitialized()&&r.push(fg(n.getNode())),Fy(e,r,n.getNode(),t)}(o,n)}function Ky(e,t,n,r){const i=t._queryIdentifier,s=[];let o=[];const a=Yy(e);if("default"===i)for(const[c,l]of e.views.entries())o=o.concat(My(l,n,r)),Oy(l)&&(e.views.delete(c),l.query._queryParams.loadsAllData()||s.push(l.query));else{const t=e.views.get(i);t&&(o=o.concat(My(t,n,r)),Oy(t)&&(e.views.delete(i),t.query._queryParams.loadsAllData()||s.push(t.query)))}return a&&!Yy(e)&&s.push(new(m(jy,"Reference.ts has not been loaded"),jy)(t._repo,t._path)),{removed:s,events:o}}function $y(e){const t=[];for(const n of e.views.values())n.query._queryParams.loadsAllData()||t.push(n);return t}function Gy(e,t){let n=null;for(const r of e.views.values())n=n||Ry(r,t);return n}function Hy(e,t){if(t._queryParams.loadsAllData())return Qy(e);{const n=t._queryIdentifier;return e.views.get(n)}}function Wy(e,t){return null!=Hy(e,t)}function Yy(e){return null!=Qy(e)}function Qy(e){for(const t of e.views.values())if(t.query._queryParams.loadsAllData())return t;return null}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */let Jy=1;class Xy{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Qg(null),this.pendingWriteTree_={visibleWrites:Jg.empty(),allWrites:[],lastWriteId:-1},this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Zy(e,t,n,r,i){return function(e,t,n,r,i){m(r>e.lastWriteId,"Stacking an older write on top of newer ones"),void 0===i&&(i=!0),e.allWrites.push({path:t,snap:n,writeId:r,visible:i}),i&&(e.visibleWrites=Xg(e.visibleWrites,t,n)),e.lastWriteId=r}(e.pendingWriteTree_,t,n,r,i),i?c_(e,new Vg({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,n)):[]}function e_(e,t,n,r){!function(e,t,n,r){m(r>e.lastWriteId,"Stacking an older merge on top of newer ones"),e.allWrites.push({path:t,children:n,writeId:r,visible:!0}),e.visibleWrites=Zg(e.visibleWrites,t,n),e.lastWriteId=r}(e.pendingWriteTree_,t,n,r);const i=Qg.fromObject(n);return c_(e,new qg({fromUser:!0,fromServer:!1,queryId:null,tagged:!1},t,i))}function t_(e,t,n=!1){const r=function(e,t){for(let n=0;n<e.allWrites.length;n++){const r=e.allWrites[n];if(r.writeId===t)return r}return null}(e.pendingWriteTree_,t);if(ly(e.pendingWriteTree_,t)){let t=new Qg(null);return null!=r.snap?t=t.set(_m(),!0):Up(r.children,e=>{t=t.set(new ym(e),!0)}),c_(e,new Fg(r.path,t,n))}return[]}function n_(e,t,n){return c_(e,new Vg({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,n))}function r_(e,t,n,r,i=!1){const s=t._path,o=e.syncPointTree_.get(s);let a=[];if(o&&("default"===t._queryIdentifier||Wy(o,t))){const c=Ky(o,t,n,r);0===o.views.size&&(e.syncPointTree_=e.syncPointTree_.remove(s));const l=c.removed;if(a=c.events,!i){const n=-1!==l.findIndex(e=>e._queryParams.loadsAllData()),i=e.syncPointTree_.findOnPath(s,(e,t)=>Yy(t));if(n&&!i){const t=e.syncPointTree_.subtree(s);if(!t.isEmpty()){const n=function(e){return e.fold((e,t,n)=>{if(t&&Yy(t))return[Qy(t)];{let e=[];return t&&(e=$y(t)),Up(n,(t,n)=>{e=e.concat(n)}),e}})}(t);for(let t=0;t<n.length;++t){const r=n[t],i=r.query,s=h_(e,r);e.listenProvider_.startListening(y_(i),d_(e,i),s.hashFn,s.onComplete)}}}if(!i&&l.length>0&&!r)if(n){const n=null;e.listenProvider_.stopListening(y_(t),n)}else l.forEach(t=>{const n=e.queryToTagMap.get(f_(t));e.listenProvider_.stopListening(y_(t),n)})}!function(e,t){for(let n=0;n<t.length;++n){const r=t[n];if(!r._queryParams.loadsAllData()){const t=f_(r),n=e.queryToTagMap.get(t);e.queryToTagMap.delete(t),e.tagToQueryMap.delete(n)}}}(e,l)}return a}function i_(e,t,n,r){const i=p_(e,r);if(null!=i){const r=m_(i),s=r.path,o=r.queryId,a=Em(s,t);return g_(e,s,new Vg(Lg(o),a,n))}return[]}function s_(e,t,n,r=!1){const i=t._path;let s=null,o=!1;e.syncPointTree_.foreachOnPath(i,(e,t)=>{const n=Em(e,i);s=s||Gy(t,n),o=o||Yy(t)});let a,c=e.syncPointTree_.get(i);c?(o=o||Yy(c),s=s||Gy(c,_m())):(c=new qy,e.syncPointTree_=e.syncPointTree_.set(i,c)),null!=s?a=!0:(a=!1,s=cg.EMPTY_NODE,e.syncPointTree_.subtree(i).foreachChild((e,t)=>{const n=Gy(t,_m());n&&(s=s.updateImmediateChild(e,n))}));const l=Wy(c,t);if(!l&&!t._queryParams.loadsAllData()){const n=f_(t);m(!e.queryToTagMap.has(n),"View does not exist, but we have a tag");const r=Jy++;e.queryToTagMap.set(n,r),e.tagToQueryMap.set(r,n)}let u=By(c,t,n,cy(e.pendingWriteTree_,i),s,a);if(!l&&!o&&!r){const n=Hy(c,t);u=u.concat(function(e,t,n){const r=t._path,i=d_(e,t),s=h_(e,n),o=e.listenProvider_.startListening(y_(t),i,s.hashFn,s.onComplete),a=e.syncPointTree_.subtree(r);if(i)m(!Yy(a.value),"If we're adding a query, it shouldn't be shadowed");else{const t=a.fold((e,t,n)=>{if(!Sm(e)&&t&&Yy(t))return[Qy(t).query];{let e=[];return t&&(e=e.concat($y(t).map(e=>e.query))),Up(n,(t,n)=>{e=e.concat(n)}),e}});for(let n=0;n<t.length;++n){const r=t[n];e.listenProvider_.stopListening(y_(r),d_(e,r))}}return o}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e,t,n))}return u}function o_(e,t,n){const r=e.pendingWriteTree_,i=e.syncPointTree_.findOnPath(t,(e,n)=>{const r=Gy(n,Em(e,t));if(r)return r});return fy(r,t,i,n,!0)}function a_(e,t){const n=t._path;let r=null;e.syncPointTree_.foreachOnPath(n,(e,t)=>{const i=Em(e,n);r=r||Gy(t,i)});let i=e.syncPointTree_.get(n);i?r=r||Gy(i,_m()):(i=new qy,e.syncPointTree_=e.syncPointTree_.set(n,i));const s=null!=r,o=s?new Ug(r,!0,!1):null;return function(e){return Hg(e.viewCache_)}(zy(i,t,cy(e.pendingWriteTree_,t._path),s?o.getNode():cg.EMPTY_NODE,s))}function c_(e,t){return l_(t,e.syncPointTree_,null,cy(e.pendingWriteTree_,_m()))}function l_(e,t,n,r){if(Sm(e.path))return u_(e,t,n,r);{const i=t.get(_m());null==n&&null!=i&&(n=Gy(i,_m()));let s=[];const o=wm(e.path),a=e.operationForChild(o),c=t.children.get(o);if(c&&a){const e=n?n.getImmediateChild(o):null,t=vy(r,o);s=s.concat(l_(a,c,e,t))}return i&&(s=s.concat(Uy(i,e,r,n))),s}}function u_(e,t,n,r){const i=t.get(_m());null==n&&null!=i&&(n=Gy(i,_m()));let s=[];return t.children.inorderTraversal((t,i)=>{const o=n?n.getImmediateChild(t):null,a=vy(r,t),c=e.operationForChild(t);c&&(s=s.concat(u_(c,i,o,a)))}),i&&(s=s.concat(Uy(i,e,r,n))),s}function h_(e,t){const n=t.query,r=d_(e,n);return{hashFn:()=>{const e=function(e){return e.viewCache_.serverCache.getNode()}(t)||cg.EMPTY_NODE;return e.hash()},onComplete:t=>{if("ok"===t)return r?function(e,t,n){const r=p_(e,n);if(r){const n=m_(r),i=n.path,s=n.queryId,o=Em(i,t);return g_(e,i,new jg(Lg(s),o))}return[]}(e,n._path,r):function(e,t){return c_(e,new jg({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t))}(e,n._path);{const r=function(e,t){let n="Unknown Error";"too_big"===e?n="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"===e?n="Client doesn't have permission to access the desired data.":"unavailable"===e&&(n="The service is unavailable");const r=new Error(e+" at "+t._path.toString()+": "+n);return r.code=e.toUpperCase(),r}(t,n);return r_(e,n,null,r)}}}}function d_(e,t){const n=f_(t);return e.queryToTagMap.get(n)}function f_(e){return e._path.toString()+"$"+e._queryIdentifier}function p_(e,t){return e.tagToQueryMap.get(t)}function m_(e){const t=e.indexOf("$");return m(-1!==t&&t<e.length-1,"Bad queryKey."),{queryId:e.substr(t+1),path:new ym(e.substr(0,t))}}function g_(e,t,n){const r=e.syncPointTree_.get(t);return m(r,"Missing sync point for query tag that we're tracking"),Uy(r,n,cy(e.pendingWriteTree_,t),null)}function y_(e){return e._queryParams.loadsAllData()&&!e._queryParams.isDefault()?new(m(Vy,"Reference.ts has not been loaded"),Vy)(e._repo,e._path):e}class __{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new __(t)}node(){return this.node_}}class w_{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=Tm(this.path_,e);return new w_(this.syncTree_,t)}node(){return o_(this.syncTree_,this.path_)}}const v_=function(e,t,n){return e&&"object"==typeof e?(m(".sv"in e,"Unexpected leaf node or priority contents"),"string"==typeof e[".sv"]?b_(e[".sv"],t,n):"object"==typeof e[".sv"]?x_(e[".sv"],t):void m(!1,"Unexpected server value: "+JSON.stringify(e,null,2))):e},b_=function(e,t,n){if("timestamp"===e)return n.timestamp;m(!1,"Unexpected server value: "+e)},x_=function(e,t,n){e.hasOwnProperty("increment")||m(!1,"Unexpected server value: "+JSON.stringify(e,null,2));const r=e.increment;"number"!=typeof r&&m(!1,"Unexpected increment value: "+r);const i=t.node();if(m(null!=i,"Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const s=i.getValue();return"number"!=typeof s?r:s+r},I_=function(e,t,n,r){return T_(t,new w_(n,e),r)},C_=function(e,t,n){return T_(e,new __(t),n)};function T_(e,t,n){const r=e.getPriority().val(),i=v_(r,t.getImmediateChild(".priority"),n);let s;if(e.isLeafNode()){const r=e,s=v_(r.getValue(),t,n);return s!==r.getValue()||i!==r.getPriority().val()?new Zm(s,ug(i)):e}{const r=e;return s=r,i!==r.getPriority().val()&&(s=s.updatePriority(new Zm(i))),r.forEachChild(eg,(e,r)=>{const i=T_(r,t.getImmediateChild(e),n);i!==r&&(s=s.updateImmediateChild(e,i))}),s}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class S_{constructor(e="",t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}}function E_(e,t){let n=t instanceof ym?t:new ym(t),r=e,i=wm(n);for(;null!==i;){const e=J(r.node.children,i)||{children:{},childCount:0};r=new S_(i,r,e),n=bm(n),i=wm(n)}return r}function k_(e){return e.node.value}function N_(e,t){e.node.value=t,O_(e)}function A_(e){return e.node.childCount>0}function D_(e,t){Up(e.node.children,(n,r)=>{t(new S_(n,e,r))})}function P_(e,t,n,r){n&&!r&&t(e),D_(e,e=>{P_(e,t,!0,r)}),n&&r&&t(e)}function R_(e){return new ym(null===e.parent?e.name:R_(e.parent)+"/"+e.name)}function O_(e){null!==e.parent&&function(e,t,n){const r=function(e){return void 0===k_(e)&&!A_(e)}(n),i=Q(e.node.children,t);r&&i?(delete e.node.children[t],e.node.childCount--,O_(e)):r||i||(e.node.children[t]=n.node,e.node.childCount++,O_(e))}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e.parent,e.name,e)}const M_=/[\[\].#$\/\u0000-\u001F\u007F]/,L_=/[\[\].#$\u0000-\u001F\u007F]/,F_=10485760,j_=function(e){return"string"==typeof e&&0!==e.length&&!M_.test(e)},V_=function(e){return"string"==typeof e&&0!==e.length&&!L_.test(e)},q_=function(e){return null===e||"string"==typeof e||"number"==typeof e&&!Rp(e)||e&&"object"==typeof e&&Q(e,".sv")},U_=function(e,t,n,r){r&&void 0===t||z_(re(e,"value"),t,n)},z_=function(e,t,n){const r=n instanceof ym?new Dm(n,e):n;if(void 0===t)throw new Error(e+"contains undefined "+Rm(r));if("function"==typeof t)throw new Error(e+"contains a function "+Rm(r)+" with contents = "+t.toString());if(Rp(t))throw new Error(e+"contains "+t.toString()+" "+Rm(r));if("string"==typeof t&&t.length>F_/3&&ie(t)>F_)throw new Error(e+"contains a string greater than "+F_+" utf8 bytes "+Rm(r)+" ('"+t.substring(0,50)+"...')");if(t&&"object"==typeof t){let n=!1,i=!1;if(Up(t,(t,s)=>{if(".value"===t)n=!0;else if(".priority"!==t&&".sv"!==t&&(i=!0,!j_(t)))throw new Error(e+" contains an invalid key ("+t+") "+Rm(r)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');var o,a;a=t,(o=r).parts_.length>0&&(o.byteLength_+=1),o.parts_.push(a),o.byteLength_+=ie(a),Pm(o),z_(e,s,r),function(e){const t=e.parts_.pop();e.byteLength_-=ie(t),e.parts_.length>0&&(e.byteLength_-=1)}(r)}),n&&i)throw new Error(e+' contains ".value" child '+Rm(r)+" in addition to actual children.")}},B_=function(e,t,n,r){const i=re(e,"values");if(!t||"object"!=typeof t||Array.isArray(t))throw new Error(i+" must be an object containing the children to replace.");const s=[];Up(t,(e,t)=>{const r=new ym(e);if(z_(i,t,Tm(n,r)),".priority"===xm(r)&&!q_(t))throw new Error(i+"contains an invalid value for '"+r.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(r)}),function(e,t){let n,r;for(n=0;n<t.length;n++){r=t[n];const i=Im(r);for(let t=0;t<i.length;t++)if(".priority"===i[t]&&t===i.length-1);else if(!j_(i[t]))throw new Error(e+"contains an invalid key ("+i[t]+") in path "+r.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"')}t.sort(km);let i=null;for(n=0;n<t.length;n++){if(r=t[n],null!==i&&Am(i,r))throw new Error(e+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}}(i,s)},K_=function(e,t,n){if(Rp(t))throw new Error(re(e,"priority")+"is "+t.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!q_(t))throw new Error(re(e,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},$_=function(e,t,n,r){if(void 0!==n&&!j_(n))throw new Error(re(e,t)+'was an invalid key = "'+n+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").')},G_=function(e,t,n,r){if(!(r&&void 0===n||V_(n)))throw new Error(re(e,t)+'was an invalid path = "'+n+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')},H_=function(e,t){if(".info"===wm(t))throw new Error(e+" failed = Can't modify data under /.info/")},W_=function(e,t){const n=t.path.toString();if("string"!=typeof t.repoInfo.host||0===t.repoInfo.host.length||!j_(t.repoInfo.namespace)&&"localhost"!==t.repoInfo.host.split(":")[0]||0!==n.length&&!function(e){return e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),V_(e)}(n))throw new Error(re(e,"url")+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')};
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class Y_{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Q_(e,t){let n=null;for(let r=0;r<t.length;r++){const i=t[r],s=i.getPath();null===n||Nm(s,n.path)||(e.eventLists_.push(n),n=null),null===n&&(n={events:[],path:s}),n.events.push(i)}n&&e.eventLists_.push(n)}function J_(e,t,n){Q_(e,n),Z_(e,e=>Nm(e,t))}function X_(e,t,n){Q_(e,n),Z_(e,e=>Am(e,t)||Am(t,e))}function Z_(e,t){e.recursionDepth_++;let n=!0;for(let r=0;r<e.eventLists_.length;r++){const i=e.eventLists_[r];i&&(t(i.path)?(ew(e.eventLists_[r]),e.eventLists_[r]=null):n=!1)}n&&(e.eventLists_=[]),e.recursionDepth_--}function ew(e){for(let t=0;t<e.events.length;t++){const n=e.events[t];if(null!==n){e.events[t]=null;const r=n.getEventRunner();Tp&&kp("event: "+n.toString()),$p(r)}}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const tw="repo_interrupt";class nw{constructor(e,t,n,r){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Y_,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=kg(),this.transactionQueueTree_=new S_,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function rw(e,t,n){if(e.stats_=sm(e.repoInfo_),e.forceRestClient_||("object"==typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0)e.server_=new Sg(e.repoInfo_,(t,n,r,i)=>{ow(e,t,n,r,i)},e.authTokenProvider_,e.appCheckProvider_),setTimeout(()=>aw(e,!0),0);else{if(null!=n){if("object"!=typeof n)throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{W(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}e.persistentConnection_=new Lm(e.repoInfo_,t,(t,n,r,i)=>{ow(e,t,n,r,i)},t=>{aw(e,t)},t=>{!function(e,t){Up(t,(t,n)=>{cw(e,t,n)})}(e,t)},e.authTokenProvider_,e.appCheckProvider_,n),e.server_=e.persistentConnection_}e.authTokenProvider_.addTokenChangeListener(t=>{e.server_.refreshAuthToken(t)}),e.appCheckProvider_.addTokenChangeListener(t=>{e.server_.refreshAppCheckToken(t.token)}),e.statsReporter_=function(e,t){const n=e.toString();return im[n]||(im[n]=t()),im[n]}(e.repoInfo_,()=>new Rg(e.stats_,e.server_)),e.infoData_=new Eg,e.infoSyncTree_=new Xy({startListening:(t,n,r,i)=>{let s=[];const o=e.infoData_.getNode(t._path);return o.isEmpty()||(s=n_(e.infoSyncTree_,t._path,o),setTimeout(()=>{i("ok")},0)),s},stopListening:()=>{}}),cw(e,"connected",!1),e.serverSyncTree_=new Xy({startListening:(t,n,r,i)=>(e.server_.listen(t,r,n,(n,r)=>{const s=i(n,r);X_(e.eventQueue_,t._path,s)}),[]),stopListening:(t,n)=>{e.server_.unlisten(t,n)}})}function iw(e){const t=e.infoData_.getNode(new ym(".info/serverTimeOffset")).val()||0;return(new Date).getTime()+t}function sw(e){return(t=(t={timestamp:iw(e)})||{}).timestamp=t.timestamp||(new Date).getTime(),t;var t}function ow(e,t,n,r,i){e.dataUpdateCount++;const s=new ym(t);n=e.interceptServerDataCallback_?e.interceptServerDataCallback_(t,n):n;let o=[];if(i)if(r){const t=Z(n,e=>ug(e));o=function(e,t,n,r){const i=p_(e,r);if(i){const r=m_(i),s=r.path,o=r.queryId,a=Em(s,t),c=Qg.fromObject(n);return g_(e,s,new qg(Lg(o),a,c))}return[]}(e.serverSyncTree_,s,t,i)}else{const t=ug(n);o=i_(e.serverSyncTree_,s,t,i)}else if(r){const t=Z(n,e=>ug(e));o=function(e,t,n){const r=Qg.fromObject(n);return c_(e,new qg({fromUser:!1,fromServer:!0,queryId:null,tagged:!1},t,r))}(e.serverSyncTree_,s,t)}else{const t=ug(n);o=n_(e.serverSyncTree_,s,t)}let a=s;o.length>0&&(a=ww(e,s)),X_(e.eventQueue_,a,o)}function aw(e,t){cw(e,"connected",t),!1===t&&function(e){mw(e,"onDisconnectEvents");const t=sw(e),n=kg();Dg(e.onDisconnect_,_m(),(r,i)=>{const s=I_(r,i,e.serverSyncTree_,t);Ng(n,r,s)});let r=[];Dg(n,_m(),(t,n)=>{r=r.concat(n_(e.serverSyncTree_,t,n));const i=Cw(e,t);ww(e,i)}),e.onDisconnect_=kg(),X_(e.eventQueue_,_m(),r)}(e)}function cw(e,t,n){const r=new ym("/.info/"+t),i=ug(n);e.infoData_.updateSnapshot(r,i);const s=n_(e.infoSyncTree_,r,i);X_(e.eventQueue_,r,s)}function lw(e){return e.nextWriteId_++}function uw(e,t,n,r,i){mw(e,"set",{path:t.toString(),value:n,priority:r});const s=sw(e),o=ug(n,r),a=o_(e.serverSyncTree_,t),c=C_(o,a,s),l=lw(e),u=Zy(e.serverSyncTree_,t,c,l,!0);Q_(e.eventQueue_,u),e.server_.put(t.toString(),o.val(!0),(n,r)=>{const s="ok"===n;s||Pp("set at "+t+" failed: "+n);const o=t_(e.serverSyncTree_,l,!s);X_(e.eventQueue_,t,o),gw(0,i,n,r)});const h=Cw(e,t);ww(e,h),X_(e.eventQueue_,h,[])}function hw(e,t,n){e.server_.onDisconnectCancel(t.toString(),(r,i)=>{"ok"===r&&Ag(e.onDisconnect_,t),gw(0,n,r,i)})}function dw(e,t,n,r){const i=ug(n);e.server_.onDisconnectPut(t.toString(),i.val(!0),(n,s)=>{"ok"===n&&Ng(e.onDisconnect_,t,i),gw(0,r,n,s)})}function fw(e,t,n){let r;r=".info"===wm(t._path)?r_(e.infoSyncTree_,t,n):r_(e.serverSyncTree_,t,n),J_(e.eventQueue_,t._path,r)}function pw(e){e.persistentConnection_&&e.persistentConnection_.interrupt(tw)}function mw(e,...t){let n="";e.persistentConnection_&&(n=e.persistentConnection_.id+":"),kp(n,...t)}function gw(e,t,n,r){t&&$p(()=>{if("ok"===n)t(null);else{const e=(n||"error").toUpperCase();let i=e;r&&(i+=": "+r);const s=new Error(i);s.code=e,t(s)}})}function yw(e,t,n){return o_(e.serverSyncTree_,t,n)||cg.EMPTY_NODE}function _w(e,t=e.transactionQueueTree_){if(t||Iw(e,t),k_(t)){const n=bw(e,t);m(n.length>0,"Sending zero length transaction queue"),n.every(e=>0===e.status)&&function(e,t,n){const r=n.map(e=>e.currentWriteId),i=yw(e,t,r);let s=i;const o=i.hash();for(let l=0;l<n.length;l++){const e=n[l];m(0===e.status,"tryToSendTransactionQueue_: items in queue should all be run."),e.status=1,e.retryCount++;const r=Em(t,e.path);s=s.updateChild(r,e.currentOutputSnapshotRaw)}const a=s.val(!0),c=t;e.server_.put(c.toString(),a,r=>{mw(e,"transaction put response",{path:c.toString(),status:r});let i=[];if("ok"===r){const r=[];for(let t=0;t<n.length;t++)n[t].status=2,i=i.concat(t_(e.serverSyncTree_,n[t].currentWriteId)),n[t].onComplete&&r.push(()=>n[t].onComplete(null,!0,n[t].currentOutputSnapshotResolved)),n[t].unwatcher();Iw(e,E_(e.transactionQueueTree_,t)),_w(e,e.transactionQueueTree_),X_(e.eventQueue_,t,i);for(let e=0;e<r.length;e++)$p(r[e])}else{if("datastale"===r)for(let e=0;e<n.length;e++)3===n[e].status?n[e].status=4:n[e].status=0;else{Pp("transaction at "+c.toString()+" failed: "+r);for(let e=0;e<n.length;e++)n[e].status=4,n[e].abortReason=r}ww(e,t)}},o)}(e,R_(t),n)}else A_(t)&&D_(t,t=>{_w(e,t)})}function ww(e,t){const n=vw(e,t),r=R_(n);return function(e,t,n){if(0===t.length)return;const r=[];let i=[];const s=t.filter(e=>0===e.status),o=s.map(e=>e.currentWriteId);for(let a=0;a<t.length;a++){const s=t[a],c=Em(n,s.path);let l,u=!1;if(m(null!==c,"rerunTransactionsUnderNode_: relativePath should not be null."),4===s.status)u=!0,l=s.abortReason,i=i.concat(t_(e.serverSyncTree_,s.currentWriteId,!0));else if(0===s.status)if(s.retryCount>=25)u=!0,l="maxretry",i=i.concat(t_(e.serverSyncTree_,s.currentWriteId,!0));else{const n=yw(e,s.path,o);s.currentInputSnapshot=n;const r=t[a].update(n.val());if(void 0!==r){z_("transaction failed: Data returned ",r,s.path);let t=ug(r);"object"==typeof r&&null!=r&&Q(r,".priority")||(t=t.updatePriority(n.getPriority()));const a=s.currentWriteId,c=sw(e),l=C_(t,n,c);s.currentOutputSnapshotRaw=t,s.currentOutputSnapshotResolved=l,s.currentWriteId=lw(e),o.splice(o.indexOf(a),1),i=i.concat(Zy(e.serverSyncTree_,s.path,l,s.currentWriteId,s.applyLocally)),i=i.concat(t_(e.serverSyncTree_,a,!0))}else u=!0,l="nodata",i=i.concat(t_(e.serverSyncTree_,s.currentWriteId,!0))}X_(e.eventQueue_,n,i),i=[],u&&(t[a].status=2,function(e){setTimeout(e,Math.floor(0))}(t[a].unwatcher),t[a].onComplete&&("nodata"===l?r.push(()=>t[a].onComplete(null,!1,t[a].currentInputSnapshot)):r.push(()=>t[a].onComplete(new Error(l),!1,null))))}Iw(e,e.transactionQueueTree_);for(let a=0;a<r.length;a++)$p(r[a]);_w(e,e.transactionQueueTree_)}(e,bw(e,n),r),r}function vw(e,t){let n,r=e.transactionQueueTree_;for(n=wm(t);null!==n&&void 0===k_(r);)r=E_(r,n),n=wm(t=bm(t));return r}function bw(e,t){const n=[];return xw(e,t,n),n.sort((e,t)=>e.order-t.order),n}function xw(e,t,n){const r=k_(t);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);D_(t,t=>{xw(e,t,n)})}function Iw(e,t){const n=k_(t);if(n){let e=0;for(let t=0;t<n.length;t++)2!==n[t].status&&(n[e]=n[t],e++);n.length=e,N_(t,n.length>0?n:void 0)}D_(t,t=>{Iw(e,t)})}function Cw(e,t){const n=R_(vw(e,t)),r=E_(e.transactionQueueTree_,t);return function(e,t){let n=e.parent;for(;null!==n;){if(t(n))return!0;n=n.parent}}(r,t=>{Tw(e,t)}),Tw(e,r),P_(r,t=>{Tw(e,t)}),n}function Tw(e,t){const n=k_(t);if(n){const r=[];let i=[],s=-1;for(let t=0;t<n.length;t++)3===n[t].status||(1===n[t].status?(m(s===t-1,"All SENT items should be at beginning of queue."),s=t,n[t].status=3,n[t].abortReason="set"):(m(0===n[t].status,"Unexpected transaction status in abort"),n[t].unwatcher(),i=i.concat(t_(e.serverSyncTree_,n[t].currentWriteId,!0)),n[t].onComplete&&r.push(n[t].onComplete.bind(null,new Error("set"),!1,null))));-1===s?N_(t,void 0):n.length=s+1,X_(e.eventQueue_,R_(t),i);for(let e=0;e<r.length;e++)$p(r[e])}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Sw=function(e,t){const n=Ew(e),r=n.namespace;"firebase.com"===n.domain&&Dp(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),r&&"undefined"!==r||"localhost"===n.domain||Dp("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||"undefined"!=typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&Pp("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");const i="ws"===n.scheme||"wss"===n.scheme;return{repoInfo:new em(n.host,n.secure,r,i,t,"",r!==n.subdomain),path:new ym(n.pathString)}},Ew=function(e){let t="",n="",r="",i="",s="",o=!0,a="https",c=443;if("string"==typeof e){let l=e.indexOf("//");l>=0&&(a=e.substring(0,l-1),e=e.substring(l+2));let u=e.indexOf("/");-1===u&&(u=e.length);let h=e.indexOf("?");-1===h&&(h=e.length),t=e.substring(0,Math.min(u,h)),u<h&&(i=function(e){let t="";const n=e.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let e=n[i];try{e=decodeURIComponent(e.replace(/\+/g," "))}catch(r){}t+="/"+e}return t}(e.substring(u,h)));const d=function(e){const t={};"?"===e.charAt(0)&&(e=e.substring(1));for(const n of e.split("&")){if(0===n.length)continue;const r=n.split("=");2===r.length?t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Pp(`Invalid query segment '${n}' in query '${e}'`)}return t}(e.substring(Math.min(e.length,h)));l=t.indexOf(":"),l>=0?(o="https"===a||"wss"===a,c=parseInt(t.substring(l+1),10)):l=t.length;const f=t.slice(0,l);if("localhost"===f.toLowerCase())n="localhost";else if(f.split(".").length<=2)n=f;else{const e=t.indexOf(".");r=t.substring(0,e).toLowerCase(),n=t.substring(e+1),s=r}"ns"in d&&(s=d.ns)}return{host:t,port:c,domain:n,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}},kw="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Nw=function(){let e=0;const t=[];return function(n){const r=n===e;let i;e=n;const s=new Array(8);for(i=7;i>=0;i--)s[i]=kw.charAt(n%64),n=Math.floor(n/64);m(0===n,"Cannot push at time == 0");let o=s.join("");if(r){for(i=11;i>=0&&63===t[i];i--)t[i]=0;t[i]++}else for(i=0;i<12;i++)t[i]=Math.floor(64*Math.random());for(i=0;i<12;i++)o+=kw.charAt(t[i]);return m(20===o.length,"nextPushId: Length should be 20."),o}}();
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class Aw{constructor(e,t,n,r){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=r}getPath(){const e=this.snapshot.ref;return"value"===this.eventType?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+W(this.snapshot.exportVal())}}class Dw{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Pw{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return m(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||void 0!==this.snapshotCallback.userCallback&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}
/**
       * @license
       * Copyright 2021 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Rw{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new A;return hw(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){H_("OnDisconnect.remove",this._path);const e=new A;return dw(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){H_("OnDisconnect.set",this._path),U_("OnDisconnect.set",e,this._path,!1);const t=new A;return dw(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){H_("OnDisconnect.setWithPriority",this._path),U_("OnDisconnect.setWithPriority",e,this._path,!1),K_("OnDisconnect.setWithPriority",t);const n=new A;return function(e,t,n,r,i){const s=ug(n,r);e.server_.onDisconnectPut(t.toString(),s.val(!0),(n,r)=>{"ok"===n&&Ng(e.onDisconnect_,t,s),gw(0,i,n,r)})}(this._repo,this._path,e,t,n.wrapCallback(()=>{})),n.promise}update(e){H_("OnDisconnect.update",this._path),B_("OnDisconnect.update",e,this._path);const t=new A;return function(e,t,n,r){if(X(n))return kp("onDisconnect().update() called with empty data.  Don't do anything."),void gw(0,r,"ok",void 0);e.server_.onDisconnectMerge(t.toString(),n,(i,s)=>{"ok"===i&&Up(n,(n,r)=>{const i=ug(r);Ng(e.onDisconnect_,Tm(t,n),i)}),gw(0,r,i,s)})}(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Ow{constructor(e,t,n,r){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=r}get key(){return Sm(this._path)?null:xm(this._path)}get ref(){return new jw(this._repo,this._path)}get _queryIdentifier(){const e=Tg(this._queryParams),t=Vp(e);return"{}"===t?"default":t}get _queryObject(){return Tg(this._queryParams)}isEqual(e){if(!((e=se(e))instanceof Ow))return!1;const t=this._repo===e._repo,n=Nm(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return t&&n&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+function(e){let t="";for(let n=e.pieceNum_;n<e.pieces_.length;n++)""!==e.pieces_[n]&&(t+="/"+encodeURIComponent(String(e.pieces_[n])));return t||"/"}(this._path)}}function Mw(e,t){if(!0===e._orderByCalled)throw new Error(t+": You can't combine multiple orderBy calls.")}function Lw(e){let t=null,n=null;if(e.hasStart()&&(t=e.getIndexStartValue()),e.hasEnd()&&(n=e.getIndexEndValue()),e.getIndex()===Um){const r="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(e.hasStart()){if(e.getIndexStartName()!==Op)throw new Error(r);if("string"!=typeof t)throw new Error(i)}if(e.hasEnd()){if(e.getIndexEndName()!==Mp)throw new Error(r);if("string"!=typeof n)throw new Error(i)}}else if(e.getIndex()===eg){if(null!=t&&!q_(t)||null!=n&&!q_(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(m(e.getIndex()instanceof hg||e.getIndex()===dg,"unknown index type."),null!=t&&"object"==typeof t||null!=n&&"object"==typeof n)throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function Fw(e){if(e.hasStart()&&e.hasEnd()&&e.hasLimit()&&!e.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class jw extends Ow{constructor(e,t){super(e,t,new vg,!1)}get parent(){const e=Cm(this._path);return null===e?null:new jw(this._repo,e)}get root(){let e=this;for(;null!==e.parent;)e=e.parent;return e}}class Vw{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new ym(e),n=Uw(this.ref,e);return new Vw(this._node.getChild(t),n,eg)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return!this._node.isLeafNode()&&!!this._node.forEachChild(this._index,(t,n)=>e(new Vw(n,Uw(this.ref,t),eg)))}hasChild(e){const t=new ym(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return!this._node.isLeafNode()&&!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function qw(e,t){return(e=se(e))._checkNotDeleted("ref"),void 0!==t?Uw(e._root,t):e._root}function Uw(e,t){var n,r,i,s;return null===wm((e=se(e))._path)?(n="child",r="path",s=!1,(i=t)&&(i=i.replace(/^\/*\.info(\/|$)/,"/")),G_(n,r,i,s)):G_("child","path",t,!1),new jw(e._repo,Tm(e._path,t))}function zw(e,t){e=se(e),H_("set",e._path),U_("set",t,e._path,!1);const n=new A;return uw(e._repo,e._path,t,null,n.wrapCallback(()=>{})),n.promise}function Bw(e,t){B_("update",t,e._path);const n=new A;return function(e,t,n,r){mw(e,"update",{path:t.toString(),value:n});let i=!0;const s=sw(e),o={};if(Up(n,(n,r)=>{i=!1,o[n]=I_(Tm(t,n),ug(r),e.serverSyncTree_,s)}),i)kp("update() called with empty data.  Don't do anything."),gw(0,r,"ok",void 0);else{const i=lw(e),s=e_(e.serverSyncTree_,t,o,i);Q_(e.eventQueue_,s),e.server_.merge(t.toString(),n,(n,s)=>{const o="ok"===n;o||Pp("update at "+t+" failed: "+n);const a=t_(e.serverSyncTree_,i,!o),c=a.length>0?ww(e,t):t;X_(e.eventQueue_,c,a),gw(0,r,n,s)}),Up(n,n=>{const r=Cw(e,Tm(t,n));ww(e,r)}),X_(e.eventQueue_,t,[])}}(e._repo,e._path,t,n.wrapCallback(()=>{})),n.promise}class Kw{constructor(e){this.callbackContext=e}respondsTo(e){return"value"===e}createEvent(e,t){const n=t._queryParams.getIndex();return new Aw("value",this,new Vw(e.snapshotNode,new jw(t._repo,t._path),n))}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Dw(this,e,t):null}matches(e){return e instanceof Kw&&(!e.callbackContext||!this.callbackContext||e.callbackContext.matches(this.callbackContext))}hasAnyCallback(){return null!==this.callbackContext}}class $w{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t="children_added"===e?"child_added":e;return t="children_removed"===t?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Dw(this,e,t):null}createEvent(e,t){m(null!=e.childName,"Child events should have a childName.");const n=Uw(new jw(t._repo,t._path),e.childName),r=t._queryParams.getIndex();return new Aw(e.type,this,new Vw(e.snapshotNode,n,r),e.prevName)}getEventRunner(e){return"cancel"===e.getEventType()?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof $w&&this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext))}hasAnyCallback(){return!!this.callbackContext}}function Gw(e,t,n,r,i){let s;if("object"==typeof r&&(s=void 0,i=r),"function"==typeof r&&(s=r),i&&i.onlyOnce){const t=n,r=(n,r)=>{fw(e._repo,e,a),t(n,r)};r.userCallback=n.userCallback,r.context=n.context,n=r}const o=new Pw(n,s||void 0),a="value"===t?new Kw(o):new $w(t,o);return function(e,t,n){let r;r=".info"===wm(t._path)?s_(e.infoSyncTree_,t,n):s_(e.serverSyncTree_,t,n),J_(e.eventQueue_,t._path,r)}(e._repo,e,a),()=>fw(e._repo,e,a)}function Hw(e,t,n,r){return Gw(e,"value",t,n,r)}class Ww{}class Yw extends Ww{constructor(e,t){super(),this._value=e,this._key=t,this.type="endAt"}_apply(e){U_("endAt",this._value,e._path,!0);const t=xg(e._queryParams,this._value,this._key);if(Fw(t),Lw(t),e._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Ow(e._repo,e._path,t,e._orderByCalled)}}class Qw extends Ww{constructor(e,t){super(),this._value=e,this._key=t,this.type="endBefore"}_apply(e){U_("endBefore",this._value,e._path,!1);const t=function(e,t,n){let r;return r=e.index_===Um||n?xg(e,t,n):xg(e,t,Op),r.endBeforeSet_=!0,r}(e._queryParams,this._value,this._key);if(Fw(t),Lw(t),e._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Ow(e._repo,e._path,t,e._orderByCalled)}}class Jw extends Ww{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAt"}_apply(e){U_("startAt",this._value,e._path,!0);const t=bg(e._queryParams,this._value,this._key);if(Fw(t),Lw(t),e._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new Ow(e._repo,e._path,t,e._orderByCalled)}}class Xw extends Ww{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAfter"}_apply(e){U_("startAfter",this._value,e._path,!1);const t=function(e,t,n){let r;return r=e.index_===Um||n?bg(e,t,n):bg(e,t,Mp),r.startAfterSet_=!0,r}(e._queryParams,this._value,this._key);if(Fw(t),Lw(t),e._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new Ow(e._repo,e._path,t,e._orderByCalled)}}class Zw extends Ww{constructor(e){super(),this._limit=e,this.type="limitToFirst"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ow(e._repo,e._path,function(e,t){const n=e.copy();return n.limitSet_=!0,n.limit_=t,n.viewFrom_="l",n}(e._queryParams,this._limit),e._orderByCalled)}}class ev extends Ww{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Ow(e._repo,e._path,function(e,t){const n=e.copy();return n.limitSet_=!0,n.limit_=t,n.viewFrom_="r",n}(e._queryParams,this._limit),e._orderByCalled)}}class tv extends Ww{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){Mw(e,"orderByChild");const t=new ym(this._path);if(Sm(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const n=new hg(t),r=Ig(e._queryParams,n);return Lw(r),new Ow(e._repo,e._path,r,!0)}}class nv extends Ww{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){Mw(e,"orderByKey");const t=Ig(e._queryParams,Um);return Lw(t),new Ow(e._repo,e._path,t,!0)}}class rv extends Ww{constructor(){super(...arguments),this.type="orderByPriority"}_apply(e){Mw(e,"orderByPriority");const t=Ig(e._queryParams,eg);return Lw(t),new Ow(e._repo,e._path,t,!0)}}class iv extends Ww{constructor(){super(...arguments),this.type="orderByValue"}_apply(e){Mw(e,"orderByValue");const t=Ig(e._queryParams,dg);return Lw(t),new Ow(e._repo,e._path,t,!0)}}class sv extends Ww{constructor(e,t){super(),this._value=e,this._key=t,this.type="equalTo"}_apply(e){if(U_("equalTo",this._value,e._path,!1),e._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(e._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new Yw(this._value,this._key)._apply(new Jw(this._value,this._key)._apply(e))}}!function(e){m(!jy,"__referenceConstructor has already been defined"),jy=e}(jw),function(e){m(!Vy,"__referenceConstructor has already been defined"),Vy=e}(jw);
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
const ov={};let av=!1;function cv(e,t,n,r,i){let s=r||e.options.databaseURL;void 0===s&&(e.options.projectId||Dp("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),kp("Using default host for project ",e.options.projectId),s=`${e.options.projectId}-default-rtdb.firebaseio.com`);let o,a,c=Sw(s,i),l=c.repoInfo;"undefined"!=typeof process&&hp&&(a=hp.FIREBASE_DATABASE_EMULATOR_HOST),a?(o=!0,s=`http://${a}?ns=${l.namespace}`,c=Sw(s,i),l=c.repoInfo):o=!c.repoInfo.secure;const u=i&&o?new Yp(Yp.OWNER):new Wp(e.name,e.options,t);W_("Invalid Firebase Database URL",c),Sm(c.path)||Dp("Database URL must point to the root of a Firebase Database (not including a child path).");const h=function(e,t,n,r){let i=ov[t.name];i||(i={},ov[t.name]=i);let s=i[e.toURLString()];return s&&Dp("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new nw(e,av,n,r),i[e.toURLString()]=s,s}(l,e,u,new Hp(e,n));return new lv(h,e)}class lv{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(rw(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new jw(this._repo,_m())),this._rootInternal}_delete(){return null!==this._rootInternal&&(function(e,t){const n=ov[t];n&&n[e.key]===e||Dp(`Database ${t}(${e.repoInfo_}) has already been deleted.`),pw(e),delete n[e.key]}(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){null===this._rootInternal&&Dp("Cannot call "+e+" on a deleted database.")}}function uv(){dm.IS_TRANSPORT_INITIALIZED&&Pp("Transport has already been initialized. Please call this function before calling ref or setting up a listener")}function hv(e=Ct(),t){const n=_t(e,"database").getImmediate({identifier:t});if(!n._instanceStarted){const e=k("database");e&&dv(n,...e)}return n}function dv(e,t,n,r={}){(e=se(e))._checkNotDeleted("useEmulator");const i=`${t}:${n}`,s=e._repoInternal;if(e._instanceStarted){if(i===e._repoInternal.repoInfo_.host&&ee(r,s.repoInfo_.emulatorOptions))return;Dp("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&Dp('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Yp(Yp.OWNER);else if(r.mockUserToken){const t="string"==typeof r.mockUserToken?r.mockUserToken:R(r.mockUserToken,e.app.options.projectId);o=new Yp(t)}D(t)&&(P(t),L("Database",!0)),function(e,t,n,r){const i=t.lastIndexOf(":"),s=D(t.substring(0,i));e.repoInfo_=new em(t,s,e.repoInfo_.namespace,e.repoInfo_.webSocketOnly,e.repoInfo_.nodeAdmin,e.repoInfo_.persistenceKey,e.repoInfo_.includeNamespaceInQueryParams,!0,n),r&&(e.authTokenProvider_=r)}(s,i,r,o)}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
const fv={".sv":"timestamp"};
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
class pv{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}Lm.prototype.simpleListen=function(e,t){this.sendRequest("q",{p:e},t)},Lm.prototype.echo=function(e,t){this.sendRequest("echo",{d:e},t)},
/**
       * @license
       * Copyright 2021 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
function(e){mp(xt),yt(new oe("database",(e,{instanceIdentifier:t})=>cv(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),t),"PUBLIC").setMultipleInstances(!0)),Tt(dp,fp,e),Tt(dp,fp,"esm2020")}();const mv=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:Vw,Database:lv,OnDisconnect:Rw,QueryConstraint:Ww,TransactionResult:pv,_QueryImpl:Ow,_QueryParams:vg,_ReferenceImpl:jw,_TEST_ACCESS_forceRestClient:function(e){!function(e){av=e}(e)},_TEST_ACCESS_hijackHash:function(e){const t=Lm.prototype.put;return Lm.prototype.put=function(n,r,i,s){void 0!==s&&(s=e()),t.call(this,n,r,i,s)},function(){Lm.prototype.put=t}},_initStandalone:
/**
       * @license
       * Copyright 2023 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
function({app:e,url:t,version:n,customAuthImpl:r,customAppCheckImpl:i,nodeAdmin:s=!1}){mp(n);const o=new le("database-standalone"),a=new ce("auth-internal",o);let c;return i&&(c=new ce("app-check-internal",o),c.setComponent(new oe("app-check-internal",()=>i,"PRIVATE"))),a.setComponent(new oe("auth-internal",()=>r,"PRIVATE")),cv(e,a,c,t,s)},_repoManagerDatabaseFromApp:cv,_setSDKVersion:mp,_validatePathString:G_,_validateWritablePath:H_,child:Uw,connectDatabaseEmulator:dv,enableLogging:function(e,t){Ep(e,t)},endAt:function(e,t){return $_("endAt","key",t),new Yw(e,t)},endBefore:function(e,t){return $_("endBefore","key",t),new Qw(e,t)},equalTo:function(e,t){return $_("equalTo","key",t),new sv(e,t)},forceLongPolling:function(){uv(),hm.forceDisallow(),cm.forceAllow()},forceWebSockets:function(){uv(),cm.forceDisallow()},get:function(e){e=se(e);const t=new Pw(()=>{}),n=new Kw(t);return function(e,t,n){const r=a_(e.serverSyncTree_,t);return null!=r?Promise.resolve(r):e.server_.get(t).then(r=>{const i=ug(r).withIndex(t._queryParams.getIndex());let s;if(s_(e.serverSyncTree_,t,n,!0),t._queryParams.loadsAllData())s=n_(e.serverSyncTree_,t._path,i);else{const n=d_(e.serverSyncTree_,t);s=i_(e.serverSyncTree_,t._path,i,n)}return X_(e.eventQueue_,t._path,s),r_(e.serverSyncTree_,t,n,null,!0),i},n=>(mw(e,"get for query "+W(t)+" failed: "+n),Promise.reject(new Error(n))))}(e._repo,e,n).then(t=>new Vw(t,new jw(e._repo,e._path),e._queryParams.getIndex()))},getDatabase:hv,goOffline:function(e){(e=se(e))._checkNotDeleted("goOffline"),pw(e._repo)},goOnline:function(e){var t;(e=se(e))._checkNotDeleted("goOnline"),(t=e._repo).persistentConnection_&&t.persistentConnection_.resume(tw)},increment:function(e){return{".sv":{increment:e}}},limitToFirst:function(e){if("number"!=typeof e||Math.floor(e)!==e||e<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new Zw(e)},limitToLast:function(e){if("number"!=typeof e||Math.floor(e)!==e||e<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new ev(e)},off:function(e,t,n){let r=null;const i=n?new Pw(n):null;"value"===t?r=new Kw(i):t&&(r=new $w(t,i)),fw(e._repo,e,r)},onChildAdded:function(e,t,n,r){return Gw(e,"child_added",t,n,r)},onChildChanged:function(e,t,n,r){return Gw(e,"child_changed",t,n,r)},onChildMoved:function(e,t,n,r){return Gw(e,"child_moved",t,n,r)},onChildRemoved:function(e,t,n,r){return Gw(e,"child_removed",t,n,r)},onDisconnect:function(e){return e=se(e),new Rw(e._repo,e._path)},onValue:Hw,orderByChild:function(e){if("$key"===e)throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if("$priority"===e)throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if("$value"===e)throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return G_("orderByChild","path",e,!1),new tv(e)},orderByKey:function(){return new nv},orderByPriority:function(){return new rv},orderByValue:function(){return new iv},push:function(e,t){e=se(e),H_("push",e._path),U_("push",t,e._path,!0);const n=iw(e._repo),r=Nw(n),i=Uw(e,r),s=Uw(e,r);let o;return o=null!=t?zw(s,t).then(()=>s):Promise.resolve(s),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i},query:function(e,...t){let n=se(e);for(const r of t)n=r._apply(n);return n},ref:qw,refFromURL:function(e,t){(e=se(e))._checkNotDeleted("refFromURL");const n=Sw(t,e._repo.repoInfo_.nodeAdmin);W_("refFromURL",n);const r=n.repoInfo;return e._repo.repoInfo_.isCustomHost()||r.host===e._repo.repoInfo_.host||Dp("refFromURL: Host name does not match the current database: (found "+r.host+" but expected "+e._repo.repoInfo_.host+")"),qw(e,n.path.toString())},remove:function(e){return H_("remove",e._path),zw(e,null)},runTransaction:function(e,t,n){if(e=se(e),H_("Reference.transaction",e._path),".length"===e.key||".keys"===e.key)throw"Reference.transaction failed: "+e.key+" is a read-only object.";const r=n?.applyLocally??!0,i=new A,s=Hw(e,()=>{});return function(e,t,n,r,i,s){mw(e,"transaction on "+t);const o={path:t,update:n,onComplete:r,status:null,order:xp(),applyLocally:s,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=yw(e,t,void 0);o.currentInputSnapshot=a;const c=o.update(a.val());if(void 0===c)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{z_("transaction failed: Data returned ",c,o.path),o.status=0;const n=E_(e.transactionQueueTree_,t),r=k_(n)||[];let i;r.push(o),N_(n,r),"object"==typeof c&&null!==c&&Q(c,".priority")?(i=J(c,".priority"),m(q_(i),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):i=(o_(e.serverSyncTree_,t)||cg.EMPTY_NODE).getPriority().val();const s=sw(e),l=ug(c,i),u=C_(l,a,s);o.currentOutputSnapshotRaw=l,o.currentOutputSnapshotResolved=u,o.currentWriteId=lw(e);const h=Zy(e.serverSyncTree_,t,u,o.currentWriteId,o.applyLocally);X_(e.eventQueue_,t,h),_w(e,e.transactionQueueTree_)}}(e._repo,e._path,t,(t,n,r)=>{let s=null;t?i.reject(t):(s=new Vw(r,new jw(e._repo,e._path),eg),i.resolve(new pv(n,s)))},s,r),i.promise},serverTimestamp:function(){return fv},set:zw,setPriority:function(e,t){e=se(e),H_("setPriority",e._path),K_("setPriority",t);const n=new A;return uw(e._repo,Tm(e._path,".priority"),t,null,n.wrapCallback(()=>{})),n.promise},setWithPriority:function(e,t,n){if(H_("setWithPriority",e._path),U_("setWithPriority",t,e._path,!1),K_("setWithPriority",n),".length"===e.key||".keys"===e.key)throw"setWithPriority failed: "+e.key+" is a read-only object.";const r=new A;return uw(e._repo,e._path,t,n,r.wrapCallback(()=>{})),r.promise},startAfter:function(e,t){return $_("startAfter","key",t),new Xw(e,t)},startAt:function(e=null,t){return $_("startAt","key",t),new Jw(e,t)},update:Bw},Symbol.toStringTag,{value:"Module"}));e("y",mv);const gv="@firebase/installations",yv="0.6.19",_v=1e4,wv=`w:${yv}`,vv="FIS_v2",bv=36e5,xv=new $("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function Iv(e){return e instanceof K&&e.code.includes("request-failed")}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Cv({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function Tv(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function Sv(e,t){const n=(await t.json()).error;return xv.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function Ev({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function kv(e,{refreshToken:t}){const n=Ev(e);return n.append("Authorization",function(e){return`${vv} ${e}`}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(t)),n}async function Nv(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */function Av(e){return new Promise(t=>{setTimeout(t,e)})}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
const Dv=/^[cdef][\w-]{21}$/;function Pv(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){const t=(n=e,btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_"));var n;return t.substr(0,22)}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e);return Dv.test(t)?t:""}catch{return""}}function Rv(e){return`${e.appName}!${e.appId}`}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const Ov=new Map;function Mv(e,t){const n=Rv(e);Lv(n,t),function(e,t){const n=(!Fv&&"BroadcastChannel"in self&&(Fv=new BroadcastChannel("[Firebase] FID Change"),Fv.onmessage=e=>{Lv(e.data.key,e.data.fid)}),Fv);n&&n.postMessage({key:e,fid:t}),0===Ov.size&&Fv&&(Fv.close(),Fv=null)}(n,t)}function Lv(e,t){const n=Ov.get(e);if(n)for(const r of n)r(t)}let Fv=null;
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
const jv="firebase-installations-store";let Vv=null;function qv(){return Vv||(Vv=ke("firebase-installations-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(jv)}})),Vv}async function Uv(e,t){const n=Rv(e),r=(await qv()).transaction(jv,"readwrite"),i=r.objectStore(jv),s=await i.get(n);return await i.put(t,n),await r.done,s&&s.fid===t.fid||Mv(e,t.fid),t}async function zv(e){const t=Rv(e),n=(await qv()).transaction(jv,"readwrite");await n.objectStore(jv).delete(t),await n.done}async function Bv(e,t){const n=Rv(e),r=(await qv()).transaction(jv,"readwrite"),i=r.objectStore(jv),s=await i.get(n),o=t(s);return void 0===o?await i.delete(n):await i.put(o,n),await r.done,!o||s&&s.fid===o.fid||Mv(e,o.fid),o}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */async function Kv(e){let t;const n=await Bv(e.appConfig,n=>{const r=function(e){const t=e||{fid:Pv(),registrationStatus:0};return Hv(t)}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(xv.create("app-offline"))};const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=Cv(e),i=Ev(e),s=t.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={fid:n,authVersion:vv,appId:e.appId,sdkVersion:wv},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await Nv(()=>fetch(r,a));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:Tv(e.authToken)}}throw await Sv("Create Installation",c)}(e,t);return Uv(e.appConfig,n)}catch(n){throw Iv(n)&&409===n.customData.serverCode?await zv(e.appConfig):await Uv(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:$v(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function $v(e){let t=await Gv(e.appConfig);for(;1===t.registrationStatus;)await Av(100),t=await Gv(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await Kv(e);return n||t}return t}function Gv(e){return Bv(e,e=>{if(!e)throw xv.create("installation-not-found");return Hv(e)})}function Hv(e){return 1===(t=e).registrationStatus&&t.registrationTime+_v<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */}async function Wv({appConfig:e,heartbeatServiceProvider:t},n){const r=function(e,{fid:t}){return`${Cv(e)}/${t}/authTokens:generate`}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e,n),i=kv(e,n),s=t.getImmediate({optional:!0});if(s){const e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const o={installation:{sdkVersion:wv,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await Nv(()=>fetch(r,a));if(c.ok)return Tv(await c.json());throw await Sv("Generate Auth Token",c)}async function Yv(e,t=!1){let n;const r=await Bv(e.appConfig,r=>{if(!Jv(r))throw xv.create("not-registered");const i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+bv}(e)}(i))return r;if(1===i.requestStatus)return n=async function(e,t){let n=await Qv(e.appConfig);for(;1===n.authToken.requestStatus;)await Av(100),n=await Qv(e.appConfig);const r=n.authToken;return 0===r.requestStatus?Yv(e,t):r}(e,t),r;{if(!navigator.onLine)throw xv.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}(r);return n=async function(e,t){try{const n=await Wv(e,t),r={...t,authToken:n};return await Uv(e.appConfig,r),n}catch(n){if(!Iv(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n={...t,authToken:{requestStatus:0}};await Uv(e.appConfig,n)}else await zv(e.appConfig);throw n}}(e,t),t}});return n?await n:r.authToken}function Qv(e){return Bv(e,e=>{if(!Jv(e))throw xv.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+_v<Date.now()?{...e,authToken:{requestStatus:0}}:e;var n;
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */})}function Jv(e){return void 0!==e&&2===e.registrationStatus}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
async function Xv(e,t=!1){const n=e;return await async function(e){const{registrationPromise:t}=await Kv(e);t&&await t}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(n),(await Yv(n,t)).token}function Zv(e){return xv.create("missing-app-config-values",{valueName:e})}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const eb="installations",tb=e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw Zv("App Configuration");if(!e.name)throw Zv("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Zv(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:_t(t,"heartbeat"),_delete:()=>Promise.resolve()}},nb=e=>{const t=_t(e.getProvider("app").getImmediate(),eb).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:r}=await Kv(t);return r?r.catch(console.error):Yv(t).catch(console.error),n.fid}(t),getToken:e=>Xv(t,e)}};yt(new oe(eb,tb,"PUBLIC")),yt(new oe("installations-internal",nb,"PRIVATE")),Tt(gv,yv),Tt(gv,yv,"esm2020");
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
const rb="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",ib="google.c.a.c_id",sb=1e4;var ob,ab;
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
function cb(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function lb(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length);for(let i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(ob||(ob={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(ab||(ab={}));const ub="fcm_token_details_db",hb="fcm_token_object_Store",db="firebase-messaging-store";let fb=null;function pb(){return fb||(fb=ke("firebase-messaging-database",1,{upgrade:(e,t)=>{0===t&&e.createObjectStore(db)}})),fb}async function mb(e){const t=yb(e),n=await pb(),r=await n.transaction(db).objectStore(db).get(t);if(r)return r;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map(e=>e.name);if(!e.includes(ub))return null}let t=null;return(await ke(ub,5,{upgrade:async(n,r,i,s)=>{if(r<2)return;if(!n.objectStoreNames.contains(hb))return;const o=s.objectStore(hb),a=await o.index("fcmSenderId").get(e);if(await o.clear(),a)if(2===r){const e=a;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:e.createTime??Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:cb(e.vapidKey)}}}else if(3===r){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:cb(e.auth),p256dh:cb(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:cb(e.vapidKey)}}}else if(4===r){const e=a;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:cb(e.auth),p256dh:cb(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:cb(e.vapidKey)}}}}})).close(),await Ne(ub),await Ne("fcm_vapid_details_db"),await Ne("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(t)?t:null}(e.appConfig.senderId);if(t)return await gb(e,t),t}}async function gb(e,t){const n=yb(e),r=(await pb()).transaction(db,"readwrite");return await r.objectStore(db).put(t,n),await r.done,t}function yb({appConfig:e}){return e.appId}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */const _b=new $("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});function wb({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}async function vb({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function bb({p256dh:e,auth:t,endpoint:n,vapidKey:r}){const i={web:{endpoint:n,auth:t,p256dh:e}};return r!==rb&&(i.web.applicationPubKey=r),i}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */async function xb(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:lb(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:cb(t.getKey("auth")),p256dh:cb(t.getKey("p256dh"))},r=await mb(e.firebaseDependencies);if(r){if(function(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,s=t.p256dh===e.p256dh;return n&&r&&i&&s}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(r.subscriptionOptions,n))return Date.now()>=r.createTime+6048e5?async function(e,t){try{const n=await async function(e,t){const n=await vb(e),r=bb(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let s;try{const n=await fetch(`${wb(e.appConfig)}/${t.token}`,i);s=await n.json()}catch(o){throw _b.create("token-update-failed",{errorInfo:o?.toString()})}if(s.error){const e=s.error.message;throw _b.create("token-update-failed",{errorInfo:e})}if(!s.token)throw _b.create("token-update-no-token");return s.token}(e.firebaseDependencies,t),r={...t,token:n,createTime:Date.now()};return await gb(e.firebaseDependencies,r),n}catch(n){throw n}}(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await async function(e,t){const n={method:"DELETE",headers:await vb(e)};try{const r=await fetch(`${wb(e.appConfig)}/${t}`,n),i=await r.json();if(i.error){const e=i.error.message;throw _b.create("token-unsubscribe-failed",{errorInfo:e})}}catch(r){throw _b.create("token-unsubscribe-failed",{errorInfo:r?.toString()})}}(e.firebaseDependencies,r.token)}catch(i){console.warn(i)}return Ib(e.firebaseDependencies,n)}return Ib(e.firebaseDependencies,n)}async function Ib(e,t){const n=
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */await async function(e,t){const n=await vb(e),r=bb(t),i={method:"POST",headers:n,body:JSON.stringify(r)};let s;try{const t=await fetch(wb(e.appConfig),i);s=await t.json()}catch(o){throw _b.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(s.error){const e=s.error.message;throw _b.create("token-subscribe-failed",{errorInfo:e})}if(!s.token)throw _b.create("token-subscribe-no-token");return s.token}(e,t),r={token:n,createTime:Date.now(),subscriptionOptions:t};return await gb(e,r),r.token}function Cb(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const s=t.notification.icon;s&&(e.notification.icon=s)}(t,e),function(e,t){t.data&&(e.data=t.data)}(t,e),function(e,t){if(!t.fcmOptions&&!t.notification?.click_action)return;e.fcmOptions={};const n=t.fcmOptions?.link??t.notification?.click_action;n&&(e.fcmOptions.link=n);const r=t.fcmOptions?.analytics_label;r&&(e.fcmOptions.analyticsLabel=r)}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(t,e),t}function Tb(e){return _b.create("missing-app-config-values",{valueName:e})}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */class Sb{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const r=
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
function(e){if(!e||!e.options)throw Tb("App Configuration Object");if(!e.name)throw Tb("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const r of t)if(!n[r])throw Tb(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */async function Eb(e){try{e.swRegistration=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch(()=>{}),await async function(e){return new Promise((t,n)=>{const r=setTimeout(()=>n(new Error("Service worker not registered after 10000 ms")),sb),i=e.installing||e.waiting;e.active?(clearTimeout(r),t()):i?i.onstatechange=e=>{"activated"===e.target?.state&&(i.onstatechange=null,clearTimeout(r),t())}:(clearTimeout(r),n(new Error("No incoming service worker found.")))})}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(e.swRegistration)}catch(t){throw _b.create("failed-service-worker-registration",{browserErrorMessage:t?.message})}}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
async function kb(e,t){if(!navigator)throw _b.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw _b.create("permission-blocked");
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=rb)}(e,t?.vapidKey),await async function(e,t){if(t||e.swRegistration||await Eb(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw _b.create("invalid-sw-registration");e.swRegistration=t}}(e,t?.serviceWorkerRegistration),xb(e)}
/**
       * @license
       * Copyright 2019 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */async function Nb(e,t,n){const r=function(e){switch(e){case ab.NOTIFICATION_CLICKED:return"notification_open";case ab.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[ib],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}async function Ab(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===ab.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(Cb(n)):e.onMessageHandler.next(Cb(n)));const r=n.data;var i;"object"==typeof(i=r)&&i&&ib in i&&"1"===r["google.c.a.e"]&&await Nb(e,n.messageType,r)}const Db="@firebase/messaging",Pb="0.12.23",Rb=e=>{const t=new Sb(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",e=>Ab(t,e)),t},Ob=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>kb(t,e)}};
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
async function Mb(){try{await B()}catch(e){return!1}return"undefined"!=typeof window&&z()&&!("undefined"==typeof navigator||!navigator.cookieEnabled)&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
/**
       * @license
       * Copyright 2017 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */
function Lb(e=Ct()){return Mb().then(e=>{if(!e)throw _b.create("unsupported-browser")},e=>{throw _b.create("indexed-db-unsupported")}),_t(se(e),"messaging").getImmediate()}yt(new oe("messaging",Rb,"PUBLIC")),yt(new oe("messaging-internal",Ob,"PRIVATE")),Tt(Db,Pb),Tt(Db,Pb,"esm2020");const Fb=Object.freeze(Object.defineProperty({__proto__:null,getMessaging:Lb,getToken:async function(e,t){return kb(e=se(e),t)},isSupported:Mb,onMessage:function(e,t){return function(e,t){if(!navigator)throw _b.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}(e=se(e),t)}},Symbol.toStringTag,{value:"Module"}));e("z",Fb);const jb=It({apiKey:"AIzaSyDVrufUynAnWdA7dBZ7PZjXYK6WcslU9r8",authDomain:"nar-rehberi-pro.firebaseapp.com",projectId:"nar-rehberi-pro",storageBucket:"nar-rehberi-pro.firebasestorage.app",messagingSenderId:"712568563076",appId:"1:712568563076:web:627257531f8f6a76fe29d1",databaseURL:"https://nar-rehberi-pro-default-rtdb.firebaseio.com/"}),Vb=e("p",(()=>{if("undefined"==typeof window)return tf(jb);if(r.isNativePlatform())return ef(jb,{cache:Hf()});try{return ef(jb,{cache:(e={tabManager:Yf(void 0)},new Gf(e))})}catch(Ap){return console.warn("Firestore persistent cache could not be initialized, falling back to memory cache.",Ap),ef(jb,{cache:Hf()})}var e})()),qb=hv(jb),Ub=(()=>{if("undefined"==typeof window||r.isNativePlatform())return null;try{return Lb(jb)}catch(Ap){return console.warn("Firebase messaging could not be initialized.",Ap),null}})(),zb=Object.freeze(Object.defineProperty({__proto__:null,db:Vb,default:jb,messaging:Ub,rtdb:qb},Symbol.toStringTag,{value:"Module"}));e("A",zb);const Bb=e=>void 0===e||(Array.isArray(e)?e.some(Bb):!(!e||"object"!=typeof e)&&Object.values(e).some(Bb)),Kb=(...e)=>{const t=e[0],n=2===e.length?"==":e[1],r=2===e.length?e[1]:e[2];if(!t||void 0===r||Bb(r))return console.warn(`Firestore: 'where' called with undefined value for field '${t}'. Skipping filter locally.`),null;try{return function(e,t,n){const r=t,i=Cf("where",e);return Vf._create(i,r,n)}(t,n,r)}catch(Ap){return console.warn(`Firestore: failed to create 'where' filter for field '${t}'. Skipping filter locally.`,Ap),null}},$b=(e,...t)=>function(e,t,...n){let r=[];t instanceof Ff&&r.push(t),r=r.concat(n),function(e){const t=e.filter(e=>e instanceof qf).length,n=e.filter(e=>e instanceof Vf).length;if(t>1||t>0&&n>0)throw new cn(an.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}
/**
       * @license
       * Copyright 2020 Google LLC
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */(r);for(const i of r)e=i._apply(e);return e}(e,...t.filter(Boolean)),Gb=e=>String(e??"").trim(),Hb=e=>Gb(e).toLocaleLowerCase("tr-TR"),Wb=e=>Gb(e).toLocaleLowerCase("tr-TR"),Yb=e=>{const t=String(e??"").replace(/\D/g,"");if(!t)return"";let n=t;return n.startsWith("0090")&&n.length>10?n=n.slice(4):n.startsWith("90")&&n.length>10?n=n.slice(2):n.startsWith("0")&&11===n.length&&(n=n.slice(1)),n.length>10&&(n=n.slice(-10)),n},Qb=(e={})=>{const t={...e};return void 0!==e.username&&(t.username=Gb(e.username),t.normalizedUsername=Hb(e.username)),void 0!==e.email&&(t.email=Gb(e.email),t.normalizedEmail=Wb(e.email)),void 0!==e.phone&&(t.phone=Gb(e.phone),t.normalizedPhone=Yb(e.phone)),t},Jb=(e={})=>{const t={...e};return void 0!==e.phone&&(t.phone=Gb(e.phone),t.normalizedPhone=Yb(e.phone)),void 0!==e.email&&(t.email=Gb(e.email),t.normalizedEmail=Wb(e.email)),void 0!==e.username&&(t.username=Gb(e.username),t.normalizedUsername=Hb(e.username)),t},Xb=async({username:e,email:t,phone:n},r=null)=>{const i=Hb(e),s=Wb(t),o=Yb(n),a=await rp(Wd(Vb,"users")),c={username:null,email:null,phone:null};return a.forEach(e=>{if(r&&e.id===r)return;const t=e.data(),n=t.normalizedUsername||Hb(t.username),a=t.normalizedEmail||Wb(t.email),l=t.normalizedPhone||Yb(t.phone);!c.username&&i&&n===i&&(c.username={id:e.id,...t}),!c.email&&s&&a===s&&(c.email={id:e.id,...t}),!c.phone&&o&&l===o&&(c.phone={id:e.id,...t})}),c},Zb=async({phone:e,email:t})=>{const n=Yb(e),r=Wb(t);if(!n&&!r)return null;const i=await rp(Wd(Vb,"subscribers"));let s=null,o=null;return i.forEach(e=>{const t=e.data(),i=t.normalizedPhone||Yb(t.phone),a=t.normalizedEmail||Wb(t.email);!s&&n&&i===n&&(s={docId:e.id,...t}),!o&&r&&a===r&&(o={docId:e.id,...t})}),s||o},ex=async(e,t=null)=>{if(!e?.id)return null;const n=t||await Zb(e);if(!n?.docId)return null;const r=Yd(Vb,"subscribers",n.docId),i=Jb({name:e.name||n.name||"",address:e.address||n.address||"",phone:e.phone||n.phone||"",email:e.email||n.email||"",username:e.username||n.username||"",businessId:n.businessId||e.businessId||"",linkedUserId:e.id,customerUserId:e.id});return await ip(r,i,{merge:!0}),{...n,...i,docId:n.docId}},tx=(e,t,n="timestamp",r=null)=>{const i=Wd(Vb,e);let s=null,o=null;try{r&&r.field&&void 0!==r.value?s=Kb(r.field,r.operator||"==",r.value):r&&(r.field||void 0!==r.value)&&console.warn(`subscribeToCollection: skip filter for [${r?.field}] because value or field is missing`,r),o=$b(i,s)}catch(Ap){return console.error(`Firestore query setup error [${e}]:`,Ap),r?.onError&&r.onError(Ap),t([]),()=>{}}try{return cp(o,e=>{let r=e.docs.map(e=>({...e.data(),firestoreId:e.id,id:e.data().id??e.id}));n&&r.sort((e,t)=>{const r=new Date(e[n]||0).getTime();return new Date(t[n]||0).getTime()-r}),t(r)},n=>{"permission-denied"===n.code?console.warn(`Firestore permission denied for collection [${e}]. Check your security rules.`):console.error(`Firestore subscribeToCollection error [${e}]:`,n),r?.onError&&r.onError(n),t([])})}catch(Ap){return console.error(`Firestore subscribeToCollection setup crash [${e}]:`,Ap),r?.onError&&r.onError(Ap),t([]),()=>{}}},nx=(e,t,n)=>e?cp(Yd(Vb,"users",e),e=>{e.exists()&&t({id:e.id,...e.data()})},t=>{"permission-denied"===t.code?console.warn(`Firestore permission denied for user [${e}]. Check your security rules.`):console.error("Firestore subscribeToUser error:",t),n&&n(t)}):()=>{},rx=async e=>{try{const t=await ap(Wd(Vb,"users"),{...Qb(e),timestamp:(new Date).toISOString()});return"courier"===e.role&&await ap(Wd(Vb,"couriers"),{name:e.name,username:e.username,password:e.password,businessId:e.businessId,userId:t.id,vehicle:e.vehicle||"Motor",phone:e.phone||"",cash:0,currentStock:{water:0,tube:0},status:"Müsait",timestamp:(new Date).toISOString()}),t}catch(Ap){throw console.error("Error in registerUserToFirestore:",Ap),Ap}},ix=async e=>{if(!e)return null;const t=$b(Wd(Vb,"users"),Kb("courierCode","==",e||""),Kb("role","==","admin")),n=await rp(t);return n.empty?null:{id:n.docs[0].id,...n.docs[0].data()}},sx=async(e,t)=>{if(!e||!t)return null;const n=Gb(e),r=$b(Wd(Vb,"users"),Kb("username","==",n||""),Kb("password","==",t||"")),i=await rp(r);return i.empty?null:{id:i.docs[0].id,...i.docs[0].data()}},ox=async e=>{if(!e)return null;const t=$b(Wd(Vb,"users"),Kb("username","==",Gb(e))),n=await rp(t);return n.empty?null:{id:n.docs[0].id,...n.docs[0].data()}},ax=e("n",async(e,t)=>{try{const n=Yd(Vb,"users",e);return await ip(n,Qb(t),{merge:!0})}catch(Ap){throw console.error("Error in updateUserInFirestore:",Ap),Ap}}),cx=e("i",async(e,t,n)=>{try{if(!e)return void console.warn("updateLocationInFirestore: userId is missing, skipping location update");const r=Yd(Vb,"users",e);await ip(r,{location:{lat:t,lng:n,lastUpdate:(new Date).toISOString()}},{merge:!0});const i=$b(Wd(Vb,"couriers"),Kb("userId","==",e)),s=await rp(i);if(!s.empty){const e=s.docs[0],r=Yd(Vb,"couriers",e.id);await sp(r,{location:{lat:t,lng:n,lastUpdate:(new Date).toISOString()}})}}catch(Ap){console.warn("Location update failed (Firestore):",Ap.message)}}),lx=e("w",async e=>await ap(Wd(Vb,"activationCodes"),{code:e,used:!1,usedBy:null,usedAt:null,createdAt:(new Date).toISOString(),timestamp:(new Date).toISOString()})),ux=e("x",async e=>{const t=Yd(Vb,"activationCodes",e);return await op(t)}),hx=e("v",async e=>{const t=up(Vb);return e.forEach(e=>{const n=Yd(Vb,"activationCodes",e);t.delete(n)}),await t.commit()}),dx=async e=>{if(!e)return!1;const t=$b(Wd(Vb,"activationCodes"),Kb("code","==",e),Kb("used","==",!1));return!(await rp(t)).empty},fx=async(e,t)=>{try{if(!e)return!1;const n=$b(Wd(Vb,"activationCodes"),Kb("code","==",e),Kb("used","==",!1)),r=await rp(n);if(r.empty)return!1;const i=r.docs[0],s=Yd(Vb,"activationCodes",i.id);return await sp(s,{used:!0,usedBy:t||null,usedAt:(new Date).toISOString()}),!0}catch(Ap){throw console.error("Error in validateAndUseActivationCodeToFirestore:",Ap),Ap}},px=async e=>{try{return await ap(Wd(Vb,"subscribers"),{...Jb(e),timestamp:(new Date).toISOString()})}catch(Ap){throw console.error("Error in addSubscriberToFirestore:",Ap),Ap}},mx=async(e,t)=>{try{const n=Yd(Vb,"subscribers",e);return await sp(n,Jb(t))}catch(Ap){throw console.error("Error in updateSubscriberInFirestore:",Ap),Ap}},gx=async e=>{const t=Yd(Vb,"subscribers",e);return await op(t)},yx=async(e,t)=>{const n=up(Vb);return e.forEach(e=>{const r=Yd(Vb,"subscribers",e);n.update(r,t)}),await n.commit()},_x=async e=>{const t=up(Vb);return e.forEach(e=>{const n=Yd(Vb,"subscribers",e);t.delete(n)}),await t.commit()},wx=async e=>{try{return await ap(Wd(Vb,"products"),{...e,timestamp:(new Date).toISOString()})}catch(Ap){throw console.error("Error in addProductToFirestore:",Ap),Ap}},vx=async(e,t)=>{const n=Yd(Vb,"products",e);return await sp(n,t)},bx=async e=>{const t=Yd(Vb,"products",e);return await op(t)},xx=async e=>await ap(Wd(Vb,"suppliers"),{...e,timestamp:(new Date).toISOString()}),Ix=async(e,t)=>{const n=Yd(Vb,"suppliers",e);return await sp(n,t)},Cx=async e=>await ap(Wd(Vb,"couriers"),{...e,timestamp:(new Date).toISOString(),cash:0,currentStock:{water:0,tube:0},status:"Müsait"}),Tx=async(e,t)=>{const n=Yd(Vb,"couriers",e);return await sp(n,t)},Sx=async e=>{const t=Yd(Vb,"couriers",e);return await op(t)},Ex=async e=>{try{return await ap(Wd(Vb,"expenses"),{...e,timestamp:(new Date).toISOString()})}catch(Ap){throw console.error("Error in addExpenseToFirestore:",Ap),Ap}},kx=async(e,t)=>{const n=Yd(Vb,"expenses",e);return await sp(n,t)},Nx=async e=>{const t=Yd(Vb,"expenses",e);return await op(t)},Ax=async e=>{try{return await ap(Wd(Vb,"orders"),{...e,timestamp:(new Date).toISOString()})}catch(Ap){throw console.error("Error in addOrderToFirestore:",Ap),Ap}},Dx=async(e,t)=>{const n=Yd(Vb,"orders",e);return await sp(n,t)},Px=async e=>{const t=Yd(Vb,"orders",e);return await op(t)},Rx=async(e,t)=>{const n=Yd(Vb,"orders",e);return await sp(n,{status:t})},Ox=async e=>await ap(Wd(Vb,"categories"),{...e,timestamp:(new Date).toISOString()}),Mx=async e=>{const t=Yd(Vb,"categories",e);return await op(t)},Lx=async e=>await ap(Wd(Vb,"reconciliations"),{...e,timestamp:(new Date).toISOString()}),Fx=async e=>{try{return await ap(Wd(Vb,"incoming_calls"),{...e,timestamp:(new Date).toISOString()})}catch(Ap){console.error("Error in addIncomingCallToFirestore:",Ap)}},jx=async e=>{try{await op(Yd(Vb,"incoming_calls",e))}catch(Ap){console.error("Error in deleteIncomingCallFromFirestore:",Ap)}},Vx=async e=>{try{if(!e)return void console.warn("clearIncomingCallsFromFirestore: businessId is missing");const t=$b(Wd(Vb,"incoming_calls"),Kb("businessId","==",e)),n=(await rp(t)).docs.map(e=>op(e.ref));await Promise.all(n)}catch(Ap){console.error("Error in clearIncomingCallsFromFirestore:",Ap)}},qx=async(e,t,n={})=>{try{return await ap(Wd(Vb,"device_commands"),{deviceId:e,command:t,payload:n,status:"pending",timestamp:(new Date).toISOString()})}catch(Ap){console.error("Error in sendDeviceCommand:",Ap)}},Ux=Object.freeze(Object.defineProperty({__proto__:null,addActivationCodeToFirestore:lx,addCategoryToFirestore:Ox,addCourierToFirestore:Cx,addExpenseToFirestore:Ex,addIncomingCallToFirestore:Fx,addOrderToFirestore:Ax,addProductToFirestore:wx,addReconciliationToFirestore:Lx,addSubscriberToFirestore:px,addSupplierToFirestore:xx,bulkDeleteActivationCodesFromFirestore:hx,bulkDeleteSubscribersFromFirestore:_x,bulkUpdateSubscribersInFirestore:yx,checkActivationCode:dx,checkUserRegistrationConflicts:Xb,clearIncomingCallsFromFirestore:Vx,deleteActivationCodeFromFirestore:ux,deleteCategoryFromFirestore:Mx,deleteCourierFromFirestore:Sx,deleteExpenseFromFirestore:Nx,deleteIncomingCallFromFirestore:jx,deleteOrderFromFirestore:Px,deleteProductFromFirestore:bx,deleteSubscriberFromFirestore:gx,findMatchingSubscriberForCustomer:Zb,getBusinessByCourierCode:ix,getUserByCredentials:sx,getUserByUsername:ox,normalizeEmail:Wb,normalizePhone:Yb,normalizeUsername:Hb,registerUserToFirestore:rx,sendDeviceCommand:qx,subscribeToCollection:tx,subscribeToUser:nx,syncCustomerRegistrationWithSubscriber:ex,updateCourierInFirestore:Tx,updateExpenseInFirestore:kx,updateLocationInFirestore:cx,updateOrderInFirestore:Dx,updateOrderStatusInFirestore:Rx,updateProductInFirestore:vx,updateSubscriberInFirestore:mx,updateSupplierInFirestore:Ix,updateUserInFirestore:ax,validateAndUseActivationCodeToFirestore:fx},Symbol.toStringTag,{value:"Module"}));e("D",Ux);const zx=()=>{if("undefined"==typeof window)return null;try{return window.localStorage}catch(Ap){return console.warn("localStorage is unavailable.",Ap),null}},Bx=e("s",(e,t=null)=>{const n=zx();if(!n)return t;try{return n.getItem(e)??t}catch(Ap){return console.warn(`Could not read localStorage key: ${e}`,Ap),t}}),Kx=e("m",(e,t)=>{const n=zx();if(!n)return!1;try{return n.setItem(e,t),!0}catch(Ap){return console.warn(`Could not write localStorage key: ${e}`,Ap),!1}}),$x=e=>{const t=zx();if(!t)return!1;try{return t.removeItem(e),!0}catch(Ap){return console.warn(`Could not remove localStorage key: ${e}`,Ap),!1}},Gx=e=>{const t=Number(e);return Number.isFinite(t)?t:0},Hx=e("u",(Wx=d((e,t)=>({currentUser:null,businesses:[],subscribers:[],products:[],orders:[],couriers:[],suppliers:[],expenses:[],categories:[],reconciliations:[],activationCodes:[],incomingCalls:[],activeCall:null,accounting:{dailyExpenses:[],dailyIncome:0,supplierDebt:0},notifications:[],isSyncing:!1,syncError:null,unsubscribers:[],setUser:t=>e({currentUser:t}),cleanupListeners:()=>{const n=t().unsubscribers;n&&n.length>0&&n.forEach(e=>{"function"==typeof e&&e()}),e({unsubscribers:[],isSyncing:!1})},setActiveCall:t=>e({activeCall:t}),clearActiveCall:()=>e({activeCall:null}),clearData:()=>e({subscribers:[],products:[],orders:[],couriers:[],suppliers:[],expenses:[],categories:[],reconciliations:[],incomingCalls:[],accounting:{dailyExpenses:[],dailyIncome:0,supplierDebt:0},notifications:[]}),getBusinessId:()=>{const e=t().currentUser;return e?"admin"===(e.role||"").toLowerCase()?e.id:e.businessId:null},addIncomingCall:async e=>{const n=t().getBusinessId();n&&await Fx({...e,businessId:n,status:"Cevapsız",timestamp:(new Date).toISOString()})},deleteIncomingCall:async e=>{await jx(e)},sendDeviceCommand:async(e,t,n)=>{if(await qx(e,t,n),e){const n=t.toLowerCase();console.log(`Sending remote command to device ${e}: ${n}`)}},clearIncomingCalls:async()=>{const e=t().getBusinessId();e&&await Vx(e)},updateIncomingCall:(t,n)=>e(e=>({incomingCalls:e.incomingCalls.map(e=>e.id===t?{...e,...n}:e)})),initFirestoreSync:()=>{const n=t().currentUser;if(n)try{const r=t().unsubscribers;r&&r.length>0&&r.forEach(e=>{"function"==typeof e&&e()});const i=[];e({isSyncing:!0,syncError:null,unsubscribers:[]});const s=(n.role||"").toLowerCase(),o=e=>{"function"==typeof e&&i.push(e)},a=n=>{console.error("Sync error:",n),e({syncError:n.message||"Veri senkronizasyon hatası"}),t().addNotification("Veri bağlantısı hatası: "+(n.message||"Check connection"),"error")};if(o(nx(n.id,t=>{t&&e(e=>{if(!e.currentUser)return e;const n={...e.currentUser,...t};return!n.role&&e.currentUser?.role&&(n.role=e.currentUser.role),{currentUser:n}})},a)),"developer"===s)return o(tx("users",t=>e({businesses:t}),null,{onError:a})),o(tx("subscribers",t=>e({subscribers:t}),"timestamp",{onError:a})),o(tx("orders",t=>e({orders:t}),"timestamp",{onError:a})),o(tx("products",t=>e({products:t}),"timestamp",{onError:a})),o(tx("suppliers",t=>e({suppliers:t}),"timestamp",{onError:a})),o(tx("couriers",t=>e({couriers:t}),null,{onError:a})),o(tx("expenses",t=>e({expenses:t}),"timestamp",{onError:a})),o(tx("categories",t=>e({categories:t}),"timestamp",{onError:a})),o(tx("reconciliations",t=>e({reconciliations:t}),"timestamp",{onError:a})),o(tx("activationCodes",t=>e({activationCodes:t}),"createdAt",{onError:a})),void e({unsubscribers:i,isSyncing:!1});if(o(tx("users",t=>e({businesses:t}),null,{field:"role",operator:"==",value:"admin",onError:a})),"customer"===s)return o(tx("orders",t=>e({orders:t}),"timestamp",{field:"customerId",operator:"==",value:n.id,onError:a})),void e({unsubscribers:i,isSyncing:!1});const c="admin"===s?n.id:n.businessId;if(!c)return console.warn("initFirestoreSync: businessId is missing for role requiring it, skipping detailed sync",{userRole:s,userId:n.id}),void e({unsubscribers:i,isSyncing:!1});const l={field:"businessId",operator:"==",value:c,onError:a};o(tx("subscribers",t=>e({subscribers:t}),"timestamp",l)),o(tx("orders",t=>e({orders:t}),"timestamp",l)),o(tx("products",t=>e({products:t}),"timestamp",l)),o(tx("suppliers",t=>e({suppliers:t}),"timestamp",l)),o(tx("couriers",t=>e({couriers:t}),null,l)),o(tx("expenses",t=>e({expenses:t}),"timestamp",l)),o(tx("categories",t=>e({categories:t}),"timestamp",l)),o(tx("reconciliations",t=>e({reconciliations:t}),"timestamp",l)),o(tx("incoming_calls",t=>e({incomingCalls:t}),"timestamp",l)),e({unsubscribers:i,isSyncing:!1}),setTimeout(()=>{t().checkAutoSuspensions()},3e3)}catch(r){console.error("initFirestoreSync crashed:",r),e({syncError:r?.message||"Veri senkronizasyon hatası",isSyncing:!1,unsubscribers:[]}),t().addNotification("Veri bağlantısı hatası: "+(r?.message||"Check connection"),"error")}},addNotification:(t,n="info",r=3e3)=>{const i=Date.now();e(e=>({notifications:[...e.notifications,{id:i,message:t,type:n}]})),r>0&&setTimeout(()=>{e(e=>({notifications:e.notifications.filter(e=>e.id!==i)}))},r)},removeNotification:t=>{e(e=>({notifications:e.notifications.filter(e=>e.id!==t)}))},selectBusinessForCustomer:t=>{t?tx("products",t=>e({products:t}),"timestamp",{field:"businessId",operator:"==",value:t}):e({products:[]})},setSubscribers:t=>e({subscribers:t}),addSubscriber:async e=>await px({...e,businessId:t().getBusinessId()}),updateSubscriber:async(e,t)=>{await mx(e,t)},deleteSubscriber:async e=>{await gx(e)},bulkUpdateSubscribers:async(e,t)=>{await yx(e,t)},bulkDeleteSubscribers:async e=>{await _x(e)},addProduct:async e=>(await wx({...e,businessId:t().getBusinessId()})).id,updateProduct:async(e,t)=>{await vx(e,t)},deleteProduct:async e=>{await bx(e)},addSupplier:async e=>{await xx({...e,businessId:t().getBusinessId()})},updateSupplier:async(e,t)=>{await Ix(e,t)},addCourier:async e=>{await Cx({...e,businessId:t().getBusinessId()})},addCourierAccount:async e=>{const n=t().getBusinessId();return await rx({...e,businessId:n,role:"courier",status:"Active"})},updateCourier:async(e,t)=>{await Tx(e,t)},deleteCourier:async e=>{await Sx(e)},addCategory:async e=>{await Ox({...e,businessId:t().getBusinessId()})},deleteCategory:async e=>{await Mx(e)},updateStock:async(e,n)=>{const r=t().products.find(t=>t.id===e);if(!r)return;const i=t().categories.find(e=>e.id===r.type),s=(i?.label||"").toLowerCase(),o=s.includes("damacana")||s.includes("tüp"),a={stock:(r.stock||0)+n};o&&(a.emptyStock=(r.emptyStock||0)-n),await vx(e,a)},applyCompletedOrderStock:async e=>{if(!e)return;const n=Array.isArray(e.items)&&e.items.length>0?e.items:[{productId:e.productId,quantity:e.quantity||1,includeDeposit:e.includeDeposit}];for(const r of n){const e=r.productId;if(!e)continue;const n=t().products.find(t=>t.id===e);if(!n)continue;const i=t().categories.find(e=>e.id===n.type),s=(i?.label||"").toLowerCase(),o=s.includes("damacana")||s.includes("tÃ¼p")||s.includes("tüp"),a=Gx(r.quantity||0);if(a<=0)continue;const c={stock:Gx(n.stock)-a};o&&!r.includeDeposit&&(c.emptyStock=Gx(n.emptyStock)+a),await vx(n.id,c)}},addOrder:async e=>{const n=new Date,r=`${n.getFullYear().toString().slice(-2)}${(n.getMonth()+1).toString().padStart(2,"0")}${n.getDate().toString().padStart(2,"0")}-${n.getHours().toString().padStart(2,"0")}${n.getMinutes().toString().padStart(2,"0")}${n.getSeconds().toString().padStart(2,"0")}`,i={...e,orderNumber:r,status:e.status||"Hazırlanıyor",timestamp:n.toISOString()},s=e.businessId||("admin"===t().currentUser?.role?t().currentUser?.id:t().currentUser?.businessId);i.businessId=s;const o=await Ax(i);return"Tamamlandı"!==i.status&&"TamamlandÄ±"!==i.status||await t().applyCompletedOrderStock(i),s&&fetch("https://bayios.com/api/send-notification",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUserId:s,title:"Yeni Sipariş Alındı! 🛍️",body:`${i.customer} tarafından yeni bir sipariş oluşturuldu: ${i.product}`})}).catch(e=>console.log("Push error:",e)),o},updateOrder:async(e,t)=>{await Dx(e,t)},deleteOrder:async e=>{await Px(e)},updateOrderStatus:async(e,n)=>{if("string"==typeof e){const r=t().orders.find(t=>t.id===e);if(!r)return;const i=r.status;if(await Rx(e,n),"Tamamlandı"===n&&"Tamamlandı"!==i){const e=t().products.find(e=>e.id===r.productId);if(e){const n=t().categories.find(t=>t.id===e.type),i=(n?.label||"").toLowerCase(),s=i.includes("damacana")||i.includes("tüp"),o={stock:(e.stock||0)-(r.quantity||1)};s&&(o.emptyStock=(e.emptyStock||0)+(r.quantity||1)),await vx(e.id,o)}}if("true"===Bx("bayios-pref-sms")&&r.phone){let e="";"Yolda"===n||"Kurye Yolda"===n?e=`Merhaba ${r.customer} 👋,\n\nBayiOS sisteminden verdiğiniz siparişiniz yola çıkmıştır.\n📌 Tutar: ₺${r.amount}\n🚚 Teslimat: ${r.courier||"Kurye"}\n\nBizi tercih ettiğiniz için teşekkür ederiz.`:"Tamamlandı"===n&&(e="*Sipariş Teslim Edildi* ✅\n\nSiparişiniz başarıyla teslim edilmiştir. Afiyet olsun!"),e&&fetch("https://bayios.com/api/send-message",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({clientId:r.businessId,to:r.phone,message:e})}).catch(e=>console.log("WhatsApp hook error:",e))}const s="https://bayios.com";r.customerId&&fetch(`${s}/api/send-notification`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUserId:r.customerId,title:"Sipariş Durumu Güncellendi",body:`Siparişiniz şu an: ${n}`})}).catch(e=>console.log("Push error:",e)),"Tamamlandı"===n&&r.businessId&&fetch(`${s}/api/send-notification`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUserId:r.businessId,title:"Sipariş Teslim Edildi",body:`${r.customer} isimli müşteriye ₺${r.amount} tutarındaki sipariş başarıyla teslim edildi.`})}).catch(e=>console.log("Push error:",e))}},cancelOrder:async e=>{"string"==typeof e&&await Rx(e,"İptal Edildi")},addExpense:async e=>{await Ex({...e,businessId:t().getBusinessId()})},updateExpense:async(e,t)=>{await kx(e,t)},deleteExpense:async e=>{await Nx(e)},checkAutoSuspensions:async()=>{const{subscribers:e,orders:n,updateSubscriber:r}=t(),i=new Date;for(const t of e)if("Active"===t.status){const e=n.filter(e=>e.customerId===t.id&&"Tamamlandı"===e.status);if(e.length>0){const n=e.sort((e,t)=>new Date(t.timestamp)-new Date(e.timestamp))[0],s=new Date(n.timestamp);i-s>432e7&&(console.log(`Auto-suspending subscriber ${t.name} (ID: ${t.id}) - last order was ${s}`),await r(t.firestoreId||t.id,{status:"Suspended"}))}}},updateUserSettings:async n=>{const r=t().currentUser;if(!r)return;const i={...r.settings||{},...n.settings||{}},s={...r,...n,settings:i};Object.keys(n).forEach(e=>{if(e.includes(".")){const t=e.split(".");"settings"===t[0]&&2===t.length&&(s.settings[t[1]]=n[e],delete s[e])}}),e({currentUser:s}),await ax(r.id,n)},addReconciliation:async e=>{await Lx({...e,businessId:t().getBusinessId()})}}),{name:"bayios-storage",getStorage:()=>(()=>{if("undefined"!=typeof window)try{const e="__bayios_storage_test__";return window.localStorage.setItem(e,"1"),window.localStorage.removeItem(e),window.localStorage}catch(Ap){return void console.warn("localStorage is unavailable, falling back to in-memory persistence.",Ap)}})(),partialize:e=>({currentUser:e.currentUser,notifications:e.notifications})}),Wx?l(Wx):l));var Wx;
/**
       * @license lucide-react v0.574.0 - ISC
       *
       * This source code is licensed under the ISC license.
       * See the LICENSE file in the root directory of this source tree.
       */
const Yx=(...e)=>e.filter((e,t,n)=>Boolean(e)&&""!==e.trim()&&n.indexOf(e)===t).join(" ").trim(),Qx=e=>{const t=(e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()))(e);return t.charAt(0).toUpperCase()+t.slice(1)};
/**
       * @license lucide-react v0.574.0 - ISC
       *
       * This source code is licensed under the ISC license.
       * See the LICENSE file in the root directory of this source tree.
       */
/**
       * @license lucide-react v0.574.0 - ISC
       *
       * This source code is licensed under the ISC license.
       * See the LICENSE file in the root directory of this source tree.
       */
var Jx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};
/**
       * @license lucide-react v0.574.0 - ISC
       *
       * This source code is licensed under the ISC license.
       * See the LICENSE file in the root directory of this source tree.
       */const Xx=e=>{for(const t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1},Zx=i.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:s="",children:o,iconNode:a,...c},l)=>i.createElement("svg",{ref:l,...Jx,width:t,height:t,stroke:e,strokeWidth:r?24*Number(n)/Number(t):n,className:Yx("lucide",s),...!o&&!Xx(c)&&{"aria-hidden":"true"},...c},[...a.map(([e,t])=>i.createElement(e,t)),...Array.isArray(o)?o:[o]])),eI=e("d",(e,t)=>{const n=i.forwardRef(({className:n,...r},s)=>{return i.createElement(Zx,{ref:s,iconNode:t,className:Yx(`lucide-${o=Qx(e),o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...r});var o});return n.displayName=Qx(e),n}),tI=e("f",eI("bell",[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]])),nI=e("B",eI("building-2",[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]])),rI=e("C",eI("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]])),iI=e("a",eI("circle-check",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])),sI=e("k",eI("circle-question-mark",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]])),oI=e("t",eI("cpu",[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]])),aI=e("l",eI("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])),cI=e("E",eI("eye-off",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]])),lI=e("I",eI("info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]])),uI=e("L",eI("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])),hI=eI("log-in",[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]]),dI=e("M",eI("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]])),fI=eI("phone-off",[["path",{d:"M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272",key:"1wngk7"}],["path",{d:"M22 2 2 22",key:"y4kqgn"}],["path",{d:"M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",key:"10hv5p"}]]),pI=e("g",eI("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]])),mI=e("P",eI("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])),gI=e("j",eI("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])),yI=e("b",eI("shopping-bag",[["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}],["path",{d:"M3.103 6.034h17.794",key:"awc11p"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",key:"o988cm"}]])),_I=e("S",eI("shopping-cart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]])),wI=e("T",eI("truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]])),vI=e("r",eI("user-plus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]])),bI=e("U",eI("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]])),xI=e("X",eI("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])),II=({children:e})=>e,CI="dev_admin_master",TI="BayiosDeveloper2026!",SI={id:"developer_root",name:"Sistem Mimarı",role:"developer"},EI=({onLogin:e})=>{const[t,n]=i.useState(!1),[r,o]=i.useState(""),[a,c]=i.useState(""),[l,u]=i.useState(""),[h,d]=i.useState(""),[f,p]=i.useState("isletme"),[m,g]=i.useState("isletme"),[y,_]=i.useState(""),[w,v]=i.useState(""),[b,x]=i.useState((()=>{if("undefined"==typeof window)return!1;try{return"true"===Bx("bayios-auto-login")}catch(I){return console.warn("Auto-login preference could not be read from localStorage.",I),!1}})()),[I,C]=i.useState(""),[T,S]=i.useState(""),[E,k]=i.useState("admin"),[N,A]=i.useState(!1),[D,P]=i.useState(!1),[R,O]=i.useState(!1),[M,L]=i.useState(1),[F,j]=i.useState(""),[V,q]=i.useState(""),[U,z]=i.useState(""),[B,K]=i.useState(""),[$,G]=i.useState("");return s.jsx("div",{className:"min-h-screen flex items-center justify-center p-4 sm:p-6 relative bg-slate-50 font-sans",children:s.jsx("div",{className:"relative w-full max-w-[400px]",children:s.jsxs("div",{className:"bg-white p-5 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm border border-slate-200 relative overflow-hidden",children:[s.jsxs("div",{className:"text-center mb-6",children:[s.jsxs("div",{className:"inline-flex relative mb-4 group",children:[s.jsx("div",{className:"absolute inset-0 bg-brand-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"}),s.jsx("div",{className:"relative w-16 h-16 rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden p-1",children:s.jsx("img",{src:"/favicon.png",alt:"Logo",className:"w-full h-full object-contain"})})]}),s.jsxs("h1",{className:"text-3xl sm:text-4xl font-black tracking-tight text-slate-800 mb-2 font-display",children:["BayiOS",s.jsx("span",{className:"text-blue-600",children:"."})]}),s.jsx("p",{className:"text-slate-500 text-[9px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-60 flex items-center justify-center gap-2 text-center",children:R?"Şifre Yenileme":t?"Kayıt Ol":""})]}),!R&&s.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-6 bg-white/[0.03] p-1 rounded-2xl border border-white/5",children:[{id:"admin",icon:gI,label:"İşletme"},{id:"courier",icon:wI,label:"Kurye"},{id:"customer",icon:yI,label:"Müşteri"},{id:"developer",icon:oI,label:"Geliştirici"}].map(e=>s.jsxs("button",{type:"button",onClick:()=>{k(e.id),"developer"===e.id&&t&&n(!1),t&&"developer"!==e.id||(e=>{t||(k(e),"admin"===e?(p("isletme"),g("isletme")):"courier"===e?(p("kurye"),g("kurye")):"developer"===e?(p(""),g("")):(p("musteri"),g("musteri")),C(""))})(e.id)},className:"flex flex-col items-center justify-center gap-1.5 min-h-[68px] py-3 rounded-xl transition-all duration-200 relative text-center "+(E===e.id?"bg-blue-50 text-blue-600 shadow-sm":"text-slate-500 hover:bg-slate-50"),children:[s.jsx(e.icon,{size:18,className:"transition-all duration-200 "+(E===e.id?"text-blue-600":"opacity-50")}),s.jsx("span",{className:"text-[8px] font-black uppercase tracking-wide sm:tracking-widest leading-tight px-1",children:e.label})]},e.id))}),R?s.jsxs("form",{onSubmit:async e=>{e.preventDefault(),C(""),S(""),P(!0);try{if(1===M){if(!F)throw new Error("Lütfen kullanıcı adınızı giriniz.");const e=await ox(F);if(!e)throw new Error("Bu kullanıcı adına sahip bir hesap bulunamadı.");e.securityQuestion?q(e.securityQuestion):q("Bu hesap için güvenlik sorusu ayarlanmamış. Lütfen yönetici ile iletişime geçin."),L(2)}else if(2===M){const e=await ox(F);if(!e.securityAnswer||e.securityAnswer!==(B||"").toLowerCase().trim())throw new Error("Güvenlik sorusu cevabı hatalı!");{const t=(()=>{const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t="abcdefghijklmnopqrstuvwxyz",n="0123456789";let r="";r+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(26*Math.random())],r+=t[Math.floor(26*Math.random())],r+=n[Math.floor(10*Math.random())];for(let i=0;i<5;i++)r+=e[Math.floor(62*Math.random())];return r.split("").sort(()=>.5-Math.random()).join("")})();await ax(e.id,{password:t}),G(t),S("Tebrikler! Doğrulama başarılı."),L(3)}}}catch(t){C(t.message||"Bilinmeyen bir hata oluştu.")}finally{P(!1)}},className:"space-y-4",children:[1===M&&s.jsxs("div",{className:"space-y-1.5 animate-in fade-in slide-in-from-top-2",children:[s.jsx("label",{className:"text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50",children:"Kullanıcı Adı"}),s.jsxs("div",{className:"relative group",children:[s.jsx(bI,{className:"absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-all duration-200",size:16}),s.jsx("input",{type:"text",required:!0,className:"w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"Kullanıcı adınızı girin",value:F,onChange:e=>j(e.target.value)})]})]}),2===M&&s.jsxs("div",{className:"space-y-4 animate-in fade-in slide-in-from-top-2",children:[s.jsxs("div",{className:"bg-blue-50 p-4 rounded-2xl border border-blue-100",children:[s.jsx("p",{className:"text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1",children:"Güvenlik Sorunuz:"}),s.jsx("p",{className:"text-sm font-bold text-slate-800",children:V})]}),s.jsxs("div",{className:"space-y-1.5",children:[s.jsx("label",{className:"text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50",children:"Cevabınız"}),s.jsxs("div",{className:"relative group",children:[s.jsx(sI,{className:"absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-all duration-200",size:16}),s.jsx("input",{type:"text",required:!0,className:"w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"Güvenlik sorusu cevabı",value:B,onChange:e=>K(e.target.value)})]})]})]}),3===M&&s.jsx("div",{className:"space-y-4 animate-in zoom-in duration-300",children:s.jsxs("div",{className:"bg-emerald-50 p-6 rounded-[2rem] border-2 border-emerald-100 text-center",children:[s.jsx("div",{className:"w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20",children:s.jsx(gI,{className:"text-white",size:24})}),s.jsx("p",{className:"text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2",children:"Yeni Şifreniz:"}),s.jsx("div",{className:"bg-white py-4 rounded-2xl border border-emerald-200 shadow-inner mb-4",children:s.jsx("p",{className:"text-2xl font-black text-slate-800 tracking-wider font-mono",children:$})}),s.jsx("p",{className:"text-[9px] text-slate-500 font-bold leading-relaxed",children:"Lütfen bu şifreyi güvenli bir yere not edin. Giriş yaptıktan sonra ayarlar panelinden şifrenizi değiştirebilirsiniz."})]})}),I&&s.jsxs("div",{className:"bg-rose-500/10 text-rose-400 p-4 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 animate-shake uppercase tracking-widest border border-rose-500/20 mt-2",children:[s.jsx(lI,{size:14})," ",I]}),T&&s.jsxs("div",{className:"bg-emerald-500/10 text-emerald-400 p-4 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 uppercase tracking-widest border border-emerald-500/20 mt-2",children:[s.jsx(gI,{size:14})," ",T]}),M<=2&&s.jsx("button",{type:"submit",disabled:D,className:"w-full py-4.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] shadow-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98] mt-6 bg-slate-900 text-white hover:bg-slate-800",children:D?s.jsx("div",{className:"w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"}):1===M?"DEVAM ET":"ŞİFREYİ SIFIRLA"}),s.jsx("button",{type:"button",onClick:()=>{O(!1),L(1),C(""),S(""),j(""),q(""),z("")},className:"w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all font-bold "+(3===M?"bg-slate-900 text-white hover:bg-slate-800 mt-4":"text-slate-500 hover:text-slate-800"),children:3===M?"GİRİŞ EKRANINA GİT":"Giriş Ekranına Dön"})]}):s.jsxs("form",{onSubmit:async n=>{n.preventDefault(),C(""),S(""),P(!0);try{if(t){if("developer"===E)throw new Error("Geliştirici hesapları bu ekrandan oluşturulamaz. Lütfen mevcut geliştirici hesabınızla giriş yapın.");if(!(r&&f&&m&&V&&U))throw new Error("Lütfen zorunlu alanları, güvenlik sorusu dahil, doldurun.");if(("customer"===E||"admin"===E)&&!a)throw new Error("Lütfen açık adresinizi girin.");if("courier"===E&&!y)throw new Error("Kuryeler için işletme kodu zorunludur.");let t="",n=null;if("courier"===E){const e=await ix(y);if(!e)throw new Error("Geçersiz kurye kodu. Lütfen işletmenizden doğru kodu isteyin.");t=e.id}const s=await Xb({username:f,email:h,phone:l});if(s.username)throw new Error("Bu kullanıcı adı zaten kayıtlı. Lütfen başka bir kullanıcı adı seçin.");if(s.email)throw new Error("Bu e-posta adresi ile zaten kayıt var. Lütfen farklı bir e-posta kullanın.");if(s.phone)throw new Error("Bu telefon numarası ile zaten kayıt var. Lütfen farklı bir numara kullanın.");if("customer"===E&&(n=await Zb({phone:l,email:h}),n?.businessId&&(t=n.businessId)),"admin"===E){if(!w)throw new Error("İşletme kaydı için geçerli bir aktivasyon kodu gereklidir.");if(!(await dx(w)))throw new Error("Geçersiz veya kullanılmış aktivasyon kodu.")}const o={name:r,username:f,password:m,role:E,address:a||"",phone:l||"",email:h||"",securityQuestion:V,securityAnswer:(U||"").toLowerCase().trim(),businessId:"admin"===E?"":t,linkedSubscriberId:"customer"===E&&n?.id||"",linkedSubscriberDocId:"customer"===E&&n?.docId||""};"admin"===E&&(o.subscriptionEndsAt=new Date(Date.now()+31536e6).toISOString());const c=await rx(o),u={id:c.id,...o};if("customer"===E&&n&&await ex(u,n),"admin"===E){await fx(w,c.id);try{await zw(qw(qb,`active_calls/${c.id}`),{phone:"",businessPhone:l||"",lastCallAt:(new Date).toISOString()})}catch(i){console.error("Firebase RTDB initialization error:",i)}}return S("Kayıt başarılı! Sisteme giriş yapılıyor..."),b?Kx("bayios-auto-login","true"):$x("bayios-auto-login"),void setTimeout(()=>{e(u)},500)}{if("developer"===E){if(f===CI&&m===TI)return b?Kx("bayios-auto-login","true"):$x("bayios-auto-login"),void e(SI);throw new Error("Geliştirici kullanıcı adı veya şifresi hatalı.")}if("admin"===E&&"isletme"===f&&"isletme"===m)return void e({id:"demo-admin-id",name:"Yönetici",role:"admin"});if("courier"===E&&"kurye"===f&&"kurye"===m)return void e({id:"demo-courier-id",name:"Mehmet Kurye",role:"courier",businessId:"demo-admin-id"});if("customer"===E&&"musteri"===f&&"musteri"===m)return void e({id:"demo-customer-id",name:"Ahmet Yılmaz",role:"customer",address:"Çınar Mah. 12. Cad. No:5 D:8"});const t=await sx(f,m);if(t&&t.role===E){if("admin"===t.role&&t.subscriptionEndsAt&&new Date(t.subscriptionEndsAt).getTime()<Date.now())return void C("Abonelik süreniz dolmuştur. Lütfen sistem yöneticisi/geliştiricisi ile görüşün.");if(t.isFrozen)return void C("Hesabınız dondurulmuştur. Lütfen sistem yöneticisi ile görüşün.");if(b?Kx("bayios-auto-login","true"):$x("bayios-auto-login"),"admin"===t.role)try{await zw(qw(qb,`active_calls/${t.id}`),{phone:"",businessPhone:t.phone||"",lastLoginAt:(new Date).toISOString()})}catch(i){console.error("Firebase RTDB sync error on login:",i)}e(t)}else C("Hatalı kullanıcı adı, şifre veya rol seçimi!")}}catch(s){C(s.message||"Bilinmeyen bir hata oluştu.")}finally{P(!1)}},className:"space-y-4",children:[t&&s.jsxs("div",{className:"space-y-1.5 animate-in fade-in slide-in-from-top-2",children:[s.jsxs("label",{className:"text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50",children:["Ad Soyad ","admin"===E?"/ İşletme Adı":""]}),s.jsx("div",{className:"relative group",children:s.jsx("input",{type:"text",required:!0,className:"w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 px-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"Tam adınız veya ünvanınız",value:r,onChange:e=>o(e.target.value)})})]}),t&&s.jsxs("div",{className:"space-y-1.5 animate-in fade-in slide-in-from-top-2",children:[s.jsx("label",{className:"text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50",children:"Telefon Numarası"}),s.jsx("div",{className:"relative group",children:s.jsx("input",{type:"tel",className:"w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 px-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"İletişim Numaranız",value:l,onChange:e=>u(e.target.value)})})]}),t&&s.jsxs("div",{className:"space-y-1.5 animate-in fade-in slide-in-from-top-2",children:[s.jsx("label",{className:"text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50",children:"E-Posta Adresi"}),s.jsx("div",{className:"relative group",children:s.jsx("input",{type:"email",className:"w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 px-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"E-Posta Adresiniz",value:h,onChange:e=>d(e.target.value)})})]}),t&&("customer"===E||"admin"===E)&&s.jsxs("div",{className:"space-y-1.5 animate-in fade-in slide-in-from-top-2",children:[s.jsx("label",{className:"text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50",children:"Adres"}),s.jsx("div",{className:"relative group",children:s.jsx("input",{type:"text",required:!0,className:"w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 px-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"Açık Adresiniz",value:a,onChange:e=>c(e.target.value)})})]}),t&&"courier"===E&&s.jsxs("div",{className:"space-y-1.5 animate-in fade-in slide-in-from-top-2",children:[s.jsx("label",{className:"text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50",children:"Kurye Kodu (İşletmeden Alınan)"}),s.jsxs("div",{className:"relative group",children:[s.jsx(gI,{className:"absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-all duration-200",size:16}),s.jsx("input",{type:"text",required:!0,className:"w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"İşletme kurye kodunu girin",value:y,onChange:e=>_(e.target.value)})]})]}),t&&"admin"===E&&s.jsxs("div",{className:"space-y-1.5 animate-in fade-in slide-in-from-top-2",children:[s.jsx("label",{className:"text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50 text-blue-600",children:"Sistem Aktivasyon Kodu"}),s.jsxs("div",{className:"relative group",children:[s.jsx("input",{type:"text",required:!0,className:"w-full bg-blue-50 border border-blue-200 text-slate-800 placeholder-slate-400 px-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"BAYIOS-XXXX-YYYY",value:w,onChange:e=>v(e.target.value)}),s.jsx(lI,{className:"absolute right-4 top-1/2 -translate-y-1/2 text-blue-500/50",size:16})]})]}),s.jsxs("div",{className:"space-y-1.5",children:[s.jsx("label",{className:"text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50",children:"Kullanıcı Adı"}),s.jsxs("div",{className:"relative group",children:[s.jsx(bI,{className:"absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-all duration-200",size:16}),s.jsx("input",{type:"text",required:!0,className:"w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"Kullanıcı adı",value:f,onChange:e=>p(e.target.value)})]})]}),s.jsxs("div",{className:"space-y-1.5 border-b border-transparent",children:[s.jsx("label",{className:"text-slate-500 text-[8px] font-black ml-1 uppercase tracking-widest opacity-50",children:"Şifre"}),s.jsxs("div",{className:"relative group",children:[s.jsx(uI,{className:"absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-all duration-200",size:16}),s.jsx("input",{type:N?"text":"password",required:!0,className:"w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 pl-12 pr-12 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"Şifreniz",value:m,onChange:e=>g(e.target.value)}),s.jsx("button",{type:"button",onClick:()=>A(!N),className:"absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-all duration-200",children:N?s.jsx(cI,{size:18}):s.jsx(aI,{size:18})})]})]}),t&&s.jsxs("div",{className:"space-y-4 pt-2 border-t border-slate-100 animate-in fade-in slide-in-from-top-2",children:[s.jsxs("div",{className:"space-y-1.5",children:[s.jsx("label",{className:"text-blue-600 text-[8px] font-black ml-1 uppercase tracking-widest",children:"Güvenlik Sorusu (Şifre kurtarma için)"}),s.jsxs("div",{className:"relative group",children:[s.jsx(sI,{className:"absolute left-5 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-500 transition-all duration-200",size:16}),s.jsx("input",{type:"text",required:!0,className:"w-full bg-blue-50/50 border border-blue-100 text-slate-800 placeholder-slate-400 pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"Örn: İlk evcil hayvanınızın adı?",value:V,onChange:e=>q(e.target.value)})]})]}),s.jsxs("div",{className:"space-y-1.5",children:[s.jsx("label",{className:"text-blue-600 text-[8px] font-black ml-1 uppercase tracking-widest",children:"Güvenlik Cevabı"}),s.jsxs("div",{className:"relative group",children:[s.jsx(gI,{className:"absolute left-5 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-500 transition-all duration-200",size:16}),s.jsx("input",{type:"text",required:!0,className:"w-full bg-blue-50/50 border border-blue-100 text-slate-800 placeholder-slate-400 pl-12 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm",placeholder:"Cevabınız",value:U,onChange:e=>z(e.target.value)})]})]})]}),!t&&s.jsxs("div",{className:"flex items-center justify-between px-1",children:[s.jsxs("label",{className:"flex items-center gap-2 cursor-pointer group",children:[s.jsxs("div",{className:"relative flex items-center justify-center",children:[s.jsx("input",{type:"checkbox",className:"peer appearance-none w-5 h-5 rounded-lg border-2 border-slate-200 checked:bg-blue-600 checked:border-blue-600 transition-all duration-200",checked:b,onChange:e=>x(e.target.checked)}),s.jsx(gI,{className:"absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none",size:12})]}),s.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-700 transition-colors",children:"Beni Hatırla"})]}),s.jsx("button",{type:"button",onClick:()=>{O(!0),C(""),S("")},className:"text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors",children:"Şifremi Unuttum"})]}),I&&s.jsxs("div",{className:"bg-rose-500/10 text-rose-400 p-4 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 animate-shake uppercase tracking-widest border border-rose-500/20 mt-2",children:[s.jsx(lI,{size:14})," ",I]}),T&&s.jsxs("div",{className:"bg-emerald-500/10 text-emerald-400 p-4 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 uppercase tracking-widest border border-emerald-500/20 mt-2",children:[s.jsx(gI,{size:14})," ",T]}),s.jsx("button",{type:"submit",disabled:D,className:"w-full py-4.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] shadow-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98] mt-6 relative overflow-hidden group "+("admin"===E?"bg-slate-900 text-white hover:bg-slate-800":"courier"===E?"bg-blue-600 text-white hover:bg-blue-700":"developer"===E?"bg-slate-950 text-white hover:bg-slate-900":"bg-orange-600 text-white hover:bg-orange-700"),children:D?s.jsx("div",{className:"w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"}):s.jsxs(s.Fragment,{children:[s.jsx("span",{className:"relative z-10",children:t?"KAYIT OL":"GİRİŞ YAP"}),t?s.jsx(vI,{size:16}):s.jsx(hI,{size:16})]})}),"developer"!==E&&s.jsx("div",{className:"text-center pt-2",children:s.jsx("button",{type:"button",onClick:()=>{n(!t),C(""),S(""),p(""),g(""),q(""),z("")},className:"w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-slate-200 shadow-sm transition-all active:scale-[0.98]",children:t?"Zaten hesabınız var mı? Giriş Yapın":"Hesabınız yok mu? Yeni Kayıt Oluşturun"})})]}),s.jsx("div",{className:"mt-8 pt-6 border-t border-white/[0.05] text-center",children:s.jsx("p",{className:"text-[9px] font-black text-slate-600 tracking-[0.2em]",children:"bilgi@bayios.com"})})]})})})},kI=e=>{const t=Number(e);return Number.isFinite(t)?t:0},NI=e("e",(e={})=>({productId:"",quantity:1,price:0,depositFee:0,includeDeposit:!1,name:"",...e})),AI=e("h",(e,t={})=>NI(e?{productId:e.id,name:e.name||"",price:kI(e.price),depositFee:kI(e.depositFee),includeDeposit:Boolean(t.includeDeposit),...t}:t)),DI=e("c",(e=[])=>e.reduce((e,t)=>{const n=(e=>{const t=Math.max(0,kI(e?.quantity||0)),n=kI(e?.price||0),r=kI(e?.depositFee||0),i=Boolean(e?.includeDeposit),s=n*t,o=i?r*t:0;return{quantity:t,price:n,depositFee:r,includeDeposit:i,productTotal:s,depositTotal:o,total:s+o}})(t);return e.quantity+=n.quantity,e.productTotal+=n.productTotal,e.depositTotal+=n.depositTotal,e.amount+=n.total,e},{quantity:0,productTotal:0,depositTotal:0,amount:0})),PI=()=>NI(),RI=(e=[])=>{const t=e.map(e=>Number.parseInt(String(e?.id??"").replace(/\D/g,""),10)).filter(e=>Number.isFinite(e));return String((t.length>0?Math.max(...t):0)+1)},OI=({isOpen:e,phone:t,deviceId:n,onClose:r,isManual:o})=>{const{subscribers:a,orders:c,products:l,addSubscriber:u,addOrder:h,addNotification:d}=Hx(),[f,p]=i.useState(null),[m,g]=i.useState(null),[y,_]=i.useState(t),[w,v]=i.useState("ringing"),[b,x]=i.useState(!1),[I,C]=i.useState(""),[T,S]=i.useState(""),[E,k]=i.useState(!1),[N,A]=i.useState([PI()]);if(i.useEffect(()=>{if(!e)return;_(t||"");const n=String(t||"").replace(/\s/g,""),r=a.find(e=>e.phone&&String(e.phone).replace(/\s/g,"")===n);if(p(r||null),C(""),S(""),k(!1),g(null),x(!1),A([PI()]),r){const e=c.filter(e=>e.customerId===r.id).sort((e,t)=>new Date(t.timestamp)-new Date(e.timestamp));if(e.length>0)g(e[0]),Array.isArray(e[0].items)&&e[0].items.length>0&&(A(e[0].items.map(e=>({productId:e.productId||l.find(t=>e.name&&t.name===e.name)?.id||"",quantity:Number(e.quantity||1),includeDeposit:Boolean(e.includeDeposit)}))),x(!0));else if(r.product){const e=l.find(e=>{const t=String(e.name||"").toLocaleLowerCase("tr-TR"),n=String(r.product||"").toLocaleLowerCase("tr-TR");return t.includes(n)||n.includes(t)});e&&(A([NI({productId:e.id,quantity:Number(r.quantity||1)})]),x(!0))}}v(o?r?"quick-order":"new-subscriber":"ringing")},[t,o,e,c,l,a]),!e)return null;const D=()=>{r(),setTimeout(()=>v("ringing"),300)},P=async e=>{if(e&&e.preventDefault(),!f)return;const t=N.map(e=>{const t=l.find(t=>String(t.id)===String(e.productId));if(!t)return null;const n=AI(t,{quantity:Number(e.quantity||1),includeDeposit:Boolean(e.includeDeposit)});return{productId:n.productId,name:n.name,price:n.price,depositFee:n.depositFee,includeDeposit:n.includeDeposit,quantity:n.quantity}}).filter(Boolean);if(0===t.length)return;const n=DI(t);await h({customer:f.name,customerId:f.id,product:t.map(e=>`${e.quantity}x ${e.name}${e.includeDeposit?" (Depozitolu)":""}`).join(", "),items:t.map(({productId:e,name:t,price:n,quantity:r,depositFee:i,includeDeposit:s})=>({productId:e,name:t,price:n,quantity:r,depositFee:i,includeDeposit:s})),quantity:n.quantity,amount:n.amount,productTotal:n.productTotal,depositTotal:n.depositTotal,courier:"-",paymentMethod:"Nakit",address:f.address||"",phone:f.phone||"",hasInvoice:!1,timestamp:(new Date).toISOString()}),d("Sipariş başarıyla oluşturuldu!","success"),D()},R=(e,t,n)=>{A(r=>r.map((r,i)=>i===e?{...r,[t]:n}:r))};return s.jsxs("div",{className:"fixed inset-0 z-[200] flex justify-end",children:[s.jsx("div",{className:"absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300",onClick:D}),s.jsxs("div",{onClick:e=>e.stopPropagation(),className:"relative w-full max-w-md h-[100dvh] shadow-2xl transition-all duration-300 animate-in slide-in-from-right "+("ringing"===w?"bg-gradient-to-b from-slate-800 to-slate-900":"bg-white"),children:["ringing"===w&&s.jsxs("div",{className:"absolute inset-0 flex flex-col items-center py-16 px-6",children:[s.jsx("h2",{className:"text-white text-3xl font-light tracking-wider mt-4 text-center",children:f?f.name:"Bilinmeyen Numara"}),s.jsx("h4",{className:"text-white/60 text-lg font-mono mt-2 tracking-widest",children:y}),f&&s.jsxs("div",{className:"flex items-center gap-2 mt-2",children:[s.jsxs("span",{className:"px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-primary/20",children:["No: ",f.id]}),f.legacyId&&s.jsxs("span",{className:"px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/20",children:["Eski No: ",f.legacyId]})]}),n&&s.jsx("div",{className:"mt-2 px-3 py-1 bg-white/10 rounded-full border border-white/5",children:s.jsxs("p",{className:"text-[9px] font-black text-white/40 uppercase tracking-[0.2em]",children:["HAT: ",n]})}),s.jsxs("div",{className:"mt-8 relative",children:[s.jsx("div",{className:"w-32 h-32 bg-white/5 rounded-full flex items-center justify-center text-white/50 relative z-10 border border-white/10 shadow-2xl",children:s.jsx(bI,{size:48})}),s.jsx("div",{className:"absolute inset-0 bg-white/10 rounded-full animate-ping duration-1000 opacity-50"}),s.jsx("div",{className:"absolute inset-[-20px] bg-white/5 rounded-full animate-ping duration-[1500ms] opacity-30"})]}),f&&s.jsxs("div",{className:"mt-8 text-center px-4 bg-white/5 py-3 rounded-2xl border border-white/10 w-full animate-in fade-in slide-in-from-bottom-4",children:[s.jsx("p",{className:"text-[10px] uppercase font-black text-brand-primary tracking-widest mb-1",children:"Mevcut Müşteri"}),s.jsx("p",{className:"text-white/80 text-xs font-medium truncate",children:f.address||"Adres tanımlı değil"})]}),s.jsxs("div",{className:"mt-auto w-full flex flex-col gap-6 px-10 pb-12",children:[b&&s.jsxs("button",{onClick:e=>{e.stopPropagation(),P()},className:"w-full bg-brand-primary text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-brand-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em] border-2 border-white/20",children:[s.jsx(_I,{size:20})," HAZIR SİPARİŞİ ONAYLA"]}),s.jsxs("div",{className:"flex justify-between w-full",children:[s.jsxs("button",{onClick:e=>{e.stopPropagation(),D()},className:"group flex flex-col items-center gap-4 active:scale-95 transition-all outline-none",children:[s.jsx("div",{className:"w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-rose-500/30 ring-4 ring-rose-500/10",children:s.jsx(fI,{size:32,className:"fill-white"})}),s.jsx("span",{className:"text-white font-black text-[12px] uppercase tracking-[0.2em] group-hover:text-rose-400 transition-colors",children:"Reddet"})]}),s.jsxs("button",{onClick:e=>{e.stopPropagation(),n&&Hx.getState().sendDeviceCommand(n,"ANSWER_CALL"),v(f?"quick-order":"new-subscriber")},className:"group flex flex-col items-center gap-4 active:scale-95 transition-all outline-none",children:[s.jsx("div",{className:"w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 ring-4 ring-emerald-500/10",children:s.jsx(pI,{size:32,className:"fill-white"})}),s.jsx("span",{className:"text-white font-black text-[12px] uppercase tracking-[0.2em] group-hover:text-emerald-400 transition-colors",children:"Cevapla"})]})]})]})]}),"new-subscriber"===w&&s.jsxs("div",{className:"p-8 animate-in fade-in slide-in-from-right duration-300",children:[s.jsxs("div",{className:"flex justify-between items-center mb-8",children:[s.jsxs("div",{children:[s.jsx("h3",{className:"text-2xl font-black text-slate-900 tracking-tight font-display uppercase",children:"Yeni Abone"}),s.jsx("p",{className:"text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 font-mono",children:y}),s.jsxs("p",{className:"text-[10px] font-black text-brand-primary uppercase tracking-widest mt-2",children:["Yeni Müşteri No: ",RI(a)]})]}),s.jsx("button",{onClick:D,className:"p-2 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm",children:s.jsx(fI,{size:20})})]}),s.jsxs("form",{onSubmit:async e=>{if(e.preventDefault(),!I.trim())return;const t={id:RI(a),name:I,phone:y,address:T,location:"",bottles:0,registrationDate:(new Date).toISOString(),status:"Active",isCorporate:E};try{const e=await u(t);p({...t,firestoreId:e?.id||null}),v("quick-order")}catch(Ap){console.error("Failed to add subscriber:",Ap),d("Abone kaydedilemedi.","error")}},className:"space-y-6",children:[!t&&s.jsxs("div",{className:"group animate-in slide-in-from-top-2",children:[s.jsx("label",{className:"block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2",children:"Telefon Numarası"}),s.jsxs("div",{className:"relative",children:[s.jsx(pI,{size:18,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),s.jsx("input",{type:"tel",required:!0,className:"w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.2rem] outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-slate-800",placeholder:"5XX XXX XX XX",value:y,onChange:e=>_(e.target.value)})]})]}),s.jsxs("div",{className:"group",children:[s.jsx("label",{className:"block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2",children:"Abone Adı Soyadı"}),s.jsxs("div",{className:"relative",children:[s.jsx(bI,{size:18,className:"absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"}),s.jsx("input",{type:"text",required:!0,autoFocus:!0,className:"w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.2rem] outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-slate-800",placeholder:"Örn: Ayşe Yılmaz",value:I,onChange:e=>C(e.target.value)})]})]}),s.jsxs("div",{className:"group",children:[s.jsx("label",{className:"block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2",children:"Teslimat Adresi"}),s.jsxs("div",{className:"relative",children:[s.jsx(dI,{size:18,className:"absolute left-4 top-4 text-slate-400"}),s.jsx("textarea",{required:!0,className:"w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.2rem] outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-slate-800 resize-none h-28",placeholder:"Mahalle, sokak, bina ve daire no...",value:T,onChange:e=>S(e.target.value)})]})]}),s.jsx("div",{className:"flex items-center gap-3 mt-2",children:s.jsxs("label",{className:"flex items-center gap-3 cursor-pointer group/cb",children:[s.jsxs("div",{className:"relative flex items-center justify-center w-6 h-6 rounded-lg border-2 border-slate-200 bg-slate-50 group-hover/cb:border-brand-primary transition-colors",children:[s.jsx("input",{type:"checkbox",className:"absolute opacity-0 w-full h-full cursor-pointer z-10",checked:E,onChange:e=>k(e.target.checked)}),E&&s.jsx(iI,{size:16,className:"text-brand-primary absolute"})]}),s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(nI,{size:18,className:E?"text-brand-primary":"text-slate-400"}),s.jsx("span",{className:"text-[11px] font-black uppercase tracking-widest "+(E?"text-brand-primary":"text-slate-500"),children:"Kurumsal / İşletme Müşterisi"})]})]})}),s.jsxs("button",{type:"submit",className:"w-full bg-slate-900 text-white font-black py-4 rounded-[1.2rem] shadow-xl hover:bg-brand-primary transition-all active:scale-95 flex items-center justify-center gap-2 uppercase text-xs tracking-widest mt-8",children:[s.jsx(vI,{size:18})," KAYDI TAMAMLA VE SİPARİŞE GEÇ"]})]})]}),"quick-order"===w&&s.jsxs("div",{className:"p-8 animate-in fade-in slide-in-from-right duration-300",children:[s.jsxs("div",{className:"flex justify-between items-start mb-6 border-b border-slate-100 pb-6",children:[s.jsxs("div",{children:[s.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[s.jsx("div",{className:"w-2 h-2 bg-emerald-500 rounded-full"}),s.jsx("p",{className:"text-[10px] font-black text-emerald-500 uppercase tracking-widest",children:"Görüşme Aktif"})]}),s.jsxs("div",{className:"flex items-center gap-3",children:[s.jsx("h3",{className:"text-xl font-black text-slate-900 tracking-tight font-display uppercase",children:f?.name}),s.jsxs("span",{className:"bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg text-[10px] font-black",children:["#",f?.id]}),f?.legacyId&&s.jsxs("span",{className:"bg-amber-100 text-amber-600 px-2 py-0.5 rounded-lg text-[10px] font-black",children:["Eski: ",f.legacyId]})]}),s.jsx("p",{className:"text-xs font-bold text-slate-500 mt-1 line-clamp-1",children:f?.address})]}),s.jsx("button",{onClick:D,className:"p-3 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl transition-all shadow-sm",children:s.jsx(fI,{size:24,className:"fill-current"})})]}),m&&s.jsxs("div",{className:"mb-6 bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl flex items-center justify-between",children:[s.jsxs("div",{children:[s.jsx("p",{className:"text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1",children:"Son Siparişi"}),s.jsx("p",{className:"font-bold text-indigo-900 text-sm",children:m.product})]}),s.jsx("button",{onClick:()=>{if(Array.isArray(m.items)&&m.items.length>0)return void A(m.items.map(e=>({productId:e.productId||l.find(t=>e.name&&t.name===e.name)?.id||"",quantity:Number(e.quantity||1),includeDeposit:Boolean(e.includeDeposit)})));const e=l.find(e=>String(m.product||"").includes(e.name));e&&A([NI({productId:e.id,quantity:Number(m.quantity||1)})])},className:"p-2 bg-white rounded-xl text-indigo-500 shadow-sm hover:scale-105 active:scale-95 transition-transform text-[10px] font-black uppercase tracking-widest",children:"Aynısını Gir"})]}),s.jsxs("form",{onSubmit:P,className:"space-y-6",children:[s.jsxs("div",{className:"space-y-4",children:[s.jsxs("div",{className:"flex items-center justify-between gap-3",children:[s.jsx("label",{className:"block text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Ne İstediler?"}),s.jsxs("button",{type:"button",onClick:()=>{A(e=>[...e,PI()])},className:"px-3 py-2 rounded-xl bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2",children:[s.jsx(mI,{size:14})," Ürün Ekle"]})]}),N.map((e,t)=>{const n=l.find(t=>String(t.id)===String(e.productId)),r=Number(n?.depositFee||0)>0;return s.jsxs("div",{className:"bg-slate-50 border border-slate-100 rounded-[1.4rem] p-4 space-y-4",children:[s.jsxs("select",{required:!0,className:"w-full p-4 bg-white border-2 border-transparent rounded-[1.2rem] outline-none focus:border-brand-primary focus:bg-white transition-all font-bold text-slate-800",value:e.productId,onChange:e=>R(t,"productId",e.target.value),children:[s.jsx("option",{value:"",children:"Ürün Seçiniz..."}),l.map(e=>s.jsxs("option",{value:e.id,children:[e.name," - ₺",e.price]},e.id))]}),s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx("button",{type:"button",onClick:()=>R(t,"quantity",Math.max(1,Number(e.quantity||1)-1)),className:"w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-slate-500 hover:bg-slate-200 active:scale-95",children:"-"}),s.jsx("div",{className:"flex-1 text-center font-black text-3xl font-display text-slate-900",children:Number(e.quantity||1)}),s.jsx("button",{type:"button",onClick:()=>R(t,"quantity",Number(e.quantity||1)+1),className:"w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-slate-500 hover:bg-slate-200 active:scale-95",children:"+"}),N.length>1&&s.jsx("button",{type:"button",onClick:()=>(e=>{A(t=>t.filter((t,n)=>n!==e))})(t),className:"w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all active:scale-95",children:s.jsx(xI,{size:18})})]}),r&&s.jsxs("label",{className:"flex items-center justify-between gap-4 rounded-[1.2rem] border border-orange-100 bg-orange-50/70 px-4 py-3 text-[11px] font-black uppercase tracking-wider text-orange-600",children:[s.jsx("span",{children:"Depozito Var"}),s.jsx("input",{type:"checkbox",className:"h-5 w-5 accent-orange-500",checked:Boolean(e.includeDeposit),onChange:e=>R(t,"includeDeposit",e.target.checked)})]})]},`${t}-${e.productId||"empty"}`)})]}),s.jsxs("button",{type:"submit",className:"w-full bg-emerald-500 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase text-xs tracking-widest mt-8",children:[s.jsx(_I,{size:20})," SİPARİŞİ ONAYLA"]})]})]})]})]})},MI=()=>{const e=Hx(e=>e.notifications),t=Hx(e=>e.removeNotification);return 0===e.length?null:s.jsx("div",{className:"fixed top-4 md:top-auto md:bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-[9999] flex flex-col gap-3 w-[calc(100%-2rem)] max-w-sm pointer-events-none",children:e.map(e=>s.jsxs("div",{className:`\n                        pointer-events-auto flex items-center gap-4 p-4 rounded-[1.5rem] shadow-2xl border backdrop-blur-2xl animate-in slide-in-from-top-10 md:slide-in-from-right-10 duration-500\n                        ${"success"===e.type?"bg-emerald-500/10 border-emerald-500/20 text-emerald-900":"error"===e.type?"bg-rose-500/10 border-rose-500/20 text-rose-900":"info"===e.type?"bg-blue-500/10 border-blue-500/20 text-blue-900":"bg-slate-900/90 border-white/10 text-white"}\n                    `,children:[s.jsxs("div",{className:"flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center "+("success"===e.type?"bg-emerald-500 text-white":"error"===e.type?"bg-rose-500 text-white":"info"===e.type?"bg-blue-500 text-white":"bg-white/20 text-white"),children:["success"===e.type&&s.jsx(iI,{size:18}),"error"===e.type&&s.jsx(rI,{size:18}),"info"===e.type&&s.jsx(lI,{size:18}),"default"===e.type&&s.jsx(tI,{size:18})]}),s.jsx("div",{className:"flex-1 min-w-0",children:s.jsx("p",{className:"text-[13px] font-black leading-tight tracking-tight",children:e.message})}),s.jsx("button",{onClick:()=>t(e.id),className:"flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors",children:s.jsx(xI,{size:16,className:"opacity-40"})})]},e.id))})},LI=new Map([["M�sait","Müsait"],["D�zenle","Düzenle"],["�zerindeki Stok","Üzerindeki Stok"],["T�p","Tüp"],["G�ncel Kasa","Güncel Kasa"],["DETAYLI ANAL1Z","DETAYLI ANALİZ"],["Yenilemek i�in tekrar bas1n","Yenilemek için tekrar basın"],["Kurye kodu ba_ar1yla yenilendi!","Kurye kodu başarıyla yenilendi!"],["Kurye kodu kopyaland1!","Kurye kodu kopyalandı!"],["Aktif G�revler","Aktif Görevler"],["1_letme taraf1ndan olu_turuldu","İşletme tarafından oluşturuldu"],["Kurye bilgileri g�ncellendi.","Kurye bilgileri güncellendi."],["Silmek i�in tekrar bas1n!","Silmek için tekrar basın!"],["Kurye Y�netimi","Kurye Yönetimi"],["YEN1 KURYE EKLE","YENİ KURYE EKLE"],["Hen�z Kurye Yok","Henüz Kurye Yok"],["Ekibinizi olu?turmak i?in yeni kurye kayd? yap?n.","Ekibinizi oluşturmak için yeni kurye kaydı yapın."],["Kay?t Ba?lat","Kayıt Başlat"],["Operat�r�","Operatörü"],["Teslimat Performans�","Teslimat Performansı"],["Ba?ar?l?","Başarılı"],["Giri� Durumu","Giriş Durumu"],["G�NCEL STOK DURUMU","GÜNCEL STOK DURUMU"],["TAHS?L ET","TAHSİL ET"],["Sipari?","Sipariş"],["Hen?z operasyon kayd? yok.","Henüz operasyon kaydı yok."],["ANAL?ZDEN AYRIL","ANALİZDEN AYRIL"],["Yeni Kurye Kayd?","Yeni Kurye Kaydı"],["Saha ekibine yeni ?ye ekle","Saha ekibine yeni üye ekle"],["?rn: Mehmet Y?lmaz","Örn: Mehmet Yılmaz"],["ARA� T1P1","ARAÇ TİPİ"],["MOTOS1KLET","MOTOSİKLET"],["HAF1F T1CAR1","HAFİF TİCARİ"],["Kurye Hesab1 Olu_turuldu!","Kurye Hesabı Oluşturuldu!"],["i�in giri_ bilgileri a_a1dad1r.","için giriş bilgileri aşağıdadır."],["_1FRE","ŞİFRE"],["Kurye bu bilgilerle sisteme giri_ yapabilir. L�tfen bu bilgileri kurye ile g�venli bir _ekilde payla_1n.","Kurye bu bilgilerle sisteme giriş yapabilir. Lütfen bu bilgileri kurye ile güvenli bir şekilde paylaşın."],["Kurye D�zenle","Kurye Düzenle"],["Kurye bilgilerini g�ncelle","Kurye bilgilerini güncelle"],["G�NCELLE","GÜNCELLE"],["Tahmini Var1_","Tahmini Varış"],["TAK1B1 KAPAT","TAKİBİ KAPAT"],["D?ZENLE","DÜZENLE"],["S?PAR??? S?L","SİPARİŞİ SİL"],["DAHA FAZLA Y?KLE +50","DAHA FAZLA YÜKLE +50"],["Operasyon / Sipari?","Operasyon / Sipariş"],["?r?n ?zeti","Ürün Özeti"],["Mali De?er","Mali Değer"],["Sipari? Kayd? Bulunamad?","Sipariş Kaydı Bulunamadı"],["Sistemde hen?z bu kriterlere uygun sipari? yok.","Sistemde henüz bu kriterlere uygun sipariş yok."],["Sipari? ??lemleri","Sipariş İşlemleri"],["D?ZENLE / DURUM","DÜZENLE / DURUM"],["Haz?rlan?yor","Hazırlanıyor"],["HAR?TADA G?R","HARİTADA GÖR"],["Tamamland?","Tamamlandı"],["FATURA OLU?TUR","FATURA OLUŞTUR"],["FATURAYI G?R?NT?LE","FATURAYI GÖRÜNTÜLE"],["DAHA FAZLA S?PAR?? Y?KLE","DAHA FAZLA SİPARİŞ YÜKLE"],["YEN? S?PAR??","YENİ SİPARİŞ"],["S?STEM KAYIT PANEL?","SİSTEM KAYIT PANELİ"],["M??teri Se?imi","Müşteri Seçimi"],["?sim, Telefon veya Eski No ile ara...","İsim, Telefon veya Eski No ile ara..."],["M??teri bulunamad?","Müşteri bulunamadı"],["Sipari? ??eri?i","Sipariş İçeriği"],["+ ?r?n Ekle","+ Ürün Ekle"],["?r?n Se?iniz...","Ürün Seçiniz..."],["Atanmad?","Atanmadı"],["?deme","Ödeme"],["S?PAR?? OLU?TUR","SİPARİŞ OLUŞTUR"],["Durum G?ncelleme","Durum Güncelleme"],["Toplam Tutar (?)","Toplam Tutar (₺)"],["CANLI TAK","CANLI TAKİP"],["Var??","Varış"],["İstanbul Merkez","İstanbul Merkez"],["0stanbul Merkez","İstanbul Merkez"]]),FI=[["Ã¼","ü"],["Ãœ","Ü"],["Ã¶","ö"],["Ã–","Ö"],["Ã§","ç"],["Ã‡","Ç"],["Ä±","ı"],["Ä°","İ"],["ÅŸ","ş"],["Åž","Ş"],["ÄŸ","ğ"],["Äž","Ğ"]];
/**
       * @license lucide-react v0.574.0 - ISC
       *
       * This source code is licensed under the ISC license.
       * See the LICENSE file in the root directory of this source tree.
       */function jI(e){if(!e||"string"!=typeof e)return e;let t=e;for(const[n,r]of LI)t.includes(n)&&(t=t.split(n).join(r));for(const[n,r]of FI)t.includes(n)&&(t=t.split(n).join(r));return t}function VI(e){if(e.nodeType===Node.TEXT_NODE){const t=jI(e.nodeValue);return void(t!==e.nodeValue&&(e.nodeValue=t))}if(e.nodeType!==Node.ELEMENT_NODE)return;const t=["title","placeholder","aria-label"];for(const n of t){const t=e.getAttribute(n);if(!t)continue;const r=jI(t);r!==t&&e.setAttribute(n,r)}for(const n of e.childNodes)VI(n)}const qI=i.lazy(()=>o(()=>t.import("./Layout-legacy.js"),void 0,t.meta.url)),UI=i.lazy(()=>o(()=>t.import("./Dashboard-legacy.js"),void 0,t.meta.url)),zI=i.lazy(()=>o(()=>t.import("./Products-legacy.js"),void 0,t.meta.url)),BI=i.lazy(()=>o(()=>t.import("./Accounting-legacy.js"),void 0,t.meta.url)),KI=i.lazy(()=>o(()=>t.import("./Couriers-legacy.js"),void 0,t.meta.url)),$I=i.lazy(()=>o(()=>t.import("./Reconciliation-legacy.js"),void 0,t.meta.url)),GI=i.lazy(()=>o(()=>t.import("./Analytics-legacy.js"),void 0,t.meta.url)),HI=i.lazy(()=>o(()=>t.import("./CustomerPortal-legacy.js"),void 0,t.meta.url)),WI=i.lazy(()=>o(()=>t.import("./Suppliers-legacy.js"),void 0,t.meta.url)),YI=i.lazy(()=>o(()=>t.import("./Subscribers-legacy.js"),void 0,t.meta.url)),QI=i.lazy(()=>o(()=>t.import("./Finance-legacy.js"),void 0,t.meta.url)),JI=i.lazy(()=>o(()=>t.import("./Calls-legacy.js"),void 0,t.meta.url)),XI=i.lazy(()=>o(()=>t.import("./Orders-legacy.js"),void 0,t.meta.url)),ZI=i.lazy(()=>o(()=>t.import("./DailyClosingForm-legacy.js").then(e=>e.D),void 0,t.meta.url)),eC=i.lazy(()=>o(()=>t.import("./CourierPortal-legacy.js"),void 0,t.meta.url)),tC=i.lazy(()=>o(()=>t.import("./Settings-legacy2.js"),void 0,t.meta.url)),nC=i.lazy(()=>o(()=>t.import("./Expenses-legacy.js"),void 0,t.meta.url)),rC=i.lazy(()=>o(()=>t.import("./DeveloperPanel-legacy.js"),void 0,t.meta.url)),iC=i.lazy(()=>o(()=>t.import("./Dealers-legacy.js"),void 0,t.meta.url));function sC(){return s.jsx("div",{className:"min-h-screen bg-slate-50 flex items-center justify-center",children:s.jsxs("div",{className:"text-center text-slate-500",children:[s.jsx("div",{className:"w-8 h-8 mx-auto mb-4 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin"}),s.jsx("p",{className:"text-xs font-black uppercase tracking-widest",children:"Yukleniyor"})]})})}const oC=Object.freeze(Object.defineProperty({__proto__:null,default:function(){const e=Hx(e=>e.currentUser),n=Hx(e=>e.activeCall),a=Hx(e=>e.setActiveCall),c=Hx(e=>e.clearActiveCall),l=Hx(e=>e.initFirestoreSync),[u,h]=i.useState("dashboard");i.useEffect(()=>{e?.id&&e?.role&&l()},[e?.id,e?.role,l]),i.useEffect(()=>r.isNativePlatform()?()=>{}:function(e=document.body){if(!e)return()=>{};VI(e);const t=new MutationObserver(e=>{for(const t of e)"characterData"!==t.type?t.addedNodes.forEach(e=>VI(e)):VI(t.target)});return t.observe(e,{subtree:!0,childList:!0,characterData:!0}),()=>t.disconnect()}(document.body),[]),i.useEffect(()=>{e?.id&&o(async()=>{const{requestNotificationPermission:e,onMessageListener:n}=await t.import("./notificationService-legacy.js");return{requestNotificationPermission:e,onMessageListener:n}},void 0,t.meta.url).then(({requestNotificationPermission:t,onMessageListener:n})=>{t(e.id),n().then(e=>{Hx.getState().addNotification(e.notification.title+": "+e.notification.body,"info")})}).catch(e=>{console.warn("Notification service could not be initialized.",e)})},[e?.id]),i.useEffect(()=>{if(!e)return;const t=e.role?.toLowerCase(),n="admin"===t||"courier"===t,r="admin"===t?e.id:e.businessId;if(!n||!r)return;const i=Hw(qw(qb,`active_calls/${r}`),e=>{const t=e.val(),n=Hx.getState().activeCall;if(!t)return void(n&&!n.manual&&c());let r=null,i=null,s=!1;if(t.phone&&""!==String(t.phone).trim())r=t.phone,i="default",s=t.manual||!1;else for(const[a,c]of Object.entries(t))if(!["businessPhone","lastLoginAt","lastCallAt","phone","manual"].includes(a)){if(c&&"object"==typeof c&&c.phone&&""!==String(c.phone).trim()){r=c.phone,i=a,s=c.manual||!1;break}if("string"==typeof c&&"businessPhone"!==a&&"lastLoginAt"!==a){r=c,i=a,s=!1;break}}if(!r)return void(n&&!n.manual&&c());const o=String(r).trim(),l=(o.match(/\d/g)||[]).length;if(""===o||"[call_number]"===o||o.toLowerCase().includes("demo")||o.toLowerCase().includes("undefined")||o.toLowerCase().includes("null")||l<5)n&&!n.manual&&c();else{const e={number:o,deviceId:"default"!==i?i:null,manual:s};if(n?.number!==o){a(e);const t=Hx.getState(),n=t.incomingCalls.find(e=>e.number===o),r=n?new Date-new Date(n.timestamp):999999;(!n||r>3e4)&&t.addIncomingCall(e)}}},e=>{console.error("RTDB Listener Error (Permissions?):",e),Hx.getState().addNotification("Arama dinleme hatasi! Firebase izinlerini kontrol edin.","warning")});return()=>i()},[e,a,c]),i.useEffect(()=>{if("false"!==Bx("bayios-auto-backup-enabled")){const e=(new Date).toISOString().split("T")[0];if(Bx("bayios-last-backup-date")!==e){const t=Bx("bayios-storage");t&&(Kx("bayios-auto-backup",t),Kx("bayios-last-backup-date",e))}}},[]),i.useEffect(()=>{const t=e?.settings?.zoomLevel||"100";document.body.style.zoom=`${t}%`,"75"===t?document.body.classList.add("zoom-75"):document.body.classList.remove("zoom-75")},[e?.settings?.zoomLevel]),i.useEffect(()=>{if(!e)return;let n,r=!1;const i=e.role?.toLowerCase();return"courier"!==i&&"admin"!==i&&"customer"!==i||o(()=>t.import("./locationService-legacy.js"),void 0,t.meta.url).then(async({startLocationTracking:t,stopLocationTracking:s})=>{const o=await t(e.id,i);r&&o?s(o):n=o}).catch(e=>{console.warn("Location tracking could not be initialized.",e)}),()=>{r=!0,n&&o(async()=>{const{stopLocationTracking:e}=await t.import("./locationService-legacy.js");return{stopLocationTracking:e}},void 0,t.meta.url).then(({stopLocationTracking:e})=>{e(n)}).catch(()=>{})}},[e?.id,e?.role]),i.useEffect(()=>{"customer"!==e?.role?.toLowerCase()||"dashboard"!==u&&"orders"!==u||setTimeout(()=>h("market"),0)},[e?.role,u]);const d=e=>{Hx.getState().setUser(e)},f=()=>{Hx.getState().cleanupListeners(),Hx.getState().setUser(null),Hx.getState().clearData(),$x("bayios-auto-login"),h("dashboard")};return e&&e.id&&e.role?"developer"===e.role?.toLowerCase()?s.jsx(i.Suspense,{fallback:s.jsx(sC,{}),children:s.jsx(rC,{onLogout:f})}):"courier"===e?.role?.toLowerCase()?s.jsx(i.Suspense,{fallback:s.jsx(sC,{}),children:s.jsx(eC,{user:e,onLogout:f})}):s.jsx(i.Suspense,{fallback:s.jsx(sC,{}),children:s.jsxs(II,{children:[s.jsx(qI,{currentView:u,setCurrentView:h,onLogout:f,user:e,children:(()=>{if(!u)return null;if("customer"===e?.role?.toLowerCase())switch(u){case"market":case"dashboard":default:return s.jsx(HI,{user:e,initialTab:"market"});case"my-orders":case"orders":return s.jsx(HI,{user:e,initialTab:"orders"});case"settings":return s.jsx(tC,{user:e,onLogout:f})}switch(u){case"dashboard":return s.jsx(UI,{user:e,setCurrentView:h});case"products":return s.jsx(zI,{user:e});case"orders":return s.jsx(XI,{user:e});case"daily-closing":return s.jsx(ZI,{user:e});case"cash":return s.jsx(BI,{user:e});case"couriers":return s.jsx(KI,{user:e});case"reconciliation":return s.jsx($I,{user:e});case"finance":return s.jsx(QI,{user:e});case"analytics":return s.jsx(GI,{user:e});case"subscribers":return s.jsx(YI,{user:e});case"calls":return s.jsx(JI,{user:e});case"suppliers":return s.jsx(WI,{user:e});case"dealers":return s.jsx(iC,{user:e});case"expenses":return s.jsx(nC,{user:e});case"settings":return s.jsx(tC,{user:e,onLogout:f});default:return s.jsx("div",{className:"p-8 flex items-center justify-center h-full",children:s.jsxs("div",{className:"text-center text-slate-400",children:[s.jsx("h2",{className:"text-2xl font-bold mb-2",children:"Yapim Asamasinda"}),s.jsxs("p",{children:['"',u,'" modulu yakinda eklenecek.']})]})})}})()}),s.jsx(OI,{isOpen:!!n,phone:n?.number,deviceId:n?.deviceId,isManual:n?.manual,onClose:async()=>{const t="admin"===e?.role?.toLowerCase()?e.id:e?.businessId;if(n?.deviceId&&Hx.getState().sendDeviceCommand(n.deviceId,"REJECT_CALL"),t){const e={phone:"",manual:!1};n?.deviceId&&(e[`${n.deviceId}/phone`]="",e[`${n.deviceId}/manual`]=!1);try{await Bw(qw(qb,`active_calls/${t}`),e)}catch(Ap){console.error("Active call close sync failed:",Ap)}}c()}}),s.jsx(MI,{})]})}):s.jsx(EI,{onLogin:d})}},Symbol.toStringTag,{value:"Module"}));e("F",oC)}}});
