import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    pokemonsClicked: useLocalStorage('pokemon:clicks',[]),
    currentPokemon: null
  }),
  getters: {
    clicks: (state) => (state.currentPokemon ? state.currentPokemon.clicks : 0)
  },
  actions: {
    incrementClick(pokemon) {
      let tempPokemon = this.pokemonsClicked.find((el) => el.name === pokemon.name)

      if (!tempPokemon) {
        tempPokemon = generateNewPkmClicked(pokemon)
        this.pokemonsClicked.push(tempPokemon)
      } else {
        tempPokemon.clicks += 1
      }
      this.currentPokemon = tempPokemon
    }
  }
})

function generateNewPkmClicked(pokemon) {
  return {
    ...pokemon,
    clicks: 1
  }
}
