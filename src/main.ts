import { createApp } from 'vue';
import App from './App.vue';
import store from './store/strore';

store.dispatch('startCacheCleanup');

createApp(App).use(store).mount('#app');
