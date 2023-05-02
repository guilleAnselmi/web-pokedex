import { ref, computed } from 'vue'
export function useEventCounter(itemKey, key) {
  const localItem = ref(null)

  const clicks = computed(() => {
    console.log('clicks', localItem.value)
    return localItem.value ? localItem.value.clicks : 0
  })

  const increment = (item) => {
    const storageStr = window.localStorage.getItem(key)

    if (!storageStr) {
      localItem.value = generateNewItem(item)
      window.localStorage.setItem(String(key), JSON.stringify([localItem.value]))
      return
    }

    const items = JSON.parse(storageStr)

    const finded = items.find((el) => el && el[itemKey] === item[itemKey])
    if (!finded) {
      localItem.value = generateNewItem(item)
      items.push(localItem.value)
    } else {
      finded.clicks += 1
      localItem.value = finded
    }

    window.localStorage.setItem(key, JSON.stringify(items))
  }

  return { increment, clicks }
}
