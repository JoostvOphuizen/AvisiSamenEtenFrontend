<script lang="ts">
import { defineComponent, ref } from 'vue'
import Optie from '@/components/Optie.vue'
import AppButton from '@/components/Button.vue'

// const foodCategories = [
//   'Italian',
//   'Mexican',
//   'Chinese',
//   'Japanese',
//   'Thai',
//   'Indian',
//   'Greek',
//   'French',
//   'American',
//   'Mediterranean'
// ]

const baseURL = "http://localhost:8080";

export default defineComponent({
  components: {
    AppButton,
    Optie
  },
  data() {
    return {
      getResult: null,
      selectedCategories: ref<string[]>([]),
      // foodCategories
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
    },

    fortmatResponse(res: Response) {
      return JSON.stringify(res, null, 2);
    }
  },

  async created () {
    try {
      const res = await fetch(`${baseURL}/voorkeuren`);

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      const data = await res.json();
      console.log(data)

      const result = {
      //   // status: res.status + "-" + res.statusText,
      //   // headers: {
      //   //   "Content-Type": res.headers.get("Content-Type"),
      //   //   "Content-Length": res.headers.get("Content-Length"),
      //   // },
      //   // length: res.headers.get("Content-Length"),
        data: data
      }

      // this.getResult = this.fortmatResponse(result);
      this.getResult = result

    } catch (err) {
      this.getResult = err.message;
    }
  }
})
</script>



<template>
  <div class="glass">
    <div class="scroller">
      <h2 class="optieMenuTitle">Voorkeuren</h2>
      <div v-for="voorkeur in this.getResult.voorkeuren" @change="handleOptionChange(voorkeur)">
        <Optie :label="voorkeur" :value="voorkeur" />
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
