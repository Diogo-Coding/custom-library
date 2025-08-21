<template>
  <div ref="rootEl" class="os-container" :style="containerStyle">
    <slot />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { OverlayScrollbars } from 'overlayscrollbars'
// Asegúrate de cargar los estilos en tu entry principal:
// import 'overlaysscrollbars/styles/overlayscrollbars.css'

/**
 * Props:
 * - options: opciones adicionales de OverlayScrollbars (se mezclan con las por defecto)
 * - style: estilos inline para el contenedor (por ejemplo, height: '100%')
 * - observeHtmlDark: si true, observará la clase 'dark' del <html>
 * - dark: permite forzar el modo oscuro manualmente si no quieres observar el <html>
 */
const props = defineProps({
  options: { type: Object, default: () => ({}) },
  style: { type: [String, Object, Array], default: '' },
  observeHtmlDark: { type: Boolean, default: true },
  dark: { type: Boolean, default: undefined }
})

const rootEl = ref(null)
const osInstance = ref(null)
let htmlClassObserver

const isDark = ref(props.dark !== undefined ? props.dark : document.documentElement.classList.contains('dark'))

const osTheme = computed(() => (isDark.value ? 'os-theme-light' : 'os-theme-dark'))

const baseOptions = computed(() => ({
  scrollbars: {
    autoHide: 'leave',
    autoHideDelay: 150,
    touchSupport: true,
    theme: osTheme.value
  },
  ...props.options
}))

const containerStyle = computed(() => props.style)

/**
 * Exponemos un método por si quieres acceder a la instancia desde el padre:
 * const inst = $refs.miCont?.getInstance()
 */
function getInstance() {
  return osInstance.value
}
defineExpose({ getInstance })

onMounted(() => {
  // Observar cambios en la clase del <html> para reactividad real del tema
  if (props.observeHtmlDark && props.dark === undefined) {
    htmlClassObserver = new MutationObserver(() => {
      isDark.value = document.documentElement.classList.contains('dark')
    })
    htmlClassObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
  }

  if (rootEl.value) {
    osInstance.value = OverlayScrollbars(rootEl.value, baseOptions.value)
  }

  // Actualiza SOLO el tema cuando cambie
  watch(osTheme, (newTheme) => {
    osInstance.value?.options({ scrollbars: { theme: newTheme } })
  })

  // Si cambian otras opciones, las aplicamos (deep)
  watch(
    () => props.options,
    (newOpts) => {
      if (!osInstance.value) return
      // Mantenemos el theme calculado y mezclamos el resto
      osInstance.value.options({
        ...newOpts,
        scrollbars: {
          ...(newOpts?.scrollbars || {}),
          theme: osTheme.value
        }
      })
    },
    { deep: true }
  )

  // Si el prop 'dark' cambia externamente
  watch(
    () => props.dark,
    (val) => {
      if (val === undefined) return
      isDark.value = !!val
    }
  )
})

onBeforeUnmount(() => {
  htmlClassObserver?.disconnect()
  osInstance.value?.destroy()
  osInstance.value = null
})
</script>

<style scoped>
.os-container {
  /* Ajusta a tus necesidades */
  width: 100%;
  height: 100%;
  min-height: 0; /* útil en layouts con flex */
}
</style>
