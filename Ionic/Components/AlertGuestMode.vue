<template>
  <div id="alert">
    <ion-toast ref="toast" :is-open="isOpen" :message="$t('guestViews.homePage.reminderToast')" :buttons="toastButtons"
      @didDismiss="handleDidDismiss()" :color="hotelSelected.name" swipe-gesture="vertical" position="bottom"
      position-anchor="anchorToastGuest" mode="ios" layout="stacked"></ion-toast>
  </div>
  <div id="anchorToastGuest" class="bottom-anchor"></div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { IonButton, IonToast, createAnimation, createGesture } from '@ionic/vue'
import { logoPwa } from 'ionicons/icons';
import { isPlatform } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    IonButton, IonToast
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const isOpen = ref(false)
    const toast = ref(null)
    const hotelSelected = computed(() => store.getters.getHotel || {})
    const { t } = useI18n()
    const INTRO_ANIMATION_TIME = 500

    const toastButtons = [
      {
        text: t('guestViews.homePage.close'),
        role: 'cancel',
        cssClass: ['p-button-link-color', 'button-continue'],
        handler: () => {
          closeToast()
        },
      },
      {
        text: t('guestViews.homePage.login'),
        role: 'info',
        cssClass: ['p-button-link-color', 'button-continue'],
        handler: () => {
          goLogin()
        },
      }
    ];

    function checkRoute() {
      return route.meta.isGuestMode
    }

    function goLogin() {
      router.replace('/login')
    }

    async function closeToast() {
      if (toast.value) {
        console.log(toast.value)
        await toast.value.$el.dismiss();
      }
      isOpen.value = false
    }

    function handleDidDismiss() {
      isOpen.value = false;
    }

    function getWidth() {
      if (isPlatform('mobile')) {
        // Devuelve el ancho de la pantalla
        return {
          toastWidth: window.innerWidth * 0.9, // Ancho del toast, 90% de la pantalla
          closeGapWidth: 0.40, // Porcentaje de deslizamiento para cerrar el toast, (toastWidth * closeGapWidth)
          diffGapWidth: 1 // Solo afecta al efecto de opacidad al deslizar
        }
      } else {
        // Devuelve el ancho del toast
        return {
          toastWidth: 700, // Ancho del toast, 700px
          closeGapWidth: 0.50, // Porcentaje de deslizamiento para cerrar el toast, (toastWidth * closeGapWidth)
          diffGapWidth: 0.7 // Solo afecta al efecto de opacidad al deslizar
        }
      }
    }

    async function createToastGesture() {
      // TODO
      // Gesture para deslizar el toast hacia los lados y borrar el toast como si fuera una notificacion
      const toastElement = await toast.value.$el
      setTimeout(() => {
        // Crear un gesture para el toast
        // toastWith is from shadowRoot
        const { toastWidth, closeGapWidth, diffGapWidth } = getWidth()
        const transitionDuration = 200

        const handleCloseToast = (direction) => {
          toastElement.style.transition = 'opacity 200ms ease-in, transform 200ms ease-in';
          toastElement.style.transform = `translateX(${direction * toastWidth}px)`;
          toastElement.style.opacity = 0;
          toastElement.style.pointerEvents = 'none';
          setTimeout(() => {
            isOpen.value = false;
          }, transitionDuration);
        };

        const gesture = createGesture({
          el: toastElement,
          direction: 'horizontal',
          threshold: 0,
          velocity: 0.5,
          pointers: 1,
          deltaX: 0,
          deltaY: 0,
          duration: 500,
          easing: 'ease-out',
          onMove: (e) => {
            // Al mismo tiempo que se mueve el gesture, se va reduciendo la opacidad del toast de 1 a 0 poco a poco
            if (e.deltaX > 0) {
              toastElement.style.opacity = 1 - e.deltaX / (toastWidth * diffGapWidth)
            } else {
              toastElement.style.opacity = 1 + e.deltaX / (toastWidth * diffGapWidth)
            }
            toastElement.style.transform = `translateX(${e.deltaX}px)`
          },
          onEnd: (e) => {
            // Si al soltar el gesture, se ha deslizado mas de un closeGapWidth establecido
            // Se hace invisible
            // Se cierra el toast a los transitionDuration ms
            if (e.deltaX > toastWidth * closeGapWidth) { // Deslizado hacia la derecha
              handleCloseToast(1);
              return;
            } else if (e.deltaX < -toastWidth * closeGapWidth) { // Deslizado hacia la izquierda
              handleCloseToast(-1);
              return;
            }

            // Si no se ha deslizado hacia la derecha o hacia la izquierda lo suficiente como para cerrar el toast
            toastElement.style.transition = `opacity 200ms ease-in, transform 200ms ease-in`
            toastElement.style.opacity = 1
            toastElement.style.transform = `translateX(0px)`

            setTimeout(() => {
              toastElement.style.transition = `unset`
              toastElement.style.pointerEvents = 'auto'
            }, transitionDuration)
          }
        })
        gesture.enable()
      }, 25)
    }

    onMounted(() => {
      setTimeout(() => {
        isOpen.value = true
      }, INTRO_ANIMATION_TIME)
      createToastGesture()
    })

    onBeforeUnmount(async () => {
      await closeToast()
      console.log('%c [PROCESO] %c Alert Guest Mode Unmounted ', 'font-weight: bold; letter-spacing: 1px; color: #fff; padding: 2px; border-radius: 2px;', 'background: #00695c; color: #fff; padding: 2px; border-radius: 2px;', isOpen.value);
    })

    return {
      isOpen,
      toast,
      toastButtons,
      logoPwa,
      hotelSelected,
      isPlatform,
      checkRoute,
      closeToast,
      handleDidDismiss,
    }
  }
}
</script>

<style scoped>
ion-toast {
  font-size: 14px;
  --border-radius: 6px;
  cursor: pointer;
  user-select: none;
  opacity: 1;
}

#alert {
  height: 10px;
}

#anchorToastGuest {
  position: absolute;
  width: 100%;
}

.bottom-anchor {
  bottom: 0px;
  height: 6px;
}
</style>
