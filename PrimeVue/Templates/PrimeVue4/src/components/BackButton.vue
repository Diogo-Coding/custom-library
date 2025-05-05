<template>
  <Button class="back-button" type="button" 
    :rounded="rounded" 
    :text="text"
    :outlined="outlined"
    :label="label" 
    :icon="icon"
    :severity="severity"
    :size="size"
    @click="goBack()"
  ></Button>
</template>

<script setup>
import { useRouter } from 'vue-router'

/**
 * @typedef {Object} Props
 * @property {string} [label] - Texto mostrado en el botón.
 * @property {boolean} [text=false] - Si es `true`, el botón se muestra como texto (sin fondo ni borde).
 * @property {boolean} [outlined=false] - Si es `true`, el botón tiene un borde visible.
 * @property {boolean} [rounded=false] - Si es `true`, el botón tendrá bordes redondeados.
 * @property {string} [severity='primary'] - Nivel de severidad del botón (primary, secondary, success, info, warning, help, danger).
 * @property {string} [icon] - Icono que se muestra en el botón (por ejemplo, `pi pi-arrow-left`).
 * @property {string|null} [size] - Tamaño del botón (`small`, `large`, o `null` para el valor por defecto).
 */

/** @type {Props} */
defineProps({
  label: {
    type: String,
    default: '',
  },
  text: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  severity: {
    type: String,
    default: 'primary',
  },
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: null,
  }
})

const router = useRouter()

/**
 * Navega a la ruta anterior si existe en el historial,
 * o redirige a la raíz ('/') si no hay ruta previa.
 */
function goBack() {
  if (router.options.history.state.back) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>
