(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!*********************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 12));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 13));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 17));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 18));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 19));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 20));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 21));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 22));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 23));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 24));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 25));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 15));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 14));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 26));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 16));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 27));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 28));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 29));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 30));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 31));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 32));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, guid: _guid.default, color: _color.default, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get, post: _request.default.post, put: _request.default.put, 'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default };


var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;

/***/ }),

/***/ 12:
/*!********************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/mixin/mixin.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!**********************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/request/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 14));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorReuest = this.interceptor.request(options);
        if (interceptorReuest === false) {
          return false;
        }
        this.options = interceptorReuest;
      }

      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign(this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              if (response.errMsg) {
                uni.showModal({
                  title: response.errMsg });

              }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 133:
/*!****************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/components/city-select/citySelect.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var citySelect = {
  /* eslint-disable */
  firstletter: 'YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYFZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJXDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLCYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNCMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY',
  /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 获取汉字的拼音首字母
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param str 汉字字符串，如果遇到非汉字则原样返回
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @return 返回对象 {unicode:NUmber,firstletter：String}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
  getFirstLetter: function getFirstLetter(str) {
    if (!str || /^ +$/g.test(str)) {
      return '';
    }

    // 使用首字母字典文件
    if (citySelect.firstletter) {
      var result = [];
      var unicode = str.charCodeAt(0);
      var ch = str.charAt(0);
      if (unicode >= 19968 && unicode <= 40869) {
        ch = citySelect.firstletter.charAt(unicode - 19968);
      } else if (unicode >= 97 && unicode <= 122 || unicode >= 65 && unicode <= 90) {
        ch = ch.toLocaleUpperCase();
      } else {
        ch = '#';
      }
      var obj = {
        unicode: unicode,
        firstletter: ch };

      return obj;
    }
    return '';
  } };var _default =


citySelect;exports.default = _default;

/***/ }),

/***/ 14:
/*!***************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/deepMerge.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 15:
/*!***************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/deepClone.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 16:
/*!**********************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/test.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.
  test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty };exports.default = _default;

/***/ }),

/***/ 162:
/*!*********************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/util/emitter.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 17:
/*!*****************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/queryParams.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 18:
/*!***********************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/route.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _queryParams = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/queryParams.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                                                                                                                            * 路由跳转
                                                                                                                                                                                                                                                                                            * 注意:本方法没有对跳转的回调函数进行封装
                                                                                                                                                                                                                                                                                            */
function route() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var config = {
    type: 'navigateTo',
    url: '',
    delta: 1, // navigateBack页面后退时,回退的层数
    params: {}, // 传递的参数
    animationType: 'pop-in', // 窗口动画,只在APP有效
    animationDuration: 300 // 窗口动画持续时间,单位毫秒,只在APP有效
  };
  config = Object.assign(config, options);
  // 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
  if (config.url[0] != '/') config.url = '/' + config.url;
  // 判断是否有传递显式的参数,Object.keys转为数组并判断长度,switchTab类型时不能携带参数
  if (Object.keys(config.params).length && config.type != 'switchTab') {
    // 判断用户传递的url中，是否带有参数
    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
    // 如果有url中有get参数，转换后无需带上"?"
    var query = '';
    if (/.*\/.*\?.*=.*/.test(config.url)) {
      // object对象转为get类型的参数
      query = (0, _queryParams.default)(config.params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      config.url += "&" + query;
    } else {
      query = (0, _queryParams.default)(config.params);
      config.url += query;
    }
  }
  // 简写形式，把url和参数拼接起来
  if (typeof options === 'string' && typeof params == 'object') {
    var _query = '';
    if (/.*\/.*\?.*=.*/.test(options)) {
      // object对象转为get类型的参数
      _query = (0, _queryParams.default)(params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      options += "&" + _query;
    } else {
      _query = (0, _queryParams.default)(params);
      options += _query;
    }
  }
  // 判断是否一个字符串，如果是，直接跳转(简写法)
  // 如果是中情形，默认第二个参数为对象形式的参数
  if (typeof options === 'string') {
    if (options[0] != '/') options = '/' + options;
    return uni.navigateTo({
      url: options });

  }
  // navigateTo类型的跳转
  if (config.type == 'navigateTo' || config.type == 'to') {
    return uni.navigateTo({
      url: config.url,
      animationType: config.animationType,
      animationDuration: config.animationDuration });

  }
  if (config.type == 'redirectTo' || config.type == 'redirect') {
    return uni.redirectTo({
      url: config.url });

  }
  if (config.type == 'switchTab' || config.type == 'tab') {
    return uni.switchTab({
      url: config.url });

  }
  if (config.type == 'reLaunch') {
    return uni.reLaunch({
      url: config.url });

  }
  if (config.type == 'navigateBack' || config.type == 'back') {
    return uni.navigateBack({
      delta: parseInt(config.delta ? config.delta : this.delta) });

  }
}var _default =

route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 19:
/*!****************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/timeFormat.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function timeFormat() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var date = new Date(timestamp);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue ) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!**************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/timeFrom.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 21:
/*!*******************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/colorGradient.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex };exports.default = _default;

/***/ }),

/***/ 22:
/*!**********************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/guid.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 222:
/*!************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/img1.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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CgCCip9o9BRtHoKAIKKn2j0FG0egoAgoqfaPQUbR6CgCCip9o9BRtHoKAIKKn2j0FG0egoAgoqfaPQUbR6CgCCip9o9BRtHoKAIKKn2j0FG0egoAgoqfaPQUbR6CgCCip9o9BRtHoKAIKKn2j0FG0egoAgoqfaPQUbR6CgCCip9o9BRtHoKAIKKn2j0FG0egoAgoqfaPQUbR6CgCCip9o9BRtHoKAIKKn2j0FG0egoAgoqfaPQUbR6CgCCip9o9BRtHoKAIKKn2j0FG0egoAgoqfaPQUbR6CgCCip9o9BRtHoKAII+p+tT1Cv32+tTUANfpSQ/dP1pX6UkP3T9aAJKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCBfvt9amqFfvt9amoAa/Skh+6frSv0pIfun60ASUUUUAFFFc7rOr3E13/AGPouHvmH72bqtsvqff0FAD9T1uZtUj0nR40nvNwa4duUgTPOfc9hW/Wdouj2+jWfkwZd2O6WVuWlbuSa0aACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBKwH8W2KsVW11FyCR8to5rXv7ZryzkgW4mti+P3sLYdeexrhEczSTrb3vi64EErRM8WwruU4PNAG6vjO3mmeG10vVJ5o8b4xBgrnpnJ4zV/TNXu766EcujXdnEVJ82YrjPpgHNcFZLOde1MCTxPuCxZ8oL5x4OPM5x9K17OM3WqRae+p+KbWeVWdPtDIoIHX1oA7XUL2LTrGa7n3eVCu5toycVhSeNLOKOOSTTtURJCFRmtsBiegHPer3iEE6S1m1peXiTr5b/Z9u8D1Oa5Se2klhiSeDxG0cDB0Bki+Ur0P4UAb0njK1injgk07VUmlz5cZtsM+OuBnmr2k6/b6pdzW0dvdW80Kh2S4i2HB6d64TSmutTgg1G5GuXE8bv5E0LxgKp44z39a6PQRJb6s87WGsSS3IWN57ooVUDp0NAHXEgdSKpavqA03Srq9CiQwRl9m7GcVm6/ouhXEovtYcRHAj3vcNGvfA6getcvrmm+EYtFvHsbyB7pYyY1W9LEt243c0AegWVyLqyt7ggJ50aybc9MjOKnBB6EGvP9P0vwY+nWrXF7AszRIZAb4jDYGeN3HNdPomg6Tpz/AGzTQx81MB/OZ1ZTzxkkfjQBZ13Vo9F0uW9kQybCFWMHl2JwAKvROZIkdkKFlBKnqPauD1nVU1jxrpWnIvmWNtcHe38LygE4/D/Gt28h8UteTGzutOW2LHyxIjFgvvxQBe1rWF0j7FuhaX7VcLAMNjaT3/StGSRYo2kkYKiAsxPYDrXnniiLxGv9l/briwfN6gi8tGGH5wTntXW2ltq82m3sGqzWryyoyRGEEAAqRzn3oAT/AISzQf8AoK23/fVUl8b6T/a72jXMItxFvW5D5UnPK+xrNsZ4NHgmsJbC1u10mz8y6mVRkyckICR6VLcTwaRdG/u0t5dMvYhJFA0amWOTAwiADkH9KANr/hLNB/6Ctt/31VrUdZsdMsEvbqbbbOQFdQWzkZHSuTulafSpbbVLW2sbjVSyWa+SAsHHAdwOprrB5emaGhutjLaW43nsdq9s/SgDKj8c6BJKka3hLOQoHlt1P4U+58YafbXMsDwXxeJyhK2zEZBxwazvBOoaUmlwxS3dqb+7laVo9w3bmPAx64xWnYX9zdeMdTtxI32S0hjXZjjeec/lQAuneLNO1HUI7GFLpJ5ASolhKjAGTW/XLg/afiMeMrZ2GPozNn+VdRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAQL99vrU1Qr99vrU1ADX6UkP3T9aV+lJD90/WgCSiiigArlL61n8NX82q6fG01hO269txyyn/nov9RXV0hGRg8igCGzu4L61jubWRZYZBlWHep65aTT7vw9qQudJiafTrmQC4tF6xMT99Pb1FdTQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFeZWZFrc6kty3iCBmvZWVbOM+WVLcHp1r0DV7oWmnSymK6lyNuLVN8gzxkD2rhfMf/AJ+PG3/fqgChZXEA17U2Nx4iCsseGjT96eD9/j8q1tGBm8Z2M0P9ryxJBIGkv0I2kjgA4rJto7iPVb2dz4sSKUIEkjhPmPgc7/p2rTt7lobiOUyeM5QjBijw5Vsdj7UAehV5LpBs2tHNw2imTzXz9smkWTr3A4xXo2o63Dp8FvJLa3ridchYoCzLwOGA6HmuB0S6ns7ExyPqdsTI7eWmmLIACfVhmgCYDTFGB/wjAHoLiWuh+HbbtCuMFSPtcmNhJXHHTPasn+1JP+fvVv8AwTx/4VP4L1UWFu9jc2moebPdsyubYhcNjBPYUAdpd2lvewGG6hjmjP8AC6gj681x+hWmn6XfPoOrWNoZQxa0uJIVP2iMnOMkfeHpW5q/iS30y7Fmtrd3d2y7ligiJyPrWReaVrHioRrqkUWmWKNvWNcPOT/vdFoAg1i2sda1AaHo9laoFYG9u44VAiX+6Dj7x/z3rs4LeK3tUtol2xRoEVR2AGK5Oz0/W/CsZh0+CHVNP3FtgxHMM579GrY0jxFBqly1r9lu7W6RdzRzxFcD60AYuo6fbaXrvhazs4/LhjllwOpJ28knuau+KI7vTbiLX7BpJPs67bq33HbJFnkgdiOtN8R/8jX4a/66yf8AoNdNIVWJyw3KASRjORQByXiy5ivLTw9cwEmKa/idSRg4INdTd3AtLSW4ZJJFjUsVjXcxx6DvXE61rVpr91o1rpiTySx3qSMphKhVGcnn613tAHAR2upX2l3tjo+lCzt7vc009/LmVy2f4RyPQZqvpNpqmmahELjSYL7VvLyjzXw3BBx8q4woFXrPUp9O8WeIvJ026vfMliyYQPlwp65ol1DUX8UQaoNA1ARR2zQFMDJJOc9aALcGi3OoR6rJ4hMdu2osiwwrLuERUYBB6bvp6VPr2kX9z4bg09r3fGi5u5yMO6qCQAPcgVla9qs+oXOixTaTd2arqMTB5gMHrxx3/wAK7S/UtYXKqCzGJgAByTg0AcJaWtvFpPg+eO3hSaS5TfIqAM3B6nqav3GkWZ1K8u4PFLWj3Mm6RI5UHI4A69qo6Xpevta+HRcRxG0t5kfywhWSIAHls10Gp6L4d0+0lvLnSoDGnLFItx5PpQBzWo6a2kmPVbDX7i8mmuYoJSHU7hnoSPavR689aXT9UuNP0/w9p0sUIvI7i5kEJRAq+p9a9CoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAIF++31qaoV++31qagBr9KSH7p+tK/Skh+6frQBJRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAJS0UUAFJS0UAJS0UUAJgelLRRQAlLRRQAlLRRQAUlLRQAlLRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAQL99vrU1Qr99vrU1ADX6UyJgAfrT36VGgJBwO9AEm8eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0oAdvHoaN49DTdp9KNp9KAHbx6GjePQ03afSjafSgB28eho3j0NN2n0o2n0o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gDL+wzzyx+etskSMGKxryxHv6VpKqoMKoUegGKdRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAQL99vrU1Qr99vrU1ADX6UkP3T9aV+lJD90/WgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAgX77fWpqhX77fWpqAGv0pkbEA8Z5p79KSH7p+tAC7z6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAZvPpRvPpT6KAGbz6Ubz6U+igBm8+lG8+lPooAgT7x+tTVCv32+tTUANfpSQ/dP1pX6UkP3T9aAJKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKK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jgegPrWs8SPAYiMIV28elUhYzWuTYTBUzkxSDK/geoqzay3D7hcQCIjuGyDQBWtkWPVp0QBVWJAAO3WnQGW2vDbuWkiky8bHkr6g0+KJ11SeUr+7aNQD6kVLcyyQqDFA0xJwQpAx+dAFbTP9be/9djTblnN+hjgzKoKo0r4X3IHepNNiljWaSZPLaWQuFznApuox3DXFpJbxh2jZidxwBkY5oAz/ALJcW8yCdY5gzkxqXIXd16VcNu8pma+ZI1lCoiBuhHQ/WmzR6jNJC5igBibcAHPNLcJfztAJYIgiyqxKNkjFABq8Ep09Q0u5Yxlzjlz2pojghvJR8kMbWw3MBjGT1q9qELz2UsUYBdhxk4qG2sZI7lpJpfOVowmHAyOf5UAUhHa+SIRqr+Xt27dwxj0q5pm5GuYWkaRYnCqW7DAp9wDE4EViswI6jaMGnafDLFHI84USyuXIU5A9BQBbooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAIF++31qaoV++31qagBr9KSH7p+tK/Skh+6frQBJRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAQL99vrU1Qr99vrU1ADX6UkP3T9aV+lMibAP1oAmopm8eho3j0NAD6KZvHoaN49DQA+imbx6GjePQ0APopm8eho3j0NAD6KZvHoaN49DQA+imbx6GjePQ0APopm8eho3j0NAD6KZvHoaN49DQA+imbx6GjePQ0APopm8eho3j0NAD6KZvHoaN49DQA+imbx6GjePQ0APopm8eho3j0NAD6KZvHoaN49DQA+imbx6GjePQ0APopm8eho3j0NAD6KZvHoaN49DQA+imbx6GjePQ0APopm8eho3j0NAD6KZvHoaN49DQA+imbx6GjePQ0APopm8eho3j0NAD6KZvHoaN49DQA+imbx6GjePQ0APopm8eho3j0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Uf2jS7P+vmH1Sp5HCUV3f/CM6V/zxk/7+tR/wjOlf88ZP+/rUf2jS7P+vmH1Sp5HCUV3f/CM6V/zxk/7+t/jR/wjOlf88ZP+/rUf2jS7P+vmP6pPyODorvP+EZ0r/njJ/wB/Wo/4RnSv+eMn/f1qf9o0uz/r5h9Un5HB0V3n/CM6V/zxk/7+tR/wjOlf88JP+/rf40f2jS7P+vmH1WfkcHRXef8ACM6V/wA8JP8Av63+NH/CM6V/zxk/7+tR/aNLs/6+Y/qs/I4Oiu8/4RnSv+eMn/f1qP8AhGdK/wCeMn/f1qP7Rpdn/XzD6rPyODorvP8AhGNK/wCeEn/f1v8AGj/hGdK/54Sf9/W/xo/tGl2f9fMPqszgqK73/hGNK/54Sf8Af1v8aP8AhGNK/wCeEn/f1qP7Rpdn/XzD6rM4Kiu9/wCEY0r/AJ4Sf9/Wo/4RjSv+eEn/AH9b/Gj+0aXZ/wBfMPqszgqK73/hGNK/54Sf9/W/xo/4RjSv+eEn/f1v8aP7Rpdn/XzH9WmcFSojyOscalnY4VR1JrvP+EY0r/nhJ/39ardlpNjYNutoAr/3ydx/M1Msxppe6ncawsr6sfptsbPTre3P3o0AP171aoorxZNybbO5KysgooopDCiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp94/WpqAGv0qJO/1qV+lRJ3+tADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBE+8frU1Qp1P1qagBrdKjUYzUxFMK0ANopcGkwaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBowaACijBpcGgBEHJqWmqMU6gBaSiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACloooA//9k="

/***/ }),

