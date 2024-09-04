<!-- SplashScreen.vue -->
<template>
  <Transition name="fade-long" mode="out-in">
    <div id="splash-screen" v-if="visible">
      <img :src="SplashImage" :style="{ opacity: imageOpacity }" alt="Logo" class="logo">
      <!-- Añadir logo del hotel abajo del logo de app cuando se carge (hotelSelected) -->
      <div class="text-under-logo" :style="{ opacity: textOpacity }" v-if="showLogo && hotelSelected.id">
        <img :src="getHotelImg()" alt="Hotel Selected Logo"/>
      </div>
    </div>
  </Transition>
</template>

<script>
import { IonLabel } from '@ionic/vue';
import { computed, ref } from 'vue';
import SplashImage from '@/assets/images/Spring_Logo_White.jpg'
import vulcanoLogo from '@/assets/images/logo-vulcano-color.png'
import bitacoraLogo from '@/assets/images/logo-bitacora-color.png'
import granaronaLogo from '@/assets/images/logo-granarona-color.png'
import { onMounted } from 'vue';
import store from '../store';

export default {
  props: ['visible', 'showLogo'],
  components: {
    IonLabel
  },
  setup() {
    const imageOpacity = ref(0); // Opacidad inicial de 0
    const textOpacity = ref(0); // Opacidad inicial de 0
    const hotelSelected = computed(() => store.getters.getHotel || {})

    const getHotelImg = () => {
      return selectedHotelLogo(hotelSelected.value)
    }

    const selectedHotelLogo = (hotel) => {
      if (!hotel) return null
      if (hotel.id == 5) {
        return vulcanoLogo
      } else if (hotel.id == 6) {
        return granaronaLogo
      } else {
        return bitacoraLogo
      }
    }

    onMounted(() => {
      setTimeout(() => {
        imageOpacity.value = 1; // Cambiar opacidad a 1 después de montar
        textOpacity.value = 1 // Cambiar opacidad a 1 despues de montar
      }, 100); // Pequeño retraso para asegurar la carga de la imagen
    });

    return {
      SplashImage,
      imageOpacity,
      hotelSelected,
      textOpacity,
      getHotelImg
    }
  }
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
  width: 100%;
  height: 100%;
  background-color: #ffffff; /* O cualquier otro color que prefieras */
  z-index: 9999;
}

.logo {
  width: 120px; /* Ajusta el tamaño según sea necesario */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0; /* Inicialmente oculto */
  transition: opacity 0.5s ease; /* Transición suave de 1 segundo */
}

.text-under-logo {
  position: absolute;
  text-align: center;
  top: calc(50% + 60px);
  max-height: 16px;
  height: 100%;
  text-transform: uppercase;
  font-weight: 600;
  font-family: var(--ion-font-family);
  transition: opacity 0.5s ease; /* Transición suave de 1 segundo */
  color: rgb(48, 48, 48);
}
.text-under-logo img {
  width: 75%;
  object-fit: contain;
}
</style>