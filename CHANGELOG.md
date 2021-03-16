# [0.7.22]() (2021-03-15)
* 修复对RN0.64的兼容性支持

# [0.7.20]() (2021-02-24)
* 修复`Badge`的ts定义

# [0.7.19]() (2020-11-30)
* Alert添加`messageStyle`全局设置

# [0.7.12]() (2020-11-15)
* 修复`SegmentedBar`的ts定义

# [0.7.11]() (2020-11-11)
* ios刘海屏适配iphone 12[#438](https://github.com/rilyu/teaset/commit/da0a9b7f4889e6dd3b6cfb29ff4ce2d560d30955)


# [0.7.10]() (2020-08-21)
* 彻底修复Overlay组件引起路由重启的问题

# [0.7.9]() (2020-08-17)

* 修复0.7.6版本遗漏的对`Overlay`组件的`hide`延时操作

# [0.7.8]() (2020-08-13)

* `ListRow`组件添加`required`、`requiredStyle`两个属性，来显示表单是否必填

# [0.7.7]() (2020-08-03)

* `Theme`组件添加`fontSizeAndColor`方法，简化Text/TextInput等组件对文字大小和颜色的写法

# [0.7.6]() (2020-08-02)

* 修复`Alert`组件的`Input`模式
* 修复`Alert`组件的`autoClose`属性

### 重要:
* 可能修复了`Overlay`组件`hide`操作的时候，在react16(基本RN0.5.x和0.6.x的版本都有问题)中引起的整个路由重置的问题
  
  相关问题: [#336](https://github.com/rilyu/teaset/issues/336) [#248](https://github.com/rilyu/teaset/issues/248)
  [#269](https://github.com/rilyu/teaset/issues/269)
  [#345](https://github.com/rilyu/teaset/issues/345)
  [#304](https://github.com/rilyu/teaset/issues/304)

# [0.7.5]() (2020-07-08)

* 修复`Alert`警告

# [0.7.4]() (2020-04-27)

* 同步原项目代码，支持RN 0.62.x

# [0.7.0]() (2020-03-22)
## Breaking Change:
* 移除`NavigationHelper`，单独拆分到[teaset-navigation](https://github.com/yz1311/teaset-navigation)

## Feature
* `ActionSheet`支持设置item的样式`textStyle`
* 优化`ActionSheet`的ts定义
* 将`Alert`的默认宽度设置为屏幕宽度的0.75



# [0.6.28]() (2020-01-14)
* `Theme`组件添加几个方法和属性
* 完善ts定义

# [0.6.25]() (2019-12-17)

## Bug Fixed
* 修复`Alert`组件取消按钮加粗问题
* 修复`AlertEditView`组件警告问题

## Features
* Example项目可以跑了，将导航替换为`react-navigation`
  


# [0.6.24]() (2019-12-09)

## Bug Fixed

* 修复`Alert`组件的`autoClose`属性无效的问题
* `cancel`类型的按钮，默认加粗

## Features
* `Alert`组件添加3个以上按钮支持
* `Alert`组件添加编辑框模式
