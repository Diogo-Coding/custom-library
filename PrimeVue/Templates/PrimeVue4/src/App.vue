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
</script>

<style scoped>
</style>