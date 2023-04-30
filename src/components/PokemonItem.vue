<template>
  <div
    class="cursor-pointer ring-[#93042A] hover:ring-4 shadow-lg transform active:scale-95 transition-transform bg-[#D30A40] text-white text-sm md:text-xl p-2 overflow-auto my-2"
  >
    {{ pokemon.name }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
})
const pokemon = computed(() => props.pokemon)
</script>
<style lang="scss" scoped></style>
