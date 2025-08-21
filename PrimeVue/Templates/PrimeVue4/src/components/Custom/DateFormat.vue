<template>
  <!-- Slot for customization: fallback wraps result in a <span> -->
  <slot :formatted="formatted">
    <span>{{ formatted }}</span>
  </slot>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { dateFormat } from '@/utilities/dateFormat';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'DateFormat',
  props: {
    date: {
      type: [String, Date] as PropType<string | Date>,
      required: true
    },
    display: {
      type: String as PropType<'datetime' | 'date' | 'time'>,
      default: 'datetime'
    },
    format24h: {
      type: Boolean,
      default: false
    },
    proximity: {
      type: Boolean,
      default: false
    },
    locale: {
      type: String,
      default: 'en-EN'
    },
    timeZone: {
      type: String,
      default: 'UTC'
    }
  },
  setup(props) {
    const formatted = computed(() => {
      try {
        // Convert Date to ISO string if needed
        return dateFormat(props.date, {
          display: props.display,
          format24h: props.format24h,
          proximity: props.proximity,
          locale: props.locale,
          timeZone: props.timeZone
        });
      } catch {
        return 'Fecha inválida';
      }
    });

    return { formatted };
  }
});
</script>

<style scoped>
/* Estilos opcionales aquí */
</style>
