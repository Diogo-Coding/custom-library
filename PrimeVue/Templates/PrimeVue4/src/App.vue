<template>
  <Toast />
  <router-view v-slot="{ Component, route }">
    <Transition :name="route.meta.transition || 'fade'" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup>
import Toast from 'primevue/toast';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { URL_BACK } from './config/config';
import router from './router';
import { setSystemMode } from '@/utilities/preferencesUtils';

const store = useStore();

// Event listener for system theme mode if its activated by user and change in realtime
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', e => {
  if (store.getters.getPreferences.themeMode === 'system') {
    setSystemMode();
  }
});

</script>

<style scoped>
</style>