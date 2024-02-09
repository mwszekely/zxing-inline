function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}var e,r,n,o
function i(t,e){var r=Object.keys(t)
if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t)
e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{}
e%2?i(Object(r),!0).forEach((function(e){O(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function u(t,e,r,n,o,i,a){try{var u=t[i](a),s=u.value}catch(t){return void r(t)}u.done?e(s):Promise.resolve(s).then(n,o)}function s(t){return function(){var e=this,r=arguments
return new Promise((function(n,o){var i=t.apply(e,r)
function a(t){u(i,n,o,a,s,"next",t)}function s(t){u(i,n,o,a,s,"throw",t)}a(void 0)}))}}function c(t){return function(t){if(Array.isArray(t))return d(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||p(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */l=function(){return r}
var e,r={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},u=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag"
function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(e){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof g?e:g,a=Object.create(o.prototype),u=new L(n||[])
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
return function(i,a){if(o===y)throw new Error("Generator is already running")
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
1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{}
e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function R(r){if(r||""===r){var n=r[u]
if(n)return n.call(r)
if("function"==typeof r.next)return r
if(!isNaN(r.length)){var i=-1,a=function t(){for(;++i<r.length;)if(o.call(r,i))return t.value=r[i],t.done=!1,t
return t.value=e,t.done=!0,t}
return a.next=a}}throw new TypeError(t(r)+" is not iterable")}return w.prototype=_,i(O,"constructor",{value:_,configurable:!0}),i(_,"constructor",{value:w,configurable:!0}),w.displayName=f(_,c,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor
return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,f(t,c,"GeneratorFunction")),t.prototype=Object.create(O),t},r.awrap=function(t){return{__await:t}},P(j.prototype),f(j.prototype,s,(function(){return this})),r.AsyncIterator=j,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise)
var a=new j(h(t,e,n,o),i)
return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},P(O),f(O,c,"Generator"),f(O,u,(function(){return this})),f(O,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),r=[]
for(var n in e)r.push(n)
return r.reverse(),function t(){for(;r.length;){var n=r.pop()
if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=R,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(S),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0
var t=this.tryEntries[0].completion
if("throw"===t.type)throw t.arg
return this.rval},dispatchException:function(t){if(this.done)throw t
var r=this
function n(n,o){return u.type="throw",u.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion
if("root"===a.tryLoc)return n("end")
if(a.tryLoc<=this.prev){var s=o.call(a,"catchLoc"),c=o.call(a,"finallyLoc")
if(s&&c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)
if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally")
if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r]
if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n
break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null)
var a=i?i.completion:{}
return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,b):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg
return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),b},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e]
if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),b}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e]
if(r.tryLoc===t){var n=r.completion
if("throw"===n.type){var o=n.arg
S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:R(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),b}},r}var f=l().mark(G)
function h(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]
if(null!=r){var n,o,i,a,u=[],s=!0,c=!1
try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return
s=!1}else for(;!(s=(n=i.call(r)).done)&&(u.push(n.value),u.length!==e);s=!0);}catch(t){c=!0,o=t}finally{try{if(!s&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(c)throw o}}return u}}(t,e)||p(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){if(t){if("string"==typeof t)return d(t,e)
var r=Object.prototype.toString.call(t).slice(8,-1)
return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(t,e):void 0}}function d(t,e){(null==e||e>t.length)&&(e=t.length)
for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r]
return n}function v(e,r,n){return r=_(r),function(e,r){if(r&&("object"===t(r)||"function"==typeof r))return r
if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined")
return y(e)}(e,g()?Reflect.construct(r,n||[],_(e).constructor):r.apply(e,n))}function y(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return t}function m(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function")
t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&w(t,e)}function b(t){var e="function"==typeof Map?new Map:void 0
return b=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(e){return"function"==typeof t}}(t))return t
if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function")
if(void 0!==e){if(e.has(t))return e.get(t)
e.set(t,r)}function r(){return function(t,e,r){if(g())return Reflect.construct.apply(null,arguments)
var n=[null]
n.push.apply(n,e)
var o=new(t.bind.apply(t,n))
return r&&w(o,r.prototype),o}(t,arguments,_(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),w(r,t)},b(t)}function g(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(g=function(){return!!t})()}function w(t,e){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},w(t,e)}function _(t){return _=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},_(t)}function x(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function E(t,e){for(var r=0;r<e.length;r++){var n=e[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,P(n.key),n)}}function k(t,e,r){return e&&E(t.prototype,e),r&&E(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function O(t,e,r){return(e=P(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function P(e){var r=function(e,r){if("object"!=t(e)||!e)return e
var n=e[Symbol.toPrimitive]
if(void 0!==n){var o=n.call(e,r||"default")
if("object"!=t(o))return o
throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(e,"string")
return"symbol"==t(r)?r:String(r)}import{transfer as j,expose as A}from"https://unpkg.com/comlink/dist/esm/comlink.mjs"
null!==(r=globalThis.Event)&&void 0!==r||(globalThis.Event=(n=function(){function t(e,r){x(this,t),O(this,"bubbles",void 0),O(this,"cancelBubble",void 0),O(this,"cancelable",void 0),O(this,"composed",void 0),O(this,"currentTarget",void 0),O(this,"defaultPrevented",void 0),O(this,"eventPhase",void 0),O(this,"isTrusted",void 0),O(this,"returnValue",void 0),O(this,"srcElement",void 0),O(this,"target",void 0),O(this,"timeStamp",void 0),O(this,"type",void 0),this.bubbles=(null==r?void 0:r.bubbles)||!1,this.cancelBubble=!1,this.cancelable=(null==r?void 0:r.cancelable)||!1,this.composed=(null==r?void 0:r.composed)||!1,this.currentTarget=null,this.defaultPrevented=!1,this.eventPhase=t.NONE,this.isTrusted=!0,this.returnValue=!1,this.srcElement=null,this.target=null,this.timeStamp=0,this.type=e}return k(t,[{key:"composedPath",value:function(){return[]}},{key:"initEvent",value:function(t,e,r){this.type=t,this.bubbles=e||this.bubbles,this.cancelable=r||this.cancelable}},{key:"preventDefault",value:function(){this.defaultPrevented=!0}},{key:"stopImmediatePropagation",value:function(){}},{key:"stopPropagation",value:function(){}}]),t}(),O(n,"NONE",0),O(n,"CAPTURING_PHASE",1),O(n,"AT_TARGET",2),O(n,"BUBBLING_PHASE",3),n)),null!==(o=globalThis.CustomEvent)&&void 0!==o||(globalThis.CustomEvent=function(t){function e(t,r){var n
return x(this,e),O(y(n=v(this,e,[t,r])),"detail",void 0),n.detail=null==r?void 0:r.detail,n}return m(e,b(Event)),k(e,[{key:"initCustomEvent",value:function(t,e,r,n){this.detail=null!=n?n:this.detail}}]),e}())
var C=function(t){function e(t,r){return x(this,e),v(this,e,["MemoryGrowthEvent",{cancelable:!1,detail:{index:r}}])}return m(e,b(CustomEvent)),k(e)}()
var T=function(t){function e(t,r){return x(this,e),v(this,e,["WebAssemblyExceptionEvent",{cancelable:!1,detail:{exception:r}}])}return m(e,b(CustomEvent)),k(e)}()
var S=Symbol("wasi-impl")
function L(t,e){var r,n,o=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).dispatchEvent
o||"dispatchEvent"in globalThis||console.warn("globalThis.dispatchEvent does not exist here -- events from WebAssembly will go unhandled."),null!==(r=o)&&void 0!==r||(o=function(t){return"dispatchEvent"in globalThis?globalThis.dispatchEvent(t):(console.warn("Unhandled event: ".concat(t)),!1)})
var i={instance:null,module:null,cachedMemoryView:null,dispatchEvent:function(t){return o(t)}}
return t.then((function(t){var e=t.instance,r=t.module
i.instance=e,i.module=r,e[S]=i,i.cachedMemoryView=new DataView(e.exports.memory.buffer),console.assert("_initialize"in i.instance.exports!="_start"in i.instance.exports),"_initialize"in i.instance.exports?i.instance.exports._initialize():"_start"in i.instance.exports&&i.instance.exports._start(),n(t)})),{imports:{wasi_snapshot_preview1:R(i,e.wasi_snapshot_preview1),env:R(i,e.env)},wasiReady:new Promise((function(t){n=t}))}}function R(t,e){return Object.fromEntries(Object.entries(e).map((function(e){var r=h(e,2),n=r[0],o=r[1]
return[n,"function"==typeof o?o.bind(t):o]})))}function D(t){return function(t){return t[S]}(t).cachedMemoryView}function M(t,e){return D(t).getUint32(e,!0)}function N(t,e,r){return D(t).setUint32(e,r,!0)}function I(t,e){return D(t).getUint32(e,!0)}function U(t){return t.exports}var B=function(t){function e(t){return x(this,e),v(this,e,["FileDescriptorCloseEvent",{cancelable:!0,detail:{fileDescriptor:t}}])}return m(e,b(CustomEvent)),k(e)}()
function F(t,e){return{bufferStart:I(t.instance,e),bufferLength:M(t.instance,e+(t.instance,4))}}function G(t,e,r){var n,o
return l().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:t.instance,n=8,o=0
case 2:if(!(o<r)){i.next=8
break}return i.next=5,F(t,e+o*n)
case 5:++o,i.next=2
break
case 8:case"end":return i.stop()}}),f)}var W,z=function(t){function e(t,r,n){var o
return x(this,e),O(y(o=v(this,e,["FileDescriptorReadEvent",{bubbles:!1,cancelable:!0,detail:{fileDescriptor:r,requestedBuffers:n,readIntoMemory:function(e){for(var r=0;r<n.length&&!(r>=e.length);++r)for(var i=e[r],a=0;a<Math.min(i.byteLength,e[a].byteLength);++a)u=t.instance,s=n[r].bufferStart+a,c=e[r][a],D(u).setUint8(s,c),++o._bytesWritten
var u,s,c}}}])),"_bytesWritten",0),o}return m(e,b(CustomEvent)),k(e,[{key:"bytesWritten",value:function(){return this._bytesWritten}}]),e}()
!function(t){t[t.success=0]="success",t[t.toobig=1]="toobig",t[t.acces=2]="acces",t[t.addrinuse=3]="addrinuse",t[t.addrnotavail=4]="addrnotavail",t[t.afnosupport=5]="afnosupport",t[t.again=6]="again",t[t.already=7]="already",t[t.badf=8]="badf",t[t.badmsg=9]="badmsg",t[t.busy=10]="busy",t[t.canceled=11]="canceled",t[t.child=12]="child",t[t.connaborted=13]="connaborted",t[t.connrefused=14]="connrefused",t[t.connreset=15]="connreset",t[t.deadlk=16]="deadlk",t[t.destaddrreq=17]="destaddrreq",t[t.dom=18]="dom",t[t.dquot=19]="dquot",t[t.exist=20]="exist",t[t.fault=21]="fault",t[t.fbig=22]="fbig",t[t.hostunreach=23]="hostunreach",t[t.idrm=24]="idrm",t[t.ilseq=25]="ilseq",t[t.inprogress=26]="inprogress",t[t.intr=27]="intr",t[t.inval=28]="inval",t[t.io=29]="io",t[t.isconn=30]="isconn",t[t.isdir=31]="isdir",t[t.loop=32]="loop",t[t.mfile=33]="mfile",t[t.mlink=34]="mlink",t[t.msgsize=35]="msgsize",t[t.multihop=36]="multihop",t[t.nametoolong=37]="nametoolong",t[t.netdown=38]="netdown",t[t.netreset=39]="netreset",t[t.netunreach=40]="netunreach",t[t.nfile=41]="nfile",t[t.nobufs=42]="nobufs",t[t.nodev=43]="nodev",t[t.noent=44]="noent",t[t.noexec=45]="noexec",t[t.nolck=46]="nolck",t[t.nolink=47]="nolink",t[t.nomem=48]="nomem",t[t.nomsg=49]="nomsg",t[t.noprotoopt=50]="noprotoopt",t[t.nospc=51]="nospc",t[t.nosys=52]="nosys",t[t.notconn=53]="notconn",t[t.notdir=54]="notdir",t[t.notempty=55]="notempty",t[t.notrecoverable=56]="notrecoverable",t[t.notsock=57]="notsock",t[t.notsup=58]="notsup",t[t.notty=59]="notty",t[t.nxio=60]="nxio",t[t.overflow=61]="overflow",t[t.ownerdead=62]="ownerdead",t[t.perm=63]="perm",t[t.pipe=64]="pipe",t[t.proto=65]="proto",t[t.protonosupport=66]="protonosupport",t[t.prototype=67]="prototype",t[t.range=68]="range",t[t.rofs=69]="rofs",t[t.spipe=70]="spipe",t[t.srch=71]="srch",t[t.stale=72]="stale",t[t.timedout=73]="timedout",t[t.txtbsy=74]="txtbsy",t[t.xdev=75]="xdev",t[t.notcapable=76]="notcapable"}(W||(W={}))
var Q=function(t){function e(t){return x(this,e),v(this,e,["FileDescriptorSeekEvent",{cancelable:!0,detail:{fileDescriptor:t}}])}return m(e,b(CustomEvent)),k(e)}()
var q=function(t){function e(t,r){return x(this,e),v(this,e,["FileDescriptorWriteEvent",{bubbles:!1,cancelable:!0,detail:{data:r,fileDescriptor:t}}])}return m(e,b(CustomEvent)),k(e,[{key:"asString",value:function(t){var e=this
return this.detail.data.map((function(r,n){var o=function(t){var e=V.get(t)
e||(e=new TextDecoder(t),V.set(t,e))
return e}(t).decode(r)
return"\0"==o&&n==e.detail.data.length-1?"":o})).join("")}}]),e}()
var V=new Map
var Y=function(t){function e(t){var r
return x(this,e),O(y(r=v(this,e,["AbortEvent",{bubbles:!1,cancelable:!1,detail:{code:t}}])),"code",void 0),r.code=t,r}return m(e,b(CustomEvent)),k(e)}(),H=function(t){function e(t){return x(this,e),v(this,e,["abort(".concat(t,") was called")])}return m(e,b(Error)),k(e)}()
function X(t,e){return $.apply(this,arguments)}function $(){return $=s(l().mark((function t(e,r){var n,o,i,u,s,c
return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Promise.withResolvers(),o=n.promise,i=n.resolve,u=L(o,r),s=u.imports,c=u.wasiReady,t.t0=i,t.next=5,e(a({},s))
case 5:return t.t1=t.sent,(0,t.t0)(t.t1),t.next=9,c
case 9:return t.abrupt("return",t.sent)
case 10:case"end":return t.stop()}}),t)}))),$.apply(this,arguments)}function J(t,e){return K.apply(this,arguments)}function K(){return K=s(l().mark((function t(e,r){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,X(function(){var t=s(l().mark((function t(r){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,WebAssembly.instantiateStreaming(e,a({},r))
case 2:return t.abrupt("return",t.sent)
case 3:case"end":return t.stop()}}),t)})))
return function(e){return t.apply(this,arguments)}}(),r)
case 2:return t.abrupt("return",t.sent)
case 3:case"end":return t.stop()}}),t)}))),K.apply(this,arguments)}function Z(t,e){return tt.apply(this,arguments)}function tt(){return tt=s(l().mark((function t(e,r){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,X(function(){var t=s(l().mark((function t(r){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=e,t.next=3,WebAssembly.instantiate(e,a({},r))
case 3:return t.t1=t.sent,t.abrupt("return",{module:t.t0,instance:t.t1})
case 5:case"end":return t.stop()}}),t)})))
return function(e){return t.apply(this,arguments)}}(),r)
case 2:return t.abrupt("return",t.sent)
case 3:case"end":return t.stop()}}),t)}))),tt.apply(this,arguments)}var et=function(t){function e(t,r){return x(this,e),v(this,e,["The array could not be assigned because the source array is ".concat(t," byte").concat(1==t?"":"s"," long, which is not divisible by ").concat(r,", the number of bytes per element in the target array.")])}return m(e,b(Error)),k(e)}()
e=Symbol.dispose
var rt=function(){function t(e,r,n,o){x(this,t),O(this,"TypedArray",void 0),O(this,"_instance",void 0),O(this,"_bytesPerWord",void 0),O(this,"_impl",void 0),O(this,"_currentCount",void 0),O(this,"_ptr",null),O(this,"_malloc",void 0),O(this,"_realloc",void 0),O(this,"_free",void 0),this.TypedArray=e,this._instance=r,this._bytesPerWord=n,this._malloc=U(r).malloc,this._realloc=U(r).realloc,this._free=U(r).free,this._currentCount=o||0,o?(this._ptr=this._malloc(o*this._bytesPerWord),this._updateTypedArrayImpl(this._ptr,o)):this._ptr=null,this._updateTypedArrayImpl(this._ptr||0,o||0)}return k(t,[{key:"_updateTypedArrayImpl",value:function(t,e){this._impl=new this.TypedArray(this._instance.exports.memory.buffer,t,e)}},{key:"set",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0
this._impl.set(t,e)}},{key:"assign",value:function(t){var e=t.byteLength/this._impl.BYTES_PER_ELEMENT
if(Math.floor(e)!=e)throw new et(t.byteLength,this._impl.BYTES_PER_ELEMENT)
this.resize(e),this.set(new this.TypedArray(t))}},{key:"at",value:function(t){return this._impl.at(t)}},{key:"resize",value:function(t){if(t!=this._currentCount){var e=t*this._bytesPerWord
this._ptr?this._ptr=this._realloc(this._ptr,e):this._ptr=this._malloc(e),this._updateTypedArrayImpl(this._ptr,t)}}},{key:"address",get:function(){return this._ptr}},{key:e,value:function(){this._ptr&&this._free(this._ptr)}}]),t}(),nt=function(t){function e(t,r){return x(this,e),v(this,e,[Uint8ClampedArray,t,1,r])}return m(e,rt),k(e)}(),ot={env:{__throw_exception_with_stack_trace:function(t){this.dispatchEvent(new T(this,t))},emscripten_notify_memory_growth:function(t){this.dispatchEvent(new C(this,t))}},wasi_snapshot_preview1:{fd_write:function(t,e,r,n){var o=this,i=0,a=c(G(this,e,r)).map((function(t){var e=t.bufferStart,r=t.bufferLength
return i+=r,new Uint8Array(D(o.instance).buffer,e,r)})),u=new q(t,a)
if(this.dispatchEvent(u)){var s=u.asString("utf-8")
if(1==t)console.log(s)
else{if(2!=t)return W.badf
console.error(s)}}return N(this.instance,n,i),0},proc_exit:function(t){throw this.dispatchEvent(new Y(t)),new H(t)},fd_close:function(t){var e=new B(t)
this.dispatchEvent(e)},fd_read:function(t,e,r,n){var o=0,i=G(this,e,r),a=new z(this,t,c(i))
return o=this.dispatchEvent(a)?0:a.bytesWritten(),N(this.instance,n,o),0},fd_seek:function(t,e,r,n){switch(t){case 0:case 1:case 2:break
default:if(this.dispatchEvent(new Q(t)))return W.badf}return 0},environ_get:function(t,e){return N(this.instance,t,0),N(this.instance,e,0),0},environ_sizes_get:function(t,e){return N(this.instance,t,0),N(this.instance,e,0),0}}},it=Promise.withResolvers(),at=it.promise,ut=it.resolve,st=it.reject,ct=Promise.withResolvers(),lt=ct.promise,ft=ct.resolve,ht=ct.reject,pt=null
function dt(){return pt||{}}function vt(){return yt.apply(this,arguments)}function yt(){return(yt=s(l().mark((function t(){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,lt
case 2:if(t.t0=t.sent,t.t0){t.next=5
break}t.t0={}
case 5:return t.abrupt("return",t.t0)
case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function mt(t){try{ut(t)}catch(t){st(t)}}function bt(t){var e=U(dt().instance)
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
case"RMQRCode":return e.formatRMQRCode()}}s(l().mark((function t(){var e
return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,at
case 3:if("string"!=typeof(e=t.sent)){t.next=12
break}return t.t0=ft,t.next=8,J(fetch(new URL(e,import.meta.url)),ot)
case 8:t.t1=pt=t.sent,(0,t.t0)(t.t1),t.next=26
break
case 12:if(!(e instanceof Response)){t.next=20
break}return t.t2=ft,t.next=16,J(e,ot)
case 16:t.t3=pt=t.sent,(0,t.t2)(t.t3),t.next=26
break
case 20:if(!(e instanceof ArrayBuffer||e instanceof WebAssembly.Module)){t.next=26
break}return t.t4=ft,t.next=24,Z(e,ot)
case 24:t.t5=pt=t.sent,(0,t.t4)(t.t5)
case 26:t.next=31
break
case 28:t.prev=28,t.t6=t.catch(0),ht(t.t6)
case 31:case"end":return t.stop()}}),t,null,[[0,28]])})))()
var gt=void 0
function wt(t,e,r,n){var o=dt().instance,i=function(){var t=dt().instance
return t&&null==gt?gt=new nt(t,null):gt}()
if(null==o||null==i)return{data:null,error:"wasm-not-instantiated"}
if(0==t.length||null==t)return{data:null,error:"empty-input"}
i.assign(t)
var a=U(o).characterSetBINARY(),u=U(o).characterSetUTF8()
U(o).generate(i.address,t.byteLength,"binary"==e?a:u,bt(r),n)
var s=U(o).getGeneratedImageData(),c=U(o).getGeneratedImageLength(),l=U(o).getGeneratedImageWidth(),f=U(o).getGeneratedImageHeight(),h=new Uint8ClampedArray(U(o).memory.buffer,s,c),p=new Uint8ClampedArray(new ArrayBuffer(c))
return p.set(h),j({data:p.buffer,width:l,height:f},[p.buffer])}var _t=Object.freeze({__proto__:null,encode:wt}),xt=void 0
function Et(){var t=dt().instance
return t&&null==xt?xt=new nt(t,null):xt}function kt(t,e,r){return c(function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"QRCode"
return l().mark((function o(){var i,a,u,s,c,f,h,p,d,v,y,m,b,g,w,_
return l().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(i=dt(),a=i.instance,u=Et(),null!=a&&null!=u){o.next=4
break}return o.abrupt("return",null)
case 4:u.resize(t.length),u.set(t),s=U(a).scan(u.address,e,r,bt(n),!0),c=0
case 8:if(!(c<s)){o.next=27
break}return f=U(a).currentResultTextLength(),h=U(a).readCurrentResultText(),p=U(a).currentResultDataLength(),d=U(a).readCurrentResultData(),v=U(a).currentResultOrientation(),y=U(a).currentResultHash(),m=[0,1,2,3].map((function(t){return{x:U(a).positionOfCurrentResultX(t),y:U(a).positionOfCurrentResultY(t)}})),b=new TextDecoder("utf-8").decode(new Uint8Array(D(a).buffer,h,f)),g=new ArrayBuffer(p),(w=new Uint8Array(g)).set(new Uint8Array(U(a).memory.buffer,d,p)),U(a).nextResult(),_={text:b,data:w,positions:m,orientation:v,hash:y},o.next=24,_
case 24:++c,o.next=8
break
case 27:case"end":return o.stop()}}),o)}))()}(t,e,r,arguments.length>3&&void 0!==arguments[3]?arguments[3]:"QRCode"))}var Ot=Object.freeze({__proto__:null,scanAll:kt})
function Pt(){return jt.apply(this,arguments)}function jt(){return(jt=s(l().mark((function t(){return l().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,vt()
case 2:return t.abrupt("return")
case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var At=Object.freeze({__proto__:null,provideSource:mt,waitUntilReady:Pt})
A(a(a(a({},Ot),_t),At))
export{wt as encode,mt as provideSource,kt as scanAll,Pt as waitUntilReady}
//# sourceMappingURL=qr-thread.js.map
