<!-- ChipButton.vue -->
<template>
  <div @click="handleClick">
    <div
      v-bind="$attrs"
      :class="['chip-button', { 'chip-static': isStatic }]"
      :style="{
        color: `var(--p-button-text-${severity}-color)`,
        '--chip-normal': `var(--p-button-text-${severity}-hover-background)`,
        '--chip-hover': `var(--p-button-text-${severity}-active-background)`,
        '--chip-color': `var(--p-button-text-${severity}-color)`,
        '--p-ripple-background': rippleColor ? `var(--chip-color)` : 'inherit'
      }"
      role="button"
      tabindex="0"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: true })
defineProps({
  severity: { type: String, default: 'primary' },
  isStatic: { type: Boolean, default: false },
  rippleColor: { type: Boolean, default: false }
})
const emits = defineEmits(['click'])

function handleClick() {
  emits('click')
}
</script>

<style scoped>
/* Estado por defecto (“tag”) */
.chip-button {
  background-color: var(--chip-hover);
  border: 1px solid transparent !important;
  border-radius: var(--p-tag-border-radius, 6px);
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: background-color 0.15s;
  user-select: none;
}

/* Si static = true, quita el puntero y evitas hover/active */
.chip-button.chip-static {
  cursor: unset;
}

/* Hover/Focus (solo si no tiene .chip-static) */
.chip-button:not(.chip-static):hover,
.chip-button:not(.chip-static):focus-visible {
  background-color: var(--chip-hover);
}

/* Hover con color-mix (añade un poco del color de texto) */
@supports (background-color: color-mix(in srgb, black, white)) {
  .chip-button:not(.chip-static):hover {
    background-color: color-mix(in srgb, var(--chip-hover) 90%, var(--chip-color) 10%);
  }
}
@supports not (background-color: color-mix(in srgb, black, white)) {
  .chip-button:not(.chip-static):hover {
    filter: brightness(0.8);
  }
}

/* Active: intensifica un poco más */
@supports (background-color: color-mix(in srgb, black, white)) {
  .chip-button:not(.chip-static):active {
    background-color: color-mix(in srgb, var(--chip-hover) 90%, var(--chip-color) 20%);
  }
}
@supports not (background-color: color-mix(in srgb, black, white)) {
  .chip-button:not(.chip-static):active {
    filter: brightness(0.9);
  }
}

/* Sin efecto Hover/Active cuando static = true */
.chip-static:hover,
.chip-static:focus-visible,
.chip-static:active {
  background-color: var(--chip-hover);
  filter: none;
}
</style>
