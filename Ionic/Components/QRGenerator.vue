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
import CryptoJS from 'crypto-js';

export default {
  props: ['room', 'booking'],
  components: {
    IonContent, IonNote, IonLabel,
    QrcodeVue
  },
  setup(props) {
    const qrContent = ref('');

    function generateRandomId(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;

      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      console.log(result)

      return result;
    }

    const formatDate = (date) => {
      if (!date) return '';
      const dateTime = new Date(date);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const formatter = new Intl.DateTimeFormat('en-US', options);

      // Formatear la fecha y extraer los componentes
      const formattedDate = formatter.format(dateTime).split('/');
      const year = formattedDate[2];
      const month = formattedDate[0];
      const day = formattedDate[1];

      return `${year}${month}${day}T1200`; // Asumiendo que la hora siempre es 12:00 PM
    };

    const generateQRCode = () => {
      if (props.room && props.booking) {
        const issuerId = "RMK";
        const issueDateTime = formatDate(props.booking[0].date_from)
        const activationDateTime = formatDate(props.booking[0].date_from)
        const expiryDateTime = formatDate(props.booking[0].date_to)
        const roomIdentifier = props.room.room_no;
        const cardType = "N";
        const commonDoorsMask = "000A";
        const qrUniqueId = generateRandomId(10);
        const issuerSecretKey = "Spring";
        const hotelSecretKey = "6720";

        const payload = `${issuerId}|${issueDateTime}|${activationDateTime}|${expiryDateTime}|${roomIdentifier}|${cardType}|${commonDoorsMask}|${qrUniqueId}`;
        const secretKey = issuerSecretKey + hotelSecretKey;
        const signature = CryptoJS.HmacSHA1(payload, secretKey).toString(CryptoJS.enc.Base64);

        qrContent.value = `<${payload}|${signature}>`;
        console.log(qrContent.value)
      }
    };

    onMounted(() => {
      console.log(props.room, props.booking)
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
