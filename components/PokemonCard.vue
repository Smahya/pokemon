<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
  },
  view: {
    type: Function,
  },
});

const pokemon = computed(() => {
  return props.pokemon;
});
</script>

<template>
  <div class="pokemon__card noise">
    <div class="pokemon__card--top noise">
      <img
        :src="pokemon.sprites.other.dream_world.front_default"
        alt="picture"
      />
    </div>
    <div class="pokemon__card--bottom">
      <p class="pokemon-name">{{ pokemon.name }}</p>
      <PokemonType :pokemon="pokemon" />
    </div>
    <div class="view__btn">
      <ViewButton @view:details="props.view(pokemon.name)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pokemon__card {
  --grey: #eeeeee;
  background: #ffffff;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 0.625rem;
  margin-bottom: 3.4rem;
  position: relative;
  cursor: pointer;

  .view__btn {
    width: 100%;
    padding: 0.8rem 0.625rem;
    background: #ffffff;
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
    background: #f1f1f1;
    border-radius: 15px;

    img {
      width: 100%;
      height: 100%;
      transform: translateY(-3rem);
      z-index: 5;
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
  }
}
</style>
