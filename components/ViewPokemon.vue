<template>
 <Modal variant="right">
  <div class="main__content">
   <div class="poke-image flex items-center justify-center">
    <button @click="props.close()">
     close
    </button>
    <img :src="pokemon.sprites.other.dream_world.front_default" alt="picture">
   </div>
   <p class="poke-name">{{ pokemon.name }}</p>
  </div>
 </Modal>
</template>

<script setup>
const props = defineProps({
 pokemon: {
  type: Object,
 },
 close: {
  type: Function
 }
});

const pokemon = computed(() => props.pokemon);
</script>

<style lang="scss" scoped>
.main__content {
 background-color: var(--white);
 height: 100vh;
 width: 660px;
 padding: 17px;
}

.poke-image {
 box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.1);
 border-radius: 15px;
 margin-bottom: 4rem;
 position: relative;

 img {
  transform: translateY(3.4rem);
 }

 button {
  background: #FFFFFF;
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