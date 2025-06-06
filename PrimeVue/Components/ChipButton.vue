<!-- ChipButton.vue -->
<template>
  <div
    :class="['chip-button', { 'chip-static': static }]"
    :style="{
      color: `var(--p-button-text-${severity}-color)`,
      '--chip-normal': `var(--p-button-text-${severity}-hover-background)`,
      '--chip-hover':  `var(--p-button-text-${severity}-active-background)`,
      '--chip-color':  `var(--p-button-text-${severity}-color)`,
      '--p-ripple-background': rippleColor ? `var(--chip-color)` : 'inherit',
    }"
    role="button"
    tabindex="0"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  severity:    { type: String,  default: 'primary' },
  static:      { type: Boolean, default: false },
  rippleColor: { type: Boolean, default: false }
});
</script>

<style scoped>
/* Estado por defecto (“tag”) */
.chip-button {
  background-color: var(--chip-hover);
  border: 0;
  border-radius: var(--p-tag-border-radius, 6px);
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color .15s;
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
@supports (background-color:color-mix(in srgb, black, white)) {
  .chip-button:not(.chip-static):hover {
    background-color: color-mix(
      in srgb,
      var(--chip-hover) 90%,
      var(--chip-color) 10%
    );
  }
}
@supports not (background-color:color-mix(in srgb, black, white)) {
  .chip-button:not(.chip-static):hover {
    filter: brightness(.8);
  }
}

/* Active: intensifica un poco más */
@supports (background-color:color-mix(in srgb, black, white)) {
  .chip-button:not(.chip-static):active {
    background-color: color-mix(
      in srgb,
      var(--chip-hover) 90%,
      var(--chip-color) 20%
    );
  }
}
@supports not (background-color:color-mix(in srgb, black, white)) {
  .chip-button:not(.chip-static):active {
    filter: brightness(.9);
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
