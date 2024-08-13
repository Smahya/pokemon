<script lang="ts" setup>
const props = defineProps<{
  pokemon: any;
}>();

const sharedProps = { asHeading: true, variant: "h3" };
const labelProps = { ...sharedProps, class: "text-right", weight: "normal" };
const valueProps = { ...sharedProps };

const height = computed(() => `${(props.pokemon.height / 10).toFixed(1)}m`);
const weight = computed(() => `${(props.pokemon.weight / 10).toFixed(1)}kg`);
</script>

<template>
  <div class="row">
    <p v-bind="labelProps">Height</p>
    <p v-bind="valueProps">{{ height }}</p>
  </div>

  <div class="line"></div>

  <div class="row">
    <p v-bind="labelProps">Weight</p>
    <p v-bind="valueProps">{{ weight }}</p>
  </div>

  <div class="line"></div>

  <div class="row">
    <p v-bind="labelProps">Abilities</p>
    <p v-bind="valueProps" as="div">
      <ul class="list-disc pl-5">
        <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
          {{ ability.ability.name }}
        </li>
      </ul>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.line {
  @apply w-8/12 mx-auto my-1.5 h-0.5 bg-gradient-to-r from-white via-neutral-300/60 to-white;
}

.row {
  display: grid;
  grid: 1fr / repeat(2, 1fr);
  gap: 32px;
}
</style>
