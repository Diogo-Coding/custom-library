import { createStore } from 'vuex'
import createMultiTabState from 'vuex-multi-tab-state';

export default createStore({
  state: {
    user: null,
    isLoggedIn: false,
    token: null,
    preferences: {
      searchSideBar: true,
      exportDefaultFilename: "",
      saveTablePreferences: true, // Guarda filtros, orden y paginación en localStorage
      saveTablePreferencesLifetime: 'local', // [local, session]
      tableSize: 'normal', // [small, normal, large]
      columnsToShow: ['email', 'username'],
      fontSize: 16
    },
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getIsLoggedIn: state => {
      return state.isLoggedIn
    },
    getPreferences: state => {
      return state.preferences
    },
    getToken: state => {
      return state.token
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_IS_LOGGED_IN(state, status) {
      state.isLoggedIn = status
    },
    SET_PREFERENCE(state, preference) {
      // Recibe un objeto con las preferencias a cambiar, por ejemplo { searchSideBar: false }
      // Busca esa preferencia en el objeto preferences y lo actualiza
      console.log(preference)
      for (const [key, value] of Object.entries(preference)) {
        state.preferences[key] = value
      }
    },
    TOGGLE_COLUMN_TO_SHOW(state, columns) {
      // Recibe un array de columnas a cambiar
      // Las columnas son objetos con el nombre de la columna y el valor de la columna
      // Busca esas columnas en el objeto preferences y lo actualiza
      state.preferences.columnsToShow = columns.map(column => column.value)
    },
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    setUser(context, user) {
      context.commit('SET_USER', user)
    },
    setIsLoggedIn(context, status) {
      context.commit('SET_IS_LOGGED_IN', status)
    },
    setPreference(context, preference) {
      context.commit('SET_PREFERENCE', preference)
    },
    toggleColumnToShow(context, column) {
      context.commit('TOGGLE_COLUMN_TO_SHOW', column)
    },
    setToken(context, token) {
      context.commit('SET_TOKEN', token)
    },
  },
  modules: {},
  plugins: [createMultiTabState({
    statesPaths: ['token', 'user', 'isLoggedIn', 'preferences'],
    key: 'data-and-preferences',
  })],
})
