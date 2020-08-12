import React from "react";
import classnames from "classnames";
import { Popover, PopoverProps } from "react-widget-popover";
import { ListBox, ListBoxProps, Item, dataProcessor } from "react-widget-listbox";

const KEY_DOWN = 40;

export interface Option extends Record<any, any> {
	label?: React.ReactNode;
	value?: any;
	disabled?: boolean;
	children?: Option[];
}

export interface SelectProps extends PopoverProps {
	options?: Option[];
	defaultOpen?: boolean;
	open?: boolean;
	placeholder?: React.ReactNode;
	tabIndex?: number;
	autoFocus?: boolean;
	value?: any;
	defaultValue?: any;
	onDropdownVisibleChange?: (visible: boolean) => void;
	onChange?: (value: any, option: Option) => void;
}
export interface SelectState {
	open: boolean;
	options: Item[];
	optionList: Item[];
	optionsMap: Record<any, Item>;
	value: any[];
}

export class Select extends React.Component<SelectProps, SelectState> {
	static defaultProps: SelectProps = {
		prefixCls: "rw-select",
		trigger: "click",
		placement: "bottomLeft",
		visibleArrow: false,
		tabIndex: 0,
		options: [],
		defaultOpen: false,
	};

	static getDerivedStateFromProps(
		nextProps: SelectProps,
		nextState: SelectState
	): Partial<SelectState> | null {
		const computed = dataProcessor({
			data: nextProps.options,
			labelField: "label",
			valueField: "value",
			childrenField: "children",
			disabledField: "disabled",
		});

		return {
			value:
				nextProps.value === undefined
					? nextState.value
					: Array.isArray(nextProps.value)
					? nextProps.value
					: [nextProps.value],
			options: computed.items,
			optionList: computed.itemList,
			optionsMap: computed.itemsMap,
			open: nextProps.open === undefined ? nextState.open : nextProps.open,
		};
	}

	state: Readonly<SelectState> = {
		open: !!this.props.defaultOpen,
		value: [],
		options: [],
		optionList: [],
		optionsMap: {},
	};

	nodeRef = React.createRef<HTMLDivElement>();

	componentDidMount() {
		this.nodeRef.current?.focus();
	}

	handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.keyCode === KEY_DOWN && !this.state.open) {
			this.handleVisibleChange(true);
		}
	};

	handleVisibleChange = (visible: boolean) => {
		const { open, onDropdownVisibleChange } = this.props;

		if (open === undefined) {
			this.setState({
				open: visible,
			});
		}

		if (onDropdownVisibleChange) {
			onDropdownVisibleChange(visible);
		}
	};

	_timer: null | number;
	handleDropdownChange = (value: any, option: Option) => {
		if (this._timer) {
			clearTimeout(this._timer);
		}
		this._timer = (setTimeout(() => {
			this._timer = null;
			this.handleVisibleChange(false);
		}, 100) as unknown) as number;

		if (this.props.value === undefined) {
			this.setState({
				value: [value],
			});
		}

		this.props.onChange?.(value, option);
	};

	getSelectDropdown() {
		const { prefixCls, options } = this.props;
		const { options: items, optionList: itemList, optionsMap: itemsMap, value } = this.state;
		return (
			<ListBox
				labelField="label"
				valueField="value"
				childrenField="children"
				disabledField="disabled"
				value={value}
				computedState={{
					items,
					itemList,
					itemsMap,
				}}
				autoFocus
				prefixCls={`${prefixCls}-listbox`}
				data={options}
				onChange={this.handleDropdownChange}
			/>
		);
	}

	renderSelectedLabel() {
		const { prefixCls, placeholder } = this.props;
		const { optionsMap, value } = this.state;

		if (!value.length) {
			return <span className={`${prefixCls}-placeholder`}>{placeholder}</span>;
		}

		return optionsMap[value[0]]?.label || value;
	}

	render() {
		const { prefixCls, className, style, tabIndex } = this.props;
		const { open } = this.state;

		const classes = classnames(
			{
				[prefixCls!]: true,
				[`${prefixCls}-open`]: open,
			},
			className
		);

		return (
			<Popover
				prefixCls={`${prefixCls}-dropdown`}
				visible={open}
				trigger="click"
				placement="bottomLeft"
				mask={false}
				offset={5}
				visibleArrow={false}
				arrowSize={0}
				title={null}
				delay={0}
				content={this.getSelectDropdown()}
				destroyTooltipOnHide={false}
				transition={{
					classNames: `${prefixCls}-dropdown`,
					timeout: 200,
					onEnter: (dropdownNode: HTMLDivElement) => {
						dropdownNode.style.minWidth = this.nodeRef.current?.offsetWidth + "px";
					},
				}}
				onVisibleChange={this.handleVisibleChange}
			>
				<div
					ref={this.nodeRef}
					style={style}
					className={classes}
					tabIndex={tabIndex}
					onKeyDown={this.handleKeyDown}
				>
					<div className={`${prefixCls}-selected-text`}>{this.renderSelectedLabel()}</div>
					<div className={`${prefixCls}-arrow`}>
						<svg width="16" height="16" viewBox="0 0 16 16">
							<path
								d="M12 6.5c0-.28-.22-.5-.5-.5h-7a.495.495 0 00-.37.83l3.5 4c.09.1.22.17.37.17s.28-.07.37-.17l3.5-4c.08-.09.13-.2.13-.33z"
								fillRule="evenodd"
							></path>
						</svg>
					</div>
				</div>
			</Popover>
		);
	}
}

export default Select;
