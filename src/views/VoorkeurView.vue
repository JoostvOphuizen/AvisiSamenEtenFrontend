<script lang="ts">
import AppButton from '@/components/Button.vue'
import AppOptie from '@/components/Optie.vue'

import { defineComponent, ref } from 'vue'
import VoorkeurenLijst from '@/components/VoorkeurenLijst.vue'

export default defineComponent({
  components: {
    VoorkeurenLijst,
    AppButton,
    AppOptie
},
  setup() {
    const selectedCategories = ref<string[]>([])

    const handleSelectedCategories = (categories: string[]) => {
      selectedCategories.value = categories
    }

    return {
      selectedCategories,
      handleSelectedCategories
    }
  }
})
</script>

<template>
  <div class="categorybox">
    <h2>Kies je voorkeuren:</h2>
    <VoorkeurenLijst @update:selectedCategories="handleSelectedCategories" />
    <p>Geselecteerde voorkeuren: {{ selectedCategories }}</p>
  </div>
</template>