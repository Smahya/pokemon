<script setup>
definePageMeta({ layout: "result" });
import { useMainStore } from "@/store/index";

const store = useMainStore();
const route = useRoute();

const searchText = reactive({
  modelValue: route.query.search,
});
const offset = ref(0);
const pageSize = ref(8);
const limit = ref(640);
const page = ref(1);
const show = ref(false);
const pokemonDetails = ref({});

const initialList = computed(() => {
  return store.getInitialList(pageSize.value);
});

async function fetchAll() {
  await useAsyncData("main", () =>
    store.fetchAllPokemon({
      offset: offset.value,
      limit: limit.value,
      pageSize: pageSize.value,
    })
  );
}

console.log(store.metaData.count, "store.metaData.count");

function openModal(name) {
  pokemonDetails.value = store.pokemonList.find((poke) => poke.name === name);
  show.value = true;
}
function closeModal() {
  show.value = false;
}

async function handleUpdate(page) {
  const start = (page - 1) * pageSize.value;
  const end = (page + 1) * pageSize.value;

  await useAsyncData("main", () => store.fetchPokemon(start, end));
}
async function handlePageSizeUpdate(pageSize) {
  await useAsyncData("main", () =>
    store.fetchAllPokemon({
      offset: offset.value,
      limit: limit.value,
      pageSize,
    })
  );
}

async function handleSearch(val) {
  await useAsyncData("main", () => store.searchPokemon(val));
}

watchEffect(async () => {
  await fetchAll();
  await handleSearch(searchText.modelValue);
});
</script>
<template>
  <div class="main__search min-h-screen">
    <div class="md:hidden flex mt-6 px-4">
      <NavbarSearch
        :modelValue="searchText.modelValue"
        @update:modelValue="(newValue) => handleSearch(newValue)"
      />
    </div>

    <Loading v-if="store.loading" />
    <div v-else class="">
      <div class="main__search--content">
        <div v-for="pokemon in initialList" :key="pokemon.name">
          <PokemonCard :pokemon="pokemon" :view="openModal" />
        </div>
      </div>
    </div>
    <ViewPokemon v-if="show" :pokemon="pokemonDetails" @close="closeModal" />
    <div class="footer container md:px-8 px-4" v-if="!store.loading">
      <Pagination
        v-model:page="page"
        :page-size="pageSize"
        :total="limit"
        @update:page="handleUpdate"
      />

      <select
        class=""
        v-model="pageSize"
        @change="(e) => handlePageSizeUpdate(e.target.value)"
      >
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
  overflow-y: auto;
  padding-bottom: 5rem;

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
  }
}
</style>
