<!-- SplashScreen.vue -->
<template>
  <Transition name="fade-long" mode="out-in">
    <div v-if="visible" id="splash-screen" class="select-none">
      <div class="splash-container">
        <div class="splash">
          <img :src="SplashImage" :style="{ opacity: imageOpacity }" alt="Logo" class="logo" @load="showImage()" />
          <div class="px-[20px] py-[10px]">
            <ProgressBar mode="indeterminate" style="height: 6px" class="b-spring" />
          </div>
        </div>
        <!-- <div class="bottom-text">
            <i class="pi pi-spin pi-spinner"></i>
            Cargando pagina
          </div> -->
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import SplashImage from '@/assets/images/Spring/Spring_Logo_White.jpg'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

console.log('LoadingPage:', props.visible)

const imageOpacity = ref(0) // Opacidad inicial de 0
const textOpacity = ref(0) // Opacidad inicial de 0

function showImage() {
  imageOpacity.value = 1 // Cambiar opacidad a 1 después de montar
  textOpacity.value = 1 // Cambiar opacidad a 1 despues de montar
}
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
  background-color: #ffffff; /* O cualquier otro color que prefieras */
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

.splash {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bottom-text {
  position: absolute;
  bottom: 8%;
  left: 0;
  right: 0;
  text-align: center;
}

.logo {
  width: 140px; /* Ajusta el tamaño según sea necesario */
  opacity: 0; /* Inicialmente oculto */
  transition: opacity 0.5s ease; /* Transición suave de 1 segundo */
}
</style>
