<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'

const props = defineProps({
  locale: { type: String, default: 'es-ES' },
  timezone: { type: String, default: 'UTC' },
  interval: { type: Number, default: 1000 }, // ms
  options: {
    type: Object,
    default: () => ({
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }
})

const formattedDate = ref('')

const updateTime = () => {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat(props.locale, {
    ...props.options,
    timeZone: props.timezone
  })
  formattedDate.value = formatter.format(now)
}

let timer = null

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, props.interval)
})

onUnmounted(() => {
  clearInterval(timer)
})

watchEffect(() => {
  updateTime()
})
</script>

<template>
  <span class="live-date-time">{{ formattedDate }}</span>
</template>

<style scoped></style>
