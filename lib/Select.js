
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _reactWidgetListbox = _interopRequireDefault(require("react-widget-listbox"));

var _bplokjsDeferred = _interopRequireDefault(require("bplokjs-deferred"));

var _bplokjsPlacement = _interopRequireDefault(require("bplokjs-placement"));

var _reactWidgetTrigger = _interopRequireDefault(require("react-widget-trigger"));

var _isEdge = _interopRequireDefault(require("bplokjs-utils/isEdge"));

var _util = require("./util");

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
  } // function parseChildren(options) {
  //     return React.Children.map(options, child => {
  //         if (!React.isValidElement(child)) return null;
  //         const { children, ...option } = child.props;
  //         if (child.type.isOptOption) {
  //             option[childrenField] = parseChildren(children);
  //         } else if (child.type.isOption) {
  //             option[labelField] = children;
  //             maps[option[valueField]] = option;
  //         } else {
  //             return null;
  //         }
  //         return option;
  //     });
  // }


  if (options && (0, _isArray.default)(options)) {
    newOptions = parseOptions(options);
  } // else {
  //     newOptions = parseChildren(children);
  // }


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

      var action = function action() {
        _this.setState(newState);

        if (prevPopupVisible !== newState.popupVisible && props.onDropDownVisibleChange) {
          props.onDropDownVisibleChange(newState.popupVisible);
        }
      };

      if ((0, _isEdge.default)()) {
        //解决Edge下，隐藏下拉框后引起文本自动选择问题
        setTimeout(action, 0);
      } else {
        action();
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
  searchComponent: _propTypes.default.any,
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
  options: [],
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