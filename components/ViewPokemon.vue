<template>
  <Modal :open="true" variant="right" @close="$emit('close')">
    <div class="main__content relative pb-20 overflow-hidden">
      <div class="min-h-screen h-screen overflow-y-auto">
        <div class="p-4 pb-28">
          <div
            class="poke-image cover h-[340px] flex items-center justify-center"
            :class="{ 'dominant-color': dominantColor }"
            :style="dominantColor ? coverGradientStyles : ''"
          >
            <button @click="$emit('close')">close</button>
            <img
              class="max-w-[350px]"
              :src="pokemon.sprites.other.dream_world.front_default"
              alt="picture"
            />
          </div>
          <p class="poke-name">{{ pokemon.name }}</p>
          <PokemonType :pokemon="pokemon" />
          <div>{{ pokemon.similar }}</div>
          <div
            class="text-2xl font-semibold flex items-center justify-center my-6 py-2 shadow-[0px_0px_94px_0px_#00000012]"
          >
            <p>{{ activeTab }}</p>
          </div>
          <div class="tab-content">
            <PokemonStats v-if="activeTab === 'Stats'" :pokemon="pokemon" />
            <PokemonAbout v-if="activeTab === 'About'" :pokemon="pokemon" />
          </div>
        </div>

        <div
          class="absolute bottom-0 right-0 left-0 flex justify-center bg-white z-10 py-4 shadow-[0px_0px_94px_0px_#00000012]"
        >
          <div class="flex rounded-full bg-[#E9E9E9] p-1">
            <div
              v-for="tab in tabs"
              :key="tab"
              class="tab px-4 md:px-10 py-3 rounded-full"
              @click="activeTab = tab"
              :class="
                activeTab === tab
                  ? 'bg-white active shadow'
                  : 'hover:bg-neutral-400/20'
              "
            >
              {{ tab }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
const props = defineProps<{
  pokemon: Record<string, any>;
}>();

const tabs = ["About", "Stats", "Similar"];

const dominantColor = ref<number[] | null>(null);
const colorList = ref<Array<number[]>>([]);
const paletteSize = 5;
const activeTab = ref("About");

const pokemon = computed(() => props.pokemon);
const pokeImage = computed(
  () => props.pokemon?.sprites.other.dream_world.front_default
);

getColorInfo(pokeImage.value, (color: number[], palette: Array<number[]>) => {
  colorList.value = palette.slice(0, paletteSize) as Array<number[]>;
  dominantColor.value = color;
});

const coverGradientStyles = computed(() => {
  if (!dominantColor.value) return "";

  const factor = 20;
  const lighter = dominantColor.value.map((v) => v + factor);
  const darker = dominantColor.value.map((v) => v - factor);

  return `--lighter: rgb(${lighter}); --middle: rgb(${dominantColor.value}); --darker: rgb(${darker});`;
});
</script>

<style lang="scss" scoped>
.main__content {
  background-color: var(--white);
  height: 100vh;
  width: 660px;
}

.tab-content {
  background: linear-gradient(
    270deg,
    #ffffff 0%,
    rgba(217, 217, 217, 0.06) 51.04%,
    #ffffff 100%
  );
}

.cover {
  padding-block-start: max(10%, 80px);
  &.dominant-color {
    background-image: linear-gradient(
      to bottom,
      var(--lighter),
      var(--middle),
      var(--darker)
    );
  }
}

.poke-image {
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin-bottom: 4rem;
  position: relative;

  img {
    transform: translateY(2.6rem);
  }

  button {
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 9px;
    border: none;
    padding: 1rem;
    position: absolute;
    left: 1rem;
    top: 1rem;
  }
}

.poke-name {
  font-family: var(--clash);
  font-weight: 600;
  font-size: 48px;
  line-height: 59px;
  color: var(--black);
  text-align: center;
}
</style>
