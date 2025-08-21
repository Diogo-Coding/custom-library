<!-- Information:
  All made with tailwind classes so you can just delete template and start your own page,
  also you can copy this view and use it later if needed.
-->
<template>
  <div class="home-view relative h-full w-full" ref="scrollable">
    <div class="absolute z-0 h-full w-full flex justify-center items-center">
      <div class="background-shadow-box w-full"></div>
    </div>
    <section class="text-surface-700 z-[2] relative">
      <!-- Header -->
      <header class="flex flex-col h-screen max-h-screen px-4">
        <div class="grow flex flex-col gap-4 items-center justify-center pt-40">
          <div class="dark:text-surface-300 font-semibold">
            <DateFormat :date="new Date()" display="datetime" :format24h="true" proximity />
          </div>
          <div class="h-full flex flex-col gap-4 items-center justify-center">
            <div>
              <LogoSVG alt="Logo" class="w-32 h-32 text-primary-500" />
            </div>
            <div>
              <h1 class="!mb-0 bold-900 text-center dark:text-surface-50">PrimeVue 4</h1>
              <h2 class="m-0 bold-600 text-center dark:text-surface-50">Basic Template</h2>
            </div>
            <!-- Footer -->
            <div class="footer flex items-center justify-center gap-4 dark:text-surface-50">
              <p class="flex items-center gap-2">
                <i class="pi pi-github"></i>
                <a
                  href="https://github.com/Diogo-Coding"
                  target="_blank"
                  class="text-surface-700 dark:text-surface-300 no-underline hover:underline"
                >
                  My Github
                </a>
              </p>
              <span class="text-sm dark:text-surface-400 select-none">|</span>
              <p class="flex items-center gap-2">
                <i class="pi pi-prime"></i>
                <a
                  href="https://v3.primevue.org/autocomplete/"
                  target="_blank"
                  class="text-surface-700 dark:text-surface-300 no-underline hover:underline"
                >
                  PrimeVue
                </a>
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center pb-20">
          <Button text rounded class="" @click="scrollTo('main-content')">
            <div class="p-2">
              <h2 class="m-0 dark:text-surface-50 text-surface-600 font-medium text-xl text-center">See more</h2>
              <i class="pi pi-chevron-down !text-6xl text-center"></i>
            </div>
          </Button>
        </div>
      </header>

      <!-- Main -->
      <main class="main-content px-8" id="main-content">
        <div class="flex flex-col items-center justify-start h-full w-full py-20">
          <div class="text-center">
            <h2 class="m-0 bold-900 dark:text-surface-50 text-2xl text-center">Features already implemented</h2>
            <small class="m-0 dark:text-surface-300 text-center">
              Check some features and already in this template
            </small>
          </div>
          <div class="!grid grid-cols-1 md:grid-cols-2 items-center justify-center pt-10 md:p-10 w-fit gap-8">
            <InfoBox animated-line lineWidth="120px" class="h-full rounded-2xl">
              <section
                class="flex flex-col bg-surface-100 dark:bg-surface-900 rounded-2xl p-6 h-full shadow ring-1 ring-surface-500/50"
              >
                <div class="flex items-center gap-2 justify-between">
                  <h4 class="text-xl font-bold dark:text-surface-50 m-0">Components</h4>
                  <Tag icon="pi pi-exclamation-circle" severity="warn" value="Work In Progress"></Tag>
                </div>
                <Divider />
                <div class="flex flex-col gap-4 justify-center pt-2">
                  <!-- Routes -->
                  <div class="flex flex-col gap-2">
                    <RouterLink
                      :to="'/templates'"
                      class="text-surface-700 dark:text-surface-300 no-underline hover:underline"
                    >
                      <Button label="Templates" severity="secondary"></Button>
                    </RouterLink>
                    <RouterLink
                      :to="'/not-found'"
                      class="text-surface-700 dark:text-surface-300 no-underline hover:underline"
                    >
                      <Button label="Not Found" severity="secondary"></Button>
                    </RouterLink>
                    <RouterLink
                      :to="'/errors/something-went-wrong'"
                      class="text-surface-700 dark:text-surface-300 no-underline hover:underline"
                    >
                      <Button label="Something Went Wrong" severity="secondary"></Button>
                    </RouterLink>
                    <RouterLink
                      :to="'/dev/configuration'"
                      class="text-surface-700 dark:text-surface-300 no-underline hover:underline"
                    >
                      <Button label="Configuration" severity="secondary"></Button>
                    </RouterLink>
                    <div>
                      <Drawer
                        v-model:visible="drawerPreview"
                        position="right"
                        :showCloseIcon="false"
                        class="w-fit max-w-screen md:rounded-2xl h-full md:h-[95vh] mr-0 !bg-transparent border-none shadow-none"
                      >
                        <template #container="{}">
                          <div class="flex items-center justify-center w-full h-full pr-[5vh]">
                            <MobilePreview
                              url="https://hello.springhoteles.com/"
                              @close="drawerPreview = false"
                              class="shadow-lg"
                            />
                          </div>
                        </template>
                      </Drawer>
                      <Button
                        icon="pi pi-arrow-up-right-and-arrow-down-left-from-center"
                        iconPos="right"
                        label="Mobile Preview"
                        severity="secondary"
                        @click="drawerPreview = true"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </InfoBox>

            <InfoBox animated-line lineWidth="120px" class="h-full rounded-2xl">
              <section
                class="flex flex-col bg-surface-100 dark:bg-surface-900 rounded-2xl p-6 h-full shadow ring-1 ring-surface-500/50"
              >
                <div>
                  <h4 class="text-xl font-bold m-0 dark:text-surface-50">Options</h4>
                </div>
                <Divider />
                <div class="flex flex-col gap-4 justify-center pt-2">
                  <!-- Theme Selector -->
                  <div class="flex flex-col gap-2 pb-4">
                    <h4 class="m-0 font-semibold dark:text-surface-300">Theme</h4>
                    <div class="flex flex-col items-center gap-1 p-2 bg-white dark:bg-surface-800 shadow rounded-lg">
                      <div class="flex items-center gap-1 w-full">
                        <Button
                          v-for="theme in availableThemes()"
                          :key="theme"
                          :label="theme.name"
                          :severity="theme.value == localTheme ? 'primary' : 'secondary'"
                          :icon="theme.icon"
                          :text="theme.value != localTheme"
                          class="w-full px-4"
                          @click="theme.function()"
                        />
                      </div>
                      <div class="px-1 w-full">
                        <Divider class="m-0 py-1" />
                      </div>
                      <ChipButton
                        class="w-full text-center font-semibold"
                        severity="primary"
                        v-ripple
                        @click="toggleDarkMode()"
                      >
                        Toggle Theme
                      </ChipButton>
                    </div>
                  </div>
                  <!-- Font Size Selector -->
                  <div class="flex flex-col gap-2 pb-4">
                    <h4 class="m-0 font-semibold dark:text-surface-300">Font Size</h4>
                    <div class="flex flex-col gap-1 p-2 bg-white dark:bg-surface-800 shadow rounded-lg">
                      <div class="grid grid-cols-4 gap-1 w-full">
                        <Button
                          label="Small"
                          :severity="localFontSize == 12 ? 'primary' : 'secondary'"
                          :text="localFontSize != 12"
                          class="w-full"
                          @click="setFontSize(12)"
                        />
                        <Button
                          label="Normal"
                          :severity="localFontSize == 14 ? 'primary' : 'secondary'"
                          :text="localFontSize != 14"
                          class="w-full"
                          @click="setFontSize(14)"
                        />
                        <Button
                          label="Big"
                          :severity="localFontSize == 16 ? 'primary' : 'secondary'"
                          :text="localFontSize != 16"
                          class="w-full"
                          @click="setFontSize(16)"
                        />
                        <Button
                          label="Giant"
                          :severity="localFontSize == 18 ? 'primary' : 'secondary'"
                          :text="localFontSize != 18"
                          class="w-full"
                          @click="setFontSize(18)"
                        />
                      </div>
                      <div class="px-1 w-full">
                        <Divider class="m-0 py-1" />
                      </div>
                      <ChipButton
                        class="w-full text-center font-semibold"
                        severity="primary"
                        v-ripple
                        @click="setFontSize(14)"
                      >
                        Reset Font Size
                      </ChipButton>
                    </div>
                  </div>
                  <!-- Custom Scrollbar Selector -->
                  <div class="flex flex-col gap-2 pb-4">
                    <h4 class="m-0 font-semibold dark:text-surface-300">Custom Scrollbar</h4>
                    <div class="flex flex-col items-center gap-1 p-2 bg-white dark:bg-surface-800 shadow rounded-lg">
                      <div class="flex items-center gap-1 w-full">
                        <Button
                          label="Custom"
                          :severity="localCustomScrollbar ? 'primary' : 'secondary'"
                          :text="!localCustomScrollbar"
                          class="w-full"
                          @click="setCustomScrollbar(true)"
                        />
                        <Button
                          label="Native"
                          :severity="!localCustomScrollbar ? 'primary' : 'secondary'"
                          :text="localCustomScrollbar"
                          class="w-full"
                          @click="setCustomScrollbar(false)"
                        />
                      </div>
                      <div class="px-1 w-full">
                        <Divider class="m-0 py-1" />
                      </div>
                      <ChipButton
                        class="w-full text-center font-semibold"
                        severity="primary"
                        v-ripple
                        @click="toggleCustomScrollbar()"
                      >
                        Toggle Custom Scrollbar
                      </ChipButton>
                    </div>
                  </div>
                  <!-- Keep Scrollbar Position Selector -->
                  <div class="flex flex-col gap-2 pb-4">
                    <h4 class="m-0 font-semibold dark:text-surface-300">Keep Scrollbar Position</h4>
                    <div class="flex flex-col items-center gap-1 p-2 bg-white dark:bg-surface-800 shadow rounded-lg">
                      <div class="flex items-center gap-1 w-full">
                        <Button
                          label="Save"
                          :severity="localKeepScrollbarPositions ? 'primary' : 'secondary'"
                          :text="!localKeepScrollbarPositions"
                          class="w-full"
                          @click="setKeepScrollbarPositions(true)"
                        />
                        <Button
                          label="No Save"
                          :severity="!localKeepScrollbarPositions ? 'primary' : 'secondary'"
                          :text="localKeepScrollbarPositions"
                          class="w-full"
                          @click="setKeepScrollbarPositions(false)"
                        />
                      </div>
                      <div class="px-1 w-full">
                        <Divider class="m-0 py-1" />
                      </div>
                      <ChipButton
                        class="w-full text-center font-semibold"
                        severity="primary"
                        v-ripple
                        @click="toggleKeepScrollbarPositions()"
                      >
                        Toggle Save Scrollbar Positions
                      </ChipButton>
                    </div>
                  </div>
                </div>
              </section>
            </InfoBox>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="p-10">
        <div class="footer flex items-center justify-center gap-4 dark:text-surface-50">
          <p class="flex items-center gap-2">
            <i class="pi pi-github"></i>
            <a
              href="https://github.com/Diogo-Coding"
              target="_blank"
              class="text-surface-700 dark:text-surface-300 no-underline hover:underline"
            >
              My Github
            </a>
          </p>
          <span class="text-sm dark:text-surface-400 select-none">|</span>
          <p class="flex items-center gap-2">
            <i class="pi pi-prime"></i>
            <a
              href="https://v3.primevue.org/autocomplete/"
              target="_blank"
              class="text-surface-700 dark:text-surface-300 no-underline hover:underline"
            >
              PrimeVue
            </a>
          </p>
        </div>
      </footer>
    </section>
  </div>
