<!-- Information:
  All made with tailwind classes so you can just delete template and start your own page,
  also you can copy this view and use it later if needed.
-->
<template>
  <div class="home-view relative keep-alive-scrollbar" ref="scrollable">
    <div class="absolute z-0 h-screen w-screen flex justify-center items-center">
      <div class="background-shadow-box"></div>
    </div>
    <section class="text-slate-700 z-[2] relative">
      <!-- Header -->
      <header class="flex flex-col h-screen max-h-screen px-4">
        <div class="grow flex flex-col gap-4 items-center justify-center pt-40">
          <div class="dark:text-slate-300 font-semibold">
            <DateFormat :date="new Date()" 
              display="datetime"
              :format24h="true"
              proximity
            />
          </div>
          <div class="h-full flex flex-col gap-4 items-center justify-center">
            <div>
              <img src="@/assets/favicon.svg" alt="Logo" class="w-32 h-32">
            </div>
            <div>
              <h1 class="!mb-0 bold-900 text-center dark:text-slate-50">PrimeVue 4</h1>
              <h2 class="m-0 bold-600 text-center dark:text-slate-50">Basic Template</h2>
            </div>
            <!-- Footer -->
            <div class="footer flex items-center justify-center gap-4 dark:text-slate-50">
              <p class="flex items-center gap-2">
                <i class="pi pi-github"></i>
                <a href="https://github.com/Diogo-Coding" target="_blank" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">My Github</a>
              </p>
              <span class="text-sm dark:text-slate-400 select-none">|</span>
              <p class="flex items-center gap-2">
                <i class="pi pi-prime"></i>
                <a href="https://v3.primevue.org/autocomplete/" target="_blank" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">PrimeVue</a>
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center pb-20">
          <Button text rounded class="" @click="scrollTo('main-content')">
            <div class="p-2">
              <h2 class="m-0 dark:text-slate-50 text-slate-600 font-medium text-xl text-center">See more</h2>
              <i class="pi pi-chevron-down !text-6xl text-center"></i>
            </div>
          </Button>
        </div>
      </header>

      <!-- Main -->
      <main class="main-content px-8" id="main-content">
        <div class="flex flex-col items-center justify-start h-full w-full py-20">
          <div class="text-center">
            <h2 class="m-0 bold-900 dark:text-slate-50 text-2xl text-center">Features already implemented</h2>
            <small class="m-0 dark:text-slate-300 text-center">Check some features and already in this template</small>
          </div>
          <div class="!grid grid-cols-1 md:grid-cols-2 items-center justify-center pt-10 md:p-10 w-fit gap-8">
            <InfoBox animated-line lineWidth="120px" class="h-full rounded-2xl">
              <section class="flex flex-col bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 h-full ring-1 ring-slate-500/50">
                <div class="flex items-center gap-2 justify-between">
                  <h4 class="text-xl font-bold dark:text-slate-50 m-0">Components</h4>
                  <Tag icon="pi pi-exclamation-circle" severity="warn" value="Work In Progress"></Tag>
                </div>
                <Divider/>
                <div class="flex flex-col gap-4 justify-center pt-2">
                  <!-- Routes -->            
                  <div class="flex flex-col gap-2">
                    <RouterLink :to="'/main/other'" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">
                      <Button label="Other Page" severity="secondary"></Button>
                    </RouterLink>
                    <RouterLink :to="'/not-found'" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">
                      <Button label="Not Found" severity="secondary"></Button>
                    </RouterLink>
                    <RouterLink :to="'/errors/something-went-wrong'" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">
                      <Button label="Something Went Wrong" severity="secondary"></Button>
                    </RouterLink>
                    <RouterLink :to="'/dev/configuration'" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">
                      <Button label="Configuration" severity="secondary"></Button>
                    </RouterLink>
                    <div>
                      <Drawer v-model:visible="drawerPreview" position="right" :showCloseIcon="false" class="w-fit max-w-screen md:rounded-2xl h-full md:h-[95vh] mr-0 md:mr-[5vh] bg-transparent">
                        <template #container="{ }">
                          <div class="flex items-center justify-center w-full h-full">
                            <MobilePreview url="https://hello.springhoteles.com/" @close="drawerPreview = false" />
                          </div>
                        </template>
                      </Drawer>
                      <Button icon="pi pi-arrow-up-right-and-arrow-down-left-from-center" iconPos="right" label="Mobile Preview" severity="secondary" @click="drawerPreview = true" />
                    </div>
                  </div>
                </div>
              </section>
            </InfoBox>
          
            <InfoBox animated-line lineWidth="120px" class="h-full rounded-2xl">
              <section class="flex flex-col bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 h-full ring-1 ring-slate-500/50">
                <div>
                  <h4 class="text-xl font-bold m-0 dark:text-slate-50">Options</h4>
                </div>
                <Divider/>
                <div class="flex flex-col gap-4 justify-center pt-2">
                  <!-- Theme Selector -->
                  <div class="flex flex-col gap-2 pb-4">
                    <h4 class="m-0 font-semibold dark:text-slate-300">Theme</h4>
                    <div class="grid grid-cols-1 lg:grid-cols-3 items-center gap-1 p-2 bg-white dark:bg-slate-600 shadow rounded-lg">
                      <Button v-for="theme in availableThemes()" :key="theme" :label="theme.name"
                        :severity="theme.value == localTheme ? 'primary' : 'secondary'" :icon="theme.icon"
                        :text="theme.value != localTheme" class="w-full px-4" @click="theme.function()" />
                    </div>
                    <Button label="Toggle Theme" severity="primary" text @click="toggleDarkMode()" />
                  </div>
                  <!-- Font Size Selector -->
                  <div class="flex flex-col gap-2 pb-4">
                    <h4 class="m-0 font-semibold dark:text-slate-300">Font Size</h4>
                    <div class="grid grid-cols-1 lg:grid-cols-4 items-center gap-1 p-2 bg-white dark:bg-slate-600 shadow rounded-lg">
                      <Button label="Small" :severity="localFontSize == 12 ? 'primary' : 'secondary'" :text="localFontSize != 12" class="w-full" @click="setFontSize(12)" />
                      <Button label="Normal" :severity="localFontSize == 14 ? 'primary' : 'secondary'" :text="localFontSize != 14" class="w-full" @click="setFontSize(14)" />
                      <Button label="Big" :severity="localFontSize == 16 ? 'primary' : 'secondary'" :text="localFontSize != 16" class="w-full" @click="setFontSize(16)" />
                      <Button label="Giant" :severity="localFontSize == 18 ? 'primary' : 'secondary'" :text="localFontSize != 18" class="w-full" @click="setFontSize(18)" />
                    </div>
                  </div>
                  <!-- Custom Scrollbar Selector -->
                  <div class="flex flex-col gap-2 pb-4">
                    <h4 class="m-0 font-semibold dark:text-slate-300">Custom Scrollbar</h4>
                    <div class="flex items-center gap-1 p-2 bg-white dark:bg-slate-600 shadow rounded-lg">
                      <Button label="Custom" :severity="localCustomScrollbar ? 'primary' : 'secondary'"
                        :text="!localCustomScrollbar" class="w-full" @click="setCustomScrollbar(true)" />
                      <Button label="Native" :severity="!localCustomScrollbar ? 'primary' : 'secondary'"
                        :text="localCustomScrollbar" class="w-full" @click="setCustomScrollbar(false)" />
                    </div>
                    <Button label="Toggle Custom Scrollbar" severity="primary" text class="w-full" @click="toggleCustomScrollbar()" />
                  </div> 
                  <div class="flex flex-col gap-2 pb-4">
                    <h4 class="m-0 font-semibold dark:text-slate-300">Keep Scrollbar Position</h4>
                    <div class="flex items-center gap-1 p-2 bg-white dark:bg-slate-600 shadow rounded-lg">
                      <Button label="Save" :severity="localKeepScrollbarPositions ? 'primary' : 'secondary'"
                        :text="!localKeepScrollbarPositions" class="w-full" @click="setKeepScrollbarPositions(true)" />
                      <Button label="No Save" :severity="!localKeepScrollbarPositions ? 'primary' : 'secondary'"
                        :text="localKeepScrollbarPositions" class="w-full" @click="setKeepScrollbarPositions(false)" />
                    </div>
                    <Button label="Toggle Save Scrollbar Positions" severity="primary" text class="w-full" @click="toggleKeepScrollbarPositions()" />
                  </div> 
                </div>
              </section>
            </InfoBox>
          </div>
        </div>
      </main>
      
      <!-- Footer -->
      <footer class="p-10">
        <div class="footer flex items-center justify-center gap-4 dark:text-slate-50">
          <p class="flex items-center gap-2">
            <i class="pi pi-github"></i>
            <a href="https://github.com/Diogo-Coding" target="_blank" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">My Github</a>
          </p>
          <span class="text-sm dark:text-slate-400 select-none">|</span>
          <p class="flex items-center gap-2">
            <i class="pi pi-prime"></i>
            <a href="https://v3.primevue.org/autocomplete/" target="_blank" class="text-slate-700 dark:text-slate-300 no-underline hover:underline">PrimeVue</a>
          </p>
        </div>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { useKeepAliveScroll } from '@/composables/useKeepAliveScroll.js'
