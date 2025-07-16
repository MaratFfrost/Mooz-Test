import { createStore } from 'vuex';
import type { SearchResult } from '../types/SearchRes';

const CACHE_LIFETIME = 30 * 1000;

interface State {
  resultsCache: Record<string, { data: SearchResult; ts: number }>;
  cleanupInterval: number;
}

interface SetSearchResultPayload {
  query: string;
  page: number;
  result: SearchResult;
}

export default createStore({
  state: (): State => ({
    resultsCache: {},
    cleanupInterval: 0,
  }),
  mutations: {
    setSearchResult(state: State, { query, page, result }: SetSearchResultPayload) {
      const cacheKey = `${query}|${page}`;
      state.resultsCache[cacheKey] = {
        data: result,
        ts: Date.now(),
      };
    },
    clearExpiredCache(state: State) {
      const now = Date.now();
      Object.keys(state.resultsCache).forEach((key) => {
        if (now - state.resultsCache[key].ts > CACHE_LIFETIME) {
          delete state.resultsCache[key];
        }
      });
    },
    setCleanupInterval(state: State, intervalId: number) {
      state.cleanupInterval = intervalId;
    },
    clearCleanupInterval(state: State) {
      if (state.cleanupInterval) {
        clearInterval(state.cleanupInterval);
        state.cleanupInterval = 0;
      }
    },
  },
  actions: {
    async searchMovies(
      { state, commit }: { state: State; commit: any },
      { query, page }: { query: string; page: number }
    ) {
      const normQuery = query.trim().toLowerCase();
      const cacheKey = `${normQuery}|${page}`;

      if (state.resultsCache[cacheKey]) {
        return state.resultsCache[cacheKey].data;
      }

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=8523cbb8&s=${encodeURIComponent(query)}&page=${page}`
      );
      try {
        const data = await response.json();
        commit('setSearchResult', { query: normQuery, page, result: data });
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    startCacheCleanup({ state, commit }: { state: State; commit: any }) {
      commit('clearCleanupInterval');
      const intervalId = setInterval(() => {
        commit('clearExpiredCache');
      }, 30000);
      commit('setCleanupInterval', intervalId);
    },
    stopCacheCleanup({ commit }: { commit: any }) {
      commit('clearCleanupInterval');
    },
  },
  getters: {
    getSearchResult: (state: State) => (query: string, page: number) => {
      const cacheKey = `${query.trim().toLowerCase()}|${page}`;
      return state.resultsCache[cacheKey]?.data;
    },
  },
});
