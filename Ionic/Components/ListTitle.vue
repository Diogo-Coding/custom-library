<template>
  <div class="wrapper">
    <div class="line" v-if="!['start', 'left'].includes(position)"></div>
    <ion-label class="text" :class="position" size="large" :style="{ fontSize: size + 'rem'}">{{ text }}</ion-label>
    <div class="line" v-if="!['end', 'right'].includes(position)"></div>
  </div>
</template>

<script>
import { IonLabel } from '@ionic/vue';

export default {
  props: ['text', 'position', 'size'],
  emits: [],
  components: {
    IonLabel
  },
  setup(props, ctx) {
    
    return {
      
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.line {
  background: #e3e3e3;
  height: 1px;
  border-radius: 10px;
  margin-top: 5px;
  min-height: 1px;
  flex-grow: 1; /* Hace que la línea se expanda para llenar el espacio disponible */
}
.text {
  font-weight: 500;
  padding-inline: 12px;
  flex-shrink: 0; /* Evita que el texto se reduzca */
  font-size: 1rem;
  line-height: 1rem;
}

.text.start, .text.left {
  padding-inline: 0 5px;
}
.text.end, .text.right {
  padding-inline: 5px 0;
}
</style>