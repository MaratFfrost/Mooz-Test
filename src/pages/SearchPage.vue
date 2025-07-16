<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import type { SearchResult } from '../types/SearchRes';
import AppHeader from '../components/AppHeader.vue';
import SearchResultAmount from '../components/SearchResultAmount.vue';
import MoviesGrid from '../components/MoviesGrid.vue';
import NotFounded from '../components/NotFounded.vue';
import Loader from '../components/Loader.vue';
import Pagination from '../components/Pagination.vue';
import Welcome from '../components/Welcome.vue';

const store = useStore();
const CurrentPage = ref(1);
const WelcomeShow = ref(true);
const query = ref('');
const lastSearchedQuery = ref('');
const isLoading = ref(false);
const result = reactive({
  value: {} as SearchResult,
});

const getMovies = async (que: string, page: number | null) => {
  if (!page) {
    return store.dispatch('searchMovies', { query: que, page: 1 });
  } else {
    return store.dispatch('searchMovies', { query: que, page: page });
  }
};

const doSearch = async (movie: string | null, page: number | null) => {
  if (movie && typeof page !== 'number') {
    WelcomeShow.value = false;
    isLoading.value = true;
    lastSearchedQuery.value = movie;
    result.value = await getMovies(movie, page);
    isLoading.value = false;
  } else if (lastSearchedQuery.value && typeof page === 'number') {
    isLoading.value = true;
    CurrentPage.value = page;
    result.value = await getMovies(lastSearchedQuery.value, page);
    window.scrollTo(0, 0);
    isLoading.value = false;
  }
};
</script>

<template>
  <AppHeader v-model="query" placeholder="Batman" @search="doSearch" />
  <div v-if="WelcomeShow">
    <Welcome />
  </div>
  <div v-else-if="isLoading">
    <Loader />
  </div>
  <div v-else-if="result?.value?.totalResults && isLoading === false">
    <SearchResultAmount :movies="lastSearchedQuery" :amount="result?.value?.totalResults" />
    <MoviesGrid :movies="result?.value?.Search" />
    <Pagination
      :maxPages="Math.ceil(Number(result?.value?.totalResults) / 10)"
      :activePage="CurrentPage"
      @pageChange="doSearch(lastSearchedQuery, $event)"
    />
  </div>
  <div v-else>
    <NotFounded :lastSearchedQuery="lastSearchedQuery" />
  </div>
</template>
