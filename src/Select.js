import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import assign from 'object-assign';
//import {omit, assign} from 'lodash';
import Popup from 'react-widget-popup';
import ListBox, { ListItem, ListItemGroup } from 'react-widget-listbox';
import { on, off } from 'bplokjs-dom-utils/events';
import contains from 'bplokjs-dom-utils/contains';

import { isUndefined, isArray } from './util';

export default class Select extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        prefixCls: PropTypes.string,
        options: PropTypes.array,
        dropdownCls: PropTypes.string,
        dropdownDestroyOnHide: PropTypes.bool,
        dropdownStyle: PropTypes.object,
        labelInValue: PropTypes.bool,
        showArrow: PropTypes.bool,
        showSearch: PropTypes.bool,
        allowClear: PropTypes.bool,
        autoClearSearchValue: PropTypes.bool,
        placeholder: PropTypes.string,
    };

    static defaultProps = {
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
    };

    constructor(props) {
        super(props);

        this._refs = {};

        this.state = {
            value: props.value || props.defaultValue,
            showDropdown: false,
            optionsMap: {},
        }

        this.updateOptionsMap(props);
    }

    componentWillReceiveProps(props) {
        this.updateOptionsMap(props);

        if (!isUndefined(props.value)) {
            this.setState({
                value: props.value
            });
        }
    }

    componentDidMount2() {

        this.updatePopupPosition();

        this.__resizeHandle = () => {
            if (this.state.showDropdown) {
                this.hideDropdown();
            }
        };

        this.__mousedownHandle = (e) => {
            if (this.state.showDropdown && !contains(this._refs.dropdown, e.target)) {
                if (contains(this._refs.select, e.target)) return;
                this.hideDropdown();
            }
        };

        on(window, 'resize', this.__resizeHandle);

        on(document, 'mousedown', this.__mousedownHandle);

    }

    componentDidUpdate2() {
        this.updatePopupPosition();
    }

    componentWillUnmount2() {
        if (this.__resizeHandle) {
            off(window, 'resize', this.__resizeHandle);
        }

        if (this.__mousedownHandle) {
            off(document, 'mousedown', this.__mousedownHandle);
        }
    }

    updateOptionsMap(props) {
        const { options, children, valueField, labelField, optionsField } = props;
        const maps = {};

        function parseOptions(list) {
            list.forEach(option => {
                if (option[optionsField]) {
                    parseOptions(option[optionsField]);
                } else {
                    maps[option[valueField]] = option;
                }
            });
        }

        function parseChildren(childs) {
            React.Children.map(childs, child => {
                const props = child.props;

                if (child.type.isOptOption) {
                    parseChildren(props.children);
                } else {
                    maps[props[valueField]] = assign(omit(props, ['children']), { [labelField]: props.children });
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

    handleDropdownCreate = (el) => {
        this._refs.listbox = el;
        this._refs.dropdown = el ? findDOMNode(el) : null;
    }

    getSelectText() {
        const { options, valueField, labelField } = this.props;
        const value = this.state.value;

        const ret = this.state.optionsMap[value];

        return ret ? ret[labelField] : value;
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

    handleListItemClick = ({ value }) => {
        const props = this.props;
        const state = this.state;

        if (state.value + '' === value + '') {
            this.hideDropdown();
            return;
        }

        if (!('value' in props)) {
            this.setState({
                value: value
            });
        }

        if (props.onChange) props.onChange(this.transformChangeValue(value));

        this.hideDropdown();
    }

    handleDropdownShow = () => {
        setTimeout(() => this._refs.listbox.focus(), 0);
    }

    getSelectOptions() {
        const { valueField, labelField, optionsField, options, children } = this.props;
        const value = this.state.value;

        return (
            <ListBox
                ref={this.handleDropdownCreate}
                valueField={valueField}
                labelField={labelField}
                itemsField={optionsField}
                value={value}
                items={options}
                children={this.renderSelectChild(children)}
                onItemClick={this.handleListItemClick}
            />
        );
    }

    renderSelectChild(children) {
        const { labelField, valueField } = this.props;

        return React.Children.map(children, child => {
            const props = child.props;

            if (child.type.isOptOption) {
                return <ListItemGroup label={props[labelField]}>{this.renderSelectChild(props.children)}</ListItemGroup>;
            }

            return <ListItem {...props} />;
        });
    }

    hideDropdown() {
        this.setState({
            showDropdown: false
        });
    }

    handleClick = (e) => {
        const popupEl = findDOMNode(this._refs.popup);
        if (popupEl && contains(popupEl, e.target)) return;

        this.setState({
            showDropdown: !this.state.showDropdown
        });
    }

    onKeyDown = (e) => {
        if (e.keyCode === 40 && !this.state.showDropdown) {
            this.setState({
                showDropdown: !this.state.showDropdown
            });
        }

        if (e.keyCode === 27 && this.state.showDropdown) {
            this.setState({
                showDropdown: false
            });
        }
    }

    getPopupStyle() {
        const { showDropdown } = this.state;
        const selectEl = this._refs.select;
        const dropdownStyle = {
            maxWidth: 0,
            maxHeight: 0,
        };

        if (showDropdown && selectEl) {
            const rect = selectEl.getBoundingClientRect();
            dropdownStyle.minWidth = selectEl.offsetWidth;
            dropdownStyle.maxWidth = selectEl.offsetWidth + rect.right - 10;
            dropdownStyle.maxHeight = Math.max(rect.top, window.innerHeight - rect.top - selectEl.offsetHeight) - 10;
        }

        return assign(dropdownStyle, this.props.dropdownStyle);
    }

    updatePopupPosition() {
        if (this.state.showDropdown) {
            this._refs.popup.updatePosition(findDOMNode(this));
        }
    }

    renderSelect() {
        const props = this.props;
        const { showDropdown } = this.state;
        const {
            prefixCls,
            tabIndex,
            inline,
            disabled,
            readOnly,
            arrowCls,
            children,
            options,
            dropdownCls,
            dropdownDestroyOnHide,
            showArrow,
            ...others
        } = props;
        const classes = classNames({
            [prefixCls]: true,
            [`${prefixCls}-inline`]: inline,
            [`${prefixCls}-readonly`]: readOnly,
            [`${prefixCls}-disabled`]: disabled,
        });

        const otherProps = omit(others, [
            'value',
            'valueField',
            'dropdownCls',
            'dropdownStyle',
            'dropdownDestroyOnHide',
            'labelField',
            'optionsField',
            'labelInValue',
        ]);
        // <Popup
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
        return (
            <div
                {...otherProps}
                ref={(el) => this._refs.select = el}
                className={classes}
                tabIndex={tabIndex}
                onClick={this.handleClick}
                onKeyDown={this.onKeyDown}
            >
                <div className={`${prefixCls}-text`}>1111{this.getSelectText()}</div>
                {
                    showArrow ? (
                        <div className={classNames({
                            [`${prefixCls}-arrow`]: true,
                            [arrowCls]: true
                        })}></div>
                    ) : null
                }
            </div>
        );
    }

    render() {
        return this.renderSelect();
    }

}