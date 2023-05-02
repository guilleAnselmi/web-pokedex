import { mount } from '@vue/test-utils'
import Pokedex from '../components/Pokedex.vue'
import { createTestingPinia } from '@pinia/testing'

const pokemon = {
  abilities: [
    {
      ability: {
        name: 'limber',
        url: 'https://pokeapi.co/api/v2/ability/7/'
      },
      is_hidden: false,
      slot: 1
    },
    {
      ability: {
        name: 'imposter',
        url: 'https://pokeapi.co/api/v2/ability/150/'
      },
      is_hidden: true,
      slot: 3
    }
  ],

  height: 3,
  id: 132,
  name: 'ditto',
  order: 214,
  sprites: {
    back_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png',
    back_female: null,
    back_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/132.png',
    back_shiny_female: null,
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
    front_female: null,
    front_shiny:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png',
    front_shiny_female: null
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'normal',
        url: 'https://pokeapi.co/api/v2/type/1/'
      }
    }
  ],
  weight: 40
}
describe('Pokedex', () => {
  it('renders the correct data', () => {
    const wrapper = mount(Pokedex, {
      props: { pokemon },
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              counter: {
                currentPokemon: {
                  clicks: 32
                }
              }
            }
          })
        ]
      }
    })

    const types = () => {
      return pokemon.types.reduce((acc, val) => {
        return (acc += ` ${val.type.name}`)
      }, '')
    }
    expect(wrapper.find('[data-test-id="id"]').text()).toBe(`#${pokemon.id}`)
    expect(wrapper.find('[data-test-id="name"]').text()).toBe(pokemon.name)
    expect(wrapper.find('[data-test-id="size"]').text()).toBe(
      `H:${pokemon.height} W:${pokemon.weight}`
    )
    expect(wrapper.find('[data-test-id="types"]').text()).toBe(types().trim())
    expect(wrapper.find('[data-test-id="clicks"]').text()).toBe(`Clicks:32`)
  })
})
