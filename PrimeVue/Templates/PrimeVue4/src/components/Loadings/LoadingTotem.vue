<template>
  <Transition name="fade-long" mode="out-in">
    <div v-if="visible" id="splash-screen" class="select-none">
      <div class="splash-container">
        <div class="spinner-container">
          <div class="custom-spinner" />
          <img
            :src="SplashImage"
            :style="{ opacity: imageOpacity }"
            alt="Logo"
            class="logo-center"
            @load="showImage()"
          />
        </div>
        <div class="py-[70px] px-[10%]">
          <h2 class="font-bold text-5xl c-spring">
            {{ loadingText }}
          </h2>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onBeforeUnmount, watch } from 'vue'
import SplashImage from '@/assets/images/Spring/spring_icon.png'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'entry' // 'entry', 'ordered', 'cancelled'
  }
})

const { t } = useI18n()
const imageOpacity = ref(0)
const loadingText = ref('')
let intervalId = null

const entryKeys = [
  'totemHome.loadingTexts.entryMessages.1',
  'totemHome.loadingTexts.entryMessages.2',
  'totemHome.loadingTexts.entryMessages.3',
  'totemHome.loadingTexts.entryMessages.4',
  'totemHome.loadingTexts.entryMessages.5',
  'totemHome.loadingTexts.entryMessages.6',
  'totemHome.loadingTexts.entryMessages.7',
  'totemHome.loadingTexts.entryMessages.8',
  'totemHome.loadingTexts.entryMessages.9',
  'totemHome.loadingTexts.entryMessages.10',
  'totemHome.loadingTexts.entryMessages.11',
  'totemHome.loadingTexts.entryMessages.12'
]

const orderedKeys = [
  'totemHome.loadingTexts.orderedMessages.1',
  'totemHome.loadingTexts.orderedMessages.2',
  'totemHome.loadingTexts.orderedMessages.3',
  'totemHome.loadingTexts.orderedMessages.4',
  'totemHome.loadingTexts.orderedMessages.5',
  'totemHome.loadingTexts.orderedMessages.6',
  'totemHome.loadingTexts.orderedMessages.7',
  'totemHome.loadingTexts.orderedMessages.8',
  'totemHome.loadingTexts.orderedMessages.9',
  'totemHome.loadingTexts.orderedMessages.10',
  'totemHome.loadingTexts.orderedMessages.11'
]

const cancelledKeys = [
  'totemHome.loadingTexts.cancelledMessages.1',
  'totemHome.loadingTexts.cancelledMessages.2',
  'totemHome.loadingTexts.cancelledMessages.3',
  'totemHome.loadingTexts.cancelledMessages.4',
  'totemHome.loadingTexts.cancelledMessages.5',
  'totemHome.loadingTexts.cancelledMessages.6',
  'totemHome.loadingTexts.cancelledMessages.7',
  'totemHome.loadingTexts.cancelledMessages.8',
  'totemHome.loadingTexts.cancelledMessages.9',
  'totemHome.loadingTexts.cancelledMessages.10',
  'totemHome.loadingTexts.cancelledMessages.11'
]

function showImage() {
  imageOpacity.value = 1
}

function getTextList() {
  if (props.mode === 'entry') {
    return entryKeys
  } else if (props.mode === 'ordered') {
    return orderedKeys
  } else if (props.mode === 'cancelled') {
    return cancelledKeys
  }
  return []
}

function startTextInterval() {
  const textList = getTextList()

  // Establecer un primer texto de inmediato
  const firstIndex = Math.floor(Math.random() * textList.length)
  loadingText.value = t(textList[firstIndex])

  intervalId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * textList.length)
    loadingText.value = t(textList[randomIndex])
  }, 2500)
}

function stopTextInterval() {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// 🔹 Vigilar el visible y gestionar el intervalo
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      startTextInterval()
    } else {
      stopTextInterval()
    }
  }
)

onBeforeUnmount(() => {
  stopTextInterval()
})
</script>

<style scoped>
#splash-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 1);
  z-index: 9999;
}

.splash-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
}

.spinner-container {
  position: relative;
  width: var(--spinner-size, 180px);
  height: var(--spinner-size, 180px);
}

.custom-spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--spinner-size, 180px);
  height: var(--spinner-size, 180px);
  border-radius: 50%;
  background: conic-gradient(
    var(--spinner-color-active, #333) 0% var(--spinner-marked-percent, 30%),
    var(--spinner-color-inactive, #ccc) var(--spinner-marked-percent, 30%) 100%
  );
  mask-image: radial-gradient(farthest-side, transparent calc(100% - var(--spinner-thickness, 12px)), black 0);
  -webkit-mask-image: radial-gradient(farthest-side, transparent calc(100% - var(--spinner-thickness, 12px)), black 0);
  animation: spin var(--spinner-speed, 1s) linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.logo-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: auto;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s ease;
}
</style>
