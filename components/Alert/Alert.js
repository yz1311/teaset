import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';
import Overlay from '../Overlay/Overlay';
import Label from '../Label/Label';
import Theme from '../../themes/Theme';
//分隔符的长(高)度
const SEPARATOR_LENGTH = 1;
export default class Alert {
}
Alert.alert = (title, message, buttons, options) => {
    const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
    let realWidth = deviceHeight > deviceWidth ? deviceWidth : deviceHeight;
    let buttonViews = [];
    let index = 0, separatorIndex = 0;
    for (const button of buttons) {
        index++;
        buttonViews.push(<Button key={index} hideAlert={() => {
            Alert.hide();
        }} autoClose={options.autoClose} text={button.text} style={button.style} onPress={button.onPress}/>);
        //分隔符
        if (index < buttons.length) {
            //这里只是计算索引
            separatorIndex++;
            buttonViews.push(<View key={buttons.length + separatorIndex} style={{ width: SEPARATOR_LENGTH, backgroundColor: '#eeeef0' }}/>);
        }
    }
    let content = message;
    if (typeof message === 'string' || typeof message === 'number') {
        content = (<Label numberOfLines={8} type='title' style={{ marginTop: 6, marginHorizontal: 15, marginBottom: 20 }} size='md' text={message}/>);
    }
    let overlayView = (<Overlay.PopView modal={options && options.cancelable ? false : true} autoKeyboardInsets onDisappearCompleted={() => {
        if (options && options.onDismiss) {
            options.onDismiss();
        }
    }} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: '#fff', minWidth: realWidth * 0.7, maxWidth: realWidth * 0.9, paddingTop: 20, borderRadius: 10, alignItems: 'center' }}>
          {title ?
        <Label type='title' style={{ fontSize: 17 * Theme.labelTitleScale, fontWeight: '500', marginHorizontal: 15 }} text={title}/> : null}
          {content}
          <View style={{ flexDirection: 'row', borderTopColor: '#eeeef0', borderTopWidth: SEPARATOR_LENGTH }}>
            {buttonViews}
          </View>
        </View>
      </Overlay.PopView>);
    Alert.overlayKey = Overlay.show(overlayView);
};
Alert.hide = () => {
    Overlay.hide(Alert.overlayKey);
};
const Button = ({ hideAlert, text, onPress, style, autoClose = true }) => {
    let textColor = '#2087fa';
    switch (style) {
        case 'cancel':
            break;
        case 'destructive':
            textColor = '#f34638';
            break;
    }
    return (<TouchableOpacity activeOpacity={0.7} onPress={() => {
        if (autoClose) {
            hideAlert && hideAlert();
        }
        onPress && onPress();
    }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 45 }}>
      <Text style={{ color: textColor, fontSize: 16 * Theme.labelTitleScale }}>{text}</Text>
    </TouchableOpacity>);
};
//# sourceMappingURL=Alert.js.map