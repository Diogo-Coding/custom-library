<template>
  <div
    ref="box"
    class="box"
    :class="{ 'animation-line': animatedLine, 'show-line': !animatedOnlyOnHover }"
    @mouseover="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="inner">
      <div class="info-box h-full relative">
        <div class="box-content flex flex-col justify-between h-full">
          <slot />
        </div>
      </div>
    </div>
    <div
      v-if="boxIcon"
      ref="backgroudBox"
      class="box-icon-background"
      @mouseover="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <i class="pi pi-eye text-2xl text-slate-100" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  animatedLine: {
    type: Boolean,
    default: false
  },
  animatedOnlyOnHover: {
    type: Boolean,
    default: true
  },
  animationDuration: {
    type: String,
    default: '5s' // default animation duration
  },
  lineColor: {
    type: String,
    default: 'var(--p-primary-color)' // default color in the middle of the gradient
  },
  lineOutColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0)' // default color in the middle of the gradient
  },
  lineWidth: {
    type: String,
    default: '80px' // default width of the animated line
  },
  boxIcon: {
    type: Boolean,
    default: false
  }
})
const box = ref(null)

function onMouseEnter() {
  if (props.animatedLine && props.animatedOnlyOnHover) {
    if (box.value) box.value.classList.add('show-line')
  }
}
function onMouseLeave() {
  if (props.animatedLine && props.animatedOnlyOnHover) {
    if (box.value) box.value.classList.remove('show-line')
  }
}
</script>

<script>
export default {
  watch: {
    animationDuration(newVal) {
      document.documentElement.style.setProperty('--animation-duration', newVal)
    },
    lineColor(newVal) {
      document.documentElement.style.setProperty('--line-color', newVal)
    },
    lineOutColor(newVal) {
      document.documentElement.style.setProperty('--line-out-color', newVal)
    },
    lineWidth(newVal) {
      document.documentElement.style.setProperty('--line-width', newVal)
    }
  },
  mounted() {
    document.documentElement.style.setProperty('--animation-duration', this.animationDuration)
    document.documentElement.style.setProperty('--line-color', this.lineColor)
    document.documentElement.style.setProperty('--line-out-color', this.lineOutColor)
    document.documentElement.style.setProperty('--line-width', this.lineWidth)
  }
}
</script>

<style scoped>
/* =============================== */
/* General styles for the info box */
.inner {
  padding: 3px;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}

/* ================================== */
/* Styles for the box icon background */
.box-icon-background {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition-property: background-color, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  z-index: 4;
}
.box-icon-background:hover {
  opacity: 1;
}
/* ============================= */
/* Styles for the animation line */
.animation-line {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.animation-line::before {
  content: '';
  display: block;
  background: linear-gradient(90deg, var(--line-out-color) 0%, var(--line-color) 50%, var(--line-out-color) 100%);
  height: 9999px;
  width: var(--line-width);
  transform: translate(0);
  position: absolute;
  transform-origin: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
  animation: rotate var(--animation-duration) linear forwards infinite;
}
.box.show-line::before {
  opacity: 1;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
