import {
    AlertButton, AlertOptions, Text, TouchableOpacity, View, Dimensions, PixelRatio, ViewStyle, StyleProp
  } from 'react-native';
  import React, { FC } from 'react';
  import Overlay from '../Overlay/Overlay';
  import Label from '../Label/Label';
  import Theme from '../../themes/Theme';

  //分隔符的长(高)度
const SEPARATOR_LENGTH = 1;

export interface IProps {
    style?:StyleProp<ViewStyle>,
    title: string, 
    message?: string, 
    buttons?: AlertButton[],
    onButtonPress?: any
}

const AlertView:FC<IProps> = ({title, message, buttons,onButtonPress,style})=>{
    const {width: deviceWidth,height: deviceHeight} = Dimensions.get('window');
    let realWidth = deviceHeight>deviceWidth?deviceWidth:deviceHeight;
    let buttonViews = [];
    let index = 0,separatorIndex=0;
    for (const button of buttons)
    {
      index++;
      buttonViews.push(
        <Button
          key={index}
          hideAlert ={()=>{
            Alert.hide();
          }}
          text={button.text}
          style={button.style}
          onPress={()=>{
            onButtonPress&&onButtonPress();
            button.onPress&&button.onPress();
          }}
        />
      );
      //分隔符
      if(index < buttons.length){
        //这里只是计算索引
        separatorIndex++;
        buttonViews.push(
          <View key={buttons.length+separatorIndex} style={{width: SEPARATOR_LENGTH,backgroundColor: '#eeeef0'}}/>
        );
      }
    }
    let content = message;
    if (typeof message === 'string' || typeof message === 'number') {
      content = (
        <Label numberOfLines={8} type='title' style={{marginTop: 6,marginHorizontal:15,marginBottom:20}} size='md' text={message} />
      );
    }
    return (
        <View style={[{backgroundColor: '#fff', minWidth: realWidth*0.7, maxWidth: realWidth * 0.9, paddingTop: 20, borderRadius: 10, alignItems: 'center'},style]}>
          {title?
          <Label type='title' style={{fontSize: 17*Theme.labelTitleScale,fontWeight:'500',marginHorizontal:15}} text={title} />:null}
          {content}
          <View style={{flexDirection:'row',borderTopColor: '#eeeef0',borderTopWidth: SEPARATOR_LENGTH}}>
            {buttonViews}
          </View>
        </View>
    );
}

const Button:FC<any> = ({hideAlert, text, onPress, style})=>{
    let textColor = '#2087fa';
    switch (style) {
      case 'cancel':
  
        break;
      case 'destructive':
        textColor = '#f34638';
        break;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>{
          onPress&&onPress();
        }}
        style={{flex:1,justifyContent:'center',alignItems:'center',height:45}}
      >
        <Text style={{color: textColor,fontSize: 16*Theme.labelTitleScale}}>{text}</Text>
      </TouchableOpacity>
    );
  }


  export default AlertView;