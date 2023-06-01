<template>
  <ErrorMessage v-if="errorMessage" :message="errorMessage" />
  <CopyLink :link="link"></CopyLink>

  <div class="Flexbox">
    <div class="Leftbox">
      <div class="flexboxLeft">
        <h1 class="title">Organisator</h1>
      </div>
      <GlassTile class="HostGebruikerTile" v-if="host.label && host.icon">
        <BaseChip
          class="HostChip"
          :label="host.label"
          :icon="host.icon"
          :highlight="isOrganisator"
        />
      </GlassTile>
      <div class="VanGebruikersBox">
        <div class="flexboxLeft">
          <h1 class="title">Voorkeuren</h1>
        </div>
        <GlassTile class="VoorkeurenVanGebruikersTile">
          <div class="VoorkeurChips">
            <div v-for="(value, key) in countedVoorkeuren" :key="key">
              <BaseChip
                class="VoorkeurChip"
                :label="key.toString()"
                color="var(--vt-c-black-soft)"
                :number="value.toString()"
              />
            </div>
          </div>
        </GlassTile>
        <div class="flexboxLeft">
          <h1 class="title">Restricties</h1>
        </div>
        <GlassTile class="RestrictiesVanGebruikersTile">
          <div class="VoorkeurChips" v-for="item in distinctRestricties" :key="item">
              <BaseChip class="VoorkeurChip" :label="item" color="var(--vt-c-black-soft)" number="!" numberColor="#ED512D" />
          </div>
        </GlassTile>
      </div>
    </div>
    <div class="Rightbox">
      <div class="flexboxLeft">
        <h1 class="title">Groep</h1>
      </div>
      <GlassTile class="JoinedGebruikerTile">
        <div class="VoorkeurChips">
          <BaseChip
            v-for="uitgenodigde in uitgenodigden"
            :key="uitgenodigde.label"
            :label="uitgenodigde.label"
            :icon="uitgenodigde.icon"
            :highlight="checkHighlight(uitgenodigde)"
            @click="isOrganisator ? verwijderUitgenodigde(uitgenodigde.id) : null"
          />
        </div>
      </GlassTile>
    </div>
  </div>
  <div class="Center">
    <AppButton v-if="isOrganisator" label="Organiseer etentje!" @click="organiseerEtentje()"></AppButton>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import CheckboxList from '@/components/CheckboxList.vue';
import { get, post } from '@/services/apiService';
import { mapGetters } from 'vuex'
import AppButton from '@/components/Button.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import GlassTile from '@/components/GlassTile.vue';
import BaseChip from '@/components/BaseChip.vue';
import CopyLink from '@/components/CopyLink.vue';

const baseURL = "http://localhost:8080";

interface CheckboxItem {
  label: string;
  value: boolean;
}

