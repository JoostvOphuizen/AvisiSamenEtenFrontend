<script lang="ts">
import AppButton from '@/components/Button.vue'
import AppOptie from '@/components/Optie.vue'

import { defineComponent, ref } from 'vue'
import VoorkeurenLijst from '@/components/VoorkeurenLijst.vue'

export default defineComponent({
  components: {
    VoorkeurenLijst
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
  <div class="wrapper">
    <header class="header">
     <img alt="Logo Samen Eten" class="logo" src="./assets/AvisiSamenEtenLogo.svg" />
    </header>

   <main class="main">
    

    <div class="categorybox">
    <h2>Kies je voorkeuren:</h2>
    <VoorkeurenLijst @update:selectedCategories="handleSelectedCategories" />
    <p>Geselecteerde voorkeuren: {{ selectedCategories }}</p>
  </div>
    <AppButton label="Inloggen met Google" icon="src/assets/Google-modern-flat-icon.svg"></AppButton>
    <AppOptie label="Vlees" ></AppOptie>
    
  </main>

  <footer class="footer">
      <img src="src/assets/AvisiSamenEtenLogo.svg" alt="Logo" class="footer-logo" />
    </footer>
  </div>
</template>

<style scoped>
.categorybox{
  max-width:fit-content;
  border: 3px solid #1199BB;
  padding: 10px;
  border-radius: 5px;
  border-style:outset
}
</style>
