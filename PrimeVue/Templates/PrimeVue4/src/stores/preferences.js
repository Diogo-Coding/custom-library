import { defineStore } from 'pinia'

const defaultPreferences = () => ({
  tableSize: 'normal',
  fontSize: 14,
  themeMode: 'light',
  customScrollbar: false,
  keepScrollbarPositions: true,
})

export const usePreferencesStore = defineStore('preferences', {
  state: defaultPreferences,
  getters: {
    allPreferences: state => state,
  },
  actions: {
    setPreference(partialPreferences) {
      Object.assign(this, partialPreferences)
    },
    resetPreferences() {
      Object.assign(this, defaultPreferences())
    },
  },
  persist: {
    key: 'user-preferences',
    paths: ['preferences'],
  },
})
