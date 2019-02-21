/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/Demo.js":
/*!**************************!*\
  !*** ./examples/Demo.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _DemoList = _interopRequireDefault(__webpack_require__(/*! ./DemoList */ "./examples/DemoList.js"));

var Demo =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Demo, _Component);

  function Demo() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Demo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Demo)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      current: _DemoList.default[0]
    });
    return _this;
  }

  (0, _createClass2.default)(Demo, [{
    key: "onDemoChange",
    value: function onDemoChange(item, e) {
      this.setState({
        current: item
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var current = this.state.current;
      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "slider"
      }, _DemoList.default.map(function (item, i) {
        return _react.default.createElement("div", {
          className: current === item ? 'active' : '',
          onClick: _this2.onDemoChange.bind(_this2, item)
        }, item.label);
      })), _react.default.createElement("div", {
        className: "content"
      }, current ? _react.default.createElement(current.component, null) : null));
    }
  }]);
  return Demo;
}(_react.Component);

exports.default = Demo;

/***/ }),

/***/ "./examples/DemoList.js":
/*!******************************!*\
  !*** ./examples/DemoList.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _demo = _interopRequireDefault(__webpack_require__(/*! ./demos/demo1 */ "./examples/demos/demo1.js"));

// import Demo2 from './demos/Demo2';
// import Demo3 from './demos/Demo3';
// import Demo4 from './demos/Demo4';
var _default = [{
  label: '基本功能',
  component: _demo.default
}];
exports.default = _default;

/***/ }),

/***/ "./examples/demos/demo1.js":
/*!*********************************!*\
  !*** ./examples/demos/demo1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _src = _interopRequireWildcard(__webpack_require__(/*! ../../src */ "./src/index.js"));

function Test() {
  console.log(1);
  return null;
}

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DEMO);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DEMO)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      value: '1'
    });
    return _this;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(_src.default, {
        onChange: function onChange(v) {
          return console.log(v);
        },
        defaultValue: this.state.value
      }, _react.default.createElement(_src.Option, {
        value: "1"
      }, "\u6D4B\u8BD51"), _react.default.createElement(_src.Option, {
        value: "2"
      }, "\u6D4B\u8BD52"), _react.default.createElement(_src.Option, {
        value: "3"
      }, "\u6D4B\u8BD53"), _react.default.createElement(_src.Option, {
        value: "4"
      }, "\u6D4B\u8BD54"), _react.default.createElement(_src.Option, {
        value: "5"
      }, "\u6D4B\u8BD55"), _react.default.createElement(_src.OptGroup, {
        label: "\u5206\u7EC41"
      }, _react.default.createElement(_src.Option, {
        value: "6"
      }, "\u6D4B\u8BD5\u6D4B\u8BD5\u6D4B\u8BD56"), _react.default.createElement(_src.Option, {
        value: "7"
      }, "\u6D4B\u8BD57"))), _react.default.createElement(_src.default, {
        onChange: function onChange(v) {
          return console.log(v);
        },
        defaultValue: this.state.value,
        showArrow: false
      }, _react.default.createElement(_src.Option, {
        value: "1"
      }, "\u6D4B\u8BD51"), _react.default.createElement(_src.Option, {
        value: "2"
      }, "\u6D4B\u8BD52"), _react.default.createElement(_src.Option, {
        value: "3"
      }, "\u6D4B\u8BD53"), _react.default.createElement(_src.Option, {
        value: "4"
      }, "\u6D4B\u8BD54"), _react.default.createElement(_src.Option, {
        value: "5"
      }, "\u6D4B\u8BD55"), _react.default.createElement(_src.OptGroup, {
        label: "\u5206\u7EC41"
      }, _react.default.createElement(_src.Option, {
        value: "6"
      }, "\u6D4B\u8BD5\u6D4B\u8BD5\u6D4B\u8BD56"), _react.default.createElement(_src.Option, {
        value: "7"
      }, "\u6D4B\u8BD57"))), _react.default.createElement("span", null, "test..."));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/index.js":
/*!***************************!*\
  !*** ./examples/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

__webpack_require__(/*! ./style/index.scss */ "./examples/style/index.scss");