/***/ 225:
/*!************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/img2.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/img2.jpg";

/***/ }),

/***/ 226:
/*!************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/img3.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/img3.jpg";

/***/ }),

/***/ 227:
/*!************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/img4.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/img4.jpg";

/***/ }),

/***/ 228:
/*!************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/img5.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/img5.jpg";

/***/ }),

/***/ 229:
/*!************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/air1.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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2of8fA/3R/M1sv0rHv8A/X/8BH8zVU/iJnsU/wBKkjHT603B9jT4+31rcxOiooorlOkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACorj/j3l/wB0/wAqlqK4/wBRJ/un+VNbiZhUoHIpcUoHIrquZmpaf6lP90fyq0OlVbX/AFSf7o/lVodK5XuaIa/Ssi+/134D+ZrXfpWTff638B/M1UNxS2Kn509O31pKeo6VsZNG/RRRXMbhRRSc0ALRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRTefSjn0oAdRRRQAVHP/qJP901JUcvMT/Q0LcDEpyqSRgGrARR0Apw610cxHKWbYYjQewqyOlV4PuirA6Vzssa/Ssq9/1v4D+tar9Ky7z/AFn4D+tXDcmWxW7U9e1NAp6jpWpkblFFFc5uFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABTJP9W/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eNFgLVFVRI/9407e3940WAsUVW3t/eNG9vWiwFmiq+9v7xpN7eposIs0VW3t/eNLvb+8aLAWKKrb29TRvb+8aLDLNFVt7f3jSb3/ALxpAWqKrB2/vUb2/vGnYCzRVfe3qaN7etFgLFFV97etG9v7xosBYoqvvb+8aTe396iwFmiqfmP/AHjSrI5P3jRYC3RVbe3940u9v7xosBYoqtvb+9Rvb+9RYCzRVbe3qaN7f3qLAWaKrb29TRvb1NFgLNFVt7epo3t6miwFmo5GwuO5qLe396k5PXNFhCUDqKKUdRTAdFU46VBFU46VIxr9Krf3vw/rVl+lV/X8KaExKSlxRimISlpcUlABSUtFABRRRQAlLRRQAUUUUAFFFFADs0U2loACKbT6CM0ANooxiigBKKWigBKWiigB1FFFAwooooAKKKKACiiikMSkp1JigBKKWimAlLRRQAlFLRQADilzSUUALmikooAWiilApAJRg06igBuDTcVJRQBHRT8Ck20wEFLS4pKBBRRRQAUUUUAFFFFABRRQaQIKQ0tJQUKKKBRTJCiiloASilpKACiiigBhoXrRSr1oAdRRRQAUUUUAFFFFABRRS0AJRRRQAUUtJQAUo6ikpR1FACxVOOlQRVOOlSMa/Sq/dvwqw/Sq/dvwpoTCilopiEopaKAEpaKKAEopaKAEopaKAEoxS0UAJijFLRQAlFLRQAlLRiigApMUtLSGNopcUlMAoHWilFAC0UtFIBKKWigBtLS0UANNFLRQMSiiigAooopgFFFFABRRRQAUUUuKAEopcUtIBAKWlooEJRS0UAJRRRQAUUUUAFFFFABijFFFACUUtFACUUZooAKSlooGJRS0lAwHSloHSloEFJS0UCEopaKAEopaSgBlKvWilXrTAdRRRQAUUUUAFFFFIAooopgFFFFABRRRQAUncUtHekARVOOlQRVOOlIY1+lQDq34VO/SoF6tQhMKKXHvRiqEFFGKMUAFJS49qKAEopaKAEopaKAEopaKBiUUtFACUUtFACUUtFACUtFFABSUtLSAbSiil7UAFFFFABRRRQAUUUUAFFFFACUUtFACUUtFAxKKWigBO1JS0lAhVpaQU6gBKKWigAooooAKKKKACiiigAooooAKKKKACiiigApDS0hoGJRRS0AFFFFAxKKWkoEKKKO1FAgooooAKKKKACiiigBtC9aDSimAtFFFIAooooAKKKKACiiigAooooAKKKKACiiigAiqcdKgiqcdKQxr9KgHVvwqd+lQL95vwoQMdRRRTJCkpaKAEopaKACiiigAooooGJRS0UAJRS0UAFFFFACGiloFAgooooGJS0UUAFFApaAEopaKACkpaKAEopaKAEopaSgAooooAKKKKACiiigBKKKWgAFLSCloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKBhSGlooASilopAJRS0UwEopaKACiiigQUUUUAFFFFABRRR2oAbQOtFKOtAC0UUUAFFFFABRRRQAUUUUAFJS0UAFFFFABRRRQAkVTjpUEVTjpSGNfpUC9W/Cp36VAo5ahAOoopaYhKKWigBKPwpaKAE/CilooASilpKACilooASilooASilooASj8KWigBKKWigBKKWigAooooAKKKKACikooAWikpaACiiigApKWigBKKWigBKKWigBKKWigBBS0UUAFFFLQMSilooEJRS0UAJRS0UDEooooAKKKKACiiigAooooAKKKKBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAxKBRQKAFooooEFFFFABRRRQAUUUUAFFFFAwooooAKO9FFACRVOOlQRVOOlIBr9KgXq34VO/SoU6t+FADqKKKYgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkpaKACiiigAooooAKSlooASilooASilooAKKKKACiiigAooooAKKKKACiiigAooooGFFFFAC0UUUCCiiigAooooGFJS0UAJRRRQAUUtFACUUtFACUUtFACUUtFACUUtFACUUtFACUUtFACUUtFACUUtFACUDrRRQAUUtFACUUtFACUUtFACUUUUAFFFFABRRRQAUd6KXvQA2Kpx0qCLrU46UgGv0qFPvN+FTP0qFPvNQA6ilopiEopaKBiUUtFAhKKWigBKKWigYlFLRQAlFLRSASilooASilooASiiigAopaKYCUUtJQAUUUUAFFFLQAlFLRQAlFLRQAlFLRQAUUUUAFJS0UAJRS0UAJRS0UgEopaKYBRRRQAUUUUAFFFFABRRRQAUUUUgCiiigAooopgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFACUtJRQAtFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFADYqnHSoI+tTjpSAa/SoU6tUz9KhT7zUAPooopgFFFFAgooooGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUgCiiigAooopgFJS0UgEopaKAEopaKAEopaKAEopaKAEopaKAEopaKAEopaKACiiimAUUUUAFFFFABRRRSAKKKKACiiigAooooAKKKKYBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFACUtFFIAooopgFFFFABRRRQAUUUUAFFFFABRRRQAUUUUANj61OOlQR9anHSkA1+lQp95qmfpUKfeagB9FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQA2PrU46VBHU46UANfpUKdWqZ+lQp95qAH0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUwCiiigAooooAKKKKACiiigAooooAKKKKACiiikAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFMAooopAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUANjqcdKgjqcdKAGv0qFPvNUz9Khj+81AD6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBsdTjpUEdTjpQA1+lQx/eb8KmfpUMf32/D+tAD6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBsVTjpUEVTjpQA1+lQx/fb8P61M/SoY/vt+H9aAH0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFADYqnHSoI6nHSgBr9Khj++34f1qZ+lRJ1Y0AOooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGx1OOlQRdanHSgBr9KiTvUr9KiTvQA6iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAZFVgdKrxVYHSgBr9KiTq1Sv0qJOrUAOooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGRVYHSq8VWB0oAa/Sok71K/Sok6tQA6iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAZD0qwOlQRdKnHSgBr9KhTq1TP0qFPvNQA+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAbFU46VXh6VYHSgBr9KhT7zVM/SoY/vNQA+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAbFU46VBF1qcdKAGv0qGP7zfhUz9KhT7zUAPooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGxdanHSoIutTjpQA1+lQx/eb8KmfpUMf3moAfRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUANi61OOlQRdanHSgBr9KhT7zVM/SoU+81AD6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBsXWpx0qCLrU46UANfpUKfeapn6VCn3moAfRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUANiqcdKgi61OOlADX6VCn3mqZ+lRJ3oAdRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUANi61OOlQRdanHSgBr9KiTvUr9KiTvQA6iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAbF1qcdKgi61OOlADX6VEnepX6VEnegB1FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQA2LrU46VBHU46UANfpUSd6lfpUSd6AHUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFADY6nHSoIutTjpQA1+lRJ1P1qV+lRJ3oAdRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUANi61OOlQR1OOlADX6VEnepX6VEnegB1FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQA2Opx0qCOpx0oAa/Sok71K/Sok70AOooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGx1OOlQR1OOlADX6VEnepX6VEnegB1FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQA2PrU46VBF1qcdKAGv0qJO9Sv0qJO9ADqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBsXWpx0qCKpx0oAa/Sok71K/Sok70AOooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGQ9KsDpVeHoKsDpQA1+lRJ3qV+lRJ3oAdRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAMh6CrA6VBEKnHSgBrVGoxmpiKYVoAbRRg+1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijDe1GG9qACijB9qXBoAagqamqKdQAtJRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYoxRRQAYooooAKWiigD/2Q=="

/***/ }),

