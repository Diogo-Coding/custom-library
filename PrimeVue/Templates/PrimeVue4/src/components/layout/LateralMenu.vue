<template>
  <div
    class="lateral-menu absolute top-0 left-0 overflow-hidden transition-[translate,background,color,backdrop-filter] duration-350 border-r-surface-300 dark:border-r-surface-800 border-r shadow-lg bg-white dark:bg-surface-950"
    :class="{
      'translate-x-0': isShowLateralMenu,
      '-translate-x-full': !isShowLateralMenu,
      'bg-white/60 dark:bg-surface-950/60 backdrop-blur-md': !preferencesStore.lateralMenu
    }"
    @mouseenter="isHoveringMenu = true"
    @mouseleave="isHoveringMenu = false"
  >
    <OsContainer
      :options="{
        overflow: { x: 'hidden', y: 'scroll' },
        scrollbars: { autoHide: 'leave', autoHideDelay: 150, touchSupport: true }
      }"
    >
      <div class="w-full flex flex-col h-full relative" ref="menuRef">
        <div class="menu w-full h-full flex flex-col">
          <div class="menu-header sticky top-0 z-2">
            <div class="flex flex-col items-center gap-4 p-4 w-full">
              <h1>Header</h1>
            </div>
            <Divider class="m-0" />
          </div>

          <div class="menu-content flex grow">
            <div class="flex flex-col items-center gap-4 p-4 w-full">
              <h1>Content</h1>
              <div class="flex items-center flex-wrap justify-center gap-4 w-full">
                <div class="flex flex-col items-center gap-1 p-2 bg-white dark:bg-surface-800 shadow rounded-lg">
                  <div class="flex items-center gap-1 w-full">
                    <ChipButton
                      @click="preferencesStore.lateralMenu = !preferencesStore.lateralMenu"
                      class="rounded-none"
                      :severity="preferencesStore.lateralMenu ? 'warn' : 'secondary'"
                      :rippleColor="true"
                      v-ripple
                    >
                      <div class="transition-container">
                        <!-- Fake ghost block to reserve height -->
                        <div class="ghost-measurer" aria-hidden="true">
                          <div class="flex items-center gap-2 w-full">
                            <div>
                              <IconPinOff class="w-5 h-5" />
                            </div>
                          </div>
                        </div>

                        <!-- Animated content -->
                        <Transition name="slide-up">
                          <div v-if="preferencesStore.lateralMenu" class="transition-content">
                            <div>
                              <IconPinOff class="w-5 h-5" />
                            </div>
                          </div>
                          <div v-else class="transition-content">
                            <div>
                              <IconPin class="w-5 h-5" />
                            </div>
                          </div>
                        </Transition>
                      </div>
                    </ChipButton>
                  </div>
                </div>
                <ToggleDarkMode />
              </div>
            </div>
          </div>

          <Divider class="m-0" />

          <div class="menu-footer flex flex-col py-6 px-4 w-full gap-2 text-center">
            <div class="text-sm text-surface-600 dark:text-surface-400">
              <a href="https://www.springhoteles.com/" target="_blank">
                <span class="cursor-pointer">@Spring Hotels Group</span>
              </a>
            </div>
            <div class="text-sm text-surface-600 dark:text-surface-400">
              <RouterLink to="/version.json" target="_blank">
                <span class="cursor-pointer">Version {{ '0.0.0' }}</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </OsContainer>
  </div>
  <div
    class="safe-zone-active absolute top-0 left-0 z-99 w-[20px] h-full"
    @mouseenter="isHoveringSafeZone = true"
    @mouseleave="isHoveringSafeZone = false"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePreferencesStore } from '@/stores/preferences'
import ChipButton from '../ChipButtons/ChipButton.vue'
import ToggleDarkMode from '../Testing/ToggleDarkMode.vue'
import OsContainer from '../Scroll/OsContainer.vue'

const preferencesStore = usePreferencesStore()
const isHoveringSafeZone = ref(false)
const isHoveringMenu = ref(false)

const menuRef = ref(null)

const isShowLateralMenu = computed(() => {
  return preferencesStore.lateralMenu || isHoveringSafeZone.value || isHoveringMenu.value
})
</script>

<style scoped>
.lateral-menu {
  width: var(--lateral-menu-width);
  min-width: var(--lateral-menu-width);
  max-width: var(--lateral-menu-width);
  height: 100%;
  z-index: 900;
}
.transition-container {
  position: relative;
  width: 100%;
}

.transition-content {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* Ghost placeholder to reserve space */
.ghost-measurer {
  visibility: hidden;
  pointer-events: none;
  height: auto;
}
.background-shadow-totem {
  z-index: 2;
  min-height: 100%;
  min-width: 100%;
  position: absolute;
  top: 0;
  background: linear-gradient(
    to top,
    rgba(10, 10, 10, 0.9) 0%,
    rgba(36, 36, 36, 0.75) 50%,
    rgba(72, 72, 72, 0.25) 100%
  );
}
</style>
