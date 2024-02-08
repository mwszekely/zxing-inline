import { transfer, expose } from 'https://unpkg.com/comlink/dist/esm/comlink.mjs';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$b =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$8 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$7 = fails$8;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$7(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});

var fails$6 = fails$8;

var functionBindNative = !fails$6(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$1 = functionBindNative;

var call$4 = Function.prototype.call;

var functionCall = NATIVE_BIND$1 ? call$4.bind(call$4) : function () {
  return call$4.apply(call$4, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$2 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND = functionBindNative;

var FunctionPrototype$1 = Function.prototype;
var call$3 = FunctionPrototype$1.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype$1.bind.bind(call$3, call$3);

var functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$3.apply(fn, arguments);
  };
};

var uncurryThis$8 = functionUncurryThis;

var toString$1 = uncurryThis$8({}.toString);
var stringSlice$1 = uncurryThis$8(''.slice);

var classofRaw = function (it) {
  return stringSlice$1(toString$1(it), 8, -1);
};

var uncurryThis$7 = functionUncurryThis;
var fails$5 = fails$8;
var classof = classofRaw;

var $Object$2 = Object;
var split = uncurryThis$7(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$5(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$2('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object$2(it);
} : $Object$2;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$2 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$1 = isNullOrUndefined$2;

var $TypeError$6 = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$2 = function (it) {
  if (isNullOrUndefined$1(it)) throw new $TypeError$6("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = indexedObject;
var requireObjectCoercible$1 = requireObjectCoercible$2;

var toIndexedObject$3 = function (it) {
  return IndexedObject(requireObjectCoercible$1(it));
};

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var isCallable$a = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

var isCallable$9 = isCallable$a;

var isObject$5 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$9(it);
};

var global$a = global$b;
var isCallable$8 = isCallable$a;

var aFunction = function (argument) {
  return isCallable$8(argument) ? argument : undefined;
};

var getBuiltIn$2 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$a[namespace]) : global$a[namespace] && global$a[namespace][method];
};

var uncurryThis$6 = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$6({}.isPrototypeOf);

var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

var global$9 = global$b;
var userAgent = engineUserAgent;

var process = global$9.process;
var Deno = global$9.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = engineV8Version;
var fails$4 = fails$8;
var global$8 = global$b;

var $String$3 = global$8.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$4(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String$3(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$1 = getBuiltIn$2;
var isCallable$7 = isCallable$a;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$1 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$1('Symbol');
  return isCallable$7($Symbol) && isPrototypeOf($Symbol.prototype, $Object$1(it));
};

var $String$2 = String;

var tryToString$1 = function (argument) {
  try {
    return $String$2(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$6 = isCallable$a;
var tryToString = tryToString$1;

var $TypeError$5 = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$2 = function (argument) {
  if (isCallable$6(argument)) return argument;
  throw new $TypeError$5(tryToString(argument) + ' is not a function');
};

var aCallable$1 = aCallable$2;
var isNullOrUndefined = isNullOrUndefined$2;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$1 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable$1(func);
};

var call$2 = functionCall;
var isCallable$5 = isCallable$a;
var isObject$4 = isObject$5;

var $TypeError$4 = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$5(fn = input.toString) && !isObject$4(val = call$2(fn, input))) return val;
  if (isCallable$5(fn = input.valueOf) && !isObject$4(val = call$2(fn, input))) return val;
  if (pref !== 'string' && isCallable$5(fn = input.toString) && !isObject$4(val = call$2(fn, input))) return val;
  throw new $TypeError$4("Can't convert object to primitive value");
};

var shared$3 = {exports: {}};

var global$7 = global$b;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$1 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$1(global$7, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$7[key] = value;
  } return value;
};

var global$6 = global$b;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = global$6[SHARED] || defineGlobalProperty$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.35.1',
  mode: 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.35.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var sharedExports = shared$3.exports;

var requireObjectCoercible = requireObjectCoercible$2;

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$1 = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

var uncurryThis$5 = functionUncurryThis;
var toObject = toObject$1;

var hasOwnProperty = uncurryThis$5({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

var uncurryThis$4 = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString = uncurryThis$4(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

var global$5 = global$b;
var shared$2 = sharedExports;
var hasOwn$6 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var Symbol$1 = global$5.Symbol;
var WellKnownSymbolsStore = shared$2('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$1 = function (name) {
  if (!hasOwn$6(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)
      ? Symbol$1[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var call$1 = functionCall;
var isObject$3 = isObject$5;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol = wellKnownSymbol$1;

var $TypeError$3 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$3(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$1(exoticToPrim, input, pref);
    if (!isObject$3(result) || isSymbol$1(result)) return result;
    throw new $TypeError$3("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$4 = global$b;
var isObject$2 = isObject$5;

var document$1 = global$4.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$2(document$1) && isObject$2(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$6 = descriptors;
var fails$3 = fails$8;
var createElement = documentCreateElement;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$6 && !fails$3(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});

var DESCRIPTORS$5 = descriptors;
var call = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$2 = toIndexedObject$3;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$5 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$5 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$2(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$5(O, P)) return createPropertyDescriptor$1(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$4 = descriptors;
var fails$2 = fails$8;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$4 && fails$2(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});

var isObject$1 = isObject$5;

var $String$1 = String;
var $TypeError$2 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$2 = function (argument) {
  if (isObject$1(argument)) return argument;
  throw new $TypeError$2($String$1(argument) + ' is not an object');
};

var DESCRIPTORS$3 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var anObject$1 = anObject$2;
var toPropertyKey = toPropertyKey$2;

var $TypeError$1 = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$3 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject$1(O);
  P = toPropertyKey(P);
  anObject$1(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$1(O);
  P = toPropertyKey(P);
  anObject$1(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$1('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$2 = descriptors;
var definePropertyModule$2 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;

var createNonEnumerableProperty$2 = DESCRIPTORS$2 ? function (object, key, value) {
  return definePropertyModule$2.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$2 = {exports: {}};

var DESCRIPTORS$1 = descriptors;
var hasOwn$4 = hasOwnProperty_1;

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$4(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$1 || (DESCRIPTORS$1 && getDescriptor(FunctionPrototype, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$3 = functionUncurryThis;
var isCallable$4 = isCallable$a;
var store$1 = sharedStore;

var functionToString = uncurryThis$3(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$4(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$1 = store$1.inspectSource;

var global$3 = global$b;
var isCallable$3 = isCallable$a;

var WeakMap$1 = global$3.WeakMap;

var weakMapBasicDetection = isCallable$3(WeakMap$1) && /native code/.test(String(WeakMap$1));

var shared$1 = sharedExports;
var uid = uid$2;

var keys = shared$1('keys');

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$3 = {};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$2 = global$b;
var isObject = isObject$5;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$2;
var hasOwn$3 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey = sharedKey$1;
var hiddenKeys$2 = hiddenKeys$3;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$1 = global$2.TypeError;
var WeakMap = global$2.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError$1('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys$2[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$3(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$1(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$3(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$3(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var uncurryThis$2 = functionUncurryThis;
var fails$1 = fails$8;
var isCallable$2 = isCallable$a;
var hasOwn$2 = hasOwnProperty_1;
var DESCRIPTORS = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource = inspectSource$1;
var InternalStateModule = internalState;

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis$2(''.slice);
var replace = uncurryThis$2(''.replace);
var join = uncurryThis$2([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails$1(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$2(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$2(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn$2(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$2(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

var makeBuiltInExports = makeBuiltIn$2.exports;

var isCallable$1 = isCallable$a;
var definePropertyModule$1 = objectDefineProperty;
var makeBuiltIn = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$1 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$1(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$1.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$2 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$1(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity = toIntegerOrInfinity$2;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$1 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$1 = toIndexedObject$3;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike = lengthOfArrayLike$1;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$1($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var uncurryThis$1 = functionUncurryThis;
var hasOwn$1 = hasOwnProperty_1;
var toIndexedObject = toIndexedObject$3;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$1 = hiddenKeys$3;

var push = uncurryThis$1([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$1(hiddenKeys$1, key) && hasOwn$1(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$1 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$1;

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn = getBuiltIn$2;
var uncurryThis = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject = anObject$2;

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails = fails$8;
var isCallable = isCallable$a;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var global$1 = global$b;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty = createNonEnumerableProperty$2;
var defineBuiltIn = defineBuiltIn$1;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$1;
  } else if (STATIC) {
    target = global$1[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global$1[TARGET] && global$1[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};

var newPromiseCapability = {};

var aCallable = aCallable$2;

var $TypeError = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw new $TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability.f = function (C) {
  return new PromiseCapability(C);
};

var $ = _export;
var newPromiseCapabilityModule = newPromiseCapability;

// `Promise.withResolvers` method
// https://github.com/tc39/proposal-promise-with-resolvers
$({ target: 'Promise', stat: true }, {
  withResolvers: function withResolvers() {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    return {
      promise: promiseCapability.promise,
      resolve: promiseCapability.resolve,
      reject: promiseCapability.reject
    };
  }
});

// Needed for extremely limited environments, like Worklets.
// This seems to exist in Chrome but not, e.g., Firefox, possibly Safari
globalThis.Event ??= class Event {
    constructor(type_, eventInitDict) {
        this.bubbles = eventInitDict?.bubbles || false;
        this.cancelBubble = false;
        this.cancelable = eventInitDict?.cancelable || false;
        this.composed = eventInitDict?.composed || false;
        this.currentTarget = null;
        this.defaultPrevented = false;
        this.eventPhase = Event.NONE;
        this.isTrusted = true;
        this.returnValue = false;
        this.srcElement = null;
        this.target = null;
        this.timeStamp = 0;
        this.type = type_;
    }
    static NONE = 0;
    static CAPTURING_PHASE = 1;
    static AT_TARGET = 2;
    static BUBBLING_PHASE = 3;
    bubbles;
    cancelBubble;
    cancelable;
    composed;
    currentTarget;
    defaultPrevented;
    eventPhase;
    isTrusted;
    returnValue;
    srcElement;
    target;
    timeStamp;
    type;
    composedPath() { return []; }
    initEvent(type_, bubbles, cancelable) { this.type = type_; this.bubbles = bubbles || this.bubbles; this.cancelable = cancelable || this.cancelable; }
    preventDefault() { this.defaultPrevented = true; }
    stopImmediatePropagation() { }
    stopPropagation() { }
};

// Worklets don't define `CustomEvent`, even when they do define `Event` itself...
globalThis.CustomEvent ??= class CustomEvent extends Event {
    constructor(type, eventInitDict) {
        super(type, eventInitDict);
        this.detail = eventInitDict?.detail;
    }
    detail;
    initCustomEvent(_type, _bubbles, _cancelable, detail) {
        // this.type, this.bubbles, and this.cancelable are all readonly...
        this.detail = (detail ?? this.detail);
    }
};

class MemoryGrowthEvent extends CustomEvent {
    constructor(impl, index) {
        super("MemoryGrowthEvent", { cancelable: false, detail: { index } });
    }
}
function emscripten_notify_memory_growth(index) {
    this.dispatchEvent(new MemoryGrowthEvent(this, index));
}

class WebAssemblyExceptionEvent extends CustomEvent {
    constructor(impl, exception) {
        super("WebAssemblyExceptionEvent", { cancelable: false, detail: { exception } });
    }
}
function __throw_exception_with_stack_trace(ex) {
    this.dispatchEvent(new WebAssemblyExceptionEvent(this, ex));
}

const wasi = Symbol("wasi-impl");
/**
 * Instantiate the WASI interface, binding all its functions to the WASM instance itself.
 *
 * Must be used in conjunction with, e.g., `WebAssembly.instantiate`. Because that and this both require each other circularly,
 * `instantiateStreamingWithWasi` and `instantiateWithWasi` are convenience functions that do both at once.
 *
 * The WASI interface functions can't be used alone -- they need context like (what memory is this a pointer in) and such.
 *
 * This function provides that context to an import before it's passed to an `Instance` for construction.
 *
 * @remarks Intended usage:
 *
 * ```typescript
 * import { fd_write, proc_exit } from "basic-event-wasi"
 * // Waiting for https://github.com/tc39/proposal-promise-with-resolvers...
 * let resolve: (info: WebAssemblyInstantiatedSource) => void;
 * let reject: (error: any) => void;
 * let promise = new Promise<WebAssemblyInstantiatedSource>((res, rej) => {
 *     resolve = res;
 *     reject = rej;
 * });
 *
 * WebAssembly.instantiateStreaming(source, { ...makeWasiInterface(promise.then(s => s.instance), { fd_write, proc_exit }) });
 * ```
 * ([Please please please please please](https://github.com/tc39/proposal-promise-with-resolvers))
 *
 * @param wasmInstance
 * @param unboundImports
 * @returns
 */
function instantiateWasi(wasmInstance, unboundImports, { dispatchEvent } = {}) {
    if (!dispatchEvent && !("dispatchEvent" in globalThis)) {
        console.warn(`globalThis.dispatchEvent does not exist here -- events from WebAssembly will go unhandled.`);
    }
    dispatchEvent ??= function dispatchEvent(event) {
        if ("dispatchEvent" in globalThis) {
            return globalThis.dispatchEvent(event);
        }
        else {
            console.warn(`Unhandled event: ${event}`);
            return false;
        }
    };
    let resolve;
    const p = {
        instance: null,
        module: null,
        //wasiSubset: unboundImports,
        cachedMemoryView: null,
        dispatchEvent(e) { return dispatchEvent(e); }
    };
    wasmInstance.then((obj) => {
        const { instance, module } = obj;
        p.instance = instance;
        p.module = module;
        instance[wasi] = p;
        p.cachedMemoryView = new DataView(instance.exports.memory.buffer);
        console.assert(("_initialize" in p.instance.exports) != "_start" in p.instance.exports);
        if ("_initialize" in p.instance.exports) {
            p.instance.exports._initialize();
        }
        else if ("_start" in p.instance.exports) {
            p.instance.exports._start();
        }
        resolve(obj);
    });
    // All the functions we've been passed were imported and haven't been bound yet.
    // Return a new object with each member bound to the private information we pass around.
    const wasi_snapshot_preview1 = bindAllFuncs(p, unboundImports.wasi_snapshot_preview1);
    const env = bindAllFuncs(p, unboundImports.env);
    const boundImports = { wasi_snapshot_preview1, env };
    return {
        imports: boundImports,
        // Until this resolves, no WASI functions can be called (and by extension no w'asm exports can be called)
        // It resolves immediately after the input promise to the instance&module resolves
        wasiReady: new Promise((res) => { resolve = res; })
    };
}
function getImpl(instance) {
    return instance[wasi];
}
// Given an object, binds each function in that object to p (shallowly).
function bindAllFuncs(p, r) {
    return Object.fromEntries(Object.entries(r).map(([key, func]) => { return [key, (typeof func == "function" ? func.bind(p) : func)]; }));
}

function getMemory(instance) {
    return getImpl(instance).cachedMemoryView;
}
function readUint32(instance, ptr) { return getMemory(instance).getUint32(ptr, true); }
function writeUint32(instance, ptr, value) { return getMemory(instance).setUint32(ptr, value, true); }
function writeUint8(instance, ptr, value) { return getMemory(instance).setUint8(ptr, value); }
function readPointer(instance, ptr) { return getMemory(instance).getUint32(ptr, true); }
function getPointerSize(_instance) { return 4; }
function getInstanceExports(instance) {
    return instance.exports;
}

function environ_get(environCountOutput, environSizeOutput) {
    writeUint32(this.instance, environCountOutput, 0);
    writeUint32(this.instance, environSizeOutput, 0);
    return 0;
}

function environ_sizes_get(environCountOutput, environSizeOutput) {
    writeUint32(this.instance, environCountOutput, 0);
    writeUint32(this.instance, environSizeOutput, 0);
    return 0;
}

class FileDescriptorCloseEvent extends CustomEvent {
    constructor(fileDescriptor) {
        super("FileDescriptorCloseEvent", { cancelable: true, detail: { fileDescriptor } });
    }
}
/** POSIX close */
function fd_close(fd) {
    const event = new FileDescriptorCloseEvent(fd);
    if (this.dispatchEvent(event)) ;
}

function parse(info, ptr) {
    return {
        bufferStart: readPointer(info.instance, ptr),
        bufferLength: readUint32(info.instance, ptr + getPointerSize(info.instance))
    };
}
function* parseArray(info, ptr, count) {
    const sizeofStruct = getPointerSize(info.instance) + 4;
    for (let i = 0; i < count; ++i) {
        yield parse(info, ptr + (i * sizeofStruct));
    }
}

class FileDescriptorReadEvent extends CustomEvent {
    _bytesWritten = 0;
    constructor(impl, fileDescriptor, requestedBufferInfo) {
        super("FileDescriptorReadEvent", {
            bubbles: false,
            cancelable: true,
            detail: {
                fileDescriptor,
                requestedBuffers: requestedBufferInfo,
                readIntoMemory: (inputBuffers) => {
                    // 100% untested, probably doesn't work if I'm being honest
                    for (let i = 0; i < requestedBufferInfo.length; ++i) {
                        if (i >= inputBuffers.length)
                            break;
                        const buffer = inputBuffers[i];
                        for (let j = 0; j < Math.min(buffer.byteLength, inputBuffers[j].byteLength); ++j) {
                            writeUint8(impl.instance, requestedBufferInfo[i].bufferStart + j, inputBuffers[i][j]);
                            ++this._bytesWritten;
                        }
                    }
                }
            }
        });
    }
    bytesWritten() {
        return this._bytesWritten;
    }
}
/** POSIX readv */
function fd_read(fd, iov, iovcnt, pnum) {
    let nWritten = 0;
    const gen = parseArray(this, iov, iovcnt);
    // Get all the data to read in its separate buffers
    //const asTypedArrays = [...gen].map(({ bufferStart, bufferLength }) => { nWritten += bufferLength; return new Uint8Array(this.getMemory().buffer, bufferStart, bufferLength) });
    const event = new FileDescriptorReadEvent(this, fd, [...gen]);
    if (this.dispatchEvent(event)) {
        nWritten = 0;
        /*if (fd == 0) {

        }
        else
            return errorno.badf;*/
    }
    else {
        nWritten = event.bytesWritten();
    }
    writeUint32(this.instance, pnum, nWritten);
    return 0;
}

var errorno;
(function (errorno) {
    errorno[errorno["success"] = 0] = "success";
    errorno[errorno["toobig"] = 1] = "toobig";
    errorno[errorno["acces"] = 2] = "acces";
    errorno[errorno["addrinuse"] = 3] = "addrinuse";
    errorno[errorno["addrnotavail"] = 4] = "addrnotavail";
    errorno[errorno["afnosupport"] = 5] = "afnosupport";
    errorno[errorno["again"] = 6] = "again";
    errorno[errorno["already"] = 7] = "already";
    errorno[errorno["badf"] = 8] = "badf";
    errorno[errorno["badmsg"] = 9] = "badmsg";
    errorno[errorno["busy"] = 10] = "busy";
    errorno[errorno["canceled"] = 11] = "canceled";
    errorno[errorno["child"] = 12] = "child";
    errorno[errorno["connaborted"] = 13] = "connaborted";
    errorno[errorno["connrefused"] = 14] = "connrefused";
    errorno[errorno["connreset"] = 15] = "connreset";
    errorno[errorno["deadlk"] = 16] = "deadlk";
    errorno[errorno["destaddrreq"] = 17] = "destaddrreq";
    errorno[errorno["dom"] = 18] = "dom";
    errorno[errorno["dquot"] = 19] = "dquot";
    errorno[errorno["exist"] = 20] = "exist";
    errorno[errorno["fault"] = 21] = "fault";
    errorno[errorno["fbig"] = 22] = "fbig";
    errorno[errorno["hostunreach"] = 23] = "hostunreach";
    errorno[errorno["idrm"] = 24] = "idrm";
    errorno[errorno["ilseq"] = 25] = "ilseq";
    errorno[errorno["inprogress"] = 26] = "inprogress";
    errorno[errorno["intr"] = 27] = "intr";
    errorno[errorno["inval"] = 28] = "inval";
    errorno[errorno["io"] = 29] = "io";
    errorno[errorno["isconn"] = 30] = "isconn";
    errorno[errorno["isdir"] = 31] = "isdir";
    errorno[errorno["loop"] = 32] = "loop";
    errorno[errorno["mfile"] = 33] = "mfile";
    errorno[errorno["mlink"] = 34] = "mlink";
    errorno[errorno["msgsize"] = 35] = "msgsize";
    errorno[errorno["multihop"] = 36] = "multihop";
    errorno[errorno["nametoolong"] = 37] = "nametoolong";
    errorno[errorno["netdown"] = 38] = "netdown";
    errorno[errorno["netreset"] = 39] = "netreset";
    errorno[errorno["netunreach"] = 40] = "netunreach";
    errorno[errorno["nfile"] = 41] = "nfile";
    errorno[errorno["nobufs"] = 42] = "nobufs";
    errorno[errorno["nodev"] = 43] = "nodev";
    errorno[errorno["noent"] = 44] = "noent";
    errorno[errorno["noexec"] = 45] = "noexec";
    errorno[errorno["nolck"] = 46] = "nolck";
    errorno[errorno["nolink"] = 47] = "nolink";
    errorno[errorno["nomem"] = 48] = "nomem";
    errorno[errorno["nomsg"] = 49] = "nomsg";
    errorno[errorno["noprotoopt"] = 50] = "noprotoopt";
    errorno[errorno["nospc"] = 51] = "nospc";
    errorno[errorno["nosys"] = 52] = "nosys";
    errorno[errorno["notconn"] = 53] = "notconn";
    errorno[errorno["notdir"] = 54] = "notdir";
    errorno[errorno["notempty"] = 55] = "notempty";
    errorno[errorno["notrecoverable"] = 56] = "notrecoverable";
    errorno[errorno["notsock"] = 57] = "notsock";
    errorno[errorno["notsup"] = 58] = "notsup";
    errorno[errorno["notty"] = 59] = "notty";
    errorno[errorno["nxio"] = 60] = "nxio";
    errorno[errorno["overflow"] = 61] = "overflow";
    errorno[errorno["ownerdead"] = 62] = "ownerdead";
    errorno[errorno["perm"] = 63] = "perm";
    errorno[errorno["pipe"] = 64] = "pipe";
    errorno[errorno["proto"] = 65] = "proto";
    errorno[errorno["protonosupport"] = 66] = "protonosupport";
    errorno[errorno["prototype"] = 67] = "prototype";
    errorno[errorno["range"] = 68] = "range";
    errorno[errorno["rofs"] = 69] = "rofs";
    errorno[errorno["spipe"] = 70] = "spipe";
    errorno[errorno["srch"] = 71] = "srch";
    errorno[errorno["stale"] = 72] = "stale";
    errorno[errorno["timedout"] = 73] = "timedout";
    errorno[errorno["txtbsy"] = 74] = "txtbsy";
    errorno[errorno["xdev"] = 75] = "xdev";
    errorno[errorno["notcapable"] = 76] = "notcapable";
})(errorno || (errorno = {}));

class FileDescriptorSeekEvent extends CustomEvent {
    constructor(fileDescriptor) {
        super("FileDescriptorSeekEvent", { cancelable: true, detail: { fileDescriptor } });
    }
}
/** POSIX lseek */
function fd_seek(fd, offset, whence, offsetOut) {
    switch (fd) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        default:
            if (this.dispatchEvent(new FileDescriptorSeekEvent(fd)))
                return errorno.badf;
    }
    return 0;
}

class FileDescriptorWriteEvent extends CustomEvent {
    constructor(fileDescriptor, data) {
        super("FileDescriptorWriteEvent", { bubbles: false, cancelable: true, detail: { data, fileDescriptor } });
    }
    asString(label) {
        return this.detail.data.map((d, index) => {
            let decoded = getTextDecoder(label).decode(d);
            if (decoded == "\0" && index == this.detail.data.length - 1)
                return "";
            return decoded;
        }).join("");
    }
}
/** POSIX writev */
function fd_write(fd, iov, iovcnt, pnum) {
    let nWritten = 0;
    const gen = parseArray(this, iov, iovcnt);
    // Get all the data to write in its separate buffers
    const asTypedArrays = [...gen].map(({ bufferStart, bufferLength }) => { nWritten += bufferLength; return new Uint8Array(getMemory(this.instance).buffer, bufferStart, bufferLength); });
    const event = new FileDescriptorWriteEvent(fd, asTypedArrays);
    if (this.dispatchEvent(event)) {
        const str = event.asString("utf-8");
        if (fd == 1)
            console.log(str);
        else if (fd == 2)
            console.error(str);
        else
            return errorno.badf;
    }
    writeUint32(this.instance, pnum, nWritten);
    return 0;
}
const textDecoders = new Map();
function getTextDecoder(label) {
    let ret = textDecoders.get(label);
    if (!ret) {
        ret = new TextDecoder(label);
        textDecoders.set(label, ret);
    }
    return ret;
}

class AbortEvent extends CustomEvent {
    code;
    constructor(code) {
        super("AbortEvent", { bubbles: false, cancelable: false, detail: { code } });
        this.code = code;
    }
}
class AbortError extends Error {
    constructor(code) {
        super(`abort(${code}) was called`);
    }
}
function proc_exit(code) {
    this.dispatchEvent(new AbortEvent(code));
    throw new AbortError(code);
}

async function instantiateGeneric(instantiateWasm, unboundImports) {
    // There's a bit of song and dance to get around the fact that:
    // 1. WASM needs its WASI imports immediately upon instantiation.
    // 2. WASI needs its WASM Instance immediately upon instantiation.
    // So we use promises to notify each that the other's been created.
    const { promise: wasmReady, resolve: resolveWasm } = Promise.withResolvers();
    const { imports, wasiReady } = instantiateWasi(wasmReady, unboundImports);
    resolveWasm(await instantiateWasm({ ...imports }));
    return await wasiReady;
}
/**
 * Like `WebAssembly.instantiateStreaming`, but also instantiates WASI with the `imports` you pass in.
 *
 * This exists just to remove simple boilerplate. You can easily re-implement if you need to fine-tune the behavior in some way.
 */
async function instantiateStreamingWithWasi(response, unboundImports) {
    return await instantiateGeneric(async (combinedImports) => await WebAssembly.instantiateStreaming(response, { ...combinedImports }), unboundImports);
}
/**
 * Like `WebAssembly.instantiate`, but also instantiates WASI with the `imports` you pass in.
 *
 * This exists just to remove simple boilerplate. You can easily re-implement if you need to fine-tune the behavior in some way.
 */
async function instantiateWithWasi(module, unboundImports) {
    return await instantiateGeneric(async (combinedImports) => ({ module, instance: await WebAssembly.instantiate(module, { ...combinedImports }) }), unboundImports);
}

class InvalidArrayLengthError extends Error {
    constructor(sourceByteCount, targetItemSize) {
        super(`The array could not be assigned because the source array is ${sourceByteCount} byte${sourceByteCount == 1 ? "" : "s"} long, which is not divisible by ${targetItemSize}, the number of bytes per element in the target array.`);
    }
}
/**
 * Represents a `TypedArray` (e.g. `Int8Array`, etc.) that exists in WASM memory instead of JS memory.
 *
 * As this class is Disposable, it should be created with `using` so your program doesn't OOM.
 */
class NativeTypedArray {
    TypedArray;
    _instance;
    _bytesPerWord;
    // This is assigned in a function that's definitely called from the constructor
    _impl;
    _currentCount;
    _ptr = null;
    _malloc;
    _realloc;
    _free;
    _updateTypedArrayImpl(newAddress, newCount) {
        this._impl = new this.TypedArray(this._instance.exports.memory.buffer, newAddress, newCount);
    }
    /**
     * Like `TypedArray.set`, this does not resize the array based on the input. If you're assigning to this array from a source, be sure to call `resize` first.
     * @param other The source array to copy from
     * @param offset Where to start writing to in this array
     */
    set(other, offset = 0) {
        this._impl.set(other, offset);
    }
    /**
     * This is simply `resize`, then `set`, with accommodation made for `TypedArray`s of different sizes
     *
     * @param other The source array that this array will copy into WASM memory. It can be any kind of `TypedArray`.
     */
    assign(other) {
        const ourNewCount = other.byteLength / this._impl.BYTES_PER_ELEMENT;
        if (Math.floor(ourNewCount) != ourNewCount) {
            throw new InvalidArrayLengthError(other.byteLength, this._impl.BYTES_PER_ELEMENT);
        }
        this.resize(ourNewCount);
        this.set(new this.TypedArray(other));
    }
    /**
     * Identically to `TypedArray.at`, a negative `index` will count backwards from the end of the array.
     */
    at(index) { return this._impl.at(index); }
    /**
     * Resizes this array in WASM memory, allocating as necessary.
     *
     * It's recommended to just use `assign`, which copies an entire source array in one step, because
     * as usual, reading the newly assigned memory before writing to it is undefined behavior and **will** immediately send you to crime jail.
     *
     * @param newCount The number of items in this array (not the total size in bytes)
     */
    resize(newCount) {
        if (newCount != this._currentCount) {
            const newByteCount = newCount * this._bytesPerWord;
            if (this._ptr)
                this._ptr = this._realloc(this._ptr, newByteCount);
            else
                this._ptr = this._malloc(newByteCount);
            this._updateTypedArrayImpl(this._ptr, newCount);
        }
    }
    /**
     * Returns the address of this array (for use with other WASM functions that expect a pointer that points to an array)
     */
    get address() { return this._ptr; }
    constructor(TypedArray, _instance, _bytesPerWord, initialCount) {
        this.TypedArray = TypedArray;
        this._instance = _instance;
        this._bytesPerWord = _bytesPerWord;
        this._malloc = getInstanceExports(_instance).malloc;
        this._realloc = getInstanceExports(_instance).realloc;
        this._free = getInstanceExports(_instance).free;
        this._currentCount = initialCount || 0;
        if (initialCount) {
            this._ptr = this._malloc(initialCount * this._bytesPerWord);
            this._updateTypedArrayImpl(this._ptr, initialCount);
        }
        else
            this._ptr = null;
        this._updateTypedArrayImpl(this._ptr || 0, initialCount || 0);
    }
    [Symbol.dispose]() {
        if (this._ptr) {
            this._free(this._ptr);
        }
    }
}
class NativeUint8ClampedArray extends NativeTypedArray {
    constructor(instance, initialCount) { super(Uint8ClampedArray, instance, 1, initialCount); }
}

// This file does not import anything.
// It holds space for a WebAssembly instance.
// It only exists on the Worker thread.
// `provideSource`, conversely, is made available to either thread (whichever one holds the binary source)
//
// The intention for this file is to make it easy to switch whether the **source** lives in the Worker or on Main (not the instantiation, just the source).
const imports2 = {
    env: { __throw_exception_with_stack_trace, emscripten_notify_memory_growth },
    wasi_snapshot_preview1: { fd_write, proc_exit, fd_close, fd_read, fd_seek, environ_get, environ_sizes_get }
};
const { promise: sourceAsync, resolve: resolveSource, reject: rejectSource } = Promise.withResolvers();
const { promise: wasmAsync, resolve: resolveWasm, reject: rejectWasm } = Promise.withResolvers();
let wasmSync = null;
function getWasmSync() { return wasmSync || {}; }
async function getWasmAsync() { return (await wasmAsync) || {}; }
/**
 * Provide the Worker thread with the WASM binary source so that it can be instantiated.
 *
 * If this is on the Main thread, it's async (via Comlink).
 * If it's on the Worker thread, it's sync (via just calling it. directly.)
 * @param source
 */
function provideSource(source) {
    try {
        resolveSource(source);
    }
    catch (ex) {
        rejectSource(ex);
    }
}
// Once this module loads, immediately wait for someone to provide us with the binary source,
// then instantiate it.
(async () => {
    try {
        const obj = await sourceAsync;
        if (typeof obj == "string") {
            resolveWasm(wasmSync = await instantiateStreamingWithWasi(fetch(new URL(obj, import.meta.url)), imports2));
        }
        else if (obj instanceof Response) {
            resolveWasm(wasmSync = await instantiateStreamingWithWasi(obj, imports2));
        }
        else if (obj instanceof ArrayBuffer || obj instanceof WebAssembly.Module) {
            resolveWasm(wasmSync = await instantiateWithWasi(obj, imports2));
        }
    }
    catch (e) {
        rejectWasm(e);
    }
})();

let arrayInWasmForEncodeSourceData = undefined;
function getEncodeSourceBuffer() {
    const { instance } = getWasmSync();
    if (instance && arrayInWasmForEncodeSourceData == undefined) {
        return arrayInWasmForEncodeSourceData = new NativeUint8ClampedArray(instance, null);
    }
    return arrayInWasmForEncodeSourceData;
}
function encode(data, format, ecc) {
    const { instance } = getWasmSync();
    const encodeBuffer = getEncodeSourceBuffer();
    if (instance == null || encodeBuffer == null)
        return { data: null, width: 0, height: 0 };
    encodeBuffer.assign(data);
    const qrFormat = getInstanceExports(instance).formatQRCode();
    const csBinary = getInstanceExports(instance).characterSetBINARY();
    const csUtf8 = getInstanceExports(instance).characterSetUTF8();
    getInstanceExports(instance).generate(encodeBuffer.address, data.byteLength, format == "binary" ? csBinary : csUtf8, qrFormat, ecc);
    // Copy the image from WASM memory to JS memory
    const generatedImagePtr = getInstanceExports(instance).getGeneratedImageData();
    const generatedImageLength = getInstanceExports(instance).getGeneratedImageLength();
    const generatedImageWidth = getInstanceExports(instance).getGeneratedImageWidth();
    const generatedImageHeight = getInstanceExports(instance).getGeneratedImageHeight();
    const input = new Uint8ClampedArray(getInstanceExports(instance).memory.buffer, generatedImagePtr, generatedImageLength);
    const output = new Uint8ClampedArray(new ArrayBuffer(generatedImageLength));
    output.set(input);
    //const img = new ImageData(output, generatedImageWidth, generatedImageHeight);
    return transfer({
        data: output.buffer,
        width: generatedImageWidth,
        height: generatedImageHeight,
    }, [output.buffer]);
}

var Encoder = /*#__PURE__*/Object.freeze({
	__proto__: null,
	encode: encode
});

let arrayInWasmForCameraImageData = undefined;
function getCameraBuffer() {
    const { instance } = getWasmSync();
    if (instance && arrayInWasmForCameraImageData == undefined) {
        return arrayInWasmForCameraImageData = new NativeUint8ClampedArray(instance, null);
    }
    return arrayInWasmForCameraImageData;
}
function* scan(rgbaImageData, width, height) {
    const { instance } = getWasmSync();
    const arrayInWasmForCameraImageData = getCameraBuffer();
    if (instance == null || arrayInWasmForCameraImageData == null)
        return null;
    arrayInWasmForCameraImageData.resize(rgbaImageData.length);
    arrayInWasmForCameraImageData.set(rgbaImageData);
    const qrFormat = getInstanceExports(instance).formatQRCode();
    let resultCount = getInstanceExports(instance).scan(arrayInWasmForCameraImageData.address, width, height, qrFormat, true);
    for (let i = 0; i < resultCount; ++i) {
        const stringLength = getInstanceExports(instance).currentResultTextLength();
        const pointerToCStr = getInstanceExports(instance).readCurrentResultText();
        const dataLength = getInstanceExports(instance).currentResultDataLength();
        const pointerToData = getInstanceExports(instance).readCurrentResultData();
        const orientation = getInstanceExports(instance).currentResultOrientation();
        const hash = getInstanceExports(instance).currentResultHash();
        const positions = [0, 1, 2, 3].map(i => ({
            x: getInstanceExports(instance).positionOfCurrentResultX(i),
            y: getInstanceExports(instance).positionOfCurrentResultY(i),
        }));
        const text = (new TextDecoder("utf-8")).decode(new Uint8Array(getMemory(instance).buffer, pointerToCStr, stringLength));
        const dataBuffer = new ArrayBuffer(dataLength);
        const data = new Uint8Array(dataBuffer);
        data.set(new Uint8Array(getInstanceExports(instance).memory.buffer, pointerToData, dataLength));
        getInstanceExports(instance).nextResult();
        let ret = {
            text,
            data,
            positions,
            orientation,
            hash
        };
        yield ret;
    }
}
function scanAll(rgbaImageData, width, height) {
    return [...scan(rgbaImageData, width, height)];
}

var Scanner = /*#__PURE__*/Object.freeze({
	__proto__: null,
	scanAll: scanAll
});

async function waitUntilReady() {
    await getWasmAsync();
    return;
}

var Shared = /*#__PURE__*/Object.freeze({
	__proto__: null,
	provideSource: provideSource,
	waitUntilReady: waitUntilReady
});

// This is actually the only Polyfill we need for iOS Safari on the Worker thread, neat.
// (core-js isn't bundled with the main thread, since the consumer can do that, but
// with the Worker thread being compiled into a string, this needs to be done upfront).
expose({ ...Scanner, ...Encoder, ...Shared });

export { encode, provideSource, scanAll, waitUntilReady };
//# sourceMappingURL=qr-thread.js.map
