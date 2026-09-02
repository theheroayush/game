(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function t(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=t(a);fetch(a.href,l)}})();function qm(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var yu={exports:{}},Io={},Su={exports:{}},gt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Np;function _v(){if(Np)return gt;Np=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.iterator;function x(M){return M===null||typeof M!="object"?null:(M=_&&M[_]||M["@@iterator"],typeof M=="function"?M:null)}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,A={};function S(M,j,me){this.props=M,this.context=j,this.refs=A,this.updater=me||y}S.prototype.isReactComponent={},S.prototype.setState=function(M,j){if(typeof M!="object"&&typeof M!="function"&&M!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,M,j,"setState")},S.prototype.forceUpdate=function(M){this.updater.enqueueForceUpdate(this,M,"forceUpdate")};function v(){}v.prototype=S.prototype;function F(M,j,me){this.props=M,this.context=j,this.refs=A,this.updater=me||y}var D=F.prototype=new v;D.constructor=F,E(D,S.prototype),D.isPureReactComponent=!0;var b=Array.isArray,W=Object.prototype.hasOwnProperty,I={current:null},k={key:!0,ref:!0,__self:!0,__source:!0};function V(M,j,me){var G,re={},he=null,le=null;if(j!=null)for(G in j.ref!==void 0&&(le=j.ref),j.key!==void 0&&(he=""+j.key),j)W.call(j,G)&&!k.hasOwnProperty(G)&&(re[G]=j[G]);var ve=arguments.length-2;if(ve===1)re.children=me;else if(1<ve){for(var Ce=Array(ve),Re=0;Re<ve;Re++)Ce[Re]=arguments[Re+2];re.children=Ce}if(M&&M.defaultProps)for(G in ve=M.defaultProps,ve)re[G]===void 0&&(re[G]=ve[G]);return{$$typeof:s,type:M,key:he,ref:le,props:re,_owner:I.current}}function P(M,j){return{$$typeof:s,type:M.type,key:j,ref:M.ref,props:M.props,_owner:M._owner}}function C(M){return typeof M=="object"&&M!==null&&M.$$typeof===s}function z(M){var j={"=":"=0",":":"=2"};return"$"+M.replace(/[=:]/g,function(me){return j[me]})}var J=/\/+/g;function X(M,j){return typeof M=="object"&&M!==null&&M.key!=null?z(""+M.key):j.toString(36)}function ne(M,j,me,G,re){var he=typeof M;(he==="undefined"||he==="boolean")&&(M=null);var le=!1;if(M===null)le=!0;else switch(he){case"string":case"number":le=!0;break;case"object":switch(M.$$typeof){case s:case e:le=!0}}if(le)return le=M,re=re(le),M=G===""?"."+X(le,0):G,b(re)?(me="",M!=null&&(me=M.replace(J,"$&/")+"/"),ne(re,j,me,"",function(Re){return Re})):re!=null&&(C(re)&&(re=P(re,me+(!re.key||le&&le.key===re.key?"":(""+re.key).replace(J,"$&/")+"/")+M)),j.push(re)),1;if(le=0,G=G===""?".":G+":",b(M))for(var ve=0;ve<M.length;ve++){he=M[ve];var Ce=G+X(he,ve);le+=ne(he,j,me,Ce,re)}else if(Ce=x(M),typeof Ce=="function")for(M=Ce.call(M),ve=0;!(he=M.next()).done;)he=he.value,Ce=G+X(he,ve++),le+=ne(he,j,me,Ce,re);else if(he==="object")throw j=String(M),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(M).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.");return le}function de(M,j,me){if(M==null)return M;var G=[],re=0;return ne(M,G,"","",function(he){return j.call(me,he,re++)}),G}function oe(M){if(M._status===-1){var j=M._result;j=j(),j.then(function(me){(M._status===0||M._status===-1)&&(M._status=1,M._result=me)},function(me){(M._status===0||M._status===-1)&&(M._status=2,M._result=me)}),M._status===-1&&(M._status=0,M._result=j)}if(M._status===1)return M._result.default;throw M._result}var ue={current:null},B={transition:null},pe={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:B,ReactCurrentOwner:I};function L(){throw Error("act(...) is not supported in production builds of React.")}return gt.Children={map:de,forEach:function(M,j,me){de(M,function(){j.apply(this,arguments)},me)},count:function(M){var j=0;return de(M,function(){j++}),j},toArray:function(M){return de(M,function(j){return j})||[]},only:function(M){if(!C(M))throw Error("React.Children.only expected to receive a single React element child.");return M}},gt.Component=S,gt.Fragment=t,gt.Profiler=a,gt.PureComponent=F,gt.StrictMode=r,gt.Suspense=h,gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=pe,gt.act=L,gt.cloneElement=function(M,j,me){if(M==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+M+".");var G=E({},M.props),re=M.key,he=M.ref,le=M._owner;if(j!=null){if(j.ref!==void 0&&(he=j.ref,le=I.current),j.key!==void 0&&(re=""+j.key),M.type&&M.type.defaultProps)var ve=M.type.defaultProps;for(Ce in j)W.call(j,Ce)&&!k.hasOwnProperty(Ce)&&(G[Ce]=j[Ce]===void 0&&ve!==void 0?ve[Ce]:j[Ce])}var Ce=arguments.length-2;if(Ce===1)G.children=me;else if(1<Ce){ve=Array(Ce);for(var Re=0;Re<Ce;Re++)ve[Re]=arguments[Re+2];G.children=ve}return{$$typeof:s,type:M.type,key:re,ref:he,props:G,_owner:le}},gt.createContext=function(M){return M={$$typeof:u,_currentValue:M,_currentValue2:M,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},M.Provider={$$typeof:l,_context:M},M.Consumer=M},gt.createElement=V,gt.createFactory=function(M){var j=V.bind(null,M);return j.type=M,j},gt.createRef=function(){return{current:null}},gt.forwardRef=function(M){return{$$typeof:f,render:M}},gt.isValidElement=C,gt.lazy=function(M){return{$$typeof:g,_payload:{_status:-1,_result:M},_init:oe}},gt.memo=function(M,j){return{$$typeof:m,type:M,compare:j===void 0?null:j}},gt.startTransition=function(M){var j=B.transition;B.transition={};try{M()}finally{B.transition=j}},gt.unstable_act=L,gt.useCallback=function(M,j){return ue.current.useCallback(M,j)},gt.useContext=function(M){return ue.current.useContext(M)},gt.useDebugValue=function(){},gt.useDeferredValue=function(M){return ue.current.useDeferredValue(M)},gt.useEffect=function(M,j){return ue.current.useEffect(M,j)},gt.useId=function(){return ue.current.useId()},gt.useImperativeHandle=function(M,j,me){return ue.current.useImperativeHandle(M,j,me)},gt.useInsertionEffect=function(M,j){return ue.current.useInsertionEffect(M,j)},gt.useLayoutEffect=function(M,j){return ue.current.useLayoutEffect(M,j)},gt.useMemo=function(M,j){return ue.current.useMemo(M,j)},gt.useReducer=function(M,j,me){return ue.current.useReducer(M,j,me)},gt.useRef=function(M){return ue.current.useRef(M)},gt.useState=function(M){return ue.current.useState(M)},gt.useSyncExternalStore=function(M,j,me){return ue.current.useSyncExternalStore(M,j,me)},gt.useTransition=function(){return ue.current.useTransition()},gt.version="18.3.1",gt}var Ip;function $f(){return Ip||(Ip=1,Su.exports=_v()),Su.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Up;function xv(){if(Up)return Io;Up=1;var s=$f(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(f,h,m){var g,_={},x=null,y=null;m!==void 0&&(x=""+m),h.key!==void 0&&(x=""+h.key),h.ref!==void 0&&(y=h.ref);for(g in h)r.call(h,g)&&!l.hasOwnProperty(g)&&(_[g]=h[g]);if(f&&f.defaultProps)for(g in h=f.defaultProps,h)_[g]===void 0&&(_[g]=h[g]);return{$$typeof:e,type:f,key:x,ref:y,props:_,_owner:a.current}}return Io.Fragment=t,Io.jsx=u,Io.jsxs=u,Io}var Fp;function yv(){return Fp||(Fp=1,yu.exports=xv()),yu.exports}var Q=yv(),St=$f();const Sv=qm(St);var ol={},Mu={exports:{}},In={},Eu={exports:{}},Tu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Op;function Mv(){return Op||(Op=1,(function(s){function e(B,pe){var L=B.length;B.push(pe);e:for(;0<L;){var M=L-1>>>1,j=B[M];if(0<a(j,pe))B[M]=pe,B[L]=j,L=M;else break e}}function t(B){return B.length===0?null:B[0]}function r(B){if(B.length===0)return null;var pe=B[0],L=B.pop();if(L!==pe){B[0]=L;e:for(var M=0,j=B.length,me=j>>>1;M<me;){var G=2*(M+1)-1,re=B[G],he=G+1,le=B[he];if(0>a(re,L))he<j&&0>a(le,re)?(B[M]=le,B[he]=L,M=he):(B[M]=re,B[G]=L,M=G);else if(he<j&&0>a(le,L))B[M]=le,B[he]=L,M=he;else break e}}return pe}function a(B,pe){var L=B.sortIndex-pe.sortIndex;return L!==0?L:B.id-pe.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var u=Date,f=u.now();s.unstable_now=function(){return u.now()-f}}var h=[],m=[],g=1,_=null,x=3,y=!1,E=!1,A=!1,S=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,F=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function D(B){for(var pe=t(m);pe!==null;){if(pe.callback===null)r(m);else if(pe.startTime<=B)r(m),pe.sortIndex=pe.expirationTime,e(h,pe);else break;pe=t(m)}}function b(B){if(A=!1,D(B),!E)if(t(h)!==null)E=!0,oe(W);else{var pe=t(m);pe!==null&&ue(b,pe.startTime-B)}}function W(B,pe){E=!1,A&&(A=!1,v(V),V=-1),y=!0;var L=x;try{for(D(pe),_=t(h);_!==null&&(!(_.expirationTime>pe)||B&&!z());){var M=_.callback;if(typeof M=="function"){_.callback=null,x=_.priorityLevel;var j=M(_.expirationTime<=pe);pe=s.unstable_now(),typeof j=="function"?_.callback=j:_===t(h)&&r(h),D(pe)}else r(h);_=t(h)}if(_!==null)var me=!0;else{var G=t(m);G!==null&&ue(b,G.startTime-pe),me=!1}return me}finally{_=null,x=L,y=!1}}var I=!1,k=null,V=-1,P=5,C=-1;function z(){return!(s.unstable_now()-C<P)}function J(){if(k!==null){var B=s.unstable_now();C=B;var pe=!0;try{pe=k(!0,B)}finally{pe?X():(I=!1,k=null)}}else I=!1}var X;if(typeof F=="function")X=function(){F(J)};else if(typeof MessageChannel<"u"){var ne=new MessageChannel,de=ne.port2;ne.port1.onmessage=J,X=function(){de.postMessage(null)}}else X=function(){S(J,0)};function oe(B){k=B,I||(I=!0,X())}function ue(B,pe){V=S(function(){B(s.unstable_now())},pe)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(B){B.callback=null},s.unstable_continueExecution=function(){E||y||(E=!0,oe(W))},s.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<B?Math.floor(1e3/B):5},s.unstable_getCurrentPriorityLevel=function(){return x},s.unstable_getFirstCallbackNode=function(){return t(h)},s.unstable_next=function(B){switch(x){case 1:case 2:case 3:var pe=3;break;default:pe=x}var L=x;x=pe;try{return B()}finally{x=L}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(B,pe){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var L=x;x=B;try{return pe()}finally{x=L}},s.unstable_scheduleCallback=function(B,pe,L){var M=s.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?M+L:M):L=M,B){case 1:var j=-1;break;case 2:j=250;break;case 5:j=1073741823;break;case 4:j=1e4;break;default:j=5e3}return j=L+j,B={id:g++,callback:pe,priorityLevel:B,startTime:L,expirationTime:j,sortIndex:-1},L>M?(B.sortIndex=L,e(m,B),t(h)===null&&B===t(m)&&(A?(v(V),V=-1):A=!0,ue(b,L-M))):(B.sortIndex=j,e(h,B),E||y||(E=!0,oe(W))),B},s.unstable_shouldYield=z,s.unstable_wrapCallback=function(B){var pe=x;return function(){var L=x;x=pe;try{return B.apply(this,arguments)}finally{x=L}}}})(Tu)),Tu}var kp;function Ev(){return kp||(kp=1,Eu.exports=Mv()),Eu.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zp;function Tv(){if(zp)return In;zp=1;var s=$f(),e=Ev();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function l(n,i){u(n,i),u(n+"Capture",i)}function u(n,i){for(a[n]=i,n=0;n<i.length;n++)r.add(i[n])}var f=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,g={},_={};function x(n){return h.call(_,n)?!0:h.call(g,n)?!1:m.test(n)?_[n]=!0:(g[n]=!0,!1)}function y(n,i,o,c){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:o!==null?!o.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function E(n,i,o,c){if(i===null||typeof i>"u"||y(n,i,o,c))return!0;if(c)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function A(n,i,o,c,d,p,T){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=o,this.propertyName=n,this.type=i,this.sanitizeURL=p,this.removeEmptyString=T}var S={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){S[n]=new A(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];S[i]=new A(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){S[n]=new A(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){S[n]=new A(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){S[n]=new A(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){S[n]=new A(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){S[n]=new A(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){S[n]=new A(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){S[n]=new A(n,5,!1,n.toLowerCase(),null,!1,!1)});var v=/[\-:]([a-z])/g;function F(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(v,F);S[i]=new A(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(v,F);S[i]=new A(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(v,F);S[i]=new A(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){S[n]=new A(n,1,!1,n.toLowerCase(),null,!1,!1)}),S.xlinkHref=new A("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){S[n]=new A(n,1,!1,n.toLowerCase(),null,!0,!0)});function D(n,i,o,c){var d=S.hasOwnProperty(i)?S[i]:null;(d!==null?d.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(E(i,o,d,c)&&(o=null),c||d===null?x(i)&&(o===null?n.removeAttribute(i):n.setAttribute(i,""+o)):d.mustUseProperty?n[d.propertyName]=o===null?d.type===3?!1:"":o:(i=d.attributeName,c=d.attributeNamespace,o===null?n.removeAttribute(i):(d=d.type,o=d===3||d===4&&o===!0?"":""+o,c?n.setAttributeNS(c,i,o):n.setAttribute(i,o))))}var b=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,W=Symbol.for("react.element"),I=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),V=Symbol.for("react.strict_mode"),P=Symbol.for("react.profiler"),C=Symbol.for("react.provider"),z=Symbol.for("react.context"),J=Symbol.for("react.forward_ref"),X=Symbol.for("react.suspense"),ne=Symbol.for("react.suspense_list"),de=Symbol.for("react.memo"),oe=Symbol.for("react.lazy"),ue=Symbol.for("react.offscreen"),B=Symbol.iterator;function pe(n){return n===null||typeof n!="object"?null:(n=B&&n[B]||n["@@iterator"],typeof n=="function"?n:null)}var L=Object.assign,M;function j(n){if(M===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);M=i&&i[1]||""}return`
`+M+n}var me=!1;function G(n,i){if(!n||me)return"";me=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(ce){var c=ce}Reflect.construct(n,[],i)}else{try{i.call()}catch(ce){c=ce}n.call(i.prototype)}else{try{throw Error()}catch(ce){c=ce}n()}}catch(ce){if(ce&&c&&typeof ce.stack=="string"){for(var d=ce.stack.split(`
`),p=c.stack.split(`
`),T=d.length-1,U=p.length-1;1<=T&&0<=U&&d[T]!==p[U];)U--;for(;1<=T&&0<=U;T--,U--)if(d[T]!==p[U]){if(T!==1||U!==1)do if(T--,U--,0>U||d[T]!==p[U]){var H=`
`+d[T].replace(" at new "," at ");return n.displayName&&H.includes("<anonymous>")&&(H=H.replace("<anonymous>",n.displayName)),H}while(1<=T&&0<=U);break}}}finally{me=!1,Error.prepareStackTrace=o}return(n=n?n.displayName||n.name:"")?j(n):""}function re(n){switch(n.tag){case 5:return j(n.type);case 16:return j("Lazy");case 13:return j("Suspense");case 19:return j("SuspenseList");case 0:case 2:case 15:return n=G(n.type,!1),n;case 11:return n=G(n.type.render,!1),n;case 1:return n=G(n.type,!0),n;default:return""}}function he(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case k:return"Fragment";case I:return"Portal";case P:return"Profiler";case V:return"StrictMode";case X:return"Suspense";case ne:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case z:return(n.displayName||"Context")+".Consumer";case C:return(n._context.displayName||"Context")+".Provider";case J:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case de:return i=n.displayName||null,i!==null?i:he(n.type)||"Memo";case oe:i=n._payload,n=n._init;try{return he(n(i))}catch{}}return null}function le(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return he(i);case 8:return i===V?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function ve(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Ce(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Re(n){var i=Ce(n)?"checked":"value",o=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var d=o.get,p=o.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return d.call(this)},set:function(T){c=""+T,p.call(this,T)}}),Object.defineProperty(n,i,{enumerable:o.enumerable}),{getValue:function(){return c},setValue:function(T){c=""+T},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function Je(n){n._valueTracker||(n._valueTracker=Re(n))}function nt(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var o=i.getValue(),c="";return n&&(c=Ce(n)?n.checked?"true":"false":n.value),n=c,n!==o?(i.setValue(n),!0):!1}function $e(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function O(n,i){var o=i.checked;return L({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??n._wrapperState.initialChecked})}function Pt(n,i){var o=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;o=ve(i.value!=null?i.value:o),n._wrapperState={initialChecked:c,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function it(n,i){i=i.checked,i!=null&&D(n,"checked",i,!1)}function tt(n,i){it(n,i);var o=ve(i.value),c=i.type;if(o!=null)c==="number"?(o===0&&n.value===""||n.value!=o)&&(n.value=""+o):n.value!==""+o&&(n.value=""+o);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?vt(n,i.type,o):i.hasOwnProperty("defaultValue")&&vt(n,i.type,ve(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Be(n,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,o||i===n.value||(n.value=i),n.defaultValue=i}o=n.name,o!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,o!==""&&(n.name=o)}function vt(n,i,o){(i!=="number"||$e(n.ownerDocument)!==n)&&(o==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+o&&(n.defaultValue=""+o))}var Ue=Array.isArray;function N(n,i,o,c){if(n=n.options,i){i={};for(var d=0;d<o.length;d++)i["$"+o[d]]=!0;for(o=0;o<n.length;o++)d=i.hasOwnProperty("$"+n[o].value),n[o].selected!==d&&(n[o].selected=d),d&&c&&(n[o].defaultSelected=!0)}else{for(o=""+ve(o),i=null,d=0;d<n.length;d++){if(n[d].value===o){n[d].selected=!0,c&&(n[d].defaultSelected=!0);return}i!==null||n[d].disabled||(i=n[d])}i!==null&&(i.selected=!0)}}function w(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return L({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function se(n,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(t(92));if(Ue(o)){if(1<o.length)throw Error(t(93));o=o[0]}i=o}i==null&&(i=""),o=i}n._wrapperState={initialValue:ve(o)}}function xe(n,i){var o=ve(i.value),c=ve(i.defaultValue);o!=null&&(o=""+o,o!==n.value&&(n.value=o),i.defaultValue==null&&n.defaultValue!==o&&(n.defaultValue=o)),c!=null&&(n.defaultValue=""+c)}function ye(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function ge(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function je(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?ge(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var be,Fe=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,c,d){MSApp.execUnsafeLocalFunction(function(){return n(i,o,c,d)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(be=be||document.createElement("div"),be.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=be.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function ft(n,i){if(i){var o=n.firstChild;if(o&&o===n.lastChild&&o.nodeType===3){o.nodeValue=i;return}}n.textContent=i}var Ee={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ze=["Webkit","ms","Moz","O"];Object.keys(Ee).forEach(function(n){ze.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),Ee[i]=Ee[n]})});function Ze(n,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||Ee.hasOwnProperty(n)&&Ee[n]?(""+i).trim():i+"px"}function ot(n,i){n=n.style;for(var o in i)if(i.hasOwnProperty(o)){var c=o.indexOf("--")===0,d=Ze(o,i[o],c);o==="float"&&(o="cssFloat"),c?n.setProperty(o,d):n[o]=d}}var Ve=L({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function mt(n,i){if(i){if(Ve[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function ct(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Lt=null;function Y(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Pe=null,fe=null,_e=null;function Ie(n){if(n=xo(n)){if(typeof Pe!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Sa(i),Pe(n.stateNode,n.type,i))}}function Ne(n){fe?_e?_e.push(n):_e=[n]:fe=n}function ut(){if(fe){var n=fe,i=_e;if(_e=fe=null,Ie(n),i)for(n=0;n<i.length;n++)Ie(i[n])}}function Ut(n,i){return n(i)}function Zt(){}var wt=!1;function Rn(n,i,o){if(wt)return n(i,o);wt=!0;try{return Ut(n,i,o)}finally{wt=!1,(fe!==null||_e!==null)&&(Zt(),ut())}}function Mn(n,i){var o=n.stateNode;if(o===null)return null;var c=Sa(o);if(c===null)return null;o=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(o&&typeof o!="function")throw Error(t(231,i,typeof o));return o}var is=!1;if(f)try{var qi={};Object.defineProperty(qi,"passive",{get:function(){is=!0}}),window.addEventListener("test",qi,qi),window.removeEventListener("test",qi,qi)}catch{is=!1}function Ti(n,i,o,c,d,p,T,U,H){var ce=Array.prototype.slice.call(arguments,3);try{i.apply(o,ce)}catch(Me){this.onError(Me)}}var wi=!1,Cr=null,Rr=!1,Yi=null,Qo={onError:function(n){wi=!0,Cr=n}};function rs(n,i,o,c,d,p,T,U,H){wi=!1,Cr=null,Ti.apply(Qo,arguments)}function ea(n,i,o,c,d,p,T,U,H){if(rs.apply(this,arguments),wi){if(wi){var ce=Cr;wi=!1,Cr=null}else throw Error(t(198));Rr||(Rr=!0,Yi=ce)}}function hi(n){var i=n,o=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(o=i.return),n=i.return;while(n)}return i.tag===3?o:null}function ta(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function na(n){if(hi(n)!==n)throw Error(t(188))}function Gl(n){var i=n.alternate;if(!i){if(i=hi(n),i===null)throw Error(t(188));return i!==n?null:n}for(var o=n,c=i;;){var d=o.return;if(d===null)break;var p=d.alternate;if(p===null){if(c=d.return,c!==null){o=c;continue}break}if(d.child===p.child){for(p=d.child;p;){if(p===o)return na(d),n;if(p===c)return na(d),i;p=p.sibling}throw Error(t(188))}if(o.return!==c.return)o=d,c=p;else{for(var T=!1,U=d.child;U;){if(U===o){T=!0,o=d,c=p;break}if(U===c){T=!0,c=d,o=p;break}U=U.sibling}if(!T){for(U=p.child;U;){if(U===o){T=!0,o=p,c=d;break}if(U===c){T=!0,c=p,o=d;break}U=U.sibling}if(!T)throw Error(t(189))}}if(o.alternate!==c)throw Error(t(190))}if(o.tag!==3)throw Error(t(188));return o.stateNode.current===o?n:i}function ia(n){return n=Gl(n),n!==null?ra(n):null}function ra(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=ra(n);if(i!==null)return i;n=n.sibling}return null}var sa=e.unstable_scheduleCallback,R=e.unstable_cancelCallback,$=e.unstable_shouldYield,ae=e.unstable_requestPaint,te=e.unstable_now,Z=e.unstable_getCurrentPriorityLevel,we=e.unstable_ImmediatePriority,Le=e.unstable_UserBlockingPriority,Oe=e.unstable_NormalPriority,Ge=e.unstable_LowPriority,at=e.unstable_IdlePriority,rt=null,Xe=null;function Mt(n){if(Xe&&typeof Xe.onCommitFiberRoot=="function")try{Xe.onCommitFiberRoot(rt,n,void 0,(n.current.flags&128)===128)}catch{}}var dt=Math.clz32?Math.clz32:Et,Wt=Math.log,kt=Math.LN2;function Et(n){return n>>>=0,n===0?32:31-(Wt(n)/kt|0)|0}var Ke=64,Xt=4194304;function yt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function pn(n,i){var o=n.pendingLanes;if(o===0)return 0;var c=0,d=n.suspendedLanes,p=n.pingedLanes,T=o&268435455;if(T!==0){var U=T&~d;U!==0?c=yt(U):(p&=T,p!==0&&(c=yt(p)))}else T=o&~d,T!==0?c=yt(T):p!==0&&(c=yt(p));if(c===0)return 0;if(i!==0&&i!==c&&(i&d)===0&&(d=c&-c,p=i&-i,d>=p||d===16&&(p&4194240)!==0))return i;if((c&4)!==0&&(c|=o&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)o=31-dt(i),d=1<<o,c|=n[o],i&=~d;return c}function $i(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function En(n,i){for(var o=n.suspendedLanes,c=n.pingedLanes,d=n.expirationTimes,p=n.pendingLanes;0<p;){var T=31-dt(p),U=1<<T,H=d[T];H===-1?((U&o)===0||(U&c)!==0)&&(d[T]=$i(U,i)):H<=i&&(n.expiredLanes|=U),p&=~U}}function Ai(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Nt(){var n=Ke;return Ke<<=1,(Ke&4194240)===0&&(Ke=64),n}function mn(n){for(var i=[],o=0;31>o;o++)i.push(n);return i}function rn(n,i,o){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-dt(i),n[i]=o}function un(n,i){var o=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<o;){var d=31-dt(o),p=1<<d;i[d]=0,c[d]=-1,n[d]=-1,o&=~p}}function sn(n,i){var o=n.entangledLanes|=i;for(n=n.entanglements;o;){var c=31-dt(o),d=1<<c;d&i|n[c]&i&&(n[c]|=i),o&=~d}}var At=0;function pi(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var dd,Wl,hd,pd,md,Xl=!1,oa=[],Ki=null,Zi=null,Ji=null,no=new Map,io=new Map,Qi=[],Bg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function gd(n,i){switch(n){case"focusin":case"focusout":Ki=null;break;case"dragenter":case"dragleave":Zi=null;break;case"mouseover":case"mouseout":Ji=null;break;case"pointerover":case"pointerout":no.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":io.delete(i.pointerId)}}function ro(n,i,o,c,d,p){return n===null||n.nativeEvent!==p?(n={blockedOn:i,domEventName:o,eventSystemFlags:c,nativeEvent:p,targetContainers:[d]},i!==null&&(i=xo(i),i!==null&&Wl(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),n)}function Hg(n,i,o,c,d){switch(i){case"focusin":return Ki=ro(Ki,n,i,o,c,d),!0;case"dragenter":return Zi=ro(Zi,n,i,o,c,d),!0;case"mouseover":return Ji=ro(Ji,n,i,o,c,d),!0;case"pointerover":var p=d.pointerId;return no.set(p,ro(no.get(p)||null,n,i,o,c,d)),!0;case"gotpointercapture":return p=d.pointerId,io.set(p,ro(io.get(p)||null,n,i,o,c,d)),!0}return!1}function vd(n){var i=br(n.target);if(i!==null){var o=hi(i);if(o!==null){if(i=o.tag,i===13){if(i=ta(o),i!==null){n.blockedOn=i,md(n.priority,function(){hd(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){n.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}n.blockedOn=null}function aa(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var o=ql(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(o===null){o=n.nativeEvent;var c=new o.constructor(o.type,o);Lt=c,o.target.dispatchEvent(c),Lt=null}else return i=xo(o),i!==null&&Wl(i),n.blockedOn=o,!1;i.shift()}return!0}function _d(n,i,o){aa(n)&&o.delete(i)}function Vg(){Xl=!1,Ki!==null&&aa(Ki)&&(Ki=null),Zi!==null&&aa(Zi)&&(Zi=null),Ji!==null&&aa(Ji)&&(Ji=null),no.forEach(_d),io.forEach(_d)}function so(n,i){n.blockedOn===i&&(n.blockedOn=null,Xl||(Xl=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,Vg)))}function oo(n){function i(d){return so(d,n)}if(0<oa.length){so(oa[0],n);for(var o=1;o<oa.length;o++){var c=oa[o];c.blockedOn===n&&(c.blockedOn=null)}}for(Ki!==null&&so(Ki,n),Zi!==null&&so(Zi,n),Ji!==null&&so(Ji,n),no.forEach(i),io.forEach(i),o=0;o<Qi.length;o++)c=Qi[o],c.blockedOn===n&&(c.blockedOn=null);for(;0<Qi.length&&(o=Qi[0],o.blockedOn===null);)vd(o),o.blockedOn===null&&Qi.shift()}var ss=b.ReactCurrentBatchConfig,la=!0;function Gg(n,i,o,c){var d=At,p=ss.transition;ss.transition=null;try{At=1,jl(n,i,o,c)}finally{At=d,ss.transition=p}}function Wg(n,i,o,c){var d=At,p=ss.transition;ss.transition=null;try{At=4,jl(n,i,o,c)}finally{At=d,ss.transition=p}}function jl(n,i,o,c){if(la){var d=ql(n,i,o,c);if(d===null)uc(n,i,c,ca,o),gd(n,c);else if(Hg(d,n,i,o,c))c.stopPropagation();else if(gd(n,c),i&4&&-1<Bg.indexOf(n)){for(;d!==null;){var p=xo(d);if(p!==null&&dd(p),p=ql(n,i,o,c),p===null&&uc(n,i,c,ca,o),p===d)break;d=p}d!==null&&c.stopPropagation()}else uc(n,i,c,null,o)}}var ca=null;function ql(n,i,o,c){if(ca=null,n=Y(c),n=br(n),n!==null)if(i=hi(n),i===null)n=null;else if(o=i.tag,o===13){if(n=ta(i),n!==null)return n;n=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return ca=n,null}function xd(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Z()){case we:return 1;case Le:return 4;case Oe:case Ge:return 16;case at:return 536870912;default:return 16}default:return 16}}var er=null,Yl=null,ua=null;function yd(){if(ua)return ua;var n,i=Yl,o=i.length,c,d="value"in er?er.value:er.textContent,p=d.length;for(n=0;n<o&&i[n]===d[n];n++);var T=o-n;for(c=1;c<=T&&i[o-c]===d[p-c];c++);return ua=d.slice(n,1<c?1-c:void 0)}function fa(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function da(){return!0}function Sd(){return!1}function kn(n){function i(o,c,d,p,T){this._reactName=o,this._targetInst=d,this.type=c,this.nativeEvent=p,this.target=T,this.currentTarget=null;for(var U in n)n.hasOwnProperty(U)&&(o=n[U],this[U]=o?o(p):p[U]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?da:Sd,this.isPropagationStopped=Sd,this}return L(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=da)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=da)},persist:function(){},isPersistent:da}),i}var os={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$l=kn(os),ao=L({},os,{view:0,detail:0}),Xg=kn(ao),Kl,Zl,lo,ha=L({},ao,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ql,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==lo&&(lo&&n.type==="mousemove"?(Kl=n.screenX-lo.screenX,Zl=n.screenY-lo.screenY):Zl=Kl=0,lo=n),Kl)},movementY:function(n){return"movementY"in n?n.movementY:Zl}}),Md=kn(ha),jg=L({},ha,{dataTransfer:0}),qg=kn(jg),Yg=L({},ao,{relatedTarget:0}),Jl=kn(Yg),$g=L({},os,{animationName:0,elapsedTime:0,pseudoElement:0}),Kg=kn($g),Zg=L({},os,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),Jg=kn(Zg),Qg=L({},os,{data:0}),Ed=kn(Qg),e0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},t0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},n0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function i0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=n0[n])?!!i[n]:!1}function Ql(){return i0}var r0=L({},ao,{key:function(n){if(n.key){var i=e0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=fa(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?t0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ql,charCode:function(n){return n.type==="keypress"?fa(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?fa(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),s0=kn(r0),o0=L({},ha,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=kn(o0),a0=L({},ao,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ql}),l0=kn(a0),c0=L({},os,{propertyName:0,elapsedTime:0,pseudoElement:0}),u0=kn(c0),f0=L({},ha,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),d0=kn(f0),h0=[9,13,27,32],ec=f&&"CompositionEvent"in window,co=null;f&&"documentMode"in document&&(co=document.documentMode);var p0=f&&"TextEvent"in window&&!co,wd=f&&(!ec||co&&8<co&&11>=co),Ad=" ",Cd=!1;function Rd(n,i){switch(n){case"keyup":return h0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function bd(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var as=!1;function m0(n,i){switch(n){case"compositionend":return bd(i);case"keypress":return i.which!==32?null:(Cd=!0,Ad);case"textInput":return n=i.data,n===Ad&&Cd?null:n;default:return null}}function g0(n,i){if(as)return n==="compositionend"||!ec&&Rd(n,i)?(n=yd(),ua=Yl=er=null,as=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return wd&&i.locale!=="ko"?null:i.data;default:return null}}var v0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Pd(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!v0[n.type]:i==="textarea"}function Ld(n,i,o,c){Ne(c),i=_a(i,"onChange"),0<i.length&&(o=new $l("onChange","change",null,o,c),n.push({event:o,listeners:i}))}var uo=null,fo=null;function _0(n){$d(n,0)}function pa(n){var i=ds(n);if(nt(i))return n}function x0(n,i){if(n==="change")return i}var Dd=!1;if(f){var tc;if(f){var nc="oninput"in document;if(!nc){var Nd=document.createElement("div");Nd.setAttribute("oninput","return;"),nc=typeof Nd.oninput=="function"}tc=nc}else tc=!1;Dd=tc&&(!document.documentMode||9<document.documentMode)}function Id(){uo&&(uo.detachEvent("onpropertychange",Ud),fo=uo=null)}function Ud(n){if(n.propertyName==="value"&&pa(fo)){var i=[];Ld(i,fo,n,Y(n)),Rn(_0,i)}}function y0(n,i,o){n==="focusin"?(Id(),uo=i,fo=o,uo.attachEvent("onpropertychange",Ud)):n==="focusout"&&Id()}function S0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return pa(fo)}function M0(n,i){if(n==="click")return pa(i)}function E0(n,i){if(n==="input"||n==="change")return pa(i)}function T0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var ei=typeof Object.is=="function"?Object.is:T0;function ho(n,i){if(ei(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var o=Object.keys(n),c=Object.keys(i);if(o.length!==c.length)return!1;for(c=0;c<o.length;c++){var d=o[c];if(!h.call(i,d)||!ei(n[d],i[d]))return!1}return!0}function Fd(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Od(n,i){var o=Fd(n);n=0;for(var c;o;){if(o.nodeType===3){if(c=n+o.textContent.length,n<=i&&c>=i)return{node:o,offset:i-n};n=c}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=Fd(o)}}function kd(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?kd(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function zd(){for(var n=window,i=$e();i instanceof n.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)n=i.contentWindow;else break;i=$e(n.document)}return i}function ic(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function w0(n){var i=zd(),o=n.focusedElem,c=n.selectionRange;if(i!==o&&o&&o.ownerDocument&&kd(o.ownerDocument.documentElement,o)){if(c!==null&&ic(o)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(n,o.value.length);else if(n=(i=o.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var d=o.textContent.length,p=Math.min(c.start,d);c=c.end===void 0?p:Math.min(c.end,d),!n.extend&&p>c&&(d=c,c=p,p=d),d=Od(o,p);var T=Od(o,c);d&&T&&(n.rangeCount!==1||n.anchorNode!==d.node||n.anchorOffset!==d.offset||n.focusNode!==T.node||n.focusOffset!==T.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),n.removeAllRanges(),p>c?(n.addRange(i),n.extend(T.node,T.offset)):(i.setEnd(T.node,T.offset),n.addRange(i)))}}for(i=[],n=o;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)n=i[o],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var A0=f&&"documentMode"in document&&11>=document.documentMode,ls=null,rc=null,po=null,sc=!1;function Bd(n,i,o){var c=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;sc||ls==null||ls!==$e(c)||(c=ls,"selectionStart"in c&&ic(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),po&&ho(po,c)||(po=c,c=_a(rc,"onSelect"),0<c.length&&(i=new $l("onSelect","select",null,i,o),n.push({event:i,listeners:c}),i.target=ls)))}function ma(n,i){var o={};return o[n.toLowerCase()]=i.toLowerCase(),o["Webkit"+n]="webkit"+i,o["Moz"+n]="moz"+i,o}var cs={animationend:ma("Animation","AnimationEnd"),animationiteration:ma("Animation","AnimationIteration"),animationstart:ma("Animation","AnimationStart"),transitionend:ma("Transition","TransitionEnd")},oc={},Hd={};f&&(Hd=document.createElement("div").style,"AnimationEvent"in window||(delete cs.animationend.animation,delete cs.animationiteration.animation,delete cs.animationstart.animation),"TransitionEvent"in window||delete cs.transitionend.transition);function ga(n){if(oc[n])return oc[n];if(!cs[n])return n;var i=cs[n],o;for(o in i)if(i.hasOwnProperty(o)&&o in Hd)return oc[n]=i[o];return n}var Vd=ga("animationend"),Gd=ga("animationiteration"),Wd=ga("animationstart"),Xd=ga("transitionend"),jd=new Map,qd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function tr(n,i){jd.set(n,i),l(i,[n])}for(var ac=0;ac<qd.length;ac++){var lc=qd[ac],C0=lc.toLowerCase(),R0=lc[0].toUpperCase()+lc.slice(1);tr(C0,"on"+R0)}tr(Vd,"onAnimationEnd"),tr(Gd,"onAnimationIteration"),tr(Wd,"onAnimationStart"),tr("dblclick","onDoubleClick"),tr("focusin","onFocus"),tr("focusout","onBlur"),tr(Xd,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var mo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),b0=new Set("cancel close invalid load scroll toggle".split(" ").concat(mo));function Yd(n,i,o){var c=n.type||"unknown-event";n.currentTarget=o,ea(c,i,void 0,n),n.currentTarget=null}function $d(n,i){i=(i&4)!==0;for(var o=0;o<n.length;o++){var c=n[o],d=c.event;c=c.listeners;e:{var p=void 0;if(i)for(var T=c.length-1;0<=T;T--){var U=c[T],H=U.instance,ce=U.currentTarget;if(U=U.listener,H!==p&&d.isPropagationStopped())break e;Yd(d,U,ce),p=H}else for(T=0;T<c.length;T++){if(U=c[T],H=U.instance,ce=U.currentTarget,U=U.listener,H!==p&&d.isPropagationStopped())break e;Yd(d,U,ce),p=H}}}if(Rr)throw n=Yi,Rr=!1,Yi=null,n}function Ft(n,i){var o=i[gc];o===void 0&&(o=i[gc]=new Set);var c=n+"__bubble";o.has(c)||(Kd(i,n,2,!1),o.add(c))}function cc(n,i,o){var c=0;i&&(c|=4),Kd(o,n,c,i)}var va="_reactListening"+Math.random().toString(36).slice(2);function go(n){if(!n[va]){n[va]=!0,r.forEach(function(o){o!=="selectionchange"&&(b0.has(o)||cc(o,!1,n),cc(o,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[va]||(i[va]=!0,cc("selectionchange",!1,i))}}function Kd(n,i,o,c){switch(xd(i)){case 1:var d=Gg;break;case 4:d=Wg;break;default:d=jl}o=d.bind(null,i,o,n),d=void 0,!is||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),c?d!==void 0?n.addEventListener(i,o,{capture:!0,passive:d}):n.addEventListener(i,o,!0):d!==void 0?n.addEventListener(i,o,{passive:d}):n.addEventListener(i,o,!1)}function uc(n,i,o,c,d){var p=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var T=c.tag;if(T===3||T===4){var U=c.stateNode.containerInfo;if(U===d||U.nodeType===8&&U.parentNode===d)break;if(T===4)for(T=c.return;T!==null;){var H=T.tag;if((H===3||H===4)&&(H=T.stateNode.containerInfo,H===d||H.nodeType===8&&H.parentNode===d))return;T=T.return}for(;U!==null;){if(T=br(U),T===null)return;if(H=T.tag,H===5||H===6){c=p=T;continue e}U=U.parentNode}}c=c.return}Rn(function(){var ce=p,Me=Y(o),Te=[];e:{var Se=jd.get(n);if(Se!==void 0){var ke=$l,We=n;switch(n){case"keypress":if(fa(o)===0)break e;case"keydown":case"keyup":ke=s0;break;case"focusin":We="focus",ke=Jl;break;case"focusout":We="blur",ke=Jl;break;case"beforeblur":case"afterblur":ke=Jl;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ke=Md;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ke=qg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ke=l0;break;case Vd:case Gd:case Wd:ke=Kg;break;case Xd:ke=u0;break;case"scroll":ke=Xg;break;case"wheel":ke=d0;break;case"copy":case"cut":case"paste":ke=Jg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ke=Td}var qe=(i&4)!==0,Yt=!qe&&n==="scroll",ee=qe?Se!==null?Se+"Capture":null:Se;qe=[];for(var q=ce,ie;q!==null;){ie=q;var Ae=ie.stateNode;if(ie.tag===5&&Ae!==null&&(ie=Ae,ee!==null&&(Ae=Mn(q,ee),Ae!=null&&qe.push(vo(q,Ae,ie)))),Yt)break;q=q.return}0<qe.length&&(Se=new ke(Se,We,null,o,Me),Te.push({event:Se,listeners:qe}))}}if((i&7)===0){e:{if(Se=n==="mouseover"||n==="pointerover",ke=n==="mouseout"||n==="pointerout",Se&&o!==Lt&&(We=o.relatedTarget||o.fromElement)&&(br(We)||We[Ci]))break e;if((ke||Se)&&(Se=Me.window===Me?Me:(Se=Me.ownerDocument)?Se.defaultView||Se.parentWindow:window,ke?(We=o.relatedTarget||o.toElement,ke=ce,We=We?br(We):null,We!==null&&(Yt=hi(We),We!==Yt||We.tag!==5&&We.tag!==6)&&(We=null)):(ke=null,We=ce),ke!==We)){if(qe=Md,Ae="onMouseLeave",ee="onMouseEnter",q="mouse",(n==="pointerout"||n==="pointerover")&&(qe=Td,Ae="onPointerLeave",ee="onPointerEnter",q="pointer"),Yt=ke==null?Se:ds(ke),ie=We==null?Se:ds(We),Se=new qe(Ae,q+"leave",ke,o,Me),Se.target=Yt,Se.relatedTarget=ie,Ae=null,br(Me)===ce&&(qe=new qe(ee,q+"enter",We,o,Me),qe.target=ie,qe.relatedTarget=Yt,Ae=qe),Yt=Ae,ke&&We)t:{for(qe=ke,ee=We,q=0,ie=qe;ie;ie=us(ie))q++;for(ie=0,Ae=ee;Ae;Ae=us(Ae))ie++;for(;0<q-ie;)qe=us(qe),q--;for(;0<ie-q;)ee=us(ee),ie--;for(;q--;){if(qe===ee||ee!==null&&qe===ee.alternate)break t;qe=us(qe),ee=us(ee)}qe=null}else qe=null;ke!==null&&Zd(Te,Se,ke,qe,!1),We!==null&&Yt!==null&&Zd(Te,Yt,We,qe,!0)}}e:{if(Se=ce?ds(ce):window,ke=Se.nodeName&&Se.nodeName.toLowerCase(),ke==="select"||ke==="input"&&Se.type==="file")var Ye=x0;else if(Pd(Se))if(Dd)Ye=E0;else{Ye=S0;var Qe=y0}else(ke=Se.nodeName)&&ke.toLowerCase()==="input"&&(Se.type==="checkbox"||Se.type==="radio")&&(Ye=M0);if(Ye&&(Ye=Ye(n,ce))){Ld(Te,Ye,o,Me);break e}Qe&&Qe(n,Se,ce),n==="focusout"&&(Qe=Se._wrapperState)&&Qe.controlled&&Se.type==="number"&&vt(Se,"number",Se.value)}switch(Qe=ce?ds(ce):window,n){case"focusin":(Pd(Qe)||Qe.contentEditable==="true")&&(ls=Qe,rc=ce,po=null);break;case"focusout":po=rc=ls=null;break;case"mousedown":sc=!0;break;case"contextmenu":case"mouseup":case"dragend":sc=!1,Bd(Te,o,Me);break;case"selectionchange":if(A0)break;case"keydown":case"keyup":Bd(Te,o,Me)}var et;if(ec)e:{switch(n){case"compositionstart":var lt="onCompositionStart";break e;case"compositionend":lt="onCompositionEnd";break e;case"compositionupdate":lt="onCompositionUpdate";break e}lt=void 0}else as?Rd(n,o)&&(lt="onCompositionEnd"):n==="keydown"&&o.keyCode===229&&(lt="onCompositionStart");lt&&(wd&&o.locale!=="ko"&&(as||lt!=="onCompositionStart"?lt==="onCompositionEnd"&&as&&(et=yd()):(er=Me,Yl="value"in er?er.value:er.textContent,as=!0)),Qe=_a(ce,lt),0<Qe.length&&(lt=new Ed(lt,n,null,o,Me),Te.push({event:lt,listeners:Qe}),et?lt.data=et:(et=bd(o),et!==null&&(lt.data=et)))),(et=p0?m0(n,o):g0(n,o))&&(ce=_a(ce,"onBeforeInput"),0<ce.length&&(Me=new Ed("onBeforeInput","beforeinput",null,o,Me),Te.push({event:Me,listeners:ce}),Me.data=et))}$d(Te,i)})}function vo(n,i,o){return{instance:n,listener:i,currentTarget:o}}function _a(n,i){for(var o=i+"Capture",c=[];n!==null;){var d=n,p=d.stateNode;d.tag===5&&p!==null&&(d=p,p=Mn(n,o),p!=null&&c.unshift(vo(n,p,d)),p=Mn(n,i),p!=null&&c.push(vo(n,p,d))),n=n.return}return c}function us(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Zd(n,i,o,c,d){for(var p=i._reactName,T=[];o!==null&&o!==c;){var U=o,H=U.alternate,ce=U.stateNode;if(H!==null&&H===c)break;U.tag===5&&ce!==null&&(U=ce,d?(H=Mn(o,p),H!=null&&T.unshift(vo(o,H,U))):d||(H=Mn(o,p),H!=null&&T.push(vo(o,H,U)))),o=o.return}T.length!==0&&n.push({event:i,listeners:T})}var P0=/\r\n?/g,L0=/\u0000|\uFFFD/g;function Jd(n){return(typeof n=="string"?n:""+n).replace(P0,`
`).replace(L0,"")}function xa(n,i,o){if(i=Jd(i),Jd(n)!==i&&o)throw Error(t(425))}function ya(){}var fc=null,dc=null;function hc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var pc=typeof setTimeout=="function"?setTimeout:void 0,D0=typeof clearTimeout=="function"?clearTimeout:void 0,Qd=typeof Promise=="function"?Promise:void 0,N0=typeof queueMicrotask=="function"?queueMicrotask:typeof Qd<"u"?function(n){return Qd.resolve(null).then(n).catch(I0)}:pc;function I0(n){setTimeout(function(){throw n})}function mc(n,i){var o=i,c=0;do{var d=o.nextSibling;if(n.removeChild(o),d&&d.nodeType===8)if(o=d.data,o==="/$"){if(c===0){n.removeChild(d),oo(i);return}c--}else o!=="$"&&o!=="$?"&&o!=="$!"||c++;o=d}while(o);oo(i)}function nr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function eh(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return n;i--}else o==="/$"&&i++}n=n.previousSibling}return null}var fs=Math.random().toString(36).slice(2),mi="__reactFiber$"+fs,_o="__reactProps$"+fs,Ci="__reactContainer$"+fs,gc="__reactEvents$"+fs,U0="__reactListeners$"+fs,F0="__reactHandles$"+fs;function br(n){var i=n[mi];if(i)return i;for(var o=n.parentNode;o;){if(i=o[Ci]||o[mi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(n=eh(n);n!==null;){if(o=n[mi])return o;n=eh(n)}return i}n=o,o=n.parentNode}return null}function xo(n){return n=n[mi]||n[Ci],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function ds(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Sa(n){return n[_o]||null}var vc=[],hs=-1;function ir(n){return{current:n}}function Ot(n){0>hs||(n.current=vc[hs],vc[hs]=null,hs--)}function It(n,i){hs++,vc[hs]=n.current,n.current=i}var rr={},gn=ir(rr),bn=ir(!1),Pr=rr;function ps(n,i){var o=n.type.contextTypes;if(!o)return rr;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var d={},p;for(p in o)d[p]=i[p];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=d),d}function Pn(n){return n=n.childContextTypes,n!=null}function Ma(){Ot(bn),Ot(gn)}function th(n,i,o){if(gn.current!==rr)throw Error(t(168));It(gn,i),It(bn,o)}function nh(n,i,o){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return o;c=c.getChildContext();for(var d in c)if(!(d in i))throw Error(t(108,le(n)||"Unknown",d));return L({},o,c)}function Ea(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||rr,Pr=gn.current,It(gn,n),It(bn,bn.current),!0}function ih(n,i,o){var c=n.stateNode;if(!c)throw Error(t(169));o?(n=nh(n,i,Pr),c.__reactInternalMemoizedMergedChildContext=n,Ot(bn),Ot(gn),It(gn,n)):Ot(bn),It(bn,o)}var Ri=null,Ta=!1,_c=!1;function rh(n){Ri===null?Ri=[n]:Ri.push(n)}function O0(n){Ta=!0,rh(n)}function sr(){if(!_c&&Ri!==null){_c=!0;var n=0,i=At;try{var o=Ri;for(At=1;n<o.length;n++){var c=o[n];do c=c(!0);while(c!==null)}Ri=null,Ta=!1}catch(d){throw Ri!==null&&(Ri=Ri.slice(n+1)),sa(we,sr),d}finally{At=i,_c=!1}}return null}var ms=[],gs=0,wa=null,Aa=0,Xn=[],jn=0,Lr=null,bi=1,Pi="";function Dr(n,i){ms[gs++]=Aa,ms[gs++]=wa,wa=n,Aa=i}function sh(n,i,o){Xn[jn++]=bi,Xn[jn++]=Pi,Xn[jn++]=Lr,Lr=n;var c=bi;n=Pi;var d=32-dt(c)-1;c&=~(1<<d),o+=1;var p=32-dt(i)+d;if(30<p){var T=d-d%5;p=(c&(1<<T)-1).toString(32),c>>=T,d-=T,bi=1<<32-dt(i)+d|o<<d|c,Pi=p+n}else bi=1<<p|o<<d|c,Pi=n}function xc(n){n.return!==null&&(Dr(n,1),sh(n,1,0))}function yc(n){for(;n===wa;)wa=ms[--gs],ms[gs]=null,Aa=ms[--gs],ms[gs]=null;for(;n===Lr;)Lr=Xn[--jn],Xn[jn]=null,Pi=Xn[--jn],Xn[jn]=null,bi=Xn[--jn],Xn[jn]=null}var zn=null,Bn=null,zt=!1,ti=null;function oh(n,i){var o=Kn(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=n,i=n.deletions,i===null?(n.deletions=[o],n.flags|=16):i.push(o)}function ah(n,i){switch(n.tag){case 5:var o=n.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,zn=n,Bn=nr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,zn=n,Bn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=Lr!==null?{id:bi,overflow:Pi}:null,n.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=Kn(18,null,null,0),o.stateNode=i,o.return=n,n.child=o,zn=n,Bn=null,!0):!1;default:return!1}}function Sc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Mc(n){if(zt){var i=Bn;if(i){var o=i;if(!ah(n,i)){if(Sc(n))throw Error(t(418));i=nr(o.nextSibling);var c=zn;i&&ah(n,i)?oh(c,o):(n.flags=n.flags&-4097|2,zt=!1,zn=n)}}else{if(Sc(n))throw Error(t(418));n.flags=n.flags&-4097|2,zt=!1,zn=n}}}function lh(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;zn=n}function Ca(n){if(n!==zn)return!1;if(!zt)return lh(n),zt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!hc(n.type,n.memoizedProps)),i&&(i=Bn)){if(Sc(n))throw ch(),Error(t(418));for(;i;)oh(n,i),i=nr(i.nextSibling)}if(lh(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="/$"){if(i===0){Bn=nr(n.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}n=n.nextSibling}Bn=null}}else Bn=zn?nr(n.stateNode.nextSibling):null;return!0}function ch(){for(var n=Bn;n;)n=nr(n.nextSibling)}function vs(){Bn=zn=null,zt=!1}function Ec(n){ti===null?ti=[n]:ti.push(n)}var k0=b.ReactCurrentBatchConfig;function yo(n,i,o){if(n=o.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(t(309));var c=o.stateNode}if(!c)throw Error(t(147,n));var d=c,p=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===p?i.ref:(i=function(T){var U=d.refs;T===null?delete U[p]:U[p]=T},i._stringRef=p,i)}if(typeof n!="string")throw Error(t(284));if(!o._owner)throw Error(t(290,n))}return n}function Ra(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function uh(n){var i=n._init;return i(n._payload)}function fh(n){function i(ee,q){if(n){var ie=ee.deletions;ie===null?(ee.deletions=[q],ee.flags|=16):ie.push(q)}}function o(ee,q){if(!n)return null;for(;q!==null;)i(ee,q),q=q.sibling;return null}function c(ee,q){for(ee=new Map;q!==null;)q.key!==null?ee.set(q.key,q):ee.set(q.index,q),q=q.sibling;return ee}function d(ee,q){return ee=hr(ee,q),ee.index=0,ee.sibling=null,ee}function p(ee,q,ie){return ee.index=ie,n?(ie=ee.alternate,ie!==null?(ie=ie.index,ie<q?(ee.flags|=2,q):ie):(ee.flags|=2,q)):(ee.flags|=1048576,q)}function T(ee){return n&&ee.alternate===null&&(ee.flags|=2),ee}function U(ee,q,ie,Ae){return q===null||q.tag!==6?(q=pu(ie,ee.mode,Ae),q.return=ee,q):(q=d(q,ie),q.return=ee,q)}function H(ee,q,ie,Ae){var Ye=ie.type;return Ye===k?Me(ee,q,ie.props.children,Ae,ie.key):q!==null&&(q.elementType===Ye||typeof Ye=="object"&&Ye!==null&&Ye.$$typeof===oe&&uh(Ye)===q.type)?(Ae=d(q,ie.props),Ae.ref=yo(ee,q,ie),Ae.return=ee,Ae):(Ae=Ja(ie.type,ie.key,ie.props,null,ee.mode,Ae),Ae.ref=yo(ee,q,ie),Ae.return=ee,Ae)}function ce(ee,q,ie,Ae){return q===null||q.tag!==4||q.stateNode.containerInfo!==ie.containerInfo||q.stateNode.implementation!==ie.implementation?(q=mu(ie,ee.mode,Ae),q.return=ee,q):(q=d(q,ie.children||[]),q.return=ee,q)}function Me(ee,q,ie,Ae,Ye){return q===null||q.tag!==7?(q=Br(ie,ee.mode,Ae,Ye),q.return=ee,q):(q=d(q,ie),q.return=ee,q)}function Te(ee,q,ie){if(typeof q=="string"&&q!==""||typeof q=="number")return q=pu(""+q,ee.mode,ie),q.return=ee,q;if(typeof q=="object"&&q!==null){switch(q.$$typeof){case W:return ie=Ja(q.type,q.key,q.props,null,ee.mode,ie),ie.ref=yo(ee,null,q),ie.return=ee,ie;case I:return q=mu(q,ee.mode,ie),q.return=ee,q;case oe:var Ae=q._init;return Te(ee,Ae(q._payload),ie)}if(Ue(q)||pe(q))return q=Br(q,ee.mode,ie,null),q.return=ee,q;Ra(ee,q)}return null}function Se(ee,q,ie,Ae){var Ye=q!==null?q.key:null;if(typeof ie=="string"&&ie!==""||typeof ie=="number")return Ye!==null?null:U(ee,q,""+ie,Ae);if(typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case W:return ie.key===Ye?H(ee,q,ie,Ae):null;case I:return ie.key===Ye?ce(ee,q,ie,Ae):null;case oe:return Ye=ie._init,Se(ee,q,Ye(ie._payload),Ae)}if(Ue(ie)||pe(ie))return Ye!==null?null:Me(ee,q,ie,Ae,null);Ra(ee,ie)}return null}function ke(ee,q,ie,Ae,Ye){if(typeof Ae=="string"&&Ae!==""||typeof Ae=="number")return ee=ee.get(ie)||null,U(q,ee,""+Ae,Ye);if(typeof Ae=="object"&&Ae!==null){switch(Ae.$$typeof){case W:return ee=ee.get(Ae.key===null?ie:Ae.key)||null,H(q,ee,Ae,Ye);case I:return ee=ee.get(Ae.key===null?ie:Ae.key)||null,ce(q,ee,Ae,Ye);case oe:var Qe=Ae._init;return ke(ee,q,ie,Qe(Ae._payload),Ye)}if(Ue(Ae)||pe(Ae))return ee=ee.get(ie)||null,Me(q,ee,Ae,Ye,null);Ra(q,Ae)}return null}function We(ee,q,ie,Ae){for(var Ye=null,Qe=null,et=q,lt=q=0,ln=null;et!==null&&lt<ie.length;lt++){et.index>lt?(ln=et,et=null):ln=et.sibling;var Rt=Se(ee,et,ie[lt],Ae);if(Rt===null){et===null&&(et=ln);break}n&&et&&Rt.alternate===null&&i(ee,et),q=p(Rt,q,lt),Qe===null?Ye=Rt:Qe.sibling=Rt,Qe=Rt,et=ln}if(lt===ie.length)return o(ee,et),zt&&Dr(ee,lt),Ye;if(et===null){for(;lt<ie.length;lt++)et=Te(ee,ie[lt],Ae),et!==null&&(q=p(et,q,lt),Qe===null?Ye=et:Qe.sibling=et,Qe=et);return zt&&Dr(ee,lt),Ye}for(et=c(ee,et);lt<ie.length;lt++)ln=ke(et,ee,lt,ie[lt],Ae),ln!==null&&(n&&ln.alternate!==null&&et.delete(ln.key===null?lt:ln.key),q=p(ln,q,lt),Qe===null?Ye=ln:Qe.sibling=ln,Qe=ln);return n&&et.forEach(function(pr){return i(ee,pr)}),zt&&Dr(ee,lt),Ye}function qe(ee,q,ie,Ae){var Ye=pe(ie);if(typeof Ye!="function")throw Error(t(150));if(ie=Ye.call(ie),ie==null)throw Error(t(151));for(var Qe=Ye=null,et=q,lt=q=0,ln=null,Rt=ie.next();et!==null&&!Rt.done;lt++,Rt=ie.next()){et.index>lt?(ln=et,et=null):ln=et.sibling;var pr=Se(ee,et,Rt.value,Ae);if(pr===null){et===null&&(et=ln);break}n&&et&&pr.alternate===null&&i(ee,et),q=p(pr,q,lt),Qe===null?Ye=pr:Qe.sibling=pr,Qe=pr,et=ln}if(Rt.done)return o(ee,et),zt&&Dr(ee,lt),Ye;if(et===null){for(;!Rt.done;lt++,Rt=ie.next())Rt=Te(ee,Rt.value,Ae),Rt!==null&&(q=p(Rt,q,lt),Qe===null?Ye=Rt:Qe.sibling=Rt,Qe=Rt);return zt&&Dr(ee,lt),Ye}for(et=c(ee,et);!Rt.done;lt++,Rt=ie.next())Rt=ke(et,ee,lt,Rt.value,Ae),Rt!==null&&(n&&Rt.alternate!==null&&et.delete(Rt.key===null?lt:Rt.key),q=p(Rt,q,lt),Qe===null?Ye=Rt:Qe.sibling=Rt,Qe=Rt);return n&&et.forEach(function(vv){return i(ee,vv)}),zt&&Dr(ee,lt),Ye}function Yt(ee,q,ie,Ae){if(typeof ie=="object"&&ie!==null&&ie.type===k&&ie.key===null&&(ie=ie.props.children),typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case W:e:{for(var Ye=ie.key,Qe=q;Qe!==null;){if(Qe.key===Ye){if(Ye=ie.type,Ye===k){if(Qe.tag===7){o(ee,Qe.sibling),q=d(Qe,ie.props.children),q.return=ee,ee=q;break e}}else if(Qe.elementType===Ye||typeof Ye=="object"&&Ye!==null&&Ye.$$typeof===oe&&uh(Ye)===Qe.type){o(ee,Qe.sibling),q=d(Qe,ie.props),q.ref=yo(ee,Qe,ie),q.return=ee,ee=q;break e}o(ee,Qe);break}else i(ee,Qe);Qe=Qe.sibling}ie.type===k?(q=Br(ie.props.children,ee.mode,Ae,ie.key),q.return=ee,ee=q):(Ae=Ja(ie.type,ie.key,ie.props,null,ee.mode,Ae),Ae.ref=yo(ee,q,ie),Ae.return=ee,ee=Ae)}return T(ee);case I:e:{for(Qe=ie.key;q!==null;){if(q.key===Qe)if(q.tag===4&&q.stateNode.containerInfo===ie.containerInfo&&q.stateNode.implementation===ie.implementation){o(ee,q.sibling),q=d(q,ie.children||[]),q.return=ee,ee=q;break e}else{o(ee,q);break}else i(ee,q);q=q.sibling}q=mu(ie,ee.mode,Ae),q.return=ee,ee=q}return T(ee);case oe:return Qe=ie._init,Yt(ee,q,Qe(ie._payload),Ae)}if(Ue(ie))return We(ee,q,ie,Ae);if(pe(ie))return qe(ee,q,ie,Ae);Ra(ee,ie)}return typeof ie=="string"&&ie!==""||typeof ie=="number"?(ie=""+ie,q!==null&&q.tag===6?(o(ee,q.sibling),q=d(q,ie),q.return=ee,ee=q):(o(ee,q),q=pu(ie,ee.mode,Ae),q.return=ee,ee=q),T(ee)):o(ee,q)}return Yt}var _s=fh(!0),dh=fh(!1),ba=ir(null),Pa=null,xs=null,Tc=null;function wc(){Tc=xs=Pa=null}function Ac(n){var i=ba.current;Ot(ba),n._currentValue=i}function Cc(n,i,o){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===o)break;n=n.return}}function ys(n,i){Pa=n,Tc=xs=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(Ln=!0),n.firstContext=null)}function qn(n){var i=n._currentValue;if(Tc!==n)if(n={context:n,memoizedValue:i,next:null},xs===null){if(Pa===null)throw Error(t(308));xs=n,Pa.dependencies={lanes:0,firstContext:n}}else xs=xs.next=n;return i}var Nr=null;function Rc(n){Nr===null?Nr=[n]:Nr.push(n)}function hh(n,i,o,c){var d=i.interleaved;return d===null?(o.next=o,Rc(i)):(o.next=d.next,d.next=o),i.interleaved=o,Li(n,c)}function Li(n,i){n.lanes|=i;var o=n.alternate;for(o!==null&&(o.lanes|=i),o=n,n=n.return;n!==null;)n.childLanes|=i,o=n.alternate,o!==null&&(o.childLanes|=i),o=n,n=n.return;return o.tag===3?o.stateNode:null}var or=!1;function bc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ph(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Di(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function ar(n,i,o){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(Ct&2)!==0){var d=c.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),c.pending=i,Li(n,o)}return d=c.interleaved,d===null?(i.next=i,Rc(c)):(i.next=d.next,d.next=i),c.interleaved=i,Li(n,o)}function La(n,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,o|=c,i.lanes=o,sn(n,o)}}function mh(n,i){var o=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,o===c)){var d=null,p=null;if(o=o.firstBaseUpdate,o!==null){do{var T={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};p===null?d=p=T:p=p.next=T,o=o.next}while(o!==null);p===null?d=p=i:p=p.next=i}else d=p=i;o={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:p,shared:c.shared,effects:c.effects},n.updateQueue=o;return}n=o.lastBaseUpdate,n===null?o.firstBaseUpdate=i:n.next=i,o.lastBaseUpdate=i}function Da(n,i,o,c){var d=n.updateQueue;or=!1;var p=d.firstBaseUpdate,T=d.lastBaseUpdate,U=d.shared.pending;if(U!==null){d.shared.pending=null;var H=U,ce=H.next;H.next=null,T===null?p=ce:T.next=ce,T=H;var Me=n.alternate;Me!==null&&(Me=Me.updateQueue,U=Me.lastBaseUpdate,U!==T&&(U===null?Me.firstBaseUpdate=ce:U.next=ce,Me.lastBaseUpdate=H))}if(p!==null){var Te=d.baseState;T=0,Me=ce=H=null,U=p;do{var Se=U.lane,ke=U.eventTime;if((c&Se)===Se){Me!==null&&(Me=Me.next={eventTime:ke,lane:0,tag:U.tag,payload:U.payload,callback:U.callback,next:null});e:{var We=n,qe=U;switch(Se=i,ke=o,qe.tag){case 1:if(We=qe.payload,typeof We=="function"){Te=We.call(ke,Te,Se);break e}Te=We;break e;case 3:We.flags=We.flags&-65537|128;case 0:if(We=qe.payload,Se=typeof We=="function"?We.call(ke,Te,Se):We,Se==null)break e;Te=L({},Te,Se);break e;case 2:or=!0}}U.callback!==null&&U.lane!==0&&(n.flags|=64,Se=d.effects,Se===null?d.effects=[U]:Se.push(U))}else ke={eventTime:ke,lane:Se,tag:U.tag,payload:U.payload,callback:U.callback,next:null},Me===null?(ce=Me=ke,H=Te):Me=Me.next=ke,T|=Se;if(U=U.next,U===null){if(U=d.shared.pending,U===null)break;Se=U,U=Se.next,Se.next=null,d.lastBaseUpdate=Se,d.shared.pending=null}}while(!0);if(Me===null&&(H=Te),d.baseState=H,d.firstBaseUpdate=ce,d.lastBaseUpdate=Me,i=d.shared.interleaved,i!==null){d=i;do T|=d.lane,d=d.next;while(d!==i)}else p===null&&(d.shared.lanes=0);Fr|=T,n.lanes=T,n.memoizedState=Te}}function gh(n,i,o){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],d=c.callback;if(d!==null){if(c.callback=null,c=o,typeof d!="function")throw Error(t(191,d));d.call(c)}}}var So={},gi=ir(So),Mo=ir(So),Eo=ir(So);function Ir(n){if(n===So)throw Error(t(174));return n}function Pc(n,i){switch(It(Eo,i),It(Mo,n),It(gi,So),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:je(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=je(i,n)}Ot(gi),It(gi,i)}function Ss(){Ot(gi),Ot(Mo),Ot(Eo)}function vh(n){Ir(Eo.current);var i=Ir(gi.current),o=je(i,n.type);i!==o&&(It(Mo,n),It(gi,o))}function Lc(n){Mo.current===n&&(Ot(gi),Ot(Mo))}var Ht=ir(0);function Na(n){for(var i=n;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Dc=[];function Nc(){for(var n=0;n<Dc.length;n++)Dc[n]._workInProgressVersionPrimary=null;Dc.length=0}var Ia=b.ReactCurrentDispatcher,Ic=b.ReactCurrentBatchConfig,Ur=0,Vt=null,Jt=null,on=null,Ua=!1,To=!1,wo=0,z0=0;function vn(){throw Error(t(321))}function Uc(n,i){if(i===null)return!1;for(var o=0;o<i.length&&o<n.length;o++)if(!ei(n[o],i[o]))return!1;return!0}function Fc(n,i,o,c,d,p){if(Ur=p,Vt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Ia.current=n===null||n.memoizedState===null?G0:W0,n=o(c,d),To){p=0;do{if(To=!1,wo=0,25<=p)throw Error(t(301));p+=1,on=Jt=null,i.updateQueue=null,Ia.current=X0,n=o(c,d)}while(To)}if(Ia.current=ka,i=Jt!==null&&Jt.next!==null,Ur=0,on=Jt=Vt=null,Ua=!1,i)throw Error(t(300));return n}function Oc(){var n=wo!==0;return wo=0,n}function vi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return on===null?Vt.memoizedState=on=n:on=on.next=n,on}function Yn(){if(Jt===null){var n=Vt.alternate;n=n!==null?n.memoizedState:null}else n=Jt.next;var i=on===null?Vt.memoizedState:on.next;if(i!==null)on=i,Jt=n;else{if(n===null)throw Error(t(310));Jt=n,n={memoizedState:Jt.memoizedState,baseState:Jt.baseState,baseQueue:Jt.baseQueue,queue:Jt.queue,next:null},on===null?Vt.memoizedState=on=n:on=on.next=n}return on}function Ao(n,i){return typeof i=="function"?i(n):i}function kc(n){var i=Yn(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var c=Jt,d=c.baseQueue,p=o.pending;if(p!==null){if(d!==null){var T=d.next;d.next=p.next,p.next=T}c.baseQueue=d=p,o.pending=null}if(d!==null){p=d.next,c=c.baseState;var U=T=null,H=null,ce=p;do{var Me=ce.lane;if((Ur&Me)===Me)H!==null&&(H=H.next={lane:0,action:ce.action,hasEagerState:ce.hasEagerState,eagerState:ce.eagerState,next:null}),c=ce.hasEagerState?ce.eagerState:n(c,ce.action);else{var Te={lane:Me,action:ce.action,hasEagerState:ce.hasEagerState,eagerState:ce.eagerState,next:null};H===null?(U=H=Te,T=c):H=H.next=Te,Vt.lanes|=Me,Fr|=Me}ce=ce.next}while(ce!==null&&ce!==p);H===null?T=c:H.next=U,ei(c,i.memoizedState)||(Ln=!0),i.memoizedState=c,i.baseState=T,i.baseQueue=H,o.lastRenderedState=c}if(n=o.interleaved,n!==null){d=n;do p=d.lane,Vt.lanes|=p,Fr|=p,d=d.next;while(d!==n)}else d===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function zc(n){var i=Yn(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var c=o.dispatch,d=o.pending,p=i.memoizedState;if(d!==null){o.pending=null;var T=d=d.next;do p=n(p,T.action),T=T.next;while(T!==d);ei(p,i.memoizedState)||(Ln=!0),i.memoizedState=p,i.baseQueue===null&&(i.baseState=p),o.lastRenderedState=p}return[p,c]}function _h(){}function xh(n,i){var o=Vt,c=Yn(),d=i(),p=!ei(c.memoizedState,d);if(p&&(c.memoizedState=d,Ln=!0),c=c.queue,Bc(Mh.bind(null,o,c,n),[n]),c.getSnapshot!==i||p||on!==null&&on.memoizedState.tag&1){if(o.flags|=2048,Co(9,Sh.bind(null,o,c,d,i),void 0,null),an===null)throw Error(t(349));(Ur&30)!==0||yh(o,i,d)}return d}function yh(n,i,o){n.flags|=16384,n={getSnapshot:i,value:o},i=Vt.updateQueue,i===null?(i={lastEffect:null,stores:null},Vt.updateQueue=i,i.stores=[n]):(o=i.stores,o===null?i.stores=[n]:o.push(n))}function Sh(n,i,o,c){i.value=o,i.getSnapshot=c,Eh(i)&&Th(n)}function Mh(n,i,o){return o(function(){Eh(i)&&Th(n)})}function Eh(n){var i=n.getSnapshot;n=n.value;try{var o=i();return!ei(n,o)}catch{return!0}}function Th(n){var i=Li(n,1);i!==null&&si(i,n,1,-1)}function wh(n){var i=vi();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ao,lastRenderedState:n},i.queue=n,n=n.dispatch=V0.bind(null,Vt,n),[i.memoizedState,n]}function Co(n,i,o,c){return n={tag:n,create:i,destroy:o,deps:c,next:null},i=Vt.updateQueue,i===null?(i={lastEffect:null,stores:null},Vt.updateQueue=i,i.lastEffect=n.next=n):(o=i.lastEffect,o===null?i.lastEffect=n.next=n:(c=o.next,o.next=n,n.next=c,i.lastEffect=n)),n}function Ah(){return Yn().memoizedState}function Fa(n,i,o,c){var d=vi();Vt.flags|=n,d.memoizedState=Co(1|i,o,void 0,c===void 0?null:c)}function Oa(n,i,o,c){var d=Yn();c=c===void 0?null:c;var p=void 0;if(Jt!==null){var T=Jt.memoizedState;if(p=T.destroy,c!==null&&Uc(c,T.deps)){d.memoizedState=Co(i,o,p,c);return}}Vt.flags|=n,d.memoizedState=Co(1|i,o,p,c)}function Ch(n,i){return Fa(8390656,8,n,i)}function Bc(n,i){return Oa(2048,8,n,i)}function Rh(n,i){return Oa(4,2,n,i)}function bh(n,i){return Oa(4,4,n,i)}function Ph(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function Lh(n,i,o){return o=o!=null?o.concat([n]):null,Oa(4,4,Ph.bind(null,i,n),o)}function Hc(){}function Dh(n,i){var o=Yn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&Uc(i,c[1])?c[0]:(o.memoizedState=[n,i],n)}function Nh(n,i){var o=Yn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&Uc(i,c[1])?c[0]:(n=n(),o.memoizedState=[n,i],n)}function Ih(n,i,o){return(Ur&21)===0?(n.baseState&&(n.baseState=!1,Ln=!0),n.memoizedState=o):(ei(o,i)||(o=Nt(),Vt.lanes|=o,Fr|=o,n.baseState=!0),i)}function B0(n,i){var o=At;At=o!==0&&4>o?o:4,n(!0);var c=Ic.transition;Ic.transition={};try{n(!1),i()}finally{At=o,Ic.transition=c}}function Uh(){return Yn().memoizedState}function H0(n,i,o){var c=fr(n);if(o={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null},Fh(n))Oh(i,o);else if(o=hh(n,i,o,c),o!==null){var d=wn();si(o,n,c,d),kh(o,i,c)}}function V0(n,i,o){var c=fr(n),d={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null};if(Fh(n))Oh(i,d);else{var p=n.alternate;if(n.lanes===0&&(p===null||p.lanes===0)&&(p=i.lastRenderedReducer,p!==null))try{var T=i.lastRenderedState,U=p(T,o);if(d.hasEagerState=!0,d.eagerState=U,ei(U,T)){var H=i.interleaved;H===null?(d.next=d,Rc(i)):(d.next=H.next,H.next=d),i.interleaved=d;return}}catch{}finally{}o=hh(n,i,d,c),o!==null&&(d=wn(),si(o,n,c,d),kh(o,i,c))}}function Fh(n){var i=n.alternate;return n===Vt||i!==null&&i===Vt}function Oh(n,i){To=Ua=!0;var o=n.pending;o===null?i.next=i:(i.next=o.next,o.next=i),n.pending=i}function kh(n,i,o){if((o&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,o|=c,i.lanes=o,sn(n,o)}}var ka={readContext:qn,useCallback:vn,useContext:vn,useEffect:vn,useImperativeHandle:vn,useInsertionEffect:vn,useLayoutEffect:vn,useMemo:vn,useReducer:vn,useRef:vn,useState:vn,useDebugValue:vn,useDeferredValue:vn,useTransition:vn,useMutableSource:vn,useSyncExternalStore:vn,useId:vn,unstable_isNewReconciler:!1},G0={readContext:qn,useCallback:function(n,i){return vi().memoizedState=[n,i===void 0?null:i],n},useContext:qn,useEffect:Ch,useImperativeHandle:function(n,i,o){return o=o!=null?o.concat([n]):null,Fa(4194308,4,Ph.bind(null,i,n),o)},useLayoutEffect:function(n,i){return Fa(4194308,4,n,i)},useInsertionEffect:function(n,i){return Fa(4,2,n,i)},useMemo:function(n,i){var o=vi();return i=i===void 0?null:i,n=n(),o.memoizedState=[n,i],n},useReducer:function(n,i,o){var c=vi();return i=o!==void 0?o(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=H0.bind(null,Vt,n),[c.memoizedState,n]},useRef:function(n){var i=vi();return n={current:n},i.memoizedState=n},useState:wh,useDebugValue:Hc,useDeferredValue:function(n){return vi().memoizedState=n},useTransition:function(){var n=wh(!1),i=n[0];return n=B0.bind(null,n[1]),vi().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,o){var c=Vt,d=vi();if(zt){if(o===void 0)throw Error(t(407));o=o()}else{if(o=i(),an===null)throw Error(t(349));(Ur&30)!==0||yh(c,i,o)}d.memoizedState=o;var p={value:o,getSnapshot:i};return d.queue=p,Ch(Mh.bind(null,c,p,n),[n]),c.flags|=2048,Co(9,Sh.bind(null,c,p,o,i),void 0,null),o},useId:function(){var n=vi(),i=an.identifierPrefix;if(zt){var o=Pi,c=bi;o=(c&~(1<<32-dt(c)-1)).toString(32)+o,i=":"+i+"R"+o,o=wo++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=z0++,i=":"+i+"r"+o.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},W0={readContext:qn,useCallback:Dh,useContext:qn,useEffect:Bc,useImperativeHandle:Lh,useInsertionEffect:Rh,useLayoutEffect:bh,useMemo:Nh,useReducer:kc,useRef:Ah,useState:function(){return kc(Ao)},useDebugValue:Hc,useDeferredValue:function(n){var i=Yn();return Ih(i,Jt.memoizedState,n)},useTransition:function(){var n=kc(Ao)[0],i=Yn().memoizedState;return[n,i]},useMutableSource:_h,useSyncExternalStore:xh,useId:Uh,unstable_isNewReconciler:!1},X0={readContext:qn,useCallback:Dh,useContext:qn,useEffect:Bc,useImperativeHandle:Lh,useInsertionEffect:Rh,useLayoutEffect:bh,useMemo:Nh,useReducer:zc,useRef:Ah,useState:function(){return zc(Ao)},useDebugValue:Hc,useDeferredValue:function(n){var i=Yn();return Jt===null?i.memoizedState=n:Ih(i,Jt.memoizedState,n)},useTransition:function(){var n=zc(Ao)[0],i=Yn().memoizedState;return[n,i]},useMutableSource:_h,useSyncExternalStore:xh,useId:Uh,unstable_isNewReconciler:!1};function ni(n,i){if(n&&n.defaultProps){i=L({},i),n=n.defaultProps;for(var o in n)i[o]===void 0&&(i[o]=n[o]);return i}return i}function Vc(n,i,o,c){i=n.memoizedState,o=o(c,i),o=o==null?i:L({},i,o),n.memoizedState=o,n.lanes===0&&(n.updateQueue.baseState=o)}var za={isMounted:function(n){return(n=n._reactInternals)?hi(n)===n:!1},enqueueSetState:function(n,i,o){n=n._reactInternals;var c=wn(),d=fr(n),p=Di(c,d);p.payload=i,o!=null&&(p.callback=o),i=ar(n,p,d),i!==null&&(si(i,n,d,c),La(i,n,d))},enqueueReplaceState:function(n,i,o){n=n._reactInternals;var c=wn(),d=fr(n),p=Di(c,d);p.tag=1,p.payload=i,o!=null&&(p.callback=o),i=ar(n,p,d),i!==null&&(si(i,n,d,c),La(i,n,d))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var o=wn(),c=fr(n),d=Di(o,c);d.tag=2,i!=null&&(d.callback=i),i=ar(n,d,c),i!==null&&(si(i,n,c,o),La(i,n,c))}};function zh(n,i,o,c,d,p,T){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,p,T):i.prototype&&i.prototype.isPureReactComponent?!ho(o,c)||!ho(d,p):!0}function Bh(n,i,o){var c=!1,d=rr,p=i.contextType;return typeof p=="object"&&p!==null?p=qn(p):(d=Pn(i)?Pr:gn.current,c=i.contextTypes,p=(c=c!=null)?ps(n,d):rr),i=new i(o,p),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=za,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=d,n.__reactInternalMemoizedMaskedChildContext=p),i}function Hh(n,i,o,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,c),i.state!==n&&za.enqueueReplaceState(i,i.state,null)}function Gc(n,i,o,c){var d=n.stateNode;d.props=o,d.state=n.memoizedState,d.refs={},bc(n);var p=i.contextType;typeof p=="object"&&p!==null?d.context=qn(p):(p=Pn(i)?Pr:gn.current,d.context=ps(n,p)),d.state=n.memoizedState,p=i.getDerivedStateFromProps,typeof p=="function"&&(Vc(n,i,p,o),d.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&za.enqueueReplaceState(d,d.state,null),Da(n,o,d,c),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308)}function Ms(n,i){try{var o="",c=i;do o+=re(c),c=c.return;while(c);var d=o}catch(p){d=`
Error generating stack: `+p.message+`
`+p.stack}return{value:n,source:i,stack:d,digest:null}}function Wc(n,i,o){return{value:n,source:null,stack:o??null,digest:i??null}}function Xc(n,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var j0=typeof WeakMap=="function"?WeakMap:Map;function Vh(n,i,o){o=Di(-1,o),o.tag=3,o.payload={element:null};var c=i.value;return o.callback=function(){ja||(ja=!0,ou=c),Xc(n,i)},o}function Gh(n,i,o){o=Di(-1,o),o.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;o.payload=function(){return c(d)},o.callback=function(){Xc(n,i)}}var p=n.stateNode;return p!==null&&typeof p.componentDidCatch=="function"&&(o.callback=function(){Xc(n,i),typeof c!="function"&&(cr===null?cr=new Set([this]):cr.add(this));var T=i.stack;this.componentDidCatch(i.value,{componentStack:T!==null?T:""})}),o}function Wh(n,i,o){var c=n.pingCache;if(c===null){c=n.pingCache=new j0;var d=new Set;c.set(i,d)}else d=c.get(i),d===void 0&&(d=new Set,c.set(i,d));d.has(o)||(d.add(o),n=ov.bind(null,n,i,o),i.then(n,n))}function Xh(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function jh(n,i,o,c,d){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Di(-1,1),i.tag=2,ar(o,i,1))),o.lanes|=1),n):(n.flags|=65536,n.lanes=d,n)}var q0=b.ReactCurrentOwner,Ln=!1;function Tn(n,i,o,c){i.child=n===null?dh(i,null,o,c):_s(i,n.child,o,c)}function qh(n,i,o,c,d){o=o.render;var p=i.ref;return ys(i,d),c=Fc(n,i,o,c,p,d),o=Oc(),n!==null&&!Ln?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,Ni(n,i,d)):(zt&&o&&xc(i),i.flags|=1,Tn(n,i,c,d),i.child)}function Yh(n,i,o,c,d){if(n===null){var p=o.type;return typeof p=="function"&&!hu(p)&&p.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=p,$h(n,i,p,c,d)):(n=Ja(o.type,null,c,i,i.mode,d),n.ref=i.ref,n.return=i,i.child=n)}if(p=n.child,(n.lanes&d)===0){var T=p.memoizedProps;if(o=o.compare,o=o!==null?o:ho,o(T,c)&&n.ref===i.ref)return Ni(n,i,d)}return i.flags|=1,n=hr(p,c),n.ref=i.ref,n.return=i,i.child=n}function $h(n,i,o,c,d){if(n!==null){var p=n.memoizedProps;if(ho(p,c)&&n.ref===i.ref)if(Ln=!1,i.pendingProps=c=p,(n.lanes&d)!==0)(n.flags&131072)!==0&&(Ln=!0);else return i.lanes=n.lanes,Ni(n,i,d)}return jc(n,i,o,c,d)}function Kh(n,i,o){var c=i.pendingProps,d=c.children,p=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},It(Ts,Hn),Hn|=o;else{if((o&1073741824)===0)return n=p!==null?p.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,It(Ts,Hn),Hn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=p!==null?p.baseLanes:o,It(Ts,Hn),Hn|=c}else p!==null?(c=p.baseLanes|o,i.memoizedState=null):c=o,It(Ts,Hn),Hn|=c;return Tn(n,i,d,o),i.child}function Zh(n,i){var o=i.ref;(n===null&&o!==null||n!==null&&n.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function jc(n,i,o,c,d){var p=Pn(o)?Pr:gn.current;return p=ps(i,p),ys(i,d),o=Fc(n,i,o,c,p,d),c=Oc(),n!==null&&!Ln?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,Ni(n,i,d)):(zt&&c&&xc(i),i.flags|=1,Tn(n,i,o,d),i.child)}function Jh(n,i,o,c,d){if(Pn(o)){var p=!0;Ea(i)}else p=!1;if(ys(i,d),i.stateNode===null)Ha(n,i),Bh(i,o,c),Gc(i,o,c,d),c=!0;else if(n===null){var T=i.stateNode,U=i.memoizedProps;T.props=U;var H=T.context,ce=o.contextType;typeof ce=="object"&&ce!==null?ce=qn(ce):(ce=Pn(o)?Pr:gn.current,ce=ps(i,ce));var Me=o.getDerivedStateFromProps,Te=typeof Me=="function"||typeof T.getSnapshotBeforeUpdate=="function";Te||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(U!==c||H!==ce)&&Hh(i,T,c,ce),or=!1;var Se=i.memoizedState;T.state=Se,Da(i,c,T,d),H=i.memoizedState,U!==c||Se!==H||bn.current||or?(typeof Me=="function"&&(Vc(i,o,Me,c),H=i.memoizedState),(U=or||zh(i,o,U,c,Se,H,ce))?(Te||typeof T.UNSAFE_componentWillMount!="function"&&typeof T.componentWillMount!="function"||(typeof T.componentWillMount=="function"&&T.componentWillMount(),typeof T.UNSAFE_componentWillMount=="function"&&T.UNSAFE_componentWillMount()),typeof T.componentDidMount=="function"&&(i.flags|=4194308)):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=H),T.props=c,T.state=H,T.context=ce,c=U):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{T=i.stateNode,ph(n,i),U=i.memoizedProps,ce=i.type===i.elementType?U:ni(i.type,U),T.props=ce,Te=i.pendingProps,Se=T.context,H=o.contextType,typeof H=="object"&&H!==null?H=qn(H):(H=Pn(o)?Pr:gn.current,H=ps(i,H));var ke=o.getDerivedStateFromProps;(Me=typeof ke=="function"||typeof T.getSnapshotBeforeUpdate=="function")||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(U!==Te||Se!==H)&&Hh(i,T,c,H),or=!1,Se=i.memoizedState,T.state=Se,Da(i,c,T,d);var We=i.memoizedState;U!==Te||Se!==We||bn.current||or?(typeof ke=="function"&&(Vc(i,o,ke,c),We=i.memoizedState),(ce=or||zh(i,o,ce,c,Se,We,H)||!1)?(Me||typeof T.UNSAFE_componentWillUpdate!="function"&&typeof T.componentWillUpdate!="function"||(typeof T.componentWillUpdate=="function"&&T.componentWillUpdate(c,We,H),typeof T.UNSAFE_componentWillUpdate=="function"&&T.UNSAFE_componentWillUpdate(c,We,H)),typeof T.componentDidUpdate=="function"&&(i.flags|=4),typeof T.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof T.componentDidUpdate!="function"||U===n.memoizedProps&&Se===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||U===n.memoizedProps&&Se===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=We),T.props=c,T.state=We,T.context=H,c=ce):(typeof T.componentDidUpdate!="function"||U===n.memoizedProps&&Se===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||U===n.memoizedProps&&Se===n.memoizedState||(i.flags|=1024),c=!1)}return qc(n,i,o,c,p,d)}function qc(n,i,o,c,d,p){Zh(n,i);var T=(i.flags&128)!==0;if(!c&&!T)return d&&ih(i,o,!1),Ni(n,i,p);c=i.stateNode,q0.current=i;var U=T&&typeof o.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&T?(i.child=_s(i,n.child,null,p),i.child=_s(i,null,U,p)):Tn(n,i,U,p),i.memoizedState=c.state,d&&ih(i,o,!0),i.child}function Qh(n){var i=n.stateNode;i.pendingContext?th(n,i.pendingContext,i.pendingContext!==i.context):i.context&&th(n,i.context,!1),Pc(n,i.containerInfo)}function ep(n,i,o,c,d){return vs(),Ec(d),i.flags|=256,Tn(n,i,o,c),i.child}var Yc={dehydrated:null,treeContext:null,retryLane:0};function $c(n){return{baseLanes:n,cachePool:null,transitions:null}}function tp(n,i,o){var c=i.pendingProps,d=Ht.current,p=!1,T=(i.flags&128)!==0,U;if((U=T)||(U=n!==null&&n.memoizedState===null?!1:(d&2)!==0),U?(p=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(d|=1),It(Ht,d&1),n===null)return Mc(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(T=c.children,n=c.fallback,p?(c=i.mode,p=i.child,T={mode:"hidden",children:T},(c&1)===0&&p!==null?(p.childLanes=0,p.pendingProps=T):p=Qa(T,c,0,null),n=Br(n,c,o,null),p.return=i,n.return=i,p.sibling=n,i.child=p,i.child.memoizedState=$c(o),i.memoizedState=Yc,n):Kc(i,T));if(d=n.memoizedState,d!==null&&(U=d.dehydrated,U!==null))return Y0(n,i,T,c,U,d,o);if(p){p=c.fallback,T=i.mode,d=n.child,U=d.sibling;var H={mode:"hidden",children:c.children};return(T&1)===0&&i.child!==d?(c=i.child,c.childLanes=0,c.pendingProps=H,i.deletions=null):(c=hr(d,H),c.subtreeFlags=d.subtreeFlags&14680064),U!==null?p=hr(U,p):(p=Br(p,T,o,null),p.flags|=2),p.return=i,c.return=i,c.sibling=p,i.child=c,c=p,p=i.child,T=n.child.memoizedState,T=T===null?$c(o):{baseLanes:T.baseLanes|o,cachePool:null,transitions:T.transitions},p.memoizedState=T,p.childLanes=n.childLanes&~o,i.memoizedState=Yc,c}return p=n.child,n=p.sibling,c=hr(p,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=o),c.return=i,c.sibling=null,n!==null&&(o=i.deletions,o===null?(i.deletions=[n],i.flags|=16):o.push(n)),i.child=c,i.memoizedState=null,c}function Kc(n,i){return i=Qa({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function Ba(n,i,o,c){return c!==null&&Ec(c),_s(i,n.child,null,o),n=Kc(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function Y0(n,i,o,c,d,p,T){if(o)return i.flags&256?(i.flags&=-257,c=Wc(Error(t(422))),Ba(n,i,T,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(p=c.fallback,d=i.mode,c=Qa({mode:"visible",children:c.children},d,0,null),p=Br(p,d,T,null),p.flags|=2,c.return=i,p.return=i,c.sibling=p,i.child=c,(i.mode&1)!==0&&_s(i,n.child,null,T),i.child.memoizedState=$c(T),i.memoizedState=Yc,p);if((i.mode&1)===0)return Ba(n,i,T,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var U=c.dgst;return c=U,p=Error(t(419)),c=Wc(p,c,void 0),Ba(n,i,T,c)}if(U=(T&n.childLanes)!==0,Ln||U){if(c=an,c!==null){switch(T&-T){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|T))!==0?0:d,d!==0&&d!==p.retryLane&&(p.retryLane=d,Li(n,d),si(c,n,d,-1))}return du(),c=Wc(Error(t(421))),Ba(n,i,T,c)}return d.data==="$?"?(i.flags|=128,i.child=n.child,i=av.bind(null,n),d._reactRetry=i,null):(n=p.treeContext,Bn=nr(d.nextSibling),zn=i,zt=!0,ti=null,n!==null&&(Xn[jn++]=bi,Xn[jn++]=Pi,Xn[jn++]=Lr,bi=n.id,Pi=n.overflow,Lr=i),i=Kc(i,c.children),i.flags|=4096,i)}function np(n,i,o){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),Cc(n.return,i,o)}function Zc(n,i,o,c,d){var p=n.memoizedState;p===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:o,tailMode:d}:(p.isBackwards=i,p.rendering=null,p.renderingStartTime=0,p.last=c,p.tail=o,p.tailMode=d)}function ip(n,i,o){var c=i.pendingProps,d=c.revealOrder,p=c.tail;if(Tn(n,i,c.children,o),c=Ht.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&np(n,o,i);else if(n.tag===19)np(n,o,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(It(Ht,c),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(o=i.child,d=null;o!==null;)n=o.alternate,n!==null&&Na(n)===null&&(d=o),o=o.sibling;o=d,o===null?(d=i.child,i.child=null):(d=o.sibling,o.sibling=null),Zc(i,!1,d,o,p);break;case"backwards":for(o=null,d=i.child,i.child=null;d!==null;){if(n=d.alternate,n!==null&&Na(n)===null){i.child=d;break}n=d.sibling,d.sibling=o,o=d,d=n}Zc(i,!0,o,null,p);break;case"together":Zc(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Ha(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Ni(n,i,o){if(n!==null&&(i.dependencies=n.dependencies),Fr|=i.lanes,(o&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,o=hr(n,n.pendingProps),i.child=o,o.return=i;n.sibling!==null;)n=n.sibling,o=o.sibling=hr(n,n.pendingProps),o.return=i;o.sibling=null}return i.child}function $0(n,i,o){switch(i.tag){case 3:Qh(i),vs();break;case 5:vh(i);break;case 1:Pn(i.type)&&Ea(i);break;case 4:Pc(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,d=i.memoizedProps.value;It(ba,c._currentValue),c._currentValue=d;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(It(Ht,Ht.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?tp(n,i,o):(It(Ht,Ht.current&1),n=Ni(n,i,o),n!==null?n.sibling:null);It(Ht,Ht.current&1);break;case 19:if(c=(o&i.childLanes)!==0,(n.flags&128)!==0){if(c)return ip(n,i,o);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),It(Ht,Ht.current),c)break;return null;case 22:case 23:return i.lanes=0,Kh(n,i,o)}return Ni(n,i,o)}var rp,Jc,sp,op;rp=function(n,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)n.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},Jc=function(){},sp=function(n,i,o,c){var d=n.memoizedProps;if(d!==c){n=i.stateNode,Ir(gi.current);var p=null;switch(o){case"input":d=O(n,d),c=O(n,c),p=[];break;case"select":d=L({},d,{value:void 0}),c=L({},c,{value:void 0}),p=[];break;case"textarea":d=w(n,d),c=w(n,c),p=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=ya)}mt(o,c);var T;o=null;for(ce in d)if(!c.hasOwnProperty(ce)&&d.hasOwnProperty(ce)&&d[ce]!=null)if(ce==="style"){var U=d[ce];for(T in U)U.hasOwnProperty(T)&&(o||(o={}),o[T]="")}else ce!=="dangerouslySetInnerHTML"&&ce!=="children"&&ce!=="suppressContentEditableWarning"&&ce!=="suppressHydrationWarning"&&ce!=="autoFocus"&&(a.hasOwnProperty(ce)?p||(p=[]):(p=p||[]).push(ce,null));for(ce in c){var H=c[ce];if(U=d!=null?d[ce]:void 0,c.hasOwnProperty(ce)&&H!==U&&(H!=null||U!=null))if(ce==="style")if(U){for(T in U)!U.hasOwnProperty(T)||H&&H.hasOwnProperty(T)||(o||(o={}),o[T]="");for(T in H)H.hasOwnProperty(T)&&U[T]!==H[T]&&(o||(o={}),o[T]=H[T])}else o||(p||(p=[]),p.push(ce,o)),o=H;else ce==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,U=U?U.__html:void 0,H!=null&&U!==H&&(p=p||[]).push(ce,H)):ce==="children"?typeof H!="string"&&typeof H!="number"||(p=p||[]).push(ce,""+H):ce!=="suppressContentEditableWarning"&&ce!=="suppressHydrationWarning"&&(a.hasOwnProperty(ce)?(H!=null&&ce==="onScroll"&&Ft("scroll",n),p||U===H||(p=[])):(p=p||[]).push(ce,H))}o&&(p=p||[]).push("style",o);var ce=p;(i.updateQueue=ce)&&(i.flags|=4)}},op=function(n,i,o,c){o!==c&&(i.flags|=4)};function Ro(n,i){if(!zt)switch(n.tailMode){case"hidden":i=n.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?n.tail=null:o.sibling=null;break;case"collapsed":o=n.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function _n(n){var i=n.alternate!==null&&n.alternate.child===n.child,o=0,c=0;if(i)for(var d=n.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=n,d=d.sibling;else for(d=n.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=n,d=d.sibling;return n.subtreeFlags|=c,n.childLanes=o,i}function K0(n,i,o){var c=i.pendingProps;switch(yc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return _n(i),null;case 1:return Pn(i.type)&&Ma(),_n(i),null;case 3:return c=i.stateNode,Ss(),Ot(bn),Ot(gn),Nc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Ca(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ti!==null&&(cu(ti),ti=null))),Jc(n,i),_n(i),null;case 5:Lc(i);var d=Ir(Eo.current);if(o=i.type,n!==null&&i.stateNode!=null)sp(n,i,o,c,d),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return _n(i),null}if(n=Ir(gi.current),Ca(i)){c=i.stateNode,o=i.type;var p=i.memoizedProps;switch(c[mi]=i,c[_o]=p,n=(i.mode&1)!==0,o){case"dialog":Ft("cancel",c),Ft("close",c);break;case"iframe":case"object":case"embed":Ft("load",c);break;case"video":case"audio":for(d=0;d<mo.length;d++)Ft(mo[d],c);break;case"source":Ft("error",c);break;case"img":case"image":case"link":Ft("error",c),Ft("load",c);break;case"details":Ft("toggle",c);break;case"input":Pt(c,p),Ft("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!p.multiple},Ft("invalid",c);break;case"textarea":se(c,p),Ft("invalid",c)}mt(o,p),d=null;for(var T in p)if(p.hasOwnProperty(T)){var U=p[T];T==="children"?typeof U=="string"?c.textContent!==U&&(p.suppressHydrationWarning!==!0&&xa(c.textContent,U,n),d=["children",U]):typeof U=="number"&&c.textContent!==""+U&&(p.suppressHydrationWarning!==!0&&xa(c.textContent,U,n),d=["children",""+U]):a.hasOwnProperty(T)&&U!=null&&T==="onScroll"&&Ft("scroll",c)}switch(o){case"input":Je(c),Be(c,p,!0);break;case"textarea":Je(c),ye(c);break;case"select":case"option":break;default:typeof p.onClick=="function"&&(c.onclick=ya)}c=d,i.updateQueue=c,c!==null&&(i.flags|=4)}else{T=d.nodeType===9?d:d.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=ge(o)),n==="http://www.w3.org/1999/xhtml"?o==="script"?(n=T.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=T.createElement(o,{is:c.is}):(n=T.createElement(o),o==="select"&&(T=n,c.multiple?T.multiple=!0:c.size&&(T.size=c.size))):n=T.createElementNS(n,o),n[mi]=i,n[_o]=c,rp(n,i,!1,!1),i.stateNode=n;e:{switch(T=ct(o,c),o){case"dialog":Ft("cancel",n),Ft("close",n),d=c;break;case"iframe":case"object":case"embed":Ft("load",n),d=c;break;case"video":case"audio":for(d=0;d<mo.length;d++)Ft(mo[d],n);d=c;break;case"source":Ft("error",n),d=c;break;case"img":case"image":case"link":Ft("error",n),Ft("load",n),d=c;break;case"details":Ft("toggle",n),d=c;break;case"input":Pt(n,c),d=O(n,c),Ft("invalid",n);break;case"option":d=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},d=L({},c,{value:void 0}),Ft("invalid",n);break;case"textarea":se(n,c),d=w(n,c),Ft("invalid",n);break;default:d=c}mt(o,d),U=d;for(p in U)if(U.hasOwnProperty(p)){var H=U[p];p==="style"?ot(n,H):p==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,H!=null&&Fe(n,H)):p==="children"?typeof H=="string"?(o!=="textarea"||H!=="")&&ft(n,H):typeof H=="number"&&ft(n,""+H):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(a.hasOwnProperty(p)?H!=null&&p==="onScroll"&&Ft("scroll",n):H!=null&&D(n,p,H,T))}switch(o){case"input":Je(n),Be(n,c,!1);break;case"textarea":Je(n),ye(n);break;case"option":c.value!=null&&n.setAttribute("value",""+ve(c.value));break;case"select":n.multiple=!!c.multiple,p=c.value,p!=null?N(n,!!c.multiple,p,!1):c.defaultValue!=null&&N(n,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(n.onclick=ya)}switch(o){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return _n(i),null;case 6:if(n&&i.stateNode!=null)op(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(o=Ir(Eo.current),Ir(gi.current),Ca(i)){if(c=i.stateNode,o=i.memoizedProps,c[mi]=i,(p=c.nodeValue!==o)&&(n=zn,n!==null))switch(n.tag){case 3:xa(c.nodeValue,o,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&xa(c.nodeValue,o,(n.mode&1)!==0)}p&&(i.flags|=4)}else c=(o.nodeType===9?o:o.ownerDocument).createTextNode(c),c[mi]=i,i.stateNode=c}return _n(i),null;case 13:if(Ot(Ht),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(zt&&Bn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)ch(),vs(),i.flags|=98560,p=!1;else if(p=Ca(i),c!==null&&c.dehydrated!==null){if(n===null){if(!p)throw Error(t(318));if(p=i.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(t(317));p[mi]=i}else vs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;_n(i),p=!1}else ti!==null&&(cu(ti),ti=null),p=!0;if(!p)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Ht.current&1)!==0?Qt===0&&(Qt=3):du())),i.updateQueue!==null&&(i.flags|=4),_n(i),null);case 4:return Ss(),Jc(n,i),n===null&&go(i.stateNode.containerInfo),_n(i),null;case 10:return Ac(i.type._context),_n(i),null;case 17:return Pn(i.type)&&Ma(),_n(i),null;case 19:if(Ot(Ht),p=i.memoizedState,p===null)return _n(i),null;if(c=(i.flags&128)!==0,T=p.rendering,T===null)if(c)Ro(p,!1);else{if(Qt!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(T=Na(n),T!==null){for(i.flags|=128,Ro(p,!1),c=T.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=o,o=i.child;o!==null;)p=o,n=c,p.flags&=14680066,T=p.alternate,T===null?(p.childLanes=0,p.lanes=n,p.child=null,p.subtreeFlags=0,p.memoizedProps=null,p.memoizedState=null,p.updateQueue=null,p.dependencies=null,p.stateNode=null):(p.childLanes=T.childLanes,p.lanes=T.lanes,p.child=T.child,p.subtreeFlags=0,p.deletions=null,p.memoizedProps=T.memoizedProps,p.memoizedState=T.memoizedState,p.updateQueue=T.updateQueue,p.type=T.type,n=T.dependencies,p.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),o=o.sibling;return It(Ht,Ht.current&1|2),i.child}n=n.sibling}p.tail!==null&&te()>ws&&(i.flags|=128,c=!0,Ro(p,!1),i.lanes=4194304)}else{if(!c)if(n=Na(T),n!==null){if(i.flags|=128,c=!0,o=n.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Ro(p,!0),p.tail===null&&p.tailMode==="hidden"&&!T.alternate&&!zt)return _n(i),null}else 2*te()-p.renderingStartTime>ws&&o!==1073741824&&(i.flags|=128,c=!0,Ro(p,!1),i.lanes=4194304);p.isBackwards?(T.sibling=i.child,i.child=T):(o=p.last,o!==null?o.sibling=T:i.child=T,p.last=T)}return p.tail!==null?(i=p.tail,p.rendering=i,p.tail=i.sibling,p.renderingStartTime=te(),i.sibling=null,o=Ht.current,It(Ht,c?o&1|2:o&1),i):(_n(i),null);case 22:case 23:return fu(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(Hn&1073741824)!==0&&(_n(i),i.subtreeFlags&6&&(i.flags|=8192)):_n(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function Z0(n,i){switch(yc(i),i.tag){case 1:return Pn(i.type)&&Ma(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Ss(),Ot(bn),Ot(gn),Nc(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Lc(i),null;case 13:if(Ot(Ht),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));vs()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Ot(Ht),null;case 4:return Ss(),null;case 10:return Ac(i.type._context),null;case 22:case 23:return fu(),null;case 24:return null;default:return null}}var Va=!1,xn=!1,J0=typeof WeakSet=="function"?WeakSet:Set,He=null;function Es(n,i){var o=n.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(c){jt(n,i,c)}else o.current=null}function Qc(n,i,o){try{o()}catch(c){jt(n,i,c)}}var ap=!1;function Q0(n,i){if(fc=la,n=zd(),ic(n)){if("selectionStart"in n)var o={start:n.selectionStart,end:n.selectionEnd};else e:{o=(o=n.ownerDocument)&&o.defaultView||window;var c=o.getSelection&&o.getSelection();if(c&&c.rangeCount!==0){o=c.anchorNode;var d=c.anchorOffset,p=c.focusNode;c=c.focusOffset;try{o.nodeType,p.nodeType}catch{o=null;break e}var T=0,U=-1,H=-1,ce=0,Me=0,Te=n,Se=null;t:for(;;){for(var ke;Te!==o||d!==0&&Te.nodeType!==3||(U=T+d),Te!==p||c!==0&&Te.nodeType!==3||(H=T+c),Te.nodeType===3&&(T+=Te.nodeValue.length),(ke=Te.firstChild)!==null;)Se=Te,Te=ke;for(;;){if(Te===n)break t;if(Se===o&&++ce===d&&(U=T),Se===p&&++Me===c&&(H=T),(ke=Te.nextSibling)!==null)break;Te=Se,Se=Te.parentNode}Te=ke}o=U===-1||H===-1?null:{start:U,end:H}}else o=null}o=o||{start:0,end:0}}else o=null;for(dc={focusedElem:n,selectionRange:o},la=!1,He=i;He!==null;)if(i=He,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,He=n;else for(;He!==null;){i=He;try{var We=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(We!==null){var qe=We.memoizedProps,Yt=We.memoizedState,ee=i.stateNode,q=ee.getSnapshotBeforeUpdate(i.elementType===i.type?qe:ni(i.type,qe),Yt);ee.__reactInternalSnapshotBeforeUpdate=q}break;case 3:var ie=i.stateNode.containerInfo;ie.nodeType===1?ie.textContent="":ie.nodeType===9&&ie.documentElement&&ie.removeChild(ie.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Ae){jt(i,i.return,Ae)}if(n=i.sibling,n!==null){n.return=i.return,He=n;break}He=i.return}return We=ap,ap=!1,We}function bo(n,i,o){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&n)===n){var p=d.destroy;d.destroy=void 0,p!==void 0&&Qc(i,o,p)}d=d.next}while(d!==c)}}function Ga(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&n)===n){var c=o.create;o.destroy=c()}o=o.next}while(o!==i)}}function eu(n){var i=n.ref;if(i!==null){var o=n.stateNode;switch(n.tag){case 5:n=o;break;default:n=o}typeof i=="function"?i(n):i.current=n}}function lp(n){var i=n.alternate;i!==null&&(n.alternate=null,lp(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[mi],delete i[_o],delete i[gc],delete i[U0],delete i[F0])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function cp(n){return n.tag===5||n.tag===3||n.tag===4}function up(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||cp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function tu(n,i,o){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(n,i):o.insertBefore(n,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(n,o)):(i=o,i.appendChild(n)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=ya));else if(c!==4&&(n=n.child,n!==null))for(tu(n,i,o),n=n.sibling;n!==null;)tu(n,i,o),n=n.sibling}function nu(n,i,o){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?o.insertBefore(n,i):o.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(nu(n,i,o),n=n.sibling;n!==null;)nu(n,i,o),n=n.sibling}var fn=null,ii=!1;function lr(n,i,o){for(o=o.child;o!==null;)fp(n,i,o),o=o.sibling}function fp(n,i,o){if(Xe&&typeof Xe.onCommitFiberUnmount=="function")try{Xe.onCommitFiberUnmount(rt,o)}catch{}switch(o.tag){case 5:xn||Es(o,i);case 6:var c=fn,d=ii;fn=null,lr(n,i,o),fn=c,ii=d,fn!==null&&(ii?(n=fn,o=o.stateNode,n.nodeType===8?n.parentNode.removeChild(o):n.removeChild(o)):fn.removeChild(o.stateNode));break;case 18:fn!==null&&(ii?(n=fn,o=o.stateNode,n.nodeType===8?mc(n.parentNode,o):n.nodeType===1&&mc(n,o),oo(n)):mc(fn,o.stateNode));break;case 4:c=fn,d=ii,fn=o.stateNode.containerInfo,ii=!0,lr(n,i,o),fn=c,ii=d;break;case 0:case 11:case 14:case 15:if(!xn&&(c=o.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var p=d,T=p.destroy;p=p.tag,T!==void 0&&((p&2)!==0||(p&4)!==0)&&Qc(o,i,T),d=d.next}while(d!==c)}lr(n,i,o);break;case 1:if(!xn&&(Es(o,i),c=o.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=o.memoizedProps,c.state=o.memoizedState,c.componentWillUnmount()}catch(U){jt(o,i,U)}lr(n,i,o);break;case 21:lr(n,i,o);break;case 22:o.mode&1?(xn=(c=xn)||o.memoizedState!==null,lr(n,i,o),xn=c):lr(n,i,o);break;default:lr(n,i,o)}}function dp(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var o=n.stateNode;o===null&&(o=n.stateNode=new J0),i.forEach(function(c){var d=lv.bind(null,n,c);o.has(c)||(o.add(c),c.then(d,d))})}}function ri(n,i){var o=i.deletions;if(o!==null)for(var c=0;c<o.length;c++){var d=o[c];try{var p=n,T=i,U=T;e:for(;U!==null;){switch(U.tag){case 5:fn=U.stateNode,ii=!1;break e;case 3:fn=U.stateNode.containerInfo,ii=!0;break e;case 4:fn=U.stateNode.containerInfo,ii=!0;break e}U=U.return}if(fn===null)throw Error(t(160));fp(p,T,d),fn=null,ii=!1;var H=d.alternate;H!==null&&(H.return=null),d.return=null}catch(ce){jt(d,i,ce)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)hp(i,n),i=i.sibling}function hp(n,i){var o=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ri(i,n),_i(n),c&4){try{bo(3,n,n.return),Ga(3,n)}catch(qe){jt(n,n.return,qe)}try{bo(5,n,n.return)}catch(qe){jt(n,n.return,qe)}}break;case 1:ri(i,n),_i(n),c&512&&o!==null&&Es(o,o.return);break;case 5:if(ri(i,n),_i(n),c&512&&o!==null&&Es(o,o.return),n.flags&32){var d=n.stateNode;try{ft(d,"")}catch(qe){jt(n,n.return,qe)}}if(c&4&&(d=n.stateNode,d!=null)){var p=n.memoizedProps,T=o!==null?o.memoizedProps:p,U=n.type,H=n.updateQueue;if(n.updateQueue=null,H!==null)try{U==="input"&&p.type==="radio"&&p.name!=null&&it(d,p),ct(U,T);var ce=ct(U,p);for(T=0;T<H.length;T+=2){var Me=H[T],Te=H[T+1];Me==="style"?ot(d,Te):Me==="dangerouslySetInnerHTML"?Fe(d,Te):Me==="children"?ft(d,Te):D(d,Me,Te,ce)}switch(U){case"input":tt(d,p);break;case"textarea":xe(d,p);break;case"select":var Se=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!p.multiple;var ke=p.value;ke!=null?N(d,!!p.multiple,ke,!1):Se!==!!p.multiple&&(p.defaultValue!=null?N(d,!!p.multiple,p.defaultValue,!0):N(d,!!p.multiple,p.multiple?[]:"",!1))}d[_o]=p}catch(qe){jt(n,n.return,qe)}}break;case 6:if(ri(i,n),_i(n),c&4){if(n.stateNode===null)throw Error(t(162));d=n.stateNode,p=n.memoizedProps;try{d.nodeValue=p}catch(qe){jt(n,n.return,qe)}}break;case 3:if(ri(i,n),_i(n),c&4&&o!==null&&o.memoizedState.isDehydrated)try{oo(i.containerInfo)}catch(qe){jt(n,n.return,qe)}break;case 4:ri(i,n),_i(n);break;case 13:ri(i,n),_i(n),d=n.child,d.flags&8192&&(p=d.memoizedState!==null,d.stateNode.isHidden=p,!p||d.alternate!==null&&d.alternate.memoizedState!==null||(su=te())),c&4&&dp(n);break;case 22:if(Me=o!==null&&o.memoizedState!==null,n.mode&1?(xn=(ce=xn)||Me,ri(i,n),xn=ce):ri(i,n),_i(n),c&8192){if(ce=n.memoizedState!==null,(n.stateNode.isHidden=ce)&&!Me&&(n.mode&1)!==0)for(He=n,Me=n.child;Me!==null;){for(Te=He=Me;He!==null;){switch(Se=He,ke=Se.child,Se.tag){case 0:case 11:case 14:case 15:bo(4,Se,Se.return);break;case 1:Es(Se,Se.return);var We=Se.stateNode;if(typeof We.componentWillUnmount=="function"){c=Se,o=Se.return;try{i=c,We.props=i.memoizedProps,We.state=i.memoizedState,We.componentWillUnmount()}catch(qe){jt(c,o,qe)}}break;case 5:Es(Se,Se.return);break;case 22:if(Se.memoizedState!==null){gp(Te);continue}}ke!==null?(ke.return=Se,He=ke):gp(Te)}Me=Me.sibling}e:for(Me=null,Te=n;;){if(Te.tag===5){if(Me===null){Me=Te;try{d=Te.stateNode,ce?(p=d.style,typeof p.setProperty=="function"?p.setProperty("display","none","important"):p.display="none"):(U=Te.stateNode,H=Te.memoizedProps.style,T=H!=null&&H.hasOwnProperty("display")?H.display:null,U.style.display=Ze("display",T))}catch(qe){jt(n,n.return,qe)}}}else if(Te.tag===6){if(Me===null)try{Te.stateNode.nodeValue=ce?"":Te.memoizedProps}catch(qe){jt(n,n.return,qe)}}else if((Te.tag!==22&&Te.tag!==23||Te.memoizedState===null||Te===n)&&Te.child!==null){Te.child.return=Te,Te=Te.child;continue}if(Te===n)break e;for(;Te.sibling===null;){if(Te.return===null||Te.return===n)break e;Me===Te&&(Me=null),Te=Te.return}Me===Te&&(Me=null),Te.sibling.return=Te.return,Te=Te.sibling}}break;case 19:ri(i,n),_i(n),c&4&&dp(n);break;case 21:break;default:ri(i,n),_i(n)}}function _i(n){var i=n.flags;if(i&2){try{e:{for(var o=n.return;o!==null;){if(cp(o)){var c=o;break e}o=o.return}throw Error(t(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(ft(d,""),c.flags&=-33);var p=up(n);nu(n,p,d);break;case 3:case 4:var T=c.stateNode.containerInfo,U=up(n);tu(n,U,T);break;default:throw Error(t(161))}}catch(H){jt(n,n.return,H)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function ev(n,i,o){He=n,pp(n)}function pp(n,i,o){for(var c=(n.mode&1)!==0;He!==null;){var d=He,p=d.child;if(d.tag===22&&c){var T=d.memoizedState!==null||Va;if(!T){var U=d.alternate,H=U!==null&&U.memoizedState!==null||xn;U=Va;var ce=xn;if(Va=T,(xn=H)&&!ce)for(He=d;He!==null;)T=He,H=T.child,T.tag===22&&T.memoizedState!==null?vp(d):H!==null?(H.return=T,He=H):vp(d);for(;p!==null;)He=p,pp(p),p=p.sibling;He=d,Va=U,xn=ce}mp(n)}else(d.subtreeFlags&8772)!==0&&p!==null?(p.return=d,He=p):mp(n)}}function mp(n){for(;He!==null;){var i=He;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:xn||Ga(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!xn)if(o===null)c.componentDidMount();else{var d=i.elementType===i.type?o.memoizedProps:ni(i.type,o.memoizedProps);c.componentDidUpdate(d,o.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var p=i.updateQueue;p!==null&&gh(i,p,c);break;case 3:var T=i.updateQueue;if(T!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}gh(i,T,o)}break;case 5:var U=i.stateNode;if(o===null&&i.flags&4){o=U;var H=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":H.autoFocus&&o.focus();break;case"img":H.src&&(o.src=H.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var ce=i.alternate;if(ce!==null){var Me=ce.memoizedState;if(Me!==null){var Te=Me.dehydrated;Te!==null&&oo(Te)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}xn||i.flags&512&&eu(i)}catch(Se){jt(i,i.return,Se)}}if(i===n){He=null;break}if(o=i.sibling,o!==null){o.return=i.return,He=o;break}He=i.return}}function gp(n){for(;He!==null;){var i=He;if(i===n){He=null;break}var o=i.sibling;if(o!==null){o.return=i.return,He=o;break}He=i.return}}function vp(n){for(;He!==null;){var i=He;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{Ga(4,i)}catch(H){jt(i,o,H)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var d=i.return;try{c.componentDidMount()}catch(H){jt(i,d,H)}}var p=i.return;try{eu(i)}catch(H){jt(i,p,H)}break;case 5:var T=i.return;try{eu(i)}catch(H){jt(i,T,H)}}}catch(H){jt(i,i.return,H)}if(i===n){He=null;break}var U=i.sibling;if(U!==null){U.return=i.return,He=U;break}He=i.return}}var tv=Math.ceil,Wa=b.ReactCurrentDispatcher,iu=b.ReactCurrentOwner,$n=b.ReactCurrentBatchConfig,Ct=0,an=null,$t=null,dn=0,Hn=0,Ts=ir(0),Qt=0,Po=null,Fr=0,Xa=0,ru=0,Lo=null,Dn=null,su=0,ws=1/0,Ii=null,ja=!1,ou=null,cr=null,qa=!1,ur=null,Ya=0,Do=0,au=null,$a=-1,Ka=0;function wn(){return(Ct&6)!==0?te():$a!==-1?$a:$a=te()}function fr(n){return(n.mode&1)===0?1:(Ct&2)!==0&&dn!==0?dn&-dn:k0.transition!==null?(Ka===0&&(Ka=Nt()),Ka):(n=At,n!==0||(n=window.event,n=n===void 0?16:xd(n.type)),n)}function si(n,i,o,c){if(50<Do)throw Do=0,au=null,Error(t(185));rn(n,o,c),((Ct&2)===0||n!==an)&&(n===an&&((Ct&2)===0&&(Xa|=o),Qt===4&&dr(n,dn)),Nn(n,c),o===1&&Ct===0&&(i.mode&1)===0&&(ws=te()+500,Ta&&sr()))}function Nn(n,i){var o=n.callbackNode;En(n,i);var c=pn(n,n===an?dn:0);if(c===0)o!==null&&R(o),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(o!=null&&R(o),i===1)n.tag===0?O0(xp.bind(null,n)):rh(xp.bind(null,n)),N0(function(){(Ct&6)===0&&sr()}),o=null;else{switch(pi(c)){case 1:o=we;break;case 4:o=Le;break;case 16:o=Oe;break;case 536870912:o=at;break;default:o=Oe}o=Cp(o,_p.bind(null,n))}n.callbackPriority=i,n.callbackNode=o}}function _p(n,i){if($a=-1,Ka=0,(Ct&6)!==0)throw Error(t(327));var o=n.callbackNode;if(As()&&n.callbackNode!==o)return null;var c=pn(n,n===an?dn:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=Za(n,c);else{i=c;var d=Ct;Ct|=2;var p=Sp();(an!==n||dn!==i)&&(Ii=null,ws=te()+500,kr(n,i));do try{rv();break}catch(U){yp(n,U)}while(!0);wc(),Wa.current=p,Ct=d,$t!==null?i=0:(an=null,dn=0,i=Qt)}if(i!==0){if(i===2&&(d=Ai(n),d!==0&&(c=d,i=lu(n,d))),i===1)throw o=Po,kr(n,0),dr(n,c),Nn(n,te()),o;if(i===6)dr(n,c);else{if(d=n.current.alternate,(c&30)===0&&!nv(d)&&(i=Za(n,c),i===2&&(p=Ai(n),p!==0&&(c=p,i=lu(n,p))),i===1))throw o=Po,kr(n,0),dr(n,c),Nn(n,te()),o;switch(n.finishedWork=d,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:zr(n,Dn,Ii);break;case 3:if(dr(n,c),(c&130023424)===c&&(i=su+500-te(),10<i)){if(pn(n,0)!==0)break;if(d=n.suspendedLanes,(d&c)!==c){wn(),n.pingedLanes|=n.suspendedLanes&d;break}n.timeoutHandle=pc(zr.bind(null,n,Dn,Ii),i);break}zr(n,Dn,Ii);break;case 4:if(dr(n,c),(c&4194240)===c)break;for(i=n.eventTimes,d=-1;0<c;){var T=31-dt(c);p=1<<T,T=i[T],T>d&&(d=T),c&=~p}if(c=d,c=te()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*tv(c/1960))-c,10<c){n.timeoutHandle=pc(zr.bind(null,n,Dn,Ii),c);break}zr(n,Dn,Ii);break;case 5:zr(n,Dn,Ii);break;default:throw Error(t(329))}}}return Nn(n,te()),n.callbackNode===o?_p.bind(null,n):null}function lu(n,i){var o=Lo;return n.current.memoizedState.isDehydrated&&(kr(n,i).flags|=256),n=Za(n,i),n!==2&&(i=Dn,Dn=o,i!==null&&cu(i)),n}function cu(n){Dn===null?Dn=n:Dn.push.apply(Dn,n)}function nv(n){for(var i=n;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var c=0;c<o.length;c++){var d=o[c],p=d.getSnapshot;d=d.value;try{if(!ei(p(),d))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function dr(n,i){for(i&=~ru,i&=~Xa,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var o=31-dt(i),c=1<<o;n[o]=-1,i&=~c}}function xp(n){if((Ct&6)!==0)throw Error(t(327));As();var i=pn(n,0);if((i&1)===0)return Nn(n,te()),null;var o=Za(n,i);if(n.tag!==0&&o===2){var c=Ai(n);c!==0&&(i=c,o=lu(n,c))}if(o===1)throw o=Po,kr(n,0),dr(n,i),Nn(n,te()),o;if(o===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,zr(n,Dn,Ii),Nn(n,te()),null}function uu(n,i){var o=Ct;Ct|=1;try{return n(i)}finally{Ct=o,Ct===0&&(ws=te()+500,Ta&&sr())}}function Or(n){ur!==null&&ur.tag===0&&(Ct&6)===0&&As();var i=Ct;Ct|=1;var o=$n.transition,c=At;try{if($n.transition=null,At=1,n)return n()}finally{At=c,$n.transition=o,Ct=i,(Ct&6)===0&&sr()}}function fu(){Hn=Ts.current,Ot(Ts)}function kr(n,i){n.finishedWork=null,n.finishedLanes=0;var o=n.timeoutHandle;if(o!==-1&&(n.timeoutHandle=-1,D0(o)),$t!==null)for(o=$t.return;o!==null;){var c=o;switch(yc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Ma();break;case 3:Ss(),Ot(bn),Ot(gn),Nc();break;case 5:Lc(c);break;case 4:Ss();break;case 13:Ot(Ht);break;case 19:Ot(Ht);break;case 10:Ac(c.type._context);break;case 22:case 23:fu()}o=o.return}if(an=n,$t=n=hr(n.current,null),dn=Hn=i,Qt=0,Po=null,ru=Xa=Fr=0,Dn=Lo=null,Nr!==null){for(i=0;i<Nr.length;i++)if(o=Nr[i],c=o.interleaved,c!==null){o.interleaved=null;var d=c.next,p=o.pending;if(p!==null){var T=p.next;p.next=d,c.next=T}o.pending=c}Nr=null}return n}function yp(n,i){do{var o=$t;try{if(wc(),Ia.current=ka,Ua){for(var c=Vt.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Ua=!1}if(Ur=0,on=Jt=Vt=null,To=!1,wo=0,iu.current=null,o===null||o.return===null){Qt=1,Po=i,$t=null;break}e:{var p=n,T=o.return,U=o,H=i;if(i=dn,U.flags|=32768,H!==null&&typeof H=="object"&&typeof H.then=="function"){var ce=H,Me=U,Te=Me.tag;if((Me.mode&1)===0&&(Te===0||Te===11||Te===15)){var Se=Me.alternate;Se?(Me.updateQueue=Se.updateQueue,Me.memoizedState=Se.memoizedState,Me.lanes=Se.lanes):(Me.updateQueue=null,Me.memoizedState=null)}var ke=Xh(T);if(ke!==null){ke.flags&=-257,jh(ke,T,U,p,i),ke.mode&1&&Wh(p,ce,i),i=ke,H=ce;var We=i.updateQueue;if(We===null){var qe=new Set;qe.add(H),i.updateQueue=qe}else We.add(H);break e}else{if((i&1)===0){Wh(p,ce,i),du();break e}H=Error(t(426))}}else if(zt&&U.mode&1){var Yt=Xh(T);if(Yt!==null){(Yt.flags&65536)===0&&(Yt.flags|=256),jh(Yt,T,U,p,i),Ec(Ms(H,U));break e}}p=H=Ms(H,U),Qt!==4&&(Qt=2),Lo===null?Lo=[p]:Lo.push(p),p=T;do{switch(p.tag){case 3:p.flags|=65536,i&=-i,p.lanes|=i;var ee=Vh(p,H,i);mh(p,ee);break e;case 1:U=H;var q=p.type,ie=p.stateNode;if((p.flags&128)===0&&(typeof q.getDerivedStateFromError=="function"||ie!==null&&typeof ie.componentDidCatch=="function"&&(cr===null||!cr.has(ie)))){p.flags|=65536,i&=-i,p.lanes|=i;var Ae=Gh(p,U,i);mh(p,Ae);break e}}p=p.return}while(p!==null)}Ep(o)}catch(Ye){i=Ye,$t===o&&o!==null&&($t=o=o.return);continue}break}while(!0)}function Sp(){var n=Wa.current;return Wa.current=ka,n===null?ka:n}function du(){(Qt===0||Qt===3||Qt===2)&&(Qt=4),an===null||(Fr&268435455)===0&&(Xa&268435455)===0||dr(an,dn)}function Za(n,i){var o=Ct;Ct|=2;var c=Sp();(an!==n||dn!==i)&&(Ii=null,kr(n,i));do try{iv();break}catch(d){yp(n,d)}while(!0);if(wc(),Ct=o,Wa.current=c,$t!==null)throw Error(t(261));return an=null,dn=0,Qt}function iv(){for(;$t!==null;)Mp($t)}function rv(){for(;$t!==null&&!$();)Mp($t)}function Mp(n){var i=Ap(n.alternate,n,Hn);n.memoizedProps=n.pendingProps,i===null?Ep(n):$t=i,iu.current=null}function Ep(n){var i=n;do{var o=i.alternate;if(n=i.return,(i.flags&32768)===0){if(o=K0(o,i,Hn),o!==null){$t=o;return}}else{if(o=Z0(o,i),o!==null){o.flags&=32767,$t=o;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Qt=6,$t=null;return}}if(i=i.sibling,i!==null){$t=i;return}$t=i=n}while(i!==null);Qt===0&&(Qt=5)}function zr(n,i,o){var c=At,d=$n.transition;try{$n.transition=null,At=1,sv(n,i,o,c)}finally{$n.transition=d,At=c}return null}function sv(n,i,o,c){do As();while(ur!==null);if((Ct&6)!==0)throw Error(t(327));o=n.finishedWork;var d=n.finishedLanes;if(o===null)return null;if(n.finishedWork=null,n.finishedLanes=0,o===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var p=o.lanes|o.childLanes;if(un(n,p),n===an&&($t=an=null,dn=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||qa||(qa=!0,Cp(Oe,function(){return As(),null})),p=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||p){p=$n.transition,$n.transition=null;var T=At;At=1;var U=Ct;Ct|=4,iu.current=null,Q0(n,o),hp(o,n),w0(dc),la=!!fc,dc=fc=null,n.current=o,ev(o),ae(),Ct=U,At=T,$n.transition=p}else n.current=o;if(qa&&(qa=!1,ur=n,Ya=d),p=n.pendingLanes,p===0&&(cr=null),Mt(o.stateNode),Nn(n,te()),i!==null)for(c=n.onRecoverableError,o=0;o<i.length;o++)d=i[o],c(d.value,{componentStack:d.stack,digest:d.digest});if(ja)throw ja=!1,n=ou,ou=null,n;return(Ya&1)!==0&&n.tag!==0&&As(),p=n.pendingLanes,(p&1)!==0?n===au?Do++:(Do=0,au=n):Do=0,sr(),null}function As(){if(ur!==null){var n=pi(Ya),i=$n.transition,o=At;try{if($n.transition=null,At=16>n?16:n,ur===null)var c=!1;else{if(n=ur,ur=null,Ya=0,(Ct&6)!==0)throw Error(t(331));var d=Ct;for(Ct|=4,He=n.current;He!==null;){var p=He,T=p.child;if((He.flags&16)!==0){var U=p.deletions;if(U!==null){for(var H=0;H<U.length;H++){var ce=U[H];for(He=ce;He!==null;){var Me=He;switch(Me.tag){case 0:case 11:case 15:bo(8,Me,p)}var Te=Me.child;if(Te!==null)Te.return=Me,He=Te;else for(;He!==null;){Me=He;var Se=Me.sibling,ke=Me.return;if(lp(Me),Me===ce){He=null;break}if(Se!==null){Se.return=ke,He=Se;break}He=ke}}}var We=p.alternate;if(We!==null){var qe=We.child;if(qe!==null){We.child=null;do{var Yt=qe.sibling;qe.sibling=null,qe=Yt}while(qe!==null)}}He=p}}if((p.subtreeFlags&2064)!==0&&T!==null)T.return=p,He=T;else e:for(;He!==null;){if(p=He,(p.flags&2048)!==0)switch(p.tag){case 0:case 11:case 15:bo(9,p,p.return)}var ee=p.sibling;if(ee!==null){ee.return=p.return,He=ee;break e}He=p.return}}var q=n.current;for(He=q;He!==null;){T=He;var ie=T.child;if((T.subtreeFlags&2064)!==0&&ie!==null)ie.return=T,He=ie;else e:for(T=q;He!==null;){if(U=He,(U.flags&2048)!==0)try{switch(U.tag){case 0:case 11:case 15:Ga(9,U)}}catch(Ye){jt(U,U.return,Ye)}if(U===T){He=null;break e}var Ae=U.sibling;if(Ae!==null){Ae.return=U.return,He=Ae;break e}He=U.return}}if(Ct=d,sr(),Xe&&typeof Xe.onPostCommitFiberRoot=="function")try{Xe.onPostCommitFiberRoot(rt,n)}catch{}c=!0}return c}finally{At=o,$n.transition=i}}return!1}function Tp(n,i,o){i=Ms(o,i),i=Vh(n,i,1),n=ar(n,i,1),i=wn(),n!==null&&(rn(n,1,i),Nn(n,i))}function jt(n,i,o){if(n.tag===3)Tp(n,n,o);else for(;i!==null;){if(i.tag===3){Tp(i,n,o);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(cr===null||!cr.has(c))){n=Ms(o,n),n=Gh(i,n,1),i=ar(i,n,1),n=wn(),i!==null&&(rn(i,1,n),Nn(i,n));break}}i=i.return}}function ov(n,i,o){var c=n.pingCache;c!==null&&c.delete(i),i=wn(),n.pingedLanes|=n.suspendedLanes&o,an===n&&(dn&o)===o&&(Qt===4||Qt===3&&(dn&130023424)===dn&&500>te()-su?kr(n,0):ru|=o),Nn(n,i)}function wp(n,i){i===0&&((n.mode&1)===0?i=1:(i=Xt,Xt<<=1,(Xt&130023424)===0&&(Xt=4194304)));var o=wn();n=Li(n,i),n!==null&&(rn(n,i,o),Nn(n,o))}function av(n){var i=n.memoizedState,o=0;i!==null&&(o=i.retryLane),wp(n,o)}function lv(n,i){var o=0;switch(n.tag){case 13:var c=n.stateNode,d=n.memoizedState;d!==null&&(o=d.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),wp(n,o)}var Ap;Ap=function(n,i,o){if(n!==null)if(n.memoizedProps!==i.pendingProps||bn.current)Ln=!0;else{if((n.lanes&o)===0&&(i.flags&128)===0)return Ln=!1,$0(n,i,o);Ln=(n.flags&131072)!==0}else Ln=!1,zt&&(i.flags&1048576)!==0&&sh(i,Aa,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Ha(n,i),n=i.pendingProps;var d=ps(i,gn.current);ys(i,o),d=Fc(null,i,c,n,d,o);var p=Oc();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Pn(c)?(p=!0,Ea(i)):p=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,bc(i),d.updater=za,i.stateNode=d,d._reactInternals=i,Gc(i,c,n,o),i=qc(null,i,c,!0,p,o)):(i.tag=0,zt&&p&&xc(i),Tn(null,i,d,o),i=i.child),i;case 16:c=i.elementType;e:{switch(Ha(n,i),n=i.pendingProps,d=c._init,c=d(c._payload),i.type=c,d=i.tag=uv(c),n=ni(c,n),d){case 0:i=jc(null,i,c,n,o);break e;case 1:i=Jh(null,i,c,n,o);break e;case 11:i=qh(null,i,c,n,o);break e;case 14:i=Yh(null,i,c,ni(c.type,n),o);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ni(c,d),jc(n,i,c,d,o);case 1:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ni(c,d),Jh(n,i,c,d,o);case 3:e:{if(Qh(i),n===null)throw Error(t(387));c=i.pendingProps,p=i.memoizedState,d=p.element,ph(n,i),Da(i,c,null,o);var T=i.memoizedState;if(c=T.element,p.isDehydrated)if(p={element:c,isDehydrated:!1,cache:T.cache,pendingSuspenseBoundaries:T.pendingSuspenseBoundaries,transitions:T.transitions},i.updateQueue.baseState=p,i.memoizedState=p,i.flags&256){d=Ms(Error(t(423)),i),i=ep(n,i,c,o,d);break e}else if(c!==d){d=Ms(Error(t(424)),i),i=ep(n,i,c,o,d);break e}else for(Bn=nr(i.stateNode.containerInfo.firstChild),zn=i,zt=!0,ti=null,o=dh(i,null,c,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(vs(),c===d){i=Ni(n,i,o);break e}Tn(n,i,c,o)}i=i.child}return i;case 5:return vh(i),n===null&&Mc(i),c=i.type,d=i.pendingProps,p=n!==null?n.memoizedProps:null,T=d.children,hc(c,d)?T=null:p!==null&&hc(c,p)&&(i.flags|=32),Zh(n,i),Tn(n,i,T,o),i.child;case 6:return n===null&&Mc(i),null;case 13:return tp(n,i,o);case 4:return Pc(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=_s(i,null,c,o):Tn(n,i,c,o),i.child;case 11:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ni(c,d),qh(n,i,c,d,o);case 7:return Tn(n,i,i.pendingProps,o),i.child;case 8:return Tn(n,i,i.pendingProps.children,o),i.child;case 12:return Tn(n,i,i.pendingProps.children,o),i.child;case 10:e:{if(c=i.type._context,d=i.pendingProps,p=i.memoizedProps,T=d.value,It(ba,c._currentValue),c._currentValue=T,p!==null)if(ei(p.value,T)){if(p.children===d.children&&!bn.current){i=Ni(n,i,o);break e}}else for(p=i.child,p!==null&&(p.return=i);p!==null;){var U=p.dependencies;if(U!==null){T=p.child;for(var H=U.firstContext;H!==null;){if(H.context===c){if(p.tag===1){H=Di(-1,o&-o),H.tag=2;var ce=p.updateQueue;if(ce!==null){ce=ce.shared;var Me=ce.pending;Me===null?H.next=H:(H.next=Me.next,Me.next=H),ce.pending=H}}p.lanes|=o,H=p.alternate,H!==null&&(H.lanes|=o),Cc(p.return,o,i),U.lanes|=o;break}H=H.next}}else if(p.tag===10)T=p.type===i.type?null:p.child;else if(p.tag===18){if(T=p.return,T===null)throw Error(t(341));T.lanes|=o,U=T.alternate,U!==null&&(U.lanes|=o),Cc(T,o,i),T=p.sibling}else T=p.child;if(T!==null)T.return=p;else for(T=p;T!==null;){if(T===i){T=null;break}if(p=T.sibling,p!==null){p.return=T.return,T=p;break}T=T.return}p=T}Tn(n,i,d.children,o),i=i.child}return i;case 9:return d=i.type,c=i.pendingProps.children,ys(i,o),d=qn(d),c=c(d),i.flags|=1,Tn(n,i,c,o),i.child;case 14:return c=i.type,d=ni(c,i.pendingProps),d=ni(c.type,d),Yh(n,i,c,d,o);case 15:return $h(n,i,i.type,i.pendingProps,o);case 17:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ni(c,d),Ha(n,i),i.tag=1,Pn(c)?(n=!0,Ea(i)):n=!1,ys(i,o),Bh(i,c,d),Gc(i,c,d,o),qc(null,i,c,!0,n,o);case 19:return ip(n,i,o);case 22:return Kh(n,i,o)}throw Error(t(156,i.tag))};function Cp(n,i){return sa(n,i)}function cv(n,i,o,c){this.tag=n,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Kn(n,i,o,c){return new cv(n,i,o,c)}function hu(n){return n=n.prototype,!(!n||!n.isReactComponent)}function uv(n){if(typeof n=="function")return hu(n)?1:0;if(n!=null){if(n=n.$$typeof,n===J)return 11;if(n===de)return 14}return 2}function hr(n,i){var o=n.alternate;return o===null?(o=Kn(n.tag,i,n.key,n.mode),o.elementType=n.elementType,o.type=n.type,o.stateNode=n.stateNode,o.alternate=n,n.alternate=o):(o.pendingProps=i,o.type=n.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=n.flags&14680064,o.childLanes=n.childLanes,o.lanes=n.lanes,o.child=n.child,o.memoizedProps=n.memoizedProps,o.memoizedState=n.memoizedState,o.updateQueue=n.updateQueue,i=n.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=n.sibling,o.index=n.index,o.ref=n.ref,o}function Ja(n,i,o,c,d,p){var T=2;if(c=n,typeof n=="function")hu(n)&&(T=1);else if(typeof n=="string")T=5;else e:switch(n){case k:return Br(o.children,d,p,i);case V:T=8,d|=8;break;case P:return n=Kn(12,o,i,d|2),n.elementType=P,n.lanes=p,n;case X:return n=Kn(13,o,i,d),n.elementType=X,n.lanes=p,n;case ne:return n=Kn(19,o,i,d),n.elementType=ne,n.lanes=p,n;case ue:return Qa(o,d,p,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case C:T=10;break e;case z:T=9;break e;case J:T=11;break e;case de:T=14;break e;case oe:T=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=Kn(T,o,i,d),i.elementType=n,i.type=c,i.lanes=p,i}function Br(n,i,o,c){return n=Kn(7,n,c,i),n.lanes=o,n}function Qa(n,i,o,c){return n=Kn(22,n,c,i),n.elementType=ue,n.lanes=o,n.stateNode={isHidden:!1},n}function pu(n,i,o){return n=Kn(6,n,null,i),n.lanes=o,n}function mu(n,i,o){return i=Kn(4,n.children!==null?n.children:[],n.key,i),i.lanes=o,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function fv(n,i,o,c,d){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=mn(0),this.expirationTimes=mn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mn(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function gu(n,i,o,c,d,p,T,U,H){return n=new fv(n,i,o,U,H),i===1?(i=1,p===!0&&(i|=8)):i=0,p=Kn(3,null,null,i),n.current=p,p.stateNode=n,p.memoizedState={element:c,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},bc(p),n}function dv(n,i,o){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:I,key:c==null?null:""+c,children:n,containerInfo:i,implementation:o}}function Rp(n){if(!n)return rr;n=n._reactInternals;e:{if(hi(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Pn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var o=n.type;if(Pn(o))return nh(n,o,i)}return i}function bp(n,i,o,c,d,p,T,U,H){return n=gu(o,c,!0,n,d,p,T,U,H),n.context=Rp(null),o=n.current,c=wn(),d=fr(o),p=Di(c,d),p.callback=i??null,ar(o,p,d),n.current.lanes=d,rn(n,d,c),Nn(n,c),n}function el(n,i,o,c){var d=i.current,p=wn(),T=fr(d);return o=Rp(o),i.context===null?i.context=o:i.pendingContext=o,i=Di(p,T),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=ar(d,i,T),n!==null&&(si(n,d,T,p),La(n,d,T)),T}function tl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Pp(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var o=n.retryLane;n.retryLane=o!==0&&o<i?o:i}}function vu(n,i){Pp(n,i),(n=n.alternate)&&Pp(n,i)}function hv(){return null}var Lp=typeof reportError=="function"?reportError:function(n){console.error(n)};function _u(n){this._internalRoot=n}nl.prototype.render=_u.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));el(n,i,null,null)},nl.prototype.unmount=_u.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Or(function(){el(null,n,null,null)}),i[Ci]=null}};function nl(n){this._internalRoot=n}nl.prototype.unstable_scheduleHydration=function(n){if(n){var i=pd();n={blockedOn:null,target:n,priority:i};for(var o=0;o<Qi.length&&i!==0&&i<Qi[o].priority;o++);Qi.splice(o,0,n),o===0&&vd(n)}};function xu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function il(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Dp(){}function pv(n,i,o,c,d){if(d){if(typeof c=="function"){var p=c;c=function(){var ce=tl(T);p.call(ce)}}var T=bp(i,c,n,0,null,!1,!1,"",Dp);return n._reactRootContainer=T,n[Ci]=T.current,go(n.nodeType===8?n.parentNode:n),Or(),T}for(;d=n.lastChild;)n.removeChild(d);if(typeof c=="function"){var U=c;c=function(){var ce=tl(H);U.call(ce)}}var H=gu(n,0,!1,null,null,!1,!1,"",Dp);return n._reactRootContainer=H,n[Ci]=H.current,go(n.nodeType===8?n.parentNode:n),Or(function(){el(i,H,o,c)}),H}function rl(n,i,o,c,d){var p=o._reactRootContainer;if(p){var T=p;if(typeof d=="function"){var U=d;d=function(){var H=tl(T);U.call(H)}}el(i,T,n,d)}else T=pv(o,i,n,d,c);return tl(T)}dd=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var o=yt(i.pendingLanes);o!==0&&(sn(i,o|1),Nn(i,te()),(Ct&6)===0&&(ws=te()+500,sr()))}break;case 13:Or(function(){var c=Li(n,1);if(c!==null){var d=wn();si(c,n,1,d)}}),vu(n,1)}},Wl=function(n){if(n.tag===13){var i=Li(n,134217728);if(i!==null){var o=wn();si(i,n,134217728,o)}vu(n,134217728)}},hd=function(n){if(n.tag===13){var i=fr(n),o=Li(n,i);if(o!==null){var c=wn();si(o,n,i,c)}vu(n,i)}},pd=function(){return At},md=function(n,i){var o=At;try{return At=n,i()}finally{At=o}},Pe=function(n,i,o){switch(i){case"input":if(tt(n,o),i=o.name,o.type==="radio"&&i!=null){for(o=n;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var c=o[i];if(c!==n&&c.form===n.form){var d=Sa(c);if(!d)throw Error(t(90));nt(c),tt(c,d)}}}break;case"textarea":xe(n,o);break;case"select":i=o.value,i!=null&&N(n,!!o.multiple,i,!1)}},Ut=uu,Zt=Or;var mv={usingClientEntryPoint:!1,Events:[xo,ds,Sa,Ne,ut,uu]},No={findFiberByHostInstance:br,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},gv={bundleType:No.bundleType,version:No.version,rendererPackageName:No.rendererPackageName,rendererConfig:No.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:b.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=ia(n),n===null?null:n.stateNode},findFiberByHostInstance:No.findFiberByHostInstance||hv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var sl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!sl.isDisabled&&sl.supportsFiber)try{rt=sl.inject(gv),Xe=sl}catch{}}return In.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=mv,In.createPortal=function(n,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!xu(i))throw Error(t(200));return dv(n,i,null,o)},In.createRoot=function(n,i){if(!xu(n))throw Error(t(299));var o=!1,c="",d=Lp;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=gu(n,1,!1,null,null,o,!1,c,d),n[Ci]=i.current,go(n.nodeType===8?n.parentNode:n),new _u(i)},In.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=ia(i),n=n===null?null:n.stateNode,n},In.flushSync=function(n){return Or(n)},In.hydrate=function(n,i,o){if(!il(i))throw Error(t(200));return rl(null,n,i,!0,o)},In.hydrateRoot=function(n,i,o){if(!xu(n))throw Error(t(405));var c=o!=null&&o.hydratedSources||null,d=!1,p="",T=Lp;if(o!=null&&(o.unstable_strictMode===!0&&(d=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onRecoverableError!==void 0&&(T=o.onRecoverableError)),i=bp(i,null,n,1,o??null,d,!1,p,T),n[Ci]=i.current,go(n),c)for(n=0;n<c.length;n++)o=c[n],d=o._getVersion,d=d(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,d]:i.mutableSourceEagerHydrationData.push(o,d);return new nl(i)},In.render=function(n,i,o){if(!il(i))throw Error(t(200));return rl(null,n,i,!1,o)},In.unmountComponentAtNode=function(n){if(!il(n))throw Error(t(40));return n._reactRootContainer?(Or(function(){rl(null,null,n,!1,function(){n._reactRootContainer=null,n[Ci]=null})}),!0):!1},In.unstable_batchedUpdates=uu,In.unstable_renderSubtreeIntoContainer=function(n,i,o,c){if(!il(o))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return rl(n,i,o,!1,c)},In.version="18.3.1-next-f1338f8080-20240426",In}var Bp;function wv(){if(Bp)return Mu.exports;Bp=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Mu.exports=Tv(),Mu.exports}var Hp;function Av(){if(Hp)return ol;Hp=1;var s=wv();return ol.createRoot=s.createRoot,ol.hydrateRoot=s.hydrateRoot,ol}var Cv=Av();const Rv=qm(Cv);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Kf="173",bv=0,Vp=1,Pv=2,Ym=1,$m=2,Bi=3,wr=0,Fn=1,Hi=2,Er=0,Gs=1,Gp=2,Wp=3,Xp=4,Lv=5,Kr=100,Dv=101,Nv=102,Iv=103,Uv=104,Fv=200,Ov=201,kv=202,zv=203,af=204,lf=205,Bv=206,Hv=207,Vv=208,Gv=209,Wv=210,Xv=211,jv=212,qv=213,Yv=214,cf=0,uf=1,ff=2,js=3,df=4,hf=5,pf=6,mf=7,Km=0,$v=1,Kv=2,Tr=0,Zv=1,Jv=2,Qv=3,e_=4,t_=5,n_=6,i_=7,Zm=300,qs=301,Ys=302,gf=303,vf=304,Bl=306,_f=1e3,Jr=1001,xf=1002,fi=1003,r_=1004,al=1005,Si=1006,wu=1007,Qr=1008,Xi=1009,Jm=1010,Qm=1011,qo=1012,Zf=1013,ts=1014,Vi=1015,Yo=1016,Jf=1017,Qf=1018,$s=1020,eg=35902,tg=1021,ng=1022,ui=1023,ig=1024,rg=1025,Ws=1026,Ks=1027,sg=1028,ed=1029,og=1030,td=1031,nd=1033,Ll=33776,Dl=33777,Nl=33778,Il=33779,yf=35840,Sf=35841,Mf=35842,Ef=35843,Tf=36196,wf=37492,Af=37496,Cf=37808,Rf=37809,bf=37810,Pf=37811,Lf=37812,Df=37813,Nf=37814,If=37815,Uf=37816,Ff=37817,Of=37818,kf=37819,zf=37820,Bf=37821,Ul=36492,Hf=36494,Vf=36495,ag=36283,Gf=36284,Wf=36285,Xf=36286,s_=3200,o_=3201,lg=0,a_=1,Mr="",Jn="srgb",Zs="srgb-linear",Ol="linear",Dt="srgb",Cs=7680,jp=519,l_=512,c_=513,u_=514,cg=515,f_=516,d_=517,h_=518,p_=519,qp=35044,Yp="300 es",Gi=2e3,kl=2001;class Qs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){const r=this._listeners;if(r===void 0)return;const a=r[e];if(a!==void 0){const l=a.indexOf(t);l!==-1&&a.splice(l,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const r=t[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let l=0,u=a.length;l<u;l++)a[l].call(this,e);e.target=null}}}const yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Au=Math.PI/180,jf=180/Math.PI;function $o(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(yn[s&255]+yn[s>>8&255]+yn[s>>16&255]+yn[s>>24&255]+"-"+yn[e&255]+yn[e>>8&255]+"-"+yn[e>>16&15|64]+yn[e>>24&255]+"-"+yn[t&63|128]+yn[t>>8&255]+"-"+yn[t>>16&255]+yn[t>>24&255]+yn[r&255]+yn[r>>8&255]+yn[r>>16&255]+yn[r>>24&255]).toLowerCase()}function xt(s,e,t){return Math.max(e,Math.min(t,s))}function m_(s,e){return(s%e+e)%e}function Cu(s,e,t){return(1-t)*s+t*e}function Uo(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Un(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class st{constructor(e=0,t=0){st.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,a=e.elements;return this.x=a[0]*t+a[3]*r+a[6],this.y=a[1]*t+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(xt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),a=Math.sin(t),l=this.x-e.x,u=this.y-e.y;return this.x=l*r-u*a+e.x,this.y=l*a+u*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ht{constructor(e,t,r,a,l,u,f,h,m){ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,u,f,h,m)}set(e,t,r,a,l,u,f,h,m){const g=this.elements;return g[0]=e,g[1]=a,g[2]=f,g[3]=t,g[4]=l,g[5]=h,g[6]=r,g[7]=u,g[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,u=r[0],f=r[3],h=r[6],m=r[1],g=r[4],_=r[7],x=r[2],y=r[5],E=r[8],A=a[0],S=a[3],v=a[6],F=a[1],D=a[4],b=a[7],W=a[2],I=a[5],k=a[8];return l[0]=u*A+f*F+h*W,l[3]=u*S+f*D+h*I,l[6]=u*v+f*b+h*k,l[1]=m*A+g*F+_*W,l[4]=m*S+g*D+_*I,l[7]=m*v+g*b+_*k,l[2]=x*A+y*F+E*W,l[5]=x*S+y*D+E*I,l[8]=x*v+y*b+E*k,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],u=e[4],f=e[5],h=e[6],m=e[7],g=e[8];return t*u*g-t*f*m-r*l*g+r*f*h+a*l*m-a*u*h}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],u=e[4],f=e[5],h=e[6],m=e[7],g=e[8],_=g*u-f*m,x=f*h-g*l,y=m*l-u*h,E=t*_+r*x+a*y;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/E;return e[0]=_*A,e[1]=(a*m-g*r)*A,e[2]=(f*r-a*u)*A,e[3]=x*A,e[4]=(g*t-a*h)*A,e[5]=(a*l-f*t)*A,e[6]=y*A,e[7]=(r*h-m*t)*A,e[8]=(u*t-r*l)*A,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,a,l,u,f){const h=Math.cos(l),m=Math.sin(l);return this.set(r*h,r*m,-r*(h*u+m*f)+u+e,-a*m,a*h,-a*(-m*u+h*f)+f+t,0,0,1),this}scale(e,t){return this.premultiply(Ru.makeScale(e,t)),this}rotate(e){return this.premultiply(Ru.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ru.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<9;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ru=new ht;function ug(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function zl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function g_(){const s=zl("canvas");return s.style.display="block",s}const $p={};function Hs(s){s in $p||($p[s]=!0,console.warn(s))}function v_(s,e,t){return new Promise(function(r,a){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:r()}}setTimeout(l,t)})}function __(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function x_(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Kp=new ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zp=new ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function y_(){const s={enabled:!0,workingColorSpace:Zs,spaces:{},convert:function(a,l,u){return this.enabled===!1||l===u||!l||!u||(this.spaces[l].transfer===Dt&&(a.r=Wi(a.r),a.g=Wi(a.g),a.b=Wi(a.b)),this.spaces[l].primaries!==this.spaces[u].primaries&&(a.applyMatrix3(this.spaces[l].toXYZ),a.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Dt&&(a.r=Xs(a.r),a.g=Xs(a.g),a.b=Xs(a.b))),a},fromWorkingColorSpace:function(a,l){return this.convert(a,this.workingColorSpace,l)},toWorkingColorSpace:function(a,l){return this.convert(a,l,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Mr?Ol:this.spaces[a].transfer},getLuminanceCoefficients:function(a,l=this.workingColorSpace){return a.fromArray(this.spaces[l].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,l,u){return a.copy(this.spaces[l].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Zs]:{primaries:e,whitePoint:r,transfer:Ol,toXYZ:Kp,fromXYZ:Zp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Jn},outputColorSpaceConfig:{drawingBufferColorSpace:Jn}},[Jn]:{primaries:e,whitePoint:r,transfer:Dt,toXYZ:Kp,fromXYZ:Zp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Jn}}}),s}const bt=y_();function Wi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Xs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Rs;class S_{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Rs===void 0&&(Rs=zl("canvas")),Rs.width=e.width,Rs.height=e.height;const r=Rs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Rs}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zl("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),l=a.data;for(let u=0;u<l.length;u++)l[u]=Wi(l[u]/255)*255;return r.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(Wi(t[r]/255)*255):t[r]=Wi(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let M_=0;class fg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:M_++}),this.uuid=$o(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let u=0,f=a.length;u<f;u++)a[u].isDataTexture?l.push(bu(a[u].image)):l.push(bu(a[u]))}else l=bu(a);r.url=l}return t||(e.images[this.uuid]=r),r}}function bu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?S_.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let E_=0;class On extends Qs{constructor(e=On.DEFAULT_IMAGE,t=On.DEFAULT_MAPPING,r=Jr,a=Jr,l=Si,u=Qr,f=ui,h=Xi,m=On.DEFAULT_ANISOTROPY,g=Mr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:E_++}),this.uuid=$o(),this.name="",this.source=new fg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=l,this.minFilter=u,this.anisotropy=m,this.format=f,this.internalFormat=null,this.type=h,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _f:e.x=e.x-Math.floor(e.x);break;case Jr:e.x=e.x<0?0:1;break;case xf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _f:e.y=e.y-Math.floor(e.y);break;case Jr:e.y=e.y<0?0:1;break;case xf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}On.DEFAULT_IMAGE=null;On.DEFAULT_MAPPING=Zm;On.DEFAULT_ANISOTROPY=1;class qt{constructor(e=0,t=0,r=0,a=1){qt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,a){return this.x=e,this.y=t,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=this.w,u=e.elements;return this.x=u[0]*t+u[4]*r+u[8]*a+u[12]*l,this.y=u[1]*t+u[5]*r+u[9]*a+u[13]*l,this.z=u[2]*t+u[6]*r+u[10]*a+u[14]*l,this.w=u[3]*t+u[7]*r+u[11]*a+u[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,a,l;const h=e.elements,m=h[0],g=h[4],_=h[8],x=h[1],y=h[5],E=h[9],A=h[2],S=h[6],v=h[10];if(Math.abs(g-x)<.01&&Math.abs(_-A)<.01&&Math.abs(E-S)<.01){if(Math.abs(g+x)<.1&&Math.abs(_+A)<.1&&Math.abs(E+S)<.1&&Math.abs(m+y+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const D=(m+1)/2,b=(y+1)/2,W=(v+1)/2,I=(g+x)/4,k=(_+A)/4,V=(E+S)/4;return D>b&&D>W?D<.01?(r=0,a=.707106781,l=.707106781):(r=Math.sqrt(D),a=I/r,l=k/r):b>W?b<.01?(r=.707106781,a=0,l=.707106781):(a=Math.sqrt(b),r=I/a,l=V/a):W<.01?(r=.707106781,a=.707106781,l=0):(l=Math.sqrt(W),r=k/l,a=V/l),this.set(r,a,l,t),this}let F=Math.sqrt((S-E)*(S-E)+(_-A)*(_-A)+(x-g)*(x-g));return Math.abs(F)<.001&&(F=1),this.x=(S-E)/F,this.y=(_-A)/F,this.z=(x-g)/F,this.w=Math.acos((m+y+v-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this.w=xt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this.w=xt(this.w,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class T_ extends Qs{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new qt(0,0,e,t),this.scissorTest=!1,this.viewport=new qt(0,0,e,t);const a={width:e,height:t,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Si,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const l=new On(a,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);l.flipY=!1,l.generateMipmaps=r.generateMipmaps,l.internalFormat=r.internalFormat,this.textures=[];const u=r.count;for(let f=0;f<u;f++)this.textures[f]=l.clone(),this.textures[f].isRenderTargetTexture=!0,this.textures[f].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let a=0,l=this.textures.length;a<l;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,a=e.textures.length;r<a;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new fg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ns extends T_{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class dg extends On{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=fi,this.minFilter=fi,this.wrapR=Jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class w_ extends On{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=fi,this.minFilter=fi,this.wrapR=Jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ko{constructor(e=0,t=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=a}static slerpFlat(e,t,r,a,l,u,f){let h=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];const x=l[u+0],y=l[u+1],E=l[u+2],A=l[u+3];if(f===0){e[t+0]=h,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(f===1){e[t+0]=x,e[t+1]=y,e[t+2]=E,e[t+3]=A;return}if(_!==A||h!==x||m!==y||g!==E){let S=1-f;const v=h*x+m*y+g*E+_*A,F=v>=0?1:-1,D=1-v*v;if(D>Number.EPSILON){const W=Math.sqrt(D),I=Math.atan2(W,v*F);S=Math.sin(S*I)/W,f=Math.sin(f*I)/W}const b=f*F;if(h=h*S+x*b,m=m*S+y*b,g=g*S+E*b,_=_*S+A*b,S===1-f){const W=1/Math.sqrt(h*h+m*m+g*g+_*_);h*=W,m*=W,g*=W,_*=W}}e[t]=h,e[t+1]=m,e[t+2]=g,e[t+3]=_}static multiplyQuaternionsFlat(e,t,r,a,l,u){const f=r[a],h=r[a+1],m=r[a+2],g=r[a+3],_=l[u],x=l[u+1],y=l[u+2],E=l[u+3];return e[t]=f*E+g*_+h*y-m*x,e[t+1]=h*E+g*x+m*_-f*y,e[t+2]=m*E+g*y+f*x-h*_,e[t+3]=g*E-f*_-h*x-m*y,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,a){return this._x=e,this._y=t,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,a=e._y,l=e._z,u=e._order,f=Math.cos,h=Math.sin,m=f(r/2),g=f(a/2),_=f(l/2),x=h(r/2),y=h(a/2),E=h(l/2);switch(u){case"XYZ":this._x=x*g*_+m*y*E,this._y=m*y*_-x*g*E,this._z=m*g*E+x*y*_,this._w=m*g*_-x*y*E;break;case"YXZ":this._x=x*g*_+m*y*E,this._y=m*y*_-x*g*E,this._z=m*g*E-x*y*_,this._w=m*g*_+x*y*E;break;case"ZXY":this._x=x*g*_-m*y*E,this._y=m*y*_+x*g*E,this._z=m*g*E+x*y*_,this._w=m*g*_-x*y*E;break;case"ZYX":this._x=x*g*_-m*y*E,this._y=m*y*_+x*g*E,this._z=m*g*E-x*y*_,this._w=m*g*_+x*y*E;break;case"YZX":this._x=x*g*_+m*y*E,this._y=m*y*_+x*g*E,this._z=m*g*E-x*y*_,this._w=m*g*_-x*y*E;break;case"XZY":this._x=x*g*_-m*y*E,this._y=m*y*_-x*g*E,this._z=m*g*E+x*y*_,this._w=m*g*_+x*y*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],a=t[4],l=t[8],u=t[1],f=t[5],h=t[9],m=t[2],g=t[6],_=t[10],x=r+f+_;if(x>0){const y=.5/Math.sqrt(x+1);this._w=.25/y,this._x=(g-h)*y,this._y=(l-m)*y,this._z=(u-a)*y}else if(r>f&&r>_){const y=2*Math.sqrt(1+r-f-_);this._w=(g-h)/y,this._x=.25*y,this._y=(a+u)/y,this._z=(l+m)/y}else if(f>_){const y=2*Math.sqrt(1+f-r-_);this._w=(l-m)/y,this._x=(a+u)/y,this._y=.25*y,this._z=(h+g)/y}else{const y=2*Math.sqrt(1+_-r-f);this._w=(u-a)/y,this._x=(l+m)/y,this._y=(h+g)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,t/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,a=e._y,l=e._z,u=e._w,f=t._x,h=t._y,m=t._z,g=t._w;return this._x=r*g+u*f+a*m-l*h,this._y=a*g+u*h+l*f-r*m,this._z=l*g+u*m+r*h-a*f,this._w=u*g-r*f-a*h-l*m,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,a=this._y,l=this._z,u=this._w;let f=u*e._w+r*e._x+a*e._y+l*e._z;if(f<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,f=-f):this.copy(e),f>=1)return this._w=u,this._x=r,this._y=a,this._z=l,this;const h=1-f*f;if(h<=Number.EPSILON){const y=1-t;return this._w=y*u+t*this._w,this._x=y*r+t*this._x,this._y=y*a+t*this._y,this._z=y*l+t*this._z,this.normalize(),this}const m=Math.sqrt(h),g=Math.atan2(m,f),_=Math.sin((1-t)*g)/m,x=Math.sin(t*g)/m;return this._w=u*_+this._w*x,this._x=r*_+this._x*x,this._y=a*_+this._y*x,this._z=l*_+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{constructor(e=0,t=0,r=0){K.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jp.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*a,this.y=l[1]*t+l[4]*r+l[7]*a,this.z=l[2]*t+l[5]*r+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=e.elements,u=1/(l[3]*t+l[7]*r+l[11]*a+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*a+l[12])*u,this.y=(l[1]*t+l[5]*r+l[9]*a+l[13])*u,this.z=(l[2]*t+l[6]*r+l[10]*a+l[14])*u,this}applyQuaternion(e){const t=this.x,r=this.y,a=this.z,l=e.x,u=e.y,f=e.z,h=e.w,m=2*(u*a-f*r),g=2*(f*t-l*a),_=2*(l*r-u*t);return this.x=t+h*m+u*_-f*g,this.y=r+h*g+f*m-l*_,this.z=a+h*_+l*g-u*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*a,this.y=l[1]*t+l[5]*r+l[9]*a,this.z=l[2]*t+l[6]*r+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(xt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,a=e.y,l=e.z,u=t.x,f=t.y,h=t.z;return this.x=a*h-l*f,this.y=l*u-r*h,this.z=r*f-a*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Pu.copy(this).projectOnVector(e),this.sub(Pu)}reflect(e){return this.sub(Pu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(xt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return t*t+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const a=Math.sin(t)*e;return this.x=a*Math.sin(r),this.y=Math.cos(t)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pu=new K,Jp=new Ko;class Zo{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(oi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(oi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=oi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,f=l.count;u<f;u++)e.isMesh===!0?e.getVertexPosition(u,oi):oi.fromBufferAttribute(l,u),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ll.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),ll.copy(r.boundingBox)),ll.applyMatrix4(e.matrixWorld),this.union(ll)}const a=e.children;for(let l=0,u=a.length;l<u;l++)this.expandByObject(a[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fo),cl.subVectors(this.max,Fo),bs.subVectors(e.a,Fo),Ps.subVectors(e.b,Fo),Ls.subVectors(e.c,Fo),mr.subVectors(Ps,bs),gr.subVectors(Ls,Ps),Hr.subVectors(bs,Ls);let t=[0,-mr.z,mr.y,0,-gr.z,gr.y,0,-Hr.z,Hr.y,mr.z,0,-mr.x,gr.z,0,-gr.x,Hr.z,0,-Hr.x,-mr.y,mr.x,0,-gr.y,gr.x,0,-Hr.y,Hr.x,0];return!Lu(t,bs,Ps,Ls,cl)||(t=[1,0,0,0,1,0,0,0,1],!Lu(t,bs,Ps,Ls,cl))?!1:(ul.crossVectors(mr,gr),t=[ul.x,ul.y,ul.z],Lu(t,bs,Ps,Ls,cl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ui=[new K,new K,new K,new K,new K,new K,new K,new K],oi=new K,ll=new Zo,bs=new K,Ps=new K,Ls=new K,mr=new K,gr=new K,Hr=new K,Fo=new K,cl=new K,ul=new K,Vr=new K;function Lu(s,e,t,r,a){for(let l=0,u=s.length-3;l<=u;l+=3){Vr.fromArray(s,l);const f=a.x*Math.abs(Vr.x)+a.y*Math.abs(Vr.y)+a.z*Math.abs(Vr.z),h=e.dot(Vr),m=t.dot(Vr),g=r.dot(Vr);if(Math.max(-Math.max(h,m,g),Math.min(h,m,g))>f)return!1}return!0}const A_=new Zo,Oo=new K,Du=new K;class Hl{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):A_.setFromPoints(e).getCenter(r);let a=0;for(let l=0,u=e.length;l<u;l++)a=Math.max(a,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Oo.subVectors(e,this.center);const t=Oo.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),a=(r-this.radius)*.5;this.center.addScaledVector(Oo,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Du.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Oo.copy(e.center).add(Du)),this.expandByPoint(Oo.copy(e.center).sub(Du))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Fi=new K,Nu=new K,fl=new K,vr=new K,Iu=new K,dl=new K,Uu=new K;class hg{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,t),Fi.distanceToSquared(e))}distanceSqToSegment(e,t,r,a){Nu.copy(e).add(t).multiplyScalar(.5),fl.copy(t).sub(e).normalize(),vr.copy(this.origin).sub(Nu);const l=e.distanceTo(t)*.5,u=-this.direction.dot(fl),f=vr.dot(this.direction),h=-vr.dot(fl),m=vr.lengthSq(),g=Math.abs(1-u*u);let _,x,y,E;if(g>0)if(_=u*h-f,x=u*f-h,E=l*g,_>=0)if(x>=-E)if(x<=E){const A=1/g;_*=A,x*=A,y=_*(_+u*x+2*f)+x*(u*_+x+2*h)+m}else x=l,_=Math.max(0,-(u*x+f)),y=-_*_+x*(x+2*h)+m;else x=-l,_=Math.max(0,-(u*x+f)),y=-_*_+x*(x+2*h)+m;else x<=-E?(_=Math.max(0,-(-u*l+f)),x=_>0?-l:Math.min(Math.max(-l,-h),l),y=-_*_+x*(x+2*h)+m):x<=E?(_=0,x=Math.min(Math.max(-l,-h),l),y=x*(x+2*h)+m):(_=Math.max(0,-(u*l+f)),x=_>0?l:Math.min(Math.max(-l,-h),l),y=-_*_+x*(x+2*h)+m);else x=u>0?-l:l,_=Math.max(0,-(u*x+f)),y=-_*_+x*(x+2*h)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,_),a&&a.copy(Nu).addScaledVector(fl,x),y}intersectSphere(e,t){Fi.subVectors(e.center,this.origin);const r=Fi.dot(this.direction),a=Fi.dot(Fi)-r*r,l=e.radius*e.radius;if(a>l)return null;const u=Math.sqrt(l-a),f=r-u,h=r+u;return h<0?null:f<0?this.at(h,t):this.at(f,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,a,l,u,f,h;const m=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,x=this.origin;return m>=0?(r=(e.min.x-x.x)*m,a=(e.max.x-x.x)*m):(r=(e.max.x-x.x)*m,a=(e.min.x-x.x)*m),g>=0?(l=(e.min.y-x.y)*g,u=(e.max.y-x.y)*g):(l=(e.max.y-x.y)*g,u=(e.min.y-x.y)*g),r>u||l>a||((l>r||isNaN(r))&&(r=l),(u<a||isNaN(a))&&(a=u),_>=0?(f=(e.min.z-x.z)*_,h=(e.max.z-x.z)*_):(f=(e.max.z-x.z)*_,h=(e.min.z-x.z)*_),r>h||f>a)||((f>r||r!==r)&&(r=f),(h<a||a!==a)&&(a=h),a<0)?null:this.at(r>=0?r:a,t)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,t,r,a,l){Iu.subVectors(t,e),dl.subVectors(r,e),Uu.crossVectors(Iu,dl);let u=this.direction.dot(Uu),f;if(u>0){if(a)return null;f=1}else if(u<0)f=-1,u=-u;else return null;vr.subVectors(this.origin,e);const h=f*this.direction.dot(dl.crossVectors(vr,dl));if(h<0)return null;const m=f*this.direction.dot(Iu.cross(vr));if(m<0||h+m>u)return null;const g=-f*vr.dot(Uu);return g<0?null:this.at(g/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bt{constructor(e,t,r,a,l,u,f,h,m,g,_,x,y,E,A,S){Bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,u,f,h,m,g,_,x,y,E,A,S)}set(e,t,r,a,l,u,f,h,m,g,_,x,y,E,A,S){const v=this.elements;return v[0]=e,v[4]=t,v[8]=r,v[12]=a,v[1]=l,v[5]=u,v[9]=f,v[13]=h,v[2]=m,v[6]=g,v[10]=_,v[14]=x,v[3]=y,v[7]=E,v[11]=A,v[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bt().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,a=1/Ds.setFromMatrixColumn(e,0).length(),l=1/Ds.setFromMatrixColumn(e,1).length(),u=1/Ds.setFromMatrixColumn(e,2).length();return t[0]=r[0]*a,t[1]=r[1]*a,t[2]=r[2]*a,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*u,t[9]=r[9]*u,t[10]=r[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,a=e.y,l=e.z,u=Math.cos(r),f=Math.sin(r),h=Math.cos(a),m=Math.sin(a),g=Math.cos(l),_=Math.sin(l);if(e.order==="XYZ"){const x=u*g,y=u*_,E=f*g,A=f*_;t[0]=h*g,t[4]=-h*_,t[8]=m,t[1]=y+E*m,t[5]=x-A*m,t[9]=-f*h,t[2]=A-x*m,t[6]=E+y*m,t[10]=u*h}else if(e.order==="YXZ"){const x=h*g,y=h*_,E=m*g,A=m*_;t[0]=x+A*f,t[4]=E*f-y,t[8]=u*m,t[1]=u*_,t[5]=u*g,t[9]=-f,t[2]=y*f-E,t[6]=A+x*f,t[10]=u*h}else if(e.order==="ZXY"){const x=h*g,y=h*_,E=m*g,A=m*_;t[0]=x-A*f,t[4]=-u*_,t[8]=E+y*f,t[1]=y+E*f,t[5]=u*g,t[9]=A-x*f,t[2]=-u*m,t[6]=f,t[10]=u*h}else if(e.order==="ZYX"){const x=u*g,y=u*_,E=f*g,A=f*_;t[0]=h*g,t[4]=E*m-y,t[8]=x*m+A,t[1]=h*_,t[5]=A*m+x,t[9]=y*m-E,t[2]=-m,t[6]=f*h,t[10]=u*h}else if(e.order==="YZX"){const x=u*h,y=u*m,E=f*h,A=f*m;t[0]=h*g,t[4]=A-x*_,t[8]=E*_+y,t[1]=_,t[5]=u*g,t[9]=-f*g,t[2]=-m*g,t[6]=y*_+E,t[10]=x-A*_}else if(e.order==="XZY"){const x=u*h,y=u*m,E=f*h,A=f*m;t[0]=h*g,t[4]=-_,t[8]=m*g,t[1]=x*_+A,t[5]=u*g,t[9]=y*_-E,t[2]=E*_-y,t[6]=f*g,t[10]=A*_+x}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(C_,e,R_)}lookAt(e,t,r){const a=this.elements;return Vn.subVectors(e,t),Vn.lengthSq()===0&&(Vn.z=1),Vn.normalize(),_r.crossVectors(r,Vn),_r.lengthSq()===0&&(Math.abs(r.z)===1?Vn.x+=1e-4:Vn.z+=1e-4,Vn.normalize(),_r.crossVectors(r,Vn)),_r.normalize(),hl.crossVectors(Vn,_r),a[0]=_r.x,a[4]=hl.x,a[8]=Vn.x,a[1]=_r.y,a[5]=hl.y,a[9]=Vn.y,a[2]=_r.z,a[6]=hl.z,a[10]=Vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,u=r[0],f=r[4],h=r[8],m=r[12],g=r[1],_=r[5],x=r[9],y=r[13],E=r[2],A=r[6],S=r[10],v=r[14],F=r[3],D=r[7],b=r[11],W=r[15],I=a[0],k=a[4],V=a[8],P=a[12],C=a[1],z=a[5],J=a[9],X=a[13],ne=a[2],de=a[6],oe=a[10],ue=a[14],B=a[3],pe=a[7],L=a[11],M=a[15];return l[0]=u*I+f*C+h*ne+m*B,l[4]=u*k+f*z+h*de+m*pe,l[8]=u*V+f*J+h*oe+m*L,l[12]=u*P+f*X+h*ue+m*M,l[1]=g*I+_*C+x*ne+y*B,l[5]=g*k+_*z+x*de+y*pe,l[9]=g*V+_*J+x*oe+y*L,l[13]=g*P+_*X+x*ue+y*M,l[2]=E*I+A*C+S*ne+v*B,l[6]=E*k+A*z+S*de+v*pe,l[10]=E*V+A*J+S*oe+v*L,l[14]=E*P+A*X+S*ue+v*M,l[3]=F*I+D*C+b*ne+W*B,l[7]=F*k+D*z+b*de+W*pe,l[11]=F*V+D*J+b*oe+W*L,l[15]=F*P+D*X+b*ue+W*M,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],a=e[8],l=e[12],u=e[1],f=e[5],h=e[9],m=e[13],g=e[2],_=e[6],x=e[10],y=e[14],E=e[3],A=e[7],S=e[11],v=e[15];return E*(+l*h*_-a*m*_-l*f*x+r*m*x+a*f*y-r*h*y)+A*(+t*h*y-t*m*x+l*u*x-a*u*y+a*m*g-l*h*g)+S*(+t*m*_-t*f*y-l*u*_+r*u*y+l*f*g-r*m*g)+v*(-a*f*g-t*h*_+t*f*x+a*u*_-r*u*x+r*h*g)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],u=e[4],f=e[5],h=e[6],m=e[7],g=e[8],_=e[9],x=e[10],y=e[11],E=e[12],A=e[13],S=e[14],v=e[15],F=_*S*m-A*x*m+A*h*y-f*S*y-_*h*v+f*x*v,D=E*x*m-g*S*m-E*h*y+u*S*y+g*h*v-u*x*v,b=g*A*m-E*_*m+E*f*y-u*A*y-g*f*v+u*_*v,W=E*_*h-g*A*h-E*f*x+u*A*x+g*f*S-u*_*S,I=t*F+r*D+a*b+l*W;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/I;return e[0]=F*k,e[1]=(A*x*l-_*S*l-A*a*y+r*S*y+_*a*v-r*x*v)*k,e[2]=(f*S*l-A*h*l+A*a*m-r*S*m-f*a*v+r*h*v)*k,e[3]=(_*h*l-f*x*l-_*a*m+r*x*m+f*a*y-r*h*y)*k,e[4]=D*k,e[5]=(g*S*l-E*x*l+E*a*y-t*S*y-g*a*v+t*x*v)*k,e[6]=(E*h*l-u*S*l-E*a*m+t*S*m+u*a*v-t*h*v)*k,e[7]=(u*x*l-g*h*l+g*a*m-t*x*m-u*a*y+t*h*y)*k,e[8]=b*k,e[9]=(E*_*l-g*A*l-E*r*y+t*A*y+g*r*v-t*_*v)*k,e[10]=(u*A*l-E*f*l+E*r*m-t*A*m-u*r*v+t*f*v)*k,e[11]=(g*f*l-u*_*l-g*r*m+t*_*m+u*r*y-t*f*y)*k,e[12]=W*k,e[13]=(g*A*a-E*_*a+E*r*x-t*A*x-g*r*S+t*_*S)*k,e[14]=(E*f*a-u*A*a-E*r*h+t*A*h+u*r*S-t*f*S)*k,e[15]=(u*_*a-g*f*a+g*r*h-t*_*h-u*r*x+t*f*x)*k,this}scale(e){const t=this.elements,r=e.x,a=e.y,l=e.z;return t[0]*=r,t[4]*=a,t[8]*=l,t[1]*=r,t[5]*=a,t[9]*=l,t[2]*=r,t[6]*=a,t[10]*=l,t[3]*=r,t[7]*=a,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,a))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),a=Math.sin(t),l=1-r,u=e.x,f=e.y,h=e.z,m=l*u,g=l*f;return this.set(m*u+r,m*f-a*h,m*h+a*f,0,m*f+a*h,g*f+r,g*h-a*u,0,m*h-a*f,g*h+a*u,l*h*h+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,a,l,u){return this.set(1,r,l,0,e,1,u,0,t,a,1,0,0,0,0,1),this}compose(e,t,r){const a=this.elements,l=t._x,u=t._y,f=t._z,h=t._w,m=l+l,g=u+u,_=f+f,x=l*m,y=l*g,E=l*_,A=u*g,S=u*_,v=f*_,F=h*m,D=h*g,b=h*_,W=r.x,I=r.y,k=r.z;return a[0]=(1-(A+v))*W,a[1]=(y+b)*W,a[2]=(E-D)*W,a[3]=0,a[4]=(y-b)*I,a[5]=(1-(x+v))*I,a[6]=(S+F)*I,a[7]=0,a[8]=(E+D)*k,a[9]=(S-F)*k,a[10]=(1-(x+A))*k,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,r){const a=this.elements;let l=Ds.set(a[0],a[1],a[2]).length();const u=Ds.set(a[4],a[5],a[6]).length(),f=Ds.set(a[8],a[9],a[10]).length();this.determinant()<0&&(l=-l),e.x=a[12],e.y=a[13],e.z=a[14],ai.copy(this);const m=1/l,g=1/u,_=1/f;return ai.elements[0]*=m,ai.elements[1]*=m,ai.elements[2]*=m,ai.elements[4]*=g,ai.elements[5]*=g,ai.elements[6]*=g,ai.elements[8]*=_,ai.elements[9]*=_,ai.elements[10]*=_,t.setFromRotationMatrix(ai),r.x=l,r.y=u,r.z=f,this}makePerspective(e,t,r,a,l,u,f=Gi){const h=this.elements,m=2*l/(t-e),g=2*l/(r-a),_=(t+e)/(t-e),x=(r+a)/(r-a);let y,E;if(f===Gi)y=-(u+l)/(u-l),E=-2*u*l/(u-l);else if(f===kl)y=-u/(u-l),E=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+f);return h[0]=m,h[4]=0,h[8]=_,h[12]=0,h[1]=0,h[5]=g,h[9]=x,h[13]=0,h[2]=0,h[6]=0,h[10]=y,h[14]=E,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,r,a,l,u,f=Gi){const h=this.elements,m=1/(t-e),g=1/(r-a),_=1/(u-l),x=(t+e)*m,y=(r+a)*g;let E,A;if(f===Gi)E=(u+l)*_,A=-2*_;else if(f===kl)E=l*_,A=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+f);return h[0]=2*m,h[4]=0,h[8]=0,h[12]=-x,h[1]=0,h[5]=2*g,h[9]=0,h[13]=-y,h[2]=0,h[6]=0,h[10]=A,h[14]=-E,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<16;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const Ds=new K,ai=new Bt,C_=new K(0,0,0),R_=new K(1,1,1),_r=new K,hl=new K,Vn=new K,Qp=new Bt,em=new Ko;class Ei{constructor(e=0,t=0,r=0,a=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,a=this._order){return this._x=e,this._y=t,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const a=e.elements,l=a[0],u=a[4],f=a[8],h=a[1],m=a[5],g=a[9],_=a[2],x=a[6],y=a[10];switch(t){case"XYZ":this._y=Math.asin(xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-g,y),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(f,y),this._z=Math.atan2(h,m)):(this._y=Math.atan2(-_,l),this._z=0);break;case"ZXY":this._x=Math.asin(xt(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-_,y),this._z=Math.atan2(-u,m)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-xt(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(x,y),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-u,m));break;case"YZX":this._z=Math.asin(xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,m),this._y=Math.atan2(-_,l)):(this._x=0,this._y=Math.atan2(f,y));break;case"XZY":this._z=Math.asin(-xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(f,l)):(this._x=Math.atan2(-g,y),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return Qp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qp,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return em.setFromEuler(this),this.setFromQuaternion(em,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class pg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let b_=0;const tm=new K,Ns=new Ko,Oi=new Bt,pl=new K,ko=new K,P_=new K,L_=new Ko,nm=new K(1,0,0),im=new K(0,1,0),rm=new K(0,0,1),sm={type:"added"},D_={type:"removed"},Is={type:"childadded",child:null},Fu={type:"childremoved",child:null};class hn extends Qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:b_++}),this.uuid=$o(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=hn.DEFAULT_UP.clone();const e=new K,t=new Ei,r=new Ko,a=new K(1,1,1);function l(){r.setFromEuler(t,!1)}function u(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Bt},normalMatrix:{value:new ht}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=hn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ns.setFromAxisAngle(e,t),this.quaternion.multiply(Ns),this}rotateOnWorldAxis(e,t){return Ns.setFromAxisAngle(e,t),this.quaternion.premultiply(Ns),this}rotateX(e){return this.rotateOnAxis(nm,e)}rotateY(e){return this.rotateOnAxis(im,e)}rotateZ(e){return this.rotateOnAxis(rm,e)}translateOnAxis(e,t){return tm.copy(e).applyQuaternion(this.quaternion),this.position.add(tm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nm,e)}translateY(e){return this.translateOnAxis(im,e)}translateZ(e){return this.translateOnAxis(rm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?pl.copy(e):pl.set(e,t,r);const a=this.parent;this.updateWorldMatrix(!0,!1),ko.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(ko,pl,this.up):Oi.lookAt(pl,ko,this.up),this.quaternion.setFromRotationMatrix(Oi),a&&(Oi.extractRotation(a.matrixWorld),Ns.setFromRotationMatrix(Oi),this.quaternion.premultiply(Ns.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sm),Is.child=e,this.dispatchEvent(Is),Is.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(D_),Fu.child=e,this.dispatchEvent(Fu),Fu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Oi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sm),Is.child=e,this.dispatchEvent(Is),Is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,a=this.children.length;r<a;r++){const u=this.children[r].getObjectByProperty(e,t);if(u!==void 0)return u}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const a=this.children;for(let l=0,u=a.length;l<u;l++)a[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,e,P_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,L_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let l=0,u=a.length;l<u;l++)a[l].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(f=>({boxInitialized:f.boxInitialized,boxMin:f.box.min.toArray(),boxMax:f.box.max.toArray(),sphereInitialized:f.sphereInitialized,sphereRadius:f.sphere.radius,sphereCenter:f.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function l(f,h){return f[h.uuid]===void 0&&(f[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const f=this.geometry.parameters;if(f!==void 0&&f.shapes!==void 0){const h=f.shapes;if(Array.isArray(h))for(let m=0,g=h.length;m<g;m++){const _=h[m];l(e.shapes,_)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const f=[];for(let h=0,m=this.material.length;h<m;h++)f.push(l(e.materials,this.material[h]));a.material=f}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let f=0;f<this.children.length;f++)a.children.push(this.children[f].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let f=0;f<this.animations.length;f++){const h=this.animations[f];a.animations.push(l(e.animations,h))}}if(t){const f=u(e.geometries),h=u(e.materials),m=u(e.textures),g=u(e.images),_=u(e.shapes),x=u(e.skeletons),y=u(e.animations),E=u(e.nodes);f.length>0&&(r.geometries=f),h.length>0&&(r.materials=h),m.length>0&&(r.textures=m),g.length>0&&(r.images=g),_.length>0&&(r.shapes=_),x.length>0&&(r.skeletons=x),y.length>0&&(r.animations=y),E.length>0&&(r.nodes=E)}return r.object=a,r;function u(f){const h=[];for(const m in f){const g=f[m];delete g.metadata,h.push(g)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}hn.DEFAULT_UP=new K(0,1,0);hn.DEFAULT_MATRIX_AUTO_UPDATE=!0;hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const li=new K,ki=new K,Ou=new K,zi=new K,Us=new K,Fs=new K,om=new K,ku=new K,zu=new K,Bu=new K,Hu=new qt,Vu=new qt,Gu=new qt;class ci{constructor(e=new K,t=new K,r=new K){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,a){a.subVectors(r,t),li.subVectors(e,t),a.cross(li);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,t,r,a,l){li.subVectors(a,t),ki.subVectors(r,t),Ou.subVectors(e,t);const u=li.dot(li),f=li.dot(ki),h=li.dot(Ou),m=ki.dot(ki),g=ki.dot(Ou),_=u*m-f*f;if(_===0)return l.set(0,0,0),null;const x=1/_,y=(m*h-f*g)*x,E=(u*g-f*h)*x;return l.set(1-y-E,E,y)}static containsPoint(e,t,r,a){return this.getBarycoord(e,t,r,a,zi)===null?!1:zi.x>=0&&zi.y>=0&&zi.x+zi.y<=1}static getInterpolation(e,t,r,a,l,u,f,h){return this.getBarycoord(e,t,r,a,zi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,zi.x),h.addScaledVector(u,zi.y),h.addScaledVector(f,zi.z),h)}static getInterpolatedAttribute(e,t,r,a,l,u){return Hu.setScalar(0),Vu.setScalar(0),Gu.setScalar(0),Hu.fromBufferAttribute(e,t),Vu.fromBufferAttribute(e,r),Gu.fromBufferAttribute(e,a),u.setScalar(0),u.addScaledVector(Hu,l.x),u.addScaledVector(Vu,l.y),u.addScaledVector(Gu,l.z),u}static isFrontFacing(e,t,r,a){return li.subVectors(r,t),ki.subVectors(e,t),li.cross(ki).dot(a)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,a){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,r,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return li.subVectors(this.c,this.b),ki.subVectors(this.a,this.b),li.cross(ki).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ci.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,a,l){return ci.getInterpolation(e,this.a,this.b,this.c,t,r,a,l)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,a=this.b,l=this.c;let u,f;Us.subVectors(a,r),Fs.subVectors(l,r),ku.subVectors(e,r);const h=Us.dot(ku),m=Fs.dot(ku);if(h<=0&&m<=0)return t.copy(r);zu.subVectors(e,a);const g=Us.dot(zu),_=Fs.dot(zu);if(g>=0&&_<=g)return t.copy(a);const x=h*_-g*m;if(x<=0&&h>=0&&g<=0)return u=h/(h-g),t.copy(r).addScaledVector(Us,u);Bu.subVectors(e,l);const y=Us.dot(Bu),E=Fs.dot(Bu);if(E>=0&&y<=E)return t.copy(l);const A=y*m-h*E;if(A<=0&&m>=0&&E<=0)return f=m/(m-E),t.copy(r).addScaledVector(Fs,f);const S=g*E-y*_;if(S<=0&&_-g>=0&&y-E>=0)return om.subVectors(l,a),f=(_-g)/(_-g+(y-E)),t.copy(a).addScaledVector(om,f);const v=1/(S+A+x);return u=A*v,f=x*v,t.copy(r).addScaledVector(Us,u).addScaledVector(Fs,f)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const mg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xr={h:0,s:0,l:0},ml={h:0,s:0,l:0};function Wu(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Tt{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Jn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.toWorkingColorSpace(this,t),this}setRGB(e,t,r,a=bt.workingColorSpace){return this.r=e,this.g=t,this.b=r,bt.toWorkingColorSpace(this,a),this}setHSL(e,t,r,a=bt.workingColorSpace){if(e=m_(e,1),t=xt(t,0,1),r=xt(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,u=2*r-l;this.r=Wu(u,l,e+1/3),this.g=Wu(u,l,e),this.b=Wu(u,l,e-1/3)}return bt.toWorkingColorSpace(this,a),this}setStyle(e,t=Jn){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=a[1],f=a[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(u===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Jn){const r=mg[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Jn){return bt.fromWorkingColorSpace(Sn.copy(this),e),Math.round(xt(Sn.r*255,0,255))*65536+Math.round(xt(Sn.g*255,0,255))*256+Math.round(xt(Sn.b*255,0,255))}getHexString(e=Jn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=bt.workingColorSpace){bt.fromWorkingColorSpace(Sn.copy(this),t);const r=Sn.r,a=Sn.g,l=Sn.b,u=Math.max(r,a,l),f=Math.min(r,a,l);let h,m;const g=(f+u)/2;if(f===u)h=0,m=0;else{const _=u-f;switch(m=g<=.5?_/(u+f):_/(2-u-f),u){case r:h=(a-l)/_+(a<l?6:0);break;case a:h=(l-r)/_+2;break;case l:h=(r-a)/_+4;break}h/=6}return e.h=h,e.s=m,e.l=g,e}getRGB(e,t=bt.workingColorSpace){return bt.fromWorkingColorSpace(Sn.copy(this),t),e.r=Sn.r,e.g=Sn.g,e.b=Sn.b,e}getStyle(e=Jn){bt.fromWorkingColorSpace(Sn.copy(this),e);const t=Sn.r,r=Sn.g,a=Sn.b;return e!==Jn?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,t,r){return this.getHSL(xr),this.setHSL(xr.h+e,xr.s+t,xr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(xr),e.getHSL(ml);const r=Cu(xr.h,ml.h,t),a=Cu(xr.s,ml.s,t),l=Cu(xr.l,ml.l,t);return this.setHSL(r,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,a=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*a,this.g=l[1]*t+l[4]*r+l[7]*a,this.b=l[2]*t+l[5]*r+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Sn=new Tt;Tt.NAMES=mg;let N_=0;class eo extends Qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:N_++}),this.uuid=$o(),this.name="",this.type="Material",this.blending=Gs,this.side=wr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=af,this.blendDst=lf,this.blendEquation=Kr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Tt(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Cs,this.stencilZFail=Cs,this.stencilZPass=Cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Gs&&(r.blending=this.blending),this.side!==wr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==af&&(r.blendSrc=this.blendSrc),this.blendDst!==lf&&(r.blendDst=this.blendDst),this.blendEquation!==Kr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==js&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jp&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Cs&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Cs&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Cs&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(l){const u=[];for(const f in l){const h=l[f];delete h.metadata,u.push(h)}return u}if(t){const l=a(e.textures),u=a(e.images);l.length>0&&(r.textures=l),u.length>0&&(r.images=u)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const a=t.length;r=new Array(a);for(let l=0;l!==a;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class gg extends eo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=Km,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kt=new K,gl=new st;let I_=0;class di{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:I_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=qp,this.updateRanges=[],this.gpuType=Vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=t.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)gl.fromBufferAttribute(this,t),gl.applyMatrix3(e),this.setXY(t,gl.x,gl.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=Uo(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Un(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Uo(t,this.array)),t}setX(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Uo(t,this.array)),t}setY(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Uo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Uo(t,this.array)),t}setW(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),r=Un(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,a){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),r=Un(r,this.array),a=Un(a,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,t,r,a,l){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),r=Un(r,this.array),a=Un(a,this.array),l=Un(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qp&&(e.usage=this.usage),e}}class vg extends di{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class _g extends di{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class en extends di{constructor(e,t,r){super(new Float32Array(e),t,r)}}let U_=0;const Zn=new Bt,Xu=new hn,Os=new K,Gn=new Zo,zo=new Zo,cn=new K;class Wn extends Qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:U_++}),this.uuid=$o(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ug(e)?_g:vg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new ht().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zn.makeRotationFromQuaternion(e),this.applyMatrix4(Zn),this}rotateX(e){return Zn.makeRotationX(e),this.applyMatrix4(Zn),this}rotateY(e){return Zn.makeRotationY(e),this.applyMatrix4(Zn),this}rotateZ(e){return Zn.makeRotationZ(e),this.applyMatrix4(Zn),this}translate(e,t,r){return Zn.makeTranslation(e,t,r),this.applyMatrix4(Zn),this}scale(e,t,r){return Zn.makeScale(e,t,r),this.applyMatrix4(Zn),this}lookAt(e){return Xu.lookAt(e),Xu.updateMatrix(),this.applyMatrix4(Xu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let a=0,l=e.length;a<l;a++){const u=e[a];r.push(u.x,u.y,u.z||0)}this.setAttribute("position",new en(r,3))}else{const r=Math.min(e.length,t.count);for(let a=0;a<r;a++){const l=e[a];t.setXYZ(a,l.x,l.y,l.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const l=t[r];Gn.setFromBufferAttribute(l),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Gn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Gn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Gn.min),this.boundingBox.expandByPoint(Gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const r=this.boundingSphere.center;if(Gn.setFromBufferAttribute(e),t)for(let l=0,u=t.length;l<u;l++){const f=t[l];zo.setFromBufferAttribute(f),this.morphTargetsRelative?(cn.addVectors(Gn.min,zo.min),Gn.expandByPoint(cn),cn.addVectors(Gn.max,zo.max),Gn.expandByPoint(cn)):(Gn.expandByPoint(zo.min),Gn.expandByPoint(zo.max))}Gn.getCenter(r);let a=0;for(let l=0,u=e.count;l<u;l++)cn.fromBufferAttribute(e,l),a=Math.max(a,r.distanceToSquared(cn));if(t)for(let l=0,u=t.length;l<u;l++){const f=t[l],h=this.morphTargetsRelative;for(let m=0,g=f.count;m<g;m++)cn.fromBufferAttribute(f,m),h&&(Os.fromBufferAttribute(e,m),cn.add(Os)),a=Math.max(a,r.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,a=t.normal,l=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new di(new Float32Array(4*r.count),4));const u=this.getAttribute("tangent"),f=[],h=[];for(let V=0;V<r.count;V++)f[V]=new K,h[V]=new K;const m=new K,g=new K,_=new K,x=new st,y=new st,E=new st,A=new K,S=new K;function v(V,P,C){m.fromBufferAttribute(r,V),g.fromBufferAttribute(r,P),_.fromBufferAttribute(r,C),x.fromBufferAttribute(l,V),y.fromBufferAttribute(l,P),E.fromBufferAttribute(l,C),g.sub(m),_.sub(m),y.sub(x),E.sub(x);const z=1/(y.x*E.y-E.x*y.y);isFinite(z)&&(A.copy(g).multiplyScalar(E.y).addScaledVector(_,-y.y).multiplyScalar(z),S.copy(_).multiplyScalar(y.x).addScaledVector(g,-E.x).multiplyScalar(z),f[V].add(A),f[P].add(A),f[C].add(A),h[V].add(S),h[P].add(S),h[C].add(S))}let F=this.groups;F.length===0&&(F=[{start:0,count:e.count}]);for(let V=0,P=F.length;V<P;++V){const C=F[V],z=C.start,J=C.count;for(let X=z,ne=z+J;X<ne;X+=3)v(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const D=new K,b=new K,W=new K,I=new K;function k(V){W.fromBufferAttribute(a,V),I.copy(W);const P=f[V];D.copy(P),D.sub(W.multiplyScalar(W.dot(P))).normalize(),b.crossVectors(I,P);const z=b.dot(h[V])<0?-1:1;u.setXYZW(V,D.x,D.y,D.z,z)}for(let V=0,P=F.length;V<P;++V){const C=F[V],z=C.start,J=C.count;for(let X=z,ne=z+J;X<ne;X+=3)k(e.getX(X+0)),k(e.getX(X+1)),k(e.getX(X+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new di(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let x=0,y=r.count;x<y;x++)r.setXYZ(x,0,0,0);const a=new K,l=new K,u=new K,f=new K,h=new K,m=new K,g=new K,_=new K;if(e)for(let x=0,y=e.count;x<y;x+=3){const E=e.getX(x+0),A=e.getX(x+1),S=e.getX(x+2);a.fromBufferAttribute(t,E),l.fromBufferAttribute(t,A),u.fromBufferAttribute(t,S),g.subVectors(u,l),_.subVectors(a,l),g.cross(_),f.fromBufferAttribute(r,E),h.fromBufferAttribute(r,A),m.fromBufferAttribute(r,S),f.add(g),h.add(g),m.add(g),r.setXYZ(E,f.x,f.y,f.z),r.setXYZ(A,h.x,h.y,h.z),r.setXYZ(S,m.x,m.y,m.z)}else for(let x=0,y=t.count;x<y;x+=3)a.fromBufferAttribute(t,x+0),l.fromBufferAttribute(t,x+1),u.fromBufferAttribute(t,x+2),g.subVectors(u,l),_.subVectors(a,l),g.cross(_),r.setXYZ(x+0,g.x,g.y,g.z),r.setXYZ(x+1,g.x,g.y,g.z),r.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(f,h){const m=f.array,g=f.itemSize,_=f.normalized,x=new m.constructor(h.length*g);let y=0,E=0;for(let A=0,S=h.length;A<S;A++){f.isInterleavedBufferAttribute?y=h[A]*f.data.stride+f.offset:y=h[A]*g;for(let v=0;v<g;v++)x[E++]=m[y++]}return new di(x,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Wn,r=this.index.array,a=this.attributes;for(const f in a){const h=a[f],m=e(h,r);t.setAttribute(f,m)}const l=this.morphAttributes;for(const f in l){const h=[],m=l[f];for(let g=0,_=m.length;g<_;g++){const x=m[g],y=e(x,r);h.push(y)}t.morphAttributes[f]=h}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let f=0,h=u.length;f<h;f++){const m=u[f];t.addGroup(m.start,m.count,m.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const m in h)h[m]!==void 0&&(e[m]=h[m]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const h in r){const m=r[h];e.data.attributes[h]=m.toJSON(e.data)}const a={};let l=!1;for(const h in this.morphAttributes){const m=this.morphAttributes[h],g=[];for(let _=0,x=m.length;_<x;_++){const y=m[_];g.push(y.toJSON(e.data))}g.length>0&&(a[h]=g,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const f=this.boundingSphere;return f!==null&&(e.data.boundingSphere={center:f.center.toArray(),radius:f.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const a=e.attributes;for(const m in a){const g=a[m];this.setAttribute(m,g.clone(t))}const l=e.morphAttributes;for(const m in l){const g=[],_=l[m];for(let x=0,y=_.length;x<y;x++)g.push(_[x].clone(t));this.morphAttributes[m]=g}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let m=0,g=u.length;m<g;m++){const _=u[m];this.addGroup(_.start,_.count,_.materialIndex)}const f=e.boundingBox;f!==null&&(this.boundingBox=f.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const am=new Bt,Gr=new hg,vl=new Hl,lm=new K,_l=new K,xl=new K,yl=new K,ju=new K,Sl=new K,cm=new K,Ml=new K;class Gt extends hn{constructor(e=new Wn,t=new gg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const f=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}getVertexPosition(e,t){const r=this.geometry,a=r.attributes.position,l=r.morphAttributes.position,u=r.morphTargetsRelative;t.fromBufferAttribute(a,e);const f=this.morphTargetInfluences;if(l&&f){Sl.set(0,0,0);for(let h=0,m=l.length;h<m;h++){const g=f[h],_=l[h];g!==0&&(ju.fromBufferAttribute(_,e),u?Sl.addScaledVector(ju,g):Sl.addScaledVector(ju.sub(t),g))}t.add(Sl)}return t}raycast(e,t){const r=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),vl.copy(r.boundingSphere),vl.applyMatrix4(l),Gr.copy(e.ray).recast(e.near),!(vl.containsPoint(Gr.origin)===!1&&(Gr.intersectSphere(vl,lm)===null||Gr.origin.distanceToSquared(lm)>(e.far-e.near)**2))&&(am.copy(l).invert(),Gr.copy(e.ray).applyMatrix4(am),!(r.boundingBox!==null&&Gr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,Gr)))}_computeIntersections(e,t,r){let a;const l=this.geometry,u=this.material,f=l.index,h=l.attributes.position,m=l.attributes.uv,g=l.attributes.uv1,_=l.attributes.normal,x=l.groups,y=l.drawRange;if(f!==null)if(Array.isArray(u))for(let E=0,A=x.length;E<A;E++){const S=x[E],v=u[S.materialIndex],F=Math.max(S.start,y.start),D=Math.min(f.count,Math.min(S.start+S.count,y.start+y.count));for(let b=F,W=D;b<W;b+=3){const I=f.getX(b),k=f.getX(b+1),V=f.getX(b+2);a=El(this,v,e,r,m,g,_,I,k,V),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=S.materialIndex,t.push(a))}}else{const E=Math.max(0,y.start),A=Math.min(f.count,y.start+y.count);for(let S=E,v=A;S<v;S+=3){const F=f.getX(S),D=f.getX(S+1),b=f.getX(S+2);a=El(this,u,e,r,m,g,_,F,D,b),a&&(a.faceIndex=Math.floor(S/3),t.push(a))}}else if(h!==void 0)if(Array.isArray(u))for(let E=0,A=x.length;E<A;E++){const S=x[E],v=u[S.materialIndex],F=Math.max(S.start,y.start),D=Math.min(h.count,Math.min(S.start+S.count,y.start+y.count));for(let b=F,W=D;b<W;b+=3){const I=b,k=b+1,V=b+2;a=El(this,v,e,r,m,g,_,I,k,V),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=S.materialIndex,t.push(a))}}else{const E=Math.max(0,y.start),A=Math.min(h.count,y.start+y.count);for(let S=E,v=A;S<v;S+=3){const F=S,D=S+1,b=S+2;a=El(this,u,e,r,m,g,_,F,D,b),a&&(a.faceIndex=Math.floor(S/3),t.push(a))}}}}function F_(s,e,t,r,a,l,u,f){let h;if(e.side===Fn?h=r.intersectTriangle(u,l,a,!0,f):h=r.intersectTriangle(a,l,u,e.side===wr,f),h===null)return null;Ml.copy(f),Ml.applyMatrix4(s.matrixWorld);const m=t.ray.origin.distanceTo(Ml);return m<t.near||m>t.far?null:{distance:m,point:Ml.clone(),object:s}}function El(s,e,t,r,a,l,u,f,h,m){s.getVertexPosition(f,_l),s.getVertexPosition(h,xl),s.getVertexPosition(m,yl);const g=F_(s,e,t,r,_l,xl,yl,cm);if(g){const _=new K;ci.getBarycoord(cm,_l,xl,yl,_),a&&(g.uv=ci.getInterpolatedAttribute(a,f,h,m,_,new st)),l&&(g.uv1=ci.getInterpolatedAttribute(l,f,h,m,_,new st)),u&&(g.normal=ci.getInterpolatedAttribute(u,f,h,m,_,new K),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const x={a:f,b:h,c:m,normal:new K,materialIndex:0};ci.getNormal(_l,xl,yl,x.normal),g.face=x,g.barycoord=_}return g}class yi extends Wn{constructor(e=1,t=1,r=1,a=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:a,heightSegments:l,depthSegments:u};const f=this;a=Math.floor(a),l=Math.floor(l),u=Math.floor(u);const h=[],m=[],g=[],_=[];let x=0,y=0;E("z","y","x",-1,-1,r,t,e,u,l,0),E("z","y","x",1,-1,r,t,-e,u,l,1),E("x","z","y",1,1,e,r,t,a,u,2),E("x","z","y",1,-1,e,r,-t,a,u,3),E("x","y","z",1,-1,e,t,r,a,l,4),E("x","y","z",-1,-1,e,t,-r,a,l,5),this.setIndex(h),this.setAttribute("position",new en(m,3)),this.setAttribute("normal",new en(g,3)),this.setAttribute("uv",new en(_,2));function E(A,S,v,F,D,b,W,I,k,V,P){const C=b/k,z=W/V,J=b/2,X=W/2,ne=I/2,de=k+1,oe=V+1;let ue=0,B=0;const pe=new K;for(let L=0;L<oe;L++){const M=L*z-X;for(let j=0;j<de;j++){const me=j*C-J;pe[A]=me*F,pe[S]=M*D,pe[v]=ne,m.push(pe.x,pe.y,pe.z),pe[A]=0,pe[S]=0,pe[v]=I>0?1:-1,g.push(pe.x,pe.y,pe.z),_.push(j/k),_.push(1-L/V),ue+=1}}for(let L=0;L<V;L++)for(let M=0;M<k;M++){const j=x+M+de*L,me=x+M+de*(L+1),G=x+(M+1)+de*(L+1),re=x+(M+1)+de*L;h.push(j,me,re),h.push(me,G,re),B+=6}f.addGroup(y,B,P),y+=B,x+=ue}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Js(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const a=s[t][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=a.clone():Array.isArray(a)?e[t][r]=a.slice():e[t][r]=a}}return e}function An(s){const e={};for(let t=0;t<s.length;t++){const r=Js(s[t]);for(const a in r)e[a]=r[a]}return e}function O_(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function xg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:bt.workingColorSpace}const k_={clone:Js,merge:An};var z_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,B_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ar extends eo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=z_,this.fragmentShader=B_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Js(e.uniforms),this.uniformsGroups=O_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const u=this.uniforms[a].value;u&&u.isTexture?t.uniforms[a]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[a]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[a]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[a]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[a]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[a]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[a]={type:"m4",value:u.toArray()}:t.uniforms[a]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}let yg=class extends hn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=Gi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};const yr=new K,um=new st,fm=new st;class Qn extends yg{constructor(e=50,t=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=jf*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Au*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return jf*2*Math.atan(Math.tan(Au*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){yr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yr.x,yr.y).multiplyScalar(-e/yr.z),yr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(yr.x,yr.y).multiplyScalar(-e/yr.z)}getViewSize(e,t){return this.getViewBounds(e,um,fm),t.subVectors(fm,um)}setViewOffset(e,t,r,a,l,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Au*.5*this.fov)/this.zoom,r=2*t,a=this.aspect*r,l=-.5*a;const u=this.view;if(this.view!==null&&this.view.enabled){const h=u.fullWidth,m=u.fullHeight;l+=u.offsetX*a/h,t-=u.offsetY*r/m,a*=u.width/h,r*=u.height/m}const f=this.filmOffset;f!==0&&(l+=e*f/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ks=-90,zs=1;class H_ extends hn{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Qn(ks,zs,e,t);a.layers=this.layers,this.add(a);const l=new Qn(ks,zs,e,t);l.layers=this.layers,this.add(l);const u=new Qn(ks,zs,e,t);u.layers=this.layers,this.add(u);const f=new Qn(ks,zs,e,t);f.layers=this.layers,this.add(f);const h=new Qn(ks,zs,e,t);h.layers=this.layers,this.add(h);const m=new Qn(ks,zs,e,t);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,a,l,u,f,h]=t;for(const m of t)this.remove(m);if(e===Gi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),f.up.set(0,1,0),f.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===kl)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),f.up.set(0,-1,0),f.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of t)this.add(m),m.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,f,h,m,g]=this.children,_=e.getRenderTarget(),x=e.getActiveCubeFace(),y=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const A=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(t,l),e.setRenderTarget(r,1,a),e.render(t,u),e.setRenderTarget(r,2,a),e.render(t,f),e.setRenderTarget(r,3,a),e.render(t,h),e.setRenderTarget(r,4,a),e.render(t,m),r.texture.generateMipmaps=A,e.setRenderTarget(r,5,a),e.render(t,g),e.setRenderTarget(_,x,y),e.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class Sg extends On{constructor(e,t,r,a,l,u,f,h,m,g){e=e!==void 0?e:[],t=t!==void 0?t:qs,super(e,t,r,a,l,u,f,h,m,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class V_ extends ns{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new Sg(a,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Si}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new yi(5,5,5),l=new Ar({name:"CubemapFromEquirect",uniforms:Js(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Fn,blending:Er});l.uniforms.tEquirect.value=t;const u=new Gt(a,l),f=t.minFilter;return t.minFilter===Qr&&(t.minFilter=Si),new H_(1,10,this).update(e,u),t.minFilter=f,u.geometry.dispose(),u.material.dispose(),this}clear(e,t,r,a){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,r,a);e.setRenderTarget(l)}}class Ho extends hn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const G_={type:"move"};class qu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ho,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ho,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ho,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let a=null,l=null,u=null;const f=this._targetRay,h=this._grip,m=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(m&&e.hand){u=!0;for(const A of e.hand.values()){const S=t.getJointPose(A,r),v=this._getHandJoint(m,A);S!==null&&(v.matrix.fromArray(S.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=S.radius),v.visible=S!==null}const g=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],x=g.position.distanceTo(_.position),y=.02,E=.005;m.inputState.pinching&&x>y+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=y-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));f!==null&&(a=t.getPose(e.targetRaySpace,r),a===null&&l!==null&&(a=l),a!==null&&(f.matrix.fromArray(a.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,a.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(a.linearVelocity)):f.hasLinearVelocity=!1,a.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(a.angularVelocity)):f.hasAngularVelocity=!1,this.dispatchEvent(G_)))}return f!==null&&(f.visible=a!==null),h!==null&&(h.visible=l!==null),m!==null&&(m.visible=u!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new Ho;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}class id{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Tt(e),this.density=t}clone(){return new id(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class W_ extends hn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Yu=new K,X_=new K,j_=new ht;class qr{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,a){return this.normal.set(e,t,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const a=Yu.subVectors(r,t).cross(X_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(Yu),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/a;return l<0||l>1?null:t.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||j_.getNormalMatrix(e),a=this.coplanarPoint(Yu).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wr=new Hl,Tl=new K;class rd{constructor(e=new qr,t=new qr,r=new qr,a=new qr,l=new qr,u=new qr){this.planes=[e,t,r,a,l,u]}set(e,t,r,a,l,u){const f=this.planes;return f[0].copy(e),f[1].copy(t),f[2].copy(r),f[3].copy(a),f[4].copy(l),f[5].copy(u),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=Gi){const r=this.planes,a=e.elements,l=a[0],u=a[1],f=a[2],h=a[3],m=a[4],g=a[5],_=a[6],x=a[7],y=a[8],E=a[9],A=a[10],S=a[11],v=a[12],F=a[13],D=a[14],b=a[15];if(r[0].setComponents(h-l,x-m,S-y,b-v).normalize(),r[1].setComponents(h+l,x+m,S+y,b+v).normalize(),r[2].setComponents(h+u,x+g,S+E,b+F).normalize(),r[3].setComponents(h-u,x-g,S-E,b-F).normalize(),r[4].setComponents(h-f,x-_,S-A,b-D).normalize(),t===Gi)r[5].setComponents(h+f,x+_,S+A,b+D).normalize();else if(t===kl)r[5].setComponents(f,_,A,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wr)}intersectsSprite(e){return Wr.center.set(0,0,0),Wr.radius=.7071067811865476,Wr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wr)}intersectsSphere(e){const t=this.planes,r=e.center,a=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const a=t[r];if(Tl.x=a.normal.x>0?e.max.x:e.min.x,Tl.y=a.normal.y>0?e.max.y:e.min.y,Tl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Tl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Mg extends eo{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const dm=new Bt,qf=new hg,wl=new Hl,Al=new K;class q_ extends hn{constructor(e=new Wn,t=new Mg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,a=this.matrixWorld,l=e.params.Points.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),wl.copy(r.boundingSphere),wl.applyMatrix4(a),wl.radius+=l,e.ray.intersectsSphere(wl)===!1)return;dm.copy(a).invert(),qf.copy(e.ray).applyMatrix4(dm);const f=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=f*f,m=r.index,_=r.attributes.position;if(m!==null){const x=Math.max(0,u.start),y=Math.min(m.count,u.start+u.count);for(let E=x,A=y;E<A;E++){const S=m.getX(E);Al.fromBufferAttribute(_,S),hm(Al,S,h,a,e,t,this)}}else{const x=Math.max(0,u.start),y=Math.min(_.count,u.start+u.count);for(let E=x,A=y;E<A;E++)Al.fromBufferAttribute(_,E),hm(Al,E,h,a,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const f=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}}function hm(s,e,t,r,a,l,u){const f=qf.distanceSqToPoint(s);if(f<t){const h=new K;qf.closestPointToPoint(s,h),h.applyMatrix4(r);const m=a.ray.origin.distanceTo(h);if(m<a.near||m>a.far)return;l.push({distance:m,distanceToRay:Math.sqrt(f),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:u})}}class Eg extends On{constructor(e,t,r,a,l,u,f,h,m,g=Ws){if(g!==Ws&&g!==Ks)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&g===Ws&&(r=ts),r===void 0&&g===Ks&&(r=$s),super(null,a,l,u,f,h,g,r,m),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=f!==void 0?f:fi,this.minFilter=h!==void 0?h:fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ji{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const r=this.getUtoTmapping(e);return this.getPoint(r,t)}getPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return t}getSpacedPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPointAt(r/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let r,a=this.getPoint(0),l=0;t.push(0);for(let u=1;u<=e;u++)r=this.getPoint(u/e),l+=r.distanceTo(a),t.push(l),a=r;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const r=this.getLengths();let a=0;const l=r.length;let u;t?u=t:u=e*r[l-1];let f=0,h=l-1,m;for(;f<=h;)if(a=Math.floor(f+(h-f)/2),m=r[a]-u,m<0)f=a+1;else if(m>0)h=a-1;else{h=a;break}if(a=h,r[a]===u)return a/(l-1);const g=r[a],x=r[a+1]-g,y=(u-g)/x;return(a+y)/(l-1)}getTangent(e,t){let a=e-1e-4,l=e+1e-4;a<0&&(a=0),l>1&&(l=1);const u=this.getPoint(a),f=this.getPoint(l),h=t||(u.isVector2?new st:new K);return h.copy(f).sub(u).normalize(),h}getTangentAt(e,t){const r=this.getUtoTmapping(e);return this.getTangent(r,t)}computeFrenetFrames(e,t){const r=new K,a=[],l=[],u=[],f=new K,h=new Bt;for(let y=0;y<=e;y++){const E=y/e;a[y]=this.getTangentAt(E,new K)}l[0]=new K,u[0]=new K;let m=Number.MAX_VALUE;const g=Math.abs(a[0].x),_=Math.abs(a[0].y),x=Math.abs(a[0].z);g<=m&&(m=g,r.set(1,0,0)),_<=m&&(m=_,r.set(0,1,0)),x<=m&&r.set(0,0,1),f.crossVectors(a[0],r).normalize(),l[0].crossVectors(a[0],f),u[0].crossVectors(a[0],l[0]);for(let y=1;y<=e;y++){if(l[y]=l[y-1].clone(),u[y]=u[y-1].clone(),f.crossVectors(a[y-1],a[y]),f.length()>Number.EPSILON){f.normalize();const E=Math.acos(xt(a[y-1].dot(a[y]),-1,1));l[y].applyMatrix4(h.makeRotationAxis(f,E))}u[y].crossVectors(a[y],l[y])}if(t===!0){let y=Math.acos(xt(l[0].dot(l[e]),-1,1));y/=e,a[0].dot(f.crossVectors(l[0],l[e]))>0&&(y=-y);for(let E=1;E<=e;E++)l[E].applyMatrix4(h.makeRotationAxis(a[E],y*E)),u[E].crossVectors(a[E],l[E])}return{tangents:a,normals:l,binormals:u}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Tg extends ji{constructor(e=0,t=0,r=1,a=1,l=0,u=Math.PI*2,f=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=r,this.yRadius=a,this.aStartAngle=l,this.aEndAngle=u,this.aClockwise=f,this.aRotation=h}getPoint(e,t=new st){const r=t,a=Math.PI*2;let l=this.aEndAngle-this.aStartAngle;const u=Math.abs(l)<Number.EPSILON;for(;l<0;)l+=a;for(;l>a;)l-=a;l<Number.EPSILON&&(u?l=0:l=a),this.aClockwise===!0&&!u&&(l===a?l=-a:l=l-a);const f=this.aStartAngle+e*l;let h=this.aX+this.xRadius*Math.cos(f),m=this.aY+this.yRadius*Math.sin(f);if(this.aRotation!==0){const g=Math.cos(this.aRotation),_=Math.sin(this.aRotation),x=h-this.aX,y=m-this.aY;h=x*g-y*_+this.aX,m=x*_+y*g+this.aY}return r.set(h,m)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Y_ extends Tg{constructor(e,t,r,a,l,u){super(e,t,r,r,a,l,u),this.isArcCurve=!0,this.type="ArcCurve"}}function sd(){let s=0,e=0,t=0,r=0;function a(l,u,f,h){s=l,e=f,t=-3*l+3*u-2*f-h,r=2*l-2*u+f+h}return{initCatmullRom:function(l,u,f,h,m){a(u,f,m*(f-l),m*(h-u))},initNonuniformCatmullRom:function(l,u,f,h,m,g,_){let x=(u-l)/m-(f-l)/(m+g)+(f-u)/g,y=(f-u)/g-(h-u)/(g+_)+(h-f)/_;x*=g,y*=g,a(u,f,x,y)},calc:function(l){const u=l*l,f=u*l;return s+e*l+t*u+r*f}}}const Cl=new K,$u=new sd,Ku=new sd,Zu=new sd;class wg extends ji{constructor(e=[],t=!1,r="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=r,this.tension=a}getPoint(e,t=new K){const r=t,a=this.points,l=a.length,u=(l-(this.closed?0:1))*e;let f=Math.floor(u),h=u-f;this.closed?f+=f>0?0:(Math.floor(Math.abs(f)/l)+1)*l:h===0&&f===l-1&&(f=l-2,h=1);let m,g;this.closed||f>0?m=a[(f-1)%l]:(Cl.subVectors(a[0],a[1]).add(a[0]),m=Cl);const _=a[f%l],x=a[(f+1)%l];if(this.closed||f+2<l?g=a[(f+2)%l]:(Cl.subVectors(a[l-1],a[l-2]).add(a[l-1]),g=Cl),this.curveType==="centripetal"||this.curveType==="chordal"){const y=this.curveType==="chordal"?.5:.25;let E=Math.pow(m.distanceToSquared(_),y),A=Math.pow(_.distanceToSquared(x),y),S=Math.pow(x.distanceToSquared(g),y);A<1e-4&&(A=1),E<1e-4&&(E=A),S<1e-4&&(S=A),$u.initNonuniformCatmullRom(m.x,_.x,x.x,g.x,E,A,S),Ku.initNonuniformCatmullRom(m.y,_.y,x.y,g.y,E,A,S),Zu.initNonuniformCatmullRom(m.z,_.z,x.z,g.z,E,A,S)}else this.curveType==="catmullrom"&&($u.initCatmullRom(m.x,_.x,x.x,g.x,this.tension),Ku.initCatmullRom(m.y,_.y,x.y,g.y,this.tension),Zu.initCatmullRom(m.z,_.z,x.z,g.z,this.tension));return r.set($u.calc(h),Ku.calc(h),Zu.calc(h)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const a=e.points[t];this.points.push(a.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const a=this.points[t];e.points.push(a.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const a=e.points[t];this.points.push(new K().fromArray(a))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function pm(s,e,t,r,a){const l=(r-e)*.5,u=(a-t)*.5,f=s*s,h=s*f;return(2*t-2*r+l+u)*h+(-3*t+3*r-2*l-u)*f+l*s+t}function $_(s,e){const t=1-s;return t*t*e}function K_(s,e){return 2*(1-s)*s*e}function Z_(s,e){return s*s*e}function Xo(s,e,t,r){return $_(s,e)+K_(s,t)+Z_(s,r)}function J_(s,e){const t=1-s;return t*t*t*e}function Q_(s,e){const t=1-s;return 3*t*t*s*e}function ex(s,e){return 3*(1-s)*s*s*e}function tx(s,e){return s*s*s*e}function jo(s,e,t,r,a){return J_(s,e)+Q_(s,t)+ex(s,r)+tx(s,a)}class nx extends ji{constructor(e=new st,t=new st,r=new st,a=new st){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=r,this.v3=a}getPoint(e,t=new st){const r=t,a=this.v0,l=this.v1,u=this.v2,f=this.v3;return r.set(jo(e,a.x,l.x,u.x,f.x),jo(e,a.y,l.y,u.y,f.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ix extends ji{constructor(e=new K,t=new K,r=new K,a=new K){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=r,this.v3=a}getPoint(e,t=new K){const r=t,a=this.v0,l=this.v1,u=this.v2,f=this.v3;return r.set(jo(e,a.x,l.x,u.x,f.x),jo(e,a.y,l.y,u.y,f.y),jo(e,a.z,l.z,u.z,f.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class rx extends ji{constructor(e=new st,t=new st){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new st){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new st){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sx extends ji{constructor(e=new K,t=new K){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new K){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ox extends ji{constructor(e=new st,t=new st,r=new st){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new st){const r=t,a=this.v0,l=this.v1,u=this.v2;return r.set(Xo(e,a.x,l.x,u.x),Xo(e,a.y,l.y,u.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ag extends ji{constructor(e=new K,t=new K,r=new K){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new K){const r=t,a=this.v0,l=this.v1,u=this.v2;return r.set(Xo(e,a.x,l.x,u.x),Xo(e,a.y,l.y,u.y),Xo(e,a.z,l.z,u.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ax extends ji{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new st){const r=t,a=this.points,l=(a.length-1)*e,u=Math.floor(l),f=l-u,h=a[u===0?u:u-1],m=a[u],g=a[u>a.length-2?a.length-1:u+1],_=a[u>a.length-3?a.length-1:u+2];return r.set(pm(f,h.x,m.x,g.x,_.x),pm(f,h.y,m.y,g.y,_.y)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const a=e.points[t];this.points.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const a=this.points[t];e.points.push(a.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const a=e.points[t];this.points.push(new st().fromArray(a))}return this}}var lx=Object.freeze({__proto__:null,ArcCurve:Y_,CatmullRomCurve3:wg,CubicBezierCurve:nx,CubicBezierCurve3:ix,EllipseCurve:Tg,LineCurve:rx,LineCurve3:sx,QuadraticBezierCurve:ox,QuadraticBezierCurve3:Ag,SplineCurve:ax});class od extends Wn{constructor(e=1,t=1,r=1,a=32,l=1,u=!1,f=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:a,heightSegments:l,openEnded:u,thetaStart:f,thetaLength:h};const m=this;a=Math.floor(a),l=Math.floor(l);const g=[],_=[],x=[],y=[];let E=0;const A=[],S=r/2;let v=0;F(),u===!1&&(e>0&&D(!0),t>0&&D(!1)),this.setIndex(g),this.setAttribute("position",new en(_,3)),this.setAttribute("normal",new en(x,3)),this.setAttribute("uv",new en(y,2));function F(){const b=new K,W=new K;let I=0;const k=(t-e)/r;for(let V=0;V<=l;V++){const P=[],C=V/l,z=C*(t-e)+e;for(let J=0;J<=a;J++){const X=J/a,ne=X*h+f,de=Math.sin(ne),oe=Math.cos(ne);W.x=z*de,W.y=-C*r+S,W.z=z*oe,_.push(W.x,W.y,W.z),b.set(de,k,oe).normalize(),x.push(b.x,b.y,b.z),y.push(X,1-C),P.push(E++)}A.push(P)}for(let V=0;V<a;V++)for(let P=0;P<l;P++){const C=A[P][V],z=A[P+1][V],J=A[P+1][V+1],X=A[P][V+1];(e>0||P!==0)&&(g.push(C,z,X),I+=3),(t>0||P!==l-1)&&(g.push(z,J,X),I+=3)}m.addGroup(v,I,0),v+=I}function D(b){const W=E,I=new st,k=new K;let V=0;const P=b===!0?e:t,C=b===!0?1:-1;for(let J=1;J<=a;J++)_.push(0,S*C,0),x.push(0,C,0),y.push(.5,.5),E++;const z=E;for(let J=0;J<=a;J++){const ne=J/a*h+f,de=Math.cos(ne),oe=Math.sin(ne);k.x=P*oe,k.y=S*C,k.z=P*de,_.push(k.x,k.y,k.z),x.push(0,C,0),I.x=de*.5+.5,I.y=oe*.5*C+.5,y.push(I.x,I.y),E++}for(let J=0;J<a;J++){const X=W+J,ne=z+J;b===!0?g.push(ne,ne+1,X):g.push(ne+1,ne,X),V+=3}m.addGroup(v,V,b===!0?1:2),v+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new od(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Jo extends Wn{constructor(e=1,t=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:a};const l=e/2,u=t/2,f=Math.floor(r),h=Math.floor(a),m=f+1,g=h+1,_=e/f,x=t/h,y=[],E=[],A=[],S=[];for(let v=0;v<g;v++){const F=v*x-u;for(let D=0;D<m;D++){const b=D*_-l;E.push(b,-F,0),A.push(0,0,1),S.push(D/f),S.push(1-v/h)}}for(let v=0;v<h;v++)for(let F=0;F<f;F++){const D=F+m*v,b=F+m*(v+1),W=F+1+m*(v+1),I=F+1+m*v;y.push(D,b,I),y.push(b,W,I)}this.setIndex(y),this.setAttribute("position",new en(E,3)),this.setAttribute("normal",new en(A,3)),this.setAttribute("uv",new en(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jo(e.width,e.height,e.widthSegments,e.heightSegments)}}class ad extends Wn{constructor(e=1,t=32,r=16,a=0,l=Math.PI*2,u=0,f=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:a,phiLength:l,thetaStart:u,thetaLength:f},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const h=Math.min(u+f,Math.PI);let m=0;const g=[],_=new K,x=new K,y=[],E=[],A=[],S=[];for(let v=0;v<=r;v++){const F=[],D=v/r;let b=0;v===0&&u===0?b=.5/t:v===r&&h===Math.PI&&(b=-.5/t);for(let W=0;W<=t;W++){const I=W/t;_.x=-e*Math.cos(a+I*l)*Math.sin(u+D*f),_.y=e*Math.cos(u+D*f),_.z=e*Math.sin(a+I*l)*Math.sin(u+D*f),E.push(_.x,_.y,_.z),x.copy(_).normalize(),A.push(x.x,x.y,x.z),S.push(I+b,1-D),F.push(m++)}g.push(F)}for(let v=0;v<r;v++)for(let F=0;F<t;F++){const D=g[v][F+1],b=g[v][F],W=g[v+1][F],I=g[v+1][F+1];(v!==0||u>0)&&y.push(D,b,I),(v!==r-1||h<Math.PI)&&y.push(b,W,I)}this.setIndex(y),this.setAttribute("position",new en(E,3)),this.setAttribute("normal",new en(A,3)),this.setAttribute("uv",new en(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ad(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ld extends Wn{constructor(e=1,t=.4,r=12,a=48,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:r,tubularSegments:a,arc:l},r=Math.floor(r),a=Math.floor(a);const u=[],f=[],h=[],m=[],g=new K,_=new K,x=new K;for(let y=0;y<=r;y++)for(let E=0;E<=a;E++){const A=E/a*l,S=y/r*Math.PI*2;_.x=(e+t*Math.cos(S))*Math.cos(A),_.y=(e+t*Math.cos(S))*Math.sin(A),_.z=t*Math.sin(S),f.push(_.x,_.y,_.z),g.x=e*Math.cos(A),g.y=e*Math.sin(A),x.subVectors(_,g).normalize(),h.push(x.x,x.y,x.z),m.push(E/a),m.push(y/r)}for(let y=1;y<=r;y++)for(let E=1;E<=a;E++){const A=(a+1)*y+E-1,S=(a+1)*(y-1)+E-1,v=(a+1)*(y-1)+E,F=(a+1)*y+E;u.push(A,S,F),u.push(S,v,F)}this.setIndex(u),this.setAttribute("position",new en(f,3)),this.setAttribute("normal",new en(h,3)),this.setAttribute("uv",new en(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ld(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class cd extends Wn{constructor(e=new Ag(new K(-1,-1,0),new K(-1,1,0),new K(1,1,0)),t=64,r=1,a=8,l=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:r,radialSegments:a,closed:l};const u=e.computeFrenetFrames(t,l);this.tangents=u.tangents,this.normals=u.normals,this.binormals=u.binormals;const f=new K,h=new K,m=new st;let g=new K;const _=[],x=[],y=[],E=[];A(),this.setIndex(E),this.setAttribute("position",new en(_,3)),this.setAttribute("normal",new en(x,3)),this.setAttribute("uv",new en(y,2));function A(){for(let D=0;D<t;D++)S(D);S(l===!1?t:0),F(),v()}function S(D){g=e.getPointAt(D/t,g);const b=u.normals[D],W=u.binormals[D];for(let I=0;I<=a;I++){const k=I/a*Math.PI*2,V=Math.sin(k),P=-Math.cos(k);h.x=P*b.x+V*W.x,h.y=P*b.y+V*W.y,h.z=P*b.z+V*W.z,h.normalize(),x.push(h.x,h.y,h.z),f.x=g.x+r*h.x,f.y=g.y+r*h.y,f.z=g.z+r*h.z,_.push(f.x,f.y,f.z)}}function v(){for(let D=1;D<=t;D++)for(let b=1;b<=a;b++){const W=(a+1)*(D-1)+(b-1),I=(a+1)*D+(b-1),k=(a+1)*D+b,V=(a+1)*(D-1)+b;E.push(W,I,V),E.push(I,k,V)}}function F(){for(let D=0;D<=t;D++)for(let b=0;b<=a;b++)m.x=D/t,m.y=b/a,y.push(m.x,m.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new cd(new lx[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Sr extends eo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lg,this.normalScale=new st(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cx extends eo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=s_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ux extends eo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Cg extends hn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Tt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Ju=new Bt,mm=new K,gm=new K;class fx{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new st(512,512),this.map=null,this.mapPass=null,this.matrix=new Bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rd,this._frameExtents=new st(1,1),this._viewportCount=1,this._viewports=[new qt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;mm.setFromMatrixPosition(e.matrixWorld),t.position.copy(mm),gm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(gm),t.updateMatrixWorld(),Ju.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ju),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Ju)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Rg extends yg{constructor(e=-1,t=1,r=1,a=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=a,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,a,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=r-e,u=r+e,f=a+t,h=a-t;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=m*this.view.offsetX,u=l+m*this.view.width,f-=g*this.view.offsetY,h=f-g*this.view.height}this.projectionMatrix.makeOrthographic(l,u,f,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class dx extends fx{constructor(){super(new Rg(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hx extends Cg{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.target=new hn,this.shadow=new dx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class px extends Cg{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class mx extends Qn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}function vm(s,e,t,r){const a=gx(r);switch(t){case tg:return s*e;case ig:return s*e;case rg:return s*e*2;case sg:return s*e/a.components*a.byteLength;case ed:return s*e/a.components*a.byteLength;case og:return s*e*2/a.components*a.byteLength;case td:return s*e*2/a.components*a.byteLength;case ng:return s*e*3/a.components*a.byteLength;case ui:return s*e*4/a.components*a.byteLength;case nd:return s*e*4/a.components*a.byteLength;case Ll:case Dl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Nl:case Il:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Sf:case Ef:return Math.max(s,16)*Math.max(e,8)/4;case yf:case Mf:return Math.max(s,8)*Math.max(e,8)/2;case Tf:case wf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Af:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Cf:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Rf:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case bf:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Pf:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Lf:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Df:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Nf:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case If:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Uf:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ff:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Of:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case kf:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case zf:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Bf:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ul:case Hf:case Vf:return Math.ceil(s/4)*Math.ceil(e/4)*16;case ag:case Gf:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Wf:case Xf:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function gx(s){switch(s){case Xi:case Jm:return{byteLength:1,components:1};case qo:case Qm:case Yo:return{byteLength:2,components:1};case Jf:case Qf:return{byteLength:2,components:4};case ts:case Zf:case Vi:return{byteLength:4,components:1};case eg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Kf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Kf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bg(){let s=null,e=!1,t=null,r=null;function a(l,u){t(l,u),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function vx(s){const e=new WeakMap;function t(f,h){const m=f.array,g=f.usage,_=m.byteLength,x=s.createBuffer();s.bindBuffer(h,x),s.bufferData(h,m,g),f.onUploadCallback();let y;if(m instanceof Float32Array)y=s.FLOAT;else if(m instanceof Uint16Array)f.isFloat16BufferAttribute?y=s.HALF_FLOAT:y=s.UNSIGNED_SHORT;else if(m instanceof Int16Array)y=s.SHORT;else if(m instanceof Uint32Array)y=s.UNSIGNED_INT;else if(m instanceof Int32Array)y=s.INT;else if(m instanceof Int8Array)y=s.BYTE;else if(m instanceof Uint8Array)y=s.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)y=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:y,bytesPerElement:m.BYTES_PER_ELEMENT,version:f.version,size:_}}function r(f,h,m){const g=h.array,_=h.updateRanges;if(s.bindBuffer(m,f),_.length===0)s.bufferSubData(m,0,g);else{_.sort((y,E)=>y.start-E.start);let x=0;for(let y=1;y<_.length;y++){const E=_[x],A=_[y];A.start<=E.start+E.count+1?E.count=Math.max(E.count,A.start+A.count-E.start):(++x,_[x]=A)}_.length=x+1;for(let y=0,E=_.length;y<E;y++){const A=_[y];s.bufferSubData(m,A.start*g.BYTES_PER_ELEMENT,g,A.start,A.count)}h.clearUpdateRanges()}h.onUploadCallback()}function a(f){return f.isInterleavedBufferAttribute&&(f=f.data),e.get(f)}function l(f){f.isInterleavedBufferAttribute&&(f=f.data);const h=e.get(f);h&&(s.deleteBuffer(h.buffer),e.delete(f))}function u(f,h){if(f.isInterleavedBufferAttribute&&(f=f.data),f.isGLBufferAttribute){const g=e.get(f);(!g||g.version<f.version)&&e.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}const m=e.get(f);if(m===void 0)e.set(f,t(f,h));else if(m.version<f.version){if(m.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(m.buffer,f,h),m.version=f.version}}return{get:a,remove:l,update:u}}var _x=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,yx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ex=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ax=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Cx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Rx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Px=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Lx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Dx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Nx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ix=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ux=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ox=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Hx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Vx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Gx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Wx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yx="gl_FragColor = linearToOutputTexel( gl_FragColor );",$x=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Kx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Zx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Jx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ey=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ty=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ny=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,iy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ry=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,oy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ay=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ly=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,uy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,fy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,py=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,my=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gy=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,vy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_y=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,My=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ey=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ty=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ay=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Cy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ry=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,by=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Py=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ly=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ny=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Iy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Fy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Oy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ky=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,By=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,qy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$y=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ky=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,eS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,tS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,nS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,iS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,oS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,aS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,uS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,fS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,gS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_S=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ES=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,TS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,AS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,CS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,RS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,PS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,LS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,DS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,IS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,US=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,FS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,BS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,VS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,WS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,XS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$S=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,KS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pt={alphahash_fragment:_x,alphahash_pars_fragment:xx,alphamap_fragment:yx,alphamap_pars_fragment:Sx,alphatest_fragment:Mx,alphatest_pars_fragment:Ex,aomap_fragment:Tx,aomap_pars_fragment:wx,batching_pars_vertex:Ax,batching_vertex:Cx,begin_vertex:Rx,beginnormal_vertex:bx,bsdfs:Px,iridescence_fragment:Lx,bumpmap_pars_fragment:Dx,clipping_planes_fragment:Nx,clipping_planes_pars_fragment:Ix,clipping_planes_pars_vertex:Ux,clipping_planes_vertex:Fx,color_fragment:Ox,color_pars_fragment:kx,color_pars_vertex:zx,color_vertex:Bx,common:Hx,cube_uv_reflection_fragment:Vx,defaultnormal_vertex:Gx,displacementmap_pars_vertex:Wx,displacementmap_vertex:Xx,emissivemap_fragment:jx,emissivemap_pars_fragment:qx,colorspace_fragment:Yx,colorspace_pars_fragment:$x,envmap_fragment:Kx,envmap_common_pars_fragment:Zx,envmap_pars_fragment:Jx,envmap_pars_vertex:Qx,envmap_physical_pars_fragment:uy,envmap_vertex:ey,fog_vertex:ty,fog_pars_vertex:ny,fog_fragment:iy,fog_pars_fragment:ry,gradientmap_pars_fragment:sy,lightmap_pars_fragment:oy,lights_lambert_fragment:ay,lights_lambert_pars_fragment:ly,lights_pars_begin:cy,lights_toon_fragment:fy,lights_toon_pars_fragment:dy,lights_phong_fragment:hy,lights_phong_pars_fragment:py,lights_physical_fragment:my,lights_physical_pars_fragment:gy,lights_fragment_begin:vy,lights_fragment_maps:_y,lights_fragment_end:xy,logdepthbuf_fragment:yy,logdepthbuf_pars_fragment:Sy,logdepthbuf_pars_vertex:My,logdepthbuf_vertex:Ey,map_fragment:Ty,map_pars_fragment:wy,map_particle_fragment:Ay,map_particle_pars_fragment:Cy,metalnessmap_fragment:Ry,metalnessmap_pars_fragment:by,morphinstance_vertex:Py,morphcolor_vertex:Ly,morphnormal_vertex:Dy,morphtarget_pars_vertex:Ny,morphtarget_vertex:Iy,normal_fragment_begin:Uy,normal_fragment_maps:Fy,normal_pars_fragment:Oy,normal_pars_vertex:ky,normal_vertex:zy,normalmap_pars_fragment:By,clearcoat_normal_fragment_begin:Hy,clearcoat_normal_fragment_maps:Vy,clearcoat_pars_fragment:Gy,iridescence_pars_fragment:Wy,opaque_fragment:Xy,packing:jy,premultiplied_alpha_fragment:qy,project_vertex:Yy,dithering_fragment:$y,dithering_pars_fragment:Ky,roughnessmap_fragment:Zy,roughnessmap_pars_fragment:Jy,shadowmap_pars_fragment:Qy,shadowmap_pars_vertex:eS,shadowmap_vertex:tS,shadowmask_pars_fragment:nS,skinbase_vertex:iS,skinning_pars_vertex:rS,skinning_vertex:sS,skinnormal_vertex:oS,specularmap_fragment:aS,specularmap_pars_fragment:lS,tonemapping_fragment:cS,tonemapping_pars_fragment:uS,transmission_fragment:fS,transmission_pars_fragment:dS,uv_pars_fragment:hS,uv_pars_vertex:pS,uv_vertex:mS,worldpos_vertex:gS,background_vert:vS,background_frag:_S,backgroundCube_vert:xS,backgroundCube_frag:yS,cube_vert:SS,cube_frag:MS,depth_vert:ES,depth_frag:TS,distanceRGBA_vert:wS,distanceRGBA_frag:AS,equirect_vert:CS,equirect_frag:RS,linedashed_vert:bS,linedashed_frag:PS,meshbasic_vert:LS,meshbasic_frag:DS,meshlambert_vert:NS,meshlambert_frag:IS,meshmatcap_vert:US,meshmatcap_frag:FS,meshnormal_vert:OS,meshnormal_frag:kS,meshphong_vert:zS,meshphong_frag:BS,meshphysical_vert:HS,meshphysical_frag:VS,meshtoon_vert:GS,meshtoon_frag:WS,points_vert:XS,points_frag:jS,shadow_vert:qS,shadow_frag:YS,sprite_vert:$S,sprite_frag:KS},De={common:{diffuse:{value:new Tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ht}},envmap:{envMap:{value:null},envMapRotation:{value:new ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ht},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0},uvTransform:{value:new ht}},sprite:{diffuse:{value:new Tt(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}}},xi={basic:{uniforms:An([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:An([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Tt(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:An([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Tt(0)},specular:{value:new Tt(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:An([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new Tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:An([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new Tt(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:An([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:An([De.points,De.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:An([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:An([De.common,De.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:An([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:An([De.sprite,De.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ht}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:An([De.common,De.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:An([De.lights,De.fog,{color:{value:new Tt(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};xi.physical={uniforms:An([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ht},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ht},sheen:{value:0},sheenColor:{value:new Tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ht},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ht},attenuationDistance:{value:0},attenuationColor:{value:new Tt(0)},specularColor:{value:new Tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ht},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ht}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const Rl={r:0,b:0,g:0},Xr=new Ei,ZS=new Bt;function JS(s,e,t,r,a,l,u){const f=new Tt(0);let h=l===!0?0:1,m,g,_=null,x=0,y=null;function E(D){let b=D.isScene===!0?D.background:null;return b&&b.isTexture&&(b=(D.backgroundBlurriness>0?t:e).get(b)),b}function A(D){let b=!1;const W=E(D);W===null?v(f,h):W&&W.isColor&&(v(W,1),b=!0);const I=s.xr.getEnvironmentBlendMode();I==="additive"?r.buffers.color.setClear(0,0,0,1,u):I==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,u),(s.autoClear||b)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function S(D,b){const W=E(b);W&&(W.isCubeTexture||W.mapping===Bl)?(g===void 0&&(g=new Gt(new yi(1,1,1),new Ar({name:"BackgroundCubeMaterial",uniforms:Js(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(I,k,V){this.matrixWorld.copyPosition(V.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(g)),Xr.copy(b.backgroundRotation),Xr.x*=-1,Xr.y*=-1,Xr.z*=-1,W.isCubeTexture&&W.isRenderTargetTexture===!1&&(Xr.y*=-1,Xr.z*=-1),g.material.uniforms.envMap.value=W,g.material.uniforms.flipEnvMap.value=W.isCubeTexture&&W.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(ZS.makeRotationFromEuler(Xr)),g.material.toneMapped=bt.getTransfer(W.colorSpace)!==Dt,(_!==W||x!==W.version||y!==s.toneMapping)&&(g.material.needsUpdate=!0,_=W,x=W.version,y=s.toneMapping),g.layers.enableAll(),D.unshift(g,g.geometry,g.material,0,0,null)):W&&W.isTexture&&(m===void 0&&(m=new Gt(new Jo(2,2),new Ar({name:"BackgroundMaterial",uniforms:Js(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:wr,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=W,m.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,m.material.toneMapped=bt.getTransfer(W.colorSpace)!==Dt,W.matrixAutoUpdate===!0&&W.updateMatrix(),m.material.uniforms.uvTransform.value.copy(W.matrix),(_!==W||x!==W.version||y!==s.toneMapping)&&(m.material.needsUpdate=!0,_=W,x=W.version,y=s.toneMapping),m.layers.enableAll(),D.unshift(m,m.geometry,m.material,0,0,null))}function v(D,b){D.getRGB(Rl,xg(s)),r.buffers.color.setClear(Rl.r,Rl.g,Rl.b,b,u)}function F(){g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(D,b=1){f.set(D),h=b,v(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(D){h=D,v(f,h)},render:A,addToRenderList:S,dispose:F}}function QS(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=x(null);let l=a,u=!1;function f(C,z,J,X,ne){let de=!1;const oe=_(X,J,z);l!==oe&&(l=oe,m(l.object)),de=y(C,X,J,ne),de&&E(C,X,J,ne),ne!==null&&e.update(ne,s.ELEMENT_ARRAY_BUFFER),(de||u)&&(u=!1,b(C,z,J,X),ne!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(ne).buffer))}function h(){return s.createVertexArray()}function m(C){return s.bindVertexArray(C)}function g(C){return s.deleteVertexArray(C)}function _(C,z,J){const X=J.wireframe===!0;let ne=r[C.id];ne===void 0&&(ne={},r[C.id]=ne);let de=ne[z.id];de===void 0&&(de={},ne[z.id]=de);let oe=de[X];return oe===void 0&&(oe=x(h()),de[X]=oe),oe}function x(C){const z=[],J=[],X=[];for(let ne=0;ne<t;ne++)z[ne]=0,J[ne]=0,X[ne]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:J,attributeDivisors:X,object:C,attributes:{},index:null}}function y(C,z,J,X){const ne=l.attributes,de=z.attributes;let oe=0;const ue=J.getAttributes();for(const B in ue)if(ue[B].location>=0){const L=ne[B];let M=de[B];if(M===void 0&&(B==="instanceMatrix"&&C.instanceMatrix&&(M=C.instanceMatrix),B==="instanceColor"&&C.instanceColor&&(M=C.instanceColor)),L===void 0||L.attribute!==M||M&&L.data!==M.data)return!0;oe++}return l.attributesNum!==oe||l.index!==X}function E(C,z,J,X){const ne={},de=z.attributes;let oe=0;const ue=J.getAttributes();for(const B in ue)if(ue[B].location>=0){let L=de[B];L===void 0&&(B==="instanceMatrix"&&C.instanceMatrix&&(L=C.instanceMatrix),B==="instanceColor"&&C.instanceColor&&(L=C.instanceColor));const M={};M.attribute=L,L&&L.data&&(M.data=L.data),ne[B]=M,oe++}l.attributes=ne,l.attributesNum=oe,l.index=X}function A(){const C=l.newAttributes;for(let z=0,J=C.length;z<J;z++)C[z]=0}function S(C){v(C,0)}function v(C,z){const J=l.newAttributes,X=l.enabledAttributes,ne=l.attributeDivisors;J[C]=1,X[C]===0&&(s.enableVertexAttribArray(C),X[C]=1),ne[C]!==z&&(s.vertexAttribDivisor(C,z),ne[C]=z)}function F(){const C=l.newAttributes,z=l.enabledAttributes;for(let J=0,X=z.length;J<X;J++)z[J]!==C[J]&&(s.disableVertexAttribArray(J),z[J]=0)}function D(C,z,J,X,ne,de,oe){oe===!0?s.vertexAttribIPointer(C,z,J,ne,de):s.vertexAttribPointer(C,z,J,X,ne,de)}function b(C,z,J,X){A();const ne=X.attributes,de=J.getAttributes(),oe=z.defaultAttributeValues;for(const ue in de){const B=de[ue];if(B.location>=0){let pe=ne[ue];if(pe===void 0&&(ue==="instanceMatrix"&&C.instanceMatrix&&(pe=C.instanceMatrix),ue==="instanceColor"&&C.instanceColor&&(pe=C.instanceColor)),pe!==void 0){const L=pe.normalized,M=pe.itemSize,j=e.get(pe);if(j===void 0)continue;const me=j.buffer,G=j.type,re=j.bytesPerElement,he=G===s.INT||G===s.UNSIGNED_INT||pe.gpuType===Zf;if(pe.isInterleavedBufferAttribute){const le=pe.data,ve=le.stride,Ce=pe.offset;if(le.isInstancedInterleavedBuffer){for(let Re=0;Re<B.locationSize;Re++)v(B.location+Re,le.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Re=0;Re<B.locationSize;Re++)S(B.location+Re);s.bindBuffer(s.ARRAY_BUFFER,me);for(let Re=0;Re<B.locationSize;Re++)D(B.location+Re,M/B.locationSize,G,L,ve*re,(Ce+M/B.locationSize*Re)*re,he)}else{if(pe.isInstancedBufferAttribute){for(let le=0;le<B.locationSize;le++)v(B.location+le,pe.meshPerAttribute);C.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let le=0;le<B.locationSize;le++)S(B.location+le);s.bindBuffer(s.ARRAY_BUFFER,me);for(let le=0;le<B.locationSize;le++)D(B.location+le,M/B.locationSize,G,L,M*re,M/B.locationSize*le*re,he)}}else if(oe!==void 0){const L=oe[ue];if(L!==void 0)switch(L.length){case 2:s.vertexAttrib2fv(B.location,L);break;case 3:s.vertexAttrib3fv(B.location,L);break;case 4:s.vertexAttrib4fv(B.location,L);break;default:s.vertexAttrib1fv(B.location,L)}}}}F()}function W(){V();for(const C in r){const z=r[C];for(const J in z){const X=z[J];for(const ne in X)g(X[ne].object),delete X[ne];delete z[J]}delete r[C]}}function I(C){if(r[C.id]===void 0)return;const z=r[C.id];for(const J in z){const X=z[J];for(const ne in X)g(X[ne].object),delete X[ne];delete z[J]}delete r[C.id]}function k(C){for(const z in r){const J=r[z];if(J[C.id]===void 0)continue;const X=J[C.id];for(const ne in X)g(X[ne].object),delete X[ne];delete J[C.id]}}function V(){P(),u=!0,l!==a&&(l=a,m(l.object))}function P(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:f,reset:V,resetDefaultState:P,dispose:W,releaseStatesOfGeometry:I,releaseStatesOfProgram:k,initAttributes:A,enableAttribute:S,disableUnusedAttributes:F}}function eM(s,e,t){let r;function a(m){r=m}function l(m,g){s.drawArrays(r,m,g),t.update(g,r,1)}function u(m,g,_){_!==0&&(s.drawArraysInstanced(r,m,g,_),t.update(g,r,_))}function f(m,g,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,m,0,g,0,_);let y=0;for(let E=0;E<_;E++)y+=g[E];t.update(y,r,1)}function h(m,g,_,x){if(_===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let E=0;E<m.length;E++)u(m[E],g[E],x[E]);else{y.multiDrawArraysInstancedWEBGL(r,m,0,g,0,x,0,_);let E=0;for(let A=0;A<_;A++)E+=g[A]*x[A];t.update(E,r,1)}}this.setMode=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=h}function tM(s,e,t,r){let a;function l(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const k=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(k.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function u(k){return!(k!==ui&&r.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function f(k){const V=k===Yo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(k!==Xi&&r.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&k!==Vi&&!V)}function h(k){if(k==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";k="mediump"}return k==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=t.precision!==void 0?t.precision:"highp";const g=h(m);g!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",g,"instead."),m=g);const _=t.logarithmicDepthBuffer===!0,x=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),y=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_TEXTURE_SIZE),S=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),F=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),D=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),W=E>0,I=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:u,textureTypeReadable:f,precision:m,logarithmicDepthBuffer:_,reverseDepthBuffer:x,maxTextures:y,maxVertexTextures:E,maxTextureSize:A,maxCubemapSize:S,maxAttributes:v,maxVertexUniforms:F,maxVaryings:D,maxFragmentUniforms:b,vertexTextures:W,maxSamples:I}}function nM(s){const e=this;let t=null,r=0,a=!1,l=!1;const u=new qr,f=new ht,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(_,x){const y=_.length!==0||x||r!==0||a;return a=x,r=_.length,y},this.beginShadows=function(){l=!0,g(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(_,x){t=g(_,x,0)},this.setState=function(_,x,y){const E=_.clippingPlanes,A=_.clipIntersection,S=_.clipShadows,v=s.get(_);if(!a||E===null||E.length===0||l&&!S)l?g(null):m();else{const F=l?0:r,D=F*4;let b=v.clippingState||null;h.value=b,b=g(E,x,D,y);for(let W=0;W!==D;++W)b[W]=t[W];v.clippingState=b,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=F}};function m(){h.value!==t&&(h.value=t,h.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function g(_,x,y,E){const A=_!==null?_.length:0;let S=null;if(A!==0){if(S=h.value,E!==!0||S===null){const v=y+A*4,F=x.matrixWorldInverse;f.getNormalMatrix(F),(S===null||S.length<v)&&(S=new Float32Array(v));for(let D=0,b=y;D!==A;++D,b+=4)u.copy(_[D]).applyMatrix4(F,f),u.normal.toArray(S,b),S[b+3]=u.constant}h.value=S,h.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,S}}function iM(s){let e=new WeakMap;function t(u,f){return f===gf?u.mapping=qs:f===vf&&(u.mapping=Ys),u}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===gf||f===vf)if(e.has(u)){const h=e.get(u).texture;return t(h,u.mapping)}else{const h=u.image;if(h&&h.height>0){const m=new V_(h.height);return m.fromEquirectangularTexture(s,u),e.set(u,m),u.addEventListener("dispose",a),t(m.texture,u.mapping)}else return null}}return u}function a(u){const f=u.target;f.removeEventListener("dispose",a);const h=e.get(f);h!==void 0&&(e.delete(f),h.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}const Vs=4,_m=[.125,.215,.35,.446,.526,.582],Zr=20,Qu=new Rg,xm=new Tt;let ef=null,tf=0,nf=0,rf=!1;const Yr=(1+Math.sqrt(5))/2,Bs=1/Yr,ym=[new K(-Yr,Bs,0),new K(Yr,Bs,0),new K(-Bs,0,Yr),new K(Bs,0,Yr),new K(0,Yr,-Bs),new K(0,Yr,Bs),new K(-1,1,-1),new K(1,1,-1),new K(-1,1,1),new K(1,1,1)];class Sm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,a=100){ef=this._renderer.getRenderTarget(),tf=this._renderer.getActiveCubeFace(),nf=this._renderer.getActiveMipmapLevel(),rf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,a,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Em(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ef,tf,nf),this._renderer.xr.enabled=rf,e.scissorTest=!1,bl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qs||e.mapping===Ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ef=this._renderer.getRenderTarget(),tf=this._renderer.getActiveCubeFace(),nf=this._renderer.getActiveMipmapLevel(),rf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Si,minFilter:Si,generateMipmaps:!1,type:Yo,format:ui,colorSpace:Zs,depthBuffer:!1},a=Mm(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mm(e,t,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=rM(l)),this._blurMaterial=sM(l,e,t)}return a}_compileMaterial(e){const t=new Gt(this._lodPlanes[0],e);this._renderer.compile(t,Qu)}_sceneToCubeUV(e,t,r,a){const f=new Qn(90,1,t,r),h=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,_=g.autoClear,x=g.toneMapping;g.getClearColor(xm),g.toneMapping=Tr,g.autoClear=!1;const y=new gg({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1}),E=new Gt(new yi,y);let A=!1;const S=e.background;S?S.isColor&&(y.color.copy(S),e.background=null,A=!0):(y.color.copy(xm),A=!0);for(let v=0;v<6;v++){const F=v%3;F===0?(f.up.set(0,h[v],0),f.lookAt(m[v],0,0)):F===1?(f.up.set(0,0,h[v]),f.lookAt(0,m[v],0)):(f.up.set(0,h[v],0),f.lookAt(0,0,m[v]));const D=this._cubeSize;bl(a,F*D,v>2?D:0,D,D),g.setRenderTarget(a),A&&g.render(E,f),g.render(e,f)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=x,g.autoClear=_,e.background=S}_textureToCubeUV(e,t){const r=this._renderer,a=e.mapping===qs||e.mapping===Ys;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Em());const l=a?this._cubemapMaterial:this._equirectMaterial,u=new Gt(this._lodPlanes[0],l),f=l.uniforms;f.envMap.value=e;const h=this._cubeSize;bl(t,0,0,3*h,2*h),r.setRenderTarget(t),r.render(u,Qu)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let l=1;l<a;l++){const u=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),f=ym[(a-l-1)%ym.length];this._blur(e,l-1,l,u,f)}t.autoClear=r}_blur(e,t,r,a,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,r,a,"latitudinal",l),this._halfBlur(u,e,r,r,a,"longitudinal",l)}_halfBlur(e,t,r,a,l,u,f){const h=this._renderer,m=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new Gt(this._lodPlanes[a],m),x=m.uniforms,y=this._sizeLods[r]-1,E=isFinite(l)?Math.PI/(2*y):2*Math.PI/(2*Zr-1),A=l/E,S=isFinite(l)?1+Math.floor(g*A):Zr;S>Zr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Zr}`);const v=[];let F=0;for(let k=0;k<Zr;++k){const V=k/A,P=Math.exp(-V*V/2);v.push(P),k===0?F+=P:k<S&&(F+=2*P)}for(let k=0;k<v.length;k++)v[k]=v[k]/F;x.envMap.value=e.texture,x.samples.value=S,x.weights.value=v,x.latitudinal.value=u==="latitudinal",f&&(x.poleAxis.value=f);const{_lodMax:D}=this;x.dTheta.value=E,x.mipInt.value=D-r;const b=this._sizeLods[a],W=3*b*(a>D-Vs?a-D+Vs:0),I=4*(this._cubeSize-b);bl(t,W,I,3*b,2*b),h.setRenderTarget(t),h.render(_,Qu)}}function rM(s){const e=[],t=[],r=[];let a=s;const l=s-Vs+1+_m.length;for(let u=0;u<l;u++){const f=Math.pow(2,a);t.push(f);let h=1/f;u>s-Vs?h=_m[u-s+Vs-1]:u===0&&(h=0),r.push(h);const m=1/(f-2),g=-m,_=1+m,x=[g,g,_,g,_,_,g,g,_,_,g,_],y=6,E=6,A=3,S=2,v=1,F=new Float32Array(A*E*y),D=new Float32Array(S*E*y),b=new Float32Array(v*E*y);for(let I=0;I<y;I++){const k=I%3*2/3-1,V=I>2?0:-1,P=[k,V,0,k+2/3,V,0,k+2/3,V+1,0,k,V,0,k+2/3,V+1,0,k,V+1,0];F.set(P,A*E*I),D.set(x,S*E*I);const C=[I,I,I,I,I,I];b.set(C,v*E*I)}const W=new Wn;W.setAttribute("position",new di(F,A)),W.setAttribute("uv",new di(D,S)),W.setAttribute("faceIndex",new di(b,v)),e.push(W),a>Vs&&a--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function Mm(s,e,t){const r=new ns(s,e,t);return r.texture.mapping=Bl,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function bl(s,e,t,r,a){s.viewport.set(e,t,r,a),s.scissor.set(e,t,r,a)}function sM(s,e,t){const r=new Float32Array(Zr),a=new K(0,1,0);return new Ar({name:"SphericalGaussianBlur",defines:{n:Zr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:ud(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function Em(){return new Ar({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ud(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function Tm(){return new Ar({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ud(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Er,depthTest:!1,depthWrite:!1})}function ud(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function oM(s){let e=new WeakMap,t=null;function r(f){if(f&&f.isTexture){const h=f.mapping,m=h===gf||h===vf,g=h===qs||h===Ys;if(m||g){let _=e.get(f);const x=_!==void 0?_.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==x)return t===null&&(t=new Sm(s)),_=m?t.fromEquirectangular(f,_):t.fromCubemap(f,_),_.texture.pmremVersion=f.pmremVersion,e.set(f,_),_.texture;if(_!==void 0)return _.texture;{const y=f.image;return m&&y&&y.height>0||g&&y&&a(y)?(t===null&&(t=new Sm(s)),_=m?t.fromEquirectangular(f):t.fromCubemap(f),_.texture.pmremVersion=f.pmremVersion,e.set(f,_),f.addEventListener("dispose",l),_.texture):null}}}return f}function a(f){let h=0;const m=6;for(let g=0;g<m;g++)f[g]!==void 0&&h++;return h===m}function l(f){const h=f.target;h.removeEventListener("dispose",l);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function u(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:u}}function aM(s){const e={};function t(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const a=t(r);return a===null&&Hs("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function lM(s,e,t,r){const a={},l=new WeakMap;function u(_){const x=_.target;x.index!==null&&e.remove(x.index);for(const E in x.attributes)e.remove(x.attributes[E]);x.removeEventListener("dispose",u),delete a[x.id];const y=l.get(x);y&&(e.remove(y),l.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function f(_,x){return a[x.id]===!0||(x.addEventListener("dispose",u),a[x.id]=!0,t.memory.geometries++),x}function h(_){const x=_.attributes;for(const y in x)e.update(x[y],s.ARRAY_BUFFER)}function m(_){const x=[],y=_.index,E=_.attributes.position;let A=0;if(y!==null){const F=y.array;A=y.version;for(let D=0,b=F.length;D<b;D+=3){const W=F[D+0],I=F[D+1],k=F[D+2];x.push(W,I,I,k,k,W)}}else if(E!==void 0){const F=E.array;A=E.version;for(let D=0,b=F.length/3-1;D<b;D+=3){const W=D+0,I=D+1,k=D+2;x.push(W,I,I,k,k,W)}}else return;const S=new(ug(x)?_g:vg)(x,1);S.version=A;const v=l.get(_);v&&e.remove(v),l.set(_,S)}function g(_){const x=l.get(_);if(x){const y=_.index;y!==null&&x.version<y.version&&m(_)}else m(_);return l.get(_)}return{get:f,update:h,getWireframeAttribute:g}}function cM(s,e,t){let r;function a(x){r=x}let l,u;function f(x){l=x.type,u=x.bytesPerElement}function h(x,y){s.drawElements(r,y,l,x*u),t.update(y,r,1)}function m(x,y,E){E!==0&&(s.drawElementsInstanced(r,y,l,x*u,E),t.update(y,r,E))}function g(x,y,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,y,0,l,x,0,E);let S=0;for(let v=0;v<E;v++)S+=y[v];t.update(S,r,1)}function _(x,y,E,A){if(E===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let v=0;v<x.length;v++)m(x[v]/u,y[v],A[v]);else{S.multiDrawElementsInstancedWEBGL(r,y,0,l,x,0,A,0,E);let v=0;for(let F=0;F<E;F++)v+=y[F]*A[F];t.update(v,r,1)}}this.setMode=a,this.setIndex=f,this.render=h,this.renderInstances=m,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function uM(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,u,f){switch(t.calls++,u){case s.TRIANGLES:t.triangles+=f*(l/3);break;case s.LINES:t.lines+=f*(l/2);break;case s.LINE_STRIP:t.lines+=f*(l-1);break;case s.LINE_LOOP:t.lines+=f*l;break;case s.POINTS:t.points+=f*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:r}}function fM(s,e,t){const r=new WeakMap,a=new qt;function l(u,f,h){const m=u.morphTargetInfluences,g=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,_=g!==void 0?g.length:0;let x=r.get(f);if(x===void 0||x.count!==_){let C=function(){V.dispose(),r.delete(f),f.removeEventListener("dispose",C)};var y=C;x!==void 0&&x.texture.dispose();const E=f.morphAttributes.position!==void 0,A=f.morphAttributes.normal!==void 0,S=f.morphAttributes.color!==void 0,v=f.morphAttributes.position||[],F=f.morphAttributes.normal||[],D=f.morphAttributes.color||[];let b=0;E===!0&&(b=1),A===!0&&(b=2),S===!0&&(b=3);let W=f.attributes.position.count*b,I=1;W>e.maxTextureSize&&(I=Math.ceil(W/e.maxTextureSize),W=e.maxTextureSize);const k=new Float32Array(W*I*4*_),V=new dg(k,W,I,_);V.type=Vi,V.needsUpdate=!0;const P=b*4;for(let z=0;z<_;z++){const J=v[z],X=F[z],ne=D[z],de=W*I*4*z;for(let oe=0;oe<J.count;oe++){const ue=oe*P;E===!0&&(a.fromBufferAttribute(J,oe),k[de+ue+0]=a.x,k[de+ue+1]=a.y,k[de+ue+2]=a.z,k[de+ue+3]=0),A===!0&&(a.fromBufferAttribute(X,oe),k[de+ue+4]=a.x,k[de+ue+5]=a.y,k[de+ue+6]=a.z,k[de+ue+7]=0),S===!0&&(a.fromBufferAttribute(ne,oe),k[de+ue+8]=a.x,k[de+ue+9]=a.y,k[de+ue+10]=a.z,k[de+ue+11]=ne.itemSize===4?a.w:1)}}x={count:_,texture:V,size:new st(W,I)},r.set(f,x),f.addEventListener("dispose",C)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",u.morphTexture,t);else{let E=0;for(let S=0;S<m.length;S++)E+=m[S];const A=f.morphTargetsRelative?1:1-E;h.getUniforms().setValue(s,"morphTargetBaseInfluence",A),h.getUniforms().setValue(s,"morphTargetInfluences",m)}h.getUniforms().setValue(s,"morphTargetsTexture",x.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}return{update:l}}function dM(s,e,t,r){let a=new WeakMap;function l(h){const m=r.render.frame,g=h.geometry,_=e.get(h,g);if(a.get(_)!==m&&(e.update(_),a.set(_,m)),h.isInstancedMesh&&(h.hasEventListener("dispose",f)===!1&&h.addEventListener("dispose",f),a.get(h)!==m&&(t.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,s.ARRAY_BUFFER),a.set(h,m))),h.isSkinnedMesh){const x=h.skeleton;a.get(x)!==m&&(x.update(),a.set(x,m))}return _}function u(){a=new WeakMap}function f(h){const m=h.target;m.removeEventListener("dispose",f),t.remove(m.instanceMatrix),m.instanceColor!==null&&t.remove(m.instanceColor)}return{update:l,dispose:u}}const Pg=new On,wm=new Eg(1,1),Lg=new dg,Dg=new w_,Ng=new Sg,Am=[],Cm=[],Rm=new Float32Array(16),bm=new Float32Array(9),Pm=new Float32Array(4);function to(s,e,t){const r=s[0];if(r<=0||r>0)return s;const a=e*t;let l=Am[a];if(l===void 0&&(l=new Float32Array(a),Am[a]=l),e!==0){r.toArray(l,0);for(let u=1,f=0;u!==e;++u)f+=t,s[u].toArray(l,f)}return l}function tn(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function nn(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function Vl(s,e){let t=Cm[e];t===void 0&&(t=new Int32Array(e),Cm[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function hM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function pM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;s.uniform2fv(this.addr,e),nn(t,e)}}function mM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(tn(t,e))return;s.uniform3fv(this.addr,e),nn(t,e)}}function gM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;s.uniform4fv(this.addr,e),nn(t,e)}}function vM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(tn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,r))return;Pm.set(r),s.uniformMatrix2fv(this.addr,!1,Pm),nn(t,r)}}function _M(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(tn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,r))return;bm.set(r),s.uniformMatrix3fv(this.addr,!1,bm),nn(t,r)}}function xM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(tn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,r))return;Rm.set(r),s.uniformMatrix4fv(this.addr,!1,Rm),nn(t,r)}}function yM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function SM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;s.uniform2iv(this.addr,e),nn(t,e)}}function MM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;s.uniform3iv(this.addr,e),nn(t,e)}}function EM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;s.uniform4iv(this.addr,e),nn(t,e)}}function TM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function wM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;s.uniform2uiv(this.addr,e),nn(t,e)}}function AM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;s.uniform3uiv(this.addr,e),nn(t,e)}}function CM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;s.uniform4uiv(this.addr,e),nn(t,e)}}function RM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let l;this.type===s.SAMPLER_2D_SHADOW?(wm.compareFunction=cg,l=wm):l=Pg,t.setTexture2D(e||l,a)}function bM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture3D(e||Dg,a)}function PM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTextureCube(e||Ng,a)}function LM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture2DArray(e||Lg,a)}function DM(s){switch(s){case 5126:return hM;case 35664:return pM;case 35665:return mM;case 35666:return gM;case 35674:return vM;case 35675:return _M;case 35676:return xM;case 5124:case 35670:return yM;case 35667:case 35671:return SM;case 35668:case 35672:return MM;case 35669:case 35673:return EM;case 5125:return TM;case 36294:return wM;case 36295:return AM;case 36296:return CM;case 35678:case 36198:case 36298:case 36306:case 35682:return RM;case 35679:case 36299:case 36307:return bM;case 35680:case 36300:case 36308:case 36293:return PM;case 36289:case 36303:case 36311:case 36292:return LM}}function NM(s,e){s.uniform1fv(this.addr,e)}function IM(s,e){const t=to(e,this.size,2);s.uniform2fv(this.addr,t)}function UM(s,e){const t=to(e,this.size,3);s.uniform3fv(this.addr,t)}function FM(s,e){const t=to(e,this.size,4);s.uniform4fv(this.addr,t)}function OM(s,e){const t=to(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function kM(s,e){const t=to(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function zM(s,e){const t=to(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function BM(s,e){s.uniform1iv(this.addr,e)}function HM(s,e){s.uniform2iv(this.addr,e)}function VM(s,e){s.uniform3iv(this.addr,e)}function GM(s,e){s.uniform4iv(this.addr,e)}function WM(s,e){s.uniform1uiv(this.addr,e)}function XM(s,e){s.uniform2uiv(this.addr,e)}function jM(s,e){s.uniform3uiv(this.addr,e)}function qM(s,e){s.uniform4uiv(this.addr,e)}function YM(s,e,t){const r=this.cache,a=e.length,l=Vl(t,a);tn(r,l)||(s.uniform1iv(this.addr,l),nn(r,l));for(let u=0;u!==a;++u)t.setTexture2D(e[u]||Pg,l[u])}function $M(s,e,t){const r=this.cache,a=e.length,l=Vl(t,a);tn(r,l)||(s.uniform1iv(this.addr,l),nn(r,l));for(let u=0;u!==a;++u)t.setTexture3D(e[u]||Dg,l[u])}function KM(s,e,t){const r=this.cache,a=e.length,l=Vl(t,a);tn(r,l)||(s.uniform1iv(this.addr,l),nn(r,l));for(let u=0;u!==a;++u)t.setTextureCube(e[u]||Ng,l[u])}function ZM(s,e,t){const r=this.cache,a=e.length,l=Vl(t,a);tn(r,l)||(s.uniform1iv(this.addr,l),nn(r,l));for(let u=0;u!==a;++u)t.setTexture2DArray(e[u]||Lg,l[u])}function JM(s){switch(s){case 5126:return NM;case 35664:return IM;case 35665:return UM;case 35666:return FM;case 35674:return OM;case 35675:return kM;case 35676:return zM;case 5124:case 35670:return BM;case 35667:case 35671:return HM;case 35668:case 35672:return VM;case 35669:case 35673:return GM;case 5125:return WM;case 36294:return XM;case 36295:return jM;case 36296:return qM;case 35678:case 36198:case 36298:case 36306:case 35682:return YM;case 35679:case 36299:case 36307:return $M;case 35680:case 36300:case 36308:case 36293:return KM;case 36289:case 36303:case 36311:case 36292:return ZM}}class QM{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=DM(t.type)}}class eE{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=JM(t.type)}}class tE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const a=this.seq;for(let l=0,u=a.length;l!==u;++l){const f=a[l];f.setValue(e,t[f.id],r)}}}const sf=/(\w+)(\])?(\[|\.)?/g;function Lm(s,e){s.seq.push(e),s.map[e.id]=e}function nE(s,e,t){const r=s.name,a=r.length;for(sf.lastIndex=0;;){const l=sf.exec(r),u=sf.lastIndex;let f=l[1];const h=l[2]==="]",m=l[3];if(h&&(f=f|0),m===void 0||m==="["&&u+2===a){Lm(t,m===void 0?new QM(f,s,e):new eE(f,s,e));break}else{let _=t.map[f];_===void 0&&(_=new tE(f),Lm(t,_)),t=_}}}class Fl{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const l=e.getActiveUniform(t,a),u=e.getUniformLocation(t,l.name);nE(l,u,this)}}setValue(e,t,r,a){const l=this.map[t];l!==void 0&&l.setValue(e,r,a)}setOptional(e,t,r){const a=t[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,t,r,a){for(let l=0,u=t.length;l!==u;++l){const f=t[l],h=r[f.id];h.needsUpdate!==!1&&f.setValue(e,h.value,a)}}static seqWithValue(e,t){const r=[];for(let a=0,l=e.length;a!==l;++a){const u=e[a];u.id in t&&r.push(u)}return r}}function Dm(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const iE=37297;let rE=0;function sE(s,e){const t=s.split(`
`),r=[],a=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let u=a;u<l;u++){const f=u+1;r.push(`${f===e?">":" "} ${f}: ${t[u]}`)}return r.join(`
`)}const Nm=new ht;function oE(s){bt._getMatrix(Nm,bt.workingColorSpace,s);const e=`mat3( ${Nm.elements.map(t=>t.toFixed(4))} )`;switch(bt.getTransfer(s)){case Ol:return[e,"LinearTransferOETF"];case Dt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Im(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),a=s.getShaderInfoLog(e).trim();if(r&&a==="")return"";const l=/ERROR: 0:(\d+)/.exec(a);if(l){const u=parseInt(l[1]);return t.toUpperCase()+`

`+a+`

`+sE(s.getShaderSource(e),u)}else return a}function aE(s,e){const t=oE(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function lE(s,e){let t;switch(e){case Zv:t="Linear";break;case Jv:t="Reinhard";break;case Qv:t="Cineon";break;case e_:t="ACESFilmic";break;case n_:t="AgX";break;case i_:t="Neutral";break;case t_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Pl=new K;function cE(){bt.getLuminanceCoefficients(Pl);const s=Pl.x.toFixed(4),e=Pl.y.toFixed(4),t=Pl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function uE(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vo).join(`
`)}function fE(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function dE(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const l=s.getActiveAttrib(e,a),u=l.name;let f=1;l.type===s.FLOAT_MAT2&&(f=2),l.type===s.FLOAT_MAT3&&(f=3),l.type===s.FLOAT_MAT4&&(f=4),t[u]={type:l.type,location:s.getAttribLocation(e,u),locationSize:f}}return t}function Vo(s){return s!==""}function Um(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const hE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yf(s){return s.replace(hE,mE)}const pE=new Map;function mE(s,e){let t=pt[e];if(t===void 0){const r=pE.get(e);if(r!==void 0)t=pt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Yf(t)}const gE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Om(s){return s.replace(gE,vE)}function vE(s,e,t,r){let a="";for(let l=parseInt(e);l<parseInt(t);l++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function km(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function _E(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ym?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===$m?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Bi&&(e="SHADOWMAP_TYPE_VSM"),e}function xE(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case qs:case Ys:e="ENVMAP_TYPE_CUBE";break;case Bl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function yE(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ys:e="ENVMAP_MODE_REFRACTION";break}return e}function SE(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Km:e="ENVMAP_BLENDING_MULTIPLY";break;case $v:e="ENVMAP_BLENDING_MIX";break;case Kv:e="ENVMAP_BLENDING_ADD";break}return e}function ME(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function EE(s,e,t,r){const a=s.getContext(),l=t.defines;let u=t.vertexShader,f=t.fragmentShader;const h=_E(t),m=xE(t),g=yE(t),_=SE(t),x=ME(t),y=uE(t),E=fE(l),A=a.createProgram();let S,v,F=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(Vo).join(`
`),S.length>0&&(S+=`
`),v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(Vo).join(`
`),v.length>0&&(v+=`
`)):(S=[km(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+g:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vo).join(`
`),v=[km(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.envMap?"#define "+g:"",t.envMap?"#define "+_:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Tr?"#define TONE_MAPPING":"",t.toneMapping!==Tr?pt.tonemapping_pars_fragment:"",t.toneMapping!==Tr?lE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,aE("linearToOutputTexel",t.outputColorSpace),cE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vo).join(`
`)),u=Yf(u),u=Um(u,t),u=Fm(u,t),f=Yf(f),f=Um(f,t),f=Fm(f,t),u=Om(u),f=Om(f),t.isRawShaderMaterial!==!0&&(F=`#version 300 es
`,S=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,v=["#define varying in",t.glslVersion===Yp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const D=F+S+u,b=F+v+f,W=Dm(a,a.VERTEX_SHADER,D),I=Dm(a,a.FRAGMENT_SHADER,b);a.attachShader(A,W),a.attachShader(A,I),t.index0AttributeName!==void 0?a.bindAttribLocation(A,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(A,0,"position"),a.linkProgram(A);function k(z){if(s.debug.checkShaderErrors){const J=a.getProgramInfoLog(A).trim(),X=a.getShaderInfoLog(W).trim(),ne=a.getShaderInfoLog(I).trim();let de=!0,oe=!0;if(a.getProgramParameter(A,a.LINK_STATUS)===!1)if(de=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,A,W,I);else{const ue=Im(a,W,"vertex"),B=Im(a,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(A,a.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+J+`
`+ue+`
`+B)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(X===""||ne==="")&&(oe=!1);oe&&(z.diagnostics={runnable:de,programLog:J,vertexShader:{log:X,prefix:S},fragmentShader:{log:ne,prefix:v}})}a.deleteShader(W),a.deleteShader(I),V=new Fl(a,A),P=dE(a,A)}let V;this.getUniforms=function(){return V===void 0&&k(this),V};let P;this.getAttributes=function(){return P===void 0&&k(this),P};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=a.getProgramParameter(A,iE)),C},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rE++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=W,this.fragmentShader=I,this}let TE=0;class wE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(t),l=this._getShaderStage(r),u=this._getShaderCacheForMaterial(e);return u.has(a)===!1&&(u.add(a),a.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new AE(e),t.set(e,r)),r}}class AE{constructor(e){this.id=TE++,this.code=e,this.usedTimes=0}}function CE(s,e,t,r,a,l,u){const f=new pg,h=new wE,m=new Set,g=[],_=a.logarithmicDepthBuffer,x=a.vertexTextures;let y=a.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(P){return m.add(P),P===0?"uv":`uv${P}`}function S(P,C,z,J,X){const ne=J.fog,de=X.geometry,oe=P.isMeshStandardMaterial?J.environment:null,ue=(P.isMeshStandardMaterial?t:e).get(P.envMap||oe),B=ue&&ue.mapping===Bl?ue.image.height:null,pe=E[P.type];P.precision!==null&&(y=a.getMaxPrecision(P.precision),y!==P.precision&&console.warn("THREE.WebGLProgram.getParameters:",P.precision,"not supported, using",y,"instead."));const L=de.morphAttributes.position||de.morphAttributes.normal||de.morphAttributes.color,M=L!==void 0?L.length:0;let j=0;de.morphAttributes.position!==void 0&&(j=1),de.morphAttributes.normal!==void 0&&(j=2),de.morphAttributes.color!==void 0&&(j=3);let me,G,re,he;if(pe){const wt=xi[pe];me=wt.vertexShader,G=wt.fragmentShader}else me=P.vertexShader,G=P.fragmentShader,h.update(P),re=h.getVertexShaderID(P),he=h.getFragmentShaderID(P);const le=s.getRenderTarget(),ve=s.state.buffers.depth.getReversed(),Ce=X.isInstancedMesh===!0,Re=X.isBatchedMesh===!0,Je=!!P.map,nt=!!P.matcap,$e=!!ue,O=!!P.aoMap,Pt=!!P.lightMap,it=!!P.bumpMap,tt=!!P.normalMap,Be=!!P.displacementMap,vt=!!P.emissiveMap,Ue=!!P.metalnessMap,N=!!P.roughnessMap,w=P.anisotropy>0,se=P.clearcoat>0,xe=P.dispersion>0,ye=P.iridescence>0,ge=P.sheen>0,je=P.transmission>0,be=w&&!!P.anisotropyMap,Fe=se&&!!P.clearcoatMap,ft=se&&!!P.clearcoatNormalMap,Ee=se&&!!P.clearcoatRoughnessMap,ze=ye&&!!P.iridescenceMap,Ze=ye&&!!P.iridescenceThicknessMap,ot=ge&&!!P.sheenColorMap,Ve=ge&&!!P.sheenRoughnessMap,mt=!!P.specularMap,ct=!!P.specularColorMap,Lt=!!P.specularIntensityMap,Y=je&&!!P.transmissionMap,Pe=je&&!!P.thicknessMap,fe=!!P.gradientMap,_e=!!P.alphaMap,Ie=P.alphaTest>0,Ne=!!P.alphaHash,ut=!!P.extensions;let Ut=Tr;P.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(Ut=s.toneMapping);const Zt={shaderID:pe,shaderType:P.type,shaderName:P.name,vertexShader:me,fragmentShader:G,defines:P.defines,customVertexShaderID:re,customFragmentShaderID:he,isRawShaderMaterial:P.isRawShaderMaterial===!0,glslVersion:P.glslVersion,precision:y,batching:Re,batchingColor:Re&&X._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&X.instanceColor!==null,instancingMorph:Ce&&X.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:le===null?s.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Zs,alphaToCoverage:!!P.alphaToCoverage,map:Je,matcap:nt,envMap:$e,envMapMode:$e&&ue.mapping,envMapCubeUVHeight:B,aoMap:O,lightMap:Pt,bumpMap:it,normalMap:tt,displacementMap:x&&Be,emissiveMap:vt,normalMapObjectSpace:tt&&P.normalMapType===a_,normalMapTangentSpace:tt&&P.normalMapType===lg,metalnessMap:Ue,roughnessMap:N,anisotropy:w,anisotropyMap:be,clearcoat:se,clearcoatMap:Fe,clearcoatNormalMap:ft,clearcoatRoughnessMap:Ee,dispersion:xe,iridescence:ye,iridescenceMap:ze,iridescenceThicknessMap:Ze,sheen:ge,sheenColorMap:ot,sheenRoughnessMap:Ve,specularMap:mt,specularColorMap:ct,specularIntensityMap:Lt,transmission:je,transmissionMap:Y,thicknessMap:Pe,gradientMap:fe,opaque:P.transparent===!1&&P.blending===Gs&&P.alphaToCoverage===!1,alphaMap:_e,alphaTest:Ie,alphaHash:Ne,combine:P.combine,mapUv:Je&&A(P.map.channel),aoMapUv:O&&A(P.aoMap.channel),lightMapUv:Pt&&A(P.lightMap.channel),bumpMapUv:it&&A(P.bumpMap.channel),normalMapUv:tt&&A(P.normalMap.channel),displacementMapUv:Be&&A(P.displacementMap.channel),emissiveMapUv:vt&&A(P.emissiveMap.channel),metalnessMapUv:Ue&&A(P.metalnessMap.channel),roughnessMapUv:N&&A(P.roughnessMap.channel),anisotropyMapUv:be&&A(P.anisotropyMap.channel),clearcoatMapUv:Fe&&A(P.clearcoatMap.channel),clearcoatNormalMapUv:ft&&A(P.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&A(P.clearcoatRoughnessMap.channel),iridescenceMapUv:ze&&A(P.iridescenceMap.channel),iridescenceThicknessMapUv:Ze&&A(P.iridescenceThicknessMap.channel),sheenColorMapUv:ot&&A(P.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&A(P.sheenRoughnessMap.channel),specularMapUv:mt&&A(P.specularMap.channel),specularColorMapUv:ct&&A(P.specularColorMap.channel),specularIntensityMapUv:Lt&&A(P.specularIntensityMap.channel),transmissionMapUv:Y&&A(P.transmissionMap.channel),thicknessMapUv:Pe&&A(P.thicknessMap.channel),alphaMapUv:_e&&A(P.alphaMap.channel),vertexTangents:!!de.attributes.tangent&&(tt||w),vertexColors:P.vertexColors,vertexAlphas:P.vertexColors===!0&&!!de.attributes.color&&de.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!de.attributes.uv&&(Je||_e),fog:!!ne,useFog:P.fog===!0,fogExp2:!!ne&&ne.isFogExp2,flatShading:P.flatShading===!0,sizeAttenuation:P.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:ve,skinning:X.isSkinnedMesh===!0,morphTargets:de.morphAttributes.position!==void 0,morphNormals:de.morphAttributes.normal!==void 0,morphColors:de.morphAttributes.color!==void 0,morphTargetsCount:M,morphTextureStride:j,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:P.dithering,shadowMapEnabled:s.shadowMap.enabled&&z.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Je&&P.map.isVideoTexture===!0&&bt.getTransfer(P.map.colorSpace)===Dt,decodeVideoTextureEmissive:vt&&P.emissiveMap.isVideoTexture===!0&&bt.getTransfer(P.emissiveMap.colorSpace)===Dt,premultipliedAlpha:P.premultipliedAlpha,doubleSided:P.side===Hi,flipSided:P.side===Fn,useDepthPacking:P.depthPacking>=0,depthPacking:P.depthPacking||0,index0AttributeName:P.index0AttributeName,extensionClipCullDistance:ut&&P.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ut&&P.extensions.multiDraw===!0||Re)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:P.customProgramCacheKey()};return Zt.vertexUv1s=m.has(1),Zt.vertexUv2s=m.has(2),Zt.vertexUv3s=m.has(3),m.clear(),Zt}function v(P){const C=[];if(P.shaderID?C.push(P.shaderID):(C.push(P.customVertexShaderID),C.push(P.customFragmentShaderID)),P.defines!==void 0)for(const z in P.defines)C.push(z),C.push(P.defines[z]);return P.isRawShaderMaterial===!1&&(F(C,P),D(C,P),C.push(s.outputColorSpace)),C.push(P.customProgramCacheKey),C.join()}function F(P,C){P.push(C.precision),P.push(C.outputColorSpace),P.push(C.envMapMode),P.push(C.envMapCubeUVHeight),P.push(C.mapUv),P.push(C.alphaMapUv),P.push(C.lightMapUv),P.push(C.aoMapUv),P.push(C.bumpMapUv),P.push(C.normalMapUv),P.push(C.displacementMapUv),P.push(C.emissiveMapUv),P.push(C.metalnessMapUv),P.push(C.roughnessMapUv),P.push(C.anisotropyMapUv),P.push(C.clearcoatMapUv),P.push(C.clearcoatNormalMapUv),P.push(C.clearcoatRoughnessMapUv),P.push(C.iridescenceMapUv),P.push(C.iridescenceThicknessMapUv),P.push(C.sheenColorMapUv),P.push(C.sheenRoughnessMapUv),P.push(C.specularMapUv),P.push(C.specularColorMapUv),P.push(C.specularIntensityMapUv),P.push(C.transmissionMapUv),P.push(C.thicknessMapUv),P.push(C.combine),P.push(C.fogExp2),P.push(C.sizeAttenuation),P.push(C.morphTargetsCount),P.push(C.morphAttributeCount),P.push(C.numDirLights),P.push(C.numPointLights),P.push(C.numSpotLights),P.push(C.numSpotLightMaps),P.push(C.numHemiLights),P.push(C.numRectAreaLights),P.push(C.numDirLightShadows),P.push(C.numPointLightShadows),P.push(C.numSpotLightShadows),P.push(C.numSpotLightShadowsWithMaps),P.push(C.numLightProbes),P.push(C.shadowMapType),P.push(C.toneMapping),P.push(C.numClippingPlanes),P.push(C.numClipIntersection),P.push(C.depthPacking)}function D(P,C){f.disableAll(),C.supportsVertexTextures&&f.enable(0),C.instancing&&f.enable(1),C.instancingColor&&f.enable(2),C.instancingMorph&&f.enable(3),C.matcap&&f.enable(4),C.envMap&&f.enable(5),C.normalMapObjectSpace&&f.enable(6),C.normalMapTangentSpace&&f.enable(7),C.clearcoat&&f.enable(8),C.iridescence&&f.enable(9),C.alphaTest&&f.enable(10),C.vertexColors&&f.enable(11),C.vertexAlphas&&f.enable(12),C.vertexUv1s&&f.enable(13),C.vertexUv2s&&f.enable(14),C.vertexUv3s&&f.enable(15),C.vertexTangents&&f.enable(16),C.anisotropy&&f.enable(17),C.alphaHash&&f.enable(18),C.batching&&f.enable(19),C.dispersion&&f.enable(20),C.batchingColor&&f.enable(21),P.push(f.mask),f.disableAll(),C.fog&&f.enable(0),C.useFog&&f.enable(1),C.flatShading&&f.enable(2),C.logarithmicDepthBuffer&&f.enable(3),C.reverseDepthBuffer&&f.enable(4),C.skinning&&f.enable(5),C.morphTargets&&f.enable(6),C.morphNormals&&f.enable(7),C.morphColors&&f.enable(8),C.premultipliedAlpha&&f.enable(9),C.shadowMapEnabled&&f.enable(10),C.doubleSided&&f.enable(11),C.flipSided&&f.enable(12),C.useDepthPacking&&f.enable(13),C.dithering&&f.enable(14),C.transmission&&f.enable(15),C.sheen&&f.enable(16),C.opaque&&f.enable(17),C.pointsUvs&&f.enable(18),C.decodeVideoTexture&&f.enable(19),C.decodeVideoTextureEmissive&&f.enable(20),C.alphaToCoverage&&f.enable(21),P.push(f.mask)}function b(P){const C=E[P.type];let z;if(C){const J=xi[C];z=k_.clone(J.uniforms)}else z=P.uniforms;return z}function W(P,C){let z;for(let J=0,X=g.length;J<X;J++){const ne=g[J];if(ne.cacheKey===C){z=ne,++z.usedTimes;break}}return z===void 0&&(z=new EE(s,C,P,l),g.push(z)),z}function I(P){if(--P.usedTimes===0){const C=g.indexOf(P);g[C]=g[g.length-1],g.pop(),P.destroy()}}function k(P){h.remove(P)}function V(){h.dispose()}return{getParameters:S,getProgramCacheKey:v,getUniforms:b,acquireProgram:W,releaseProgram:I,releaseShaderCache:k,programs:g,dispose:V}}function RE(){let s=new WeakMap;function e(u){return s.has(u)}function t(u){let f=s.get(u);return f===void 0&&(f={},s.set(u,f)),f}function r(u){s.delete(u)}function a(u,f,h){s.get(u)[f]=h}function l(){s=new WeakMap}return{has:e,get:t,remove:r,update:a,dispose:l}}function bE(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function zm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Bm(){const s=[];let e=0;const t=[],r=[],a=[];function l(){e=0,t.length=0,r.length=0,a.length=0}function u(_,x,y,E,A,S){let v=s[e];return v===void 0?(v={id:_.id,object:_,geometry:x,material:y,groupOrder:E,renderOrder:_.renderOrder,z:A,group:S},s[e]=v):(v.id=_.id,v.object=_,v.geometry=x,v.material=y,v.groupOrder=E,v.renderOrder=_.renderOrder,v.z=A,v.group=S),e++,v}function f(_,x,y,E,A,S){const v=u(_,x,y,E,A,S);y.transmission>0?r.push(v):y.transparent===!0?a.push(v):t.push(v)}function h(_,x,y,E,A,S){const v=u(_,x,y,E,A,S);y.transmission>0?r.unshift(v):y.transparent===!0?a.unshift(v):t.unshift(v)}function m(_,x){t.length>1&&t.sort(_||bE),r.length>1&&r.sort(x||zm),a.length>1&&a.sort(x||zm)}function g(){for(let _=e,x=s.length;_<x;_++){const y=s[_];if(y.id===null)break;y.id=null,y.object=null,y.geometry=null,y.material=null,y.group=null}}return{opaque:t,transmissive:r,transparent:a,init:l,push:f,unshift:h,finish:g,sort:m}}function PE(){let s=new WeakMap;function e(r,a){const l=s.get(r);let u;return l===void 0?(u=new Bm,s.set(r,[u])):a>=l.length?(u=new Bm,l.push(u)):u=l[a],u}function t(){s=new WeakMap}return{get:e,dispose:t}}function LE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new K,color:new Tt};break;case"SpotLight":t={position:new K,direction:new K,color:new Tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new K,color:new Tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new K,skyColor:new Tt,groundColor:new Tt};break;case"RectAreaLight":t={color:new Tt,position:new K,halfWidth:new K,halfHeight:new K};break}return s[e.id]=t,t}}}function DE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let NE=0;function IE(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function UE(s){const e=new LE,t=DE(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)r.probe.push(new K);const a=new K,l=new Bt,u=new Bt;function f(m){let g=0,_=0,x=0;for(let P=0;P<9;P++)r.probe[P].set(0,0,0);let y=0,E=0,A=0,S=0,v=0,F=0,D=0,b=0,W=0,I=0,k=0;m.sort(IE);for(let P=0,C=m.length;P<C;P++){const z=m[P],J=z.color,X=z.intensity,ne=z.distance,de=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)g+=J.r*X,_+=J.g*X,x+=J.b*X;else if(z.isLightProbe){for(let oe=0;oe<9;oe++)r.probe[oe].addScaledVector(z.sh.coefficients[oe],X);k++}else if(z.isDirectionalLight){const oe=e.get(z);if(oe.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const ue=z.shadow,B=t.get(z);B.shadowIntensity=ue.intensity,B.shadowBias=ue.bias,B.shadowNormalBias=ue.normalBias,B.shadowRadius=ue.radius,B.shadowMapSize=ue.mapSize,r.directionalShadow[y]=B,r.directionalShadowMap[y]=de,r.directionalShadowMatrix[y]=z.shadow.matrix,F++}r.directional[y]=oe,y++}else if(z.isSpotLight){const oe=e.get(z);oe.position.setFromMatrixPosition(z.matrixWorld),oe.color.copy(J).multiplyScalar(X),oe.distance=ne,oe.coneCos=Math.cos(z.angle),oe.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),oe.decay=z.decay,r.spot[A]=oe;const ue=z.shadow;if(z.map&&(r.spotLightMap[W]=z.map,W++,ue.updateMatrices(z),z.castShadow&&I++),r.spotLightMatrix[A]=ue.matrix,z.castShadow){const B=t.get(z);B.shadowIntensity=ue.intensity,B.shadowBias=ue.bias,B.shadowNormalBias=ue.normalBias,B.shadowRadius=ue.radius,B.shadowMapSize=ue.mapSize,r.spotShadow[A]=B,r.spotShadowMap[A]=de,b++}A++}else if(z.isRectAreaLight){const oe=e.get(z);oe.color.copy(J).multiplyScalar(X),oe.halfWidth.set(z.width*.5,0,0),oe.halfHeight.set(0,z.height*.5,0),r.rectArea[S]=oe,S++}else if(z.isPointLight){const oe=e.get(z);if(oe.color.copy(z.color).multiplyScalar(z.intensity),oe.distance=z.distance,oe.decay=z.decay,z.castShadow){const ue=z.shadow,B=t.get(z);B.shadowIntensity=ue.intensity,B.shadowBias=ue.bias,B.shadowNormalBias=ue.normalBias,B.shadowRadius=ue.radius,B.shadowMapSize=ue.mapSize,B.shadowCameraNear=ue.camera.near,B.shadowCameraFar=ue.camera.far,r.pointShadow[E]=B,r.pointShadowMap[E]=de,r.pointShadowMatrix[E]=z.shadow.matrix,D++}r.point[E]=oe,E++}else if(z.isHemisphereLight){const oe=e.get(z);oe.skyColor.copy(z.color).multiplyScalar(X),oe.groundColor.copy(z.groundColor).multiplyScalar(X),r.hemi[v]=oe,v++}}S>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=De.LTC_FLOAT_1,r.rectAreaLTC2=De.LTC_FLOAT_2):(r.rectAreaLTC1=De.LTC_HALF_1,r.rectAreaLTC2=De.LTC_HALF_2)),r.ambient[0]=g,r.ambient[1]=_,r.ambient[2]=x;const V=r.hash;(V.directionalLength!==y||V.pointLength!==E||V.spotLength!==A||V.rectAreaLength!==S||V.hemiLength!==v||V.numDirectionalShadows!==F||V.numPointShadows!==D||V.numSpotShadows!==b||V.numSpotMaps!==W||V.numLightProbes!==k)&&(r.directional.length=y,r.spot.length=A,r.rectArea.length=S,r.point.length=E,r.hemi.length=v,r.directionalShadow.length=F,r.directionalShadowMap.length=F,r.pointShadow.length=D,r.pointShadowMap.length=D,r.spotShadow.length=b,r.spotShadowMap.length=b,r.directionalShadowMatrix.length=F,r.pointShadowMatrix.length=D,r.spotLightMatrix.length=b+W-I,r.spotLightMap.length=W,r.numSpotLightShadowsWithMaps=I,r.numLightProbes=k,V.directionalLength=y,V.pointLength=E,V.spotLength=A,V.rectAreaLength=S,V.hemiLength=v,V.numDirectionalShadows=F,V.numPointShadows=D,V.numSpotShadows=b,V.numSpotMaps=W,V.numLightProbes=k,r.version=NE++)}function h(m,g){let _=0,x=0,y=0,E=0,A=0;const S=g.matrixWorldInverse;for(let v=0,F=m.length;v<F;v++){const D=m[v];if(D.isDirectionalLight){const b=r.directional[_];b.direction.setFromMatrixPosition(D.matrixWorld),a.setFromMatrixPosition(D.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(S),_++}else if(D.isSpotLight){const b=r.spot[y];b.position.setFromMatrixPosition(D.matrixWorld),b.position.applyMatrix4(S),b.direction.setFromMatrixPosition(D.matrixWorld),a.setFromMatrixPosition(D.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(S),y++}else if(D.isRectAreaLight){const b=r.rectArea[E];b.position.setFromMatrixPosition(D.matrixWorld),b.position.applyMatrix4(S),u.identity(),l.copy(D.matrixWorld),l.premultiply(S),u.extractRotation(l),b.halfWidth.set(D.width*.5,0,0),b.halfHeight.set(0,D.height*.5,0),b.halfWidth.applyMatrix4(u),b.halfHeight.applyMatrix4(u),E++}else if(D.isPointLight){const b=r.point[x];b.position.setFromMatrixPosition(D.matrixWorld),b.position.applyMatrix4(S),x++}else if(D.isHemisphereLight){const b=r.hemi[A];b.direction.setFromMatrixPosition(D.matrixWorld),b.direction.transformDirection(S),A++}}}return{setup:f,setupView:h,state:r}}function Hm(s){const e=new UE(s),t=[],r=[];function a(g){m.camera=g,t.length=0,r.length=0}function l(g){t.push(g)}function u(g){r.push(g)}function f(){e.setup(t)}function h(g){e.setupView(t,g)}const m={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:m,setupLights:f,setupLightsView:h,pushLight:l,pushShadow:u}}function FE(s){let e=new WeakMap;function t(a,l=0){const u=e.get(a);let f;return u===void 0?(f=new Hm(s),e.set(a,[f])):l>=u.length?(f=new Hm(s),u.push(f)):f=u[l],f}function r(){e=new WeakMap}return{get:t,dispose:r}}const OE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zE(s,e,t){let r=new rd;const a=new st,l=new st,u=new qt,f=new cx({depthPacking:o_}),h=new ux,m={},g=t.maxTextureSize,_={[wr]:Fn,[Fn]:wr,[Hi]:Hi},x=new Ar({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:OE,fragmentShader:kE}),y=x.clone();y.defines.HORIZONTAL_PASS=1;const E=new Wn;E.setAttribute("position",new di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Gt(E,x),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ym;let v=this.type;this.render=function(I,k,V){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||I.length===0)return;const P=s.getRenderTarget(),C=s.getActiveCubeFace(),z=s.getActiveMipmapLevel(),J=s.state;J.setBlending(Er),J.buffers.color.setClear(1,1,1,1),J.buffers.depth.setTest(!0),J.setScissorTest(!1);const X=v!==Bi&&this.type===Bi,ne=v===Bi&&this.type!==Bi;for(let de=0,oe=I.length;de<oe;de++){const ue=I[de],B=ue.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",ue,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;a.copy(B.mapSize);const pe=B.getFrameExtents();if(a.multiply(pe),l.copy(B.mapSize),(a.x>g||a.y>g)&&(a.x>g&&(l.x=Math.floor(g/pe.x),a.x=l.x*pe.x,B.mapSize.x=l.x),a.y>g&&(l.y=Math.floor(g/pe.y),a.y=l.y*pe.y,B.mapSize.y=l.y)),B.map===null||X===!0||ne===!0){const M=this.type!==Bi?{minFilter:fi,magFilter:fi}:{};B.map!==null&&B.map.dispose(),B.map=new ns(a.x,a.y,M),B.map.texture.name=ue.name+".shadowMap",B.camera.updateProjectionMatrix()}s.setRenderTarget(B.map),s.clear();const L=B.getViewportCount();for(let M=0;M<L;M++){const j=B.getViewport(M);u.set(l.x*j.x,l.y*j.y,l.x*j.z,l.y*j.w),J.viewport(u),B.updateMatrices(ue,M),r=B.getFrustum(),b(k,V,B.camera,ue,this.type)}B.isPointLightShadow!==!0&&this.type===Bi&&F(B,V),B.needsUpdate=!1}v=this.type,S.needsUpdate=!1,s.setRenderTarget(P,C,z)};function F(I,k){const V=e.update(A);x.defines.VSM_SAMPLES!==I.blurSamples&&(x.defines.VSM_SAMPLES=I.blurSamples,y.defines.VSM_SAMPLES=I.blurSamples,x.needsUpdate=!0,y.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new ns(a.x,a.y)),x.uniforms.shadow_pass.value=I.map.texture,x.uniforms.resolution.value=I.mapSize,x.uniforms.radius.value=I.radius,s.setRenderTarget(I.mapPass),s.clear(),s.renderBufferDirect(k,null,V,x,A,null),y.uniforms.shadow_pass.value=I.mapPass.texture,y.uniforms.resolution.value=I.mapSize,y.uniforms.radius.value=I.radius,s.setRenderTarget(I.map),s.clear(),s.renderBufferDirect(k,null,V,y,A,null)}function D(I,k,V,P){let C=null;const z=V.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(z!==void 0)C=z;else if(C=V.isPointLight===!0?h:f,s.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0){const J=C.uuid,X=k.uuid;let ne=m[J];ne===void 0&&(ne={},m[J]=ne);let de=ne[X];de===void 0&&(de=C.clone(),ne[X]=de,k.addEventListener("dispose",W)),C=de}if(C.visible=k.visible,C.wireframe=k.wireframe,P===Bi?C.side=k.shadowSide!==null?k.shadowSide:k.side:C.side=k.shadowSide!==null?k.shadowSide:_[k.side],C.alphaMap=k.alphaMap,C.alphaTest=k.alphaTest,C.map=k.map,C.clipShadows=k.clipShadows,C.clippingPlanes=k.clippingPlanes,C.clipIntersection=k.clipIntersection,C.displacementMap=k.displacementMap,C.displacementScale=k.displacementScale,C.displacementBias=k.displacementBias,C.wireframeLinewidth=k.wireframeLinewidth,C.linewidth=k.linewidth,V.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const J=s.properties.get(C);J.light=V}return C}function b(I,k,V,P,C){if(I.visible===!1)return;if(I.layers.test(k.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&C===Bi)&&(!I.frustumCulled||r.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,I.matrixWorld);const X=e.update(I),ne=I.material;if(Array.isArray(ne)){const de=X.groups;for(let oe=0,ue=de.length;oe<ue;oe++){const B=de[oe],pe=ne[B.materialIndex];if(pe&&pe.visible){const L=D(I,pe,P,C);I.onBeforeShadow(s,I,k,V,X,L,B),s.renderBufferDirect(V,null,X,L,I,B),I.onAfterShadow(s,I,k,V,X,L,B)}}}else if(ne.visible){const de=D(I,ne,P,C);I.onBeforeShadow(s,I,k,V,X,de,null),s.renderBufferDirect(V,null,X,de,I,null),I.onAfterShadow(s,I,k,V,X,de,null)}}const J=I.children;for(let X=0,ne=J.length;X<ne;X++)b(J[X],k,V,P,C)}function W(I){I.target.removeEventListener("dispose",W);for(const V in m){const P=m[V],C=I.target.uuid;C in P&&(P[C].dispose(),delete P[C])}}}const BE={[cf]:uf,[ff]:pf,[df]:mf,[js]:hf,[uf]:cf,[pf]:ff,[mf]:df,[hf]:js};function HE(s,e){function t(){let Y=!1;const Pe=new qt;let fe=null;const _e=new qt(0,0,0,0);return{setMask:function(Ie){fe!==Ie&&!Y&&(s.colorMask(Ie,Ie,Ie,Ie),fe=Ie)},setLocked:function(Ie){Y=Ie},setClear:function(Ie,Ne,ut,Ut,Zt){Zt===!0&&(Ie*=Ut,Ne*=Ut,ut*=Ut),Pe.set(Ie,Ne,ut,Ut),_e.equals(Pe)===!1&&(s.clearColor(Ie,Ne,ut,Ut),_e.copy(Pe))},reset:function(){Y=!1,fe=null,_e.set(-1,0,0,0)}}}function r(){let Y=!1,Pe=!1,fe=null,_e=null,Ie=null;return{setReversed:function(Ne){if(Pe!==Ne){const ut=e.get("EXT_clip_control");Pe?ut.clipControlEXT(ut.LOWER_LEFT_EXT,ut.ZERO_TO_ONE_EXT):ut.clipControlEXT(ut.LOWER_LEFT_EXT,ut.NEGATIVE_ONE_TO_ONE_EXT);const Ut=Ie;Ie=null,this.setClear(Ut)}Pe=Ne},getReversed:function(){return Pe},setTest:function(Ne){Ne?le(s.DEPTH_TEST):ve(s.DEPTH_TEST)},setMask:function(Ne){fe!==Ne&&!Y&&(s.depthMask(Ne),fe=Ne)},setFunc:function(Ne){if(Pe&&(Ne=BE[Ne]),_e!==Ne){switch(Ne){case cf:s.depthFunc(s.NEVER);break;case uf:s.depthFunc(s.ALWAYS);break;case ff:s.depthFunc(s.LESS);break;case js:s.depthFunc(s.LEQUAL);break;case df:s.depthFunc(s.EQUAL);break;case hf:s.depthFunc(s.GEQUAL);break;case pf:s.depthFunc(s.GREATER);break;case mf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}_e=Ne}},setLocked:function(Ne){Y=Ne},setClear:function(Ne){Ie!==Ne&&(Pe&&(Ne=1-Ne),s.clearDepth(Ne),Ie=Ne)},reset:function(){Y=!1,fe=null,_e=null,Ie=null,Pe=!1}}}function a(){let Y=!1,Pe=null,fe=null,_e=null,Ie=null,Ne=null,ut=null,Ut=null,Zt=null;return{setTest:function(wt){Y||(wt?le(s.STENCIL_TEST):ve(s.STENCIL_TEST))},setMask:function(wt){Pe!==wt&&!Y&&(s.stencilMask(wt),Pe=wt)},setFunc:function(wt,Rn,Mn){(fe!==wt||_e!==Rn||Ie!==Mn)&&(s.stencilFunc(wt,Rn,Mn),fe=wt,_e=Rn,Ie=Mn)},setOp:function(wt,Rn,Mn){(Ne!==wt||ut!==Rn||Ut!==Mn)&&(s.stencilOp(wt,Rn,Mn),Ne=wt,ut=Rn,Ut=Mn)},setLocked:function(wt){Y=wt},setClear:function(wt){Zt!==wt&&(s.clearStencil(wt),Zt=wt)},reset:function(){Y=!1,Pe=null,fe=null,_e=null,Ie=null,Ne=null,ut=null,Ut=null,Zt=null}}}const l=new t,u=new r,f=new a,h=new WeakMap,m=new WeakMap;let g={},_={},x=new WeakMap,y=[],E=null,A=!1,S=null,v=null,F=null,D=null,b=null,W=null,I=null,k=new Tt(0,0,0),V=0,P=!1,C=null,z=null,J=null,X=null,ne=null;const de=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let oe=!1,ue=0;const B=s.getParameter(s.VERSION);B.indexOf("WebGL")!==-1?(ue=parseFloat(/^WebGL (\d)/.exec(B)[1]),oe=ue>=1):B.indexOf("OpenGL ES")!==-1&&(ue=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),oe=ue>=2);let pe=null,L={};const M=s.getParameter(s.SCISSOR_BOX),j=s.getParameter(s.VIEWPORT),me=new qt().fromArray(M),G=new qt().fromArray(j);function re(Y,Pe,fe,_e){const Ie=new Uint8Array(4),Ne=s.createTexture();s.bindTexture(Y,Ne),s.texParameteri(Y,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(Y,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ut=0;ut<fe;ut++)Y===s.TEXTURE_3D||Y===s.TEXTURE_2D_ARRAY?s.texImage3D(Pe,0,s.RGBA,1,1,_e,0,s.RGBA,s.UNSIGNED_BYTE,Ie):s.texImage2D(Pe+ut,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ie);return Ne}const he={};he[s.TEXTURE_2D]=re(s.TEXTURE_2D,s.TEXTURE_2D,1),he[s.TEXTURE_CUBE_MAP]=re(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[s.TEXTURE_2D_ARRAY]=re(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),he[s.TEXTURE_3D]=re(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),u.setClear(1),f.setClear(0),le(s.DEPTH_TEST),u.setFunc(js),it(!1),tt(Vp),le(s.CULL_FACE),O(Er);function le(Y){g[Y]!==!0&&(s.enable(Y),g[Y]=!0)}function ve(Y){g[Y]!==!1&&(s.disable(Y),g[Y]=!1)}function Ce(Y,Pe){return _[Y]!==Pe?(s.bindFramebuffer(Y,Pe),_[Y]=Pe,Y===s.DRAW_FRAMEBUFFER&&(_[s.FRAMEBUFFER]=Pe),Y===s.FRAMEBUFFER&&(_[s.DRAW_FRAMEBUFFER]=Pe),!0):!1}function Re(Y,Pe){let fe=y,_e=!1;if(Y){fe=x.get(Pe),fe===void 0&&(fe=[],x.set(Pe,fe));const Ie=Y.textures;if(fe.length!==Ie.length||fe[0]!==s.COLOR_ATTACHMENT0){for(let Ne=0,ut=Ie.length;Ne<ut;Ne++)fe[Ne]=s.COLOR_ATTACHMENT0+Ne;fe.length=Ie.length,_e=!0}}else fe[0]!==s.BACK&&(fe[0]=s.BACK,_e=!0);_e&&s.drawBuffers(fe)}function Je(Y){return E!==Y?(s.useProgram(Y),E=Y,!0):!1}const nt={[Kr]:s.FUNC_ADD,[Dv]:s.FUNC_SUBTRACT,[Nv]:s.FUNC_REVERSE_SUBTRACT};nt[Iv]=s.MIN,nt[Uv]=s.MAX;const $e={[Fv]:s.ZERO,[Ov]:s.ONE,[kv]:s.SRC_COLOR,[af]:s.SRC_ALPHA,[Wv]:s.SRC_ALPHA_SATURATE,[Vv]:s.DST_COLOR,[Bv]:s.DST_ALPHA,[zv]:s.ONE_MINUS_SRC_COLOR,[lf]:s.ONE_MINUS_SRC_ALPHA,[Gv]:s.ONE_MINUS_DST_COLOR,[Hv]:s.ONE_MINUS_DST_ALPHA,[Xv]:s.CONSTANT_COLOR,[jv]:s.ONE_MINUS_CONSTANT_COLOR,[qv]:s.CONSTANT_ALPHA,[Yv]:s.ONE_MINUS_CONSTANT_ALPHA};function O(Y,Pe,fe,_e,Ie,Ne,ut,Ut,Zt,wt){if(Y===Er){A===!0&&(ve(s.BLEND),A=!1);return}if(A===!1&&(le(s.BLEND),A=!0),Y!==Lv){if(Y!==S||wt!==P){if((v!==Kr||b!==Kr)&&(s.blendEquation(s.FUNC_ADD),v=Kr,b=Kr),wt)switch(Y){case Gs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Gp:s.blendFunc(s.ONE,s.ONE);break;case Wp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Xp:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}else switch(Y){case Gs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Gp:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Wp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Xp:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}F=null,D=null,W=null,I=null,k.set(0,0,0),V=0,S=Y,P=wt}return}Ie=Ie||Pe,Ne=Ne||fe,ut=ut||_e,(Pe!==v||Ie!==b)&&(s.blendEquationSeparate(nt[Pe],nt[Ie]),v=Pe,b=Ie),(fe!==F||_e!==D||Ne!==W||ut!==I)&&(s.blendFuncSeparate($e[fe],$e[_e],$e[Ne],$e[ut]),F=fe,D=_e,W=Ne,I=ut),(Ut.equals(k)===!1||Zt!==V)&&(s.blendColor(Ut.r,Ut.g,Ut.b,Zt),k.copy(Ut),V=Zt),S=Y,P=!1}function Pt(Y,Pe){Y.side===Hi?ve(s.CULL_FACE):le(s.CULL_FACE);let fe=Y.side===Fn;Pe&&(fe=!fe),it(fe),Y.blending===Gs&&Y.transparent===!1?O(Er):O(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),u.setFunc(Y.depthFunc),u.setTest(Y.depthTest),u.setMask(Y.depthWrite),l.setMask(Y.colorWrite);const _e=Y.stencilWrite;f.setTest(_e),_e&&(f.setMask(Y.stencilWriteMask),f.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),f.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),vt(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?le(s.SAMPLE_ALPHA_TO_COVERAGE):ve(s.SAMPLE_ALPHA_TO_COVERAGE)}function it(Y){C!==Y&&(Y?s.frontFace(s.CW):s.frontFace(s.CCW),C=Y)}function tt(Y){Y!==bv?(le(s.CULL_FACE),Y!==z&&(Y===Vp?s.cullFace(s.BACK):Y===Pv?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ve(s.CULL_FACE),z=Y}function Be(Y){Y!==J&&(oe&&s.lineWidth(Y),J=Y)}function vt(Y,Pe,fe){Y?(le(s.POLYGON_OFFSET_FILL),(X!==Pe||ne!==fe)&&(s.polygonOffset(Pe,fe),X=Pe,ne=fe)):ve(s.POLYGON_OFFSET_FILL)}function Ue(Y){Y?le(s.SCISSOR_TEST):ve(s.SCISSOR_TEST)}function N(Y){Y===void 0&&(Y=s.TEXTURE0+de-1),pe!==Y&&(s.activeTexture(Y),pe=Y)}function w(Y,Pe,fe){fe===void 0&&(pe===null?fe=s.TEXTURE0+de-1:fe=pe);let _e=L[fe];_e===void 0&&(_e={type:void 0,texture:void 0},L[fe]=_e),(_e.type!==Y||_e.texture!==Pe)&&(pe!==fe&&(s.activeTexture(fe),pe=fe),s.bindTexture(Y,Pe||he[Y]),_e.type=Y,_e.texture=Pe)}function se(){const Y=L[pe];Y!==void 0&&Y.type!==void 0&&(s.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function xe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function ye(){try{s.compressedTexImage3D.apply(s,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function ge(){try{s.texSubImage2D.apply(s,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function je(){try{s.texSubImage3D.apply(s,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function be(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Fe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function ft(){try{s.texStorage2D.apply(s,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Ee(){try{s.texStorage3D.apply(s,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function ze(){try{s.texImage2D.apply(s,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Ze(){try{s.texImage3D.apply(s,arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function ot(Y){me.equals(Y)===!1&&(s.scissor(Y.x,Y.y,Y.z,Y.w),me.copy(Y))}function Ve(Y){G.equals(Y)===!1&&(s.viewport(Y.x,Y.y,Y.z,Y.w),G.copy(Y))}function mt(Y,Pe){let fe=m.get(Pe);fe===void 0&&(fe=new WeakMap,m.set(Pe,fe));let _e=fe.get(Y);_e===void 0&&(_e=s.getUniformBlockIndex(Pe,Y.name),fe.set(Y,_e))}function ct(Y,Pe){const _e=m.get(Pe).get(Y);h.get(Pe)!==_e&&(s.uniformBlockBinding(Pe,_e,Y.__bindingPointIndex),h.set(Pe,_e))}function Lt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),u.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),g={},pe=null,L={},_={},x=new WeakMap,y=[],E=null,A=!1,S=null,v=null,F=null,D=null,b=null,W=null,I=null,k=new Tt(0,0,0),V=0,P=!1,C=null,z=null,J=null,X=null,ne=null,me.set(0,0,s.canvas.width,s.canvas.height),G.set(0,0,s.canvas.width,s.canvas.height),l.reset(),u.reset(),f.reset()}return{buffers:{color:l,depth:u,stencil:f},enable:le,disable:ve,bindFramebuffer:Ce,drawBuffers:Re,useProgram:Je,setBlending:O,setMaterial:Pt,setFlipSided:it,setCullFace:tt,setLineWidth:Be,setPolygonOffset:vt,setScissorTest:Ue,activeTexture:N,bindTexture:w,unbindTexture:se,compressedTexImage2D:xe,compressedTexImage3D:ye,texImage2D:ze,texImage3D:Ze,updateUBOMapping:mt,uniformBlockBinding:ct,texStorage2D:ft,texStorage3D:Ee,texSubImage2D:ge,texSubImage3D:je,compressedTexSubImage2D:be,compressedTexSubImage3D:Fe,scissor:ot,viewport:Ve,reset:Lt}}function VE(s,e,t,r,a,l,u){const f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new st,g=new WeakMap;let _;const x=new WeakMap;let y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(N,w){return y?new OffscreenCanvas(N,w):zl("canvas")}function A(N,w,se){let xe=1;const ye=Ue(N);if((ye.width>se||ye.height>se)&&(xe=se/Math.max(ye.width,ye.height)),xe<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const ge=Math.floor(xe*ye.width),je=Math.floor(xe*ye.height);_===void 0&&(_=E(ge,je));const be=w?E(ge,je):_;return be.width=ge,be.height=je,be.getContext("2d").drawImage(N,0,0,ge,je),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ye.width+"x"+ye.height+") to ("+ge+"x"+je+")."),be}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ye.width+"x"+ye.height+")."),N;return N}function S(N){return N.generateMipmaps}function v(N){s.generateMipmap(N)}function F(N){return N.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?s.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function D(N,w,se,xe,ye=!1){if(N!==null){if(s[N]!==void 0)return s[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let ge=w;if(w===s.RED&&(se===s.FLOAT&&(ge=s.R32F),se===s.HALF_FLOAT&&(ge=s.R16F),se===s.UNSIGNED_BYTE&&(ge=s.R8)),w===s.RED_INTEGER&&(se===s.UNSIGNED_BYTE&&(ge=s.R8UI),se===s.UNSIGNED_SHORT&&(ge=s.R16UI),se===s.UNSIGNED_INT&&(ge=s.R32UI),se===s.BYTE&&(ge=s.R8I),se===s.SHORT&&(ge=s.R16I),se===s.INT&&(ge=s.R32I)),w===s.RG&&(se===s.FLOAT&&(ge=s.RG32F),se===s.HALF_FLOAT&&(ge=s.RG16F),se===s.UNSIGNED_BYTE&&(ge=s.RG8)),w===s.RG_INTEGER&&(se===s.UNSIGNED_BYTE&&(ge=s.RG8UI),se===s.UNSIGNED_SHORT&&(ge=s.RG16UI),se===s.UNSIGNED_INT&&(ge=s.RG32UI),se===s.BYTE&&(ge=s.RG8I),se===s.SHORT&&(ge=s.RG16I),se===s.INT&&(ge=s.RG32I)),w===s.RGB_INTEGER&&(se===s.UNSIGNED_BYTE&&(ge=s.RGB8UI),se===s.UNSIGNED_SHORT&&(ge=s.RGB16UI),se===s.UNSIGNED_INT&&(ge=s.RGB32UI),se===s.BYTE&&(ge=s.RGB8I),se===s.SHORT&&(ge=s.RGB16I),se===s.INT&&(ge=s.RGB32I)),w===s.RGBA_INTEGER&&(se===s.UNSIGNED_BYTE&&(ge=s.RGBA8UI),se===s.UNSIGNED_SHORT&&(ge=s.RGBA16UI),se===s.UNSIGNED_INT&&(ge=s.RGBA32UI),se===s.BYTE&&(ge=s.RGBA8I),se===s.SHORT&&(ge=s.RGBA16I),se===s.INT&&(ge=s.RGBA32I)),w===s.RGB&&se===s.UNSIGNED_INT_5_9_9_9_REV&&(ge=s.RGB9_E5),w===s.RGBA){const je=ye?Ol:bt.getTransfer(xe);se===s.FLOAT&&(ge=s.RGBA32F),se===s.HALF_FLOAT&&(ge=s.RGBA16F),se===s.UNSIGNED_BYTE&&(ge=je===Dt?s.SRGB8_ALPHA8:s.RGBA8),se===s.UNSIGNED_SHORT_4_4_4_4&&(ge=s.RGBA4),se===s.UNSIGNED_SHORT_5_5_5_1&&(ge=s.RGB5_A1)}return(ge===s.R16F||ge===s.R32F||ge===s.RG16F||ge===s.RG32F||ge===s.RGBA16F||ge===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ge}function b(N,w){let se;return N?w===null||w===ts||w===$s?se=s.DEPTH24_STENCIL8:w===Vi?se=s.DEPTH32F_STENCIL8:w===qo&&(se=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===ts||w===$s?se=s.DEPTH_COMPONENT24:w===Vi?se=s.DEPTH_COMPONENT32F:w===qo&&(se=s.DEPTH_COMPONENT16),se}function W(N,w){return S(N)===!0||N.isFramebufferTexture&&N.minFilter!==fi&&N.minFilter!==Si?Math.log2(Math.max(w.width,w.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?w.mipmaps.length:1}function I(N){const w=N.target;w.removeEventListener("dispose",I),V(w),w.isVideoTexture&&g.delete(w)}function k(N){const w=N.target;w.removeEventListener("dispose",k),C(w)}function V(N){const w=r.get(N);if(w.__webglInit===void 0)return;const se=N.source,xe=x.get(se);if(xe){const ye=xe[w.__cacheKey];ye.usedTimes--,ye.usedTimes===0&&P(N),Object.keys(xe).length===0&&x.delete(se)}r.remove(N)}function P(N){const w=r.get(N);s.deleteTexture(w.__webglTexture);const se=N.source,xe=x.get(se);delete xe[w.__cacheKey],u.memory.textures--}function C(N){const w=r.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),r.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let xe=0;xe<6;xe++){if(Array.isArray(w.__webglFramebuffer[xe]))for(let ye=0;ye<w.__webglFramebuffer[xe].length;ye++)s.deleteFramebuffer(w.__webglFramebuffer[xe][ye]);else s.deleteFramebuffer(w.__webglFramebuffer[xe]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[xe])}else{if(Array.isArray(w.__webglFramebuffer))for(let xe=0;xe<w.__webglFramebuffer.length;xe++)s.deleteFramebuffer(w.__webglFramebuffer[xe]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let xe=0;xe<w.__webglColorRenderbuffer.length;xe++)w.__webglColorRenderbuffer[xe]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[xe]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const se=N.textures;for(let xe=0,ye=se.length;xe<ye;xe++){const ge=r.get(se[xe]);ge.__webglTexture&&(s.deleteTexture(ge.__webglTexture),u.memory.textures--),r.remove(se[xe])}r.remove(N)}let z=0;function J(){z=0}function X(){const N=z;return N>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+a.maxTextures),z+=1,N}function ne(N){const w=[];return w.push(N.wrapS),w.push(N.wrapT),w.push(N.wrapR||0),w.push(N.magFilter),w.push(N.minFilter),w.push(N.anisotropy),w.push(N.internalFormat),w.push(N.format),w.push(N.type),w.push(N.generateMipmaps),w.push(N.premultiplyAlpha),w.push(N.flipY),w.push(N.unpackAlignment),w.push(N.colorSpace),w.join()}function de(N,w){const se=r.get(N);if(N.isVideoTexture&&Be(N),N.isRenderTargetTexture===!1&&N.version>0&&se.__version!==N.version){const xe=N.image;if(xe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(xe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(se,N,w);return}}t.bindTexture(s.TEXTURE_2D,se.__webglTexture,s.TEXTURE0+w)}function oe(N,w){const se=r.get(N);if(N.version>0&&se.__version!==N.version){G(se,N,w);return}t.bindTexture(s.TEXTURE_2D_ARRAY,se.__webglTexture,s.TEXTURE0+w)}function ue(N,w){const se=r.get(N);if(N.version>0&&se.__version!==N.version){G(se,N,w);return}t.bindTexture(s.TEXTURE_3D,se.__webglTexture,s.TEXTURE0+w)}function B(N,w){const se=r.get(N);if(N.version>0&&se.__version!==N.version){re(se,N,w);return}t.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture,s.TEXTURE0+w)}const pe={[_f]:s.REPEAT,[Jr]:s.CLAMP_TO_EDGE,[xf]:s.MIRRORED_REPEAT},L={[fi]:s.NEAREST,[r_]:s.NEAREST_MIPMAP_NEAREST,[al]:s.NEAREST_MIPMAP_LINEAR,[Si]:s.LINEAR,[wu]:s.LINEAR_MIPMAP_NEAREST,[Qr]:s.LINEAR_MIPMAP_LINEAR},M={[l_]:s.NEVER,[p_]:s.ALWAYS,[c_]:s.LESS,[cg]:s.LEQUAL,[u_]:s.EQUAL,[h_]:s.GEQUAL,[f_]:s.GREATER,[d_]:s.NOTEQUAL};function j(N,w){if(w.type===Vi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Si||w.magFilter===wu||w.magFilter===al||w.magFilter===Qr||w.minFilter===Si||w.minFilter===wu||w.minFilter===al||w.minFilter===Qr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(N,s.TEXTURE_WRAP_S,pe[w.wrapS]),s.texParameteri(N,s.TEXTURE_WRAP_T,pe[w.wrapT]),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,pe[w.wrapR]),s.texParameteri(N,s.TEXTURE_MAG_FILTER,L[w.magFilter]),s.texParameteri(N,s.TEXTURE_MIN_FILTER,L[w.minFilter]),w.compareFunction&&(s.texParameteri(N,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(N,s.TEXTURE_COMPARE_FUNC,M[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===fi||w.minFilter!==al&&w.minFilter!==Qr||w.type===Vi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||r.get(w).__currentAnisotropy){const se=e.get("EXT_texture_filter_anisotropic");s.texParameterf(N,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,a.getMaxAnisotropy())),r.get(w).__currentAnisotropy=w.anisotropy}}}function me(N,w){let se=!1;N.__webglInit===void 0&&(N.__webglInit=!0,w.addEventListener("dispose",I));const xe=w.source;let ye=x.get(xe);ye===void 0&&(ye={},x.set(xe,ye));const ge=ne(w);if(ge!==N.__cacheKey){ye[ge]===void 0&&(ye[ge]={texture:s.createTexture(),usedTimes:0},u.memory.textures++,se=!0),ye[ge].usedTimes++;const je=ye[N.__cacheKey];je!==void 0&&(ye[N.__cacheKey].usedTimes--,je.usedTimes===0&&P(w)),N.__cacheKey=ge,N.__webglTexture=ye[ge].texture}return se}function G(N,w,se){let xe=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(xe=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(xe=s.TEXTURE_3D);const ye=me(N,w),ge=w.source;t.bindTexture(xe,N.__webglTexture,s.TEXTURE0+se);const je=r.get(ge);if(ge.version!==je.__version||ye===!0){t.activeTexture(s.TEXTURE0+se);const be=bt.getPrimaries(bt.workingColorSpace),Fe=w.colorSpace===Mr?null:bt.getPrimaries(w.colorSpace),ft=w.colorSpace===Mr||be===Fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);let Ee=A(w.image,!1,a.maxTextureSize);Ee=vt(w,Ee);const ze=l.convert(w.format,w.colorSpace),Ze=l.convert(w.type);let ot=D(w.internalFormat,ze,Ze,w.colorSpace,w.isVideoTexture);j(xe,w);let Ve;const mt=w.mipmaps,ct=w.isVideoTexture!==!0,Lt=je.__version===void 0||ye===!0,Y=ge.dataReady,Pe=W(w,Ee);if(w.isDepthTexture)ot=b(w.format===Ks,w.type),Lt&&(ct?t.texStorage2D(s.TEXTURE_2D,1,ot,Ee.width,Ee.height):t.texImage2D(s.TEXTURE_2D,0,ot,Ee.width,Ee.height,0,ze,Ze,null));else if(w.isDataTexture)if(mt.length>0){ct&&Lt&&t.texStorage2D(s.TEXTURE_2D,Pe,ot,mt[0].width,mt[0].height);for(let fe=0,_e=mt.length;fe<_e;fe++)Ve=mt[fe],ct?Y&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,Ve.width,Ve.height,ze,Ze,Ve.data):t.texImage2D(s.TEXTURE_2D,fe,ot,Ve.width,Ve.height,0,ze,Ze,Ve.data);w.generateMipmaps=!1}else ct?(Lt&&t.texStorage2D(s.TEXTURE_2D,Pe,ot,Ee.width,Ee.height),Y&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ee.width,Ee.height,ze,Ze,Ee.data)):t.texImage2D(s.TEXTURE_2D,0,ot,Ee.width,Ee.height,0,ze,Ze,Ee.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ct&&Lt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,ot,mt[0].width,mt[0].height,Ee.depth);for(let fe=0,_e=mt.length;fe<_e;fe++)if(Ve=mt[fe],w.format!==ui)if(ze!==null)if(ct){if(Y)if(w.layerUpdates.size>0){const Ie=vm(Ve.width,Ve.height,w.format,w.type);for(const Ne of w.layerUpdates){const ut=Ve.data.subarray(Ne*Ie/Ve.data.BYTES_PER_ELEMENT,(Ne+1)*Ie/Ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,Ne,Ve.width,Ve.height,1,ze,ut)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,0,Ve.width,Ve.height,Ee.depth,ze,Ve.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,fe,ot,Ve.width,Ve.height,Ee.depth,0,Ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ct?Y&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,fe,0,0,0,Ve.width,Ve.height,Ee.depth,ze,Ze,Ve.data):t.texImage3D(s.TEXTURE_2D_ARRAY,fe,ot,Ve.width,Ve.height,Ee.depth,0,ze,Ze,Ve.data)}else{ct&&Lt&&t.texStorage2D(s.TEXTURE_2D,Pe,ot,mt[0].width,mt[0].height);for(let fe=0,_e=mt.length;fe<_e;fe++)Ve=mt[fe],w.format!==ui?ze!==null?ct?Y&&t.compressedTexSubImage2D(s.TEXTURE_2D,fe,0,0,Ve.width,Ve.height,ze,Ve.data):t.compressedTexImage2D(s.TEXTURE_2D,fe,ot,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ct?Y&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,Ve.width,Ve.height,ze,Ze,Ve.data):t.texImage2D(s.TEXTURE_2D,fe,ot,Ve.width,Ve.height,0,ze,Ze,Ve.data)}else if(w.isDataArrayTexture)if(ct){if(Lt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,ot,Ee.width,Ee.height,Ee.depth),Y)if(w.layerUpdates.size>0){const fe=vm(Ee.width,Ee.height,w.format,w.type);for(const _e of w.layerUpdates){const Ie=Ee.data.subarray(_e*fe/Ee.data.BYTES_PER_ELEMENT,(_e+1)*fe/Ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,_e,Ee.width,Ee.height,1,ze,Ze,Ie)}w.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Ee.width,Ee.height,Ee.depth,ze,Ze,Ee.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ot,Ee.width,Ee.height,Ee.depth,0,ze,Ze,Ee.data);else if(w.isData3DTexture)ct?(Lt&&t.texStorage3D(s.TEXTURE_3D,Pe,ot,Ee.width,Ee.height,Ee.depth),Y&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Ee.width,Ee.height,Ee.depth,ze,Ze,Ee.data)):t.texImage3D(s.TEXTURE_3D,0,ot,Ee.width,Ee.height,Ee.depth,0,ze,Ze,Ee.data);else if(w.isFramebufferTexture){if(Lt)if(ct)t.texStorage2D(s.TEXTURE_2D,Pe,ot,Ee.width,Ee.height);else{let fe=Ee.width,_e=Ee.height;for(let Ie=0;Ie<Pe;Ie++)t.texImage2D(s.TEXTURE_2D,Ie,ot,fe,_e,0,ze,Ze,null),fe>>=1,_e>>=1}}else if(mt.length>0){if(ct&&Lt){const fe=Ue(mt[0]);t.texStorage2D(s.TEXTURE_2D,Pe,ot,fe.width,fe.height)}for(let fe=0,_e=mt.length;fe<_e;fe++)Ve=mt[fe],ct?Y&&t.texSubImage2D(s.TEXTURE_2D,fe,0,0,ze,Ze,Ve):t.texImage2D(s.TEXTURE_2D,fe,ot,ze,Ze,Ve);w.generateMipmaps=!1}else if(ct){if(Lt){const fe=Ue(Ee);t.texStorage2D(s.TEXTURE_2D,Pe,ot,fe.width,fe.height)}Y&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ze,Ze,Ee)}else t.texImage2D(s.TEXTURE_2D,0,ot,ze,Ze,Ee);S(w)&&v(xe),je.__version=ge.version,w.onUpdate&&w.onUpdate(w)}N.__version=w.version}function re(N,w,se){if(w.image.length!==6)return;const xe=me(N,w),ye=w.source;t.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+se);const ge=r.get(ye);if(ye.version!==ge.__version||xe===!0){t.activeTexture(s.TEXTURE0+se);const je=bt.getPrimaries(bt.workingColorSpace),be=w.colorSpace===Mr?null:bt.getPrimaries(w.colorSpace),Fe=w.colorSpace===Mr||je===be?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const ft=w.isCompressedTexture||w.image[0].isCompressedTexture,Ee=w.image[0]&&w.image[0].isDataTexture,ze=[];for(let _e=0;_e<6;_e++)!ft&&!Ee?ze[_e]=A(w.image[_e],!0,a.maxCubemapSize):ze[_e]=Ee?w.image[_e].image:w.image[_e],ze[_e]=vt(w,ze[_e]);const Ze=ze[0],ot=l.convert(w.format,w.colorSpace),Ve=l.convert(w.type),mt=D(w.internalFormat,ot,Ve,w.colorSpace),ct=w.isVideoTexture!==!0,Lt=ge.__version===void 0||xe===!0,Y=ye.dataReady;let Pe=W(w,Ze);j(s.TEXTURE_CUBE_MAP,w);let fe;if(ft){ct&&Lt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Pe,mt,Ze.width,Ze.height);for(let _e=0;_e<6;_e++){fe=ze[_e].mipmaps;for(let Ie=0;Ie<fe.length;Ie++){const Ne=fe[Ie];w.format!==ui?ot!==null?ct?Y&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ie,0,0,Ne.width,Ne.height,ot,Ne.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ie,mt,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ct?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ie,0,0,Ne.width,Ne.height,ot,Ve,Ne.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ie,mt,Ne.width,Ne.height,0,ot,Ve,Ne.data)}}}else{if(fe=w.mipmaps,ct&&Lt){fe.length>0&&Pe++;const _e=Ue(ze[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Pe,mt,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(Ee){ct?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,ze[_e].width,ze[_e].height,ot,Ve,ze[_e].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,mt,ze[_e].width,ze[_e].height,0,ot,Ve,ze[_e].data);for(let Ie=0;Ie<fe.length;Ie++){const ut=fe[Ie].image[_e].image;ct?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ie+1,0,0,ut.width,ut.height,ot,Ve,ut.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ie+1,mt,ut.width,ut.height,0,ot,Ve,ut.data)}}else{ct?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,ot,Ve,ze[_e]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,mt,ot,Ve,ze[_e]);for(let Ie=0;Ie<fe.length;Ie++){const Ne=fe[Ie];ct?Y&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ie+1,0,0,ot,Ve,Ne.image[_e]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ie+1,mt,ot,Ve,Ne.image[_e])}}}S(w)&&v(s.TEXTURE_CUBE_MAP),ge.__version=ye.version,w.onUpdate&&w.onUpdate(w)}N.__version=w.version}function he(N,w,se,xe,ye,ge){const je=l.convert(se.format,se.colorSpace),be=l.convert(se.type),Fe=D(se.internalFormat,je,be,se.colorSpace),ft=r.get(w),Ee=r.get(se);if(Ee.__renderTarget=w,!ft.__hasExternalTextures){const ze=Math.max(1,w.width>>ge),Ze=Math.max(1,w.height>>ge);ye===s.TEXTURE_3D||ye===s.TEXTURE_2D_ARRAY?t.texImage3D(ye,ge,Fe,ze,Ze,w.depth,0,je,be,null):t.texImage2D(ye,ge,Fe,ze,Ze,0,je,be,null)}t.bindFramebuffer(s.FRAMEBUFFER,N),tt(w)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,xe,ye,Ee.__webglTexture,0,it(w)):(ye===s.TEXTURE_2D||ye>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ye<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,xe,ye,Ee.__webglTexture,ge),t.bindFramebuffer(s.FRAMEBUFFER,null)}function le(N,w,se){if(s.bindRenderbuffer(s.RENDERBUFFER,N),w.depthBuffer){const xe=w.depthTexture,ye=xe&&xe.isDepthTexture?xe.type:null,ge=b(w.stencilBuffer,ye),je=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=it(w);tt(w)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,be,ge,w.width,w.height):se?s.renderbufferStorageMultisample(s.RENDERBUFFER,be,ge,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ge,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,je,s.RENDERBUFFER,N)}else{const xe=w.textures;for(let ye=0;ye<xe.length;ye++){const ge=xe[ye],je=l.convert(ge.format,ge.colorSpace),be=l.convert(ge.type),Fe=D(ge.internalFormat,je,be,ge.colorSpace),ft=it(w);se&&tt(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ft,Fe,w.width,w.height):tt(w)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ft,Fe,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,Fe,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ve(N,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,N),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const xe=r.get(w.depthTexture);xe.__renderTarget=w,(!xe.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),de(w.depthTexture,0);const ye=xe.__webglTexture,ge=it(w);if(w.depthTexture.format===Ws)tt(w)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ye,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ye,0);else if(w.depthTexture.format===Ks)tt(w)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ye,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function Ce(N){const w=r.get(N),se=N.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==N.depthTexture){const xe=N.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),xe){const ye=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,xe.removeEventListener("dispose",ye)};xe.addEventListener("dispose",ye),w.__depthDisposeCallback=ye}w.__boundDepthTexture=xe}if(N.depthTexture&&!w.__autoAllocateDepthBuffer){if(se)throw new Error("target.depthTexture not supported in Cube render targets");ve(w.__webglFramebuffer,N)}else if(se){w.__webglDepthbuffer=[];for(let xe=0;xe<6;xe++)if(t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[xe]),w.__webglDepthbuffer[xe]===void 0)w.__webglDepthbuffer[xe]=s.createRenderbuffer(),le(w.__webglDepthbuffer[xe],N,!1);else{const ye=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=w.__webglDepthbuffer[xe];s.bindRenderbuffer(s.RENDERBUFFER,ge),s.framebufferRenderbuffer(s.FRAMEBUFFER,ye,s.RENDERBUFFER,ge)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),le(w.__webglDepthbuffer,N,!1);else{const xe=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ye=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ye),s.framebufferRenderbuffer(s.FRAMEBUFFER,xe,s.RENDERBUFFER,ye)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Re(N,w,se){const xe=r.get(N);w!==void 0&&he(xe.__webglFramebuffer,N,N.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),se!==void 0&&Ce(N)}function Je(N){const w=N.texture,se=r.get(N),xe=r.get(w);N.addEventListener("dispose",k);const ye=N.textures,ge=N.isWebGLCubeRenderTarget===!0,je=ye.length>1;if(je||(xe.__webglTexture===void 0&&(xe.__webglTexture=s.createTexture()),xe.__version=w.version,u.memory.textures++),ge){se.__webglFramebuffer=[];for(let be=0;be<6;be++)if(w.mipmaps&&w.mipmaps.length>0){se.__webglFramebuffer[be]=[];for(let Fe=0;Fe<w.mipmaps.length;Fe++)se.__webglFramebuffer[be][Fe]=s.createFramebuffer()}else se.__webglFramebuffer[be]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){se.__webglFramebuffer=[];for(let be=0;be<w.mipmaps.length;be++)se.__webglFramebuffer[be]=s.createFramebuffer()}else se.__webglFramebuffer=s.createFramebuffer();if(je)for(let be=0,Fe=ye.length;be<Fe;be++){const ft=r.get(ye[be]);ft.__webglTexture===void 0&&(ft.__webglTexture=s.createTexture(),u.memory.textures++)}if(N.samples>0&&tt(N)===!1){se.__webglMultisampledFramebuffer=s.createFramebuffer(),se.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,se.__webglMultisampledFramebuffer);for(let be=0;be<ye.length;be++){const Fe=ye[be];se.__webglColorRenderbuffer[be]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,se.__webglColorRenderbuffer[be]);const ft=l.convert(Fe.format,Fe.colorSpace),Ee=l.convert(Fe.type),ze=D(Fe.internalFormat,ft,Ee,Fe.colorSpace,N.isXRRenderTarget===!0),Ze=it(N);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ze,ze,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.RENDERBUFFER,se.__webglColorRenderbuffer[be])}s.bindRenderbuffer(s.RENDERBUFFER,null),N.depthBuffer&&(se.__webglDepthRenderbuffer=s.createRenderbuffer(),le(se.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ge){t.bindTexture(s.TEXTURE_CUBE_MAP,xe.__webglTexture),j(s.TEXTURE_CUBE_MAP,w);for(let be=0;be<6;be++)if(w.mipmaps&&w.mipmaps.length>0)for(let Fe=0;Fe<w.mipmaps.length;Fe++)he(se.__webglFramebuffer[be][Fe],N,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+be,Fe);else he(se.__webglFramebuffer[be],N,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0);S(w)&&v(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(je){for(let be=0,Fe=ye.length;be<Fe;be++){const ft=ye[be],Ee=r.get(ft);t.bindTexture(s.TEXTURE_2D,Ee.__webglTexture),j(s.TEXTURE_2D,ft),he(se.__webglFramebuffer,N,ft,s.COLOR_ATTACHMENT0+be,s.TEXTURE_2D,0),S(ft)&&v(s.TEXTURE_2D)}t.unbindTexture()}else{let be=s.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(be=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(be,xe.__webglTexture),j(be,w),w.mipmaps&&w.mipmaps.length>0)for(let Fe=0;Fe<w.mipmaps.length;Fe++)he(se.__webglFramebuffer[Fe],N,w,s.COLOR_ATTACHMENT0,be,Fe);else he(se.__webglFramebuffer,N,w,s.COLOR_ATTACHMENT0,be,0);S(w)&&v(be),t.unbindTexture()}N.depthBuffer&&Ce(N)}function nt(N){const w=N.textures;for(let se=0,xe=w.length;se<xe;se++){const ye=w[se];if(S(ye)){const ge=F(N),je=r.get(ye).__webglTexture;t.bindTexture(ge,je),v(ge),t.unbindTexture()}}}const $e=[],O=[];function Pt(N){if(N.samples>0){if(tt(N)===!1){const w=N.textures,se=N.width,xe=N.height;let ye=s.COLOR_BUFFER_BIT;const ge=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,je=r.get(N),be=w.length>1;if(be)for(let Fe=0;Fe<w.length;Fe++)t.bindFramebuffer(s.FRAMEBUFFER,je.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,je.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,je.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,je.__webglFramebuffer);for(let Fe=0;Fe<w.length;Fe++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(ye|=s.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(ye|=s.STENCIL_BUFFER_BIT)),be){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,je.__webglColorRenderbuffer[Fe]);const ft=r.get(w[Fe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ft,0)}s.blitFramebuffer(0,0,se,xe,0,0,se,xe,ye,s.NEAREST),h===!0&&($e.length=0,O.length=0,$e.push(s.COLOR_ATTACHMENT0+Fe),N.depthBuffer&&N.resolveDepthBuffer===!1&&($e.push(ge),O.push(ge),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,O)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,$e))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),be)for(let Fe=0;Fe<w.length;Fe++){t.bindFramebuffer(s.FRAMEBUFFER,je.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,je.__webglColorRenderbuffer[Fe]);const ft=r.get(w[Fe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,je.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,ft,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,je.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&h){const w=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function it(N){return Math.min(a.maxSamples,N.samples)}function tt(N){const w=r.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Be(N){const w=u.render.frame;g.get(N)!==w&&(g.set(N,w),N.update())}function vt(N,w){const se=N.colorSpace,xe=N.format,ye=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||se!==Zs&&se!==Mr&&(bt.getTransfer(se)===Dt?(xe!==ui||ye!==Xi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",se)),w}function Ue(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(m.width=N.naturalWidth||N.width,m.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(m.width=N.displayWidth,m.height=N.displayHeight):(m.width=N.width,m.height=N.height),m}this.allocateTextureUnit=X,this.resetTextureUnits=J,this.setTexture2D=de,this.setTexture2DArray=oe,this.setTexture3D=ue,this.setTextureCube=B,this.rebindTextures=Re,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=he,this.useMultisampledRTT=tt}function GE(s,e){function t(r,a=Mr){let l;const u=bt.getTransfer(a);if(r===Xi)return s.UNSIGNED_BYTE;if(r===Jf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Qf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===eg)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Jm)return s.BYTE;if(r===Qm)return s.SHORT;if(r===qo)return s.UNSIGNED_SHORT;if(r===Zf)return s.INT;if(r===ts)return s.UNSIGNED_INT;if(r===Vi)return s.FLOAT;if(r===Yo)return s.HALF_FLOAT;if(r===tg)return s.ALPHA;if(r===ng)return s.RGB;if(r===ui)return s.RGBA;if(r===ig)return s.LUMINANCE;if(r===rg)return s.LUMINANCE_ALPHA;if(r===Ws)return s.DEPTH_COMPONENT;if(r===Ks)return s.DEPTH_STENCIL;if(r===sg)return s.RED;if(r===ed)return s.RED_INTEGER;if(r===og)return s.RG;if(r===td)return s.RG_INTEGER;if(r===nd)return s.RGBA_INTEGER;if(r===Ll||r===Dl||r===Nl||r===Il)if(u===Dt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===Ll)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Dl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Nl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Il)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===Ll)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Dl)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Nl)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Il)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===yf||r===Sf||r===Mf||r===Ef)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===yf)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Sf)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Mf)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ef)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Tf||r===wf||r===Af)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===Tf||r===wf)return u===Dt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===Af)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Cf||r===Rf||r===bf||r===Pf||r===Lf||r===Df||r===Nf||r===If||r===Uf||r===Ff||r===Of||r===kf||r===zf||r===Bf)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===Cf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Rf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===bf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Pf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Lf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Df)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Nf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===If)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Uf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ff)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Of)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===kf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===zf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Bf)return u===Dt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ul||r===Hf||r===Vf)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===Ul)return u===Dt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Hf)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Vf)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===ag||r===Gf||r===Wf||r===Xf)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===Ul)return l.COMPRESSED_RED_RGTC1_EXT;if(r===Gf)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Wf)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Xf)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===$s?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:t}}const WE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,XE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class jE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,r){if(this.texture===null){const a=new On,l=e.properties.get(a);l.__webglTexture=t.texture,(t.depthNear!==r.depthNear||t.depthFar!==r.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new Ar({vertexShader:WE,fragmentShader:XE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Gt(new Jo(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qE extends Qs{constructor(e,t){super();const r=this;let a=null,l=1,u=null,f="local-floor",h=1,m=null,g=null,_=null,x=null,y=null,E=null;const A=new jE,S=t.getContextAttributes();let v=null,F=null;const D=[],b=[],W=new st;let I=null;const k=new Qn;k.viewport=new qt;const V=new Qn;V.viewport=new qt;const P=[k,V],C=new mx;let z=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let re=D[G];return re===void 0&&(re=new qu,D[G]=re),re.getTargetRaySpace()},this.getControllerGrip=function(G){let re=D[G];return re===void 0&&(re=new qu,D[G]=re),re.getGripSpace()},this.getHand=function(G){let re=D[G];return re===void 0&&(re=new qu,D[G]=re),re.getHandSpace()};function X(G){const re=b.indexOf(G.inputSource);if(re===-1)return;const he=D[re];he!==void 0&&(he.update(G.inputSource,G.frame,m||u),he.dispatchEvent({type:G.type,data:G.inputSource}))}function ne(){a.removeEventListener("select",X),a.removeEventListener("selectstart",X),a.removeEventListener("selectend",X),a.removeEventListener("squeeze",X),a.removeEventListener("squeezestart",X),a.removeEventListener("squeezeend",X),a.removeEventListener("end",ne),a.removeEventListener("inputsourceschange",de);for(let G=0;G<D.length;G++){const re=b[G];re!==null&&(b[G]=null,D[G].disconnect(re))}z=null,J=null,A.reset(),e.setRenderTarget(v),y=null,x=null,_=null,a=null,F=null,me.stop(),r.isPresenting=!1,e.setPixelRatio(I),e.setSize(W.width,W.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){l=G,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){f=G,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||u},this.setReferenceSpace=function(G){m=G},this.getBaseLayer=function(){return x!==null?x:y},this.getBinding=function(){return _},this.getFrame=function(){return E},this.getSession=function(){return a},this.setSession=async function(G){if(a=G,a!==null){if(v=e.getRenderTarget(),a.addEventListener("select",X),a.addEventListener("selectstart",X),a.addEventListener("selectend",X),a.addEventListener("squeeze",X),a.addEventListener("squeezestart",X),a.addEventListener("squeezeend",X),a.addEventListener("end",ne),a.addEventListener("inputsourceschange",de),S.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(W),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,le=null,ve=null;S.depth&&(ve=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=S.stencil?Ks:Ws,le=S.stencil?$s:ts);const Ce={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:l};_=new XRWebGLBinding(a,t),x=_.createProjectionLayer(Ce),a.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),F=new ns(x.textureWidth,x.textureHeight,{format:ui,type:Xi,depthTexture:new Eg(x.textureWidth,x.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}else{const he={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:l};y=new XRWebGLLayer(a,t,he),a.updateRenderState({baseLayer:y}),e.setPixelRatio(1),e.setSize(y.framebufferWidth,y.framebufferHeight,!1),F=new ns(y.framebufferWidth,y.framebufferHeight,{format:ui,type:Xi,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil})}F.isXRRenderTarget=!0,this.setFoveation(h),m=null,u=await a.requestReferenceSpace(f),me.setContext(a),me.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return A.getDepthTexture()};function de(G){for(let re=0;re<G.removed.length;re++){const he=G.removed[re],le=b.indexOf(he);le>=0&&(b[le]=null,D[le].disconnect(he))}for(let re=0;re<G.added.length;re++){const he=G.added[re];let le=b.indexOf(he);if(le===-1){for(let Ce=0;Ce<D.length;Ce++)if(Ce>=b.length){b.push(he),le=Ce;break}else if(b[Ce]===null){b[Ce]=he,le=Ce;break}if(le===-1)break}const ve=D[le];ve&&ve.connect(he)}}const oe=new K,ue=new K;function B(G,re,he){oe.setFromMatrixPosition(re.matrixWorld),ue.setFromMatrixPosition(he.matrixWorld);const le=oe.distanceTo(ue),ve=re.projectionMatrix.elements,Ce=he.projectionMatrix.elements,Re=ve[14]/(ve[10]-1),Je=ve[14]/(ve[10]+1),nt=(ve[9]+1)/ve[5],$e=(ve[9]-1)/ve[5],O=(ve[8]-1)/ve[0],Pt=(Ce[8]+1)/Ce[0],it=Re*O,tt=Re*Pt,Be=le/(-O+Pt),vt=Be*-O;if(re.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(vt),G.translateZ(Be),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),ve[10]===-1)G.projectionMatrix.copy(re.projectionMatrix),G.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const Ue=Re+Be,N=Je+Be,w=it-vt,se=tt+(le-vt),xe=nt*Je/N*Ue,ye=$e*Je/N*Ue;G.projectionMatrix.makePerspective(w,se,xe,ye,Ue,N),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function pe(G,re){re===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(re.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(a===null)return;let re=G.near,he=G.far;A.texture!==null&&(A.depthNear>0&&(re=A.depthNear),A.depthFar>0&&(he=A.depthFar)),C.near=V.near=k.near=re,C.far=V.far=k.far=he,(z!==C.near||J!==C.far)&&(a.updateRenderState({depthNear:C.near,depthFar:C.far}),z=C.near,J=C.far),k.layers.mask=G.layers.mask|2,V.layers.mask=G.layers.mask|4,C.layers.mask=k.layers.mask|V.layers.mask;const le=G.parent,ve=C.cameras;pe(C,le);for(let Ce=0;Ce<ve.length;Ce++)pe(ve[Ce],le);ve.length===2?B(C,k,V):C.projectionMatrix.copy(k.projectionMatrix),L(G,C,le)};function L(G,re,he){he===null?G.matrix.copy(re.matrixWorld):(G.matrix.copy(he.matrixWorld),G.matrix.invert(),G.matrix.multiply(re.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(re.projectionMatrix),G.projectionMatrixInverse.copy(re.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=jf*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(x===null&&y===null))return h},this.setFoveation=function(G){h=G,x!==null&&(x.fixedFoveation=G),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=G)},this.hasDepthSensing=function(){return A.texture!==null},this.getDepthSensingMesh=function(){return A.getMesh(C)};let M=null;function j(G,re){if(g=re.getViewerPose(m||u),E=re,g!==null){const he=g.views;y!==null&&(e.setRenderTargetFramebuffer(F,y.framebuffer),e.setRenderTarget(F));let le=!1;he.length!==C.cameras.length&&(C.cameras.length=0,le=!0);for(let Re=0;Re<he.length;Re++){const Je=he[Re];let nt=null;if(y!==null)nt=y.getViewport(Je);else{const O=_.getViewSubImage(x,Je);nt=O.viewport,Re===0&&(e.setRenderTargetTextures(F,O.colorTexture,x.ignoreDepthValues?void 0:O.depthStencilTexture),e.setRenderTarget(F))}let $e=P[Re];$e===void 0&&($e=new Qn,$e.layers.enable(Re),$e.viewport=new qt,P[Re]=$e),$e.matrix.fromArray(Je.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(Je.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(nt.x,nt.y,nt.width,nt.height),Re===0&&(C.matrix.copy($e.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),le===!0&&C.cameras.push($e)}const ve=a.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&_){const Re=_.getDepthInformation(he[0]);Re&&Re.isValid&&Re.texture&&A.init(e,Re,a.renderState)}}for(let he=0;he<D.length;he++){const le=b[he],ve=D[he];le!==null&&ve!==void 0&&ve.update(le,re,m||u)}M&&M(G,re),re.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:re}),E=null}const me=new bg;me.setAnimationLoop(j),this.setAnimationLoop=function(G){M=G},this.dispose=function(){}}}const jr=new Ei,YE=new Bt;function $E(s,e){function t(S,v){S.matrixAutoUpdate===!0&&S.updateMatrix(),v.value.copy(S.matrix)}function r(S,v){v.color.getRGB(S.fogColor.value,xg(s)),v.isFog?(S.fogNear.value=v.near,S.fogFar.value=v.far):v.isFogExp2&&(S.fogDensity.value=v.density)}function a(S,v,F,D,b){v.isMeshBasicMaterial||v.isMeshLambertMaterial?l(S,v):v.isMeshToonMaterial?(l(S,v),_(S,v)):v.isMeshPhongMaterial?(l(S,v),g(S,v)):v.isMeshStandardMaterial?(l(S,v),x(S,v),v.isMeshPhysicalMaterial&&y(S,v,b)):v.isMeshMatcapMaterial?(l(S,v),E(S,v)):v.isMeshDepthMaterial?l(S,v):v.isMeshDistanceMaterial?(l(S,v),A(S,v)):v.isMeshNormalMaterial?l(S,v):v.isLineBasicMaterial?(u(S,v),v.isLineDashedMaterial&&f(S,v)):v.isPointsMaterial?h(S,v,F,D):v.isSpriteMaterial?m(S,v):v.isShadowMaterial?(S.color.value.copy(v.color),S.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function l(S,v){S.opacity.value=v.opacity,v.color&&S.diffuse.value.copy(v.color),v.emissive&&S.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(S.map.value=v.map,t(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,t(v.alphaMap,S.alphaMapTransform)),v.bumpMap&&(S.bumpMap.value=v.bumpMap,t(v.bumpMap,S.bumpMapTransform),S.bumpScale.value=v.bumpScale,v.side===Fn&&(S.bumpScale.value*=-1)),v.normalMap&&(S.normalMap.value=v.normalMap,t(v.normalMap,S.normalMapTransform),S.normalScale.value.copy(v.normalScale),v.side===Fn&&S.normalScale.value.negate()),v.displacementMap&&(S.displacementMap.value=v.displacementMap,t(v.displacementMap,S.displacementMapTransform),S.displacementScale.value=v.displacementScale,S.displacementBias.value=v.displacementBias),v.emissiveMap&&(S.emissiveMap.value=v.emissiveMap,t(v.emissiveMap,S.emissiveMapTransform)),v.specularMap&&(S.specularMap.value=v.specularMap,t(v.specularMap,S.specularMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest);const F=e.get(v),D=F.envMap,b=F.envMapRotation;D&&(S.envMap.value=D,jr.copy(b),jr.x*=-1,jr.y*=-1,jr.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(jr.y*=-1,jr.z*=-1),S.envMapRotation.value.setFromMatrix4(YE.makeRotationFromEuler(jr)),S.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=v.reflectivity,S.ior.value=v.ior,S.refractionRatio.value=v.refractionRatio),v.lightMap&&(S.lightMap.value=v.lightMap,S.lightMapIntensity.value=v.lightMapIntensity,t(v.lightMap,S.lightMapTransform)),v.aoMap&&(S.aoMap.value=v.aoMap,S.aoMapIntensity.value=v.aoMapIntensity,t(v.aoMap,S.aoMapTransform))}function u(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,v.map&&(S.map.value=v.map,t(v.map,S.mapTransform))}function f(S,v){S.dashSize.value=v.dashSize,S.totalSize.value=v.dashSize+v.gapSize,S.scale.value=v.scale}function h(S,v,F,D){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.size.value=v.size*F,S.scale.value=D*.5,v.map&&(S.map.value=v.map,t(v.map,S.uvTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,t(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function m(S,v){S.diffuse.value.copy(v.color),S.opacity.value=v.opacity,S.rotation.value=v.rotation,v.map&&(S.map.value=v.map,t(v.map,S.mapTransform)),v.alphaMap&&(S.alphaMap.value=v.alphaMap,t(v.alphaMap,S.alphaMapTransform)),v.alphaTest>0&&(S.alphaTest.value=v.alphaTest)}function g(S,v){S.specular.value.copy(v.specular),S.shininess.value=Math.max(v.shininess,1e-4)}function _(S,v){v.gradientMap&&(S.gradientMap.value=v.gradientMap)}function x(S,v){S.metalness.value=v.metalness,v.metalnessMap&&(S.metalnessMap.value=v.metalnessMap,t(v.metalnessMap,S.metalnessMapTransform)),S.roughness.value=v.roughness,v.roughnessMap&&(S.roughnessMap.value=v.roughnessMap,t(v.roughnessMap,S.roughnessMapTransform)),v.envMap&&(S.envMapIntensity.value=v.envMapIntensity)}function y(S,v,F){S.ior.value=v.ior,v.sheen>0&&(S.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),S.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(S.sheenColorMap.value=v.sheenColorMap,t(v.sheenColorMap,S.sheenColorMapTransform)),v.sheenRoughnessMap&&(S.sheenRoughnessMap.value=v.sheenRoughnessMap,t(v.sheenRoughnessMap,S.sheenRoughnessMapTransform))),v.clearcoat>0&&(S.clearcoat.value=v.clearcoat,S.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(S.clearcoatMap.value=v.clearcoatMap,t(v.clearcoatMap,S.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,t(v.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(S.clearcoatNormalMap.value=v.clearcoatNormalMap,t(v.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Fn&&S.clearcoatNormalScale.value.negate())),v.dispersion>0&&(S.dispersion.value=v.dispersion),v.iridescence>0&&(S.iridescence.value=v.iridescence,S.iridescenceIOR.value=v.iridescenceIOR,S.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(S.iridescenceMap.value=v.iridescenceMap,t(v.iridescenceMap,S.iridescenceMapTransform)),v.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=v.iridescenceThicknessMap,t(v.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),v.transmission>0&&(S.transmission.value=v.transmission,S.transmissionSamplerMap.value=F.texture,S.transmissionSamplerSize.value.set(F.width,F.height),v.transmissionMap&&(S.transmissionMap.value=v.transmissionMap,t(v.transmissionMap,S.transmissionMapTransform)),S.thickness.value=v.thickness,v.thicknessMap&&(S.thicknessMap.value=v.thicknessMap,t(v.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=v.attenuationDistance,S.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(S.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(S.anisotropyMap.value=v.anisotropyMap,t(v.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=v.specularIntensity,S.specularColor.value.copy(v.specularColor),v.specularColorMap&&(S.specularColorMap.value=v.specularColorMap,t(v.specularColorMap,S.specularColorMapTransform)),v.specularIntensityMap&&(S.specularIntensityMap.value=v.specularIntensityMap,t(v.specularIntensityMap,S.specularIntensityMapTransform))}function E(S,v){v.matcap&&(S.matcap.value=v.matcap)}function A(S,v){const F=e.get(v).light;S.referencePosition.value.setFromMatrixPosition(F.matrixWorld),S.nearDistance.value=F.shadow.camera.near,S.farDistance.value=F.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function KE(s,e,t,r){let a={},l={},u=[];const f=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(F,D){const b=D.program;r.uniformBlockBinding(F,b)}function m(F,D){let b=a[F.id];b===void 0&&(E(F),b=g(F),a[F.id]=b,F.addEventListener("dispose",S));const W=D.program;r.updateUBOMapping(F,W);const I=e.render.frame;l[F.id]!==I&&(x(F),l[F.id]=I)}function g(F){const D=_();F.__bindingPointIndex=D;const b=s.createBuffer(),W=F.__size,I=F.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,W,I),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,D,b),b}function _(){for(let F=0;F<f;F++)if(u.indexOf(F)===-1)return u.push(F),F;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(F){const D=a[F.id],b=F.uniforms,W=F.__cache;s.bindBuffer(s.UNIFORM_BUFFER,D);for(let I=0,k=b.length;I<k;I++){const V=Array.isArray(b[I])?b[I]:[b[I]];for(let P=0,C=V.length;P<C;P++){const z=V[P];if(y(z,I,P,W)===!0){const J=z.__offset,X=Array.isArray(z.value)?z.value:[z.value];let ne=0;for(let de=0;de<X.length;de++){const oe=X[de],ue=A(oe);typeof oe=="number"||typeof oe=="boolean"?(z.__data[0]=oe,s.bufferSubData(s.UNIFORM_BUFFER,J+ne,z.__data)):oe.isMatrix3?(z.__data[0]=oe.elements[0],z.__data[1]=oe.elements[1],z.__data[2]=oe.elements[2],z.__data[3]=0,z.__data[4]=oe.elements[3],z.__data[5]=oe.elements[4],z.__data[6]=oe.elements[5],z.__data[7]=0,z.__data[8]=oe.elements[6],z.__data[9]=oe.elements[7],z.__data[10]=oe.elements[8],z.__data[11]=0):(oe.toArray(z.__data,ne),ne+=ue.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,J,z.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function y(F,D,b,W){const I=F.value,k=D+"_"+b;if(W[k]===void 0)return typeof I=="number"||typeof I=="boolean"?W[k]=I:W[k]=I.clone(),!0;{const V=W[k];if(typeof I=="number"||typeof I=="boolean"){if(V!==I)return W[k]=I,!0}else if(V.equals(I)===!1)return V.copy(I),!0}return!1}function E(F){const D=F.uniforms;let b=0;const W=16;for(let k=0,V=D.length;k<V;k++){const P=Array.isArray(D[k])?D[k]:[D[k]];for(let C=0,z=P.length;C<z;C++){const J=P[C],X=Array.isArray(J.value)?J.value:[J.value];for(let ne=0,de=X.length;ne<de;ne++){const oe=X[ne],ue=A(oe),B=b%W,pe=B%ue.boundary,L=B+pe;b+=pe,L!==0&&W-L<ue.storage&&(b+=W-L),J.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=b,b+=ue.storage}}}const I=b%W;return I>0&&(b+=W-I),F.__size=b,F.__cache={},this}function A(F){const D={boundary:0,storage:0};return typeof F=="number"||typeof F=="boolean"?(D.boundary=4,D.storage=4):F.isVector2?(D.boundary=8,D.storage=8):F.isVector3||F.isColor?(D.boundary=16,D.storage=12):F.isVector4?(D.boundary=16,D.storage=16):F.isMatrix3?(D.boundary=48,D.storage=48):F.isMatrix4?(D.boundary=64,D.storage=64):F.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",F),D}function S(F){const D=F.target;D.removeEventListener("dispose",S);const b=u.indexOf(D.__bindingPointIndex);u.splice(b,1),s.deleteBuffer(a[D.id]),delete a[D.id],delete l[D.id]}function v(){for(const F in a)s.deleteBuffer(a[F]);u=[],a={},l={}}return{bind:h,update:m,dispose:v}}class ZE{constructor(e={}){const{canvas:t=g_(),context:r=null,depth:a=!0,stencil:l=!1,alpha:u=!1,antialias:f=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:m=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let y;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");y=r.getContextAttributes().alpha}else y=u;const E=new Uint32Array(4),A=new Int32Array(4);let S=null,v=null;const F=[],D=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Jn,this.toneMapping=Tr,this.toneMappingExposure=1;const b=this;let W=!1,I=0,k=0,V=null,P=-1,C=null;const z=new qt,J=new qt;let X=null;const ne=new Tt(0);let de=0,oe=t.width,ue=t.height,B=1,pe=null,L=null;const M=new qt(0,0,oe,ue),j=new qt(0,0,oe,ue);let me=!1;const G=new rd;let re=!1,he=!1;this.transmissionResolutionScale=1;const le=new Bt,ve=new Bt,Ce=new K,Re=new qt,Je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let nt=!1;function $e(){return V===null?B:1}let O=r;function Pt(R,$){return t.getContext(R,$)}try{const R={alpha:!0,depth:a,stencil:l,antialias:f,premultipliedAlpha:h,preserveDrawingBuffer:m,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Kf}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",Ie,!1),t.addEventListener("webglcontextcreationerror",Ne,!1),O===null){const $="webgl2";if(O=Pt($,R),O===null)throw Pt($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let it,tt,Be,vt,Ue,N,w,se,xe,ye,ge,je,be,Fe,ft,Ee,ze,Ze,ot,Ve,mt,ct,Lt,Y;function Pe(){it=new aM(O),it.init(),ct=new GE(O,it),tt=new tM(O,it,e,ct),Be=new HE(O,it),tt.reverseDepthBuffer&&x&&Be.buffers.depth.setReversed(!0),vt=new uM(O),Ue=new RE,N=new VE(O,it,Be,Ue,tt,ct,vt),w=new iM(b),se=new oM(b),xe=new vx(O),Lt=new QS(O,xe),ye=new lM(O,xe,vt,Lt),ge=new dM(O,ye,xe,vt),ot=new fM(O,tt,N),Ee=new nM(Ue),je=new CE(b,w,se,it,tt,Lt,Ee),be=new $E(b,Ue),Fe=new PE,ft=new FE(it),Ze=new JS(b,w,se,Be,ge,y,h),ze=new zE(b,ge,tt),Y=new KE(O,vt,tt,Be),Ve=new eM(O,it,vt),mt=new cM(O,it,vt),vt.programs=je.programs,b.capabilities=tt,b.extensions=it,b.properties=Ue,b.renderLists=Fe,b.shadowMap=ze,b.state=Be,b.info=vt}Pe();const fe=new qE(b,O);this.xr=fe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const R=it.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=it.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(R){R!==void 0&&(B=R,this.setSize(oe,ue,!1))},this.getSize=function(R){return R.set(oe,ue)},this.setSize=function(R,$,ae=!0){if(fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}oe=R,ue=$,t.width=Math.floor(R*B),t.height=Math.floor($*B),ae===!0&&(t.style.width=R+"px",t.style.height=$+"px"),this.setViewport(0,0,R,$)},this.getDrawingBufferSize=function(R){return R.set(oe*B,ue*B).floor()},this.setDrawingBufferSize=function(R,$,ae){oe=R,ue=$,B=ae,t.width=Math.floor(R*ae),t.height=Math.floor($*ae),this.setViewport(0,0,R,$)},this.getCurrentViewport=function(R){return R.copy(z)},this.getViewport=function(R){return R.copy(M)},this.setViewport=function(R,$,ae,te){R.isVector4?M.set(R.x,R.y,R.z,R.w):M.set(R,$,ae,te),Be.viewport(z.copy(M).multiplyScalar(B).round())},this.getScissor=function(R){return R.copy(j)},this.setScissor=function(R,$,ae,te){R.isVector4?j.set(R.x,R.y,R.z,R.w):j.set(R,$,ae,te),Be.scissor(J.copy(j).multiplyScalar(B).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(R){Be.setScissorTest(me=R)},this.setOpaqueSort=function(R){pe=R},this.setTransparentSort=function(R){L=R},this.getClearColor=function(R){return R.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor.apply(Ze,arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha.apply(Ze,arguments)},this.clear=function(R=!0,$=!0,ae=!0){let te=0;if(R){let Z=!1;if(V!==null){const we=V.texture.format;Z=we===nd||we===td||we===ed}if(Z){const we=V.texture.type,Le=we===Xi||we===ts||we===qo||we===$s||we===Jf||we===Qf,Oe=Ze.getClearColor(),Ge=Ze.getClearAlpha(),at=Oe.r,rt=Oe.g,Xe=Oe.b;Le?(E[0]=at,E[1]=rt,E[2]=Xe,E[3]=Ge,O.clearBufferuiv(O.COLOR,0,E)):(A[0]=at,A[1]=rt,A[2]=Xe,A[3]=Ge,O.clearBufferiv(O.COLOR,0,A))}else te|=O.COLOR_BUFFER_BIT}$&&(te|=O.DEPTH_BUFFER_BIT),ae&&(te|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",Ie,!1),t.removeEventListener("webglcontextcreationerror",Ne,!1),Ze.dispose(),Fe.dispose(),ft.dispose(),Ue.dispose(),w.dispose(),se.dispose(),ge.dispose(),Lt.dispose(),Y.dispose(),je.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",is),fe.removeEventListener("sessionend",qi),Ti.stop()};function _e(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),W=!0}function Ie(){console.log("THREE.WebGLRenderer: Context Restored."),W=!1;const R=vt.autoReset,$=ze.enabled,ae=ze.autoUpdate,te=ze.needsUpdate,Z=ze.type;Pe(),vt.autoReset=R,ze.enabled=$,ze.autoUpdate=ae,ze.needsUpdate=te,ze.type=Z}function Ne(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ut(R){const $=R.target;$.removeEventListener("dispose",ut),Ut($)}function Ut(R){Zt(R),Ue.remove(R)}function Zt(R){const $=Ue.get(R).programs;$!==void 0&&($.forEach(function(ae){je.releaseProgram(ae)}),R.isShaderMaterial&&je.releaseShaderCache(R))}this.renderBufferDirect=function(R,$,ae,te,Z,we){$===null&&($=Je);const Le=Z.isMesh&&Z.matrixWorld.determinant()<0,Oe=ta(R,$,ae,te,Z);Be.setMaterial(te,Le);let Ge=ae.index,at=1;if(te.wireframe===!0){if(Ge=ye.getWireframeAttribute(ae),Ge===void 0)return;at=2}const rt=ae.drawRange,Xe=ae.attributes.position;let Mt=rt.start*at,dt=(rt.start+rt.count)*at;we!==null&&(Mt=Math.max(Mt,we.start*at),dt=Math.min(dt,(we.start+we.count)*at)),Ge!==null?(Mt=Math.max(Mt,0),dt=Math.min(dt,Ge.count)):Xe!=null&&(Mt=Math.max(Mt,0),dt=Math.min(dt,Xe.count));const Wt=dt-Mt;if(Wt<0||Wt===1/0)return;Lt.setup(Z,te,Oe,ae,Ge);let kt,Et=Ve;if(Ge!==null&&(kt=xe.get(Ge),Et=mt,Et.setIndex(kt)),Z.isMesh)te.wireframe===!0?(Be.setLineWidth(te.wireframeLinewidth*$e()),Et.setMode(O.LINES)):Et.setMode(O.TRIANGLES);else if(Z.isLine){let Ke=te.linewidth;Ke===void 0&&(Ke=1),Be.setLineWidth(Ke*$e()),Z.isLineSegments?Et.setMode(O.LINES):Z.isLineLoop?Et.setMode(O.LINE_LOOP):Et.setMode(O.LINE_STRIP)}else Z.isPoints?Et.setMode(O.POINTS):Z.isSprite&&Et.setMode(O.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)Et.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))Et.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const Ke=Z._multiDrawStarts,Xt=Z._multiDrawCounts,yt=Z._multiDrawCount,pn=Ge?xe.get(Ge).bytesPerElement:1,$i=Ue.get(te).currentProgram.getUniforms();for(let En=0;En<yt;En++)$i.setValue(O,"_gl_DrawID",En),Et.render(Ke[En]/pn,Xt[En])}else if(Z.isInstancedMesh)Et.renderInstances(Mt,Wt,Z.count);else if(ae.isInstancedBufferGeometry){const Ke=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,Xt=Math.min(ae.instanceCount,Ke);Et.renderInstances(Mt,Wt,Xt)}else Et.render(Mt,Wt)};function wt(R,$,ae){R.transparent===!0&&R.side===Hi&&R.forceSinglePass===!1?(R.side=Fn,R.needsUpdate=!0,rs(R,$,ae),R.side=wr,R.needsUpdate=!0,rs(R,$,ae),R.side=Hi):rs(R,$,ae)}this.compile=function(R,$,ae=null){ae===null&&(ae=R),v=ft.get(ae),v.init($),D.push(v),ae.traverseVisible(function(Z){Z.isLight&&Z.layers.test($.layers)&&(v.pushLight(Z),Z.castShadow&&v.pushShadow(Z))}),R!==ae&&R.traverseVisible(function(Z){Z.isLight&&Z.layers.test($.layers)&&(v.pushLight(Z),Z.castShadow&&v.pushShadow(Z))}),v.setupLights();const te=new Set;return R.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const we=Z.material;if(we)if(Array.isArray(we))for(let Le=0;Le<we.length;Le++){const Oe=we[Le];wt(Oe,ae,Z),te.add(Oe)}else wt(we,ae,Z),te.add(we)}),D.pop(),v=null,te},this.compileAsync=function(R,$,ae=null){const te=this.compile(R,$,ae);return new Promise(Z=>{function we(){if(te.forEach(function(Le){Ue.get(Le).currentProgram.isReady()&&te.delete(Le)}),te.size===0){Z(R);return}setTimeout(we,10)}it.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Rn=null;function Mn(R){Rn&&Rn(R)}function is(){Ti.stop()}function qi(){Ti.start()}const Ti=new bg;Ti.setAnimationLoop(Mn),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(R){Rn=R,fe.setAnimationLoop(R),R===null?Ti.stop():Ti.start()},fe.addEventListener("sessionstart",is),fe.addEventListener("sessionend",qi),this.render=function(R,$){if($!==void 0&&$.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(fe.cameraAutoUpdate===!0&&fe.updateCamera($),$=fe.getCamera()),R.isScene===!0&&R.onBeforeRender(b,R,$,V),v=ft.get(R,D.length),v.init($),D.push(v),ve.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),G.setFromProjectionMatrix(ve),he=this.localClippingEnabled,re=Ee.init(this.clippingPlanes,he),S=Fe.get(R,F.length),S.init(),F.push(S),fe.enabled===!0&&fe.isPresenting===!0){const we=b.xr.getDepthSensingMesh();we!==null&&wi(we,$,-1/0,b.sortObjects)}wi(R,$,0,b.sortObjects),S.finish(),b.sortObjects===!0&&S.sort(pe,L),nt=fe.enabled===!1||fe.isPresenting===!1||fe.hasDepthSensing()===!1,nt&&Ze.addToRenderList(S,R),this.info.render.frame++,re===!0&&Ee.beginShadows();const ae=v.state.shadowsArray;ze.render(ae,R,$),re===!0&&Ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const te=S.opaque,Z=S.transmissive;if(v.setupLights(),$.isArrayCamera){const we=$.cameras;if(Z.length>0)for(let Le=0,Oe=we.length;Le<Oe;Le++){const Ge=we[Le];Rr(te,Z,R,Ge)}nt&&Ze.render(R);for(let Le=0,Oe=we.length;Le<Oe;Le++){const Ge=we[Le];Cr(S,R,Ge,Ge.viewport)}}else Z.length>0&&Rr(te,Z,R,$),nt&&Ze.render(R),Cr(S,R,$);V!==null&&k===0&&(N.updateMultisampleRenderTarget(V),N.updateRenderTargetMipmap(V)),R.isScene===!0&&R.onAfterRender(b,R,$),Lt.resetDefaultState(),P=-1,C=null,D.pop(),D.length>0?(v=D[D.length-1],re===!0&&Ee.setGlobalState(b.clippingPlanes,v.state.camera)):v=null,F.pop(),F.length>0?S=F[F.length-1]:S=null};function wi(R,$,ae,te){if(R.visible===!1)return;if(R.layers.test($.layers)){if(R.isGroup)ae=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update($);else if(R.isLight)v.pushLight(R),R.castShadow&&v.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||G.intersectsSprite(R)){te&&Re.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ve);const Le=ge.update(R),Oe=R.material;Oe.visible&&S.push(R,Le,Oe,ae,Re.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||G.intersectsObject(R))){const Le=ge.update(R),Oe=R.material;if(te&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Re.copy(R.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Re.copy(Le.boundingSphere.center)),Re.applyMatrix4(R.matrixWorld).applyMatrix4(ve)),Array.isArray(Oe)){const Ge=Le.groups;for(let at=0,rt=Ge.length;at<rt;at++){const Xe=Ge[at],Mt=Oe[Xe.materialIndex];Mt&&Mt.visible&&S.push(R,Le,Mt,ae,Re.z,Xe)}}else Oe.visible&&S.push(R,Le,Oe,ae,Re.z,null)}}const we=R.children;for(let Le=0,Oe=we.length;Le<Oe;Le++)wi(we[Le],$,ae,te)}function Cr(R,$,ae,te){const Z=R.opaque,we=R.transmissive,Le=R.transparent;v.setupLightsView(ae),re===!0&&Ee.setGlobalState(b.clippingPlanes,ae),te&&Be.viewport(z.copy(te)),Z.length>0&&Yi(Z,$,ae),we.length>0&&Yi(we,$,ae),Le.length>0&&Yi(Le,$,ae),Be.buffers.depth.setTest(!0),Be.buffers.depth.setMask(!0),Be.buffers.color.setMask(!0),Be.setPolygonOffset(!1)}function Rr(R,$,ae,te){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[te.id]===void 0&&(v.state.transmissionRenderTarget[te.id]=new ns(1,1,{generateMipmaps:!0,type:it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float")?Yo:Xi,minFilter:Qr,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:bt.workingColorSpace}));const we=v.state.transmissionRenderTarget[te.id],Le=te.viewport||z;we.setSize(Le.z*b.transmissionResolutionScale,Le.w*b.transmissionResolutionScale);const Oe=b.getRenderTarget();b.setRenderTarget(we),b.getClearColor(ne),de=b.getClearAlpha(),de<1&&b.setClearColor(16777215,.5),b.clear(),nt&&Ze.render(ae);const Ge=b.toneMapping;b.toneMapping=Tr;const at=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),v.setupLightsView(te),re===!0&&Ee.setGlobalState(b.clippingPlanes,te),Yi(R,ae,te),N.updateMultisampleRenderTarget(we),N.updateRenderTargetMipmap(we),it.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let Xe=0,Mt=$.length;Xe<Mt;Xe++){const dt=$[Xe],Wt=dt.object,kt=dt.geometry,Et=dt.material,Ke=dt.group;if(Et.side===Hi&&Wt.layers.test(te.layers)){const Xt=Et.side;Et.side=Fn,Et.needsUpdate=!0,Qo(Wt,ae,te,kt,Et,Ke),Et.side=Xt,Et.needsUpdate=!0,rt=!0}}rt===!0&&(N.updateMultisampleRenderTarget(we),N.updateRenderTargetMipmap(we))}b.setRenderTarget(Oe),b.setClearColor(ne,de),at!==void 0&&(te.viewport=at),b.toneMapping=Ge}function Yi(R,$,ae){const te=$.isScene===!0?$.overrideMaterial:null;for(let Z=0,we=R.length;Z<we;Z++){const Le=R[Z],Oe=Le.object,Ge=Le.geometry,at=te===null?Le.material:te,rt=Le.group;Oe.layers.test(ae.layers)&&Qo(Oe,$,ae,Ge,at,rt)}}function Qo(R,$,ae,te,Z,we){R.onBeforeRender(b,$,ae,te,Z,we),R.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Z.onBeforeRender(b,$,ae,te,R,we),Z.transparent===!0&&Z.side===Hi&&Z.forceSinglePass===!1?(Z.side=Fn,Z.needsUpdate=!0,b.renderBufferDirect(ae,$,te,Z,R,we),Z.side=wr,Z.needsUpdate=!0,b.renderBufferDirect(ae,$,te,Z,R,we),Z.side=Hi):b.renderBufferDirect(ae,$,te,Z,R,we),R.onAfterRender(b,$,ae,te,Z,we)}function rs(R,$,ae){$.isScene!==!0&&($=Je);const te=Ue.get(R),Z=v.state.lights,we=v.state.shadowsArray,Le=Z.state.version,Oe=je.getParameters(R,Z.state,we,$,ae),Ge=je.getProgramCacheKey(Oe);let at=te.programs;te.environment=R.isMeshStandardMaterial?$.environment:null,te.fog=$.fog,te.envMap=(R.isMeshStandardMaterial?se:w).get(R.envMap||te.environment),te.envMapRotation=te.environment!==null&&R.envMap===null?$.environmentRotation:R.envMapRotation,at===void 0&&(R.addEventListener("dispose",ut),at=new Map,te.programs=at);let rt=at.get(Ge);if(rt!==void 0){if(te.currentProgram===rt&&te.lightsStateVersion===Le)return hi(R,Oe),rt}else Oe.uniforms=je.getUniforms(R),R.onBeforeCompile(Oe,b),rt=je.acquireProgram(Oe,Ge),at.set(Ge,rt),te.uniforms=Oe.uniforms;const Xe=te.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Xe.clippingPlanes=Ee.uniform),hi(R,Oe),te.needsLights=Gl(R),te.lightsStateVersion=Le,te.needsLights&&(Xe.ambientLightColor.value=Z.state.ambient,Xe.lightProbe.value=Z.state.probe,Xe.directionalLights.value=Z.state.directional,Xe.directionalLightShadows.value=Z.state.directionalShadow,Xe.spotLights.value=Z.state.spot,Xe.spotLightShadows.value=Z.state.spotShadow,Xe.rectAreaLights.value=Z.state.rectArea,Xe.ltc_1.value=Z.state.rectAreaLTC1,Xe.ltc_2.value=Z.state.rectAreaLTC2,Xe.pointLights.value=Z.state.point,Xe.pointLightShadows.value=Z.state.pointShadow,Xe.hemisphereLights.value=Z.state.hemi,Xe.directionalShadowMap.value=Z.state.directionalShadowMap,Xe.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Xe.spotShadowMap.value=Z.state.spotShadowMap,Xe.spotLightMatrix.value=Z.state.spotLightMatrix,Xe.spotLightMap.value=Z.state.spotLightMap,Xe.pointShadowMap.value=Z.state.pointShadowMap,Xe.pointShadowMatrix.value=Z.state.pointShadowMatrix),te.currentProgram=rt,te.uniformsList=null,rt}function ea(R){if(R.uniformsList===null){const $=R.currentProgram.getUniforms();R.uniformsList=Fl.seqWithValue($.seq,R.uniforms)}return R.uniformsList}function hi(R,$){const ae=Ue.get(R);ae.outputColorSpace=$.outputColorSpace,ae.batching=$.batching,ae.batchingColor=$.batchingColor,ae.instancing=$.instancing,ae.instancingColor=$.instancingColor,ae.instancingMorph=$.instancingMorph,ae.skinning=$.skinning,ae.morphTargets=$.morphTargets,ae.morphNormals=$.morphNormals,ae.morphColors=$.morphColors,ae.morphTargetsCount=$.morphTargetsCount,ae.numClippingPlanes=$.numClippingPlanes,ae.numIntersection=$.numClipIntersection,ae.vertexAlphas=$.vertexAlphas,ae.vertexTangents=$.vertexTangents,ae.toneMapping=$.toneMapping}function ta(R,$,ae,te,Z){$.isScene!==!0&&($=Je),N.resetTextureUnits();const we=$.fog,Le=te.isMeshStandardMaterial?$.environment:null,Oe=V===null?b.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Zs,Ge=(te.isMeshStandardMaterial?se:w).get(te.envMap||Le),at=te.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,rt=!!ae.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Xe=!!ae.morphAttributes.position,Mt=!!ae.morphAttributes.normal,dt=!!ae.morphAttributes.color;let Wt=Tr;te.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(Wt=b.toneMapping);const kt=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Et=kt!==void 0?kt.length:0,Ke=Ue.get(te),Xt=v.state.lights;if(re===!0&&(he===!0||R!==C)){const un=R===C&&te.id===P;Ee.setState(te,R,un)}let yt=!1;te.version===Ke.__version?(Ke.needsLights&&Ke.lightsStateVersion!==Xt.state.version||Ke.outputColorSpace!==Oe||Z.isBatchedMesh&&Ke.batching===!1||!Z.isBatchedMesh&&Ke.batching===!0||Z.isBatchedMesh&&Ke.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Ke.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Ke.instancing===!1||!Z.isInstancedMesh&&Ke.instancing===!0||Z.isSkinnedMesh&&Ke.skinning===!1||!Z.isSkinnedMesh&&Ke.skinning===!0||Z.isInstancedMesh&&Ke.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Ke.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Ke.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Ke.instancingMorph===!1&&Z.morphTexture!==null||Ke.envMap!==Ge||te.fog===!0&&Ke.fog!==we||Ke.numClippingPlanes!==void 0&&(Ke.numClippingPlanes!==Ee.numPlanes||Ke.numIntersection!==Ee.numIntersection)||Ke.vertexAlphas!==at||Ke.vertexTangents!==rt||Ke.morphTargets!==Xe||Ke.morphNormals!==Mt||Ke.morphColors!==dt||Ke.toneMapping!==Wt||Ke.morphTargetsCount!==Et)&&(yt=!0):(yt=!0,Ke.__version=te.version);let pn=Ke.currentProgram;yt===!0&&(pn=rs(te,$,Z));let $i=!1,En=!1,Ai=!1;const Nt=pn.getUniforms(),mn=Ke.uniforms;if(Be.useProgram(pn.program)&&($i=!0,En=!0,Ai=!0),te.id!==P&&(P=te.id,En=!0),$i||C!==R){Be.buffers.depth.getReversed()?(le.copy(R.projectionMatrix),__(le),x_(le),Nt.setValue(O,"projectionMatrix",le)):Nt.setValue(O,"projectionMatrix",R.projectionMatrix),Nt.setValue(O,"viewMatrix",R.matrixWorldInverse);const sn=Nt.map.cameraPosition;sn!==void 0&&sn.setValue(O,Ce.setFromMatrixPosition(R.matrixWorld)),tt.logarithmicDepthBuffer&&Nt.setValue(O,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Nt.setValue(O,"isOrthographic",R.isOrthographicCamera===!0),C!==R&&(C=R,En=!0,Ai=!0)}if(Z.isSkinnedMesh){Nt.setOptional(O,Z,"bindMatrix"),Nt.setOptional(O,Z,"bindMatrixInverse");const un=Z.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),Nt.setValue(O,"boneTexture",un.boneTexture,N))}Z.isBatchedMesh&&(Nt.setOptional(O,Z,"batchingTexture"),Nt.setValue(O,"batchingTexture",Z._matricesTexture,N),Nt.setOptional(O,Z,"batchingIdTexture"),Nt.setValue(O,"batchingIdTexture",Z._indirectTexture,N),Nt.setOptional(O,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Nt.setValue(O,"batchingColorTexture",Z._colorsTexture,N));const rn=ae.morphAttributes;if((rn.position!==void 0||rn.normal!==void 0||rn.color!==void 0)&&ot.update(Z,ae,pn),(En||Ke.receiveShadow!==Z.receiveShadow)&&(Ke.receiveShadow=Z.receiveShadow,Nt.setValue(O,"receiveShadow",Z.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(mn.envMap.value=Ge,mn.flipEnvMap.value=Ge.isCubeTexture&&Ge.isRenderTargetTexture===!1?-1:1),te.isMeshStandardMaterial&&te.envMap===null&&$.environment!==null&&(mn.envMapIntensity.value=$.environmentIntensity),En&&(Nt.setValue(O,"toneMappingExposure",b.toneMappingExposure),Ke.needsLights&&na(mn,Ai),we&&te.fog===!0&&be.refreshFogUniforms(mn,we),be.refreshMaterialUniforms(mn,te,B,ue,v.state.transmissionRenderTarget[R.id]),Fl.upload(O,ea(Ke),mn,N)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(Fl.upload(O,ea(Ke),mn,N),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Nt.setValue(O,"center",Z.center),Nt.setValue(O,"modelViewMatrix",Z.modelViewMatrix),Nt.setValue(O,"normalMatrix",Z.normalMatrix),Nt.setValue(O,"modelMatrix",Z.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const un=te.uniformsGroups;for(let sn=0,At=un.length;sn<At;sn++){const pi=un[sn];Y.update(pi,pn),Y.bind(pi,pn)}}return pn}function na(R,$){R.ambientLightColor.needsUpdate=$,R.lightProbe.needsUpdate=$,R.directionalLights.needsUpdate=$,R.directionalLightShadows.needsUpdate=$,R.pointLights.needsUpdate=$,R.pointLightShadows.needsUpdate=$,R.spotLights.needsUpdate=$,R.spotLightShadows.needsUpdate=$,R.rectAreaLights.needsUpdate=$,R.hemisphereLights.needsUpdate=$}function Gl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(R,$,ae){Ue.get(R.texture).__webglTexture=$,Ue.get(R.depthTexture).__webglTexture=ae;const te=Ue.get(R);te.__hasExternalTextures=!0,te.__autoAllocateDepthBuffer=ae===void 0,te.__autoAllocateDepthBuffer||it.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,$){const ae=Ue.get(R);ae.__webglFramebuffer=$,ae.__useDefaultFramebuffer=$===void 0};const ia=O.createFramebuffer();this.setRenderTarget=function(R,$=0,ae=0){V=R,I=$,k=ae;let te=!0,Z=null,we=!1,Le=!1;if(R){const Ge=Ue.get(R);if(Ge.__useDefaultFramebuffer!==void 0)Be.bindFramebuffer(O.FRAMEBUFFER,null),te=!1;else if(Ge.__webglFramebuffer===void 0)N.setupRenderTarget(R);else if(Ge.__hasExternalTextures)N.rebindTextures(R,Ue.get(R.texture).__webglTexture,Ue.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Xe=R.depthTexture;if(Ge.__boundDepthTexture!==Xe){if(Xe!==null&&Ue.has(Xe)&&(R.width!==Xe.image.width||R.height!==Xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(R)}}const at=R.texture;(at.isData3DTexture||at.isDataArrayTexture||at.isCompressedArrayTexture)&&(Le=!0);const rt=Ue.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(rt[$])?Z=rt[$][ae]:Z=rt[$],we=!0):R.samples>0&&N.useMultisampledRTT(R)===!1?Z=Ue.get(R).__webglMultisampledFramebuffer:Array.isArray(rt)?Z=rt[ae]:Z=rt,z.copy(R.viewport),J.copy(R.scissor),X=R.scissorTest}else z.copy(M).multiplyScalar(B).floor(),J.copy(j).multiplyScalar(B).floor(),X=me;if(ae!==0&&(Z=ia),Be.bindFramebuffer(O.FRAMEBUFFER,Z)&&te&&Be.drawBuffers(R,Z),Be.viewport(z),Be.scissor(J),Be.setScissorTest(X),we){const Ge=Ue.get(R.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ge.__webglTexture,ae)}else if(Le){const Ge=Ue.get(R.texture),at=$;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ge.__webglTexture,ae,at)}else if(R!==null&&ae!==0){const Ge=Ue.get(R.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ge.__webglTexture,ae)}P=-1},this.readRenderTargetPixels=function(R,$,ae,te,Z,we,Le){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=Ue.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(Oe=Oe[Le]),Oe){Be.bindFramebuffer(O.FRAMEBUFFER,Oe);try{const Ge=R.texture,at=Ge.format,rt=Ge.type;if(!tt.textureFormatReadable(at)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!tt.textureTypeReadable(rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=R.width-te&&ae>=0&&ae<=R.height-Z&&O.readPixels($,ae,te,Z,ct.convert(at),ct.convert(rt),we)}finally{const Ge=V!==null?Ue.get(V).__webglFramebuffer:null;Be.bindFramebuffer(O.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(R,$,ae,te,Z,we,Le){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=Ue.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(Oe=Oe[Le]),Oe){const Ge=R.texture,at=Ge.format,rt=Ge.type;if(!tt.textureFormatReadable(at))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!tt.textureTypeReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if($>=0&&$<=R.width-te&&ae>=0&&ae<=R.height-Z){Be.bindFramebuffer(O.FRAMEBUFFER,Oe);const Xe=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Xe),O.bufferData(O.PIXEL_PACK_BUFFER,we.byteLength,O.STREAM_READ),O.readPixels($,ae,te,Z,ct.convert(at),ct.convert(rt),0);const Mt=V!==null?Ue.get(V).__webglFramebuffer:null;Be.bindFramebuffer(O.FRAMEBUFFER,Mt);const dt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await v_(O,dt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Xe),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,we),O.deleteBuffer(Xe),O.deleteSync(dt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,$=null,ae=0){R.isTexture!==!0&&(Hs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),$=arguments[0]||null,R=arguments[1]);const te=Math.pow(2,-ae),Z=Math.floor(R.image.width*te),we=Math.floor(R.image.height*te),Le=$!==null?$.x:0,Oe=$!==null?$.y:0;N.setTexture2D(R,0),O.copyTexSubImage2D(O.TEXTURE_2D,ae,0,0,Le,Oe,Z,we),Be.unbindTexture()};const ra=O.createFramebuffer(),sa=O.createFramebuffer();this.copyTextureToTexture=function(R,$,ae=null,te=null,Z=0,we=null){R.isTexture!==!0&&(Hs("WebGLRenderer: copyTextureToTexture function signature has changed."),te=arguments[0]||null,R=arguments[1],$=arguments[2],we=arguments[3]||0,ae=null),we===null&&(Z!==0?(Hs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),we=Z,Z=0):we=0);let Le,Oe,Ge,at,rt,Xe,Mt,dt,Wt;const kt=R.isCompressedTexture?R.mipmaps[we]:R.image;if(ae!==null)Le=ae.max.x-ae.min.x,Oe=ae.max.y-ae.min.y,Ge=ae.isBox3?ae.max.z-ae.min.z:1,at=ae.min.x,rt=ae.min.y,Xe=ae.isBox3?ae.min.z:0;else{const rn=Math.pow(2,-Z);Le=Math.floor(kt.width*rn),Oe=Math.floor(kt.height*rn),R.isDataArrayTexture?Ge=kt.depth:R.isData3DTexture?Ge=Math.floor(kt.depth*rn):Ge=1,at=0,rt=0,Xe=0}te!==null?(Mt=te.x,dt=te.y,Wt=te.z):(Mt=0,dt=0,Wt=0);const Et=ct.convert($.format),Ke=ct.convert($.type);let Xt;$.isData3DTexture?(N.setTexture3D($,0),Xt=O.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(N.setTexture2DArray($,0),Xt=O.TEXTURE_2D_ARRAY):(N.setTexture2D($,0),Xt=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,$.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,$.unpackAlignment);const yt=O.getParameter(O.UNPACK_ROW_LENGTH),pn=O.getParameter(O.UNPACK_IMAGE_HEIGHT),$i=O.getParameter(O.UNPACK_SKIP_PIXELS),En=O.getParameter(O.UNPACK_SKIP_ROWS),Ai=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,kt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,kt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,at),O.pixelStorei(O.UNPACK_SKIP_ROWS,rt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Xe);const Nt=R.isDataArrayTexture||R.isData3DTexture,mn=$.isDataArrayTexture||$.isData3DTexture;if(R.isDepthTexture){const rn=Ue.get(R),un=Ue.get($),sn=Ue.get(rn.__renderTarget),At=Ue.get(un.__renderTarget);Be.bindFramebuffer(O.READ_FRAMEBUFFER,sn.__webglFramebuffer),Be.bindFramebuffer(O.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let pi=0;pi<Ge;pi++)Nt&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ue.get(R).__webglTexture,Z,Xe+pi),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ue.get($).__webglTexture,we,Wt+pi)),O.blitFramebuffer(at,rt,Le,Oe,Mt,dt,Le,Oe,O.DEPTH_BUFFER_BIT,O.NEAREST);Be.bindFramebuffer(O.READ_FRAMEBUFFER,null),Be.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(Z!==0||R.isRenderTargetTexture||Ue.has(R)){const rn=Ue.get(R),un=Ue.get($);Be.bindFramebuffer(O.READ_FRAMEBUFFER,ra),Be.bindFramebuffer(O.DRAW_FRAMEBUFFER,sa);for(let sn=0;sn<Ge;sn++)Nt?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,rn.__webglTexture,Z,Xe+sn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,rn.__webglTexture,Z),mn?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,un.__webglTexture,we,Wt+sn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,un.__webglTexture,we),Z!==0?O.blitFramebuffer(at,rt,Le,Oe,Mt,dt,Le,Oe,O.COLOR_BUFFER_BIT,O.NEAREST):mn?O.copyTexSubImage3D(Xt,we,Mt,dt,Wt+sn,at,rt,Le,Oe):O.copyTexSubImage2D(Xt,we,Mt,dt,at,rt,Le,Oe);Be.bindFramebuffer(O.READ_FRAMEBUFFER,null),Be.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else mn?R.isDataTexture||R.isData3DTexture?O.texSubImage3D(Xt,we,Mt,dt,Wt,Le,Oe,Ge,Et,Ke,kt.data):$.isCompressedArrayTexture?O.compressedTexSubImage3D(Xt,we,Mt,dt,Wt,Le,Oe,Ge,Et,kt.data):O.texSubImage3D(Xt,we,Mt,dt,Wt,Le,Oe,Ge,Et,Ke,kt):R.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,we,Mt,dt,Le,Oe,Et,Ke,kt.data):R.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,we,Mt,dt,kt.width,kt.height,Et,kt.data):O.texSubImage2D(O.TEXTURE_2D,we,Mt,dt,Le,Oe,Et,Ke,kt);O.pixelStorei(O.UNPACK_ROW_LENGTH,yt),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,pn),O.pixelStorei(O.UNPACK_SKIP_PIXELS,$i),O.pixelStorei(O.UNPACK_SKIP_ROWS,En),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ai),we===0&&$.generateMipmaps&&O.generateMipmap(Xt),Be.unbindTexture()},this.copyTextureToTexture3D=function(R,$,ae=null,te=null,Z=0){return R.isTexture!==!0&&(Hs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ae=arguments[0]||null,te=arguments[1]||null,R=arguments[2],$=arguments[3],Z=arguments[4]||0),Hs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,$,ae,te,Z)},this.initRenderTarget=function(R){Ue.get(R).__webglFramebuffer===void 0&&N.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?N.setTextureCube(R,0):R.isData3DTexture?N.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?N.setTexture2DArray(R,0):N.setTexture2D(R,0),Be.unbindTexture()},this.resetState=function(){I=0,k=0,V=null,Be.reset(),Lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=bt._getDrawingBufferColorSpace(e),t.unpackColorSpace=bt._getUnpackColorSpace()}}let _t=null,Go=null,Wo=null,Mi=null,$r=null,Bo=null,es=null;function Vm(){if(!_t)try{const s=window.AudioContext||window.webkitAudioContext;_t=new s,Go=_t.createOscillator(),Wo=_t.createOscillator(),Go.type="sawtooth",Wo.type="triangle",$r=_t.createBiquadFilter(),$r.type="lowpass",$r.frequency.value=800,Mi=_t.createGain(),Mi.gain.value=0,Go.connect($r),Wo.connect($r),$r.connect(Mi),Mi.connect(_t.destination),Go.start(),Wo.start();const e=_t.sampleRate*2,t=_t.createBuffer(1,e,_t.sampleRate),r=t.getChannelData(0);for(let l=0;l<e;l++)r[l]=Math.random()*2-1;Bo=_t.createBufferSource(),Bo.buffer=t,Bo.loop=!0;const a=_t.createBiquadFilter();a.type="bandpass",a.frequency.value=400,a.Q.value=1,es=_t.createGain(),es.gain.value=0,Bo.connect(a),a.connect(es),es.connect(_t.destination),Bo.start()}catch(s){console.warn("Web Audio API not supported",s)}}function JE(s,e,t){if(!_t)return;_t.state==="suspended"&&_t.resume();const r=_t.currentTime,a=60+s/15e3*650;Go.frequency.setTargetAtTime(a,r,.03),Wo.frequency.setTargetAtTime(a*1.5,r,.03),$r.frequency.setTargetAtTime(300+s/15e3*3500,r,.05);const l=.08+Math.min(.25,s/15e3*.22);Mi.gain.setTargetAtTime(l,r,.05);const u=Math.min(.18,t/350*.18);es.gain.setTargetAtTime(u,r,.08)}function QE(){if(!_t)return;const s=_t.currentTime;Mi&&(Mi.gain.setValueAtTime(.01,s),Mi.gain.exponentialRampToValueAtTime(.2,s+.08));const e=_t.createOscillator(),t=_t.createGain();e.type="triangle",e.frequency.setValueAtTime(120,s),e.frequency.exponentialRampToValueAtTime(30,s+.05),t.gain.setValueAtTime(.3,s),t.gain.exponentialRampToValueAtTime(.001,s+.05),e.connect(t),t.connect(_t.destination),e.start(s),e.stop(s+.05)}function e1(s=.5){if(!_t)return;const e=_t.currentTime,t=_t.createOscillator(),r=_t.createGain();t.type="sawtooth",t.frequency.setValueAtTime(800+Math.random()*200,e),r.gain.setValueAtTime(.08*s,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),t.connect(r),r.connect(_t.destination),t.start(e),t.stop(e+.15)}function Gm(s=!1){if(!_t)return;const e=_t.currentTime,t=_t.createOscillator(),r=_t.createGain();t.type="sine",t.frequency.setValueAtTime(s?1200:440,e),r.gain.setValueAtTime(.3,e),r.gain.exponentialRampToValueAtTime(.001,e+(s?.4:.2)),t.connect(r),r.connect(_t.destination),t.start(e),t.stop(e+(s?.4:.2))}function of(){Mi&&_t&&Mi.gain.setValueAtTime(0,_t.currentTime),es&&_t&&es.gain.setValueAtTime(0,_t.currentTime)}function t1({playerCar:s,aiCars:e,track:t,cameraMode:r="chase",weather:a="clear",quality:l="high",isRacing:u=!1}){const f=St.useRef(null),h=St.useRef(null),m=St.useRef(null),g=St.useRef(null),_=St.useRef({});St.useRef({});const x=St.useRef(null);return St.useEffect(()=>{const y=f.current;if(!y)return;const E=y.clientWidth,A=y.clientHeight,S=new W_;h.current=S;const v=new Qn(65,E/A,.1,2e3);g.current=v;const F=new ZE({antialias:l!=="low",alpha:!1});F.setPixelRatio(Math.min(window.devicePixelRatio,l==="ultra"?2:1.5)),F.setSize(E,A),F.shadowMap.enabled=l==="ultra"||l==="high",F.shadowMap.type=$m,m.current=F,y.appendChild(F.domElement);let D=t.skyColor||988970;t.groundColor;let b=t.fogColor||988970;S.background=new Tt(D),S.fog=new id(b,.0015);const W=new px(16777215,t.ambientLight||.7);S.add(W);const I=new hx(t.environment==="sunset"?16755285:t.environment==="night"?3718648:16777215,t.environment==="night"?.4:1.2),k=t.sunPosition||[100,150,80];I.position.set(k[0],k[1],k[2]),(l==="ultra"||l==="high")&&(I.castShadow=!0,I.shadow.mapSize.width=2048,I.shadow.mapSize.height=2048,I.shadow.camera.near=10,I.shadow.camera.far=800,I.shadow.camera.left=-200,I.shadow.camera.right=200,I.shadow.camera.top=200,I.shadow.camera.bottom=-200),S.add(I),n1(S,t);const V=Wm(s.primaryColor,s.secondaryColor);if(S.add(V),_.current.player=V,e.forEach(J=>{const X=Wm(16713796,16757145);S.add(X),_.current[J.id]=X}),a==="rain"||l!=="low"){const J=a==="rain"?3e3:500,X=new Wn,ne=new Float32Array(J*3);for(let ue=0;ue<J*3;ue+=3)ne[ue]=(Math.random()-.5)*300,ne[ue+1]=Math.random()*100,ne[ue+2]=(Math.random()-.5)*300;X.setAttribute("position",new di(ne,3));const de=new Mg({color:a==="rain"?10875900:16777215,size:a==="rain"?.8:1.5,transparent:!0,opacity:.6}),oe=new q_(X,de);S.add(oe),x.current=oe}const P=()=>{if(!y||!F||!v)return;const J=y.clientWidth,X=y.clientHeight;v.aspect=J/X,v.updateProjectionMatrix(),F.setSize(J,X)};window.addEventListener("resize",P);let C;const z=()=>{C=requestAnimationFrame(z);const J=_.current.player;if(J&&s){J.position.set(s.x,0,s.z),J.rotation.y=s.heading;const X=J.userData.frontWheels;X&&X.forEach(ne=>{ne.rotation.y=s.steeringAngle*1.2})}if(e.forEach(X=>{const ne=_.current[X.id];ne&&X.state&&(ne.position.set(X.state.x,0,X.state.z),ne.rotation.y=X.state.heading)}),v&&s){if(r==="chase"){const de=s.x-Math.sin(s.heading)*12,oe=s.z-Math.cos(s.heading)*12;v.position.x+=(de-v.position.x)*.15,v.position.y+=(4.5-v.position.y)*.15,v.position.z+=(oe-v.position.z)*.15;const ue=s.x+Math.sin(s.heading)*10,B=s.z+Math.cos(s.heading)*10;v.lookAt(ue,1.5,B)}else if(r==="hood"){v.position.set(s.x+Math.sin(s.heading)*1.5,1.8,s.z+Math.cos(s.heading)*1.5);const X=s.x+Math.sin(s.heading)*30,ne=s.z+Math.cos(s.heading)*30;v.lookAt(X,1.2,ne)}else if(r==="cockpit"){v.position.set(s.x+Math.sin(s.heading)*.2,1.2,s.z+Math.cos(s.heading)*.2);const X=s.x+Math.sin(s.heading)*20,ne=s.z+Math.cos(s.heading)*20;v.lookAt(X,1,ne)}}if(x.current){const X=x.current.geometry.attributes.position.array;for(let ne=1;ne<X.length;ne+=3)X[ne]-=a==="rain"?2.5:.2,X[ne]<0&&(X[ne]=100);x.current.geometry.attributes.position.needsUpdate=!0}F.render(S,v)};return z(),()=>{cancelAnimationFrame(C),window.removeEventListener("resize",P),y&&F.domElement&&y.removeChild(F.domElement)}},[t,l,a,r]),Q.jsx("div",{ref:f,style:{position:"absolute",inset:0,width:"100%",height:"100%",overflow:"hidden",zIndex:0}})}function Wm(s=62206,e=5221630){const t=new Ho,r=new Sr({color:s,metalness:.8,roughness:.2}),a=new Sr({color:e,metalness:.7,roughness:.3}),l=new Sr({color:1118481,metalness:.9,roughness:.4}),u=new Sr({color:1973790,roughness:.9}),f=new yi(1.4,.7,4.2),h=new Gt(f,r);h.position.y=.6,t.add(h);const m=new yi(2.4,.1,.6),g=new Gt(m,a);g.position.set(0,.3,2.2),t.add(g);const _=new yi(2,.1,.8),x=new Gt(_,a);x.position.set(0,1.2,-2.1),t.add(x);const y=new yi(.1,.6,.8),E=new Gt(y,l);E.position.set(-.9,.9,-2.1);const A=new Gt(y,l);A.position.set(.9,.9,-2.1),t.add(E),t.add(A);const S=new ld(.4,.05,8,16,Math.PI),v=new Gt(S,l);v.rotation.x=Math.PI/2,v.position.set(0,1,.2),t.add(v);const F=new ad(.22,16,16),D=new Sr({color:16777215,metalness:.9}),b=new Gt(F,D);b.position.set(0,.9,-.2),t.add(b);const W=new yi(.3,.15,.1),I=new Sr({color:16711680,emissive:16711680,emissiveIntensity:.8}),k=new Gt(W,I);k.position.set(0,.5,-2.15),t.add(k);const V=new od(.45,.45,.4,24);V.rotateZ(Math.PI/2);const P=[],C=new Gt(V,u);C.position.set(-1.1,.45,1.6),t.add(C),P.push(C);const z=new Gt(V,u);z.position.set(1.1,.45,1.6),t.add(z),P.push(z);const J=new Gt(V,u);J.position.set(-1.15,.45,-1.5),t.add(J);const X=new Gt(V,u);return X.position.set(1.15,.45,-1.5),t.add(X),t.userData={frontWheels:P},t}function n1(s,e){const t=e.points;if(!t||t.length===0)return;const r=t.map(_=>new K(_.x,0,_.z)),a=new wg(r,!0),l=new cd(a,200,e.trackWidth/2,8,!0),u=new Sr({color:1976635,roughness:.85,metalness:.1}),f=new Gt(l,u);f.scale.y=.02,f.receiveShadow=!0,s.add(f);const h=new Jo(2e3,2e3),m=new Sr({color:e.environment==="sunset"?8138002:413243,roughness:.95}),g=new Gt(h,m);g.rotation.x=-Math.PI/2,g.position.y=-.1,g.receiveShadow=!0,s.add(g)}/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i1=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ig=(...s)=>s.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var r1={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s1=St.forwardRef(({color:s="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:r,className:a="",children:l,iconNode:u,...f},h)=>St.createElement("svg",{ref:h,...r1,width:e,height:e,stroke:s,strokeWidth:r?Number(t)*24/Number(e):t,className:Ig("lucide",a),...f},[...u.map(([m,g])=>St.createElement(m,g)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cn=(s,e)=>{const t=St.forwardRef(({className:r,...a},l)=>St.createElement(s1,{ref:l,iconNode:e,className:Ig(`lucide-${i1(s)}`,r),...a}));return t.displayName=`${s}`,t};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o1=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],a1=Cn("ArrowLeft",o1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l1=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],c1=Cn("ArrowRight",l1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u1=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],f1=Cn("Award",u1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d1=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],h1=Cn("Camera",d1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p1=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M16 14v6",key:"1j4efv"}],["path",{d:"M8 14v6",key:"17c4r9"}],["path",{d:"M12 16v6",key:"c8a4gj"}]],m1=Cn("CloudRain",p1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g1=[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],v1=Cn("Compass",g1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _1=[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]],x1=Cn("Flag",_1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y1=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],S1=Cn("House",y1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M1=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]],E1=Cn("Pause",M1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T1=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],Xm=Cn("Play",T1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w1=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Ug=Cn("RotateCcw",w1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A1=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],C1=Cn("Settings",A1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R1=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],b1=Cn("Sun",R1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P1=[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]],Fg=Cn("Trophy",P1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L1=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Og=Cn("Zap",L1);function D1({playerCar:s,aiCars:e,track:t,totalLaps:r=3,playerPosition:a=1,cameraMode:l,onToggleCamera:u,onPause:f}){const h=(s==null?void 0:s.speedKmH)||0,m=(s==null?void 0:s.rpm)||1500,g=(s==null?void 0:s.gear)||1,_=(s==null?void 0:s.lap)||1,x=(s==null?void 0:s.drsActive)||!1,y=Math.min(100,Math.max(0,(m-1500)/13e3*100));return Q.jsxs("div",{className:"hud-overlay",children:[Q.jsxs("div",{className:"hud-top-bar",children:[Q.jsxs("div",{className:"hud-badge hud-position",children:[Q.jsx("span",{className:"hud-label",children:"POS"}),Q.jsxs("span",{className:"hud-value-large",children:["P",a]}),Q.jsxs("span",{className:"hud-sub",children:["/ ",e.length+1]})]}),Q.jsxs("div",{className:"hud-badge hud-lap",children:[Q.jsx(x1,{size:18,color:"#00f2fe"}),Q.jsxs("div",{children:[Q.jsx("span",{className:"hud-label",children:"LAP"}),Q.jsxs("span",{className:"hud-value",children:[_," / ",r]})]})]}),Q.jsxs("div",{className:"hud-controls-group",children:[x&&Q.jsxs("div",{className:"hud-drs-badge animated-pulse",children:[Q.jsx(Og,{size:16,color:"#00f2fe"})," DRS READY"]}),Q.jsxs("button",{className:"hud-btn-icon",onClick:u,title:"Change Camera View",children:[Q.jsx(h1,{size:20}),Q.jsx("span",{style:{fontSize:"0.7rem",fontWeight:800},children:l.toUpperCase()})]}),Q.jsx("button",{className:"hud-btn-icon",onClick:f,title:"Pause Game",children:Q.jsx(E1,{size:20})})]})]}),Q.jsxs("div",{className:"hud-minimap-box",children:[Q.jsxs("div",{className:"hud-minimap-header",children:[Q.jsx(v1,{size:14,color:"#94a3b8"})," ",t.name.toUpperCase()]}),Q.jsxs("svg",{className:"hud-minimap-svg",viewBox:"-300 -500 700 1000",children:[Q.jsx("polyline",{points:t.points.map(E=>`${E.x},${E.z}`).join(" "),fill:"none",stroke:"rgba(255, 255, 255, 0.2)",strokeWidth:"14",strokeLinecap:"round",strokeLinejoin:"round"}),e.map((E,A)=>Q.jsx("circle",{cx:E.state.x,cy:E.state.z,r:"12",fill:"#ff0844"},A)),s&&Q.jsx("circle",{cx:s.x,cy:s.z,r:"16",fill:"#00f2fe",stroke:"#ffffff",strokeWidth:"4"})]})]}),Q.jsxs("div",{className:"hud-telemetry-box",children:[Q.jsxs("svg",{className:"hud-rpm-gauge",viewBox:"0 0 200 120",children:[Q.jsx("path",{d:"M 20 100 A 80 80 0 0 1 180 100",fill:"none",stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"12",strokeLinecap:"round"}),Q.jsx("path",{d:"M 20 100 A 80 80 0 0 1 180 100",fill:"none",stroke:y>85?"#ff0844":y>65?"#f59e0b":"#00f2fe",strokeWidth:"12",strokeDasharray:"251",strokeDashoffset:251-251*y/100,strokeLinecap:"round"})]}),Q.jsxs("div",{className:"hud-digital-readout",children:[Q.jsx("div",{className:"hud-gear",children:g}),Q.jsx("div",{className:"hud-speed",children:h}),Q.jsx("div",{className:"hud-unit",children:"KM/H"})]})]})]})}function N1({onSteerLeft:s,onSteerRight:e,onSteerRelease:t,onAccelerate:r,onAccelerateRelease:a,onBrake:l,onBrakeRelease:u,onActivateDrs:f,onResetCar:h}){return Q.jsxs("div",{className:"mobile-controls-layer",children:[Q.jsxs("div",{className:"touch-cluster-left",children:[Q.jsx("button",{className:"touch-btn steer-btn",onTouchStart:()=>s(1),onTouchEnd:t,onMouseDown:()=>s(1),onMouseUp:t,children:Q.jsx(a1,{size:36})}),Q.jsx("button",{className:"touch-btn steer-btn",onTouchStart:()=>e(1),onTouchEnd:t,onMouseDown:()=>e(1),onMouseUp:t,children:Q.jsx(c1,{size:36})})]}),Q.jsxs("div",{className:"touch-cluster-right",children:[Q.jsx("button",{className:"touch-btn brake-btn",onTouchStart:l,onTouchEnd:u,onMouseDown:l,onMouseUp:u,children:"BRAKE"}),Q.jsx("button",{className:"touch-btn accel-btn",onTouchStart:r,onTouchEnd:a,onMouseDown:r,onMouseUp:a,children:"DRIVE"})]}),Q.jsxs("div",{className:"touch-actions-top",children:[Q.jsxs("button",{className:"touch-action-btn",onClick:f,children:[Q.jsx(Og,{size:18,color:"#00f2fe"})," DRS"]}),Q.jsxs("button",{className:"touch-action-btn",onClick:h,children:[Q.jsx(Ug,{size:18})," RESET"]})]})]})}const kg=[{id:"apex-a1",name:"Apex A1",team:"Apex Racing Team",primaryColor:"#00f2fe",secondaryColor:"#4facfe",accentColor:"#ffffff",topSpeed:345,acceleration:9.2,braking:8.8,cornering:8.9,downforce:9,weight:798,description:"The flagship open-wheel aerodynamic monster built for maximum high-speed cornering stability.",livery:"cyber-cyan"},{id:"vortex-x",name:"Vortex X",team:"Vortex Motorsport",primaryColor:"#ff0844",secondaryColor:"#ffb199",accentColor:"#111111",topSpeed:358,acceleration:9.5,braking:8.2,cornering:8.1,downforce:8.2,weight:790,description:"Extreme straight-line rocket with blistering acceleration and raw top-end speed.",livery:"crimson-surge"},{id:"falcon-r",name:"Falcon R",team:"Falcon Precision Racing",primaryColor:"#f59e0b",secondaryColor:"#fbbf24",accentColor:"#000000",topSpeed:338,acceleration:8.7,braking:9.4,cornering:9.5,downforce:9.6,weight:795,description:"Unmatched cornering grip and precision braking for tight technical circuits.",livery:"amber-strike"},{id:"titan-gp",name:"Titan GP",team:"Titan Heavy Performance",primaryColor:"#10b981",secondaryColor:"#34d399",accentColor:"#ffffff",topSpeed:340,acceleration:8.5,braking:9,cornering:9,downforce:9.2,weight:805,description:"Highly consistent chassis with incredible durability and forgiving wet-weather traction.",livery:"emerald-flow"},{id:"phantom-f1",name:"Phantom F1",team:"Phantom Stealth Works",primaryColor:"#8b5cf6",secondaryColor:"#c084fc",accentColor:"#00f2fe",topSpeed:352,acceleration:9.1,braking:8.9,cornering:8.8,downforce:8.8,weight:792,description:"Advanced carbon-monocoque prototype combining high downforce with sleek low drag.",livery:"violet-nebula"},{id:"velocity-9",name:"Velocity 9",team:"Velocity Kinetic Labs",primaryColor:"#ec4899",secondaryColor:"#f472b6",accentColor:"#ffffff",topSpeed:348,acceleration:9.3,braking:8.6,cornering:8.6,downforce:8.7,weight:794,description:"Hybrid energy-recovery powertrain giving massive explosive bursts out of low-speed corners.",livery:"neon-magenta"},{id:"stealth-gt",name:"Stealth GT",team:"Shadow Apex Engineering",primaryColor:"#38bdf8",secondaryColor:"#0284c7",accentColor:"#ffffff",topSpeed:342,acceleration:8.9,braking:9.1,cornering:9.1,downforce:9,weight:796,description:"Ultra-balanced simcade setup engineered for effortless controllable drifts and quick recovery.",livery:"sky-force"},{id:"zenith-r",name:"Zenith R",team:"Zenith World Champions",primaryColor:"#eab308",secondaryColor:"#fef08a",accentColor:"#18181b",topSpeed:355,acceleration:9.4,braking:9.3,cornering:9.4,downforce:9.5,weight:791,description:"The ultimate championship-winning machine. Flawless aero, high downforce, and supreme top speed.",livery:"gold-crown"}],zg=[{id:"meridian-circuit",name:"Meridian Circuit",location:"Silverstone Valley",lengthKm:4.8,lapsDefault:3,turnsCount:14,description:"High-speed modern championship circuit featuring long DRS straights, sweeping double-apex curves, and grandstands.",environment:"day",skyColor:"#0f172a",groundColor:"#1e293b",fogColor:"#0f172a",ambientLight:.8,sunPosition:[100,150,80],weatherOptions:["clear","cloudy","rain"],trackWidth:14,points:[{x:0,z:-150,targetSpeed:340,isDrs:!0},{x:0,z:-350,targetSpeed:330,isDrs:!0},{x:50,z:-420,targetSpeed:140,isApex:!0},{x:150,z:-400,targetSpeed:210},{x:220,z:-250,targetSpeed:160,isApex:!0},{x:200,z:-100,targetSpeed:240},{x:300,z:50,targetSpeed:130,isApex:!0},{x:250,z:200,targetSpeed:220},{x:150,z:350,targetSpeed:150,isApex:!0},{x:0,z:400,targetSpeed:280},{x:-150,z:350,targetSpeed:160,isApex:!0},{x:-220,z:200,targetSpeed:260},{x:-250,z:0,targetSpeed:180,isApex:!0},{x:-180,z:-100,targetSpeed:300,isDrs:!0}]},{id:"kyoto-night",name:"Kyoto Night Street",location:"Kyoto Metropolitan",lengthKm:3.9,lapsDefault:3,turnsCount:16,description:"Challenging urban night track surrounded by glowing neon skyscrapers, tight barrier walls, and wet asphalt reflections.",environment:"night",skyColor:"#05070f",groundColor:"#0a0d1a",fogColor:"#070a14",ambientLight:.35,sunPosition:[0,80,-100],weatherOptions:["clear","rain"],trackWidth:12,points:[{x:0,z:-120,targetSpeed:310,isDrs:!0},{x:0,z:-280,targetSpeed:290,isDrs:!0},{x:40,z:-340,targetSpeed:110,isApex:!0},{x:120,z:-320,targetSpeed:180},{x:180,z:-200,targetSpeed:120,isApex:!0},{x:160,z:-80,targetSpeed:210},{x:240,z:40,targetSpeed:95,isApex:!0},{x:200,z:160,targetSpeed:190},{x:110,z:280,targetSpeed:120,isApex:!0},{x:0,z:320,targetSpeed:240},{x:-110,z:280,targetSpeed:120,isApex:!0},{x:-180,z:160,targetSpeed:220},{x:-200,z:0,targetSpeed:140,isApex:!0},{x:-140,z:-80,targetSpeed:260}]},{id:"desert-crown",name:"Desert Crown",location:"Sahara Oasis",lengthKm:5.4,lapsDefault:3,turnsCount:12,description:"Blistering fast desert circuit with long sweeping curves, warm sunset lighting, sand dunes, and high top speeds.",environment:"sunset",skyColor:"#2a1105",groundColor:"#451a03",fogColor:"#2a1105",ambientLight:.9,sunPosition:[-150,60,200],weatherOptions:["clear","cloudy"],trackWidth:15,points:[{x:0,z:-180,targetSpeed:350,isDrs:!0},{x:0,z:-400,targetSpeed:345,isDrs:!0},{x:70,z:-480,targetSpeed:160,isApex:!0},{x:200,z:-440,targetSpeed:250},{x:280,z:-280,targetSpeed:180,isApex:!0},{x:240,z:-100,targetSpeed:290},{x:350,z:80,targetSpeed:150,isApex:!0},{x:280,z:260,targetSpeed:260},{x:160,z:400,targetSpeed:170,isApex:!0},{x:0,z:450,targetSpeed:310},{x:-170,z:380,targetSpeed:180,isApex:!0},{x:-260,z:220,targetSpeed:280},{x:-280,z:0,targetSpeed:200,isApex:!0},{x:-200,z:-120,targetSpeed:330,isDrs:!0}]}];function I1({selectedCar:s,onSelectCar:e,selectedTrack:t,onSelectTrack:r,difficulty:a,onSelectDifficulty:l,weather:u,onSelectWeather:f,quality:h,onSelectQuality:m,onStartRace:g}){const[_,x]=St.useState("race");return Q.jsxs("div",{className:"main-menu-overlay screen-fade-enter",children:[Q.jsxs("div",{className:"brand-header",children:[Q.jsxs("h1",{className:"brand-title",children:["PROJECT ",Q.jsx("span",{className:"text-cyan",children:"APEX"})]}),Q.jsx("p",{className:"brand-subtitle",children:"HIGH-END WEB RACING EXPERIENCE"})]}),Q.jsxs("div",{className:"menu-nav-tabs",children:[Q.jsxs("button",{className:`menu-tab ${_==="race"?"active":""}`,onClick:()=>x("race"),children:[Q.jsx(Xm,{size:18})," QUICK RACE"]}),Q.jsxs("button",{className:`menu-tab ${_==="garage"?"active":""}`,onClick:()=>x("garage"),children:[Q.jsx(Fg,{size:18})," GARAGE"]}),Q.jsxs("button",{className:`menu-tab ${_==="settings"?"active":""}`,onClick:()=>x("settings"),children:[Q.jsx(C1,{size:18})," SETTINGS"]})]}),_==="race"&&Q.jsxs("div",{className:"menu-card glass-panel",children:[Q.jsxs("div",{className:"menu-section",children:[Q.jsx("h3",{className:"section-title",children:"SELECT CIRCUIT"}),Q.jsx("div",{className:"track-grid",children:zg.map(y=>Q.jsxs("button",{className:`track-card ${t.id===y.id?"active":""}`,onClick:()=>r(y),children:[Q.jsx("div",{className:"track-name",children:y.name}),Q.jsxs("div",{className:"track-info",children:[y.location," • ",y.lengthKm," KM"]})]},y.id))})]}),Q.jsxs("div",{className:"menu-section",children:[Q.jsx("h3",{className:"section-title",children:"AI DIFFICULTY"}),Q.jsx("div",{className:"difficulty-grid",children:["rookie","pro","apex","impossible"].map(y=>Q.jsx("button",{className:`diff-btn ${a===y?"active":""}`,onClick:()=>l(y),children:y==="impossible"?"CYBER GOD":y.toUpperCase()},y))})]}),Q.jsxs("div",{className:"menu-section",children:[Q.jsx("h3",{className:"section-title",children:"WEATHER & TIME"}),Q.jsxs("div",{className:"weather-grid",children:[Q.jsxs("button",{className:`weather-btn ${u==="clear"?"active":""}`,onClick:()=>f("clear"),children:[Q.jsx(b1,{size:18})," CLEAR"]}),Q.jsxs("button",{className:`weather-btn ${u==="rain"?"active":""}`,onClick:()=>f("rain"),children:[Q.jsx(m1,{size:18})," RAIN"]})]})]}),Q.jsxs("button",{className:"btn-primary start-race-btn",onClick:g,children:[Q.jsx(Xm,{size:24})," START RACE"]})]}),_==="garage"&&Q.jsxs("div",{className:"menu-card glass-panel",children:[Q.jsx("h3",{className:"section-title",children:"FORMULA FLEET"}),Q.jsx("div",{className:"car-selection-grid",children:kg.map(y=>Q.jsxs("button",{className:`car-card ${s.id===y.id?"active":""}`,onClick:()=>e(y),children:[Q.jsx("div",{className:"car-color-swatch",style:{background:y.primaryColor}}),Q.jsx("div",{className:"car-card-name",children:y.name}),Q.jsx("div",{className:"car-card-team",children:y.team}),Q.jsxs("div",{className:"car-card-speed",children:[y.topSpeed," KM/H"]})]},y.id))}),Q.jsxs("div",{className:"selected-car-specs",children:[Q.jsxs("h4",{children:[s.name," Technical Data"]}),Q.jsx("p",{children:s.description}),Q.jsxs("div",{className:"spec-bar-row",children:[Q.jsx("span",{children:"Top Speed"}),Q.jsx("div",{className:"bar-bg",children:Q.jsx("div",{className:"bar-fill",style:{width:`${s.topSpeed/360*100}%`}})})]}),Q.jsxs("div",{className:"spec-bar-row",children:[Q.jsx("span",{children:"Acceleration"}),Q.jsx("div",{className:"bar-bg",children:Q.jsx("div",{className:"bar-fill",style:{width:`${s.acceleration/10*100}%`}})})]}),Q.jsxs("div",{className:"spec-bar-row",children:[Q.jsx("span",{children:"Cornering"}),Q.jsx("div",{className:"bar-bg",children:Q.jsx("div",{className:"bar-fill",style:{width:`${s.cornering/10*100}%`}})})]})]})]}),_==="settings"&&Q.jsxs("div",{className:"menu-card glass-panel",children:[Q.jsx("h3",{className:"section-title",children:"GRAPHICS & PERFORMANCE PROFILE"}),Q.jsx("div",{className:"quality-grid",children:["ultra","high","medium","low"].map(y=>Q.jsx("button",{className:`quality-btn ${h===y?"active":""}`,onClick:()=>m(y),children:y.toUpperCase()},y))}),Q.jsxs("div",{className:"controls-guide",children:[Q.jsx("h4",{children:"KEYBOARD CONTROLS"}),Q.jsxs("p",{children:[Q.jsx("strong",{children:"W / Up Arrow:"})," Accelerate"]}),Q.jsxs("p",{children:[Q.jsx("strong",{children:"S / Down Arrow:"})," Brake / Reverse"]}),Q.jsxs("p",{children:[Q.jsx("strong",{children:"A / D or Left/Right Arrow:"})," Steering"]}),Q.jsxs("p",{children:[Q.jsx("strong",{children:"C:"})," Change Camera View"]}),Q.jsxs("p",{children:[Q.jsx("strong",{children:"Space:"})," DRS Boost"]}),Q.jsxs("p",{children:[Q.jsx("strong",{children:"Esc:"})," Pause Game"]})]})]})]})}function U1({onStartComplete:s}){const[e,t]=St.useState(0),[r,a]=St.useState(!1);return St.useEffect(()=>{let l;[1,2,3,4,5].forEach((h,m)=>{setTimeout(()=>{t(h),Gm(!1)},(m+1)*1e3)});const f=6500+Math.random()*1500;return l=setTimeout(()=>{t(0),a(!0),Gm(!0),setTimeout(()=>{s()},1e3)},f),()=>clearTimeout(l)},[]),Q.jsxs("div",{className:"race-start-overlay screen-fade-enter",children:[Q.jsx("div",{className:"gantry-light-box",children:[1,2,3,4,5].map(l=>Q.jsx("div",{className:`gantry-light ${l<=e?"red-on":r?"green-on":""}`},l))}),Q.jsx("div",{className:"start-banner-text",children:r?Q.jsx("span",{className:"text-green animated-pop",children:"LIGHTS OUT AND AWAY WE GO!"}):Q.jsx("span",{children:"GRID FORMATION"})})]})}var fd={};(function s(e,t,r,a){var l=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),u=typeof Path2D=="function"&&typeof DOMMatrix=="function",f=(function(){if(!e.OffscreenCanvas)return!1;try{var L=new OffscreenCanvas(1,1),M=L.getContext("2d");M.fillRect(0,0,1,1);var j=L.transferToImageBitmap();M.createPattern(j,"no-repeat")}catch{return!1}return!0})();function h(){}function m(L){var M=t.exports.Promise,j=M!==void 0?M:e.Promise;return typeof j=="function"?new j(L):(L(h,h),null)}var g=(function(L,M){return{transform:function(j){if(L)return j;if(M.has(j))return M.get(j);var me=new OffscreenCanvas(j.width,j.height),G=me.getContext("2d");return G.drawImage(j,0,0),M.set(j,me),me},clear:function(){M.clear()}}})(f,new Map),_=(function(){var L=Math.floor(16.666666666666668),M,j,me={},G=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(M=function(re){var he=Math.random();return me[he]=requestAnimationFrame(function le(ve){G===ve||G+L-1<ve?(G=ve,delete me[he],re()):me[he]=requestAnimationFrame(le)}),he},j=function(re){me[re]&&cancelAnimationFrame(me[re])}):(M=function(re){return setTimeout(re,L)},j=function(re){return clearTimeout(re)}),{frame:M,cancel:j}})(),x=(function(){var L,M,j={};function me(G){function re(he,le){G.postMessage({options:he||{},callback:le})}G.init=function(le){var ve=le.transferControlToOffscreen();G.postMessage({canvas:ve},[ve])},G.fire=function(le,ve,Ce){if(M)return re(le,null),M;var Re=Math.random().toString(36).slice(2);return M=m(function(Je){function nt($e){$e.data.callback===Re&&(delete j[Re],G.removeEventListener("message",nt),M=null,g.clear(),Ce(),Je())}G.addEventListener("message",nt),re(le,Re),j[Re]=nt.bind(null,{data:{callback:Re}})}),M},G.reset=function(){G.postMessage({reset:!0});for(var le in j)j[le](),delete j[le]}}return function(){if(L)return L;if(!r&&l){var G=["var CONFETTI, SIZE = {}, module = {};","("+s.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{L=new Worker(URL.createObjectURL(new Blob([G])))}catch(re){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",re),null}me(L)}return L}})(),y={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function E(L,M){return M?M(L):L}function A(L){return L!=null}function S(L,M,j){return E(L&&A(L[M])?L[M]:y[M],j)}function v(L){return L<0?0:Math.floor(L)}function F(L,M){return Math.floor(Math.random()*(M-L))+L}function D(L){return parseInt(L,16)}function b(L){return L.map(W)}function W(L){var M=String(L).replace(/[^0-9a-f]/gi,"");return M.length<6&&(M=M[0]+M[0]+M[1]+M[1]+M[2]+M[2]),{r:D(M.substring(0,2)),g:D(M.substring(2,4)),b:D(M.substring(4,6))}}function I(L){var M=S(L,"origin",Object);return M.x=S(M,"x",Number),M.y=S(M,"y",Number),M}function k(L){L.width=document.documentElement.clientWidth,L.height=document.documentElement.clientHeight}function V(L){var M=L.getBoundingClientRect();L.width=M.width,L.height=M.height}function P(L){var M=document.createElement("canvas");return M.style.position="fixed",M.style.top="0px",M.style.left="0px",M.style.pointerEvents="none",M.style.zIndex=L,M}function C(L,M,j,me,G,re,he,le,ve){L.save(),L.translate(M,j),L.rotate(re),L.scale(me,G),L.arc(0,0,1,he,le,ve),L.restore()}function z(L){var M=L.angle*(Math.PI/180),j=L.spread*(Math.PI/180);return{x:L.x,y:L.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:L.startVelocity*.5+Math.random()*L.startVelocity,angle2D:-M+(.5*j-Math.random()*j),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:L.color,shape:L.shape,tick:0,totalTicks:L.ticks,decay:L.decay,drift:L.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:L.gravity*3,ovalScalar:.6,scalar:L.scalar,flat:L.flat}}function J(L,M){M.x+=Math.cos(M.angle2D)*M.velocity+M.drift,M.y+=Math.sin(M.angle2D)*M.velocity+M.gravity,M.velocity*=M.decay,M.flat?(M.wobble=0,M.wobbleX=M.x+10*M.scalar,M.wobbleY=M.y+10*M.scalar,M.tiltSin=0,M.tiltCos=0,M.random=1):(M.wobble+=M.wobbleSpeed,M.wobbleX=M.x+10*M.scalar*Math.cos(M.wobble),M.wobbleY=M.y+10*M.scalar*Math.sin(M.wobble),M.tiltAngle+=.1,M.tiltSin=Math.sin(M.tiltAngle),M.tiltCos=Math.cos(M.tiltAngle),M.random=Math.random()+2);var j=M.tick++/M.totalTicks,me=M.x+M.random*M.tiltCos,G=M.y+M.random*M.tiltSin,re=M.wobbleX+M.random*M.tiltCos,he=M.wobbleY+M.random*M.tiltSin;if(L.fillStyle="rgba("+M.color.r+", "+M.color.g+", "+M.color.b+", "+(1-j)+")",L.beginPath(),u&&M.shape.type==="path"&&typeof M.shape.path=="string"&&Array.isArray(M.shape.matrix))L.fill(ue(M.shape.path,M.shape.matrix,M.x,M.y,Math.abs(re-me)*.1,Math.abs(he-G)*.1,Math.PI/10*M.wobble));else if(M.shape.type==="bitmap"){var le=Math.PI/10*M.wobble,ve=Math.abs(re-me)*.1,Ce=Math.abs(he-G)*.1,Re=M.shape.bitmap.width*M.scalar,Je=M.shape.bitmap.height*M.scalar,nt=new DOMMatrix([Math.cos(le)*ve,Math.sin(le)*ve,-Math.sin(le)*Ce,Math.cos(le)*Ce,M.x,M.y]);nt.multiplySelf(new DOMMatrix(M.shape.matrix));var $e=L.createPattern(g.transform(M.shape.bitmap),"no-repeat");$e.setTransform(nt),L.globalAlpha=1-j,L.fillStyle=$e,L.fillRect(M.x-Re/2,M.y-Je/2,Re,Je),L.globalAlpha=1}else if(M.shape==="circle")L.ellipse?L.ellipse(M.x,M.y,Math.abs(re-me)*M.ovalScalar,Math.abs(he-G)*M.ovalScalar,Math.PI/10*M.wobble,0,2*Math.PI):C(L,M.x,M.y,Math.abs(re-me)*M.ovalScalar,Math.abs(he-G)*M.ovalScalar,Math.PI/10*M.wobble,0,2*Math.PI);else if(M.shape==="star")for(var O=Math.PI/2*3,Pt=4*M.scalar,it=8*M.scalar,tt=M.x,Be=M.y,vt=5,Ue=Math.PI/vt;vt--;)tt=M.x+Math.cos(O)*it,Be=M.y+Math.sin(O)*it,L.lineTo(tt,Be),O+=Ue,tt=M.x+Math.cos(O)*Pt,Be=M.y+Math.sin(O)*Pt,L.lineTo(tt,Be),O+=Ue;else L.moveTo(Math.floor(M.x),Math.floor(M.y)),L.lineTo(Math.floor(M.wobbleX),Math.floor(G)),L.lineTo(Math.floor(re),Math.floor(he)),L.lineTo(Math.floor(me),Math.floor(M.wobbleY));return L.closePath(),L.fill(),M.tick<M.totalTicks}function X(L,M,j,me,G){var re=M.slice(),he=L.getContext("2d"),le,ve,Ce=m(function(Re){function Je(){le=ve=null,he.clearRect(0,0,me.width,me.height),g.clear(),G(),Re()}function nt(){r&&!(me.width===a.width&&me.height===a.height)&&(me.width=L.width=a.width,me.height=L.height=a.height),!me.width&&!me.height&&(j(L),me.width=L.width,me.height=L.height),he.clearRect(0,0,me.width,me.height),re=re.filter(function($e){return J(he,$e)}),re.length?le=_.frame(nt):Je()}le=_.frame(nt),ve=Je});return{addFettis:function(Re){return re=re.concat(Re),Ce},canvas:L,promise:Ce,reset:function(){le&&_.cancel(le),ve&&ve()}}}function ne(L,M){var j=!L,me=!!S(M||{},"resize"),G=!1,re=S(M,"disableForReducedMotion",Boolean),he=l&&!!S(M||{},"useWorker"),le=he?x():null,ve=j?k:V,Ce=L&&le?!!L.__confetti_initialized:!1,Re=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Je;function nt(O,Pt,it){for(var tt=S(O,"particleCount",v),Be=S(O,"angle",Number),vt=S(O,"spread",Number),Ue=S(O,"startVelocity",Number),N=S(O,"decay",Number),w=S(O,"gravity",Number),se=S(O,"drift",Number),xe=S(O,"colors",b),ye=S(O,"ticks",Number),ge=S(O,"shapes"),je=S(O,"scalar"),be=!!S(O,"flat"),Fe=I(O),ft=tt,Ee=[],ze=L.width*Fe.x,Ze=L.height*Fe.y;ft--;)Ee.push(z({x:ze,y:Ze,angle:Be,spread:vt,startVelocity:Ue,color:xe[ft%xe.length],shape:ge[F(0,ge.length)],ticks:ye,decay:N,gravity:w,drift:se,scalar:je,flat:be}));return Je?Je.addFettis(Ee):(Je=X(L,Ee,ve,Pt,it),Je.promise)}function $e(O){var Pt=re||S(O,"disableForReducedMotion",Boolean),it=S(O,"zIndex",Number);if(Pt&&Re)return m(function(Ue){Ue()});j&&Je?L=Je.canvas:j&&!L&&(L=P(it),document.body.appendChild(L)),me&&!Ce&&ve(L);var tt={width:L.width,height:L.height};le&&!Ce&&le.init(L),Ce=!0,le&&(L.__confetti_initialized=!0);function Be(){if(le){var Ue={getBoundingClientRect:function(){if(!j)return L.getBoundingClientRect()}};ve(Ue),le.postMessage({resize:{width:Ue.width,height:Ue.height}});return}tt.width=tt.height=null}function vt(){Je=null,me&&(G=!1,e.removeEventListener("resize",Be)),j&&L&&(document.body.contains(L)&&document.body.removeChild(L),L=null,Ce=!1)}return me&&!G&&(G=!0,e.addEventListener("resize",Be,!1)),le?le.fire(O,tt,vt):nt(O,tt,vt)}return $e.reset=function(){le&&le.reset(),Je&&Je.reset()},$e}var de;function oe(){return de||(de=ne(null,{useWorker:!0,resize:!0})),de}function ue(L,M,j,me,G,re,he){var le=new Path2D(L),ve=new Path2D;ve.addPath(le,new DOMMatrix(M));var Ce=new Path2D;return Ce.addPath(ve,new DOMMatrix([Math.cos(he)*G,Math.sin(he)*G,-Math.sin(he)*re,Math.cos(he)*re,j,me])),Ce}function B(L){if(!u)throw new Error("path confetti are not supported in this browser");var M,j;typeof L=="string"?M=L:(M=L.path,j=L.matrix);var me=new Path2D(M),G=document.createElement("canvas"),re=G.getContext("2d");if(!j){for(var he=1e3,le=he,ve=he,Ce=0,Re=0,Je,nt,$e=0;$e<he;$e+=2)for(var O=0;O<he;O+=2)re.isPointInPath(me,$e,O,"nonzero")&&(le=Math.min(le,$e),ve=Math.min(ve,O),Ce=Math.max(Ce,$e),Re=Math.max(Re,O));Je=Ce-le,nt=Re-ve;var Pt=10,it=Math.min(Pt/Je,Pt/nt);j=[it,0,0,it,-Math.round(Je/2+le)*it,-Math.round(nt/2+ve)*it]}return{type:"path",path:M,matrix:j}}function pe(L){var M,j=1,me="#000000",G='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof L=="string"?M=L:(M=L.text,j="scalar"in L?L.scalar:j,G="fontFamily"in L?L.fontFamily:G,me="color"in L?L.color:me);var re=10*j,he=""+re+"px "+G,le=new OffscreenCanvas(re,re),ve=le.getContext("2d");ve.font=he;var Ce=ve.measureText(M),Re=Math.ceil(Ce.actualBoundingBoxRight+Ce.actualBoundingBoxLeft),Je=Math.ceil(Ce.actualBoundingBoxAscent+Ce.actualBoundingBoxDescent),nt=2,$e=Ce.actualBoundingBoxLeft+nt,O=Ce.actualBoundingBoxAscent+nt;Re+=nt+nt,Je+=nt+nt,le=new OffscreenCanvas(Re,Je),ve=le.getContext("2d"),ve.font=he,ve.fillStyle=me,ve.fillText(M,$e,O);var Pt=1/j;return{type:"bitmap",bitmap:le.transferToImageBitmap(),matrix:[Pt,0,0,Pt,-Re*Pt/2,-Je*Pt/2]}}t.exports=function(){return oe().apply(this,arguments)},t.exports.reset=function(){oe().reset()},t.exports.create=ne,t.exports.shapeFromPath=B,t.exports.shapeFromText=pe})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),fd,!1);const F1=fd.exports;fd.exports.create;function O1({position:s=1,totalTime:e="03:45.120",fastestLap:t="01:14.280",onRetry:r,onMainMenu:a}){return St.useEffect(()=>{s===1&&F1({particleCount:120,spread:80,origin:{y:.6}})},[s]),Q.jsx("div",{className:"modal-backdrop screen-fade-enter",children:Q.jsxs("div",{className:"modal-card glass-panel",children:[Q.jsx("div",{className:"result-trophy-icon",children:Q.jsx(Fg,{size:48,color:s===1?"#eab308":"#00f2fe"})}),Q.jsx("h2",{className:"result-title",children:s===1?"VICTORY!":`FINISHED P${s}`}),Q.jsx("p",{className:"result-subtitle",children:"CHAMPIONSHIP GRAND PRIX RESULT"}),Q.jsxs("div",{className:"result-stats-box",children:[Q.jsxs("div",{className:"result-stat-row",children:[Q.jsxs("span",{className:"stat-label",children:[Q.jsx(f1,{size:16})," Finish Position"]}),Q.jsxs("span",{className:"stat-value text-cyan",children:["P",s]})]}),Q.jsxs("div",{className:"result-stat-row",children:[Q.jsx("span",{className:"stat-label",children:"Total Time"}),Q.jsx("span",{className:"stat-value",children:e})]}),Q.jsxs("div",{className:"result-stat-row",children:[Q.jsx("span",{className:"stat-label",children:"Fastest Lap"}),Q.jsx("span",{className:"stat-value text-yellow",children:t})]})]}),Q.jsxs("div",{className:"result-btn-row",children:[Q.jsxs("button",{className:"btn-primary",onClick:r,children:[Q.jsx(Ug,{size:20})," RETRY"]}),Q.jsxs("button",{className:"btn-secondary",onClick:a,children:[Q.jsx(S1,{size:20})," MENU"]})]})]})})}function jm(s=0,e=0,t=0){return{x:s,z:e,heading:t,speed:0,speedKmH:0,steeringAngle:0,rpm:1500,gear:1,throttle:0,brake:0,handbrake:!1,slipAngle:0,isSlipping:!1,tyreWear:100,drsActive:!1,lap:1,currentSector:1,lastCheckpointIdx:0,totalDistance:0,finished:!1,finishTime:null}}function k1(s,e,t,r,a="pro"){const{throttle:l,brake:u,steering:f,drs:h}=e,m=t.topSpeed*1e3/3600,g=t.acceleration*4.5,_=t.braking*12;let y=f*.45,E=l,A=u;a==="rookie"&&Math.abs(s.slipAngle)>.1&&(E*=.6);const S=s.speed/m,v=1-Math.min(.65,S*.7);s.steeringAngle=y*v;const F=h&&s.drsActive?.75:1,D=.0012*Math.pow(s.speed,2)*F,b=.8;let W=0;if(E>0){const B=g*(1-Math.pow(S,1.5))*E;W+=B}A>0&&(W-=_*A),W-=D+b,s.speed+=W*r,s.speed<0&&(s.speed=0);const I=h?m*1.08:m;s.speed>I&&(s.speed=I),s.speedKmH=Math.round(s.speed*3600/1e3);let V=s.speed/3.6*Math.tan(s.steeringAngle);const P=t.cornering*2.8,C=Math.abs(V*s.speed);C>P?(s.isSlipping=!0,s.slipAngle=(C-P)*Math.sign(s.steeringAngle),s.speed-=4*r):(s.isSlipping=!1,s.slipAngle*=.85),s.heading+=V*r,s.x+=Math.sin(s.heading)*s.speed*r,s.z+=Math.cos(s.heading)*s.speed*r;const z=2200,J=14500,X=[0,45,90,140,190,240,290,330,370];let ne=1;for(let B=1;B<=8;B++)s.speedKmH>X[B-1]&&(ne=B);s.gear=ne;const de=X[ne-1],oe=X[ne],ue=Math.min(1,(s.speedKmH-de)/(oe-de));s.rpm=Math.round(z+ue*(J-z)),s.isSlipping&&(s.tyreWear=Math.max(0,s.tyreWear-.05*r))}function z1(s,e=7){return[{name:"Max Vance",team:"Vortex Motorsport",carId:"vortex-x",skill:.98,aggression:.9},{name:"Lewis Hamilton",team:"Apex Racing Team",carId:"apex-a1",skill:.96,aggression:.8},{name:"Charles Leclair",team:"Falcon Precision Racing",carId:"falcon-r",skill:.94,aggression:.85},{name:"Lando Swift",team:"Phantom Stealth Works",carId:"phantom-f1",skill:.92,aggression:.75},{name:"Oscar Piatri",team:"Velocity Kinetic Labs",carId:"velocity-9",skill:.9,aggression:.7},{name:"George Rusher",team:"Titan Heavy Performance",carId:"titan-gp",skill:.88,aggression:.8},{name:"Carlos Sainz",team:"Zenith World Champions",carId:"zenith-r",skill:.87,aggression:.75}].slice(0,e).map((r,a)=>{const l=-40-(a+1)*15,u=a%2===0?-3.5:3.5;return{id:`ai-${a}`,name:r.name,team:r.team,carId:r.carId,skill:r.skill,aggression:r.aggression,state:{x:u,z:l,heading:0,speed:0,speedKmH:0,steeringAngle:0,rpm:1500,gear:1,lap:1,targetWaypointIdx:0,finished:!1,finishTime:null}}})}function B1(s,e,t,r){const a=s.state;if(a.finished)return;const l=e,u=l[a.targetWaypointIdx],f=(a.targetWaypointIdx+1)%l.length;l[f];const h=u.x-a.x,m=u.z-a.z;Math.hypot(h,m)<20&&(a.targetWaypointIdx=f,a.targetWaypointIdx===0&&(a.lap+=1));let x=Math.atan2(h,m)-a.heading;for(;x>Math.PI;)x-=Math.PI*2;for(;x<-Math.PI;)x+=Math.PI*2;const y=2.5*s.skill;a.steeringAngle=Math.max(-.45,Math.min(.45,x*y));let E=u.targetSpeed||280;t==="rookie"?E*=.75:t==="pro"?E*=.9:t==="apex"?E*=.98:t==="impossible"&&(E*=1.05);const A=E*1e3/3600;a.speed<A?a.speed+=8.5*s.skill*r:a.speed-=14*(2-s.skill)*r,a.speed<0&&(a.speed=0),a.speedKmH=Math.round(a.speed*3600/1e3);const v=a.speed/3.6*Math.tan(a.steeringAngle);a.heading+=v*r,a.x+=Math.sin(a.heading)*a.speed*r,a.z+=Math.cos(a.heading)*a.speed*r;const F=[0,45,90,140,190,240,290,330,370];let D=1;for(let b=1;b<=8;b++)a.speedKmH>F[b-1]&&(D=b);a.gear=D,a.rpm=Math.round(2e3+a.speedKmH/350*12500)}function H1(){const[s,e]=St.useState("menu"),[t,r]=St.useState(kg[0]),[a,l]=St.useState(zg[0]),[u,f]=St.useState("pro"),[h,m]=St.useState("clear"),[g,_]=St.useState("high"),[x,y]=St.useState("chase"),[E,A]=St.useState(()=>jm(0,-100,0)),[S,v]=St.useState([]),[F,D]=St.useState(1),[b,W]=St.useState(0),I=St.useRef({throttle:0,brake:0,steering:0,handbrake:!1,drs:!1}),k=St.useRef({}),[V,P]=St.useState(!1);St.useEffect(()=>{P("ontouchstart"in window||navigator.maxTouchPoints>0)},[]),St.useEffect(()=>{const z=X=>{Vm(),k.current[X.code]=!0,X.code==="KeyC"&&y(ne=>ne==="chase"?"hood":ne==="hood"?"cockpit":"chase"),X.code==="Escape"&&s==="racing"&&(e("paused"),of())},J=X=>{k.current[X.code]=!1};return window.addEventListener("keydown",z),window.addEventListener("keyup",J),()=>{window.removeEventListener("keydown",z),window.removeEventListener("keyup",J)}},[s]);const C=()=>{Vm();const z=jm(0,-20,0),J=z1(a,7);A(z),v(J),W(0),e("countdown")};return St.useEffect(()=>{if(s!=="racing")return;let z=performance.now(),J;const X=ne=>{const de=Math.min(.05,(ne-z)/1e3);z=ne,W(me=>me+de);const oe=k.current;let ue=oe.KeyW||oe.ArrowUp?1:0,B=oe.KeyS||oe.ArrowDown?1:0,pe=oe.KeyA||oe.ArrowLeft?1:0,L=oe.KeyD||oe.ArrowRight?1:0,M=oe.Space||!1;I.current.touchThrottle&&(ue=I.current.touchThrottle),I.current.touchBrake&&(B=I.current.touchBrake),I.current.touchSteer&&(pe=I.current.touchSteer<0?Math.abs(I.current.touchSteer):0,L=I.current.touchSteer>0?I.current.touchSteer:0);const j=L-pe;I.current={...I.current,throttle:ue,brake:B,steering:j,drs:M},A(me=>{const G={...me},re=G.gear;return k1(G,I.current,t,de,u),JE(G.rpm,G.gear,G.speedKmH),G.gear!==re&&QE(),G.isSlipping&&e1(.4),G.lap>a.lapsDefault&&!G.finished&&(G.finished=!0,e("results"),of()),G}),v(me=>me.map(G=>{const re={...G.state};return B1(G,a.points,u,de),{...G,state:re}})),J=requestAnimationFrame(X)};return J=requestAnimationFrame(X),()=>{cancelAnimationFrame(J)}},[s,t,a,u]),Q.jsxs("div",{className:"app-container",children:[Q.jsx(t1,{playerCar:E,aiCars:S,track:a,cameraMode:x,weather:h,quality:g,isRacing:s==="racing"}),s==="menu"&&Q.jsx(I1,{selectedCar:t,onSelectCar:r,selectedTrack:a,onSelectTrack:l,difficulty:u,onSelectDifficulty:f,weather:h,onSelectWeather:m,quality:g,onSelectQuality:_,onStartRace:C}),s==="countdown"&&Q.jsx(U1,{onStartComplete:()=>e("racing")}),(s==="racing"||s==="paused")&&Q.jsx(D1,{playerCar:E,aiCars:S,track:a,totalLaps:a.lapsDefault,playerPosition:F,cameraMode:x,onToggleCamera:()=>y(z=>z==="chase"?"hood":z==="hood"?"cockpit":"chase"),onPause:()=>{e("paused"),of()}}),s==="racing"&&V&&Q.jsx(N1,{onSteerLeft:z=>{I.current.touchSteer=-z},onSteerRight:z=>{I.current.touchSteer=z},onSteerRelease:()=>{I.current.touchSteer=0},onAccelerate:()=>{I.current.touchThrottle=1},onAccelerateRelease:()=>{I.current.touchThrottle=0},onBrake:()=>{I.current.touchBrake=1},onBrakeRelease:()=>{I.current.touchBrake=0},onActivateDrs:()=>{I.current.drs=!0,setTimeout(()=>{I.current.drs=!1},2e3)},onResetCar:()=>{A(z=>({...z,x:0,z:0,speed:0,heading:0}))}}),s==="paused"&&Q.jsx("div",{className:"modal-backdrop screen-fade-enter",children:Q.jsxs("div",{className:"modal-card glass-panel",children:[Q.jsx("h2",{className:"result-title",children:"RACE PAUSED"}),Q.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",width:"100%",marginTop:"1.5rem"},children:[Q.jsx("button",{className:"btn-primary",onClick:()=>e("racing"),children:"RESUME RACE"}),Q.jsx("button",{className:"btn-secondary",onClick:C,children:"RESTART RACE"}),Q.jsx("button",{className:"btn-secondary",onClick:()=>e("menu"),children:"MAIN MENU"})]})]})}),s==="results"&&Q.jsx(O1,{position:F,totalTime:`${Math.floor(b/60)}:${(b%60).toFixed(2)}`,fastestLap:"01:14.32",onRetry:C,onMainMenu:()=>e("menu")})]})}Rv.createRoot(document.getElementById("root")).render(Q.jsx(Sv.StrictMode,{children:Q.jsx(H1,{})}));
