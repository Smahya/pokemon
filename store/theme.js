import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
 const colorMode = ref('dark');
 
 const setColorMode = (val) => {
  colorMode.value = val
 }

 return { colorMode, setColorMode }
})
