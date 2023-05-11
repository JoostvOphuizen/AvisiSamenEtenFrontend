<template>
    <GlassTile class="Flexbox">
        <div class="titleContainer">    
            <h1 class="titletext"> {{ title }} </h1>
        </div>
      <div v-for="(item, index) in items" :key="index" class="checkbox-item">
        <BaseInput
          :label="item.label"
          :value="item.value"
          @update:modelValue="updateCheckboxValue(index, $event)"
        />
      </div>
    </GlassTile>
  </template>
  
  <style scoped>
  .Flexbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-height: 320px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  
  .checkbox-item {
    width: 100%;
  }
  .titletext{
    font-size: 30px;
    font-weight: 500;
    color: var(--vt-c-white);
    margin: 0 0 10px 0;
  }

  .titleContainer {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    margin-left: 10px;
  }

  /* under 400px */
    @media screen and (max-width: 400px) {
        .titletext{
        font-size: 20px;
        font-weight: 500;
        color: var(--vt-c-white);
        margin: 0 0 10px 0;
        }
        .Flexbox {
            width: 100%;
        }
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
      title: {
        type: String,
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
  