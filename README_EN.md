# vue-edge-check

[English](https://github.com/gu-fan/vue-edge-check/blob/master/README_EN.md) / [中文](https://github.com/gu-fan/vue-edge-check#vue-edge-check) 

Check Browser Edge Reactively.To prevent transition effect triggered oddly when swipe edge with `vue-router`:sparkles:

**Before**

![Odd Effect](https://user-images.githubusercontent.com/579129/34886679-be522206-f7fe-11e7-8ba9-79c7b486a4cc.gif)

**After**

![Good Effect](https://user-images.githubusercontent.com/579129/34886822-58fa617e-f7ff-11e7-98a6-f287992ea749.gif)


## Why & How ?

You can swipe with edge gesture in iOS Safari/WKWebview/Wechat.
The page will trigger `history.back()/history.forward()` after the 
page is sliding finished.
then the transition animation of router will still triggering,
that's redundant.

So we can check if we touch the edge when move back/forward, then
block current transition effect :sparkles:


## Install

`npm install vue-edge-check`

OR

`yarn add vue-edge-check`

## Useage

Two Propery `$isEdgeLeft` 和 `$isEdgeRight`，
Means left edge and right edge of page

can be used to define class in components

import and use
````javascript
import EdgeCheck from 'vue-edge-check'
Vue.use(EdgeCheck)
````

define class
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


define / block transition effect
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

## Options

**edge_width**: default: 48

the width of edge check

**edge_duration**: default: 500

the `$isEdgeLeft/$isEdgeRight` property lasting time, need a bit more than transition effect time

````javascript

// in case if you have a longer transition effect
Vue.use(EdgeCheck, {edge_duration:1000})

````
