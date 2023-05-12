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
    checkedItems(): CheckboxItem[] {
      return this.voorkeurCheckboxItems.filter((item: CheckboxItem) => item.value);
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

    async fetchAllVoorkeuren() {
      try {
        const data = await get(`${baseURL}/voorkeuren`);
        if (data.error){
          this.errorMessage = "Er ging iets mis bij het ophalen van de voorkeuren, probeer het later opnieuw.";
          return;
        }
        this.voorkeurCheckboxItems = data.voorkeuren.map((item: any) => ({
          label: item.naam,
          value: false,
        }));
      } catch (error) {
        this.errorMessage = "Er ging iets mis bij het ophalen van de voorkeuren, probeer het later opnieuw.";
        console.log(error);
      }
    },

    async fetchUserVoorkeuren(){
      try {
        const data = await get(`${baseURL}/gebruiker/haalvoorkeurenop?id=`+this.getUserID);
        if (data.error){
          this.errorMessage = "Er ging iets mis bij het ophalen van de voorkeuren, probeer het later opnieuw.";
          return;
        }
        for (let i = 0; i < this.voorkeurCheckboxItems.length; i++) {
          for (let j = 0; j < data.voorkeuren.length; j++) {
            if (this.voorkeurCheckboxItems[i].label == data.voorkeuren[j].naam) {
              this.voorkeurCheckboxItems[i].value = true;
            }
          }
        }
      } catch (error) {
        this.errorMessage = "Er ging iets mis bij het ophalen van de voorkeuren, probeer het later opnieuw.";
        console.log(error);
      }
    },

    async postUserVoorkeuren(){
      this.loading = true;
      try {
        var checkedItemsWithoutValue = [];
        for (let i = 0; i < this.checkedItems.length; i++) {
          checkedItemsWithoutValue.push(this.checkedItems[i].label);
        }
        const postData = {
          voorkeuren: checkedItemsWithoutValue
        }
        const data = await post(`${baseURL}/gebruiker/slavoorkeurenop?id=${this.getUserID}`, postData);
        if (data.error){
          this.errorMessage = "Er ging iets mis bij het opslaan van uw voorkeuren, probeer het later opnieuw.";
          return;
        }
      } catch (error) {
        this.errorMessage = "Er ging iets mis bij het opslaan van uw voorkeuren, probeer het later opnieuw.";
        console.log(error);
      } finally {
        this.loading = false;
        this.$router.push('/');
      }

      this.$router.push('/');
    },

    async mockGetAllRestricties(){
      this.voedingrestrictieCheckboxItems = [
        { label: 'Gluten', value: false },
        { label: 'Lactose', value: false },
        { label: 'Noten', value: false },
        { label: 'Pinda', value: false },
        { label: 'Sesam', value: false },
      ];
    },
    async mockGetUserRestricties(){
      var userVoedingrestrictie = [
        { label: 'Gluten', value: true },
        { label: 'Noten', value: true },
      ];

      for (let i = 0; i < this.voedingrestrictieCheckboxItems.length; i++) {
        for (let j = 0; j < userVoedingrestrictie.length; j++) {
          if (this.voedingrestrictieCheckboxItems[i].label == userVoedingrestrictie[j].label) {
            this.voedingrestrictieCheckboxItems[i].value = true;
          }
        }
      }
    },
    async fetchVoorkeurenInformation(){
      await this.fetchAllVoorkeuren();
      this.fetchUserVoorkeuren();
    },
    async fetchRestrictiesInformation(){
      await this.mockGetAllRestricties();
      this.mockGetUserRestricties();
    },
  },

  async mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }

    await Promise.all([
      this.fetchVoorkeurenInformation(),
      this.fetchRestrictiesInformation(),
    ]);

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
