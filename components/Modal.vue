<template>
  <div
    v-if="open"
    @click="onClickOutside"
    :class="['main__modal', `main__modal--${props.variant}`]"
  >
    <div class="" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: "center",
  },
  open: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);
const onOpen = () => {
  document.body.style.overflow = "hidden";
};
const onClose = () => {
  document.body.style.overflow = "unset";
};

const onClickOutside = (e) => {
  emit("close");
};

onMounted(() => {
  onOpen();
});
onBeforeUnmount(() => {
  onClose();
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

  body {
    pointer-events: none;
  }

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
