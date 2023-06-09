<template>
  <div class="categorybox">
    <ErrorMessage v-if="errorMessage" :message="errorMessage" @update:message="errorMessage = $event" />
    <Inputveld style="margin-bottom: 10px" class="fitcontent" @search="getNaam" :placeholder-name="'Naam van de groep...'"></Inputveld>
    <SearchBar class="fitcontent" @search="handleSearch"></SearchBar>
    <CheckboxList :items="filteredUserCheckboxItems" @update:items="handleCheckboxItemsUpdate" title="" />
    <AppButton label="Creëer groep" @click="maakGroep"></AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CheckboxList from '@/components/CheckboxList.vue';
import {get, post} from '@/services/apiService';
import { mapGetters } from 'vuex';
import AppButton from '@/components/Button.vue';
import SearchBar from '@/components/SearchBar.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import Inputveld from "@/components/Inputveld.vue";

const baseURL = "http://localhost:8080";

interface CheckboxItem {
  label: string;
  value: boolean;
  icon: string;
  id: number;
}

export default defineComponent({
  emits: ['update:message'],
  components: {
    Inputveld,
    SearchBar,
    CheckboxList,
    AppButton,
    ErrorMessage,
  },

  data() {
    return {
      userCheckboxItems: [] as CheckboxItem[],
      searchQuery: '',
      groepsnaam: '',
      errorMessage: '',
      loading: false
    };
  },

  computed: {
    checkedItems(): CheckboxItem[] {
      return this.userCheckboxItems.filter((item: CheckboxItem) => item.value);
    },
    filteredUserCheckboxItems(): CheckboxItem[] {
      const searchQuery = this.searchQuery.toLowerCase();
      return this.userCheckboxItems.filter((item: CheckboxItem) =>
          item.label.toLowerCase().includes(searchQuery)
      );
    },
    ...mapGetters(['isLoggedIn', 'getUserID', 'userName', 'userEmail']),
  },

  methods: {
    hideMessage() {
      console.log('hide message');
      this.$emit('update:message', '');
    },
    handleCheckboxItemsUpdate(updatedItems: CheckboxItem[]) {
      for (const updatedItem of updatedItems) {
        const item = this.userCheckboxItems.find((i) => i.label === updatedItem.label);
        if (item) {
          item.value = updatedItem.value;
        }
      }
    },
    async fetchAllUsers() {
      try{
        const data = await get(`${baseURL}/gebruiker/baseinfo`);
        if(data.error) {
          this.errorMessage = "Er ging iets mis bij het ophalen van de gebruikers. Probeer het later opnieuw.";
          return;
        }
        this.userCheckboxItems = data.gebruikers.map((item: any) => ({
          label: item.naam,
          value: false,
          icon: item.foto,
          id: item.id,
        }));
      } catch (error) {
        this.errorMessage = "Er ging iets mis bij het ophalen van de gebruikers. Probeer het later opnieuw.";
        console.error(error);
      }
    },
    async maakGroep() {
      this.loading = true;
      try {
        var checkedItemsWithoutValue = [];
        for (let i = 0; i < this.checkedItems.length; i++) {
          checkedItemsWithoutValue.push(this.checkedItems[i].id);
        }
        const postData = {
          leden: checkedItemsWithoutValue,
          naam: this.groepsnaam
        }
        const data = await post(`${baseURL}/groep`, postData);
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
    handleSearch(searchQuery: string) {
      this.searchQuery = searchQuery;
    },
    getNaam(groepsnaam: string) {
      this.groepsnaam = groepsnaam;
    },
  },

  async mounted() {
    await this.fetchAllUsers();
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

.fitcontent {
  width: 80%;
}

@media screen and (max-width: 400px) {
  .fitcontent {
    width: 100%;
  }
}
</style>