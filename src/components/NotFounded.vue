<template>
  <div class="search-result-amount">
    <p>
      Sorry, we couldn't find any results for: <span class="searched-query">{{ lastSearchedQuery }}</span>
    </p>
    <img class="not-founded" :src="NotFounded" alt="not-founded" />
  </div>
</template>

<script setup lang="ts">
import NotFounded from '../assets/404.png';

defineProps<{
  lastSearchedQuery: string;
}>();
</script>

<style scoped>
.not-founded {
  width: 70%;
  display: block;
  margin: 24px auto 0 auto;
}
</style>
