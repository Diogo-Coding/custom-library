<!-- src/components/BodyScroll.vue -->
<template>
  <OverlayScrollbars tag="div" :options="osOptions" class="os-fullpage">
    <slot />
  </OverlayScrollbars>
</template>

<script setup>
const osOptions = {
  scrollbars: { autoHide: 'leave', clickScrolling: true }
}
</script>

<style scoped>
.os-fullpage {
  height: 100vh;
  width: 100%;
}
.os-fullpage > .os-viewport {
  height: 100%;
}
</style>
