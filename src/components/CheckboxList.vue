<template>
    <GlassTile class="Flexbox">
      <div class="titleContainer">    
          <h1 class="titletext"> {{ title }} </h1>
      </div>
      <div v-if="items.length === 0" class="loading-container">
        <div class="loader"></div>
      </div>
      <div v-for="(item, index) in items" :key="index" class="checkbox-item">
        <BaseInput v-if="item.restaurantNaam"
          :label="item.restaurantNaam"
                   :icon="item.foto"
                   :restaurant="true"
                   :adres="item.straatnaam+' '+item.huisnummer"
          @update:modelValue="goToLink(index, item)"
        />
        <BaseInput v-else
                   :label="item.label"
                   :value="item.value"
                   :icon="item.icon"
                   :pictures="item.pictures"
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

    .Flexbox::-webkit-scrollbar {
        width: 6px;
    }

    .Flexbox::-webkit-scrollbar-thumb {
        background: #f0f0f0;
        border-radius: 5px;
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

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

  </style>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import BaseInput from '@/components/BaseCheckBoxInput.vue';
  import GlassTile from '@/components/GlassTile.vue';
  import store from "@/store";
  
  interface CheckboxItem {
    label?: string;
    value?: boolean;
    icon?: string;
    pictures?: string[];
    restaurantId?: number;
    restaurantNaam?: string;
    postcode?: string;
    straatnaam?: string;
    huisnummer?: number;
    link?: string;
    foto?: string;
    voorkeuren?: string[];
    restricties?: string[];
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
      goToLink(index: number, item: CheckboxItem) {
        this.$router.push({
          name: "restaurant",
          query: {restaurant_id: item.restaurantId},
          path: "/restaurant",
        })
      },
    },
    computed: {
      checkedItems(): CheckboxItem[] {
        return this.items.filter((item: CheckboxItem) => item.value);
      },
    },
  });
  </script>
  