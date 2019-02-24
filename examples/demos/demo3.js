import React, { Component, Children } from 'react';
import Select from '../../src';

function fetchOptions(search) {
    const MAX_NUM = 1000;
    const options = [];

    for (let i = 0; i < MAX_NUM; i++) {
        const label = 'data ' + i;

        if (label.indexOf(search) === -1) continue;

        options.push({
            label,
            value: i
        });
    }

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(options)
        }, 1000)
    });
}

export default class DEMO extends Component {

    state = {
        options: [],
        value: '1',
        sLimit: 100,
        isVisible: null,
        loading: false,
        s: '',
    }

    componentDidMount() {
    }

    renderMenu = (menu) => {
        const { sLimit: limit, loading } = this.state;

        if (loading) {
            return 'loading...';
        }

        return menu;
    }

    onDropDownVisibleChange = (visible) => {

        this.setState({
            isVisible: visible,
            sLimit: 100,
        })
    }



    search = (e) => {
        const search = e.target.value;

        this.setState({
            s: search,
            loading: true
        })

        fetchOptions(search)
            .then(options => {
                this.setState({
                    options: options,
                    loading: false,
                })
            })


    }

    searchInput = (props) => {

        return <input placeholder="search..." onChange={this.search} value={this.state.s} />
    }

    render() {
        const { isVisible, value, options } = this.state;
        return (
            <div>
                <div>{isVisible ? 'dropdown show' : 'dropdown hide'}</div>
                <div>onSelect:{value}</div>
                <div>onChange:{value}</div>
                <Select
                    options={options}
                    placeholder="input..."
                    onChange={v => console.log(v)}
                    autoFocus
                    allowClear
                    onSelect={(v, d) => {
                        this.setState({
                            value: v
                        })
                    }}
                    searchComponent={this.searchInput}
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
