<template>
  <ion-img
    :src="imageSrc"
    :alt="alt"
    @ionImgDidLoad="handleImageLoaded(true)"
    @ionError="handleImageLoaded('ERROR')"
    :style="{ height: height ? height : '', width: width ? width : '' }"
    :class="isLoaded === true || isLoaded == 'Failed' ? 'isLoaded' : ''"
    ref="imageElement"
  />
</template>


<script>
import { onMounted, ref } from 'vue';
import { IonSpinner, IonIcon, IonImg } from '@ionic/vue';
import { image } from 'ionicons/icons';

export default {
  /**
   * Componente de carga de imagen animada con Spinner
   * @description Imagen con carga animada, opcion de colocar spinner y estilos personalizados.
   * @props {String} src - La fuente de la imagen.
   * @props {String} [alt='Image'] - El texto alternativo de la imagen.
   * @props {String} [height=''] - La altura de la imagen.
   * @props {String} [width=''] - El ancho de la imagen.
   * @props {Boolean} [spinner=false] - Muestra un spinner si es verdadero.
   * @props {String} [spinnerType='dots'] - El tipo de spinner, por defecto 'dots'.
   */
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Image'
    },
    height: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    spinner: {
      type: Boolean,
      default: false
    },
    spinnerType: {
      type: String,
      default: 'dots'
    },
    defaultImage: {
      type: String,
      default: ''
    },
  },
  components: {
    IonSpinner, IonIcon, IonImg
  },
  setup(props) {
    const isLoaded = ref(false);
    const imageElement = ref(null)
    const imageSrc = ref(null)

    function handleImageLoaded(status) {
      if (status == 'ERROR') {
        if (props.defaultImage) {
          imageSrc.value = props.defaultImage
        }
      }
      isLoaded.value = status;
    }

    onMounted(() => {
      if (props.src) imageSrc.value = props.src
    })

    return {
      isLoaded,
      handleImageLoaded,
      image,
      imageElement,
      imageSrc
    };
  }
};
</script>


<style scoped>
.lazy-image, .lazy-image-wrapper, .error-loading, .lazy-image-error {
  height: 100%;
}

ion-img {
  overflow: hidden;
  object-fit: cover;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease-in;
}

ion-img::part(image) {
  object-fit: cover;
  object-position: center;
  display: flex;
}

ion-img.isLoaded {
  opacity: 1;
}

.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
