<script lang="ts">
import { defineComponent, ref } from 'vue'
import Optie from '@/components/Optie.vue'
import AppButton from '@/components/Button.vue'
import GlassTile from '@/components/GlassTile.vue'

const baseURL = "http://localhost:8080";

var foodCategories = <string[]>([])

/* example data */
var preCheckedCategories = ["kip", "pizza", "plantaardig"]

export default defineComponent({
  components: {
    AppButton,
    Optie,
    GlassTile
  },
  data() {
    return {
      getResult: null,
      postResult: null,
      selectedCategories: ref<string[]>([]),
      foodCategories,
      preCheckedCategories
    }
  },
  methods: {
    handleOptionChange(category: string, checked: boolean) {
      if (checked) {
        this.selectedCategories.push(category);
        console.log(this.selectedCategories);
      } else {
        const index = this.selectedCategories.indexOf(category);
        if (index !== -1) {
          this.selectedCategories.splice(index, 1);
          console.log(this.selectedCategories);
        }
      }
    },
    // logSelectedCategories() {
    //   console.log(JSON.stringify(this.selectedCategories))
    // }
    // ,

    // fortmatResponse(res: Response) {
    //   return JSON.stringify(res, null, 2);
    // }

    postData () {
      const postData = {
        postCategories : this.selectedCategories
      };

      try {
        const res = fetch(`${baseURL}/gebruiker/profiel?id=2`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(postData),
        });
        console.log(res)


        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = res.json();
        console.log(data)

        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
        };

        this.postResult = result;

      } catch (err) {
        this.postResult = err.message;
      }
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

      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        length: res.headers.get("Content-Length"),
        data: data
      }

      this.getResult = result.data
      this.foodCategories = []
      this.getResult.voorkeuren.forEach(voorkeur => {
        this.foodCategories.push(voorkeur.naam)
      });


    } catch (err) {
      this.getResult = err.message;
    }
  }
})
</script>


<template>
  <div class="centeredItems">
    <GlassTile class="glass">
      <div class="scroller">
        <h2 class="optieMenuTitle">Voorkeuren</h2>
        <div v-for="naam in this.foodCategories " @change="handleOptionChange(naam)">
          <Optie :label="naam" :value="naam" :checked="preCheckedCategories.includes(naam)" />
        </div>
      </div>
    </GlassTile>
    <AppButton label="Bewaar je keuze!" @click="postData" class="endButton" />
  </div>
</template>



<style scoped>

.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  padding: 10px 5px 10px 10px;
  margin: 20px 0;
  width: 100%;
  height: 100%;
  min-width: 300px;
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

.endButton {
  margin-left: 0;
}
.centeredItems {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroller::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: #aaaaaa00; /* or add it to the track */
}
.scroller::-webkit-scrollbar-thumb {
  background-color: var(--vt-c-white);
  border-radius: 20px;
}

.scroller::-webkit-scrollbar-track {
  background: #f1f1f100;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}

</style>
