function decorator1(target) {
  console.log('decorate a class', target?.name)
}

function decorator2(target, key) {
  console.log('decorate a property or method', target, key)
}

@decorator1
export default class Counter {
  @decorator2
  count = 0

  @decorator2
  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }
}

// 测试程序
const counter = new Counter()
console.log(counter.count)
counter.increment()
console.log(counter.count)

