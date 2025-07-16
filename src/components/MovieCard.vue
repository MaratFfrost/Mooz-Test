<template>
  <div class="poster">
    <img
      :src="movie.Poster"
      :alt="movie.Title"
      @error="onImgError"
      @load="onImgLoad"
      :class="{ hidden: isImgLoading }"
    />
    <div v-if="isImgLoading" class="img-skeleton"></div>
  </div>
  <div class="info">
    <div>Name: {{ movie.Title }}</div>
    <div>Year: {{ movie.Year }}</div>
    <div>imdbID: {{ movie.imdbID }}</div>
    <div>Type: {{ movie.Type }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Movie } from '../types/Movie';
import placeholder from '../assets/placeholder-image.svg';

defineProps<{
  movie: Movie;
}>();

const isImgLoading = ref(true);

const onImgLoad = () => {
  isImgLoading.value = false;
};

const onImgError = (event: Event) => {
  (event.target as HTMLImageElement).src = placeholder;
};
</script>

<style>
.poster {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
}
.poster img.hidden {
  opacity: 0;
  transition: opacity 0.3s;
}
.poster img {
  opacity: 1;
  transition: opacity 0.3s;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.img-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f3f3f3 25%, #ededed 50%, #f3f3f3 75%);
  animation: skeleton 1.1s infinite linear;
  border-radius: 12px;
}
@keyframes skeleton {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}
</style>
