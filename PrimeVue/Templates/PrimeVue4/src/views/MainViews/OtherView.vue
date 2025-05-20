<template>
  <div class="other-view-page">
    <div class="other-content">
      <BackButton label="Go Back" icon="pi pi-arrow-left" />
      <div class="flex flex-col gap-4 p-8">
        <!-- Proximidad: hoy, modo datetime, 24h -->
        <DateFormat :date="today" display="datetime" :format24h="true" proximity />
  
        <!-- Proximidad: ayer, modo date únicamente -->
        <DateFormat :date="yesterday" display="datetime" proximity />
  
        <!-- Proximidad: mañana, modo time únicamente, 24h -->
        <DateFormat :date="tomorrow" display="datetime" :format24h="true" proximity />
  
        <!-- Proximidad: dentro de 3 días (weekday), modo datetime -->
        <DateFormat :date="in3Days" display="datetime" proximity />
  
        <!-- Sin proximidad: dentro de 7 días, modo datetime -->
        <DateFormat :date="in7Days" locale="es-ES" display="datetime" />
  
        <!-- Sin proximidad: dentro de 7 días, modo date -->
        <DateFormat :date="in7Days" locale="es-ES" display="date" />
  
        <!-- Sin proximidad: dentro de 7 días, modo time, 12h -->
        <DateFormat :date="in7Days" locale="es-ES" display="time" />
  
        <!-- Entrada como string ISO válida: hoy, modo datetime -->
        <DateFormat :date="isoStringToday" display="datetime" proximity />
  
        <!-- Fecha inválida: debería mostrar 'Fecha inválida' -->
        <DateFormat :date="invalid" display="datetime" proximity />
      </div>
    </div>
    </div>
</template>

<script setup>
import BackButton from '@/components/BackButton.vue';
import DateFormat from '@/components/DateFormat.vue';

/* Fechas de prueba basadas en 'hoy' */
const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(today.getDate() - 1)

const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

const in3Days = new Date(today)
in3Days.setDate(today.getDate() + 3)

const in7Days = new Date(today)
in7Days.setDate(today.getDate() + 7)

/* ISO string de hoy (para probar entrada como string) */
const isoStringToday = today.toISOString()

/* Cadena no válida */
const invalid = 'not-a-date'
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