import store from '@/store'

function setKeepScrollbarPositionsFunction(value) {
  store.dispatch('setPreference', { keepScrollbarPositions: value });
}
function toggleKeepScrollbarPositionsFunction() {
  setKeepScrollbarPositionsFunction(!store.getters.getPreferences.keepScrollbarPositions)
}

export const toggleKeepScrollbarPositions = () => toggleKeepScrollbarPositionsFunction();
export const setKeepScrollbarPositions = (value) => setKeepScrollbarPositionsFunction(value);