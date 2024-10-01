<template>
  <div class="info-box relative">
    <div class="box-content flex flex-col justify-between h-full">
      <slot />
    </div>
    <div class="box-hover-background">
      <i class="pi pi-eye text-2xl text-slate-100"></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

</script>

<style scoped>
.info-box {
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.info-box:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.box-blur {
  opacity: 0.5;
  filter: blur(2px);
}

.box-hover-background {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition-property: background-color, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.box-hover-background:hover {
  opacity: 1;
}

.info-box, .info-box * {
  cursor: pointer;
}
</style>