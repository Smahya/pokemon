<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>

</script>

<style lang="scss" >
body {
  --color: #DE527F;
}

.dark-mode body {
  --color: #DE527F;
}

.light-mode body {
  --color: #39BADF;
}

.sepia-mode body {
  --color: #E1A725;
}
</style>