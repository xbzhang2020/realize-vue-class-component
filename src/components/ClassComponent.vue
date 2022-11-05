<template>
  <div>
    <button @click="decrement">-</button>
    {{ count }}
    <button @click="increment">+</button>
    <br />
    <p>{{ doubleCount }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import Component from 'vue-class-component'
import Component from './component'

@Component({
  name: 'Counter'
})
export default class Counter extends Vue {
  count = 0

  get doubleCount() {
    return this.count * 2
  }

  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }

  mounted() {
    console.log('mounted')
  }
}
</script>
