<template>
  <InputText :modelValue="inputValue" @input="handleInput" @change="handleChange" v-bind="$attrs" />
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import debounce from 'lodash/debounce'

// Props
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  debounceTime: {
    type: Number,
    default: 300
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'input', 'change', 'debounce-start', 'debounce-end'])

// Internal state
const inputValue = ref(props.modelValue)

// Watch external changes to sync input
watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal
  }
)

// Debounced emitter
const debouncedEmit = debounce((val) => {
  emit('update:modelValue', val)
  emit('debounce-end', val)
}, props.debounceTime)

function handleInput(event) {
  const val = event.target.value
  inputValue.value = val
  emit('input', event)
  emit('debounce-start', val)
  debouncedEmit(val)
}

function handleChange(event) {
  emit('change', event)
}

// Cleanup
onBeforeUnmount(() => {
  debouncedEmit.cancel()
})
</script>
