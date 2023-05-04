<script setup>
import eye from '@/assets/icons/eye.svg';
import { useThemeMode } from '~/composables/useTheme';

const colorMode = useColorMode();
const { defaultMode, } = useThemeMode(colorMode);

const computedColor = computed(() => {
 return defaultMode.value.color
});
</script>
<template>
 <button class="view--btn" type="button">
  View Pokemon
  <img :src="eye" alt="eye icon" />
 </button>
</template>

<style lang="scss" scoped>
.view--btn {
 border: none;
 padding: 12px 20px;
 width: 100%;
 background-color: v-bind(computedColor);
 border-radius: 14px;
 font-family: var(--general);
 font-weight: 400;
 font-size: 16px;
 line-height: 22px;
 color: var(--white);
 display: flex;
 align-items: center;
 justify-content: space-between;
 cursor: pointer;
}
</style>