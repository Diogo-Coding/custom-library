<template>
  <div class="wrapper">
    <div v-if="!['start', 'left'].includes(position)" class="line" />
    <span class="text" :class="position" :style="{ fontSize: size + 'rem' }">{{ text }}</span>
    <div v-if="!['end', 'right'].includes(position)" class="line" />
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: false,
    default: ''
  },
  position: {
    type: String,
    required: false,
    default: 'center'
  },
  size: {
    type: Number,
    required: false,
    default: 1
  }
})
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.line {
  background: #e3e3e3;
  height: 1px;
  border-radius: 10px;
  margin-top: 5px;
  min-height: 1px;
  flex-grow: 1;
}

.text {
  font-weight: 500;
  padding-inline: 12px;
  flex-shrink: 0;
  font-size: 1rem;
  line-height: 1rem;
}

.text.start,
.text.left {
  padding-inline: 0 5px;
}

.text.end,
.text.right {
  padding-inline: 5px 0;
}
</style>
