<template>
 <div :class="['main__modal', `main__modal--${props.variant}`]">

  <slot />

 </div>
</template>

<script setup>
const props = defineProps({
 variant: {
  type: String,
  default: 'center'
 }
});
</script>

<style lang="scss" scoped>
.main__modal {
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background: rgba(39, 39, 39, 0.5);
 backdrop-filter: blur(5px);
 display: flex;
 z-index: 1999;


 &--center {
  align-items: center;
  justify-content: center;
 }

 &--right {
  align-items: right;
  justify-content: right;
 }

 &--content {
  background: var(--white);
  width: 50%;
 }
}
</style>