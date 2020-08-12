import React, { Component } from "react";
import Select from "../../src";

export default class DEMO extends Component {
	state = {
		value: "1",
	};

	componentDidMount() {}

	render() {
		const options = [
			{ label: "测试1", value: "1" },
			{ label: "测试2", value: "2", disabled: true },
			{ label: "测试3", value: "3" },
			{ label: "测试4", value: "4" },
			{ label: "测试5", value: "5" },
			{
				label: "分组1",
				children: [
					{ label: "测试7", value: "6" },
					{ label: "测试8", value: "7" },
				],
			},
		];

		return (
			<div>
				<Select
					options={options}
					placeholder="请选择..."
					onChange={(v) => console.log(v)}
					defaultValue={this.state.value}
					autoFocus
					allowClear
					onSelect={(v, d) => console.log(v, d)}
					style={{
						width: 200,
					}}
					defaultOpen
				></Select>
			</div>
		);
	}
}
