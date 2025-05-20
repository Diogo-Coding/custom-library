import store from '@/store'

// === Functions for theme change ===
function toggleDarkModeFunction() { // If you dont want to toggle when user has 'system' mode, you can remove it from array
  document.documentElement.classList.toggle('dark');
  store.dispatch('setPreference', { themeMode: ['dark', 'system'].includes(store.getters.getPreferences.themeMode) ? 'light' : 'dark' });
}

//? "isSystem" var is for when user has 'system' mode activated
function setDarkModeFunction(isSystem) {
  document.documentElement.classList.add('dark');
  store.dispatch('setPreference', { themeMode: isSystem ? 'system' : 'dark' });
}
function setLightModeFunction(isSystem) {
  document.documentElement.classList.remove('dark');
  store.dispatch('setPreference', { themeMode: isSystem ? 'system' : 'light' });
}
function setSystemModeFunction() {
  // Check if the user has a dark mode enabled
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDarkModeFunction(true);
  } else {
    setLightModeFunction(true);
  }
}
function getAvailableThemesFunction() {
  const Themes = 
  [
    { name: 'Light', value: 'light', icon: 'pi pi-sun', function: setLightModeFunction },
    { name: 'Dark', value: 'dark', icon: 'pi pi-moon', function: setDarkModeFunction },
    { name: 'System', value: 'system', icon: 'pi pi-desktop', function: setSystemModeFunction },
  ]
  return Themes;
}

function setFontSizeFunction(size) {
  document.documentElement.style.setProperty('--font-size', size + 'px')
  store.dispatch('setPreference', { fontSize: size });
}

function setCustomScrollbarFunction(value) {
  if (value) {
    document.documentElement.classList.add('custom-scrollbar');
  } else {
    document.documentElement.classList.remove('custom-scrollbar');
  }
  store.dispatch('setPreference', { customScrollbar: value });
}
function toggleCustomScrollbarFunction() {
  setCustomScrollbarFunction(!store.getters.getPreferences.customScrollbar)
}

export const toggleDarkMode = () => toggleDarkModeFunction();
export const setFontSize = (size) => setFontSizeFunction(size);
export const setDarkMode = () => setDarkModeFunction();
export const setLightMode = () => setLightModeFunction();
export const setSystemMode = () => setSystemModeFunction();
export const availableThemes = () => getAvailableThemesFunction();
export const toggleCustomScrollbar = () => toggleCustomScrollbarFunction();
export const setCustomScrollbar = (value) => setCustomScrollbarFunction(value);