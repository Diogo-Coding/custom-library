<template>
  <Toast />
  <router-view v-slot="{ Component, route }">
    <Transition :name="route.meta.transition || 'fade'" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup>
import Toast from 'primevue/toast';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { URL_BACK } from './config/config';
import router from './router';

const store = useStore()

function setLocalFontSize() {
  document.documentElement.style.setProperty('--font-size', store.getters.getPreferences.fontSize + 'px')
}
setLocalFontSize()

function deleteUserInfo() {
  store.dispatch('setUser', null)
  store.dispatch('setIsLoggedIn', false)
  store.dispatch('setHotel', null)
  store.dispatch('setToken', null)
}

async function refreshUser() {
  let params = new URLSearchParams();
  params.append("token", store.getters.getToken);
  params.append("user_id", store.getters.getUser.id);

  const options = {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded", "Authorization": `Bearer ${store.getters.getToken}`},
    redirect: 'follow',
    body: params,
  }
  
  fetch(URL_BACK + `/users/login/refresh`, options)
  .then(res => {
    // Controlar respuesta
    if (res.ok) return res.json()
    else {
      console.log('Error al llamar')
      router.replace('/login')
    }
  })
  .then(data => {
    if (data) {
      // Manipular respuesta
      console.log(data)
      store.dispatch('setUser', data.user)
      store.dispatch('setIsLoggedIn', true)
      store.dispatch('setHotel', data.user.hotel)
      store.dispatch('setToken', data.token)
    }
  })
  .catch(error => {
    console.log('ERROR: ', error)
    router.replace('/login')
  })
}
onMounted(() => {
  // Get User info if logged in
  if (store.getters.getIsLoggedIn) {
    refreshUser()
  }
})
</script>

<style scoped>
</style>