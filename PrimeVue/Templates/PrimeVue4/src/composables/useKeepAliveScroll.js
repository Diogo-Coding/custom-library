// src/composables/useKeepAliveScroll.js

import { ref, onMounted, onBeforeUnmount, onActivated, onDeactivated, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { usePreferencesStore } from '@/stores/preferences'

/**
 * Composable para guardar y restaurar la posición de scroll (x, y)
 * de un elemento interno (por ejemplo, con class="keep-alive-scrollbar"),
 * de forma única por ruta y asociada al browserSessionId.
 *
 * Cuando el browserSessionId del objeto guardado NO coincide con el
 * browserSessionId actual, se dispara la limpieza de TODAS las entradas
 * excepto la de la ruta actual.
 *
 * @param {import('vue').Ref<HTMLElement|null>} elRef  — ref al contenedor scrollable
 */
export function useKeepAliveScroll(elRef) {
  const route = useRoute()
  const appStore = useAppStore()
  const preferencesStore = usePreferencesStore()

  // ------------------------------------------------------------
  // 1) currentKey: clave “vieja” que identifica esta instancia
  // ------------------------------------------------------------
  const currentKey = ref(route.fullPath)
  // console.log('[Init] currentKey inicial =', currentKey.value)

  // ------------------------------------------------------------
  // 2) Función auxiliar: restoreOrReset
  // ------------------------------------------------------------
  function restoreOrReset(key) {
    // Si el usuario deshabilitó la preferencia, forzamos scroll a 0,0
    if (!preferencesStore.keepScrollbarPositions) {
      nextTick(() => {
        if (elRef.value) {
          elRef.value.scrollLeft = 0
          elRef.value.scrollTop = 0
          // console.log(`[restoreOrReset] Preferencia desactivada; scrollLeft/scrollTop = 0 en ruta "${key}"`)
        }
      })
      return
    }

    nextTick(() => {
      // Obtenemos desde Pinia la posición guardada para esta clave (si existe)
      const savedObj = appStore.getScrollPosition(key)
      // console.log('[restoreOrReset]', 'clave =', key, '| savedObj =', savedObj)

      // Si existe una posición previa, pero el browserSessionId guardado NO coincide,
      // es nueva sesión → limpiamos todas las entradas salvo esta key:
      // if (savedObj && savedObj.browserSessionId !== appStore.sessionId) {
      //   console.log(
      //     `[restoreOrReset] Detectado nuevo browserSessionId. Limpio todo salvo la clave "${key}".`
      //   )
      //   appStore.clearOtherScrollPositions({ key })
      //   // Ahora savedObj sigue existiendo, así que restauramos de todos modos.
      // }

      // Tras posible limpieza, comprobamos si hay un savedObj actualizado:
      const finalObj = appStore.getScrollPosition(key)
      if (finalObj && elRef.value) {
        elRef.value.scrollLeft = finalObj.x
        elRef.value.scrollTop = finalObj.y
        // console.log(
        //   `[restoreOrReset] Aplicando scrollLeft = ${finalObj.x}, scrollTop = ${finalObj.y} en ruta "${key}" (browserSessionId=${finalObj.browserSessionId})`
        // )
      } else if (elRef.value) {
        elRef.value.scrollLeft = 0
        elRef.value.scrollTop = 0
        // console.log(
        //   `[restoreOrReset] No había valor (o se limpió). Forzando scrollLeft/scrollTop = 0 en ruta "${key}".`
        // )
      }
    })
  }

  // ------------------------------------------------------------
  // 3) onMounted
  // ------------------------------------------------------------
  onMounted(() => {
    const key = currentKey.value
    // console.log('[onMounted] Montando componente; key actual =', key)
    restoreOrReset(key)
  })

  // ------------------------------------------------------------
  // 4) onActivated (keep-alive)
  // ------------------------------------------------------------
  onActivated(() => {
    const key = currentKey.value
    // console.log('[onActivated] Reactivando componente; key actual =', key)
    restoreOrReset(key)
  })

  // ------------------------------------------------------------
  // 5) onDeactivated (keep-alive)
  // ------------------------------------------------------------
  onDeactivated(() => {
    const key = currentKey.value

    if (elRef.value && preferencesStore.keepScrollbarPositions) {
      const x = elRef.value.scrollLeft
      const y = elRef.value.scrollTop

      // Guardamos en Pinia: key + x + y (la action añade browserSessionId)
      appStore.setScrollbarPosition({ key, x, y })
      // console.log(`[onDeactivated] Guardando scrollLeft = ${x}, scrollTop = ${y} para ruta "${key}".`)
    } else {
      // console.log(`[onDeactivated] No guarda posición porque la preferencia está desactivada (ruta="${key}").`)
    }
  })

  // ------------------------------------------------------------
  // 6) onBeforeUnmount (desmontado “a lo bruto”)
  // ------------------------------------------------------------
  onBeforeUnmount(() => {
    const key = currentKey.value

    if (elRef.value && preferencesStore.keepScrollbarPositions) {
      const x = elRef.value.scrollLeft
      const y = elRef.value.scrollTop
      appStore.setScrollbarPosition({ key, x, y })
      // console.log(`[onBeforeUnmount] Guardando scrollLeft = ${x}, scrollTop = ${y} para ruta "${key}".`)
    } else {
      // console.log(`[onBeforeUnmount] No guarda posición porque la preferencia está desactivada (ruta="${key}").`)
    }
  })

  // ------------------------------------------------------------
  // 7) watch de route.fullPath
  // ------------------------------------------------------------
  watch(
    () => route.fullPath,
    (newKey, oldKey) => {
      // console.log(`[watch fullPath] Cambio de ruta detectado: ${oldKey} → ${newKey}`)

      // 7a) Guardar scroll bajo la clave “vieja”
      if (elRef.value && preferencesStore.keepScrollbarPositions) {
        const xOld = elRef.value.scrollLeft
        const yOld = elRef.value.scrollTop
        appStore.setScrollbarPosition({ key: currentKey.value, x: xOld, y: yOld })
        // console.log(
        //   `[watch fullPath] Guardando posición antigua; clave="${currentKey.value}", scrollLeft=${xOld}, scrollTop=${yOld}.`
        // )
      } else {
        // console.log(
        //   `[watch fullPath] No guarda posición antigua porque la preferencia está desactivada (clave="${currentKey.value}").`
        // )
      }

      // 7b) Actualizar currentKey a la nueva ruta
      currentKey.value = newKey
      // console.log('[watch fullPath] currentKey ahora =', currentKey.value)

      // 7c) Restaurar o resetear scroll en la ruta nueva
      restoreOrReset(newKey)
    }
  )
}
