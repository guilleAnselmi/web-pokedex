<template>
  <div>{{ pokemon }}</div>
</template>

<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
})
</script>
<style lang="scss" scoped></style>
