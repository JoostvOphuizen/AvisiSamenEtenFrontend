<template>
  <div class="categorybox">
    <ErrorMessage v-if="errorMessage" :message="errorMessage" @update:message="errorMessage = $event" />
    <CheckboxList v-if="!loading" :items="voorkeurCheckboxItems" @update:items="handleCheckboxItemsUpdate" title="Voorkeuren" />
    <CheckboxList v-if="!loading" :items="voedingrestrictieCheckboxItems" @update:items="handleVoedingrestrictieCheckboxItemsUpdate" title="voedingsrestricties" />
    <AppButton v-if="!loading" label="Opslaan" @click="postUserVoorkeuren"></AppButton>
    <div v-if="loading" class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CheckboxList from '@/components/CheckboxList.vue';
import { get, post } from '@/services/apiService';
import { mapGetters } from 'vuex'
import AppButton from '@/components/Button.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

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
  },

  data() {
    return {
      voorkeurCheckboxItems: [] as CheckboxItem[],
      voedingrestrictieCheckboxItems: [] as CheckboxItem[],
      errorMessage: '',
      loading: false,
    };
  },

  computed: {
    checkedItemsVoorkeur(): CheckboxItem[] {
      return this.voorkeurCheckboxItems.filter((item: CheckboxItem) => item.value);
    },
    checkedItemsVoedingrestrictie(): CheckboxItem[] {
      return this.voedingrestrictieCheckboxItems.filter((item: CheckboxItem) => item.value);
    },
    ...mapGetters(['isLoggedIn', 'getUserID']),
  },

  methods: {
    handleCheckboxItemsUpdate(updatedItems: CheckboxItem[]) {
      this.voorkeurCheckboxItems = updatedItems;
    },

    handleVoedingrestrictieCheckboxItemsUpdate(updatedItems: CheckboxItem[]) {
      this.voedingrestrictieCheckboxItems = updatedItems;
    },
    async postUserVoorkeuren(){
      this.loading = true;
      try {
        var checkedItemsWithoutValueVoorkeur = [];
        var checkedItemsWithoutValueVoedingrestrictie = [];
        for (let i = 0; i < this.checkedItemsVoorkeur.length; i++) {
          checkedItemsWithoutValueVoorkeur.push(this.checkedItemsVoorkeur[i].label);
        }
        for (let i = 0; i < this.checkedItemsVoedingrestrictie.length; i++) {
          checkedItemsWithoutValueVoedingrestrictie.push(this.checkedItemsVoedingrestrictie[i].label);
        }
        const postDataVoorkeuren = {
          voorkeuren: checkedItemsWithoutValueVoorkeur
        }
        const postDataVoedingrestricties = {
          voorkeuren: checkedItemsWithoutValueVoedingrestrictie
        }
        const data = await post(`${baseURL}/gebruiker/slavoorkeurenop?id=${this.getUserID}`, postDataVoorkeuren);
        const data2 = await post(`${baseURL}/gebruiker/slarestrictiesop?id=${this.getUserID}`, postDataVoedingrestricties);
        if (data.error){
          this.errorMessage = "Er ging iets mis bij het opslaan van uw voorkeuren, probeer het later opnieuw.";
          return;
        }
        if (data2.error){
          this.errorMessage = "Er ging iets mis bij het opslaan van uw restricties, probeer het later opnieuw.";
          return;
        }
      } catch (error) {
        this.errorMessage = "Er ging iets mis bij het opslaan van uw voorkeuren en of restricties, probeer het later opnieuw.";
        console.log(error);
      } finally {
        this.loading = false;
        this.$router.push('/');
      }
    },
    async getVoedingsbehoeften(){
      try {
        const data = await get(`${baseURL}/voorkeuren/voedingsbehoeften?gebruikersToken=${this.getUserID}`);
        if (data.error){
          this.errorMessage = "Er ging iets mis bij het ophalen van de voedingsbehoeften, probeer het later opnieuw.";
          return;
        }
        data.voedingsbehoeften.forEach((voedingsbehoeftenItem: any) => {
          const checkboxItems = voedingsbehoeftenItem.voorkeuren.map((item: any) => ({
            label: item.naam,
            value: item.keuze,
          }));
          if (voedingsbehoeftenItem.naam === 'Voorkeuren') {
            this.voorkeurCheckboxItems = checkboxItems;
          } else if (voedingsbehoeftenItem.naam === 'Voedingsrestrictie') {
            this.voedingrestrictieCheckboxItems = checkboxItems;
          }
        });
      } catch (error) {
        this.errorMessage = "Er ging iets mis bij het ophalen van de voorkeuren, probeer het later opnieuw.";
        console.log(error);
      }
    }
  },

  async mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }

    await this.getVoedingsbehoeften();

  },
});
</script>

<style scoped>
/* fills screen */
.categorybox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
