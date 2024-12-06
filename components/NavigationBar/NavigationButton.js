// NavigationButton.js

'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import { NavigationContext } from '../../contexts/NavigationContext';

export default class NavigationButton extends Component {

  static propTypes = {
  };

  static defaultProps = {
    hitSlop: {top: 12, bottom: 12, left: 8, right: 8},
  };

  buildStyle() {
    let {style} = this.props;
    style = [{
      backgroundColor: 'rgba(0, 0, 0, 0)',
      paddingLeft: 6,
      paddingRight: 6,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    }].concat(style);
    return style;
  }

  renderTitle() {
    return this.props.children;
  }

  render() {
    return (
      <NavigationContext.Consumer>
        {({tintColor}) => (
          <TouchableOpacity style={this.buildStyle()} {...this.props}>
            {this.renderTitle()}
          </TouchableOpacity>
        )}
      </NavigationContext.Consumer>
    );
  }

}