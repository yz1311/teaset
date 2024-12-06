import React from 'react';

export const TopViewContext = React.createContext({
  registerTopViewHandler: () => {},
  unregisterTopViewHandler: () => {},
}); 