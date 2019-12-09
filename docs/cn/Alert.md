# `<Alert />` 对话框

该组件的定义跟RN官方的Alert定义一样，功能更加强大

* 支持点击按钮可以不关闭Alert(autoClose属性)
* 统一两端的UI和逻辑
* 支持多按钮模式，及每个按钮完全自定义
* 支持输入框模式(Alert.edit)
* 完全typescript支持

注意:`跟官方的Alert组件不一样的是，该Alert默认点击周边均不会点击关闭(RN的iOS不会，但是android会自动关闭)`


## Props

## Events

<!--
## Methods
None.

## Static Props
None.

## Static Methods
None.
-->
```JavaScript
alert(title: string, message?: string | Element | Number, buttons?: AlertButton[], options?: AlertOptions);

edit: (title: string, args?: {message?: string | Element | Number,inputStyle?: TextInputProps}, buttons?: AlertButton[], options?: AlertOptions) => void;

hide: () => void;
```

具体定义，请查看[index.d.ts](../../index.d.ts)

## Example
简单用法
```javascript
//1~2个按钮横排显示，3个按钮及以上，竖排显示
Alert.alert('退出确认','退出当前账号?',[
                                {
                                    text: '取消'
                                },{
                                    text: '确认退出',
                                    style: 'destructive',
                                    onPress: ()=>{
                                        
                                    }
                                }
                            ],{cancelable: false});
```

输入框模式
```javascript
Alert.edit('退出确认',{inputStyle: {defaultValue: '123'}},[
                                    {
                                        text: '取消'
                                    },{
                                        text: '确认退出',
                                        onPress: (value)=>{
                                            //value为输入框的值，可以在这里校验
                                            //默认点击任意按钮，会关闭对话框
                                            //可以通过autoClose=false，进行禁用
                                        }
                                    }
                                ],{cancelable: false});
```

自定义
```javascript
Alert.edit('退出确认',<TextInput />,[
                                    {
                                        text: '取消'
                                    },{
                                        text: '确认退出',
                                        onPress: (value)=>{
                                            
                                        }
                                    }
                                ],{cancelable: false});le={{color: '#8a6d3b', fontSize: 16, paddingLeft: 8}} text='Search' />
```


## Screenshots
![](https://tva1.sinaimg.cn/large/006tNbRwgy1g9q86k5lzej308l042t8s.jpg)

![](https://tva1.sinaimg.cn/large/006tNbRwgy1g9qemepdq2j308i06mq32.jpg)

![](https://tva1.sinaimg.cn/large/006tNbRwgy1g9qelebemdj308l05nwek.jpg)
