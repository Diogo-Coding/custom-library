<!-- Information:
  Do not add any comments at the start inside the template tags, 
  because it will broke the template rendering when using the "mode" prop in "Transition" elements.
-->
<template>
  <div class="bg-white dark:bg-surface-950">
    <Toast />
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta.transition || 'fade'" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <AlertPWA />
  </div>
</template>

<script setup>
import Toast from 'primevue/toast'
import { usePreferencesStore } from '@/stores/preferences'
import { setSystemMode } from '@/utilities/preferencesUtils'
import AlertPWA from './components/Custom/AlertPWA.vue'

const preferencesStore = usePreferencesStore()

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
mediaQuery.addEventListener('change', () => {
  if (preferencesStore.themeMode === 'system') {
    setSystemMode()
  }
})
</script>

<style scoped></style>
