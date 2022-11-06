<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="decrement">-</button>
    {{ count }}
    <button @click="increment">+</button>
    <br />
    <p>{{ doubleCount }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Log, Prop, Watch } from './decorators'
import Component from './component'

@Component({
  name: 'Counter',
})
export default class Counter extends Vue {
  @Prop({ default: 'counter', type: String }) title!: string

  count = 0

  get doubleCount() {
    return this.count * 2
  }

  @Log
  increment() {
    this.count++
  }

  decrement() {
    this.count--
  }

  @Watch('count', { immediate: true})
  handleCountChange(val, oldVal) {
    console.log('count changed', val, oldVal)
  }

  mounted() {
    console.log('mounted')
  }
}
</script>
