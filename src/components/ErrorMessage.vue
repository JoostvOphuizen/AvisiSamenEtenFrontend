<template>
  <button class="roundBox" @click="hideMessage">
    <img src="src\assets\warning1.png" alt="error" class="errorIcon"/>
    <div v-if="message" class="error-message">
      {{ message }}
    </div>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    hideMessage() {
        this.$emit("update:message", "");
    },
  },
};
</script>

<style>
.error-message {
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  padding: 1px 0;
  margin-left: 5px;
}


@keyframes pop-up {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.roundBox {
    border-radius: 10px;
    background-color: #ED512D;
    padding-left: 16px;
    padding-right: 10px;
    margin: 10px;
    /* remove default button styling */
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    max-width: 100%;
    animation: pop-up 0.3s ease-in-out;
}
.errorIcon {
    width: 12px;
    height: 12px;
    margin-right: 15px;
    position: absolute;
    left: 3px;
    top: 3.5px;
}
</style>