export function useEventCounter(itemKey, key) {
  const clicks = (item) => {
    const itemsStr = window.localStorage.getItem(String(key))
    if (!itemsStr) {
      return 0
    }

    const localItem = JSON.parse(itemsStr).find((el) => el[itemKey] === item[itemKey])

    return localItem ? localItem.clicks : 0
  }

  function generateNewItem(item) {
    return {
      ...item,
      clicks: 1
    }
  }

  const increment = (item) => {
    const itemsStr = window.localStorage.getItem(key)

    if (!itemsStr) {
      const localItem = generateNewItem(item)
      window.localStorage.setItem(String(key), JSON.stringify([localItem]))
      return
    }

    const items = JSON.parse(itemsStr)

    let localItem = items.find((el) => el[itemKey] === item[itemKey])
    if (!localItem) {
      localItem = generateNewItem(item)
      items.push(localItem)
    } else {
      localItem.clicks = localItem.clicks + 1
    }

    window.localStorage.setItem(key, JSON.stringify(items))
  }

  return { increment, clicks }
}
