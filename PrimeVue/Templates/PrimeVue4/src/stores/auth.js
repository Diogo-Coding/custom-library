import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    token: null,
  }),
  getters: {
    currentUser: state => state.user,
    authenticated: state => state.isLoggedIn,
    authToken: state => state.token,
  },
  actions: {
    login({ user, token }) {
      this.user = user
      this.token = token
      this.isLoggedIn = true
    },
    logout() {
      this.$reset()
    },
  }
})
