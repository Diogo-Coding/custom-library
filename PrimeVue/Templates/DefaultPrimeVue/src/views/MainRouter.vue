<template>
  <div class="main-page">
    <NavigationBar :borderDivider="true" />
    <div class="main-container">
      <router-view v-slot="{ Component, route }">
        <Transition :name="route.meta.transition || 'fade'" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
</script>

<style scoped>
.main-page {
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  overflow: hidden;
}
.main-container {
  overflow-y: auto;
  height: calc(100vh - 60px);
}
</style>