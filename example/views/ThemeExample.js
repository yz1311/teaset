// ThemeExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';

import {Theme, NavigationPage, ListRow, PullPicker, NavigationHelper} from '@yz1311/teaset';

export default class ThemeExample extends Component {


  static navigationOptions = ({navigation})=>{
    return {
      headerTitle: 'Theme'
    };
  }

  changeTheme() {
    PullPicker.show(
      'Select theme',
      Object.keys(Theme.themes),
      -1,
      (item, index) => {
        Theme.set(Theme.themes[item]);
        NavigationHelper.popToTop();
      }
    );
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Select theme' onPress={() => this.changeTheme()} topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
