
import React, {Component} from 'react';
import {
  View
} from 'react-native';
import {NavigationHelper} from '@yz1311/teaset';
import {createAppContainer} from "react-navigation";
import AppNav from './AppNav';

NavigationHelper.init(NavigationHelper);

const AppWidthNavigator = createAppContainer(AppNav);

export default class App extends Component<{}> {
  render() {
    return (
      <View style={{flex:1}}>
        <AppWidthNavigator
                    onNavigationStateChange={(prevState, currentState, action) => {
                        //这个是跳转了才去回调，所以不能利用routes来判断路由栈
                        NavigationHelper.navRouters = currentState.routes;
                    }}
                />
      </View>
    );
  }
}
