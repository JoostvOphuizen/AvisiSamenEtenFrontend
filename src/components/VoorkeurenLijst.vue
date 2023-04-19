<template>
  <div class="glass">
    <div class="scroller">
    <h2 class="optieMenuTitle">Voorkeuren</h2>
    <div v-for="(category, index) in categories" :key="index">
      <Optie :label="category" :value="category" :selected="selectedCategories.includes(category)" @change="handleOptionChange" />
    </div>
    <AppButton label="Bewaar je keuze!" @click="logSelectedCategories" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
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
  emits: ['update:selectedCategories'],
  components: {
    AppButton,
    Optie
  },
  setup(_, { emit }) {
    const selectedCategories = ref<string[]>([])

    const categories = computed(() => {
      // Shuffle the food categories array to randomize the order
      const shuffledCategories = [...foodCategories].sort(() => Math.random() - 0.5)
      return shuffledCategories
    })

    const handleOptionChange = (value: string, selected: boolean) => {
      if (selected) {
        selectedCategories.value.push(value)
      } else {
        const index = selectedCategories.value.indexOf(value)
        if (index !== -1) {
          selectedCategories.value.splice(index, 1)
        }
      }
    }

    const logSelectedCategories = () => {
      console.log(JSON.stringify(selectedCategories.value))
    }

    return {
      categories,
      selectedCategories,
      handleOptionChange,
      logSelectedCategories
    }
  }
})
</script>


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
