<template>
  <!-- Information:
    All made with tailwind classes so you can just delete template and start your own page,
    also you can copy this view and use it later if needed.
  -->
  <div class="container mx-auto p-10 flex flex-col gap-4 items-center justify-center w-full h-full">
    <section class="flex flex-col gap-4 items-center justify-center text-slate-700">
      <!-- Header -->
      <header class="flex flex-col gap-4 items-center justify-center">
        <div>
          <img src="@/assets/favicon.svg" alt="Logo" class="w-32 h-32">
        </div>
        <div>
          <h1 class="m-0 dark:text-slate-50 bold-900">PrimeVue 4 Template</h1>
        </div>
      </header>

      <!-- Main -->
      <main class="flex flex-col justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl dark:border dark:border-slate-500 dark:border-solid p-6" :class="['dark', 'system'].includes(localTheme) ? 'custom-shadow-emerald' : ''">
        <div>
          <h4 class="text-xl dark:text-slate-50 m-0">Options</h4>
        </div>
        <Divider class="m-0"/>
        <div class="flex flex-col gap-4 justify-center pt-2">
          <!-- Theme Selector -->
          <div class="flex flex-col gap-2 pb-4">
            <h4 class="m-0 dark:text-slate-300">Theme</h4>
            <div class="flex items-center gap-1 p-2 bg-white dark:bg-slate-600 shadow rounded-lg">
              <Button v-for="theme in themeOptions" :key="theme" :label="theme.name" :severity="theme.value == localTheme ? 'primary' : 'secondary'" :icon="theme.icon" :text="theme.value != localTheme" class="w-full" @click="theme.function()" />
            </div>
            <Button label="Toggle Theme" severity="primary" text @click="toggleDarkMode()" />
          </div>
          <!-- Font Size Selector -->
          <div class="flex flex-col gap-2 pb-4">
            <h4 class="m-0 dark:text-slate-300">Font Size</h4>
            <div class="flex items-center gap-1 p-2 bg-white dark:bg-slate-600 shadow rounded-lg">
              <Button label="Pequeña" :severity="localFontSize == 12 ? 'primary' : 'secondary'" :text="localFontSize != 12" class="w-full" @click="setFontSize(12)" />
              <Button label="Normal" :severity="localFontSize == 14 ? 'primary' : 'secondary'" :text="localFontSize != 14" class="w-full" @click="setFontSize(14)" />
              <Button label="Mediana" :severity="localFontSize == 16 ? 'primary' : 'secondary'" :text="localFontSize != 16" class="w-full" @click="setFontSize(16)" />
              <Button label="Grande" :severity="localFontSize == 18 ? 'primary' : 'secondary'" :text="localFontSize != 18" class="w-full" @click="setFontSize(18)" />
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="footer flex items-center justify-center gap-4 dark:text-slate-50">
        <p class="flex items-center gap-2">
          <i class="pi pi-github"></i>
          <a href="https://github.com/Diogo-Coding" target="_blank" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">Github</a>
        </p>
        <span class="text-sm dark:text-slate-400 select-none">|</span>
        <p class="flex items-center gap-2">
          <i class="pi pi-prime"></i>
          <a href="https://v3.primevue.org/autocomplete/" target="_blank" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">PrimeVue</a>
        </p>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { toggleDarkMode, setLightMode, setDarkMode, setSystemMode, setFontSize } from '@/utilities/preferencesUtils';

const store = useStore();
const themeOptions = ref([
  { name: 'Light', value: 'light', icon: 'pi pi-sun', function: setLightMode },
  { name: 'Dark', value: 'dark', icon: 'pi pi-moon', function: setDarkMode },
  { name: 'System', value: 'system', icon: 'pi pi-cog', function: setSystemMode },
]);
const localTheme = computed(() => store.getters.getPreferences.themeMode);
const localFontSize = computed(() => store.getters.getPreferences.fontSize);

</script>

<style scoped>
.custom-shadow-cyan {
  --tw-shadow-color: rgb(6 182 212 / 0.5);
  --tw-shadow: var(--tw-shadow-colored);
  --tw-shadow-colored: 0 0 450px -12px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.custom-shadow-emerald {
  --tw-shadow-color: #10b981;
  --tw-shadow: var(--tw-shadow-colored);
  --tw-shadow-colored: 0 0 450px -12px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>