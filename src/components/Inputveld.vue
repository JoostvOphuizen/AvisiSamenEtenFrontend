<template>
    <input
        type="text"
        v-model="groepsnaam"
        @input="getNaam"
        placeholder="Naam van de groep..."
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Inputveld",
  data() {
    return {
      groepsnaam: "",
    };
  },
  methods: {
    handleInput() {
      this.$emit("search", this.groepsnaam);
    },
    getNaam(){
      this.$emit("search", this.groepsnaam);
    }
  },
});
</script>

<style scoped>

input {
  width: 100%;
  padding: 10px;
  border-radius: 9px;
  height: 40px;
  border: none;
  box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.45);
  background-color: rgba(255,255,255,30%);
  color: white;
}
</style>
