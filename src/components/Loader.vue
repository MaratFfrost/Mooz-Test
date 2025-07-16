<template>
  <div class="loader-wrap">
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loader-wrap {
  margin-top: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
}

.loader {
  border: 5px solid #e3e8ef;
  border-top: 5px solid #5063f0;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  animation: spin 1s linear infinite;
  margin: 40px 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 900px) {
  .loader {
    width: 95px;
    height: 95px;
    border-width: 4px;
  }
  .loader-wrap {
    margin-top: 50px;
    min-height: 70px;
  }
}

@media (max-width: 600px) {
  .loader {
    width: 62px;
    height: 62px;
    border-width: 3px;
    margin: 20px 0;
  }
  .loader-wrap {
    margin-top: 30px;
    min-height: 38px;
  }
}
</style>
