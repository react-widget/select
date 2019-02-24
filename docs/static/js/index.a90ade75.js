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

var _Demo = _interopRequireDefault(__webpack_require__(/*! ./demos/Demo2 */ "./examples/demos/Demo2.js"));

var _Demo2 = _interopRequireDefault(__webpack_require__(/*! ./demos/Demo3 */ "./examples/demos/Demo3.js"));

// import Demo4 from './demos/Demo4';
var _default = [{
  label: '基本功能',
  component: _demo.default
}, {
  label: 'renderMenu',
  component: _Demo.default
}, {
  label: '远程搜索',
  component: _Demo2.default
}];
exports.default = _default;

/***/ }),

/***/ "./examples/demos/Demo2.js":
/*!*********************************!*\
  !*** ./examples/demos/Demo2.js ***!
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

var _src = _interopRequireDefault(__webpack_require__(/*! ../../src */ "./src/index.js"));

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
      value: '1',
      sLimit: 100,
      isVisible: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderMenu", function (menu) {
      var limit = _this.state.sLimit;
      var current = 0;
      var menus = [];

      _react.Children.forEach(menu, function (m, i) {
        current = i;
        if (i >= limit) return;
        menus.push(m);
      });

      if (current >= limit) menus.push(_react.default.createElement("div", {
        style: {
          textAlign: "center",
          padding: 5,
          cursor: "pointer"
        },
        onClick: function onClick() {
          _this.setState({
            sLimit: limit + 100
          });
        }
      }, "\u52A0\u8F7D\u66F4\u591A..."));
      return menus;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDropDownVisibleChange", function (visible) {
      _this.setState({
        isVisible: visible,
        sLimit: 100
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "getOptions",
    value: function getOptions() {
      var MAX_NUM = 10000;
      var options = [];

      for (var i = 0; i < MAX_NUM; i++) {
        options.push({
          label: 'data ' + i,
          value: i
        });
      }

      return options;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isVisible = _this$state.isVisible,
          value = _this$state.value;
      return _react.default.createElement("div", null, _react.default.createElement("div", null, isVisible ? 'dropdown show' : 'dropdown hide'), _react.default.createElement("div", null, "onSelect:", value), _react.default.createElement("div", null, "onChange:", value), _react.default.createElement(_src.default, {
        options: this.getOptions(),
        placeholder: "input...",
        onChange: function onChange(v) {
          return console.log(v);
        },
        autoFocus: true,
        allowClear: true,
        value: value,
        onSelect: function onSelect(v, d) {
          _this2.setState({
            value: v
          });
        },
        renderMenu: this.renderMenu,
        onDropDownVisibleChange: this.onDropDownVisibleChange,
        style: {
          width: 200
        }
      }));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/demos/Demo3.js":
/*!*********************************!*\
  !*** ./examples/demos/Demo3.js ***!
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

var _promise = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _src = _interopRequireDefault(__webpack_require__(/*! ../../src */ "./src/index.js"));

function fetchOptions(search) {
  var MAX_NUM = 1000;
  var options = [];

  for (var i = 0; i < MAX_NUM; i++) {
    var label = 'data ' + i;
    if (label.indexOf(search) === -1) continue;
    options.push({
      label: label,
      value: i
    });
  }

  return new _promise.default(function (resolve) {
    setTimeout(function () {
      resolve(options);
    }, 1000);
  });
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
      options: [],
      value: '1',
      sLimit: 100,
      isVisible: null,
      loading: false,
      s: ''
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderMenu", function (menu) {
      var _this$state = _this.state,
          limit = _this$state.sLimit,
          loading = _this$state.loading;

      if (loading) {
        return 'loading...';
      }

      return menu;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDropDownVisibleChange", function (visible) {
      _this.setState({
        isVisible: visible,
        sLimit: 100
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "search", function (e) {
      var search = e.target.value;

      _this.setState({
        s: search,
        loading: true
      });

      fetchOptions(search).then(function (options) {
        _this.setState({
          options: options,
          loading: false
        });
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "searchInput", function (props) {
      return _react.default.createElement("input", {
        placeholder: "search...",
        onChange: _this.search,
        value: _this.state.s
      });
    });
    return _this;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          isVisible = _this$state2.isVisible,
          value = _this$state2.value,
          options = _this$state2.options;
      return _react.default.createElement("div", null, _react.default.createElement("div", null, isVisible ? 'dropdown show' : 'dropdown hide'), _react.default.createElement("div", null, "onSelect:", value), _react.default.createElement("div", null, "onChange:", value), _react.default.createElement(_src.default, {
        options: options,
        placeholder: "input...",
        onChange: function onChange(v) {
          return console.log(v);
        },
        autoFocus: true,
        allowClear: true,
        onSelect: function onSelect(v, d) {
          _this2.setState({
            value: v
          });
        },
        searchComponent: this.searchInput,
        renderMenu: this.renderMenu,
        onDropDownVisibleChange: this.onDropDownVisibleChange,
        style: {
          width: 200
        }
      }));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

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
      var options = [{
        label: '测试1',
        value: "1"
      }, {
        label: '测试2',
        value: "2"
      }, {
        label: '测试3',
        value: "3"
      }, {
        label: '测试4',
        value: "4"
      }, {
        label: '测试5',
        value: "5"
      }, {
        label: '分组1',
        children: [{
          label: '测试7',
          value: "6"
        }, {
          label: '测试8',
          value: "7"
        }]
      }]; // <Option value="1">测试11测试1测试1</Option>
      //     <Option value="2" disabled>测试2</Option>
      //     <Option value="3">测试3</Option>
      //     <Option value="4">测试4</Option>
      //     <Option value="5">测试5</Option>
      //     <OptGroup label="分组1">
      //         <Option value="6">测试测试测试6</Option>
      //         <Option value="7">测试7</Option>
      //     </OptGroup>

      return _react.default.createElement("div", null, _react.default.createElement(_src.default, {
        onChange: function onChange(v) {
          return console.log(v);
        },
        defaultValue: this.state.value,
        autoFocus: true,
        allowClear: true,
        onSelect: function onSelect(v, d) {
          return console.log(v, d);
        },
        style: {
          width: 200
        },
        defaultOpen: true
      }, _react.default.createElement(_src.Option, {
        value: "1"
      }, "\u6D4B\u8BD511\u6D4B\u8BD51\u6D4B\u8BD51"), _react.default.createElement(_src.Option, {
        value: "2",
        disabled: true
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
        options: options,
        onChange: function onChange(v) {
          return console.log(v);
        },
        defaultValue: this.state.value,
        autoFocus: true,
        allowClear: true,
        onSelect: function onSelect(v, d) {
          return console.log(v, d);
        },
        style: {
          width: 200
        },
        defaultOpen: true
      }), _react.default.createElement(_src.default, {
        onChange: function onChange(v) {
          return console.log(v);
        },
        showArrow: false,
        placement: "leftCenter",
        allowClear: true,
        placeholder: "\u8BF7\u9009\u62E9..."
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
        disabled: true
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
        readOnly: true
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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/extends */ "./node_modules/@babel/runtime-corejs2/helpers/extends.js"));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/objectSpread.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _isArray = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime-corejs2/helpers/objectWithoutProperties.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _omit = _interopRequireDefault(__webpack_require__(/*! omit.js */ "./node_modules/omit.js/es/index.js"));

var _reactWidgetListbox = _interopRequireDefault(__webpack_require__(/*! react-widget-listbox */ "./node_modules/react-widget-listbox/index.js"));

var _bplokjsDeferred = _interopRequireDefault(__webpack_require__(/*! bplokjs-deferred */ "./node_modules/bplokjs-deferred/index.js"));

var _bplokjsPlacement = _interopRequireDefault(__webpack_require__(/*! bplokjs-placement */ "./node_modules/bplokjs-placement/index.js"));

var _reactWidgetTrigger = _interopRequireDefault(__webpack_require__(/*! react-widget-trigger */ "./node_modules/react-widget-trigger/index.js"));

var _util = __webpack_require__(/*! ./util */ "./src/util.js");

var KEY_DOWN_CODE = 40;
var KEY_ESC_CODE = 27;

function getOptionsListAndMap(props) {
  var options = props.options,
      children = props.children,
      valueField = props.valueField,
      labelField = props.labelField,
      childrenField = props.childrenField;
  var maps = {};
  var newOptions = options;

  function parseOptions(options) {
    options.forEach(function (option) {
      if (option[childrenField]) {
        parseOptions(option[childrenField]);
      } else {
        maps[option[valueField]] = option;
      }
    });
    return options;
  }

  function parseChildren(options) {
    return _react.default.Children.map(options, function (child) {
      if (!_react.default.isValidElement(child)) return null;
      var _child$props = child.props,
          children = _child$props.children,
          option = (0, _objectWithoutProperties2.default)(_child$props, ["children"]);

      if (child.type.isOptOption) {
        option[childrenField] = parseChildren(children);
      } else if (child.type.isOption) {
        option[labelField] = children;
        maps[option[valueField]] = option;
      } else {
        return null;
      }

      return option;
    });
  }

  if (options && (0, _isArray.default)(options)) {
    newOptions = parseOptions(options);
  } else {
    newOptions = parseChildren(children);
  }

  return {
    options: newOptions,
    optionsMap: maps
  };
}

var Select =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Select, _React$Component);

  function Select(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, Select);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Select).call(this, _props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleListItemClick", function (option) {
      var props = _this.props;
      var state = _this.state;
      var value = option[props.valueField];
      var prevPopupVisible = state.popupVisible;
      var newState = {
        popupVisible: 'open' in props ? props.open : false,
        searchText: ''
      };

      if (!(0, _util.isEqual)(state.value, value)) {
        if (!('value' in props)) {
          newState.value = value;
        }

        var tValue = _this.transformChangeValue(value);

        if (props.onChange) props.onChange(tValue, option);
        if (props.onSelect) props.onSelect(tValue, option);
      }

      _this.setState(newState);

      if (prevPopupVisible !== newState.popupVisible && props.onDropDownVisibleChange) {
        props.onDropDownVisibleChange(newState.popupVisible);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSearch", function (e) {
      var onSearch = _this.props.onSearch;
      var searchText = e.target.value;

      _this.setState({
        searchText: searchText
      });

      if (onSearch) {
        onSearch(searchText);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderHeader", function () {
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          _this$props$dropdownP = _this$props.dropdownProps,
          dropdownProps = _this$props$dropdownP === void 0 ? {} : _this$props$dropdownP,
          SearchComponent = _this$props.searchComponent;
      var searchText = _this.state.searchText;

      if (dropdownProps.renderHeader) {
        return dropdownProps.renderHeader();
      }

      return _react.default.createElement("div", {
        className: "".concat(prefixCls, "-dropdown-search")
      }, _react.default.createElement(SearchComponent, {
        placeholder: "\u641C\u7D22...",
        value: searchText,
        onChange: _this.onSearch
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onKeyDown", function (e) {
      var popupVisible = _this.state.popupVisible;

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
      var props = _this.props;
      var searchText = _this.state.searchText;
      if (props.readOnly || props.disabled) return;

      if (!('open' in props)) {
        _this.setState({
          searchText: visible ? searchText : '',
          popupVisible: visible
        });

        if (props.onDropDownVisibleChange) {
          props.onDropDownVisibleChange(visible);
        }
      } else {
        _this.setState({
          searchText: props.open ? searchText : '',
          popupVisible: props.open
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onClearClick", function (e) {
      _this.handleListItemClick({
        value: undefined
      });

      e.preventDefault();
    });
    _this._refs = {};
    _this.state = {
      placement: (0, _bplokjsDeferred.default)(),
      value: _props.value || _props.defaultValue,
      optionsMap: {},
      options: [],
      popupVisible: _props.defaultOpen,
      searchText: ''
    };
    return _this;
  }

  (0, _createClass2.default)(Select, [{
    key: "focus",
    value: function focus() {
      var dom = this.getSelectDOM();
      dom.focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      var dom = this.getSelectDOM();
      dom.blur();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var props = this.props;
      var placement = this.state.placement;
      this.forceUpdate(function () {
        placement.resolve((0, _objectSpread2.default)({
          of: _this2.getSelectDOM(),
          collision: "flipfit"
        }, (0, _bplokjsPlacement.default)(props.placement, placement.offset)));
      });

      if (props.autoFocus) {
        this.focus();
      }
    }
  }, {
    key: "renderSelectLabel",
    value: function renderSelectLabel() {
      var _this$props2 = this.props,
          labelField = _this$props2.labelField,
          renderValue = _this$props2.renderValue,
          placeholder = _this$props2.placeholder,
          prefixCls = _this$props2.prefixCls;
      var _this$state = this.state,
          value = _this$state.value,
          optionsMap = _this$state.optionsMap;

      if (value === undefined) {
        return _react.default.createElement("span", {
          className: "".concat(prefixCls, "-placeholder")
        }, placeholder);
      }

      var option = optionsMap[value] || {};

      if (renderValue) {
        return renderValue(option[labelField], option);
      }

      return option ? option[labelField] : value;
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
    key: "searchOptions",
    value: function searchOptions(search, options, filterFn) {
      return options.filter(function (option) {
        return filterFn(search, option);
      });
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var _this3 = this;

      var _this$props3 = this.props,
          filterOption = _this$props3.filterOption,
          optionFilterField = _this$props3.optionFilterField,
          childrenField = _this$props3.childrenField;
      var _this$state2 = this.state,
          searchText = _this$state2.searchText,
          options = _this$state2.options;
      if (!searchText) return options;
      var filterFn = filterOption === 'function' ? filterOption : function (searchText, option) {
        if (searchText) {
          var searchContent = option[optionFilterField];
          if (searchContent == null) return false;
          return String(searchContent).indexOf(searchText) !== -1;
        }

        return true;
      };
      return options.map(function (option) {
        var children = option[childrenField];

        if (children && (0, _isArray.default)(children)) {
          var optOption = (0, _objectSpread2.default)({}, option);
          optOption[childrenField] = _this3.searchOptions(searchText, children, filterFn);
          return optOption;
        }

        var ret = filterFn(searchText, option);
        return ret ? option : null;
      }).filter(function (option) {
        if (option) {
          var children = option[childrenField];
          var isGroup = children && (0, _isArray.default)(children);
          if (isGroup && !children.length) return false;
          return true;
        }

        return false;
      });
    }
  }, {
    key: "renderDropDownList",
    value: function renderDropDownList() {
      var _this$props4 = this.props,
          prefixCls = _this$props4.prefixCls,
          valueField = _this$props4.valueField,
          labelField = _this$props4.labelField,
          childrenField = _this$props4.childrenField,
          children = _this$props4.children,
          renderMenu = _this$props4.renderMenu,
          renderMenuItem = _this$props4.renderMenuItem,
          renderMenuGroupTitle = _this$props4.renderMenuGroupTitle,
          dropdownProps = _this$props4.dropdownProps,
          dropdownClassName = _this$props4.dropdownClassName,
          emptyLabel = _this$props4.emptyLabel;
      var value = this.state.value;

      var DropDownList = _react.default.createElement(_reactWidgetListbox.default, (0, _extends2.default)({}, dropdownProps, {
        style: this.getDropDownStyle(),
        className: "".concat(prefixCls, "-listbox ").concat(dropdownClassName),
        valueField: valueField,
        labelField: labelField,
        childrenField: childrenField,
        value: value,
        items: this.getOptions(),
        onItemClick: this.handleListItemClick,
        renderHeader: this.renderHeader,
        renderMenu: renderMenu,
        renderMenuItem: renderMenuItem,
        renderMenuGroupTitle: renderMenuGroupTitle,
        emptyLabel: emptyLabel
      }));

      return DropDownList;
    }
  }, {
    key: "getDropDownStyle",
    value: function getDropDownStyle() {
      var _this$props5 = this.props,
          dropdownStyle = _this$props5.dropdownStyle,
          dropdownMatchSelectWidth = _this$props5.dropdownMatchSelectWidth;
      var popupVisible = this.state.popupVisible;
      var selectDOM = this.getSelectDOM();
      if (!selectDOM || !popupVisible) return dropdownStyle;
      var rect = selectDOM.getBoundingClientRect();
      var offsetWidth = rect.right - rect.left;
      var style = {};

      if (dropdownMatchSelectWidth) {
        style.maxWidth = Math.max(offsetWidth, window.innerWidth - rect.left - 20);
        style.minWidth = offsetWidth;
        style.maxHeight = Math.max(rect.top, window.innerHeight - rect.bottom) - 20;
      }

      return (0, _objectSpread2.default)({}, style, dropdownStyle);
    }
  }, {
    key: "getSelectDOM",
    value: function getSelectDOM() {
      return this._select;
    }
  }, {
    key: "renderClearIcon",
    value: function renderClearIcon() {
      var _this$props6 = this.props,
          prefixCls = _this$props6.prefixCls,
          allowClear = _this$props6.allowClear;
      var value = this.state.value;
      var showClearIcon = allowClear && value !== undefined;
      return showClearIcon ? _react.default.createElement("div", {
        className: "".concat(prefixCls, "-value-clear"),
        onClick: this.onClearClick
      }) : null;
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames, _classNames2;

      var props = this.props;
      var _this$state3 = this.state,
          placement = _this$state3.placement,
          popupVisible = _this$state3.popupVisible;
      var prefixCls = props.prefixCls,
          popupClassName = props.popupClassName,
          tabIndex = props.tabIndex,
          inline = props.inline,
          disabled = props.disabled,
          style = props.style,
          readOnly = props.readOnly,
          arrowCls = props.arrowCls,
          showArrow = props.showArrow,
          getPopupContainer = props.getPopupContainer,
          popupRootComponent = props.popupRootComponent,
          onResizeToHideDropDown = props.onResizeToHideDropDown,
          onScrollToHideDropDown = props.onScrollToHideDropDown,
          destroyPopupOnHide = props.destroyPopupOnHide,
          onFocus = props.onFocus,
          onBlur = props.onBlur,
          onMouseEnter = props.onMouseEnter,
          onMouseLeave = props.onMouseLeave;
      var classes = (0, _classnames.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, prefixCls, true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-block"), !inline), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-readonly"), readOnly), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-disabled"), disabled), _classNames));
      var hideAction = [];

      if (onResizeToHideDropDown) {
        hideAction.push('resize');
      }

      if (onScrollToHideDropDown) {
        hideAction.push('scroll');
      }

      return _react.default.createElement(_reactWidgetTrigger.default, {
        destroyPopupOnHide: destroyPopupOnHide,
        popupRootComponent: popupRootComponent,
        getPopupContainer: getPopupContainer,
        popupVisible: popupVisible,
        popupClassName: "".concat(prefixCls, "-popup ").concat(popupClassName),
        popup: this.renderDropDownList(),
        placement: placement,
        action: "click",
        hideAction: hideAction,
        onPopupVisibleChange: this.onPopupVisibleChange,
        checkDefaultPrevented: true
      }, _react.default.createElement("div", {
        style: style,
        ref: this.saveSelectRef,
        className: classes,
        tabIndex: tabIndex,
        onKeyDown: this.onKeyDown,
        onFocus: onFocus,
        onBlur: onBlur,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave
      }, _react.default.createElement("div", {
        className: "".concat(prefixCls, "-text")
      }, this.renderSelectLabel()), this.renderClearIcon(), showArrow ? _react.default.createElement("div", {
        className: (0, _classnames.default)((_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-arrow"), true), (0, _defineProperty2.default)(_classNames2, arrowCls, true), _classNames2))
      }) : null));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return (0, _objectSpread2.default)({
        value: 'value' in nextProps ? nextProps.value : prevState.value,
        popupVisible: 'open' in nextProps ? nextProps.open : prevState.popupVisible
      }, getOptionsListAndMap(nextProps));
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
  tabIndex: _propTypes.default.number,
  inline: _propTypes.default.bool,
  valueField: _propTypes.default.string,
  labelField: _propTypes.default.string,
  childrenField: _propTypes.default.string,
  labelInValue: _propTypes.default.bool,
  showArrow: _propTypes.default.bool,
  showSearch: _propTypes.default.bool,
  allowClear: _propTypes.default.bool,
  //autoClearSearchValue: PropTypes.bool,
  placeholder: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,
  filterOption: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  optionFilterField: _propTypes.default.string,
  emptyLabel: _propTypes.default.node,
  searchComponent: _propTypes.default.node,
  dropdownClassName: _propTypes.default.string,
  dropdownMatchSelectWidth: _propTypes.default.bool,
  dropdownStyle: _propTypes.default.object,
  dropdownProps: _propTypes.default.object,
  placement: _propTypes.default.string,
  offset: _propTypes.default.array,
  popupClassName: _propTypes.default.string,
  popupRootComponent: _propTypes.default.any,
  getPopupContainer: _propTypes.default.func,
  destroyPopupOnHide: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,
  open: _propTypes.default.bool,
  onResizeToHideDropDown: _propTypes.default.bool,
  onScrollToHideDropDown: _propTypes.default.bool,
  renderValue: _propTypes.default.func,
  renderMenu: _propTypes.default.func,
  renderMenuItem: _propTypes.default.func,
  renderMenuGroupTitle: _propTypes.default.func,
  onDropDownVisibleChange: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func
});
(0, _defineProperty2.default)(Select, "defaultProps", {
  disabled: false,
  readOnly: false,
  inline: true,
  tabIndex: 0,
  autoFocus: false,
  emptyLabel: 'no data.',
  filterOption: true,
  optionFilterField: 'label',
  searchComponent: 'input',
  prefixCls: 'rw-select',
  popupClassName: '',
  destroyPopupOnHide: true,
  arrowCls: '',
  valueField: 'value',
  labelField: 'label',
  childrenField: 'children',
  dropdownClassName: null,
  dropdownMatchSelectWidth: true,
  dropdownStyle: null,
  dropdownDestroyOnHide: true,
  labelInValue: false,
  showArrow: true,
  showSearch: false,
  allowClear: false,
  //autoClearSearchValue: true,
  placeholder: '',
  defaultOpen: false,
  onResizeToHideDropDown: true,
  onScrollToHideDropDown: false,
  placement: 'bottomLeft',
  offset: [0, 0]
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
//# sourceMappingURL=index.a90ade75.js.map