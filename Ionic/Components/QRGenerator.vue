<template>
  <ion-content>
    <div class="qr-code">
      <ion-label>{{ $t('qrCode.useThis') }}</ion-label>
      <qrcode-vue :value="qrContent" :size="200"></qrcode-vue>
      <ion-note>{{ $t('qrCode.helpUser') }}</ion-note>
    </div>
  </ion-content>
</template>

<script>
import { IonContent, IonNote, IonLabel } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import QrcodeVue from 'qrcode.vue';

export default {
  props: ['code'],
  components: {
    IonContent, IonNote, IonLabel,
    QrcodeVue
  },
  setup(props) {
    const qrContent = ref('');

    const generateQRCode = () => {
      if (props.code) {

        const payload = `${props.code}`;;

        qrContent.value = `<${payload}>`;
        console.log(qrContent.value)
      }
    };

    onMounted(() => {
      generateQRCode();
    });

    return {
      qrContent
    };
  }
};
</script>

<style scoped>
.qr-code {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 2rem;
  text-align: center;
  gap: 3rem;
}
</style>
