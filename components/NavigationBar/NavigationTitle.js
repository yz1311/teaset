// NavigationTitle.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import {TextPropTypes} from 'deprecated-react-native-prop-types';

import Theme from '../../themes/Theme';
import { NavigationContext } from '../../contexts/NavigationContext';

export default class NavigationTitle extends Component {

  static propTypes = {
    ...TextPropTypes,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    ...Text.defaultProps,
    numberOfLines: 1,
    allowFontScaling: false,
  };

  render() {
    let {style, text, children, ...others} = this.props;

    return (
      <NavigationContext.Consumer>
        {({tintColor}) => {
          style = [{
            flex: 1,
            paddingLeft: 4,
            paddingRight: 4,
            textAlign: 'center',
            overflow: 'hidden',
            color: tintColor,
            fontSize: Theme.navTitleFontSize,
          }].concat(style);

          return (
            <Text style={style} {...others}>
              {(text === null || text === undefined) ? children : text}
            </Text>
          );
        }}
      </NavigationContext.Consumer>
    );
  }

}
