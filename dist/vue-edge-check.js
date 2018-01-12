'use strict';

var plugin = {
  timerL: null,
  timerR: null,
  screen: {x: -1, y: -1},
  touch: {x: -1, y: -1},
  options: {
    EDGE_WIDTH: 48,
    TRANSITION_TIME: 500
  },
  actions: {
    touchstart: function touchstart (e) {

      if (e.touches.length != 1) { return }

      var EDGE_WIDTH = plugin.options.EDGE_WIDTH;
      var TRANSITION_TIME = plugin.options.TRANSITION_TIME;

      plugin.screen.x = window.screen.width;
      plugin.screen.y = window.screen.height;
      plugin.touch.x = e.touches[0].clientX;
      plugin.touch.y = e.touches[0].clientY;

      if (plugin.touch.x >= 0 && plugin.touch.x < EDGE_WIDTH) {
        plugin.vm.isLeft = true;
        return
      } else {
        plugin.vm.isLeft = false;
      }

      if (plugin.screen.x - plugin.touch.x < EDGE_WIDTH) {
        plugin.vm.isRight = true;

        // Reset Right in 800 + 500 ms,
        // as there is no touchend event on forwarding page.
        if (plugin.timerR) { clearTimeout(plugin.timerR); }
        plugin.timerR = setTimeout(function () {
          plugin.vm.isRight = false;
        }, 800 + TRANSITION_TIME);

      } else {

        plugin.vm.isRight = false;

      }
    },
    touchend: function touchend (e) {

      // no need to reset
      if (!plugin.vm.isLeft) { return }
      
      // Reset Left after touchend + 500ms
      if (plugin.timerL) { clearTimeout(plugin.timerL); }
      plugin.timerL = setTimeout(function () {
        plugin.vm.isLeft = false;
      }, plugin.options.TRANSITION_TIME);
    }
  },
  bindEvents: function bindEvents () {
    if (window && window.document) {
      window.document.addEventListener('touchstart', plugin.actions.touchstart, false);
      window.document.addEventListener('touchend', plugin.actions.touchend, false);
      return true
    } else {
      return false
    }
  },
  setupVM: function setupVM () {
    plugin.vm = new plugin.Vue({data: {isLeft: false, isRight: false}});
  },
  setupProperty: function setupProperty () {
    Object.defineProperties(plugin.Vue.prototype, {
      '$isEdgeLeft': {
        'get': function () {
          return plugin.vm.isLeft
        },
        'set': function (value) {
          plugin.vm.isLeft = value;
        }
      }
    });

    Object.defineProperties(plugin.Vue.prototype, {
      '$isEdgeRight': {
        'get': function () {
          return plugin.vm.isRight
        },
        'set': function (value) {
          plugin.vm.isRight = value;
        }
      }
    });
  },
  install: function install (Vue, options) {

    if (plugin.installed) { return }

    if (!plugin.bindEvents()) {
      throw new Error('[vue-edge-back] Can only be used in browser.')
    }

    if (options) {
      if (options.edge_width) { plugin.options.EDGE_WIDTH = options.edge_width; }
      if (options.transition_time) { plugin.options.TRANSITION_TIME = options.transition_time; }
    }

    plugin.Vue = Vue;
    plugin.setupVM();
    plugin.setupProperty();
    plugin.installed = true;

  }
};

module.exports = plugin;