__webpack_require__(/*! ./style/animate.scss */ "./examples/style/animate.scss");

__webpack_require__(/*! react-widget-listbox/lib/style/index.css */ "./node_modules/react-widget-listbox/lib/style/index.css");

__webpack_require__(/*! react-widget-popup/lib/style/index.css */ "./node_modules/react-widget-popup/lib/style/index.css");

__webpack_require__(/*! react-widget-trigger/lib/style/index.css */ "./node_modules/react-widget-trigger/lib/style/index.css");

__webpack_require__(/*! ../src/style/index.scss */ "./src/style/index.scss");

var _Demo = _interopRequireDefault(__webpack_require__(/*! ./Demo */ "./examples/Demo.js"));

_reactDom.default.render(_react.default.createElement(_Demo.default, null), demo);

/***/ }),

/***/ "./examples/style/animate.scss":
/*!*************************************!*\
  !*** ./examples/style/animate.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./examples/style/index.scss":
/*!***********************************!*\
  !*** ./examples/style/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/OptGroup.js":
/*!*************************!*\
  !*** ./src/OptGroup.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var Option = function Option() {
  (0, _classCallCheck2.default)(this, Option);
};

exports.default = Option;
(0, _defineProperty2.default)(Option, "isOptOption", true);

/***/ }),

/***/ "./src/Option.js":
/*!***********************!*\
  !*** ./src/Option.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var Option = function Option() {
  (0, _classCallCheck2.default)(this, Option);
};

exports.default = Option;
(0, _defineProperty2.default)(Option, "isOption", true);

/***/ }),

/***/ "./src/Select.js":
/*!***********************!*\
  !*** ./src/Select.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/extends */ "./node_modules/@babel/runtime-corejs2/helpers/extends.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime-corejs2/helpers/objectWithoutProperties.js"));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/objectSpread.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _omit = _interopRequireDefault(__webpack_require__(/*! omit.js */ "./node_modules/omit.js/es/index.js"));

