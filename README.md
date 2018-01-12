# vue-edge-check

English / 中文

检查浏览器的边缘是否被触碰。
防止`vue-router`中transition的效果重复触发:sparkles:

**Before**

![Odd Effect](https://user-images.githubusercontent.com/579129/34886679-be522206-f7fe-11e7-8ba9-79c7b486a4cc.gif)

**After**

![Good Effect](https://user-images.githubusercontent.com/579129/34886822-58fa617e-f7ff-11e7-98a6-f287992ea749.gif)

## 原理

iOS的Safari/WKWebview/微信中，可以边缘滑动到上一个和下一个页面。
在滑动完毕后，页面才会触发`history.back()/history.forward()`。
然后router的transition动画还会再次触发，效果就多余了:sparkles:

## 安装

`npm install vue-edge-check`

OR 

`yarn add vue-edge-check`


## 使用

引入后，有两个属性 `$isEdgeLeft` 和 `$isEdgeRight`，
代表页面左侧以及页面右侧。

可以用来定义需要的class或者组件

main.js 引入组件
````javascript
import EdgeCheck from '@/plugin/vue-edge-check'
Vue.use(EdgeCheck)
````

Trans.vue 定义class名称
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


Trans.vue 定义css效果
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


