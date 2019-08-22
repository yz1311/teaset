# `NavigationHelper` 导航帮助工具
NavigationHelper 工具定义了一系列导航方法，可以在全局任意地方直接调用，而不用传递`navigation`对象或者使用高阶[withNavigation](https://reactnavigation.org/docs/en/with-navigation.html#docsNav)。(注意，目前只支持stack路由栈)



## Static Props
| Prop | Type | Default | Note |
|---|---|---|---|
| [navigation](#navigationbartitle--props) | object |  | 栈顶的路由对象
| [navRouters](#navigationbarbutton--props) | object |  | 整个路由栈对象


## Static Methods
| Prop | Type | Default | Note |
|---|---|---|---|
| [goBack](#navigationbartitle--props) | function |  | 返回到上一页面
| [push](#navigationbarbutton--props) | function |  | 入栈，直接压入新的页面
| [navigate](#navigationbarbutton--props) | function |  | 入栈，跟push类似，但是如果前面存在该页面，则返回到已存在的页面
| [resetTo](#navigationbarbutton--props) | function |  | 返回到某一页面
| [replace](#navigationbarbutton--props) | function |  | 替换栈顶页面
| [popN](#navigationbarbutton--props) | function |  | 弹出N个页面
| [popToTop](#navigationbarbutton--props) | function |  | 弹出到栈底
| [popToIndex](#navigationbarbutton--props) | function |  | 弹出到某个页面
| [popToRoute](#navigationbarbutton--props) | function |  | 弹出到某个页面(根据route名称)




## 初始化
##### 1.在根入口初始化导航帮助工具
```
import {ListRow, Theme, NavigationHelper} from "@yz1311/teaset";

//第二个参数是挂载到全局的参数名称，不传默认为`NavigationHelper`
NavigationHelper.init(NavigationHelper);
```

##### 2.消除eslint和typescript的错误(不使用eslint和typescript可跳过该步骤)
在`.eslintrc.js`中加入
```javascript
"globals":{
    /** ... **/
    "NavigationHelper": true  //如果第一步有修改请传修改后的名称
}
```

添加`global.d.ts`文件,加入下面代码(如果不需要全局调用，请跳过该步骤)

```javascript
declare var NavigationHelper: {
  navigation: any,
  navRouters: any,
  isTopScreen: (key:string) => boolean,
  goBack: () => void,
  push: (routeName: string, params?) => void,
  navigate: (routeName:string, params?) => void,
  resetTo: (routeName:string,params?:any) => void,
  replace: (routeName:string, params?) => void,
  popN: (num:number) => void,
  popToTop: () => void,
  popToIndex: (indexOfRoute:number) => void,
  popToRoute: (routeName:string) => void,
};
```

##### 3.更新navigation对象

在`createStackNavigator`的`defaultNavigationOptions`方法([具体参考](https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig))中更新navigation对象
```javascript
defaultNavigationOptions:({navigation})=>{
    NavigationHelper.updateNavigation(navigation);
}
```

##### 4.更新routers对象

在appContainer的`onNavigationStateChange`方法([具体参考](https://reactnavigation.org/docs/en/app-containers.html#onnavigationstatechangeprevstate-newstate-action))中更新routers对象
```javascript
onNavigationStateChange={(prevState, currentState, action) => {
                      NavigationHelper.updateRouters(currentState.routes);
                    }}
```


## 常用使用方法

```javascript
import {NavigationHelper} from "@yz1311/teaset"; //如果有进行上面初始化步骤1和2，可以直接从global中获取NavigationHelper对象

//在任意代码中均可调用，会进行出栈操作
NavigationHelper.goBack();
...
```


## 实用例子
安卓多次返回退出app

> 在app的最顶层注册安卓返回事件，可以通过路由栈实现该功能,代码如下:

```javascript
_onBackAndroid = () => {
        if(NavigationHelper.navRouters.length>1) {
            // 默认行为： 退出当前界面。
            NavigationHelper.goBack();
            return true;
        }

        let now = new Date().getTime();
        if (now - lastClickTime < 2500) return false;

        lastClickTime = now;
        this.props.dispatch(showToast('再按一次退出'+appName));
        return true;
    }

```


## 注意事项

> 1.navRouters并不能作为页面初始化的时候的判断依据,譬如跳转到页面A，在A中的componentDidMount中获取该navRouters时，此时的navRouters数组中，可能还没有页面A.
但是页面稳定后，可以利用该值判断，譬如上面对退出返回的处理

