<template>
  <div class="mobile-frame md:rounded-2xl overflow-hidden relative h-full w-full" :class="getLayoutWidthClass()">
    <Transition name="fade-long" mode="out-in">
      <div
        class="loading-screen bg-white dark:bg-surface-800 h-full md:rounded-2xl w-full flex flex-col justify-center items-center"
        v-if="!loaded && url"
      >
        <div class="pt-4 w-full flex justify-center items-center px-4">
          <Button
            @click="closePreview()"
            label="Close preview"
            icon="pi pi-times"
            severity="danger"
            class="w-full"
            v-if="showCloseIcon"
          />
        </div>
        <div class="flex flex-col justify-center items-center grow">
          <div class="flex flex-col items-center justify-center gap-4 w-full py-2">
            <i class="pi pi-spin pi-spinner text-5xl"></i>
            <h4>Loading page...</h4>
          </div>
          <div class="is-note !text-gray dark:!text-surface-400">Please while page is loading, thanks.</div>
          <div class="pt-6">
            <a :href="url" target="_blank">
              <Tag class="hover:cursor-pointer hover:underline">
                <div class="flex items-center gap-2 p-2">
                  <span>{{ url }}</span>
                  <i class="pi pi-external-link"></i>
                </div>
              </Tag>
            </a>
          </div>
        </div>
      </div>
    </Transition>
    <div v-if="!url" class="w-full h-full flex flex-col justify-center items-center">
      <div class="flex flex-col items-center justify-center gap-4 py-2">
        <i class="pi pi-box text-5xl"></i>
        <h4>Invalid or missing URL</h4>
        <div class="is-note">Please, provide a valid URL.</div>
      </div>
    </div>
    <div class="flex flex-col h-full w-full" v-else>
      <div class="iframe-header flex justify-between items-center min-h-[40px]">
        <div class="h-full">
          <Button
            @click="closePreview()"
            label="Close"
            icon="pi pi-times"
            severity="danger"
            class="rounded-none z-0 h-full"
            v-if="showCloseIcon"
          />
        </div>
        <Tag class="w-full rounded-none h-full flex items-center justify-between gap-2 pr-4">
          <div>
            <Button icon="pi pi-sync" rounded text @click="refreshIframe()" />
          </div>
          <Divider layout="vertical" class="mx-0 mr-2" />
          <div class="grow h-full flex items-center justify-start w-full">
            <a :href="currentUrl || url" target="_blank" class="hover:cursor-pointer hover:underline w-full grow flex">
              <div class="flex grow w-0">
                <div class="w-full flex">
                  <span class="text-ellipsis overflow-hidden grow w-0" v-tooltip.top="{ value: currentUrl || url }">
                    {{ currentUrl || url }}
                  </span>
                </div>
                <div>
                  <i class="pi pi-external-link pl-2"></i>
                </div>
              </div>
            </a>
          </div>
        </Tag>
      </div>
      <div class="h-full grow">
        <iframe :src="url" width="100%" height="100%" @load="handleIframeLoad" ref="iframeRef"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  showCloseIcon: {
    type: Boolean,
    default: true
  },
  layout: {
    type: String,
    default: 'mobile' // mobile, tablet, desktop
  }
})
const emits = defineEmits(['close'])

const iframeRef = ref(null)
const currentUrl = ref('')
const loaded = ref(false)

function getLayoutWidthClass() {
  switch (props.layout) {
    case 'mobile':
      return '!min-w-[375px]'
    case 'tablet':
      return '!min-w-[700px]'
    case 'desktop':
      return '!min-w-[1200px]'
    default:
      return '!min-w-[375px]'
  }
}

function refreshIframe() {
  loaded.value = false
  iframeRef.value.src = currentUrl.value
}

const ALLOWED_IFRAME_ORIGINS = [
  'https://hello.springhoteles.com' // orígenes desde los que aceptamos mensajes
]

function setLoaded(value, instant = false) {
  if (instant) loaded.value = value
  else setTimeout(() => (loaded.value = value), 500)
}

function handleIframeLoad() {
  setLoaded(true)
  if (!currentUrl.value) currentUrl.value = props.url
}

function handleMessage(event) {
  if (!ALLOWED_IFRAME_ORIGINS.includes(event.origin)) return
  if (event.data && event.data.type === 'IFRAME_LOCATION') {
    currentUrl.value = event.data.href || props.url
  }
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})

function closePreview() {
  emits('close')
}
</script>

<style scoped>
.loading-screen {
  position: absolute;
  top: 0;
  left: -1;
  width: calc(100% + 2px);
  height: 100%;
  z-index: 2;
}
</style>
