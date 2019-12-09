import {
  AlertButton, AlertOptions, Text, TouchableOpacity, View, Dimensions, PixelRatio, StyleProp, TextInputProps
} from 'react-native';
import React, { FC } from 'react';
import Overlay from '../Overlay/Overlay';
import Label from '../Label/Label';
import Theme from '../../themes/Theme';
import AlertView from './AlertView';
import AlertEditView from './AlertEditView';

//分隔符的长(高)度
const SEPARATOR_LENGTH = 1;

export default class Alert {

  static overlayKey;

  static alert = (title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions&{autoClose?:boolean}): void => {


    let overlayView = (
      <Overlay.PopView
        modal={options&&options.cancelable?false:true}
        autoKeyboardInsets
        onDisappearCompleted={()=>{
          if(options && options.onDismiss) {
            options.onDismiss();
          }
        }}
        style={{alignItems: 'center', justifyContent: 'center'}}
      >
        <AlertView
          title={title}
          message={message}
          buttons={buttons}
          onButtonPress={
            ()=>{
            if(!options || options.autoClose==undefined || options.autoClose==true) {
                Alert.hide();
              }
            }
          }
        />
      </Overlay.PopView>
    );
    Alert.overlayKey = Overlay.show(overlayView);
  };

  static edit = (title: string, args?: {message?: string,inputStyle?:TextInputProps}, buttons?: AlertButton[], options?: AlertOptions&{autoClose?:boolean}): void => {
      if(!args) {
          args = {

          };
      }
      let editViewRef;
      let overlayView = (
          <Overlay.PopView
              modal={options&&options.cancelable?false:true}
              autoKeyboardInsets
              onDisappearCompleted={()=>{
                  if(options && options.onDismiss) {
                      options.onDismiss();
                  }
              }}
              style={{alignItems: 'center', justifyContent: 'center'}}
          >
              <AlertView
                  title={title}
                  message={args&&args.message}
                  extra={(<AlertEditView
                      ref={ref=>editViewRef=ref}
                      {...(args&&args.inputStyle||{placeholder:'请输入'})}
                  />) as any}
                  buttons={buttons}
                  onButtonPress={
                      ()=>{
                          if(!options || options.autoClose==undefined || options.autoClose==true) {
                              Alert.hide();
                          }
                          return editViewRef.getValue();
                      }
                  }
              />
          </Overlay.PopView>
      );
      Alert.overlayKey = Overlay.show(overlayView);
  }

  static hide = () => {
    Overlay.hide(Alert.overlayKey);
  }
}