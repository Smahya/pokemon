<script setup>

const props = defineProps({
 pokemon: {
  type: Object
 }
});

const pokemon = computed(() => {
 return props.pokemon;
});
const pokemonTypes = {
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
 <div class="pokemon__card">
  <div class="pokemon__card--top">
   <img :src="pokemon.sprites.other.dream_world.front_default" alt="picture">
  </div>
  <div class="pokemon__card--bottom">
   <p class="pokemon-name">{{ pokemon.name }}</p>
   <div class="pokemon-types">
    <div v-for="type in pokemon.types" :key="type.type.name" class="pokemon-types-type">
     <p>{{ `${pokemonTypes[type.type.name]} ${type.type.name}` }}</p>
    </div>
   </div>
  </div>
  <div class="view__btn">
   <ViewButton />
  </div>
 </div>
</template>

<style lang="scss" scoped>
.pokemon__card {
 --grey: #EEEEEE;
 background: #FFFFFF;
 box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.06);
 border-radius: 20px;
 padding: 0.625rem;
 margin-bottom: 3.4rem;
 position: relative;
 cursor: pointer;

 .view__btn {
  width: calc(100% - 1.25rem);
  padding: 0.8rem 0.625rem;
  background: #FFFFFF;
  border-radius: 0 0 20px 20px;
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3rem;
  z-index: 5;
 }

 &:hover {
  .view__btn {
   display: flex;
  }
 }

 &--top {
  width: 268px;
  height: 148px;
  background: #F1F1F1;
  border-radius: 15px;

  img {
   width: 100%;
   height: 100%;
   transform: translateY(-3rem);
   z-index: 100;
  }
 }

 &--bottom {
  padding: 2rem 0;

  .pokemon-name {
   font-family: var(--clash);
   font-weight: 500;
   font-size: 1.5rem;
   line-height: 1.875rem;
   color: var(--black);
   text-align: center;
   margin-bottom: 0.4rem;
  }

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
 }
}
</style>