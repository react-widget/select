import React, { Component } from 'react';
import Select, { Option, OptGroup } from '../../src';

function Test() {
    console.log(1);
    return null;
}

export default class DEMO extends Component {

    state = {
        value: '1'
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Select
                    onChange={v => console.log(v)}
                    defaultValue={this.state.value}
                >
                    <Option value="1">测试1</Option>
                    <Option value="2">测试2</Option>
                    <Option value="3">测试3</Option>
                    <Option value="4">测试4</Option>
                    <Option value="5">测试5</Option>
                    <OptGroup label="分组1">
                        <Option value="6">测试测试测试6</Option>
                        <Option value="7">测试7</Option>
                    </OptGroup>
                </Select>
                <Select
                    onChange={v => console.log(v)}
                    defaultValue={this.state.value}
                    showArrow={false}
                >
                    <Option value="1">测试1</Option>
                    <Option value="2">测试2</Option>
                    <Option value="3">测试3</Option>
                    <Option value="4">测试4</Option>
                    <Option value="5">测试5</Option>
                    <OptGroup label="分组1">
                        <Option value="6">测试测试测试6</Option>
                        <Option value="7">测试7</Option>
                    </OptGroup>
                </Select>
                <span>test...</span>
            </div>
        );
    }

}
