<script setup>
import searchIcon from "@/assets/icons/search.svg"
import { useRouter } from 'nuxt/app';

const router = useRouter();
const props = defineProps({
 modelValue: {
  type: String,
 },
 searchItem: {
  type: Function,
 }
});
const emit = defineEmits([
 'update:modelValue',
]);
function searchItem() {
 !props.modelValue.length ? null : router.push({ name: `search`, query: { search: `${props.modelValue}` } });
}
</script>

<template>
 <form :class="[`form`]" @submit.prevent="() => searchItem()">
  <div class="input-wrap flex items-center">
   <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" type="text" class="input"
    placeholder="Enter pokemon name" />
   <button type="submit" class="search-btn flex items-center justify-center"><img :src="searchIcon" alt="icon"></button>
  </div>
 </form>
</template>

<style lang="scss" scoped>
%font {
 font-family: var(--general);
 font-style: normal;
 font-weight: 400;
 font-size: 24px;
 line-height: 32px;
 color: #7B7B7B;
}

.form {
 height: calc(81px - 16px);
 max-width: 536px;
 margin: auto;
 box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.08);
 border-radius: 60px;
 padding: 8px;
 background: url('@/assets/images/noise.png');
 background-color: var(--color);
}

.input-wrap {
 width: 100%;
 height: 100%;
 position: relative;

 button {
  background: var(--color);
  border: none;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  position: absolute;
  right: 0.6rem;
  cursor: pointer;
 }
}

.input {
 @extend %font;
 background: url('@/assets/images/noise.png');
 background-color: var(--white);
 width: calc(100% - 2rem);
 height: 100%;
 border: none;
 border-radius: 60px;
 padding: 0 1rem;

 &:focus {
  outline: none;
 }
}
</style>