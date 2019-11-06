import React from 'react';
import Overlay from '../Overlay/Overlay';
import AlertView from './AlertView';
//分隔符的长(高)度
const SEPARATOR_LENGTH = 1;
export default class Alert {
}
Alert.alert = (title, message, buttons, options) => {
    let overlayView = (<Overlay.PopView modal={options && options.cancelable ? false : true} autoKeyboardInsets onDisappearCompleted={() => {
        if (options && options.onDismiss) {
            options.onDismiss();
        }
    }} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <AlertView title={title} message={message} buttons={buttons} onButtonPress={() => {
        if (!options || options.autoClose != true) {
            Alert.hide();
        }
    }}/>
      </Overlay.PopView>);
    Alert.overlayKey = Overlay.show(overlayView);
};
Alert.hide = () => {
    Overlay.hide(Alert.overlayKey);
};
//# sourceMappingURL=Alert.js.map