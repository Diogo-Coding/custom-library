<template>
  <div>
    <div class="flex flex-col items-center gap-1 p-2 bg-white dark:bg-surface-800 shadow rounded-lg">
      <div class="flex items-center gap-1 w-full">
        <Button
          v-for="theme in availableThemes()"
          :key="theme"
          :severity="theme.value == localTheme ? 'primary' : 'secondary'"
          :icon="theme.icon"
          :text="theme.value != localTheme"
          class="w-full px-4"
          @click="theme.function()"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useKeepAliveScroll } from '@/composables/useKeepAliveScroll.js'
const scrollable = ref(null)
useKeepAliveScroll(scrollable)

import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePreferencesStore } from '@/stores/preferences'
import { availableThemes } from '@/utilities/preferencesUtils'

const preferencesStore = usePreferencesStore()
const { themeMode: localTheme } = storeToRefs(preferencesStore)
</script>

<style scoped></style>
