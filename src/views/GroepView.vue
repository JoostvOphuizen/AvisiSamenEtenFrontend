<template>
    <div class="categorybox">
      <ErrorMessage v-if="errorMessage" :message="errorMessage" @update:message="errorMessage = $event" />
      <SearchBar class="fitcontent" @search="handleSearch"></SearchBar>
      <CheckboxList :items="filteredUserCheckboxItems" @update:items="handleCheckboxItemsUpdate" title="" />
      <AppButton label="Organiseer etentje!" @click="organiseerEtentje"></AppButton>
    </div>
  </template>  
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import CheckboxList from '@/components/CheckboxList.vue';
  import { get } from '@/services/apiService';
  import { mapGetters } from 'vuex';
  import AppButton from '@/components/Button.vue';
  import SearchBar from '@/components/SearchBar.vue';
  import ErrorMessage from '@/components/ErrorMessage.vue';
  
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
      SearchBar,
      CheckboxList,
      AppButton,
      ErrorMessage,
    },
  
    data() {
      return {
        userCheckboxItems: [] as CheckboxItem[],
        searchQuery: '',
        errorMessage: '',
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
          const data = await get(`${baseURL}/gebruiker`);
          if(data.error) {
              this.errorMessage = "Er ging iets mis bij het ophalen van de gebruikers. Probeer het later opnieuw.";
              return;
          }
          data.gebruikers = data.gebruikers.filter((item: any) => item.naam !== this.userName);
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
      async organiseerEtentje() {
        const userIds = this.checkedItems.map((item) => item.id);
        const url = `${baseURL}/restaurant/bepaal`;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userIds),
        };

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if(data.error) {
            this.errorMessage = "Er ging iets mis bij het organiseren van het etentje. Probeer het later opnieuw.";
            return;
          }
        } catch (error) {
          console.error(error);
        }
      },
      handleSearch(searchQuery: string) {
        this.searchQuery = searchQuery;
      },
    },
  
    async mounted() {
      if (!this.isLoggedIn) {
        this.$router.push('/login');
      }
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