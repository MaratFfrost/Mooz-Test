<template>
  <div class="movies-grid">
    <div class="movie-card" v-for="movie in movies" :key="movie.imdbID">
      <MovieCard :movie="movie" />
    </div>
    <button v-if="showScrollTop" class="scroll-top" @click="scrollToTop" aria-label="Наверх">▲</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import MovieCard from './MovieCard.vue';
import type { Movie } from '../types/Movie';

defineProps({
  movies: Array<Movie>,
});

const showScrollTop = ref(false);

const scrollToTop = () => {
  showScrollTop.value = false;
  window.scrollTo(0, 0);
};

const checkScroll = () => {
  showScrollTop.value = window.scrollY > 800 && window.innerWidth < 700;
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<style>
.movies-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 56px 36px;
  padding: 28px 10px 12px 10px;
  justify-items: center;
  justify-content: center;
  margin-bottom: 60px;
}
@media (max-width: 1200px) {
  .movies-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 22px;
    max-width: 960px;
  }
}
@media (max-width: 900px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 12px;
    max-width: 600px;
  }
}
@media (max-width: 600px) {
  .movies-grid {
    grid-template-columns: 1fr;
    gap: 18px 0;
    max-width: 98vw;
    padding: 9px 0 3px 0;
  }
}

.movie-card {
  width: 100%;
  max-width: 280px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition:
    box-shadow 0.15s,
    border 0.15s;
  cursor: pointer;
}

.movie-card:hover {
  box-shadow: 0 4px 16px 0 rgba(41, 83, 232, 0.07);
}

.poster {
  width: 100%;
  aspect-ratio: 1/1;
  display: block;
  position: relative;
}

.poster img {
  position: absolute;
  top: 0;
  left: 0;
  width: 99%;
  height: 99%;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid rgba(50, 86, 227, 1);
}

.info {
  font-size: 15px;
  color: #222;
  padding: 16px 13px 11px 13px;
  text-align: left;
  width: 100%;
}

.info div {
  margin-bottom: 2px;
  padding-right: 7px;
}

@media (max-width: 1050px) {
  .movies-grid {
    gap: 22px 12px;
    max-width: 850px;
  }
  .movie-card {
    max-width: 210px;
  }
  .info {
    font-size: 14px;
    padding: 12px 9px 9px 9px;
  }
}

@media (max-width: 730px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px 7px;
    max-width: 480px;
    padding: 9px 1vw 6px 8vw;
  }
  .movie-card {
    max-width: 140px;
  }
  .info {
    font-size: 12px;
    padding: 7px 7px 7px 7px;
  }
}

@media (max-width: 480px) {
  .movies-grid {
    grid-template-columns: 1fr;
    max-width: 98vw;
    padding: 7px 0 3px 0;
    gap: 9px 0;
  }
  .movie-card {
    max-width: 95vw;
    min-width: 0;
    margin: 0 auto;
  }
  .info {
    font-size: 11px;
    padding: 7px 7px 7px 7px;
  }
}

.scroll-top {
  position: fixed;
  right: 16px;
  bottom: 45px;
  z-index: 999;
  color: #111;
  border-radius: 50%;
  border: none;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  font-size: 2.1rem;
  cursor: pointer;
  opacity: 0.8;
}

.scroll-top:hover {
  background: #111;
  color: #fff;
  border-color: #222;
  opacity: 1;
}
.scroll-top svg path {
  transition: stroke 0.16s;
}
.scroll-top:hover svg path {
  stroke: #fff;
}
@media (min-width: 700px) {
  .scroll-top {
    display: none !important;
  }
}
</style>
