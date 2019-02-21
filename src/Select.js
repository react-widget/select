import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import assign from 'object-assign';
//import {omit, assign} from 'lodash';
import Popup from 'react-widget-popup';
import ListBox, { ListItem, ListItemGroup } from 'react-widget-listbox';
import Portal from 'react-widget-portal';
import { on, off } from 'bplokjs-dom-utils/events';
import contains from 'bplokjs-dom-utils/contains';
import Deferred from 'bplokjs-deferred';
import getPlacement from 'bplokjs-placement';
import Trigger from 'react-widget-trigger';

import { isUndefined, isArray, isEqual } from './util';

const KEY_DOWN_CODE = 40;
const KEY_ESC_CODE = 27;

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
        defaultOpen: PropTypes.bool,
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
        defaultOpen: false,
    };

    constructor(props) {
        super(props);

        this._refs = {};

        this.state = {
            placement: Deferred(),
            value: props.value || props.defaultValue,
            showDropdown: props.defaultOpen,
            optionsMap: {},
            popupVisible: props.defaultOpen,
        }

        this.updateOptionsMap(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {};
    }

    // componentWillReceiveProps(props) {
    //     this.updateOptionsMap(props);

    //     if (!isUndefined(props.value)) {
    //         this.setState({
    //             value: props.value
    //         });
    //     }
    // }

    componentDidMount() {
        const { placement } = this.state;

        placement.resolve({
            of: this.getSelectDOM(),
            ...getPlacement('bottomLeft', [0, 1])
        });
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

        const newState = {
            popupVisible: false,
        };

        if (!isEqual(state.value, value)) {

            if (!('value' in props)) {
                newState.value = value;
                this.setState({
                    value: value
                });
            }

            if (props.onChange) props.onChange(this.transformChangeValue(value));
        }

        this.setState(newState);
    }

    handleDropdownShow = () => {
        setTimeout(() => this._refs.listbox.focus(), 0);
    }

    renderDropdownList() {
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

    onKeyDown = (e) => {
        const { popupVisible } = this.state;
        console.log(e.keyCode)
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


    saveSelectRef = (node) => {
        this._select = node;
    }

    getSelectDOM() {
        return findDOMNode(this._select)
    }

    onPopupVisibleChange = (visible) => {
        this.setState({
            popupVisible: visible
        });
    }

    render() {
        const props = this.props;
        const { showDropdown, placement, popupVisible } = this.state;
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
            defaultOpen,
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
            <Trigger
                popupVisible={popupVisible}
                popup={this.renderDropdownList()}
                placement={placement}
                action="click"
                hideAction={['scroll', 'resize']}
                onPopupVisibleChange={this.onPopupVisibleChange}
            >
                <div
                    {...otherProps}
                    ref={this.saveSelectRef}
                    className={classes}
                    tabIndex={tabIndex}
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
            </Trigger>
        );
    }

}