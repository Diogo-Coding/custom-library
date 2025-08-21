// src/utils/theme.js (actualizado a Pinia)

import { usePreferencesStore } from '@/stores/preferences'

// === Functions for theme change ===
function toggleDarkModeFunction() {
  const preferencesStore = usePreferencesStore()

  document.documentElement.classList.toggle('dark')
  preferencesStore.setPreference({
    themeMode: ['dark', 'system'].includes(preferencesStore.themeMode) ? 'light' : 'dark'
  })
}

function setDarkModeFunction(isSystem) {
  const preferencesStore = usePreferencesStore()

  document.documentElement.classList.add('dark')
  preferencesStore.setPreference({ themeMode: isSystem ? 'system' : 'dark' })
}

function setLightModeFunction(isSystem) {
  const preferencesStore = usePreferencesStore()

  document.documentElement.classList.remove('dark')
  preferencesStore.setPreference({ themeMode: isSystem ? 'system' : 'light' })
}

function setSystemModeFunction() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDarkModeFunction(true)
  } else {
    setLightModeFunction(true)
  }
}

function getAvailableThemesFunction() {
  return [
    { name: 'Claro', value: 'light', icon: 'pi pi-sun', function: setLightModeFunction },
    { name: 'Oscuro', value: 'dark', icon: 'pi pi-moon', function: setDarkModeFunction },
    { name: 'Sistema', value: 'system', icon: 'pi pi-desktop', function: setSystemModeFunction }
  ]
}

function setFontSizeFunction(size) {
  const preferencesStore = usePreferencesStore()

  document.documentElement.style.setProperty('--font-size', `${size}px`)
  preferencesStore.setPreference({ fontSize: size })
}

// Scroll Management
function setCustomScrollbarFunction(value) {
  const preferencesStore = usePreferencesStore()

  if (value) {
    document.documentElement.classList.add('custom-scrollbar')
  } else {
    document.documentElement.classList.remove('custom-scrollbar')
  }
  preferencesStore.setPreference({ customScrollbar: value })
}

function toggleCustomScrollbarFunction() {
  const preferencesStore = usePreferencesStore()
  setCustomScrollbarFunction(!preferencesStore.customScrollbar)
}

function setKeepScrollbarPositionsFunction(value) {
  const preferencesStore = usePreferencesStore()
  preferencesStore.setPreference({ keepScrollbarPositions: value })
}

function toggleKeepScrollbarPositionsFunction() {
  const preferencesStore = usePreferencesStore()
  setKeepScrollbarPositionsFunction(!preferencesStore.keepScrollbarPositions)
}

function setTableSizeFunction(value) {
  const preferencesStore = usePreferencesStore()
  preferencesStore.setPreference({ tableSize: value })
}

export const toggleDarkMode = () => toggleDarkModeFunction()
export const setFontSize = (size) => setFontSizeFunction(size)
export const setTableSize = (size) => setTableSizeFunction(size)
export const setDarkMode = () => setDarkModeFunction()
export const setLightMode = () => setLightModeFunction()
export const setSystemMode = () => setSystemModeFunction()
export const availableThemes = () => getAvailableThemesFunction()
export const toggleCustomScrollbar = () => toggleCustomScrollbarFunction()
export const setCustomScrollbar = (value) => setCustomScrollbarFunction(value)
export const toggleKeepScrollbarPositions = () => toggleKeepScrollbarPositionsFunction()
export const setKeepScrollbarPositions = (value) => setKeepScrollbarPositionsFunction(value)
