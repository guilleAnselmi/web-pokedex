<template>
  <div class="px-4">
    <div  @click="onItemClick(item)" v-for="item in items" :key="item.id">
      <slot>
        <div class="bg-red-400 text-white text-sm md:text-xl p-2 overflow-auto my-2">
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
