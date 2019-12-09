import React, { forwardRef, useImperativeHandle, useState } from "react";
import { PixelRatio, TextInput, View } from "react-native";
const AlertEditView = (props, ref) => {
    const [value, setValue] = useState(props && props.defaultValue ? props.defaultValue : '');
    useImperativeHandle(ref, () => ({
        getValue: () => {
            return value;
        }
    }));
    return (<View style={{ marginVertical: 15, alignSelf: 'stretch', marginHorizontal: 15,
        paddingHorizontal: 6,
        borderWidth: 1 / PixelRatio.get(), borderColor: '#d9d9d9', borderRadius: 0 }}>
            <TextInput style={{ alignSelf: 'stretch', height: 38 }} {...(props || {})} value={value} onChangeText={(value) => {
        setValue(value);
    }}/>
        </View>);
};
AlertEditView.defaultProps = {
    placeholder: '请输入'
};
const ForwardAlertEditView = forwardRef(AlertEditView);
export default ForwardAlertEditView;
//# sourceMappingURL=AlertEditView.js.map