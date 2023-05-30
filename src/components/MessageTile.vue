<template>
  <div class="tile" :style="messageTileStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'MessageTile',
  props: {
    borderRadius: {
      type: String,
      default: '10px',
    },
    backgroundColor: {
      type: String,
      default: '#003345',
    },
  },
  setup(props) {
    const messageTileStyle = computed(() => ({
      borderRadius: props.borderRadius,
      backgroundColor: props.backgroundColor,
    }));
    return { messageTileStyle };
  },
});
</script>

<style scoped>
.tile {
  padding: 1rem;
  display: inline-block; 
  background-image: url('src/assets/standardMessageTile.jpg');
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 5px 10px 10px 10px;
  margin: 20px 0;
  display: flex;
  height: fit-content;
}
</style>
  