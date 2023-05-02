import { mount } from '@vue/test-utils'
import Modal from '../components/Modal.vue'
import { expect, it } from 'vitest'
import { nextTick } from 'vue'

describe('Modal', () => {
  it('should create component with hidden content', async () => {
    const wrapper = mount(Modal, {
      slots: {
        default: `<div id="test">test</div>`
      }
    })

    expect(wrapper.find('div').exists()).toBe(false)
  })

  it('should show slots', async () => {
    const wrapper = mount(Modal, {
      props: {
        show: false
      },
      slots: {
        default: `<div id="test">test</div>`
      }
    })
    expect(wrapper.find('div').exists()).toBe(false)
    await wrapper.setProps({
      show: true
    })

    expect(wrapper.text()).toContain('test')
  })

  // it('should close when click outside', async () => {
  //   const wrapper = mount(Modal, {
  //     props: {
  //       show: true
  //     },
  //     slots: {
  //       default: `<div>Slot content</div>`
  //     }
  //   })

  //   const container = wrapper.find('[data-test-id="modal-container"')
  //   document.body.dispatchEvent(new MouseEvent('click', { target: document.body }))
  //   await nextTick
  //   expect(container.find('div').exists()).toBe(false)
  // })
})
