// ModalIndicatorExample.js

'use strict';

import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import {NavigationPage, ListRow, ModalIndicator} from '@yz1311/teaset';

export default class ModalIndicatorExample extends Component {

  static navigationOptions = ({navigation})=>{
    return {
      headerTitle: 'ModalIndicator'
    };
  }

  show() {
    let secs = 5;
    ModalIndicator.show(`Close after ${secs} sec(s)`);
    let timer = setInterval(() => {
      secs--;
      ModalIndicator.show(`Close after ${secs} sec(s)`);
      if (secs < 0) {
        clearInterval(timer);
        ModalIndicator.hide();
      }
    }, 1000);
  }

  render() {
    let img = require('../images/faircup.jpg');
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 20}} />
        <ListRow title='Show' onPress={() => this.show()} topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}
