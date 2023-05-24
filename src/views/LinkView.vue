<template>
  <CopyLink link="http://localhost:5173/link/1234-1234-1234"></CopyLink>

  <div class="Flexbox">
    <div class="Leftbox">
      <div class="flexboxLeft">
        <h1 class="title">Organisator</h1>
      </div>
      <GlassTile class="HostGebruikerTile">
        <BaseChip class="HostChip" label="Host" icon="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
      </GlassTile>
      <div class="VanGebruikersBox">
        <div class="flexboxLeft">
          <h1 class="title">Voorkeuren</h1>
        </div>
        <GlassTile class="VoorkeurenVanGebruikersTile">
          <div class="VoorkeurChips">
            <BaseChip class="VoorkeurChip" label="Mexicaans" color="var(--vt-c-black-soft)" number="5" />
            <BaseChip class="VoorkeurChip" label="Pizza" color="var(--vt-c-black-soft)" number="3" />
            <BaseChip class="VoorkeurChip" label="Poke Bowl" color="var(--vt-c-black-soft)" number="2" />
            <BaseChip class="VoorkeurChip" label="Italiaans" color="var(--vt-c-black-soft)" number="2" />
            <BaseChip class="VoorkeurChip" label="Falafel" color="var(--vt-c-black-soft)" number="1" />
          </div>
        </GlassTile>
        <div class="flexboxLeft">
          <h1 class="title">Restricties</h1>
        </div>
        <GlassTile class="RestrictiesVanGebruikersTile">
          <div class="VoorkeurChips">
            <BaseChip class="VoorkeurChip" label="Noten" color="var(--vt-c-black-soft)" number="!" numberColor="#ED512D" />
            <BaseChip class="VoorkeurChip" label="Gluten" color="var(--vt-c-black-soft)" number="!" numberColor="#ED512D" />
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
          <BaseChip class="HostChip" label="GebruikerGebruikerGebruikerGebruikerGebruikerGebruiker" icon="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
          <BaseChip class="HostChip" label="Gebruiker" icon="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
          <BaseChip class="HostChip" label="Gebruiker" icon="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
          <BaseChip class="HostChip" label="Gebruiker" icon="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
        </div>
      </GlassTile>
    </div>
  </div>
  <div class="Center">
    <AppButton label="Organiseer etentje!" @click=""></AppButton>
  </div>
</template>

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


<script lang="ts">
import { defineComponent } from 'vue';
import CheckboxList from '@/components/CheckboxList.vue';
import { get, post } from '@/services/apiService';
import { useRoute } from 'vue-router'
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

  data() {
    return {
      errorMessage: '',
      loading: false,
    };
  },

  computed: {
    ...mapGetters(['isLoggedIn', 'getUserID']),
  },

  methods: {
    
  },

  async mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }
    const route = useRoute()

    const token = route.params.token

    console.log(token)
  },
});
</script>

