const colors =
{
 dark: "#DE527F",
 light: "#39BADF",
 sepia: "#E1A725",
};
import { useThemeStore } from "~/store/theme";

export const useThemeMode = (colorMode) => {
 const store = useThemeStore()
 const show = ref(false);

 const defaultMode = ref({
  name: colorMode.preference,
  color: colors[colorMode.preference],
 })

 function updateVal(val) {
  localStorage.setItem('theme', val.name)
  store.setColorMode(val.name)
  defaultMode.value = {
   ...val
  };
  colorMode.preference = val.name;
  show.value = false;
 }

 return {
  defaultMode,
  updateVal,
  show,
 }
}