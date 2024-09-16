// returns true if user is logged in, false otherwise
import store from '@/store'

export const checkAuth = () => {
  return store.getters.getIsLoggedIn ? '/main' : '/login'
}