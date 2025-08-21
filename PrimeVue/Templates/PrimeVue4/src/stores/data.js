import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    hotels: null
  }),
  getters: {
    getHotel: (state) => (id) => state.hotels.find((hotel) => hotel.id === id)
  },
  actions: {
    setHotels(hotels) {
      this.hotels = hotels
    }
  },
  persist: {
    key: 'data-store',
    pick: ['hotels']
  }
})
