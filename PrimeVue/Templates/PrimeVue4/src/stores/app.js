import { defineStore } from 'pinia'
import { generateSessionId } from '@/utilities/sessionId.js'

export const useAppStore = defineStore('app', {
  state: () => ({
    scrollPositions: {},
    browserSessionId: generateSessionId(),
    isOnline: true,
    latestVersion: '1.0.0',
    globalLoading: false,
    pwaStatus: false,
  }),
  getters: {
    getScrollPosition: state => routeKey => state.scrollPositions[routeKey] || null,
    allScrollPositions: state => state.scrollPositions,
    getBrowserSessionId: state => state.browserSessionId,
    onlineStatus: state => state.isOnline,
    loading: state => state.globalLoading,
    version: state => state.latestVersion,
    getPWAStatus: state => state.pwaStatus,
  },
  actions: {
    setScrollbarPosition({ key: routeKey, x: xCoord, y: yCoord }) {
      this.scrollPositions = {
        ...this.scrollPositions,
        [routeKey]: {
          x: xCoord,
          y: yCoord,
          browserSessionId: this.browserSessionId,
        },
      }
    },
    clearAllScrollPositions() {
      this.scrollPositions = {}
    },
    clearOtherScrollPositions({ key: routeKey }) {
      const positionToKeep = this.scrollPositions[routeKey]
      this.scrollPositions = {}
      if (positionToKeep) this.scrollPositions[routeKey] = positionToKeep
    },
    setOnlineStatus(value) {
      this.isOnline = value
    },
    setLoading(value) {
      this.globalLoading = value
    },
    setVersion(version) {
      this.latestVersion = version
    },
    setPWAStatus(status) {
      this.pwaStatus = status
    },
  },
  persist: {
    key: 'app-store',
    paths: ['browserSessionId', 'latestVersion'],
  },
})
