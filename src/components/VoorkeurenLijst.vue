<script lang="ts">
import { defineComponent, ref } from 'vue';
import Optie from '@/components/Optie.vue';
import AppButton from '@/components/Button.vue';
import GlassTile from '@/components/GlassTile.vue';

const baseURL = "http://localhost:8080";
const USERID = 2;

interface Voorkeur {
  naam: string;
}

interface GebruikersVoorkeurenData {
  voorkeuren: Voorkeur[];
}

interface AlleVoorkeurenData {
  voorkeuren: Voorkeur[];
}

interface Result {
  status: string;
  headers: {
    "Content-Type": string;
    "Content-Length": string | null;
  };
  data: any;
}

export default defineComponent({
  components: {
    AppButton,
    Optie,
    GlassTile,
  },
  data() {
    return {
      gekozenVoorkeurenData: null as Result | string | null,
      alleVoorkeurenData: null as AlleVoorkeurenData | string | null,
      gebruikersVoorkeurenData: null as GebruikersVoorkeurenData | string | null,
      voorgeselecteerdeVoorkeuren: ref<string[]>([]),
      selectedCategories: ref<string[]>([]),
      foodCategories: ref<string[]>([]),
    };
  },
  methods: {
    gotoHome() {
      this.$router.push("/");
    },
    handleOptionChange(category: string, checked: boolean) {
      console.log(category, checked);
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
    async postData() {
      const postData = {
        voorkeuren: this.selectedCategories,
      };

      try {
        const res = await fetch(`${baseURL}/gebruiker/slavoorkeurenop?id=` + USERID, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(postData),
        });
        console.log(JSON.stringify(postData));

        if (!res.ok) {
          console.log('error ');

          const message = `An error has occurred: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type")!,
            "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
        };

        this.gekozenVoorkeurenData = result;
      } catch (err) {
        this.gekozenVoorkeurenData = err.message;
      }
    },
    async getAlleGebruikersVoorkeuren (): Promise<void> {
      try {
        const res = await fetch(`${baseURL}/gebruikers/voorkeuren`);

        if (!res.ok) {
          const message = `An error has occurred: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: `${res.status}-${res.statusText}`,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          length: res.headers.get("Content-Length"),
          data: data,
        };

        this.gebruikersVoorkeurenData = result.data;
        this.gebruikersVoorkeurenData.voorkeuren.forEach((voorkeur: Voorkeur) => {
          this.voorgeselecteerdeVoorkeuren.push(voorkeur.naam);
        });

        this.selectedCategories = this.voorgeselecteerdeVoorkeuren;
      } catch (fetchError) {
        console.error(`Error fetching gebruikersvoorkeuren: ${fetchError.message}`);
      } catch (jsonError) {
        console.error(`Error parsing JSON: ${jsonError.message}`);
      }
    },
    async getAlleVoorkeuren () {
      try {
        const res = await fetch(`${baseURL}/voorkeuren`);

        if (!res.ok) {
          const message = `An error has occurred: ${res.status} - ${res.statusText}`;
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

        this.alleVoorkeurenData.voorkeuren.forEach((voorkeur: Voorkeur) => {
          this.foodCategories.push(voorkeur.naam)
        });

      } catch (err) {
        let errorMessage = "Failed to do something exceptional";
        if (err instanceof Error) {
          this.alleVoorkeurenData = err.message;
        }
        console.log(errorMessage);
      }
    }
  },

  async created () {
    await this.getAlleVoorkeuren();
    await this.getAlleGebruikersVoorkeuren();
  }
});
</script>


<template>
  <div class="centeredItems">
    <GlassTile class="glass">
      <div class="scroller">
        <h2 class="optieMenuTitle">Voorkeuren</h2>
        <div v-for="naam in this.foodCategories " @change="handleOptionChange(naam, $event.target.checked)">
          <Optie :label="naam" :value="naam" :checked="voorgeselecteerdeVoorkeuren.includes(naam)" />
        </div>
      </div>
    </GlassTile>
    <AppButton label="Bewaar je keuze!" @click="postData(); gotoHome()" class="endButton" />
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
  max-width: 50%;
}

/* media queries */
@media only screen and (max-width: 450px) {
  .glass {
    max-width: 100%;
  }
}

@media only screen and (max-width: 310px) {
  .glass {
    /* scale based on width */
    transform: scale(0.8);
  }

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
