<!-- SplashScreen.vue -->
<template>
  <Transition name="fade-long" mode="out-in">
    <div v-if="isLoading" id="splash-screen" class="select-none loadingOverlay">
      <div class="splash-container">
        <div class="splash">
          <div class="px-[20px] py-[10px] text-white font-semibold text-lg flex flex-col gap-2">
            <label>Loading</label>
            <ProgressBar mode="indeterminate" style="height: 6px" class="b-spring w-[120px]" />
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
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

console.log('LoadingPage:', props.isLoading)
</script>

<style scoped>
#splash-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9800;
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
  border-radius: 6px;
  /* Remove background from image */
}
</style>
