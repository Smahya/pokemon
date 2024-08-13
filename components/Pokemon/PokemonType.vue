<script lang="ts" setup>
defineProps<{
  pokemon: any;
}>();

const pokemonTypes: Record<string, string> = {
  normal: "🐻",
  fighting: "🤺",
  flying: "🦋",
  poison: "☠️",
  ground: "🕳",
  rock: "🪨",
  bug: "🐞",
  ghost: "👻",
  steel: "🛠",
  fire: "🔥",
  water: "💦",
  grass: "🌿",
  electric: "⚡️",
  psychic: "🔮",
  ice: "❄️",
  dragon: "🐉",
  dark: "🌑",
  fairy: "🧚‍♂️",
  unknown: "💎",
  shadow: "🌀",
};
</script>

<template>
  <div class="pokemon-types">
    <div
      v-for="type in pokemon.types"
      :key="type.type.name"
      class="pokemon-types-type"
    >
      <p>{{ `${pokemonTypes[type.type.name]} ${type.type.name}` }}</p>
    </div>
  </div>
</template>

<style scoped>
.pokemon-types {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;

  &-type {
    padding: 4px 12px;
    background: var(--grey);
    border-radius: 40px;
  }
}
</style>
