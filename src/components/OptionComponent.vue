<template>
  <div>
    <button @click="decrement">-</button>
    {{ count }}
    <button @click="increment">+</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Counter',
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
}
</script>
