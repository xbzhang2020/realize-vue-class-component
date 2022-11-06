// 创建装饰器
export function createDecorator(factory: (options, key) => void) {
  return (target: any, key?: any) => {
    const Ctor: any = typeof target === 'function' ? target : target.constructor
    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = []
    }

    Ctor.__decorators__.push((options) => factory(options, key))
  }
}

// 日志装饰器
export const Log = createDecorator((options, key) => {
  // 保留原始方法
  const originalMethod = options.methods[key]
  options.methods[key] = function wrapperMethod(...args) {
    // 打印日志
    console.log(`Invoked: ${key}`)
    // 调用原始方法
    originalMethod.apply(this, args)
  }
})

export const Prop = (propOption?) => {
  return createDecorator((options, key) => {
    ;(options.mixins || (options.mixins = [])).push({
      props: propOption ? { [key]: propOption } : [key],
    })
  })
}

export const Watch = (property: string, wathOption?) => {
  return createDecorator((options, key) => {
    ;(options.watch || (options.watch = {}))[property] =
      typeof wathOption === 'object'
        ? {
            handler: options.methods[key],
            ...wathOption,
          }
        : options.methods[key]
  })
}
