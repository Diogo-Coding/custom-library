<template>
  <div class="mobile-frame md:rounded-2xl overflow-hidden">
    <Transition name="fade-long" mode="out-in">
      <div class="loading-screen bg-slate-100 dark:bg-gray-800 h-full md:rounded-2xl w-full flex flex-col justify-center items-center" v-if="!loaded && url">
        <div class="pt-4 w-full flex justify-center items-center px-4">
          <Button @click="closePreview()" label="Close preview" icon="pi pi-times" severity="danger" class="w-full" />
        </div>
        <div class="flex flex-col justify-center items-center grow">
          <div class="flex flex-col items-center justify-center gap-4 w-full py-2">
            <i class="pi pi-spin pi-spinner text-5xl"></i>
            <h4>Loading page...</h4>
          </div>
          <div class="is-note !text-gray dark:!text-slate-400">Please while page is loading, thanks.</div>
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
      <div class="iframe-header flex justify-between items-center">
        <Button @click="closePreview()" label="Close" icon="pi pi-times" severity="danger" class="rounded-none z-0" />
        <a :href="url" target="_blank" class="grow h-full">
          <Tag class="hover:cursor-pointer hover:underline w-full rounded-none h-full">
            <div>
              <span class="text-ellipsis overflow-hidden w-12">{{ url }}</span>
            </div>
            <i class="pi pi-external-link pl-2"></i>
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
const emits = defineEmits(['close'])

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