/***/ 23:
/*!***********************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/color.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 230:
/*!************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/air2.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/air2.jpg";

/***/ }),

/***/ 231:
/*!************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/air3.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/air3.jpg";

/***/ }),

/***/ 232:
/*!************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/air4.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/air4.jpg";

/***/ }),

/***/ 233:
/*!************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/air5.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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Qn4f40x7BjFFHHOUVCG5UEswOc/nQBDqiMsPmN5Q3KI2Jznr29u9I8RkumaS3huGZFPD4AHPTParoty0sUkjlzGuAMYG7+9UDWD8iOcRrtKqFjGVU9qAKrxN/YseHARTuIU5yN3Az6VYvZgLgqJMEKMgM4/lUxtHNkbcyg9Ap24wBjt+FK1tL9pkljuDGHAGAoPT60AJp8geNwH3FW55Y4496uVVtbd4ZJnkl8wyEHOMdBirVABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBFL1X8aevSmS9V/Gnr0oAR+lJD90/WlfpSQ/dP1oAkooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAIpeq/jT16UyXqv409elACP0qOPofrUj9Kjj6H60APooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGP1WpV6VE/ValXpQAj9Kjj6H61I/So4+h+tAD6KKKACis291JYpbdbea2csxDhpQBgA9+1WbOeS4DM6whRwDFJvGfyoAs0Vl3+oXUEMjJYzDawAdihBG4DpnPNXLeeaZ2WS0ltwBkF2Ug+3BNAFiisqXU5Eub1BFJthh3ruQgZGep9Djiki1C4NxbI+CsrbTmLb2J4O4+lAGtRVK9vJrVs/ZlaLgBzKFyT2xiq6Xt/EyQ3FpG0zlin74DcM9OnUCgDVoqrczSpHEYzEsxIJhd8bvUA+vvUN5PfW6mRRbGPeqqG3Z5IHP50AaFFV3ne1spZ7sITEpZhEDjA+ves9tRvcNAtq32h8vESUxsyOTz1GenegDYoqC2uPtVoJokI3ZAV+OQSOcVkz6zMjwhWtBuk2th2PGD/ALPH1oA3aKqWNy90rs3klQcAxsTz+IFRyXc3msIrmw2dt7nP480AX6Kp2ty7ylZp7Nsj5RExJz+NDyXbXMkc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b+YXj2rIjCQliCNvA9q1I4Y4seXGq4GBgdB6U/A3BsDI4B74o9rpb1/EPZ9SppBB0yAg8EHH5mrlIqqq7VAUDoBwKWs5Pmk2aRVkkFFFFSMKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGP1WpV6VE/ValXpQAj9Kjj6H61I/So4+h+tAD6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBj9VqVelRP1WpV6UAI/So4+h+tSP0qOPofrQA+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAY/ValXpUT9VqVelACP0qOPofrUj9Kjj6H60APooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGP1WpV6VE/ValXpQAj9Kjj6H61I/So4+h+tAD6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBj9VqVelRP1WpV6UAI/So4+h+tSP0qOPofrQA+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAY/ValXpUT9VqVelACP0qOPofrUj9Kjj6H60APooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGP1WpV6VE/ValXpQAj9Kjj6H61I/So4+h+tAD6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBj9VqVelRP1WpV6UAI/So4+h+tSP0qOPofrQA+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAY/ValXpUT9VqVelACP0qOPofrUj9Kjj6H60APooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGP1WpV6VE/ValXpQAj9Kjj6H61I/So4+h+tAD6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBj9VqVelRP1WpV6UAI/So4+h+tSP0qOPofrQA+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAY/ValXpUT9VqVelACP0qOPofrUj9Kjj6H60APooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGP1WpV6VE/ValXpQAj9Kjj6H61I/So4+h+tAD6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBj9VqVelRP1WpV6UAI/So4+h+tSP0qOPofrQA+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAY/ValXpUT9VqVelACP0qOPofrUj9KjRWYHBA5oAfRTfLf+8KPLf8AvCgB1FN8t/7wo8t/7woAdRTfLf8AvCjy3/vCgB1FN8t/7wo8t/7woAdRTfLf+8KPLf8AvCgB1FN8t/7wo8t/7woAdRTfLf8AvCjy3/vCgB1FN8t/7wo8t/7woAdRTfLf+8KPLf8AvCgB1FN8t/7wo8t/7woAdRTfLf8AvCjy3/vCgB1FN8t/7wo8t/7woAdRTfLf+8KPLf8AvCgB1FN8t/7wo8t/7woAdRTfLf8AvCjy3/vCgB1FN8t/7wo8t/7woAdRTfLf+8KPLf8AvCgB1FN8t/7wo8t/7woAdRTfLf8AvCjy3/vCgB1FN8t/7wo8t/7woAdRVS+ufsVv5zqXGQML15rP/t+P/nhJ+YrKdaEHaTNoUKlRXiro26KxP7fj/wCeEn5ij+34/wDnhJ+YqPrNL+Yv6pW/l/L/ADNuisT+34/+eEn5ij+34/8AnhJ+Yo+s0v5g+qVv5fy/zNuisT+34/8AnhJ+Yo/t+P8A54SfmKPrNL+YPqlb+X8v8zborE/t+P8A54SfmKP7fj/54SfmKPrNL+YPqlb+X8v8zborE/t+P/nhJ+Yo/t+P/nhJ+Yo+s0v5g+qVv5fy/wAzborE/t+P/nhJ+Yo/t+P/AJ4SfmKPrNL+YPqlb+X8v8zborE/t+P/AJ4SfmKP7fj/AOeEn5ij6zS/mD6pW/l/L/M26KxP7fj/AOeEn5ij+34/+eEn5ij6zS/mD6pW/l/L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"

/***/ }),

/***/ 234:
/*!************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/air6.jpg ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/air6.jpg";

/***/ }),

/***/ 235:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/hotel1.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/hotel1.jpg";

/***/ }),

/***/ 236:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/hotel2.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/hotel2.jpg";

/***/ }),

/***/ 237:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/hotel3.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/hotel3.jpg";

/***/ }),

/***/ 238:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/hotel4.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/hotel4.jpg";

/***/ }),

/***/ 239:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/hotel5.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/hotel5.jpg";

/***/ }),

/***/ 24:
/*!***************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/type2icon.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 240:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/hotel6.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/hotel6.jpg";

/***/ }),

/***/ 241:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/train1.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/train1.jpg";

/***/ }),

/***/ 242:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/train2.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/train2.jpg";

/***/ }),

/***/ 243:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/train3.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/train3.jpg";

/***/ }),

/***/ 244:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/train4.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/train4.jpg";

/***/ }),

/***/ 245:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/train5.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/train5.jpg";

/***/ }),

/***/ 246:
/*!**************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/static/imgs/train6.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/imgs/train6.jpg";

/***/ }),

/***/ 25:
/*!*****************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/randomArray.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 26:
/*!*************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/addUnit.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 27:
/*!************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/random.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 28:
/*!**********************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/trim.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 29:
/*!***********************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/toast.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!***************************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/function/getParent.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      var data = {};
      // 历遍传过来的对象参数
      for (var i in keys) {
        // 如果父组件有此值则用，无此值则用默认值
        data[i] = parent[i] ? parent[i] : keys[i];
      }
      return data;
    }
  }

  return {};
}

/***/ }),

/***/ 31:
/*!**********************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/config/config.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-06-28
var version = '1.4.1';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 32:
/*!**********************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/uview-ui/libs/config/zIndex.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 4:
/*!**************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/pages.json ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 47:
/*!******************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/common/util.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getWeekByDay = void 0;var getWeekByDay = function getWeekByDay(dayValue) {
  //dayValue=“2014-01-01”
  var day = new Date(Date.parse(dayValue.replace(/-/g, "/"))); //将日期值格式化
  var today = new Array(
  "周日",
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六");
  //创建星期数组
  return today[day.getDay()]; //返一个星期中的某一天，其中0为星期日
};exports.getWeekByDay = getWeekByDay;

/***/ }),

/***/ 48:
/*!***********************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/common/formatter.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 格式化器
                                                                                                      * @Author: wenjm 
                                                                                                      * @Date: 2018-02-24 23:28:28 
                                                                                                      * @Last Modified by: wenjm
                                                                                                      * @Last Modified time: 2018-05-15 14:35:01
                                                                                                      */var _default =
{

  formatDateTime: function formatDateTime(value) {
    return this.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
  },

  /**
      * 格式化时间显示方式
      * 用法:format="yyyy-MM-dd hh:mm:ss";
      */
  formatDate: function formatDate(value) {var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd';
    if (!value) return "";
    if (!format) format = "yyyy-MM-dd";
    var d = value;
    if (typeof value === 'string') {
      if (value.indexOf("/Date(") > -1)
      d = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));else

      d = new Date(Date.parse(value.replace(/-/g, "/").replace("T", " ").split(".")[0])); //.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
      "M+": d.getMonth() + 1, //month
      "d+": d.getDate(), //day
      "h+": d.getHours(), //hour
      "m+": d.getMinutes(), //minute
      "s+": d.getSeconds(), //second
      "q+": Math.floor((d.getMonth() + 3) / 3), //quarter
      "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  },

  formatTime: function formatTime(t) {
    if (isNaN(t) || t == 0) {return 0;}

    var n = 31536000000;
    if (t >= n) {
      return this.formatNumber(t / n, '#,##0.##') + ' 年';
    }

    n = 86400000;
    if (t >= n) {
      return this.formatNumber(t / n, '#,##0.##') + ' 日';
    }

    n = 3600000;
    if (t >= n) {
      return this.formatNumber(t / n, '#,##0.##') + ' 小时';
    }

    n = 60000;
    if (t >= n) {
      return this.formatNumber(t / n, '#,##0.##') + ' 分';
    }

    n = 1000;
    if (t >= n) {
      return this.formatNumber(t / n, '#,##0.##') + ' 秒';
    }

    return this.formatNumber(t, '#,##0.##') + ' 毫秒';
  },

  /**  
      * 格式化数字显示方式   
      * 用法  
      * formatNumber(12345.999,'#,##0.00');  
      * formatNumber(12345.999,'#,##0.##');  
      * formatNumber(123,'000000');
      */
  formatNumber: function formatNumber(value, pattern) {
    if (value == null)
    return value;
    var strarr = value ? value.toString().split('.') : ['0'];
    var fmtarr = pattern ? pattern.split('.') : [''];
    var retstr = '';
    // 整数部分   
    var str = strarr[0];
    var fmt = fmtarr[0];
    var i = str.length - 1;
    var comma = false;
    for (var f = fmt.length - 1; f >= 0; f--) {
      switch (fmt.substr(f, 1)) {
        case '#':
          if (i >= 0) retstr = str.substr(i--, 1) + retstr;
          break;
        case '0':
          if (i >= 0) retstr = str.substr(i--, 1) + retstr;else
          retstr = '0' + retstr;
          break;
        case ',':
          comma = true;
          retstr = ',' + retstr;
          break;}

    }
    if (i >= 0) {
      if (comma) {
        var l = str.length;
        for (; i >= 0; i--) {
          retstr = str.substr(i, 1) + retstr;
          if (i > 0 && (l - i) % 3 == 0) retstr = ',' + retstr;
        }
      } else retstr = str.substr(0, i + 1) + retstr;
    }
    retstr = retstr + '.';
    // 处理小数部分   
    str = strarr.length > 1 ? strarr[1] : '';
    fmt = fmtarr.length > 1 ? fmtarr[1] : '';
    i = 0;
    for (var _f = 0; _f < fmt.length; _f++) {
      switch (fmt.substr(_f, 1)) {
        case '#':
          if (i < str.length) retstr += str.substr(i++, 1);
          break;
        case '0':
          if (i < str.length) retstr += str.substr(i++, 1);else
          retstr += '0';
          break;}

    }
    return retstr.replace(/^,+/, '').replace(/\.$/, '');
  },

  //格式化金额
  formatMoney: function formatMoney(value, pattern) {
    if (!value || value == 0)
    return 0;
    var sign = value < 0 ? '-' : '';
    return sign + this.formatNumber(Math.abs(value), pattern || '#,##0.00');
  },

  formatMoneyCn: function formatMoneyCn(value) {
    return '￥' + this.formatMoney(value);
  },

  formatWeek: function formatWeek(value) {
    var week = new Array("日", "一", "二", "三", "四", "五", "六");
    var datetimeReg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    if (datetimeReg.test(value)) {
      value = value.replace(/-/g, "/");
    }
    var day = new Date(value).getDay();

    return "星期" + week[day];
  },

  formatMoneyAuto: function formatMoneyAuto(value) {var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#,##0.00';
    var unit = "元";
    if (value) {
      var unitNum = {
        // '千': 1000.00,
        '万': 10000.00,
        '千万': 10000000.00,
        '亿': 100000000.00,
        '百亿': 10000000000.00 };

      var unitCount = {
        // "4": '千',
        "5": '万',
        "8": '千万',
        "9": '亿',
        "11": '百亿' };

      var count = 0;
      var money = value;

      while (money >= 1) {
        money = money / 10;
        count++;
      }
      var tmp = unitCount[count + ""];
      while (count >= 4 && tmp === undefined) {
        tmp = unitCount[--count + ""];
      }
      unit = tmp === undefined ? unit : tmp;
      value = count >= 4 ? value / unitNum[unit] : value;
    }
    return this.formatMoney(value, pattern) + unit || "";
  },

  formatFileSize: function formatFileSize(value) {
    if (null == value || value == '') {
      return "0 Bytes";
    }
    var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2);
    return size + unitArr[index];
  } };exports.default = _default;