var _objectAssign = _interopRequireDefault(__webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js"));

var _reactWidgetPopup = _interopRequireDefault(__webpack_require__(/*! react-widget-popup */ "./node_modules/react-widget-popup/index.js"));

var _reactWidgetListbox = _interopRequireWildcard(__webpack_require__(/*! react-widget-listbox */ "./node_modules/react-widget-listbox/index.js"));

var _reactWidgetPortal = _interopRequireDefault(__webpack_require__(/*! react-widget-portal */ "./node_modules/react-widget-portal/index.js"));

var _events = __webpack_require__(/*! bplokjs-dom-utils/events */ "./node_modules/bplokjs-dom-utils/events/index.js");

var _contains = _interopRequireDefault(__webpack_require__(/*! bplokjs-dom-utils/contains */ "./node_modules/bplokjs-dom-utils/contains.js"));

var _bplokjsDeferred = _interopRequireDefault(__webpack_require__(/*! bplokjs-deferred */ "./node_modules/bplokjs-deferred/index.js"));

var _bplokjsPlacement = _interopRequireDefault(__webpack_require__(/*! bplokjs-placement */ "./node_modules/bplokjs-placement/index.js"));

var _reactWidgetTrigger = _interopRequireDefault(__webpack_require__(/*! react-widget-trigger */ "./node_modules/react-widget-trigger/index.js"));

var _util = __webpack_require__(/*! ./util */ "./src/util.js");

//import {omit, assign} from 'lodash';
var KEY_DOWN_CODE = 40;
var KEY_ESC_CODE = 27;

var Select =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Select, _React$Component);

  function Select(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, Select);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Select).call(this, _props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDropdownCreate", function (el) {
      _this._refs.listbox = el;
      _this._refs.dropdown = el ? (0, _reactDom.findDOMNode)(el) : null;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleListItemClick", function (_ref) {
      var value = _ref.value;
      var props = _this.props;
      var state = _this.state;
      var newState = {
        popupVisible: false
      };

      if (!(0, _util.isEqual)(state.value, value)) {
        if (!('value' in props)) {
          newState.value = value;

          _this.setState({
            value: value
          });
        }

        if (props.onChange) props.onChange(_this.transformChangeValue(value));
      }

      _this.setState(newState);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDropdownShow", function () {
      setTimeout(function () {
        return _this._refs.listbox.focus();
      }, 0);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onKeyDown", function (e) {
      var popupVisible = _this.state.popupVisible;
      console.log(e.keyCode);

      if (e.keyCode === KEY_DOWN_CODE && !popupVisible) {
        _this.setState({
          popupVisible: true
        });
      }

      if (e.keyCode === KEY_ESC_CODE && popupVisible) {
        _this.setState({
          popupVisible: false
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "saveSelectRef", function (node) {
      _this._select = node;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onPopupVisibleChange", function (visible) {
      _this.setState({
        popupVisible: visible
      });
    });
    _this._refs = {};
    _this.state = {
      placement: (0, _bplokjsDeferred.default)(),
      value: _props.value || _props.defaultValue,
      showDropdown: _props.defaultOpen,
      optionsMap: {},
      popupVisible: _props.defaultOpen
    };

    _this.updateOptionsMap(_props);

    return _this;
  }

  (0, _createClass2.default)(Select, [{
    key: "componentDidMount",
    // componentWillReceiveProps(props) {
    //     this.updateOptionsMap(props);
    //     if (!isUndefined(props.value)) {
    //         this.setState({
    //             value: props.value
    //         });
    //     }
    // }
    value: function componentDidMount() {
      var placement = this.state.placement;
      placement.resolve((0, _objectSpread2.default)({
        of: this.getSelectDOM()
      }, (0, _bplokjsPlacement.default)('bottomLeft', [0, 1])));
    }
  }, {
    key: "componentDidUpdate2",
    value: function componentDidUpdate2() {
      this.updatePopupPosition();
    }
  }, {
    key: "componentWillUnmount2",
    value: function componentWillUnmount2() {
      if (this.__resizeHandle) {
        (0, _events.off)(window, 'resize', this.__resizeHandle);
      }

      if (this.__mousedownHandle) {
        (0, _events.off)(document, 'mousedown', this.__mousedownHandle);
      }
    }
  }, {
    key: "updateOptionsMap",
    value: function updateOptionsMap(props) {
      var options = props.options,
          children = props.children,
          valueField = props.valueField,
          labelField = props.labelField,
          optionsField = props.optionsField;
      var maps = {};

      function parseOptions(list) {
        list.forEach(function (option) {
          if (option[optionsField]) {
            parseOptions(option[optionsField]);
          } else {
            maps[option[valueField]] = option;
          }
        });
      }

      function parseChildren(childs) {
        _react.default.Children.map(childs, function (child) {
          var props = child.props;

          if (child.type.isOptOption) {
            parseChildren(props.children);
          } else {
            maps[props[valueField]] = (0, _objectAssign.default)((0, _omit.default)(props, ['children']), (0, _defineProperty2.default)({}, labelField, props.children));
          }
        });
      }

      if (options && options.length) {
        parseOptions(options);
      } else {
        parseChildren(children);
      }

      this.state.optionsMap = maps;
    }
  }, {
    key: "getSelectText",
    value: function getSelectText() {
      var _this$props = this.props,
          options = _this$props.options,
          valueField = _this$props.valueField,
          labelField = _this$props.labelField;
      var value = this.state.value;
      var ret = this.state.optionsMap[value];
      return ret ? ret[labelField] : value;
    }
  }, {
    key: "transformChangeValue",
    value: function transformChangeValue(value) {
      var labelInValue = this.props.labelInValue;
      var optionsMap = this.state.optionsMap;

      if (labelInValue) {
        return (0, _util.isArray)(value) ? value.map(function (v) {
          return optionsMap[v];
        }) : optionsMap[value];
      }

      return value;
    }
  }, {
    key: "renderDropdownList",
    value: function renderDropdownList() {
      var _this$props2 = this.props,
          valueField = _this$props2.valueField,
          labelField = _this$props2.labelField,
          optionsField = _this$props2.optionsField,
          options = _this$props2.options,
          children = _this$props2.children;
      var value = this.state.value;
      return _react.default.createElement(_reactWidgetListbox.default, {
        ref: this.handleDropdownCreate,
        valueField: valueField,
        labelField: labelField,
        itemsField: optionsField,
        value: value,
        items: options,
        children: this.renderSelectChild(children),
        onItemClick: this.handleListItemClick
      });
    }
  }, {
    key: "renderSelectChild",
    value: function renderSelectChild(children) {
      var _this2 = this;

      var _this$props3 = this.props,
          labelField = _this$props3.labelField,
          valueField = _this$props3.valueField;
      return _react.default.Children.map(children, function (child) {
        var props = child.props;

        if (child.type.isOptOption) {
          return _react.default.createElement(_reactWidgetListbox.ListItemGroup, {
            label: props[labelField]
          }, _this2.renderSelectChild(props.children));
        }

        return _react.default.createElement(_reactWidgetListbox.ListItem, props);
      });
    }
  }, {
    key: "getPopupStyle",
    value: function getPopupStyle() {
      var showDropdown = this.state.showDropdown;
      var selectEl = this._refs.select;
      var dropdownStyle = {
        maxWidth: 0,
        maxHeight: 0
      };

      if (showDropdown && selectEl) {
        var rect = selectEl.getBoundingClientRect();
        dropdownStyle.minWidth = selectEl.offsetWidth;
        dropdownStyle.maxWidth = selectEl.offsetWidth + rect.right - 10;
        dropdownStyle.maxHeight = Math.max(rect.top, window.innerHeight - rect.top - selectEl.offsetHeight) - 10;
      }

      return (0, _objectAssign.default)(dropdownStyle, this.props.dropdownStyle);
    }
  }, {
    key: "updatePopupPosition",
    value: function updatePopupPosition() {
      if (this.state.showDropdown) {
        this._refs.popup.updatePosition((0, _reactDom.findDOMNode)(this));
      }
    }
  }, {
    key: "getSelectDOM",
    value: function getSelectDOM() {
      return (0, _reactDom.findDOMNode)(this._select);
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames, _classNames2;

      var props = this.props;
      var _this$state = this.state,
          showDropdown = _this$state.showDropdown,
          placement = _this$state.placement,
          popupVisible = _this$state.popupVisible;
      var prefixCls = props.prefixCls,
          tabIndex = props.tabIndex,
          inline = props.inline,
          disabled = props.disabled,
          readOnly = props.readOnly,
          arrowCls = props.arrowCls,
          children = props.children,
          options = props.options,
          dropdownCls = props.dropdownCls,
          dropdownDestroyOnHide = props.dropdownDestroyOnHide,
          showArrow = props.showArrow,
          defaultOpen = props.defaultOpen,
          others = (0, _objectWithoutProperties2.default)(props, ["prefixCls", "tabIndex", "inline", "disabled", "readOnly", "arrowCls", "children", "options", "dropdownCls", "dropdownDestroyOnHide", "showArrow", "defaultOpen"]);
      var classes = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, prefixCls, true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-inline"), inline), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-readonly"), readOnly), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-disabled"), disabled), _classNames));
      var otherProps = (0, _omit.default)(others, ['value', 'valueField', 'dropdownCls', 'dropdownStyle', 'dropdownDestroyOnHide', 'labelField', 'optionsField', 'labelInValue']); // <Popup
      //     ref={(el) => this._refs.popup = el}
      //     visible={showDropdown}
      //     className={dropdownCls}
      //     destroyOnHide={dropdownDestroyOnHide}
      //     fixed={false}
      //     rootCls={`${prefixCls}-dropdown-root`}
      //     of={null}
      //     my="left top"
      //     at="left bottom"
      //     style={this.getPopupStyle()}
      //     onShow={this.handleDropdownShow}
      // >
      //     {this.getSelectOptions()}
      // </Popup>

      return _react.default.createElement(_reactWidgetTrigger.default, {
        popupVisible: popupVisible,
        popup: this.renderDropdownList(),
        placement: placement,
        action: "click",
        hideAction: ['scroll', 'resize'],
        onPopupVisibleChange: this.onPopupVisibleChange
      }, _react.default.createElement("div", (0, _extends2.default)({}, otherProps, {
        ref: this.saveSelectRef,
        className: classes,
        tabIndex: tabIndex,
        onKeyDown: this.onKeyDown
      }), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-text")
      }, "1111", this.getSelectText()), showArrow ? _react.default.createElement("div", {
        className: (0, _classnames.default)((_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-arrow"), true), (0, _defineProperty2.default)(_classNames2, arrowCls, true), _classNames2))
      }) : null));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {};
    }
  }]);
  return Select;
}(_react.default.Component);

