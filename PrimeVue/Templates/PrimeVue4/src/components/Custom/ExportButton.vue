<template>
  <div class="flex items-start">
    <!-- Botón principal -->
    <Button
      icon="pi pi-download"
      severity="secondary"
      outlined
      :loading="loading"
      :disabled="isDisabled"
      @click="exportDefault"
      class="rounded-tr-none rounded-br-none border-r-0"
    />

    <!-- Botón para desplegar opciones -->
    <Button
      icon="pi pi-chevron-down"
      severity="secondary"
      outlined
      :disabled="isDisabled"
      @click="toggleOverlay"
      aria-haspopup="true"
      aria-controls="export_overlay"
      class="rounded-tl-none rounded-bl-none"
    />

    <!-- Panel flotante -->
    <Popover ref="overlayRef" id="export_overlay">
      <div class="flex flex-col gap-6 min-w-[220px]">
        <div class="op-header flex items-center gap-4 pr-6 px-2 pt-2">
          <i class="pi pi-download text-3xl"></i>
          <div>
            <h3 class="font-semibold">Exportar datos</h3>
            <label class="text-sm text-surface-500 dark:text-surface-300">Seleccione un formato para descargar.</label>
          </div>
        </div>
        <div class="op-content flex flex-col">
          <div class="flex flex-col gap-1 px-2">
            <FloatLabel variant="on">
              <label class="text-sm pl-1 font-medium dark:text-surface-300" for="on_label">Nombre del archivo</label>
              <InputText
                id="on_label"
                v-model="filenameInput"
                class="w-full"
                autocomplete="off"
                @blur="filenameInput = sanitizeFilename(filenameInput)"
              />
            </FloatLabel>
          </div>
          <div class="px-2">
            <Divider />
          </div>
          <div>
            <div v-for="opt in exportOptions" :key="opt.extension">
              <Button
                text
                size="small"
                class="w-full justify-between"
                @click="
                  () => {
                    opt.command()
                    overlayRef.hide()
                  }
                "
              >
                <div class="flex items-center gap-3">
                  <component :is="opt.icon" stroke="1.5" class="text-surface-800 dark:text-surface-200" />
                  <div>
                    <span class="font-medium text-surface-800 dark:text-surface-200">{{ opt.label }}</span>
                  </div>
                </div>
                <span class="ml-4 text-sm opacity-60 text-surface-800 dark:text-surface-200">.{{ opt.extension }}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { saveAs } from 'file-saver'
import { utils, write } from 'xlsx'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'

const props = defineProps({
  data: { type: Array, required: true },
  filenameDefault: {
    type: String,
    default: () => {
      const now = new Date()
      const datePart = now.toISOString().slice(0, 10).replace(/-/g, '')
      const timePart = now.toTimeString().slice(0, 8).replace(/:/g, '')
      return `Export_${datePart}_${timePart}`
    }
  },
  loading: Boolean,
  isError: Boolean,
  defaultType: {
    type: String,
    default: 'xlsx'
  }
})

const filenameInput = ref(props.filenameDefault)
const overlayRef = ref()
const isDisabled = computed(() => props.isError || props.loading)

function toggleOverlay(event) {
  overlayRef.value?.toggle(event)
}

function getFilename(ext) {
  const raw = filenameInput.value?.trim() || props.filenameDefault
  const safe = sanitizeFilename(raw)
  return `${safe}.${ext}`
}
function sanitizeFilename(name) {
  return name
    .replace(/[\\/:*?"<>|]/g, '') // caracteres prohibidos
    .replace(/\s+/g, '_') // espacios por guiones bajos
    .replace(/\.+$/, '') // quitar puntos al final
    .replace(/^_+|_+$/g, '') // quitar guiones bajos extremos
    .slice(0, 100) // opcional: límite de 100 caracteres
}

function exportCSV() {
  if (!props.data.length) return
  const headers = Object.keys(props.data[0])
  let csv = headers.map((h) => `"${h}"`).join(',') + '\n'

  props.data.forEach((row) => {
    let line = headers.map((h) => `"${(row[h] ?? '').toString().replace(/"/g, '""')}"`).join(',')
    csv += line + '\n'
  })

  saveAs(new Blob([csv], { type: 'text/csv' }), getFilename('csv'))
}

function exportXLSX() {
  const ws = utils.json_to_sheet(props.data)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Sheet1')
  const buffer = write(wb, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([buffer], { type: 'application/octet-stream' }), getFilename('xlsx'))
}

function exportJSON() {
  saveAs(new Blob([JSON.stringify(props.data, null, 2)], { type: 'application/json' }), getFilename('json'))
}

function exportTSV() {
  if (!props.data.length) return
  const headers = Object.keys(props.data[0])
  let tsv = headers.join('\t') + '\n'

  props.data.forEach((row) => {
    const line = headers.map((h) => (row[h] ?? '').toString().replace(/\t/g, ' ')).join('\t')
    tsv += line + '\n'
  })

  saveAs(new Blob([tsv], { type: 'text/plain' }), getFilename('txt'))
}

function exportHTML() {
  if (!props.data.length) return
  const headers = Object.keys(props.data[0])
  let html = `<table border="1"><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>`

  props.data.forEach((row) => {
    html += `<tr>${headers.map((h) => `<td>${row[h] ?? ''}</td>`).join('')}</tr>`
  })

  html += '</tbody></table>'
  saveAs(new Blob([html], { type: 'text/html' }), getFilename('html'))
}

function exportXML() {
  if (!props.data.length) return
  const headers = Object.keys(props.data[0])
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<dataset>\n`

  props.data.forEach((row) => {
    xml += `  <row>\n`
    headers.forEach((h) => {
      const val = (row[h] ?? '').toString()
      xml += `    <${h}>${escapeXml(val)}</${h}>\n`
    })
    xml += `  </row>\n`
  })

  xml += '</dataset>'
  saveAs(new Blob([xml], { type: 'application/xml' }), getFilename('xml'))
}

function escapeXml(str) {
  return str.replace(
    /[<>&'"]/g,
    (c) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&apos;',
        '"': '&quot;'
      })[c]
  )
}

const exportOptions = [
  {
    label: 'Exportar como XLSX',
    command: exportXLSX,
    extension: 'xlsx',
    icon: 'IconFileTypeXls'
  },
  {
    label: 'Exportar como CSV',
    command: exportCSV,
    extension: 'csv',
    icon: 'IconFileTypeCsv'
  },
  {
    label: 'Exportar como TXT',
    command: exportTSV,
    extension: 'txt',
    icon: 'IconFileTypeTxt'
  },
  {
    label: 'Exportar como HTML',
    command: exportHTML,
    extension: 'html',
    icon: 'IconFileTypeHtml'
  },
  {
    label: 'Exportar como XML',
    command: exportXML,
    extension: 'xml',
    icon: 'IconFileTypeXml'
  },
  {
    label: 'Exportar como JSON',
    command: exportJSON,
    extension: 'json',
    icon: 'IconJson'
  }
]

function exportDefault() {
  const opt = exportOptions.find((o) => o.extension === props.defaultType.toLowerCase())
  if (opt?.command) opt.command()
}
</script>
