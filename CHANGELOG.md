# [0.7.6]() (2020-08-03)

* 修复Alert组件的Input模式
* 修复Alert组件的autoClose属性

### 重要:
* 可能修复了Overlay组件hide操作的时候，在react16(基本RN0.5.x和0.6.x的版本都有问题)中引起的整个路由重置的问题
  
  相关问题: [#336](https://github.com/rilyu/teaset/issues/336) [#248](https://github.com/rilyu/teaset/issues/248)
  [#269](https://github.com/rilyu/teaset/issues/269)
  [#345](https://github.com/rilyu/teaset/issues/345)
  [#304](https://github.com/rilyu/teaset/issues/304)

# [0.7.5]() (2020-07-08)

* 修复Alert警告

# [0.7.4]() (2020-04-27)

* 同步原项目代码，支持RN 0.62.x

# [0.7.0]() (2020-03-22)
## Breaking Change:
* 移除NavigationHelper，单独拆分到[teaset-navigation](https://github.com/yz1311/teaset-navigation)

## Feature
* ActionSheet支持设置item的样式textStyle
* 优化ActionSheet的ts定义
* 将Alert的默认宽度设置为屏幕宽度的0.75



# [0.6.28]() (2020-01-14)
* Theme组件添加几个方法和属性
* 完善ts定义

# [0.6.25]() (2019-12-17)

## Bug Fixed
* 修复Alert组件取消按钮加粗问题
* 修复AlertEditView组件警告问题

## Features
* Example项目可以跑了，将导航替换为react-navigation
  


# [0.6.24]() (2019-12-09)

## Bug Fixed

* 修复Alert组件的autoClose属性无效的问题
* cancel类型的按钮，默认加粗

## Features
* Alert组件添加3个以上按钮支持
* Alert组件添加编辑框模式