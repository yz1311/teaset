import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';
import Label from '../Label/Label';
import Theme from '../../themes/Theme';
import Alert from './Alert';
//分隔符的长(高)度
const SEPARATOR_LENGTH = 1;
const AlertView = ({ title, message, extra, buttons, onButtonPress, style }) => {
    const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
    let realWidth = deviceHeight > deviceWidth ? deviceWidth : deviceHeight;
    let buttonViews = [];
    let index = 0, separatorIndex = 0;
    //2个按钮以下则横向显示,以上纵向显示
    let isRowMode = buttons.length <= 2;
    for (const button of buttons) {
        index++;
        buttonViews.push(<Button key={index} hideAlert={() => {
            Alert.hide();
        }} textColor={button.textColor} textStyle={button.textStyle} text={button.text} style={button.style} onPress={() => {
            let value = onButtonPress && onButtonPress();
            button.onPress && button.onPress(value);
        }}/>);
        if (isRowMode) {
            //分隔符
            if (index < buttons.length) {
                //这里只是计算索引
                separatorIndex++;
                buttonViews.push(<View key={buttons.length + separatorIndex} style={{ width: SEPARATOR_LENGTH, backgroundColor: '#eeeef0' }}/>);
            }
        }
        else {
            //分隔符
            if (index < buttons.length) {
                //这里只是计算索引
                separatorIndex++;
                buttonViews.push(<View key={buttons.length + separatorIndex} style={{ height: SEPARATOR_LENGTH, alignSelf: 'stretch', backgroundColor: '#eeeef0' }}/>);
            }
        }
    }
    let content = message;
    if ((typeof content === 'string' || typeof content === 'number')) {
        content = (<Label numberOfLines={8} type='title' style={{ marginHorizontal: 15 }} size='md' text={content + ''}/>);
    }
    else if (!React.isValidElement(content)) {
        content = (<Label numberOfLines={8} type='title' style={{ marginHorizontal: 15 }} size='md' text={''}/>);
    }
    return (<View style={[{ backgroundColor: '#fff', minWidth: realWidth * 0.7, maxWidth: realWidth * 0.9, paddingTop: 20, borderRadius: 10, alignItems: 'center' }, style]}>
          {title ?
        <Label type='title' style={{ fontSize: 17 * Theme.labelTitleScale, fontWeight: '500', marginHorizontal: 15 }} text={title}/> : null}
          <View style={{ minHeight: 50, paddingVertical: 10, alignSelf: "stretch", alignItems: 'center' }}>
              {content}
              {extra}
          </View>
          <View style={[{ flexDirection: !isRowMode ? 'column' : 'row', borderTopColor: '#eeeef0', borderTopWidth: SEPARATOR_LENGTH, alignSelf: 'stretch' },
        !isRowMode && { height: 45 * buttons.length }]}>
              {buttonViews}
          </View>
      </View>);
};
const Button = ({ hideAlert, text, onPress, style, textColor, textStyle }) => {
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
        onPress && onPress();
    }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 45 }}>
          <Text style={[{ fontWeight: fontWeight, color: textColor == undefined ? defaultTextColor : textColor, fontSize: 16 * Theme.labelTitleScale }, textStyle]}>{text}</Text>
      </TouchableOpacity>);
};
export default AlertView;
//# sourceMappingURL=AlertView.js.map