<template>
  <main>
    <div class="container mx-auto">
      <h1 class="text-center mt-6 text-4xl font-bold italic">Web Pokedex</h1>

      <div class="flex align-center justify-center mt-4">
        <Search @search="onSearch"></Search>
      </div>
      <div class="grid lg:grid-cols-2 mt-4 text-center">
        <!-- list -->

        <ItemList
          labelItem="title"
          @itemClicked="onPokemonClicked"
          :items="pokemons"
        >
          <!-- <PokemonItem :pokemon="item"></PokemonItem> -->
        </ItemList>

        <!-- Mobile pokedex -->

        <!-- item -->
        <div class="">
          <Pokedex :pokemon="selectedPokemon" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// TODO remove this when connect to pokemons api
import data from '../../data/gifs.json'
import ItemList from '../components/ItemList.vue'
import PokemonItem from '../components/PokemonItem.vue'
import Pokedex from '../components/Pokedex.vue'
import Search from '../components/Search.vue'

import { ref } from 'vue'

const pokemons = ref(data)
const selectedPokemon = ref(null)

function onPokemonClicked(item) {
  //TODO call api and show pokemon in pokedex
  selectedPokemon.value = item
}

function onSearch(searchTerm) {
  //TODO call api with search params
}
</script>
