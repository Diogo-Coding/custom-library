<!-- 
  Componente ion-input con un boton de mostrar/ocultar
  Dispone de:
    - Accesso a validacion desde exterior mediante query
    - Boton ocultar/mostrar value
    - label, label-placement variables por props
    - Mensaje error por props
    - Envia el valor del campo por emit de ion-change (Mirar components v-model de Vue>=3.4)

  !Version Ionic 8 sustituye este componente con el uso de slots en ion-input
-->
<template>
  <div class="relative">
    <ion-input v-model="password" :label="label" :error-text="errorText" color="dark" :type="isShown ? 'text' : 'password'" aria-hidden="true" label-placement="floating" fill="outline" :placeholder="$t('initViews.placeholders.password')" @keydown.enter="action()" class="input-hide" @ion-input="change()"></ion-input>
    <ion-button size="small" fill="clear" color="dark" aria-label="Show/hide" @click="toggleShow()" class="hide-button">
      <ion-icon slot="icon-only" :icon="isShown ? eyeOff : eye" aria-hidden="true"></ion-icon>
    </ion-button>
  </div>
</template>

<script>
import { IonInput, IonButton, IonIcon } from '@ionic/vue';
import { ref, defineModel, watch } from 'vue';
import { useStore } from 'vuex';
import { eye, eyeOff } from 'ionicons/icons'
import { onMounted } from 'vue';

export default {
  props: ['label', 'placeholder', 'password', 'error-text'],
  emits: ['change', 'actionEnter'],
  components: {
    IonInput, IonButton, IonIcon
  },
  setup(props, ctx) {
    const password = ref(null)
    const isShown = ref(false)

    watch(() => props.password, () => {
      password.value = props.password
    })

    function toggleShow () {
      isShown.value = !isShown.value
    }

    function action () {
      ctx.emit('actionEnter')
    }

    function change () {
      ctx.emit('change', password.value)
    }
    
    return {
      eye, eyeOff,
      password,
      isShown,
      action,
      toggleShow,
      change
    }
  }
}
</script>

<style scoped>
.hide-button {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  height: 56px;
}
.hide-button::part(native) {
  padding: 14px;
  height: calc(100% - 2px);
  width: calc(100% - 2px);
}
</style>