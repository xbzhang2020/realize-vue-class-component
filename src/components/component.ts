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

export function componentFactory(Component, options: any = {}) {
  // 组件名
  options.name = options.name || Component.name

  // 收集原型属性中的方法、生命周期钩子等到 options 对象中
  const proto = Component.prototype
  Object.getOwnPropertyNames(proto).forEach((key) => {
    // 忽略构造函数
    if (key === 'constructor') {
      return
    }

    // 收集钩子函数
    if ($internalHooks.includes(key)) {
      options[key] = proto[key]
      return
    }

    // 获取属性的特性
    const descriptor = Object.getOwnPropertyDescriptor(proto, key)

    // 收集 methods
    if (typeof descriptor.value === 'function') {
      ;(options.methods || (options.methods = {}))[key] = proto[key]
      return
    }

    // 收集 computed
    if (descriptor.get || descriptor.set) {
      ;(options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.get,
      }
    }

    // 将其他属性收集到 data 中
    if (descriptor.value !== void 0) {
      ;(options.mixins || (options.mixins = [])).push({
        data() {
          return {
            [key]: descriptor.value,
          }
        },
      })
    }
  })

  // 收集类的实例属性作为 data 数据
  ;(options.mixins || (options.mixins = [])).push({
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

  console.log(options)

  return options
}

export default function Component(options) {
  if (typeof options === 'function') {
    return componentFactory(options)
  }
  return function (Component) {
    return componentFactory(Component, options)
  }
}
