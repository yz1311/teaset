
declare module 'teaset' {
  import {
  ImageStyle,
  ScrollViewProps,
  StyleProp,
  SwipeableListViewProps, TextInputProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native';
  import { Component, RefForwardingComponent } from 'react';
  import { number } from 'prop-types';

  interface BaseOverlay extends ViewStyle{
    show?: (overlayView: Element) => number;
    hide?: (key: number) => void;
    transformRoot?: (transform, animated: boolean, animatesOnly?:boolean) => void;
    restoreRoot?: (animated: boolean, animatesOnly?:boolean) => void;
  }

  type Bounds = {
    x: number,
    y: number,
    width: number,
    height: number,
  };

  interface IOverlayViewProps  {
    style?: ViewStyle,
    modal?: boolean,
    animated?: boolean,
    overlayOpacity?: number,
    //Todo: check
    overlayPointerEvents?: PointerEvent,
    autoKeyboardInsets?: boolean,
    closeOnHardwareBackPress?: boolean, //android only
    onAppearCompleted?: any,
    onDisappearCompleted?: any,
    onCloseRequest?: any, //(overlayView)
  }

  interface IOverlayPopViewProps extends IOverlayViewProps{
    type?: 'zoomOut' | 'zoomIn' | 'custom',
    containerStyle?: ViewStyle,
    customBounds?: Bounds
  }

  interface IOverlayPopoverViewProps extends IOverlayViewProps{
    popoverStyle?: BaseOverlay,
    fromBounds?: Bounds,
    direction?: 'down' | 'up' | 'right' | 'left',
    autoDirection?: boolean, //down -> up, or right -> left
    directionInsets?: number,
    align?: 'start' | 'center' | 'end',
    alignInsets?: number,
    showArrow?: boolean,
    //??
    paddingCorner?: any,
  }

  interface IOverlayPullViewProps extends IOverlayViewProps{
    side: 'top' | 'bottom' | 'left' | 'right',
    containerStyle: ViewStyle,
    rootTransform: 'none' | 'translate' | 'scale' | Array<Bounds>
  }

  export class OverlayView extends Component<IOverlayViewProps,any>{}
  export class OverlayPopoverView extends Component<IOverlayPopoverViewProps,any>{}
  export class OverlayPopView extends Component<IOverlayPopViewProps,any>{}
  export class OverlayPullView extends Component<IOverlayPullViewProps,any>{}

  export class BaseOverlay {
    static View: typeof OverlayView;
    static PullView: typeof OverlayPullView;
    static PopView: typeof OverlayPopView;
    static PopoverView: typeof OverlayPopoverView;
    static hide: (key: number) => void;
    static transformRoot: (transform, animated: boolean, animatesOnly?:boolean) => void;
    static restoreRoot: (animated: boolean, animatesOnly?:boolean) => void;
  }

  export class Overlay extends BaseOverlay{
    static show: (overlayView: Element) => number;
  }

  // export const Overlay: Overlay;
  
  type ActionPopoverProps  = BaseOverlay & {
    show: (fromBounds, items:Array<any>, options?: any) => number;
  };
  
  export const ActionPopover: ActionPopoverProps;

  type ActionSheetProps  = BaseOverlay & {
    show: (items:Array<any>, cancelItem, options?: any) => number;
  };

  export const ActionSheet: ActionSheetProps;

  type IToastViewProps = IOverlayViewProps & {
    text: Element | string | number,
    icon: Element | {uri: string} | number | 'none' | 'success' | 'fail' | 'smile' | 'sad' | 'info' | 'stop',
    position: 'top' | 'bottom' | 'center'
  };

  export class ToastView extends Component<IToastViewProps,any>{}

  interface IToastProps extends IOverlayViewProps{

  }

  export class Toast extends Overlay {
    static ToastView: typeof ToastView;
    static defaultDuration: string;
    static defaultPosition: string;
    static messageDefaultDuration: string;
    static messageDefaultPosition: string;
    static show: (options) => number;
    static message: (text: string, options?, position?) => number;
    static success: (text: string, options?, position?) => number;
    static fail: (text: string, options?, position?) => number;
    static smile: (text, options?, position?) => number;
    static sad: (text: string, options?, position?) => number;
    static info: (text: string, options?, position?) => number;
    static stop: (text: string, options?, position?) => number;
  }

  export interface AlertButton {
    text?: string;
    onPress?: () => void;
    style?: "default" | "cancel" | "destructive";
  }

  interface AlertOptions {
    /** @platform android/ios */
    cancelable?: boolean;
    /** @platform android/ios */
    onDismiss?: () => void;
  }

  export interface AlertStatic {
    alert: (title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => void;
  }

  export const Alert: AlertStatic;
  export type Alert = AlertStatic;
  
  type BadgeTypes = 'capsule' | 'square' | 'dot';

  interface IBadgeProps extends ViewStyle{
    type: BadgeTypes,
    count: string|number,
    countStyle: TextStyle,
    maxCount: number
  }

  export class Badge extends Component<IBadgeProps,any> {}

  interface IBasePageProps extends ViewStyle {
    //转场效果
    scene: any,
    //自动插入键盘占用空间
    autoKeyboardInsets: boolean,
    //插入键盘占用空间顶部偏移，用于底部有固定占用空间(如TabNavigator)的页面
    keyboardTopInsets: number
  }

  export class BasePage extends Component<IBasePageProps,any>{}

  type ButtonTypes = 'default' | 'primary' | 'secondary' | 'danger' | 'link';

  type ButtonSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

  interface IButtonProps extends TouchableOpacityProps {
    type?: ButtonTypes,
    size?: ButtonSizes,
    title: Element | string | number,
    titleStyle?: TextStyle
  }

  export class Button extends Component<IButtonProps,any>{}
  
  interface ICarouselProps extends ScrollViewProps {
    //是否开启轮播
    carousel: boolean,
    //每页停留时间
    interval: number,
    //轮播方向
    direction: 'forward' | 'backward',
    //起始页面编号，从0开始
    startIndex: number,
    //是否循环
    cycle: boolean,
    control: boolean | Element,
    //(index, total) 页面改变时调用
    onChange: (index: number,total: number) => any,
  }
  
  export class Carousel extends Component<ICarouselProps,any>{}
  
  interface ICheckboxProps extends TouchableOpacityProps {
    checked: boolean,
    defaultChecked?: boolean,
    size?: 'lg' | 'md' | 'sm',
    title?: Element | string | number,
    titleStyle?: TextStyle,
    checkedIcon?: Element | {uri: string} | number,
    checkedIconStyle?: ImageStyle,
    uncheckedIcon?: Element | {uri: string} | number,
    uncheckedIconStyle?: ImageStyle,
    onChange?: any,
  }
  
  export class Checkbox extends Component<ICheckboxProps,any>{}

  export interface IDrawerProps extends IOverlayViewProps{
    
  }

  export class Drawer extends Overlay{
    static DrawerView: typeof OverlayPullView;
    static open: (view, side: string, rootTransform: string, options: any) => {key: number,close: (animated: boolean)=>void};
  }

  interface IInputProps extends TextInputProps{
    size?: 'lg' | 'md' | 'sm',
    disabled?: boolean
  }

  export class Input extends Component<IInputProps>{}

  export interface IKeyboardSpaceProps {
    topInsets: number
  }

  export class KeyboardSpace extends Component<IKeyboardSpaceProps> {}
  
  type LabelTypes = 'default'  | 'title' | 'detail' | 'danger';
  
  type LabelSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

  interface ILabelProps extends TextStyle{
    style?: TextStyle,
    type?: LabelTypes,
    size?: LabelSizes,
    text: string | number
  }
  
  export class Label extends Component<ILabelProps,any>{}

  interface IListRowProps extends ISwipeTouchableOpacityProps{
    title: Element | string | number,
    detail?: Element | string | number,
    titleStyle?: TextStyle,
    detailStyle?: TextStyle,
    detailMultiLine?: boolean, //是否支持多行内容
    icon?: Element | {uri: string} | number,
    accessory?: Element | {uri: string} | number | 'none' | 'auto' | 'empty' | 'check' | 'indicator',
    topSeparator?: Element | 'none' | 'full' | 'indent',
    bottomSeparator?: Element | 'none' | 'full' | 'indent',
    titlePlace?: 'none' | 'left' | 'top',
    swipeActions?: Array<Element>,
  }

  export class ListRow extends Component<IListRowProps,any>{}

  export interface IMenuViewProps extends IOverlayPopoverViewProps {
    items: Array<{
      title: Element | string | number,
      icon: Element | {uri: string} | string | number | 'none' | 'empty',
      onPress: ()=>void
    }>
    shadow: boolean,
  }

  export class MenuView extends Component<IMenuViewProps,any>{}

  export interface IMenuItemProps {
    title: Element | string | number,
    icon: Element | {uri: string} | string | number | 'none' | 'empty',
  }

  export class MenuItem extends Component<IMenuItemProps>{}

  export class Menu extends BaseOverlay {
    static MenuView: typeof MenuView;
    static show: (fromBounds, items: Array<any>, options: any) => typeof MenuView;
  }

  export interface IModalIndicatorViewProps extends IOverlayViewProps{
    text?: Element | string | number,
    position?: 'top' | 'bottom' | 'center',
    size?: 'small' | 'large' | number,
    color?: string,
  }

  export class ModalIndicatorView extends Component<IModalIndicatorViewProps> {

  }

  export class ModalIndicator extends BaseOverlay {
    static IndicatorView: typeof ModalIndicatorView;
    static show: (text: string) => typeof ModalIndicatorView;
  }

  interface INavigationPageProps extends IBasePageProps{
    title?: string,
    showBackButton?: boolean,
    navigationBarInsets?: boolean,
  }

  export class NavigationPage extends Component<INavigationPageProps> {}

  export enum PopoverArrows {
    'none',
    'topLeft',
    'top',
    'topRight',
    'rightTop',
    'right',
    'rightBottom',
    'bottomRight',
    'bottom',
    'bottomLeft',
    'leftBottom',
    'left',
    'leftTop'
  }

  interface IPopoverProps {
    arrow: PopoverArrows
    paddingCorner: number,
  }

  export class Popover extends Component<IPopoverProps> {}

  export class PopoverPickerItem extends Component<TouchableOpacityProps & {
    title: Element | string | number,
    selected: boolean
  }>{}

  interface IPopoverPickerViewProps extends IOverlayPopoverViewProps {
    items: Array<any>,
    selectedIndex: number,
    getItemText?: (item, index) => string,
    shadow?: boolean,
    onSelected: (item, index) => any,
  }

  export class PopoverPickerView extends Component<IPopoverPickerViewProps> {}

  export class PopoverPicker extends BaseOverlay {
    static PopoverPickerView: typeof PopoverPickerView;
    static show: (fromBounds, items, selectedIndex: number, onSelected, options: any) => typeof PopoverPickerView;
  }

  export class Projector extends Component<{
    index: number,
    slideStyle?: ViewStyle
  }> {}

  export class PullPickerView extends Component<IOverlayPullViewProps & {
    title?: string,
    items?: Array<any>,
    selectedIndex?: number,
    getItemText?: (item, index) => string,
    onSelected?: (item, index) => any,
  }> {}

  export class PullPickerItem extends Component<IListRowProps & {selected?: boolean}> {}

  export class PullPicker extends BaseOverlay {
    static PullPickerView: typeof PullPickerView;
    static show: (title: string, items, selectedIndex: number, onSelected: (item, index) => any, options: any) => typeof PullPickerView;
  }


  interface  ISearchInputProps extends IInputProps{
    style?: ViewStyle,
    inputStyle?: TextInputProps,
    iconSize?: number,
    disabled?: boolean,
  }

  export class SearchInput extends Component<ISearchInputProps>{

  }

  interface ISegmentedItemProps extends ViewStyle{
    title: Element | string | number,
    titleStyle?: TextStyle,
    activeTitleStyle?: TextStyle,
    active?: boolean,
    badge?: Element | string | number,
    onAddWidth?: (width) => any
  }

  export class SegmentedItem extends Component<ISegmentedItemProps> {}

  interface ISegmentedBarProps extends ViewStyle {
    justifyItem?: 'fixed' | 'scrollable',
    indicatorType?: 'none' | 'boxWidth' | 'itemWidth' | 'customWidth',
    indicatorPosition?: 'top' | 'bottom',
    indicatorLineColor?: string,
    indicatorWidth?: number,
    indicatorLineWidth?: number,
    indicatorPositionPadding?: number,
    animated?: boolean,
    autoScroll?: boolean,
    activeIndex?: number, //if use this prop, you need update this value from onChange event
    onChange?: (index) => any, //(index)
  }

  export class SegmentedBar extends Component<SegmentedBar> {
    static Item: typeof SegmentedItem;
  }

  export interface ISegmentedSheetProps extends ViewStyle{
    title: Element | string | Number,
    titleStyle?: TextStyle,
    activeTitleStyle?: TextStyle,
    badge?: Element | string | Number,
  }

  export class SegmentedSheet extends Component<ISegmentedSheetProps> {}

  interface ISegmentedViewProps extends ViewStyle{
    type?: 'projector' | 'carousel',
    barPosition?: 'top' | 'bottom',
    //SegmentedBar
    barStyle?: ViewStyle,
    justifyItem?: 'fixed' | 'scrollable',
    indicatorType?: 'none' | 'boxWidth' | 'itemWidth',
    indicatorPosition?: 'top' | 'bottom',
    indicatorLineColor?: string,
    indicatorLineWidth?: number,
    indicatorPositionPadding?: number,
    animated?: boolean,
    autoScroll?: boolean,
    activeIndex?: number,
    onChange?:(index) => any, //(index)
  }

  export class SegmentedView extends Component<ISegmentedViewProps> {
    static Sheet: typeof SegmentedSheet;
  }

  interface ISelectProps extends ViewStyle {
    size?: 'lg' | 'md' | 'sm',
    value?: any,
    valueStyle?: TextStyle,
    items?: Array<any>,
    getItemValue?: (item, index) => any, //(item, index) 选择项值，item=items[index]，为空时直接使用item
    getItemText?: (item, index) => any, //(item, index) return display text of item, item=items[index], use item when it's null
    pickerType?: 'auto' | 'pull' | 'popover',
    pickerTitle?: string, //PullPicker only
    editable?: boolean,
    icon?: Element | {uri: string} | number | 'none' | 'default',
    iconTintColor?: string, //set to null for no tint color
    placeholder?: string,
    placeholderTextColor?: string,
    onSelected?: (item, index) => any, //(item, index)
  }

  export class Select extends Component<ISelectProps> {}

  interface IStepperProps extends ViewStyle {
    defaultValue?: number,
    value?: number,
    step?: number,
    max?: number,
    min?: number,
    valueStyle?:TextStyle,
    valueFormat?: (value) => any, //(value)
    subButton?: Element | string,
    addButton?: Element | string,
    showSeparator?: boolean,
    disabled?: boolean,
    editable?: boolean,
    onChange?: (value:number) => any, //(value)
  }


  export class Stepper extends Component<IStepperProps> {

  }

  interface ITabButtonProps extends ViewStyle {
    title: Element | string | number,
    titleStyle?: TextStyle,
    activeTitleStyle?: TextStyle,
    icon?: Element | {uri: string} | number,
    activeIcon?: Element | {uri: string} | number,
    active?: boolean,
    iconContainerStyle?: ViewStyle,
    badge?: Element | number,
  }

  export class TabButton extends Component<ITabButtonProps> {}

  interface ITabSheetProps extends ViewStyle {
    type?: 'sheet' | 'button',
    title: Element | string | number,
    icon?:  Element | {uri: string} | number,
    activeIcon?:  Element | {uri: string} | number,
    iconContainerStyle?: ViewStyle
    badge?:  Element | number,
    onPress?: any,
  }

  export class TabSheet extends Component<ITabSheetProps> {}

  export class TabView extends Component<ViewStyle & {
    type?: 'projector' | 'carousel',
    barStyle?: ViewStyle,
    activeIndex?: number,
    onChange?: (index) => any, //(index)
  }> {
    static Sheet: typeof TabSheet;
    static Button: typeof TabButton;
  }

  interface ITransformViewProps extends ViewStyle {
    containerStyle?: ViewStyle,
    maxScale?: number,
    minScale?: number,
    inertial?: boolean,
    magnetic?: boolean,
    tension?: boolean,
    onWillTransform?: (translateX, translateY, scale) => any, //(translateX, translateY, scale)
    onTransforming?: (translateX, translateY, scale) => any, //(translateX, translateY, scale)
    onDidTransform?: (translateX, translateY, scale) => any, //(translateX, translateY, scale)
    onWillInertialMove?: (translateX, translateY, newX, newY) => boolean, //(translateX, translateY, newX, newY), return ture or false
    onDidInertialMove?: (translateX, translateY, newX, newY) => any, //(translateX, translateY, newX, newY)
    onWillMagnetic?: (translateX, translateY, scale, newX, newY, newScale) => boolean, //(translateX, translateY, scale, newX, newY, newScale), return ture or false
    onDidMagnetic?: (translateX, translateY, scale) => any, //(translateX, translateY, scale)
    onPress?: (event) => any, //(event)
    onLongPress?: (event) => any, //(event)
  }

  export class TransformView extends Component<ITransformViewProps> {}

  export interface IWheelItemProps extends ViewStyle {
    index: number,
    itemHeight: number
    wheelHeight: number,
    currentPosition?: any, //instanceOf(Animated)
  }

  export class WheelItem extends Component<IWheelItemProps> {}

  interface IWheelProps extends ViewStyle {
    items: Element | string | number,
    itemStyle?: TextStyle,
    holeStyle?: ViewStyle, //height is required
    maskStyle?: ViewStyle,
    holeLine?: Element | number,
    index?: number,
    defaultIndex?: number,
    onChange?: (index) => any, //(index)
  }
  export class Wheel extends Component<IWheelProps> {}

  interface ISwipeTouchableOpacityProps extends TouchableOpacityProps{
    swipeable?: boolean,
    swipeWidth?: number,
    onSwipeStsChange?: any,
  }

  export class SwipeTouchableOpacity extends Component<ISwipeTouchableOpacityProps,any>{}

}
