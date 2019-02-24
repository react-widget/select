import React, { Component, Children } from 'react';
import Select from '../../src';


export default class DEMO extends Component {

    state = {
        value: '1',
        sLimit: 100,
        isVisible: null,
    }

    componentDidMount() {
    }

    getOptions() {
        const MAX_NUM = 10000;
        const options = []
        for (let i = 0; i < MAX_NUM; i++) {
            options.push({
                label: 'data ' + i,
                value: i
            });
        }

        return options;
    }

    renderMenu = (menu) => {
        const { sLimit: limit } = this.state;
        let current = 0;
        const menus = [];
        Children.forEach(menu, (m, i) => {
            current = i;
            if (i >= limit) return;
            menus.push(m);
        });
        if (current >= limit)
            menus.push(
                <div
                    style={{
                        textAlign: "center",
                        padding: 5,
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        this.setState({
                            sLimit: limit + 100
                        })
                    }}
                >加载更多...</div>
            );
        return menus;
    }

    onDropDownVisibleChange = (visible) => {

        this.setState({
            isVisible: visible,
            sLimit: 100,
        })
    }

    render() {
        const { isVisible, value } = this.state;
        return (
            <div>
                <div>{isVisible ? 'dropdown show' : 'dropdown hide'}</div>
                <div>onSelect:{value}</div>
                <div>onChange:{value}</div>
                <Select
                    options={this.getOptions()}
                    placeholder="input..."
                    onChange={v => console.log(v)}
                    autoFocus
                    allowClear
                    value={value}
                    onSelect={(v, d) => {
                        this.setState({
                            value: v
                        })
                    }}
                    renderMenu={this.renderMenu}
                    onDropDownVisibleChange={this.onDropDownVisibleChange}
                    style={{
                        width: 200
                    }}
                >
                </Select>
            </div>
        );
    }

}