export default defineComponent({
  components: {
    CheckboxList,
    AppButton,
    ErrorMessage,
    GlassTile,
    BaseChip,
    CopyLink,
  },
  props: ['token'],
  data() {
    return {
      errorMessage: '' as string,
      loading: false,
      link: '',
      distinctRestricties: [] as string[],
      countedVoorkeuren: {} as { [key: string]: number },
      host: {
        label: '',
        icon: '',
        id: '',
      },
      uitgenodigden: [] as { label: string; icon: string; id: string }[],
      intervalId: null as number | null,
      gebruikersID: '' as string,
      geaccepteerd: false as boolean,
    };
  },
  created() {
    this.intervalId = setInterval(this.updateData, 1000);
  },
  beforeUnmount() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUserID']),
    isOrganisator(): boolean {
      return this.gebruikersID === this.host.id;
    }
  },

  methods: {
    checkHighlight(uitgenodigde: { id: string }): boolean {
      return uitgenodigde.id === this.gebruikersID;
    },
    async updateData() {
      const data = await this.fetchAllUsersInUitgenodigdeGroep();
      if (data.restaurantID != null){
        this.$router.push(`/restaurant/${data.restaurantID}`);
      }
      await this.loadPage(data);
    },
    async loadPage (data: any){
      this.gebruikersID = data.gebruikerID;
      const host = data.host;

      this.host = {
        label: host.naam,
        icon: `${host.foto}`,
        id: host.id,
      };
      var uitgenodigden = data.uitgenodigden;
      this.uitgenodigden = uitgenodigden.gebruikers.map((gebruiker: any) => {
        return {
          label: gebruiker.naam,
          icon: `${gebruiker.foto}`,
          id: gebruiker.id,
        };
      });
      var AllRestricties: { naam: string }[] = data.host.restricties;

      for (var i = 0; i < data.uitgenodigden.gebruikers.length; i++) {
        AllRestricties.push(...data.uitgenodigden.gebruikers[i].restricties);
      }

      var AllVoorkeuren = data.host.voorkeuren;
      for (var i = 0; i < data.uitgenodigden.gebruikers.length; i++) {
        AllVoorkeuren.push(...data.uitgenodigden.gebruikers[i].voorkeuren);
      }

      var countedVoorkeuren: { [key: string]: number } = {};

      for (var i = 0; i < host.voorkeuren.length; i++) {
        const voorkeur = host.voorkeuren[i];
        countedVoorkeuren[voorkeur.naam] = (countedVoorkeuren[voorkeur.naam] || 0) + 1;
      }

      for (var i = 0; i < uitgenodigden.length; i++) {
        for (var j = 0; j < uitgenodigden[i].voorkeuren.length; j++) {
          const voorkeur = uitgenodigden[i].voorkeuren[j];
          countedVoorkeuren[voorkeur.naam] = (countedVoorkeuren[voorkeur.naam] || 0) + 1;
        }
      }

      var countedVoorkeurenArray = Object.keys(countedVoorkeuren).map(key => [key, countedVoorkeuren[key]]);

      countedVoorkeurenArray.sort((a, b) => parseInt(b[1] as string, 10) - parseInt(a[1] as string, 10));

      countedVoorkeuren = countedVoorkeurenArray.reduce((acc: { [key: string]: number }, [key, value]) => {
        acc[key] = parseInt(value as string, 10);
        return acc;
      }, {});

      this.countedVoorkeuren = countedVoorkeuren;

      var distinctRestricties: string[] = [];
      for (var i = 0; i < AllRestricties.length; i++) {
        if (!distinctRestricties.includes(AllRestricties[i].naam)) {
          distinctRestricties.push(AllRestricties[i].naam);
        }
      }
      this.distinctRestricties = distinctRestricties;
      var gebruikerID = data.gebruikerID;
      if (gebruikerID != host.id && !uitgenodigden.gebruikers.some((gebruiker: any) => gebruiker.id == gebruikerID)) {
        if (this.geaccepteerd) {
          this.$router.push('/');
          return;
        }
        await this.accepteerUitnodiging();
        this.geaccepteerd = true;
        this.updateData();
    }

    },
    async fetchAllUsersInUitgenodigdeGroep() {
      try {
        const response = await get(`${baseURL}/uitnodiging?uitnodigingToken=${this.token}&gebruikerToken=${this.getUserID}`);
        return response;
      } catch (error) {
        this.errorMessage = (error as { response: { data: { message: string } } }).response.data.message;
      }
    },
    async accepteerUitnodiging(){
      const data = {
          uitnodigingToken: this.token,
      }
      try {
        const response = await post(`${baseURL}/uitnodiging/accepteer?gebruikerToken=${this.getUserID}`, data);
        return response;
      } catch (error) {
        this.errorMessage = (error as { response: { data: { message: string } } }).response.data.message;
      }
    },
    async organiseerEtentje() {
      const userIds = this.uitgenodigden.map((uitgenodigde: { id: string }) => uitgenodigde.id);
      userIds.push(this.host.id);

      const url = `${baseURL}/restaurant/bepaal`;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userIds),
        };
      var restaurant = null;
      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          restaurant = data;
          this.updateGekozenRestaurant(restaurant.restaurantId);
          this.$router.push({
            name: 'restaurant',
            query: { restaurant_id: restaurant.restaurantId, },
            path: 'restaurant',
          });
        })
      .catch(error => console.error(error));
    },
    async updateGekozenRestaurant(restaurantID: string){
      try {
        var data = {
          uitnodigingToken: this.token
        }
        const response = post(`${baseURL}/uitnodiging/restaurant?restaurantId=${restaurantID}`, data);
        return response;
      } catch (error) {
        this.errorMessage = (error as { response: { data: { message: string } } }).response.data.message;
      }
    },
    async verwijderUitgenodigde(id: string) {
    if (this.isOrganisator) {
      try {
        var data = {
          uitnodigingToken: this.token
        }
        const response = await post(`${baseURL}/uitnodiging/kick?uitgenodigdeID=${id}`, data);
        if (response.status === 200) {
          this.updateData();
        }
      } catch (error) {
        this.errorMessage = (error as { response: { data: { message: string } } }).response.data.message;
      }
    }
},

  },
  async mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }
    this.link = window.location.href;
    this.updateData();
  },
});
</script>
<style scoped>

.Center {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 10px;
}
.flexboxLeft {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  align-items: flex-start;
}

.title {
  font-size: 20px;
  margin: 0px 5px 0px 5px;
  color: white;
}

.HostChip {
  width: 100%;
}

.VoorkeurChip, .HostChip {
  max-width: 100%;
}

.Flexbox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  align-items: flex-start;
}

.Leftbox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.Rightbox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.VanGebruikersBox {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.HostGebruikerTile {
  width: 95%;
  height: 100%;
  padding: 5px;
  margin: 5px;
}

.VoorkeurenVanGebruikersTile {
  width: 95%;
  height: 100%;
  margin: 5px;
  padding: 5px;
  overflow: auto;
}

.VoorkeurChips {
  display: flex;
  flex-wrap: wrap; 
}

.VoorkeurChip {
  width: auto;
  color: white;
  text-align: left;
  padding: 2px;
  margin: 0px; 
}

.RestrictiesVanGebruikersTile {
  width: 95%;
  height: 100%;
  margin: 5px;
  padding: 5px;
}

.JoinedGebruikerTile {
  width: 95%;
  height: 100%;
  margin: 5px;
  flex-direction: column
}

@media screen and (max-width: 400px) {
  .Flexbox {
    flex-direction: column;
    align-items: center;
  }

  .Leftbox {
    width: 100%;
  }

  .Rightbox {
    width: 100%;
  }
}
</style>


