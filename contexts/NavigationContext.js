import React from 'react';
import Theme from '../themes/Theme';

export const NavigationContext = React.createContext({
  tintColor: Theme.navTintColor,
});