exports.default = Select;
(0, _defineProperty2.default)(Select, "propTypes", {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  prefixCls: _propTypes.default.string,
  options: _propTypes.default.array,
  dropdownCls: _propTypes.default.string,
  dropdownDestroyOnHide: _propTypes.default.bool,
  dropdownStyle: _propTypes.default.object,
  labelInValue: _propTypes.default.bool,
  showArrow: _propTypes.default.bool,
  showSearch: _propTypes.default.bool,
  allowClear: _propTypes.default.bool,
  autoClearSearchValue: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  defaultOpen: _propTypes.default.bool
});
(0, _defineProperty2.default)(Select, "defaultProps", {
  disabled: false,
  readOnly: false,
  inline: true,
  options: [],
  tabIndex: 0,
  prefixCls: 'rw-select',
  arrowCls: 'fa fa-caret-down',
  valueField: 'value',
  labelField: 'text',
  optionsField: 'options',
  dropdownCls: null,
  dropdownStyle: null,
  dropdownDestroyOnHide: true,
  labelInValue: false,
  showArrow: true,
  showSearch: false,
  allowClear: false,
  autoClearSearchValue: true,
  placeholder: '',
  defaultOpen: false
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Option", {
  enumerable: true,
  get: function get() {
    return _Option.default;
  }
});
Object.defineProperty(exports, "OptGroup", {
  enumerable: true,
  get: function get() {
    return _OptGroup.default;
  }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function get() {
    return _Select.default;
  }
});
exports.default = void 0;

