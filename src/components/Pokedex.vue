<template>
  <div class="text-center">Pokedex</div>
  <div @click="increment(pokemon)" v-if="pokemon">
    {{ pokemon }}
  </div>
</template>

<script setup>
import { useEventCounter } from '../composables/eventCounter'

const props = defineProps({
  pokemon: {
    type: Object
  }
})
const { increment } = useEventCounter('gifurl', 'pokemon:clicked')
</script>

<style lang="scss" scoped></style>
