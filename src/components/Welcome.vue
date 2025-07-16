<template>
  <div class="welcome-container">
    <img class="welcome-img" :src="Main" alt="main" />
    <p class="welcome-text">
      <span class="main">Mooz</span> — is your all-in-one hub for exploring the world of movies and music. Discover,
      search and learn about your favorite films, dive into reviews and ratings, and expand your musical knowledge — all
      in a single, easy-to-use app. Whether you want to relax with a classic or find the latest hits, Mooz makes it
      simple, inspiring and fun. Welcome to Mooz — where movies and music come together!
    </p>
  </div>
</template>

<script setup lang="ts">
import Main from '../assets/Main.png';
</script>

<style scoped>
.welcome-container {
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.welcome-img {
  width: 41%;
  min-width: 220px;
  display: block;
  margin: 0 20px 0 0;
  flex-shrink: 0;
}

.welcome-text {
  margin: 0 auto 32px auto;
  max-width: 600px;
  text-align: center;
  font-size: 1.28rem;
  line-height: 1.65;
  color: #45476a;
  font-weight: 400;
  letter-spacing: 0.01em;
  background: #fafbfc;
  border-radius: 13px;
  box-shadow: 0 1px 8px 0 rgba(150, 160, 230, 0.06);
  padding: 43px 18px 4px 21px;
  flex: 1 1 0;
  max-height: 350px;
}

.welcome-text .main {
  font-weight: bold;
  color: rgba(50, 86, 227, 1);
  font-size: 1.38em;
  letter-spacing: 0.04em;
  text-shadow: 0 1px 6px #ece7ff;
  margin-right: 6px;
}

@media (max-width: 900px) {
  .welcome-container {
    flex-direction: column;
    align-items: center;
    padding-top: 28px;
    gap: 12px;
  }
  .welcome-img {
    width: 65%;
    max-width: 320px;
    margin: 0 auto 8px auto;
  }
  .welcome-text {
    max-width: 95vw;
    font-size: 1.07rem;
    padding: 26px 10px 8px 10px;
    max-height: unset;
  }
}

@media (max-width: 600px) {
  .welcome-container {
    flex-direction: column;
    gap: 6px;
    padding-top: 16px;
  }
  .welcome-img {
    width: 95vw;
    min-width: 0;
    max-width: 95vw;
    margin: 0 auto 8px auto;
  }
  .welcome-text {
    font-size: 0.99rem;
    padding: 13px 4vw 4px 4vw;
    margin-bottom: 20px;
  }
  .welcome-text .main {
    font-size: 1.1em;
  }
}

@media (max-width: 400px) {
  .welcome-img {
    width: 99vw;
    max-width: 99vw;
  }
  .welcome-text {
    font-size: 0.89rem;
    padding: 6px 1vw 4px 1vw;
  }
}
</style>
