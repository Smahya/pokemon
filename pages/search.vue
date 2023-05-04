<script setup>
+ definePageMeta({ layout: 'result' });
import { useMainStore } from "@/store/index";

const offset = ref(0);
const limit = ref(20);
const loading = ref(true);
const store = useMainStore();

const fetchPokemonList = async (offset, limit) => {
 loading.value = true;
 await useAsyncData('main', () => store.fetchPokemon({ offset: offset, limit: limit }))
 loading.value = false;
}
watchEffect(() => {
 fetchPokemonList(offset.value, limit.value)
});
</script>
<template>
 <div class="main__search">
  <Loading v-if="store.loading" />
  <div v-else class="main__search--content">
   <div v-for="pokemon in store.initialList" :key="pokemon.name">
    <PokemonCard :pokemon="pokemon" />
   </div>
  </div>
 </div>
</template>

<style lang="scss" scoped>
.main__search {
 width: 100%;
 height: 100%;
 overflow-y: auto;
 display: flex;
 align-items: center;
 justify-content: center;

 &--content {
  width: 100%;
  padding: 6.2rem 0 10rem 0;

  width: calc(100% - 236px);
  margin: auto;
  display: grid;
  grid: 1fr / repeat(auto-fit, 288px);
  grid-gap: 1rem;
  align-items: center;
  justify-content: center;

  &-items {
   // border: 1px solid red;
  }
 }
}
</style>