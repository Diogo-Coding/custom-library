<template>
  <div class="p-10 flex flex-col gap-4 items-center justify-center w-full h-full">
    <div class="flex flex-col gap-4 items-center justify-center">
      <div>
        <h1 class="m-0 text-slate-700 dark:text-slate-100 bold-900">PrimeVue 4 Template</h1>
      </div>
      <div class="flex flex-col gap-4 justify-center bg-slate-100 rounded-2xl shadow-md p-4">
        <div>
          <h4 class="text-xl text-gray-600 m-0 pb-4">Options</h4>
        </div>
        <div>
          <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
        </div>
        <div class="flex items-center gap-1 p-2 bg-white shadow rounded-lg">
          <Button label="Pequeña" :severity="localFontSize == 12 ? 'primary' : 'secondary'" :text="localFontSize != 12" class="w-full" @click="setFontSize(12)" />
          <Button label="Mediana" :severity="localFontSize == 14 ? 'primary' : 'secondary'" :text="localFontSize != 14" class="w-full" @click="setFontSize(14)" />
          <Button label="Normal" :severity="localFontSize == 16 ? 'primary' : 'secondary'" :text="localFontSize != 16" class="w-full" @click="setFontSize(16)" />
          <Button label="Grande" :severity="localFontSize == 18 ? 'primary' : 'secondary'" :text="localFontSize != 18" class="w-full" @click="setFontSize(18)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { toggleDarkMode, setFontSize } from '@/utilities/preferencesUtils';

const store = useStore();
const localFontSize = computed(() => store.getters.getPreferences.fontSize);

</script>

<style scoped>

</style>