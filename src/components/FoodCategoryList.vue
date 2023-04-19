<template>
  <div>
    <div v-for="(category, index) in categories" :key="index">
      <label>
        <input type="checkbox" :value="category" v-model="selectedCategories" @change="handleChange" />
        {{ category }}
      </label>
    </div>

    <button @click="logSelectedCategories">Bewaar je keuze!</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

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
  setup(_, { emit }) {
    const selectedCategories = ref<string[]>([])

    const categories = computed(() => {
      // Shuffle the food categories array to randomize the order
      const shuffledCategories = [...foodCategories].sort(() => Math.random() - 0.5)
      return shuffledCategories
    })

    const handleChange = () => {
      emit('update:selectedCategories', selectedCategories.value)
    }

    const logSelectedCategories = () => {
      console.log(selectedCategories.value)
    }

    return {
      categories,
      selectedCategories,
      handleChange,
      logSelectedCategories
    }
  }
})
</script>
