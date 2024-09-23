<template>
  <div class="other-view-page">
    <div class="other-content">
      <Button @click="goBack()" label="Go Back"></Button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function goBack() {
  router.go(-1)
}
</script>

<style scoped>
.other-view-page {
  height: 100%;
  width: 100%;
}
.other-content {
  overflow-y: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>