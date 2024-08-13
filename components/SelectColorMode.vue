<script setup>
const props = defineProps({
  updateVal: {
    type: Function,
  },
  mode: {
    type: String,
  },
});
const colors = [
  {
    name: "dark",
    color: "#DE527F",
  },
  {
    name: "light",
    color: "#39BADF",
  },
  {
    name: "sepia",
    color: "#E1A725",
  },
];
</script>

<template>
  <Modal :open="true" @close="$emit('close')" variant="center">
    <div class="select-color-mode">
      <div class="header">
        <p>Choose</p>
      </div>
      <div class="color-items noise flex items-center">
        <div v-for="color in colors" :key="color.name">
          <color-component
            :mode="props.mode === color.name"
            :color="color"
            :loadColor="() => props.updateVal(color)"
          />
        </div>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.select-color-mode {
  background: var(--white);
  border-radius: 2rem;
  max-width: 430px;
}

.color-items {
  padding: 2.4rem 3rem;
  gap: 1rem;
}

.header {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  border-radius: 32px 32px 0px 0px;
  padding: 1rem 0;

  p {
    font-family: var(--clash);
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: var(--black);
    text-align: center;
  }
}
</style>
