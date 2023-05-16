<script lang="ts">
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'buttonPrimary',
    },
    iconLeft: {
      type: String,
    },
    iconRight: {
      type: String,
    },
  },
}

</script>

<style scoped>

.button {
  border: none;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 30px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  background-color: rgba(255,255,255,15%);
  color: white;
}


.buttonIconLeft {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.buttonIconRight {
  width: 13px;
  height: 13px;
  margin-left: 8px;
  filter: invert(1);
}

.buttonClass:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 10px;
  transform: translateY(-2px);
}

.buttonClass:active {
  box-shadow: none;
  transform: translateY(0);
  /*scale: 0.95;*/
}

</style>

<template>

  <button :class="['button', type]">
    <img v-if="iconLeft" :src="iconLeft" alt="icon" class="buttonIconLeft" />

    <p>{{ label }}</p>

    <img v-if="iconRight" :src="iconRight" alt="icon" class="buttonIconRight" />
  </button>

</template>

