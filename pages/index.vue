<script setup>
import { useRouter } from 'nuxt/app';
const searchText = ref('');


const router = useRouter();
function searchItem() {
 !searchText.length ? null : router.push({ name: `/search?${searchText}` })
}

</script>
<script>
+ definePageMeta({ layout: 'custom' });
</script>
<template>
 <div class="root">
  <div class="content">
   <div class="content__top">
    <div class="poke-wrap">
     <img src="@/assets/images/Poke.png" alt="picture" class="poke" />
    </div>
    <div>
     <p class="text-lg">Pok<span class="e">é</span> <span class="book">book</span></p>
     <p class="text-sm">Largest Pokémon index with information <br /> about every Pokemon you can think of.</p>
    </div>
   </div>
   <div class="search-wrap">
    <search :modelValue="searchText" @update:modelValue="newValue => searchText = newValue" :searchItem="searchItem" />
   </div>
   <RouterLink to="/search">View All</RouterLink>
  </div>
 </div>
</template>

<style lang="scss" scoped>
.root {
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;

 .content {
  margin: auto;
  width: 100%;
  max-width: 35rem;
  padding: 0 1rem;
  display: grid;
  gap: 2rem;

  &__top {
   margin-bottom: 4rem;
  }

  a {
   font-family: var(--general);
   font-weight: 500;
   font-size: 18px;
   line-height: 24px;
   text-decoration-line: underline;
   color: var(--black-500);
   text-align: center;
  }

  .text-lg {
   font-family: var(--clash);
   font-weight: 600;
   font-size: 48px;
   line-height: 59px;
   text-align: center;
   color: var(--black);

   .e {
    font-family: var(--inter);
   }

   .book {
    color: var(--color);
   }
  }

  .poke-wrap {
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;

   .poke {
    width: 380px;
    height: 248px;
   }
  }

  .text-sm {
   font-family: var(--general);
   font-size: 18px;
   line-height: 24px;
   text-align: center;
   color: var(--black);
  }

  .search-wrap {}
 }
}
</style>