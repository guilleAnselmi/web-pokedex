import { mount } from '@vue/test-utils'
import ItemList from '../components/ItemList.vue'

describe('ItemList', () => {
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]

  it('renders a list of items', () => {
    const wrapper = mount(ItemList, {
      props: {
        items
      }
    })

    expect(wrapper.findAll('.px-4 > div')).toHaveLength(items.length)
    expect(wrapper.text()).toContain(items[0].name)
    expect(wrapper.text()).toContain(items[1].name)
    expect(wrapper.text()).toContain(items[2].name)
  })

  it('emits an itemClicked event when an item is clicked', async () => {
    const wrapper = mount(ItemList, {
      props: {
        items
      }
    })

    await wrapper.find('[data-test-id="item"]').trigger('click')

    expect(wrapper.emitted().itemClicked).toHaveLength(1)
  })

  it('renders a custom item template when provided', () => {
    const wrapper = mount(ItemList, {
      props: {
        items
      },
      slots: {
        default: `
          <div>
            <strong>{{ item.id }}</strong>
            <span>{{ item.name }}</span>
          </div>
        `
      }
    })

    expect(wrapper.text()).toContain(items[0].id)
    expect(wrapper.text()).toContain(items[0].name)
  })
})
