
import React, {Component} from 'react';

import {TeaNavigator, Theme} from '@yz1311/teaset';
import TeasetExampleHome from './views/Home';

export default class App extends Component<{}> {
  render() {
    return <TeaNavigator rootView={<TeasetExampleHome />} />;
  }
}
