<script lang="ts">
import ClassComponent from './components/ClassComponent.vue'
import OptionComponent from './components/OptionComponent.vue'

export default {
  components: {
    ClassComponent,
    OptionComponent,
  },
}
</script>

<template>
  <div>
    <ClassComponent title="counter" />
    <!-- <OptionComponent /> -->
  </div>
</template>
