import { Text, TouchableOpacity, View, Dimensions, } from 'react-native';
import React from 'react';
import Overlay from '../Overlay/Overlay';
import Label from '../Label/Label';
import Theme from '../../themes/Theme';
import AlertEditView from './AlertEditView';
//分隔符的长(高)度
const SEPARATOR_LENGTH = 1;
export default class Alert {
}
Alert.maxWidth = null;
Alert.alert = (title, message, buttons, options) => {
    const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
    let realWidth = deviceHeight > deviceWidth ? deviceWidth : deviceHeight;
    //默认点击按钮关闭
    let autoClose = options && options.autoClose != undefined ? options.autoClose : true;
    let buttonViews = [];
    let index = 0;
    for (const button of buttons) {
        index++;
        buttonViews.push(<Button key={index} hideAlert={() => {
            Alert.hide();
        }} autoClose={autoClose} text={button.text} style={button.style} textColor={button.textColor} textStyle={button.textStyle} onPress={button.onPress}/>);
        //分隔符
        if (index < buttons.length) {
            index++;
            buttonViews.push(<View key={index} style={{ width: SEPARATOR_LENGTH, backgroundColor: '#eeeef0' }}/>);
        }
    }
    let overlayView = (<Overlay.PopView modal={options && options.cancelable ? false : true} onDisappearCompleted={() => {
        if (options && options.onDismiss) {
            options.onDismiss();
        }
    }} style={{ alignItems: 'center', justifyContent: 'center' }} {...(options && options.overlay || {})}>
        <View style={{ backgroundColor: '#fff', minWidth: realWidth * 0.75, maxWidth: Alert.maxWidth || realWidth * 0.9, paddingTop: 20, borderRadius: 10, alignItems: 'center' }}>
          {title ?
        <Label type='title' style={{ fontSize: 17 * Theme.labelTitleScale, fontWeight: '500', marginHorizontal: 15 }} text={title}/>
        :
            <View style={{ height: 10 }}/>}
          {React.isValidElement(message) ?
        message
        :
            <Label numberOfLines={8} type='title' style={[{ marginTop: 6, marginHorizontal: 15, marginBottom: 20, lineHeight: Theme.px2dp(42) }, Alert.messageStyle]} size='md' text={message}/>}
          <View style={{ flexDirection: 'row', borderTopColor: '#eeeef0', borderTopWidth: SEPARATOR_LENGTH }}>
            {buttonViews}
          </View>
        </View>
      </Overlay.PopView>);
    Alert.overlayKey = Overlay.show(overlayView);
};
Alert.edit = (title, inuptProps, buttons, options) => {
    const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
    let realWidth = deviceHeight > deviceWidth ? deviceWidth : deviceHeight;
    //默认点击按钮关闭
    let autoClose = options && options.autoClose != undefined ? options.autoClose : true;
    let buttonViews = [];
    let index = 0;
    let tempMessage = inuptProps && inuptProps.defaultValue || '';
    for (const button of buttons) {
        index++;
        buttonViews.push(<Button key={index} hideAlert={() => {
            Alert.hide();
        }} autoClose={autoClose} text={button.text} style={button.style} textColor={button.textColor} textStyle={button.textStyle} onPress={() => button.onPress && button.onPress(tempMessage)}/>);
        //分隔符
        if (index < buttons.length) {
            index++;
            buttonViews.push(<View key={index} style={{ width: SEPARATOR_LENGTH, backgroundColor: '#eeeef0' }}/>);
        }
    }
    let overlayView = (<Overlay.PopView modal={options && options.cancelable ? false : true} onDisappearCompleted={() => {
        if (options && options.onDismiss) {
            options.onDismiss();
        }
    }} autoKeyboardInsets={true} style={{ alignItems: 'center', justifyContent: 'center' }} {...(options && options.overlay || {})}>
        <View style={{ backgroundColor: '#fff', minWidth: realWidth * 0.75, maxWidth: Alert.maxWidth || realWidth * 0.9, paddingTop: 20, borderRadius: 10, alignItems: 'center' }}>
          {title ?
        <Label type='title' style={{ fontSize: 17 * Theme.labelTitleScale, fontWeight: '500', marginHorizontal: 15 }} text={title}/>
        :
            <View style={{ height: 10 }}/>}
          <AlertEditView {...(inuptProps || {})} onChangeText={val => {
        tempMessage = val;
        inuptProps.onChangeText && inuptProps.onChangeText(val);
    }}/>
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
const Button = ({ hideAlert, text, onPress, style, autoClose, textColor, textStyle }) => {
    let defaultTextColor = '#2087fa';
    let fontWeight = 'normal';
    switch (style) {
        case 'cancel':
            fontWeight = 'bold';
            break;
        case 'destructive':
            defaultTextColor = '#f34638';
            break;
    }
    return (<TouchableOpacity activeOpacity={0.7} onPress={() => {
        if (autoClose) {
            hideAlert && hideAlert();
        }
        onPress && onPress();
    }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 45 }}>
      <Text style={[{ fontWeight: fontWeight, color: textColor == undefined ? defaultTextColor : textColor, fontSize: 16 * Theme.labelTitleScale }, textStyle]}>{text}</Text>
    </TouchableOpacity>);
};
//# sourceMappingURL=Alert.js.map