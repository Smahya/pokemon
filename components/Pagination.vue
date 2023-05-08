<script setup>
import { generateDottedPages } from "~/utils/generate-dotted-pages";
import arrow from "../assets/icons/arrow.svg"
const props = defineProps({
  page: {
    type: Number,
  },
  pageSize: {
    type: Number,
  },
  total: {
    type: Number
  },
})

const emit = defineEmits([
  "update:page"
]);

const root = ref(null);
const rootChildElementCount = ref(0);

const totalPages = computed(() => Math.ceil(isNaN(props.total) ? 1 : props.total / Number(props.pageSize)));
const steps = computed(() => generateDottedPages({
  page: props.page, totalPages: totalPages.value
}));

const handleNext = () => {
  if (props.page < totalPages.value) {
    emit("update:page", props.page + 1);
  }
};

const handlePrevious = () => {
  if (props.page > 1)
    emit("update:page", props.page - 1);
};

const handleSetPage = (page) => {
  emit("update:page", Number(page));
};

const updateChildElementCount = () => {
  rootChildElementCount.value = root.value?.childElementCount
}
onMounted(() => {
  updateChildElementCount()
})

onUpdated(() => {
  updateChildElementCount()
});
</script>

<template>
  <div class="pagination" ref="root">
    <button :disabled="page === 1" class="bg-neutral-200" @click="handlePrevious">

      <img :src="arrow" alt="arrow-left" />
    </button>

    <template v-for="step in steps" :key="step">
      <span v-if="step === '...'" class="">
        {{ step }}
      </span>
      <div v-else>
        <button @click="handleSetPage(step)" :class="[step === page ? 'bg-mode' : 'bg-neutral']">
          <p :class="[step === page ? 'text-white' : 'text-neutral-800']">
            {{ step }}
          </p>
        </button>
      </div>
    </template>

    <button :class="{}" :disabled="page === totalPages" class="bg-neutral-200" @click="handleNext">
      <img :src="arrow" alt="arrow-left" class="rotate-180" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  gap: 8px;
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(44px, max-content));
  justify-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(v-bind(rootChildElementCount), max-content);
  }
}

.rotate-180 {
  transform: rotate(180deg);
}

.text-white {
  color: var(--white);
}

.bg-mode {
  background-color: var(--color);
}

button {
  --size: 40px;
  display: grid;
  place-content: center;
  height: var(--size);
  min-width: var(--size);
  padding: 4px 10px;
  border-radius: 8px;
  border: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>