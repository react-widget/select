import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import ListBox from 'react-widget-listbox';
import Deferred from 'bplokjs-deferred';
import getPlacement from 'bplokjs-placement';
import Trigger from 'react-widget-trigger';
import isEdge from 'bplokjs-utils/isEdge';

import { isUndefined, isArray, isEqual } from './util';

const KEY_DOWN_CODE = 40;
const KEY_ESC_CODE = 27;

function getOptionsMap(props) {
    const { options, valueField, childrenField } = props;
    const maps = {};

    function toMaps(options) {
        options.forEach(option => {
            if (option[childrenField] && Array.isArray(option[childrenField])) {
                toMaps(option[childrenField]);
            } else {
                maps[option[valueField]] = option;
            }
        });

        return options;
    }

    toMaps(options);

    return maps;
}

export default class Select extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        prefixCls: PropTypes.string,
        options: PropTypes.array,
        tabIndex: PropTypes.number,
        inline: PropTypes.bool,

        valueField: PropTypes.string,
        labelField: PropTypes.string,
        childrenField: PropTypes.string,
        labelInValue: PropTypes.bool,
        showArrow: PropTypes.bool,
        showSearch: PropTypes.bool,
        allowClear: PropTypes.bool,
        //autoClearSearchValue: PropTypes.bool,
        placeholder: PropTypes.string,
        autoFocus: PropTypes.bool,
        filterOption: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        optionFilterField: PropTypes.string,
        emptyLabel: PropTypes.node,
        searchComponent: PropTypes.any,

        dropdownClassName: PropTypes.string,
        dropdownMatchSelectWidth: PropTypes.bool,
        dropdownStyle: PropTypes.object,
        dropdownProps: PropTypes.object,
        placement: PropTypes.string,
        offset: PropTypes.array,
        popupClassName: PropTypes.string,
        popupRootComponent: PropTypes.any,
        getPopupContainer: PropTypes.func,
        destroyPopupOnHide: PropTypes.bool,
        defaultOpen: PropTypes.bool,
        open: PropTypes.bool,
        onResizeToHideDropDown: PropTypes.bool,
        onScrollToHideDropDown: PropTypes.bool,
        renderValue: PropTypes.func,
        renderMenu: PropTypes.func,
        renderMenuItem: PropTypes.func,
        renderMenuGroupTitle: PropTypes.func,
        onDropDownVisibleChange: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onSelect: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    };

    static defaultProps = {
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
        offset: [0, 0],
    };

    constructor(props) {
        super(props);

        this._refs = {};

        this.state = {
            placement: Deferred(),
            value: props.value || props.defaultValue,
            optionsMap: {},
            options: [],
            popupVisible: props.defaultOpen,
            searchText: ''
        };
    }


    static getDerivedStateFromProps(nextProps, prevState) {

        return {
            value: 'value' in nextProps ? nextProps.value : prevState.value,
            popupVisible: 'open' in nextProps ? nextProps.open : prevState.popupVisible,
            options: nextProps.options,
            optionsMap: getOptionsMap(nextProps),
        };
    }

    focus() {
        const dom = this.getSelectDOM();
        dom.focus();
    }

    blur() {
        const dom = this.getSelectDOM();
        dom.blur();
    }

    componentDidMount() {
        const props = this.props;
        const { placement } = this.state;

        this.forceUpdate(() => {
            placement.resolve({
                of: this.getSelectDOM(),
                collision: "flipfit",
                ...getPlacement(props.placement, placement.offset)
            });
        });

        if (props.autoFocus) {
            this.focus();
        }
    }

    renderSelectLabel() {
        const { labelField, renderValue, placeholder, prefixCls } = this.props;
        const { value, optionsMap } = this.state;

        if (value === undefined) {
            return <span className={`${prefixCls}-placeholder`}>{placeholder}</span>;
        }

        const option = optionsMap[value] || {};

        if (renderValue) {
            return renderValue(option[labelField], option);
        }

        return option ? option[labelField] : value;
    }

    transformChangeValue(value) {
        const { labelInValue } = this.props;
        const { optionsMap } = this.state;

        if (labelInValue) {
            return isArray(value) ?
                value.map(v => optionsMap[v]) :
                optionsMap[value];
        }

        return value;
    }

    handleListItemClick = (option) => {
        const props = this.props;
        const state = this.state;

        const value = option[props.valueField];
        const prevPopupVisible = state.popupVisible;

        const newState = {
            popupVisible: 'open' in props ? props.open : false,
            searchText: '',
        };

        if (!isEqual(state.value, value)) {
            if (!('value' in props)) {
                newState.value = value;
            }
            const tValue = this.transformChangeValue(value);
            if (props.onChange) props.onChange(tValue, option);
            if (props.onSelect) props.onSelect(tValue, option);
        }

        const action = () => {
            this.setState(newState);

            if (prevPopupVisible !== newState.popupVisible && props.onDropDownVisibleChange) {
                props.onDropDownVisibleChange(newState.popupVisible);
            }
        }

        if (isEdge()) {
            //解决Edge下，隐藏下拉框后引起文本自动选择问题
            setTimeout(action, 0);
        } else {
            action();
        }

    }
    onSearch = (e) => {
        const { onSearch } = this.props;
        const searchText = e.target.value;

        this.setState({
            searchText,
        });

        if (onSearch) {
            onSearch(searchText);
        }
    }

    renderHeader = () => {
        const { prefixCls, dropdownProps = {}, searchComponent: SearchComponent } = this.props;
        const { searchText } = this.state;

        if (dropdownProps.renderHeader) {
            return dropdownProps.renderHeader();
        }

        return (
            <div className={`${prefixCls}-dropdown-search`}>
                <SearchComponent placeholder="搜索..." value={searchText} onChange={this.onSearch} />
            </div>
        );
    }

    searchOptions(search, options, filterFn) {
        return options.filter(option => {
            return filterFn(search, option);
        });
    }

    getOptions() {
        const { filterOption, optionFilterField, childrenField } = this.props;
        const { searchText, options } = this.state;

        if (!searchText) return options;

        const filterFn = filterOption === 'function' ?
            filterOption :
            (searchText, option) => {
                if (searchText) {
                    const searchContent = option[optionFilterField];
                    if (searchContent == null) return false;
                    return String(searchContent).indexOf(searchText) !== -1;
                }

                return true;
            };

        return options
            .map(option => {
                const children = option[childrenField];

                if (children && Array.isArray(children)) {
                    const optOption = { ...option };
                    optOption[childrenField] = this.searchOptions(searchText, children, filterFn);

                    return optOption;
                }

                const ret = filterFn(searchText, option);
                return ret ? option : null;
            })
            .filter(option => {
                if (option) {
                    const children = option[childrenField];
                    const isGroup = children && Array.isArray(children);

                    if (isGroup && !children.length) return false;

                    return true;
                }

                return false;
            });
    }

    renderDropDownList() {
        const {
            prefixCls,
            valueField,
            labelField,
            childrenField,
            children,
            renderMenu,
            renderMenuItem,
            renderMenuGroupTitle,
            dropdownProps,
            dropdownClassName,
            emptyLabel,
        } = this.props;
        const { value, optionsMap } = this.state;

        const DropDownList = (
            <ListBox
                {...dropdownProps}
                style={this.getDropDownStyle()}
                className={`${prefixCls}-listbox ${dropdownClassName}`}
                valueField={valueField}
                labelField={labelField}
                childrenField={childrenField}
                value={value}
                items={this.getOptions()}
                itemsMap={optionsMap}
                onItemClick={this.handleListItemClick}
                renderHeader={this.renderHeader}
                renderMenu={renderMenu}
                renderMenuItem={renderMenuItem}
                renderMenuGroupTitle={renderMenuGroupTitle}
                emptyLabel={emptyLabel}
            >
            </ListBox>
        );

        return DropDownList;
    }

    onKeyDown = (e) => {
        const { popupVisible } = this.state;

        if (e.keyCode === KEY_DOWN_CODE && !popupVisible) {
            this.setState({
                popupVisible: true
            });
        }

        if (e.keyCode === KEY_ESC_CODE && popupVisible) {
            this.setState({
                popupVisible: false
            });
        }
    }

    getDropDownStyle() {
        const { dropdownStyle, dropdownMatchSelectWidth } = this.props;
        const { popupVisible } = this.state;

        const selectDOM = this.getSelectDOM();
        if (!selectDOM || !popupVisible) return dropdownStyle;

        const rect = selectDOM.getBoundingClientRect();
        const offsetWidth = rect.right - rect.left;
        const style = {};

        if (dropdownMatchSelectWidth) {
            style.maxWidth = Math.max(offsetWidth, window.innerWidth - rect.left - 20);
            style.minWidth = offsetWidth;
            style.maxHeight = Math.max(rect.top, window.innerHeight - rect.bottom) - 20;
        }

        return {
            ...style,
            ...dropdownStyle
        };
    }


    saveSelectRef = (node) => {
        this._select = node;
    }

    getSelectDOM() {
        return this._select;
    }

    onPopupVisibleChange = (visible) => {
        const props = this.props;
        const { searchText } = this.state;

        if (props.readOnly || props.disabled) return;

        if (!('open' in props)) {
            this.setState({
                searchText: visible ? searchText : '',
                popupVisible: visible
            });

            if (props.onDropDownVisibleChange) {
                props.onDropDownVisibleChange(visible);
            }
        } else {
            this.setState({
                searchText: props.open ? searchText : '',
                popupVisible: props.open
            });
        }
    }

    onClearClick = (e) => {
        this.handleListItemClick({
            value: undefined,
        });

        e.preventDefault();
    }

    renderClearIcon() {
        const {
            prefixCls,
            allowClear,
        } = this.props;

        const value = this.state.value;

        const showClearIcon = allowClear && value !== undefined;

        return showClearIcon ? (
            <div
                className={`${prefixCls}-value-clear`}
                onClick={this.onClearClick}
            />
        ) : null
    }

    render() {
        const props = this.props;
        const { placement, popupVisible } = this.state;
        const {
            prefixCls,
            popupClassName,
            tabIndex,
            inline,
            disabled,
            style,
            readOnly,
            arrowCls,
            showArrow,
            getPopupContainer,
            popupRootComponent,
            onResizeToHideDropDown,
            onScrollToHideDropDown,
            destroyPopupOnHide,
            onFocus,
            onBlur,
            onMouseEnter,
            onMouseLeave,
        } = props;
        const classes = classNames({
            [prefixCls]: true,
            [`${prefixCls}-block`]: !inline,
            [`${prefixCls}-readonly`]: readOnly,
            [`${prefixCls}-disabled`]: disabled,
        });

        const hideAction = [];
        if (onResizeToHideDropDown) {
            hideAction.push('resize');
        }

        if (onScrollToHideDropDown) {
            hideAction.push('scroll');
        }

        return (
            <Trigger
                destroyPopupOnHide={destroyPopupOnHide}
                popupRootComponent={popupRootComponent}
                getPopupContainer={getPopupContainer}
                popupVisible={popupVisible}
                popupClassName={`${prefixCls}-popup ${popupClassName}`}
                popup={this.renderDropDownList()}
                placement={placement}
                action="click"
                hideAction={hideAction}
                onPopupVisibleChange={this.onPopupVisibleChange}
                checkDefaultPrevented
            >
                <div
                    style={style}
                    ref={this.saveSelectRef}
                    className={classes}
                    tabIndex={tabIndex}
                    onKeyDown={this.onKeyDown}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <div className={`${prefixCls}-text`}>{this.renderSelectLabel()}</div>
                    {this.renderClearIcon()}
                    {
                        showArrow ? (
                            <div className={classNames({
                                [`${prefixCls}-arrow`]: true,
                                [arrowCls]: true
                            })}></div>
                        ) : null
                    }
                </div>
            </Trigger>
        );
    }

}