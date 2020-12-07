import {
  AlertButton, Text, TouchableOpacity, View, Dimensions, PixelRatio, TextInputProps, TextInput,
} from 'react-native';
import React, { FC } from 'react';
import Overlay from '../Overlay/Overlay';
import Label from '../Label/Label';
import Theme from '../../themes/Theme';
import AlertEditView from './AlertEditView';

interface AlertOptions {
/** @platform android/ios,默认值:false,(注意,RN的Alert组件，android下该值为true) */
cancelable?: boolean;
/** @platform android/ios */
onDismiss?: () => void;
/** 点击按钮后自动关闭,默认值:true */
autoClose?: boolean;
overlay?: any;
}

//分隔符的长(高)度
const SEPARATOR_LENGTH = 1;

export default class Alert {

static overlayKey;

static alert = (title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions): void => {
  const {width: deviceWidth,height: deviceHeight} = Dimensions.get('window');
  let realWidth = deviceHeight>deviceWidth?deviceWidth:deviceHeight;
  //默认点击按钮关闭
  let autoClose = options&&options.autoClose!=undefined?options.autoClose:true;
  let buttonViews = [];
  let index = 0;
  for (const button of buttons)
  {
    index++;
    buttonViews.push(
        <Button
            key={index}
            hideAlert ={()=>{
              Alert.hide();
            }}
            autoClose={autoClose}
            text={button.text}
            style={button.style}
            onPress={button.onPress}
        />
    );
    //分隔符
    if(index < buttons.length){
      index++;
      buttonViews.push(
          <View key={index} style={{width: SEPARATOR_LENGTH,backgroundColor: '#eeeef0'}}/>
      );
    }
  }
  let overlayView = (
      <Overlay.PopView
          modal={options&&options.cancelable?false:true}
          onDisappearCompleted={()=>{
            if(options && options.onDismiss) {
              options.onDismiss();
            }
          }}
          style={{alignItems: 'center', justifyContent: 'center'}}
          {...(options&&options.overlay||{})}
      >
        <View style={{backgroundColor: '#fff', minWidth: realWidth*0.75, maxWidth: realWidth * 0.9, paddingTop: 20, borderRadius: 10, alignItems: 'center'}}>
          {title?
              <Label type='title' style={{fontSize: 17*Theme.labelTitleScale,fontWeight:'500',marginHorizontal:15}} text={title} />
              :
              <View style={{height: 10}}/>}
          {React.isValidElement(message) ?
              message
              :
              <Label numberOfLines={8} type='title' style={{marginTop: 6, marginHorizontal: 15, marginBottom: 20}}
                     size='md' text={message}/>
          }
          <View style={{flexDirection:'row',borderTopColor: '#eeeef0',borderTopWidth: SEPARATOR_LENGTH}}>
            {buttonViews}
          </View>
        </View>
      </Overlay.PopView>
  );
  Alert.overlayKey = Overlay.show(overlayView);
};

static edit = (title: string, inuptProps: TextInputProps, buttons?: AlertButton[], options?: AlertOptions): void => {
  const {width: deviceWidth,height: deviceHeight} = Dimensions.get('window');
  let realWidth = deviceHeight>deviceWidth?deviceWidth:deviceHeight;
  //默认点击按钮关闭
  let autoClose = options&&options.autoClose!=undefined?options.autoClose:true;
  let buttonViews = [];
  let index = 0;
  let tempMessage = inuptProps&&inuptProps.defaultValue || '';
  for (const button of buttons)
  {
    index++;
    buttonViews.push(
        <Button
            key={index}
            hideAlert ={()=>{
              Alert.hide();
            }}
            autoClose={autoClose}
            text={button.text}
            style={button.style}
            onPress={()=>button.onPress&&button.onPress(tempMessage)}
        />
    );
    //分隔符
    if(index < buttons.length){
      index++;
      buttonViews.push(
          <View key={index} style={{width: SEPARATOR_LENGTH,backgroundColor: '#eeeef0'}}/>
      );
    }
  }
  let overlayView = (
      <Overlay.PopView
          modal={options&&options.cancelable?false:true}
          onDisappearCompleted={()=>{
            if(options && options.onDismiss) {
              options.onDismiss();
            }
          }}
          autoKeyboardInsets={true}
          style={{alignItems: 'center', justifyContent: 'center'}}
          {...(options&&options.overlay||{})}
      >
        <View style={{backgroundColor: '#fff', minWidth: realWidth*0.75, maxWidth: realWidth * 0.9, paddingTop: 20, borderRadius: 10, alignItems: 'center'}}>
          {title?
              <Label type='title' style={{fontSize: 17*Theme.labelTitleScale,fontWeight:'500',marginHorizontal:15}} text={title} />
              :
              <View style={{height: 10}}/>}
          <AlertEditView
              {...(inuptProps||{})}
              onChangeText={val=>{
                  tempMessage = val;
                  inuptProps.onChangeText&&inuptProps.onChangeText(val);
              }}
              />
          <View style={{flexDirection:'row',borderTopColor: '#eeeef0',borderTopWidth: SEPARATOR_LENGTH}}>
            {buttonViews}
          </View>
        </View>
      </Overlay.PopView>
  );
  Alert.overlayKey = Overlay.show(overlayView);
};

static hide = () => {
  Overlay.hide(Alert.overlayKey);
}
}


const Button:FC<any> = ({hideAlert, text, onPress, style, autoClose})=>{
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
          if(autoClose) {
            hideAlert&&hideAlert();
          }
          onPress&&onPress();
        }}
        style={{flex:1,justifyContent:'center',alignItems:'center',height:45}}
    >
      <Text style={{color: textColor,fontSize: 16*Theme.labelTitleScale}}>{text}</Text>
    </TouchableOpacity>
);
}