</template>

<script setup>
import LogoSVG from '@/assets/favicon.svg'
import ChipButton from '@/components/ChipButtons/ChipButton.vue'

import { ref } from 'vue'
import { storeToRefs } from 'pinia' /* nuevo */
import InfoBox from '@/components/Custom/InfoBox.vue'
import MobilePreview from '@/components/Custom/MobilePreview.vue'
import DateFormat from '@/components/Custom/DateFormat.vue'
import { usePreferencesStore } from '@/stores/preferences' /* nuevo */
import {
  toggleDarkMode,
  availableThemes,
  setFontSize,
  setCustomScrollbar,
  toggleCustomScrollbar,
  setKeepScrollbarPositions,
  toggleKeepScrollbarPositions
} from '@/utilities/preferencesUtils'

const preferencesStore = usePreferencesStore()
const {
  themeMode: localTheme,
  fontSize: localFontSize,
  customScrollbar: localCustomScrollbar,
  keepScrollbarPositions: localKeepScrollbarPositions
} = storeToRefs(preferencesStore)

const drawerPreview = ref(false)

function scrollTo(elementId) {
  const element = document.getElementById(elementId)
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.background-shadow-box {
  position: absolute;
  border-radius: 50%;
  width: 100%;
  height: 80vh;
  filter: blur(120px);
  --shadow-box-color: #1089b933;
  --shadow-box-color-2: rgb(0, 183, 255);
  background-image: linear-gradient(0deg, var(--shadow-box-color) 50%, var(--shadow-box-color) 50%);
  animation: breathing 6s infinite alternate ease-in-out;
  /* Center absolute positioned element */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
