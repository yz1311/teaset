/**
 * 采购发布就是销售发布去掉仓单的版本
 */
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  createStackNavigator,
  withNavigationFocus,
  Header,
} from 'react-navigation';
import {withMappedNavigationProps} from 'react-navigation-props-mapper';
import StackViewStyleInterpolator from 'react-navigation-stack/lib/module/views/StackView/StackViewStyleInterpolator';
import {NavigationBar, Theme, NavigationHelper} from '@yz1311/teaset';

import Home from './views/Home';
import ThemeExample from './views/ThemeExample';
import LabelExample from './views/LabelExample';
import ButtonExample from './views/ButtonExample';
import CheckboxExample from './views/CheckboxExample';
import InputExample from './views/InputExample';
import SelectExample from './views/SelectExample';
import StepperExample from './views/StepperExample';
import SearchInputExample from './views/SearchInputExample';
import BadgeExample from './views/BadgeExample';
import PopoverExample from './views/PopoverExample';
import NavigationBarExample from './views/NavigationBarExample';
import ListRowExample from './views/ListRowExample';
import CarouselExample from './views/CarouselExample';
import ProjectorExample from './views/ProjectorExample';
import SegmentedBarExample from './views/SegmentedBarExample';
import SegmentedViewExample from './views/SegmentedViewExample';
import TabViewExample from './views/TabViewExample';
import TransformViewExample from './views/TransformViewExample';
import AlbumViewExample from './views/AlbumViewExample';
import WheelExample from './views/WheelExample';
import OverlayExample from './views/OverlayExample';
import ToastExample from './views/ToastExample';
import ActionSheetExample from './views/ActionSheetExample';
import ActionPopoverExample from './views/ActionPopoverExample';
import PullPickerExample from './views/PullPickerExample';
import PopoverPickerExample from './views/PopoverPickerExample';
import MenuExample from './views/MenuExample';
import DrawerExample from './views/DrawerExample';
import ModalIndicatorExample from './views/ModalIndicatorExample';

let _navigation;


const AppNavigation = createStackNavigator(
  {
    Home:{screen:withMappedNavigationProps(Home)},
    ThemeExample:{screen:withMappedNavigationProps(ThemeExample)},
    LabelExample:{screen:withMappedNavigationProps(LabelExample)}, 
    ButtonExample:{screen:withMappedNavigationProps(ButtonExample)},
    CheckboxExample:{screen:withMappedNavigationProps(CheckboxExample)},
    InputExample:{screen:withMappedNavigationProps(InputExample)},
    SelectExample:{screen:withMappedNavigationProps(SelectExample)},
    StepperExample:{screen:withMappedNavigationProps(StepperExample)},
    SearchInputExample:{screen:withMappedNavigationProps(SearchInputExample)},
    BadgeExample:{screen:withMappedNavigationProps(BadgeExample)},
    PopoverExample:{screen:withMappedNavigationProps(PopoverExample)},
    NavigationBarExample:{screen:withMappedNavigationProps(NavigationBarExample)},
    ListRowExample:{screen:withMappedNavigationProps(ListRowExample)},
    CarouselExample:{screen:withMappedNavigationProps(CarouselExample)},
    ProjectorExample:{screen:withMappedNavigationProps(ProjectorExample)},
    SegmentedBarExample:{screen:withMappedNavigationProps(SegmentedBarExample)},
    SegmentedViewExample:{screen:withMappedNavigationProps(SegmentedViewExample)},
    TabViewExample:{screen:withMappedNavigationProps(TabViewExample)},
    TransformViewExample:{screen:withMappedNavigationProps(TransformViewExample)},
    AlbumViewExample:{screen:withMappedNavigationProps(AlbumViewExample)},
    WheelExample:{screen:withMappedNavigationProps(WheelExample)},
    OverlayExample:{screen:withMappedNavigationProps(OverlayExample)},
    ToastExample:{screen:withMappedNavigationProps(ToastExample)},
    ActionSheetExample:{screen:withMappedNavigationProps(ActionSheetExample)},
    ActionPopoverExample:{screen:withMappedNavigationProps(ActionPopoverExample)},
    PullPickerExample:{screen:withMappedNavigationProps(PullPickerExample)},
    PopoverPickerExample:{screen:withMappedNavigationProps(PopoverPickerExample)},
    MenuExample:{screen:withMappedNavigationProps(MenuExample)},
    DrawerExample:{screen:withMappedNavigationProps(DrawerExample)},
    ModalIndicatorExample:{screen:withMappedNavigationProps(ModalIndicatorExample)},
  },
  {
    initialRouteName: 'Home',
    // headerMode: 'screen',
    headerLayoutPreset: 'center',
    //@ts-ignore
    defaultNavigationOptions: ({navigation}) => {
      _navigation = navigation;
      NavigationHelper.navigation = navigation;
      let params = navigation.state.params;
      let leftTitle;
      if (params) {
        leftTitle = params.leftTitle;
      }
      const leftView = (
        <TouchableOpacity
            activeOpacity={0.7}
            style={{
                paddingLeft: 9,
                paddingRight: 8,
                alignSelf: 'stretch',
                justifyContent: 'center',
            }}
            onPress={() => {
                navigation.goBack();
            }}>
           <NavigationBar.BackButton disabled={true} />
        </TouchableOpacity>
      );
      return {
        header: props => {
          let options = props.scene.descriptor.options;
          return (
            <NavigationBar
              style={{position: 'relative', paddingLeft: 0}}
              // type={'ios'}
              leftView={options.hasOwnProperty('headerLeft')?options.headerLeft:leftView}
              title={
                options.headerTitle
                  ? options.headerTitle
                  : navigation.state.params
                  ? navigation.state.params.title
                  : ''
              }
            />
          );
        },
        headerTintColor: Theme.navTitleColor,
        headerTitleStyle: {
          fontSize: Theme.navTitleFontSize,
          fontWeight: 'normal',
        },
        headerStyle: {
          backgroundColor: Theme.navColor,
        },
        headerBackTitle: null, // 左上角返回键文字
        headerLeft: leftView,
        //ios默认开启，android默认关闭,现在开启
        gesturesEnabled: true,
        cardStack: {
          gesturesEnabled: true,
        },
      };
    },
    transitionConfig: () => ({
      screenInterpolator: props => {
        const last = props.scenes[props.scenes.length - 1];
        // Transitioning from search screen (goBack)
        if (['YZVideoPlayerPage','HomeSearch'].indexOf(last.route.routeName)>=0) {
          return StackViewStyleInterpolator.forFadeFromBottomAndroid(props);
        }

        return StackViewStyleInterpolator.forHorizontal(props);
      },
    }),
  },
);

export default AppNavigation;
