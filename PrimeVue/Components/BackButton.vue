<template>
  <Button class="button-back" type="button" severity="secondary" 
    :rounded="rounded" 
    :text="text"
    :label="!noLabel ? label : undefined" 
    icon="pi pi-arrow-left"
    v-tooltip.right="{ value: tooltip ? tooltipLabel : undefined, autoHide: false, showDelay: 500 }"
    @click="goBack()"
  >
  </Button>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  noLabel: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'Volver atras',
  },
  tooltipLabel: {
    type: String,
    default: 'Volver atras',
  },
  text: {
    type: Boolean,
    default: true,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  tooltip: {
    type: Boolean,
    default: false,
  }
})

const router = useRouter()  

function goBack() {
  // Check if route before exists via history
  if (router.options.history.state.back) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.button-back {
  color: rgb(39, 39, 39);
}
</style>