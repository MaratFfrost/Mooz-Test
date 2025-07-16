<script setup lang="ts">
import usericon from '../assets/User.svg';
import { ref } from 'vue';

const dialogVisible = ref(false);
</script>

<template>
  <div v-if="dialogVisible" class="modal-overlay" @click.self="dialogVisible = false">
    <div class="modal">
      <div class="modal-header">
        <h3>Work in progress</h3>
        <button class="close-btn" @click="dialogVisible = false">&times;</button>
      </div>
      <div class="modal-body">
        <p>This element is not functional now. Try again later</p>
      </div>
      <div class="modal-footer">
        <button class="primary-btn" @click="dialogVisible = false">Close</button>
      </div>
    </div>
  </div>

  <div @click="dialogVisible = true" class="profile-menu">
    <img class="usericon" :src="usericon" alt="usericon" />
    <p class="username">Your name</p>
  </div>
</template>

<style scoped>
.profile-menu {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 29%;
  transition: opacity 0.2s ease;
}

.profile-menu:hover {
  opacity: 0.7;
}

.usericon {
  width: 25%;
  height: 25%;
}

.username {
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #ff0000;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
}

.primary-btn {
  background-color: #409eff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.primary-btn:hover {
  background-color: #66b1ff;
}

@media (max-width: 424px) {
  .profile-menu {
    padding-right: 0;
    gap: 5px;
  }

  .username {
    font-size: 10px;
  }
}

@media (max-width: 355px) {
  .profile-menu {
    padding-right: 0;
    gap: 5px;
    padding-left: 46%;
  }

  .username {
    font-size: 10px;
  }
}

@media (min-width: 350px) and (max-width: 354px) {
  .usericon {
    width: 30%;
    height: 30%;
  }
  .username {
    font-size: 9px;
  }
}
</style>
