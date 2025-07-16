<template>
  <div class="pagination">
    <div class="pagination-wrap">
      <button :disabled="currentPage === 1" @click="handlePageClick(currentPage - 1)" class="arrow">&lt;</button>
      <span
        v-for="page in pagesToShow"
        :key="page"
        class="page"
        :class="{ active: page === currentPage, dots: page === '...' }"
        @click="handlePageClick(page)"
        :style="{ cursor: typeof page === 'number' ? 'pointer' : 'default' }"
        >{{ page }}</span
      >
      <button :disabled="currentPage === maxPages" @click="handlePageClick(currentPage + 1)" class="arrow">&gt;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  maxPages: number;
  activePage: number;
}>();

const emit = defineEmits(['pageChange']);
const { maxPages } = props;
const currentPage = ref(props.activePage);

const pagesToShow = computed<(number | string)[]>(() => {
  const page = currentPage.value;

  if (maxPages <= 7) {
    return Array.from({ length: maxPages }, (_, i) => i + 1);
  } else if (page < 5) {
    return [1, 2, 3, 4, 5, '...', maxPages];
  } else if (page >= maxPages - 3) {
    return [1, '...', maxPages - 4, maxPages - 3, maxPages - 2, maxPages - 1, maxPages];
  }

  return [1, '...', page - 1, page, page + 1, '...', maxPages];
});

const handlePageClick = (page: number | string) => {
  if (typeof page === 'number' && page !== currentPage.value) {
    currentPage.value = page;
    emit('pageChange', page);
  }
};
</script>

<style>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 6px 10px;
  gap: 0;
  font-family: inherit;
  margin-bottom: 15px;
}

.pagination-wrap {
  border: 1px solid rgba(230, 234, 245, 1);
  border-radius: 5px;
  display: flex;
  align-items: center;
  background: #fafbfc;
  box-shadow: 0 1px 6px 0 rgba(150, 160, 230, 0.03);
}

.page,
.arrow,
.dots {
  padding: 4px 15px;
  margin: 0 2px;
  font-size: 1rem;
  cursor: pointer;
  background: none;
  border: none;
  border-right: 1px solid rgba(230, 234, 245, 1);
  transition:
    background 0.13s,
    color 0.13s;
}

.arrow:last-of-type,
.page:last-of-type,
.dots:last-of-type {
  border-right: none;
}

.page.active {
  font-weight: bold;
  background: rgba(230, 234, 245, 1);
  border-radius: 4px;
  color: #4867e7;
}

.arrow {
  background: transparent;
  font-weight: bold;
  font-size: 1.1rem;
  color: #7f8fb5;
  user-select: none;
}

.arrow:disabled {
  color: #d3d8ee;
  cursor: not-allowed;
}

.page:not(.active):hover,
.arrow:not(:disabled):hover {
  background: #e9f0ff;
  color: #4153ba;
}

.dots {
  cursor: default;
  font-size: 1.1rem;
  color: #b7bdd5;
  background: transparent;
}

@media (max-width: 900px) {
  .pagination {
    padding: 5px 5px;
    margin-bottom: 10px;
  }
  .pagination-wrap {
    border-radius: 4px;
  }
  .page,
  .arrow,
  .dots {
    padding: 3px 10px;
    font-size: 0.93rem;
  }
}

@media (max-width: 600px) {
  .pagination {
    padding: 2px 0;
    margin-bottom: 7px;
  }
  .pagination-wrap {
    border-radius: 3px;
  }
  .page,
  .arrow,
  .dots {
    padding: 2.5px 7px;
    font-size: 0.82rem;
    margin: 0 1px;
    min-width: 28px;
  }
}

@media (max-width: 400px) {
  .page,
  .arrow,
  .dots {
    padding: 2px 3px;
    font-size: 0.72rem;
    min-width: 20px;
  }
}
</style>
