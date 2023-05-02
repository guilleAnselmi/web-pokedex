import { mount } from '@vue/test-utils'
import PokemonItem from '../components/PokemonItem.vue'

describe('PokemonItem', () => {
  it('renders the correct name', () => {
    const pokemon = { name: 'pikachu' }
    const wrapper = mount(PokemonItem, { props: { pokemon } })
    expect(wrapper.text()).toBe('pikachu')
  })
})
