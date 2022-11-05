import Vue from 'vue'
// import { componentFactory as componentFactory$1 } from 'vue-class-component/lib/component'
import { collectDataFromConstructor } from 'vue-class-component/lib/data'

export const $internalHooks = [
  'data',
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeDestroy',
  'destroyed',
  'beforeUpdate',
  'updated',
  'activated',
  'deactivated',
  'render',
  'errorCaptured', // 2.5
  'serverPrefetch', // 2.6
]

export function componentFactory(Component, options = {}) {
  // 组件名
  options.name = options.name || Component.name

  // 收集原型属性中的方法、生命周期钩子等到 options 对象中
  const proto = Component.prototype
  Object.getOwnPropertyNames(proto).forEach((key) => {
    // 忽略构造函数
    if (key === 'constructor') {
      return
    }

    // 收集内部钩子
    if ($internalHooks.includes(key)) {
      options[key] = proto[key]
      return
    }

    // 收集函数
    if (typeof proto[key] === 'function') {
      if (!options.methods) {
        options.methods = {}
      }
      options.methods[key] = proto[key]
    }
  })

  // 收集类属性，即 data 数据
  if (!options.mixins) {
    options.mixins = []
  }
  options.mixins.push({
    data(vm) {
      return collectDataFromConstructor(vm, Component)
    },
  })

  // 装饰器选项
  const decorators = Component.__decorators__
  if (decorators) {
    decorators.forEach((fn) => fn(options))
    delete Component.__decorators__
  }

  return options
}

// 装饰器函数
export default function Component(options) {
  if (typeof options === 'function') {
    return componentFactory(options)
  }
  return function (Component) {
    return componentFactory(Component, options)
  }
}
