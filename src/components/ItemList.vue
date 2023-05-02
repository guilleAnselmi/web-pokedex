<template>
  <div class="px-4">
    <div data-test-id="item" @click="onItemClick(item)" v-for="item in items" :key="item.id">
      <slot :item="item">
        <div>
          {{ item[labelItem] }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  labelItem: {
    type: String,
    default: 'name'
  }
})

const emit = defineEmits(['itemClicked'])

function onItemClick(item) {
  emit('itemClicked', item)
}
</script>

<style lang="scss" scoped></style>
