<script lang="ts">
export default {
    name: 'Notificatie',
    props: {
        label: {
            type: String,
            required: true,
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

<style>
.notificatie {
  background-color: var(--vt-c-indigo);
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  margin: 4px;
  display: flex;
  align-items: center;
  max-height: 5px;
  width: fit-content;
}


.notificatieIconLeft {
  width: 13px;
  height: 13px;
  margin-right: 8px;
  margin-left: 0;
  position: absolute;
  left: 2px;
}

.notificatieIconRight {
  width: 13px;
  height: 13px;
  margin-left: 8px;
}

.notificatieLabel {
  color: var(--vt-c-white);
  font-size: 13px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 6px;
  min-width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.notificatieBox {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #0000008d;
  color: var(--vt-c-white);
  padding: 10px;
  border-radius: 5px;
  z-index: 1;
  width: 50vw;
}

.notificatie:hover .notificatieBox {
  display: block;
}

/* media queries */
@media screen and (max-width: 600px) {
  .notificatie {
    width: 100%;
  }
  .notificatieBox {
    width: 100%;
  }
}

</style>

<template>
  <div class="notificatie">
    <img class="notificatieIconLeft" v-if="iconLeft" :src="iconLeft" />
    <p class="notificatieLabel">{{ label }}</p>
    <img class="notificatieIconRight" v-if="iconRight" :src="iconRight" />
    <div class="notificatieBox">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  </div>
</template>
