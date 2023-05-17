<template>
  <div class="container mx-auto max-h-screen overflow-hidden">
    <h1 class="text-center mt-6 text-4xl font-bold italic">Web Pokedex</h1>

    <div class="flex align-center justify-center mt-4">
      <!-- <Search @search="onSearch"></Search> -->
    </div>
    <div class="grid lg:grid-cols-2 mt-4 text-center h-[90vh]">
      <ItemList
        class="max-h-full lg:max-h-[90vh] xl:max-h-full overflow-auto"
        @itemClicked="onPokemonClicked"
        :items="pokemons"
      >
        <!-- TODO find a way to add itemlist slot with dinamic data <PokemonItem :pokemon="item"></PokemonItem> -->
        <template v-slot="{ item }">
          <PokemonItem :pokemon="item"></PokemonItem>
        </template>
      </ItemList>

      <!--TODO Mobile pokedex -->
      <Modal :show="showPokedex" @close="closeModal()" v-if="!largerThanLg">
        <Pokedex
          class="flex justify-center w-full md:w-[70vw] lg:max-h-screen"
          :pokemon="selectedPokemon"
        />
      </Modal>
      <Pokedex
        v-if="largerThanLg"
        class="flex justify-center w-full max-h-full"
        :pokemon="selectedPokemon"
      />
    </div>
  </div>
</template>

<script setup>
import ItemList from '../components/ItemList.vue'
import Pokedex from '../components/Pokedex.vue'
import Modal from '../components/Modal.vue'
import PokemonItem from '../components/PokemonItem.vue'
import Search from '../components/Search.vue'
import { onBeforeMount, ref } from 'vue'
import pokemonsService from '../services/pokemonsService'
import { useInfiniteScroll } from '@vueuse/core'
import { useCounterStore } from '../stores/counter'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanLg = breakpoints.greater('lg') // sm and larger

const list = ref(null)

const next = ref(null)
const limit = 60

const pokemons = ref([])

const counterStore = useCounterStore()
const showPokedex = ref(false)

onBeforeMount(async () => {
  await fetchPokemons()
})

// useInfiniteScroll(
//   list,
//   async () => {
//     await nextPokemons()
//   },
//   { distance: 10 }
// )

async function fetchPokemons() {
  const response = await pokemonsService.getAll(limit)
  pokemons.value.push(...response.results)
  next.value = response.next
}
async function nextPokemons() {
  console.log('next')
  if (!next.value) {
    return
  }
  const response = await pokemonsService.http.get(next.value).then((res) => res.data)
  pokemons.value.push(...response.results)
  next.value = response.next
}

const selectedPokemon = ref(null)

async function onPokemonClicked(item) {
  const response = await pokemonsService.http.get(item.url)
  selectedPokemon.value = response.data
  counterStore.incrementClick(item)
  showPokedex.value = true
}

function closeModal() {
  showPokedex.value = false
}
function onSearch(searchTerm) {
  //TODO implement search
}
</script>
