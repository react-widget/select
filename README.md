# react-widget-select

## 安装
`npm install --save react-widget-select`

## API

```html
<Select>
  <Option value="lucy">lucy</Option>
</Select>
```

```html
<Select options={[{label:lucy, value: lucy}]}>
</Select>
```

### Select props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | 组件CSS样式前缀 | string | rw-select |
| className | 组件className属性 | string | - |
| style | 组件style属性 | React.CSSProperties | - |
| tabIndex | 组件tabIndex属性 | number | - |
| options | 组件数据 | Array\<Option> | false |
| inline | 内联组件 | boolean | true |
| emptyLabel | 下拉框无内容时显示 | ReactNode | no data. |
| valueField | 设置取值字段 | string | value |
| labelField | 设置显示字段 | string | label |
| childrenField | 设置子节点字段 | string | children |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 `{key: string, label: ReactNode}` 的格式 | boolean | false |
| allowClear | 支持清除 | boolean | false |
| autoFocus | 默认获取焦点 | boolean | false |
| defaultValue | 指定默认选中的条目 | string|number | - |
| value | 指定默认选中的条目 `受控` | string|number | - |
| disabled | 是否禁用 | boolean | false |
| readOnly | 是否只读 | boolean | false |
| placeholder | 选择框默认文字 | string | - |
| showArrow | 是否显示下拉小箭头 | boolean | true |
| showSearch | 显示下拉框的搜索输入框 | boolean | false |
| optionFilterField | 搜索时过滤对应的 option 属性 | string | label |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `searchText` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | true |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| dropdownStyle | 下拉菜单的 style 属性 | object | - |
| dropdownProps | 下拉菜单扩展属性，参考`ListBox` | object | - |
| placement | 	dropdown出现位置<`PlacementType`> | string | bottomLeft |
| offset | 	dropdown位置偏移量 | Array<number> | [0, 0] |
| popupClassName | 	dropdown弹出层的className属性 | string | - |
| popupRootComponent | 	dropdown弹出层自定义组件类型 | ReactNode | div |
| getPopupContainer | popup渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域。 | Function(triggerNode) | () => document.body |
| destroyPopupOnHide | 	dropdown隐藏时删除DOM节点 | boolean | true |
| defaultOpen | 是否默认展开下拉菜单 | boolean | - |
| open | 是否展开下拉菜单`受控` | boolean | - |
| onResizeToHideDropDown | 浏览器大小改变时隐藏下拉框 | boolean | true |
| onScrollToHideDropDown | 浏览器触发滚动时隐藏下拉框 | boolean | false |
| renderValue | 自定义渲染被选中的选项 | (menu: ReactNode, option: Option) => ReactNode | - |
| renderMenu | 自定义下拉框内容 | (menu: ReactNode, props) => ReactNode | - |
| renderMenuItem | 自定义下拉选项内容 | (label:React.Node, option:Option) => ReactNode | - |
| renderMenuGroupTitle | 自定义下拉分组标题内容 | (label:React.Node, option:Option) => ReactNode | - |
| onBlur | 失去焦点的时回调 | function | - |
| onFocus | 获得焦点时回调 | function | - |
| onChange | 选中 option 时调用此函数 | function(value, option:Option) | - |
| onSearch | 搜索输入框值变化时回调 | function(value: string) |  |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | function(value, option:Option) | - |
| onDropDownVisibleChange | 展开/隐藏下拉菜单的回调 | function(open) | - |
| onMouseEnter | 鼠标移入时回调 | function | - |
| onMouseLeave | 鼠标移出时回调 | function | - |


> 注意，如果发现下拉菜单跟随页面滚动，或者需要在其他弹层中触发 Select，请尝试使用 `getPopupContainer={triggerNode => triggerNode.parentNode}` 将下拉弹层渲染节点固定在触发器的父元素中。

### Select Methods

| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |

### Option props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false |
| label | 选中该 Option 后，Select 的 title | ReactNode | - |
| value | 默认根据此属性值进行筛选 | string\|number | - |

### OptGroup props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子节点 | Array\<Option> | - |
| label | 组名 | string\|React.Element | 无 |

### PlacementType

```
type PlacementType = 
  | bottomLeft
  | bottomCenter
  | bottomRight
  | topLeft
  | topCenter
  | topRight
  | leftTop
  | leftCenter
  | leftBottom
  | rightTop
  | rightCenter
  | rightBottom
  | centerCenter

```