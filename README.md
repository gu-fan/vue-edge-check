# vue-edge-check

[English](https://github.com/gu-fan/vue-edge-check/blob/master/README_EN.md) / [中文](https://github.com/gu-fan/vue-edge-check#vue-edge-check) 

检查浏览器的边缘是否被触碰。
防止边缘滑动时，`vue-router`中transition的效果重复触发:sparkles:

**Before**

![Odd Effect](https://user-images.githubusercontent.com/579129/34886679-be522206-f7fe-11e7-8ba9-79c7b486a4cc.gif)

**After**

![Good Effect](https://user-images.githubusercontent.com/579129/34886822-58fa617e-f7ff-11e7-98a6-f287992ea749.gif)

## 为啥

iOS的Safari/WKWebview/微信中，可以边缘滑动到上一个和下一个页面。
在滑动完毕后，页面才会触发`history.back()/history.forward()`。
然后router的transition动画还会再次触发，效果就多余了。

因此我们可以检测返回/前进的时候是否触碰到边缘，从而忽略本次效果:sparkles:

## 安装

`npm install vue-edge-check`

或

`yarn add vue-edge-check`


## 使用

引入后，有两个属性 `$isEdgeLeft` 和 `$isEdgeRight`，
代表页面左侧以及页面右侧。

可以用在组件中定义需要的class

引入组件
````javascript
import EdgeCheck from 'vue-edge-check'
Vue.use(EdgeCheck)
````

定义class
````vue
<template>
  <transition name="slide">
    <div class="test" :class="{'is-edge-back':$isEdgeLeft,'is-edge-forward':$isEdgeRight}">
      <h1>
          TEST
      </h1>
    </div>
  </transition>
</template>
````


定义/屏蔽transition效果
````css

// ORIGIN: set slide transition effect time
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

// ORIGIN: add slide transition effect
.slide-enter,
.slide-leave-to
{
  transform: translate3d(100%, 0, 0);
}

// EXTRA: this component should have no transition with edge forward/back
.is-edge-forward.slide-enter-active,
.is-edge-back.slide-leave-active
{
  transition: all 0s;
}

// EXTRA: this component should not display at slide-leave start
// or else it will blink
.is-edge-back.slide-leave,
{
  transform: translate3d(100%, 0, 0);
}

// EXTRA: this component should display and not move at slide-enter start
// or else it will jump
.is-edge-forward.slide-enter,
{
  transform: translate3d(0, 0, 0);
}

````

## 选项

**edge_width**: 默认值: 48

边缘检测的宽度

**edge_duration**: 默认值: 500

页面边缘属性 `$isEdgeLeft/$isEdgeRight`的持续时间,需要略大于效果的时间

````javascript

// in case if you have a longer transition effect
Vue.use(EdgeCheck, {edge_duration:1000})

````
