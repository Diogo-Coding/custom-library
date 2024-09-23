<!-- Information:
  Do not add any comments at the start inside the template tags, 
  because it will broke the template rendering when using the "mode" prop in "Transition" elements.
-->
<template>
  <Toast />
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition || 'fade'" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup>
import Toast from 'primevue/toast';
import { useStore } from 'vuex';
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