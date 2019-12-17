// Home.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {Theme, NavigationPage, NavigationBar, ListRow} from '@yz1311/teaset';

export default class Home extends Component {

  static navigationOptions = ({navigation})=>{
    return {
      headerTitle: 'Teaset Example',
      headerLeft: null
    };
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Theme' detail='主题' onPress={() => NavigationHelper.push('ThemeExample')} topSeparator='full' />
        <ListRow title='Label' detail='标签' onPress={() => NavigationHelper.push('LabelExample')} />
        <ListRow title='Button' detail='按钮' onPress={() => NavigationHelper.push('ButtonExample')} />
        <ListRow title='Checkbox' detail='复选框' onPress={() => NavigationHelper.push('CheckboxExample')} />
        <ListRow title='Input' detail='输入框' onPress={() => NavigationHelper.push('InputExample')} />
        <ListRow title='Select' detail='选择框' onPress={() => NavigationHelper.push('SelectExample')} />
        <ListRow title='Stepper' detail='步进器' onPress={() => NavigationHelper.push('StepperExample')} />
        <ListRow title='SearchInput' detail='搜索输入框' onPress={() => NavigationHelper.push('SearchInputExample')} />
        <ListRow title='Badge' detail='徽章' onPress={() => NavigationHelper.push('BadgeExample')} />
        <ListRow title='Popover' detail='气泡' onPress={() => NavigationHelper.push('PopoverExample')} />
        <ListRow title='NavigationBar' detail='导航栏' onPress={() => NavigationHelper.push('NavigationBarExample')} />
        <ListRow title='ListRow' detail='列表行' onPress={() => NavigationHelper.push('ListRowExample')} />
        <ListRow title='Carousel' detail='走马灯' onPress={() => NavigationHelper.push('CarouselExample')} />
        <ListRow title='Projector' detail='幻灯机' onPress={() => NavigationHelper.push('ProjectorExample')} />
        <ListRow title='SegmentedBar' detail='分段工具条' onPress={() => NavigationHelper.push('SegmentedBarExample')} />
        <ListRow title='SegmentedView' detail='分段器' onPress={() => NavigationHelper.push('SegmentedViewExample')} />
        <ListRow title='TabView' detail='标签页' onPress={() => NavigationHelper.push('TabViewExample')} />
        <ListRow title='TransformView' detail='可变视图' onPress={() => NavigationHelper.push('TransformViewExample')} />
        <ListRow title='AlbumView' detail='相册视图' onPress={() => NavigationHelper.push('AlbumViewExample')} />
        <ListRow title='Wheel' detail='滚轮' onPress={() => NavigationHelper.push('WheelExample')} />
        <ListRow title='Overlay' detail='浮层' onPress={() => NavigationHelper.push('OverlayExample')} />
        <ListRow title='Toast' detail='轻提示' onPress={() => NavigationHelper.push('ToastExample')} />
        <ListRow title='ActionSheet' detail='操作选单' onPress={() => NavigationHelper.push('ActionSheetExample')} />
        <ListRow title='ActionPopover' detail='操作气泡' onPress={() => NavigationHelper.push('ActionPopoverExample')} />
        <ListRow title='PullPicker' detail='上拉选择器' onPress={() => NavigationHelper.push('PullPickerExample')} />
        <ListRow title='PopoverPicker' detail='气泡选择器' onPress={() => NavigationHelper.push('PopoverPickerExample')} />
        <ListRow title='Menu' detail='菜单' onPress={() => NavigationHelper.push('MenuExample')} />
        <ListRow title='Drawer' detail='抽屉' onPress={() => NavigationHelper.push('DrawerExample')} />
        <ListRow title='ModalIndicator' detail='模态指示器' onPress={() => NavigationHelper.push('ModalIndicatorExample')} bottomSeparator='full' />
        <View style={{height: Theme.screenInset.bottom}} />
      </ScrollView>
    );
  }

}
