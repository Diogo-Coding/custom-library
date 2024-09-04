<template>
  <div class="wrapper">
    <svg class="checkmark" :style="`--color-hotel: var(--ion-color-${hotelSelected.name});`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
    {{ textConfimation }}
  </div>
</template>

<script>
import { computed } from 'vue';
import { onBeforeMount } from 'vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  props: ['textConfimation'],
  emits: [],
  components: {},
  setup(props, ctx) {
    const store = useStore()
    const hotelSelected = store.getters.getHotel

    return {
      hotelSelected
    }
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0
}

.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: var(--color-hotel);
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards
}

.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px var(--color-hotel);
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0
  }
}

@keyframes scale {

  0%,
  100% {
    transform: none
  }

  50% {
    transform: scale3d(1.1, 1.1, 1)
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px var(--color-hotel);
  }
}
</style>