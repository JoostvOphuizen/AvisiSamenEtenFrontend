<template>
    <GlassTile class="Flexbox">
      <div v-for="(item, index) in items" :key="index">
        <BaseInput
          :label="item.label"
          :value="item.value"
          @update:modelValue="updateCheckboxValue(index, $event)"
        />
      </div>
      <div>
      </div>
    </GlassTile>
  </template>

  <style scoped>

  .Flexbox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  </style>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import BaseInput from '@/components/BaseCheckBoxInput.vue';
  import GlassTile from '@/components/GlassTile.vue';
  
  interface CheckboxItem {
    label: string;
    value: boolean;
  }
  
  export default defineComponent({
    components: {
      BaseInput,
      GlassTile,
    },
    props: {
      items: {
        type: Array as () => CheckboxItem[],
        required: true,
      },
    },
    methods: {
      updateCheckboxValue(index: number, value: boolean) {
        const updatedItems = [...this.items];
        updatedItems[index].value = value;
        this.$emit('update:items', updatedItems);
      },
    },
    computed: {
      checkedItems(): CheckboxItem[] {
        return this.items.filter((item: CheckboxItem) => item.value);
      },
    },
  });
  </script>