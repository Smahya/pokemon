<script lang="ts" setup>
defineProps<{
  pokemon: any;
}>();

const sharedProps = { asHeading: true, variant: "h3" };
const labelProps = { ...sharedProps, class: "text-right", weight: "normal" };

const getProgressWidth = (value: number) => {
  const width = (value / 255) * 100;
  return width > 100 ? 100 : width;
};
</script>

<template>
  <template v-for="(stat, index) in pokemon.stats" :key="stat.stat.name">
    <div v-if="index !== 0" class="line"></div>
    <div class="row">
      <p class="capitalize" v-bind="labelProps">{{ stat.stat.name }}</p>
      <div class="flex space-x-5 items-center max-w-[200px]">
        <div
          :style="`--progress-width: ${getProgressWidth(stat.base_stat)}%`"
          class="progress flex-grow-1"
        >
          <div class="fill"></div>
        </div>
        <p as-heading class="value" variant="span" weight="semibold">
          {{ stat.base_stat }}
        </p>
      </div>
    </div>
  </template>
</template>

<style scoped>
.line {
  @apply w-8/12 mx-auto my-1.5 h-0.5 bg-gradient-to-r from-white via-neutral-300/60 to-white;
}

.row {
  display: grid;
  grid: 1fr / repeat(2, 1fr);
  gap: 32px;
}

.progress {
  --progress-width: 0;
  width: 100%;
  height: 8px;
  background: #cbcbcb;
}

.fill {
  --clr-primary: #7a4df0;
  height: 100%;
  width: var(--progress-width);
  background: var(--color);
}
</style>