/***/ }),

/***/ 57:
/*!***************************************************************************!*\
  !*** C:/Users/zhangHan/Desktop/uni/chaike-H5-小程序/pages/cityPick/citys.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{
  "keyID": 25,
  "cityID": 151005,
  "airportName": "阿尔山伊尔施机场",
  "airportShortName": "伊尔施",
  "cityCode": "YIE",
  "cityName": "阿尔山",
  "cityNamePY": "aershan",
  "municipalCity": "兴安盟",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 28,
  "cityID": 151201,
  "airportName": "阿拉善右旗巴丹吉林机场",
  "airportShortName": "巴丹吉林",
  "cityCode": "RHT",
  "cityName": "阿拉善右旗",
  "cityNamePY": "alashanyouqi",
  "municipalCity": "阿拉善",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 29,
  "cityID": 151202,
  "airportName": "阿拉善左旗巴彦浩特机场",
  "airportShortName": "巴彦浩特",
  "cityCode": "AXF",
  "cityName": "阿拉善左旗",
  "cityNamePY": "alashanzuoqi",
  "municipalCity": "阿拉善",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 72,
  "cityID": 340800,
  "airportName": "安庆天柱山机场",
  "airportShortName": "天柱山",
  "cityCode": "AQG",
  "cityName": "安庆",
  "cityNamePY": "anqing",
  "municipalCity": "安庆",
  "hotCity": 2,
  "province": "安徽" },

{
  "keyID": 143,
  "cityID": 520200,
  "airportName": "安顺黄果树机场",
  "airportShortName": "黄果树",
  "cityCode": "AVA",
  "cityName": "安顺",
  "cityNamePY": "anshun",
  "municipalCity": "安顺",
  "hotCity": 2,
  "province": "贵州" },

{
  "keyID": 164,
  "cityID": 540200,
  "airportName": "阿里昆莎机场",
  "airportShortName": "昆莎",
  "cityCode": "NGQ",
  "cityName": "阿里",
  "cityNamePY": "ali",
  "municipalCity": "阿里",
  "hotCity": 2,
  "province": "西藏" },

{
  "keyID": 172,
  "cityID": 610900,
  "airportName": "安康五里铺机场",
  "airportShortName": "五里铺",
  "cityCode": "AKA",
  "cityName": "安康",
  "cityNamePY": "ankang",
  "municipalCity": "安康",
  "hotCity": 2,
  "province": "陕西" },

{
  "keyID": 194,
  "cityID": 652900,
  "airportName": "阿克苏机场",
  "airportShortName": "阿克苏",
  "cityCode": "AKU",
  "cityName": "阿克苏",
  "cityNamePY": "akesu",
  "municipalCity": "阿克苏",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 200,
  "cityID": 654300,
  "airportName": "阿勒泰机场",
  "airportShortName": "阿勒泰",
  "cityCode": "AAT",
  "cityName": "阿勒泰",
  "cityNamePY": "aletai",
  "municipalCity": "阿勒泰",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 1,
  "cityID": 110100,
  "airportName": "北京南苑机场",
  "airportShortName": "南苑",
  "cityCode": "NAY",
  "cityName": "北京",
  "cityNamePY": "beijing",
  "municipalCity": "北京",
  "hotCity": 1,
  "province": "北京" },


{
  "keyID": 17,
  "cityID": 150200,
  "airportName": "包头二里半机场",
  "airportShortName": "二里半",
  "cityCode": "BAV",
  "cityName": "包头",
  "cityNamePY": "baotou",
  "municipalCity": "包头",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 23,
  "cityID": 150800,
  "airportName": "巴彦淖尔天吉泰机场",
  "airportShortName": "天吉泰",
  "cityCode": "RLK",
  "cityName": "巴彦淖尔",
  "cityNamePY": "bayanneer",
  "municipalCity": "巴彦淖尔",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 41,
  "cityID": 220600,
  "airportName": "长白山机场",
  "airportShortName": "长白山",
  "cityCode": "NBS",
  "cityName": "白山",
  "cityNamePY": "baishan",
  "municipalCity": "白山",
  "hotCity": 2,
  "province": "吉林" },

{
  "keyID": 124,
  "cityID": 450500,
  "airportName": "北海福成机场",
  "airportShortName": "福成",
  "cityCode": "BHY",
  "cityName": "北海",
  "cityNamePY": "beihai",
  "municipalCity": "北海",
  "hotCity": 2,
  "province": "广西" },

{
  "keyID": 125,
  "cityID": 451000,
  "airportName": "百色巴马机场",
  "airportShortName": "巴马",
  "cityCode": "AEB",
  "cityName": "百色",
  "cityNamePY": "baise",
  "municipalCity": "百色",
  "hotCity": 2,
  "province": "广西" },

{
  "keyID": 144,
  "cityID": 520300,
  "airportName": "毕节飞雄机场",
  "airportShortName": "飞雄",
  "cityCode": "BFJ",
  "cityName": "毕节",
  "cityNamePY": "bijie",
  "municipalCity": "毕节",
  "hotCity": 2,
  "province": "贵州" },

{
  "keyID": 152,
  "cityID": 530200,
  "airportName": "保山云瑞机场",
  "airportShortName": "保山",
  "cityCode": "BSD",
  "cityName": "保山",
  "cityNamePY": "baoshan",
  "municipalCity": "保山",
  "hotCity": 2,
  "province": "云南" },

{
  "keyID": 191,
  "cityID": 652700,
  "airportName": "博乐阿拉山口机场",
  "airportShortName": "山口",
  "cityCode": "BPL",
  "cityName": "博尔塔拉",
  "cityNamePY": "boertala",
  "municipalCity": "博尔塔拉",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 201,
  "cityID": 654304,
  "airportName": "布尔津喀纳斯机场",
  "airportShortName": "喀纳斯",
  "cityCode": "KJI",
  "cityName": "布尔津",
  "cityNamePY": "buerjin",
  "municipalCity": "阿勒泰",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 203,
  "cityID": 510300,
  "airportName": "巴中恩阳机场",
  "airportShortName": "恩阳机场",
  "cityCode": "BZX",
  "cityName": "巴中",
  "cityNamePY": "bazhong",
  "municipalCity": "巴中",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 12,
  "cityID": 140400,
  "airportName": "长治王村机场",
  "airportShortName": "王村",
  "cityCode": "CIH",
  "cityName": "长治",
  "cityNamePY": "changzhi",
  "municipalCity": "长治",
  "hotCity": 2,
  "province": "山西" },

{
  "keyID": 18,
  "cityID": 150400,
  "airportName": "赤峰玉龙机场",
  "airportShortName": "玉龙",
  "cityCode": "CIF",
  "cityName": "赤峰",
  "cityNamePY": "chifeng",
  "municipalCity": "赤峰",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 34,
  "cityID": 210202,
  "airportName": "长海大长山岛机场",
  "airportShortName": "大长山岛",
  "cityCode": "CNI",
  "cityName": "长海",
  "cityNamePY": "changhai",
  "municipalCity": "大连",
  "hotCity": 2,
  "province": "辽宁" },

{
  "keyID": 38,
  "cityID": 211300,
  "airportName": "朝阳机场",
  "airportShortName": "朝阳",
  "cityCode": "CHG",
  "cityName": "朝阳",
  "cityNamePY": "chaoyang",
  "municipalCity": "朝阳",
  "hotCity": 2,
  "province": "辽宁" },

{
  "keyID": 39,
  "cityID": 220100,
  "airportName": "长春龙嘉国际机场",
  "airportShortName": "龙嘉",
  "cityCode": "CGQ",
  "cityName": "长春",
  "cityNamePY": "changchun",
  "municipalCity": "长春",
  "hotCity": 2,
  "province": "吉林" },

{
  "keyID": 58,
  "cityID": 320400,
  "airportName": "常州奔牛机场",
  "airportShortName": "奔牛",
  "cityCode": "CZX",
  "cityName": "常州",
  "cityNamePY": "changzhou",
  "municipalCity": "常州",
  "hotCity": 2,
  "province": "江苏" },

{
  "keyID": 75,
  "cityID": 341700,
  "airportName": "池州九华山机场",
  "airportShortName": "九华山",
  "cityCode": "JUH",
  "cityName": "池州",
  "cityNamePY": "chizhou",
  "municipalCity": "池州",
  "hotCity": 2,
  "province": "安徽" },

{
  "keyID": 103,
  "cityID": 430100,
  "airportName": "长沙黄花国际机场",
  "airportShortName": "黄花",
  "cityCode": "CSX",
  "cityName": "长沙",
  "cityNamePY": "changsha",
  "municipalCity": "长沙",
  "hotCity": 1,
  "province": "湖南" },

{
  "keyID": 104,
  "cityID": 430700,
  "airportName": "常德桃花源机场",
  "airportShortName": "桃花源",
  "cityCode": "CGD",
  "cityName": "常德",
  "cityNamePY": "changde",
  "municipalCity": "常德",
  "hotCity": 2,
  "province": "湖南" },

{
  "keyID": 126,
  "cityID": 500100,
  "airportName": "重庆江北国际机场",
  "airportShortName": "沙堤",
  "cityCode": "CKG",
  "cityName": "重庆",
  "cityNamePY": "chongqing",
  "municipalCity": "重庆",
  "hotCity": 1,
  "province": "重庆" },

{
  "keyID": 129,
  "cityID": 510100,
  "airportName": "成都双流国际机场",
  "airportShortName": "双流",
  "cityCode": "CTU",
  "cityName": "成都",
  "cityNamePY": "chengdu",
  "municipalCity": "成都",
  "hotCity": 1,
  "province": "四川" },

{
  "keyID": 165,
  "cityID": 540300,
  "airportName": "昌都邦达机场",
  "airportShortName": "邦达",
  "cityCode": "BPX",
  "cityName": "昌都",
  "cityNamePY": "changdu",
  "municipalCity": "昌都",
  "hotCity": 2,
  "province": "西藏" },

{
  "keyID": 11,
  "cityID": 140200,
  "airportName": "大同云冈机场",
  "airportShortName": "云冈",
  "cityCode": "DAT",
  "cityName": "大同",
  "cityNamePY": "datong",
  "municipalCity": "大同",
  "hotCity": 2,
  "province": "山西" },

{
  "keyID": 33,
  "cityID": 210200,
  "airportName": "大连周水子国际机场",
  "airportShortName": "周水子",
  "cityCode": "DLC",
  "cityName": "大连",
  "cityNamePY": "dalian",
  "municipalCity": "大连",
  "hotCity": 1,
  "province": "辽宁" },

{
  "keyID": 36,
  "cityID": 210600,
  "airportName": "丹东浪头机场",
  "airportShortName": "浪头",
  "cityCode": "DDG",
  "cityName": "丹东",
  "cityNamePY": "dandong",
  "municipalCity": "丹东",
  "hotCity": 2,
  "province": "辽宁" },

{
  "keyID": 46,
  "cityID": 230600,
  "airportName": "大庆萨尔图机场",
  "airportShortName": "萨尔图",
  "cityCode": "DQA",
  "cityName": "大庆",
  "cityNamePY": "daqing",
  "municipalCity": "大庆",
  "hotCity": 2,
  "province": "黑龙江" },

{
  "keyID": 51,
  "cityID": 231300,
  "airportName": "加格达奇机场",
  "airportShortName": "加格达奇",
  "cityCode": "JGD",
  "cityName": "大兴安岭",
  "cityNamePY": "daxinganling",
  "municipalCity": "大兴安岭",
  "hotCity": 2,
  "province": "黑龙江" },

{
  "keyID": 89,
  "cityID": 370500,
  "airportName": "东营胜利机场",
  "airportShortName": "胜利",
  "cityCode": "DOY",
  "cityName": "东营",
  "cityNamePY": "dongying",
  "municipalCity": "东营",
  "hotCity": 2,
  "province": "山东" },

{
  "keyID": 116,
  "cityID": 441900,
  "airportName": "东莞机场",
  "airportShortName": "东莞",
  "cityCode": "DGM",
  "cityName": "东莞",
  "cityNamePY": "dongguan",
  "municipalCity": "东莞",
  "hotCity": 2,
  "province": "广东" },

{
  "keyID": 131,
  "cityID": 510400,
  "airportName": "达州河市机场",
  "airportShortName": "河市",
  "cityCode": "DAX",
  "cityName": "达州",
  "cityNamePY": "dazhou",
  "municipalCity": "达州",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 132,
  "cityID": 510610,
  "airportName": "稻城亚丁机场",
  "airportShortName": "亚丁",
  "cityCode": "DCY",
  "cityName": "稻城",
  "cityNamePY": "daocheng",
  "municipalCity": "甘孜",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 154,
  "cityID": 530400,
  "airportName": "大理机场",
  "airportShortName": "大理",
  "cityCode": "DLU",
  "cityName": "大理",
  "cityNamePY": "dali",
  "municipalCity": "大理",
  "hotCity": 2,
  "province": "云南" },

{
  "keyID": 155,
  "cityID": 530500,
  "airportName": "德宏芒市机场",
  "airportShortName": "芒市",
  "cityCode": "LUM",
  "cityName": "德宏",
  "cityNamePY": "dehong",
  "municipalCity": "德宏",
  "hotCity": 2,
  "province": "云南" },

{
  "keyID": 156,
  "cityID": 530600,
  "airportName": "迪庆香格里拉机场",
  "airportShortName": "香格里拉",
  "cityCode": "DIG",
  "cityName": "迪庆",
  "cityNamePY": "diqing",
  "municipalCity": "迪庆",
  "hotCity": 2,
  "province": "云南" },

{
  "keyID": 179,
  "cityID": 621003,
  "airportName": "敦煌机场",
  "airportShortName": "敦煌",
  "cityCode": "DNH",
  "cityName": "敦煌",
  "cityNamePY": "dunhuang",
  "municipalCity": "酒泉",
  "hotCity": 2,
  "province": "甘肃" },

{
  "keyID": 20,
  "cityID": 150600,
  "airportName": "鄂尔多斯伊金霍洛机场",
  "airportShortName": "伊金霍洛",
  "cityCode": "DSN",
  "cityName": "鄂尔多斯",
  "cityNamePY": "eerduosi",
  "municipalCity": "鄂尔多斯",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 27,
  "cityID": 151110,
  "airportName": "二连浩特赛乌苏机场",
  "airportShortName": "赛乌苏",
  "cityCode": "ERL",
  "cityName": "二连浩特",
  "cityNamePY": "erlianhaote",
  "municipalCity": "锡林郭勒盟",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 30,
  "cityID": 151203,
  "airportName": "额济纳旗桃来机场",
  "airportShortName": "桃来",
  "cityCode": "EJN",
  "cityName": "额济纳旗",
  "cityNamePY": "ejinaqi",
  "municipalCity": "阿拉善",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 102,
  "cityID": 421400,
  "airportName": "恩施许家坪机场",
  "airportShortName": "许家坪",
  "cityCode": "ENH",
  "cityName": "恩施",
  "cityNamePY": "enshi",
  "municipalCity": "恩施",
  "hotCity": 2,
  "province": "湖北" },

{
  "keyID": 74,
  "cityID": 341200,
  "airportName": "阜阳西关机场",
  "airportShortName": "西关",
  "cityCode": "FUG",
  "cityName": "阜阳",
  "cityNamePY": "fuyang",
  "municipalCity": "阜阳",
  "hotCity": 2,
  "province": "安徽" },

{
  "keyID": 76,
  "cityID": 350100,
  "airportName": "福州长乐国际机场",
  "airportShortName": "长乐",
  "cityCode": "FOC",
  "cityName": "福州",
  "cityNamePY": "fuzhou",
  "municipalCity": "福州",
  "hotCity": 1,
  "province": "福建" },

{
  "keyID": 112,
  "cityID": 440600,
  "airportName": "佛山沙堤机场",
  "airportShortName": "沙堤",
  "cityCode": "FUO",
  "cityName": "佛山",
  "cityNamePY": "fushan",
  "municipalCity": "佛山",
  "hotCity": 2,
  "province": "广东" },

{
  "keyID": 202,
  "cityID": 654305,
  "airportName": "富蕴机场",
  "airportShortName": "富蕴",
  "cityCode": "FYN",
  "cityName": "富蕴",
  "cityNamePY": "fuyun",
  "municipalCity": "阿勒泰",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 84,
  "cityID": 360700,
  "airportName": "赣州黄金机场",
  "airportShortName": "黄金",
  "cityCode": "KOW",
  "cityName": "赣州",
  "cityNamePY": "ganzhou",
  "municipalCity": "赣州",
  "hotCity": 2,
  "province": "江西" },

{
  "keyID": 108,
  "cityID": 440100,
  "airportName": "广州白云国际机场",
  "airportShortName": "白云",
  "cityCode": "CAN",
  "cityName": "广州",
  "cityNamePY": "guangzhou",
  "municipalCity": "广州",
  "hotCity": 1,
  "province": "广东" },

{
  "keyID": 122,
  "cityID": 450300,
  "airportName": "桂林两江国际机场",
  "airportShortName": "两江",
  "cityCode": "KWL",
  "cityName": "桂林",
  "cityNamePY": "guilin",
  "municipalCity": "桂林",
  "hotCity": 2,
  "province": "广西" },

{
  "keyID": 134,
  "cityID": 510800,
  "airportName": "广元盘龙机场",
  "airportShortName": "盘龙",
  "cityCode": "GYS",
  "cityName": "广元",
  "cityNamePY": "guangyuan",
  "municipalCity": "广元",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 142,
  "cityID": 520100,
  "airportName": "贵阳龙洞堡国际机场",
  "airportShortName": "龙洞堡",
  "cityCode": "KWE",
  "cityName": "贵阳",
  "cityNamePY": "guiyang",
  "municipalCity": "贵阳",
  "hotCity": 2,
  "province": "贵州" },

{
  "keyID": 180,
  "cityID": 623000,
  "airportName": "甘南夏河机场",
  "airportShortName": "夏河",
  "cityCode": "GXH",
  "cityName": "甘南",
  "cityNamePY": "gannan",
  "municipalCity": "甘南",
  "hotCity": 2,
  "province": "甘肃" },

{
  "keyID": 183,
  "cityID": 632804,
  "airportName": "格尔木机场",
  "airportShortName": "格尔木",
  "cityCode": "GOQ",
  "cityName": "格尔木",
  "cityNamePY": "geermu",
  "municipalCity": "海西",
  "hotCity": 2,
  "province": "青海" },

{
  "keyID": 185,
  "cityID": 640400,
  "airportName": "固原六盘山机场",
  "airportShortName": "六盘山",
  "cityCode": "GYU",
  "cityName": "固原",
  "cityNamePY": "guyuan",
  "municipalCity": "固原",
  "hotCity": 2,
  "province": "宁夏" },

{
  "keyID": 7,
  "cityID": 130400,
  "airportName": "邯郸机场",
  "airportShortName": "邯郸",
  "cityCode": "HDG",
  "cityName": "邯郸",
  "cityNamePY": "handan",
  "municipalCity": "邯郸",
  "hotCity": 2,
  "province": "河北" },

{
  "keyID": 16,
  "cityID": 150100,
  "airportName": "呼和浩特白塔国际机场",
  "airportShortName": "白塔",
  "cityCode": "HET",
  "cityName": "呼和浩特",
  "cityNamePY": "huhehaote",
  "municipalCity": "呼和浩特",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 21,
  "cityID": 150700,
  "airportName": "呼伦贝尔海拉尔机场",
  "airportShortName": "海拉尔",
  "cityCode": "HLD",
  "cityName": "呼伦贝尔",
  "cityNamePY": "hulunbeier",
  "municipalCity": "呼伦贝尔",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 43,
  "cityID": 230100,
  "airportName": "哈尔滨太平国际机场",
  "airportShortName": "太平",
  "cityCode": "HRB",
  "cityName": "哈尔滨",
  "cityNamePY": "haerbin",
  "municipalCity": "哈尔滨",
  "hotCity": 2,
  "province": "黑龙江" },

{
  "keyID": 50,
  "cityID": 231100,
  "airportName": "黑河机场",
  "airportShortName": "黑河",
  "cityCode": "HEK",
  "cityName": "黑河",
  "cityNamePY": "heihe",
  "municipalCity": "黑河",
  "hotCity": 2,
  "province": "黑龙江" },

{
  "keyID": 61,
  "cityID": 320800,
  "airportName": "淮安涟水机场",
  "airportShortName": "涟水",
  "cityCode": "HIA",
  "cityName": "淮安",
  "cityNamePY": "huaian",
  "municipalCity": "淮安",
  "hotCity": 2,
  "province": "江苏" },

{
  "keyID": 64,
  "cityID": 330100,
  "airportName": "杭州萧山国际机场",
  "airportShortName": "萧山",
  "cityCode": "HGH",
  "cityName": "杭州",
  "cityNamePY": "hangzhou",
  "municipalCity": "杭州",
  "hotCity": 1,
  "province": "浙江" },

{
  "keyID": 71,
  "cityID": 340100,
  "airportName": "合肥新桥国际机场",
  "airportShortName": "新桥",
  "cityCode": "HFE",
  "cityName": "合肥",
  "cityNamePY": "hefei",
  "municipalCity": "合肥",
  "hotCity": 2,
  "province": "安徽" },

{
  "keyID": 73,
  "cityID": 341000,
  "airportName": "黄山屯溪机场",
  "airportShortName": "屯溪",
  "cityCode": "TXN",
  "cityName": "黄山",
  "cityNamePY": "huangshan",
  "municipalCity": "黄山",
  "hotCity": 2,
  "province": "安徽" },

{
  "keyID": 107,
  "cityID": 431200,
  "airportName": "怀化芷江机场",
  "airportShortName": "芷江",
  "cityCode": "HJJ",
  "cityName": "怀化",
  "cityNamePY": "huaihua",
  "municipalCity": "怀化",
  "hotCity": 2,
  "province": "湖南" },

{
  "keyID": 114,
  "cityID": 441300,
  "airportName": "惠州平潭机场",
  "airportShortName": "平潭",
  "cityCode": "HUZ",
  "cityName": "惠州",
  "cityNamePY": "huizhou",
  "municipalCity": "惠州",
  "hotCity": 2,
  "province": "广东" },

{
  "keyID": 118,
  "cityID": 450100,
  "airportName": "海口美兰国际机场",
  "airportShortName": "美兰",
  "cityCode": "HAK",
  "cityName": "海口",
  "cityNamePY": "haikou",
  "municipalCity": "海口",
  "hotCity": 2,
  "province": "海南" },

{
  "keyID": 170,
  "cityID": 610700,
  "airportName": "汉中西关机场",
  "airportShortName": "西关",
  "cityCode": "HZG",
  "cityName": "汉中",
  "cityNamePY": "hanzhong",
  "municipalCity": "汉中",
  "hotCity": 2,
  "province": "陕西" },

{
  "keyID": 190,
  "cityID": 652200,
  "airportName": "哈密机场",
  "airportShortName": "哈密",
  "cityCode": "HMI",
  "cityName": "哈密",
  "cityNamePY": "hami",
  "municipalCity": "哈密",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 196,
  "cityID": 653200,
  "airportName": "和田机场",
  "airportShortName": "和田",
  "cityCode": "HTN",
  "cityName": "和田",
  "cityNamePY": "hetian",
  "municipalCity": "和田",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 37,
  "cityID": 210700,
  "airportName": "锦州小岭子机场",
  "airportShortName": "锦州湾",
  "cityCode": "JNZ",
  "cityName": "锦州",
  "cityNamePY": "jinzhou",
  "municipalCity": "锦州",
  "hotCity": 2,
  "province": "辽宁" },

{
  "keyID": 45,
  "cityID": 230300,
  "airportName": "鸡西兴凯湖机场",
  "airportShortName": "兴凯湖",
  "cityCode": "JXA",
  "cityName": "鸡西",
  "cityNamePY": "jixi",
  "municipalCity": "鸡西",
  "hotCity": 2,
  "province": "黑龙江" },

{
  "keyID": 48,
  "cityID": 230800,
  "airportName": "佳木斯东郊机场",
  "airportShortName": "东郊",
  "cityCode": "JMU",
  "cityName": "佳木斯",
  "cityNamePY": "jiamusi",
  "municipalCity": "佳木斯",
  "hotCity": 2,
  "province": "黑龙江" },

{
  "keyID": 67,
  "cityID": 330700,
  "airportName": "义乌机场",
  "airportShortName": "义乌",
  "cityCode": "YIW",
  "cityName": "金华",
  "cityNamePY": "jinhua",
  "municipalCity": "金华",
  "hotCity": 2,
  "province": "浙江" },

{
  "keyID": 82,
  "cityID": 360200,
  "airportName": "景德镇罗家机场",
  "airportShortName": "罗家",
  "cityCode": "JDZ",
  "cityName": "景德镇",
  "cityNamePY": "jingdezhen",
  "municipalCity": "景德镇",
  "hotCity": 2,
  "province": "江西" },

{
  "keyID": 83,
  "cityID": 360400,
  "airportName": "九江庐山机场",
  "airportShortName": "庐山",
  "cityCode": "JIU",
  "cityName": "九江",
  "cityNamePY": "jiujiang",
  "municipalCity": "九江",
  "hotCity": 2,
  "province": "江西" },

{
  "keyID": 85,
  "cityID": 360800,
  "airportName": "井冈山机场",
  "airportShortName": "井冈山",
  "cityCode": "JGS",
  "cityName": "吉安",
  "cityNamePY": "jian",
  "municipalCity": "吉安",
  "hotCity": 2,
  "province": "江西" },

{
  "keyID": 87,
  "cityID": 370100,
  "airportName": "济南遥墙国际机场",
  "airportShortName": "遥墙",
  "cityCode": "TNA",
  "cityName": "济南",
  "cityNamePY": "jinan",
  "municipalCity": "济南",
  "hotCity": 1,
  "province": "山东" },

{
  "keyID": 92,
  "cityID": 370800,
  "airportName": "济宁曲阜机场",
  "airportShortName": "曲阜",
  "cityCode": "JNG",
  "cityName": "济宁",
  "cityNamePY": "jining",
  "municipalCity": "济宁",
  "hotCity": 2,
  "province": "山东" },

{
  "keyID": 117,
  "cityID": 445200,
  "airportName": "揭阳潮汕机场",
  "airportShortName": "潮汕",
  "cityCode": "SWA",
  "cityName": "揭阳",
  "cityNamePY": "jieyang",
  "municipalCity": "揭阳",
  "hotCity": 2,
  "province": "广东" },

{
  "keyID": 130,
  "cityID": 510205,
  "airportName": "九寨黄龙机场",
  "airportShortName": "黄龙",
  "cityCode": "JZH",
  "cityName": "九寨沟",
  "cityNamePY": "jiuzhaigou",
  "municipalCity": "阿坝",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 174,
  "cityID": 620200,
  "airportName": "嘉峪关机场",
  "airportShortName": "嘉峪关",
  "cityCode": "JGN",
  "cityName": "嘉峪关",
  "cityNamePY": "jiayuguan",
  "municipalCity": "嘉峪关",
  "hotCity": 2,
  "province": "甘肃" },

{
  "keyID": 175,
  "cityID": 620300,
  "airportName": "金昌金川机场",
  "airportShortName": "金川",
  "cityCode": "JIC",
  "cityName": "金昌",
  "cityNamePY": "jinchang",
  "municipalCity": "金昌",
  "hotCity": 2,
  "province": "甘肃" },

{
  "keyID": 133,
  "cityID": 510611,
  "airportName": "甘孜康定机场",
  "airportShortName": "康定",
  "cityCode": "KGT",
  "cityName": "康定",
  "cityNamePY": "kangding",
  "municipalCity": "甘孜",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 151,
  "cityID": 530100,
  "airportName": "昆明长水国际机场",
  "airportShortName": "长水",
  "cityCode": "KMG",
  "cityName": "昆明",
  "cityNamePY": "kunming",
  "municipalCity": "昆明",
  "hotCity": 1,
  "province": "云南" },

{
  "keyID": 188,
  "cityID": 650200,
  "airportName": "克拉玛依机场",
  "airportShortName": "克拉玛依",
  "cityCode": "KRY",
  "cityName": "克拉玛依",
  "cityNamePY": "kelamayi",
  "municipalCity": "克拉玛依",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 193,
  "cityID": 652808,
  "airportName": "库尔勒机场",
  "airportShortName": "库尔勒",
  "cityCode": "KRL",
  "cityName": "库尔勒",
  "cityNamePY": "kuerle",
  "municipalCity": "巴音郭楞",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 195,
  "cityID": 653100,
  "airportName": "喀什机场",
  "airportShortName": "喀什",
  "cityCode": "KHG",
  "cityName": "喀什",
  "cityNamePY": "kashi",
  "municipalCity": "喀什",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 14,
  "cityID": 141000,
  "airportName": "临汾乔李机场",
  "airportShortName": "乔李",
  "cityCode": "LFQ",
  "cityName": "临汾",
  "cityNamePY": "linfen",
  "municipalCity": "临汾",
  "hotCity": 2,
  "province": "山西" },

{
  "keyID": 15,
  "cityID": 141100,
  "airportName": "吕梁机场",
  "airportShortName": "吕梁",
  "cityCode": "LLV",
  "cityName": "吕梁",
  "cityNamePY": "lvliang",
  "municipalCity": "吕梁",
  "hotCity": 2,
  "province": "山西" },

{
  "keyID": 60,
  "cityID": 320700,
  "airportName": "连云港白塔埠机场",
  "airportShortName": "白塔埠",
  "cityCode": "LYG",
  "cityName": "连云港",
  "cityNamePY": "lianyungang",
  "municipalCity": "连云港",
  "hotCity": 2,
  "province": "江苏" },

{
  "keyID": 79,
  "cityID": 350800,
  "airportName": "连城冠豸山机场",
  "airportShortName": "冠豸山",
  "cityCode": "LCX",
  "cityName": "龙岩",
  "cityNamePY": "longyan",
  "municipalCity": "龙岩",
  "hotCity": 2,
  "province": "福建" },

{
  "keyID": 95,
  "cityID": 371300,
  "airportName": "临沂沭埠岭机场",
  "airportShortName": "乔李",
  "cityCode": "LYI",
  "cityName": "临沂",
  "cityNamePY": "linyi",
  "municipalCity": "临沂",
  "hotCity": 2,
  "province": "山东" },

{
  "keyID": 97,
  "cityID": 410300,
  "airportName": "洛阳北郊机场",
  "airportShortName": "北郊",
  "cityCode": "LYA",
  "cityName": "洛阳",
  "cityNamePY": "luoyang",
  "municipalCity": "洛阳",
  "hotCity": 2,
  "province": "河南" },

{
  "keyID": 120,
  "cityID": 450200,
  "airportName": "柳州白莲机场",
  "airportShortName": "白莲",
  "cityCode": "LZH",
  "cityName": "柳州",
  "cityNamePY": "liuzhou",
  "municipalCity": "柳州",
  "hotCity": 2,
  "province": "广西" },

{
  "keyID": 135,
  "cityID": 511200,
  "airportName": "泸州蓝田机场",
  "airportShortName": "云龙",
  "cityCode": "LZO",
  "cityName": "泸州",
  "cityNamePY": "luzhou",
  "municipalCity": "泸州",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 146,
  "cityID": 520513,
  "airportName": "黎平机场",
  "airportShortName": "黎平",
  "cityCode": "HZH",
  "cityName": "黎平",
  "cityNamePY": "liping",
  "municipalCity": "黔东南",
  "hotCity": 2,
  "province": "贵州" },

{
  "keyID": 157,
  "cityID": 530900,
  "airportName": "丽江三义机场",
  "airportShortName": "三义",
  "cityCode": "LJG",
  "cityName": "丽江",
  "cityNamePY": "lijiang",
  "municipalCity": "丽江",
  "hotCity": 2,
  "province": "云南" },

{
  "keyID": 158,
  "cityID": 531000,
  "airportName": "临沧机场",
  "airportShortName": "临沧",
  "cityCode": "LNJ",
  "cityName": "临沧",
  "cityNamePY": "lincang",
  "municipalCity": "临沧",
  "hotCity": 2,
  "province": "云南" },

{
  "keyID": 163,
  "cityID": 540100,
  "airportName": "拉萨贡嘎机场",
  "airportShortName": "贡嘎",
  "cityCode": "LXA",
  "cityName": "拉萨",
  "cityNamePY": "lasa",
  "municipalCity": "拉萨",
  "hotCity": 2,
  "province": "西藏" },

{
  "keyID": 166,
  "cityID": 540400,
  "airportName": "林芝米林机场",
  "airportShortName": "米林",
  "cityCode": "LZY",
  "cityName": "林芝",
  "cityNamePY": "linzhi",
  "municipalCity": "林芝",
  "hotCity": 2,
  "province": "西藏" },

{
  "keyID": 173,
  "cityID": 620100,
  "airportName": "兰州中川机场",
  "airportShortName": "中川",
  "cityCode": "LHW",
  "cityName": "兰州",
  "cityNamePY": "lanzhou",
  "municipalCity": "兰州",
  "hotCity": 2,
  "province": "甘肃" },

{
  "keyID": 22,
  "cityID": 150708,
  "airportName": "满洲里西郊机场",
  "airportShortName": "西郊",
  "cityCode": "NZH",
  "cityName": "满洲里",
  "cityNamePY": "manzhouli",
  "municipalCity": "呼伦贝尔",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 49,
  "cityID": 231000,
  "airportName": "牡丹江海浪机场",
  "airportShortName": "海浪",
  "cityCode": "MDG",
  "cityName": "牡丹江",
  "cityNamePY": "mudanjiang",
  "municipalCity": "牡丹江",
  "hotCity": 2,
  "province": "黑龙江" },

{
  "keyID": 52,
  "cityID": 231301,
  "airportName": "漠河古莲机场",
  "airportShortName": "古莲",
  "cityCode": "OHE",
  "cityName": "漠河",
  "cityNamePY": "mohe",
  "municipalCity": "大兴安岭",
  "hotCity": 2,
  "province": "黑龙江" },

{
  "keyID": 115,
  "cityID": 441400,
  "airportName": "梅县长岗岌机场",
  "airportShortName": "长岗岌",
  "cityCode": "MXZ",
  "cityName": "梅州",
  "cityNamePY": "meizhou",
  "municipalCity": "梅州",
  "hotCity": 2,
  "province": "广东" },

{
  "keyID": 137,
  "cityID": 511400,
  "airportName": "绵阳南郊机场",
  "airportShortName": "南郊",
  "cityCode": "MIG",
  "cityName": "绵阳",
  "cityNamePY": "mianyang",
  "municipalCity": "绵阳",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 55,
  "cityID": 320100,
  "airportName": "南京禄口国际机场",
  "airportShortName": "禄口",
  "cityCode": "NKG",
  "cityName": "南京",
  "cityNamePY": "nanjing",
  "municipalCity": "南京",
  "hotCity": 1,
  "province": "江苏" },

{
  "keyID": 59,
  "cityID": 320600,
  "airportName": "南通兴东机场",
  "airportShortName": "兴东",
  "cityCode": "NTG",
  "cityName": "南通",
  "cityNamePY": "nantong",
  "municipalCity": "南通",
  "hotCity": 2,
  "province": "江苏" },

{
  "keyID": 65,
  "cityID": 330200,
  "airportName": "宁波栎社国际机场",
  "airportShortName": "栎社",
  "cityCode": "NGB",
  "cityName": "宁波",
  "cityNamePY": "ningbo",
  "municipalCity": "宁波",
  "hotCity": 2,
  "province": "浙江" },

{
  "keyID": 80,
  "cityID": 350802,
  "airportName": "武夷山机场",
  "airportShortName": "武夷山",
  "cityCode": "WUS",
  "cityName": "武夷山",
  "cityNamePY": "nanping",
  "municipalCity": "南平",
  "hotCity": 2,
  "province": "福建" },

{
  "keyID": 98,
  "cityID": 411300,
  "airportName": "南阳姜营机场",
  "airportShortName": "姜营",
  "cityCode": "NNY",
  "cityName": "南阳",
  "cityNamePY": "nanyang",
  "municipalCity": "南阳",
  "hotCity": 2,
  "province": "河南" },

{
  "keyID": 119,
  "cityID": 450100,
  "airportName": "南宁吴圩国际机场",
  "airportShortName": "吴圩",
  "cityCode": "NNG",
  "cityName": "南宁",
  "cityNamePY": "nanning",
  "municipalCity": "南宁",
  "hotCity": 2,
  "province": "广西" },

{
  "keyID": 138,
  "cityID": 511500,
  "airportName": "南充高坪机场",
  "airportShortName": "高坪",
  "cityCode": "NAO",
  "cityName": "南充",
  "cityNamePY": "nanchong",
  "municipalCity": "南充",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 139,
  "cityID": 511700,
  "airportName": "攀枝花保安营机场",
  "airportShortName": "保安营",
  "cityCode": "PZI",
  "cityName": "攀枝花",
  "cityNamePY": "panzhihua",
  "municipalCity": "攀枝花",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 159,
  "cityID": 531200,
  "airportName": "普洱思茅机场",
  "airportShortName": "思茅",
  "cityCode": "SYM",
  "cityName": "普洱",
  "cityNamePY": "puer",
  "municipalCity": "普洱",
  "hotCity": 2,
  "province": "云南" },

{
  "keyID": 6,
  "cityID": 130300,
  "airportName": "秦皇岛山海关机场",
  "airportShortName": "北戴河",
  "cityCode": "SHP",
  "cityName": "秦皇岛",
  "cityNamePY": "qinhuangdao",
  "municipalCity": "秦皇岛",
  "hotCity": 2,
  "province": "河北" },

{
  "keyID": 44,
  "cityID": 230200,
  "airportName": "齐齐哈尔三家子机场",
  "airportShortName": "三家子",
  "cityCode": "NDG",
  "cityName": "齐齐哈尔",
  "cityNamePY": "qiqihaer",
  "municipalCity": "齐齐哈尔",
  "hotCity": 2,
  "province": "黑龙江" },

{
  "keyID": 68,
  "cityID": 330800,
  "airportName": "衢州机场",
  "airportShortName": "衢州",
  "cityCode": "JUZ",
  "cityName": "衢州",
  "cityNamePY": "quzhou",
  "municipalCity": "衢州",
  "hotCity": 2,
  "province": "浙江" },

{
  "keyID": 78,
  "cityID": 350500,
  "airportName": "泉州晋江机场",
  "airportShortName": "晋江",
  "cityCode": "JJN",
  "cityName": "泉州",
  "cityNamePY": "quanzhou",
  "municipalCity": "泉州",
  "hotCity": 2,
  "province": "福建" },

{
  "keyID": 88,
  "cityID": 370200,
  "airportName": "青岛流亭国际机场",
  "airportShortName": "流亭",
  "cityCode": "TAO",
  "cityName": "青岛",
  "cityNamePY": "qingdao",
  "municipalCity": "青岛",
  "hotCity": 1,
  "province": "山东" },

{
  "keyID": 127,
  "cityID": 500100,
  "airportName": "黔江武陵山机场",
  "airportShortName": "武陵山",
  "cityCode": "JIQ",
  "cityName": "黔江",
  "cityNamePY": "qianjiang",
  "municipalCity": "重庆",
  "hotCity": 2,
  "province": "重庆" },

{
  "keyID": 145,
  "cityID": 520500,
  "airportName": "凯里黄平机场",
  "airportShortName": "黄平",
  "cityCode": "KJH",
  "cityName": "黔东南",
  "cityNamePY": "qiandongnan",
  "municipalCity": "黔东南",
  "hotCity": 2,
  "province": "贵州" },

{
  "keyID": 147,
  "cityID": 520600,
  "airportName": "荔波机场",
  "airportShortName": "荔波",
  "cityCode": "LLB",
  "cityName": "黔南",
  "cityNamePY": "qiannan",
  "municipalCity": "黔南",
  "hotCity": 2,
  "province": "贵州" },

{
  "keyID": 148,
  "cityID": 520700,
  "airportName": "兴义机场",
  "airportShortName": "兴义",
  "cityCode": "ACX",
  "cityName": "黔西南",
  "cityNamePY": "qianxinan",
  "municipalCity": "黔西南",
  "hotCity": 2,
  "province": "贵州" },

{
  "keyID": 178,
  "cityID": 621000,
  "airportName": "庆阳机场",
  "airportShortName": "庆阳",
  "cityCode": "IQN",
  "cityName": "庆阳",
  "cityNamePY": "qingyang",
  "municipalCity": "庆阳",
  "hotCity": 2,
  "province": "甘肃" },

{
  "keyID": 192,
  "cityID": 652807,
  "airportName": "且末机场",
  "airportShortName": "且末",
  "cityCode": "IQM",
  "cityName": "且末",
  "cityNamePY": "qiemo",
  "municipalCity": "巴音郭楞",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 94,
  "cityID": 371100,
  "airportName": "山字河机场",
  "airportShortName": "山字河",
  "cityCode": "RIZ",
  "cityName": "日照",
  "cityNamePY": "rizhao",
  "municipalCity": "日照",
  "hotCity": 2,
  "province": "山东" },

{
  "keyID": 167,
  "cityID": 540600,
  "airportName": "日喀则和平机场",
  "airportShortName": "和平",
  "cityCode": "RKZ",
  "cityName": "日喀则",
  "cityNamePY": "rikaze",
  "municipalCity": "日喀则",
  "hotCity": 2,
  "province": "西藏" },

{
  "keyID": 4,
  "cityID": 130100,
  "airportName": "石家庄正定国际机场",
  "airportShortName": "正定",
  "cityCode": "SJW",
  "cityName": "石家庄",
  "cityNamePY": "shijiazhuang",
  "municipalCity": "石家庄",
  "hotCity": 2,
  "province": "河北" },

{
  "keyID": 32,
  "cityID": 210100,
  "airportName": "沈阳桃仙国际机场",
  "airportShortName": "桃仙",
  "cityCode": "SHE",
  "cityName": "沈阳",
  "cityNamePY": "shenyang",
  "municipalCity": "沈阳",
  "hotCity": 2,
  "province": "辽宁" },

{
  "keyID": 53,
  "cityID": 310100,
  "airportName": "上海浦东国际机场",
  "airportShortName": "浦东",
  "cityCode": "PVG",
  "cityName": "上海",
  "cityNamePY": "shanghai",
  "municipalCity": "上海",
  "hotCity": 1,
  "province": "上海" },

{
  "keyID": 54,
  "cityID": 310100,
  "airportName": "上海虹桥国际机场",
  "airportShortName": "虹桥",
  "cityCode": "SHA",
  "cityName": "上海",
  "cityNamePY": "shanghai",
  "municipalCity": "上海",
  "hotCity": 1,
  "province": "上海" },

{
  "keyID": 109,
  "cityID": 440200,
  "airportName": "韶关桂头机场",
  "airportShortName": "桂头",
  "cityCode": "HSC",
  "cityName": "韶关",
  "cityNamePY": "shaoguan",
  "municipalCity": "韶关",
  "hotCity": 2,
  "province": "广东" },

{
  "keyID": 110,
  "cityID": 440300,
  "airportName": "深圳宝安国际机场",
  "airportShortName": "宝安",
  "cityCode": "SZX",
  "cityName": "深圳",
  "cityNamePY": "shenchou",
  "municipalCity": "深圳",
  "hotCity": 2,
  "province": "广东" },

{
  "keyID": 121,
  "cityID": 450200,
  "airportName": "三亚凤凰国际机场",
  "airportShortName": "凤凰",
  "cityCode": "SYX",
  "cityName": "三亚",
  "cityNamePY": "sanya",
  "municipalCity": "三亚",
  "hotCity": 1,
  "province": "海南" },

{
  "keyID": 140,
  "cityID": 511800,
  "airportName": "遂宁机场",
  "airportShortName": "遂宁",
  "cityCode": "SUN",
  "cityName": "遂宁",
  "cityNamePY": "suining",
  "municipalCity": "遂宁",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 205,
  "cityID": 420300,
  "airportName": "十堰武当山机场",
  "airportShortName": "武当山",
  "cityCode": "WDS",
  "cityName": "十堰",
  "cityNamePY": "shiyan",
  "municipalCity": "十堰",
  "hotCity": 2,
  "province": "湖北" },

{
  "keyID": 3,
  "cityID": 120100,
  "airportName": "天津滨海国际机场",
  "airportShortName": "滨海",
  "cityCode": "TSN",
  "cityName": "天津",
  "cityNamePY": "tianjin",
  "municipalCity": "天津",
  "hotCity": 1,
  "province": "天津" },

{
  "keyID": 5,
  "cityID": 130200,
  "airportName": "唐山三女河机场",
  "airportShortName": "三女河",
  "cityCode": "TVS",
  "cityName": "唐山",
  "cityNamePY": "tangshan",
  "municipalCity": "唐山",
  "hotCity": 2,
  "province": "河北" },

{
  "keyID": 10,
  "cityID": 140100,
  "airportName": "太原武宿国际机场",
  "airportShortName": "武宿",
  "cityCode": "TYN",
  "cityName": "太原",
  "cityNamePY": "taiyuan",
  "municipalCity": "太原",
  "hotCity": 2,
  "province": "山西" },

{
  "keyID": 19,
  "cityID": 150500,
  "airportName": "通辽机场",
  "airportShortName": "通辽",
  "cityCode": "TGO",
  "cityName": "通辽",
  "cityNamePY": "tongliao",
  "municipalCity": "通辽",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 40,
  "cityID": 220500,
  "airportName": "通化三源浦机场",
  "airportShortName": "三源浦",
  "cityCode": "TNH",
  "cityName": "通化",
  "cityNamePY": "tonghua",
  "municipalCity": "通化",
  "hotCity": 2,
  "province": "吉林" },

{
  "keyID": 70,
  "cityID": 331000,
  "airportName": "台州路桥机场",
  "airportShortName": "路桥",
  "cityCode": "HYN",
  "cityName": "台州",
  "cityNamePY": "taizhou",
  "municipalCity": "台州",
  "hotCity": 2,
  "province": "浙江" },

{
  "keyID": 149,
  "cityID": 520800,
  "airportName": "铜仁凤凰机场",
  "airportShortName": "凤凰",
  "cityCode": "TEN",
  "cityName": "铜仁",
  "cityNamePY": "tongren",
  "municipalCity": "铜仁",
  "hotCity": 2,
  "province": "贵州" },

{
  "keyID": 153,
  "cityID": 530201,
  "airportName": "腾冲驼峰机场",
  "airportShortName": "驼峰",
  "cityCode": "TCZ",
  "cityName": "腾冲",
  "cityNamePY": "tengchong",
  "municipalCity": "保山",
  "hotCity": 2,
  "province": "云南" },

{
  "keyID": 176,
  "cityID": 620500,
  "airportName": "天水麦积山机场",
  "airportShortName": "麦积山",
  "cityCode": "THQ",
  "cityName": "天水",
  "cityNamePY": "tianshui",
  "municipalCity": "天水",
  "hotCity": 2,
  "province": "甘肃" },

{
  "keyID": 189,
  "cityID": 652100,
  "airportName": "吐鲁番交河机场",
  "airportShortName": "交河",
  "cityCode": "TLQ",
  "cityName": "吐鲁番",
  "cityNamePY": "tulufan",
  "municipalCity": "吐鲁番",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 199,
  "cityID": 654200,
  "airportName": "塔城机场",
  "airportShortName": "塔城",
  "cityCode": "TCG",
  "cityName": "塔城",
  "cityNamePY": "tacheng",
  "municipalCity": "塔城",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 24,
  "cityID": 151003,
  "airportName": "乌兰浩特机场",
  "airportShortName": "乌兰浩特",
  "cityCode": "HLH",
  "cityName": "乌兰浩特",
  "cityNamePY": "wulanhaote",
  "municipalCity": "兴安盟",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 31,
  "cityID": 160100,
  "airportName": "乌海机场",
  "airportShortName": "乌海",
  "cityCode": "WUA",
  "cityName": "乌海",
  "cityNamePY": "wuhai",
  "municipalCity": "乌海",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 57,
  "cityID": 320320,
  "airportName": "苏南硕放国际机场",
  "airportShortName": "苏南硕放",
  "cityCode": "WUX",
  "cityName": "无锡",
  "cityNamePY": "wuxi",
  "municipalCity": "无锡",
  "hotCity": 2,
  "province": "江苏" },

{
  "keyID": 66,
  "cityID": 330300,
  "airportName": "温州龙湾国际机场",
  "airportShortName": "龙湾",
  "cityCode": "WNZ",
  "cityName": "温州",
  "cityNamePY": "wenzhou",
  "municipalCity": "温州",
  "hotCity": 2,
  "province": "浙江" },

{
  "keyID": 91,
  "cityID": 370700,
  "airportName": "潍坊机场",
  "airportShortName": "潍坊",
  "cityCode": "WEF",
  "cityName": "潍坊",
  "cityNamePY": "weifang",
  "municipalCity": "潍坊",
  "hotCity": 2,
  "province": "山东" },

{
  "keyID": 93,
  "cityID": 371000,
  "airportName": "威海国际机场",
  "airportShortName": "威海",
  "cityCode": "WEH",
  "cityName": "威海",
  "cityNamePY": "weihai",
  "municipalCity": "威海",
  "hotCity": 2,
  "province": "山东" },

{
  "keyID": 99,
  "cityID": 420100,
  "airportName": "武汉天河国际机场",
  "airportShortName": "天河",
  "cityCode": "WUH",
  "cityName": "武汉",
  "cityNamePY": "wuhan",
  "municipalCity": "武汉",
  "hotCity": 1,
  "province": "湖北" },

{
  "keyID": 123,
  "cityID": 450400,
  "airportName": "梧州长洲岛机场",
  "airportShortName": "长洲岛",
  "cityCode": "WUZ",
  "cityName": "梧州",
  "cityNamePY": "wuzhou",
  "municipalCity": "梧州",
  "hotCity": 2,
  "province": "广西" },

{
  "keyID": 128,
  "cityID": 500100,
  "airportName": "万州五桥机场",
  "airportShortName": "万州",
  "cityCode": "WXN",
  "cityName": "万州",
  "cityNamePY": "wanzhou",
  "municipalCity": "重庆",
  "hotCity": 2,
  "province": "重庆" },

{
  "keyID": 160,
  "cityID": 531400,
  "airportName": "文山普者黑机场",
  "airportShortName": "普者黑",
  "cityCode": "WNH",
  "cityName": "文山",
  "cityNamePY": "wenshan",
  "municipalCity": "文山",
  "hotCity": 2,
  "province": "云南" },

{
  "keyID": 187,
  "cityID": 650100,
  "airportName": "乌鲁木齐地窝堡国际机场",
  "airportShortName": "地窝堡",
  "cityCode": "URC",
  "cityName": "乌鲁木齐",
  "cityNamePY": "wulumuqi",
  "municipalCity": "乌鲁木齐",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 8,
  "cityID": 130500,
  "airportName": "邢台褡裢机场",
  "airportShortName": "褡裢",
  "cityCode": "XNT",
  "cityName": "邢台",
  "cityNamePY": "xingtai",
  "municipalCity": "邢台",
  "hotCity": 2,
  "province": "河北" },

{
  "keyID": 26,
  "cityID": 151101,
  "airportName": "锡林浩特机场",
  "airportShortName": "锡林浩特",
  "cityCode": "XIL",
  "cityName": "锡林浩特",
  "cityNamePY": "xilinhaote",
  "municipalCity": "锡林郭勒盟",
  "hotCity": 2,
  "province": "内蒙古" },

{
  "keyID": 56,
  "cityID": 320300,
  "airportName": "徐州观音机场",
  "airportShortName": "观音",
  "cityCode": "XUZ",
  "cityName": "徐州",
  "cityNamePY": "xuzhou",
  "municipalCity": "徐州",
  "hotCity": 2,
  "province": "江苏" },

{
  "keyID": 77,
  "cityID": 350200,
  "airportName": "厦门高崎国际机场",
  "airportShortName": "高崎",
  "cityCode": "XMN",
  "cityName": "厦门",
  "cityNamePY": "xiamen",
  "municipalCity": "厦门",
  "hotCity": 1,
  "province": "福建" },

{
  "keyID": 101,
  "cityID": 420600,
  "airportName": "襄阳刘集机场",
  "airportShortName": "刘集",
  "cityCode": "XFN",
  "cityName": "襄阳",
  "cityNamePY": "xiangyang",
  "municipalCity": "襄阳",
  "hotCity": 2,
  "province": "湖北" },

{
  "keyID": 136,
  "cityID": 511204,
  "airportName": "西昌青山机场",
  "airportShortName": "青山",
  "cityCode": "XIC",
  "cityName": "西昌",
  "cityNamePY": "xichang",
  "municipalCity": "凉山",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 161,
  "cityID": 531500,
  "airportName": "西双版纳嘎洒国际机场",
  "airportShortName": "嘎洒",
  "cityCode": "JHG",
  "cityName": "西双版纳",
  "cityNamePY": "xishuangbanna",
  "municipalCity": "西双版纳",
  "hotCity": 2,
  "province": "云南" },

{
  "keyID": 168,
  "cityID": 610100,
  "airportName": "西安咸阳国际机场",
  "airportShortName": "咸阳",
  "cityCode": "XIY",
  "cityName": "西安",
  "cityNamePY": "xian",
  "municipalCity": "西安",
  "hotCity": 1,
  "province": "陕西" },

{
  "keyID": 181,
  "cityID": 630100,
  "airportName": "西宁曹家堡机场",
  "airportShortName": "曹家堡",
  "cityCode": "XNN",
  "cityName": "西宁",
  "cityNamePY": "xining",
  "municipalCity": "西宁",
  "hotCity": 2,
  "province": "青海" },

{
  "keyID": 198,
  "cityID": 654006,
  "airportName": "新源那拉提机场",
  "airportShortName": "那拉提",
  "cityCode": "NLT",
  "cityName": "新源",
  "cityNamePY": "xinyuan",
  "municipalCity": "伊犁",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 13,
  "cityID": 140800,
  "airportName": "运城机场",
  "airportShortName": "运城",
  "cityCode": "YCU",
  "cityName": "运城",
  "cityNamePY": "yuncheng",
  "municipalCity": "运城",
  "hotCity": 2,
  "province": "山西" },

{
  "keyID": 42,
  "cityID": 220900,
  "airportName": "延吉朝阳川机场",
  "airportShortName": "朝阳川",
  "cityCode": "YNJ",
  "cityName": "延边",
  "cityNamePY": "yanbian",
  "municipalCity": "延边",
  "hotCity": 2,
  "province": "吉林" },

{
  "keyID": 47,
  "cityID": 230700,
  "airportName": "伊春林都机场",
  "airportShortName": "明月山",
  "cityCode": "LDS",
  "cityName": "伊春",
  "cityNamePY": "yichun",
  "municipalCity": "伊春",
  "hotCity": 2,
  "province": "黑龙江" },

{
  "keyID": 62,
  "cityID": 320900,
  "airportName": "盐城南洋机场",
  "airportShortName": "南洋",
  "cityCode": "YNZ",
  "cityName": "盐城",
  "cityNamePY": "yancheng",
  "municipalCity": "盐城",
  "hotCity": 2,
  "province": "江苏" },

{
  "keyID": 63,
  "cityID": 321000,
  "airportName": "扬州泰州机场",
  "airportShortName": "泰州",
  "cityCode": "YTY",
  "cityName": "扬州",
  "cityNamePY": "yangzhou",
  "municipalCity": "扬州",
  "hotCity": 2,
  "province": "江苏" },

{
  "keyID": 86,
  "cityID": 360900,
  "airportName": "宜春明月山机场",
  "airportShortName": "林都",
  "cityCode": "YIC",
  "cityName": "宜春",
  "cityNamePY": "yichun",
  "municipalCity": "宜春",
  "hotCity": 2,
  "province": "江西" },

{
  "keyID": 90,
  "cityID": 370600,
  "airportName": "烟台莱山国际机场",
  "airportShortName": "蓬莱",
  "cityCode": "YNT",
  "cityName": "烟台",
  "cityNamePY": "yantai",
  "municipalCity": "烟台",
  "hotCity": 2,
  "province": "山东" },

{
  "keyID": 100,
  "cityID": 420500,
  "airportName": "宜昌三峡机场",
  "airportShortName": "三峡",
  "cityCode": "YIH",
  "cityName": "宜昌",
  "cityNamePY": "yichang",
  "municipalCity": "宜昌",
  "hotCity": 2,
  "province": "湖北" },

{
  "keyID": 106,
  "cityID": 431100,
  "airportName": "永州零陵机场",
  "airportShortName": "零陵",
  "cityCode": "LLF",
  "cityName": "永州",
  "cityNamePY": "yongzhou",
  "municipalCity": "永州",
  "hotCity": 2,
  "province": "湖南" },

{
  "keyID": 141,
  "cityID": 512000,
  "airportName": "宜宾菜坝机场",
  "airportShortName": "菜坝",
  "cityCode": "YBP",
  "cityName": "宜宾",
  "cityNamePY": "yibin",
  "municipalCity": "宜宾",
  "hotCity": 2,
  "province": "四川" },

{
  "keyID": 169,
  "cityID": 610600,
  "airportName": "延安二十里堡机场",
  "airportShortName": "二十里堡",
  "cityCode": "ENY",
  "cityName": "延安",
  "cityNamePY": "yanan",
  "municipalCity": "延安",
  "hotCity": 2,
  "province": "陕西" },

{
  "keyID": 171,
  "cityID": 610800,
  "airportName": "榆林榆阳机场",
  "airportShortName": "榆阳",
  "cityCode": "UYN",
  "cityName": "榆林",
  "cityNamePY": "yulin",
  "municipalCity": "榆林",
  "hotCity": 2,
  "province": "陕西" },

{
  "keyID": 182,
  "cityID": 632700,
  "airportName": "玉树巴塘机场",
  "airportShortName": "巴塘",
  "cityCode": "YUS",
  "cityName": "玉树",
  "cityNamePY": "yushu",
  "municipalCity": "玉树",
  "hotCity": 2,
  "province": "青海" },

{
  "keyID": 184,
  "cityID": 640100,
  "airportName": "银川河东国际机场",
  "airportShortName": "河东",
  "cityCode": "INC",
  "cityName": "银川",
  "cityNamePY": "yinchuan",
  "municipalCity": "银川",
  "hotCity": 2,
  "province": "宁夏" },

{
  "keyID": 197,
  "cityID": 654010,
  "airportName": "伊宁机场",
  "airportShortName": "伊宁",
  "cityCode": "YIN",
  "cityName": "伊宁市",
  "cityNamePY": "yiningshi",
  "municipalCity": "伊犁",
  "hotCity": 2,
  "province": "新疆" },

{
  "keyID": 9,
  "cityID": 130700,
  "airportName": "张家口宁远机场",
  "airportShortName": "宁远",
  "cityCode": "ZQZ",
  "cityName": "张家口",
  "cityNamePY": "zhangjiakou",
  "municipalCity": "张家口",
  "hotCity": 2,
  "province": "河北" },

{
  "keyID": 69,
  "cityID": 330900,
  "airportName": "舟山普陀山机场",
  "airportShortName": "普陀山",
  "cityCode": "HSN",
  "cityName": "舟山",
  "cityNamePY": "zhoushan",
  "municipalCity": "舟山",
  "hotCity": 2,
  "province": "浙江" },

{
  "keyID": 96,
  "cityID": 410100,
  "airportName": "郑州新郑国际机场",
  "airportShortName": "新郑",
  "cityCode": "CGO",
  "cityName": "郑州",
  "cityNamePY": "zhengzhou",
  "municipalCity": "郑州",
  "hotCity": 1,
  "province": "河南" },

{
  "keyID": 105,
  "cityID": 430800,
  "airportName": "张家界荷花国际机场",
  "airportShortName": "荷花",
  "cityCode": "DYG",
  "cityName": "张家界",
  "cityNamePY": "zhangjiajie",
  "municipalCity": "张家界",
  "hotCity": 2,
  "province": "湖南" },

{
  "keyID": 111,
  "cityID": 440400,
  "airportName": "珠海金湾机场",
  "airportShortName": "金湾",
  "cityCode": "ZUH",
  "cityName": "珠海",
  "cityNamePY": "zhuhai",
  "municipalCity": "珠海",
  "hotCity": 2,
  "province": "广东" },

{
  "keyID": 113,
  "cityID": 440800,
  "airportName": "湛江机场",
  "airportShortName": "湛江",
  "cityCode": "ZHA",
  "cityName": "湛江",
  "cityNamePY": "zhanjiang",
  "municipalCity": "湛江",
  "hotCity": 2,
  "province": "广东" },

{
  "keyID": 150,
  "cityID": 520900,
  "airportName": "遵义新舟机场",
  "airportShortName": "新舟",
  "cityCode": "ZYI",
  "cityName": "遵义",
  "cityNamePY": "zunyi",
  "municipalCity": "遵义",
  "hotCity": 2,
  "province": "贵州" },

{
  "keyID": 162,
  "cityID": 531700,
  "airportName": "昭通机场",
  "airportShortName": "昭通",
  "cityCode": "ZAT",
  "cityName": "昭通",
  "cityNamePY": "zhaotong",
  "municipalCity": "昭通",
  "hotCity": 2,
  "province": "云南" },

{
  "keyID": 177,
  "cityID": 620700,
  "airportName": "张掖甘州机场",
  "airportShortName": "甘州",
  "cityCode": "YZY",
  "cityName": "张掖",
  "cityNamePY": "zhangye",
  "municipalCity": "张掖",
  "hotCity": 2,
  "province": "甘肃" },

{
  "keyID": 186,
  "cityID": 640500,
  "airportName": "中卫沙坡头机场",
  "airportShortName": "沙坡头",
  "cityCode": "ZHY",
  "cityName": "中卫",
  "cityNamePY": "zhongwei",
  "municipalCity": "中卫",
  "hotCity": 2,
  "province": "宁夏" }];exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map