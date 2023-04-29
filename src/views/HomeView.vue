<template>
  <main>
    <div class="container mx-auto">
      <h1 class="text-center mt-6 text-4xl font-bold italic">Web Pokedex</h1>

      <div class="flex align-center justify-center mt-4">
        <!-- <Search @search="onSearch"></Search> -->
      </div>
      <div class="grid lg:grid-cols-2 mt-4 text-center">
        <ItemList
          ref="lisst"
          class="max-h-screen lg:max-h-[90vh] xl:max-h-screen overflow-auto"
          @itemClicked="onPokemonClicked"
          :items="pokemons"
        >
          <!-- TODO find a way to add itemlist slot with dinamic data <PokemonItem :pokemon="item"></PokemonItem> -->
        </ItemList>

        <!--TODO Mobile pokedex -->

        <Pokedex
          v-if="largerThanSm"
          class="flex justify-center w-full lg:max-h-screen"
          :pokemon="selectedPokemon"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import ItemList from '../components/ItemList.vue'
import Pokedex from '../components/Pokedex.vue'
import { onBeforeMount, ref } from 'vue'
import pokemonsService from '../services/pokemonsService'
import { useInfiniteScroll } from '@vueuse/core'
import { useCounterStore } from '../stores/counter'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanSm = breakpoints.greater('sm') // sm and larger

const list = ref()
const next = null
const limit = 60
const pokemons = ref([])
const counterStore = useCounterStore()

useInfiniteScroll(
  list,
  () => {
    fetchPokemons()
  },
  { distance: 10 }
)

onBeforeMount(() => {
  fetchPokemons()
})

async function fetchPokemons() {
  const response = await pokemonsService.getAll(limit, next)
  pokemons.value.push(...response.results)
}

const selectedPokemon = ref(null)

async function onPokemonClicked(item) {
  const response = await pokemonsService.http.get(item.url)
  selectedPokemon.value = response.data
  counterStore.incrementClick(item)
}

function onSearch(searchTerm) {
  //TODO call api with search params
}
</script>
