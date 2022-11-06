// 创建装饰器
export function createDecorator(factory: (options: object, key: string) => void) {
  return (target: any, key?: any) => {
    const Ctor: any = typeof target === 'function' ? target : target.constructor
    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = []
    }

    Ctor.__decorators__.push((options) => factory(options, key))
  }
}

