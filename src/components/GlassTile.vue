<!-- GlassTile.vue -->
<template>
    <div class="glass-tile" :style="glassTileStyle">
      <slot></slot>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    props: {
      borderRadius: {
        type: String,
        default: '10px',
      },
      blur: {
        type: String,
        default: '10px',
      },
      backgroundColor: {
        type: String,
        default: 'rgba(255, 255, 255, 0.1)',
      },
    },
    setup(props) {
      const glassTileStyle = computed(() => ({
        borderRadius: props.borderRadius,
        backdropFilter: `blur(${props.blur})`,
        backgroundColor: props.backgroundColor,
      }));
  
      return { glassTileStyle };
    },
  });
  </script>
  
  <style scoped>
  .glass-tile {
    padding: 1rem;
    display: inline-block;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    border-radius: 10px;
    padding: 5px 10px 10px 10px;
    margin: 20px 0;
    display: flex;
    width: fit-content;
    height: fit-content;
  }
  </style>
  