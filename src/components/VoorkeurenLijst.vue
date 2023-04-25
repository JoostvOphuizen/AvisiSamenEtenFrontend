<script lang="ts">
import { defineComponent, ref } from 'vue'
import Optie from '@/components/Optie.vue'
import AppButton from '@/components/Button.vue'

const baseURL = "http://localhost:8080";
const userID = 2;

export default defineComponent({
  components: {
    AppButton,
    Optie
  },
  data() {
    return {
      gekozenVoorkeurenData: null,
      alleVoorkeurenData: null,
      gebruikersVoorkeurenData: null,
      voorgeselecteerdeVoorkeuren: ref<string[]>([]),
      selectedCategories: ref<string[]>([]),
      foodCategories: ref<string[]>([]),
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
    async postData() {
      const postData = {
        voorkeuren: this.selectedCategories
      }
      try {
        const res = await fetch(`${baseURL}/gebruiker/slavoorkeurenop?id=`+userID, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value"
          }, 
          body: JSON.stringify(postData)
        });
        console.log(JSON.stringify(postData))

        if (!res.ok) {
          console.log('error ')

          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
        };

        this.gekozenVoorkeurenData = result;
      } catch (err) {
        this.gekozenVoorkeurenData = err.message;
      }
    },
    async getAlleGebruikersVoorkeuren () {
      try {
        const res = await fetch(`${baseURL}/gebruiker/haalvoorkeurenop?id=`+userID);

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          length: res.headers.get("Content-Length"),
          data: data
        }

        this.gebruikersVoorkeurenData = result.data
        this.gebruikersVoorkeurenData.voorkeuren.forEach(voorkeur => {
             this.voorgeselecteerdeVoorkeuren.push(voorkeur.naam)
        });
      } catch (err) {
        this.gebruikersVoorkeurenData = err.message;
      }
    },
    async getAlleVoorkeuren () {
      try {
        const res = await fetch(`${baseURL}/voorkeuren`);

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          length: res.headers.get("Content-Length"),
          data: data
        }

        this.alleVoorkeurenData = result.data
        
        this.alleVoorkeurenData.voorkeuren.forEach(voorkeur => {
          this.foodCategories.push(voorkeur.naam)
        });

      } catch (err) {
        this.alleVoorkeurenData = err.message;
      }
    }
  },

  async created () {
    this.getAlleVoorkeuren()
    this.getAlleGebruikersVoorkeuren()
  }
})
</script>


<template>
  <div class="glass">
    <div class="scroller">
      <h2 class="optieMenuTitle">Voorkeuren</h2>
      <div v-for="naam in this.foodCategories " @change="handleOptionChange(naam)">
        <Optie :label="naam" :value="naam" />
      </div>
    </div>
    <AppButton label="Bewaar je keuze!" @click="postData" />
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
