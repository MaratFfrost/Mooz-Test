<template>
  <header>
    <a href="https://mooz.pro/">
      <img class="logo" :src="Logo" alt="logo" />
    </a>
    <div v-show="width <= SkrinSize">
      <ProfileMenu />
    </div>

    <form @submit.prevent="onSubmit" class="search-bar">
      <input v-model="searchQuery" type="text" :placeholder="placeholder" class="search-input" />
      <button type="submit" class="search-btn" aria-label="Search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="search-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" stroke-width="2" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2" />
        </svg>
      </button>
    </form>
    <div v-show="width > SkrinSize">
      <ProfileMenu />
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref } from 'vue';
import Logo from '../assets/Logo.svg';
import ProfileMenu from './ProfileMenu.vue';

const width = ref(window.innerWidth);
const SkrinSize = 1024;

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Search',
  },
});

const { modelValue, placeholder } = props;

const emit = defineEmits(['update:modelValue', 'search']);

const searchQuery = ref(modelValue || '');

const onSubmit = () => {
  emit('search', searchQuery.value.trim());
  searchQuery.value = '';
};

const handleResize = () => {
  width.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

watch(
  () => modelValue,
  (val) => {
    if (val !== searchQuery.value) searchQuery.value = val;
  }
);
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  gap: 24px;
  background: #fff;
  flex-wrap: wrap;
}

.logo {
  width: 150px;
  height: auto;
  max-width: 30vw;
  min-width: 80px;
  flex-shrink: 0;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #f7f8fa;
  border-radius: 8px;
  border: 2px solid #e3e8ef;
  padding: 0 8px;
  max-width: 400px;
  width: 100%;
  height: 40px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.01);
  transition: border 0.2s;
}

.search-bar:focus-within {
  border: 2px solid #5063f0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  padding: 8px;
  min-width: 0;
}

.search-btn {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
}

.search-icon {
  width: 20px;
  height: 20px;
  stroke: #acb5c2;
}

@media (max-width: 1024px) {
  header {
    flex-wrap: wrap;
    gap: 12px;
    padding: 10px 12px;
  }
  .search-bar {
    margin-right: 0;
    max-width: 100vw;
    min-width: 160px;
    margin-top: 20px;
  }
  .logo {
    width: 140px;
    min-width: 60px;
    align-self: center;
  }
}

@media (max-width: 349px) {
  .logo {
    width: 75px;
  }

  .search-input {
    font-size: 0.8rem;
  }
}
</style>
