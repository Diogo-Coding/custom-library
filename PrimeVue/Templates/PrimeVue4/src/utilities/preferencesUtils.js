import store from '@/store'

function toggleDarkModeFunction() {
  document.documentElement.classList.toggle('dark');
  // Save on store
  store.dispatch('setPreference', { darkMode: !store.getters.getPreferences.darkMode });
}
function setFontSizeFunction(size) {
  document.documentElement.style.setProperty('--font-size', size + 'px')
  // Save on store
  store.dispatch('setPreference', { fontSize: size });
}

export const toggleDarkMode = () => toggleDarkModeFunction();
export const setFontSize = (size) => setFontSizeFunction(size);