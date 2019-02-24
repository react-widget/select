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
        const options = [
            { label: '测试1', value: "1" },
            { label: '测试2', value: "2" },
            { label: '测试3', value: "3" },
            { label: '测试4', value: "4" },
            { label: '测试5', value: "5" },
            {
                label: '分组1', children: [
                    { label: '测试7', value: "6" },
                    { label: '测试8', value: "7" },
                ]
            },
        ];

        // <Option value="1">测试11测试1测试1</Option>
        //     <Option value="2" disabled>测试2</Option>
        //     <Option value="3">测试3</Option>
        //     <Option value="4">测试4</Option>
        //     <Option value="5">测试5</Option>
        //     <OptGroup label="分组1">
        //         <Option value="6">测试测试测试6</Option>
        //         <Option value="7">测试7</Option>
        //     </OptGroup>
        return (
            <div>
                <Select
                    onChange={v => console.log(v)}
                    defaultValue={this.state.value}
                    autoFocus
                    allowClear
                    onSelect={(v, d) => console.log(v, d)}
                    style={{
                        width: 200
                    }}
                    defaultOpen
                >
                    <Option value="1">测试11测试1测试1</Option>
                    <Option value="2" disabled>测试2</Option>
                    <Option value="3">测试3</Option>
                    <Option value="4">测试4</Option>
                    <Option value="5">测试5</Option>
                    <OptGroup label="分组1">
                        <Option value="6">测试测试测试6</Option>
                        <Option value="7">测试7</Option>
                    </OptGroup>
                </Select>
                <Select
                    options={options}
                    onChange={v => console.log(v)}
                    defaultValue={this.state.value}
                    autoFocus
                    allowClear
                    onSelect={(v, d) => console.log(v, d)}
                    style={{
                        width: 200
                    }}
                    defaultOpen
                >
                </Select>
                <Select
                    onChange={v => console.log(v)}
                    showArrow={false}
                    placement="leftCenter"
                    allowClear
                    placeholder="请选择..."
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
                    disabled
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
                    readOnly
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
