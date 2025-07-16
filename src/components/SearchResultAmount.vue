<template>
  <div class="search-result-amount">
    <p>
      Your searched for: <span class="searched-query">{{ movies }}</span>
      <span class="results-badge">{{ amount }} results</span>
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  movies: String;
  amount: String;
}

defineProps<Props>();
</script>

<style lang="scss">
.search-result-amount {
  padding-top: 20px;
  padding-left: 1.9%;
  font-size: 110%;

  .searched-query {
    text-decoration: underline;
  }
}

.results-badge {
  background: #2953e8;
  color: #fff;
  font-size: 0.98rem;
  padding: 7px 14px;
  border-radius: 7px;
  display: inline-block;
  margin-left: 8px;
  margin-top: 5px;
}

@media (max-width: 425px) {
  .search-result-amount {
    padding-top: 20px;
    padding-left: 5.1%;
    font-size: 100%;

    .searched-query {
      text-decoration: underline;
    }
  }

  @media (max-width: 399px) {
    .search-result-amount {
      padding-top: 20px;
      padding-left: 2.1%;
      font-size: 80%;

      .searched-query {
        text-decoration: underline;
      }
    }

    .results-badge {
      background: #2953e8;
      color: #fff;
      font-size: 0.65rem;
      padding: 7px 14px;
      border-radius: 7px;
      display: inline-block;
      margin-left: 8px;
    }
  }
}
</style>
