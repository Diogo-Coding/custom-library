<template>
  <div class="h-full flex flex-col justify-center items-center">
    <svg
      class="w-25 h-25 rounded-full block stroke-2 stroke-white stroke-miterlimit-10"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <!-- Círculo rojo de fondo, sin animación -->
      <circle cx="26" cy="26" r="25" fill="#ef4444" stroke="#ef4444" stroke-width="2" />
      <!-- X que se dibuja animada -->
      <path class="error-mark__cross" fill="none" d="M16 16 36 36" />
      <path class="error-mark__cross" fill="none" d="M36 16 16 36" />
    </svg>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.error-mark__cross {
  stroke: white;
  stroke-width: 3;
  stroke-dasharray: 28;
  stroke-dashoffset: 28;
  animation: stroke 0.4s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  animation-delay: 0.1s;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