const scrollable = ref(null)
useKeepAliveScroll(scrollable)

import { ref } from 'vue'
import { storeToRefs } from 'pinia'                /* nuevo */
import InfoBox from '@/components/InfoBox.vue'
import MobilePreview from '@/components/Custom/MobilePreview.vue'
import DateFormat from '@/components/DateFormat.vue'
import { usePreferencesStore } from '@/stores/preferences' /* nuevo */
import {
  toggleDarkMode,
  availableThemes,
  setFontSize,
  setCustomScrollbar,
  toggleCustomScrollbar,
  setKeepScrollbarPositions,
  toggleKeepScrollbarPositions,
} from '@/utilities/preferencesUtils'


const preferencesStore = usePreferencesStore()
const {
  themeMode: localTheme,
  fontSize: localFontSize,
  customScrollbar: localCustomScrollbar,
  keepScrollbarPositions: localKeepScrollbarPositions,
} = storeToRefs(preferencesStore)

const drawerPreview = ref(false)

function scrollTo(elementId) {
  const element = document.getElementById(elementId)
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.home-view {
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 100vh;
  height: 100vh;
}
.background-shadow-box {
  position: absolute;
  margin: auto;
  border-radius: 50%;
  width: 40vw;
  height: 80vh;
  filter: blur(120px);
  --shadow-box-color: #1089b933;
  --shadow-box-color-2: rgb(0, 183, 255);
  background-image: linear-gradient( 0deg, var(--shadow-box-color) 50%, var(--shadow-box-color) 50%);
  animation: breathing 6s infinite alternate ease-in-out;
}
@keyframes breathing {
  0% {
    box-shadow: 0 0 60px var(--shadow-box-color-2);
  }
  50% {
    box-shadow: 0 0 160px var(--shadow-box-color-2);
  }
  100% {
    box-shadow: 0 0 60px var(--shadow-box-color-2);
  }
}
</style>