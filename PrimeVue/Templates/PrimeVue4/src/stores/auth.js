import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    hotels: null,
    token: null
  }),
  getters: {
    currentUser: (state) => state.user,
    authenticated: (state) => state.isLoggedIn,
    authToken: (state) => state.token
  },
  actions: {
    login({ user, hotels }) {
      this.user = user
      this.hotels = hotels
      this.isLoggedIn = true
    },
    logout() {
      this.$reset()
    }
  },
  persist: {
    key: 'auth-store',
    pick: ['user', 'isLoggedIn', 'hotels']
  }
})
