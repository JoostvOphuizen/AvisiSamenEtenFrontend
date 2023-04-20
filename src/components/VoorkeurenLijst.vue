<script lang="ts">
import { defineComponent, ref } from 'vue'
import Optie from '@/components/Optie.vue'
import AppButton from '@/components/Button.vue'

const foodCategories = [
  'Italian',
  'Mexican',
  'Chinese',
  'Japanese',
  'Thai',
  'Indian',
  'Greek',
  'French',
  'American',
  'Mediterranean'
]

export default defineComponent({
  components: {
    AppButton,
    Optie
  },
  data() {
    return {
      selectedCategories: ref<string[]>([]),
      foodCategories
    }
  },
  methods: {
    handleOptionChange(category: string) {
      var element = <HTMLInputElement> document.getElementById(category);
      if(element.checked) {
        this.selectedCategories.push(category)
        console.log(this.selectedCategories)
      } 
      else {
        const index = this.selectedCategories.indexOf(category)
        if (index !== -1) {
          this.selectedCategories.splice(index, 1)
          console.log(this.selectedCategories)
        }
      }
    },
    logSelectedCategories() {
      console.log(JSON.stringify(this.selectedCategories))
    }

  }
})
</script>



<template>
  <div class="glass">
    <div class="scroller">
    <h2 class="optieMenuTitle">Voorkeuren</h2>
    <div v-for="(category) in foodCategories" @change="handleOptionChange(category)">
      <Optie :label="category" :value="category" />
    </div>
    <AppButton label="Bewaar je keuze!" @click="logSelectedCategories" />
    </div>
  </div>
</template>



<style scoped>

.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  padding: 10px 5px 10px 10px;
  margin: 20px 0;
}

.scroller {
  max-height: 20em;
  overflow-y: auto;
  scrollbar-color: rgb(255, 255, 255) rgba(0, 128, 0, 0);
  scrollbar-width: thin;
}

.optieMenuTitle {
  color: var(--vt-c-white);
  font-size: 1.5rem;
  margin: 4px;
}

</style>
