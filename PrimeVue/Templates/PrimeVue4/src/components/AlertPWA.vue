<template>
  <pwa-install 
    manifest-url="/manifest.webmanifest"
    manual-chrome="true"
    disable-screenshots="true"
  ></pwa-install>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import '@khmyznikov/pwa-install'

import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const isOpen = ref(true)
const PWAStatus = computed(() => appStore.getPWAStatus)
const PWAEvent  = computed(() => appStore.getPWAEvent)

onMounted(() => {
  const pwaElement = document.getElementsByTagName('pwa-install')[0]

  pwaElement.addEventListener('pwa-user-choice-result-event', event => {
    if (event.detail.message === 'dismissed') {
      isOpen.value = false
      appStore.setPWAStatus('PWA_IGNORED')
    } else {
      isOpen.value = true
      appStore.setPWAStatus('PWA_INSTALLED')
    }
  })

  if (PWAStatus.value === 'PROMPT_AVAILABLE') {
    pwaElement.externalPromptEvent = PWAEvent.value
    pwaElement.showDialog()
  }

  pwaElement.addEventListener('pwa-install-available-event', () => {
    if (PWAStatus.value === 'PROMPT_AVAILABLE' && PWAStatus.value !== 'PWA_IGNORED') {
      pwaElement.showDialog()
    }
  })
})

/* -------- variables expuestas al template -------- */
defineExpose({ isOpen, PWAEvent })
</script>


<style scoped>
ion-toast {
  font-size: 14px;
  --border-radius: 12px;
  --box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, 
                rgba(0, 0, 0, 0.12) 0px 12px 30px, 
                rgba(0, 0, 0, 0.12) 0px 4px 6px, 
                rgba(0, 0, 0, 0.17) 0px 12px 13px, 
                rgba(0, 0, 0, 0.09) 0px 3px 5px;}
#alert {
  height: 10px;
}
#anchorToast {
  position: absolute;
  width: 100%;
}
.top-anchor {
  top: 0px;
}
.right-anchor {
  right: 0px;
}
.left-anchor {
  left: 0px;
}
.bottom-anchor {
  bottom: 0px;
  height: 6px;
}
:host(.toast-content) {
  padding: 0 !important;
}
ion-toast::part(container) {
  text-align: center !important;
  width: 100% !important;
  display: flex;
  justify-content: center;
}
ion-toast::part(message) {
  font-weight: 400;
  height: 0 !important;
}
ion-toast::part(container) .toast-content {
  padding: 0 !important;
}
ion-toast::part(button) {
  font-size: 14px;
  text-align: center !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding-block: 0;
  width: 100%;
  margin: 8px;
  color: var(--ion-color-spring);
  background-color: rgba(var(--ion-color-spring-rgb), 0.1)
}
</style>