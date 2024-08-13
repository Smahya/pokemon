<script setup>
import { useThemeMode } from "~/composables/useTheme";
import { useRoute } from "nuxt/app";
import { useMainStore } from "@/store/index";

const route = useRoute();
const colorMode = useColorMode();
const { show, defaultMode, updateVal } = useThemeMode(colorMode);

const store = useMainStore();

const searchText = ref(route.query.search);

function openModal() {
  show.value = true;
}

const computedColor = computed(() => {
  return defaultMode.value.color;
});

async function handleSearch(val) {
  await useAsyncData("main", () => store.searchPokemon(val));
}
</script>

<template>
  <div class="navbar noise">
    <div class="navbar-left flex items-center">
      <div class="poke-wrap">
        <img src="@/assets/images/Poke.png" alt="picture" class="poke" />
      </div>
      <p class="text-lg">
        Pok<span class="e">e</span><span class="book">book</span>
      </p>
    </div>
    <navbar-search
      :modelValue="searchText"
      @update:modelValue="(newValue) => handleSearch(newValue)"
      class="md:flex hidden"
    />
    <div class="color-comp flex items-center justify-center" @click="openModal">
      <button class="inner"></button>
    </div>
  </div>
  <select-color-mode
    v-if="show"
    :update-val="updateVal"
    :mode="colorMode.preference"
    :show="show"
    @close="show = false"
  />
</template>

<style lang="scss" scoped>
.navbar {
  background-color: var(--white);
  box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.05);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;

  &-left {
    position: relative;
    gap: 1rem;

    .text-lg {
      font-family: var(--clash);
      font-weight: 600;
      font-size: 24px;
      line-height: 30px;
      text-align: center;
      color: var(--black);
      transform: translateX(8.5rem);

      .e {
        font-family: var(--inter);
      }

      .book {
        color: var(--color);
      }
    }

    .poke-wrap {
      position: absolute;
      top: -1rem;
      width: 129.43px;
      height: 84px;

      img {
        width: inherit;
        height: inherit;
      }
    }
  }

  .color-comp {
    width: 2.8125rem;
    height: 2.8125rem;
    border-radius: 50%;
    border: 2px solid var(--black);
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.08);
    }

    .inner {
      width: 2.1756rem;
      height: 2.1756rem;
      border-radius: 50%;
      background-color: v-bind(computedColor);
      border: none;
      cursor: pointer;
    }
  }
}
</style>
