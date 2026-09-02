(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function n(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=n(a);fetch(a.href,l)}})();function Cg(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Tf={exports:{}},qo={},Af={exports:{}},St={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sm;function A_(){if(Sm)return St;Sm=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.iterator;function y(E){return E===null||typeof E!="object"?null:(E=x&&E[x]||E["@@iterator"],typeof E=="function"?E:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,T={};function _(E,W,ve){this.props=E,this.context=W,this.refs=T,this.updater=ve||S}_.prototype.isReactComponent={},_.prototype.setState=function(E,W){if(typeof E!="object"&&typeof E!="function"&&E!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,E,W,"setState")},_.prototype.forceUpdate=function(E){this.updater.enqueueForceUpdate(this,E,"forceUpdate")};function g(){}g.prototype=_.prototype;function I(E,W,ve){this.props=E,this.context=W,this.refs=T,this.updater=ve||S}var D=I.prototype=new g;D.constructor=I,M(D,_.prototype),D.isPureReactComponent=!0;var C=Array.isArray,z=Object.prototype.hasOwnProperty,k={current:null},O={key:!0,ref:!0,__self:!0,__source:!0};function G(E,W,ve){var X,ne={},fe=null,ae=null;if(W!=null)for(X in W.ref!==void 0&&(ae=W.ref),W.key!==void 0&&(fe=""+W.key),W)z.call(W,X)&&!O.hasOwnProperty(X)&&(ne[X]=W[X]);var pe=arguments.length-2;if(pe===1)ne.children=ve;else if(1<pe){for(var Te=Array(pe),Ee=0;Ee<pe;Ee++)Te[Ee]=arguments[Ee+2];ne.children=Te}if(E&&E.defaultProps)for(X in pe=E.defaultProps,pe)ne[X]===void 0&&(ne[X]=pe[X]);return{$$typeof:s,type:E,key:fe,ref:ae,props:ne,_owner:k.current}}function P(E,W){return{$$typeof:s,type:E.type,key:W,ref:E.ref,props:E.props,_owner:E._owner}}function R(E){return typeof E=="object"&&E!==null&&E.$$typeof===s}function H(E){var W={"=":"=0",":":"=2"};return"$"+E.replace(/[=:]/g,function(ve){return W[ve]})}var ie=/\/+/g;function Y(E,W){return typeof E=="object"&&E!==null&&E.key!=null?H(""+E.key):W.toString(36)}function de(E,W,ve,X,ne){var fe=typeof E;(fe==="undefined"||fe==="boolean")&&(E=null);var ae=!1;if(E===null)ae=!0;else switch(fe){case"string":case"number":ae=!0;break;case"object":switch(E.$$typeof){case s:case e:ae=!0}}if(ae)return ae=E,ne=ne(ae),E=X===""?"."+Y(ae,0):X,C(ne)?(ve="",E!=null&&(ve=E.replace(ie,"$&/")+"/"),de(ne,W,ve,"",function(Ee){return Ee})):ne!=null&&(R(ne)&&(ne=P(ne,ve+(!ne.key||ae&&ae.key===ne.key?"":(""+ne.key).replace(ie,"$&/")+"/")+E)),W.push(ne)),1;if(ae=0,X=X===""?".":X+":",C(E))for(var pe=0;pe<E.length;pe++){fe=E[pe];var Te=X+Y(fe,pe);ae+=de(fe,W,ve,Te,ne)}else if(Te=y(E),typeof Te=="function")for(E=Te.call(E),pe=0;!(fe=E.next()).done;)fe=fe.value,Te=X+Y(fe,pe++),ae+=de(fe,W,ve,Te,ne);else if(fe==="object")throw W=String(E),Error("Objects are not valid as a React child (found: "+(W==="[object Object]"?"object with keys {"+Object.keys(E).join(", ")+"}":W)+"). If you meant to render a collection of children, use an array instead.");return ae}function me(E,W,ve){if(E==null)return E;var X=[],ne=0;return de(E,X,"","",function(fe){return W.call(ve,fe,ne++)}),X}function Q(E){if(E._status===-1){var W=E._result;W=W(),W.then(function(ve){(E._status===0||E._status===-1)&&(E._status=1,E._result=ve)},function(ve){(E._status===0||E._status===-1)&&(E._status=2,E._result=ve)}),E._status===-1&&(E._status=0,E._result=W)}if(E._status===1)return E._result.default;throw E._result}var re={current:null},B={transition:null},he={ReactCurrentDispatcher:re,ReactCurrentBatchConfig:B,ReactCurrentOwner:k};function L(){throw Error("act(...) is not supported in production builds of React.")}return St.Children={map:me,forEach:function(E,W,ve){me(E,function(){W.apply(this,arguments)},ve)},count:function(E){var W=0;return me(E,function(){W++}),W},toArray:function(E){return me(E,function(W){return W})||[]},only:function(E){if(!R(E))throw Error("React.Children.only expected to receive a single React element child.");return E}},St.Component=_,St.Fragment=n,St.Profiler=a,St.PureComponent=I,St.StrictMode=r,St.Suspense=h,St.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=he,St.act=L,St.cloneElement=function(E,W,ve){if(E==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+E+".");var X=M({},E.props),ne=E.key,fe=E.ref,ae=E._owner;if(W!=null){if(W.ref!==void 0&&(fe=W.ref,ae=k.current),W.key!==void 0&&(ne=""+W.key),E.type&&E.type.defaultProps)var pe=E.type.defaultProps;for(Te in W)z.call(W,Te)&&!O.hasOwnProperty(Te)&&(X[Te]=W[Te]===void 0&&pe!==void 0?pe[Te]:W[Te])}var Te=arguments.length-2;if(Te===1)X.children=ve;else if(1<Te){pe=Array(Te);for(var Ee=0;Ee<Te;Ee++)pe[Ee]=arguments[Ee+2];X.children=pe}return{$$typeof:s,type:E.type,key:ne,ref:fe,props:X,_owner:ae}},St.createContext=function(E){return E={$$typeof:u,_currentValue:E,_currentValue2:E,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},E.Provider={$$typeof:l,_context:E},E.Consumer=E},St.createElement=G,St.createFactory=function(E){var W=G.bind(null,E);return W.type=E,W},St.createRef=function(){return{current:null}},St.forwardRef=function(E){return{$$typeof:f,render:E}},St.isValidElement=R,St.lazy=function(E){return{$$typeof:v,_payload:{_status:-1,_result:E},_init:Q}},St.memo=function(E,W){return{$$typeof:p,type:E,compare:W===void 0?null:W}},St.startTransition=function(E){var W=B.transition;B.transition={};try{E()}finally{B.transition=W}},St.unstable_act=L,St.useCallback=function(E,W){return re.current.useCallback(E,W)},St.useContext=function(E){return re.current.useContext(E)},St.useDebugValue=function(){},St.useDeferredValue=function(E){return re.current.useDeferredValue(E)},St.useEffect=function(E,W){return re.current.useEffect(E,W)},St.useId=function(){return re.current.useId()},St.useImperativeHandle=function(E,W,ve){return re.current.useImperativeHandle(E,W,ve)},St.useInsertionEffect=function(E,W){return re.current.useInsertionEffect(E,W)},St.useLayoutEffect=function(E,W){return re.current.useLayoutEffect(E,W)},St.useMemo=function(E,W){return re.current.useMemo(E,W)},St.useReducer=function(E,W,ve){return re.current.useReducer(E,W,ve)},St.useRef=function(E){return re.current.useRef(E)},St.useState=function(E){return re.current.useState(E)},St.useSyncExternalStore=function(E,W,ve){return re.current.useSyncExternalStore(E,W,ve)},St.useTransition=function(){return re.current.useTransition()},St.version="18.3.1",St}var Mm;function Md(){return Mm||(Mm=1,Af.exports=A_()),Af.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Em;function R_(){if(Em)return qo;Em=1;var s=Md(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(f,h,p){var v,x={},y=null,S=null;p!==void 0&&(y=""+p),h.key!==void 0&&(y=""+h.key),h.ref!==void 0&&(S=h.ref);for(v in h)r.call(h,v)&&!l.hasOwnProperty(v)&&(x[v]=h[v]);if(f&&f.defaultProps)for(v in h=f.defaultProps,h)x[v]===void 0&&(x[v]=h[v]);return{$$typeof:e,type:f,key:y,ref:S,props:x,_owner:a.current}}return qo.Fragment=n,qo.jsx=u,qo.jsxs=u,qo}var wm;function C_(){return wm||(wm=1,Tf.exports=R_()),Tf.exports}var J=C_(),Qe=Md();const b_=Cg(Qe);var Sl={},Rf={exports:{}},Hn={},Cf={exports:{}},bf={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Tm;function P_(){return Tm||(Tm=1,(function(s){function e(B,he){var L=B.length;B.push(he);e:for(;0<L;){var E=L-1>>>1,W=B[E];if(0<a(W,he))B[E]=he,B[L]=W,L=E;else break e}}function n(B){return B.length===0?null:B[0]}function r(B){if(B.length===0)return null;var he=B[0],L=B.pop();if(L!==he){B[0]=L;e:for(var E=0,W=B.length,ve=W>>>1;E<ve;){var X=2*(E+1)-1,ne=B[X],fe=X+1,ae=B[fe];if(0>a(ne,L))fe<W&&0>a(ae,ne)?(B[E]=ae,B[fe]=L,E=fe):(B[E]=ne,B[X]=L,E=X);else if(fe<W&&0>a(ae,L))B[E]=ae,B[fe]=L,E=fe;else break e}}return he}function a(B,he){var L=B.sortIndex-he.sortIndex;return L!==0?L:B.id-he.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var u=Date,f=u.now();s.unstable_now=function(){return u.now()-f}}var h=[],p=[],v=1,x=null,y=3,S=!1,M=!1,T=!1,_=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function D(B){for(var he=n(p);he!==null;){if(he.callback===null)r(p);else if(he.startTime<=B)r(p),he.sortIndex=he.expirationTime,e(h,he);else break;he=n(p)}}function C(B){if(T=!1,D(B),!M)if(n(h)!==null)M=!0,Q(z);else{var he=n(p);he!==null&&re(C,he.startTime-B)}}function z(B,he){M=!1,T&&(T=!1,g(G),G=-1),S=!0;var L=y;try{for(D(he),x=n(h);x!==null&&(!(x.expirationTime>he)||B&&!H());){var E=x.callback;if(typeof E=="function"){x.callback=null,y=x.priorityLevel;var W=E(x.expirationTime<=he);he=s.unstable_now(),typeof W=="function"?x.callback=W:x===n(h)&&r(h),D(he)}else r(h);x=n(h)}if(x!==null)var ve=!0;else{var X=n(p);X!==null&&re(C,X.startTime-he),ve=!1}return ve}finally{x=null,y=L,S=!1}}var k=!1,O=null,G=-1,P=5,R=-1;function H(){return!(s.unstable_now()-R<P)}function ie(){if(O!==null){var B=s.unstable_now();R=B;var he=!0;try{he=O(!0,B)}finally{he?Y():(k=!1,O=null)}}else k=!1}var Y;if(typeof I=="function")Y=function(){I(ie)};else if(typeof MessageChannel<"u"){var de=new MessageChannel,me=de.port2;de.port1.onmessage=ie,Y=function(){me.postMessage(null)}}else Y=function(){_(ie,0)};function Q(B){O=B,k||(k=!0,Y())}function re(B,he){G=_(function(){B(s.unstable_now())},he)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(B){B.callback=null},s.unstable_continueExecution=function(){M||S||(M=!0,Q(z))},s.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<B?Math.floor(1e3/B):5},s.unstable_getCurrentPriorityLevel=function(){return y},s.unstable_getFirstCallbackNode=function(){return n(h)},s.unstable_next=function(B){switch(y){case 1:case 2:case 3:var he=3;break;default:he=y}var L=y;y=he;try{return B()}finally{y=L}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(B,he){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var L=y;y=B;try{return he()}finally{y=L}},s.unstable_scheduleCallback=function(B,he,L){var E=s.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?E+L:E):L=E,B){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=L+W,B={id:v++,callback:he,priorityLevel:B,startTime:L,expirationTime:W,sortIndex:-1},L>E?(B.sortIndex=L,e(p,B),n(h)===null&&B===n(p)&&(T?(g(G),G=-1):T=!0,re(C,L-E))):(B.sortIndex=W,e(h,B),M||S||(M=!0,Q(z))),B},s.unstable_shouldYield=H,s.unstable_wrapCallback=function(B){var he=y;return function(){var L=y;y=he;try{return B.apply(this,arguments)}finally{y=L}}}})(bf)),bf}var Am;function L_(){return Am||(Am=1,Cf.exports=P_()),Cf.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rm;function D_(){if(Rm)return Hn;Rm=1;var s=Md(),e=L_();function n(t){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function l(t,i){u(t,i),u(t+"Capture",i)}function u(t,i){for(a[t]=i,t=0;t<i.length;t++)r.add(i[t])}var f=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,v={},x={};function y(t){return h.call(x,t)?!0:h.call(v,t)?!1:p.test(t)?x[t]=!0:(v[t]=!0,!1)}function S(t,i,o,c){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function M(t,i,o,c){if(i===null||typeof i>"u"||S(t,i,o,c))return!0;if(c)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function T(t,i,o,c,d,m,w){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=o,this.propertyName=t,this.type=i,this.sanitizeURL=m,this.removeEmptyString=w}var _={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){_[t]=new T(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var i=t[0];_[i]=new T(i,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){_[t]=new T(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){_[t]=new T(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){_[t]=new T(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){_[t]=new T(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){_[t]=new T(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){_[t]=new T(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){_[t]=new T(t,5,!1,t.toLowerCase(),null,!1,!1)});var g=/[\-:]([a-z])/g;function I(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var i=t.replace(g,I);_[i]=new T(i,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var i=t.replace(g,I);_[i]=new T(i,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var i=t.replace(g,I);_[i]=new T(i,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){_[t]=new T(t,1,!1,t.toLowerCase(),null,!1,!1)}),_.xlinkHref=new T("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){_[t]=new T(t,1,!1,t.toLowerCase(),null,!0,!0)});function D(t,i,o,c){var d=_.hasOwnProperty(i)?_[i]:null;(d!==null?d.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(M(i,o,d,c)&&(o=null),c||d===null?y(i)&&(o===null?t.removeAttribute(i):t.setAttribute(i,""+o)):d.mustUseProperty?t[d.propertyName]=o===null?d.type===3?!1:"":o:(i=d.attributeName,c=d.attributeNamespace,o===null?t.removeAttribute(i):(d=d.type,o=d===3||d===4&&o===!0?"":""+o,c?t.setAttributeNS(c,i,o):t.setAttribute(i,o))))}var C=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,z=Symbol.for("react.element"),k=Symbol.for("react.portal"),O=Symbol.for("react.fragment"),G=Symbol.for("react.strict_mode"),P=Symbol.for("react.profiler"),R=Symbol.for("react.provider"),H=Symbol.for("react.context"),ie=Symbol.for("react.forward_ref"),Y=Symbol.for("react.suspense"),de=Symbol.for("react.suspense_list"),me=Symbol.for("react.memo"),Q=Symbol.for("react.lazy"),re=Symbol.for("react.offscreen"),B=Symbol.iterator;function he(t){return t===null||typeof t!="object"?null:(t=B&&t[B]||t["@@iterator"],typeof t=="function"?t:null)}var L=Object.assign,E;function W(t){if(E===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);E=i&&i[1]||""}return`
`+E+t}var ve=!1;function X(t,i){if(!t||ve)return"";ve=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(ue){var c=ue}Reflect.construct(t,[],i)}else{try{i.call()}catch(ue){c=ue}t.call(i.prototype)}else{try{throw Error()}catch(ue){c=ue}t()}}catch(ue){if(ue&&c&&typeof ue.stack=="string"){for(var d=ue.stack.split(`
`),m=c.stack.split(`
`),w=d.length-1,U=m.length-1;1<=w&&0<=U&&d[w]!==m[U];)U--;for(;1<=w&&0<=U;w--,U--)if(d[w]!==m[U]){if(w!==1||U!==1)do if(w--,U--,0>U||d[w]!==m[U]){var V=`
`+d[w].replace(" at new "," at ");return t.displayName&&V.includes("<anonymous>")&&(V=V.replace("<anonymous>",t.displayName)),V}while(1<=w&&0<=U);break}}}finally{ve=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?W(t):""}function ne(t){switch(t.tag){case 5:return W(t.type);case 16:return W("Lazy");case 13:return W("Suspense");case 19:return W("SuspenseList");case 0:case 2:case 15:return t=X(t.type,!1),t;case 11:return t=X(t.type.render,!1),t;case 1:return t=X(t.type,!0),t;default:return""}}function fe(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case O:return"Fragment";case k:return"Portal";case P:return"Profiler";case G:return"StrictMode";case Y:return"Suspense";case de:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case H:return(t.displayName||"Context")+".Consumer";case R:return(t._context.displayName||"Context")+".Provider";case ie:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case me:return i=t.displayName||null,i!==null?i:fe(t.type)||"Memo";case Q:i=t._payload,t=t._init;try{return fe(t(i))}catch{}}return null}function ae(t){var i=t.type;switch(t.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,t=t.displayName||t.name||"",i.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return fe(i);case 8:return i===G?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function pe(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Te(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ee(t){var i=Te(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,i),c=""+t[i];if(!t.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var d=o.get,m=o.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return d.call(this)},set:function(w){c=""+w,m.call(this,w)}}),Object.defineProperty(t,i,{enumerable:o.enumerable}),{getValue:function(){return c},setValue:function(w){c=""+w},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function Ne(t){t._valueTracker||(t._valueTracker=Ee(t))}function Ke(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var o=i.getValue(),c="";return t&&(c=Te(t)?t.checked?"true":"false":t.value),t=c,t!==o?(i.setValue(t),!0):!1}function Oe(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function F(t,i){var o=i.checked;return L({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function Tt(t,i){var o=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;o=pe(i.value!=null?i.value:o),t._wrapperState={initialChecked:c,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function tt(t,i){i=i.checked,i!=null&&D(t,"checked",i,!1)}function nt(t,i){tt(t,i);var o=pe(i.value),c=i.type;if(o!=null)c==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(c==="submit"||c==="reset"){t.removeAttribute("value");return}i.hasOwnProperty("value")?xt(t,i.type,o):i.hasOwnProperty("defaultValue")&&xt(t,i.type,pe(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(t.defaultChecked=!!i.defaultChecked)}function Ve(t,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+t._wrapperState.initialValue,o||i===t.value||(t.value=i),t.defaultValue=i}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function xt(t,i,o){(i!=="number"||Oe(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var ke=Array.isArray;function N(t,i,o,c){if(t=t.options,i){i={};for(var d=0;d<o.length;d++)i["$"+o[d]]=!0;for(o=0;o<t.length;o++)d=i.hasOwnProperty("$"+t[o].value),t[o].selected!==d&&(t[o].selected=d),d&&c&&(t[o].defaultSelected=!0)}else{for(o=""+pe(o),i=null,d=0;d<t.length;d++){if(t[d].value===o){t[d].selected=!0,c&&(t[d].defaultSelected=!0);return}i!==null||t[d].disabled||(i=t[d])}i!==null&&(i.selected=!0)}}function A(t,i){if(i.dangerouslySetInnerHTML!=null)throw Error(n(91));return L({},i,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function se(t,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(n(92));if(ke(o)){if(1<o.length)throw Error(n(93));o=o[0]}i=o}i==null&&(i=""),o=i}t._wrapperState={initialValue:pe(o)}}function xe(t,i){var o=pe(i.value),c=pe(i.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),i.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),c!=null&&(t.defaultValue=""+c)}function ye(t){var i=t.textContent;i===t._wrapperState.initialValue&&i!==""&&i!==null&&(t.value=i)}function _e(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Xe(t,i){return t==null||t==="http://www.w3.org/1999/xhtml"?_e(i):t==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Le,Ue=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,c,d){MSApp.execUnsafeLocalFunction(function(){return t(i,o,c,d)})}:t})(function(t,i){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=i;else{for(Le=Le||document.createElement("div"),Le.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Le.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;i.firstChild;)t.appendChild(i.firstChild)}});function ct(t,i){if(i){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=i;return}}t.textContent=i}var we={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ze=["Webkit","ms","Moz","O"];Object.keys(we).forEach(function(t){ze.forEach(function(i){i=i+t.charAt(0).toUpperCase()+t.substring(1),we[i]=we[t]})});function Je(t,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||we.hasOwnProperty(t)&&we[t]?(""+i).trim():i+"px"}function it(t,i){t=t.style;for(var o in i)if(i.hasOwnProperty(o)){var c=o.indexOf("--")===0,d=Je(o,i[o],c);o==="float"&&(o="cssFloat"),c?t.setProperty(o,d):t[o]=d}}var Ge=L({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ht(t,i){if(i){if(Ge[t]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(n(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(n(61))}if(i.style!=null&&typeof i.style!="object")throw Error(n(62))}}function ft(t,i){if(t.indexOf("-")===-1)return typeof i.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ct=null;function q(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ce=null,ce=null,ge=null;function De(t){if(t=Do(t)){if(typeof Ce!="function")throw Error(n(280));var i=t.stateNode;i&&(i=Fa(i),Ce(t.stateNode,t.type,i))}}function Pe(t){ce?ge?ge.push(t):ge=[t]:ce=t}function ot(){if(ce){var t=ce,i=ge;if(ge=ce=null,De(t),i)for(t=0;t<i.length;t++)De(i[t])}}function bt(t,i){return t(i)}function Ot(){}var yt=!1;function Un(t,i,o){if(yt)return t(i,o);yt=!0;try{return bt(t,i,o)}finally{yt=!1,(ce!==null||ge!==null)&&(Ot(),ot())}}function Rn(t,i){var o=t.stateNode;if(o===null)return null;var c=Fa(o);if(c===null)return null;o=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(t=t.type,c=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!c;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,i,typeof o));return o}var xs=!1;if(f)try{var nr={};Object.defineProperty(nr,"passive",{get:function(){xs=!0}}),window.addEventListener("test",nr,nr),window.removeEventListener("test",nr,nr)}catch{xs=!1}function Di(t,i,o,c,d,m,w,U,V){var ue=Array.prototype.slice.call(arguments,3);try{i.apply(o,ue)}catch(Me){this.onError(Me)}}var Ni=!1,zr=null,Br=!1,ir=null,pa={onError:function(t){Ni=!0,zr=t}};function ys(t,i,o,c,d,m,w,U,V){Ni=!1,zr=null,Di.apply(pa,arguments)}function ma(t,i,o,c,d,m,w,U,V){if(ys.apply(this,arguments),Ni){if(Ni){var ue=zr;Ni=!1,zr=null}else throw Error(n(198));Br||(Br=!0,ir=ue)}}function Si(t){var i=t,o=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(o=i.return),t=i.return;while(t)}return i.tag===3?o:null}function ga(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function va(t){if(Si(t)!==t)throw Error(n(188))}function qc(t){var i=t.alternate;if(!i){if(i=Si(t),i===null)throw Error(n(188));return i!==t?null:t}for(var o=t,c=i;;){var d=o.return;if(d===null)break;var m=d.alternate;if(m===null){if(c=d.return,c!==null){o=c;continue}break}if(d.child===m.child){for(m=d.child;m;){if(m===o)return va(d),t;if(m===c)return va(d),i;m=m.sibling}throw Error(n(188))}if(o.return!==c.return)o=d,c=m;else{for(var w=!1,U=d.child;U;){if(U===o){w=!0,o=d,c=m;break}if(U===c){w=!0,c=d,o=m;break}U=U.sibling}if(!w){for(U=m.child;U;){if(U===o){w=!0,o=m,c=d;break}if(U===c){w=!0,c=m,o=d;break}U=U.sibling}if(!w)throw Error(n(189))}}if(o.alternate!==c)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:i}function _a(t){return t=qc(t),t!==null?xa(t):null}function xa(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var i=xa(t);if(i!==null)return i;t=t.sibling}return null}var ya=e.unstable_scheduleCallback,b=e.unstable_cancelCallback,$=e.unstable_shouldYield,le=e.unstable_requestPaint,te=e.unstable_now,Z=e.unstable_getCurrentPriorityLevel,Re=e.unstable_ImmediatePriority,Fe=e.unstable_UserBlockingPriority,Be=e.unstable_NormalPriority,je=e.unstable_LowPriority,ut=e.unstable_IdlePriority,at=null,Ye=null;function wt(t){if(Ye&&typeof Ye.onCommitFiberRoot=="function")try{Ye.onCommitFiberRoot(at,t,void 0,(t.current.flags&128)===128)}catch{}}var pt=Math.clz32?Math.clz32:At,qt=Math.log,Vt=Math.LN2;function At(t){return t>>>=0,t===0?32:31-(qt(t)/Vt|0)|0}var et=64,Yt=4194304;function Et(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function _n(t,i){var o=t.pendingLanes;if(o===0)return 0;var c=0,d=t.suspendedLanes,m=t.pingedLanes,w=o&268435455;if(w!==0){var U=w&~d;U!==0?c=Et(U):(m&=w,m!==0&&(c=Et(m)))}else w=o&~d,w!==0?c=Et(w):m!==0&&(c=Et(m));if(c===0)return 0;if(i!==0&&i!==c&&(i&d)===0&&(d=c&-c,m=i&-i,d>=m||d===16&&(m&4194240)!==0))return i;if((c&4)!==0&&(c|=o&16),i=t.entangledLanes,i!==0)for(t=t.entanglements,i&=c;0<i;)o=31-pt(i),d=1<<o,c|=t[o],i&=~d;return c}function rr(t,i){switch(t){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Cn(t,i){for(var o=t.suspendedLanes,c=t.pingedLanes,d=t.expirationTimes,m=t.pendingLanes;0<m;){var w=31-pt(m),U=1<<w,V=d[w];V===-1?((U&o)===0||(U&c)!==0)&&(d[w]=rr(U,i)):V<=i&&(t.expiredLanes|=U),m&=~U}}function Ii(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Ft(){var t=et;return et<<=1,(et&4194240)===0&&(et=64),t}function xn(t){for(var i=[],o=0;31>o;o++)i.push(t);return i}function on(t,i,o){t.pendingLanes|=i,i!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,i=31-pt(i),t[i]=o}function pn(t,i){var o=t.pendingLanes&~i;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=i,t.mutableReadLanes&=i,t.entangledLanes&=i,i=t.entanglements;var c=t.eventTimes;for(t=t.expirationTimes;0<o;){var d=31-pt(o),m=1<<d;i[d]=0,c[d]=-1,t[d]=-1,o&=~m}}function an(t,i){var o=t.entangledLanes|=i;for(t=t.entanglements;o;){var c=31-pt(o),d=1<<c;d&i|t[c]&i&&(t[c]|=i),o&=~d}}var Pt=0;function Mi(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var eh,Yc,th,nh,ih,$c=!1,Sa=[],sr=null,or=null,ar=null,go=new Map,vo=new Map,lr=[],Y0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function rh(t,i){switch(t){case"focusin":case"focusout":sr=null;break;case"dragenter":case"dragleave":or=null;break;case"mouseover":case"mouseout":ar=null;break;case"pointerover":case"pointerout":go.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":vo.delete(i.pointerId)}}function _o(t,i,o,c,d,m){return t===null||t.nativeEvent!==m?(t={blockedOn:i,domEventName:o,eventSystemFlags:c,nativeEvent:m,targetContainers:[d]},i!==null&&(i=Do(i),i!==null&&Yc(i)),t):(t.eventSystemFlags|=c,i=t.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),t)}function $0(t,i,o,c,d){switch(i){case"focusin":return sr=_o(sr,t,i,o,c,d),!0;case"dragenter":return or=_o(or,t,i,o,c,d),!0;case"mouseover":return ar=_o(ar,t,i,o,c,d),!0;case"pointerover":var m=d.pointerId;return go.set(m,_o(go.get(m)||null,t,i,o,c,d)),!0;case"gotpointercapture":return m=d.pointerId,vo.set(m,_o(vo.get(m)||null,t,i,o,c,d)),!0}return!1}function sh(t){var i=Hr(t.target);if(i!==null){var o=Si(i);if(o!==null){if(i=o.tag,i===13){if(i=ga(o),i!==null){t.blockedOn=i,ih(t.priority,function(){th(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ma(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var o=Zc(t.domEventName,t.eventSystemFlags,i[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var c=new o.constructor(o.type,o);Ct=c,o.target.dispatchEvent(c),Ct=null}else return i=Do(o),i!==null&&Yc(i),t.blockedOn=o,!1;i.shift()}return!0}function oh(t,i,o){Ma(t)&&o.delete(i)}function K0(){$c=!1,sr!==null&&Ma(sr)&&(sr=null),or!==null&&Ma(or)&&(or=null),ar!==null&&Ma(ar)&&(ar=null),go.forEach(oh),vo.forEach(oh)}function xo(t,i){t.blockedOn===i&&(t.blockedOn=null,$c||($c=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,K0)))}function yo(t){function i(d){return xo(d,t)}if(0<Sa.length){xo(Sa[0],t);for(var o=1;o<Sa.length;o++){var c=Sa[o];c.blockedOn===t&&(c.blockedOn=null)}}for(sr!==null&&xo(sr,t),or!==null&&xo(or,t),ar!==null&&xo(ar,t),go.forEach(i),vo.forEach(i),o=0;o<lr.length;o++)c=lr[o],c.blockedOn===t&&(c.blockedOn=null);for(;0<lr.length&&(o=lr[0],o.blockedOn===null);)sh(o),o.blockedOn===null&&lr.shift()}var Ss=C.ReactCurrentBatchConfig,Ea=!0;function Z0(t,i,o,c){var d=Pt,m=Ss.transition;Ss.transition=null;try{Pt=1,Kc(t,i,o,c)}finally{Pt=d,Ss.transition=m}}function Q0(t,i,o,c){var d=Pt,m=Ss.transition;Ss.transition=null;try{Pt=4,Kc(t,i,o,c)}finally{Pt=d,Ss.transition=m}}function Kc(t,i,o,c){if(Ea){var d=Zc(t,i,o,c);if(d===null)pu(t,i,c,wa,o),rh(t,c);else if($0(d,t,i,o,c))c.stopPropagation();else if(rh(t,c),i&4&&-1<Y0.indexOf(t)){for(;d!==null;){var m=Do(d);if(m!==null&&eh(m),m=Zc(t,i,o,c),m===null&&pu(t,i,c,wa,o),m===d)break;d=m}d!==null&&c.stopPropagation()}else pu(t,i,c,null,o)}}var wa=null;function Zc(t,i,o,c){if(wa=null,t=q(c),t=Hr(t),t!==null)if(i=Si(t),i===null)t=null;else if(o=i.tag,o===13){if(t=ga(i),t!==null)return t;t=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null);return wa=t,null}function ah(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Z()){case Re:return 1;case Fe:return 4;case Be:case je:return 16;case ut:return 536870912;default:return 16}default:return 16}}var cr=null,Qc=null,Ta=null;function lh(){if(Ta)return Ta;var t,i=Qc,o=i.length,c,d="value"in cr?cr.value:cr.textContent,m=d.length;for(t=0;t<o&&i[t]===d[t];t++);var w=o-t;for(c=1;c<=w&&i[o-c]===d[m-c];c++);return Ta=d.slice(t,1<c?1-c:void 0)}function Aa(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function Ra(){return!0}function ch(){return!1}function Wn(t){function i(o,c,d,m,w){this._reactName=o,this._targetInst=d,this.type=c,this.nativeEvent=m,this.target=w,this.currentTarget=null;for(var U in t)t.hasOwnProperty(U)&&(o=t[U],this[U]=o?o(m):m[U]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?Ra:ch,this.isPropagationStopped=ch,this}return L(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=Ra)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=Ra)},persist:function(){},isPersistent:Ra}),i}var Ms={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jc=Wn(Ms),So=L({},Ms,{view:0,detail:0}),J0=Wn(So),eu,tu,Mo,Ca=L({},So,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:iu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Mo&&(Mo&&t.type==="mousemove"?(eu=t.screenX-Mo.screenX,tu=t.screenY-Mo.screenY):tu=eu=0,Mo=t),eu)},movementY:function(t){return"movementY"in t?t.movementY:tu}}),uh=Wn(Ca),ev=L({},Ca,{dataTransfer:0}),tv=Wn(ev),nv=L({},So,{relatedTarget:0}),nu=Wn(nv),iv=L({},Ms,{animationName:0,elapsedTime:0,pseudoElement:0}),rv=Wn(iv),sv=L({},Ms,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ov=Wn(sv),av=L({},Ms,{data:0}),fh=Wn(av),lv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},uv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fv(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=uv[t])?!!i[t]:!1}function iu(){return fv}var dv=L({},So,{key:function(t){if(t.key){var i=lv[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=Aa(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?cv[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:iu,charCode:function(t){return t.type==="keypress"?Aa(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Aa(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),hv=Wn(dv),pv=L({},Ca,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),dh=Wn(pv),mv=L({},So,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:iu}),gv=Wn(mv),vv=L({},Ms,{propertyName:0,elapsedTime:0,pseudoElement:0}),_v=Wn(vv),xv=L({},Ca,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),yv=Wn(xv),Sv=[9,13,27,32],ru=f&&"CompositionEvent"in window,Eo=null;f&&"documentMode"in document&&(Eo=document.documentMode);var Mv=f&&"TextEvent"in window&&!Eo,hh=f&&(!ru||Eo&&8<Eo&&11>=Eo),ph=" ",mh=!1;function gh(t,i){switch(t){case"keyup":return Sv.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function vh(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Es=!1;function Ev(t,i){switch(t){case"compositionend":return vh(i);case"keypress":return i.which!==32?null:(mh=!0,ph);case"textInput":return t=i.data,t===ph&&mh?null:t;default:return null}}function wv(t,i){if(Es)return t==="compositionend"||!ru&&gh(t,i)?(t=lh(),Ta=Qc=cr=null,Es=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return hh&&i.locale!=="ko"?null:i.data;default:return null}}var Tv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function _h(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!Tv[t.type]:i==="textarea"}function xh(t,i,o,c){Pe(c),i=Na(i,"onChange"),0<i.length&&(o=new Jc("onChange","change",null,o,c),t.push({event:o,listeners:i}))}var wo=null,To=null;function Av(t){Oh(t,0)}function ba(t){var i=Cs(t);if(Ke(i))return t}function Rv(t,i){if(t==="change")return i}var yh=!1;if(f){var su;if(f){var ou="oninput"in document;if(!ou){var Sh=document.createElement("div");Sh.setAttribute("oninput","return;"),ou=typeof Sh.oninput=="function"}su=ou}else su=!1;yh=su&&(!document.documentMode||9<document.documentMode)}function Mh(){wo&&(wo.detachEvent("onpropertychange",Eh),To=wo=null)}function Eh(t){if(t.propertyName==="value"&&ba(To)){var i=[];xh(i,To,t,q(t)),Un(Av,i)}}function Cv(t,i,o){t==="focusin"?(Mh(),wo=i,To=o,wo.attachEvent("onpropertychange",Eh)):t==="focusout"&&Mh()}function bv(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ba(To)}function Pv(t,i){if(t==="click")return ba(i)}function Lv(t,i){if(t==="input"||t==="change")return ba(i)}function Dv(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var ai=typeof Object.is=="function"?Object.is:Dv;function Ao(t,i){if(ai(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var o=Object.keys(t),c=Object.keys(i);if(o.length!==c.length)return!1;for(c=0;c<o.length;c++){var d=o[c];if(!h.call(i,d)||!ai(t[d],i[d]))return!1}return!0}function wh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Th(t,i){var o=wh(t);t=0;for(var c;o;){if(o.nodeType===3){if(c=t+o.textContent.length,t<=i&&c>=i)return{node:o,offset:i-t};t=c}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=wh(o)}}function Ah(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?Ah(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function Rh(){for(var t=window,i=Oe();i instanceof t.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)t=i.contentWindow;else break;i=Oe(t.document)}return i}function au(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}function Nv(t){var i=Rh(),o=t.focusedElem,c=t.selectionRange;if(i!==o&&o&&o.ownerDocument&&Ah(o.ownerDocument.documentElement,o)){if(c!==null&&au(o)){if(i=c.start,t=c.end,t===void 0&&(t=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(t,o.value.length);else if(t=(i=o.ownerDocument||document)&&i.defaultView||window,t.getSelection){t=t.getSelection();var d=o.textContent.length,m=Math.min(c.start,d);c=c.end===void 0?m:Math.min(c.end,d),!t.extend&&m>c&&(d=c,c=m,m=d),d=Th(o,m);var w=Th(o,c);d&&w&&(t.rangeCount!==1||t.anchorNode!==d.node||t.anchorOffset!==d.offset||t.focusNode!==w.node||t.focusOffset!==w.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),t.removeAllRanges(),m>c?(t.addRange(i),t.extend(w.node,w.offset)):(i.setEnd(w.node,w.offset),t.addRange(i)))}}for(i=[],t=o;t=t.parentNode;)t.nodeType===1&&i.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)t=i[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Iv=f&&"documentMode"in document&&11>=document.documentMode,ws=null,lu=null,Ro=null,cu=!1;function Ch(t,i,o){var c=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;cu||ws==null||ws!==Oe(c)||(c=ws,"selectionStart"in c&&au(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Ro&&Ao(Ro,c)||(Ro=c,c=Na(lu,"onSelect"),0<c.length&&(i=new Jc("onSelect","select",null,i,o),t.push({event:i,listeners:c}),i.target=ws)))}function Pa(t,i){var o={};return o[t.toLowerCase()]=i.toLowerCase(),o["Webkit"+t]="webkit"+i,o["Moz"+t]="moz"+i,o}var Ts={animationend:Pa("Animation","AnimationEnd"),animationiteration:Pa("Animation","AnimationIteration"),animationstart:Pa("Animation","AnimationStart"),transitionend:Pa("Transition","TransitionEnd")},uu={},bh={};f&&(bh=document.createElement("div").style,"AnimationEvent"in window||(delete Ts.animationend.animation,delete Ts.animationiteration.animation,delete Ts.animationstart.animation),"TransitionEvent"in window||delete Ts.transitionend.transition);function La(t){if(uu[t])return uu[t];if(!Ts[t])return t;var i=Ts[t],o;for(o in i)if(i.hasOwnProperty(o)&&o in bh)return uu[t]=i[o];return t}var Ph=La("animationend"),Lh=La("animationiteration"),Dh=La("animationstart"),Nh=La("transitionend"),Ih=new Map,Uh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ur(t,i){Ih.set(t,i),l(i,[t])}for(var fu=0;fu<Uh.length;fu++){var du=Uh[fu],Uv=du.toLowerCase(),Fv=du[0].toUpperCase()+du.slice(1);ur(Uv,"on"+Fv)}ur(Ph,"onAnimationEnd"),ur(Lh,"onAnimationIteration"),ur(Dh,"onAnimationStart"),ur("dblclick","onDoubleClick"),ur("focusin","onFocus"),ur("focusout","onBlur"),ur(Nh,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Co="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ov=new Set("cancel close invalid load scroll toggle".split(" ").concat(Co));function Fh(t,i,o){var c=t.type||"unknown-event";t.currentTarget=o,ma(c,i,void 0,t),t.currentTarget=null}function Oh(t,i){i=(i&4)!==0;for(var o=0;o<t.length;o++){var c=t[o],d=c.event;c=c.listeners;e:{var m=void 0;if(i)for(var w=c.length-1;0<=w;w--){var U=c[w],V=U.instance,ue=U.currentTarget;if(U=U.listener,V!==m&&d.isPropagationStopped())break e;Fh(d,U,ue),m=V}else for(w=0;w<c.length;w++){if(U=c[w],V=U.instance,ue=U.currentTarget,U=U.listener,V!==m&&d.isPropagationStopped())break e;Fh(d,U,ue),m=V}}}if(Br)throw t=ir,Br=!1,ir=null,t}function Bt(t,i){var o=i[yu];o===void 0&&(o=i[yu]=new Set);var c=t+"__bubble";o.has(c)||(kh(i,t,2,!1),o.add(c))}function hu(t,i,o){var c=0;i&&(c|=4),kh(o,t,c,i)}var Da="_reactListening"+Math.random().toString(36).slice(2);function bo(t){if(!t[Da]){t[Da]=!0,r.forEach(function(o){o!=="selectionchange"&&(Ov.has(o)||hu(o,!1,t),hu(o,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[Da]||(i[Da]=!0,hu("selectionchange",!1,i))}}function kh(t,i,o,c){switch(ah(i)){case 1:var d=Z0;break;case 4:d=Q0;break;default:d=Kc}o=d.bind(null,i,o,t),d=void 0,!xs||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),c?d!==void 0?t.addEventListener(i,o,{capture:!0,passive:d}):t.addEventListener(i,o,!0):d!==void 0?t.addEventListener(i,o,{passive:d}):t.addEventListener(i,o,!1)}function pu(t,i,o,c,d){var m=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var w=c.tag;if(w===3||w===4){var U=c.stateNode.containerInfo;if(U===d||U.nodeType===8&&U.parentNode===d)break;if(w===4)for(w=c.return;w!==null;){var V=w.tag;if((V===3||V===4)&&(V=w.stateNode.containerInfo,V===d||V.nodeType===8&&V.parentNode===d))return;w=w.return}for(;U!==null;){if(w=Hr(U),w===null)return;if(V=w.tag,V===5||V===6){c=m=w;continue e}U=U.parentNode}}c=c.return}Un(function(){var ue=m,Me=q(o),Ae=[];e:{var Se=Ih.get(t);if(Se!==void 0){var He=Jc,qe=t;switch(t){case"keypress":if(Aa(o)===0)break e;case"keydown":case"keyup":He=hv;break;case"focusin":qe="focus",He=nu;break;case"focusout":qe="blur",He=nu;break;case"beforeblur":case"afterblur":He=nu;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":He=uh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":He=tv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":He=gv;break;case Ph:case Lh:case Dh:He=rv;break;case Nh:He=_v;break;case"scroll":He=J0;break;case"wheel":He=yv;break;case"copy":case"cut":case"paste":He=ov;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":He=dh}var $e=(i&4)!==0,Kt=!$e&&t==="scroll",ee=$e?Se!==null?Se+"Capture":null:Se;$e=[];for(var j=ue,oe;j!==null;){oe=j;var be=oe.stateNode;if(oe.tag===5&&be!==null&&(oe=be,ee!==null&&(be=Rn(j,ee),be!=null&&$e.push(Po(j,be,oe)))),Kt)break;j=j.return}0<$e.length&&(Se=new He(Se,qe,null,o,Me),Ae.push({event:Se,listeners:$e}))}}if((i&7)===0){e:{if(Se=t==="mouseover"||t==="pointerover",He=t==="mouseout"||t==="pointerout",Se&&o!==Ct&&(qe=o.relatedTarget||o.fromElement)&&(Hr(qe)||qe[Ui]))break e;if((He||Se)&&(Se=Me.window===Me?Me:(Se=Me.ownerDocument)?Se.defaultView||Se.parentWindow:window,He?(qe=o.relatedTarget||o.toElement,He=ue,qe=qe?Hr(qe):null,qe!==null&&(Kt=Si(qe),qe!==Kt||qe.tag!==5&&qe.tag!==6)&&(qe=null)):(He=null,qe=ue),He!==qe)){if($e=uh,be="onMouseLeave",ee="onMouseEnter",j="mouse",(t==="pointerout"||t==="pointerover")&&($e=dh,be="onPointerLeave",ee="onPointerEnter",j="pointer"),Kt=He==null?Se:Cs(He),oe=qe==null?Se:Cs(qe),Se=new $e(be,j+"leave",He,o,Me),Se.target=Kt,Se.relatedTarget=oe,be=null,Hr(Me)===ue&&($e=new $e(ee,j+"enter",qe,o,Me),$e.target=oe,$e.relatedTarget=Kt,be=$e),Kt=be,He&&qe)t:{for($e=He,ee=qe,j=0,oe=$e;oe;oe=As(oe))j++;for(oe=0,be=ee;be;be=As(be))oe++;for(;0<j-oe;)$e=As($e),j--;for(;0<oe-j;)ee=As(ee),oe--;for(;j--;){if($e===ee||ee!==null&&$e===ee.alternate)break t;$e=As($e),ee=As(ee)}$e=null}else $e=null;He!==null&&zh(Ae,Se,He,$e,!1),qe!==null&&Kt!==null&&zh(Ae,Kt,qe,$e,!0)}}e:{if(Se=ue?Cs(ue):window,He=Se.nodeName&&Se.nodeName.toLowerCase(),He==="select"||He==="input"&&Se.type==="file")var Ze=Rv;else if(_h(Se))if(yh)Ze=Lv;else{Ze=bv;var rt=Cv}else(He=Se.nodeName)&&He.toLowerCase()==="input"&&(Se.type==="checkbox"||Se.type==="radio")&&(Ze=Pv);if(Ze&&(Ze=Ze(t,ue))){xh(Ae,Ze,o,Me);break e}rt&&rt(t,Se,ue),t==="focusout"&&(rt=Se._wrapperState)&&rt.controlled&&Se.type==="number"&&xt(Se,"number",Se.value)}switch(rt=ue?Cs(ue):window,t){case"focusin":(_h(rt)||rt.contentEditable==="true")&&(ws=rt,lu=ue,Ro=null);break;case"focusout":Ro=lu=ws=null;break;case"mousedown":cu=!0;break;case"contextmenu":case"mouseup":case"dragend":cu=!1,Ch(Ae,o,Me);break;case"selectionchange":if(Iv)break;case"keydown":case"keyup":Ch(Ae,o,Me)}var st;if(ru)e:{switch(t){case"compositionstart":var dt="onCompositionStart";break e;case"compositionend":dt="onCompositionEnd";break e;case"compositionupdate":dt="onCompositionUpdate";break e}dt=void 0}else Es?gh(t,o)&&(dt="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(dt="onCompositionStart");dt&&(hh&&o.locale!=="ko"&&(Es||dt!=="onCompositionStart"?dt==="onCompositionEnd"&&Es&&(st=lh()):(cr=Me,Qc="value"in cr?cr.value:cr.textContent,Es=!0)),rt=Na(ue,dt),0<rt.length&&(dt=new fh(dt,t,null,o,Me),Ae.push({event:dt,listeners:rt}),st?dt.data=st:(st=vh(o),st!==null&&(dt.data=st)))),(st=Mv?Ev(t,o):wv(t,o))&&(ue=Na(ue,"onBeforeInput"),0<ue.length&&(Me=new fh("onBeforeInput","beforeinput",null,o,Me),Ae.push({event:Me,listeners:ue}),Me.data=st))}Oh(Ae,i)})}function Po(t,i,o){return{instance:t,listener:i,currentTarget:o}}function Na(t,i){for(var o=i+"Capture",c=[];t!==null;){var d=t,m=d.stateNode;d.tag===5&&m!==null&&(d=m,m=Rn(t,o),m!=null&&c.unshift(Po(t,m,d)),m=Rn(t,i),m!=null&&c.push(Po(t,m,d))),t=t.return}return c}function As(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function zh(t,i,o,c,d){for(var m=i._reactName,w=[];o!==null&&o!==c;){var U=o,V=U.alternate,ue=U.stateNode;if(V!==null&&V===c)break;U.tag===5&&ue!==null&&(U=ue,d?(V=Rn(o,m),V!=null&&w.unshift(Po(o,V,U))):d||(V=Rn(o,m),V!=null&&w.push(Po(o,V,U)))),o=o.return}w.length!==0&&t.push({event:i,listeners:w})}var kv=/\r\n?/g,zv=/\u0000|\uFFFD/g;function Bh(t){return(typeof t=="string"?t:""+t).replace(kv,`
`).replace(zv,"")}function Ia(t,i,o){if(i=Bh(i),Bh(t)!==i&&o)throw Error(n(425))}function Ua(){}var mu=null,gu=null;function vu(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var _u=typeof setTimeout=="function"?setTimeout:void 0,Bv=typeof clearTimeout=="function"?clearTimeout:void 0,Hh=typeof Promise=="function"?Promise:void 0,Hv=typeof queueMicrotask=="function"?queueMicrotask:typeof Hh<"u"?function(t){return Hh.resolve(null).then(t).catch(Vv)}:_u;function Vv(t){setTimeout(function(){throw t})}function xu(t,i){var o=i,c=0;do{var d=o.nextSibling;if(t.removeChild(o),d&&d.nodeType===8)if(o=d.data,o==="/$"){if(c===0){t.removeChild(d),yo(i);return}c--}else o!=="$"&&o!=="$?"&&o!=="$!"||c++;o=d}while(o);yo(i)}function fr(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return t}function Vh(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return t;i--}else o==="/$"&&i++}t=t.previousSibling}return null}var Rs=Math.random().toString(36).slice(2),Ei="__reactFiber$"+Rs,Lo="__reactProps$"+Rs,Ui="__reactContainer$"+Rs,yu="__reactEvents$"+Rs,Gv="__reactListeners$"+Rs,Wv="__reactHandles$"+Rs;function Hr(t){var i=t[Ei];if(i)return i;for(var o=t.parentNode;o;){if(i=o[Ui]||o[Ei]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(t=Vh(t);t!==null;){if(o=t[Ei])return o;t=Vh(t)}return i}t=o,o=t.parentNode}return null}function Do(t){return t=t[Ei]||t[Ui],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Cs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function Fa(t){return t[Lo]||null}var Su=[],bs=-1;function dr(t){return{current:t}}function Ht(t){0>bs||(t.current=Su[bs],Su[bs]=null,bs--)}function kt(t,i){bs++,Su[bs]=t.current,t.current=i}var hr={},yn=dr(hr),Fn=dr(!1),Vr=hr;function Ps(t,i){var o=t.type.contextTypes;if(!o)return hr;var c=t.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var d={},m;for(m in o)d[m]=i[m];return c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=d),d}function On(t){return t=t.childContextTypes,t!=null}function Oa(){Ht(Fn),Ht(yn)}function Gh(t,i,o){if(yn.current!==hr)throw Error(n(168));kt(yn,i),kt(Fn,o)}function Wh(t,i,o){var c=t.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return o;c=c.getChildContext();for(var d in c)if(!(d in i))throw Error(n(108,ae(t)||"Unknown",d));return L({},o,c)}function ka(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||hr,Vr=yn.current,kt(yn,t),kt(Fn,Fn.current),!0}function Xh(t,i,o){var c=t.stateNode;if(!c)throw Error(n(169));o?(t=Wh(t,i,Vr),c.__reactInternalMemoizedMergedChildContext=t,Ht(Fn),Ht(yn),kt(yn,t)):Ht(Fn),kt(Fn,o)}var Fi=null,za=!1,Mu=!1;function jh(t){Fi===null?Fi=[t]:Fi.push(t)}function Xv(t){za=!0,jh(t)}function pr(){if(!Mu&&Fi!==null){Mu=!0;var t=0,i=Pt;try{var o=Fi;for(Pt=1;t<o.length;t++){var c=o[t];do c=c(!0);while(c!==null)}Fi=null,za=!1}catch(d){throw Fi!==null&&(Fi=Fi.slice(t+1)),ya(Re,pr),d}finally{Pt=i,Mu=!1}}return null}var Ls=[],Ds=0,Ba=null,Ha=0,Kn=[],Zn=0,Gr=null,Oi=1,ki="";function Wr(t,i){Ls[Ds++]=Ha,Ls[Ds++]=Ba,Ba=t,Ha=i}function qh(t,i,o){Kn[Zn++]=Oi,Kn[Zn++]=ki,Kn[Zn++]=Gr,Gr=t;var c=Oi;t=ki;var d=32-pt(c)-1;c&=~(1<<d),o+=1;var m=32-pt(i)+d;if(30<m){var w=d-d%5;m=(c&(1<<w)-1).toString(32),c>>=w,d-=w,Oi=1<<32-pt(i)+d|o<<d|c,ki=m+t}else Oi=1<<m|o<<d|c,ki=t}function Eu(t){t.return!==null&&(Wr(t,1),qh(t,1,0))}function wu(t){for(;t===Ba;)Ba=Ls[--Ds],Ls[Ds]=null,Ha=Ls[--Ds],Ls[Ds]=null;for(;t===Gr;)Gr=Kn[--Zn],Kn[Zn]=null,ki=Kn[--Zn],Kn[Zn]=null,Oi=Kn[--Zn],Kn[Zn]=null}var Xn=null,jn=null,Gt=!1,li=null;function Yh(t,i){var o=ti(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=t,i=t.deletions,i===null?(t.deletions=[o],t.flags|=16):i.push(o)}function $h(t,i){switch(t.tag){case 5:var o=t.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(t.stateNode=i,Xn=t,jn=fr(i.firstChild),!0):!1;case 6:return i=t.pendingProps===""||i.nodeType!==3?null:i,i!==null?(t.stateNode=i,Xn=t,jn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=Gr!==null?{id:Oi,overflow:ki}:null,t.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=ti(18,null,null,0),o.stateNode=i,o.return=t,t.child=o,Xn=t,jn=null,!0):!1;default:return!1}}function Tu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Au(t){if(Gt){var i=jn;if(i){var o=i;if(!$h(t,i)){if(Tu(t))throw Error(n(418));i=fr(o.nextSibling);var c=Xn;i&&$h(t,i)?Yh(c,o):(t.flags=t.flags&-4097|2,Gt=!1,Xn=t)}}else{if(Tu(t))throw Error(n(418));t.flags=t.flags&-4097|2,Gt=!1,Xn=t}}}function Kh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Xn=t}function Va(t){if(t!==Xn)return!1;if(!Gt)return Kh(t),Gt=!0,!1;var i;if((i=t.tag!==3)&&!(i=t.tag!==5)&&(i=t.type,i=i!=="head"&&i!=="body"&&!vu(t.type,t.memoizedProps)),i&&(i=jn)){if(Tu(t))throw Zh(),Error(n(418));for(;i;)Yh(t,i),i=fr(i.nextSibling)}if(Kh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(i===0){jn=fr(t.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}t=t.nextSibling}jn=null}}else jn=Xn?fr(t.stateNode.nextSibling):null;return!0}function Zh(){for(var t=jn;t;)t=fr(t.nextSibling)}function Ns(){jn=Xn=null,Gt=!1}function Ru(t){li===null?li=[t]:li.push(t)}var jv=C.ReactCurrentBatchConfig;function No(t,i,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var c=o.stateNode}if(!c)throw Error(n(147,t));var d=c,m=""+t;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===m?i.ref:(i=function(w){var U=d.refs;w===null?delete U[m]:U[m]=w},i._stringRef=m,i)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function Ga(t,i){throw t=Object.prototype.toString.call(i),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t))}function Qh(t){var i=t._init;return i(t._payload)}function Jh(t){function i(ee,j){if(t){var oe=ee.deletions;oe===null?(ee.deletions=[j],ee.flags|=16):oe.push(j)}}function o(ee,j){if(!t)return null;for(;j!==null;)i(ee,j),j=j.sibling;return null}function c(ee,j){for(ee=new Map;j!==null;)j.key!==null?ee.set(j.key,j):ee.set(j.index,j),j=j.sibling;return ee}function d(ee,j){return ee=Mr(ee,j),ee.index=0,ee.sibling=null,ee}function m(ee,j,oe){return ee.index=oe,t?(oe=ee.alternate,oe!==null?(oe=oe.index,oe<j?(ee.flags|=2,j):oe):(ee.flags|=2,j)):(ee.flags|=1048576,j)}function w(ee){return t&&ee.alternate===null&&(ee.flags|=2),ee}function U(ee,j,oe,be){return j===null||j.tag!==6?(j=xf(oe,ee.mode,be),j.return=ee,j):(j=d(j,oe),j.return=ee,j)}function V(ee,j,oe,be){var Ze=oe.type;return Ze===O?Me(ee,j,oe.props.children,be,oe.key):j!==null&&(j.elementType===Ze||typeof Ze=="object"&&Ze!==null&&Ze.$$typeof===Q&&Qh(Ze)===j.type)?(be=d(j,oe.props),be.ref=No(ee,j,oe),be.return=ee,be):(be=hl(oe.type,oe.key,oe.props,null,ee.mode,be),be.ref=No(ee,j,oe),be.return=ee,be)}function ue(ee,j,oe,be){return j===null||j.tag!==4||j.stateNode.containerInfo!==oe.containerInfo||j.stateNode.implementation!==oe.implementation?(j=yf(oe,ee.mode,be),j.return=ee,j):(j=d(j,oe.children||[]),j.return=ee,j)}function Me(ee,j,oe,be,Ze){return j===null||j.tag!==7?(j=Qr(oe,ee.mode,be,Ze),j.return=ee,j):(j=d(j,oe),j.return=ee,j)}function Ae(ee,j,oe){if(typeof j=="string"&&j!==""||typeof j=="number")return j=xf(""+j,ee.mode,oe),j.return=ee,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case z:return oe=hl(j.type,j.key,j.props,null,ee.mode,oe),oe.ref=No(ee,null,j),oe.return=ee,oe;case k:return j=yf(j,ee.mode,oe),j.return=ee,j;case Q:var be=j._init;return Ae(ee,be(j._payload),oe)}if(ke(j)||he(j))return j=Qr(j,ee.mode,oe,null),j.return=ee,j;Ga(ee,j)}return null}function Se(ee,j,oe,be){var Ze=j!==null?j.key:null;if(typeof oe=="string"&&oe!==""||typeof oe=="number")return Ze!==null?null:U(ee,j,""+oe,be);if(typeof oe=="object"&&oe!==null){switch(oe.$$typeof){case z:return oe.key===Ze?V(ee,j,oe,be):null;case k:return oe.key===Ze?ue(ee,j,oe,be):null;case Q:return Ze=oe._init,Se(ee,j,Ze(oe._payload),be)}if(ke(oe)||he(oe))return Ze!==null?null:Me(ee,j,oe,be,null);Ga(ee,oe)}return null}function He(ee,j,oe,be,Ze){if(typeof be=="string"&&be!==""||typeof be=="number")return ee=ee.get(oe)||null,U(j,ee,""+be,Ze);if(typeof be=="object"&&be!==null){switch(be.$$typeof){case z:return ee=ee.get(be.key===null?oe:be.key)||null,V(j,ee,be,Ze);case k:return ee=ee.get(be.key===null?oe:be.key)||null,ue(j,ee,be,Ze);case Q:var rt=be._init;return He(ee,j,oe,rt(be._payload),Ze)}if(ke(be)||he(be))return ee=ee.get(oe)||null,Me(j,ee,be,Ze,null);Ga(j,be)}return null}function qe(ee,j,oe,be){for(var Ze=null,rt=null,st=j,dt=j=0,un=null;st!==null&&dt<oe.length;dt++){st.index>dt?(un=st,st=null):un=st.sibling;var Nt=Se(ee,st,oe[dt],be);if(Nt===null){st===null&&(st=un);break}t&&st&&Nt.alternate===null&&i(ee,st),j=m(Nt,j,dt),rt===null?Ze=Nt:rt.sibling=Nt,rt=Nt,st=un}if(dt===oe.length)return o(ee,st),Gt&&Wr(ee,dt),Ze;if(st===null){for(;dt<oe.length;dt++)st=Ae(ee,oe[dt],be),st!==null&&(j=m(st,j,dt),rt===null?Ze=st:rt.sibling=st,rt=st);return Gt&&Wr(ee,dt),Ze}for(st=c(ee,st);dt<oe.length;dt++)un=He(st,ee,dt,oe[dt],be),un!==null&&(t&&un.alternate!==null&&st.delete(un.key===null?dt:un.key),j=m(un,j,dt),rt===null?Ze=un:rt.sibling=un,rt=un);return t&&st.forEach(function(Er){return i(ee,Er)}),Gt&&Wr(ee,dt),Ze}function $e(ee,j,oe,be){var Ze=he(oe);if(typeof Ze!="function")throw Error(n(150));if(oe=Ze.call(oe),oe==null)throw Error(n(151));for(var rt=Ze=null,st=j,dt=j=0,un=null,Nt=oe.next();st!==null&&!Nt.done;dt++,Nt=oe.next()){st.index>dt?(un=st,st=null):un=st.sibling;var Er=Se(ee,st,Nt.value,be);if(Er===null){st===null&&(st=un);break}t&&st&&Er.alternate===null&&i(ee,st),j=m(Er,j,dt),rt===null?Ze=Er:rt.sibling=Er,rt=Er,st=un}if(Nt.done)return o(ee,st),Gt&&Wr(ee,dt),Ze;if(st===null){for(;!Nt.done;dt++,Nt=oe.next())Nt=Ae(ee,Nt.value,be),Nt!==null&&(j=m(Nt,j,dt),rt===null?Ze=Nt:rt.sibling=Nt,rt=Nt);return Gt&&Wr(ee,dt),Ze}for(st=c(ee,st);!Nt.done;dt++,Nt=oe.next())Nt=He(st,ee,dt,Nt.value,be),Nt!==null&&(t&&Nt.alternate!==null&&st.delete(Nt.key===null?dt:Nt.key),j=m(Nt,j,dt),rt===null?Ze=Nt:rt.sibling=Nt,rt=Nt);return t&&st.forEach(function(T_){return i(ee,T_)}),Gt&&Wr(ee,dt),Ze}function Kt(ee,j,oe,be){if(typeof oe=="object"&&oe!==null&&oe.type===O&&oe.key===null&&(oe=oe.props.children),typeof oe=="object"&&oe!==null){switch(oe.$$typeof){case z:e:{for(var Ze=oe.key,rt=j;rt!==null;){if(rt.key===Ze){if(Ze=oe.type,Ze===O){if(rt.tag===7){o(ee,rt.sibling),j=d(rt,oe.props.children),j.return=ee,ee=j;break e}}else if(rt.elementType===Ze||typeof Ze=="object"&&Ze!==null&&Ze.$$typeof===Q&&Qh(Ze)===rt.type){o(ee,rt.sibling),j=d(rt,oe.props),j.ref=No(ee,rt,oe),j.return=ee,ee=j;break e}o(ee,rt);break}else i(ee,rt);rt=rt.sibling}oe.type===O?(j=Qr(oe.props.children,ee.mode,be,oe.key),j.return=ee,ee=j):(be=hl(oe.type,oe.key,oe.props,null,ee.mode,be),be.ref=No(ee,j,oe),be.return=ee,ee=be)}return w(ee);case k:e:{for(rt=oe.key;j!==null;){if(j.key===rt)if(j.tag===4&&j.stateNode.containerInfo===oe.containerInfo&&j.stateNode.implementation===oe.implementation){o(ee,j.sibling),j=d(j,oe.children||[]),j.return=ee,ee=j;break e}else{o(ee,j);break}else i(ee,j);j=j.sibling}j=yf(oe,ee.mode,be),j.return=ee,ee=j}return w(ee);case Q:return rt=oe._init,Kt(ee,j,rt(oe._payload),be)}if(ke(oe))return qe(ee,j,oe,be);if(he(oe))return $e(ee,j,oe,be);Ga(ee,oe)}return typeof oe=="string"&&oe!==""||typeof oe=="number"?(oe=""+oe,j!==null&&j.tag===6?(o(ee,j.sibling),j=d(j,oe),j.return=ee,ee=j):(o(ee,j),j=xf(oe,ee.mode,be),j.return=ee,ee=j),w(ee)):o(ee,j)}return Kt}var Is=Jh(!0),ep=Jh(!1),Wa=dr(null),Xa=null,Us=null,Cu=null;function bu(){Cu=Us=Xa=null}function Pu(t){var i=Wa.current;Ht(Wa),t._currentValue=i}function Lu(t,i,o){for(;t!==null;){var c=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),t===o)break;t=t.return}}function Fs(t,i){Xa=t,Cu=Us=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&i)!==0&&(kn=!0),t.firstContext=null)}function Qn(t){var i=t._currentValue;if(Cu!==t)if(t={context:t,memoizedValue:i,next:null},Us===null){if(Xa===null)throw Error(n(308));Us=t,Xa.dependencies={lanes:0,firstContext:t}}else Us=Us.next=t;return i}var Xr=null;function Du(t){Xr===null?Xr=[t]:Xr.push(t)}function tp(t,i,o,c){var d=i.interleaved;return d===null?(o.next=o,Du(i)):(o.next=d.next,d.next=o),i.interleaved=o,zi(t,c)}function zi(t,i){t.lanes|=i;var o=t.alternate;for(o!==null&&(o.lanes|=i),o=t,t=t.return;t!==null;)t.childLanes|=i,o=t.alternate,o!==null&&(o.childLanes|=i),o=t,t=t.return;return o.tag===3?o.stateNode:null}var mr=!1;function Nu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function np(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Bi(t,i){return{eventTime:t,lane:i,tag:0,payload:null,callback:null,next:null}}function gr(t,i,o){var c=t.updateQueue;if(c===null)return null;if(c=c.shared,(Lt&2)!==0){var d=c.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),c.pending=i,zi(t,o)}return d=c.interleaved,d===null?(i.next=i,Du(c)):(i.next=d.next,d.next=i),c.interleaved=i,zi(t,o)}function ja(t,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var c=i.lanes;c&=t.pendingLanes,o|=c,i.lanes=o,an(t,o)}}function ip(t,i){var o=t.updateQueue,c=t.alternate;if(c!==null&&(c=c.updateQueue,o===c)){var d=null,m=null;if(o=o.firstBaseUpdate,o!==null){do{var w={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};m===null?d=m=w:m=m.next=w,o=o.next}while(o!==null);m===null?d=m=i:m=m.next=i}else d=m=i;o={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:m,shared:c.shared,effects:c.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=i:t.next=i,o.lastBaseUpdate=i}function qa(t,i,o,c){var d=t.updateQueue;mr=!1;var m=d.firstBaseUpdate,w=d.lastBaseUpdate,U=d.shared.pending;if(U!==null){d.shared.pending=null;var V=U,ue=V.next;V.next=null,w===null?m=ue:w.next=ue,w=V;var Me=t.alternate;Me!==null&&(Me=Me.updateQueue,U=Me.lastBaseUpdate,U!==w&&(U===null?Me.firstBaseUpdate=ue:U.next=ue,Me.lastBaseUpdate=V))}if(m!==null){var Ae=d.baseState;w=0,Me=ue=V=null,U=m;do{var Se=U.lane,He=U.eventTime;if((c&Se)===Se){Me!==null&&(Me=Me.next={eventTime:He,lane:0,tag:U.tag,payload:U.payload,callback:U.callback,next:null});e:{var qe=t,$e=U;switch(Se=i,He=o,$e.tag){case 1:if(qe=$e.payload,typeof qe=="function"){Ae=qe.call(He,Ae,Se);break e}Ae=qe;break e;case 3:qe.flags=qe.flags&-65537|128;case 0:if(qe=$e.payload,Se=typeof qe=="function"?qe.call(He,Ae,Se):qe,Se==null)break e;Ae=L({},Ae,Se);break e;case 2:mr=!0}}U.callback!==null&&U.lane!==0&&(t.flags|=64,Se=d.effects,Se===null?d.effects=[U]:Se.push(U))}else He={eventTime:He,lane:Se,tag:U.tag,payload:U.payload,callback:U.callback,next:null},Me===null?(ue=Me=He,V=Ae):Me=Me.next=He,w|=Se;if(U=U.next,U===null){if(U=d.shared.pending,U===null)break;Se=U,U=Se.next,Se.next=null,d.lastBaseUpdate=Se,d.shared.pending=null}}while(!0);if(Me===null&&(V=Ae),d.baseState=V,d.firstBaseUpdate=ue,d.lastBaseUpdate=Me,i=d.shared.interleaved,i!==null){d=i;do w|=d.lane,d=d.next;while(d!==i)}else m===null&&(d.shared.lanes=0);Yr|=w,t.lanes=w,t.memoizedState=Ae}}function rp(t,i,o){if(t=i.effects,i.effects=null,t!==null)for(i=0;i<t.length;i++){var c=t[i],d=c.callback;if(d!==null){if(c.callback=null,c=o,typeof d!="function")throw Error(n(191,d));d.call(c)}}}var Io={},wi=dr(Io),Uo=dr(Io),Fo=dr(Io);function jr(t){if(t===Io)throw Error(n(174));return t}function Iu(t,i){switch(kt(Fo,i),kt(Uo,t),kt(wi,Io),t=i.nodeType,t){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Xe(null,"");break;default:t=t===8?i.parentNode:i,i=t.namespaceURI||null,t=t.tagName,i=Xe(i,t)}Ht(wi),kt(wi,i)}function Os(){Ht(wi),Ht(Uo),Ht(Fo)}function sp(t){jr(Fo.current);var i=jr(wi.current),o=Xe(i,t.type);i!==o&&(kt(Uo,t),kt(wi,o))}function Uu(t){Uo.current===t&&(Ht(wi),Ht(Uo))}var Xt=dr(0);function Ya(t){for(var i=t;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Fu=[];function Ou(){for(var t=0;t<Fu.length;t++)Fu[t]._workInProgressVersionPrimary=null;Fu.length=0}var $a=C.ReactCurrentDispatcher,ku=C.ReactCurrentBatchConfig,qr=0,jt=null,en=null,ln=null,Ka=!1,Oo=!1,ko=0,qv=0;function Sn(){throw Error(n(321))}function zu(t,i){if(i===null)return!1;for(var o=0;o<i.length&&o<t.length;o++)if(!ai(t[o],i[o]))return!1;return!0}function Bu(t,i,o,c,d,m){if(qr=m,jt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,$a.current=t===null||t.memoizedState===null?Zv:Qv,t=o(c,d),Oo){m=0;do{if(Oo=!1,ko=0,25<=m)throw Error(n(301));m+=1,ln=en=null,i.updateQueue=null,$a.current=Jv,t=o(c,d)}while(Oo)}if($a.current=Ja,i=en!==null&&en.next!==null,qr=0,ln=en=jt=null,Ka=!1,i)throw Error(n(300));return t}function Hu(){var t=ko!==0;return ko=0,t}function Ti(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ln===null?jt.memoizedState=ln=t:ln=ln.next=t,ln}function Jn(){if(en===null){var t=jt.alternate;t=t!==null?t.memoizedState:null}else t=en.next;var i=ln===null?jt.memoizedState:ln.next;if(i!==null)ln=i,en=t;else{if(t===null)throw Error(n(310));en=t,t={memoizedState:en.memoizedState,baseState:en.baseState,baseQueue:en.baseQueue,queue:en.queue,next:null},ln===null?jt.memoizedState=ln=t:ln=ln.next=t}return ln}function zo(t,i){return typeof i=="function"?i(t):i}function Vu(t){var i=Jn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=en,d=c.baseQueue,m=o.pending;if(m!==null){if(d!==null){var w=d.next;d.next=m.next,m.next=w}c.baseQueue=d=m,o.pending=null}if(d!==null){m=d.next,c=c.baseState;var U=w=null,V=null,ue=m;do{var Me=ue.lane;if((qr&Me)===Me)V!==null&&(V=V.next={lane:0,action:ue.action,hasEagerState:ue.hasEagerState,eagerState:ue.eagerState,next:null}),c=ue.hasEagerState?ue.eagerState:t(c,ue.action);else{var Ae={lane:Me,action:ue.action,hasEagerState:ue.hasEagerState,eagerState:ue.eagerState,next:null};V===null?(U=V=Ae,w=c):V=V.next=Ae,jt.lanes|=Me,Yr|=Me}ue=ue.next}while(ue!==null&&ue!==m);V===null?w=c:V.next=U,ai(c,i.memoizedState)||(kn=!0),i.memoizedState=c,i.baseState=w,i.baseQueue=V,o.lastRenderedState=c}if(t=o.interleaved,t!==null){d=t;do m=d.lane,jt.lanes|=m,Yr|=m,d=d.next;while(d!==t)}else d===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function Gu(t){var i=Jn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=o.dispatch,d=o.pending,m=i.memoizedState;if(d!==null){o.pending=null;var w=d=d.next;do m=t(m,w.action),w=w.next;while(w!==d);ai(m,i.memoizedState)||(kn=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),o.lastRenderedState=m}return[m,c]}function op(){}function ap(t,i){var o=jt,c=Jn(),d=i(),m=!ai(c.memoizedState,d);if(m&&(c.memoizedState=d,kn=!0),c=c.queue,Wu(up.bind(null,o,c,t),[t]),c.getSnapshot!==i||m||ln!==null&&ln.memoizedState.tag&1){if(o.flags|=2048,Bo(9,cp.bind(null,o,c,d,i),void 0,null),cn===null)throw Error(n(349));(qr&30)!==0||lp(o,i,d)}return d}function lp(t,i,o){t.flags|=16384,t={getSnapshot:i,value:o},i=jt.updateQueue,i===null?(i={lastEffect:null,stores:null},jt.updateQueue=i,i.stores=[t]):(o=i.stores,o===null?i.stores=[t]:o.push(t))}function cp(t,i,o,c){i.value=o,i.getSnapshot=c,fp(i)&&dp(t)}function up(t,i,o){return o(function(){fp(i)&&dp(t)})}function fp(t){var i=t.getSnapshot;t=t.value;try{var o=i();return!ai(t,o)}catch{return!0}}function dp(t){var i=zi(t,1);i!==null&&di(i,t,1,-1)}function hp(t){var i=Ti();return typeof t=="function"&&(t=t()),i.memoizedState=i.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:t},i.queue=t,t=t.dispatch=Kv.bind(null,jt,t),[i.memoizedState,t]}function Bo(t,i,o,c){return t={tag:t,create:i,destroy:o,deps:c,next:null},i=jt.updateQueue,i===null?(i={lastEffect:null,stores:null},jt.updateQueue=i,i.lastEffect=t.next=t):(o=i.lastEffect,o===null?i.lastEffect=t.next=t:(c=o.next,o.next=t,t.next=c,i.lastEffect=t)),t}function pp(){return Jn().memoizedState}function Za(t,i,o,c){var d=Ti();jt.flags|=t,d.memoizedState=Bo(1|i,o,void 0,c===void 0?null:c)}function Qa(t,i,o,c){var d=Jn();c=c===void 0?null:c;var m=void 0;if(en!==null){var w=en.memoizedState;if(m=w.destroy,c!==null&&zu(c,w.deps)){d.memoizedState=Bo(i,o,m,c);return}}jt.flags|=t,d.memoizedState=Bo(1|i,o,m,c)}function mp(t,i){return Za(8390656,8,t,i)}function Wu(t,i){return Qa(2048,8,t,i)}function gp(t,i){return Qa(4,2,t,i)}function vp(t,i){return Qa(4,4,t,i)}function _p(t,i){if(typeof i=="function")return t=t(),i(t),function(){i(null)};if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function xp(t,i,o){return o=o!=null?o.concat([t]):null,Qa(4,4,_p.bind(null,i,t),o)}function Xu(){}function yp(t,i){var o=Jn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&zu(i,c[1])?c[0]:(o.memoizedState=[t,i],t)}function Sp(t,i){var o=Jn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&zu(i,c[1])?c[0]:(t=t(),o.memoizedState=[t,i],t)}function Mp(t,i,o){return(qr&21)===0?(t.baseState&&(t.baseState=!1,kn=!0),t.memoizedState=o):(ai(o,i)||(o=Ft(),jt.lanes|=o,Yr|=o,t.baseState=!0),i)}function Yv(t,i){var o=Pt;Pt=o!==0&&4>o?o:4,t(!0);var c=ku.transition;ku.transition={};try{t(!1),i()}finally{Pt=o,ku.transition=c}}function Ep(){return Jn().memoizedState}function $v(t,i,o){var c=yr(t);if(o={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null},wp(t))Tp(i,o);else if(o=tp(t,i,o,c),o!==null){var d=Pn();di(o,t,c,d),Ap(o,i,c)}}function Kv(t,i,o){var c=yr(t),d={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null};if(wp(t))Tp(i,d);else{var m=t.alternate;if(t.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var w=i.lastRenderedState,U=m(w,o);if(d.hasEagerState=!0,d.eagerState=U,ai(U,w)){var V=i.interleaved;V===null?(d.next=d,Du(i)):(d.next=V.next,V.next=d),i.interleaved=d;return}}catch{}finally{}o=tp(t,i,d,c),o!==null&&(d=Pn(),di(o,t,c,d),Ap(o,i,c))}}function wp(t){var i=t.alternate;return t===jt||i!==null&&i===jt}function Tp(t,i){Oo=Ka=!0;var o=t.pending;o===null?i.next=i:(i.next=o.next,o.next=i),t.pending=i}function Ap(t,i,o){if((o&4194240)!==0){var c=i.lanes;c&=t.pendingLanes,o|=c,i.lanes=o,an(t,o)}}var Ja={readContext:Qn,useCallback:Sn,useContext:Sn,useEffect:Sn,useImperativeHandle:Sn,useInsertionEffect:Sn,useLayoutEffect:Sn,useMemo:Sn,useReducer:Sn,useRef:Sn,useState:Sn,useDebugValue:Sn,useDeferredValue:Sn,useTransition:Sn,useMutableSource:Sn,useSyncExternalStore:Sn,useId:Sn,unstable_isNewReconciler:!1},Zv={readContext:Qn,useCallback:function(t,i){return Ti().memoizedState=[t,i===void 0?null:i],t},useContext:Qn,useEffect:mp,useImperativeHandle:function(t,i,o){return o=o!=null?o.concat([t]):null,Za(4194308,4,_p.bind(null,i,t),o)},useLayoutEffect:function(t,i){return Za(4194308,4,t,i)},useInsertionEffect:function(t,i){return Za(4,2,t,i)},useMemo:function(t,i){var o=Ti();return i=i===void 0?null:i,t=t(),o.memoizedState=[t,i],t},useReducer:function(t,i,o){var c=Ti();return i=o!==void 0?o(i):i,c.memoizedState=c.baseState=i,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},c.queue=t,t=t.dispatch=$v.bind(null,jt,t),[c.memoizedState,t]},useRef:function(t){var i=Ti();return t={current:t},i.memoizedState=t},useState:hp,useDebugValue:Xu,useDeferredValue:function(t){return Ti().memoizedState=t},useTransition:function(){var t=hp(!1),i=t[0];return t=Yv.bind(null,t[1]),Ti().memoizedState=t,[i,t]},useMutableSource:function(){},useSyncExternalStore:function(t,i,o){var c=jt,d=Ti();if(Gt){if(o===void 0)throw Error(n(407));o=o()}else{if(o=i(),cn===null)throw Error(n(349));(qr&30)!==0||lp(c,i,o)}d.memoizedState=o;var m={value:o,getSnapshot:i};return d.queue=m,mp(up.bind(null,c,m,t),[t]),c.flags|=2048,Bo(9,cp.bind(null,c,m,o,i),void 0,null),o},useId:function(){var t=Ti(),i=cn.identifierPrefix;if(Gt){var o=ki,c=Oi;o=(c&~(1<<32-pt(c)-1)).toString(32)+o,i=":"+i+"R"+o,o=ko++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=qv++,i=":"+i+"r"+o.toString(32)+":";return t.memoizedState=i},unstable_isNewReconciler:!1},Qv={readContext:Qn,useCallback:yp,useContext:Qn,useEffect:Wu,useImperativeHandle:xp,useInsertionEffect:gp,useLayoutEffect:vp,useMemo:Sp,useReducer:Vu,useRef:pp,useState:function(){return Vu(zo)},useDebugValue:Xu,useDeferredValue:function(t){var i=Jn();return Mp(i,en.memoizedState,t)},useTransition:function(){var t=Vu(zo)[0],i=Jn().memoizedState;return[t,i]},useMutableSource:op,useSyncExternalStore:ap,useId:Ep,unstable_isNewReconciler:!1},Jv={readContext:Qn,useCallback:yp,useContext:Qn,useEffect:Wu,useImperativeHandle:xp,useInsertionEffect:gp,useLayoutEffect:vp,useMemo:Sp,useReducer:Gu,useRef:pp,useState:function(){return Gu(zo)},useDebugValue:Xu,useDeferredValue:function(t){var i=Jn();return en===null?i.memoizedState=t:Mp(i,en.memoizedState,t)},useTransition:function(){var t=Gu(zo)[0],i=Jn().memoizedState;return[t,i]},useMutableSource:op,useSyncExternalStore:ap,useId:Ep,unstable_isNewReconciler:!1};function ci(t,i){if(t&&t.defaultProps){i=L({},i),t=t.defaultProps;for(var o in t)i[o]===void 0&&(i[o]=t[o]);return i}return i}function ju(t,i,o,c){i=t.memoizedState,o=o(c,i),o=o==null?i:L({},i,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var el={isMounted:function(t){return(t=t._reactInternals)?Si(t)===t:!1},enqueueSetState:function(t,i,o){t=t._reactInternals;var c=Pn(),d=yr(t),m=Bi(c,d);m.payload=i,o!=null&&(m.callback=o),i=gr(t,m,d),i!==null&&(di(i,t,d,c),ja(i,t,d))},enqueueReplaceState:function(t,i,o){t=t._reactInternals;var c=Pn(),d=yr(t),m=Bi(c,d);m.tag=1,m.payload=i,o!=null&&(m.callback=o),i=gr(t,m,d),i!==null&&(di(i,t,d,c),ja(i,t,d))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var o=Pn(),c=yr(t),d=Bi(o,c);d.tag=2,i!=null&&(d.callback=i),i=gr(t,d,c),i!==null&&(di(i,t,c,o),ja(i,t,c))}};function Rp(t,i,o,c,d,m,w){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(c,m,w):i.prototype&&i.prototype.isPureReactComponent?!Ao(o,c)||!Ao(d,m):!0}function Cp(t,i,o){var c=!1,d=hr,m=i.contextType;return typeof m=="object"&&m!==null?m=Qn(m):(d=On(i)?Vr:yn.current,c=i.contextTypes,m=(c=c!=null)?Ps(t,d):hr),i=new i(o,m),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=el,t.stateNode=i,i._reactInternals=t,c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=d,t.__reactInternalMemoizedMaskedChildContext=m),i}function bp(t,i,o,c){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,c),i.state!==t&&el.enqueueReplaceState(i,i.state,null)}function qu(t,i,o,c){var d=t.stateNode;d.props=o,d.state=t.memoizedState,d.refs={},Nu(t);var m=i.contextType;typeof m=="object"&&m!==null?d.context=Qn(m):(m=On(i)?Vr:yn.current,d.context=Ps(t,m)),d.state=t.memoizedState,m=i.getDerivedStateFromProps,typeof m=="function"&&(ju(t,i,m,o),d.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&el.enqueueReplaceState(d,d.state,null),qa(t,o,d,c),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308)}function ks(t,i){try{var o="",c=i;do o+=ne(c),c=c.return;while(c);var d=o}catch(m){d=`
Error generating stack: `+m.message+`
`+m.stack}return{value:t,source:i,stack:d,digest:null}}function Yu(t,i,o){return{value:t,source:null,stack:o??null,digest:i??null}}function $u(t,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var e_=typeof WeakMap=="function"?WeakMap:Map;function Pp(t,i,o){o=Bi(-1,o),o.tag=3,o.payload={element:null};var c=i.value;return o.callback=function(){al||(al=!0,ff=c),$u(t,i)},o}function Lp(t,i,o){o=Bi(-1,o),o.tag=3;var c=t.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;o.payload=function(){return c(d)},o.callback=function(){$u(t,i)}}var m=t.stateNode;return m!==null&&typeof m.componentDidCatch=="function"&&(o.callback=function(){$u(t,i),typeof c!="function"&&(_r===null?_r=new Set([this]):_r.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})}),o}function Dp(t,i,o){var c=t.pingCache;if(c===null){c=t.pingCache=new e_;var d=new Set;c.set(i,d)}else d=c.get(i),d===void 0&&(d=new Set,c.set(i,d));d.has(o)||(d.add(o),t=p_.bind(null,t,i,o),i.then(t,t))}function Np(t){do{var i;if((i=t.tag===13)&&(i=t.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return t;t=t.return}while(t!==null);return null}function Ip(t,i,o,c,d){return(t.mode&1)===0?(t===i?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Bi(-1,1),i.tag=2,gr(o,i,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=d,t)}var t_=C.ReactCurrentOwner,kn=!1;function bn(t,i,o,c){i.child=t===null?ep(i,null,o,c):Is(i,t.child,o,c)}function Up(t,i,o,c,d){o=o.render;var m=i.ref;return Fs(i,d),c=Bu(t,i,o,c,m,d),o=Hu(),t!==null&&!kn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~d,Hi(t,i,d)):(Gt&&o&&Eu(i),i.flags|=1,bn(t,i,c,d),i.child)}function Fp(t,i,o,c,d){if(t===null){var m=o.type;return typeof m=="function"&&!_f(m)&&m.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=m,Op(t,i,m,c,d)):(t=hl(o.type,null,c,i,i.mode,d),t.ref=i.ref,t.return=i,i.child=t)}if(m=t.child,(t.lanes&d)===0){var w=m.memoizedProps;if(o=o.compare,o=o!==null?o:Ao,o(w,c)&&t.ref===i.ref)return Hi(t,i,d)}return i.flags|=1,t=Mr(m,c),t.ref=i.ref,t.return=i,i.child=t}function Op(t,i,o,c,d){if(t!==null){var m=t.memoizedProps;if(Ao(m,c)&&t.ref===i.ref)if(kn=!1,i.pendingProps=c=m,(t.lanes&d)!==0)(t.flags&131072)!==0&&(kn=!0);else return i.lanes=t.lanes,Hi(t,i,d)}return Ku(t,i,o,c,d)}function kp(t,i,o){var c=i.pendingProps,d=c.children,m=t!==null?t.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},kt(Bs,qn),qn|=o;else{if((o&1073741824)===0)return t=m!==null?m.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:t,cachePool:null,transitions:null},i.updateQueue=null,kt(Bs,qn),qn|=t,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=m!==null?m.baseLanes:o,kt(Bs,qn),qn|=c}else m!==null?(c=m.baseLanes|o,i.memoizedState=null):c=o,kt(Bs,qn),qn|=c;return bn(t,i,d,o),i.child}function zp(t,i){var o=i.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function Ku(t,i,o,c,d){var m=On(o)?Vr:yn.current;return m=Ps(i,m),Fs(i,d),o=Bu(t,i,o,c,m,d),c=Hu(),t!==null&&!kn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~d,Hi(t,i,d)):(Gt&&c&&Eu(i),i.flags|=1,bn(t,i,o,d),i.child)}function Bp(t,i,o,c,d){if(On(o)){var m=!0;ka(i)}else m=!1;if(Fs(i,d),i.stateNode===null)nl(t,i),Cp(i,o,c),qu(i,o,c,d),c=!0;else if(t===null){var w=i.stateNode,U=i.memoizedProps;w.props=U;var V=w.context,ue=o.contextType;typeof ue=="object"&&ue!==null?ue=Qn(ue):(ue=On(o)?Vr:yn.current,ue=Ps(i,ue));var Me=o.getDerivedStateFromProps,Ae=typeof Me=="function"||typeof w.getSnapshotBeforeUpdate=="function";Ae||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(U!==c||V!==ue)&&bp(i,w,c,ue),mr=!1;var Se=i.memoizedState;w.state=Se,qa(i,c,w,d),V=i.memoizedState,U!==c||Se!==V||Fn.current||mr?(typeof Me=="function"&&(ju(i,o,Me,c),V=i.memoizedState),(U=mr||Rp(i,o,U,c,Se,V,ue))?(Ae||typeof w.UNSAFE_componentWillMount!="function"&&typeof w.componentWillMount!="function"||(typeof w.componentWillMount=="function"&&w.componentWillMount(),typeof w.UNSAFE_componentWillMount=="function"&&w.UNSAFE_componentWillMount()),typeof w.componentDidMount=="function"&&(i.flags|=4194308)):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=V),w.props=c,w.state=V,w.context=ue,c=U):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{w=i.stateNode,np(t,i),U=i.memoizedProps,ue=i.type===i.elementType?U:ci(i.type,U),w.props=ue,Ae=i.pendingProps,Se=w.context,V=o.contextType,typeof V=="object"&&V!==null?V=Qn(V):(V=On(o)?Vr:yn.current,V=Ps(i,V));var He=o.getDerivedStateFromProps;(Me=typeof He=="function"||typeof w.getSnapshotBeforeUpdate=="function")||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(U!==Ae||Se!==V)&&bp(i,w,c,V),mr=!1,Se=i.memoizedState,w.state=Se,qa(i,c,w,d);var qe=i.memoizedState;U!==Ae||Se!==qe||Fn.current||mr?(typeof He=="function"&&(ju(i,o,He,c),qe=i.memoizedState),(ue=mr||Rp(i,o,ue,c,Se,qe,V)||!1)?(Me||typeof w.UNSAFE_componentWillUpdate!="function"&&typeof w.componentWillUpdate!="function"||(typeof w.componentWillUpdate=="function"&&w.componentWillUpdate(c,qe,V),typeof w.UNSAFE_componentWillUpdate=="function"&&w.UNSAFE_componentWillUpdate(c,qe,V)),typeof w.componentDidUpdate=="function"&&(i.flags|=4),typeof w.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof w.componentDidUpdate!="function"||U===t.memoizedProps&&Se===t.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||U===t.memoizedProps&&Se===t.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=qe),w.props=c,w.state=qe,w.context=V,c=ue):(typeof w.componentDidUpdate!="function"||U===t.memoizedProps&&Se===t.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||U===t.memoizedProps&&Se===t.memoizedState||(i.flags|=1024),c=!1)}return Zu(t,i,o,c,m,d)}function Zu(t,i,o,c,d,m){zp(t,i);var w=(i.flags&128)!==0;if(!c&&!w)return d&&Xh(i,o,!1),Hi(t,i,m);c=i.stateNode,t_.current=i;var U=w&&typeof o.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,t!==null&&w?(i.child=Is(i,t.child,null,m),i.child=Is(i,null,U,m)):bn(t,i,U,m),i.memoizedState=c.state,d&&Xh(i,o,!0),i.child}function Hp(t){var i=t.stateNode;i.pendingContext?Gh(t,i.pendingContext,i.pendingContext!==i.context):i.context&&Gh(t,i.context,!1),Iu(t,i.containerInfo)}function Vp(t,i,o,c,d){return Ns(),Ru(d),i.flags|=256,bn(t,i,o,c),i.child}var Qu={dehydrated:null,treeContext:null,retryLane:0};function Ju(t){return{baseLanes:t,cachePool:null,transitions:null}}function Gp(t,i,o){var c=i.pendingProps,d=Xt.current,m=!1,w=(i.flags&128)!==0,U;if((U=w)||(U=t!==null&&t.memoizedState===null?!1:(d&2)!==0),U?(m=!0,i.flags&=-129):(t===null||t.memoizedState!==null)&&(d|=1),kt(Xt,d&1),t===null)return Au(i),t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((i.mode&1)===0?i.lanes=1:t.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(w=c.children,t=c.fallback,m?(c=i.mode,m=i.child,w={mode:"hidden",children:w},(c&1)===0&&m!==null?(m.childLanes=0,m.pendingProps=w):m=pl(w,c,0,null),t=Qr(t,c,o,null),m.return=i,t.return=i,m.sibling=t,i.child=m,i.child.memoizedState=Ju(o),i.memoizedState=Qu,t):ef(i,w));if(d=t.memoizedState,d!==null&&(U=d.dehydrated,U!==null))return n_(t,i,w,c,U,d,o);if(m){m=c.fallback,w=i.mode,d=t.child,U=d.sibling;var V={mode:"hidden",children:c.children};return(w&1)===0&&i.child!==d?(c=i.child,c.childLanes=0,c.pendingProps=V,i.deletions=null):(c=Mr(d,V),c.subtreeFlags=d.subtreeFlags&14680064),U!==null?m=Mr(U,m):(m=Qr(m,w,o,null),m.flags|=2),m.return=i,c.return=i,c.sibling=m,i.child=c,c=m,m=i.child,w=t.child.memoizedState,w=w===null?Ju(o):{baseLanes:w.baseLanes|o,cachePool:null,transitions:w.transitions},m.memoizedState=w,m.childLanes=t.childLanes&~o,i.memoizedState=Qu,c}return m=t.child,t=m.sibling,c=Mr(m,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=o),c.return=i,c.sibling=null,t!==null&&(o=i.deletions,o===null?(i.deletions=[t],i.flags|=16):o.push(t)),i.child=c,i.memoizedState=null,c}function ef(t,i){return i=pl({mode:"visible",children:i},t.mode,0,null),i.return=t,t.child=i}function tl(t,i,o,c){return c!==null&&Ru(c),Is(i,t.child,null,o),t=ef(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function n_(t,i,o,c,d,m,w){if(o)return i.flags&256?(i.flags&=-257,c=Yu(Error(n(422))),tl(t,i,w,c)):i.memoizedState!==null?(i.child=t.child,i.flags|=128,null):(m=c.fallback,d=i.mode,c=pl({mode:"visible",children:c.children},d,0,null),m=Qr(m,d,w,null),m.flags|=2,c.return=i,m.return=i,c.sibling=m,i.child=c,(i.mode&1)!==0&&Is(i,t.child,null,w),i.child.memoizedState=Ju(w),i.memoizedState=Qu,m);if((i.mode&1)===0)return tl(t,i,w,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var U=c.dgst;return c=U,m=Error(n(419)),c=Yu(m,c,void 0),tl(t,i,w,c)}if(U=(w&t.childLanes)!==0,kn||U){if(c=cn,c!==null){switch(w&-w){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|w))!==0?0:d,d!==0&&d!==m.retryLane&&(m.retryLane=d,zi(t,d),di(c,t,d,-1))}return vf(),c=Yu(Error(n(421))),tl(t,i,w,c)}return d.data==="$?"?(i.flags|=128,i.child=t.child,i=m_.bind(null,t),d._reactRetry=i,null):(t=m.treeContext,jn=fr(d.nextSibling),Xn=i,Gt=!0,li=null,t!==null&&(Kn[Zn++]=Oi,Kn[Zn++]=ki,Kn[Zn++]=Gr,Oi=t.id,ki=t.overflow,Gr=i),i=ef(i,c.children),i.flags|=4096,i)}function Wp(t,i,o){t.lanes|=i;var c=t.alternate;c!==null&&(c.lanes|=i),Lu(t.return,i,o)}function tf(t,i,o,c,d){var m=t.memoizedState;m===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:o,tailMode:d}:(m.isBackwards=i,m.rendering=null,m.renderingStartTime=0,m.last=c,m.tail=o,m.tailMode=d)}function Xp(t,i,o){var c=i.pendingProps,d=c.revealOrder,m=c.tail;if(bn(t,i,c.children,o),c=Xt.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Wp(t,o,i);else if(t.tag===19)Wp(t,o,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}c&=1}if(kt(Xt,c),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(o=i.child,d=null;o!==null;)t=o.alternate,t!==null&&Ya(t)===null&&(d=o),o=o.sibling;o=d,o===null?(d=i.child,i.child=null):(d=o.sibling,o.sibling=null),tf(i,!1,d,o,m);break;case"backwards":for(o=null,d=i.child,i.child=null;d!==null;){if(t=d.alternate,t!==null&&Ya(t)===null){i.child=d;break}t=d.sibling,d.sibling=o,o=d,d=t}tf(i,!0,o,null,m);break;case"together":tf(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function nl(t,i){(i.mode&1)===0&&t!==null&&(t.alternate=null,i.alternate=null,i.flags|=2)}function Hi(t,i,o){if(t!==null&&(i.dependencies=t.dependencies),Yr|=i.lanes,(o&i.childLanes)===0)return null;if(t!==null&&i.child!==t.child)throw Error(n(153));if(i.child!==null){for(t=i.child,o=Mr(t,t.pendingProps),i.child=o,o.return=i;t.sibling!==null;)t=t.sibling,o=o.sibling=Mr(t,t.pendingProps),o.return=i;o.sibling=null}return i.child}function i_(t,i,o){switch(i.tag){case 3:Hp(i),Ns();break;case 5:sp(i);break;case 1:On(i.type)&&ka(i);break;case 4:Iu(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,d=i.memoizedProps.value;kt(Wa,c._currentValue),c._currentValue=d;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(kt(Xt,Xt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?Gp(t,i,o):(kt(Xt,Xt.current&1),t=Hi(t,i,o),t!==null?t.sibling:null);kt(Xt,Xt.current&1);break;case 19:if(c=(o&i.childLanes)!==0,(t.flags&128)!==0){if(c)return Xp(t,i,o);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),kt(Xt,Xt.current),c)break;return null;case 22:case 23:return i.lanes=0,kp(t,i,o)}return Hi(t,i,o)}var jp,nf,qp,Yp;jp=function(t,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},nf=function(){},qp=function(t,i,o,c){var d=t.memoizedProps;if(d!==c){t=i.stateNode,jr(wi.current);var m=null;switch(o){case"input":d=F(t,d),c=F(t,c),m=[];break;case"select":d=L({},d,{value:void 0}),c=L({},c,{value:void 0}),m=[];break;case"textarea":d=A(t,d),c=A(t,c),m=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(t.onclick=Ua)}ht(o,c);var w;o=null;for(ue in d)if(!c.hasOwnProperty(ue)&&d.hasOwnProperty(ue)&&d[ue]!=null)if(ue==="style"){var U=d[ue];for(w in U)U.hasOwnProperty(w)&&(o||(o={}),o[w]="")}else ue!=="dangerouslySetInnerHTML"&&ue!=="children"&&ue!=="suppressContentEditableWarning"&&ue!=="suppressHydrationWarning"&&ue!=="autoFocus"&&(a.hasOwnProperty(ue)?m||(m=[]):(m=m||[]).push(ue,null));for(ue in c){var V=c[ue];if(U=d!=null?d[ue]:void 0,c.hasOwnProperty(ue)&&V!==U&&(V!=null||U!=null))if(ue==="style")if(U){for(w in U)!U.hasOwnProperty(w)||V&&V.hasOwnProperty(w)||(o||(o={}),o[w]="");for(w in V)V.hasOwnProperty(w)&&U[w]!==V[w]&&(o||(o={}),o[w]=V[w])}else o||(m||(m=[]),m.push(ue,o)),o=V;else ue==="dangerouslySetInnerHTML"?(V=V?V.__html:void 0,U=U?U.__html:void 0,V!=null&&U!==V&&(m=m||[]).push(ue,V)):ue==="children"?typeof V!="string"&&typeof V!="number"||(m=m||[]).push(ue,""+V):ue!=="suppressContentEditableWarning"&&ue!=="suppressHydrationWarning"&&(a.hasOwnProperty(ue)?(V!=null&&ue==="onScroll"&&Bt("scroll",t),m||U===V||(m=[])):(m=m||[]).push(ue,V))}o&&(m=m||[]).push("style",o);var ue=m;(i.updateQueue=ue)&&(i.flags|=4)}},Yp=function(t,i,o,c){o!==c&&(i.flags|=4)};function Ho(t,i){if(!Gt)switch(t.tailMode){case"hidden":i=t.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:c.sibling=null}}function Mn(t){var i=t.alternate!==null&&t.alternate.child===t.child,o=0,c=0;if(i)for(var d=t.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=t,d=d.sibling;else for(d=t.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=t,d=d.sibling;return t.subtreeFlags|=c,t.childLanes=o,i}function r_(t,i,o){var c=i.pendingProps;switch(wu(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Mn(i),null;case 1:return On(i.type)&&Oa(),Mn(i),null;case 3:return c=i.stateNode,Os(),Ht(Fn),Ht(yn),Ou(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(t===null||t.child===null)&&(Va(i)?i.flags|=4:t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,li!==null&&(pf(li),li=null))),nf(t,i),Mn(i),null;case 5:Uu(i);var d=jr(Fo.current);if(o=i.type,t!==null&&i.stateNode!=null)qp(t,i,o,c,d),t.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(n(166));return Mn(i),null}if(t=jr(wi.current),Va(i)){c=i.stateNode,o=i.type;var m=i.memoizedProps;switch(c[Ei]=i,c[Lo]=m,t=(i.mode&1)!==0,o){case"dialog":Bt("cancel",c),Bt("close",c);break;case"iframe":case"object":case"embed":Bt("load",c);break;case"video":case"audio":for(d=0;d<Co.length;d++)Bt(Co[d],c);break;case"source":Bt("error",c);break;case"img":case"image":case"link":Bt("error",c),Bt("load",c);break;case"details":Bt("toggle",c);break;case"input":Tt(c,m),Bt("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!m.multiple},Bt("invalid",c);break;case"textarea":se(c,m),Bt("invalid",c)}ht(o,m),d=null;for(var w in m)if(m.hasOwnProperty(w)){var U=m[w];w==="children"?typeof U=="string"?c.textContent!==U&&(m.suppressHydrationWarning!==!0&&Ia(c.textContent,U,t),d=["children",U]):typeof U=="number"&&c.textContent!==""+U&&(m.suppressHydrationWarning!==!0&&Ia(c.textContent,U,t),d=["children",""+U]):a.hasOwnProperty(w)&&U!=null&&w==="onScroll"&&Bt("scroll",c)}switch(o){case"input":Ne(c),Ve(c,m,!0);break;case"textarea":Ne(c),ye(c);break;case"select":case"option":break;default:typeof m.onClick=="function"&&(c.onclick=Ua)}c=d,i.updateQueue=c,c!==null&&(i.flags|=4)}else{w=d.nodeType===9?d:d.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=_e(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=w.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof c.is=="string"?t=w.createElement(o,{is:c.is}):(t=w.createElement(o),o==="select"&&(w=t,c.multiple?w.multiple=!0:c.size&&(w.size=c.size))):t=w.createElementNS(t,o),t[Ei]=i,t[Lo]=c,jp(t,i,!1,!1),i.stateNode=t;e:{switch(w=ft(o,c),o){case"dialog":Bt("cancel",t),Bt("close",t),d=c;break;case"iframe":case"object":case"embed":Bt("load",t),d=c;break;case"video":case"audio":for(d=0;d<Co.length;d++)Bt(Co[d],t);d=c;break;case"source":Bt("error",t),d=c;break;case"img":case"image":case"link":Bt("error",t),Bt("load",t),d=c;break;case"details":Bt("toggle",t),d=c;break;case"input":Tt(t,c),d=F(t,c),Bt("invalid",t);break;case"option":d=c;break;case"select":t._wrapperState={wasMultiple:!!c.multiple},d=L({},c,{value:void 0}),Bt("invalid",t);break;case"textarea":se(t,c),d=A(t,c),Bt("invalid",t);break;default:d=c}ht(o,d),U=d;for(m in U)if(U.hasOwnProperty(m)){var V=U[m];m==="style"?it(t,V):m==="dangerouslySetInnerHTML"?(V=V?V.__html:void 0,V!=null&&Ue(t,V)):m==="children"?typeof V=="string"?(o!=="textarea"||V!=="")&&ct(t,V):typeof V=="number"&&ct(t,""+V):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(a.hasOwnProperty(m)?V!=null&&m==="onScroll"&&Bt("scroll",t):V!=null&&D(t,m,V,w))}switch(o){case"input":Ne(t),Ve(t,c,!1);break;case"textarea":Ne(t),ye(t);break;case"option":c.value!=null&&t.setAttribute("value",""+pe(c.value));break;case"select":t.multiple=!!c.multiple,m=c.value,m!=null?N(t,!!c.multiple,m,!1):c.defaultValue!=null&&N(t,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(t.onclick=Ua)}switch(o){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return Mn(i),null;case 6:if(t&&i.stateNode!=null)Yp(t,i,t.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(n(166));if(o=jr(Fo.current),jr(wi.current),Va(i)){if(c=i.stateNode,o=i.memoizedProps,c[Ei]=i,(m=c.nodeValue!==o)&&(t=Xn,t!==null))switch(t.tag){case 3:Ia(c.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ia(c.nodeValue,o,(t.mode&1)!==0)}m&&(i.flags|=4)}else c=(o.nodeType===9?o:o.ownerDocument).createTextNode(c),c[Ei]=i,i.stateNode=c}return Mn(i),null;case 13:if(Ht(Xt),c=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Gt&&jn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Zh(),Ns(),i.flags|=98560,m=!1;else if(m=Va(i),c!==null&&c.dehydrated!==null){if(t===null){if(!m)throw Error(n(318));if(m=i.memoizedState,m=m!==null?m.dehydrated:null,!m)throw Error(n(317));m[Ei]=i}else Ns(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Mn(i),m=!1}else li!==null&&(pf(li),li=null),m=!0;if(!m)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(c=c!==null,c!==(t!==null&&t.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(t===null||(Xt.current&1)!==0?tn===0&&(tn=3):vf())),i.updateQueue!==null&&(i.flags|=4),Mn(i),null);case 4:return Os(),nf(t,i),t===null&&bo(i.stateNode.containerInfo),Mn(i),null;case 10:return Pu(i.type._context),Mn(i),null;case 17:return On(i.type)&&Oa(),Mn(i),null;case 19:if(Ht(Xt),m=i.memoizedState,m===null)return Mn(i),null;if(c=(i.flags&128)!==0,w=m.rendering,w===null)if(c)Ho(m,!1);else{if(tn!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(w=Ya(t),w!==null){for(i.flags|=128,Ho(m,!1),c=w.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=o,o=i.child;o!==null;)m=o,t=c,m.flags&=14680066,w=m.alternate,w===null?(m.childLanes=0,m.lanes=t,m.child=null,m.subtreeFlags=0,m.memoizedProps=null,m.memoizedState=null,m.updateQueue=null,m.dependencies=null,m.stateNode=null):(m.childLanes=w.childLanes,m.lanes=w.lanes,m.child=w.child,m.subtreeFlags=0,m.deletions=null,m.memoizedProps=w.memoizedProps,m.memoizedState=w.memoizedState,m.updateQueue=w.updateQueue,m.type=w.type,t=w.dependencies,m.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return kt(Xt,Xt.current&1|2),i.child}t=t.sibling}m.tail!==null&&te()>Hs&&(i.flags|=128,c=!0,Ho(m,!1),i.lanes=4194304)}else{if(!c)if(t=Ya(w),t!==null){if(i.flags|=128,c=!0,o=t.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Ho(m,!0),m.tail===null&&m.tailMode==="hidden"&&!w.alternate&&!Gt)return Mn(i),null}else 2*te()-m.renderingStartTime>Hs&&o!==1073741824&&(i.flags|=128,c=!0,Ho(m,!1),i.lanes=4194304);m.isBackwards?(w.sibling=i.child,i.child=w):(o=m.last,o!==null?o.sibling=w:i.child=w,m.last=w)}return m.tail!==null?(i=m.tail,m.rendering=i,m.tail=i.sibling,m.renderingStartTime=te(),i.sibling=null,o=Xt.current,kt(Xt,c?o&1|2:o&1),i):(Mn(i),null);case 22:case 23:return gf(),c=i.memoizedState!==null,t!==null&&t.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(qn&1073741824)!==0&&(Mn(i),i.subtreeFlags&6&&(i.flags|=8192)):Mn(i),null;case 24:return null;case 25:return null}throw Error(n(156,i.tag))}function s_(t,i){switch(wu(i),i.tag){case 1:return On(i.type)&&Oa(),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return Os(),Ht(Fn),Ht(yn),Ou(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 5:return Uu(i),null;case 13:if(Ht(Xt),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(n(340));Ns()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return Ht(Xt),null;case 4:return Os(),null;case 10:return Pu(i.type._context),null;case 22:case 23:return gf(),null;case 24:return null;default:return null}}var il=!1,En=!1,o_=typeof WeakSet=="function"?WeakSet:Set,We=null;function zs(t,i){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(c){$t(t,i,c)}else o.current=null}function rf(t,i,o){try{o()}catch(c){$t(t,i,c)}}var $p=!1;function a_(t,i){if(mu=Ea,t=Rh(),au(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var c=o.getSelection&&o.getSelection();if(c&&c.rangeCount!==0){o=c.anchorNode;var d=c.anchorOffset,m=c.focusNode;c=c.focusOffset;try{o.nodeType,m.nodeType}catch{o=null;break e}var w=0,U=-1,V=-1,ue=0,Me=0,Ae=t,Se=null;t:for(;;){for(var He;Ae!==o||d!==0&&Ae.nodeType!==3||(U=w+d),Ae!==m||c!==0&&Ae.nodeType!==3||(V=w+c),Ae.nodeType===3&&(w+=Ae.nodeValue.length),(He=Ae.firstChild)!==null;)Se=Ae,Ae=He;for(;;){if(Ae===t)break t;if(Se===o&&++ue===d&&(U=w),Se===m&&++Me===c&&(V=w),(He=Ae.nextSibling)!==null)break;Ae=Se,Se=Ae.parentNode}Ae=He}o=U===-1||V===-1?null:{start:U,end:V}}else o=null}o=o||{start:0,end:0}}else o=null;for(gu={focusedElem:t,selectionRange:o},Ea=!1,We=i;We!==null;)if(i=We,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,We=t;else for(;We!==null;){i=We;try{var qe=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(qe!==null){var $e=qe.memoizedProps,Kt=qe.memoizedState,ee=i.stateNode,j=ee.getSnapshotBeforeUpdate(i.elementType===i.type?$e:ci(i.type,$e),Kt);ee.__reactInternalSnapshotBeforeUpdate=j}break;case 3:var oe=i.stateNode.containerInfo;oe.nodeType===1?oe.textContent="":oe.nodeType===9&&oe.documentElement&&oe.removeChild(oe.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(be){$t(i,i.return,be)}if(t=i.sibling,t!==null){t.return=i.return,We=t;break}We=i.return}return qe=$p,$p=!1,qe}function Vo(t,i,o){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&t)===t){var m=d.destroy;d.destroy=void 0,m!==void 0&&rf(i,o,m)}d=d.next}while(d!==c)}}function rl(t,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&t)===t){var c=o.create;o.destroy=c()}o=o.next}while(o!==i)}}function sf(t){var i=t.ref;if(i!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof i=="function"?i(t):i.current=t}}function Kp(t){var i=t.alternate;i!==null&&(t.alternate=null,Kp(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&(delete i[Ei],delete i[Lo],delete i[yu],delete i[Gv],delete i[Wv])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Zp(t){return t.tag===5||t.tag===3||t.tag===4}function Qp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Zp(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function of(t,i,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(t,i):o.insertBefore(t,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(t,o)):(i=o,i.appendChild(t)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=Ua));else if(c!==4&&(t=t.child,t!==null))for(of(t,i,o),t=t.sibling;t!==null;)of(t,i,o),t=t.sibling}function af(t,i,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,i?o.insertBefore(t,i):o.appendChild(t);else if(c!==4&&(t=t.child,t!==null))for(af(t,i,o),t=t.sibling;t!==null;)af(t,i,o),t=t.sibling}var mn=null,ui=!1;function vr(t,i,o){for(o=o.child;o!==null;)Jp(t,i,o),o=o.sibling}function Jp(t,i,o){if(Ye&&typeof Ye.onCommitFiberUnmount=="function")try{Ye.onCommitFiberUnmount(at,o)}catch{}switch(o.tag){case 5:En||zs(o,i);case 6:var c=mn,d=ui;mn=null,vr(t,i,o),mn=c,ui=d,mn!==null&&(ui?(t=mn,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):mn.removeChild(o.stateNode));break;case 18:mn!==null&&(ui?(t=mn,o=o.stateNode,t.nodeType===8?xu(t.parentNode,o):t.nodeType===1&&xu(t,o),yo(t)):xu(mn,o.stateNode));break;case 4:c=mn,d=ui,mn=o.stateNode.containerInfo,ui=!0,vr(t,i,o),mn=c,ui=d;break;case 0:case 11:case 14:case 15:if(!En&&(c=o.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var m=d,w=m.destroy;m=m.tag,w!==void 0&&((m&2)!==0||(m&4)!==0)&&rf(o,i,w),d=d.next}while(d!==c)}vr(t,i,o);break;case 1:if(!En&&(zs(o,i),c=o.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=o.memoizedProps,c.state=o.memoizedState,c.componentWillUnmount()}catch(U){$t(o,i,U)}vr(t,i,o);break;case 21:vr(t,i,o);break;case 22:o.mode&1?(En=(c=En)||o.memoizedState!==null,vr(t,i,o),En=c):vr(t,i,o);break;default:vr(t,i,o)}}function em(t){var i=t.updateQueue;if(i!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new o_),i.forEach(function(c){var d=g_.bind(null,t,c);o.has(c)||(o.add(c),c.then(d,d))})}}function fi(t,i){var o=i.deletions;if(o!==null)for(var c=0;c<o.length;c++){var d=o[c];try{var m=t,w=i,U=w;e:for(;U!==null;){switch(U.tag){case 5:mn=U.stateNode,ui=!1;break e;case 3:mn=U.stateNode.containerInfo,ui=!0;break e;case 4:mn=U.stateNode.containerInfo,ui=!0;break e}U=U.return}if(mn===null)throw Error(n(160));Jp(m,w,d),mn=null,ui=!1;var V=d.alternate;V!==null&&(V.return=null),d.return=null}catch(ue){$t(d,i,ue)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)tm(i,t),i=i.sibling}function tm(t,i){var o=t.alternate,c=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(fi(i,t),Ai(t),c&4){try{Vo(3,t,t.return),rl(3,t)}catch($e){$t(t,t.return,$e)}try{Vo(5,t,t.return)}catch($e){$t(t,t.return,$e)}}break;case 1:fi(i,t),Ai(t),c&512&&o!==null&&zs(o,o.return);break;case 5:if(fi(i,t),Ai(t),c&512&&o!==null&&zs(o,o.return),t.flags&32){var d=t.stateNode;try{ct(d,"")}catch($e){$t(t,t.return,$e)}}if(c&4&&(d=t.stateNode,d!=null)){var m=t.memoizedProps,w=o!==null?o.memoizedProps:m,U=t.type,V=t.updateQueue;if(t.updateQueue=null,V!==null)try{U==="input"&&m.type==="radio"&&m.name!=null&&tt(d,m),ft(U,w);var ue=ft(U,m);for(w=0;w<V.length;w+=2){var Me=V[w],Ae=V[w+1];Me==="style"?it(d,Ae):Me==="dangerouslySetInnerHTML"?Ue(d,Ae):Me==="children"?ct(d,Ae):D(d,Me,Ae,ue)}switch(U){case"input":nt(d,m);break;case"textarea":xe(d,m);break;case"select":var Se=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!m.multiple;var He=m.value;He!=null?N(d,!!m.multiple,He,!1):Se!==!!m.multiple&&(m.defaultValue!=null?N(d,!!m.multiple,m.defaultValue,!0):N(d,!!m.multiple,m.multiple?[]:"",!1))}d[Lo]=m}catch($e){$t(t,t.return,$e)}}break;case 6:if(fi(i,t),Ai(t),c&4){if(t.stateNode===null)throw Error(n(162));d=t.stateNode,m=t.memoizedProps;try{d.nodeValue=m}catch($e){$t(t,t.return,$e)}}break;case 3:if(fi(i,t),Ai(t),c&4&&o!==null&&o.memoizedState.isDehydrated)try{yo(i.containerInfo)}catch($e){$t(t,t.return,$e)}break;case 4:fi(i,t),Ai(t);break;case 13:fi(i,t),Ai(t),d=t.child,d.flags&8192&&(m=d.memoizedState!==null,d.stateNode.isHidden=m,!m||d.alternate!==null&&d.alternate.memoizedState!==null||(uf=te())),c&4&&em(t);break;case 22:if(Me=o!==null&&o.memoizedState!==null,t.mode&1?(En=(ue=En)||Me,fi(i,t),En=ue):fi(i,t),Ai(t),c&8192){if(ue=t.memoizedState!==null,(t.stateNode.isHidden=ue)&&!Me&&(t.mode&1)!==0)for(We=t,Me=t.child;Me!==null;){for(Ae=We=Me;We!==null;){switch(Se=We,He=Se.child,Se.tag){case 0:case 11:case 14:case 15:Vo(4,Se,Se.return);break;case 1:zs(Se,Se.return);var qe=Se.stateNode;if(typeof qe.componentWillUnmount=="function"){c=Se,o=Se.return;try{i=c,qe.props=i.memoizedProps,qe.state=i.memoizedState,qe.componentWillUnmount()}catch($e){$t(c,o,$e)}}break;case 5:zs(Se,Se.return);break;case 22:if(Se.memoizedState!==null){rm(Ae);continue}}He!==null?(He.return=Se,We=He):rm(Ae)}Me=Me.sibling}e:for(Me=null,Ae=t;;){if(Ae.tag===5){if(Me===null){Me=Ae;try{d=Ae.stateNode,ue?(m=d.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none"):(U=Ae.stateNode,V=Ae.memoizedProps.style,w=V!=null&&V.hasOwnProperty("display")?V.display:null,U.style.display=Je("display",w))}catch($e){$t(t,t.return,$e)}}}else if(Ae.tag===6){if(Me===null)try{Ae.stateNode.nodeValue=ue?"":Ae.memoizedProps}catch($e){$t(t,t.return,$e)}}else if((Ae.tag!==22&&Ae.tag!==23||Ae.memoizedState===null||Ae===t)&&Ae.child!==null){Ae.child.return=Ae,Ae=Ae.child;continue}if(Ae===t)break e;for(;Ae.sibling===null;){if(Ae.return===null||Ae.return===t)break e;Me===Ae&&(Me=null),Ae=Ae.return}Me===Ae&&(Me=null),Ae.sibling.return=Ae.return,Ae=Ae.sibling}}break;case 19:fi(i,t),Ai(t),c&4&&em(t);break;case 21:break;default:fi(i,t),Ai(t)}}function Ai(t){var i=t.flags;if(i&2){try{e:{for(var o=t.return;o!==null;){if(Zp(o)){var c=o;break e}o=o.return}throw Error(n(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(ct(d,""),c.flags&=-33);var m=Qp(t);af(t,m,d);break;case 3:case 4:var w=c.stateNode.containerInfo,U=Qp(t);of(t,U,w);break;default:throw Error(n(161))}}catch(V){$t(t,t.return,V)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function l_(t,i,o){We=t,nm(t)}function nm(t,i,o){for(var c=(t.mode&1)!==0;We!==null;){var d=We,m=d.child;if(d.tag===22&&c){var w=d.memoizedState!==null||il;if(!w){var U=d.alternate,V=U!==null&&U.memoizedState!==null||En;U=il;var ue=En;if(il=w,(En=V)&&!ue)for(We=d;We!==null;)w=We,V=w.child,w.tag===22&&w.memoizedState!==null?sm(d):V!==null?(V.return=w,We=V):sm(d);for(;m!==null;)We=m,nm(m),m=m.sibling;We=d,il=U,En=ue}im(t)}else(d.subtreeFlags&8772)!==0&&m!==null?(m.return=d,We=m):im(t)}}function im(t){for(;We!==null;){var i=We;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:En||rl(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!En)if(o===null)c.componentDidMount();else{var d=i.elementType===i.type?o.memoizedProps:ci(i.type,o.memoizedProps);c.componentDidUpdate(d,o.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var m=i.updateQueue;m!==null&&rp(i,m,c);break;case 3:var w=i.updateQueue;if(w!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}rp(i,w,o)}break;case 5:var U=i.stateNode;if(o===null&&i.flags&4){o=U;var V=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":V.autoFocus&&o.focus();break;case"img":V.src&&(o.src=V.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var ue=i.alternate;if(ue!==null){var Me=ue.memoizedState;if(Me!==null){var Ae=Me.dehydrated;Ae!==null&&yo(Ae)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}En||i.flags&512&&sf(i)}catch(Se){$t(i,i.return,Se)}}if(i===t){We=null;break}if(o=i.sibling,o!==null){o.return=i.return,We=o;break}We=i.return}}function rm(t){for(;We!==null;){var i=We;if(i===t){We=null;break}var o=i.sibling;if(o!==null){o.return=i.return,We=o;break}We=i.return}}function sm(t){for(;We!==null;){var i=We;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{rl(4,i)}catch(V){$t(i,o,V)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var d=i.return;try{c.componentDidMount()}catch(V){$t(i,d,V)}}var m=i.return;try{sf(i)}catch(V){$t(i,m,V)}break;case 5:var w=i.return;try{sf(i)}catch(V){$t(i,w,V)}}}catch(V){$t(i,i.return,V)}if(i===t){We=null;break}var U=i.sibling;if(U!==null){U.return=i.return,We=U;break}We=i.return}}var c_=Math.ceil,sl=C.ReactCurrentDispatcher,lf=C.ReactCurrentOwner,ei=C.ReactCurrentBatchConfig,Lt=0,cn=null,Qt=null,gn=0,qn=0,Bs=dr(0),tn=0,Go=null,Yr=0,ol=0,cf=0,Wo=null,zn=null,uf=0,Hs=1/0,Vi=null,al=!1,ff=null,_r=null,ll=!1,xr=null,cl=0,Xo=0,df=null,ul=-1,fl=0;function Pn(){return(Lt&6)!==0?te():ul!==-1?ul:ul=te()}function yr(t){return(t.mode&1)===0?1:(Lt&2)!==0&&gn!==0?gn&-gn:jv.transition!==null?(fl===0&&(fl=Ft()),fl):(t=Pt,t!==0||(t=window.event,t=t===void 0?16:ah(t.type)),t)}function di(t,i,o,c){if(50<Xo)throw Xo=0,df=null,Error(n(185));on(t,o,c),((Lt&2)===0||t!==cn)&&(t===cn&&((Lt&2)===0&&(ol|=o),tn===4&&Sr(t,gn)),Bn(t,c),o===1&&Lt===0&&(i.mode&1)===0&&(Hs=te()+500,za&&pr()))}function Bn(t,i){var o=t.callbackNode;Cn(t,i);var c=_n(t,t===cn?gn:0);if(c===0)o!==null&&b(o),t.callbackNode=null,t.callbackPriority=0;else if(i=c&-c,t.callbackPriority!==i){if(o!=null&&b(o),i===1)t.tag===0?Xv(am.bind(null,t)):jh(am.bind(null,t)),Hv(function(){(Lt&6)===0&&pr()}),o=null;else{switch(Mi(c)){case 1:o=Re;break;case 4:o=Fe;break;case 16:o=Be;break;case 536870912:o=ut;break;default:o=Be}o=mm(o,om.bind(null,t))}t.callbackPriority=i,t.callbackNode=o}}function om(t,i){if(ul=-1,fl=0,(Lt&6)!==0)throw Error(n(327));var o=t.callbackNode;if(Vs()&&t.callbackNode!==o)return null;var c=_n(t,t===cn?gn:0);if(c===0)return null;if((c&30)!==0||(c&t.expiredLanes)!==0||i)i=dl(t,c);else{i=c;var d=Lt;Lt|=2;var m=cm();(cn!==t||gn!==i)&&(Vi=null,Hs=te()+500,Kr(t,i));do try{d_();break}catch(U){lm(t,U)}while(!0);bu(),sl.current=m,Lt=d,Qt!==null?i=0:(cn=null,gn=0,i=tn)}if(i!==0){if(i===2&&(d=Ii(t),d!==0&&(c=d,i=hf(t,d))),i===1)throw o=Go,Kr(t,0),Sr(t,c),Bn(t,te()),o;if(i===6)Sr(t,c);else{if(d=t.current.alternate,(c&30)===0&&!u_(d)&&(i=dl(t,c),i===2&&(m=Ii(t),m!==0&&(c=m,i=hf(t,m))),i===1))throw o=Go,Kr(t,0),Sr(t,c),Bn(t,te()),o;switch(t.finishedWork=d,t.finishedLanes=c,i){case 0:case 1:throw Error(n(345));case 2:Zr(t,zn,Vi);break;case 3:if(Sr(t,c),(c&130023424)===c&&(i=uf+500-te(),10<i)){if(_n(t,0)!==0)break;if(d=t.suspendedLanes,(d&c)!==c){Pn(),t.pingedLanes|=t.suspendedLanes&d;break}t.timeoutHandle=_u(Zr.bind(null,t,zn,Vi),i);break}Zr(t,zn,Vi);break;case 4:if(Sr(t,c),(c&4194240)===c)break;for(i=t.eventTimes,d=-1;0<c;){var w=31-pt(c);m=1<<w,w=i[w],w>d&&(d=w),c&=~m}if(c=d,c=te()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*c_(c/1960))-c,10<c){t.timeoutHandle=_u(Zr.bind(null,t,zn,Vi),c);break}Zr(t,zn,Vi);break;case 5:Zr(t,zn,Vi);break;default:throw Error(n(329))}}}return Bn(t,te()),t.callbackNode===o?om.bind(null,t):null}function hf(t,i){var o=Wo;return t.current.memoizedState.isDehydrated&&(Kr(t,i).flags|=256),t=dl(t,i),t!==2&&(i=zn,zn=o,i!==null&&pf(i)),t}function pf(t){zn===null?zn=t:zn.push.apply(zn,t)}function u_(t){for(var i=t;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var c=0;c<o.length;c++){var d=o[c],m=d.getSnapshot;d=d.value;try{if(!ai(m(),d))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Sr(t,i){for(i&=~cf,i&=~ol,t.suspendedLanes|=i,t.pingedLanes&=~i,t=t.expirationTimes;0<i;){var o=31-pt(i),c=1<<o;t[o]=-1,i&=~c}}function am(t){if((Lt&6)!==0)throw Error(n(327));Vs();var i=_n(t,0);if((i&1)===0)return Bn(t,te()),null;var o=dl(t,i);if(t.tag!==0&&o===2){var c=Ii(t);c!==0&&(i=c,o=hf(t,c))}if(o===1)throw o=Go,Kr(t,0),Sr(t,i),Bn(t,te()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=i,Zr(t,zn,Vi),Bn(t,te()),null}function mf(t,i){var o=Lt;Lt|=1;try{return t(i)}finally{Lt=o,Lt===0&&(Hs=te()+500,za&&pr())}}function $r(t){xr!==null&&xr.tag===0&&(Lt&6)===0&&Vs();var i=Lt;Lt|=1;var o=ei.transition,c=Pt;try{if(ei.transition=null,Pt=1,t)return t()}finally{Pt=c,ei.transition=o,Lt=i,(Lt&6)===0&&pr()}}function gf(){qn=Bs.current,Ht(Bs)}function Kr(t,i){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,Bv(o)),Qt!==null)for(o=Qt.return;o!==null;){var c=o;switch(wu(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Oa();break;case 3:Os(),Ht(Fn),Ht(yn),Ou();break;case 5:Uu(c);break;case 4:Os();break;case 13:Ht(Xt);break;case 19:Ht(Xt);break;case 10:Pu(c.type._context);break;case 22:case 23:gf()}o=o.return}if(cn=t,Qt=t=Mr(t.current,null),gn=qn=i,tn=0,Go=null,cf=ol=Yr=0,zn=Wo=null,Xr!==null){for(i=0;i<Xr.length;i++)if(o=Xr[i],c=o.interleaved,c!==null){o.interleaved=null;var d=c.next,m=o.pending;if(m!==null){var w=m.next;m.next=d,c.next=w}o.pending=c}Xr=null}return t}function lm(t,i){do{var o=Qt;try{if(bu(),$a.current=Ja,Ka){for(var c=jt.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Ka=!1}if(qr=0,ln=en=jt=null,Oo=!1,ko=0,lf.current=null,o===null||o.return===null){tn=1,Go=i,Qt=null;break}e:{var m=t,w=o.return,U=o,V=i;if(i=gn,U.flags|=32768,V!==null&&typeof V=="object"&&typeof V.then=="function"){var ue=V,Me=U,Ae=Me.tag;if((Me.mode&1)===0&&(Ae===0||Ae===11||Ae===15)){var Se=Me.alternate;Se?(Me.updateQueue=Se.updateQueue,Me.memoizedState=Se.memoizedState,Me.lanes=Se.lanes):(Me.updateQueue=null,Me.memoizedState=null)}var He=Np(w);if(He!==null){He.flags&=-257,Ip(He,w,U,m,i),He.mode&1&&Dp(m,ue,i),i=He,V=ue;var qe=i.updateQueue;if(qe===null){var $e=new Set;$e.add(V),i.updateQueue=$e}else qe.add(V);break e}else{if((i&1)===0){Dp(m,ue,i),vf();break e}V=Error(n(426))}}else if(Gt&&U.mode&1){var Kt=Np(w);if(Kt!==null){(Kt.flags&65536)===0&&(Kt.flags|=256),Ip(Kt,w,U,m,i),Ru(ks(V,U));break e}}m=V=ks(V,U),tn!==4&&(tn=2),Wo===null?Wo=[m]:Wo.push(m),m=w;do{switch(m.tag){case 3:m.flags|=65536,i&=-i,m.lanes|=i;var ee=Pp(m,V,i);ip(m,ee);break e;case 1:U=V;var j=m.type,oe=m.stateNode;if((m.flags&128)===0&&(typeof j.getDerivedStateFromError=="function"||oe!==null&&typeof oe.componentDidCatch=="function"&&(_r===null||!_r.has(oe)))){m.flags|=65536,i&=-i,m.lanes|=i;var be=Lp(m,U,i);ip(m,be);break e}}m=m.return}while(m!==null)}fm(o)}catch(Ze){i=Ze,Qt===o&&o!==null&&(Qt=o=o.return);continue}break}while(!0)}function cm(){var t=sl.current;return sl.current=Ja,t===null?Ja:t}function vf(){(tn===0||tn===3||tn===2)&&(tn=4),cn===null||(Yr&268435455)===0&&(ol&268435455)===0||Sr(cn,gn)}function dl(t,i){var o=Lt;Lt|=2;var c=cm();(cn!==t||gn!==i)&&(Vi=null,Kr(t,i));do try{f_();break}catch(d){lm(t,d)}while(!0);if(bu(),Lt=o,sl.current=c,Qt!==null)throw Error(n(261));return cn=null,gn=0,tn}function f_(){for(;Qt!==null;)um(Qt)}function d_(){for(;Qt!==null&&!$();)um(Qt)}function um(t){var i=pm(t.alternate,t,qn);t.memoizedProps=t.pendingProps,i===null?fm(t):Qt=i,lf.current=null}function fm(t){var i=t;do{var o=i.alternate;if(t=i.return,(i.flags&32768)===0){if(o=r_(o,i,qn),o!==null){Qt=o;return}}else{if(o=s_(o,i),o!==null){o.flags&=32767,Qt=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{tn=6,Qt=null;return}}if(i=i.sibling,i!==null){Qt=i;return}Qt=i=t}while(i!==null);tn===0&&(tn=5)}function Zr(t,i,o){var c=Pt,d=ei.transition;try{ei.transition=null,Pt=1,h_(t,i,o,c)}finally{ei.transition=d,Pt=c}return null}function h_(t,i,o,c){do Vs();while(xr!==null);if((Lt&6)!==0)throw Error(n(327));o=t.finishedWork;var d=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var m=o.lanes|o.childLanes;if(pn(t,m),t===cn&&(Qt=cn=null,gn=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||ll||(ll=!0,mm(Be,function(){return Vs(),null})),m=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||m){m=ei.transition,ei.transition=null;var w=Pt;Pt=1;var U=Lt;Lt|=4,lf.current=null,a_(t,o),tm(o,t),Nv(gu),Ea=!!mu,gu=mu=null,t.current=o,l_(o),le(),Lt=U,Pt=w,ei.transition=m}else t.current=o;if(ll&&(ll=!1,xr=t,cl=d),m=t.pendingLanes,m===0&&(_r=null),wt(o.stateNode),Bn(t,te()),i!==null)for(c=t.onRecoverableError,o=0;o<i.length;o++)d=i[o],c(d.value,{componentStack:d.stack,digest:d.digest});if(al)throw al=!1,t=ff,ff=null,t;return(cl&1)!==0&&t.tag!==0&&Vs(),m=t.pendingLanes,(m&1)!==0?t===df?Xo++:(Xo=0,df=t):Xo=0,pr(),null}function Vs(){if(xr!==null){var t=Mi(cl),i=ei.transition,o=Pt;try{if(ei.transition=null,Pt=16>t?16:t,xr===null)var c=!1;else{if(t=xr,xr=null,cl=0,(Lt&6)!==0)throw Error(n(331));var d=Lt;for(Lt|=4,We=t.current;We!==null;){var m=We,w=m.child;if((We.flags&16)!==0){var U=m.deletions;if(U!==null){for(var V=0;V<U.length;V++){var ue=U[V];for(We=ue;We!==null;){var Me=We;switch(Me.tag){case 0:case 11:case 15:Vo(8,Me,m)}var Ae=Me.child;if(Ae!==null)Ae.return=Me,We=Ae;else for(;We!==null;){Me=We;var Se=Me.sibling,He=Me.return;if(Kp(Me),Me===ue){We=null;break}if(Se!==null){Se.return=He,We=Se;break}We=He}}}var qe=m.alternate;if(qe!==null){var $e=qe.child;if($e!==null){qe.child=null;do{var Kt=$e.sibling;$e.sibling=null,$e=Kt}while($e!==null)}}We=m}}if((m.subtreeFlags&2064)!==0&&w!==null)w.return=m,We=w;else e:for(;We!==null;){if(m=We,(m.flags&2048)!==0)switch(m.tag){case 0:case 11:case 15:Vo(9,m,m.return)}var ee=m.sibling;if(ee!==null){ee.return=m.return,We=ee;break e}We=m.return}}var j=t.current;for(We=j;We!==null;){w=We;var oe=w.child;if((w.subtreeFlags&2064)!==0&&oe!==null)oe.return=w,We=oe;else e:for(w=j;We!==null;){if(U=We,(U.flags&2048)!==0)try{switch(U.tag){case 0:case 11:case 15:rl(9,U)}}catch(Ze){$t(U,U.return,Ze)}if(U===w){We=null;break e}var be=U.sibling;if(be!==null){be.return=U.return,We=be;break e}We=U.return}}if(Lt=d,pr(),Ye&&typeof Ye.onPostCommitFiberRoot=="function")try{Ye.onPostCommitFiberRoot(at,t)}catch{}c=!0}return c}finally{Pt=o,ei.transition=i}}return!1}function dm(t,i,o){i=ks(o,i),i=Pp(t,i,1),t=gr(t,i,1),i=Pn(),t!==null&&(on(t,1,i),Bn(t,i))}function $t(t,i,o){if(t.tag===3)dm(t,t,o);else for(;i!==null;){if(i.tag===3){dm(i,t,o);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(_r===null||!_r.has(c))){t=ks(o,t),t=Lp(i,t,1),i=gr(i,t,1),t=Pn(),i!==null&&(on(i,1,t),Bn(i,t));break}}i=i.return}}function p_(t,i,o){var c=t.pingCache;c!==null&&c.delete(i),i=Pn(),t.pingedLanes|=t.suspendedLanes&o,cn===t&&(gn&o)===o&&(tn===4||tn===3&&(gn&130023424)===gn&&500>te()-uf?Kr(t,0):cf|=o),Bn(t,i)}function hm(t,i){i===0&&((t.mode&1)===0?i=1:(i=Yt,Yt<<=1,(Yt&130023424)===0&&(Yt=4194304)));var o=Pn();t=zi(t,i),t!==null&&(on(t,i,o),Bn(t,o))}function m_(t){var i=t.memoizedState,o=0;i!==null&&(o=i.retryLane),hm(t,o)}function g_(t,i){var o=0;switch(t.tag){case 13:var c=t.stateNode,d=t.memoizedState;d!==null&&(o=d.retryLane);break;case 19:c=t.stateNode;break;default:throw Error(n(314))}c!==null&&c.delete(i),hm(t,o)}var pm;pm=function(t,i,o){if(t!==null)if(t.memoizedProps!==i.pendingProps||Fn.current)kn=!0;else{if((t.lanes&o)===0&&(i.flags&128)===0)return kn=!1,i_(t,i,o);kn=(t.flags&131072)!==0}else kn=!1,Gt&&(i.flags&1048576)!==0&&qh(i,Ha,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;nl(t,i),t=i.pendingProps;var d=Ps(i,yn.current);Fs(i,o),d=Bu(null,i,c,t,d,o);var m=Hu();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,On(c)?(m=!0,ka(i)):m=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,Nu(i),d.updater=el,i.stateNode=d,d._reactInternals=i,qu(i,c,t,o),i=Zu(null,i,c,!0,m,o)):(i.tag=0,Gt&&m&&Eu(i),bn(null,i,d,o),i=i.child),i;case 16:c=i.elementType;e:{switch(nl(t,i),t=i.pendingProps,d=c._init,c=d(c._payload),i.type=c,d=i.tag=__(c),t=ci(c,t),d){case 0:i=Ku(null,i,c,t,o);break e;case 1:i=Bp(null,i,c,t,o);break e;case 11:i=Up(null,i,c,t,o);break e;case 14:i=Fp(null,i,c,ci(c.type,t),o);break e}throw Error(n(306,c,""))}return i;case 0:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ci(c,d),Ku(t,i,c,d,o);case 1:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ci(c,d),Bp(t,i,c,d,o);case 3:e:{if(Hp(i),t===null)throw Error(n(387));c=i.pendingProps,m=i.memoizedState,d=m.element,np(t,i),qa(i,c,null,o);var w=i.memoizedState;if(c=w.element,m.isDehydrated)if(m={element:c,isDehydrated:!1,cache:w.cache,pendingSuspenseBoundaries:w.pendingSuspenseBoundaries,transitions:w.transitions},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){d=ks(Error(n(423)),i),i=Vp(t,i,c,o,d);break e}else if(c!==d){d=ks(Error(n(424)),i),i=Vp(t,i,c,o,d);break e}else for(jn=fr(i.stateNode.containerInfo.firstChild),Xn=i,Gt=!0,li=null,o=ep(i,null,c,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(Ns(),c===d){i=Hi(t,i,o);break e}bn(t,i,c,o)}i=i.child}return i;case 5:return sp(i),t===null&&Au(i),c=i.type,d=i.pendingProps,m=t!==null?t.memoizedProps:null,w=d.children,vu(c,d)?w=null:m!==null&&vu(c,m)&&(i.flags|=32),zp(t,i),bn(t,i,w,o),i.child;case 6:return t===null&&Au(i),null;case 13:return Gp(t,i,o);case 4:return Iu(i,i.stateNode.containerInfo),c=i.pendingProps,t===null?i.child=Is(i,null,c,o):bn(t,i,c,o),i.child;case 11:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ci(c,d),Up(t,i,c,d,o);case 7:return bn(t,i,i.pendingProps,o),i.child;case 8:return bn(t,i,i.pendingProps.children,o),i.child;case 12:return bn(t,i,i.pendingProps.children,o),i.child;case 10:e:{if(c=i.type._context,d=i.pendingProps,m=i.memoizedProps,w=d.value,kt(Wa,c._currentValue),c._currentValue=w,m!==null)if(ai(m.value,w)){if(m.children===d.children&&!Fn.current){i=Hi(t,i,o);break e}}else for(m=i.child,m!==null&&(m.return=i);m!==null;){var U=m.dependencies;if(U!==null){w=m.child;for(var V=U.firstContext;V!==null;){if(V.context===c){if(m.tag===1){V=Bi(-1,o&-o),V.tag=2;var ue=m.updateQueue;if(ue!==null){ue=ue.shared;var Me=ue.pending;Me===null?V.next=V:(V.next=Me.next,Me.next=V),ue.pending=V}}m.lanes|=o,V=m.alternate,V!==null&&(V.lanes|=o),Lu(m.return,o,i),U.lanes|=o;break}V=V.next}}else if(m.tag===10)w=m.type===i.type?null:m.child;else if(m.tag===18){if(w=m.return,w===null)throw Error(n(341));w.lanes|=o,U=w.alternate,U!==null&&(U.lanes|=o),Lu(w,o,i),w=m.sibling}else w=m.child;if(w!==null)w.return=m;else for(w=m;w!==null;){if(w===i){w=null;break}if(m=w.sibling,m!==null){m.return=w.return,w=m;break}w=w.return}m=w}bn(t,i,d.children,o),i=i.child}return i;case 9:return d=i.type,c=i.pendingProps.children,Fs(i,o),d=Qn(d),c=c(d),i.flags|=1,bn(t,i,c,o),i.child;case 14:return c=i.type,d=ci(c,i.pendingProps),d=ci(c.type,d),Fp(t,i,c,d,o);case 15:return Op(t,i,i.type,i.pendingProps,o);case 17:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ci(c,d),nl(t,i),i.tag=1,On(c)?(t=!0,ka(i)):t=!1,Fs(i,o),Cp(i,c,d),qu(i,c,d,o),Zu(null,i,c,!0,t,o);case 19:return Xp(t,i,o);case 22:return kp(t,i,o)}throw Error(n(156,i.tag))};function mm(t,i){return ya(t,i)}function v_(t,i,o,c){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(t,i,o,c){return new v_(t,i,o,c)}function _f(t){return t=t.prototype,!(!t||!t.isReactComponent)}function __(t){if(typeof t=="function")return _f(t)?1:0;if(t!=null){if(t=t.$$typeof,t===ie)return 11;if(t===me)return 14}return 2}function Mr(t,i){var o=t.alternate;return o===null?(o=ti(t.tag,i,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=i,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,i=t.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function hl(t,i,o,c,d,m){var w=2;if(c=t,typeof t=="function")_f(t)&&(w=1);else if(typeof t=="string")w=5;else e:switch(t){case O:return Qr(o.children,d,m,i);case G:w=8,d|=8;break;case P:return t=ti(12,o,i,d|2),t.elementType=P,t.lanes=m,t;case Y:return t=ti(13,o,i,d),t.elementType=Y,t.lanes=m,t;case de:return t=ti(19,o,i,d),t.elementType=de,t.lanes=m,t;case re:return pl(o,d,m,i);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case R:w=10;break e;case H:w=9;break e;case ie:w=11;break e;case me:w=14;break e;case Q:w=16,c=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return i=ti(w,o,i,d),i.elementType=t,i.type=c,i.lanes=m,i}function Qr(t,i,o,c){return t=ti(7,t,c,i),t.lanes=o,t}function pl(t,i,o,c){return t=ti(22,t,c,i),t.elementType=re,t.lanes=o,t.stateNode={isHidden:!1},t}function xf(t,i,o){return t=ti(6,t,null,i),t.lanes=o,t}function yf(t,i,o){return i=ti(4,t.children!==null?t.children:[],t.key,i),i.lanes=o,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}function x_(t,i,o,c,d){this.tag=i,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=xn(0),this.expirationTimes=xn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xn(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function Sf(t,i,o,c,d,m,w,U,V){return t=new x_(t,i,o,U,V),i===1?(i=1,m===!0&&(i|=8)):i=0,m=ti(3,null,null,i),t.current=m,m.stateNode=t,m.memoizedState={element:c,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Nu(m),t}function y_(t,i,o){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:k,key:c==null?null:""+c,children:t,containerInfo:i,implementation:o}}function gm(t){if(!t)return hr;t=t._reactInternals;e:{if(Si(t)!==t||t.tag!==1)throw Error(n(170));var i=t;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(On(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(On(o))return Wh(t,o,i)}return i}function vm(t,i,o,c,d,m,w,U,V){return t=Sf(o,c,!0,t,d,m,w,U,V),t.context=gm(null),o=t.current,c=Pn(),d=yr(o),m=Bi(c,d),m.callback=i??null,gr(o,m,d),t.current.lanes=d,on(t,d,c),Bn(t,c),t}function ml(t,i,o,c){var d=i.current,m=Pn(),w=yr(d);return o=gm(o),i.context===null?i.context=o:i.pendingContext=o,i=Bi(m,w),i.payload={element:t},c=c===void 0?null:c,c!==null&&(i.callback=c),t=gr(d,i,w),t!==null&&(di(t,d,w,m),ja(t,d,w)),w}function gl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function _m(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<i?o:i}}function Mf(t,i){_m(t,i),(t=t.alternate)&&_m(t,i)}function S_(){return null}var xm=typeof reportError=="function"?reportError:function(t){console.error(t)};function Ef(t){this._internalRoot=t}vl.prototype.render=Ef.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(n(409));ml(t,i,null,null)},vl.prototype.unmount=Ef.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;$r(function(){ml(null,t,null,null)}),i[Ui]=null}};function vl(t){this._internalRoot=t}vl.prototype.unstable_scheduleHydration=function(t){if(t){var i=nh();t={blockedOn:null,target:t,priority:i};for(var o=0;o<lr.length&&i!==0&&i<lr[o].priority;o++);lr.splice(o,0,t),o===0&&sh(t)}};function wf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function _l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function ym(){}function M_(t,i,o,c,d){if(d){if(typeof c=="function"){var m=c;c=function(){var ue=gl(w);m.call(ue)}}var w=vm(i,c,t,0,null,!1,!1,"",ym);return t._reactRootContainer=w,t[Ui]=w.current,bo(t.nodeType===8?t.parentNode:t),$r(),w}for(;d=t.lastChild;)t.removeChild(d);if(typeof c=="function"){var U=c;c=function(){var ue=gl(V);U.call(ue)}}var V=Sf(t,0,!1,null,null,!1,!1,"",ym);return t._reactRootContainer=V,t[Ui]=V.current,bo(t.nodeType===8?t.parentNode:t),$r(function(){ml(i,V,o,c)}),V}function xl(t,i,o,c,d){var m=o._reactRootContainer;if(m){var w=m;if(typeof d=="function"){var U=d;d=function(){var V=gl(w);U.call(V)}}ml(i,w,t,d)}else w=M_(o,i,t,d,c);return gl(w)}eh=function(t){switch(t.tag){case 3:var i=t.stateNode;if(i.current.memoizedState.isDehydrated){var o=Et(i.pendingLanes);o!==0&&(an(i,o|1),Bn(i,te()),(Lt&6)===0&&(Hs=te()+500,pr()))}break;case 13:$r(function(){var c=zi(t,1);if(c!==null){var d=Pn();di(c,t,1,d)}}),Mf(t,1)}},Yc=function(t){if(t.tag===13){var i=zi(t,134217728);if(i!==null){var o=Pn();di(i,t,134217728,o)}Mf(t,134217728)}},th=function(t){if(t.tag===13){var i=yr(t),o=zi(t,i);if(o!==null){var c=Pn();di(o,t,i,c)}Mf(t,i)}},nh=function(){return Pt},ih=function(t,i){var o=Pt;try{return Pt=t,i()}finally{Pt=o}},Ce=function(t,i,o){switch(i){case"input":if(nt(t,o),i=o.name,o.type==="radio"&&i!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var c=o[i];if(c!==t&&c.form===t.form){var d=Fa(c);if(!d)throw Error(n(90));Ke(c),nt(c,d)}}}break;case"textarea":xe(t,o);break;case"select":i=o.value,i!=null&&N(t,!!o.multiple,i,!1)}},bt=mf,Ot=$r;var E_={usingClientEntryPoint:!1,Events:[Do,Cs,Fa,Pe,ot,mf]},jo={findFiberByHostInstance:Hr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},w_={bundleType:jo.bundleType,version:jo.version,rendererPackageName:jo.rendererPackageName,rendererConfig:jo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=_a(t),t===null?null:t.stateNode},findFiberByHostInstance:jo.findFiberByHostInstance||S_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var yl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yl.isDisabled&&yl.supportsFiber)try{at=yl.inject(w_),Ye=yl}catch{}}return Hn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=E_,Hn.createPortal=function(t,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!wf(i))throw Error(n(200));return y_(t,i,null,o)},Hn.createRoot=function(t,i){if(!wf(t))throw Error(n(299));var o=!1,c="",d=xm;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=Sf(t,1,!1,null,null,o,!1,c,d),t[Ui]=i.current,bo(t.nodeType===8?t.parentNode:t),new Ef(i)},Hn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=_a(i),t=t===null?null:t.stateNode,t},Hn.flushSync=function(t){return $r(t)},Hn.hydrate=function(t,i,o){if(!_l(i))throw Error(n(200));return xl(null,t,i,!0,o)},Hn.hydrateRoot=function(t,i,o){if(!wf(t))throw Error(n(405));var c=o!=null&&o.hydratedSources||null,d=!1,m="",w=xm;if(o!=null&&(o.unstable_strictMode===!0&&(d=!0),o.identifierPrefix!==void 0&&(m=o.identifierPrefix),o.onRecoverableError!==void 0&&(w=o.onRecoverableError)),i=vm(i,null,t,1,o??null,d,!1,m,w),t[Ui]=i.current,bo(t),c)for(t=0;t<c.length;t++)o=c[t],d=o._getVersion,d=d(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,d]:i.mutableSourceEagerHydrationData.push(o,d);return new vl(i)},Hn.render=function(t,i,o){if(!_l(i))throw Error(n(200));return xl(null,t,i,!1,o)},Hn.unmountComponentAtNode=function(t){if(!_l(t))throw Error(n(40));return t._reactRootContainer?($r(function(){xl(null,null,t,!1,function(){t._reactRootContainer=null,t[Ui]=null})}),!0):!1},Hn.unstable_batchedUpdates=mf,Hn.unstable_renderSubtreeIntoContainer=function(t,i,o,c){if(!_l(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return xl(t,i,o,!1,c)},Hn.version="18.3.1-next-f1338f8080-20240426",Hn}var Cm;function N_(){if(Cm)return Rf.exports;Cm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Rf.exports=D_(),Rf.exports}var bm;function I_(){if(bm)return Sl;bm=1;var s=N_();return Sl.createRoot=s.createRoot,Sl.hydrateRoot=s.hydrateRoot,Sl}var U_=I_();const F_=Cg(U_);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ic="173",bg=0,fd=1,Pg=2,Ed=1,wd=2,Ri=3,Ji=0,Dn=1,Ci=2,Ki=0,ls=1,dd=2,hd=3,pd=4,Lg=5,Dr=100,Dg=101,Ng=102,Ig=103,Ug=104,Fg=200,Og=201,kg=202,zg=203,Yl=204,$l=205,Bg=206,Hg=207,Vg=208,Gg=209,Wg=210,Xg=211,jg=212,qg=213,Yg=214,Kl=0,Zl=1,Ql=2,us=3,Jl=4,ec=5,tc=6,nc=7,Td=0,$g=1,Kg=2,Zi=0,Zg=1,Qg=2,Jg=3,Ad=4,e0=5,t0=6,n0=7,Rd=300,fs=301,ds=302,ic=303,rc=304,ua=306,lo=1e3,Ir=1001,sc=1002,si=1003,i0=1004,ta=1005,vi=1006,Xl=1007,Ur=1008,Li=1009,Cd=1010,bd=1011,co=1012,Uc=1013,Or=1014,bi=1015,fo=1016,Fc=1017,Oc=1018,hs=1020,Pd=35902,Ld=1021,Dd=1022,ri=1023,Nd=1024,Id=1025,cs=1026,ps=1027,Ud=1028,kc=1029,Fd=1030,zc=1031,Bc=1033,ia=33776,ra=33777,sa=33778,oa=33779,oc=35840,ac=35841,lc=35842,cc=35843,uc=36196,fc=37492,dc=37496,hc=37808,pc=37809,mc=37810,gc=37811,vc=37812,_c=37813,xc=37814,yc=37815,Sc=37816,Mc=37817,Ec=37818,wc=37819,Tc=37820,Ac=37821,aa=36492,Rc=36494,Cc=36495,Od=36283,bc=36284,Pc=36285,Lc=36286,r0=3200,s0=3201,kd=0,o0=1,$i="",Gn="srgb",ms="srgb-linear",la="linear",It="srgb",ss=7680,md=519,a0=512,l0=513,c0=514,zd=515,u0=516,f0=517,d0=518,h0=519,gd=35044,vd="300 es",Pi=2e3,ca=2001;class gs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(n)===-1&&r[e].push(n)}hasEventListener(e,n){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(n)!==-1}removeEventListener(e,n){const r=this._listeners;if(r===void 0)return;const a=r[e];if(a!==void 0){const l=a.indexOf(n);l!==-1&&a.splice(l,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const r=n[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let l=0,u=a.length;l<u;l++)a[l].call(this,e);e.target=null}}}const wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pf=Math.PI/180,_d=180/Math.PI;function fa(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(wn[s&255]+wn[s>>8&255]+wn[s>>16&255]+wn[s>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[n&63|128]+wn[n>>8&255]+"-"+wn[n>>16&255]+wn[n>>24&255]+wn[r&255]+wn[r>>8&255]+wn[r>>16&255]+wn[r>>24&255]).toLowerCase()}function Mt(s,e,n){return Math.max(e,Math.min(n,s))}function O_(s,e){return(s%e+e)%e}function Lf(s,e,n){return(1-n)*s+n*e}function Yo(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Vn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Rt{constructor(e=0,n=0){Rt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,r=this.y,a=e.elements;return this.x=a[0]*n+a[3]*r+a[6],this.y=a[1]*n+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Mt(this.x,e.x,n.x),this.y=Mt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Mt(this.x,e,n),this.y=Mt(this.y,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Mt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(Mt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y;return n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const r=Math.cos(n),a=Math.sin(n),l=this.x-e.x,u=this.y-e.y;return this.x=l*r-u*a+e.x,this.y=l*a+u*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class mt{constructor(e,n,r,a,l,u,f,h,p){mt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,r,a,l,u,f,h,p)}set(e,n,r,a,l,u,f,h,p){const v=this.elements;return v[0]=e,v[1]=a,v[2]=f,v[3]=n,v[4]=l,v[5]=h,v[6]=r,v[7]=u,v[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],this}extractBasis(e,n,r){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,l=this.elements,u=r[0],f=r[3],h=r[6],p=r[1],v=r[4],x=r[7],y=r[2],S=r[5],M=r[8],T=a[0],_=a[3],g=a[6],I=a[1],D=a[4],C=a[7],z=a[2],k=a[5],O=a[8];return l[0]=u*T+f*I+h*z,l[3]=u*_+f*D+h*k,l[6]=u*g+f*C+h*O,l[1]=p*T+v*I+x*z,l[4]=p*_+v*D+x*k,l[7]=p*g+v*C+x*O,l[2]=y*T+S*I+M*z,l[5]=y*_+S*D+M*k,l[8]=y*g+S*C+M*O,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],u=e[4],f=e[5],h=e[6],p=e[7],v=e[8];return n*u*v-n*f*p-r*l*v+r*f*h+a*l*p-a*u*h}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],u=e[4],f=e[5],h=e[6],p=e[7],v=e[8],x=v*u-f*p,y=f*h-v*l,S=p*l-u*h,M=n*x+r*y+a*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=x*T,e[1]=(a*p-v*r)*T,e[2]=(f*r-a*u)*T,e[3]=y*T,e[4]=(v*n-a*h)*T,e[5]=(a*l-f*n)*T,e[6]=S*T,e[7]=(r*h-p*n)*T,e[8]=(u*n-r*l)*T,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,r,a,l,u,f){const h=Math.cos(l),p=Math.sin(l);return this.set(r*h,r*p,-r*(h*u+p*f)+u+e,-a*p,a*h,-a*(-p*u+h*f)+f+n,0,0,1),this}scale(e,n){return this.premultiply(Df.makeScale(e,n)),this}rotate(e){return this.premultiply(Df.makeRotation(-e)),this}translate(e,n){return this.premultiply(Df.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,r,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<9;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<9;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Df=new mt;function p0(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Dc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function m0(){const s=Dc("canvas");return s.style.display="block",s}const Pm={};function no(s){s in Pm||(Pm[s]=!0,console.warn(s))}function k_(s,e,n){return new Promise(function(r,a){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(l,n);break;default:r()}}setTimeout(l,n)})}function z_(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function B_(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Lm=new mt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dm=new mt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function H_(){const s={enabled:!0,workingColorSpace:ms,spaces:{},convert:function(a,l,u){return this.enabled===!1||l===u||!l||!u||(this.spaces[l].transfer===It&&(a.r=Qi(a.r),a.g=Qi(a.g),a.b=Qi(a.b)),this.spaces[l].primaries!==this.spaces[u].primaries&&(a.applyMatrix3(this.spaces[l].toXYZ),a.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===It&&(a.r=ao(a.r),a.g=ao(a.g),a.b=ao(a.b))),a},fromWorkingColorSpace:function(a,l){return this.convert(a,this.workingColorSpace,l)},toWorkingColorSpace:function(a,l){return this.convert(a,l,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===$i?la:this.spaces[a].transfer},getLuminanceCoefficients:function(a,l=this.workingColorSpace){return a.fromArray(this.spaces[l].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,l,u){return a.copy(this.spaces[l].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[ms]:{primaries:e,whitePoint:r,transfer:la,toXYZ:Lm,fromXYZ:Dm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Gn},outputColorSpaceConfig:{drawingBufferColorSpace:Gn}},[Gn]:{primaries:e,whitePoint:r,transfer:It,toXYZ:Lm,fromXYZ:Dm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Gn}}}),s}const Dt=H_();function Qi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ao(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Gs;class g0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Gs===void 0&&(Gs=Dc("canvas")),Gs.width=e.width,Gs.height=e.height;const r=Gs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Gs}return n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Dc("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),l=a.data;for(let u=0;u<l.length;u++)l[u]=Qi(l[u]/255)*255;return r.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let r=0;r<n.length;r++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[r]=Math.floor(Qi(n[r]/255)*255):n[r]=Qi(n[r]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let V_=0;class Bd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:V_++}),this.uuid=fa(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let u=0,f=a.length;u<f;u++)a[u].isDataTexture?l.push(Nf(a[u].image)):l.push(Nf(a[u]))}else l=Nf(a);r.url=l}return n||(e.images[this.uuid]=r),r}}function Nf(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?g0.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let G_=0;class An extends gs{constructor(e=An.DEFAULT_IMAGE,n=An.DEFAULT_MAPPING,r=Ir,a=Ir,l=vi,u=Ur,f=ri,h=Li,p=An.DEFAULT_ANISOTROPY,v=$i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:G_++}),this.uuid=fa(),this.name="",this.source=new Bd(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=l,this.minFilter=u,this.anisotropy=p,this.format=f,this.internalFormat=null,this.type=h,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Rd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case lo:e.x=e.x-Math.floor(e.x);break;case Ir:e.x=e.x<0?0:1;break;case sc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case lo:e.y=e.y-Math.floor(e.y);break;case Ir:e.y=e.y<0?0:1;break;case sc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}An.DEFAULT_IMAGE=null;An.DEFAULT_MAPPING=Rd;An.DEFAULT_ANISOTROPY=1;class Ut{constructor(e=0,n=0,r=0,a=1){Ut.prototype.isVector4=!0,this.x=e,this.y=n,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,r,a){return this.x=e,this.y=n,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,l=this.w,u=e.elements;return this.x=u[0]*n+u[4]*r+u[8]*a+u[12]*l,this.y=u[1]*n+u[5]*r+u[9]*a+u[13]*l,this.z=u[2]*n+u[6]*r+u[10]*a+u[14]*l,this.w=u[3]*n+u[7]*r+u[11]*a+u[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,r,a,l;const h=e.elements,p=h[0],v=h[4],x=h[8],y=h[1],S=h[5],M=h[9],T=h[2],_=h[6],g=h[10];if(Math.abs(v-y)<.01&&Math.abs(x-T)<.01&&Math.abs(M-_)<.01){if(Math.abs(v+y)<.1&&Math.abs(x+T)<.1&&Math.abs(M+_)<.1&&Math.abs(p+S+g-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const D=(p+1)/2,C=(S+1)/2,z=(g+1)/2,k=(v+y)/4,O=(x+T)/4,G=(M+_)/4;return D>C&&D>z?D<.01?(r=0,a=.707106781,l=.707106781):(r=Math.sqrt(D),a=k/r,l=O/r):C>z?C<.01?(r=.707106781,a=0,l=.707106781):(a=Math.sqrt(C),r=k/a,l=G/a):z<.01?(r=.707106781,a=.707106781,l=0):(l=Math.sqrt(z),r=O/l,a=G/l),this.set(r,a,l,n),this}let I=Math.sqrt((_-M)*(_-M)+(x-T)*(x-T)+(y-v)*(y-v));return Math.abs(I)<.001&&(I=1),this.x=(_-M)/I,this.y=(x-T)/I,this.z=(y-v)/I,this.w=Math.acos((p+S+g-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Mt(this.x,e.x,n.x),this.y=Mt(this.y,e.y,n.y),this.z=Mt(this.z,e.z,n.z),this.w=Mt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Mt(this.x,e,n),this.y=Mt(this.y,e,n),this.z=Mt(this.z,e,n),this.w=Mt(this.w,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Mt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this.w=e.w+(n.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class v0 extends gs{constructor(e=1,n=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Ut(0,0,e,n),this.scissorTest=!1,this.viewport=new Ut(0,0,e,n);const a={width:e,height:n,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const l=new An(a,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);l.flipY=!1,l.generateMipmaps=r.generateMipmaps,l.internalFormat=r.internalFormat,this.textures=[];const u=r.count;for(let f=0;f<u;f++)this.textures[f]=l.clone(),this.textures[f].isRenderTargetTexture=!0,this.textures[f].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,r=1){if(this.width!==e||this.height!==n||this.depth!==r){this.width=e,this.height=n,this.depth=r;for(let a=0,l=this.textures.length;a<l;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,a=e.textures.length;r<a;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;const n=Object.assign({},e.texture.image);return this.texture.source=new Bd(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kr extends v0{constructor(e=1,n=1,r={}){super(e,n,r),this.isWebGLRenderTarget=!0}}class Hd extends An{constructor(e=null,n=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=si,this.minFilter=si,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class _0 extends An{constructor(e=null,n=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=si,this.minFilter=si,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ho{constructor(e=0,n=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=r,this._w=a}static slerpFlat(e,n,r,a,l,u,f){let h=r[a+0],p=r[a+1],v=r[a+2],x=r[a+3];const y=l[u+0],S=l[u+1],M=l[u+2],T=l[u+3];if(f===0){e[n+0]=h,e[n+1]=p,e[n+2]=v,e[n+3]=x;return}if(f===1){e[n+0]=y,e[n+1]=S,e[n+2]=M,e[n+3]=T;return}if(x!==T||h!==y||p!==S||v!==M){let _=1-f;const g=h*y+p*S+v*M+x*T,I=g>=0?1:-1,D=1-g*g;if(D>Number.EPSILON){const z=Math.sqrt(D),k=Math.atan2(z,g*I);_=Math.sin(_*k)/z,f=Math.sin(f*k)/z}const C=f*I;if(h=h*_+y*C,p=p*_+S*C,v=v*_+M*C,x=x*_+T*C,_===1-f){const z=1/Math.sqrt(h*h+p*p+v*v+x*x);h*=z,p*=z,v*=z,x*=z}}e[n]=h,e[n+1]=p,e[n+2]=v,e[n+3]=x}static multiplyQuaternionsFlat(e,n,r,a,l,u){const f=r[a],h=r[a+1],p=r[a+2],v=r[a+3],x=l[u],y=l[u+1],S=l[u+2],M=l[u+3];return e[n]=f*M+v*x+h*S-p*y,e[n+1]=h*M+v*y+p*x-f*S,e[n+2]=p*M+v*S+f*y-h*x,e[n+3]=v*M-f*x-h*y-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,r,a){return this._x=e,this._y=n,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const r=e._x,a=e._y,l=e._z,u=e._order,f=Math.cos,h=Math.sin,p=f(r/2),v=f(a/2),x=f(l/2),y=h(r/2),S=h(a/2),M=h(l/2);switch(u){case"XYZ":this._x=y*v*x+p*S*M,this._y=p*S*x-y*v*M,this._z=p*v*M+y*S*x,this._w=p*v*x-y*S*M;break;case"YXZ":this._x=y*v*x+p*S*M,this._y=p*S*x-y*v*M,this._z=p*v*M-y*S*x,this._w=p*v*x+y*S*M;break;case"ZXY":this._x=y*v*x-p*S*M,this._y=p*S*x+y*v*M,this._z=p*v*M+y*S*x,this._w=p*v*x-y*S*M;break;case"ZYX":this._x=y*v*x-p*S*M,this._y=p*S*x+y*v*M,this._z=p*v*M-y*S*x,this._w=p*v*x+y*S*M;break;case"YZX":this._x=y*v*x+p*S*M,this._y=p*S*x+y*v*M,this._z=p*v*M-y*S*x,this._w=p*v*x-y*S*M;break;case"XZY":this._x=y*v*x-p*S*M,this._y=p*S*x-y*v*M,this._z=p*v*M+y*S*x,this._w=p*v*x+y*S*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const r=n/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,r=n[0],a=n[4],l=n[8],u=n[1],f=n[5],h=n[9],p=n[2],v=n[6],x=n[10],y=r+f+x;if(y>0){const S=.5/Math.sqrt(y+1);this._w=.25/S,this._x=(v-h)*S,this._y=(l-p)*S,this._z=(u-a)*S}else if(r>f&&r>x){const S=2*Math.sqrt(1+r-f-x);this._w=(v-h)/S,this._x=.25*S,this._y=(a+u)/S,this._z=(l+p)/S}else if(f>x){const S=2*Math.sqrt(1+f-r-x);this._w=(l-p)/S,this._x=(a+u)/S,this._y=.25*S,this._z=(h+v)/S}else{const S=2*Math.sqrt(1+x-r-f);this._w=(u-a)/S,this._x=(l+p)/S,this._y=(h+v)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let r=e.dot(n)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,n){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,n/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const r=e._x,a=e._y,l=e._z,u=e._w,f=n._x,h=n._y,p=n._z,v=n._w;return this._x=r*v+u*f+a*p-l*h,this._y=a*v+u*h+l*f-r*p,this._z=l*v+u*p+r*h-a*f,this._w=u*v-r*f-a*h-l*p,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const r=this._x,a=this._y,l=this._z,u=this._w;let f=u*e._w+r*e._x+a*e._y+l*e._z;if(f<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,f=-f):this.copy(e),f>=1)return this._w=u,this._x=r,this._y=a,this._z=l,this;const h=1-f*f;if(h<=Number.EPSILON){const S=1-n;return this._w=S*u+n*this._w,this._x=S*r+n*this._x,this._y=S*a+n*this._y,this._z=S*l+n*this._z,this.normalize(),this}const p=Math.sqrt(h),v=Math.atan2(p,f),x=Math.sin((1-n)*v)/p,y=Math.sin(n*v)/p;return this._w=u*x+this._w*y,this._x=r*x+this._x*y,this._y=a*x+this._y*y,this._z=l*x+this._z*y,this._onChangeCallback(),this}slerpQuaternions(e,n,r){return this.copy(e).slerp(n,r)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),l*Math.sin(n),l*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{constructor(e=0,n=0,r=0){K.prototype.isVector3=!0,this.x=e,this.y=n,this.z=r}set(e,n,r){return r===void 0&&(r=this.z),this.x=e,this.y=n,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Nm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Nm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[3]*r+l[6]*a,this.y=l[1]*n+l[4]*r+l[7]*a,this.z=l[2]*n+l[5]*r+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,l=e.elements,u=1/(l[3]*n+l[7]*r+l[11]*a+l[15]);return this.x=(l[0]*n+l[4]*r+l[8]*a+l[12])*u,this.y=(l[1]*n+l[5]*r+l[9]*a+l[13])*u,this.z=(l[2]*n+l[6]*r+l[10]*a+l[14])*u,this}applyQuaternion(e){const n=this.x,r=this.y,a=this.z,l=e.x,u=e.y,f=e.z,h=e.w,p=2*(u*a-f*r),v=2*(f*n-l*a),x=2*(l*r-u*n);return this.x=n+h*p+u*x-f*v,this.y=r+h*v+f*p-l*x,this.z=a+h*x+l*v-u*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[4]*r+l[8]*a,this.y=l[1]*n+l[5]*r+l[9]*a,this.z=l[2]*n+l[6]*r+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Mt(this.x,e.x,n.x),this.y=Mt(this.y,e.y,n.y),this.z=Mt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Mt(this.x,e,n),this.y=Mt(this.y,e,n),this.z=Mt(this.z,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Mt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const r=e.x,a=e.y,l=e.z,u=n.x,f=n.y,h=n.z;return this.x=a*h-l*f,this.y=l*u-r*h,this.z=r*f-a*u,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const r=e.dot(this)/n;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return If.copy(this).projectOnVector(e),this.sub(If)}reflect(e){return this.sub(If.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(Mt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return n*n+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,r){const a=Math.sin(n)*e;return this.x=a*Math.sin(r),this.y=Math.cos(n)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,r){return this.x=e*Math.sin(n),this.y=r,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=r,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,r=Math.sqrt(1-n*n);return this.x=r*Math.cos(e),this.y=n,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const If=new K,Nm=new ho;class po{constructor(e=new K(1/0,1/0,1/0),n=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n+=3)this.expandByPoint(hi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,r=e.count;n<r;n++)this.expandByPoint(hi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const r=hi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(n===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,f=l.count;u<f;u++)e.isMesh===!0?e.getVertexPosition(u,hi):hi.fromBufferAttribute(l,u),hi.applyMatrix4(e.matrixWorld),this.expandByPoint(hi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ml.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Ml.copy(r.boundingBox)),Ml.applyMatrix4(e.matrixWorld),this.union(Ml)}const a=e.children;for(let l=0,u=a.length;l<u;l++)this.expandByObject(a[l],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hi),hi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,r;return e.normal.x>0?(n=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),n<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($o),El.subVectors(this.max,$o),Ws.subVectors(e.a,$o),Xs.subVectors(e.b,$o),js.subVectors(e.c,$o),wr.subVectors(Xs,Ws),Tr.subVectors(js,Xs),Jr.subVectors(Ws,js);let n=[0,-wr.z,wr.y,0,-Tr.z,Tr.y,0,-Jr.z,Jr.y,wr.z,0,-wr.x,Tr.z,0,-Tr.x,Jr.z,0,-Jr.x,-wr.y,wr.x,0,-Tr.y,Tr.x,0,-Jr.y,Jr.x,0];return!Uf(n,Ws,Xs,js,El)||(n=[1,0,0,0,1,0,0,0,1],!Uf(n,Ws,Xs,js,El))?!1:(wl.crossVectors(wr,Tr),n=[wl.x,wl.y,wl.z],Uf(n,Ws,Xs,js,El))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Gi=[new K,new K,new K,new K,new K,new K,new K,new K],hi=new K,Ml=new po,Ws=new K,Xs=new K,js=new K,wr=new K,Tr=new K,Jr=new K,$o=new K,El=new K,wl=new K,es=new K;function Uf(s,e,n,r,a){for(let l=0,u=s.length-3;l<=u;l+=3){es.fromArray(s,l);const f=a.x*Math.abs(es.x)+a.y*Math.abs(es.y)+a.z*Math.abs(es.z),h=e.dot(es),p=n.dot(es),v=r.dot(es);if(Math.max(-Math.max(h,p,v),Math.min(h,p,v))>f)return!1}return!0}const W_=new po,Ko=new K,Ff=new K;class da{constructor(e=new K,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const r=this.center;n!==void 0?r.copy(n):W_.setFromPoints(e).getCenter(r);let a=0;for(let l=0,u=e.length;l<u;l++)a=Math.max(a,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const r=this.center.distanceToSquared(e);return n.copy(e),r>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ko.subVectors(e,this.center);const n=Ko.lengthSq();if(n>this.radius*this.radius){const r=Math.sqrt(n),a=(r-this.radius)*.5;this.center.addScaledVector(Ko,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ff.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ko.copy(e.center).add(Ff)),this.expandByPoint(Ko.copy(e.center).sub(Ff))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Wi=new K,Of=new K,Tl=new K,Ar=new K,kf=new K,Al=new K,zf=new K;class Vd{constructor(e=new K,n=new K(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const r=n.dot(this.direction);return r<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Wi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Wi.copy(this.origin).addScaledVector(this.direction,n),Wi.distanceToSquared(e))}distanceSqToSegment(e,n,r,a){Of.copy(e).add(n).multiplyScalar(.5),Tl.copy(n).sub(e).normalize(),Ar.copy(this.origin).sub(Of);const l=e.distanceTo(n)*.5,u=-this.direction.dot(Tl),f=Ar.dot(this.direction),h=-Ar.dot(Tl),p=Ar.lengthSq(),v=Math.abs(1-u*u);let x,y,S,M;if(v>0)if(x=u*h-f,y=u*f-h,M=l*v,x>=0)if(y>=-M)if(y<=M){const T=1/v;x*=T,y*=T,S=x*(x+u*y+2*f)+y*(u*x+y+2*h)+p}else y=l,x=Math.max(0,-(u*y+f)),S=-x*x+y*(y+2*h)+p;else y=-l,x=Math.max(0,-(u*y+f)),S=-x*x+y*(y+2*h)+p;else y<=-M?(x=Math.max(0,-(-u*l+f)),y=x>0?-l:Math.min(Math.max(-l,-h),l),S=-x*x+y*(y+2*h)+p):y<=M?(x=0,y=Math.min(Math.max(-l,-h),l),S=y*(y+2*h)+p):(x=Math.max(0,-(u*l+f)),y=x>0?l:Math.min(Math.max(-l,-h),l),S=-x*x+y*(y+2*h)+p);else y=u>0?-l:l,x=Math.max(0,-(u*y+f)),S=-x*x+y*(y+2*h)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,x),a&&a.copy(Of).addScaledVector(Tl,y),S}intersectSphere(e,n){Wi.subVectors(e.center,this.origin);const r=Wi.dot(this.direction),a=Wi.dot(Wi)-r*r,l=e.radius*e.radius;if(a>l)return null;const u=Math.sqrt(l-a),f=r-u,h=r+u;return h<0?null:f<0?this.at(h,n):this.at(f,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/n;return r>=0?r:null}intersectPlane(e,n){const r=this.distanceToPlane(e);return r===null?null:this.at(r,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let r,a,l,u,f,h;const p=1/this.direction.x,v=1/this.direction.y,x=1/this.direction.z,y=this.origin;return p>=0?(r=(e.min.x-y.x)*p,a=(e.max.x-y.x)*p):(r=(e.max.x-y.x)*p,a=(e.min.x-y.x)*p),v>=0?(l=(e.min.y-y.y)*v,u=(e.max.y-y.y)*v):(l=(e.max.y-y.y)*v,u=(e.min.y-y.y)*v),r>u||l>a||((l>r||isNaN(r))&&(r=l),(u<a||isNaN(a))&&(a=u),x>=0?(f=(e.min.z-y.z)*x,h=(e.max.z-y.z)*x):(f=(e.max.z-y.z)*x,h=(e.min.z-y.z)*x),r>h||f>a)||((f>r||r!==r)&&(r=f),(h<a||a!==a)&&(a=h),a<0)?null:this.at(r>=0?r:a,n)}intersectsBox(e){return this.intersectBox(e,Wi)!==null}intersectTriangle(e,n,r,a,l){kf.subVectors(n,e),Al.subVectors(r,e),zf.crossVectors(kf,Al);let u=this.direction.dot(zf),f;if(u>0){if(a)return null;f=1}else if(u<0)f=-1,u=-u;else return null;Ar.subVectors(this.origin,e);const h=f*this.direction.dot(Al.crossVectors(Ar,Al));if(h<0)return null;const p=f*this.direction.dot(kf.cross(Ar));if(p<0||h+p>u)return null;const v=-f*Ar.dot(zf);return v<0?null:this.at(v/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class zt{constructor(e,n,r,a,l,u,f,h,p,v,x,y,S,M,T,_){zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,r,a,l,u,f,h,p,v,x,y,S,M,T,_)}set(e,n,r,a,l,u,f,h,p,v,x,y,S,M,T,_){const g=this.elements;return g[0]=e,g[4]=n,g[8]=r,g[12]=a,g[1]=l,g[5]=u,g[9]=f,g[13]=h,g[2]=p,g[6]=v,g[10]=x,g[14]=y,g[3]=S,g[7]=M,g[11]=T,g[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new zt().fromArray(this.elements)}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15],this}copyPosition(e){const n=this.elements,r=e.elements;return n[12]=r[12],n[13]=r[13],n[14]=r[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,r){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,n,r){return this.set(e.x,n.x,r.x,0,e.y,n.y,r.y,0,e.z,n.z,r.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,r=e.elements,a=1/qs.setFromMatrixColumn(e,0).length(),l=1/qs.setFromMatrixColumn(e,1).length(),u=1/qs.setFromMatrixColumn(e,2).length();return n[0]=r[0]*a,n[1]=r[1]*a,n[2]=r[2]*a,n[3]=0,n[4]=r[4]*l,n[5]=r[5]*l,n[6]=r[6]*l,n[7]=0,n[8]=r[8]*u,n[9]=r[9]*u,n[10]=r[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,r=e.x,a=e.y,l=e.z,u=Math.cos(r),f=Math.sin(r),h=Math.cos(a),p=Math.sin(a),v=Math.cos(l),x=Math.sin(l);if(e.order==="XYZ"){const y=u*v,S=u*x,M=f*v,T=f*x;n[0]=h*v,n[4]=-h*x,n[8]=p,n[1]=S+M*p,n[5]=y-T*p,n[9]=-f*h,n[2]=T-y*p,n[6]=M+S*p,n[10]=u*h}else if(e.order==="YXZ"){const y=h*v,S=h*x,M=p*v,T=p*x;n[0]=y+T*f,n[4]=M*f-S,n[8]=u*p,n[1]=u*x,n[5]=u*v,n[9]=-f,n[2]=S*f-M,n[6]=T+y*f,n[10]=u*h}else if(e.order==="ZXY"){const y=h*v,S=h*x,M=p*v,T=p*x;n[0]=y-T*f,n[4]=-u*x,n[8]=M+S*f,n[1]=S+M*f,n[5]=u*v,n[9]=T-y*f,n[2]=-u*p,n[6]=f,n[10]=u*h}else if(e.order==="ZYX"){const y=u*v,S=u*x,M=f*v,T=f*x;n[0]=h*v,n[4]=M*p-S,n[8]=y*p+T,n[1]=h*x,n[5]=T*p+y,n[9]=S*p-M,n[2]=-p,n[6]=f*h,n[10]=u*h}else if(e.order==="YZX"){const y=u*h,S=u*p,M=f*h,T=f*p;n[0]=h*v,n[4]=T-y*x,n[8]=M*x+S,n[1]=x,n[5]=u*v,n[9]=-f*v,n[2]=-p*v,n[6]=S*x+M,n[10]=y-T*x}else if(e.order==="XZY"){const y=u*h,S=u*p,M=f*h,T=f*p;n[0]=h*v,n[4]=-x,n[8]=p*v,n[1]=y*x+T,n[5]=u*v,n[9]=S*x-M,n[2]=M*x-S,n[6]=f*v,n[10]=T*x+y}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(X_,e,j_)}lookAt(e,n,r){const a=this.elements;return Yn.subVectors(e,n),Yn.lengthSq()===0&&(Yn.z=1),Yn.normalize(),Rr.crossVectors(r,Yn),Rr.lengthSq()===0&&(Math.abs(r.z)===1?Yn.x+=1e-4:Yn.z+=1e-4,Yn.normalize(),Rr.crossVectors(r,Yn)),Rr.normalize(),Rl.crossVectors(Yn,Rr),a[0]=Rr.x,a[4]=Rl.x,a[8]=Yn.x,a[1]=Rr.y,a[5]=Rl.y,a[9]=Yn.y,a[2]=Rr.z,a[6]=Rl.z,a[10]=Yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,l=this.elements,u=r[0],f=r[4],h=r[8],p=r[12],v=r[1],x=r[5],y=r[9],S=r[13],M=r[2],T=r[6],_=r[10],g=r[14],I=r[3],D=r[7],C=r[11],z=r[15],k=a[0],O=a[4],G=a[8],P=a[12],R=a[1],H=a[5],ie=a[9],Y=a[13],de=a[2],me=a[6],Q=a[10],re=a[14],B=a[3],he=a[7],L=a[11],E=a[15];return l[0]=u*k+f*R+h*de+p*B,l[4]=u*O+f*H+h*me+p*he,l[8]=u*G+f*ie+h*Q+p*L,l[12]=u*P+f*Y+h*re+p*E,l[1]=v*k+x*R+y*de+S*B,l[5]=v*O+x*H+y*me+S*he,l[9]=v*G+x*ie+y*Q+S*L,l[13]=v*P+x*Y+y*re+S*E,l[2]=M*k+T*R+_*de+g*B,l[6]=M*O+T*H+_*me+g*he,l[10]=M*G+T*ie+_*Q+g*L,l[14]=M*P+T*Y+_*re+g*E,l[3]=I*k+D*R+C*de+z*B,l[7]=I*O+D*H+C*me+z*he,l[11]=I*G+D*ie+C*Q+z*L,l[15]=I*P+D*Y+C*re+z*E,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[4],a=e[8],l=e[12],u=e[1],f=e[5],h=e[9],p=e[13],v=e[2],x=e[6],y=e[10],S=e[14],M=e[3],T=e[7],_=e[11],g=e[15];return M*(+l*h*x-a*p*x-l*f*y+r*p*y+a*f*S-r*h*S)+T*(+n*h*S-n*p*y+l*u*y-a*u*S+a*p*v-l*h*v)+_*(+n*p*x-n*f*S-l*u*x+r*u*S+l*f*v-r*p*v)+g*(-a*f*v-n*h*x+n*f*y+a*u*x-r*u*y+r*h*v)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=r),this}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],l=e[3],u=e[4],f=e[5],h=e[6],p=e[7],v=e[8],x=e[9],y=e[10],S=e[11],M=e[12],T=e[13],_=e[14],g=e[15],I=x*_*p-T*y*p+T*h*S-f*_*S-x*h*g+f*y*g,D=M*y*p-v*_*p-M*h*S+u*_*S+v*h*g-u*y*g,C=v*T*p-M*x*p+M*f*S-u*T*S-v*f*g+u*x*g,z=M*x*h-v*T*h-M*f*y+u*T*y+v*f*_-u*x*_,k=n*I+r*D+a*C+l*z;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/k;return e[0]=I*O,e[1]=(T*y*l-x*_*l-T*a*S+r*_*S+x*a*g-r*y*g)*O,e[2]=(f*_*l-T*h*l+T*a*p-r*_*p-f*a*g+r*h*g)*O,e[3]=(x*h*l-f*y*l-x*a*p+r*y*p+f*a*S-r*h*S)*O,e[4]=D*O,e[5]=(v*_*l-M*y*l+M*a*S-n*_*S-v*a*g+n*y*g)*O,e[6]=(M*h*l-u*_*l-M*a*p+n*_*p+u*a*g-n*h*g)*O,e[7]=(u*y*l-v*h*l+v*a*p-n*y*p-u*a*S+n*h*S)*O,e[8]=C*O,e[9]=(M*x*l-v*T*l-M*r*S+n*T*S+v*r*g-n*x*g)*O,e[10]=(u*T*l-M*f*l+M*r*p-n*T*p-u*r*g+n*f*g)*O,e[11]=(v*f*l-u*x*l-v*r*p+n*x*p+u*r*S-n*f*S)*O,e[12]=z*O,e[13]=(v*T*a-M*x*a+M*r*y-n*T*y-v*r*_+n*x*_)*O,e[14]=(M*f*a-u*T*a-M*r*h+n*T*h+u*r*_-n*f*_)*O,e[15]=(u*x*a-v*f*a+v*r*h-n*x*h-u*r*y+n*f*y)*O,this}scale(e){const n=this.elements,r=e.x,a=e.y,l=e.z;return n[0]*=r,n[4]*=a,n[8]*=l,n[1]*=r,n[5]*=a,n[9]*=l,n[2]*=r,n[6]*=a,n[10]*=l,n[3]*=r,n[7]*=a,n[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,r,a))}makeTranslation(e,n,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,r,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const r=Math.cos(n),a=Math.sin(n),l=1-r,u=e.x,f=e.y,h=e.z,p=l*u,v=l*f;return this.set(p*u+r,p*f-a*h,p*h+a*f,0,p*f+a*h,v*f+r,v*h-a*u,0,p*h-a*f,v*h+a*u,l*h*h+r,0,0,0,0,1),this}makeScale(e,n,r){return this.set(e,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,n,r,a,l,u){return this.set(1,r,l,0,e,1,u,0,n,a,1,0,0,0,0,1),this}compose(e,n,r){const a=this.elements,l=n._x,u=n._y,f=n._z,h=n._w,p=l+l,v=u+u,x=f+f,y=l*p,S=l*v,M=l*x,T=u*v,_=u*x,g=f*x,I=h*p,D=h*v,C=h*x,z=r.x,k=r.y,O=r.z;return a[0]=(1-(T+g))*z,a[1]=(S+C)*z,a[2]=(M-D)*z,a[3]=0,a[4]=(S-C)*k,a[5]=(1-(y+g))*k,a[6]=(_+I)*k,a[7]=0,a[8]=(M+D)*O,a[9]=(_-I)*O,a[10]=(1-(y+T))*O,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,r){const a=this.elements;let l=qs.set(a[0],a[1],a[2]).length();const u=qs.set(a[4],a[5],a[6]).length(),f=qs.set(a[8],a[9],a[10]).length();this.determinant()<0&&(l=-l),e.x=a[12],e.y=a[13],e.z=a[14],pi.copy(this);const p=1/l,v=1/u,x=1/f;return pi.elements[0]*=p,pi.elements[1]*=p,pi.elements[2]*=p,pi.elements[4]*=v,pi.elements[5]*=v,pi.elements[6]*=v,pi.elements[8]*=x,pi.elements[9]*=x,pi.elements[10]*=x,n.setFromRotationMatrix(pi),r.x=l,r.y=u,r.z=f,this}makePerspective(e,n,r,a,l,u,f=Pi){const h=this.elements,p=2*l/(n-e),v=2*l/(r-a),x=(n+e)/(n-e),y=(r+a)/(r-a);let S,M;if(f===Pi)S=-(u+l)/(u-l),M=-2*u*l/(u-l);else if(f===ca)S=-u/(u-l),M=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+f);return h[0]=p,h[4]=0,h[8]=x,h[12]=0,h[1]=0,h[5]=v,h[9]=y,h[13]=0,h[2]=0,h[6]=0,h[10]=S,h[14]=M,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,n,r,a,l,u,f=Pi){const h=this.elements,p=1/(n-e),v=1/(r-a),x=1/(u-l),y=(n+e)*p,S=(r+a)*v;let M,T;if(f===Pi)M=(u+l)*x,T=-2*x;else if(f===ca)M=l*x,T=-1*x;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+f);return h[0]=2*p,h[4]=0,h[8]=0,h[12]=-y,h[1]=0,h[5]=2*v,h[9]=0,h[13]=-S,h[2]=0,h[6]=0,h[10]=T,h[14]=-M,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<16;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<16;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e[n+9]=r[9],e[n+10]=r[10],e[n+11]=r[11],e[n+12]=r[12],e[n+13]=r[13],e[n+14]=r[14],e[n+15]=r[15],e}}const qs=new K,pi=new zt,X_=new K(0,0,0),j_=new K(1,1,1),Rr=new K,Rl=new K,Yn=new K,Im=new zt,Um=new ho;class yi{constructor(e=0,n=0,r=0,a=yi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,r,a=this._order){return this._x=e,this._y=n,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,r=!0){const a=e.elements,l=a[0],u=a[4],f=a[8],h=a[1],p=a[5],v=a[9],x=a[2],y=a[6],S=a[10];switch(n){case"XYZ":this._y=Math.asin(Mt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-v,S),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(y,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(f,S),this._z=Math.atan2(h,p)):(this._y=Math.atan2(-x,l),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-x,S),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-Mt(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(y,S),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(Mt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-v,p),this._y=Math.atan2(-x,l)):(this._x=0,this._y=Math.atan2(f,S));break;case"XZY":this._z=Math.asin(-Mt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(y,p),this._y=Math.atan2(f,l)):(this._x=Math.atan2(-v,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,r){return Im.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Im,n,r)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Um.setFromEuler(this),this.setFromQuaternion(Um,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yi.DEFAULT_ORDER="XYZ";class Gd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let q_=0;const Fm=new K,Ys=new ho,Xi=new zt,Cl=new K,Zo=new K,Y_=new K,$_=new ho,Om=new K(1,0,0),km=new K(0,1,0),zm=new K(0,0,1),Bm={type:"added"},K_={type:"removed"},$s={type:"childadded",child:null},Bf={type:"childremoved",child:null};class hn extends gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:q_++}),this.uuid=fa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=hn.DEFAULT_UP.clone();const e=new K,n=new yi,r=new ho,a=new K(1,1,1);function l(){r.setFromEuler(n,!1)}function u(){n.setFromQuaternion(r,void 0,!1)}n._onChange(l),r._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new zt},normalMatrix:{value:new mt}}),this.matrix=new zt,this.matrixWorld=new zt,this.matrixAutoUpdate=hn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ys.setFromAxisAngle(e,n),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(e,n){return Ys.setFromAxisAngle(e,n),this.quaternion.premultiply(Ys),this}rotateX(e){return this.rotateOnAxis(Om,e)}rotateY(e){return this.rotateOnAxis(km,e)}rotateZ(e){return this.rotateOnAxis(zm,e)}translateOnAxis(e,n){return Fm.copy(e).applyQuaternion(this.quaternion),this.position.add(Fm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Om,e)}translateY(e){return this.translateOnAxis(km,e)}translateZ(e){return this.translateOnAxis(zm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xi.copy(this.matrixWorld).invert())}lookAt(e,n,r){e.isVector3?Cl.copy(e):Cl.set(e,n,r);const a=this.parent;this.updateWorldMatrix(!0,!1),Zo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xi.lookAt(Zo,Cl,this.up):Xi.lookAt(Cl,Zo,this.up),this.quaternion.setFromRotationMatrix(Xi),a&&(Xi.extractRotation(a.matrixWorld),Ys.setFromRotationMatrix(Xi),this.quaternion.premultiply(Ys.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bm),$s.child=e,this.dispatchEvent($s),$s.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(K_),Bf.child=e,this.dispatchEvent(Bf),Bf.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bm),$s.child=e,this.dispatchEvent($s),$s.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let r=0,a=this.children.length;r<a;r++){const u=this.children[r].getObjectByProperty(e,n);if(u!==void 0)return u}}getObjectsByProperty(e,n,r=[]){this[e]===n&&r.push(this);const a=this.children;for(let l=0,u=a.length;l<u;l++)a[l].getObjectsByProperty(e,n,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zo,e,Y_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zo,$_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateMatrixWorld(e)}updateWorldMatrix(e,n){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let l=0,u=a.length;l<u;l++)a[l].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",r={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(f=>({boxInitialized:f.boxInitialized,boxMin:f.box.min.toArray(),boxMax:f.box.max.toArray(),sphereInitialized:f.sphereInitialized,sphereRadius:f.sphere.radius,sphereCenter:f.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function l(f,h){return f[h.uuid]===void 0&&(f[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const f=this.geometry.parameters;if(f!==void 0&&f.shapes!==void 0){const h=f.shapes;if(Array.isArray(h))for(let p=0,v=h.length;p<v;p++){const x=h[p];l(e.shapes,x)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const f=[];for(let h=0,p=this.material.length;h<p;h++)f.push(l(e.materials,this.material[h]));a.material=f}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let f=0;f<this.children.length;f++)a.children.push(this.children[f].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let f=0;f<this.animations.length;f++){const h=this.animations[f];a.animations.push(l(e.animations,h))}}if(n){const f=u(e.geometries),h=u(e.materials),p=u(e.textures),v=u(e.images),x=u(e.shapes),y=u(e.skeletons),S=u(e.animations),M=u(e.nodes);f.length>0&&(r.geometries=f),h.length>0&&(r.materials=h),p.length>0&&(r.textures=p),v.length>0&&(r.images=v),x.length>0&&(r.shapes=x),y.length>0&&(r.skeletons=y),S.length>0&&(r.animations=S),M.length>0&&(r.nodes=M)}return r.object=a,r;function u(f){const h=[];for(const p in f){const v=f[p];delete v.metadata,h.push(v)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}hn.DEFAULT_UP=new K(0,1,0);hn.DEFAULT_MATRIX_AUTO_UPDATE=!0;hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mi=new K,ji=new K,Hf=new K,qi=new K,Ks=new K,Zs=new K,Hm=new K,Vf=new K,Gf=new K,Wf=new K,Xf=new Ut,jf=new Ut,qf=new Ut;class ii{constructor(e=new K,n=new K,r=new K){this.a=e,this.b=n,this.c=r}static getNormal(e,n,r,a){a.subVectors(r,n),mi.subVectors(e,n),a.cross(mi);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,n,r,a,l){mi.subVectors(a,n),ji.subVectors(r,n),Hf.subVectors(e,n);const u=mi.dot(mi),f=mi.dot(ji),h=mi.dot(Hf),p=ji.dot(ji),v=ji.dot(Hf),x=u*p-f*f;if(x===0)return l.set(0,0,0),null;const y=1/x,S=(p*h-f*v)*y,M=(u*v-f*h)*y;return l.set(1-S-M,M,S)}static containsPoint(e,n,r,a){return this.getBarycoord(e,n,r,a,qi)===null?!1:qi.x>=0&&qi.y>=0&&qi.x+qi.y<=1}static getInterpolation(e,n,r,a,l,u,f,h){return this.getBarycoord(e,n,r,a,qi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,qi.x),h.addScaledVector(u,qi.y),h.addScaledVector(f,qi.z),h)}static getInterpolatedAttribute(e,n,r,a,l,u){return Xf.setScalar(0),jf.setScalar(0),qf.setScalar(0),Xf.fromBufferAttribute(e,n),jf.fromBufferAttribute(e,r),qf.fromBufferAttribute(e,a),u.setScalar(0),u.addScaledVector(Xf,l.x),u.addScaledVector(jf,l.y),u.addScaledVector(qf,l.z),u}static isFrontFacing(e,n,r,a){return mi.subVectors(r,n),ji.subVectors(e,n),mi.cross(ji).dot(a)<0}set(e,n,r){return this.a.copy(e),this.b.copy(n),this.c.copy(r),this}setFromPointsAndIndices(e,n,r,a){return this.a.copy(e[n]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,r,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mi.subVectors(this.c,this.b),ji.subVectors(this.a,this.b),mi.cross(ji).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ii.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ii.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,r,a,l){return ii.getInterpolation(e,this.a,this.b,this.c,n,r,a,l)}containsPoint(e){return ii.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ii.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const r=this.a,a=this.b,l=this.c;let u,f;Ks.subVectors(a,r),Zs.subVectors(l,r),Vf.subVectors(e,r);const h=Ks.dot(Vf),p=Zs.dot(Vf);if(h<=0&&p<=0)return n.copy(r);Gf.subVectors(e,a);const v=Ks.dot(Gf),x=Zs.dot(Gf);if(v>=0&&x<=v)return n.copy(a);const y=h*x-v*p;if(y<=0&&h>=0&&v<=0)return u=h/(h-v),n.copy(r).addScaledVector(Ks,u);Wf.subVectors(e,l);const S=Ks.dot(Wf),M=Zs.dot(Wf);if(M>=0&&S<=M)return n.copy(l);const T=S*p-h*M;if(T<=0&&p>=0&&M<=0)return f=p/(p-M),n.copy(r).addScaledVector(Zs,f);const _=v*M-S*x;if(_<=0&&x-v>=0&&S-M>=0)return Hm.subVectors(l,a),f=(x-v)/(x-v+(S-M)),n.copy(a).addScaledVector(Hm,f);const g=1/(_+T+y);return u=T*g,f=y*g,n.copy(r).addScaledVector(Ks,u).addScaledVector(Zs,f)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const x0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cr={h:0,s:0,l:0},bl={h:0,s:0,l:0};function Yf(s,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?s+(e-s)*6*n:n<1/2?e:n<2/3?s+(e-s)*6*(2/3-n):s}class _t{constructor(e,n,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,r)}set(e,n,r){if(n===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Gn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Dt.toWorkingColorSpace(this,n),this}setRGB(e,n,r,a=Dt.workingColorSpace){return this.r=e,this.g=n,this.b=r,Dt.toWorkingColorSpace(this,a),this}setHSL(e,n,r,a=Dt.workingColorSpace){if(e=O_(e,1),n=Mt(n,0,1),r=Mt(r,0,1),n===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+n):r+n-r*n,u=2*r-l;this.r=Yf(u,l,e+1/3),this.g=Yf(u,l,e),this.b=Yf(u,l,e-1/3)}return Dt.toWorkingColorSpace(this,a),this}setStyle(e,n=Gn){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=a[1],f=a[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,n);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,n);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(l,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Gn){const r=x0[e.toLowerCase()];return r!==void 0?this.setHex(r,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}copyLinearToSRGB(e){return this.r=ao(e.r),this.g=ao(e.g),this.b=ao(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gn){return Dt.fromWorkingColorSpace(Tn.copy(this),e),Math.round(Mt(Tn.r*255,0,255))*65536+Math.round(Mt(Tn.g*255,0,255))*256+Math.round(Mt(Tn.b*255,0,255))}getHexString(e=Gn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Dt.workingColorSpace){Dt.fromWorkingColorSpace(Tn.copy(this),n);const r=Tn.r,a=Tn.g,l=Tn.b,u=Math.max(r,a,l),f=Math.min(r,a,l);let h,p;const v=(f+u)/2;if(f===u)h=0,p=0;else{const x=u-f;switch(p=v<=.5?x/(u+f):x/(2-u-f),u){case r:h=(a-l)/x+(a<l?6:0);break;case a:h=(l-r)/x+2;break;case l:h=(r-a)/x+4;break}h/=6}return e.h=h,e.s=p,e.l=v,e}getRGB(e,n=Dt.workingColorSpace){return Dt.fromWorkingColorSpace(Tn.copy(this),n),e.r=Tn.r,e.g=Tn.g,e.b=Tn.b,e}getStyle(e=Gn){Dt.fromWorkingColorSpace(Tn.copy(this),e);const n=Tn.r,r=Tn.g,a=Tn.b;return e!==Gn?`color(${e} ${n.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,n,r){return this.getHSL(Cr),this.setHSL(Cr.h+e,Cr.s+n,Cr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,r){return this.r=e.r+(n.r-e.r)*r,this.g=e.g+(n.g-e.g)*r,this.b=e.b+(n.b-e.b)*r,this}lerpHSL(e,n){this.getHSL(Cr),e.getHSL(bl);const r=Lf(Cr.h,bl.h,n),a=Lf(Cr.s,bl.s,n),l=Lf(Cr.l,bl.l,n);return this.setHSL(r,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,r=this.g,a=this.b,l=e.elements;return this.r=l[0]*n+l[3]*r+l[6]*a,this.g=l[1]*n+l[4]*r+l[7]*a,this.b=l[2]*n+l[5]*r+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tn=new _t;_t.NAMES=x0;let Z_=0;class vs extends gs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Z_++}),this.uuid=fa(),this.name="",this.type="Material",this.blending=ls,this.side=Ji,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yl,this.blendDst=$l,this.blendEquation=Dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _t(0,0,0),this.blendAlpha=0,this.depthFunc=us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=md,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const r=e[n];if(r===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==ls&&(r.blending=this.blending),this.side!==Ji&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Yl&&(r.blendSrc=this.blendSrc),this.blendDst!==$l&&(r.blendDst=this.blendDst),this.blendEquation!==Dr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==us&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==md&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ss&&(r.stencilFail=this.stencilFail),this.stencilZFail!==ss&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==ss&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(l){const u=[];for(const f in l){const h=l[f];delete h.metadata,u.push(h)}return u}if(n){const l=a(e.textures),u=a(e.images);l.length>0&&(r.textures=l),u.length>0&&(r.images=u)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let r=null;if(n!==null){const a=n.length;r=new Array(a);for(let l=0;l!==a;++l)r[l]=n[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class _s extends vs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Td,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Jt=new K,Pl=new Rt;let Q_=0;class oi{constructor(e,n,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Q_++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=r,this.usage=gd,this.updateRanges=[],this.gpuType=bi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,r){e*=this.itemSize,r*=n.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=n.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,r=this.count;n<r;n++)Pl.fromBufferAttribute(this,n),Pl.applyMatrix3(e),this.setXY(n,Pl.x,Pl.y);else if(this.itemSize===3)for(let n=0,r=this.count;n<r;n++)Jt.fromBufferAttribute(this,n),Jt.applyMatrix3(e),this.setXYZ(n,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let n=0,r=this.count;n<r;n++)Jt.fromBufferAttribute(this,n),Jt.applyMatrix4(e),this.setXYZ(n,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let n=0,r=this.count;n<r;n++)Jt.fromBufferAttribute(this,n),Jt.applyNormalMatrix(e),this.setXYZ(n,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let n=0,r=this.count;n<r;n++)Jt.fromBufferAttribute(this,n),Jt.transformDirection(e),this.setXYZ(n,Jt.x,Jt.y,Jt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let r=this.array[e*this.itemSize+n];return this.normalized&&(r=Yo(r,this.array)),r}setComponent(e,n,r){return this.normalized&&(r=Vn(r,this.array)),this.array[e*this.itemSize+n]=r,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Yo(n,this.array)),n}setX(e,n){return this.normalized&&(n=Vn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Yo(n,this.array)),n}setY(e,n){return this.normalized&&(n=Vn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Yo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Vn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Yo(n,this.array)),n}setW(e,n){return this.normalized&&(n=Vn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,r){return e*=this.itemSize,this.normalized&&(n=Vn(n,this.array),r=Vn(r,this.array)),this.array[e+0]=n,this.array[e+1]=r,this}setXYZ(e,n,r,a){return e*=this.itemSize,this.normalized&&(n=Vn(n,this.array),r=Vn(r,this.array),a=Vn(a,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,n,r,a,l){return e*=this.itemSize,this.normalized&&(n=Vn(n,this.array),r=Vn(r,this.array),a=Vn(a,this.array),l=Vn(l,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gd&&(e.usage=this.usage),e}}class Wd extends oi{constructor(e,n,r){super(new Uint16Array(e),n,r)}}class Xd extends oi{constructor(e,n,r){super(new Uint32Array(e),n,r)}}class nn extends oi{constructor(e,n,r){super(new Float32Array(e),n,r)}}let J_=0;const ni=new zt,$f=new hn,Qs=new K,$n=new po,Qo=new po,fn=new K;class Nn extends gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:J_++}),this.uuid=fa(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(p0(e)?Xd:Wd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,r=0){this.groups.push({start:e,count:n,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new mt().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ni.makeRotationFromQuaternion(e),this.applyMatrix4(ni),this}rotateX(e){return ni.makeRotationX(e),this.applyMatrix4(ni),this}rotateY(e){return ni.makeRotationY(e),this.applyMatrix4(ni),this}rotateZ(e){return ni.makeRotationZ(e),this.applyMatrix4(ni),this}translate(e,n,r){return ni.makeTranslation(e,n,r),this.applyMatrix4(ni),this}scale(e,n,r){return ni.makeScale(e,n,r),this.applyMatrix4(ni),this}lookAt(e){return $f.lookAt(e),$f.updateMatrix(),this.applyMatrix4($f.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qs).negate(),this.translate(Qs.x,Qs.y,Qs.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const r=[];for(let a=0,l=e.length;a<l;a++){const u=e[a];r.push(u.x,u.y,u.z||0)}this.setAttribute("position",new nn(r,3))}else{const r=Math.min(e.length,n.count);for(let a=0;a<r;a++){const l=e[a];n.setXYZ(a,l.x,l.y,l.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new po);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let r=0,a=n.length;r<a;r++){const l=n[r];$n.setFromBufferAttribute(l),this.morphTargetsRelative?(fn.addVectors(this.boundingBox.min,$n.min),this.boundingBox.expandByPoint(fn),fn.addVectors(this.boundingBox.max,$n.max),this.boundingBox.expandByPoint(fn)):(this.boundingBox.expandByPoint($n.min),this.boundingBox.expandByPoint($n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new da);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const r=this.boundingSphere.center;if($n.setFromBufferAttribute(e),n)for(let l=0,u=n.length;l<u;l++){const f=n[l];Qo.setFromBufferAttribute(f),this.morphTargetsRelative?(fn.addVectors($n.min,Qo.min),$n.expandByPoint(fn),fn.addVectors($n.max,Qo.max),$n.expandByPoint(fn)):($n.expandByPoint(Qo.min),$n.expandByPoint(Qo.max))}$n.getCenter(r);let a=0;for(let l=0,u=e.count;l<u;l++)fn.fromBufferAttribute(e,l),a=Math.max(a,r.distanceToSquared(fn));if(n)for(let l=0,u=n.length;l<u;l++){const f=n[l],h=this.morphTargetsRelative;for(let p=0,v=f.count;p<v;p++)fn.fromBufferAttribute(f,p),h&&(Qs.fromBufferAttribute(e,p),fn.add(Qs)),a=Math.max(a,r.distanceToSquared(fn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=n.position,a=n.normal,l=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new oi(new Float32Array(4*r.count),4));const u=this.getAttribute("tangent"),f=[],h=[];for(let G=0;G<r.count;G++)f[G]=new K,h[G]=new K;const p=new K,v=new K,x=new K,y=new Rt,S=new Rt,M=new Rt,T=new K,_=new K;function g(G,P,R){p.fromBufferAttribute(r,G),v.fromBufferAttribute(r,P),x.fromBufferAttribute(r,R),y.fromBufferAttribute(l,G),S.fromBufferAttribute(l,P),M.fromBufferAttribute(l,R),v.sub(p),x.sub(p),S.sub(y),M.sub(y);const H=1/(S.x*M.y-M.x*S.y);isFinite(H)&&(T.copy(v).multiplyScalar(M.y).addScaledVector(x,-S.y).multiplyScalar(H),_.copy(x).multiplyScalar(S.x).addScaledVector(v,-M.x).multiplyScalar(H),f[G].add(T),f[P].add(T),f[R].add(T),h[G].add(_),h[P].add(_),h[R].add(_))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let G=0,P=I.length;G<P;++G){const R=I[G],H=R.start,ie=R.count;for(let Y=H,de=H+ie;Y<de;Y+=3)g(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const D=new K,C=new K,z=new K,k=new K;function O(G){z.fromBufferAttribute(a,G),k.copy(z);const P=f[G];D.copy(P),D.sub(z.multiplyScalar(z.dot(P))).normalize(),C.crossVectors(k,P);const H=C.dot(h[G])<0?-1:1;u.setXYZW(G,D.x,D.y,D.z,H)}for(let G=0,P=I.length;G<P;++G){const R=I[G],H=R.start,ie=R.count;for(let Y=H,de=H+ie;Y<de;Y+=3)O(e.getX(Y+0)),O(e.getX(Y+1)),O(e.getX(Y+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new oi(new Float32Array(n.count*3),3),this.setAttribute("normal",r);else for(let y=0,S=r.count;y<S;y++)r.setXYZ(y,0,0,0);const a=new K,l=new K,u=new K,f=new K,h=new K,p=new K,v=new K,x=new K;if(e)for(let y=0,S=e.count;y<S;y+=3){const M=e.getX(y+0),T=e.getX(y+1),_=e.getX(y+2);a.fromBufferAttribute(n,M),l.fromBufferAttribute(n,T),u.fromBufferAttribute(n,_),v.subVectors(u,l),x.subVectors(a,l),v.cross(x),f.fromBufferAttribute(r,M),h.fromBufferAttribute(r,T),p.fromBufferAttribute(r,_),f.add(v),h.add(v),p.add(v),r.setXYZ(M,f.x,f.y,f.z),r.setXYZ(T,h.x,h.y,h.z),r.setXYZ(_,p.x,p.y,p.z)}else for(let y=0,S=n.count;y<S;y+=3)a.fromBufferAttribute(n,y+0),l.fromBufferAttribute(n,y+1),u.fromBufferAttribute(n,y+2),v.subVectors(u,l),x.subVectors(a,l),v.cross(x),r.setXYZ(y+0,v.x,v.y,v.z),r.setXYZ(y+1,v.x,v.y,v.z),r.setXYZ(y+2,v.x,v.y,v.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,r=e.count;n<r;n++)fn.fromBufferAttribute(e,n),fn.normalize(),e.setXYZ(n,fn.x,fn.y,fn.z)}toNonIndexed(){function e(f,h){const p=f.array,v=f.itemSize,x=f.normalized,y=new p.constructor(h.length*v);let S=0,M=0;for(let T=0,_=h.length;T<_;T++){f.isInterleavedBufferAttribute?S=h[T]*f.data.stride+f.offset:S=h[T]*v;for(let g=0;g<v;g++)y[M++]=p[S++]}return new oi(y,v,x)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Nn,r=this.index.array,a=this.attributes;for(const f in a){const h=a[f],p=e(h,r);n.setAttribute(f,p)}const l=this.morphAttributes;for(const f in l){const h=[],p=l[f];for(let v=0,x=p.length;v<x;v++){const y=p[v],S=e(y,r);h.push(S)}n.morphAttributes[f]=h}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let f=0,h=u.length;f<h;f++){const p=u[f];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const p in h)h[p]!==void 0&&(e[p]=h[p]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const r=this.attributes;for(const h in r){const p=r[h];e.data.attributes[h]=p.toJSON(e.data)}const a={};let l=!1;for(const h in this.morphAttributes){const p=this.morphAttributes[h],v=[];for(let x=0,y=p.length;x<y;x++){const S=p[x];v.push(S.toJSON(e.data))}v.length>0&&(a[h]=v,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const f=this.boundingSphere;return f!==null&&(e.data.boundingSphere={center:f.center.toArray(),radius:f.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(n));const a=e.attributes;for(const p in a){const v=a[p];this.setAttribute(p,v.clone(n))}const l=e.morphAttributes;for(const p in l){const v=[],x=l[p];for(let y=0,S=x.length;y<S;y++)v.push(x[y].clone(n));this.morphAttributes[p]=v}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let p=0,v=u.length;p<v;p++){const x=u[p];this.addGroup(x.start,x.count,x.materialIndex)}const f=e.boundingBox;f!==null&&(this.boundingBox=f.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vm=new zt,ts=new Vd,Ll=new da,Gm=new K,Dl=new K,Nl=new K,Il=new K,Kf=new K,Ul=new K,Wm=new K,Fl=new K;class lt extends hn{constructor(e=new Nn,n=new _s){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const f=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}getVertexPosition(e,n){const r=this.geometry,a=r.attributes.position,l=r.morphAttributes.position,u=r.morphTargetsRelative;n.fromBufferAttribute(a,e);const f=this.morphTargetInfluences;if(l&&f){Ul.set(0,0,0);for(let h=0,p=l.length;h<p;h++){const v=f[h],x=l[h];v!==0&&(Kf.fromBufferAttribute(x,e),u?Ul.addScaledVector(Kf,v):Ul.addScaledVector(Kf.sub(n),v))}n.add(Ul)}return n}raycast(e,n){const r=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Ll.copy(r.boundingSphere),Ll.applyMatrix4(l),ts.copy(e.ray).recast(e.near),!(Ll.containsPoint(ts.origin)===!1&&(ts.intersectSphere(Ll,Gm)===null||ts.origin.distanceToSquared(Gm)>(e.far-e.near)**2))&&(Vm.copy(l).invert(),ts.copy(e.ray).applyMatrix4(Vm),!(r.boundingBox!==null&&ts.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,n,ts)))}_computeIntersections(e,n,r){let a;const l=this.geometry,u=this.material,f=l.index,h=l.attributes.position,p=l.attributes.uv,v=l.attributes.uv1,x=l.attributes.normal,y=l.groups,S=l.drawRange;if(f!==null)if(Array.isArray(u))for(let M=0,T=y.length;M<T;M++){const _=y[M],g=u[_.materialIndex],I=Math.max(_.start,S.start),D=Math.min(f.count,Math.min(_.start+_.count,S.start+S.count));for(let C=I,z=D;C<z;C+=3){const k=f.getX(C),O=f.getX(C+1),G=f.getX(C+2);a=Ol(this,g,e,r,p,v,x,k,O,G),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const M=Math.max(0,S.start),T=Math.min(f.count,S.start+S.count);for(let _=M,g=T;_<g;_+=3){const I=f.getX(_),D=f.getX(_+1),C=f.getX(_+2);a=Ol(this,u,e,r,p,v,x,I,D,C),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}else if(h!==void 0)if(Array.isArray(u))for(let M=0,T=y.length;M<T;M++){const _=y[M],g=u[_.materialIndex],I=Math.max(_.start,S.start),D=Math.min(h.count,Math.min(_.start+_.count,S.start+S.count));for(let C=I,z=D;C<z;C+=3){const k=C,O=C+1,G=C+2;a=Ol(this,g,e,r,p,v,x,k,O,G),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const M=Math.max(0,S.start),T=Math.min(h.count,S.start+S.count);for(let _=M,g=T;_<g;_+=3){const I=_,D=_+1,C=_+2;a=Ol(this,u,e,r,p,v,x,I,D,C),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}}}function ex(s,e,n,r,a,l,u,f){let h;if(e.side===Dn?h=r.intersectTriangle(u,l,a,!0,f):h=r.intersectTriangle(a,l,u,e.side===Ji,f),h===null)return null;Fl.copy(f),Fl.applyMatrix4(s.matrixWorld);const p=n.ray.origin.distanceTo(Fl);return p<n.near||p>n.far?null:{distance:p,point:Fl.clone(),object:s}}function Ol(s,e,n,r,a,l,u,f,h,p){s.getVertexPosition(f,Dl),s.getVertexPosition(h,Nl),s.getVertexPosition(p,Il);const v=ex(s,e,n,r,Dl,Nl,Il,Wm);if(v){const x=new K;ii.getBarycoord(Wm,Dl,Nl,Il,x),a&&(v.uv=ii.getInterpolatedAttribute(a,f,h,p,x,new Rt)),l&&(v.uv1=ii.getInterpolatedAttribute(l,f,h,p,x,new Rt)),u&&(v.normal=ii.getInterpolatedAttribute(u,f,h,p,x,new K),v.normal.dot(r.direction)>0&&v.normal.multiplyScalar(-1));const y={a:f,b:h,c:p,normal:new K,materialIndex:0};ii.getNormal(Dl,Nl,Il,y.normal),v.face=y,v.barycoord=x}return v}class Wt extends Nn{constructor(e=1,n=1,r=1,a=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:r,widthSegments:a,heightSegments:l,depthSegments:u};const f=this;a=Math.floor(a),l=Math.floor(l),u=Math.floor(u);const h=[],p=[],v=[],x=[];let y=0,S=0;M("z","y","x",-1,-1,r,n,e,u,l,0),M("z","y","x",1,-1,r,n,-e,u,l,1),M("x","z","y",1,1,e,r,n,a,u,2),M("x","z","y",1,-1,e,r,-n,a,u,3),M("x","y","z",1,-1,e,n,r,a,l,4),M("x","y","z",-1,-1,e,n,-r,a,l,5),this.setIndex(h),this.setAttribute("position",new nn(p,3)),this.setAttribute("normal",new nn(v,3)),this.setAttribute("uv",new nn(x,2));function M(T,_,g,I,D,C,z,k,O,G,P){const R=C/O,H=z/G,ie=C/2,Y=z/2,de=k/2,me=O+1,Q=G+1;let re=0,B=0;const he=new K;for(let L=0;L<Q;L++){const E=L*H-Y;for(let W=0;W<me;W++){const ve=W*R-ie;he[T]=ve*I,he[_]=E*D,he[g]=de,p.push(he.x,he.y,he.z),he[T]=0,he[_]=0,he[g]=k>0?1:-1,v.push(he.x,he.y,he.z),x.push(W/O),x.push(1-L/G),re+=1}}for(let L=0;L<G;L++)for(let E=0;E<O;E++){const W=y+E+me*L,ve=y+E+me*(L+1),X=y+(E+1)+me*(L+1),ne=y+(E+1)+me*L;h.push(W,ve,ne),h.push(ve,X,ne),B+=6}f.addGroup(S,B,P),S+=B,y+=re}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function uo(s){const e={};for(const n in s){e[n]={};for(const r in s[n]){const a=s[n][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][r]=null):e[n][r]=a.clone():Array.isArray(a)?e[n][r]=a.slice():e[n][r]=a}}return e}function Ln(s){const e={};for(let n=0;n<s.length;n++){const r=uo(s[n]);for(const a in r)e[a]=r[a]}return e}function tx(s){const e=[];for(let n=0;n<s.length;n++)e.push(s[n].clone());return e}function y0(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Dt.workingColorSpace}const S0={clone:uo,merge:Ln};var nx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ix=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class er extends vs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nx,this.fragmentShader=ix,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=uo(e.uniforms),this.uniformsGroups=tx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const u=this.uniforms[a].value;u&&u.isTexture?n.uniforms[a]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?n.uniforms[a]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[a]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[a]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[a]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[a]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[a]={type:"m4",value:u.toArray()}:n.uniforms[a]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(n.extensions=r),n}}let jd=class extends hn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new zt,this.projectionMatrix=new zt,this.projectionMatrixInverse=new zt,this.coordinateSystem=Pi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};const br=new K,Xm=new Rt,jm=new Rt;class vn extends jd{constructor(e=50,n=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=_d*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _d*2*Math.atan(Math.tan(Pf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,r){br.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(br.x,br.y).multiplyScalar(-e/br.z),br.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(br.x,br.y).multiplyScalar(-e/br.z)}getViewSize(e,n){return this.getViewBounds(e,Xm,jm),n.subVectors(jm,Xm)}setViewOffset(e,n,r,a,l,u){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Pf*.5*this.fov)/this.zoom,r=2*n,a=this.aspect*r,l=-.5*a;const u=this.view;if(this.view!==null&&this.view.enabled){const h=u.fullWidth,p=u.fullHeight;l+=u.offsetX*a/h,n-=u.offsetY*r/p,a*=u.width/h,r*=u.height/p}const f=this.filmOffset;f!==0&&(l+=e*f/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,n,n-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Js=-90,eo=1;class M0 extends hn{constructor(e,n,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new vn(Js,eo,e,n);a.layers=this.layers,this.add(a);const l=new vn(Js,eo,e,n);l.layers=this.layers,this.add(l);const u=new vn(Js,eo,e,n);u.layers=this.layers,this.add(u);const f=new vn(Js,eo,e,n);f.layers=this.layers,this.add(f);const h=new vn(Js,eo,e,n);h.layers=this.layers,this.add(h);const p=new vn(Js,eo,e,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[r,a,l,u,f,h]=n;for(const p of n)this.remove(p);if(e===Pi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),f.up.set(0,1,0),f.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===ca)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),f.up.set(0,-1,0),f.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of n)this.add(p),p.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,f,h,p,v]=this.children,x=e.getRenderTarget(),y=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const T=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(n,l),e.setRenderTarget(r,1,a),e.render(n,u),e.setRenderTarget(r,2,a),e.render(n,f),e.setRenderTarget(r,3,a),e.render(n,h),e.setRenderTarget(r,4,a),e.render(n,p),r.texture.generateMipmaps=T,e.setRenderTarget(r,5,a),e.render(n,v),e.setRenderTarget(x,y,S),e.xr.enabled=M,r.texture.needsPMREMUpdate=!0}}class qd extends An{constructor(e,n,r,a,l,u,f,h,p,v){e=e!==void 0?e:[],n=n!==void 0?n:fs,super(e,n,r,a,l,u,f,h,p,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class E0 extends kr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new qd(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:vi}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Wt(5,5,5),l=new er({name:"CubemapFromEquirect",uniforms:uo(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Dn,blending:Ki});l.uniforms.tEquirect.value=n;const u=new lt(a,l),f=n.minFilter;return n.minFilter===Ur&&(n.minFilter=vi),new M0(1,10,this).update(e,u),n.minFilter=f,u.geometry.dispose(),u.material.dispose(),this}clear(e,n,r,a){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(n,r,a);e.setRenderTarget(l)}}class dn extends hn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rx={type:"move"};class jl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const r of e.hand.values())this._getHandJoint(n,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,r){let a=null,l=null,u=null;const f=this._targetRay,h=this._grip,p=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(p&&e.hand){u=!0;for(const T of e.hand.values()){const _=n.getJointPose(T,r),g=this._getHandJoint(p,T);_!==null&&(g.matrix.fromArray(_.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=_.radius),g.visible=_!==null}const v=p.joints["index-finger-tip"],x=p.joints["thumb-tip"],y=v.position.distanceTo(x.position),S=.02,M=.005;p.inputState.pinching&&y>S+M?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&y<=S-M&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=n.getPose(e.gripSpace,r),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));f!==null&&(a=n.getPose(e.targetRaySpace,r),a===null&&l!==null&&(a=l),a!==null&&(f.matrix.fromArray(a.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,a.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(a.linearVelocity)):f.hasLinearVelocity=!1,a.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(a.angularVelocity)):f.hasAngularVelocity=!1,this.dispatchEvent(rx)))}return f!==null&&(f.visible=a!==null),h!==null&&(h.visible=l!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const r=new dn;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[n.jointName]=r,e.add(r)}return e.joints[n.jointName]}}class Hc{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new _t(e),this.density=n}clone(){return new Hc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class w0 extends hn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Zf=new K,sx=new K,ox=new mt;class Pr{constructor(e=new K(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,r,a){return this.normal.set(e,n,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,r){const a=Zf.subVectors(r,n).cross(sx.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const r=e.delta(Zf),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/a;return l<0||l>1?null:n.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const n=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return n<0&&r>0||r<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const r=n||ox.getNormalMatrix(e),a=this.coplanarPoint(Zf).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ns=new da,kl=new K;class Vc{constructor(e=new Pr,n=new Pr,r=new Pr,a=new Pr,l=new Pr,u=new Pr){this.planes=[e,n,r,a,l,u]}set(e,n,r,a,l,u){const f=this.planes;return f[0].copy(e),f[1].copy(n),f[2].copy(r),f[3].copy(a),f[4].copy(l),f[5].copy(u),this}copy(e){const n=this.planes;for(let r=0;r<6;r++)n[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,n=Pi){const r=this.planes,a=e.elements,l=a[0],u=a[1],f=a[2],h=a[3],p=a[4],v=a[5],x=a[6],y=a[7],S=a[8],M=a[9],T=a[10],_=a[11],g=a[12],I=a[13],D=a[14],C=a[15];if(r[0].setComponents(h-l,y-p,_-S,C-g).normalize(),r[1].setComponents(h+l,y+p,_+S,C+g).normalize(),r[2].setComponents(h+u,y+v,_+M,C+I).normalize(),r[3].setComponents(h-u,y-v,_-M,C-I).normalize(),r[4].setComponents(h-f,y-x,_-T,C-D).normalize(),n===Pi)r[5].setComponents(h+f,y+x,_+T,C+D).normalize();else if(n===ca)r[5].setComponents(f,x,T,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ns.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ns)}intersectsSprite(e){return ns.center.set(0,0,0),ns.radius=.7071067811865476,ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(ns)}intersectsSphere(e){const n=this.planes,r=e.center,a=-e.radius;for(let l=0;l<6;l++)if(n[l].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let r=0;r<6;r++){const a=n[r];if(kl.x=a.normal.x>0?e.max.x:e.min.x,kl.y=a.normal.y>0?e.max.y:e.min.y,kl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(kl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let r=0;r<6;r++)if(n[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yd extends vs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const qm=new zt,xd=new Vd,zl=new da,Bl=new K;class T0 extends hn{constructor(e=new Nn,n=new Yd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const r=this.geometry,a=this.matrixWorld,l=e.params.Points.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),zl.copy(r.boundingSphere),zl.applyMatrix4(a),zl.radius+=l,e.ray.intersectsSphere(zl)===!1)return;qm.copy(a).invert(),xd.copy(e.ray).applyMatrix4(qm);const f=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=f*f,p=r.index,x=r.attributes.position;if(p!==null){const y=Math.max(0,u.start),S=Math.min(p.count,u.start+u.count);for(let M=y,T=S;M<T;M++){const _=p.getX(M);Bl.fromBufferAttribute(x,_),Ym(Bl,_,h,a,e,n,this)}}else{const y=Math.max(0,u.start),S=Math.min(x.count,u.start+u.count);for(let M=y,T=S;M<T;M++)Bl.fromBufferAttribute(x,M),Ym(Bl,M,h,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const f=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}}function Ym(s,e,n,r,a,l,u){const f=xd.distanceSqToPoint(s);if(f<n){const h=new K;xd.closestPointToPoint(s,h),h.applyMatrix4(r);const p=a.ray.origin.distanceTo(h);if(p<a.near||p>a.far)return;l.push({distance:p,distanceToRay:Math.sqrt(f),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:u})}}class A0 extends An{constructor(e,n,r,a,l,u,f,h,p){super(e,n,r,a,l,u,f,h,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $d extends An{constructor(e,n,r,a,l,u,f,h,p,v=cs){if(v!==cs&&v!==ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&v===cs&&(r=Or),r===void 0&&v===ps&&(r=hs),super(null,a,l,u,f,h,v,r,p),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=f!==void 0?f:si,this.minFilter=h!==void 0?h:si,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class R0{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,n){const r=this.getUtoTmapping(e);return this.getPoint(r,n)}getPoints(e=5){const n=[];for(let r=0;r<=e;r++)n.push(this.getPoint(r/e));return n}getSpacedPoints(e=5){const n=[];for(let r=0;r<=e;r++)n.push(this.getPointAt(r/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let r,a=this.getPoint(0),l=0;n.push(0);for(let u=1;u<=e;u++)r=this.getPoint(u/e),l+=r.distanceTo(a),n.push(l),a=r;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n){const r=this.getLengths();let a=0;const l=r.length;let u;n?u=n:u=e*r[l-1];let f=0,h=l-1,p;for(;f<=h;)if(a=Math.floor(f+(h-f)/2),p=r[a]-u,p<0)f=a+1;else if(p>0)h=a-1;else{h=a;break}if(a=h,r[a]===u)return a/(l-1);const v=r[a],y=r[a+1]-v,S=(u-v)/y;return(a+S)/(l-1)}getTangent(e,n){let a=e-1e-4,l=e+1e-4;a<0&&(a=0),l>1&&(l=1);const u=this.getPoint(a),f=this.getPoint(l),h=n||(u.isVector2?new Rt:new K);return h.copy(f).sub(u).normalize(),h}getTangentAt(e,n){const r=this.getUtoTmapping(e);return this.getTangent(r,n)}computeFrenetFrames(e,n){const r=new K,a=[],l=[],u=[],f=new K,h=new zt;for(let S=0;S<=e;S++){const M=S/e;a[S]=this.getTangentAt(M,new K)}l[0]=new K,u[0]=new K;let p=Number.MAX_VALUE;const v=Math.abs(a[0].x),x=Math.abs(a[0].y),y=Math.abs(a[0].z);v<=p&&(p=v,r.set(1,0,0)),x<=p&&(p=x,r.set(0,1,0)),y<=p&&r.set(0,0,1),f.crossVectors(a[0],r).normalize(),l[0].crossVectors(a[0],f),u[0].crossVectors(a[0],l[0]);for(let S=1;S<=e;S++){if(l[S]=l[S-1].clone(),u[S]=u[S-1].clone(),f.crossVectors(a[S-1],a[S]),f.length()>Number.EPSILON){f.normalize();const M=Math.acos(Mt(a[S-1].dot(a[S]),-1,1));l[S].applyMatrix4(h.makeRotationAxis(f,M))}u[S].crossVectors(a[S],l[S])}if(n===!0){let S=Math.acos(Mt(l[0].dot(l[e]),-1,1));S/=e,a[0].dot(f.crossVectors(l[0],l[e]))>0&&(S=-S);for(let M=1;M<=e;M++)l[M].applyMatrix4(h.makeRotationAxis(a[M],S*M)),u[M].crossVectors(a[M],l[M])}return{tangents:a,normals:l,binormals:u}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function Kd(){let s=0,e=0,n=0,r=0;function a(l,u,f,h){s=l,e=f,n=-3*l+3*u-2*f-h,r=2*l-2*u+f+h}return{initCatmullRom:function(l,u,f,h,p){a(u,f,p*(f-l),p*(h-u))},initNonuniformCatmullRom:function(l,u,f,h,p,v,x){let y=(u-l)/p-(f-l)/(p+v)+(f-u)/v,S=(f-u)/v-(h-u)/(v+x)+(h-f)/x;y*=v,S*=v,a(u,f,y,S)},calc:function(l){const u=l*l,f=u*l;return s+e*l+n*u+r*f}}}const Hl=new K,Qf=new Kd,Jf=new Kd,ed=new Kd;class C0 extends R0{constructor(e=[],n=!1,r="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=r,this.tension=a}getPoint(e,n=new K){const r=n,a=this.points,l=a.length,u=(l-(this.closed?0:1))*e;let f=Math.floor(u),h=u-f;this.closed?f+=f>0?0:(Math.floor(Math.abs(f)/l)+1)*l:h===0&&f===l-1&&(f=l-2,h=1);let p,v;this.closed||f>0?p=a[(f-1)%l]:(Hl.subVectors(a[0],a[1]).add(a[0]),p=Hl);const x=a[f%l],y=a[(f+1)%l];if(this.closed||f+2<l?v=a[(f+2)%l]:(Hl.subVectors(a[l-1],a[l-2]).add(a[l-1]),v=Hl),this.curveType==="centripetal"||this.curveType==="chordal"){const S=this.curveType==="chordal"?.5:.25;let M=Math.pow(p.distanceToSquared(x),S),T=Math.pow(x.distanceToSquared(y),S),_=Math.pow(y.distanceToSquared(v),S);T<1e-4&&(T=1),M<1e-4&&(M=T),_<1e-4&&(_=T),Qf.initNonuniformCatmullRom(p.x,x.x,y.x,v.x,M,T,_),Jf.initNonuniformCatmullRom(p.y,x.y,y.y,v.y,M,T,_),ed.initNonuniformCatmullRom(p.z,x.z,y.z,v.z,M,T,_)}else this.curveType==="catmullrom"&&(Qf.initCatmullRom(p.x,x.x,y.x,v.x,this.tension),Jf.initCatmullRom(p.y,x.y,y.y,v.y,this.tension),ed.initCatmullRom(p.z,x.z,y.z,v.z,this.tension));return r.set(Qf.calc(h),Jf.calc(h),ed.calc(h)),r}copy(e){super.copy(e),this.points=[];for(let n=0,r=e.points.length;n<r;n++){const a=e.points[n];this.points.push(a.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,r=this.points.length;n<r;n++){const a=this.points[n];e.points.push(a.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,r=e.points.length;n<r;n++){const a=e.points[n];this.points.push(new K().fromArray(a))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}class _i extends Nn{constructor(e=1,n=1,r=1,a=32,l=1,u=!1,f=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:r,radialSegments:a,heightSegments:l,openEnded:u,thetaStart:f,thetaLength:h};const p=this;a=Math.floor(a),l=Math.floor(l);const v=[],x=[],y=[],S=[];let M=0;const T=[],_=r/2;let g=0;I(),u===!1&&(e>0&&D(!0),n>0&&D(!1)),this.setIndex(v),this.setAttribute("position",new nn(x,3)),this.setAttribute("normal",new nn(y,3)),this.setAttribute("uv",new nn(S,2));function I(){const C=new K,z=new K;let k=0;const O=(n-e)/r;for(let G=0;G<=l;G++){const P=[],R=G/l,H=R*(n-e)+e;for(let ie=0;ie<=a;ie++){const Y=ie/a,de=Y*h+f,me=Math.sin(de),Q=Math.cos(de);z.x=H*me,z.y=-R*r+_,z.z=H*Q,x.push(z.x,z.y,z.z),C.set(me,O,Q).normalize(),y.push(C.x,C.y,C.z),S.push(Y,1-R),P.push(M++)}T.push(P)}for(let G=0;G<a;G++)for(let P=0;P<l;P++){const R=T[P][G],H=T[P+1][G],ie=T[P+1][G+1],Y=T[P][G+1];(e>0||P!==0)&&(v.push(R,H,Y),k+=3),(n>0||P!==l-1)&&(v.push(H,ie,Y),k+=3)}p.addGroup(g,k,0),g+=k}function D(C){const z=M,k=new Rt,O=new K;let G=0;const P=C===!0?e:n,R=C===!0?1:-1;for(let ie=1;ie<=a;ie++)x.push(0,_*R,0),y.push(0,R,0),S.push(.5,.5),M++;const H=M;for(let ie=0;ie<=a;ie++){const de=ie/a*h+f,me=Math.cos(de),Q=Math.sin(de);O.x=P*Q,O.y=_*R,O.z=P*me,x.push(O.x,O.y,O.z),y.push(0,R,0),k.x=me*.5+.5,k.y=Q*.5*R+.5,S.push(k.x,k.y),M++}for(let ie=0;ie<a;ie++){const Y=z+ie,de=H+ie;C===!0?v.push(de,de+1,Y):v.push(de+1,de,Y),G+=3}p.addGroup(g,G,C===!0?1:2),g+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Gc extends _i{constructor(e=1,n=1,r=32,a=1,l=!1,u=0,f=Math.PI*2){super(0,e,n,r,a,l,u,f),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:r,heightSegments:a,openEnded:l,thetaStart:u,thetaLength:f}}static fromJSON(e){return new Gc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class tr extends Nn{constructor(e=1,n=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:r,heightSegments:a};const l=e/2,u=n/2,f=Math.floor(r),h=Math.floor(a),p=f+1,v=h+1,x=e/f,y=n/h,S=[],M=[],T=[],_=[];for(let g=0;g<v;g++){const I=g*y-u;for(let D=0;D<p;D++){const C=D*x-l;M.push(C,-I,0),T.push(0,0,1),_.push(D/f),_.push(1-g/h)}}for(let g=0;g<h;g++)for(let I=0;I<f;I++){const D=I+p*g,C=I+p*(g+1),z=I+1+p*(g+1),k=I+1+p*g;S.push(D,C,k),S.push(C,z,k)}this.setIndex(S),this.setAttribute("position",new nn(M,3)),this.setAttribute("normal",new nn(T,3)),this.setAttribute("uv",new nn(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tr(e.width,e.height,e.widthSegments,e.heightSegments)}}class ha extends Nn{constructor(e=1,n=32,r=16,a=0,l=Math.PI*2,u=0,f=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:r,phiStart:a,phiLength:l,thetaStart:u,thetaLength:f},n=Math.max(3,Math.floor(n)),r=Math.max(2,Math.floor(r));const h=Math.min(u+f,Math.PI);let p=0;const v=[],x=new K,y=new K,S=[],M=[],T=[],_=[];for(let g=0;g<=r;g++){const I=[],D=g/r;let C=0;g===0&&u===0?C=.5/n:g===r&&h===Math.PI&&(C=-.5/n);for(let z=0;z<=n;z++){const k=z/n;x.x=-e*Math.cos(a+k*l)*Math.sin(u+D*f),x.y=e*Math.cos(u+D*f),x.z=e*Math.sin(a+k*l)*Math.sin(u+D*f),M.push(x.x,x.y,x.z),y.copy(x).normalize(),T.push(y.x,y.y,y.z),_.push(k+C,1-D),I.push(p++)}v.push(I)}for(let g=0;g<r;g++)for(let I=0;I<n;I++){const D=v[g][I+1],C=v[g][I],z=v[g+1][I],k=v[g+1][I+1];(g!==0||u>0)&&S.push(D,C,k),(g!==r-1||h<Math.PI)&&S.push(C,z,k)}this.setIndex(S),this.setAttribute("position",new nn(M,3)),this.setAttribute("normal",new nn(T,3)),this.setAttribute("uv",new nn(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ha(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Wc extends Nn{constructor(e=1,n=.4,r=12,a=48,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:r,tubularSegments:a,arc:l},r=Math.floor(r),a=Math.floor(a);const u=[],f=[],h=[],p=[],v=new K,x=new K,y=new K;for(let S=0;S<=r;S++)for(let M=0;M<=a;M++){const T=M/a*l,_=S/r*Math.PI*2;x.x=(e+n*Math.cos(_))*Math.cos(T),x.y=(e+n*Math.cos(_))*Math.sin(T),x.z=n*Math.sin(_),f.push(x.x,x.y,x.z),v.x=e*Math.cos(T),v.y=e*Math.sin(T),y.subVectors(x,v).normalize(),h.push(y.x,y.y,y.z),p.push(M/a),p.push(S/r)}for(let S=1;S<=r;S++)for(let M=1;M<=a;M++){const T=(a+1)*S+M-1,_=(a+1)*(S-1)+M-1,g=(a+1)*(S-1)+M,I=(a+1)*S+M;u.push(T,_,I),u.push(_,g,I)}this.setIndex(u),this.setAttribute("position",new nn(f,3)),this.setAttribute("normal",new nn(h,3)),this.setAttribute("uv",new nn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Zt extends vs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new _t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=kd,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class b0 extends vs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=r0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class P0 extends vs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Xc extends hn{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new _t(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const td=new zt,$m=new K,Km=new K;class L0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Rt(512,512),this.map=null,this.mapPass=null,this.matrix=new zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vc,this._frameExtents=new Rt(1,1),this._viewportCount=1,this._viewports=[new Ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,r=this.matrix;$m.setFromMatrixPosition(e.matrixWorld),n.position.copy($m),Km.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Km),n.updateMatrixWorld(),td.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(td),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(td)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Zm=new zt,Jo=new K,nd=new K;class ax extends L0{constructor(){super(new vn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Rt(4,2),this._viewportCount=6,this._viewports=[new Ut(2,1,1,1),new Ut(0,1,1,1),new Ut(3,1,1,1),new Ut(1,1,1,1),new Ut(3,0,1,1),new Ut(1,0,1,1)],this._cubeDirections=[new K(1,0,0),new K(-1,0,0),new K(0,0,1),new K(0,0,-1),new K(0,1,0),new K(0,-1,0)],this._cubeUps=[new K(0,1,0),new K(0,1,0),new K(0,1,0),new K(0,1,0),new K(0,0,1),new K(0,0,-1)]}updateMatrices(e,n=0){const r=this.camera,a=this.matrix,l=e.distance||r.far;l!==r.far&&(r.far=l,r.updateProjectionMatrix()),Jo.setFromMatrixPosition(e.matrixWorld),r.position.copy(Jo),nd.copy(r.position),nd.add(this._cubeDirections[n]),r.up.copy(this._cubeUps[n]),r.lookAt(nd),r.updateMatrixWorld(),a.makeTranslation(-Jo.x,-Jo.y,-Jo.z),Zm.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zm)}}class D0 extends Xc{constructor(e,n,r=0,a=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=a,this.shadow=new ax}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Zd extends jd{constructor(e=-1,n=1,r=1,a=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=r,this.bottom=a,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,r,a,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=r-e,u=r+e,f=a+n,h=a-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=p*this.view.offsetX,u=l+p*this.view.width,f-=v*this.view.offsetY,h=f-v*this.view.height}this.projectionMatrix.makeOrthographic(l,u,f,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class lx extends L0{constructor(){super(new Zd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class N0 extends Xc{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(hn.DEFAULT_UP),this.updateMatrix(),this.target=new hn,this.shadow=new lx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class I0 extends Xc{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class U0 extends vn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}function Qm(s,e,n,r){const a=cx(r);switch(n){case Ld:return s*e;case Nd:return s*e;case Id:return s*e*2;case Ud:return s*e/a.components*a.byteLength;case kc:return s*e/a.components*a.byteLength;case Fd:return s*e*2/a.components*a.byteLength;case zc:return s*e*2/a.components*a.byteLength;case Dd:return s*e*3/a.components*a.byteLength;case ri:return s*e*4/a.components*a.byteLength;case Bc:return s*e*4/a.components*a.byteLength;case ia:case ra:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case sa:case oa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ac:case cc:return Math.max(s,16)*Math.max(e,8)/4;case oc:case lc:return Math.max(s,8)*Math.max(e,8)/2;case uc:case fc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case dc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case hc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case pc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case mc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case gc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case vc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case _c:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case xc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case yc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Sc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Mc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Ec:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case wc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Tc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Ac:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case aa:case Rc:case Cc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Od:case bc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Pc:case Lc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function cx(s){switch(s){case Li:case Cd:return{byteLength:1,components:1};case co:case bd:case fo:return{byteLength:2,components:1};case Fc:case Oc:return{byteLength:2,components:4};case Or:case Uc:case bi:return{byteLength:4,components:1};case Pd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ic}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ic);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function F0(){let s=null,e=!1,n=null,r=null;function a(l,u){n(l,u),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){n=l},setContext:function(l){s=l}}}function ux(s){const e=new WeakMap;function n(f,h){const p=f.array,v=f.usage,x=p.byteLength,y=s.createBuffer();s.bindBuffer(h,y),s.bufferData(h,p,v),f.onUploadCallback();let S;if(p instanceof Float32Array)S=s.FLOAT;else if(p instanceof Uint16Array)f.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=s.SHORT;else if(p instanceof Uint32Array)S=s.UNSIGNED_INT;else if(p instanceof Int32Array)S=s.INT;else if(p instanceof Int8Array)S=s.BYTE;else if(p instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:y,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:f.version,size:x}}function r(f,h,p){const v=h.array,x=h.updateRanges;if(s.bindBuffer(p,f),x.length===0)s.bufferSubData(p,0,v);else{x.sort((S,M)=>S.start-M.start);let y=0;for(let S=1;S<x.length;S++){const M=x[y],T=x[S];T.start<=M.start+M.count+1?M.count=Math.max(M.count,T.start+T.count-M.start):(++y,x[y]=T)}x.length=y+1;for(let S=0,M=x.length;S<M;S++){const T=x[S];s.bufferSubData(p,T.start*v.BYTES_PER_ELEMENT,v,T.start,T.count)}h.clearUpdateRanges()}h.onUploadCallback()}function a(f){return f.isInterleavedBufferAttribute&&(f=f.data),e.get(f)}function l(f){f.isInterleavedBufferAttribute&&(f=f.data);const h=e.get(f);h&&(s.deleteBuffer(h.buffer),e.delete(f))}function u(f,h){if(f.isInterleavedBufferAttribute&&(f=f.data),f.isGLBufferAttribute){const v=e.get(f);(!v||v.version<f.version)&&e.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}const p=e.get(f);if(p===void 0)e.set(f,n(f,h));else if(p.version<f.version){if(p.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,f,h),p.version=f.version}}return{get:a,remove:l,update:u}}var fx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dx=`#ifdef USE_ALPHAHASH
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
#endif`,hx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,px=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vx=`#ifdef USE_AOMAP
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
#endif`,_x=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xx=`#ifdef USE_BATCHING
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
#endif`,yx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ex=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,wx=`#ifdef USE_IRIDESCENCE
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
#endif`,Tx=`#ifdef USE_BUMPMAP
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
#endif`,Ax=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Rx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Px=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Lx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ix=`#define PI 3.141592653589793
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
} // validated`,Ux=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Fx=`vec3 transformedNormal = objectNormal;
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
#endif`,Ox=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gx=`#ifdef USE_ENVMAP
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
#endif`,Wx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xx=`#ifdef USE_ENVMAP
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
#endif`,jx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qx=`#ifdef USE_ENVMAP
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
#endif`,Yx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$x=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qx=`#ifdef USE_GRADIENTMAP
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
}`,Jx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ey=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ty=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ny=`uniform bool receiveShadow;
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
#endif`,iy=`#ifdef USE_ENVMAP
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
#endif`,ry=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,oy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ay=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ly=`PhysicalMaterial material;
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
#endif`,cy=`struct PhysicalMaterial {
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
}`,uy=`
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
#endif`,fy=`#if defined( RE_IndirectDiffuse )
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
#endif`,dy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,py=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,my=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gy=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_y=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yy=`#if defined( USE_POINTS_UV )
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
#endif`,Sy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,My=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ey=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ty=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ay=`#ifdef USE_MORPHTARGETS
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
#endif`,Ry=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,by=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Py=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ly=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ny=`#ifdef USE_NORMALMAP
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
#endif`,Iy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Uy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Oy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ky=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,By=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$y=`float getShadowMask() {
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
}`,Ky=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zy=`#ifdef USE_SKINNING
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
#endif`,Qy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jy=`#ifdef USE_SKINNING
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
#endif`,eS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,iS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rS=`#ifdef USE_TRANSMISSION
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
#endif`,sS=`#ifdef USE_TRANSMISSION
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
#endif`,oS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,aS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const uS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fS=`uniform sampler2D t2D;
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
}`,dS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,pS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gS=`#include <common>
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
}`,vS=`#if DEPTH_PACKING == 3200
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
}`,_S=`#define DISTANCE
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
}`,xS=`#define DISTANCE
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
}`,yS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,SS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MS=`uniform float scale;
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
}`,ES=`uniform vec3 diffuse;
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
}`,wS=`#include <common>
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
}`,TS=`uniform vec3 diffuse;
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
}`,AS=`#define LAMBERT
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
}`,RS=`#define LAMBERT
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
}`,CS=`#define MATCAP
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
}`,bS=`#define MATCAP
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
}`,PS=`#define NORMAL
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
}`,LS=`#define NORMAL
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
}`,DS=`#define PHONG
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
}`,NS=`#define PHONG
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
}`,IS=`#define STANDARD
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
}`,US=`#define STANDARD
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
}`,FS=`#define TOON
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
}`,OS=`#define TOON
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
}`,kS=`uniform float size;
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
}`,zS=`uniform vec3 diffuse;
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
}`,BS=`#include <common>
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
}`,HS=`uniform vec3 color;
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
}`,VS=`uniform float rotation;
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
}`,GS=`uniform vec3 diffuse;
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
}`,vt={alphahash_fragment:fx,alphahash_pars_fragment:dx,alphamap_fragment:hx,alphamap_pars_fragment:px,alphatest_fragment:mx,alphatest_pars_fragment:gx,aomap_fragment:vx,aomap_pars_fragment:_x,batching_pars_vertex:xx,batching_vertex:yx,begin_vertex:Sx,beginnormal_vertex:Mx,bsdfs:Ex,iridescence_fragment:wx,bumpmap_pars_fragment:Tx,clipping_planes_fragment:Ax,clipping_planes_pars_fragment:Rx,clipping_planes_pars_vertex:Cx,clipping_planes_vertex:bx,color_fragment:Px,color_pars_fragment:Lx,color_pars_vertex:Dx,color_vertex:Nx,common:Ix,cube_uv_reflection_fragment:Ux,defaultnormal_vertex:Fx,displacementmap_pars_vertex:Ox,displacementmap_vertex:kx,emissivemap_fragment:zx,emissivemap_pars_fragment:Bx,colorspace_fragment:Hx,colorspace_pars_fragment:Vx,envmap_fragment:Gx,envmap_common_pars_fragment:Wx,envmap_pars_fragment:Xx,envmap_pars_vertex:jx,envmap_physical_pars_fragment:iy,envmap_vertex:qx,fog_vertex:Yx,fog_pars_vertex:$x,fog_fragment:Kx,fog_pars_fragment:Zx,gradientmap_pars_fragment:Qx,lightmap_pars_fragment:Jx,lights_lambert_fragment:ey,lights_lambert_pars_fragment:ty,lights_pars_begin:ny,lights_toon_fragment:ry,lights_toon_pars_fragment:sy,lights_phong_fragment:oy,lights_phong_pars_fragment:ay,lights_physical_fragment:ly,lights_physical_pars_fragment:cy,lights_fragment_begin:uy,lights_fragment_maps:fy,lights_fragment_end:dy,logdepthbuf_fragment:hy,logdepthbuf_pars_fragment:py,logdepthbuf_pars_vertex:my,logdepthbuf_vertex:gy,map_fragment:vy,map_pars_fragment:_y,map_particle_fragment:xy,map_particle_pars_fragment:yy,metalnessmap_fragment:Sy,metalnessmap_pars_fragment:My,morphinstance_vertex:Ey,morphcolor_vertex:wy,morphnormal_vertex:Ty,morphtarget_pars_vertex:Ay,morphtarget_vertex:Ry,normal_fragment_begin:Cy,normal_fragment_maps:by,normal_pars_fragment:Py,normal_pars_vertex:Ly,normal_vertex:Dy,normalmap_pars_fragment:Ny,clearcoat_normal_fragment_begin:Iy,clearcoat_normal_fragment_maps:Uy,clearcoat_pars_fragment:Fy,iridescence_pars_fragment:Oy,opaque_fragment:ky,packing:zy,premultiplied_alpha_fragment:By,project_vertex:Hy,dithering_fragment:Vy,dithering_pars_fragment:Gy,roughnessmap_fragment:Wy,roughnessmap_pars_fragment:Xy,shadowmap_pars_fragment:jy,shadowmap_pars_vertex:qy,shadowmap_vertex:Yy,shadowmask_pars_fragment:$y,skinbase_vertex:Ky,skinning_pars_vertex:Zy,skinning_vertex:Qy,skinnormal_vertex:Jy,specularmap_fragment:eS,specularmap_pars_fragment:tS,tonemapping_fragment:nS,tonemapping_pars_fragment:iS,transmission_fragment:rS,transmission_pars_fragment:sS,uv_pars_fragment:oS,uv_pars_vertex:aS,uv_vertex:lS,worldpos_vertex:cS,background_vert:uS,background_frag:fS,backgroundCube_vert:dS,backgroundCube_frag:hS,cube_vert:pS,cube_frag:mS,depth_vert:gS,depth_frag:vS,distanceRGBA_vert:_S,distanceRGBA_frag:xS,equirect_vert:yS,equirect_frag:SS,linedashed_vert:MS,linedashed_frag:ES,meshbasic_vert:wS,meshbasic_frag:TS,meshlambert_vert:AS,meshlambert_frag:RS,meshmatcap_vert:CS,meshmatcap_frag:bS,meshnormal_vert:PS,meshnormal_frag:LS,meshphong_vert:DS,meshphong_frag:NS,meshphysical_vert:IS,meshphysical_frag:US,meshtoon_vert:FS,meshtoon_frag:OS,points_vert:kS,points_frag:zS,shadow_vert:BS,shadow_frag:HS,sprite_vert:VS,sprite_frag:GS},Ie={common:{diffuse:{value:new _t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new mt}},envmap:{envMap:{value:null},envMapRotation:{value:new mt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new mt},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0},uvTransform:{value:new mt}},sprite:{diffuse:{value:new _t(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}}},gi={basic:{uniforms:Ln([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:vt.meshbasic_vert,fragmentShader:vt.meshbasic_frag},lambert:{uniforms:Ln([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new _t(0)}}]),vertexShader:vt.meshlambert_vert,fragmentShader:vt.meshlambert_frag},phong:{uniforms:Ln([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new _t(0)},specular:{value:new _t(1118481)},shininess:{value:30}}]),vertexShader:vt.meshphong_vert,fragmentShader:vt.meshphong_frag},standard:{uniforms:Ln([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new _t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:vt.meshphysical_vert,fragmentShader:vt.meshphysical_frag},toon:{uniforms:Ln([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new _t(0)}}]),vertexShader:vt.meshtoon_vert,fragmentShader:vt.meshtoon_frag},matcap:{uniforms:Ln([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:vt.meshmatcap_vert,fragmentShader:vt.meshmatcap_frag},points:{uniforms:Ln([Ie.points,Ie.fog]),vertexShader:vt.points_vert,fragmentShader:vt.points_frag},dashed:{uniforms:Ln([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:vt.linedashed_vert,fragmentShader:vt.linedashed_frag},depth:{uniforms:Ln([Ie.common,Ie.displacementmap]),vertexShader:vt.depth_vert,fragmentShader:vt.depth_frag},normal:{uniforms:Ln([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:vt.meshnormal_vert,fragmentShader:vt.meshnormal_frag},sprite:{uniforms:Ln([Ie.sprite,Ie.fog]),vertexShader:vt.sprite_vert,fragmentShader:vt.sprite_frag},background:{uniforms:{uvTransform:{value:new mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:vt.background_vert,fragmentShader:vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new mt}},vertexShader:vt.backgroundCube_vert,fragmentShader:vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:vt.cube_vert,fragmentShader:vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:vt.equirect_vert,fragmentShader:vt.equirect_frag},distanceRGBA:{uniforms:Ln([Ie.common,Ie.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:vt.distanceRGBA_vert,fragmentShader:vt.distanceRGBA_frag},shadow:{uniforms:Ln([Ie.lights,Ie.fog,{color:{value:new _t(0)},opacity:{value:1}}]),vertexShader:vt.shadow_vert,fragmentShader:vt.shadow_frag}};gi.physical={uniforms:Ln([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new mt},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new mt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new mt},sheen:{value:0},sheenColor:{value:new _t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new mt},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new mt},attenuationDistance:{value:0},attenuationColor:{value:new _t(0)},specularColor:{value:new _t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new mt},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new mt}}]),vertexShader:vt.meshphysical_vert,fragmentShader:vt.meshphysical_frag};const Vl={r:0,b:0,g:0},is=new yi,WS=new zt;function XS(s,e,n,r,a,l,u){const f=new _t(0);let h=l===!0?0:1,p,v,x=null,y=0,S=null;function M(D){let C=D.isScene===!0?D.background:null;return C&&C.isTexture&&(C=(D.backgroundBlurriness>0?n:e).get(C)),C}function T(D){let C=!1;const z=M(D);z===null?g(f,h):z&&z.isColor&&(g(z,1),C=!0);const k=s.xr.getEnvironmentBlendMode();k==="additive"?r.buffers.color.setClear(0,0,0,1,u):k==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,u),(s.autoClear||C)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(D,C){const z=M(C);z&&(z.isCubeTexture||z.mapping===ua)?(v===void 0&&(v=new lt(new Wt(1,1,1),new er({name:"BackgroundCubeMaterial",uniforms:uo(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(k,O,G){this.matrixWorld.copyPosition(G.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(v)),is.copy(C.backgroundRotation),is.x*=-1,is.y*=-1,is.z*=-1,z.isCubeTexture&&z.isRenderTargetTexture===!1&&(is.y*=-1,is.z*=-1),v.material.uniforms.envMap.value=z,v.material.uniforms.flipEnvMap.value=z.isCubeTexture&&z.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(WS.makeRotationFromEuler(is)),v.material.toneMapped=Dt.getTransfer(z.colorSpace)!==It,(x!==z||y!==z.version||S!==s.toneMapping)&&(v.material.needsUpdate=!0,x=z,y=z.version,S=s.toneMapping),v.layers.enableAll(),D.unshift(v,v.geometry,v.material,0,0,null)):z&&z.isTexture&&(p===void 0&&(p=new lt(new tr(2,2),new er({name:"BackgroundMaterial",uniforms:uo(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:Ji,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(p)),p.material.uniforms.t2D.value=z,p.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,p.material.toneMapped=Dt.getTransfer(z.colorSpace)!==It,z.matrixAutoUpdate===!0&&z.updateMatrix(),p.material.uniforms.uvTransform.value.copy(z.matrix),(x!==z||y!==z.version||S!==s.toneMapping)&&(p.material.needsUpdate=!0,x=z,y=z.version,S=s.toneMapping),p.layers.enableAll(),D.unshift(p,p.geometry,p.material,0,0,null))}function g(D,C){D.getRGB(Vl,y0(s)),r.buffers.color.setClear(Vl.r,Vl.g,Vl.b,C,u)}function I(){v!==void 0&&(v.geometry.dispose(),v.material.dispose(),v=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return f},setClearColor:function(D,C=1){f.set(D),h=C,g(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(D){h=D,g(f,h)},render:T,addToRenderList:_,dispose:I}}function jS(s,e){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=y(null);let l=a,u=!1;function f(R,H,ie,Y,de){let me=!1;const Q=x(Y,ie,H);l!==Q&&(l=Q,p(l.object)),me=S(R,Y,ie,de),me&&M(R,Y,ie,de),de!==null&&e.update(de,s.ELEMENT_ARRAY_BUFFER),(me||u)&&(u=!1,C(R,H,ie,Y),de!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(de).buffer))}function h(){return s.createVertexArray()}function p(R){return s.bindVertexArray(R)}function v(R){return s.deleteVertexArray(R)}function x(R,H,ie){const Y=ie.wireframe===!0;let de=r[R.id];de===void 0&&(de={},r[R.id]=de);let me=de[H.id];me===void 0&&(me={},de[H.id]=me);let Q=me[Y];return Q===void 0&&(Q=y(h()),me[Y]=Q),Q}function y(R){const H=[],ie=[],Y=[];for(let de=0;de<n;de++)H[de]=0,ie[de]=0,Y[de]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:ie,attributeDivisors:Y,object:R,attributes:{},index:null}}function S(R,H,ie,Y){const de=l.attributes,me=H.attributes;let Q=0;const re=ie.getAttributes();for(const B in re)if(re[B].location>=0){const L=de[B];let E=me[B];if(E===void 0&&(B==="instanceMatrix"&&R.instanceMatrix&&(E=R.instanceMatrix),B==="instanceColor"&&R.instanceColor&&(E=R.instanceColor)),L===void 0||L.attribute!==E||E&&L.data!==E.data)return!0;Q++}return l.attributesNum!==Q||l.index!==Y}function M(R,H,ie,Y){const de={},me=H.attributes;let Q=0;const re=ie.getAttributes();for(const B in re)if(re[B].location>=0){let L=me[B];L===void 0&&(B==="instanceMatrix"&&R.instanceMatrix&&(L=R.instanceMatrix),B==="instanceColor"&&R.instanceColor&&(L=R.instanceColor));const E={};E.attribute=L,L&&L.data&&(E.data=L.data),de[B]=E,Q++}l.attributes=de,l.attributesNum=Q,l.index=Y}function T(){const R=l.newAttributes;for(let H=0,ie=R.length;H<ie;H++)R[H]=0}function _(R){g(R,0)}function g(R,H){const ie=l.newAttributes,Y=l.enabledAttributes,de=l.attributeDivisors;ie[R]=1,Y[R]===0&&(s.enableVertexAttribArray(R),Y[R]=1),de[R]!==H&&(s.vertexAttribDivisor(R,H),de[R]=H)}function I(){const R=l.newAttributes,H=l.enabledAttributes;for(let ie=0,Y=H.length;ie<Y;ie++)H[ie]!==R[ie]&&(s.disableVertexAttribArray(ie),H[ie]=0)}function D(R,H,ie,Y,de,me,Q){Q===!0?s.vertexAttribIPointer(R,H,ie,de,me):s.vertexAttribPointer(R,H,ie,Y,de,me)}function C(R,H,ie,Y){T();const de=Y.attributes,me=ie.getAttributes(),Q=H.defaultAttributeValues;for(const re in me){const B=me[re];if(B.location>=0){let he=de[re];if(he===void 0&&(re==="instanceMatrix"&&R.instanceMatrix&&(he=R.instanceMatrix),re==="instanceColor"&&R.instanceColor&&(he=R.instanceColor)),he!==void 0){const L=he.normalized,E=he.itemSize,W=e.get(he);if(W===void 0)continue;const ve=W.buffer,X=W.type,ne=W.bytesPerElement,fe=X===s.INT||X===s.UNSIGNED_INT||he.gpuType===Uc;if(he.isInterleavedBufferAttribute){const ae=he.data,pe=ae.stride,Te=he.offset;if(ae.isInstancedInterleavedBuffer){for(let Ee=0;Ee<B.locationSize;Ee++)g(B.location+Ee,ae.meshPerAttribute);R.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ee=0;Ee<B.locationSize;Ee++)_(B.location+Ee);s.bindBuffer(s.ARRAY_BUFFER,ve);for(let Ee=0;Ee<B.locationSize;Ee++)D(B.location+Ee,E/B.locationSize,X,L,pe*ne,(Te+E/B.locationSize*Ee)*ne,fe)}else{if(he.isInstancedBufferAttribute){for(let ae=0;ae<B.locationSize;ae++)g(B.location+ae,he.meshPerAttribute);R.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let ae=0;ae<B.locationSize;ae++)_(B.location+ae);s.bindBuffer(s.ARRAY_BUFFER,ve);for(let ae=0;ae<B.locationSize;ae++)D(B.location+ae,E/B.locationSize,X,L,E*ne,E/B.locationSize*ae*ne,fe)}}else if(Q!==void 0){const L=Q[re];if(L!==void 0)switch(L.length){case 2:s.vertexAttrib2fv(B.location,L);break;case 3:s.vertexAttrib3fv(B.location,L);break;case 4:s.vertexAttrib4fv(B.location,L);break;default:s.vertexAttrib1fv(B.location,L)}}}}I()}function z(){G();for(const R in r){const H=r[R];for(const ie in H){const Y=H[ie];for(const de in Y)v(Y[de].object),delete Y[de];delete H[ie]}delete r[R]}}function k(R){if(r[R.id]===void 0)return;const H=r[R.id];for(const ie in H){const Y=H[ie];for(const de in Y)v(Y[de].object),delete Y[de];delete H[ie]}delete r[R.id]}function O(R){for(const H in r){const ie=r[H];if(ie[R.id]===void 0)continue;const Y=ie[R.id];for(const de in Y)v(Y[de].object),delete Y[de];delete ie[R.id]}}function G(){P(),u=!0,l!==a&&(l=a,p(l.object))}function P(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:f,reset:G,resetDefaultState:P,dispose:z,releaseStatesOfGeometry:k,releaseStatesOfProgram:O,initAttributes:T,enableAttribute:_,disableUnusedAttributes:I}}function qS(s,e,n){let r;function a(p){r=p}function l(p,v){s.drawArrays(r,p,v),n.update(v,r,1)}function u(p,v,x){x!==0&&(s.drawArraysInstanced(r,p,v,x),n.update(v,r,x))}function f(p,v,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,v,0,x);let S=0;for(let M=0;M<x;M++)S+=v[M];n.update(S,r,1)}function h(p,v,x,y){if(x===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let M=0;M<p.length;M++)u(p[M],v[M],y[M]);else{S.multiDrawArraysInstancedWEBGL(r,p,0,v,0,y,0,x);let M=0;for(let T=0;T<x;T++)M+=v[T]*y[T];n.update(M,r,1)}}this.setMode=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=h}function YS(s,e,n,r){let a;function l(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function u(O){return!(O!==ri&&r.convert(O)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function f(O){const G=O===fo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==Li&&r.convert(O)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==bi&&!G)}function h(O){if(O==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const v=h(p);v!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",v,"instead."),p=v);const x=n.logarithmicDepthBuffer===!0,y=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),M=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),I=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),D=s.getParameter(s.MAX_VARYING_VECTORS),C=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),z=M>0,k=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:h,textureFormatReadable:u,textureTypeReadable:f,precision:p,logarithmicDepthBuffer:x,reverseDepthBuffer:y,maxTextures:S,maxVertexTextures:M,maxTextureSize:T,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:I,maxVaryings:D,maxFragmentUniforms:C,vertexTextures:z,maxSamples:k}}function $S(s){const e=this;let n=null,r=0,a=!1,l=!1;const u=new Pr,f=new mt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(x,y){const S=x.length!==0||y||r!==0||a;return a=y,r=x.length,S},this.beginShadows=function(){l=!0,v(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(x,y){n=v(x,y,0)},this.setState=function(x,y,S){const M=x.clippingPlanes,T=x.clipIntersection,_=x.clipShadows,g=s.get(x);if(!a||M===null||M.length===0||l&&!_)l?v(null):p();else{const I=l?0:r,D=I*4;let C=g.clippingState||null;h.value=C,C=v(M,y,D,S);for(let z=0;z!==D;++z)C[z]=n[z];g.clippingState=C,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=I}};function p(){h.value!==n&&(h.value=n,h.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function v(x,y,S,M){const T=x!==null?x.length:0;let _=null;if(T!==0){if(_=h.value,M!==!0||_===null){const g=S+T*4,I=y.matrixWorldInverse;f.getNormalMatrix(I),(_===null||_.length<g)&&(_=new Float32Array(g));for(let D=0,C=S;D!==T;++D,C+=4)u.copy(x[D]).applyMatrix4(I,f),u.normal.toArray(_,C),_[C+3]=u.constant}h.value=_,h.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,_}}function KS(s){let e=new WeakMap;function n(u,f){return f===ic?u.mapping=fs:f===rc&&(u.mapping=ds),u}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===ic||f===rc)if(e.has(u)){const h=e.get(u).texture;return n(h,u.mapping)}else{const h=u.image;if(h&&h.height>0){const p=new E0(h.height);return p.fromEquirectangularTexture(s,u),e.set(u,p),u.addEventListener("dispose",a),n(p.texture,u.mapping)}else return null}}return u}function a(u){const f=u.target;f.removeEventListener("dispose",a);const h=e.get(f);h!==void 0&&(e.delete(f),h.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}const ro=4,Jm=[.125,.215,.35,.446,.526,.582],as=20,id=new Zd,eg=new _t;let rd=null,sd=0,od=0,ad=!1;const os=(1+Math.sqrt(5))/2,to=1/os,tg=[new K(-os,to,0),new K(os,to,0),new K(-to,0,os),new K(to,0,os),new K(0,os,-to),new K(0,os,to),new K(-1,1,-1),new K(1,1,-1),new K(-1,1,1),new K(1,1,1)];class yd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,r=.1,a=100){rd=this._renderer.getRenderTarget(),sd=this._renderer.getActiveCubeFace(),od=this._renderer.getActiveMipmapLevel(),ad=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,a,l),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ig(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(rd,sd,od),this._renderer.xr.enabled=ad,e.scissorTest=!1,Gl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===fs||e.mapping===ds?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rd=this._renderer.getRenderTarget(),sd=this._renderer.getActiveCubeFace(),od=this._renderer.getActiveMipmapLevel(),ad=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=n||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,r={magFilter:vi,minFilter:vi,generateMipmaps:!1,type:fo,format:ri,colorSpace:ms,depthBuffer:!1},a=ng(e,n,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ng(e,n,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ZS(l)),this._blurMaterial=QS(l,e,n)}return a}_compileMaterial(e){const n=new lt(this._lodPlanes[0],e);this._renderer.compile(n,id)}_sceneToCubeUV(e,n,r,a){const f=new vn(90,1,n,r),h=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],v=this._renderer,x=v.autoClear,y=v.toneMapping;v.getClearColor(eg),v.toneMapping=Zi,v.autoClear=!1;const S=new _s({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1}),M=new lt(new Wt,S);let T=!1;const _=e.background;_?_.isColor&&(S.color.copy(_),e.background=null,T=!0):(S.color.copy(eg),T=!0);for(let g=0;g<6;g++){const I=g%3;I===0?(f.up.set(0,h[g],0),f.lookAt(p[g],0,0)):I===1?(f.up.set(0,0,h[g]),f.lookAt(0,p[g],0)):(f.up.set(0,h[g],0),f.lookAt(0,0,p[g]));const D=this._cubeSize;Gl(a,I*D,g>2?D:0,D,D),v.setRenderTarget(a),T&&v.render(M,f),v.render(e,f)}M.geometry.dispose(),M.material.dispose(),v.toneMapping=y,v.autoClear=x,e.background=_}_textureToCubeUV(e,n){const r=this._renderer,a=e.mapping===fs||e.mapping===ds;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=rg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ig());const l=a?this._cubemapMaterial:this._equirectMaterial,u=new lt(this._lodPlanes[0],l),f=l.uniforms;f.envMap.value=e;const h=this._cubeSize;Gl(n,0,0,3*h,2*h),r.setRenderTarget(n),r.render(u,id)}_applyPMREM(e){const n=this._renderer,r=n.autoClear;n.autoClear=!1;const a=this._lodPlanes.length;for(let l=1;l<a;l++){const u=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),f=tg[(a-l-1)%tg.length];this._blur(e,l-1,l,u,f)}n.autoClear=r}_blur(e,n,r,a,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,n,r,a,"latitudinal",l),this._halfBlur(u,e,r,r,a,"longitudinal",l)}_halfBlur(e,n,r,a,l,u,f){const h=this._renderer,p=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,x=new lt(this._lodPlanes[a],p),y=p.uniforms,S=this._sizeLods[r]-1,M=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*as-1),T=l/M,_=isFinite(l)?1+Math.floor(v*T):as;_>as&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${as}`);const g=[];let I=0;for(let O=0;O<as;++O){const G=O/T,P=Math.exp(-G*G/2);g.push(P),O===0?I+=P:O<_&&(I+=2*P)}for(let O=0;O<g.length;O++)g[O]=g[O]/I;y.envMap.value=e.texture,y.samples.value=_,y.weights.value=g,y.latitudinal.value=u==="latitudinal",f&&(y.poleAxis.value=f);const{_lodMax:D}=this;y.dTheta.value=M,y.mipInt.value=D-r;const C=this._sizeLods[a],z=3*C*(a>D-ro?a-D+ro:0),k=4*(this._cubeSize-C);Gl(n,z,k,3*C,2*C),h.setRenderTarget(n),h.render(x,id)}}function ZS(s){const e=[],n=[],r=[];let a=s;const l=s-ro+1+Jm.length;for(let u=0;u<l;u++){const f=Math.pow(2,a);n.push(f);let h=1/f;u>s-ro?h=Jm[u-s+ro-1]:u===0&&(h=0),r.push(h);const p=1/(f-2),v=-p,x=1+p,y=[v,v,x,v,x,x,v,v,x,x,v,x],S=6,M=6,T=3,_=2,g=1,I=new Float32Array(T*M*S),D=new Float32Array(_*M*S),C=new Float32Array(g*M*S);for(let k=0;k<S;k++){const O=k%3*2/3-1,G=k>2?0:-1,P=[O,G,0,O+2/3,G,0,O+2/3,G+1,0,O,G,0,O+2/3,G+1,0,O,G+1,0];I.set(P,T*M*k),D.set(y,_*M*k);const R=[k,k,k,k,k,k];C.set(R,g*M*k)}const z=new Nn;z.setAttribute("position",new oi(I,T)),z.setAttribute("uv",new oi(D,_)),z.setAttribute("faceIndex",new oi(C,g)),e.push(z),a>ro&&a--}return{lodPlanes:e,sizeLods:n,sigmas:r}}function ng(s,e,n){const r=new kr(s,e,n);return r.texture.mapping=ua,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Gl(s,e,n,r,a){s.viewport.set(e,n,r,a),s.scissor.set(e,n,r,a)}function QS(s,e,n){const r=new Float32Array(as),a=new K(0,1,0);return new er({name:"SphericalGaussianBlur",defines:{n:as,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Qd(),fragmentShader:`

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
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function ig(){return new er({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qd(),fragmentShader:`

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
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function rg(){return new er({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function Qd(){return`

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
	`}function JS(s){let e=new WeakMap,n=null;function r(f){if(f&&f.isTexture){const h=f.mapping,p=h===ic||h===rc,v=h===fs||h===ds;if(p||v){let x=e.get(f);const y=x!==void 0?x.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==y)return n===null&&(n=new yd(s)),x=p?n.fromEquirectangular(f,x):n.fromCubemap(f,x),x.texture.pmremVersion=f.pmremVersion,e.set(f,x),x.texture;if(x!==void 0)return x.texture;{const S=f.image;return p&&S&&S.height>0||v&&S&&a(S)?(n===null&&(n=new yd(s)),x=p?n.fromEquirectangular(f):n.fromCubemap(f),x.texture.pmremVersion=f.pmremVersion,e.set(f,x),f.addEventListener("dispose",l),x.texture):null}}}return f}function a(f){let h=0;const p=6;for(let v=0;v<p;v++)f[v]!==void 0&&h++;return h===p}function l(f){const h=f.target;h.removeEventListener("dispose",l);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:u}}function eM(s){const e={};function n(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return n(r)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(r){const a=n(r);return a===null&&no("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function tM(s,e,n,r){const a={},l=new WeakMap;function u(x){const y=x.target;y.index!==null&&e.remove(y.index);for(const M in y.attributes)e.remove(y.attributes[M]);y.removeEventListener("dispose",u),delete a[y.id];const S=l.get(y);S&&(e.remove(S),l.delete(y)),r.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,n.memory.geometries--}function f(x,y){return a[y.id]===!0||(y.addEventListener("dispose",u),a[y.id]=!0,n.memory.geometries++),y}function h(x){const y=x.attributes;for(const S in y)e.update(y[S],s.ARRAY_BUFFER)}function p(x){const y=[],S=x.index,M=x.attributes.position;let T=0;if(S!==null){const I=S.array;T=S.version;for(let D=0,C=I.length;D<C;D+=3){const z=I[D+0],k=I[D+1],O=I[D+2];y.push(z,k,k,O,O,z)}}else if(M!==void 0){const I=M.array;T=M.version;for(let D=0,C=I.length/3-1;D<C;D+=3){const z=D+0,k=D+1,O=D+2;y.push(z,k,k,O,O,z)}}else return;const _=new(p0(y)?Xd:Wd)(y,1);_.version=T;const g=l.get(x);g&&e.remove(g),l.set(x,_)}function v(x){const y=l.get(x);if(y){const S=x.index;S!==null&&y.version<S.version&&p(x)}else p(x);return l.get(x)}return{get:f,update:h,getWireframeAttribute:v}}function nM(s,e,n){let r;function a(y){r=y}let l,u;function f(y){l=y.type,u=y.bytesPerElement}function h(y,S){s.drawElements(r,S,l,y*u),n.update(S,r,1)}function p(y,S,M){M!==0&&(s.drawElementsInstanced(r,S,l,y*u,M),n.update(S,r,M))}function v(y,S,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,S,0,l,y,0,M);let _=0;for(let g=0;g<M;g++)_+=S[g];n.update(_,r,1)}function x(y,S,M,T){if(M===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let g=0;g<y.length;g++)p(y[g]/u,S[g],T[g]);else{_.multiDrawElementsInstancedWEBGL(r,S,0,l,y,0,T,0,M);let g=0;for(let I=0;I<M;I++)g+=S[I]*T[I];n.update(g,r,1)}}this.setMode=a,this.setIndex=f,this.render=h,this.renderInstances=p,this.renderMultiDraw=v,this.renderMultiDrawInstances=x}function iM(s){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,u,f){switch(n.calls++,u){case s.TRIANGLES:n.triangles+=f*(l/3);break;case s.LINES:n.lines+=f*(l/2);break;case s.LINE_STRIP:n.lines+=f*(l-1);break;case s.LINE_LOOP:n.lines+=f*l;break;case s.POINTS:n.points+=f*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:r}}function rM(s,e,n){const r=new WeakMap,a=new Ut;function l(u,f,h){const p=u.morphTargetInfluences,v=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,x=v!==void 0?v.length:0;let y=r.get(f);if(y===void 0||y.count!==x){let R=function(){G.dispose(),r.delete(f),f.removeEventListener("dispose",R)};var S=R;y!==void 0&&y.texture.dispose();const M=f.morphAttributes.position!==void 0,T=f.morphAttributes.normal!==void 0,_=f.morphAttributes.color!==void 0,g=f.morphAttributes.position||[],I=f.morphAttributes.normal||[],D=f.morphAttributes.color||[];let C=0;M===!0&&(C=1),T===!0&&(C=2),_===!0&&(C=3);let z=f.attributes.position.count*C,k=1;z>e.maxTextureSize&&(k=Math.ceil(z/e.maxTextureSize),z=e.maxTextureSize);const O=new Float32Array(z*k*4*x),G=new Hd(O,z,k,x);G.type=bi,G.needsUpdate=!0;const P=C*4;for(let H=0;H<x;H++){const ie=g[H],Y=I[H],de=D[H],me=z*k*4*H;for(let Q=0;Q<ie.count;Q++){const re=Q*P;M===!0&&(a.fromBufferAttribute(ie,Q),O[me+re+0]=a.x,O[me+re+1]=a.y,O[me+re+2]=a.z,O[me+re+3]=0),T===!0&&(a.fromBufferAttribute(Y,Q),O[me+re+4]=a.x,O[me+re+5]=a.y,O[me+re+6]=a.z,O[me+re+7]=0),_===!0&&(a.fromBufferAttribute(de,Q),O[me+re+8]=a.x,O[me+re+9]=a.y,O[me+re+10]=a.z,O[me+re+11]=de.itemSize===4?a.w:1)}}y={count:x,texture:G,size:new Rt(z,k)},r.set(f,y),f.addEventListener("dispose",R)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",u.morphTexture,n);else{let M=0;for(let _=0;_<p.length;_++)M+=p[_];const T=f.morphTargetsRelative?1:1-M;h.getUniforms().setValue(s,"morphTargetBaseInfluence",T),h.getUniforms().setValue(s,"morphTargetInfluences",p)}h.getUniforms().setValue(s,"morphTargetsTexture",y.texture,n),h.getUniforms().setValue(s,"morphTargetsTextureSize",y.size)}return{update:l}}function sM(s,e,n,r){let a=new WeakMap;function l(h){const p=r.render.frame,v=h.geometry,x=e.get(h,v);if(a.get(x)!==p&&(e.update(x),a.set(x,p)),h.isInstancedMesh&&(h.hasEventListener("dispose",f)===!1&&h.addEventListener("dispose",f),a.get(h)!==p&&(n.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&n.update(h.instanceColor,s.ARRAY_BUFFER),a.set(h,p))),h.isSkinnedMesh){const y=h.skeleton;a.get(y)!==p&&(y.update(),a.set(y,p))}return x}function u(){a=new WeakMap}function f(h){const p=h.target;p.removeEventListener("dispose",f),n.remove(p.instanceMatrix),p.instanceColor!==null&&n.remove(p.instanceColor)}return{update:l,dispose:u}}const O0=new An,sg=new $d(1,1),k0=new Hd,z0=new _0,B0=new qd,og=[],ag=[],lg=new Float32Array(16),cg=new Float32Array(9),ug=new Float32Array(4);function mo(s,e,n){const r=s[0];if(r<=0||r>0)return s;const a=e*n;let l=og[a];if(l===void 0&&(l=new Float32Array(a),og[a]=l),e!==0){r.toArray(l,0);for(let u=1,f=0;u!==e;++u)f+=n,s[u].toArray(l,f)}return l}function rn(s,e){if(s.length!==e.length)return!1;for(let n=0,r=s.length;n<r;n++)if(s[n]!==e[n])return!1;return!0}function sn(s,e){for(let n=0,r=e.length;n<r;n++)s[n]=e[n]}function jc(s,e){let n=ag[e];n===void 0&&(n=new Int32Array(e),ag[e]=n);for(let r=0;r!==e;++r)n[r]=s.allocateTextureUnit();return n}function oM(s,e){const n=this.cache;n[0]!==e&&(s.uniform1f(this.addr,e),n[0]=e)}function aM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(rn(n,e))return;s.uniform2fv(this.addr,e),sn(n,e)}}function lM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(rn(n,e))return;s.uniform3fv(this.addr,e),sn(n,e)}}function cM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(rn(n,e))return;s.uniform4fv(this.addr,e),sn(n,e)}}function uM(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(rn(n,e))return;s.uniformMatrix2fv(this.addr,!1,e),sn(n,e)}else{if(rn(n,r))return;ug.set(r),s.uniformMatrix2fv(this.addr,!1,ug),sn(n,r)}}function fM(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(rn(n,e))return;s.uniformMatrix3fv(this.addr,!1,e),sn(n,e)}else{if(rn(n,r))return;cg.set(r),s.uniformMatrix3fv(this.addr,!1,cg),sn(n,r)}}function dM(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(rn(n,e))return;s.uniformMatrix4fv(this.addr,!1,e),sn(n,e)}else{if(rn(n,r))return;lg.set(r),s.uniformMatrix4fv(this.addr,!1,lg),sn(n,r)}}function hM(s,e){const n=this.cache;n[0]!==e&&(s.uniform1i(this.addr,e),n[0]=e)}function pM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(rn(n,e))return;s.uniform2iv(this.addr,e),sn(n,e)}}function mM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(rn(n,e))return;s.uniform3iv(this.addr,e),sn(n,e)}}function gM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(rn(n,e))return;s.uniform4iv(this.addr,e),sn(n,e)}}function vM(s,e){const n=this.cache;n[0]!==e&&(s.uniform1ui(this.addr,e),n[0]=e)}function _M(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(rn(n,e))return;s.uniform2uiv(this.addr,e),sn(n,e)}}function xM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(rn(n,e))return;s.uniform3uiv(this.addr,e),sn(n,e)}}function yM(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(rn(n,e))return;s.uniform4uiv(this.addr,e),sn(n,e)}}function SM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let l;this.type===s.SAMPLER_2D_SHADOW?(sg.compareFunction=zd,l=sg):l=O0,n.setTexture2D(e||l,a)}function MM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture3D(e||z0,a)}function EM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTextureCube(e||B0,a)}function wM(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture2DArray(e||k0,a)}function TM(s){switch(s){case 5126:return oM;case 35664:return aM;case 35665:return lM;case 35666:return cM;case 35674:return uM;case 35675:return fM;case 35676:return dM;case 5124:case 35670:return hM;case 35667:case 35671:return pM;case 35668:case 35672:return mM;case 35669:case 35673:return gM;case 5125:return vM;case 36294:return _M;case 36295:return xM;case 36296:return yM;case 35678:case 36198:case 36298:case 36306:case 35682:return SM;case 35679:case 36299:case 36307:return MM;case 35680:case 36300:case 36308:case 36293:return EM;case 36289:case 36303:case 36311:case 36292:return wM}}function AM(s,e){s.uniform1fv(this.addr,e)}function RM(s,e){const n=mo(e,this.size,2);s.uniform2fv(this.addr,n)}function CM(s,e){const n=mo(e,this.size,3);s.uniform3fv(this.addr,n)}function bM(s,e){const n=mo(e,this.size,4);s.uniform4fv(this.addr,n)}function PM(s,e){const n=mo(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,n)}function LM(s,e){const n=mo(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,n)}function DM(s,e){const n=mo(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,n)}function NM(s,e){s.uniform1iv(this.addr,e)}function IM(s,e){s.uniform2iv(this.addr,e)}function UM(s,e){s.uniform3iv(this.addr,e)}function FM(s,e){s.uniform4iv(this.addr,e)}function OM(s,e){s.uniform1uiv(this.addr,e)}function kM(s,e){s.uniform2uiv(this.addr,e)}function zM(s,e){s.uniform3uiv(this.addr,e)}function BM(s,e){s.uniform4uiv(this.addr,e)}function HM(s,e,n){const r=this.cache,a=e.length,l=jc(n,a);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let u=0;u!==a;++u)n.setTexture2D(e[u]||O0,l[u])}function VM(s,e,n){const r=this.cache,a=e.length,l=jc(n,a);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let u=0;u!==a;++u)n.setTexture3D(e[u]||z0,l[u])}function GM(s,e,n){const r=this.cache,a=e.length,l=jc(n,a);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let u=0;u!==a;++u)n.setTextureCube(e[u]||B0,l[u])}function WM(s,e,n){const r=this.cache,a=e.length,l=jc(n,a);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let u=0;u!==a;++u)n.setTexture2DArray(e[u]||k0,l[u])}function XM(s){switch(s){case 5126:return AM;case 35664:return RM;case 35665:return CM;case 35666:return bM;case 35674:return PM;case 35675:return LM;case 35676:return DM;case 5124:case 35670:return NM;case 35667:case 35671:return IM;case 35668:case 35672:return UM;case 35669:case 35673:return FM;case 5125:return OM;case 36294:return kM;case 36295:return zM;case 36296:return BM;case 35678:case 36198:case 36298:case 36306:case 35682:return HM;case 35679:case 36299:case 36307:return VM;case 35680:case 36300:case 36308:case 36293:return GM;case 36289:case 36303:case 36311:case 36292:return WM}}class jM{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.setValue=TM(n.type)}}class qM{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=XM(n.type)}}class YM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,r){const a=this.seq;for(let l=0,u=a.length;l!==u;++l){const f=a[l];f.setValue(e,n[f.id],r)}}}const ld=/(\w+)(\])?(\[|\.)?/g;function fg(s,e){s.seq.push(e),s.map[e.id]=e}function $M(s,e,n){const r=s.name,a=r.length;for(ld.lastIndex=0;;){const l=ld.exec(r),u=ld.lastIndex;let f=l[1];const h=l[2]==="]",p=l[3];if(h&&(f=f|0),p===void 0||p==="["&&u+2===a){fg(n,p===void 0?new jM(f,s,e):new qM(f,s,e));break}else{let x=n.map[f];x===void 0&&(x=new YM(f),fg(n,x)),n=x}}}class ql{constructor(e,n){this.seq=[],this.map={};const r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const l=e.getActiveUniform(n,a),u=e.getUniformLocation(n,l.name);$M(l,u,this)}}setValue(e,n,r,a){const l=this.map[n];l!==void 0&&l.setValue(e,r,a)}setOptional(e,n,r){const a=n[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,n,r,a){for(let l=0,u=n.length;l!==u;++l){const f=n[l],h=r[f.id];h.needsUpdate!==!1&&f.setValue(e,h.value,a)}}static seqWithValue(e,n){const r=[];for(let a=0,l=e.length;a!==l;++a){const u=e[a];u.id in n&&r.push(u)}return r}}function dg(s,e,n){const r=s.createShader(e);return s.shaderSource(r,n),s.compileShader(r),r}const KM=37297;let ZM=0;function QM(s,e){const n=s.split(`
`),r=[],a=Math.max(e-6,0),l=Math.min(e+6,n.length);for(let u=a;u<l;u++){const f=u+1;r.push(`${f===e?">":" "} ${f}: ${n[u]}`)}return r.join(`
`)}const hg=new mt;function JM(s){Dt._getMatrix(hg,Dt.workingColorSpace,s);const e=`mat3( ${hg.elements.map(n=>n.toFixed(4))} )`;switch(Dt.getTransfer(s)){case la:return[e,"LinearTransferOETF"];case It:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function pg(s,e,n){const r=s.getShaderParameter(e,s.COMPILE_STATUS),a=s.getShaderInfoLog(e).trim();if(r&&a==="")return"";const l=/ERROR: 0:(\d+)/.exec(a);if(l){const u=parseInt(l[1]);return n.toUpperCase()+`

`+a+`

`+QM(s.getShaderSource(e),u)}else return a}function eE(s,e){const n=JM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function tE(s,e){let n;switch(e){case Zg:n="Linear";break;case Qg:n="Reinhard";break;case Jg:n="Cineon";break;case Ad:n="ACESFilmic";break;case t0:n="AgX";break;case n0:n="Neutral";break;case e0:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+s+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Wl=new K;function nE(){Dt.getLuminanceCoefficients(Wl);const s=Wl.x.toFixed(4),e=Wl.y.toFixed(4),n=Wl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function iE(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(na).join(`
`)}function rE(s){const e=[];for(const n in s){const r=s[n];r!==!1&&e.push("#define "+n+" "+r)}return e.join(`
`)}function sE(s,e){const n={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const l=s.getActiveAttrib(e,a),u=l.name;let f=1;l.type===s.FLOAT_MAT2&&(f=2),l.type===s.FLOAT_MAT3&&(f=3),l.type===s.FLOAT_MAT4&&(f=4),n[u]={type:l.type,location:s.getAttribLocation(e,u),locationSize:f}}return n}function na(s){return s!==""}function mg(s,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gg(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const oE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sd(s){return s.replace(oE,lE)}const aE=new Map;function lE(s,e){let n=vt[e];if(n===void 0){const r=aE.get(e);if(r!==void 0)n=vt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Sd(n)}const cE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vg(s){return s.replace(cE,uE)}function uE(s,e,n,r){let a="";for(let l=parseInt(e);l<parseInt(n);l++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function _g(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function fE(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ed?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===wd?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Ri&&(e="SHADOWMAP_TYPE_VSM"),e}function dE(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case fs:case ds:e="ENVMAP_TYPE_CUBE";break;case ua:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hE(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ds:e="ENVMAP_MODE_REFRACTION";break}return e}function pE(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Td:e="ENVMAP_BLENDING_MULTIPLY";break;case $g:e="ENVMAP_BLENDING_MIX";break;case Kg:e="ENVMAP_BLENDING_ADD";break}return e}function mE(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:r,maxMip:n}}function gE(s,e,n,r){const a=s.getContext(),l=n.defines;let u=n.vertexShader,f=n.fragmentShader;const h=fE(n),p=dE(n),v=hE(n),x=pE(n),y=mE(n),S=iE(n),M=rE(l),T=a.createProgram();let _,g,I=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M].filter(na).join(`
`),_.length>0&&(_+=`
`),g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M].filter(na).join(`
`),g.length>0&&(g+=`
`)):(_=[_g(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+v:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(na).join(`
`),g=[_g(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+v:"",n.envMap?"#define "+x:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Zi?"#define TONE_MAPPING":"",n.toneMapping!==Zi?vt.tonemapping_pars_fragment:"",n.toneMapping!==Zi?tE("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",vt.colorspace_pars_fragment,eE("linearToOutputTexel",n.outputColorSpace),nE(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(na).join(`
`)),u=Sd(u),u=mg(u,n),u=gg(u,n),f=Sd(f),f=mg(f,n),f=gg(f,n),u=vg(u),f=vg(f),n.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,_=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,g=["#define varying in",n.glslVersion===vd?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===vd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const D=I+_+u,C=I+g+f,z=dg(a,a.VERTEX_SHADER,D),k=dg(a,a.FRAGMENT_SHADER,C);a.attachShader(T,z),a.attachShader(T,k),n.index0AttributeName!==void 0?a.bindAttribLocation(T,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(T,0,"position"),a.linkProgram(T);function O(H){if(s.debug.checkShaderErrors){const ie=a.getProgramInfoLog(T).trim(),Y=a.getShaderInfoLog(z).trim(),de=a.getShaderInfoLog(k).trim();let me=!0,Q=!0;if(a.getProgramParameter(T,a.LINK_STATUS)===!1)if(me=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,T,z,k);else{const re=pg(a,z,"vertex"),B=pg(a,k,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(T,a.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+ie+`
`+re+`
`+B)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):(Y===""||de==="")&&(Q=!1);Q&&(H.diagnostics={runnable:me,programLog:ie,vertexShader:{log:Y,prefix:_},fragmentShader:{log:de,prefix:g}})}a.deleteShader(z),a.deleteShader(k),G=new ql(a,T),P=sE(a,T)}let G;this.getUniforms=function(){return G===void 0&&O(this),G};let P;this.getAttributes=function(){return P===void 0&&O(this),P};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=a.getProgramParameter(T,KM)),R},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(T),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=ZM++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=z,this.fragmentShader=k,this}let vE=0;class _E{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(n),l=this._getShaderStage(r),u=this._getShaderCacheForMaterial(e);return u.has(a)===!1&&(u.add(a),a.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const r of n)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let r=n.get(e);return r===void 0&&(r=new Set,n.set(e,r)),r}_getShaderStage(e){const n=this.shaderCache;let r=n.get(e);return r===void 0&&(r=new xE(e),n.set(e,r)),r}}class xE{constructor(e){this.id=vE++,this.code=e,this.usedTimes=0}}function yE(s,e,n,r,a,l,u){const f=new Gd,h=new _E,p=new Set,v=[],x=a.logarithmicDepthBuffer,y=a.vertexTextures;let S=a.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(P){return p.add(P),P===0?"uv":`uv${P}`}function _(P,R,H,ie,Y){const de=ie.fog,me=Y.geometry,Q=P.isMeshStandardMaterial?ie.environment:null,re=(P.isMeshStandardMaterial?n:e).get(P.envMap||Q),B=re&&re.mapping===ua?re.image.height:null,he=M[P.type];P.precision!==null&&(S=a.getMaxPrecision(P.precision),S!==P.precision&&console.warn("THREE.WebGLProgram.getParameters:",P.precision,"not supported, using",S,"instead."));const L=me.morphAttributes.position||me.morphAttributes.normal||me.morphAttributes.color,E=L!==void 0?L.length:0;let W=0;me.morphAttributes.position!==void 0&&(W=1),me.morphAttributes.normal!==void 0&&(W=2),me.morphAttributes.color!==void 0&&(W=3);let ve,X,ne,fe;if(he){const yt=gi[he];ve=yt.vertexShader,X=yt.fragmentShader}else ve=P.vertexShader,X=P.fragmentShader,h.update(P),ne=h.getVertexShaderID(P),fe=h.getFragmentShaderID(P);const ae=s.getRenderTarget(),pe=s.state.buffers.depth.getReversed(),Te=Y.isInstancedMesh===!0,Ee=Y.isBatchedMesh===!0,Ne=!!P.map,Ke=!!P.matcap,Oe=!!re,F=!!P.aoMap,Tt=!!P.lightMap,tt=!!P.bumpMap,nt=!!P.normalMap,Ve=!!P.displacementMap,xt=!!P.emissiveMap,ke=!!P.metalnessMap,N=!!P.roughnessMap,A=P.anisotropy>0,se=P.clearcoat>0,xe=P.dispersion>0,ye=P.iridescence>0,_e=P.sheen>0,Xe=P.transmission>0,Le=A&&!!P.anisotropyMap,Ue=se&&!!P.clearcoatMap,ct=se&&!!P.clearcoatNormalMap,we=se&&!!P.clearcoatRoughnessMap,ze=ye&&!!P.iridescenceMap,Je=ye&&!!P.iridescenceThicknessMap,it=_e&&!!P.sheenColorMap,Ge=_e&&!!P.sheenRoughnessMap,ht=!!P.specularMap,ft=!!P.specularColorMap,Ct=!!P.specularIntensityMap,q=Xe&&!!P.transmissionMap,Ce=Xe&&!!P.thicknessMap,ce=!!P.gradientMap,ge=!!P.alphaMap,De=P.alphaTest>0,Pe=!!P.alphaHash,ot=!!P.extensions;let bt=Zi;P.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(bt=s.toneMapping);const Ot={shaderID:he,shaderType:P.type,shaderName:P.name,vertexShader:ve,fragmentShader:X,defines:P.defines,customVertexShaderID:ne,customFragmentShaderID:fe,isRawShaderMaterial:P.isRawShaderMaterial===!0,glslVersion:P.glslVersion,precision:S,batching:Ee,batchingColor:Ee&&Y._colorsTexture!==null,instancing:Te,instancingColor:Te&&Y.instanceColor!==null,instancingMorph:Te&&Y.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:ae===null?s.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:ms,alphaToCoverage:!!P.alphaToCoverage,map:Ne,matcap:Ke,envMap:Oe,envMapMode:Oe&&re.mapping,envMapCubeUVHeight:B,aoMap:F,lightMap:Tt,bumpMap:tt,normalMap:nt,displacementMap:y&&Ve,emissiveMap:xt,normalMapObjectSpace:nt&&P.normalMapType===o0,normalMapTangentSpace:nt&&P.normalMapType===kd,metalnessMap:ke,roughnessMap:N,anisotropy:A,anisotropyMap:Le,clearcoat:se,clearcoatMap:Ue,clearcoatNormalMap:ct,clearcoatRoughnessMap:we,dispersion:xe,iridescence:ye,iridescenceMap:ze,iridescenceThicknessMap:Je,sheen:_e,sheenColorMap:it,sheenRoughnessMap:Ge,specularMap:ht,specularColorMap:ft,specularIntensityMap:Ct,transmission:Xe,transmissionMap:q,thicknessMap:Ce,gradientMap:ce,opaque:P.transparent===!1&&P.blending===ls&&P.alphaToCoverage===!1,alphaMap:ge,alphaTest:De,alphaHash:Pe,combine:P.combine,mapUv:Ne&&T(P.map.channel),aoMapUv:F&&T(P.aoMap.channel),lightMapUv:Tt&&T(P.lightMap.channel),bumpMapUv:tt&&T(P.bumpMap.channel),normalMapUv:nt&&T(P.normalMap.channel),displacementMapUv:Ve&&T(P.displacementMap.channel),emissiveMapUv:xt&&T(P.emissiveMap.channel),metalnessMapUv:ke&&T(P.metalnessMap.channel),roughnessMapUv:N&&T(P.roughnessMap.channel),anisotropyMapUv:Le&&T(P.anisotropyMap.channel),clearcoatMapUv:Ue&&T(P.clearcoatMap.channel),clearcoatNormalMapUv:ct&&T(P.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&T(P.clearcoatRoughnessMap.channel),iridescenceMapUv:ze&&T(P.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&T(P.iridescenceThicknessMap.channel),sheenColorMapUv:it&&T(P.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&T(P.sheenRoughnessMap.channel),specularMapUv:ht&&T(P.specularMap.channel),specularColorMapUv:ft&&T(P.specularColorMap.channel),specularIntensityMapUv:Ct&&T(P.specularIntensityMap.channel),transmissionMapUv:q&&T(P.transmissionMap.channel),thicknessMapUv:Ce&&T(P.thicknessMap.channel),alphaMapUv:ge&&T(P.alphaMap.channel),vertexTangents:!!me.attributes.tangent&&(nt||A),vertexColors:P.vertexColors,vertexAlphas:P.vertexColors===!0&&!!me.attributes.color&&me.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!me.attributes.uv&&(Ne||ge),fog:!!de,useFog:P.fog===!0,fogExp2:!!de&&de.isFogExp2,flatShading:P.flatShading===!0,sizeAttenuation:P.sizeAttenuation===!0,logarithmicDepthBuffer:x,reverseDepthBuffer:pe,skinning:Y.isSkinnedMesh===!0,morphTargets:me.morphAttributes.position!==void 0,morphNormals:me.morphAttributes.normal!==void 0,morphColors:me.morphAttributes.color!==void 0,morphTargetsCount:E,morphTextureStride:W,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:P.dithering,shadowMapEnabled:s.shadowMap.enabled&&H.length>0,shadowMapType:s.shadowMap.type,toneMapping:bt,decodeVideoTexture:Ne&&P.map.isVideoTexture===!0&&Dt.getTransfer(P.map.colorSpace)===It,decodeVideoTextureEmissive:xt&&P.emissiveMap.isVideoTexture===!0&&Dt.getTransfer(P.emissiveMap.colorSpace)===It,premultipliedAlpha:P.premultipliedAlpha,doubleSided:P.side===Ci,flipSided:P.side===Dn,useDepthPacking:P.depthPacking>=0,depthPacking:P.depthPacking||0,index0AttributeName:P.index0AttributeName,extensionClipCullDistance:ot&&P.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ot&&P.extensions.multiDraw===!0||Ee)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:P.customProgramCacheKey()};return Ot.vertexUv1s=p.has(1),Ot.vertexUv2s=p.has(2),Ot.vertexUv3s=p.has(3),p.clear(),Ot}function g(P){const R=[];if(P.shaderID?R.push(P.shaderID):(R.push(P.customVertexShaderID),R.push(P.customFragmentShaderID)),P.defines!==void 0)for(const H in P.defines)R.push(H),R.push(P.defines[H]);return P.isRawShaderMaterial===!1&&(I(R,P),D(R,P),R.push(s.outputColorSpace)),R.push(P.customProgramCacheKey),R.join()}function I(P,R){P.push(R.precision),P.push(R.outputColorSpace),P.push(R.envMapMode),P.push(R.envMapCubeUVHeight),P.push(R.mapUv),P.push(R.alphaMapUv),P.push(R.lightMapUv),P.push(R.aoMapUv),P.push(R.bumpMapUv),P.push(R.normalMapUv),P.push(R.displacementMapUv),P.push(R.emissiveMapUv),P.push(R.metalnessMapUv),P.push(R.roughnessMapUv),P.push(R.anisotropyMapUv),P.push(R.clearcoatMapUv),P.push(R.clearcoatNormalMapUv),P.push(R.clearcoatRoughnessMapUv),P.push(R.iridescenceMapUv),P.push(R.iridescenceThicknessMapUv),P.push(R.sheenColorMapUv),P.push(R.sheenRoughnessMapUv),P.push(R.specularMapUv),P.push(R.specularColorMapUv),P.push(R.specularIntensityMapUv),P.push(R.transmissionMapUv),P.push(R.thicknessMapUv),P.push(R.combine),P.push(R.fogExp2),P.push(R.sizeAttenuation),P.push(R.morphTargetsCount),P.push(R.morphAttributeCount),P.push(R.numDirLights),P.push(R.numPointLights),P.push(R.numSpotLights),P.push(R.numSpotLightMaps),P.push(R.numHemiLights),P.push(R.numRectAreaLights),P.push(R.numDirLightShadows),P.push(R.numPointLightShadows),P.push(R.numSpotLightShadows),P.push(R.numSpotLightShadowsWithMaps),P.push(R.numLightProbes),P.push(R.shadowMapType),P.push(R.toneMapping),P.push(R.numClippingPlanes),P.push(R.numClipIntersection),P.push(R.depthPacking)}function D(P,R){f.disableAll(),R.supportsVertexTextures&&f.enable(0),R.instancing&&f.enable(1),R.instancingColor&&f.enable(2),R.instancingMorph&&f.enable(3),R.matcap&&f.enable(4),R.envMap&&f.enable(5),R.normalMapObjectSpace&&f.enable(6),R.normalMapTangentSpace&&f.enable(7),R.clearcoat&&f.enable(8),R.iridescence&&f.enable(9),R.alphaTest&&f.enable(10),R.vertexColors&&f.enable(11),R.vertexAlphas&&f.enable(12),R.vertexUv1s&&f.enable(13),R.vertexUv2s&&f.enable(14),R.vertexUv3s&&f.enable(15),R.vertexTangents&&f.enable(16),R.anisotropy&&f.enable(17),R.alphaHash&&f.enable(18),R.batching&&f.enable(19),R.dispersion&&f.enable(20),R.batchingColor&&f.enable(21),P.push(f.mask),f.disableAll(),R.fog&&f.enable(0),R.useFog&&f.enable(1),R.flatShading&&f.enable(2),R.logarithmicDepthBuffer&&f.enable(3),R.reverseDepthBuffer&&f.enable(4),R.skinning&&f.enable(5),R.morphTargets&&f.enable(6),R.morphNormals&&f.enable(7),R.morphColors&&f.enable(8),R.premultipliedAlpha&&f.enable(9),R.shadowMapEnabled&&f.enable(10),R.doubleSided&&f.enable(11),R.flipSided&&f.enable(12),R.useDepthPacking&&f.enable(13),R.dithering&&f.enable(14),R.transmission&&f.enable(15),R.sheen&&f.enable(16),R.opaque&&f.enable(17),R.pointsUvs&&f.enable(18),R.decodeVideoTexture&&f.enable(19),R.decodeVideoTextureEmissive&&f.enable(20),R.alphaToCoverage&&f.enable(21),P.push(f.mask)}function C(P){const R=M[P.type];let H;if(R){const ie=gi[R];H=S0.clone(ie.uniforms)}else H=P.uniforms;return H}function z(P,R){let H;for(let ie=0,Y=v.length;ie<Y;ie++){const de=v[ie];if(de.cacheKey===R){H=de,++H.usedTimes;break}}return H===void 0&&(H=new gE(s,R,P,l),v.push(H)),H}function k(P){if(--P.usedTimes===0){const R=v.indexOf(P);v[R]=v[v.length-1],v.pop(),P.destroy()}}function O(P){h.remove(P)}function G(){h.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:C,acquireProgram:z,releaseProgram:k,releaseShaderCache:O,programs:v,dispose:G}}function SE(){let s=new WeakMap;function e(u){return s.has(u)}function n(u){let f=s.get(u);return f===void 0&&(f={},s.set(u,f)),f}function r(u){s.delete(u)}function a(u,f,h){s.get(u)[f]=h}function l(){s=new WeakMap}return{has:e,get:n,remove:r,update:a,dispose:l}}function ME(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function xg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function yg(){const s=[];let e=0;const n=[],r=[],a=[];function l(){e=0,n.length=0,r.length=0,a.length=0}function u(x,y,S,M,T,_){let g=s[e];return g===void 0?(g={id:x.id,object:x,geometry:y,material:S,groupOrder:M,renderOrder:x.renderOrder,z:T,group:_},s[e]=g):(g.id=x.id,g.object=x,g.geometry=y,g.material=S,g.groupOrder=M,g.renderOrder=x.renderOrder,g.z=T,g.group=_),e++,g}function f(x,y,S,M,T,_){const g=u(x,y,S,M,T,_);S.transmission>0?r.push(g):S.transparent===!0?a.push(g):n.push(g)}function h(x,y,S,M,T,_){const g=u(x,y,S,M,T,_);S.transmission>0?r.unshift(g):S.transparent===!0?a.unshift(g):n.unshift(g)}function p(x,y){n.length>1&&n.sort(x||ME),r.length>1&&r.sort(y||xg),a.length>1&&a.sort(y||xg)}function v(){for(let x=e,y=s.length;x<y;x++){const S=s[x];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:r,transparent:a,init:l,push:f,unshift:h,finish:v,sort:p}}function EE(){let s=new WeakMap;function e(r,a){const l=s.get(r);let u;return l===void 0?(u=new yg,s.set(r,[u])):a>=l.length?(u=new yg,l.push(u)):u=l[a],u}function n(){s=new WeakMap}return{get:e,dispose:n}}function wE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new K,color:new _t};break;case"SpotLight":n={position:new K,direction:new K,color:new _t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new K,color:new _t,distance:0,decay:0};break;case"HemisphereLight":n={direction:new K,skyColor:new _t,groundColor:new _t};break;case"RectAreaLight":n={color:new _t,position:new K,halfWidth:new K,halfHeight:new K};break}return s[e.id]=n,n}}}function TE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=n,n}}}let AE=0;function RE(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function CE(s){const e=new wE,n=TE(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new K);const a=new K,l=new zt,u=new zt;function f(p){let v=0,x=0,y=0;for(let P=0;P<9;P++)r.probe[P].set(0,0,0);let S=0,M=0,T=0,_=0,g=0,I=0,D=0,C=0,z=0,k=0,O=0;p.sort(RE);for(let P=0,R=p.length;P<R;P++){const H=p[P],ie=H.color,Y=H.intensity,de=H.distance,me=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)v+=ie.r*Y,x+=ie.g*Y,y+=ie.b*Y;else if(H.isLightProbe){for(let Q=0;Q<9;Q++)r.probe[Q].addScaledVector(H.sh.coefficients[Q],Y);O++}else if(H.isDirectionalLight){const Q=e.get(H);if(Q.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const re=H.shadow,B=n.get(H);B.shadowIntensity=re.intensity,B.shadowBias=re.bias,B.shadowNormalBias=re.normalBias,B.shadowRadius=re.radius,B.shadowMapSize=re.mapSize,r.directionalShadow[S]=B,r.directionalShadowMap[S]=me,r.directionalShadowMatrix[S]=H.shadow.matrix,I++}r.directional[S]=Q,S++}else if(H.isSpotLight){const Q=e.get(H);Q.position.setFromMatrixPosition(H.matrixWorld),Q.color.copy(ie).multiplyScalar(Y),Q.distance=de,Q.coneCos=Math.cos(H.angle),Q.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),Q.decay=H.decay,r.spot[T]=Q;const re=H.shadow;if(H.map&&(r.spotLightMap[z]=H.map,z++,re.updateMatrices(H),H.castShadow&&k++),r.spotLightMatrix[T]=re.matrix,H.castShadow){const B=n.get(H);B.shadowIntensity=re.intensity,B.shadowBias=re.bias,B.shadowNormalBias=re.normalBias,B.shadowRadius=re.radius,B.shadowMapSize=re.mapSize,r.spotShadow[T]=B,r.spotShadowMap[T]=me,C++}T++}else if(H.isRectAreaLight){const Q=e.get(H);Q.color.copy(ie).multiplyScalar(Y),Q.halfWidth.set(H.width*.5,0,0),Q.halfHeight.set(0,H.height*.5,0),r.rectArea[_]=Q,_++}else if(H.isPointLight){const Q=e.get(H);if(Q.color.copy(H.color).multiplyScalar(H.intensity),Q.distance=H.distance,Q.decay=H.decay,H.castShadow){const re=H.shadow,B=n.get(H);B.shadowIntensity=re.intensity,B.shadowBias=re.bias,B.shadowNormalBias=re.normalBias,B.shadowRadius=re.radius,B.shadowMapSize=re.mapSize,B.shadowCameraNear=re.camera.near,B.shadowCameraFar=re.camera.far,r.pointShadow[M]=B,r.pointShadowMap[M]=me,r.pointShadowMatrix[M]=H.shadow.matrix,D++}r.point[M]=Q,M++}else if(H.isHemisphereLight){const Q=e.get(H);Q.skyColor.copy(H.color).multiplyScalar(Y),Q.groundColor.copy(H.groundColor).multiplyScalar(Y),r.hemi[g]=Q,g++}}_>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ie.LTC_FLOAT_1,r.rectAreaLTC2=Ie.LTC_FLOAT_2):(r.rectAreaLTC1=Ie.LTC_HALF_1,r.rectAreaLTC2=Ie.LTC_HALF_2)),r.ambient[0]=v,r.ambient[1]=x,r.ambient[2]=y;const G=r.hash;(G.directionalLength!==S||G.pointLength!==M||G.spotLength!==T||G.rectAreaLength!==_||G.hemiLength!==g||G.numDirectionalShadows!==I||G.numPointShadows!==D||G.numSpotShadows!==C||G.numSpotMaps!==z||G.numLightProbes!==O)&&(r.directional.length=S,r.spot.length=T,r.rectArea.length=_,r.point.length=M,r.hemi.length=g,r.directionalShadow.length=I,r.directionalShadowMap.length=I,r.pointShadow.length=D,r.pointShadowMap.length=D,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=I,r.pointShadowMatrix.length=D,r.spotLightMatrix.length=C+z-k,r.spotLightMap.length=z,r.numSpotLightShadowsWithMaps=k,r.numLightProbes=O,G.directionalLength=S,G.pointLength=M,G.spotLength=T,G.rectAreaLength=_,G.hemiLength=g,G.numDirectionalShadows=I,G.numPointShadows=D,G.numSpotShadows=C,G.numSpotMaps=z,G.numLightProbes=O,r.version=AE++)}function h(p,v){let x=0,y=0,S=0,M=0,T=0;const _=v.matrixWorldInverse;for(let g=0,I=p.length;g<I;g++){const D=p[g];if(D.isDirectionalLight){const C=r.directional[x];C.direction.setFromMatrixPosition(D.matrixWorld),a.setFromMatrixPosition(D.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(_),x++}else if(D.isSpotLight){const C=r.spot[S];C.position.setFromMatrixPosition(D.matrixWorld),C.position.applyMatrix4(_),C.direction.setFromMatrixPosition(D.matrixWorld),a.setFromMatrixPosition(D.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(_),S++}else if(D.isRectAreaLight){const C=r.rectArea[M];C.position.setFromMatrixPosition(D.matrixWorld),C.position.applyMatrix4(_),u.identity(),l.copy(D.matrixWorld),l.premultiply(_),u.extractRotation(l),C.halfWidth.set(D.width*.5,0,0),C.halfHeight.set(0,D.height*.5,0),C.halfWidth.applyMatrix4(u),C.halfHeight.applyMatrix4(u),M++}else if(D.isPointLight){const C=r.point[y];C.position.setFromMatrixPosition(D.matrixWorld),C.position.applyMatrix4(_),y++}else if(D.isHemisphereLight){const C=r.hemi[T];C.direction.setFromMatrixPosition(D.matrixWorld),C.direction.transformDirection(_),T++}}}return{setup:f,setupView:h,state:r}}function Sg(s){const e=new CE(s),n=[],r=[];function a(v){p.camera=v,n.length=0,r.length=0}function l(v){n.push(v)}function u(v){r.push(v)}function f(){e.setup(n)}function h(v){e.setupView(n,v)}const p={lightsArray:n,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:p,setupLights:f,setupLightsView:h,pushLight:l,pushShadow:u}}function bE(s){let e=new WeakMap;function n(a,l=0){const u=e.get(a);let f;return u===void 0?(f=new Sg(s),e.set(a,[f])):l>=u.length?(f=new Sg(s),u.push(f)):f=u[l],f}function r(){e=new WeakMap}return{get:n,dispose:r}}const PE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,LE=`uniform sampler2D shadow_pass;
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
}`;function DE(s,e,n){let r=new Vc;const a=new Rt,l=new Rt,u=new Ut,f=new b0({depthPacking:s0}),h=new P0,p={},v=n.maxTextureSize,x={[Ji]:Dn,[Dn]:Ji,[Ci]:Ci},y=new er({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:PE,fragmentShader:LE}),S=y.clone();S.defines.HORIZONTAL_PASS=1;const M=new Nn;M.setAttribute("position",new oi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new lt(M,y),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ed;let g=this.type;this.render=function(k,O,G){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||k.length===0)return;const P=s.getRenderTarget(),R=s.getActiveCubeFace(),H=s.getActiveMipmapLevel(),ie=s.state;ie.setBlending(Ki),ie.buffers.color.setClear(1,1,1,1),ie.buffers.depth.setTest(!0),ie.setScissorTest(!1);const Y=g!==Ri&&this.type===Ri,de=g===Ri&&this.type!==Ri;for(let me=0,Q=k.length;me<Q;me++){const re=k[me],B=re.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",re,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;a.copy(B.mapSize);const he=B.getFrameExtents();if(a.multiply(he),l.copy(B.mapSize),(a.x>v||a.y>v)&&(a.x>v&&(l.x=Math.floor(v/he.x),a.x=l.x*he.x,B.mapSize.x=l.x),a.y>v&&(l.y=Math.floor(v/he.y),a.y=l.y*he.y,B.mapSize.y=l.y)),B.map===null||Y===!0||de===!0){const E=this.type!==Ri?{minFilter:si,magFilter:si}:{};B.map!==null&&B.map.dispose(),B.map=new kr(a.x,a.y,E),B.map.texture.name=re.name+".shadowMap",B.camera.updateProjectionMatrix()}s.setRenderTarget(B.map),s.clear();const L=B.getViewportCount();for(let E=0;E<L;E++){const W=B.getViewport(E);u.set(l.x*W.x,l.y*W.y,l.x*W.z,l.y*W.w),ie.viewport(u),B.updateMatrices(re,E),r=B.getFrustum(),C(O,G,B.camera,re,this.type)}B.isPointLightShadow!==!0&&this.type===Ri&&I(B,G),B.needsUpdate=!1}g=this.type,_.needsUpdate=!1,s.setRenderTarget(P,R,H)};function I(k,O){const G=e.update(T);y.defines.VSM_SAMPLES!==k.blurSamples&&(y.defines.VSM_SAMPLES=k.blurSamples,S.defines.VSM_SAMPLES=k.blurSamples,y.needsUpdate=!0,S.needsUpdate=!0),k.mapPass===null&&(k.mapPass=new kr(a.x,a.y)),y.uniforms.shadow_pass.value=k.map.texture,y.uniforms.resolution.value=k.mapSize,y.uniforms.radius.value=k.radius,s.setRenderTarget(k.mapPass),s.clear(),s.renderBufferDirect(O,null,G,y,T,null),S.uniforms.shadow_pass.value=k.mapPass.texture,S.uniforms.resolution.value=k.mapSize,S.uniforms.radius.value=k.radius,s.setRenderTarget(k.map),s.clear(),s.renderBufferDirect(O,null,G,S,T,null)}function D(k,O,G,P){let R=null;const H=G.isPointLight===!0?k.customDistanceMaterial:k.customDepthMaterial;if(H!==void 0)R=H;else if(R=G.isPointLight===!0?h:f,s.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const ie=R.uuid,Y=O.uuid;let de=p[ie];de===void 0&&(de={},p[ie]=de);let me=de[Y];me===void 0&&(me=R.clone(),de[Y]=me,O.addEventListener("dispose",z)),R=me}if(R.visible=O.visible,R.wireframe=O.wireframe,P===Ri?R.side=O.shadowSide!==null?O.shadowSide:O.side:R.side=O.shadowSide!==null?O.shadowSide:x[O.side],R.alphaMap=O.alphaMap,R.alphaTest=O.alphaTest,R.map=O.map,R.clipShadows=O.clipShadows,R.clippingPlanes=O.clippingPlanes,R.clipIntersection=O.clipIntersection,R.displacementMap=O.displacementMap,R.displacementScale=O.displacementScale,R.displacementBias=O.displacementBias,R.wireframeLinewidth=O.wireframeLinewidth,R.linewidth=O.linewidth,G.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const ie=s.properties.get(R);ie.light=G}return R}function C(k,O,G,P,R){if(k.visible===!1)return;if(k.layers.test(O.layers)&&(k.isMesh||k.isLine||k.isPoints)&&(k.castShadow||k.receiveShadow&&R===Ri)&&(!k.frustumCulled||r.intersectsObject(k))){k.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,k.matrixWorld);const Y=e.update(k),de=k.material;if(Array.isArray(de)){const me=Y.groups;for(let Q=0,re=me.length;Q<re;Q++){const B=me[Q],he=de[B.materialIndex];if(he&&he.visible){const L=D(k,he,P,R);k.onBeforeShadow(s,k,O,G,Y,L,B),s.renderBufferDirect(G,null,Y,L,k,B),k.onAfterShadow(s,k,O,G,Y,L,B)}}}else if(de.visible){const me=D(k,de,P,R);k.onBeforeShadow(s,k,O,G,Y,me,null),s.renderBufferDirect(G,null,Y,me,k,null),k.onAfterShadow(s,k,O,G,Y,me,null)}}const ie=k.children;for(let Y=0,de=ie.length;Y<de;Y++)C(ie[Y],O,G,P,R)}function z(k){k.target.removeEventListener("dispose",z);for(const G in p){const P=p[G],R=k.target.uuid;R in P&&(P[R].dispose(),delete P[R])}}}const NE={[Kl]:Zl,[Ql]:tc,[Jl]:nc,[us]:ec,[Zl]:Kl,[tc]:Ql,[nc]:Jl,[ec]:us};function IE(s,e){function n(){let q=!1;const Ce=new Ut;let ce=null;const ge=new Ut(0,0,0,0);return{setMask:function(De){ce!==De&&!q&&(s.colorMask(De,De,De,De),ce=De)},setLocked:function(De){q=De},setClear:function(De,Pe,ot,bt,Ot){Ot===!0&&(De*=bt,Pe*=bt,ot*=bt),Ce.set(De,Pe,ot,bt),ge.equals(Ce)===!1&&(s.clearColor(De,Pe,ot,bt),ge.copy(Ce))},reset:function(){q=!1,ce=null,ge.set(-1,0,0,0)}}}function r(){let q=!1,Ce=!1,ce=null,ge=null,De=null;return{setReversed:function(Pe){if(Ce!==Pe){const ot=e.get("EXT_clip_control");Ce?ot.clipControlEXT(ot.LOWER_LEFT_EXT,ot.ZERO_TO_ONE_EXT):ot.clipControlEXT(ot.LOWER_LEFT_EXT,ot.NEGATIVE_ONE_TO_ONE_EXT);const bt=De;De=null,this.setClear(bt)}Ce=Pe},getReversed:function(){return Ce},setTest:function(Pe){Pe?ae(s.DEPTH_TEST):pe(s.DEPTH_TEST)},setMask:function(Pe){ce!==Pe&&!q&&(s.depthMask(Pe),ce=Pe)},setFunc:function(Pe){if(Ce&&(Pe=NE[Pe]),ge!==Pe){switch(Pe){case Kl:s.depthFunc(s.NEVER);break;case Zl:s.depthFunc(s.ALWAYS);break;case Ql:s.depthFunc(s.LESS);break;case us:s.depthFunc(s.LEQUAL);break;case Jl:s.depthFunc(s.EQUAL);break;case ec:s.depthFunc(s.GEQUAL);break;case tc:s.depthFunc(s.GREATER);break;case nc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ge=Pe}},setLocked:function(Pe){q=Pe},setClear:function(Pe){De!==Pe&&(Ce&&(Pe=1-Pe),s.clearDepth(Pe),De=Pe)},reset:function(){q=!1,ce=null,ge=null,De=null,Ce=!1}}}function a(){let q=!1,Ce=null,ce=null,ge=null,De=null,Pe=null,ot=null,bt=null,Ot=null;return{setTest:function(yt){q||(yt?ae(s.STENCIL_TEST):pe(s.STENCIL_TEST))},setMask:function(yt){Ce!==yt&&!q&&(s.stencilMask(yt),Ce=yt)},setFunc:function(yt,Un,Rn){(ce!==yt||ge!==Un||De!==Rn)&&(s.stencilFunc(yt,Un,Rn),ce=yt,ge=Un,De=Rn)},setOp:function(yt,Un,Rn){(Pe!==yt||ot!==Un||bt!==Rn)&&(s.stencilOp(yt,Un,Rn),Pe=yt,ot=Un,bt=Rn)},setLocked:function(yt){q=yt},setClear:function(yt){Ot!==yt&&(s.clearStencil(yt),Ot=yt)},reset:function(){q=!1,Ce=null,ce=null,ge=null,De=null,Pe=null,ot=null,bt=null,Ot=null}}}const l=new n,u=new r,f=new a,h=new WeakMap,p=new WeakMap;let v={},x={},y=new WeakMap,S=[],M=null,T=!1,_=null,g=null,I=null,D=null,C=null,z=null,k=null,O=new _t(0,0,0),G=0,P=!1,R=null,H=null,ie=null,Y=null,de=null;const me=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,re=0;const B=s.getParameter(s.VERSION);B.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(B)[1]),Q=re>=1):B.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),Q=re>=2);let he=null,L={};const E=s.getParameter(s.SCISSOR_BOX),W=s.getParameter(s.VIEWPORT),ve=new Ut().fromArray(E),X=new Ut().fromArray(W);function ne(q,Ce,ce,ge){const De=new Uint8Array(4),Pe=s.createTexture();s.bindTexture(q,Pe),s.texParameteri(q,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(q,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ot=0;ot<ce;ot++)q===s.TEXTURE_3D||q===s.TEXTURE_2D_ARRAY?s.texImage3D(Ce,0,s.RGBA,1,1,ge,0,s.RGBA,s.UNSIGNED_BYTE,De):s.texImage2D(Ce+ot,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,De);return Pe}const fe={};fe[s.TEXTURE_2D]=ne(s.TEXTURE_2D,s.TEXTURE_2D,1),fe[s.TEXTURE_CUBE_MAP]=ne(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[s.TEXTURE_2D_ARRAY]=ne(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),fe[s.TEXTURE_3D]=ne(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),u.setClear(1),f.setClear(0),ae(s.DEPTH_TEST),u.setFunc(us),tt(!1),nt(fd),ae(s.CULL_FACE),F(Ki);function ae(q){v[q]!==!0&&(s.enable(q),v[q]=!0)}function pe(q){v[q]!==!1&&(s.disable(q),v[q]=!1)}function Te(q,Ce){return x[q]!==Ce?(s.bindFramebuffer(q,Ce),x[q]=Ce,q===s.DRAW_FRAMEBUFFER&&(x[s.FRAMEBUFFER]=Ce),q===s.FRAMEBUFFER&&(x[s.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Ee(q,Ce){let ce=S,ge=!1;if(q){ce=y.get(Ce),ce===void 0&&(ce=[],y.set(Ce,ce));const De=q.textures;if(ce.length!==De.length||ce[0]!==s.COLOR_ATTACHMENT0){for(let Pe=0,ot=De.length;Pe<ot;Pe++)ce[Pe]=s.COLOR_ATTACHMENT0+Pe;ce.length=De.length,ge=!0}}else ce[0]!==s.BACK&&(ce[0]=s.BACK,ge=!0);ge&&s.drawBuffers(ce)}function Ne(q){return M!==q?(s.useProgram(q),M=q,!0):!1}const Ke={[Dr]:s.FUNC_ADD,[Dg]:s.FUNC_SUBTRACT,[Ng]:s.FUNC_REVERSE_SUBTRACT};Ke[Ig]=s.MIN,Ke[Ug]=s.MAX;const Oe={[Fg]:s.ZERO,[Og]:s.ONE,[kg]:s.SRC_COLOR,[Yl]:s.SRC_ALPHA,[Wg]:s.SRC_ALPHA_SATURATE,[Vg]:s.DST_COLOR,[Bg]:s.DST_ALPHA,[zg]:s.ONE_MINUS_SRC_COLOR,[$l]:s.ONE_MINUS_SRC_ALPHA,[Gg]:s.ONE_MINUS_DST_COLOR,[Hg]:s.ONE_MINUS_DST_ALPHA,[Xg]:s.CONSTANT_COLOR,[jg]:s.ONE_MINUS_CONSTANT_COLOR,[qg]:s.CONSTANT_ALPHA,[Yg]:s.ONE_MINUS_CONSTANT_ALPHA};function F(q,Ce,ce,ge,De,Pe,ot,bt,Ot,yt){if(q===Ki){T===!0&&(pe(s.BLEND),T=!1);return}if(T===!1&&(ae(s.BLEND),T=!0),q!==Lg){if(q!==_||yt!==P){if((g!==Dr||C!==Dr)&&(s.blendEquation(s.FUNC_ADD),g=Dr,C=Dr),yt)switch(q){case ls:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case dd:s.blendFunc(s.ONE,s.ONE);break;case hd:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case pd:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}else switch(q){case ls:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case dd:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case hd:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case pd:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}I=null,D=null,z=null,k=null,O.set(0,0,0),G=0,_=q,P=yt}return}De=De||Ce,Pe=Pe||ce,ot=ot||ge,(Ce!==g||De!==C)&&(s.blendEquationSeparate(Ke[Ce],Ke[De]),g=Ce,C=De),(ce!==I||ge!==D||Pe!==z||ot!==k)&&(s.blendFuncSeparate(Oe[ce],Oe[ge],Oe[Pe],Oe[ot]),I=ce,D=ge,z=Pe,k=ot),(bt.equals(O)===!1||Ot!==G)&&(s.blendColor(bt.r,bt.g,bt.b,Ot),O.copy(bt),G=Ot),_=q,P=!1}function Tt(q,Ce){q.side===Ci?pe(s.CULL_FACE):ae(s.CULL_FACE);let ce=q.side===Dn;Ce&&(ce=!ce),tt(ce),q.blending===ls&&q.transparent===!1?F(Ki):F(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),u.setFunc(q.depthFunc),u.setTest(q.depthTest),u.setMask(q.depthWrite),l.setMask(q.colorWrite);const ge=q.stencilWrite;f.setTest(ge),ge&&(f.setMask(q.stencilWriteMask),f.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),f.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),xt(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?ae(s.SAMPLE_ALPHA_TO_COVERAGE):pe(s.SAMPLE_ALPHA_TO_COVERAGE)}function tt(q){R!==q&&(q?s.frontFace(s.CW):s.frontFace(s.CCW),R=q)}function nt(q){q!==bg?(ae(s.CULL_FACE),q!==H&&(q===fd?s.cullFace(s.BACK):q===Pg?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):pe(s.CULL_FACE),H=q}function Ve(q){q!==ie&&(Q&&s.lineWidth(q),ie=q)}function xt(q,Ce,ce){q?(ae(s.POLYGON_OFFSET_FILL),(Y!==Ce||de!==ce)&&(s.polygonOffset(Ce,ce),Y=Ce,de=ce)):pe(s.POLYGON_OFFSET_FILL)}function ke(q){q?ae(s.SCISSOR_TEST):pe(s.SCISSOR_TEST)}function N(q){q===void 0&&(q=s.TEXTURE0+me-1),he!==q&&(s.activeTexture(q),he=q)}function A(q,Ce,ce){ce===void 0&&(he===null?ce=s.TEXTURE0+me-1:ce=he);let ge=L[ce];ge===void 0&&(ge={type:void 0,texture:void 0},L[ce]=ge),(ge.type!==q||ge.texture!==Ce)&&(he!==ce&&(s.activeTexture(ce),he=ce),s.bindTexture(q,Ce||fe[q]),ge.type=q,ge.texture=Ce)}function se(){const q=L[he];q!==void 0&&q.type!==void 0&&(s.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function xe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ye(){try{s.compressedTexImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function _e(){try{s.texSubImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Xe(){try{s.texSubImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Le(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ue(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ct(){try{s.texStorage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function we(){try{s.texStorage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ze(){try{s.texImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Je(){try{s.texImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function it(q){ve.equals(q)===!1&&(s.scissor(q.x,q.y,q.z,q.w),ve.copy(q))}function Ge(q){X.equals(q)===!1&&(s.viewport(q.x,q.y,q.z,q.w),X.copy(q))}function ht(q,Ce){let ce=p.get(Ce);ce===void 0&&(ce=new WeakMap,p.set(Ce,ce));let ge=ce.get(q);ge===void 0&&(ge=s.getUniformBlockIndex(Ce,q.name),ce.set(q,ge))}function ft(q,Ce){const ge=p.get(Ce).get(q);h.get(Ce)!==ge&&(s.uniformBlockBinding(Ce,ge,q.__bindingPointIndex),h.set(Ce,ge))}function Ct(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),u.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),v={},he=null,L={},x={},y=new WeakMap,S=[],M=null,T=!1,_=null,g=null,I=null,D=null,C=null,z=null,k=null,O=new _t(0,0,0),G=0,P=!1,R=null,H=null,ie=null,Y=null,de=null,ve.set(0,0,s.canvas.width,s.canvas.height),X.set(0,0,s.canvas.width,s.canvas.height),l.reset(),u.reset(),f.reset()}return{buffers:{color:l,depth:u,stencil:f},enable:ae,disable:pe,bindFramebuffer:Te,drawBuffers:Ee,useProgram:Ne,setBlending:F,setMaterial:Tt,setFlipSided:tt,setCullFace:nt,setLineWidth:Ve,setPolygonOffset:xt,setScissorTest:ke,activeTexture:N,bindTexture:A,unbindTexture:se,compressedTexImage2D:xe,compressedTexImage3D:ye,texImage2D:ze,texImage3D:Je,updateUBOMapping:ht,uniformBlockBinding:ft,texStorage2D:ct,texStorage3D:we,texSubImage2D:_e,texSubImage3D:Xe,compressedTexSubImage2D:Le,compressedTexSubImage3D:Ue,scissor:it,viewport:Ge,reset:Ct}}function UE(s,e,n,r,a,l,u){const f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Rt,v=new WeakMap;let x;const y=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(N,A){return S?new OffscreenCanvas(N,A):Dc("canvas")}function T(N,A,se){let xe=1;const ye=ke(N);if((ye.width>se||ye.height>se)&&(xe=se/Math.max(ye.width,ye.height)),xe<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const _e=Math.floor(xe*ye.width),Xe=Math.floor(xe*ye.height);x===void 0&&(x=M(_e,Xe));const Le=A?M(_e,Xe):x;return Le.width=_e,Le.height=Xe,Le.getContext("2d").drawImage(N,0,0,_e,Xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ye.width+"x"+ye.height+") to ("+_e+"x"+Xe+")."),Le}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ye.width+"x"+ye.height+")."),N;return N}function _(N){return N.generateMipmaps}function g(N){s.generateMipmap(N)}function I(N){return N.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?s.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function D(N,A,se,xe,ye=!1){if(N!==null){if(s[N]!==void 0)return s[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let _e=A;if(A===s.RED&&(se===s.FLOAT&&(_e=s.R32F),se===s.HALF_FLOAT&&(_e=s.R16F),se===s.UNSIGNED_BYTE&&(_e=s.R8)),A===s.RED_INTEGER&&(se===s.UNSIGNED_BYTE&&(_e=s.R8UI),se===s.UNSIGNED_SHORT&&(_e=s.R16UI),se===s.UNSIGNED_INT&&(_e=s.R32UI),se===s.BYTE&&(_e=s.R8I),se===s.SHORT&&(_e=s.R16I),se===s.INT&&(_e=s.R32I)),A===s.RG&&(se===s.FLOAT&&(_e=s.RG32F),se===s.HALF_FLOAT&&(_e=s.RG16F),se===s.UNSIGNED_BYTE&&(_e=s.RG8)),A===s.RG_INTEGER&&(se===s.UNSIGNED_BYTE&&(_e=s.RG8UI),se===s.UNSIGNED_SHORT&&(_e=s.RG16UI),se===s.UNSIGNED_INT&&(_e=s.RG32UI),se===s.BYTE&&(_e=s.RG8I),se===s.SHORT&&(_e=s.RG16I),se===s.INT&&(_e=s.RG32I)),A===s.RGB_INTEGER&&(se===s.UNSIGNED_BYTE&&(_e=s.RGB8UI),se===s.UNSIGNED_SHORT&&(_e=s.RGB16UI),se===s.UNSIGNED_INT&&(_e=s.RGB32UI),se===s.BYTE&&(_e=s.RGB8I),se===s.SHORT&&(_e=s.RGB16I),se===s.INT&&(_e=s.RGB32I)),A===s.RGBA_INTEGER&&(se===s.UNSIGNED_BYTE&&(_e=s.RGBA8UI),se===s.UNSIGNED_SHORT&&(_e=s.RGBA16UI),se===s.UNSIGNED_INT&&(_e=s.RGBA32UI),se===s.BYTE&&(_e=s.RGBA8I),se===s.SHORT&&(_e=s.RGBA16I),se===s.INT&&(_e=s.RGBA32I)),A===s.RGB&&se===s.UNSIGNED_INT_5_9_9_9_REV&&(_e=s.RGB9_E5),A===s.RGBA){const Xe=ye?la:Dt.getTransfer(xe);se===s.FLOAT&&(_e=s.RGBA32F),se===s.HALF_FLOAT&&(_e=s.RGBA16F),se===s.UNSIGNED_BYTE&&(_e=Xe===It?s.SRGB8_ALPHA8:s.RGBA8),se===s.UNSIGNED_SHORT_4_4_4_4&&(_e=s.RGBA4),se===s.UNSIGNED_SHORT_5_5_5_1&&(_e=s.RGB5_A1)}return(_e===s.R16F||_e===s.R32F||_e===s.RG16F||_e===s.RG32F||_e===s.RGBA16F||_e===s.RGBA32F)&&e.get("EXT_color_buffer_float"),_e}function C(N,A){let se;return N?A===null||A===Or||A===hs?se=s.DEPTH24_STENCIL8:A===bi?se=s.DEPTH32F_STENCIL8:A===co&&(se=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Or||A===hs?se=s.DEPTH_COMPONENT24:A===bi?se=s.DEPTH_COMPONENT32F:A===co&&(se=s.DEPTH_COMPONENT16),se}function z(N,A){return _(N)===!0||N.isFramebufferTexture&&N.minFilter!==si&&N.minFilter!==vi?Math.log2(Math.max(A.width,A.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?A.mipmaps.length:1}function k(N){const A=N.target;A.removeEventListener("dispose",k),G(A),A.isVideoTexture&&v.delete(A)}function O(N){const A=N.target;A.removeEventListener("dispose",O),R(A)}function G(N){const A=r.get(N);if(A.__webglInit===void 0)return;const se=N.source,xe=y.get(se);if(xe){const ye=xe[A.__cacheKey];ye.usedTimes--,ye.usedTimes===0&&P(N),Object.keys(xe).length===0&&y.delete(se)}r.remove(N)}function P(N){const A=r.get(N);s.deleteTexture(A.__webglTexture);const se=N.source,xe=y.get(se);delete xe[A.__cacheKey],u.memory.textures--}function R(N){const A=r.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),r.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let xe=0;xe<6;xe++){if(Array.isArray(A.__webglFramebuffer[xe]))for(let ye=0;ye<A.__webglFramebuffer[xe].length;ye++)s.deleteFramebuffer(A.__webglFramebuffer[xe][ye]);else s.deleteFramebuffer(A.__webglFramebuffer[xe]);A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer[xe])}else{if(Array.isArray(A.__webglFramebuffer))for(let xe=0;xe<A.__webglFramebuffer.length;xe++)s.deleteFramebuffer(A.__webglFramebuffer[xe]);else s.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&s.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let xe=0;xe<A.__webglColorRenderbuffer.length;xe++)A.__webglColorRenderbuffer[xe]&&s.deleteRenderbuffer(A.__webglColorRenderbuffer[xe]);A.__webglDepthRenderbuffer&&s.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const se=N.textures;for(let xe=0,ye=se.length;xe<ye;xe++){const _e=r.get(se[xe]);_e.__webglTexture&&(s.deleteTexture(_e.__webglTexture),u.memory.textures--),r.remove(se[xe])}r.remove(N)}let H=0;function ie(){H=0}function Y(){const N=H;return N>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+a.maxTextures),H+=1,N}function de(N){const A=[];return A.push(N.wrapS),A.push(N.wrapT),A.push(N.wrapR||0),A.push(N.magFilter),A.push(N.minFilter),A.push(N.anisotropy),A.push(N.internalFormat),A.push(N.format),A.push(N.type),A.push(N.generateMipmaps),A.push(N.premultiplyAlpha),A.push(N.flipY),A.push(N.unpackAlignment),A.push(N.colorSpace),A.join()}function me(N,A){const se=r.get(N);if(N.isVideoTexture&&Ve(N),N.isRenderTargetTexture===!1&&N.version>0&&se.__version!==N.version){const xe=N.image;if(xe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(xe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(se,N,A);return}}n.bindTexture(s.TEXTURE_2D,se.__webglTexture,s.TEXTURE0+A)}function Q(N,A){const se=r.get(N);if(N.version>0&&se.__version!==N.version){X(se,N,A);return}n.bindTexture(s.TEXTURE_2D_ARRAY,se.__webglTexture,s.TEXTURE0+A)}function re(N,A){const se=r.get(N);if(N.version>0&&se.__version!==N.version){X(se,N,A);return}n.bindTexture(s.TEXTURE_3D,se.__webglTexture,s.TEXTURE0+A)}function B(N,A){const se=r.get(N);if(N.version>0&&se.__version!==N.version){ne(se,N,A);return}n.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture,s.TEXTURE0+A)}const he={[lo]:s.REPEAT,[Ir]:s.CLAMP_TO_EDGE,[sc]:s.MIRRORED_REPEAT},L={[si]:s.NEAREST,[i0]:s.NEAREST_MIPMAP_NEAREST,[ta]:s.NEAREST_MIPMAP_LINEAR,[vi]:s.LINEAR,[Xl]:s.LINEAR_MIPMAP_NEAREST,[Ur]:s.LINEAR_MIPMAP_LINEAR},E={[a0]:s.NEVER,[h0]:s.ALWAYS,[l0]:s.LESS,[zd]:s.LEQUAL,[c0]:s.EQUAL,[d0]:s.GEQUAL,[u0]:s.GREATER,[f0]:s.NOTEQUAL};function W(N,A){if(A.type===bi&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===vi||A.magFilter===Xl||A.magFilter===ta||A.magFilter===Ur||A.minFilter===vi||A.minFilter===Xl||A.minFilter===ta||A.minFilter===Ur)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(N,s.TEXTURE_WRAP_S,he[A.wrapS]),s.texParameteri(N,s.TEXTURE_WRAP_T,he[A.wrapT]),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,he[A.wrapR]),s.texParameteri(N,s.TEXTURE_MAG_FILTER,L[A.magFilter]),s.texParameteri(N,s.TEXTURE_MIN_FILTER,L[A.minFilter]),A.compareFunction&&(s.texParameteri(N,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(N,s.TEXTURE_COMPARE_FUNC,E[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===si||A.minFilter!==ta&&A.minFilter!==Ur||A.type===bi&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||r.get(A).__currentAnisotropy){const se=e.get("EXT_texture_filter_anisotropic");s.texParameterf(N,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,a.getMaxAnisotropy())),r.get(A).__currentAnisotropy=A.anisotropy}}}function ve(N,A){let se=!1;N.__webglInit===void 0&&(N.__webglInit=!0,A.addEventListener("dispose",k));const xe=A.source;let ye=y.get(xe);ye===void 0&&(ye={},y.set(xe,ye));const _e=de(A);if(_e!==N.__cacheKey){ye[_e]===void 0&&(ye[_e]={texture:s.createTexture(),usedTimes:0},u.memory.textures++,se=!0),ye[_e].usedTimes++;const Xe=ye[N.__cacheKey];Xe!==void 0&&(ye[N.__cacheKey].usedTimes--,Xe.usedTimes===0&&P(A)),N.__cacheKey=_e,N.__webglTexture=ye[_e].texture}return se}function X(N,A,se){let xe=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(xe=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(xe=s.TEXTURE_3D);const ye=ve(N,A),_e=A.source;n.bindTexture(xe,N.__webglTexture,s.TEXTURE0+se);const Xe=r.get(_e);if(_e.version!==Xe.__version||ye===!0){n.activeTexture(s.TEXTURE0+se);const Le=Dt.getPrimaries(Dt.workingColorSpace),Ue=A.colorSpace===$i?null:Dt.getPrimaries(A.colorSpace),ct=A.colorSpace===$i||Le===Ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);let we=T(A.image,!1,a.maxTextureSize);we=xt(A,we);const ze=l.convert(A.format,A.colorSpace),Je=l.convert(A.type);let it=D(A.internalFormat,ze,Je,A.colorSpace,A.isVideoTexture);W(xe,A);let Ge;const ht=A.mipmaps,ft=A.isVideoTexture!==!0,Ct=Xe.__version===void 0||ye===!0,q=_e.dataReady,Ce=z(A,we);if(A.isDepthTexture)it=C(A.format===ps,A.type),Ct&&(ft?n.texStorage2D(s.TEXTURE_2D,1,it,we.width,we.height):n.texImage2D(s.TEXTURE_2D,0,it,we.width,we.height,0,ze,Je,null));else if(A.isDataTexture)if(ht.length>0){ft&&Ct&&n.texStorage2D(s.TEXTURE_2D,Ce,it,ht[0].width,ht[0].height);for(let ce=0,ge=ht.length;ce<ge;ce++)Ge=ht[ce],ft?q&&n.texSubImage2D(s.TEXTURE_2D,ce,0,0,Ge.width,Ge.height,ze,Je,Ge.data):n.texImage2D(s.TEXTURE_2D,ce,it,Ge.width,Ge.height,0,ze,Je,Ge.data);A.generateMipmaps=!1}else ft?(Ct&&n.texStorage2D(s.TEXTURE_2D,Ce,it,we.width,we.height),q&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,we.width,we.height,ze,Je,we.data)):n.texImage2D(s.TEXTURE_2D,0,it,we.width,we.height,0,ze,Je,we.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){ft&&Ct&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,it,ht[0].width,ht[0].height,we.depth);for(let ce=0,ge=ht.length;ce<ge;ce++)if(Ge=ht[ce],A.format!==ri)if(ze!==null)if(ft){if(q)if(A.layerUpdates.size>0){const De=Qm(Ge.width,Ge.height,A.format,A.type);for(const Pe of A.layerUpdates){const ot=Ge.data.subarray(Pe*De/Ge.data.BYTES_PER_ELEMENT,(Pe+1)*De/Ge.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ce,0,0,Pe,Ge.width,Ge.height,1,ze,ot)}A.clearLayerUpdates()}else n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ce,0,0,0,Ge.width,Ge.height,we.depth,ze,Ge.data)}else n.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ce,it,Ge.width,Ge.height,we.depth,0,Ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ft?q&&n.texSubImage3D(s.TEXTURE_2D_ARRAY,ce,0,0,0,Ge.width,Ge.height,we.depth,ze,Je,Ge.data):n.texImage3D(s.TEXTURE_2D_ARRAY,ce,it,Ge.width,Ge.height,we.depth,0,ze,Je,Ge.data)}else{ft&&Ct&&n.texStorage2D(s.TEXTURE_2D,Ce,it,ht[0].width,ht[0].height);for(let ce=0,ge=ht.length;ce<ge;ce++)Ge=ht[ce],A.format!==ri?ze!==null?ft?q&&n.compressedTexSubImage2D(s.TEXTURE_2D,ce,0,0,Ge.width,Ge.height,ze,Ge.data):n.compressedTexImage2D(s.TEXTURE_2D,ce,it,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?q&&n.texSubImage2D(s.TEXTURE_2D,ce,0,0,Ge.width,Ge.height,ze,Je,Ge.data):n.texImage2D(s.TEXTURE_2D,ce,it,Ge.width,Ge.height,0,ze,Je,Ge.data)}else if(A.isDataArrayTexture)if(ft){if(Ct&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,it,we.width,we.height,we.depth),q)if(A.layerUpdates.size>0){const ce=Qm(we.width,we.height,A.format,A.type);for(const ge of A.layerUpdates){const De=we.data.subarray(ge*ce/we.data.BYTES_PER_ELEMENT,(ge+1)*ce/we.data.BYTES_PER_ELEMENT);n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ge,we.width,we.height,1,ze,Je,De)}A.clearLayerUpdates()}else n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,we.width,we.height,we.depth,ze,Je,we.data)}else n.texImage3D(s.TEXTURE_2D_ARRAY,0,it,we.width,we.height,we.depth,0,ze,Je,we.data);else if(A.isData3DTexture)ft?(Ct&&n.texStorage3D(s.TEXTURE_3D,Ce,it,we.width,we.height,we.depth),q&&n.texSubImage3D(s.TEXTURE_3D,0,0,0,0,we.width,we.height,we.depth,ze,Je,we.data)):n.texImage3D(s.TEXTURE_3D,0,it,we.width,we.height,we.depth,0,ze,Je,we.data);else if(A.isFramebufferTexture){if(Ct)if(ft)n.texStorage2D(s.TEXTURE_2D,Ce,it,we.width,we.height);else{let ce=we.width,ge=we.height;for(let De=0;De<Ce;De++)n.texImage2D(s.TEXTURE_2D,De,it,ce,ge,0,ze,Je,null),ce>>=1,ge>>=1}}else if(ht.length>0){if(ft&&Ct){const ce=ke(ht[0]);n.texStorage2D(s.TEXTURE_2D,Ce,it,ce.width,ce.height)}for(let ce=0,ge=ht.length;ce<ge;ce++)Ge=ht[ce],ft?q&&n.texSubImage2D(s.TEXTURE_2D,ce,0,0,ze,Je,Ge):n.texImage2D(s.TEXTURE_2D,ce,it,ze,Je,Ge);A.generateMipmaps=!1}else if(ft){if(Ct){const ce=ke(we);n.texStorage2D(s.TEXTURE_2D,Ce,it,ce.width,ce.height)}q&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,ze,Je,we)}else n.texImage2D(s.TEXTURE_2D,0,it,ze,Je,we);_(A)&&g(xe),Xe.__version=_e.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function ne(N,A,se){if(A.image.length!==6)return;const xe=ve(N,A),ye=A.source;n.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+se);const _e=r.get(ye);if(ye.version!==_e.__version||xe===!0){n.activeTexture(s.TEXTURE0+se);const Xe=Dt.getPrimaries(Dt.workingColorSpace),Le=A.colorSpace===$i?null:Dt.getPrimaries(A.colorSpace),Ue=A.colorSpace===$i||Xe===Le?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);const ct=A.isCompressedTexture||A.image[0].isCompressedTexture,we=A.image[0]&&A.image[0].isDataTexture,ze=[];for(let ge=0;ge<6;ge++)!ct&&!we?ze[ge]=T(A.image[ge],!0,a.maxCubemapSize):ze[ge]=we?A.image[ge].image:A.image[ge],ze[ge]=xt(A,ze[ge]);const Je=ze[0],it=l.convert(A.format,A.colorSpace),Ge=l.convert(A.type),ht=D(A.internalFormat,it,Ge,A.colorSpace),ft=A.isVideoTexture!==!0,Ct=_e.__version===void 0||xe===!0,q=ye.dataReady;let Ce=z(A,Je);W(s.TEXTURE_CUBE_MAP,A);let ce;if(ct){ft&&Ct&&n.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,ht,Je.width,Je.height);for(let ge=0;ge<6;ge++){ce=ze[ge].mipmaps;for(let De=0;De<ce.length;De++){const Pe=ce[De];A.format!==ri?it!==null?ft?q&&n.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,De,0,0,Pe.width,Pe.height,it,Pe.data):n.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,De,ht,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ft?q&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,De,0,0,Pe.width,Pe.height,it,Ge,Pe.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,De,ht,Pe.width,Pe.height,0,it,Ge,Pe.data)}}}else{if(ce=A.mipmaps,ft&&Ct){ce.length>0&&Ce++;const ge=ke(ze[0]);n.texStorage2D(s.TEXTURE_CUBE_MAP,Ce,ht,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(we){ft?q&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,ze[ge].width,ze[ge].height,it,Ge,ze[ge].data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,ht,ze[ge].width,ze[ge].height,0,it,Ge,ze[ge].data);for(let De=0;De<ce.length;De++){const ot=ce[De].image[ge].image;ft?q&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,De+1,0,0,ot.width,ot.height,it,Ge,ot.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,De+1,ht,ot.width,ot.height,0,it,Ge,ot.data)}}else{ft?q&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,it,Ge,ze[ge]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,ht,it,Ge,ze[ge]);for(let De=0;De<ce.length;De++){const Pe=ce[De];ft?q&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,De+1,0,0,it,Ge,Pe.image[ge]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,De+1,ht,it,Ge,Pe.image[ge])}}}_(A)&&g(s.TEXTURE_CUBE_MAP),_e.__version=ye.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function fe(N,A,se,xe,ye,_e){const Xe=l.convert(se.format,se.colorSpace),Le=l.convert(se.type),Ue=D(se.internalFormat,Xe,Le,se.colorSpace),ct=r.get(A),we=r.get(se);if(we.__renderTarget=A,!ct.__hasExternalTextures){const ze=Math.max(1,A.width>>_e),Je=Math.max(1,A.height>>_e);ye===s.TEXTURE_3D||ye===s.TEXTURE_2D_ARRAY?n.texImage3D(ye,_e,Ue,ze,Je,A.depth,0,Xe,Le,null):n.texImage2D(ye,_e,Ue,ze,Je,0,Xe,Le,null)}n.bindFramebuffer(s.FRAMEBUFFER,N),nt(A)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,xe,ye,we.__webglTexture,0,tt(A)):(ye===s.TEXTURE_2D||ye>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ye<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,xe,ye,we.__webglTexture,_e),n.bindFramebuffer(s.FRAMEBUFFER,null)}function ae(N,A,se){if(s.bindRenderbuffer(s.RENDERBUFFER,N),A.depthBuffer){const xe=A.depthTexture,ye=xe&&xe.isDepthTexture?xe.type:null,_e=C(A.stencilBuffer,ye),Xe=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Le=tt(A);nt(A)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Le,_e,A.width,A.height):se?s.renderbufferStorageMultisample(s.RENDERBUFFER,Le,_e,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,_e,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Xe,s.RENDERBUFFER,N)}else{const xe=A.textures;for(let ye=0;ye<xe.length;ye++){const _e=xe[ye],Xe=l.convert(_e.format,_e.colorSpace),Le=l.convert(_e.type),Ue=D(_e.internalFormat,Xe,Le,_e.colorSpace),ct=tt(A);se&&nt(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ct,Ue,A.width,A.height):nt(A)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ct,Ue,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,Ue,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function pe(N,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(s.FRAMEBUFFER,N),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const xe=r.get(A.depthTexture);xe.__renderTarget=A,(!xe.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),me(A.depthTexture,0);const ye=xe.__webglTexture,_e=tt(A);if(A.depthTexture.format===cs)nt(A)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ye,0,_e):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ye,0);else if(A.depthTexture.format===ps)nt(A)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ye,0,_e):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function Te(N){const A=r.get(N),se=N.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==N.depthTexture){const xe=N.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),xe){const ye=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,xe.removeEventListener("dispose",ye)};xe.addEventListener("dispose",ye),A.__depthDisposeCallback=ye}A.__boundDepthTexture=xe}if(N.depthTexture&&!A.__autoAllocateDepthBuffer){if(se)throw new Error("target.depthTexture not supported in Cube render targets");pe(A.__webglFramebuffer,N)}else if(se){A.__webglDepthbuffer=[];for(let xe=0;xe<6;xe++)if(n.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[xe]),A.__webglDepthbuffer[xe]===void 0)A.__webglDepthbuffer[xe]=s.createRenderbuffer(),ae(A.__webglDepthbuffer[xe],N,!1);else{const ye=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_e=A.__webglDepthbuffer[xe];s.bindRenderbuffer(s.RENDERBUFFER,_e),s.framebufferRenderbuffer(s.FRAMEBUFFER,ye,s.RENDERBUFFER,_e)}}else if(n.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=s.createRenderbuffer(),ae(A.__webglDepthbuffer,N,!1);else{const xe=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ye=A.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ye),s.framebufferRenderbuffer(s.FRAMEBUFFER,xe,s.RENDERBUFFER,ye)}n.bindFramebuffer(s.FRAMEBUFFER,null)}function Ee(N,A,se){const xe=r.get(N);A!==void 0&&fe(xe.__webglFramebuffer,N,N.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),se!==void 0&&Te(N)}function Ne(N){const A=N.texture,se=r.get(N),xe=r.get(A);N.addEventListener("dispose",O);const ye=N.textures,_e=N.isWebGLCubeRenderTarget===!0,Xe=ye.length>1;if(Xe||(xe.__webglTexture===void 0&&(xe.__webglTexture=s.createTexture()),xe.__version=A.version,u.memory.textures++),_e){se.__webglFramebuffer=[];for(let Le=0;Le<6;Le++)if(A.mipmaps&&A.mipmaps.length>0){se.__webglFramebuffer[Le]=[];for(let Ue=0;Ue<A.mipmaps.length;Ue++)se.__webglFramebuffer[Le][Ue]=s.createFramebuffer()}else se.__webglFramebuffer[Le]=s.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){se.__webglFramebuffer=[];for(let Le=0;Le<A.mipmaps.length;Le++)se.__webglFramebuffer[Le]=s.createFramebuffer()}else se.__webglFramebuffer=s.createFramebuffer();if(Xe)for(let Le=0,Ue=ye.length;Le<Ue;Le++){const ct=r.get(ye[Le]);ct.__webglTexture===void 0&&(ct.__webglTexture=s.createTexture(),u.memory.textures++)}if(N.samples>0&&nt(N)===!1){se.__webglMultisampledFramebuffer=s.createFramebuffer(),se.__webglColorRenderbuffer=[],n.bindFramebuffer(s.FRAMEBUFFER,se.__webglMultisampledFramebuffer);for(let Le=0;Le<ye.length;Le++){const Ue=ye[Le];se.__webglColorRenderbuffer[Le]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,se.__webglColorRenderbuffer[Le]);const ct=l.convert(Ue.format,Ue.colorSpace),we=l.convert(Ue.type),ze=D(Ue.internalFormat,ct,we,Ue.colorSpace,N.isXRRenderTarget===!0),Je=tt(N);s.renderbufferStorageMultisample(s.RENDERBUFFER,Je,ze,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Le,s.RENDERBUFFER,se.__webglColorRenderbuffer[Le])}s.bindRenderbuffer(s.RENDERBUFFER,null),N.depthBuffer&&(se.__webglDepthRenderbuffer=s.createRenderbuffer(),ae(se.__webglDepthRenderbuffer,N,!0)),n.bindFramebuffer(s.FRAMEBUFFER,null)}}if(_e){n.bindTexture(s.TEXTURE_CUBE_MAP,xe.__webglTexture),W(s.TEXTURE_CUBE_MAP,A);for(let Le=0;Le<6;Le++)if(A.mipmaps&&A.mipmaps.length>0)for(let Ue=0;Ue<A.mipmaps.length;Ue++)fe(se.__webglFramebuffer[Le][Ue],N,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Ue);else fe(se.__webglFramebuffer[Le],N,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0);_(A)&&g(s.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Xe){for(let Le=0,Ue=ye.length;Le<Ue;Le++){const ct=ye[Le],we=r.get(ct);n.bindTexture(s.TEXTURE_2D,we.__webglTexture),W(s.TEXTURE_2D,ct),fe(se.__webglFramebuffer,N,ct,s.COLOR_ATTACHMENT0+Le,s.TEXTURE_2D,0),_(ct)&&g(s.TEXTURE_2D)}n.unbindTexture()}else{let Le=s.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Le=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(Le,xe.__webglTexture),W(Le,A),A.mipmaps&&A.mipmaps.length>0)for(let Ue=0;Ue<A.mipmaps.length;Ue++)fe(se.__webglFramebuffer[Ue],N,A,s.COLOR_ATTACHMENT0,Le,Ue);else fe(se.__webglFramebuffer,N,A,s.COLOR_ATTACHMENT0,Le,0);_(A)&&g(Le),n.unbindTexture()}N.depthBuffer&&Te(N)}function Ke(N){const A=N.textures;for(let se=0,xe=A.length;se<xe;se++){const ye=A[se];if(_(ye)){const _e=I(N),Xe=r.get(ye).__webglTexture;n.bindTexture(_e,Xe),g(_e),n.unbindTexture()}}}const Oe=[],F=[];function Tt(N){if(N.samples>0){if(nt(N)===!1){const A=N.textures,se=N.width,xe=N.height;let ye=s.COLOR_BUFFER_BIT;const _e=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Xe=r.get(N),Le=A.length>1;if(Le)for(let Ue=0;Ue<A.length;Ue++)n.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.RENDERBUFFER,null),n.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.TEXTURE_2D,null,0);n.bindFramebuffer(s.READ_FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Xe.__webglFramebuffer);for(let Ue=0;Ue<A.length;Ue++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(ye|=s.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(ye|=s.STENCIL_BUFFER_BIT)),Le){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Xe.__webglColorRenderbuffer[Ue]);const ct=r.get(A[Ue]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ct,0)}s.blitFramebuffer(0,0,se,xe,0,0,se,xe,ye,s.NEAREST),h===!0&&(Oe.length=0,F.length=0,Oe.push(s.COLOR_ATTACHMENT0+Ue),N.depthBuffer&&N.resolveDepthBuffer===!1&&(Oe.push(_e),F.push(_e),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,F)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Oe))}if(n.bindFramebuffer(s.READ_FRAMEBUFFER,null),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Le)for(let Ue=0;Ue<A.length;Ue++){n.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.RENDERBUFFER,Xe.__webglColorRenderbuffer[Ue]);const ct=r.get(A[Ue]).__webglTexture;n.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ue,s.TEXTURE_2D,ct,0)}n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Xe.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&h){const A=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[A])}}}function tt(N){return Math.min(a.maxSamples,N.samples)}function nt(N){const A=r.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Ve(N){const A=u.render.frame;v.get(N)!==A&&(v.set(N,A),N.update())}function xt(N,A){const se=N.colorSpace,xe=N.format,ye=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||se!==ms&&se!==$i&&(Dt.getTransfer(se)===It?(xe!==ri||ye!==Li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",se)),A}function ke(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(p.width=N.naturalWidth||N.width,p.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(p.width=N.displayWidth,p.height=N.displayHeight):(p.width=N.width,p.height=N.height),p}this.allocateTextureUnit=Y,this.resetTextureUnits=ie,this.setTexture2D=me,this.setTexture2DArray=Q,this.setTexture3D=re,this.setTextureCube=B,this.rebindTextures=Ee,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=nt}function H0(s,e){function n(r,a=$i){let l;const u=Dt.getTransfer(a);if(r===Li)return s.UNSIGNED_BYTE;if(r===Fc)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Oc)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Pd)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Cd)return s.BYTE;if(r===bd)return s.SHORT;if(r===co)return s.UNSIGNED_SHORT;if(r===Uc)return s.INT;if(r===Or)return s.UNSIGNED_INT;if(r===bi)return s.FLOAT;if(r===fo)return s.HALF_FLOAT;if(r===Ld)return s.ALPHA;if(r===Dd)return s.RGB;if(r===ri)return s.RGBA;if(r===Nd)return s.LUMINANCE;if(r===Id)return s.LUMINANCE_ALPHA;if(r===cs)return s.DEPTH_COMPONENT;if(r===ps)return s.DEPTH_STENCIL;if(r===Ud)return s.RED;if(r===kc)return s.RED_INTEGER;if(r===Fd)return s.RG;if(r===zc)return s.RG_INTEGER;if(r===Bc)return s.RGBA_INTEGER;if(r===ia||r===ra||r===sa||r===oa)if(u===It)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===ia)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ra)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===sa)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===oa)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===ia)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ra)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===sa)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===oa)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===oc||r===ac||r===lc||r===cc)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===oc)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ac)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===lc)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===cc)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===uc||r===fc||r===dc)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===uc||r===fc)return u===It?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===dc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===hc||r===pc||r===mc||r===gc||r===vc||r===_c||r===xc||r===yc||r===Sc||r===Mc||r===Ec||r===wc||r===Tc||r===Ac)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===hc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===pc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===mc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===gc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===vc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===_c)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===xc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===yc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Sc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Mc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Ec)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===wc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Tc)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Ac)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===aa||r===Rc||r===Cc)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===aa)return u===It?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Rc)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Cc)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Od||r===bc||r===Pc||r===Lc)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===aa)return l.COMPRESSED_RED_RGTC1_EXT;if(r===bc)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Pc)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Lc)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===hs?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:n}}const FE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,OE=`
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

}`;class kE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,r){if(this.texture===null){const a=new An,l=e.properties.get(a);l.__webglTexture=n.texture,(n.depthNear!==r.depthNear||n.depthFar!==r.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,r=new er({vertexShader:FE,fragmentShader:OE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new lt(new tr(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zE extends gs{constructor(e,n){super();const r=this;let a=null,l=1,u=null,f="local-floor",h=1,p=null,v=null,x=null,y=null,S=null,M=null;const T=new kE,_=n.getContextAttributes();let g=null,I=null;const D=[],C=[],z=new Rt;let k=null;const O=new vn;O.viewport=new Ut;const G=new vn;G.viewport=new Ut;const P=[O,G],R=new U0;let H=null,ie=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ne=D[X];return ne===void 0&&(ne=new jl,D[X]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(X){let ne=D[X];return ne===void 0&&(ne=new jl,D[X]=ne),ne.getGripSpace()},this.getHand=function(X){let ne=D[X];return ne===void 0&&(ne=new jl,D[X]=ne),ne.getHandSpace()};function Y(X){const ne=C.indexOf(X.inputSource);if(ne===-1)return;const fe=D[ne];fe!==void 0&&(fe.update(X.inputSource,X.frame,p||u),fe.dispatchEvent({type:X.type,data:X.inputSource}))}function de(){a.removeEventListener("select",Y),a.removeEventListener("selectstart",Y),a.removeEventListener("selectend",Y),a.removeEventListener("squeeze",Y),a.removeEventListener("squeezestart",Y),a.removeEventListener("squeezeend",Y),a.removeEventListener("end",de),a.removeEventListener("inputsourceschange",me);for(let X=0;X<D.length;X++){const ne=C[X];ne!==null&&(C[X]=null,D[X].disconnect(ne))}H=null,ie=null,T.reset(),e.setRenderTarget(g),S=null,y=null,x=null,a=null,I=null,ve.stop(),r.isPresenting=!1,e.setPixelRatio(k),e.setSize(z.width,z.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){l=X,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){f=X,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(X){p=X},this.getBaseLayer=function(){return y!==null?y:S},this.getBinding=function(){return x},this.getFrame=function(){return M},this.getSession=function(){return a},this.setSession=async function(X){if(a=X,a!==null){if(g=e.getRenderTarget(),a.addEventListener("select",Y),a.addEventListener("selectstart",Y),a.addEventListener("selectend",Y),a.addEventListener("squeeze",Y),a.addEventListener("squeezestart",Y),a.addEventListener("squeezeend",Y),a.addEventListener("end",de),a.addEventListener("inputsourceschange",me),_.xrCompatible!==!0&&await n.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(z),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,ae=null,pe=null;_.depth&&(pe=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,fe=_.stencil?ps:cs,ae=_.stencil?hs:Or);const Te={colorFormat:n.RGBA8,depthFormat:pe,scaleFactor:l};x=new XRWebGLBinding(a,n),y=x.createProjectionLayer(Te),a.updateRenderState({layers:[y]}),e.setPixelRatio(1),e.setSize(y.textureWidth,y.textureHeight,!1),I=new kr(y.textureWidth,y.textureHeight,{format:ri,type:Li,depthTexture:new $d(y.textureWidth,y.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1})}else{const fe={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(a,n,fe),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),I=new kr(S.framebufferWidth,S.framebufferHeight,{format:ri,type:Li,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}I.isXRRenderTarget=!0,this.setFoveation(h),p=null,u=await a.requestReferenceSpace(f),ve.setContext(a),ve.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function me(X){for(let ne=0;ne<X.removed.length;ne++){const fe=X.removed[ne],ae=C.indexOf(fe);ae>=0&&(C[ae]=null,D[ae].disconnect(fe))}for(let ne=0;ne<X.added.length;ne++){const fe=X.added[ne];let ae=C.indexOf(fe);if(ae===-1){for(let Te=0;Te<D.length;Te++)if(Te>=C.length){C.push(fe),ae=Te;break}else if(C[Te]===null){C[Te]=fe,ae=Te;break}if(ae===-1)break}const pe=D[ae];pe&&pe.connect(fe)}}const Q=new K,re=new K;function B(X,ne,fe){Q.setFromMatrixPosition(ne.matrixWorld),re.setFromMatrixPosition(fe.matrixWorld);const ae=Q.distanceTo(re),pe=ne.projectionMatrix.elements,Te=fe.projectionMatrix.elements,Ee=pe[14]/(pe[10]-1),Ne=pe[14]/(pe[10]+1),Ke=(pe[9]+1)/pe[5],Oe=(pe[9]-1)/pe[5],F=(pe[8]-1)/pe[0],Tt=(Te[8]+1)/Te[0],tt=Ee*F,nt=Ee*Tt,Ve=ae/(-F+Tt),xt=Ve*-F;if(ne.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(xt),X.translateZ(Ve),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),pe[10]===-1)X.projectionMatrix.copy(ne.projectionMatrix),X.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const ke=Ee+Ve,N=Ne+Ve,A=tt-xt,se=nt+(ae-xt),xe=Ke*Ne/N*ke,ye=Oe*Ne/N*ke;X.projectionMatrix.makePerspective(A,se,xe,ye,ke,N),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function he(X,ne){ne===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ne.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(a===null)return;let ne=X.near,fe=X.far;T.texture!==null&&(T.depthNear>0&&(ne=T.depthNear),T.depthFar>0&&(fe=T.depthFar)),R.near=G.near=O.near=ne,R.far=G.far=O.far=fe,(H!==R.near||ie!==R.far)&&(a.updateRenderState({depthNear:R.near,depthFar:R.far}),H=R.near,ie=R.far),O.layers.mask=X.layers.mask|2,G.layers.mask=X.layers.mask|4,R.layers.mask=O.layers.mask|G.layers.mask;const ae=X.parent,pe=R.cameras;he(R,ae);for(let Te=0;Te<pe.length;Te++)he(pe[Te],ae);pe.length===2?B(R,O,G):R.projectionMatrix.copy(O.projectionMatrix),L(X,R,ae)};function L(X,ne,fe){fe===null?X.matrix.copy(ne.matrixWorld):(X.matrix.copy(fe.matrixWorld),X.matrix.invert(),X.matrix.multiply(ne.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ne.projectionMatrix),X.projectionMatrixInverse.copy(ne.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=_d*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(y===null&&S===null))return h},this.setFoveation=function(X){h=X,y!==null&&(y.fixedFoveation=X),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=X)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(R)};let E=null;function W(X,ne){if(v=ne.getViewerPose(p||u),M=ne,v!==null){const fe=v.views;S!==null&&(e.setRenderTargetFramebuffer(I,S.framebuffer),e.setRenderTarget(I));let ae=!1;fe.length!==R.cameras.length&&(R.cameras.length=0,ae=!0);for(let Ee=0;Ee<fe.length;Ee++){const Ne=fe[Ee];let Ke=null;if(S!==null)Ke=S.getViewport(Ne);else{const F=x.getViewSubImage(y,Ne);Ke=F.viewport,Ee===0&&(e.setRenderTargetTextures(I,F.colorTexture,y.ignoreDepthValues?void 0:F.depthStencilTexture),e.setRenderTarget(I))}let Oe=P[Ee];Oe===void 0&&(Oe=new vn,Oe.layers.enable(Ee),Oe.viewport=new Ut,P[Ee]=Oe),Oe.matrix.fromArray(Ne.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(Ne.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),Ee===0&&(R.matrix.copy(Oe.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),ae===!0&&R.cameras.push(Oe)}const pe=a.enabledFeatures;if(pe&&pe.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&x){const Ee=x.getDepthInformation(fe[0]);Ee&&Ee.isValid&&Ee.texture&&T.init(e,Ee,a.renderState)}}for(let fe=0;fe<D.length;fe++){const ae=C[fe],pe=D[fe];ae!==null&&pe!==void 0&&pe.update(ae,ne,p||u)}E&&E(X,ne),ne.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:ne}),M=null}const ve=new F0;ve.setAnimationLoop(W),this.setAnimationLoop=function(X){E=X},this.dispose=function(){}}}const rs=new yi,BE=new zt;function HE(s,e){function n(_,g){_.matrixAutoUpdate===!0&&_.updateMatrix(),g.value.copy(_.matrix)}function r(_,g){g.color.getRGB(_.fogColor.value,y0(s)),g.isFog?(_.fogNear.value=g.near,_.fogFar.value=g.far):g.isFogExp2&&(_.fogDensity.value=g.density)}function a(_,g,I,D,C){g.isMeshBasicMaterial||g.isMeshLambertMaterial?l(_,g):g.isMeshToonMaterial?(l(_,g),x(_,g)):g.isMeshPhongMaterial?(l(_,g),v(_,g)):g.isMeshStandardMaterial?(l(_,g),y(_,g),g.isMeshPhysicalMaterial&&S(_,g,C)):g.isMeshMatcapMaterial?(l(_,g),M(_,g)):g.isMeshDepthMaterial?l(_,g):g.isMeshDistanceMaterial?(l(_,g),T(_,g)):g.isMeshNormalMaterial?l(_,g):g.isLineBasicMaterial?(u(_,g),g.isLineDashedMaterial&&f(_,g)):g.isPointsMaterial?h(_,g,I,D):g.isSpriteMaterial?p(_,g):g.isShadowMaterial?(_.color.value.copy(g.color),_.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function l(_,g){_.opacity.value=g.opacity,g.color&&_.diffuse.value.copy(g.color),g.emissive&&_.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(_.map.value=g.map,n(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,n(g.alphaMap,_.alphaMapTransform)),g.bumpMap&&(_.bumpMap.value=g.bumpMap,n(g.bumpMap,_.bumpMapTransform),_.bumpScale.value=g.bumpScale,g.side===Dn&&(_.bumpScale.value*=-1)),g.normalMap&&(_.normalMap.value=g.normalMap,n(g.normalMap,_.normalMapTransform),_.normalScale.value.copy(g.normalScale),g.side===Dn&&_.normalScale.value.negate()),g.displacementMap&&(_.displacementMap.value=g.displacementMap,n(g.displacementMap,_.displacementMapTransform),_.displacementScale.value=g.displacementScale,_.displacementBias.value=g.displacementBias),g.emissiveMap&&(_.emissiveMap.value=g.emissiveMap,n(g.emissiveMap,_.emissiveMapTransform)),g.specularMap&&(_.specularMap.value=g.specularMap,n(g.specularMap,_.specularMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest);const I=e.get(g),D=I.envMap,C=I.envMapRotation;D&&(_.envMap.value=D,rs.copy(C),rs.x*=-1,rs.y*=-1,rs.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(rs.y*=-1,rs.z*=-1),_.envMapRotation.value.setFromMatrix4(BE.makeRotationFromEuler(rs)),_.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=g.reflectivity,_.ior.value=g.ior,_.refractionRatio.value=g.refractionRatio),g.lightMap&&(_.lightMap.value=g.lightMap,_.lightMapIntensity.value=g.lightMapIntensity,n(g.lightMap,_.lightMapTransform)),g.aoMap&&(_.aoMap.value=g.aoMap,_.aoMapIntensity.value=g.aoMapIntensity,n(g.aoMap,_.aoMapTransform))}function u(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,g.map&&(_.map.value=g.map,n(g.map,_.mapTransform))}function f(_,g){_.dashSize.value=g.dashSize,_.totalSize.value=g.dashSize+g.gapSize,_.scale.value=g.scale}function h(_,g,I,D){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.size.value=g.size*I,_.scale.value=D*.5,g.map&&(_.map.value=g.map,n(g.map,_.uvTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,n(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function p(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.rotation.value=g.rotation,g.map&&(_.map.value=g.map,n(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,n(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function v(_,g){_.specular.value.copy(g.specular),_.shininess.value=Math.max(g.shininess,1e-4)}function x(_,g){g.gradientMap&&(_.gradientMap.value=g.gradientMap)}function y(_,g){_.metalness.value=g.metalness,g.metalnessMap&&(_.metalnessMap.value=g.metalnessMap,n(g.metalnessMap,_.metalnessMapTransform)),_.roughness.value=g.roughness,g.roughnessMap&&(_.roughnessMap.value=g.roughnessMap,n(g.roughnessMap,_.roughnessMapTransform)),g.envMap&&(_.envMapIntensity.value=g.envMapIntensity)}function S(_,g,I){_.ior.value=g.ior,g.sheen>0&&(_.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),_.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(_.sheenColorMap.value=g.sheenColorMap,n(g.sheenColorMap,_.sheenColorMapTransform)),g.sheenRoughnessMap&&(_.sheenRoughnessMap.value=g.sheenRoughnessMap,n(g.sheenRoughnessMap,_.sheenRoughnessMapTransform))),g.clearcoat>0&&(_.clearcoat.value=g.clearcoat,_.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(_.clearcoatMap.value=g.clearcoatMap,n(g.clearcoatMap,_.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,n(g.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(_.clearcoatNormalMap.value=g.clearcoatNormalMap,n(g.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Dn&&_.clearcoatNormalScale.value.negate())),g.dispersion>0&&(_.dispersion.value=g.dispersion),g.iridescence>0&&(_.iridescence.value=g.iridescence,_.iridescenceIOR.value=g.iridescenceIOR,_.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(_.iridescenceMap.value=g.iridescenceMap,n(g.iridescenceMap,_.iridescenceMapTransform)),g.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=g.iridescenceThicknessMap,n(g.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),g.transmission>0&&(_.transmission.value=g.transmission,_.transmissionSamplerMap.value=I.texture,_.transmissionSamplerSize.value.set(I.width,I.height),g.transmissionMap&&(_.transmissionMap.value=g.transmissionMap,n(g.transmissionMap,_.transmissionMapTransform)),_.thickness.value=g.thickness,g.thicknessMap&&(_.thicknessMap.value=g.thicknessMap,n(g.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=g.attenuationDistance,_.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(_.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(_.anisotropyMap.value=g.anisotropyMap,n(g.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=g.specularIntensity,_.specularColor.value.copy(g.specularColor),g.specularColorMap&&(_.specularColorMap.value=g.specularColorMap,n(g.specularColorMap,_.specularColorMapTransform)),g.specularIntensityMap&&(_.specularIntensityMap.value=g.specularIntensityMap,n(g.specularIntensityMap,_.specularIntensityMapTransform))}function M(_,g){g.matcap&&(_.matcap.value=g.matcap)}function T(_,g){const I=e.get(g).light;_.referencePosition.value.setFromMatrixPosition(I.matrixWorld),_.nearDistance.value=I.shadow.camera.near,_.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function VE(s,e,n,r){let a={},l={},u=[];const f=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(I,D){const C=D.program;r.uniformBlockBinding(I,C)}function p(I,D){let C=a[I.id];C===void 0&&(M(I),C=v(I),a[I.id]=C,I.addEventListener("dispose",_));const z=D.program;r.updateUBOMapping(I,z);const k=e.render.frame;l[I.id]!==k&&(y(I),l[I.id]=k)}function v(I){const D=x();I.__bindingPointIndex=D;const C=s.createBuffer(),z=I.__size,k=I.usage;return s.bindBuffer(s.UNIFORM_BUFFER,C),s.bufferData(s.UNIFORM_BUFFER,z,k),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,D,C),C}function x(){for(let I=0;I<f;I++)if(u.indexOf(I)===-1)return u.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(I){const D=a[I.id],C=I.uniforms,z=I.__cache;s.bindBuffer(s.UNIFORM_BUFFER,D);for(let k=0,O=C.length;k<O;k++){const G=Array.isArray(C[k])?C[k]:[C[k]];for(let P=0,R=G.length;P<R;P++){const H=G[P];if(S(H,k,P,z)===!0){const ie=H.__offset,Y=Array.isArray(H.value)?H.value:[H.value];let de=0;for(let me=0;me<Y.length;me++){const Q=Y[me],re=T(Q);typeof Q=="number"||typeof Q=="boolean"?(H.__data[0]=Q,s.bufferSubData(s.UNIFORM_BUFFER,ie+de,H.__data)):Q.isMatrix3?(H.__data[0]=Q.elements[0],H.__data[1]=Q.elements[1],H.__data[2]=Q.elements[2],H.__data[3]=0,H.__data[4]=Q.elements[3],H.__data[5]=Q.elements[4],H.__data[6]=Q.elements[5],H.__data[7]=0,H.__data[8]=Q.elements[6],H.__data[9]=Q.elements[7],H.__data[10]=Q.elements[8],H.__data[11]=0):(Q.toArray(H.__data,de),de+=re.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,ie,H.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(I,D,C,z){const k=I.value,O=D+"_"+C;if(z[O]===void 0)return typeof k=="number"||typeof k=="boolean"?z[O]=k:z[O]=k.clone(),!0;{const G=z[O];if(typeof k=="number"||typeof k=="boolean"){if(G!==k)return z[O]=k,!0}else if(G.equals(k)===!1)return G.copy(k),!0}return!1}function M(I){const D=I.uniforms;let C=0;const z=16;for(let O=0,G=D.length;O<G;O++){const P=Array.isArray(D[O])?D[O]:[D[O]];for(let R=0,H=P.length;R<H;R++){const ie=P[R],Y=Array.isArray(ie.value)?ie.value:[ie.value];for(let de=0,me=Y.length;de<me;de++){const Q=Y[de],re=T(Q),B=C%z,he=B%re.boundary,L=B+he;C+=he,L!==0&&z-L<re.storage&&(C+=z-L),ie.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),ie.__offset=C,C+=re.storage}}}const k=C%z;return k>0&&(C+=z-k),I.__size=C,I.__cache={},this}function T(I){const D={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(D.boundary=4,D.storage=4):I.isVector2?(D.boundary=8,D.storage=8):I.isVector3||I.isColor?(D.boundary=16,D.storage=12):I.isVector4?(D.boundary=16,D.storage=16):I.isMatrix3?(D.boundary=48,D.storage=48):I.isMatrix4?(D.boundary=64,D.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),D}function _(I){const D=I.target;D.removeEventListener("dispose",_);const C=u.indexOf(D.__bindingPointIndex);u.splice(C,1),s.deleteBuffer(a[D.id]),delete a[D.id],delete l[D.id]}function g(){for(const I in a)s.deleteBuffer(a[I]);u=[],a={},l={}}return{bind:h,update:p,dispose:g}}class V0{constructor(e={}){const{canvas:n=m0(),context:r=null,depth:a=!0,stencil:l=!1,alpha:u=!1,antialias:f=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:p=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:x=!1,reverseDepthBuffer:y=!1}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=u;const M=new Uint32Array(4),T=new Int32Array(4);let _=null,g=null;const I=[],D=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Gn,this.toneMapping=Zi,this.toneMappingExposure=1;const C=this;let z=!1,k=0,O=0,G=null,P=-1,R=null;const H=new Ut,ie=new Ut;let Y=null;const de=new _t(0);let me=0,Q=n.width,re=n.height,B=1,he=null,L=null;const E=new Ut(0,0,Q,re),W=new Ut(0,0,Q,re);let ve=!1;const X=new Vc;let ne=!1,fe=!1;this.transmissionResolutionScale=1;const ae=new zt,pe=new zt,Te=new K,Ee=new Ut,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ke=!1;function Oe(){return G===null?B:1}let F=r;function Tt(b,$){return n.getContext(b,$)}try{const b={alpha:!0,depth:a,stencil:l,antialias:f,premultipliedAlpha:h,preserveDrawingBuffer:p,powerPreference:v,failIfMajorPerformanceCaveat:x};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Ic}`),n.addEventListener("webglcontextlost",ge,!1),n.addEventListener("webglcontextrestored",De,!1),n.addEventListener("webglcontextcreationerror",Pe,!1),F===null){const $="webgl2";if(F=Tt($,b),F===null)throw Tt($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let tt,nt,Ve,xt,ke,N,A,se,xe,ye,_e,Xe,Le,Ue,ct,we,ze,Je,it,Ge,ht,ft,Ct,q;function Ce(){tt=new eM(F),tt.init(),ft=new H0(F,tt),nt=new YS(F,tt,e,ft),Ve=new IE(F,tt),nt.reverseDepthBuffer&&y&&Ve.buffers.depth.setReversed(!0),xt=new iM(F),ke=new SE,N=new UE(F,tt,Ve,ke,nt,ft,xt),A=new KS(C),se=new JS(C),xe=new ux(F),Ct=new jS(F,xe),ye=new tM(F,xe,xt,Ct),_e=new sM(F,ye,xe,xt),it=new rM(F,nt,N),we=new $S(ke),Xe=new yE(C,A,se,tt,nt,Ct,we),Le=new HE(C,ke),Ue=new EE,ct=new bE(tt),Je=new XS(C,A,se,Ve,_e,S,h),ze=new DE(C,_e,nt),q=new VE(F,xt,nt,Ve),Ge=new qS(F,tt,xt),ht=new nM(F,tt,xt),xt.programs=Xe.programs,C.capabilities=nt,C.extensions=tt,C.properties=ke,C.renderLists=Ue,C.shadowMap=ze,C.state=Ve,C.info=xt}Ce();const ce=new zE(C,F);this.xr=ce,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const b=tt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=tt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(b){b!==void 0&&(B=b,this.setSize(Q,re,!1))},this.getSize=function(b){return b.set(Q,re)},this.setSize=function(b,$,le=!0){if(ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=b,re=$,n.width=Math.floor(b*B),n.height=Math.floor($*B),le===!0&&(n.style.width=b+"px",n.style.height=$+"px"),this.setViewport(0,0,b,$)},this.getDrawingBufferSize=function(b){return b.set(Q*B,re*B).floor()},this.setDrawingBufferSize=function(b,$,le){Q=b,re=$,B=le,n.width=Math.floor(b*le),n.height=Math.floor($*le),this.setViewport(0,0,b,$)},this.getCurrentViewport=function(b){return b.copy(H)},this.getViewport=function(b){return b.copy(E)},this.setViewport=function(b,$,le,te){b.isVector4?E.set(b.x,b.y,b.z,b.w):E.set(b,$,le,te),Ve.viewport(H.copy(E).multiplyScalar(B).round())},this.getScissor=function(b){return b.copy(W)},this.setScissor=function(b,$,le,te){b.isVector4?W.set(b.x,b.y,b.z,b.w):W.set(b,$,le,te),Ve.scissor(ie.copy(W).multiplyScalar(B).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(b){Ve.setScissorTest(ve=b)},this.setOpaqueSort=function(b){he=b},this.setTransparentSort=function(b){L=b},this.getClearColor=function(b){return b.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(b=!0,$=!0,le=!0){let te=0;if(b){let Z=!1;if(G!==null){const Re=G.texture.format;Z=Re===Bc||Re===zc||Re===kc}if(Z){const Re=G.texture.type,Fe=Re===Li||Re===Or||Re===co||Re===hs||Re===Fc||Re===Oc,Be=Je.getClearColor(),je=Je.getClearAlpha(),ut=Be.r,at=Be.g,Ye=Be.b;Fe?(M[0]=ut,M[1]=at,M[2]=Ye,M[3]=je,F.clearBufferuiv(F.COLOR,0,M)):(T[0]=ut,T[1]=at,T[2]=Ye,T[3]=je,F.clearBufferiv(F.COLOR,0,T))}else te|=F.COLOR_BUFFER_BIT}$&&(te|=F.DEPTH_BUFFER_BIT),le&&(te|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ge,!1),n.removeEventListener("webglcontextrestored",De,!1),n.removeEventListener("webglcontextcreationerror",Pe,!1),Je.dispose(),Ue.dispose(),ct.dispose(),ke.dispose(),A.dispose(),se.dispose(),_e.dispose(),Ct.dispose(),q.dispose(),Xe.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",xs),ce.removeEventListener("sessionend",nr),Di.stop()};function ge(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),z=!0}function De(){console.log("THREE.WebGLRenderer: Context Restored."),z=!1;const b=xt.autoReset,$=ze.enabled,le=ze.autoUpdate,te=ze.needsUpdate,Z=ze.type;Ce(),xt.autoReset=b,ze.enabled=$,ze.autoUpdate=le,ze.needsUpdate=te,ze.type=Z}function Pe(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ot(b){const $=b.target;$.removeEventListener("dispose",ot),bt($)}function bt(b){Ot(b),ke.remove(b)}function Ot(b){const $=ke.get(b).programs;$!==void 0&&($.forEach(function(le){Xe.releaseProgram(le)}),b.isShaderMaterial&&Xe.releaseShaderCache(b))}this.renderBufferDirect=function(b,$,le,te,Z,Re){$===null&&($=Ne);const Fe=Z.isMesh&&Z.matrixWorld.determinant()<0,Be=ga(b,$,le,te,Z);Ve.setMaterial(te,Fe);let je=le.index,ut=1;if(te.wireframe===!0){if(je=ye.getWireframeAttribute(le),je===void 0)return;ut=2}const at=le.drawRange,Ye=le.attributes.position;let wt=at.start*ut,pt=(at.start+at.count)*ut;Re!==null&&(wt=Math.max(wt,Re.start*ut),pt=Math.min(pt,(Re.start+Re.count)*ut)),je!==null?(wt=Math.max(wt,0),pt=Math.min(pt,je.count)):Ye!=null&&(wt=Math.max(wt,0),pt=Math.min(pt,Ye.count));const qt=pt-wt;if(qt<0||qt===1/0)return;Ct.setup(Z,te,Be,le,je);let Vt,At=Ge;if(je!==null&&(Vt=xe.get(je),At=ht,At.setIndex(Vt)),Z.isMesh)te.wireframe===!0?(Ve.setLineWidth(te.wireframeLinewidth*Oe()),At.setMode(F.LINES)):At.setMode(F.TRIANGLES);else if(Z.isLine){let et=te.linewidth;et===void 0&&(et=1),Ve.setLineWidth(et*Oe()),Z.isLineSegments?At.setMode(F.LINES):Z.isLineLoop?At.setMode(F.LINE_LOOP):At.setMode(F.LINE_STRIP)}else Z.isPoints?At.setMode(F.POINTS):Z.isSprite&&At.setMode(F.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)At.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))At.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const et=Z._multiDrawStarts,Yt=Z._multiDrawCounts,Et=Z._multiDrawCount,_n=je?xe.get(je).bytesPerElement:1,rr=ke.get(te).currentProgram.getUniforms();for(let Cn=0;Cn<Et;Cn++)rr.setValue(F,"_gl_DrawID",Cn),At.render(et[Cn]/_n,Yt[Cn])}else if(Z.isInstancedMesh)At.renderInstances(wt,qt,Z.count);else if(le.isInstancedBufferGeometry){const et=le._maxInstanceCount!==void 0?le._maxInstanceCount:1/0,Yt=Math.min(le.instanceCount,et);At.renderInstances(wt,qt,Yt)}else At.render(wt,qt)};function yt(b,$,le){b.transparent===!0&&b.side===Ci&&b.forceSinglePass===!1?(b.side=Dn,b.needsUpdate=!0,ys(b,$,le),b.side=Ji,b.needsUpdate=!0,ys(b,$,le),b.side=Ci):ys(b,$,le)}this.compile=function(b,$,le=null){le===null&&(le=b),g=ct.get(le),g.init($),D.push(g),le.traverseVisible(function(Z){Z.isLight&&Z.layers.test($.layers)&&(g.pushLight(Z),Z.castShadow&&g.pushShadow(Z))}),b!==le&&b.traverseVisible(function(Z){Z.isLight&&Z.layers.test($.layers)&&(g.pushLight(Z),Z.castShadow&&g.pushShadow(Z))}),g.setupLights();const te=new Set;return b.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const Re=Z.material;if(Re)if(Array.isArray(Re))for(let Fe=0;Fe<Re.length;Fe++){const Be=Re[Fe];yt(Be,le,Z),te.add(Be)}else yt(Re,le,Z),te.add(Re)}),D.pop(),g=null,te},this.compileAsync=function(b,$,le=null){const te=this.compile(b,$,le);return new Promise(Z=>{function Re(){if(te.forEach(function(Fe){ke.get(Fe).currentProgram.isReady()&&te.delete(Fe)}),te.size===0){Z(b);return}setTimeout(Re,10)}tt.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let Un=null;function Rn(b){Un&&Un(b)}function xs(){Di.stop()}function nr(){Di.start()}const Di=new F0;Di.setAnimationLoop(Rn),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(b){Un=b,ce.setAnimationLoop(b),b===null?Di.stop():Di.start()},ce.addEventListener("sessionstart",xs),ce.addEventListener("sessionend",nr),this.render=function(b,$){if($!==void 0&&$.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera($),$=ce.getCamera()),b.isScene===!0&&b.onBeforeRender(C,b,$,G),g=ct.get(b,D.length),g.init($),D.push(g),pe.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),X.setFromProjectionMatrix(pe),fe=this.localClippingEnabled,ne=we.init(this.clippingPlanes,fe),_=Ue.get(b,I.length),_.init(),I.push(_),ce.enabled===!0&&ce.isPresenting===!0){const Re=C.xr.getDepthSensingMesh();Re!==null&&Ni(Re,$,-1/0,C.sortObjects)}Ni(b,$,0,C.sortObjects),_.finish(),C.sortObjects===!0&&_.sort(he,L),Ke=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,Ke&&Je.addToRenderList(_,b),this.info.render.frame++,ne===!0&&we.beginShadows();const le=g.state.shadowsArray;ze.render(le,b,$),ne===!0&&we.endShadows(),this.info.autoReset===!0&&this.info.reset();const te=_.opaque,Z=_.transmissive;if(g.setupLights(),$.isArrayCamera){const Re=$.cameras;if(Z.length>0)for(let Fe=0,Be=Re.length;Fe<Be;Fe++){const je=Re[Fe];Br(te,Z,b,je)}Ke&&Je.render(b);for(let Fe=0,Be=Re.length;Fe<Be;Fe++){const je=Re[Fe];zr(_,b,je,je.viewport)}}else Z.length>0&&Br(te,Z,b,$),Ke&&Je.render(b),zr(_,b,$);G!==null&&O===0&&(N.updateMultisampleRenderTarget(G),N.updateRenderTargetMipmap(G)),b.isScene===!0&&b.onAfterRender(C,b,$),Ct.resetDefaultState(),P=-1,R=null,D.pop(),D.length>0?(g=D[D.length-1],ne===!0&&we.setGlobalState(C.clippingPlanes,g.state.camera)):g=null,I.pop(),I.length>0?_=I[I.length-1]:_=null};function Ni(b,$,le,te){if(b.visible===!1)return;if(b.layers.test($.layers)){if(b.isGroup)le=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update($);else if(b.isLight)g.pushLight(b),b.castShadow&&g.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||X.intersectsSprite(b)){te&&Ee.setFromMatrixPosition(b.matrixWorld).applyMatrix4(pe);const Fe=_e.update(b),Be=b.material;Be.visible&&_.push(b,Fe,Be,le,Ee.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||X.intersectsObject(b))){const Fe=_e.update(b),Be=b.material;if(te&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ee.copy(b.boundingSphere.center)):(Fe.boundingSphere===null&&Fe.computeBoundingSphere(),Ee.copy(Fe.boundingSphere.center)),Ee.applyMatrix4(b.matrixWorld).applyMatrix4(pe)),Array.isArray(Be)){const je=Fe.groups;for(let ut=0,at=je.length;ut<at;ut++){const Ye=je[ut],wt=Be[Ye.materialIndex];wt&&wt.visible&&_.push(b,Fe,wt,le,Ee.z,Ye)}}else Be.visible&&_.push(b,Fe,Be,le,Ee.z,null)}}const Re=b.children;for(let Fe=0,Be=Re.length;Fe<Be;Fe++)Ni(Re[Fe],$,le,te)}function zr(b,$,le,te){const Z=b.opaque,Re=b.transmissive,Fe=b.transparent;g.setupLightsView(le),ne===!0&&we.setGlobalState(C.clippingPlanes,le),te&&Ve.viewport(H.copy(te)),Z.length>0&&ir(Z,$,le),Re.length>0&&ir(Re,$,le),Fe.length>0&&ir(Fe,$,le),Ve.buffers.depth.setTest(!0),Ve.buffers.depth.setMask(!0),Ve.buffers.color.setMask(!0),Ve.setPolygonOffset(!1)}function Br(b,$,le,te){if((le.isScene===!0?le.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[te.id]===void 0&&(g.state.transmissionRenderTarget[te.id]=new kr(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?fo:Li,minFilter:Ur,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Dt.workingColorSpace}));const Re=g.state.transmissionRenderTarget[te.id],Fe=te.viewport||H;Re.setSize(Fe.z*C.transmissionResolutionScale,Fe.w*C.transmissionResolutionScale);const Be=C.getRenderTarget();C.setRenderTarget(Re),C.getClearColor(de),me=C.getClearAlpha(),me<1&&C.setClearColor(16777215,.5),C.clear(),Ke&&Je.render(le);const je=C.toneMapping;C.toneMapping=Zi;const ut=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),g.setupLightsView(te),ne===!0&&we.setGlobalState(C.clippingPlanes,te),ir(b,le,te),N.updateMultisampleRenderTarget(Re),N.updateRenderTargetMipmap(Re),tt.has("WEBGL_multisampled_render_to_texture")===!1){let at=!1;for(let Ye=0,wt=$.length;Ye<wt;Ye++){const pt=$[Ye],qt=pt.object,Vt=pt.geometry,At=pt.material,et=pt.group;if(At.side===Ci&&qt.layers.test(te.layers)){const Yt=At.side;At.side=Dn,At.needsUpdate=!0,pa(qt,le,te,Vt,At,et),At.side=Yt,At.needsUpdate=!0,at=!0}}at===!0&&(N.updateMultisampleRenderTarget(Re),N.updateRenderTargetMipmap(Re))}C.setRenderTarget(Be),C.setClearColor(de,me),ut!==void 0&&(te.viewport=ut),C.toneMapping=je}function ir(b,$,le){const te=$.isScene===!0?$.overrideMaterial:null;for(let Z=0,Re=b.length;Z<Re;Z++){const Fe=b[Z],Be=Fe.object,je=Fe.geometry,ut=te===null?Fe.material:te,at=Fe.group;Be.layers.test(le.layers)&&pa(Be,$,le,je,ut,at)}}function pa(b,$,le,te,Z,Re){b.onBeforeRender(C,$,le,te,Z,Re),b.modelViewMatrix.multiplyMatrices(le.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Z.onBeforeRender(C,$,le,te,b,Re),Z.transparent===!0&&Z.side===Ci&&Z.forceSinglePass===!1?(Z.side=Dn,Z.needsUpdate=!0,C.renderBufferDirect(le,$,te,Z,b,Re),Z.side=Ji,Z.needsUpdate=!0,C.renderBufferDirect(le,$,te,Z,b,Re),Z.side=Ci):C.renderBufferDirect(le,$,te,Z,b,Re),b.onAfterRender(C,$,le,te,Z,Re)}function ys(b,$,le){$.isScene!==!0&&($=Ne);const te=ke.get(b),Z=g.state.lights,Re=g.state.shadowsArray,Fe=Z.state.version,Be=Xe.getParameters(b,Z.state,Re,$,le),je=Xe.getProgramCacheKey(Be);let ut=te.programs;te.environment=b.isMeshStandardMaterial?$.environment:null,te.fog=$.fog,te.envMap=(b.isMeshStandardMaterial?se:A).get(b.envMap||te.environment),te.envMapRotation=te.environment!==null&&b.envMap===null?$.environmentRotation:b.envMapRotation,ut===void 0&&(b.addEventListener("dispose",ot),ut=new Map,te.programs=ut);let at=ut.get(je);if(at!==void 0){if(te.currentProgram===at&&te.lightsStateVersion===Fe)return Si(b,Be),at}else Be.uniforms=Xe.getUniforms(b),b.onBeforeCompile(Be,C),at=Xe.acquireProgram(Be,je),ut.set(je,at),te.uniforms=Be.uniforms;const Ye=te.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ye.clippingPlanes=we.uniform),Si(b,Be),te.needsLights=qc(b),te.lightsStateVersion=Fe,te.needsLights&&(Ye.ambientLightColor.value=Z.state.ambient,Ye.lightProbe.value=Z.state.probe,Ye.directionalLights.value=Z.state.directional,Ye.directionalLightShadows.value=Z.state.directionalShadow,Ye.spotLights.value=Z.state.spot,Ye.spotLightShadows.value=Z.state.spotShadow,Ye.rectAreaLights.value=Z.state.rectArea,Ye.ltc_1.value=Z.state.rectAreaLTC1,Ye.ltc_2.value=Z.state.rectAreaLTC2,Ye.pointLights.value=Z.state.point,Ye.pointLightShadows.value=Z.state.pointShadow,Ye.hemisphereLights.value=Z.state.hemi,Ye.directionalShadowMap.value=Z.state.directionalShadowMap,Ye.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ye.spotShadowMap.value=Z.state.spotShadowMap,Ye.spotLightMatrix.value=Z.state.spotLightMatrix,Ye.spotLightMap.value=Z.state.spotLightMap,Ye.pointShadowMap.value=Z.state.pointShadowMap,Ye.pointShadowMatrix.value=Z.state.pointShadowMatrix),te.currentProgram=at,te.uniformsList=null,at}function ma(b){if(b.uniformsList===null){const $=b.currentProgram.getUniforms();b.uniformsList=ql.seqWithValue($.seq,b.uniforms)}return b.uniformsList}function Si(b,$){const le=ke.get(b);le.outputColorSpace=$.outputColorSpace,le.batching=$.batching,le.batchingColor=$.batchingColor,le.instancing=$.instancing,le.instancingColor=$.instancingColor,le.instancingMorph=$.instancingMorph,le.skinning=$.skinning,le.morphTargets=$.morphTargets,le.morphNormals=$.morphNormals,le.morphColors=$.morphColors,le.morphTargetsCount=$.morphTargetsCount,le.numClippingPlanes=$.numClippingPlanes,le.numIntersection=$.numClipIntersection,le.vertexAlphas=$.vertexAlphas,le.vertexTangents=$.vertexTangents,le.toneMapping=$.toneMapping}function ga(b,$,le,te,Z){$.isScene!==!0&&($=Ne),N.resetTextureUnits();const Re=$.fog,Fe=te.isMeshStandardMaterial?$.environment:null,Be=G===null?C.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:ms,je=(te.isMeshStandardMaterial?se:A).get(te.envMap||Fe),ut=te.vertexColors===!0&&!!le.attributes.color&&le.attributes.color.itemSize===4,at=!!le.attributes.tangent&&(!!te.normalMap||te.anisotropy>0),Ye=!!le.morphAttributes.position,wt=!!le.morphAttributes.normal,pt=!!le.morphAttributes.color;let qt=Zi;te.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(qt=C.toneMapping);const Vt=le.morphAttributes.position||le.morphAttributes.normal||le.morphAttributes.color,At=Vt!==void 0?Vt.length:0,et=ke.get(te),Yt=g.state.lights;if(ne===!0&&(fe===!0||b!==R)){const pn=b===R&&te.id===P;we.setState(te,b,pn)}let Et=!1;te.version===et.__version?(et.needsLights&&et.lightsStateVersion!==Yt.state.version||et.outputColorSpace!==Be||Z.isBatchedMesh&&et.batching===!1||!Z.isBatchedMesh&&et.batching===!0||Z.isBatchedMesh&&et.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&et.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&et.instancing===!1||!Z.isInstancedMesh&&et.instancing===!0||Z.isSkinnedMesh&&et.skinning===!1||!Z.isSkinnedMesh&&et.skinning===!0||Z.isInstancedMesh&&et.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&et.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&et.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&et.instancingMorph===!1&&Z.morphTexture!==null||et.envMap!==je||te.fog===!0&&et.fog!==Re||et.numClippingPlanes!==void 0&&(et.numClippingPlanes!==we.numPlanes||et.numIntersection!==we.numIntersection)||et.vertexAlphas!==ut||et.vertexTangents!==at||et.morphTargets!==Ye||et.morphNormals!==wt||et.morphColors!==pt||et.toneMapping!==qt||et.morphTargetsCount!==At)&&(Et=!0):(Et=!0,et.__version=te.version);let _n=et.currentProgram;Et===!0&&(_n=ys(te,$,Z));let rr=!1,Cn=!1,Ii=!1;const Ft=_n.getUniforms(),xn=et.uniforms;if(Ve.useProgram(_n.program)&&(rr=!0,Cn=!0,Ii=!0),te.id!==P&&(P=te.id,Cn=!0),rr||R!==b){Ve.buffers.depth.getReversed()?(ae.copy(b.projectionMatrix),z_(ae),B_(ae),Ft.setValue(F,"projectionMatrix",ae)):Ft.setValue(F,"projectionMatrix",b.projectionMatrix),Ft.setValue(F,"viewMatrix",b.matrixWorldInverse);const an=Ft.map.cameraPosition;an!==void 0&&an.setValue(F,Te.setFromMatrixPosition(b.matrixWorld)),nt.logarithmicDepthBuffer&&Ft.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&Ft.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),R!==b&&(R=b,Cn=!0,Ii=!0)}if(Z.isSkinnedMesh){Ft.setOptional(F,Z,"bindMatrix"),Ft.setOptional(F,Z,"bindMatrixInverse");const pn=Z.skeleton;pn&&(pn.boneTexture===null&&pn.computeBoneTexture(),Ft.setValue(F,"boneTexture",pn.boneTexture,N))}Z.isBatchedMesh&&(Ft.setOptional(F,Z,"batchingTexture"),Ft.setValue(F,"batchingTexture",Z._matricesTexture,N),Ft.setOptional(F,Z,"batchingIdTexture"),Ft.setValue(F,"batchingIdTexture",Z._indirectTexture,N),Ft.setOptional(F,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Ft.setValue(F,"batchingColorTexture",Z._colorsTexture,N));const on=le.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&it.update(Z,le,_n),(Cn||et.receiveShadow!==Z.receiveShadow)&&(et.receiveShadow=Z.receiveShadow,Ft.setValue(F,"receiveShadow",Z.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(xn.envMap.value=je,xn.flipEnvMap.value=je.isCubeTexture&&je.isRenderTargetTexture===!1?-1:1),te.isMeshStandardMaterial&&te.envMap===null&&$.environment!==null&&(xn.envMapIntensity.value=$.environmentIntensity),Cn&&(Ft.setValue(F,"toneMappingExposure",C.toneMappingExposure),et.needsLights&&va(xn,Ii),Re&&te.fog===!0&&Le.refreshFogUniforms(xn,Re),Le.refreshMaterialUniforms(xn,te,B,re,g.state.transmissionRenderTarget[b.id]),ql.upload(F,ma(et),xn,N)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(ql.upload(F,ma(et),xn,N),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&Ft.setValue(F,"center",Z.center),Ft.setValue(F,"modelViewMatrix",Z.modelViewMatrix),Ft.setValue(F,"normalMatrix",Z.normalMatrix),Ft.setValue(F,"modelMatrix",Z.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const pn=te.uniformsGroups;for(let an=0,Pt=pn.length;an<Pt;an++){const Mi=pn[an];q.update(Mi,_n),q.bind(Mi,_n)}}return _n}function va(b,$){b.ambientLightColor.needsUpdate=$,b.lightProbe.needsUpdate=$,b.directionalLights.needsUpdate=$,b.directionalLightShadows.needsUpdate=$,b.pointLights.needsUpdate=$,b.pointLightShadows.needsUpdate=$,b.spotLights.needsUpdate=$,b.spotLightShadows.needsUpdate=$,b.rectAreaLights.needsUpdate=$,b.hemisphereLights.needsUpdate=$}function qc(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(b,$,le){ke.get(b.texture).__webglTexture=$,ke.get(b.depthTexture).__webglTexture=le;const te=ke.get(b);te.__hasExternalTextures=!0,te.__autoAllocateDepthBuffer=le===void 0,te.__autoAllocateDepthBuffer||tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,$){const le=ke.get(b);le.__webglFramebuffer=$,le.__useDefaultFramebuffer=$===void 0};const _a=F.createFramebuffer();this.setRenderTarget=function(b,$=0,le=0){G=b,k=$,O=le;let te=!0,Z=null,Re=!1,Fe=!1;if(b){const je=ke.get(b);if(je.__useDefaultFramebuffer!==void 0)Ve.bindFramebuffer(F.FRAMEBUFFER,null),te=!1;else if(je.__webglFramebuffer===void 0)N.setupRenderTarget(b);else if(je.__hasExternalTextures)N.rebindTextures(b,ke.get(b.texture).__webglTexture,ke.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ye=b.depthTexture;if(je.__boundDepthTexture!==Ye){if(Ye!==null&&ke.has(Ye)&&(b.width!==Ye.image.width||b.height!==Ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(b)}}const ut=b.texture;(ut.isData3DTexture||ut.isDataArrayTexture||ut.isCompressedArrayTexture)&&(Fe=!0);const at=ke.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(at[$])?Z=at[$][le]:Z=at[$],Re=!0):b.samples>0&&N.useMultisampledRTT(b)===!1?Z=ke.get(b).__webglMultisampledFramebuffer:Array.isArray(at)?Z=at[le]:Z=at,H.copy(b.viewport),ie.copy(b.scissor),Y=b.scissorTest}else H.copy(E).multiplyScalar(B).floor(),ie.copy(W).multiplyScalar(B).floor(),Y=ve;if(le!==0&&(Z=_a),Ve.bindFramebuffer(F.FRAMEBUFFER,Z)&&te&&Ve.drawBuffers(b,Z),Ve.viewport(H),Ve.scissor(ie),Ve.setScissorTest(Y),Re){const je=ke.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+$,je.__webglTexture,le)}else if(Fe){const je=ke.get(b.texture),ut=$;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,je.__webglTexture,le,ut)}else if(b!==null&&le!==0){const je=ke.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,je.__webglTexture,le)}P=-1},this.readRenderTargetPixels=function(b,$,le,te,Z,Re,Fe){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=ke.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Fe!==void 0&&(Be=Be[Fe]),Be){Ve.bindFramebuffer(F.FRAMEBUFFER,Be);try{const je=b.texture,ut=je.format,at=je.type;if(!nt.textureFormatReadable(ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!nt.textureTypeReadable(at)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=b.width-te&&le>=0&&le<=b.height-Z&&F.readPixels($,le,te,Z,ft.convert(ut),ft.convert(at),Re)}finally{const je=G!==null?ke.get(G).__webglFramebuffer:null;Ve.bindFramebuffer(F.FRAMEBUFFER,je)}}},this.readRenderTargetPixelsAsync=async function(b,$,le,te,Z,Re,Fe){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Be=ke.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Fe!==void 0&&(Be=Be[Fe]),Be){const je=b.texture,ut=je.format,at=je.type;if(!nt.textureFormatReadable(ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!nt.textureTypeReadable(at))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if($>=0&&$<=b.width-te&&le>=0&&le<=b.height-Z){Ve.bindFramebuffer(F.FRAMEBUFFER,Be);const Ye=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ye),F.bufferData(F.PIXEL_PACK_BUFFER,Re.byteLength,F.STREAM_READ),F.readPixels($,le,te,Z,ft.convert(ut),ft.convert(at),0);const wt=G!==null?ke.get(G).__webglFramebuffer:null;Ve.bindFramebuffer(F.FRAMEBUFFER,wt);const pt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await k_(F,pt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ye),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Re),F.deleteBuffer(Ye),F.deleteSync(pt),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,$=null,le=0){b.isTexture!==!0&&(no("WebGLRenderer: copyFramebufferToTexture function signature has changed."),$=arguments[0]||null,b=arguments[1]);const te=Math.pow(2,-le),Z=Math.floor(b.image.width*te),Re=Math.floor(b.image.height*te),Fe=$!==null?$.x:0,Be=$!==null?$.y:0;N.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,le,0,0,Fe,Be,Z,Re),Ve.unbindTexture()};const xa=F.createFramebuffer(),ya=F.createFramebuffer();this.copyTextureToTexture=function(b,$,le=null,te=null,Z=0,Re=null){b.isTexture!==!0&&(no("WebGLRenderer: copyTextureToTexture function signature has changed."),te=arguments[0]||null,b=arguments[1],$=arguments[2],Re=arguments[3]||0,le=null),Re===null&&(Z!==0?(no("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Re=Z,Z=0):Re=0);let Fe,Be,je,ut,at,Ye,wt,pt,qt;const Vt=b.isCompressedTexture?b.mipmaps[Re]:b.image;if(le!==null)Fe=le.max.x-le.min.x,Be=le.max.y-le.min.y,je=le.isBox3?le.max.z-le.min.z:1,ut=le.min.x,at=le.min.y,Ye=le.isBox3?le.min.z:0;else{const on=Math.pow(2,-Z);Fe=Math.floor(Vt.width*on),Be=Math.floor(Vt.height*on),b.isDataArrayTexture?je=Vt.depth:b.isData3DTexture?je=Math.floor(Vt.depth*on):je=1,ut=0,at=0,Ye=0}te!==null?(wt=te.x,pt=te.y,qt=te.z):(wt=0,pt=0,qt=0);const At=ft.convert($.format),et=ft.convert($.type);let Yt;$.isData3DTexture?(N.setTexture3D($,0),Yt=F.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(N.setTexture2DArray($,0),Yt=F.TEXTURE_2D_ARRAY):(N.setTexture2D($,0),Yt=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,$.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,$.unpackAlignment);const Et=F.getParameter(F.UNPACK_ROW_LENGTH),_n=F.getParameter(F.UNPACK_IMAGE_HEIGHT),rr=F.getParameter(F.UNPACK_SKIP_PIXELS),Cn=F.getParameter(F.UNPACK_SKIP_ROWS),Ii=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Vt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Vt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,ut),F.pixelStorei(F.UNPACK_SKIP_ROWS,at),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ye);const Ft=b.isDataArrayTexture||b.isData3DTexture,xn=$.isDataArrayTexture||$.isData3DTexture;if(b.isDepthTexture){const on=ke.get(b),pn=ke.get($),an=ke.get(on.__renderTarget),Pt=ke.get(pn.__renderTarget);Ve.bindFramebuffer(F.READ_FRAMEBUFFER,an.__webglFramebuffer),Ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let Mi=0;Mi<je;Mi++)Ft&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ke.get(b).__webglTexture,Z,Ye+Mi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ke.get($).__webglTexture,Re,qt+Mi)),F.blitFramebuffer(ut,at,Fe,Be,wt,pt,Fe,Be,F.DEPTH_BUFFER_BIT,F.NEAREST);Ve.bindFramebuffer(F.READ_FRAMEBUFFER,null),Ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(Z!==0||b.isRenderTargetTexture||ke.has(b)){const on=ke.get(b),pn=ke.get($);Ve.bindFramebuffer(F.READ_FRAMEBUFFER,xa),Ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,ya);for(let an=0;an<je;an++)Ft?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,on.__webglTexture,Z,Ye+an):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,on.__webglTexture,Z),xn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,pn.__webglTexture,Re,qt+an):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,pn.__webglTexture,Re),Z!==0?F.blitFramebuffer(ut,at,Fe,Be,wt,pt,Fe,Be,F.COLOR_BUFFER_BIT,F.NEAREST):xn?F.copyTexSubImage3D(Yt,Re,wt,pt,qt+an,ut,at,Fe,Be):F.copyTexSubImage2D(Yt,Re,wt,pt,ut,at,Fe,Be);Ve.bindFramebuffer(F.READ_FRAMEBUFFER,null),Ve.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else xn?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(Yt,Re,wt,pt,qt,Fe,Be,je,At,et,Vt.data):$.isCompressedArrayTexture?F.compressedTexSubImage3D(Yt,Re,wt,pt,qt,Fe,Be,je,At,Vt.data):F.texSubImage3D(Yt,Re,wt,pt,qt,Fe,Be,je,At,et,Vt):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Re,wt,pt,Fe,Be,At,et,Vt.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Re,wt,pt,Vt.width,Vt.height,At,Vt.data):F.texSubImage2D(F.TEXTURE_2D,Re,wt,pt,Fe,Be,At,et,Vt);F.pixelStorei(F.UNPACK_ROW_LENGTH,Et),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,_n),F.pixelStorei(F.UNPACK_SKIP_PIXELS,rr),F.pixelStorei(F.UNPACK_SKIP_ROWS,Cn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ii),Re===0&&$.generateMipmaps&&F.generateMipmap(Yt),Ve.unbindTexture()},this.copyTextureToTexture3D=function(b,$,le=null,te=null,Z=0){return b.isTexture!==!0&&(no("WebGLRenderer: copyTextureToTexture3D function signature has changed."),le=arguments[0]||null,te=arguments[1]||null,b=arguments[2],$=arguments[3],Z=arguments[4]||0),no('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,$,le,te,Z)},this.initRenderTarget=function(b){ke.get(b).__webglFramebuffer===void 0&&N.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?N.setTextureCube(b,0):b.isData3DTexture?N.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?N.setTexture2DArray(b,0):N.setTexture2D(b,0),Ve.unbindTexture()},this.resetState=function(){k=0,O=0,G=null,Ve.reset(),Ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=Dt._getDrawingBufferColorSpace(e),n.unpackColorSpace=Dt._getUnpackColorSpace()}}const GE=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Ad,AddEquation:Dr,AddOperation:Kg,AdditiveBlending:dd,AgXToneMapping:t0,AlphaFormat:Ld,AlwaysCompare:h0,AlwaysDepth:Zl,AlwaysStencilFunc:md,AmbientLight:I0,ArrayCamera:U0,BackSide:Dn,BasicDepthPacking:r0,Box3:po,BoxGeometry:Wt,BufferAttribute:oi,BufferGeometry:Nn,ByteType:Cd,Camera:jd,CanvasTexture:A0,CatmullRomCurve3:C0,CineonToneMapping:Jg,ClampToEdgeWrapping:Ir,Color:_t,ColorManagement:Dt,ConeGeometry:Gc,ConstantAlphaFactor:qg,ConstantColorFactor:Xg,CubeCamera:M0,CubeReflectionMapping:fs,CubeRefractionMapping:ds,CubeTexture:qd,CubeUVReflectionMapping:ua,CullFaceBack:fd,CullFaceFront:Pg,CullFaceNone:bg,Curve:R0,CustomBlending:Lg,CustomToneMapping:e0,CylinderGeometry:_i,Data3DTexture:_0,DataArrayTexture:Hd,DepthFormat:cs,DepthStencilFormat:ps,DepthTexture:$d,DirectionalLight:N0,DoubleSide:Ci,DstAlphaFactor:Bg,DstColorFactor:Vg,EqualCompare:c0,EqualDepth:Jl,EquirectangularReflectionMapping:ic,EquirectangularRefractionMapping:rc,Euler:yi,EventDispatcher:gs,Float32BufferAttribute:nn,FloatType:bi,FogExp2:Hc,FrontSide:Ji,Frustum:Vc,GLSL3:vd,GreaterCompare:u0,GreaterDepth:tc,GreaterEqualCompare:d0,GreaterEqualDepth:ec,Group:dn,HalfFloatType:fo,ImageUtils:g0,IntType:Uc,KeepStencilOp:ss,Layers:Gd,LessCompare:l0,LessDepth:Ql,LessEqualCompare:zd,LessEqualDepth:us,Light:Xc,LinearFilter:vi,LinearMipmapLinearFilter:Ur,LinearMipmapNearestFilter:Xl,LinearSRGBColorSpace:ms,LinearToneMapping:Zg,LinearTransfer:la,LuminanceAlphaFormat:Id,LuminanceFormat:Nd,Material:vs,Matrix3:mt,Matrix4:zt,MaxEquation:Ug,Mesh:lt,MeshBasicMaterial:_s,MeshDepthMaterial:b0,MeshDistanceMaterial:P0,MeshStandardMaterial:Zt,MinEquation:Ig,MirroredRepeatWrapping:sc,MixOperation:$g,MultiplyBlending:pd,MultiplyOperation:Td,NearestFilter:si,NearestMipmapLinearFilter:ta,NearestMipmapNearestFilter:i0,NeutralToneMapping:n0,NeverCompare:a0,NeverDepth:Kl,NoBlending:Ki,NoColorSpace:$i,NoToneMapping:Zi,NormalBlending:ls,NotEqualCompare:f0,NotEqualDepth:nc,Object3D:hn,ObjectSpaceNormalMap:o0,OneFactor:Og,OneMinusConstantAlphaFactor:Yg,OneMinusConstantColorFactor:jg,OneMinusDstAlphaFactor:Hg,OneMinusDstColorFactor:Gg,OneMinusSrcAlphaFactor:$l,OneMinusSrcColorFactor:zg,OrthographicCamera:Zd,PCFShadowMap:Ed,PCFSoftShadowMap:wd,PMREMGenerator:yd,PerspectiveCamera:vn,Plane:Pr,PlaneGeometry:tr,PointLight:D0,Points:T0,PointsMaterial:Yd,Quaternion:ho,RED_GREEN_RGTC2_Format:Pc,RED_RGTC1_Format:Od,REVISION:Ic,RGBADepthPacking:s0,RGBAFormat:ri,RGBAIntegerFormat:Bc,RGBA_ASTC_10x10_Format:wc,RGBA_ASTC_10x5_Format:Sc,RGBA_ASTC_10x6_Format:Mc,RGBA_ASTC_10x8_Format:Ec,RGBA_ASTC_12x10_Format:Tc,RGBA_ASTC_12x12_Format:Ac,RGBA_ASTC_4x4_Format:hc,RGBA_ASTC_5x4_Format:pc,RGBA_ASTC_5x5_Format:mc,RGBA_ASTC_6x5_Format:gc,RGBA_ASTC_6x6_Format:vc,RGBA_ASTC_8x5_Format:_c,RGBA_ASTC_8x6_Format:xc,RGBA_ASTC_8x8_Format:yc,RGBA_BPTC_Format:aa,RGBA_ETC2_EAC_Format:dc,RGBA_PVRTC_2BPPV1_Format:cc,RGBA_PVRTC_4BPPV1_Format:lc,RGBA_S3TC_DXT1_Format:ra,RGBA_S3TC_DXT3_Format:sa,RGBA_S3TC_DXT5_Format:oa,RGBFormat:Dd,RGB_BPTC_SIGNED_Format:Rc,RGB_BPTC_UNSIGNED_Format:Cc,RGB_ETC1_Format:uc,RGB_ETC2_Format:fc,RGB_PVRTC_2BPPV1_Format:ac,RGB_PVRTC_4BPPV1_Format:oc,RGB_S3TC_DXT1_Format:ia,RGFormat:Fd,RGIntegerFormat:zc,Ray:Vd,RedFormat:Ud,RedIntegerFormat:kc,ReinhardToneMapping:Qg,RenderTarget:v0,RepeatWrapping:lo,ReverseSubtractEquation:Ng,SIGNED_RED_GREEN_RGTC2_Format:Lc,SIGNED_RED_RGTC1_Format:bc,SRGBColorSpace:Gn,SRGBTransfer:It,Scene:w0,ShaderChunk:vt,ShaderLib:gi,ShaderMaterial:er,ShortType:bd,Source:Bd,Sphere:da,SphereGeometry:ha,SrcAlphaFactor:Yl,SrcAlphaSaturateFactor:Wg,SrcColorFactor:kg,StaticDrawUsage:gd,SubtractEquation:Dg,SubtractiveBlending:hd,TangentSpaceNormalMap:kd,Texture:An,TorusGeometry:Wc,Triangle:ii,UVMapping:Rd,Uint16BufferAttribute:Wd,Uint32BufferAttribute:Xd,UniformsLib:Ie,UniformsUtils:S0,UnsignedByteType:Li,UnsignedInt248Type:hs,UnsignedInt5999Type:Pd,UnsignedIntType:Or,UnsignedShort4444Type:Fc,UnsignedShort5551Type:Oc,UnsignedShortType:co,VSMShadowMap:Ri,Vector2:Rt,Vector3:K,Vector4:Ut,WebGLCoordinateSystem:Pi,WebGLCubeRenderTarget:E0,WebGLRenderTarget:kr,WebGLRenderer:V0,WebGLUtils:H0,WebGPUCoordinateSystem:ca,WebXRController:jl,ZeroFactor:Fg,createCanvasElement:m0},Symbol.toStringTag,{value:"Module"}));function cd(s={}){const e=new dn,n=s.primaryColor||"#00f2fe",r=s.secondaryColor||"#4facfe",a=s.accentColor||"#ffffff",l=new Zt({color:new _t(n),metalness:.8,roughness:.2,envMapIntensity:1.2}),u=new Zt({color:new _t(r),metalness:.7,roughness:.25}),f=new Zt({color:new _t(a),metalness:.5,roughness:.3}),h=new Zt({color:1118481,metalness:.9,roughness:.35}),p=new _s({color:328965}),v=new Zt({color:1842204,roughness:.85,metalness:.1}),x=new Zt({color:new _t(n).lerp(new _t(16777215),.3),metalness:.9,roughness:.15}),y=new Zt({color:3355443,metalness:.95,roughness:.2}),S=new Zt({color:15680580,metalness:.6,roughness:.3}),M=new Zt({color:657930,metalness:.95,roughness:.05}),T=new Zt({color:16711680,emissive:16711680,emissiveIntensity:.8}),_=new dn,g=new Wt(1.2,.65,2.6),I=new lt(g,l);I.position.set(0,.55,-.1),I.castShadow=!0,I.receiveShadow=!0,_.add(I);const D=new Gc(.55,1.8,4);D.rotateX(Math.PI/2),D.scale(1,.5,1);const C=new lt(D,l);C.position.set(0,.45,1.8),C.castShadow=!0,_.add(C);const z=new Wt(.4,.1,.3),k=new lt(z,u);k.position.set(0,.3,2.45),_.add(k);const O=new Wt(.7,.1,1.1),G=new lt(O,f);G.position.set(0,.88,-.1),_.add(G);const P=Ce=>{const ce=new dn,ge=Ce?-.85:.85,De=new Wt(.65,.55,1.8),Pe=new lt(De,l);Pe.position.set(ge,.5,-.1),Pe.castShadow=!0,ce.add(Pe);const ot=new Wt(.67,.15,1.82),bt=new lt(ot,u);bt.position.set(ge,.65,-.1),ce.add(bt);const Ot=new tr(.5,.4),yt=new lt(Ot,p);return yt.position.set(ge,.5,.81),ce.add(yt),ce};_.add(P(!0)),_.add(P(!1));const R=new Wt(2.4,.06,4.2),H=new lt(R,h);H.position.set(0,.18,-.1),H.castShadow=!0,H.receiveShadow=!0,_.add(H);for(let Ce=-3;Ce<=3;Ce++){const ce=new Wt(.04,.25,.6),ge=new lt(ce,h);ge.position.set(Ce*.35,.25,-2.1),ge.rotation.x=-.3,_.add(ge)}const ie=new dn;ie.position.set(0,.25,2.35);const Y=new Wt(2.5,.05,.5),de=new lt(Y,u);de.castShadow=!0,ie.add(de);const me=new Wt(2.3,.04,.25),Q=new lt(me,l);Q.position.set(0,.12,-.05),ie.add(Q);const re=new Wt(.05,.35,.65),B=new lt(re,h);B.position.set(-1.26,.12,0);const he=new lt(re,h);he.position.set(1.26,.12,0),ie.add(B),ie.add(he),_.add(ie);const L=new dn;L.position.set(0,1.05,-2);const E=new Wt(.08,.75,.5),W=new lt(E,h);W.position.set(-.35,-.15,0);const ve=new lt(E,h);ve.position.set(.35,-.15,0),L.add(W),L.add(ve);const X=new Wt(1.9,.06,.55),ne=new lt(X,u);ne.position.set(0,.2,0),ne.castShadow=!0,L.add(ne);const fe=new dn;fe.position.set(0,.38,-.1);const ae=new Wt(1.88,.05,.38),pe=new lt(ae,l);pe.position.set(0,0,.15),pe.castShadow=!0,fe.add(pe),L.add(fe);const Te=new Wt(.05,.8,.85),Ee=new lt(Te,h);Ee.position.set(-.96,.2,0);const Ne=new lt(Te,h);Ne.position.set(.96,.2,0),L.add(Ee),L.add(Ne),_.add(L);const Ke=new Wc(.38,.04,12,24,Math.PI),Oe=new lt(Ke,h);Oe.rotation.x=Math.PI/2,Oe.position.set(0,.98,.15),_.add(Oe);const F=new _i(.03,.03,.45,8),Tt=new lt(F,h);Tt.position.set(0,.75,.52),Tt.rotation.x=-.25,_.add(Tt);const tt=new dn;tt.position.set(0,.88,-.25);const nt=new ha(.2,24,24),Ve=new Zt({color:16317180,metalness:.8,roughness:.2}),xt=new lt(nt,Ve);tt.add(xt);const ke=new Wt(.26,.08,.15),N=new lt(ke,M);N.position.set(0,.02,.12),tt.add(N),_.add(tt);const A=new Wt(.35,.18,.08),se=new lt(A,T);se.position.set(0,.48,-2.15),_.add(se),e.add(_);const xe=.42,ye=.38,_e=new _i(xe,xe,ye,32);_e.rotateZ(Math.PI/2);const Xe=new _i(.26,.26,.06,24);Xe.rotateZ(Math.PI/2);const Le=new Wt(.12,.16,.2),Ue=(Ce,ce)=>{const ge=new dn,De=new lt(_e,v);De.castShadow=!0,De.receiveShadow=!0,ge.add(De);const Pe=new _i(.24,.24,ye+.02,16);Pe.rotateZ(Math.PI/2);const ot=new lt(Pe,x);ge.add(ot);const bt=new lt(Xe,y);bt.position.x=ce?.08:-.08,ge.add(bt);const Ot=new lt(Le,S);return Ot.position.set(ce?.08:-.08,.15,.1),ge.add(Ot),{wheelGroup:ge,wheelMesh:De}},ct=new dn;ct.position.set(-1.12,.42,1.55);const we=Ue(!0,!0);ct.add(we.wheelGroup),e.add(ct);const ze=new dn;ze.position.set(1.12,.42,1.55);const Je=Ue(!0,!1);ze.add(Je.wheelGroup),e.add(ze);const it=new dn;it.position.set(-1.16,.42,-1.45);const Ge=Ue(!1,!0);it.add(Ge.wheelGroup),e.add(it);const ht=new dn;ht.position.set(1.16,.42,-1.45);const ft=Ue(!1,!1);ht.add(ft.wheelGroup),e.add(ht);const Ct=[we.wheelMesh,Je.wheelMesh,Ge.wheelMesh,ft.wheelMesh];let q=0;return{mesh:e,frontLeftPivot:ct,frontRightPivot:ze,drsPivot:fe,drsFlap:pe,brakeLight:se,brakeLightMat:T,wheelMeshes:Ct,update(Ce,ce=.016){if(!Ce)return;e.position.set(Ce.x,0,Ce.z),e.rotation.y=Ce.heading;const ge=Ce.steeringAngle||0;ct.rotation.y=ge,ze.rotation.y=ge;const Pe=(Ce.speed||0)/xe*ce;q+=Pe,Ct.forEach(yt=>{yt.rotation.x=q});const bt=!!(Ce.drsActive||Ce.drs)?-.35:0;fe.rotation.x+=(bt-fe.rotation.x)*Math.min(1,ce*12);const Ot=(Ce.brake||0)>.05;T.emissiveIntensity=Ot?2.5:.6}}}function WE(s,e){const n=new dn,r=s.points||[];if(r.length===0)return{trackGroup:n,curve:null};const a=r.map(_=>new K(_.x,0,_.z)),l=new C0(a,!0,"centripetal"),u=400,f=s.trackWidth||14,h=[],p=[],v=[];for(let _=0;_<=u;_++){const g=_/u,I=l.getPointAt(g),D=l.getTangentAt(g).normalize(),C=new K(-D.z,0,D.x).normalize(),z=I.clone().sub(C.clone().multiplyScalar(f/2)),k=I.clone().add(C.clone().multiplyScalar(f/2));if(h.push(z.x,.05,z.z),h.push(k.x,.05,k.z),p.push(0,g*60),p.push(1,g*60),_<u){const O=_*2,G=(_+1)*2;v.push(O,O+1,G),v.push(O+1,G+1,G)}}const x=new Nn;x.setAttribute("position",new nn(h,3)),x.setAttribute("uv",new nn(p,2)),x.setIndex(v),x.computeVertexNormals();const y=new Zt({color:1976635,roughness:.82,metalness:.12}),S=new lt(x,y);S.receiveShadow=!0,n.add(S);const M=new Nn;return M.setAttribute("position",x.getAttribute("position")),M.computeBoundingBox(),M.dispose(),new _s().dispose(),XE(n,r,l,u,f),jE(n,r,l,u,f),qE(n,l,f),YE(e,n,s),e.add(n),{trackGroup:n,curve:l}}function XE(s,e,n,r,a){const l=new Zt({color:15680580,roughness:.5}),u=new Zt({color:16777195,roughness:.5}),f=new Wt(.8,.08,1.2),h=[];e.forEach((p,v)=>{(p.isApex||p.targetSpeed<180)&&h.push(v/e.length)}),h.forEach(p=>{for(let x=-12;x<=12;x++){const y=(p+x/r+1)%1,S=n.getPointAt(y),M=n.getTangentAt(y).normalize(),T=new K(-M.z,0,M.x).normalize(),g=Math.abs(x)%2===0?l:u,I=S.clone().sub(T.clone().multiplyScalar(a/2+.4)),D=new lt(f,g);D.position.set(I.x,.08,I.z),D.rotation.y=Math.atan2(M.x,M.z),s.add(D);const C=S.clone().add(T.clone().multiplyScalar(a/2+.4)),z=new lt(f,g);z.position.set(C.x,.08,C.z),z.rotation.y=Math.atan2(M.x,M.z),s.add(z)}})}function jE(s,e,n,r,a){const l=new Zt({color:16436245,roughness:.7}),u=new Zt({color:2450411,roughness:.7}),f=new Zt({color:6583435,metalness:.8,roughness:.3}),h=new _i(.42,.42,.35,12),p=new _i(.06,.06,2.2,8),v=16;for(let x=0;x<r;x+=v){const y=x/r,S=n.getPointAt(y),M=n.getTangentAt(y).normalize(),T=new K(-M.z,0,M.x).normalize(),_=S.clone().sub(T.clone().multiplyScalar(a/2+2.2)),g=S.clone().add(T.clone().multiplyScalar(a/2+2.2));[_,g].forEach((I,D)=>{const C=(x/v+D)%2===0?l:u,z=new lt(h,C);z.position.set(I.x,.18,I.z),z.castShadow=!0,s.add(z);const k=new lt(h,C);k.position.set(I.x,.52,I.z),k.castShadow=!0,s.add(k);const O=new lt(p,f);O.position.set(I.x,1.1,I.z),s.add(O)})}}function qE(s,e,n){const r=e.getPointAt(0),a=e.getTangentAt(0).normalize(),l=new K(-a.z,0,a.x).normalize(),u=Math.atan2(a.x,a.z),f=new tr(n,1.8),h=document.createElement("canvas");h.width=128,h.height=32;const p=h.getContext("2d");p.fillStyle="#ffffff",p.fillRect(0,0,128,32),p.fillStyle="#000000";for(let T=0;T<128;T+=16)for(let _=0;_<32;_+=16)(T/16+_/16)%2===0&&p.fillRect(T,_,16,16);const v=new A0(h);v.wrapS=lo,v.wrapT=lo,v.repeat.set(8,1);const x=new Zt({map:v,roughness:.5,polygonOffset:!0,polygonOffsetFactor:-1}),y=new lt(f,x);y.rotation.x=-Math.PI/2,y.rotation.z=-u,y.position.set(r.x,.06,r.z),s.add(y);const S=new _s({color:16777215}),M=new tr(2.4,4.5);for(let T=0;T<8;T++){const _=T%2===0,g=12+T*9,I=_?-n*.22:n*.22,D=r.clone().sub(a.clone().multiplyScalar(g)).add(l.clone().multiplyScalar(I)),C=new lt(M,S);C.rotation.x=-Math.PI/2,C.rotation.z=-u,C.position.set(D.x,.06,D.z),s.add(C)}}function io(s){s&&(s.children&&s.children.length>0&&[...s.children].forEach(e=>io(e)),s.geometry&&s.geometry.dispose(),s.material&&(Array.isArray(s.material)?s.material:[s.material]).forEach(n=>{n&&(n.map&&n.map.dispose(),n.lightMap&&n.lightMap.dispose(),n.bumpMap&&n.bumpMap.dispose(),n.normalMap&&n.normalMap.dispose(),n.specularMap&&n.specularMap.dispose(),n.envMap&&n.envMap.dispose(),n.dispose())}))}function YE(s,e,n){let r=n.skyColor||"#0f172a",a=n.groundColor||"#064e3b",l=n.fogColor||"#0f172a";s.background=new _t(r),s.fog=new Hc(l,.0012);const u=new tr(3e3,3e3),f=new Zt({color:new _t(a),roughness:.95,metalness:.05}),h=new lt(u,f);h.rotation.x=-Math.PI/2,h.position.y=0,h.receiveShadow=!0,e.add(h);const p=new I0(16777215,n.ambientLight||.7);e.add(p);const v=n.sunPosition||[100,150,80],x=n.environment==="night",S=n.environment==="sunset"?16746564:x?3718648:16777215,M=new N0(S,x?.35:1.25);if(M.position.set(v[0],v[1],v[2]),M.castShadow=!0,M.shadow.mapSize.width=2048,M.shadow.mapSize.height=2048,M.shadow.camera.near=10,M.shadow.camera.far=900,M.shadow.camera.left=-250,M.shadow.camera.right=250,M.shadow.camera.top=250,M.shadow.camera.bottom=-250,e.add(M),x){const T=new _i(.1,.1,8,8),_=new Zt({color:3359061,metalness:.8}),g=new _s({color:3718648});(n.points||[]).forEach((D,C)=>{if(C%3===0){const z=new lt(T,_);z.position.set(D.x+8,4,D.z+8),e.add(z);const k=new lt(new ha(.4,8,8),g);k.position.set(D.x+8,8,D.z+8),e.add(k);const O=new D0(3718648,1.5,40);O.position.set(D.x+8,7.5,D.z+8),e.add(O)}})}}if(typeof GE<"u"&&vn){const s=vn.prototype.updateProjectionMatrix;vn.prototype.updateProjectionMatrix=function(){return(!Number.isFinite(this.aspect)||this.aspect<=0)&&(this.aspect=1),s.call(this)}}class $E{constructor(e){this.camera=e,this.baseFov=65,this.targetFov=65,this.currentLookAt=new K(0,1.2,0),this.orbitAngle=0}update(e,n="chase",r=.016){if(!e||!this.camera)return;const a=e.speedKmH,l=Number.isFinite(a)?a:0,u=Number.isFinite(e.x)?e.x:0,f=Number.isFinite(e.z)?e.z:0,h=Number.isFinite(e.heading)?e.heading:0,p=Number.isFinite(e.steeringAngle)?e.steeringAngle:0,v=Math.sin(h),x=Math.cos(h),y=Math.max(0,l),S=Math.min(1,Math.max(0,y/350));if(this.targetFov=this.baseFov+S*14,this.camera.fov+=(this.targetFov-this.camera.fov)*Math.min(1,r*6),Number.isFinite(this.camera.fov)||(this.camera.fov=65),this.camera.updateProjectionMatrix(),n==="chase"){const M=11.5+S*1.8,T=4.2,_=u-v*M,g=T,I=f-x*M,D=Math.min(1,r*10);this.camera.position.x+=(_-this.camera.position.x)*D,this.camera.position.y+=(g-this.camera.position.y)*D,this.camera.position.z+=(I-this.camera.position.z)*D;const C=9+S*10,z=u+v*C,k=1.2,O=f+x*C,G=Math.min(1,r*12);this.currentLookAt.x+=(z-this.currentLookAt.x)*G,this.currentLookAt.y+=(k-this.currentLookAt.y)*G,this.currentLookAt.z+=(O-this.currentLookAt.z)*G,this.camera.lookAt(this.currentLookAt)}else if(n==="cockpit"){const M=u+v*.12,T=1.15,_=f+x*.12;this.camera.position.set(M,T,_);const g=p*2.5,I=u+Math.sin(h+g)*25,D=f+Math.cos(h+g)*25;this.camera.lookAt(I,1.05,D)}else if(n==="hood"){const M=u+v*2.1,T=.72,_=f+x*2.1;this.camera.position.set(M,T,_);const g=u+v*35,I=f+x*35;this.camera.lookAt(g,.65,I)}else if(n==="orbit"){this.orbitAngle+=r*.45;const M=8.5,T=u+Math.sin(this.orbitAngle)*M,_=3.2,g=f+Math.cos(this.orbitAngle)*M;this.camera.position.set(T,_,g),this.camera.lookAt(u,.8,f)}}}const Nc=[{id:"apex-a1",name:"Apex A1",team:"Apex Racing Team",primaryColor:"#00f2fe",secondaryColor:"#4facfe",accentColor:"#ffffff",topSpeed:345,acceleration:9.2,braking:8.8,cornering:8.9,downforce:9,weight:798,description:"The flagship open-wheel aerodynamic monster built for maximum high-speed cornering stability.",livery:"cyber-cyan"},{id:"vortex-x",name:"Vortex X",team:"Vortex Motorsport",primaryColor:"#ff0844",secondaryColor:"#ffb199",accentColor:"#111111",topSpeed:358,acceleration:9.5,braking:8.2,cornering:8.1,downforce:8.2,weight:790,description:"Extreme straight-line rocket with blistering acceleration and raw top-end speed.",livery:"crimson-surge"},{id:"falcon-r",name:"Falcon R",team:"Falcon Precision Racing",primaryColor:"#f59e0b",secondaryColor:"#fbbf24",accentColor:"#000000",topSpeed:338,acceleration:8.7,braking:9.4,cornering:9.5,downforce:9.6,weight:795,description:"Unmatched cornering grip and precision braking for tight technical circuits.",livery:"amber-strike"},{id:"titan-gp",name:"Titan GP",team:"Titan Heavy Performance",primaryColor:"#10b981",secondaryColor:"#34d399",accentColor:"#ffffff",topSpeed:340,acceleration:8.5,braking:9,cornering:9,downforce:9.2,weight:805,description:"Highly consistent chassis with incredible durability and forgiving wet-weather traction.",livery:"emerald-flow"},{id:"phantom-f1",name:"Phantom F1",team:"Phantom Stealth Works",primaryColor:"#8b5cf6",secondaryColor:"#c084fc",accentColor:"#00f2fe",topSpeed:352,acceleration:9.1,braking:8.9,cornering:8.8,downforce:8.8,weight:792,description:"Advanced carbon-monocoque prototype combining high downforce with sleek low drag.",livery:"violet-nebula"},{id:"velocity-9",name:"Velocity 9",team:"Velocity Kinetic Labs",primaryColor:"#ec4899",secondaryColor:"#f472b6",accentColor:"#ffffff",topSpeed:348,acceleration:9.3,braking:8.6,cornering:8.6,downforce:8.7,weight:794,description:"Hybrid energy-recovery powertrain giving massive explosive bursts out of low-speed corners.",livery:"neon-magenta"},{id:"stealth-gt",name:"Stealth GT",team:"Shadow Apex Engineering",primaryColor:"#38bdf8",secondaryColor:"#0284c7",accentColor:"#ffffff",topSpeed:342,acceleration:8.9,braking:9.1,cornering:9.1,downforce:9,weight:796,description:"Ultra-balanced simcade setup engineered for effortless controllable drifts and quick recovery.",livery:"sky-force"},{id:"zenith-r",name:"Zenith R",team:"Zenith World Champions",primaryColor:"#eab308",secondaryColor:"#fef08a",accentColor:"#18181b",topSpeed:355,acceleration:9.4,braking:9.3,cornering:9.4,downforce:9.5,weight:791,description:"The ultimate championship-winning machine. Flawless aero, high downforce, and supreme top speed.",livery:"gold-crown"}];function Mg(s){return Nc.find(e=>e.id===s)||Nc[0]}function Eg(s=0,e=0,n=0){return{x:s,z:e,heading:n,speed:0,speedKmH:0,steeringAngle:0,targetSteeringAngle:0,rpm:1800,gear:1,throttle:0,brake:0,handbrake:!1,slipAngle:0,isSlipping:!1,tyreWear:100,drsActive:!1,lap:1,currentSector:1,lastCheckpointIdx:0,totalDistance:0,finished:!1,finishTime:null}}function KE(s,e,n,r,a="pro"){const{throttle:l=0,brake:u=0,steering:f=0,drs:h=!1}=e,p=n.topSpeed*1e3/3600,v=n.acceleration*4.8,x=n.braking*13.5,y=.48;s.throttle=l,s.brake=u,s.drsActive=h;const S=s.speed/p,M=1-Math.min(.68,S*.72),T=f*y*M,_=8;s.steeringAngle+=(T-s.steeringAngle)*Math.min(1,_*r);const g=h?.72:1,I=.0011*Math.pow(s.speed,2)*g,D=.75;let C=0;if(l>0){const re=v*(1-Math.pow(S,1.4))*l;C+=re}u>0&&(C-=x*u),C-=I+D,s.speed+=C*r,s.speed<0&&(s.speed=0);const z=h?p*1.09:p;s.speed>z&&(s.speed=z),s.speedKmH=Math.round(s.speed*3600/1e3);let O=s.speed/3.6*Math.tan(s.steeringAngle);const G=n.cornering*2.9,P=Math.abs(O*s.speed);P>G?(s.isSlipping=!0,s.slipAngle=(P-G)*Math.sign(s.steeringAngle),s.speed-=4.5*r):(s.isSlipping=!1,s.slipAngle*=.82),s.heading+=O*r,s.x+=Math.sin(s.heading)*s.speed*r,s.z+=Math.cos(s.heading)*s.speed*r;const R=1800,H=14800,ie=[0,42,88,138,188,238,288,328,368];let Y=1;for(let re=1;re<=8;re++)s.speedKmH>ie[re-1]&&(Y=re);s.gear=Y;const de=ie[Y-1],me=ie[Y],Q=Math.min(1,(s.speedKmH-de)/(me-de));s.rpm=Math.round(R+Q*(H-R))}function ZE(s,e=7){return[{name:"Max Vance",team:"Vortex Motorsport",carId:"vortex-x",skill:.98,aggression:.9},{name:"Lewis Hamilton",team:"Apex Racing Team",carId:"apex-a1",skill:.96,aggression:.8},{name:"Charles Leclair",team:"Falcon Precision Racing",carId:"falcon-r",skill:.94,aggression:.85},{name:"Lando Swift",team:"Phantom Stealth Works",carId:"phantom-f1",skill:.92,aggression:.75},{name:"Oscar Piatri",team:"Velocity Kinetic Labs",carId:"velocity-9",skill:.9,aggression:.7},{name:"George Rusher",team:"Titan Heavy Performance",carId:"titan-gp",skill:.88,aggression:.8},{name:"Carlos Sainz",team:"Zenith World Champions",carId:"zenith-r",skill:.87,aggression:.75}].slice(0,e).map((r,a)=>{const l=-40-(a+1)*15,u=a%2===0?-3.5:3.5;return{id:`ai-${a}`,name:r.name,team:r.team,carId:r.carId,skill:r.skill,aggression:r.aggression,state:{x:u,z:l,heading:0,speed:0,speedKmH:0,steeringAngle:0,rpm:1500,gear:1,lap:1,targetWaypointIdx:0,finished:!1,finishTime:null}}})}function QE(s,e,n,r){const a=s.state;if(a.finished)return;const l=e,u=l[a.targetWaypointIdx],f=(a.targetWaypointIdx+1)%l.length;l[f];const h=u.x-a.x,p=u.z-a.z;Math.hypot(h,p)<20&&(a.targetWaypointIdx=f,a.targetWaypointIdx===0&&(a.lap+=1));let y=Math.atan2(h,p)-a.heading;for(;y>Math.PI;)y-=Math.PI*2;for(;y<-Math.PI;)y+=Math.PI*2;const S=2.5*s.skill;a.steeringAngle=Math.max(-.45,Math.min(.45,y*S));let M=u.targetSpeed||280;n==="rookie"?M*=.75:n==="pro"?M*=.9:n==="apex"?M*=.98:n==="impossible"&&(M*=1.05);const T=M*1e3/3600;a.speed<T?a.speed+=8.5*s.skill*r:a.speed-=14*(2-s.skill)*r,a.speed<0&&(a.speed=0),a.speedKmH=Math.round(a.speed*3600/1e3);const g=a.speed/3.6*Math.tan(a.steeringAngle);a.heading+=g*r,a.x+=Math.sin(a.heading)*a.speed*r,a.z+=Math.cos(a.heading)*a.speed*r;const I=[0,45,90,140,190,240,290,330,370];let D=1;for(let C=1;C<=8;C++)a.speedKmH>I[C-1]&&(D=C);a.gear=D,a.rpm=Math.round(2e3+a.speedKmH/350*12500)}let gt=null,Nr=null,so=null,oo=null,xi=null,Yi=null,ea=null,Lr=null,Fr=null,JE=!0,wg=!1;function e1(){if(wg||typeof window>"u")return;const s=()=>{gt&&gt.state==="suspended"&&gt.resume().catch(()=>{})};["pointerdown","keydown","touchstart","click"].forEach(n=>{window.addEventListener(n,s,{passive:!0})}),wg=!0}function Tg(){if(e1(),gt){gt.state==="suspended"&&gt.resume().catch(()=>{});return}try{const s=typeof window<"u"?window.AudioContext||window.webkitAudioContext:null;if(!s)return;gt=new s,Nr=gt.createGain(),Nr.gain.value=JE?1:0,Nr.connect(gt.destination),so=gt.createOscillator(),oo=gt.createOscillator(),so.type="sawtooth",oo.type="square",Yi=gt.createBiquadFilter(),Yi.type="lowpass",Yi.frequency.value=800,Yi.Q.value=2.5,xi=gt.createGain(),xi.gain.value=0,so.connect(Yi),oo.connect(Yi),Yi.connect(xi),xi.connect(Nr),so.start(),oo.start();const e=gt.sampleRate||44100,n=e*2,r=gt.createBuffer(1,n,e),a=r.getChannelData(0);for(let l=0;l<n;l++)a[l]=Math.random()*2-1;ea=gt.createBufferSource(),ea.buffer=r,ea.loop=!0,Lr=gt.createBiquadFilter(),Lr.type="bandpass",Lr.frequency.value=400,Lr.Q.value=1,Fr=gt.createGain(),Fr.gain.value=0,ea.connect(Lr),Lr.connect(Fr),Fr.connect(Nr),ea.start()}catch(s){console.warn("Web Audio API initialization deferred or not supported",s)}}function t1(s,e,n){if(!gt)return;gt.state==="suspended"&&gt.resume().catch(()=>{});const r=gt.currentTime,a=Math.max(0,Math.min(25e3,Number(s)||0)),l=Math.max(0,Math.min(500,Number(n)||0)),u=60+a/15e3*650;so&&so.frequency.setTargetAtTime(u,r,.03),oo&&oo.frequency.setTargetAtTime(u*.5,r,.03),Yi&&Yi.frequency.setTargetAtTime(300+a/15e3*4500,r,.05);const f=.05+Math.min(.25,a/15e3*.22);xi&&xi.gain.setTargetAtTime(f,r,.05),Lr&&Lr.frequency.setTargetAtTime(400+l/350*1800,r,.08);const h=Math.min(.22,l/350*.22);Fr&&Fr.gain.setTargetAtTime(h,r,.08)}function n1(){if(!gt)return;const s=gt.currentTime;xi&&(xi.gain.setValueAtTime(.01,s),xi.gain.exponentialRampToValueAtTime(.2,s+.08));try{const e=gt.createOscillator(),n=gt.createGain();e.type="triangle",e.frequency.setValueAtTime(160,s),e.frequency.exponentialRampToValueAtTime(30,s+.05),n.gain.setValueAtTime(.3,s),n.gain.exponentialRampToValueAtTime(.001,s+.05),e.connect(n),n.connect(Nr||gt.destination),e.start(s),e.stop(s+.05)}catch{}}function i1(s=.5){if(!gt)return;const e=gt.currentTime,n=Math.max(0,Math.min(1,Number(s)||.5));if(!(n<=.01))try{const r=gt.createOscillator(),a=gt.createBiquadFilter(),l=gt.createGain();r.type="sawtooth",r.frequency.setValueAtTime(950+(Math.random()*200-100),e),a.type="bandpass",a.frequency.setValueAtTime(1200,e),l.gain.setValueAtTime(.12*n,e),l.gain.exponentialRampToValueAtTime(.001,e+.15),r.connect(a),a.connect(l),l.connect(Nr||gt.destination),r.start(e),r.stop(e+.15)}catch{}}function Ag(s=!1){if(!gt)return;const e=gt.currentTime;try{const n=gt.createOscillator(),r=gt.createGain();n.type="sine",n.frequency.setValueAtTime(s?1200:440,e),r.gain.setValueAtTime(.3,e),r.gain.exponentialRampToValueAtTime(.001,e+(s?.4:.2)),n.connect(r),r.connect(Nr||gt.destination),n.start(e),n.stop(e+(s?.4:.2))}catch{}}function ud(){if(xi&&gt)try{xi.gain.setValueAtTime(0,gt.currentTime)}catch{}if(Fr&&gt)try{Fr.gain.setValueAtTime(0,gt.currentTime)}catch{}}function r1({playerCar:s,aiCars:e=[],track:n,selectedCar:r,cameraMode:a="chase",weather:l="clear",quality:u="high",isRacing:f=!1,inputsRef:h,difficulty:p="pro",onPhysicsTick:v}){const x=Qe.useRef(null),y=Qe.useRef(null),S=Qe.useRef(null),M=Qe.useRef(null),T=Qe.useRef(null),_=Qe.useRef(null),g=Qe.useRef({}),I=Qe.useRef(null),D=Qe.useRef(null),C=Qe.useRef(s),z=Qe.useRef(e),k=Qe.useRef(f),O=Qe.useRef(a),G=Qe.useRef(r),P=Qe.useRef(p),R=Qe.useRef(n),H=Qe.useRef(l),ie=Qe.useRef(v);return Qe.useEffect(()=>{C.current=s},[s]),Qe.useEffect(()=>{k.current=f},[f]),Qe.useEffect(()=>{O.current=a},[a]),Qe.useEffect(()=>{G.current=r},[r]),Qe.useEffect(()=>{P.current=p},[p]),Qe.useEffect(()=>{R.current=n},[n]),Qe.useEffect(()=>{H.current=l},[l]),Qe.useEffect(()=>{ie.current=v},[v]),Qe.useEffect(()=>{z.current=e;const Y=y.current;if(!Y)return;const de=Object.keys(g.current),me=new Set(e.map(Q=>Q.id));de.forEach(Q=>{if(!me.has(Q)){const re=g.current[Q];re&&re.mesh&&(Y.remove(re.mesh),io(re.mesh)),delete g.current[Q]}}),e.forEach(Q=>{if(!g.current[Q.id]){const re=Mg(Q.carId)||{primaryColor:"#ff0844",secondaryColor:"#ffb199"},B=cd(re);Y.add(B.mesh),g.current[Q.id]=B}})},[e]),Qe.useEffect(()=>{const Y=x.current;if(!Y)return;const de=Math.max(1,Y.clientWidth||window.innerWidth||1),me=Math.max(1,Y.clientHeight||window.innerHeight||1),Q=new w0;y.current=Q;const re=new vn(65,de/me,.1,2e3);M.current=re;const B=new $E(re);T.current=B;const he=new V0({antialias:u!=="low",alpha:!1});he.setPixelRatio(Math.min(window.devicePixelRatio,u==="ultra"?2:1.5)),he.setSize(de,me),he.toneMapping=Ad,he.toneMappingExposure=1,he.outputColorSpace=Gn,he.shadowMap.enabled=u==="ultra"||u==="high",he.shadowMap.type=wd,S.current=he,Y.appendChild(he.domElement);const L=WE(n,Q);D.current=L;const E=cd(r);if(Q.add(E.mesh),_.current=E,g.current={},z.current&&z.current.length>0&&z.current.forEach(pe=>{const Te=Mg(pe.carId)||{primaryColor:"#ff0844",secondaryColor:"#ffb199"},Ee=cd(Te);Q.add(Ee.mesh),g.current[pe.id]=Ee}),l==="rain"||u!=="low"){const pe=l==="rain"?2500:400,Te=new Nn,Ee=new Float32Array(pe*3);for(let Oe=0;Oe<pe*3;Oe+=3)Ee[Oe]=(Math.random()-.5)*350,Ee[Oe+1]=Math.random()*120,Ee[Oe+2]=(Math.random()-.5)*350;Te.setAttribute("position",new oi(Ee,3));const Ne=new Yd({color:l==="rain"?9684477:16777215,size:l==="rain"?.7:1.4,transparent:!0,opacity:.55}),Ke=new T0(Te,Ne);Q.add(Ke),I.current=Ke}const W=()=>{if(!Y||!S.current||!M.current)return;const pe=Y.clientWidth,Te=Y.clientHeight;pe<=0||Te<=0||(M.current.aspect=pe/Te,M.current.updateProjectionMatrix(),S.current.setSize(pe,Te))};window.addEventListener("resize",W);const ve=1/60;let X=0,ne=performance.now(),fe;const ae=pe=>{fe=requestAnimationFrame(ae);const Te=(pe-ne)/1e3,Ee=Math.min(.1,Math.max(0,Te));if(ne=pe,k.current)for(X+=Ee;X>=ve;){if(C.current&&h.current&&G.current){const Ne=C.current,Ke=Ne.gear;KE(Ne,h.current,G.current,ve,P.current||"pro"),t1(Ne.rpm,Ne.gear,Ne.speedKmH),Ne.gear!==Ke&&n1(),Ne.isSlipping&&i1(.4)}z.current&&z.current.length>0&&R.current&&z.current.forEach(Ne=>{QE(Ne,R.current.points,P.current||"pro",ve)}),ie.current&&ie.current(ve),X-=ve}if(_.current&&C.current&&_.current.update(C.current,Ee),g.current&&z.current&&z.current.forEach(Ne=>{const Ke=g.current[Ne.id];Ke&&Ne.state&&Ke.update(Ne.state,Ee)}),T.current&&C.current&&T.current.update(C.current,O.current||"chase",Ee),I.current){const Ne=I.current.geometry.attributes.position.array,Ke=H.current==="rain"?2.5:.2;for(let Oe=1;Oe<Ne.length;Oe+=3)Ne[Oe]-=Ke,Ne[Oe]<0&&(Ne[Oe]=120);I.current.geometry.attributes.position.needsUpdate=!0}S.current&&y.current&&M.current&&S.current.render(y.current,M.current)};return fe=requestAnimationFrame(ae),()=>{cancelAnimationFrame(fe),window.removeEventListener("resize",W),g.current&&(Object.values(g.current).forEach(pe=>{pe&&pe.mesh&&io(pe.mesh)}),g.current={}),_.current&&_.current.mesh&&(io(_.current.mesh),_.current=null),I.current&&(io(I.current),I.current=null),y.current&&(io(y.current),y.current.clear()),Y&&S.current&&S.current.domElement&&Y.contains(S.current.domElement)&&Y.removeChild(S.current.domElement),S.current&&S.current.dispose()}},[n,r,u,l]),J.jsx("div",{ref:x,className:"webgl-canvas-container",style:{position:"absolute",inset:0,width:"100%",height:"100%",overflow:"hidden",zIndex:0}})}/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s1=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),G0=(...s)=>s.filter((e,n,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var o1={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a1=Qe.forwardRef(({color:s="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:a="",children:l,iconNode:u,...f},h)=>Qe.createElement("svg",{ref:h,...o1,width:e,height:e,stroke:s,strokeWidth:r?Number(n)*24/Number(e):n,className:G0("lucide",a),...f},[...u.map(([p,v])=>Qe.createElement(p,v)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const In=(s,e)=>{const n=Qe.forwardRef(({className:r,...a},l)=>Qe.createElement(a1,{ref:l,iconNode:e,className:G0(`lucide-${s1(s)}`,r),...a}));return n.displayName=`${s}`,n};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l1=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],c1=In("ArrowLeft",l1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u1=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],f1=In("ArrowRight",u1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d1=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],h1=In("Award",d1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p1=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],m1=In("Camera",p1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g1=[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M16 14v6",key:"1j4efv"}],["path",{d:"M8 14v6",key:"17c4r9"}],["path",{d:"M12 16v6",key:"c8a4gj"}]],v1=In("CloudRain",g1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _1=[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],x1=In("Compass",_1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y1=[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]],S1=In("Flag",y1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M1=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],E1=In("House",M1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w1=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]],T1=In("Pause",w1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A1=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],Rg=In("Play",A1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R1=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],W0=In("RotateCcw",R1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C1=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],b1=In("Settings",C1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P1=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],L1=In("Sun",P1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D1=[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]],X0=In("Trophy",D1);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N1=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],j0=In("Zap",N1);function I1({playerCar:s,aiCars:e,track:n,totalLaps:r=3,playerPosition:a=1,raceNotification:l="",cameraMode:u,onToggleCamera:f,onPause:h}){const p=(s==null?void 0:s.speedKmH)||0,v=(s==null?void 0:s.rpm)||1800,x=(s==null?void 0:s.gear)||1,y=(s==null?void 0:s.lap)||1,S=(s==null?void 0:s.drsActive)||!1,M=(s==null?void 0:s.brake)||0,T=Math.min(100,Math.max(0,(v-1800)/13e3*100));return J.jsxs("div",{className:"hud-overlay",children:[J.jsxs("div",{className:"hud-top-bar",children:[J.jsxs("div",{className:"hud-badge hud-position",children:[J.jsx("span",{className:"hud-label",children:"POS"}),J.jsxs("span",{className:"hud-value-large",children:["P",a]}),J.jsxs("span",{className:"hud-sub",children:["OF ",e.length+1]})]}),J.jsxs("div",{className:"hud-badge hud-lap",children:[J.jsx(S1,{size:16,color:"#00f2fe"}),J.jsxs("div",{children:[J.jsx("span",{className:"hud-label",children:"LAP"}),J.jsxs("span",{className:"hud-value",children:[y," / ",r]})]})]}),l&&J.jsx("div",{className:"hud-notification-banner animated-pop",children:l}),M>.5&&J.jsx("div",{className:"hud-brake-banner animated-pulse",children:"BRAKING"}),J.jsxs("div",{className:"hud-controls-group",children:[S&&J.jsxs("div",{className:"hud-drs-badge animated-pulse",children:[J.jsx(j0,{size:14,color:"#00f2fe"})," DRS READY"]}),J.jsxs("button",{className:"hud-btn-icon",onClick:f,title:"Change Camera View",children:[J.jsx(m1,{size:18}),J.jsx("span",{style:{fontSize:"0.65rem",fontWeight:800},children:u.toUpperCase()})]}),J.jsx("button",{className:"hud-btn-icon",onClick:h,title:"Pause Game",children:J.jsx(T1,{size:18})})]})]}),J.jsxs("div",{className:"hud-minimap-box",children:[J.jsxs("div",{className:"hud-minimap-header",children:[J.jsx(x1,{size:12,color:"#94a3b8"})," ",n.name.toUpperCase()]}),J.jsxs("svg",{className:"hud-minimap-svg",viewBox:"-320 -520 740 1040",children:[J.jsx("polyline",{points:n.points.map(_=>`${_.x},${_.z}`).join(" "),fill:"none",stroke:"rgba(255, 255, 255, 0.25)",strokeWidth:"16",strokeLinecap:"round",strokeLinejoin:"round"}),e.map((_,g)=>J.jsx("circle",{cx:_.state.x,cy:_.state.z,r:"14",fill:"#ff0844"},g)),s&&J.jsx("circle",{cx:s.x,cy:s.z,r:"18",fill:"#00f2fe",stroke:"#ffffff",strokeWidth:"5"})]})]}),J.jsxs("div",{className:"hud-telemetry-box",children:[J.jsxs("svg",{className:"hud-rpm-gauge",viewBox:"0 0 200 120",children:[J.jsx("path",{d:"M 20 100 A 80 80 0 0 1 180 100",fill:"none",stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:"10",strokeLinecap:"round"}),J.jsx("path",{d:"M 20 100 A 80 80 0 0 1 180 100",fill:"none",stroke:T>88?"#ff0844":T>65?"#f59e0b":"#00f2fe",strokeWidth:"10",strokeDasharray:"251",strokeDashoffset:251-251*T/100,strokeLinecap:"round"})]}),J.jsxs("div",{className:"hud-digital-readout",children:[J.jsx("div",{className:"hud-gear",children:x}),J.jsx("div",{className:"hud-speed",children:p}),J.jsx("div",{className:"hud-unit",children:"KM/H"})]})]})]})}function U1({onSteerLeft:s,onSteerRight:e,onSteerRelease:n,onAccelerate:r,onAccelerateRelease:a,onBrake:l,onBrakeRelease:u,onActivateDrs:f,onResetCar:h}){return J.jsxs("div",{className:"mobile-controls-layer",children:[J.jsxs("div",{className:"touch-cluster-left",children:[J.jsx("button",{className:"touch-btn steer-btn",onTouchStart:()=>s(1),onTouchEnd:n,onMouseDown:()=>s(1),onMouseUp:n,children:J.jsx(c1,{size:36})}),J.jsx("button",{className:"touch-btn steer-btn",onTouchStart:()=>e(1),onTouchEnd:n,onMouseDown:()=>e(1),onMouseUp:n,children:J.jsx(f1,{size:36})})]}),J.jsxs("div",{className:"touch-cluster-right",children:[J.jsx("button",{className:"touch-btn brake-btn",onTouchStart:l,onTouchEnd:u,onMouseDown:l,onMouseUp:u,children:"BRAKE"}),J.jsx("button",{className:"touch-btn accel-btn",onTouchStart:r,onTouchEnd:a,onMouseDown:r,onMouseUp:a,children:"DRIVE"})]}),J.jsxs("div",{className:"touch-actions-top",children:[J.jsxs("button",{className:"touch-action-btn",onClick:f,children:[J.jsx(j0,{size:18,color:"#00f2fe"})," DRS"]}),J.jsxs("button",{className:"touch-action-btn",onClick:h,children:[J.jsx(W0,{size:18})," RESET"]})]})]})}const q0=[{id:"meridian-circuit",name:"Meridian Circuit",location:"Silverstone Valley",lengthKm:4.8,lapsDefault:3,turnsCount:14,description:"High-speed modern championship circuit featuring long DRS straights, sweeping double-apex curves, and grandstands.",environment:"day",skyColor:"#0f172a",groundColor:"#1e293b",fogColor:"#0f172a",ambientLight:.8,sunPosition:[100,150,80],weatherOptions:["clear","cloudy","rain"],trackWidth:14,points:[{x:0,z:-150,targetSpeed:340,isDrs:!0},{x:0,z:-350,targetSpeed:330,isDrs:!0},{x:50,z:-420,targetSpeed:140,isApex:!0},{x:150,z:-400,targetSpeed:210},{x:220,z:-250,targetSpeed:160,isApex:!0},{x:200,z:-100,targetSpeed:240},{x:300,z:50,targetSpeed:130,isApex:!0},{x:250,z:200,targetSpeed:220},{x:150,z:350,targetSpeed:150,isApex:!0},{x:0,z:400,targetSpeed:280},{x:-150,z:350,targetSpeed:160,isApex:!0},{x:-220,z:200,targetSpeed:260},{x:-250,z:0,targetSpeed:180,isApex:!0},{x:-180,z:-100,targetSpeed:300,isDrs:!0}]},{id:"kyoto-night",name:"Kyoto Night Street",location:"Kyoto Metropolitan",lengthKm:3.9,lapsDefault:3,turnsCount:16,description:"Challenging urban night track surrounded by glowing neon skyscrapers, tight barrier walls, and wet asphalt reflections.",environment:"night",skyColor:"#05070f",groundColor:"#0a0d1a",fogColor:"#070a14",ambientLight:.35,sunPosition:[0,80,-100],weatherOptions:["clear","rain"],trackWidth:12,points:[{x:0,z:-120,targetSpeed:310,isDrs:!0},{x:0,z:-280,targetSpeed:290,isDrs:!0},{x:40,z:-340,targetSpeed:110,isApex:!0},{x:120,z:-320,targetSpeed:180},{x:180,z:-200,targetSpeed:120,isApex:!0},{x:160,z:-80,targetSpeed:210},{x:240,z:40,targetSpeed:95,isApex:!0},{x:200,z:160,targetSpeed:190},{x:110,z:280,targetSpeed:120,isApex:!0},{x:0,z:320,targetSpeed:240},{x:-110,z:280,targetSpeed:120,isApex:!0},{x:-180,z:160,targetSpeed:220},{x:-200,z:0,targetSpeed:140,isApex:!0},{x:-140,z:-80,targetSpeed:260}]},{id:"desert-crown",name:"Desert Crown",location:"Sahara Oasis",lengthKm:5.4,lapsDefault:3,turnsCount:12,description:"Blistering fast desert circuit with long sweeping curves, warm sunset lighting, sand dunes, and high top speeds.",environment:"sunset",skyColor:"#2a1105",groundColor:"#451a03",fogColor:"#2a1105",ambientLight:.9,sunPosition:[-150,60,200],weatherOptions:["clear","cloudy"],trackWidth:15,points:[{x:0,z:-180,targetSpeed:350,isDrs:!0},{x:0,z:-400,targetSpeed:345,isDrs:!0},{x:70,z:-480,targetSpeed:160,isApex:!0},{x:200,z:-440,targetSpeed:250},{x:280,z:-280,targetSpeed:180,isApex:!0},{x:240,z:-100,targetSpeed:290},{x:350,z:80,targetSpeed:150,isApex:!0},{x:280,z:260,targetSpeed:260},{x:160,z:400,targetSpeed:170,isApex:!0},{x:0,z:450,targetSpeed:310},{x:-170,z:380,targetSpeed:180,isApex:!0},{x:-260,z:220,targetSpeed:280},{x:-280,z:0,targetSpeed:200,isApex:!0},{x:-200,z:-120,targetSpeed:330,isDrs:!0}]}];function F1({selectedCar:s,onSelectCar:e,selectedTrack:n,onSelectTrack:r,difficulty:a,onSelectDifficulty:l,weather:u,onSelectWeather:f,quality:h,onSelectQuality:p,onStartRace:v}){const[x,y]=Qe.useState("race");return J.jsxs("div",{className:"main-menu-overlay screen-fade-enter",children:[J.jsxs("div",{className:"brand-header",children:[J.jsxs("h1",{className:"brand-title",children:["PROJECT ",J.jsx("span",{className:"text-cyan",children:"APEX"})]}),J.jsx("p",{className:"brand-subtitle",children:"HIGH-END WEB RACING EXPERIENCE"})]}),J.jsxs("div",{className:"menu-nav-tabs",children:[J.jsxs("button",{className:`menu-tab ${x==="race"?"active":""}`,onClick:()=>y("race"),children:[J.jsx(Rg,{size:18})," QUICK RACE"]}),J.jsxs("button",{className:`menu-tab ${x==="garage"?"active":""}`,onClick:()=>y("garage"),children:[J.jsx(X0,{size:18})," GARAGE"]}),J.jsxs("button",{className:`menu-tab ${x==="settings"?"active":""}`,onClick:()=>y("settings"),children:[J.jsx(b1,{size:18})," SETTINGS"]})]}),x==="race"&&J.jsxs("div",{className:"menu-card glass-panel",children:[J.jsxs("div",{className:"menu-section",children:[J.jsx("h3",{className:"section-title",children:"SELECT CIRCUIT"}),J.jsx("div",{className:"track-grid",children:q0.map(S=>J.jsxs("button",{className:`track-card ${n.id===S.id?"active":""}`,onClick:()=>r(S),children:[J.jsx("div",{className:"track-name",children:S.name}),J.jsxs("div",{className:"track-info",children:[S.location," • ",S.lengthKm," KM"]})]},S.id))})]}),J.jsxs("div",{className:"menu-section",children:[J.jsx("h3",{className:"section-title",children:"AI DIFFICULTY"}),J.jsx("div",{className:"difficulty-grid",children:["rookie","pro","apex","impossible"].map(S=>J.jsx("button",{className:`diff-btn ${a===S?"active":""}`,onClick:()=>l(S),children:S==="impossible"?"CYBER GOD":S.toUpperCase()},S))})]}),J.jsxs("div",{className:"menu-section",children:[J.jsx("h3",{className:"section-title",children:"WEATHER & TIME"}),J.jsxs("div",{className:"weather-grid",children:[J.jsxs("button",{className:`weather-btn ${u==="clear"?"active":""}`,onClick:()=>f("clear"),children:[J.jsx(L1,{size:18})," CLEAR"]}),J.jsxs("button",{className:`weather-btn ${u==="rain"?"active":""}`,onClick:()=>f("rain"),children:[J.jsx(v1,{size:18})," RAIN"]})]})]}),J.jsxs("button",{className:"btn-primary start-race-btn",onClick:v,children:[J.jsx(Rg,{size:24})," START RACE"]})]}),x==="garage"&&J.jsxs("div",{className:"menu-card glass-panel",children:[J.jsx("h3",{className:"section-title",children:"FORMULA FLEET"}),J.jsx("div",{className:"car-selection-grid",children:Nc.map(S=>J.jsxs("button",{className:`car-card ${s.id===S.id?"active":""}`,onClick:()=>e(S),children:[J.jsx("div",{className:"car-color-swatch",style:{background:S.primaryColor}}),J.jsx("div",{className:"car-card-name",children:S.name}),J.jsx("div",{className:"car-card-team",children:S.team}),J.jsxs("div",{className:"car-card-speed",children:[S.topSpeed," KM/H"]})]},S.id))}),J.jsxs("div",{className:"selected-car-specs",children:[J.jsxs("h4",{children:[s.name," Technical Data"]}),J.jsx("p",{children:s.description}),J.jsxs("div",{className:"spec-bar-row",children:[J.jsx("span",{children:"Top Speed"}),J.jsx("div",{className:"bar-bg",children:J.jsx("div",{className:"bar-fill",style:{width:`${s.topSpeed/360*100}%`}})})]}),J.jsxs("div",{className:"spec-bar-row",children:[J.jsx("span",{children:"Acceleration"}),J.jsx("div",{className:"bar-bg",children:J.jsx("div",{className:"bar-fill",style:{width:`${s.acceleration/10*100}%`}})})]}),J.jsxs("div",{className:"spec-bar-row",children:[J.jsx("span",{children:"Cornering"}),J.jsx("div",{className:"bar-bg",children:J.jsx("div",{className:"bar-fill",style:{width:`${s.cornering/10*100}%`}})})]})]})]}),x==="settings"&&J.jsxs("div",{className:"menu-card glass-panel",children:[J.jsx("h3",{className:"section-title",children:"GRAPHICS & PERFORMANCE PROFILE"}),J.jsx("div",{className:"quality-grid",children:["ultra","high","medium","low"].map(S=>J.jsx("button",{className:`quality-btn ${h===S?"active":""}`,onClick:()=>p(S),children:S.toUpperCase()},S))}),J.jsxs("div",{className:"controls-guide",children:[J.jsx("h4",{children:"KEYBOARD CONTROLS"}),J.jsxs("p",{children:[J.jsx("strong",{children:"W / Up Arrow:"})," Accelerate"]}),J.jsxs("p",{children:[J.jsx("strong",{children:"S / Down Arrow:"})," Brake / Reverse"]}),J.jsxs("p",{children:[J.jsx("strong",{children:"A / D or Left/Right Arrow:"})," Steering"]}),J.jsxs("p",{children:[J.jsx("strong",{children:"C:"})," Change Camera View"]}),J.jsxs("p",{children:[J.jsx("strong",{children:"Space:"})," DRS Boost"]}),J.jsxs("p",{children:[J.jsx("strong",{children:"Esc:"})," Pause Game"]})]})]})]})}function O1({onStartComplete:s}){const[e,n]=Qe.useState(0),[r,a]=Qe.useState(!1);return Qe.useEffect(()=>{let l;[1,2,3,4,5].forEach((h,p)=>{setTimeout(()=>{n(h),Ag(!1)},(p+1)*1e3)});const f=6500+Math.random()*1500;return l=setTimeout(()=>{n(0),a(!0),Ag(!0),setTimeout(()=>{s()},1e3)},f),()=>clearTimeout(l)},[]),J.jsxs("div",{className:"race-start-overlay screen-fade-enter",children:[J.jsx("div",{className:"gantry-light-box",children:[1,2,3,4,5].map(l=>J.jsx("div",{className:`gantry-light ${l<=e?"red-on":r?"green-on":""}`},l))}),J.jsx("div",{className:"start-banner-text",children:r?J.jsx("span",{className:"text-green animated-pop",children:"LIGHTS OUT AND AWAY WE GO!"}):J.jsx("span",{children:"GRID FORMATION"})})]})}var Jd={};(function s(e,n,r,a){var l=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),u=typeof Path2D=="function"&&typeof DOMMatrix=="function",f=(function(){if(!e.OffscreenCanvas)return!1;try{var L=new OffscreenCanvas(1,1),E=L.getContext("2d");E.fillRect(0,0,1,1);var W=L.transferToImageBitmap();E.createPattern(W,"no-repeat")}catch{return!1}return!0})();function h(){}function p(L){var E=n.exports.Promise,W=E!==void 0?E:e.Promise;return typeof W=="function"?new W(L):(L(h,h),null)}var v=(function(L,E){return{transform:function(W){if(L)return W;if(E.has(W))return E.get(W);var ve=new OffscreenCanvas(W.width,W.height),X=ve.getContext("2d");return X.drawImage(W,0,0),E.set(W,ve),ve},clear:function(){E.clear()}}})(f,new Map),x=(function(){var L=Math.floor(16.666666666666668),E,W,ve={},X=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(E=function(ne){var fe=Math.random();return ve[fe]=requestAnimationFrame(function ae(pe){X===pe||X+L-1<pe?(X=pe,delete ve[fe],ne()):ve[fe]=requestAnimationFrame(ae)}),fe},W=function(ne){ve[ne]&&cancelAnimationFrame(ve[ne])}):(E=function(ne){return setTimeout(ne,L)},W=function(ne){return clearTimeout(ne)}),{frame:E,cancel:W}})(),y=(function(){var L,E,W={};function ve(X){function ne(fe,ae){X.postMessage({options:fe||{},callback:ae})}X.init=function(ae){var pe=ae.transferControlToOffscreen();X.postMessage({canvas:pe},[pe])},X.fire=function(ae,pe,Te){if(E)return ne(ae,null),E;var Ee=Math.random().toString(36).slice(2);return E=p(function(Ne){function Ke(Oe){Oe.data.callback===Ee&&(delete W[Ee],X.removeEventListener("message",Ke),E=null,v.clear(),Te(),Ne())}X.addEventListener("message",Ke),ne(ae,Ee),W[Ee]=Ke.bind(null,{data:{callback:Ee}})}),E},X.reset=function(){X.postMessage({reset:!0});for(var ae in W)W[ae](),delete W[ae]}}return function(){if(L)return L;if(!r&&l){var X=["var CONFETTI, SIZE = {}, module = {};","("+s.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{L=new Worker(URL.createObjectURL(new Blob([X])))}catch(ne){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",ne),null}ve(L)}return L}})(),S={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function M(L,E){return E?E(L):L}function T(L){return L!=null}function _(L,E,W){return M(L&&T(L[E])?L[E]:S[E],W)}function g(L){return L<0?0:Math.floor(L)}function I(L,E){return Math.floor(Math.random()*(E-L))+L}function D(L){return parseInt(L,16)}function C(L){return L.map(z)}function z(L){var E=String(L).replace(/[^0-9a-f]/gi,"");return E.length<6&&(E=E[0]+E[0]+E[1]+E[1]+E[2]+E[2]),{r:D(E.substring(0,2)),g:D(E.substring(2,4)),b:D(E.substring(4,6))}}function k(L){var E=_(L,"origin",Object);return E.x=_(E,"x",Number),E.y=_(E,"y",Number),E}function O(L){L.width=document.documentElement.clientWidth,L.height=document.documentElement.clientHeight}function G(L){var E=L.getBoundingClientRect();L.width=E.width,L.height=E.height}function P(L){var E=document.createElement("canvas");return E.style.position="fixed",E.style.top="0px",E.style.left="0px",E.style.pointerEvents="none",E.style.zIndex=L,E}function R(L,E,W,ve,X,ne,fe,ae,pe){L.save(),L.translate(E,W),L.rotate(ne),L.scale(ve,X),L.arc(0,0,1,fe,ae,pe),L.restore()}function H(L){var E=L.angle*(Math.PI/180),W=L.spread*(Math.PI/180);return{x:L.x,y:L.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:L.startVelocity*.5+Math.random()*L.startVelocity,angle2D:-E+(.5*W-Math.random()*W),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:L.color,shape:L.shape,tick:0,totalTicks:L.ticks,decay:L.decay,drift:L.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:L.gravity*3,ovalScalar:.6,scalar:L.scalar,flat:L.flat}}function ie(L,E){E.x+=Math.cos(E.angle2D)*E.velocity+E.drift,E.y+=Math.sin(E.angle2D)*E.velocity+E.gravity,E.velocity*=E.decay,E.flat?(E.wobble=0,E.wobbleX=E.x+10*E.scalar,E.wobbleY=E.y+10*E.scalar,E.tiltSin=0,E.tiltCos=0,E.random=1):(E.wobble+=E.wobbleSpeed,E.wobbleX=E.x+10*E.scalar*Math.cos(E.wobble),E.wobbleY=E.y+10*E.scalar*Math.sin(E.wobble),E.tiltAngle+=.1,E.tiltSin=Math.sin(E.tiltAngle),E.tiltCos=Math.cos(E.tiltAngle),E.random=Math.random()+2);var W=E.tick++/E.totalTicks,ve=E.x+E.random*E.tiltCos,X=E.y+E.random*E.tiltSin,ne=E.wobbleX+E.random*E.tiltCos,fe=E.wobbleY+E.random*E.tiltSin;if(L.fillStyle="rgba("+E.color.r+", "+E.color.g+", "+E.color.b+", "+(1-W)+")",L.beginPath(),u&&E.shape.type==="path"&&typeof E.shape.path=="string"&&Array.isArray(E.shape.matrix))L.fill(re(E.shape.path,E.shape.matrix,E.x,E.y,Math.abs(ne-ve)*.1,Math.abs(fe-X)*.1,Math.PI/10*E.wobble));else if(E.shape.type==="bitmap"){var ae=Math.PI/10*E.wobble,pe=Math.abs(ne-ve)*.1,Te=Math.abs(fe-X)*.1,Ee=E.shape.bitmap.width*E.scalar,Ne=E.shape.bitmap.height*E.scalar,Ke=new DOMMatrix([Math.cos(ae)*pe,Math.sin(ae)*pe,-Math.sin(ae)*Te,Math.cos(ae)*Te,E.x,E.y]);Ke.multiplySelf(new DOMMatrix(E.shape.matrix));var Oe=L.createPattern(v.transform(E.shape.bitmap),"no-repeat");Oe.setTransform(Ke),L.globalAlpha=1-W,L.fillStyle=Oe,L.fillRect(E.x-Ee/2,E.y-Ne/2,Ee,Ne),L.globalAlpha=1}else if(E.shape==="circle")L.ellipse?L.ellipse(E.x,E.y,Math.abs(ne-ve)*E.ovalScalar,Math.abs(fe-X)*E.ovalScalar,Math.PI/10*E.wobble,0,2*Math.PI):R(L,E.x,E.y,Math.abs(ne-ve)*E.ovalScalar,Math.abs(fe-X)*E.ovalScalar,Math.PI/10*E.wobble,0,2*Math.PI);else if(E.shape==="star")for(var F=Math.PI/2*3,Tt=4*E.scalar,tt=8*E.scalar,nt=E.x,Ve=E.y,xt=5,ke=Math.PI/xt;xt--;)nt=E.x+Math.cos(F)*tt,Ve=E.y+Math.sin(F)*tt,L.lineTo(nt,Ve),F+=ke,nt=E.x+Math.cos(F)*Tt,Ve=E.y+Math.sin(F)*Tt,L.lineTo(nt,Ve),F+=ke;else L.moveTo(Math.floor(E.x),Math.floor(E.y)),L.lineTo(Math.floor(E.wobbleX),Math.floor(X)),L.lineTo(Math.floor(ne),Math.floor(fe)),L.lineTo(Math.floor(ve),Math.floor(E.wobbleY));return L.closePath(),L.fill(),E.tick<E.totalTicks}function Y(L,E,W,ve,X){var ne=E.slice(),fe=L.getContext("2d"),ae,pe,Te=p(function(Ee){function Ne(){ae=pe=null,fe.clearRect(0,0,ve.width,ve.height),v.clear(),X(),Ee()}function Ke(){r&&!(ve.width===a.width&&ve.height===a.height)&&(ve.width=L.width=a.width,ve.height=L.height=a.height),!ve.width&&!ve.height&&(W(L),ve.width=L.width,ve.height=L.height),fe.clearRect(0,0,ve.width,ve.height),ne=ne.filter(function(Oe){return ie(fe,Oe)}),ne.length?ae=x.frame(Ke):Ne()}ae=x.frame(Ke),pe=Ne});return{addFettis:function(Ee){return ne=ne.concat(Ee),Te},canvas:L,promise:Te,reset:function(){ae&&x.cancel(ae),pe&&pe()}}}function de(L,E){var W=!L,ve=!!_(E||{},"resize"),X=!1,ne=_(E,"disableForReducedMotion",Boolean),fe=l&&!!_(E||{},"useWorker"),ae=fe?y():null,pe=W?O:G,Te=L&&ae?!!L.__confetti_initialized:!1,Ee=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Ne;function Ke(F,Tt,tt){for(var nt=_(F,"particleCount",g),Ve=_(F,"angle",Number),xt=_(F,"spread",Number),ke=_(F,"startVelocity",Number),N=_(F,"decay",Number),A=_(F,"gravity",Number),se=_(F,"drift",Number),xe=_(F,"colors",C),ye=_(F,"ticks",Number),_e=_(F,"shapes"),Xe=_(F,"scalar"),Le=!!_(F,"flat"),Ue=k(F),ct=nt,we=[],ze=L.width*Ue.x,Je=L.height*Ue.y;ct--;)we.push(H({x:ze,y:Je,angle:Ve,spread:xt,startVelocity:ke,color:xe[ct%xe.length],shape:_e[I(0,_e.length)],ticks:ye,decay:N,gravity:A,drift:se,scalar:Xe,flat:Le}));return Ne?Ne.addFettis(we):(Ne=Y(L,we,pe,Tt,tt),Ne.promise)}function Oe(F){var Tt=ne||_(F,"disableForReducedMotion",Boolean),tt=_(F,"zIndex",Number);if(Tt&&Ee)return p(function(ke){ke()});W&&Ne?L=Ne.canvas:W&&!L&&(L=P(tt),document.body.appendChild(L)),ve&&!Te&&pe(L);var nt={width:L.width,height:L.height};ae&&!Te&&ae.init(L),Te=!0,ae&&(L.__confetti_initialized=!0);function Ve(){if(ae){var ke={getBoundingClientRect:function(){if(!W)return L.getBoundingClientRect()}};pe(ke),ae.postMessage({resize:{width:ke.width,height:ke.height}});return}nt.width=nt.height=null}function xt(){Ne=null,ve&&(X=!1,e.removeEventListener("resize",Ve)),W&&L&&(document.body.contains(L)&&document.body.removeChild(L),L=null,Te=!1)}return ve&&!X&&(X=!0,e.addEventListener("resize",Ve,!1)),ae?ae.fire(F,nt,xt):Ke(F,nt,xt)}return Oe.reset=function(){ae&&ae.reset(),Ne&&Ne.reset()},Oe}var me;function Q(){return me||(me=de(null,{useWorker:!0,resize:!0})),me}function re(L,E,W,ve,X,ne,fe){var ae=new Path2D(L),pe=new Path2D;pe.addPath(ae,new DOMMatrix(E));var Te=new Path2D;return Te.addPath(pe,new DOMMatrix([Math.cos(fe)*X,Math.sin(fe)*X,-Math.sin(fe)*ne,Math.cos(fe)*ne,W,ve])),Te}function B(L){if(!u)throw new Error("path confetti are not supported in this browser");var E,W;typeof L=="string"?E=L:(E=L.path,W=L.matrix);var ve=new Path2D(E),X=document.createElement("canvas"),ne=X.getContext("2d");if(!W){for(var fe=1e3,ae=fe,pe=fe,Te=0,Ee=0,Ne,Ke,Oe=0;Oe<fe;Oe+=2)for(var F=0;F<fe;F+=2)ne.isPointInPath(ve,Oe,F,"nonzero")&&(ae=Math.min(ae,Oe),pe=Math.min(pe,F),Te=Math.max(Te,Oe),Ee=Math.max(Ee,F));Ne=Te-ae,Ke=Ee-pe;var Tt=10,tt=Math.min(Tt/Ne,Tt/Ke);W=[tt,0,0,tt,-Math.round(Ne/2+ae)*tt,-Math.round(Ke/2+pe)*tt]}return{type:"path",path:E,matrix:W}}function he(L){var E,W=1,ve="#000000",X='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof L=="string"?E=L:(E=L.text,W="scalar"in L?L.scalar:W,X="fontFamily"in L?L.fontFamily:X,ve="color"in L?L.color:ve);var ne=10*W,fe=""+ne+"px "+X,ae=new OffscreenCanvas(ne,ne),pe=ae.getContext("2d");pe.font=fe;var Te=pe.measureText(E),Ee=Math.ceil(Te.actualBoundingBoxRight+Te.actualBoundingBoxLeft),Ne=Math.ceil(Te.actualBoundingBoxAscent+Te.actualBoundingBoxDescent),Ke=2,Oe=Te.actualBoundingBoxLeft+Ke,F=Te.actualBoundingBoxAscent+Ke;Ee+=Ke+Ke,Ne+=Ke+Ke,ae=new OffscreenCanvas(Ee,Ne),pe=ae.getContext("2d"),pe.font=fe,pe.fillStyle=ve,pe.fillText(E,Oe,F);var Tt=1/W;return{type:"bitmap",bitmap:ae.transferToImageBitmap(),matrix:[Tt,0,0,Tt,-Ee*Tt/2,-Ne*Tt/2]}}n.exports=function(){return Q().apply(this,arguments)},n.exports.reset=function(){Q().reset()},n.exports.create=de,n.exports.shapeFromPath=B,n.exports.shapeFromText=he})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),Jd,!1);const k1=Jd.exports;Jd.exports.create;function z1({position:s=1,totalTime:e="03:45.120",fastestLap:n="01:14.280",onRetry:r,onMainMenu:a}){return Qe.useEffect(()=>{s===1&&k1({particleCount:120,spread:80,origin:{y:.6}})},[s]),J.jsx("div",{className:"modal-backdrop screen-fade-enter",children:J.jsxs("div",{className:"modal-card glass-panel",children:[J.jsx("div",{className:"result-trophy-icon",children:J.jsx(X0,{size:48,color:s===1?"#eab308":"#00f2fe"})}),J.jsx("h2",{className:"result-title",children:s===1?"VICTORY!":`FINISHED P${s}`}),J.jsx("p",{className:"result-subtitle",children:"CHAMPIONSHIP GRAND PRIX RESULT"}),J.jsxs("div",{className:"result-stats-box",children:[J.jsxs("div",{className:"result-stat-row",children:[J.jsxs("span",{className:"stat-label",children:[J.jsx(h1,{size:16})," Finish Position"]}),J.jsxs("span",{className:"stat-value text-cyan",children:["P",s]})]}),J.jsxs("div",{className:"result-stat-row",children:[J.jsx("span",{className:"stat-label",children:"Total Time"}),J.jsx("span",{className:"stat-value",children:e})]}),J.jsxs("div",{className:"result-stat-row",children:[J.jsx("span",{className:"stat-label",children:"Fastest Lap"}),J.jsx("span",{className:"stat-value text-yellow",children:n})]})]}),J.jsxs("div",{className:"result-btn-row",children:[J.jsxs("button",{className:"btn-primary",onClick:r,children:[J.jsx(W0,{size:20})," RETRY"]}),J.jsxs("button",{className:"btn-secondary",onClick:a,children:[J.jsx(E1,{size:20})," MENU"]})]})]})})}function B1(){const[s,e]=Qe.useState("menu"),[n,r]=Qe.useState(Nc[0]),[a,l]=Qe.useState(q0[0]),[u,f]=Qe.useState("pro"),[h,p]=Qe.useState("clear"),[v,x]=Qe.useState("high"),[y,S]=Qe.useState("chase"),[M,T]=Qe.useState(()=>Eg(0,-20,0)),[_,g]=Qe.useState([]),[I,D]=Qe.useState(1),[C,z]=Qe.useState(0),k=Qe.useRef(0),O=Qe.useRef(1),G=Qe.useRef(0),P=Qe.useRef({throttle:0,brake:0,steering:0,handbrake:!1,drs:!1}),R=Qe.useRef({}),[H,ie]=Qe.useState(!1);Qe.useEffect(()=>{ie("ontouchstart"in window||navigator.maxTouchPoints>0)},[]);const Y=Qe.useCallback(()=>{const Q=["chase","cockpit","hood","orbit"];S(re=>{const B=Q.indexOf(re);return Q[(B+1)%Q.length]})},[]);Qe.useEffect(()=>{const Q=B=>{Tg(),R.current[B.code]=!0,B.code==="KeyC"&&Y(),B.code==="Escape"&&s==="racing"&&(e("paused"),ud())},re=B=>{R.current[B.code]=!1};return window.addEventListener("keydown",Q),window.addEventListener("keyup",re),()=>{window.removeEventListener("keydown",Q),window.removeEventListener("keyup",re)}},[s,Y]);const de=()=>{Tg();const Q=Eg(0,-20,0),re=ZE(a,7);T(Q),g(re),k.current=0,O.current=1,G.current=0,z(0),D(1),e("countdown")},me=Qe.useCallback(Q=>{const re=R.current;let B=re.KeyW||re.ArrowUp?1:0,he=re.KeyS||re.ArrowDown?1:0,L=re.KeyA||re.ArrowLeft?1:0,E=re.KeyD||re.ArrowRight?1:0,W=re.Space||!1;P.current.touchThrottle!==void 0&&P.current.touchThrottle>0&&(B=P.current.touchThrottle),P.current.touchBrake!==void 0&&P.current.touchBrake>0&&(he=P.current.touchBrake),P.current.touchSteer!==void 0&&P.current.touchSteer!==0&&(L=P.current.touchSteer<0?Math.abs(P.current.touchSteer):0,E=P.current.touchSteer>0?P.current.touchSteer:0);const ve=E-L;if(P.current.throttle=B,P.current.brake=he,P.current.steering=ve,P.current.drs=W,k.current+=Q,M.lap>a.lapsDefault&&!M.finished){M.finished=!0,z(k.current),D(O.current),e("results"),ud();return}let X=1;const ne=(M.lap||1)*1e4+(M.lastCheckpointIdx||0)*100+(M.speed||0);_.forEach(fe=>{(fe.state.lap||1)*1e4+(fe.state.targetWaypointIdx||0)*100+(fe.state.speed||0)>ne&&(X+=1)}),O.current=X,G.current+=Q,G.current>=.1&&(z(k.current),D(O.current),G.current=0)},[M,_,a]);return J.jsxs("div",{className:"app-container",children:[J.jsx(r1,{playerCar:M,aiCars:_,track:a,selectedCar:n,cameraMode:s==="menu"?"orbit":y,weather:h,quality:v,isRacing:s==="racing",inputsRef:P,difficulty:u,onPhysicsTick:me}),s==="menu"&&J.jsx(F1,{selectedCar:n,onSelectCar:r,selectedTrack:a,onSelectTrack:l,difficulty:u,onSelectDifficulty:f,weather:h,onSelectWeather:p,quality:v,onSelectQuality:x,onStartRace:de}),s==="countdown"&&J.jsx(O1,{onStartComplete:()=>e("racing")}),(s==="racing"||s==="paused")&&J.jsx(I1,{playerCar:M,aiCars:_,track:a,totalLaps:a.lapsDefault,playerPosition:I,cameraMode:y,onToggleCamera:Y,onPause:()=>{e("paused"),ud()}}),s==="racing"&&H&&J.jsx(U1,{onSteerLeft:Q=>{P.current.touchSteer=-Q},onSteerRight:Q=>{P.current.touchSteer=Q},onSteerRelease:()=>{P.current.touchSteer=0},onAccelerate:()=>{P.current.touchThrottle=1},onAccelerateRelease:()=>{P.current.touchThrottle=0},onBrake:()=>{P.current.touchBrake=1},onBrakeRelease:()=>{P.current.touchBrake=0},onActivateDrs:()=>{P.current.drs=!0,setTimeout(()=>{P.current.drs=!1},2e3)},onResetCar:()=>{T(Q=>({...Q,x:0,z:0,speed:0,heading:0}))}}),s==="paused"&&J.jsx("div",{className:"modal-backdrop screen-fade-enter",children:J.jsxs("div",{className:"modal-card glass-panel",children:[J.jsx("h2",{className:"result-title",children:"RACE PAUSED"}),J.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",width:"100%",marginTop:"1.5rem"},children:[J.jsx("button",{className:"btn-primary",onClick:()=>e("racing"),children:"RESUME RACE"}),J.jsx("button",{className:"btn-secondary",onClick:de,children:"RESTART RACE"}),J.jsx("button",{className:"btn-secondary",onClick:()=>e("menu"),children:"MAIN MENU"})]})]})}),s==="results"&&J.jsx(z1,{position:I,totalTime:`${Math.floor(C/60)}:${(C%60).toFixed(2)}`,fastestLap:"01:14.32",onRetry:de,onMainMenu:()=>e("menu")})]})}F_.createRoot(document.getElementById("root")).render(J.jsx(b_.StrictMode,{children:J.jsx(B1,{})}));
