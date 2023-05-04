import { defineStore } from 'pinia'
import { instance } from '~/config/axios';
import axios from "axios"

export const useMainStore = defineStore('main', () => {
  const loading = ref(false);
  const metaData = ref({});
  const pokemonList = ref([]);
  const searchResult = ref([]);
  const searchKey = ref('');

  const searchPokemon = async ({ search }) => {
    loading.value = true;
    const result = pokemonList.value.filter((pokemon) => {
      return pokemon.name.toLowerCase() === search.toLowerCase()
    })
    console.log(result);
    loading.value = false;
    pokemonList.value = result
  }

  const initialList = computed(() => {
    return pokemonList?.value?.slice(0, 8);
  })

  const fetchPokemon = async ({ offset = 0, limit = 20}) => {
    loading.value = true;
    return instance.get(`/?offset=${offset}&limit=${limit}`)
      .then(async response => {
        const result = response.data.results;
        const pokemonDetailsPromises = result.map(pokemon => axios.get(pokemon.url));
        Promise.all(pokemonDetailsPromises)
          .then(responses => {
            const pokemonDetails = responses.map(response => response.data);
            // const result = search.length > 0 ? pokemonList.value.filter((pokemon) => pokemon.name.toLowerCase() === searchKey.toLowerCase()) : pokemonDetails
            pokemonList.value = pokemonDetails;
          })
          .catch(error => {
            return error
          });
      }).catch(err => {
        return err
      }).finally(() => {
        loading.value = false
      })
  };


  return { pokemonList, metaData, initialList, loading, searchKey, searchResult, fetchPokemon, searchPokemon }
})
