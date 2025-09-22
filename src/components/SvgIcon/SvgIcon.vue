<template>
  <div class="svg-icon">
    <svg :style="{ width, height }">
      <use :xlink:href="`#icon-${name}`" :fill="color"></use>
    </svg>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '50px',
  },
  height: {
    type: String,
    default: '50px',
  },
})
</script>
