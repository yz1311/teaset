// ActionSheetExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, ActionSheet, Label} from '@yz1311/teaset';

export default class ActionSheetExample extends Component {

  static navigationOptions = ({navigation})=>{
    return {
      headerTitle: 'ActionSheet'
    };
  }

  show(modal) {
    let items = [
      {title: 'Say hello', onPress: () => alert('Hello')},
      {title: 'Do nothing'},
      {title: 'Disabled', disabled: true},
    ];
    let cancelItem = {title: 'Cancel'};
    ActionSheet.show(items, cancelItem, {modal});
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Default' onPress={() => this.show(false)} topSeparator='full' />
        <ListRow title='Modal' onPress={() => this.show(true)} bottomSeparator='full' />
      </ScrollView>
    );
  }

}
