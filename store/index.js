import { defineStore } from "pinia";
import { instance } from "~/config/axios";
import axios from "axios";

export const useMainStore = defineStore("main", () => {
  const loading = ref(false);
  const mainList = ref([]);
  const metaData = ref({});
  const pokemonList = ref([]);
  const searchKey = ref("");

  const getInitialList = (pageSize = 8) => {
    return pokemonList?.value?.slice(0, pageSize);
  };

  function getPokemonList(details) {
    loading.value = true;
    Promise.all(details)
      .then((responses) => {
        const pokemonDetails = responses.map((response) => response.data);
        pokemonList.value = pokemonDetails;
      })
      .catch((error) => {
        return error;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  const searchPokemon = async (search) => {
    loading.value = true;
    const searchResult = mainList.value.filter((pokemon) => {
      return pokemon.name.includes(search);
    });
    const sliceResult = searchResult?.slice(0, 8);
    const pokemonDetailsPromises = sliceResult.map((pokemon) =>
      axios.get(pokemon.url)
    );
    getPokemonList(pokemonDetailsPromises);
    loading.value = true;
  };

  const fetchPokemon = async (offset = 0, limit) => {
    loading.value = true;
    const result = mainList.value.slice(offset, limit);
    const pokemonDetailsPromises = result.map((pokemon) =>
      axios.get(pokemon.url)
    );
    getPokemonList(pokemonDetailsPromises);
  };

  const fetchAllPokemon = async ({ offset = 0, limit, pageSize }) => {
    loading.value = true;
    return instance
      .get(`/?offset=${offset}&limit=${limit}`)
      .then(async (response) => {
        const { results, ...rest } = response.data;
        mainList.value = results;
        metaData.value = rest;
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        fetchPokemon(offset, pageSize);
        loading.value = true;
      });
  };

  return {
    pokemonList,
    metaData,
    getInitialList,
    loading,
    searchKey,
    fetchPokemon,
    searchPokemon,
    fetchAllPokemon,
  };
});
