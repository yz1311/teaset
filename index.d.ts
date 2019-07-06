
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
  import { Component } from 'react';
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

  export class Overlay{
    static View: typeof OverlayView;
    static PullView: typeof OverlayPullView;
    static PopView: typeof OverlayPopView;
    static PopoverView: typeof OverlayPopoverView;
    static show: (overlayView: Element) => number;
    static hide: (key: number) => void;
    static transformRoot: (transform, animated: boolean, animatesOnly?:boolean) => void;
    static restoreRoot: (animated: boolean, animatesOnly?:boolean) => void;
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
    defaultChecked: boolean,
    size: 'lg' | 'md' | 'sm',
    title: Element | string | number,
    titleStyle: TextStyle,
    checkedIcon: Element | {uri: string} | number,
    checkedIconStyle: ImageStyle,
    uncheckedIcon: Element | {uri: string} | number,
    uncheckedIconStyle: ImageStyle,
    onChange: any,
  }
  
  export class Checkbox extends Component<ICheckboxProps,any>{}
  
  type LabelTypes = 'default'  | 'title' | 'detail' | 'danger';
  
  type LabelSizes = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

  interface ILabelProps extends TextStyle{
    style?: TextStyle,
    type?: LabelTypes,
    size?: LabelSizes,
    text: string | number
  }
  
  export class Label extends Component<ILabelProps,any>{}

  interface ISwipeTouchableOpacityProps extends TouchableOpacityProps{
    swipeable?: boolean,
    swipeWidth?: number,
    onSwipeStsChange?: any,
  }

  export class SwipeTouchableOpacity extends Component<ISwipeTouchableOpacityProps,any>{}

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

  interface IInputProps extends TextInputProps{
    size?: 'lg' | 'md' | 'sm',
    disabled?: boolean
  }

  export class Input extends Component<IInputProps>{}


  interface  ISearchInputProps extends IInputProps{
    style?: ViewStyle,
    inputStyle?: TextInputProps,
    iconSize?: number,
    disabled?: boolean,
  }

  export class SearchInput extends Component<ISearchInputProps>{

  }
}
