<script setup>
import searchIcon from "@/assets/icons/search-grey.svg";

const props = defineProps({
  modelValue: {
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <form class="form border border-red-600">
    <div class="input-wrap flex items-center">
      <button type="submit" class="search-btn flex items-center justify-center">
        <img :src="searchIcon" alt="icon" />
      </button>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        class="input"
        placeholder="Enter pokemon name"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
%font {
  font-family: var(--general);
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #7b7b7b;
}

.form {
  width: 100%;
  height: 48px;
  max-width: 536px;
  margin: auto;
  background: #fcfcfc;
  border: 1px solid #e1e1e1;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.05);
  border-radius: 30px;
  background: url("@/assets/images/noise.png");
}

.input-wrap {
  width: 100%;
  height: 100%;
  position: relative;

  button {
    background: transparent;
    border: none;
    border-radius: 50%;
    position: absolute;
    left: 0.6rem;
    cursor: pointer;
  }
}

.input {
  @extend %font;
  background: url("@/assets/images/noise.png");
  background-color: var(--white);
  width: calc(100% - 2rem);
  height: 100%;
  border: none;
  border-radius: 60px;
  padding: 0 1rem 0 3rem;

  &:focus {
    outline: none;
  }
}
</style>
