<script setup>
+ definePageMeta({ layout: 'result' });
import { useMainStore } from "@/store/index";
import { useRouter } from 'nuxt/app';

const store = useMainStore();
const router = useRouter();

const searchText = ref('');
const offset = ref(0);
const pageSize = ref(8);
const page = ref(1);
const count = ref(store.metaData.count);
const loading = ref(true);
const show = ref(false);
const pokemonDetails = ref({})

async function fetchAll() {
 await useAsyncData('main', () => store.fetchAllPokemon({ offset: offset.value, limit: 500, pageSize: pageSize.value }))
}

function openModal(name) {
 pokemonDetails.value = store.pokemonList.find((poke) => poke.name === name);
 show.value = true;
}
function closeModal() {
 show.value = false;
}

async function handleUpdate(page) {
 console.log(page);
 const start = (page - 1) * pageSize.value;
 const end = (page + 1) * pageSize.value;
 console.log(start, end)
 await useAsyncData('main', () => store.fetchPokemon(start, end))
}

watchEffect(async () => {
 await fetchAll();
});
watch(searchText, (oldVal, newVal) => {
 if (newVal) {
  router.replace({ path: '/search', query: { search: newVal } })
 }
});

</script>
<template>
 <div class="main__search">
  <Loading v-if="store.loading" />
  <div v-else class="">
   <NavbarSearch :modelValue="searchText" @update:modelValue="newValue => searchText = newValue" class="navbar-search" />
   <div class="main__search--content">
    <div v-for="pokemon in store.initialList" :key="pokemon.name">
     <PokemonCard :pokemon="pokemon" :view="openModal" />
    </div>
   </div>
  </div>
  <ViewPokemon v-if="show" :pokemon="pokemonDetails" :close="closeModal" />
  <div class="footer container" v-if="count">
   <Pagination v-model:page="page" :page-size="pageSize" :total="count" @update:page="handleUpdate" />

   <select class="" v-model="pageSize">
    <option value="8">8</option>
    <option value="12">12</option>
    <option value="16">16</option>
    <option value="24">24</option>
   </select>
  </div>
 </div>
</template>

<style lang="scss" scoped>
.footer {
 display: flex;
 justify-content: space-between;
}

.main__search {
 display: flex;
 flex-direction: column;
 // align-items: center;
 // justify-content: center;
 overflow-y: auto;
 padding-bottom: 5rem;

 .navbar-search {
  display: flex;
 }

 @media (min-width: 1110px) {
  .navbar-search {
   display: none;
  }

 }


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