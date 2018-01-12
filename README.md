# vue-edge-check

English / 中文

检查浏览器的边缘是否被触碰。
防止`vue-router`中transition的效果重复触发:sparkles:

`Before`
![Odd Effect](https://user-images.githubusercontent.com/579129/34884998-79c29d5a-f7f9-11e7-9e86-a146ad1c54e0.gif)
`After`
![Good Effect](https://user-images.githubusercontent.com/579129/34885507-2f6cbd24-f7fb-11e7-93e4-6739f6afa1f9.gif)

## 原理

iOS的Safari/WKWebview/微信中，可以边缘滑动到上一个和下一个页面。
在滑动完毕后，页面才会触发`history.back()/history.forward()`。
然后router的transition动画还会再次触发，效果就多余了:sparkles:

## 安装

`npm install vue-edge-check`
OR 
`yarn add vue-edge-check`


## 使用


在页面中，会存在两个属性 `$isEdgeLeft` 和 `$isEdgeRight`，
代表在左侧以及在右侧。
可以用来定义

main.js
````javascript
import EdgeCheck from '@/plugin/vue-edge-check'
Vue.use(EdgeCheck)
````

Trans.vue template
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


Trans.vue style
````css

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to
{
  transform: translate3d(100%, 0, 0);
}

// this component should have no transition with edge forward/back
.is-edge-forward.slide-enter-active,
.is-edge-back.slide-leave-active
{
  transition: all 0s;
}

// this component should not display at slide-leave start
// or else it will blink
.is-edge-back.slide-leave,
{
  transform: translate3d(100%, 0, 0);
}

// this component should display and not move at slide-enter start
// or else it will jump
.is-edge-forward.slide-enter,
{
  transform: translate3d(0, 0, 0);
}

````





