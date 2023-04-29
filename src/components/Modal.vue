<template>
  <div
    v-if="show"
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-100"
  >
    <div ref="target">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const target = ref()
const emit = defineEmits(['close'])

onClickOutside(target, (event) => {
  event.stopImmediatePropagation()
  emit('close', false)
})
</script>
