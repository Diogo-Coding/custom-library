<template>
  <div class="wrapper" :class="caret ? 'has-caret' : ''">
    <div class="lineStart" :class="position != start ? 'flex-grow' : 'w-10', color" v-if="position != 'start'"></div>
    <div class="relative chip" :class="position">
      <ion-chip :color="color" :class="{'bordered': bordered, 'squared': squared}">
        <ion-label class="text">
          {{ text }}
        </ion-label>
      </ion-chip>
      <div v-if="caret" class="caret" :class="position, caretPosition">
        <ion-icon :icon="getCaretTypeIcon()" :color="color"></ion-icon>
      </div>
    </div>
    <div class="lineEnd" v-if="position != 'end'"></div>
  </div>
</template>

<script>
import { IonLabel, IonChip, IonIcon } from '@ionic/vue';
import { caretDown, chevronDown } from 'ionicons/icons';

export default {
  props: ['text', 'position', 'color', 'caret', 'bordered', 'squared', 'caretType'],
  emits: [],
  components: {
    IonLabel, IonChip, IonIcon
  },
  setup(props) {

    function getCaretTypeIcon() {
      return props.caretType == 'caret' ? caretDown : chevronDown
    }

    return {
      getCaretTypeIcon,
      caretDown, chevronDown
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
.lineEnd {
  flex-grow: 1; /* Hace que la línea se expanda para llenar el espacio disponible */
}
.lineStart, .lineEnd {
  background: #e3e3e3;
  height: 1px;
  border-radius: 10px;
  min-height: 1px;
}
.flex-grow {
  flex-grow: 1;
}
.text {
  font-weight: 500;
  padding-inline: 5px;
  font-size: 1rem;
  line-height: 1rem;
}
ion-chip {
  margin-left: 0 !important;
  margin-inline: 0 !important;
}
.chip {
  padding-inline: 5px;
}
.chip.start {
  padding-inline: 0 5px;
}
.chip.end {
  padding-inline: 5px 0;
}
.caret {
  font-size: 1.2rem;
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.has-caret {
  padding-bottom: calc(1.6rem / 2);
}
.bordered {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.squared {
  border-radius: 8px;
}
</style>