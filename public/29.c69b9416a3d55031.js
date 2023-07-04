"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[29],{29:(lt,ce,d)=>{d.r(ce);var c=d(5861),J=d(3106),Y=d(4537),v=d(2650),y=d(9058),b=(d(2591),d(9240)),ue=d(534);const z="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",le="https://fcmregistrations.googleapis.com/v1",X="FCM_MSG",pe=3,fe=1;var m=(()=>{return(e=m||(m={}))[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION",m;var e})(),f=(()=>((f=f||{}).PUSH_RECEIVED="push-received",f.NOTIFICATION_CLICKED="notification-clicked",f))();function p(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function ge(e){const n=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(n),o=new Uint8Array(i.length);for(let r=0;r<i.length;++r)o[r]=i.charCodeAt(r);return o}const w="fcm_token_details_db",he=5,ee="fcm_token_object_Store";function k(){return k=(0,c.Z)(function*(e){if("databases"in indexedDB&&!(yield indexedDB.databases()).map(r=>r.name).includes(w))return null;let t=null;return(yield(0,b.X3)(w,he,{upgrade:(i=(0,c.Z)(function*(o,r,a,l){var h;if(r<2||!o.objectStoreNames.contains(ee))return;const ae=l.objectStore(ee),_=yield ae.index("fcmSenderId").get(e);if(yield ae.clear(),_)if(2===r){const s=_;if(!s.auth||!s.p256dh||!s.endpoint)return;t={token:s.fcmToken,createTime:null!==(h=s.createTime)&&void 0!==h?h:Date.now(),subscriptionOptions:{auth:s.auth,p256dh:s.p256dh,endpoint:s.endpoint,swScope:s.swScope,vapidKey:"string"==typeof s.vapidKey?s.vapidKey:p(s.vapidKey)}}}else if(3===r){const s=_;t={token:s.fcmToken,createTime:s.createTime,subscriptionOptions:{auth:p(s.auth),p256dh:p(s.p256dh),endpoint:s.endpoint,swScope:s.swScope,vapidKey:p(s.vapidKey)}}}else if(4===r){const s=_;t={token:s.fcmToken,createTime:s.createTime,subscriptionOptions:{auth:p(s.auth),p256dh:p(s.p256dh),endpoint:s.endpoint,swScope:s.swScope,vapidKey:p(s.vapidKey)}}}}),function(r,a,l,h){return i.apply(this,arguments)})})).close(),yield(0,b.Lj)(w),yield(0,b.Lj)("fcm_vapid_details_db"),yield(0,b.Lj)("undefined"),function be(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null;var i}),k.apply(this,arguments)}const me="firebase-messaging-database",_e=1,g="firebase-messaging-store";let S=null;function T(){return S||(S=(0,b.X3)(me,_e,{upgrade:(e,t)=>{0===t&&e.createObjectStore(g)}})),S}function I(e){return E.apply(this,arguments)}function E(){return E=(0,c.Z)(function*(e){const t=O(e),i=yield(yield T()).transaction(g).objectStore(g).get(t);if(i)return i;{const o=yield function ye(e){return k.apply(this,arguments)}(e.appConfig.senderId);if(o)return yield M(e,o),o}}),E.apply(this,arguments)}function M(e,t){return A.apply(this,arguments)}function A(){return(A=(0,c.Z)(function*(e,t){const n=O(e),o=(yield T()).transaction(g,"readwrite");return yield o.objectStore(g).put(t,n),yield o.done,t})).apply(this,arguments)}function x(){return(x=(0,c.Z)(function*(e){const t=O(e),i=(yield T()).transaction(g,"readwrite");yield i.objectStore(g).delete(t),yield i.done})).apply(this,arguments)}function O({appConfig:e}){return e.appId}const u=new y.LL("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});function ke(e,t){return D.apply(this,arguments)}function D(){return(D=(0,c.Z)(function*(e,t){const n=yield K(e),i=ne(t),o={method:"POST",headers:n,body:JSON.stringify(i)};let r;try{r=yield(yield fetch(L(e.appConfig),o)).json()}catch(a){throw u.create("token-subscribe-failed",{errorInfo:a?.toString()})}if(r.error)throw u.create("token-subscribe-failed",{errorInfo:r.error.message});if(!r.token)throw u.create("token-subscribe-no-token");return r.token})).apply(this,arguments)}function C(){return(C=(0,c.Z)(function*(e,t){const n=yield K(e),i=ne(t.subscriptionOptions),o={method:"PATCH",headers:n,body:JSON.stringify(i)};let r;try{r=yield(yield fetch(`${L(e.appConfig)}/${t.token}`,o)).json()}catch(a){throw u.create("token-update-failed",{errorInfo:a?.toString()})}if(r.error)throw u.create("token-update-failed",{errorInfo:r.error.message});if(!r.token)throw u.create("token-update-no-token");return r.token})).apply(this,arguments)}function te(e,t){return N.apply(this,arguments)}function N(){return(N=(0,c.Z)(function*(e,t){const i={method:"DELETE",headers:yield K(e)};try{const r=yield(yield fetch(`${L(e.appConfig)}/${t}`,i)).json();if(r.error)throw u.create("token-unsubscribe-failed",{errorInfo:r.error.message})}catch(o){throw u.create("token-unsubscribe-failed",{errorInfo:o?.toString()})}})).apply(this,arguments)}function L({projectId:e}){return`${le}/projects/${e}/registrations`}function K(e){return P.apply(this,arguments)}function P(){return(P=(0,c.Z)(function*({appConfig:e,installations:t}){const n=yield t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})})).apply(this,arguments)}function ne({p256dh:e,auth:t,endpoint:n,vapidKey:i}){const o={web:{endpoint:n,auth:t,p256dh:e}};return i!==z&&(o.web.applicationPubKey=i),o}const Te=6048e5;function j(){return j=(0,c.Z)(function*(e){const t=yield function Me(e,t){return W.apply(this,arguments)}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:p(t.getKey("auth")),p256dh:p(t.getKey("p256dh"))},i=yield I(e.firebaseDependencies);if(i){if(function Ae(e,t){return t.vapidKey===e.vapidKey&&t.endpoint===e.endpoint&&t.auth===e.auth&&t.p256dh===e.p256dh}(i.subscriptionOptions,n))return Date.now()>=i.createTime+Te?function Ee(e,t){return F.apply(this,arguments)}(e,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{yield te(e.firebaseDependencies,i.token)}catch(o){console.warn(o)}return ie(e.firebaseDependencies,n)}return ie(e.firebaseDependencies,n)}),j.apply(this,arguments)}function B(e){return R.apply(this,arguments)}function R(){return R=(0,c.Z)(function*(e){const t=yield I(e.firebaseDependencies);t&&(yield te(e.firebaseDependencies,t.token),yield function ve(e){return x.apply(this,arguments)}(e.firebaseDependencies));const n=yield e.swRegistration.pushManager.getSubscription();return!n||n.unsubscribe()}),R.apply(this,arguments)}function F(){return F=(0,c.Z)(function*(e,t){try{const n=yield function Se(e,t){return C.apply(this,arguments)}(e.firebaseDependencies,t),i=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return yield M(e.firebaseDependencies,i),n}catch(n){throw yield B(e),n}}),F.apply(this,arguments)}function ie(e,t){return Z.apply(this,arguments)}function Z(){return(Z=(0,c.Z)(function*(e,t){const i={token:yield ke(e,t),createTime:Date.now(),subscriptionOptions:t};return yield M(e,i),i.token})).apply(this,arguments)}function W(){return(W=(0,c.Z)(function*(e,t){return(yield e.pushManager.getSubscription())||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:ge(t)})})).apply(this,arguments)}function U(){return(U=(0,c.Z)(function*(e,t){const n=function Pe(e,t){var n,i;const o={};return e.from&&(o.project_number=e.from),e.fcmMessageId&&(o.message_id=e.fcmMessageId),o.instance_id=t,o.message_type=e.notification?m.DISPLAY_NOTIFICATION.toString():m.DATA_MESSAGE.toString(),o.sdk_platform=pe.toString(),o.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),e.collapse_key&&(o.collapse_key=e.collapse_key),o.event=fe.toString(),!(null===(n=e.fcmOptions)||void 0===n)&&n.analytics_label&&(o.analytics_label=null===(i=e.fcmOptions)||void 0===i?void 0:i.analytics_label),o}(t,yield e.firebaseDependencies.installations.getId());!function je(e,t){const n={};n.event_time_ms=Math.floor(Date.now()).toString(),n.source_extension_json_proto3=JSON.stringify(t),e.logEvents.push(n)}(e,n)})).apply(this,arguments)}function oe(e,t){const n=[];for(let i=0;i<e.length;i++)n.push(e.charAt(i)),i<t.length&&n.push(t.charAt(i));return n.join("")}function G(){return G=(0,c.Z)(function*(e,t){var n,i;const{newSubscription:o}=e;if(!o)return void(yield B(t));const r=yield I(t.firebaseDependencies);yield B(t),t.vapidKey=null!==(i=null===(n=r?.subscriptionOptions)||void 0===n?void 0:n.vapidKey)&&void 0!==i?i:z,yield function Ie(e){return j.apply(this,arguments)}(t)}),G.apply(this,arguments)}function H(){return H=(0,c.Z)(function*(e,t){const n=function We({data:e}){if(!e)return null;try{return e.json()}catch{return null}}(e);if(!n)return;t.deliveryMetricsExportedToBigQueryEnabled&&(yield function Ke(e,t){return U.apply(this,arguments)}(t,n));const i=yield re();if(function Ge(e){return e.some(t=>"visible"===t.visibilityState&&!t.url.startsWith("chrome-extension://"))}(i))return function He(e,t){t.isFirebaseMessaging=!0,t.messageType=f.PUSH_RECEIVED;for(const n of e)n.postMessage(t)}(i,n);if(n.notification&&(yield function $e(e){var t;const{actions:n}=e,{maxActions:i}=Notification;return n&&i&&n.length>i&&console.warn(`This browser only supports ${i} actions. The remaining actions will not be displayed.`),self.registration.showNotification(null!==(t=e.title)&&void 0!==t?t:"",e)}(function Ze(e){const t=Object.assign({},e.notification);return t.data={[X]:e},t}(n))),t&&t.onBackgroundMessageHandler){const o=function xe(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function Oe(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const i=t.notification.body;i&&(e.notification.body=i);const o=t.notification.image;o&&(e.notification.image=o);const r=t.notification.icon;r&&(e.notification.icon=r)}(t,e),function De(e,t){t.data&&(e.data=t.data)}(t,e),function Ce(e,t){var n,i,o,r,a;if(!(t.fcmOptions||null!==(n=t.notification)&&void 0!==n&&n.click_action))return;e.fcmOptions={};const l=null!==(o=null===(i=t.fcmOptions)||void 0===i?void 0:i.link)&&void 0!==o?o:null===(r=t.notification)||void 0===r?void 0:r.click_action;l&&(e.fcmOptions.link=l);const h=null===(a=t.fcmOptions)||void 0===a?void 0:a.analytics_label;h&&(e.fcmOptions.analyticsLabel=h)}(t,e),t}(n);"function"==typeof t.onBackgroundMessageHandler?yield t.onBackgroundMessageHandler(o):t.onBackgroundMessageHandler.next(o)}}),H.apply(this,arguments)}function $(){return $=(0,c.Z)(function*(e){var t,n;const i=null===(n=null===(t=e.notification)||void 0===t?void 0:t.data)||void 0===n?void 0:n[X];if(!i)return;if(e.action)return;e.stopImmediatePropagation(),e.notification.close();const o=function Ve(e){var t,n,i;return(null!==(n=null===(t=e.fcmOptions)||void 0===t?void 0:t.link)&&void 0!==n?n:null===(i=e.notification)||void 0===i?void 0:i.click_action)||(function Ne(e){return"object"==typeof e&&!!e&&"google.c.a.c_id"in e}(e.data)?self.location.origin:null)}(i);if(!o)return;const r=new URL(o,self.location.href),a=new URL(self.location.origin);if(r.host!==a.host)return;let l=yield function Ue(e){return V.apply(this,arguments)}(r);return l?l=yield l.focus():(l=yield self.clients.openWindow(o),yield function Le(e){return new Promise(t=>{setTimeout(t,e)})}(3e3)),l?(i.messageType=f.NOTIFICATION_CLICKED,i.isFirebaseMessaging=!0,l.postMessage(i)):void 0}),$.apply(this,arguments)}function V(){return(V=(0,c.Z)(function*(e){const t=yield re();for(const n of t){const i=new URL(n.url,self.location.href);if(e.host===i.host)return n}return null})).apply(this,arguments)}function re(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function q(e){return u.create("missing-app-config-values",{valueName:e})}oe("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),oe("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class Qe{constructor(t,n,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const o=function qe(e){if(!e||!e.options)throw q("App Configuration Object");if(!e.name)throw q("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const i of t)if(!n[i])throw q(i);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(t);this.firebaseDependencies={app:t,appConfig:o,installations:n,analyticsProvider:i}}_delete(){return Promise.resolve()}}const Je=e=>{const t=new Qe(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return self.addEventListener("push",n=>{n.waitUntil(function Re(e,t){return H.apply(this,arguments)}(n,t))}),self.addEventListener("pushsubscriptionchange",n=>{n.waitUntil(function Be(e,t){return G.apply(this,arguments)}(n,t))}),self.addEventListener("notificationclick",n=>{n.waitUntil(function Fe(e){return $.apply(this,arguments)}(n))}),t};!function Ye(){(0,ue._registerComponent)(new Y.wA("messaging-sw",Je,"PUBLIC"))}();class se{constructor(t,n){this.app=t,this._delegate=n,this.app=t,this._delegate=n}getToken(t){var n=this;return(0,c.Z)(function*(){return(0,v.LP)(n._delegate,t)})()}deleteToken(){var t=this;return(0,c.Z)(function*(){return(0,v.pQ)(t._delegate)})()}onMessage(t){return(0,v.ps)(this._delegate,t)}onBackgroundMessage(t){return function tt(e,t){return function Xe(e,t){if(void 0!==self.document)throw u.create("only-available-in-sw");return e.onBackgroundMessageHandler=t,()=>{e.onBackgroundMessageHandler=null}}(e=(0,y.m9)(e),t)}(this._delegate,t)}}const at=e=>self&&"ServiceWorkerGlobalScope"in self?new se(e.getProvider("app-compat").getImmediate(),e.getProvider("messaging-sw").getImmediate()):new se(e.getProvider("app-compat").getImmediate(),e.getProvider("messaging").getImmediate()),ct={isSupported:function ot(){return self&&"ServiceWorkerGlobalScope"in self?function st(){return(0,y.hl)()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}():function rt(){return typeof window<"u"&&(0,y.hl)()&&(0,y.zI)()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}()}};(function ut(){J.Z.INTERNAL.registerComponent(new Y.wA("messaging-compat",at,"PUBLIC").setServiceProps(ct))})(),J.Z.registerVersion("@firebase/messaging-compat","0.2.4")}}]);