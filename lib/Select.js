
"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _reactWidgetPopup = _interopRequireDefault(require("react-widget-popup"));

var _reactWidgetListbox = _interopRequireWildcard(require("react-widget-listbox"));

var _events = require("bplokjs-dom-utils/events");

var _contains = _interopRequireDefault(require("bplokjs-dom-utils/contains"));

var _util = require("./util");

//import {omit, assign} from 'lodash';
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

      if (state.value + '' === value + '') {
        _this.hideDropdown();

        return;
      }

      if (!('value' in props)) {
        _this.setState({
          value: value
        });
      }

      if (props.onChange) props.onChange(_this.transformChangeValue(value));

      _this.hideDropdown();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDropdownShow", function () {
      setTimeout(function () {
        return _this._refs.listbox.focus();
      }, 0);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      var popupEl = (0, _reactDom.findDOMNode)(_this._refs.popup);
      if (popupEl && (0, _contains.default)(popupEl, e.target)) return;

      _this.setState({
        showDropdown: !_this.state.showDropdown
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onKeyDown", function (e) {
      if (e.keyCode === 40 && !_this.state.showDropdown) {
        _this.setState({
          showDropdown: !_this.state.showDropdown
        });
      }

      if (e.keyCode === 27 && _this.state.showDropdown) {
        _this.setState({
          showDropdown: false
        });
      }
    });
    _this._refs = {};
    _this.state = {
      value: _props.value || _props.defaultValue,
      showDropdown: false,
      optionsMap: {}
    };

    _this.updateOptionsMap(_props);

    return _this;
  }

  (0, _createClass2.default)(Select, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.updateOptionsMap(props);

      if (!(0, _util.isUndefined)(props.value)) {
        this.setState({
          value: props.value
        });
      }
    }
  }, {
    key: "componentDidMount2",
    value: function componentDidMount2() {
      var _this2 = this;

      this.updatePopupPosition();

      this.__resizeHandle = function () {
        if (_this2.state.showDropdown) {
          _this2.hideDropdown();
        }
      };

      this.__mousedownHandle = function (e) {
        if (_this2.state.showDropdown && !(0, _contains.default)(_this2._refs.dropdown, e.target)) {
          if ((0, _contains.default)(_this2._refs.select, e.target)) return;

          _this2.hideDropdown();
        }
      };

      (0, _events.on)(window, 'resize', this.__resizeHandle);
      (0, _events.on)(document, 'mousedown', this.__mousedownHandle);
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
    key: "getSelectOptions",
    value: function getSelectOptions() {
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
      var _this3 = this;

      var _this$props3 = this.props,
          labelField = _this$props3.labelField,
          valueField = _this$props3.valueField;
      return _react.default.Children.map(children, function (child) {
        var props = child.props;

        if (child.type.isOptOption) {
          return _react.default.createElement(_reactWidgetListbox.ListItemGroup, {
            label: props[labelField]
          }, _this3.renderSelectChild(props.children));
        }

        return _react.default.createElement(_reactWidgetListbox.ListItem, props);
      });
    }
  }, {
    key: "hideDropdown",
    value: function hideDropdown() {
      this.setState({
        showDropdown: false
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
    key: "renderSelect",
    value: function renderSelect() {
      var _classNames,
          _this4 = this,
          _classNames2;

      var props = this.props;
      var showDropdown = this.state.showDropdown;
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
          others = (0, _objectWithoutProperties2.default)(props, ["prefixCls", "tabIndex", "inline", "disabled", "readOnly", "arrowCls", "children", "options", "dropdownCls", "dropdownDestroyOnHide", "showArrow"]);
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

      return _react.default.createElement("div", (0, _extends2.default)({}, otherProps, {
        ref: function ref(el) {
          return _this4._refs.select = el;
        },
        className: classes,
        tabIndex: tabIndex,
        onClick: this.handleClick,
        onKeyDown: this.onKeyDown
      }), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-text")
      }, "1111", this.getSelectText()), showArrow ? _react.default.createElement("div", {
        className: (0, _classnames.default)((_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, "".concat(prefixCls, "-arrow"), true), (0, _defineProperty2.default)(_classNames2, arrowCls, true), _classNames2))
      }) : null);
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderSelect();
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
  placeholder: _propTypes.default.string
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
  placeholder: ''
});