<template>
  <div class="main-page bg-surface-200/50 dark:bg-surface-900" :style="{ color: 'var(--p-text-color)' }">
    <div class="main-container relative flex">
      <LateralMenu />
      <div
        class="router-view-content flex flex-col grow w-0 transition-[margin-left] duration-350"
        id="templates-router-view-content"
        ref="scrollable"
        :class="{ 'with-menu': isShowLateralMenu }"
      >
        <NavigationBar
          :animatedOnScroll="true"
          :scrollThreshold="0"
          scrollTarget="#templates-router-view-content"
          class="z-800 sticky top-0"
        />
        <router-view v-slot="{ Component, route }">
          <Transition :name="route.meta.transition || 'fade'" mode="out-in">
            <keep-alive :include="cachedRouteNames">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import LateralMenu from '@/components/layout/LateralMenu.vue'
import NavigationBar from '@/components/layout/NavigationBar.vue'
import { usePreferencesStore } from '@/stores/preferences'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const preferencesStore = usePreferencesStore()
const isShowLateralMenu = computed(() => preferencesStore.lateralMenu)

const router = useRouter()
const route = useRoute()
const scrollable = ref(null)

// Watch route.fullPath and reset scroll position to 0
watch(
  () => route.fullPath,
  () => {
    if (scrollable.value) {
      scrollable.value.scrollLeft = 0
      scrollable.value.scrollTop = 0
    }
  }
)

const cachedRouteNames = computed(() =>
  router
    .getRoutes()
    .filter((r) => r.meta?.keepAlive && r.name)
    .map((r) => r.name)
)
</script>

<style scoped>
.main-page {
  height: 100vh;
  width: 100vw;
  overflow: hidden; /* ok si el scroll lo hace router-view-content */
  display: flex;
  flex-direction: column;
}

.main-container {
  /* overflow: hidden;  <- quítalo */
  flex-grow: 1;
  height: auto;
  min-height: 0; /* <-- clave para permitir scroll del hijo */
}

.router-view-content {
  overflow: auto; /* <-- el que scrollea */
  min-height: 0; /* <-- imprescindible en flex */
}

.with-menu {
  margin-left: var(--lateral-menu-width);
}
</style>
