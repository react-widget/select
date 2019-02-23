import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import ListBox, { ListItem, ListItemGroup } from 'react-widget-listbox';
import Deferred from 'bplokjs-deferred';
import getPlacement from 'bplokjs-placement';
import Trigger from 'react-widget-trigger';

import { isUndefined, isArray, isEqual } from './util';

const KEY_DOWN_CODE = 40;
const KEY_ESC_CODE = 27;


export default class SearchInput extends React.Component {
    static propTypes = {


    };

    static defaultProps = {

    };

    onSearch = (e) => {

        console.log(e.target.value)
    }

    render() {


        return (
            <div className={`dropdown-search`}>
                <input placeholder="搜索..." onChange={this.onSearch} />
            </div>
        );
    }

}