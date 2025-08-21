// stores/preferences.js
import { defineStore } from 'pinia'

const defaultPreferences = () => ({
  tableSize: 'normal',
  fontSize: 14,
  themeMode: 'light',
  surfaceColor: 'slate',
  themeColor: 'indigo',
  baseTheme: 'aura',
  customScrollbar: false,
  keepScrollbarPositions: true,
  lateralMenu: true,
  defaultExportFilename: null,
  hotelSelected: null,
  cts_fb_menus: [],
  cts_fb_products: [],
  cts_fb_categories: [],
  cts_fb_hotels: [],
  cts_fb_establishments: []
})

export const usePreferencesStore = defineStore('preferences', {
  state: defaultPreferences,
  getters: {
    allPreferences: (state) => state
  },
  actions: {
    setPreference(partialPreferences) {
      Object.assign(this, partialPreferences)
    },
    resetPreferences() {
      Object.assign(this, defaultPreferences())
    }
  },
  persist: { key: 'user-preferences' }
})
