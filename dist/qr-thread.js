function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}var e,r,n
function o(t,e){var r=Object.keys(t)
if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t)
e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{}
e%2?o(Object(r),!0).forEach((function(e){E(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function a(t,e,r,n,o,i,a){try{var u=t[i](a),s=u.value}catch(t){return void r(t)}u.done?e(s):Promise.resolve(s).then(n,o)}function u(t){return function(){var e=this,r=arguments
return new Promise((function(n,o){var i=t.apply(e,r)
function u(t){a(i,n,o,u,s,"next",t)}function s(t){a(i,n,o,u,s,"throw",t)}u(void 0)}))}}function s(t){return function(t){if(Array.isArray(t))return p(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||h(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */c=function(){return r}
var e,r={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},u=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag"
function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(e){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof g?e:g,a=Object.create(o.prototype),u=new S(n||[])
return i(a,"_invoke",{value:A(t,r,u)}),a}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}r.wrap=h
var d="suspendedStart",v="suspendedYield",y="executing",m="completed",b={}
function g(){}function w(){}function _(){}var x={}
f(x,u,(function(){return this}))
var E=Object.getPrototypeOf,k=E&&E(E(R([])))
k&&k!==n&&o.call(k,u)&&(x=k)
var O=_.prototype=g.prototype=Object.create(x)
function P(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function j(e,r){function n(i,a,u,s){var c=p(e[i],e,a)
if("throw"!==c.type){var l=c.arg,f=l.value
return f&&"object"==t(f)&&o.call(f,"__await")?r.resolve(f.__await).then((function(t){n("next",t,u,s)}),(function(t){n("throw",t,u,s)})):r.resolve(f).then((function(t){l.value=t,u(l)}),(function(t){return n("throw",t,u,s)}))}s(c.arg)}var a
i(this,"_invoke",{value:function(t,e){function o(){return new r((function(r,o){n(t,e,r,o)}))}return a=a?a.then(o,o):o()}})}function A(t,r,n){var o=d
return function(i,a){if(o===y)throw Error("Generator is already running")
if(o===m){if("throw"===i)throw a
return{value:e,done:!0}}for(n.method=i,n.arg=a;;){var u=n.delegate
if(u){var s=C(u,n)
if(s){if(s===b)continue
return s}}if("next"===n.method)n.sent=n._sent=n.arg
else if("throw"===n.method){if(o===d)throw o=m,n.arg
n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg)
o=y
var c=p(t,r,n)
if("normal"===c.type){if(o=n.done?m:v,c.arg===b)continue
return{value:c.arg,done:n.done}}"throw"===c.type&&(o=m,n.method="throw",n.arg=c.arg)}}}function C(t,r){var n=r.method,o=t.iterator[n]
if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,C(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),b
var i=p(o,t.iterator,r.arg)
if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,b
var a=i.arg
return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,b):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,b)}function T(t){var e={tryLoc:t[0]}
1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{}
e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function R(r){if(r||""===r){var n=r[u]
if(n)return n.call(r)
if("function"==typeof r.next)return r
if(!isNaN(r.length)){var i=-1,a=function t(){for(;++i<r.length;)if(o.call(r,i))return t.value=r[i],t.done=!1,t
return t.value=e,t.done=!0,t}
return a.next=a}}throw new TypeError(t(r)+" is not iterable")}return w.prototype=_,i(O,"constructor",{value:_,configurable:!0}),i(_,"constructor",{value:w,configurable:!0}),w.displayName=f(_,l,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor
return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,f(t,l,"GeneratorFunction")),t.prototype=Object.create(O),t},r.awrap=function(t){return{__await:t}},P(j.prototype),f(j.prototype,s,(function(){return this})),r.AsyncIterator=j,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise)
var a=new j(h(t,e,n,o),i)
return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},P(O),f(O,l,"Generator"),f(O,u,(function(){return this})),f(O,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),r=[]
for(var n in e)r.push(n)
return r.reverse(),function t(){for(;r.length;){var n=r.pop()
if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=R,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(L),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0
var t=this.tryEntries[0].completion
if("throw"===t.type)throw t.arg
return this.rval},dispatchException:function(t){if(this.done)throw t
var r=this
function n(n,o){return u.type="throw",u.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion
if("root"===a.tryLoc)return n("end")
if(a.tryLoc<=this.prev){var s=o.call(a,"catchLoc"),c=o.call(a,"finallyLoc")
if(s&&c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)
if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!c)throw Error("try statement without catch or finally")
if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r]
if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n
break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null)
var a=i?i.completion:{}
return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,b):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg
return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),b},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e]
if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),b}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e]
if(r.tryLoc===t){var n=r.completion
if("throw"===n.type){var o=n.arg
L(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:R(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),b}},r}var l=c().mark(B)
function f(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]
if(null!=r){var n,o,i,a,u=[],s=!0,c=!1
try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return
s=!1}else for(;!(s=(n=i.call(r)).done)&&(u.push(n.value),u.length!==e);s=!0);}catch(t){c=!0,o=t}finally{try{if(!s&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(c)throw o}}return u}}(t,e)||h(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){if(t){if("string"==typeof t)return p(t,e)
var r={}.toString.call(t).slice(8,-1)
return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(t,e):void 0}}function p(t,e){(null==e||e>t.length)&&(e=t.length)
for(var r=0,n=Array(e);r<e;r++)n[r]=t[r]
return n}function d(e,r,n){return r=g(r),function(e,r){if(r&&("object"==t(r)||"function"==typeof r))return r
if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined")
return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return t}(e)}(e,m()?Reflect.construct(r,n||[],g(e).constructor):r.apply(e,n))}function v(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function")
t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&b(t,e)}function y(t){var e="function"==typeof Map?new Map:void 0
return y=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(e){return"function"==typeof t}}(t))return t
if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function")
if(void 0!==e){if(e.has(t))return e.get(t)
e.set(t,r)}function r(){return function(t,e,r){if(m())return Reflect.construct.apply(null,arguments)
var n=[null]
n.push.apply(n,e)
var o=new(t.bind.apply(t,n))
return r&&b(o,r.prototype),o}(t,arguments,g(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),b(r,t)},y(t)}function m(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(m=function(){return!!t})()}function b(t,e){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},b(t,e)}function g(t){return g=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},g(t)}function w(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _(t,e){for(var r=0;r<e.length;r++){var n=e[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,k(n.key),n)}}function x(t,e,r){return e&&_(t.prototype,e),r&&_(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function E(t,e,r){return(e=k(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function k(e){var r=function(e,r){if("object"!=t(e)||!e)return e
var n=e[Symbol.toPrimitive]
if(void 0!==n){var o=n.call(e,r||"default")
if("object"!=t(o))return o
throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(e,"string")
return"symbol"==t(r)?r:r+""}import{transfer as O,expose as P}from"https://unpkg.com/comlink@4.4.1/dist/esm/comlink.mjs"
null!==(e=globalThis.Event)&&void 0!==e||(globalThis.Event=(r=function(){return x((function t(e,r){w(this,t),E(this,"bubbles",void 0),E(this,"cancelBubble",void 0),E(this,"cancelable",void 0),E(this,"composed",void 0),E(this,"currentTarget",void 0),E(this,"defaultPrevented",void 0),E(this,"eventPhase",void 0),E(this,"isTrusted",void 0),E(this,"returnValue",void 0),E(this,"srcElement",void 0),E(this,"target",void 0),E(this,"timeStamp",void 0),E(this,"type",void 0),this.bubbles=(null==r?void 0:r.bubbles)||!1,this.cancelBubble=!1,this.cancelable=(null==r?void 0:r.cancelable)||!1,this.composed=(null==r?void 0:r.composed)||!1,this.currentTarget=null,this.defaultPrevented=!1,this.eventPhase=t.NONE,this.isTrusted=!0,this.returnValue=!1,this.srcElement=null,this.target=null,this.timeStamp=0,this.type=e}),[{key:"composedPath",value:function(){return[]}},{key:"initEvent",value:function(t,e,r){this.type=t,this.bubbles=e||this.bubbles,this.cancelable=r||this.cancelable}},{key:"preventDefault",value:function(){this.defaultPrevented=!0}},{key:"stopImmediatePropagation",value:function(){}},{key:"stopPropagation",value:function(){}}])}(),E(r,"NONE",0),E(r,"CAPTURING_PHASE",1),E(r,"AT_TARGET",2),E(r,"BUBBLING_PHASE",3),r)),null!==(n=globalThis.CustomEvent)&&void 0!==n||(globalThis.CustomEvent=function(){function t(e,r){var n
return w(this,t),E(n=d(this,t,[e,r]),"detail",void 0),n.detail=null==r?void 0:r.detail,n}return v(t,y(Event)),x(t,[{key:"initCustomEvent",value:function(t,e,r,n){this.detail=null!=n?n:this.detail}}])}())
var j=function(){function t(e,r){return w(this,t),d(this,t,["MemoryGrowthEvent",{cancelable:!1,detail:{index:r}}])}return v(t,y(CustomEvent)),x(t)}()
var A=function(){function t(e,r){return w(this,t),d(this,t,["WebAssemblyExceptionEvent",{cancelable:!1,detail:{exception:r}}])}return v(t,y(CustomEvent)),x(t)}()
var C=Symbol("wasi-impl")
function T(t,e){var r,n,o=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).dispatchEvent
o||"dispatchEvent"in globalThis||console.warn("globalThis.dispatchEvent does not exist here -- events from WebAssembly will go unhandled."),null!==(r=o)&&void 0!==r||(o=function(t){return"dispatchEvent"in globalThis?globalThis.dispatchEvent(t):(console.warn("Unhandled event: ".concat(t)),!1)})
var i={instance:null,module:null,cachedMemoryView:null,dispatchEvent:function(t){return o(t)}}
return t.then((function(t){var e=t.instance,r=t.module
i.instance=e,i.module=r,e[C]=i,i.cachedMemoryView=new DataView(e.exports.memory.buffer),console.assert("_initialize"in i.instance.exports!="_start"in i.instance.exports),"_initialize"in i.instance.exports?i.instance.exports._initialize():"_start"in i.instance.exports&&i.instance.exports._start(),n(t)})),{imports:{wasi_snapshot_preview1:L(i,e.wasi_snapshot_preview1),env:L(i,e.env)},wasiReady:new Promise((function(t){n=t}))}}function L(t,e){return Object.fromEntries(Object.entries(e).map((function(e){var r=f(e,2),n=r[0],o=r[1]
return[n,"function"==typeof o?o.bind(t):o]})))}function S(t){return function(t){return t[C]}(t).cachedMemoryView}function R(t,e){return S(t).getUint32(e,!0)}function D(t,e,r){return S(t).setUint32(e,r,!0)}function M(t,e){return S(t).getUint32(e,!0)}function N(t){return t.exports}var I=function(){function t(e){return w(this,t),d(this,t,["FileDescriptorCloseEvent",{cancelable:!0,detail:{fileDescriptor:e}}])}return v(t,y(CustomEvent)),x(t)}()
function U(t,e){return{bufferStart:M(t.instance,e),bufferLength:R(t.instance,e+(t.instance,4))}}function B(t,e,r){var n,o
return c().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:t.instance,n=8,o=0
case 2:if(!(o<r)){i.next=8
break}return i.next=5,U(t,e+o*n)
case 5:++o,i.next=2
break
case 8:case"end":return i.stop()}}),l)}var F,W=function(){function t(e,r,n){var o
return w(this,t),E(o=d(this,t,["FileDescriptorReadEvent",{bubbles:!1,cancelable:!0,detail:{fileDescriptor:r,requestedBuffers:n,readIntoMemory:function(t){for(var r=0;r<n.length&&!(r>=t.length);++r)for(var i=t[r],a=0;a<Math.min(i.byteLength,t[a].byteLength);++a)u=e.instance,s=n[r].bufferStart+a,c=t[r][a],S(u).setUint8(s,c),++o._bytesWritten
var u,s,c}}}]),"_bytesWritten",0),o}return v(t,y(CustomEvent)),x(t,[{key:"bytesWritten",value:function(){return this._bytesWritten}}])}()
!function(t){t[t.success=0]="success",t[t.toobig=1]="toobig",t[t.acces=2]="acces",t[t.addrinuse=3]="addrinuse",t[t.addrnotavail=4]="addrnotavail",t[t.afnosupport=5]="afnosupport",t[t.again=6]="again",t[t.already=7]="already",t[t.badf=8]="badf",t[t.badmsg=9]="badmsg",t[t.busy=10]="busy",t[t.canceled=11]="canceled",t[t.child=12]="child",t[t.connaborted=13]="connaborted",t[t.connrefused=14]="connrefused",t[t.connreset=15]="connreset",t[t.deadlk=16]="deadlk",t[t.destaddrreq=17]="destaddrreq",t[t.dom=18]="dom",t[t.dquot=19]="dquot",t[t.exist=20]="exist",t[t.fault=21]="fault",t[t.fbig=22]="fbig",t[t.hostunreach=23]="hostunreach",t[t.idrm=24]="idrm",t[t.ilseq=25]="ilseq",t[t.inprogress=26]="inprogress",t[t.intr=27]="intr",t[t.inval=28]="inval",t[t.io=29]="io",t[t.isconn=30]="isconn",t[t.isdir=31]="isdir",t[t.loop=32]="loop",t[t.mfile=33]="mfile",t[t.mlink=34]="mlink",t[t.msgsize=35]="msgsize",t[t.multihop=36]="multihop",t[t.nametoolong=37]="nametoolong",t[t.netdown=38]="netdown",t[t.netreset=39]="netreset",t[t.netunreach=40]="netunreach",t[t.nfile=41]="nfile",t[t.nobufs=42]="nobufs",t[t.nodev=43]="nodev",t[t.noent=44]="noent",t[t.noexec=45]="noexec",t[t.nolck=46]="nolck",t[t.nolink=47]="nolink",t[t.nomem=48]="nomem",t[t.nomsg=49]="nomsg",t[t.noprotoopt=50]="noprotoopt",t[t.nospc=51]="nospc",t[t.nosys=52]="nosys",t[t.notconn=53]="notconn",t[t.notdir=54]="notdir",t[t.notempty=55]="notempty",t[t.notrecoverable=56]="notrecoverable",t[t.notsock=57]="notsock",t[t.notsup=58]="notsup",t[t.notty=59]="notty",t[t.nxio=60]="nxio",t[t.overflow=61]="overflow",t[t.ownerdead=62]="ownerdead",t[t.perm=63]="perm",t[t.pipe=64]="pipe",t[t.proto=65]="proto",t[t.protonosupport=66]="protonosupport",t[t.prototype=67]="prototype",t[t.range=68]="range",t[t.rofs=69]="rofs",t[t.spipe=70]="spipe",t[t.srch=71]="srch",t[t.stale=72]="stale",t[t.timedout=73]="timedout",t[t.txtbsy=74]="txtbsy",t[t.xdev=75]="xdev",t[t.notcapable=76]="notcapable"}(F||(F={}))
var G=function(){function t(e){return w(this,t),d(this,t,["FileDescriptorSeekEvent",{cancelable:!0,detail:{fileDescriptor:e}}])}return v(t,y(CustomEvent)),x(t)}()
var z=function(){function t(e,r){return w(this,t),d(this,t,["FileDescriptorWriteEvent",{bubbles:!1,cancelable:!0,detail:{data:r,fileDescriptor:e}}])}return v(t,y(CustomEvent)),x(t,[{key:"asString",value:function(t){var e=this
return this.detail.data.map((function(r,n){var o=function(t){var e=Q.get(t)
e||(e=new TextDecoder(t),Q.set(t,e))
return e}(t).decode(r)
return"\0"==o&&n==e.detail.data.length-1?"":o})).join("")}}])}()
var Q=new Map
var q=function(){function t(e){var r
return w(this,t),E(r=d(this,t,["AbortEvent",{bubbles:!1,cancelable:!1,detail:{code:e}}]),"code",void 0),r.code=e,r}return v(t,y(CustomEvent)),x(t)}(),V=function(){function t(e){return w(this,t),d(this,t,["abort(".concat(e,") was called")])}return v(t,y(Error)),x(t)}()
function Y(t,e){return H.apply(this,arguments)}function H(){return H=u(c().mark((function t(e,r){var n,o,a,u,s,l
return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Promise.withResolvers(),o=n.promise,a=n.resolve,u=T(o,r),s=u.imports,l=u.wasiReady,t.t0=a,t.next=5,e(i({},s))
case 5:return t.t1=t.sent,(0,t.t0)(t.t1),t.next=9,l
case 9:return t.abrupt("return",t.sent)
case 10:case"end":return t.stop()}}),t)}))),H.apply(this,arguments)}function X(t,e){return $.apply(this,arguments)}function $(){return $=u(c().mark((function t(e,r){return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Y(function(){var t=u(c().mark((function t(r){return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,WebAssembly.instantiateStreaming(e,i({},r))
case 2:return t.abrupt("return",t.sent)
case 3:case"end":return t.stop()}}),t)})))
return function(e){return t.apply(this,arguments)}}(),r)
case 2:return t.abrupt("return",t.sent)
case 3:case"end":return t.stop()}}),t)}))),$.apply(this,arguments)}function J(t,e){return K.apply(this,arguments)}function K(){return K=u(c().mark((function t(e,r){return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Y(function(){var t=u(c().mark((function t(r){return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=e,t.next=3,WebAssembly.instantiate(e,i({},r))
case 3:return t.t1=t.sent,t.abrupt("return",{module:t.t0,instance:t.t1})
case 5:case"end":return t.stop()}}),t)})))
return function(e){return t.apply(this,arguments)}}(),r)
case 2:return t.abrupt("return",t.sent)
case 3:case"end":return t.stop()}}),t)}))),K.apply(this,arguments)}var Z=function(){function t(e,r){return w(this,t),d(this,t,["The array could not be assigned because the source array is ".concat(e," byte").concat(1==e?"":"s"," long, which is not divisible by ").concat(r,", the number of bytes per element in the target array.")])}return v(t,y(Error)),x(t)}(),tt=function(){return x((function t(e,r,n,o){w(this,t),E(this,"TypedArray",void 0),E(this,"_instance",void 0),E(this,"_bytesPerWord",void 0),E(this,"_impl",void 0),E(this,"_currentCount",void 0),E(this,"_ptr",null),E(this,"_malloc",void 0),E(this,"_realloc",void 0),E(this,"_free",void 0),this.TypedArray=e,this._instance=r,this._bytesPerWord=n,this._malloc=N(r).malloc,this._realloc=N(r).realloc,this._free=N(r).free,this._currentCount=o||0,o?(this._ptr=this._malloc(o*this._bytesPerWord),this._updateTypedArrayImpl(this._ptr,o)):this._ptr=null,this._updateTypedArrayImpl(this._ptr||0,o||0)}),[{key:"_updateTypedArrayImpl",value:function(t,e){this._impl=new this.TypedArray(this._instance.exports.memory.buffer,t,e)}},{key:"set",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0
this._impl.set(t,e)}},{key:"assign",value:function(t){var e=t.byteLength/this._impl.BYTES_PER_ELEMENT
if(Math.floor(e)!=e)throw new Z(t.byteLength,this._impl.BYTES_PER_ELEMENT)
this.resize(e),this.set(new this.TypedArray(t))}},{key:"at",value:function(t){return this._impl.at(t)}},{key:"resize",value:function(t){if(t!=this._currentCount){var e=t*this._bytesPerWord
this._ptr?this._ptr=this._realloc(this._ptr,e):this._ptr=this._malloc(e),this._updateTypedArrayImpl(this._ptr,t)}}},{key:"address",get:function(){return this._ptr}},{key:Symbol.dispose,value:function(){this._ptr&&this._free(this._ptr)}}])}(),et=function(){function t(e,r){return w(this,t),d(this,t,[Uint8ClampedArray,e,1,r])}return v(t,tt),x(t)}(),rt={env:{__throw_exception_with_stack_trace:function(t){this.dispatchEvent(new A(this,t))},emscripten_notify_memory_growth:function(t){this.dispatchEvent(new j(this,t))}},wasi_snapshot_preview1:{fd_write:function(t,e,r,n){var o=this,i=0,a=s(B(this,e,r)).map((function(t){var e=t.bufferStart,r=t.bufferLength
return i+=r,new Uint8Array(S(o.instance).buffer,e,r)})),u=new z(t,a)
if(this.dispatchEvent(u)){var c=u.asString("utf-8")
if(1==t)console.log(c)
else{if(2!=t)return F.badf
console.error(c)}}return D(this.instance,n,i),0},proc_exit:function(t){throw this.dispatchEvent(new q(t)),new V(t)},fd_close:function(t){var e=new I(t)
this.dispatchEvent(e)},fd_read:function(t,e,r,n){var o=0,i=B(this,e,r),a=new W(this,t,s(i))
return o=this.dispatchEvent(a)?0:a.bytesWritten(),D(this.instance,n,o),0},fd_seek:function(t,e,r,n){switch(t){case 0:case 1:case 2:break
default:if(this.dispatchEvent(new G(t)))return F.badf}return 0},environ_get:function(t,e){return D(this.instance,t,0),D(this.instance,e,0),0},environ_sizes_get:function(t,e){return D(this.instance,t,0),D(this.instance,e,0),0}}},nt=Promise.withResolvers(),ot=nt.promise,it=nt.resolve,at=nt.reject,ut=Promise.withResolvers(),st=ut.promise,ct=ut.resolve,lt=ut.reject,ft=null
function ht(){return ft||{}}function pt(){return dt.apply(this,arguments)}function dt(){return(dt=u(c().mark((function t(){return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,st
case 2:if(t.t0=t.sent,t.t0){t.next=5
break}t.t0={}
case 5:return t.abrupt("return",t.t0)
case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function vt(t){try{it(t)}catch(t){at(t)}}function yt(t){var e=N(ht().instance)
switch(t){case"Aztec":return e.formatAztec()
case"Codabar":return e.formatCodabar()
case"Code128":return e.formatCode128()
case"Code39":return e.formatCode39()
case"Code93":return e.formatCode93()
case"DataMatrix":return e.formatDataMatrix()
case"EAN13":return e.formatEAN13()
case"EAN8":return e.formatEAN8()
case"ITF":return e.formatITF()
case"PDF417":return e.formatPDF417()
case"QRCode":return e.formatQRCode()
case"UPCA":return e.formatUPCA()
case"UPCE":return e.formatUPCE()
case"DataBar":return e.formatDataBar()
case"DataBarExpanded":return e.formatDataBarExpanded()
case"DXFilmEdge":return e.formatDXFilmEdge()
case"LinearCodes":return e.formatLinearCodes()
case"MatrixCodes":return e.formatMatrixCodes()
case"MaxiCode":return e.formatMaxiCode()
case"MicroQRCode":return e.formatMicroQRCode()
case"None":return e.formatNone()
case"RMQRCode":return e.formatRMQRCode()}}u(c().mark((function t(){var e,r
return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,ot
case 3:if("string"!=typeof(e=t.sent)){t.next=13
break}return r=new URL(e,import.meta.url),t.t0=ct,t.next=9,X(fetch(r),rt)
case 9:t.t1=ft=t.sent,(0,t.t0)(t.t1),t.next=30
break
case 13:if(!(e instanceof Response)){t.next=21
break}return t.t2=ct,t.next=17,X(e,rt)
case 17:t.t3=ft=t.sent,(0,t.t2)(t.t3),t.next=30
break
case 21:if(!(e instanceof ArrayBuffer||e instanceof WebAssembly.Module)){t.next=29
break}return t.t4=ct,t.next=25,J(e,rt)
case 25:t.t5=ft=t.sent,(0,t.t4)(t.t5),t.next=30
break
case 29:throw new Error("provideSource was called on the main thread with something that wasn't a string (as a URL), Response, ArrayBuffer, or WebAssembly.Module. Only those types can be instantiated.")
case 30:t.next=35
break
case 32:t.prev=32,t.t6=t.catch(0),lt(t.t6)
case 35:case"end":return t.stop()}}),t,null,[[0,32]])})))()
var mt=void 0
function bt(t,e,r,n){var o=ht().instance,i=function(){var t=ht().instance
return t&&null==mt?mt=new et(t,null):mt}()
if(null==o||null==i)return{data:null,error:"wasm-not-instantiated"}
if(0==t.length||null==t)return{data:null,error:"empty-input"}
i.assign(t)
var a=N(o).characterSetBINARY(),u=N(o).characterSetUTF8()
N(o).generate(i.address,t.byteLength,"binary"==e?a:u,yt(r),n)
var s=N(o).getGeneratedImageData(),c=N(o).getGeneratedImageLength(),l=N(o).getGeneratedImageWidth(),f=N(o).getGeneratedImageHeight(),h=new Uint8ClampedArray(N(o).memory.buffer,s,c),p=new Uint8ClampedArray(new ArrayBuffer(c))
return p.set(h),O({data:p.buffer,width:l,height:f},[p.buffer])}var gt=Object.freeze({__proto__:null,encode:bt}),wt=void 0
function _t(){var t=ht().instance
return t&&null==wt?wt=new et(t,null):wt}function xt(t,e,r){return s(function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"QRCode"
return c().mark((function o(){var i,a,u,s,l,f,h,p,d,v,y,m,b,g,w,_
return c().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(i=ht(),a=i.instance,u=_t(),null!=a&&null!=u){o.next=4
break}return o.abrupt("return",null)
case 4:u.resize(t.length),u.set(t),s=N(a).scan(u.address,e,r,yt(n),!0),l=0
case 8:if(!(l<s)){o.next=27
break}return f=N(a).currentResultTextLength(),h=N(a).readCurrentResultText(),p=N(a).currentResultDataLength(),d=N(a).readCurrentResultData(),v=N(a).currentResultOrientation(),y=N(a).currentResultHash(),m=[0,1,2,3].map((function(t){return{x:N(a).positionOfCurrentResultX(t),y:N(a).positionOfCurrentResultY(t)}})),b=new TextDecoder("utf-8").decode(new Uint8Array(S(a).buffer,h,f)),g=new ArrayBuffer(p),(w=new Uint8Array(g)).set(new Uint8Array(N(a).memory.buffer,d,p)),N(a).nextResult(),_={text:b,data:w,positions:m,orientation:v,hash:y},o.next=24,_
case 24:++l,o.next=8
break
case 27:case"end":return o.stop()}}),o)}))()}(t,e,r,arguments.length>3&&void 0!==arguments[3]?arguments[3]:"QRCode"))}var Et=Object.freeze({__proto__:null,scanAll:xt})
function kt(){return Ot.apply(this,arguments)}function Ot(){return(Ot=u(c().mark((function t(){return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,pt()
case 2:return t.abrupt("return")
case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var Pt=Object.freeze({__proto__:null,provideSource:vt,waitUntilReady:kt})
P(i(i(i({},Et),gt),Pt))
export{bt as encode,vt as provideSource,xt as scanAll,kt as waitUntilReady}
//# sourceMappingURL=qr-thread.js.map
