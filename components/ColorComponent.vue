<template>
 <div class="color-comp flex items-center justify-center" @click="props.loadColor">
  <button class="inner">
  </button>
 </div>
</template>

<script setup>
const props = defineProps({
 color: {
  type: Object,
 },
 loadColor: {
  type: Function,
 },
 mode: {
  type: Boolean,
 }
});

const computedColor = computed(() => {
 return props.color.color
});

const mode = computed(() => {
 return props.mode ? "2px solid var(--black)" : "none";
});

</script>

<style lang="scss" scoped>
.color-comp {
 width: 5rem;
 height: 5rem;
 border-radius: 50%;
 border: v-bind(mode);
 cursor: pointer;

 &:hover {
  transform: scale(1.1);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.08);
 }

 .inner {
  width: 4.125rem;
  height: 4.125rem;
  border-radius: 50%;
  background-color: v-bind(computedColor);
  border: none;
  cursor: pointer;
 }
}
</style>
