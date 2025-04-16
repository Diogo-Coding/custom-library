<!-- Information:
  All made with tailwind classes so you can just delete template and start your own page,
  also you can copy this view and use it later if needed.
-->
<template>
  <div class="flex flex-col gap-4 items-center justify-center w-full h-full relative">
    <div class="absolute h-screen w-screen">
      <div :class="['dark', 'system'].includes(localTheme) ? 'background-shadow-box' : ''"></div>
    </div>
    <section class="p-10 flex z-[2] flex-col gap-4 items-center justify-center text-slate-700">
      <!-- Header -->
      <header class="flex flex-col gap-4 items-center justify-center">
        <div>
          <img src="@/assets/favicon.svg" alt="Logo" class="w-32 h-32">
        </div>
        <div>
          <h1 class="m-0 bold-900 dark:text-slate-50">PrimeVue 4 Template</h1>
        </div>
      </header>

      <!-- Main -->
      <main class="!grid grid-cols-2 items-center justify-center w-full h-full gap-8 p-6">
        <InfoBox animated-line lineWidth="120px" class="h-full rounded-2xl">
          <section class="flex flex-col bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 h-full ring-1 ring-slate-500/50">
            <div class="flex items-center gap-2 justify-between">
              <h4 class="text-xl dark:text-slate-50 m-0">Components</h4>
              <Tag icon="pi pi-exclamation-circle" severity="warn" value="Work In Progress"></Tag>
            </div>
            <Divider/>
            <div class="flex flex-col gap-4 justify-center pt-2">
              <!-- Routes -->            <div class="flex flex-col gap-2">
                <RouterLink :to="'/main/other'" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">
                  <Button label="Other Page" severity="secondary"></Button>
                </RouterLink>
                <RouterLink :to="'/not-found'" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">
                  <Button label="Not Found" severity="secondary"></Button>
                </RouterLink>
                <RouterLink :to="'/errors/something-went-wrong'" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">
                  <Button label="Something Went Wrong" severity="secondary"></Button>
                </RouterLink>
              </div>
            </div>
          </section>
        </InfoBox>
        
        <InfoBox animated-line lineWidth="120px" class="h-full rounded-2xl">
          <section class="flex flex-col bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 h-full ring-1 ring-slate-500/50">
            <div>
              <h4 class="text-xl m-0 dark:text-slate-50">Options</h4>
            </div>
            <Divider/>
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
          </section>
        </InfoBox>
      </main>

      <!-- Footer -->
      <footer class="footer flex items-center justify-center gap-4 dark:text-slate-50">
        <p class="flex items-center gap-2">
          <i class="pi pi-github"></i>
          <a href="https://github.com/Diogo-Coding" target="_blank" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">My Github</a>
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
import InfoBox from '@/components/InfoBox.vue';

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
.background-shadow-box {
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  width: 70vh;
  height: 70vh;
  transform: translate(-50%, -50%);
  filter: blur(120px);
  background-image: linear-gradient( 0deg, rgba(16, 185, 129, .2) 50%, rgba(16, 185, 129, .2) 50%);
}
</style>