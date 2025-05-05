<template>
  <div class="mobile-frame rounded-2xl overflow-hidden">
    <Transition name="fade-long" mode="out-in">
      <div class="loading-screen bg-slate-100 dark:bg-gray-800 h-full rounded-2xl w-full flex flex-col justify-center items-center" v-if="!loaded && url">
        <div class="flex flex-col items-center justify-center gap-4 w-full py-2">
          <i class="pi pi-spin pi-spinner text-5xl"></i>
          <h4>Cargando pantalla...</h4>
        </div>
        <div class="is-note !text-gray dark:!text-slate-400">Por favor espere, gracias.</div>
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
    </Transition>
    <div v-if="!url" class="w-full h-full flex flex-col justify-center items-center">
      <div class="flex flex-col items-center justify-center gap-4 py-2">
        <i class="pi pi-box text-5xl"></i>
        <h4>URL no proporcionada</h4>
        <div class="is-note">Por favor, proporcione una URL válida.</div>
      </div>
    </div>
    <div class="flex flex-col h-full w-full" v-else>
      <div class="iframe-header">
        <a :href="url" target="_blank">
          <Tag class="hover:cursor-pointer hover:underline w-full rounded-none">
            <div class="flex items-center gap-2 p-2">
              <span>{{ url }}</span>
              <i class="pi pi-external-link"></i>
            </div>
          </Tag>
        </a>
      </div>
      <div class="h-full grow">
        <iframe :src="url" width="100%" height="100%" :onload="setLoaded(true, false)"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  url: {
    type: String,
    default: '',
  },
})

const loaded = ref(false)

function setLoaded(value, instant = false) {
  if (instant) {
    loaded.value = value
  } else {
    setTimeout(() => {
      loaded.value = value
    }, 500)
  }
}
</script>

<style scoped>
.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>