var _Option = _interopRequireDefault(__webpack_require__(/*! ./Option */ "./src/Option.js"));

var _OptGroup = _interopRequireDefault(__webpack_require__(/*! ./OptGroup */ "./src/OptGroup.js"));

var _Select = _interopRequireDefault(__webpack_require__(/*! ./Select */ "./src/Select.js"));

_Select.default.Option = _Option.default;
_Select.default.OptGroup = _OptGroup.default;
var _default = _Select.default;
exports.default = _default;

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = isNumber;
exports.isUndefined = isUndefined;
exports.isEqual = isEqual;
exports.noop = noop;
exports.each = each;
exports.isArray = void 0;

var _isArray = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js"));

var ObjProto = Object.prototype;
var toString = ObjProto.toString;
var nativeIsArray = _isArray.default;

function isNumber(obj) {
  return typeof obj === 'number';
}

var isArray = nativeIsArray ? nativeIsArray : function (value) {
  return toString.call(value) === '[object Array]';
};
exports.isArray = isArray;

function isUndefined(obj) {
  return obj === undefined;
}

function isEqual(a, b) {
  return String(a) === String(b);
}

function noop() {}

function each(obj, iterator, context) {
  if (obj == null) return obj;
  var i,
      length,
      hasContext = context === void 0 ? false : true;

  for (i = 0, length = obj.length; i < length; i++) {
    if (iterator.call(hasContext ? context : obj[i], obj[i], i, obj) === false) break;
  }

  return obj;
}

/***/ }),

/***/ 0:
/*!********************************************************************************************************************!*\
  !*** multi ./node_modules/packez/lib/fetchPolyfills.js ./node_modules/packez/lib/polyfills.js ./examples/index.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\select\node_modules\packez\lib\fetchPolyfills.js */"./node_modules/packez/lib/fetchPolyfills.js");
__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\select\node_modules\packez\lib\polyfills.js */"./node_modules/packez/lib/polyfills.js");
module.exports = __webpack_require__(/*! D:\wamp\www\github-projects\react-widget\select\examples\index.js */"./examples/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.59b942f9.js.map