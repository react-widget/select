
"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _reactWidgetListbox = _interopRequireWildcard(require("react-widget-listbox"));

var _bplokjsDeferred = _interopRequireDefault(require("bplokjs-deferred"));

var _bplokjsPlacement = _interopRequireDefault(require("bplokjs-placement"));

var _reactWidgetTrigger = _interopRequireDefault(require("react-widget-trigger"));

var _util = require("./util");

var KEY_DOWN_CODE = 40;
var KEY_ESC_CODE = 27;

var SearchInput =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(SearchInput, _React$Component);

  function SearchInput() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, SearchInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SearchInput)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSearch", function (e) {
      console.log(e.target.value);
    });
    return _this;
  }

  (0, _createClass2.default)(SearchInput, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "dropdown-search"
      }, _react.default.createElement("input", {
        placeholder: "\u641C\u7D22...",
        onChange: this.onSearch
      }));
    }
  }]);
  return SearchInput;
}(_react.default.Component);

exports.default = SearchInput;
(0, _defineProperty2.default)(SearchInput, "propTypes", {});
(0, _defineProperty2.default)(SearchInput, "defaultProps", {});