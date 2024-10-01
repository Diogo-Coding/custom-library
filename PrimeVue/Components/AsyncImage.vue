<template>
  <div class="relative">
    <div class="h-full w-full">
      <img 
        @load="load_state = true" 
        @error="onError" 
        :src="currentSrc" 
        :alt="alt" 
        :class="[{ 'opacity-0': !load_state, 'object-cover': cover }, rounded]" 
        class="bg-slate-300" 
        height="100%" 
        width="100%"
      />
    </div>
    <div :class="[{ 'opacity-0': load_state }, rounded, `duration-${500}`]" class="transition-opacity absolute inset-0 flex items-center justify-center bg-slate-300">
      <i class="pi pi-spinner pi-spin text-slate-500" :class="[iconSize]"></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import defaultImage from '../assets/images/placeholder-image.webp';

const load_state = ref(false);
const currentSrc = ref('');

const props = defineProps({
  src: {
    type: String,
    default: 'Sin definir',
  },
  alt: {
    type: String,
    default: 'Sin definir',
  },
  cover: {
    type: Boolean,
    default: true,
  },
  rounded: {
    type: String,
    default: 'rounded-lg',
  },
  duration: {
    type: Number,
    default: 500,
  },
  iconSize: {
    type: String,
    default: 'text-base',
  },
  fallbackImage: {
    type: String,
    default: defaultImage,
  },
});

// Inicializa la imagen actual con el src original
currentSrc.value = props.src;

// Método para manejar el error y cambiar al fallback
function onError() {
  currentSrc.value = props.fallbackImage;
}
</script>

<style scoped>

</style>
