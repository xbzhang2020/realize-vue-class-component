const fs = require('fs')
const compiler = require('vue-template-compiler/build')

// 读取要转换组价的文件地址
// const fileContent = fs.readFileSync('../test/components/ClassComponent.vue', 'utf-8')

// const res = compiler.parseComponent(fileContent)

// console.log(res.script)

const originData = `
class extends Vue {
    count = 0;
    increment() {
      this.count++;
    }
    decrement() {
      this.count--;
    }
  }
  `

const options = eval(originData)
console.log(options)