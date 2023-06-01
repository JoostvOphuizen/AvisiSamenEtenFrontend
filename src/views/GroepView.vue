<template>
    <div class="categorybox">
      <ErrorMessage v-if="errorMessage" :message="errorMessage" @update:message="errorMessage = $event" />
      <SearchBar class="fitcontent" @search="handleSearch"></SearchBar>
      <CheckboxList v-if="!loading" :items="filteredUserCheckboxItems" @update:items="handleCheckboxItemsUpdate" title="Gebruikers" />
      <CheckboxList v-if="!loading" :items="filteredGroepCheckboxItems" @update:items="handleGroepItemsUpdate" title="Groepen" />
<<<<<<< HEAD
      <GroepToevoegenKnop class="fitcontent" @click="maakGroep" label="Voeg een nieuwe groep toe" icon-right="src\assets\plus.png"></GroepToevoegenKnop>
      <div class="buttons">
        <AppButton label="Organiseer etentje!" @click="organiseerEtentje"></AppButton>
        <AppButton label="Genereer link" @click="genereerLink" icon-left="src\assets\external-link(1).png"></AppButton>
      </div>
=======
      <AppButton class="fitcontent doorzichtig" @click="maakGroep" label="Voeg een nieuwe groep toe" icon-right="src\assets\plus.png"></AppButton>
      <AppButton label="Organiseer etentje!" @click="organiseerEtentje"></AppButton>
>>>>>>> 2390683f668aea962c0b05578b8ca0b95df01976
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
  import store from '@/store';
  
  const baseURL = "http://localhost:8080";
  
  interface CheckboxItem {
    pictures: string[];
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
        groepCheckboxItems: [] as CheckboxItem[],
        lastGroepUpdate: [] as CheckboxItem[],
        searchQuery: '',
        errorMessage: '',
        userID: null,
        loading: false,
      };
    },
  
    computed: {
      checkedItems(): CheckboxItem[]{
        const users = this.userCheckboxItems.filter((item: CheckboxItem) => item.value)
        return users;
      },
      filteredUserCheckboxItems(): CheckboxItem[] {
        const searchQuery = this.searchQuery.toLowerCase();
        return this.userCheckboxItems.filter((item: CheckboxItem) =>
          item.label.toLowerCase().includes(searchQuery)
        );
      },
      filteredGroepCheckboxItems(): CheckboxItem[] {
        const searchQuery = this.searchQuery.toLowerCase();
        return this.groepCheckboxItems.filter((item: CheckboxItem) =>
          item.label.toLowerCase().includes(searchQuery)
        );
      },
      ...mapGetters(['isLoggedIn', 'getUserID', 'userName', 'userEmail']),
    },
  
    methods: {
      hideMessage() {
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
      handleGroepItemsUpdate(updatedItems: CheckboxItem[]) {
        for (const updatedItem of updatedItems) {
          const item = this.groepCheckboxItems.find((i) => i.label === updatedItem.label);
          if (item) {
            item.value = updatedItem.value;
            if(updatedItem.value) {
              this.selectUsers(item)
            } else {
              const oudItem = this.lastGroepUpdate.find((i) => i.label === item.label)
              if(oudItem?.value != item.value){
                const items = JSON.parse(JSON.stringify(updatedItems))
                this.deselectUsers(item)
                this.getAlleGeselecteerdeGebruikers(items)
              }
            }
          }
        }
        this.lastGroepUpdate = JSON.parse(JSON.stringify(updatedItems));
      },
      getAlleGeselecteerdeGebruikers(groepen: CheckboxItem[]){
        for(const groep of groepen){
          if(groep.value){
            for(const user of groep.gebruikers){
              const item = this.userCheckboxItems.find((i) => i.id === user);
              if(item){
                item.value = true
              }
            }
          }
        }
      },
      selectUsers(groep: { label: string; value: boolean; icon: string; id: number; }){
        groep.gebruikers.forEach((id: number) =>{
          const item = this.userCheckboxItems.find((i) => i.id === id);
          if (item) {
            item.value = true
          }
        })
      },
      deselectUsers(groep: { label: string; value: boolean; icon: string; id: number; }){
        groep.gebruikers.forEach((id: number) =>{
          const gebruiker = this.userCheckboxItems.find((i) => i.id === id);
          if (gebruiker) {
            gebruiker.value = false
          }
        })
      },
      async fetchAllUsers() {
        try{
          const data = await get(`${baseURL}/gebruiker/baseinfo`);
          if(data.error) {
            this.errorMessage = "Er ging iets mis bij het ophalen van de gebruikers. Probeer het later opnieuw.";
            return;
          }

          /* get current user and store the userID */
          const currentUser = data.gebruikers.find((item: any) => item.naam === this.userName);
          if(currentUser) {
            this.userID = currentUser.id;
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
      async fetchAllGroep() {
        try{
          const data = await get(`${baseURL}/groep`);
          if(data.error) {
            this.errorMessage = "Er ging iets mis bij het ophalen van de gebruikers. Probeer het later opnieuw.";
            return;
          }
          this.groepCheckboxItems = data.groepen.map((item: any) => ({
            label: item.naam,
            value: false,
            gebruikers: item.leden,
          }));
          this.getGroepInfo(this.groepCheckboxItems)
        } catch (error) {
          this.errorMessage = "Er ging iets mis bij het ophalen van de gebruikers. Probeer het later opnieuw.";
          console.error(error);
        }
      },
      getGroepInfo(groepen: CheckboxItem[]){
        for(const groep of groepen){
          for(const user of groep.gebruikers){
            for(const user2 of this.userCheckboxItems){
              if(user2.id==user){
                if(groep.pictures) {
                  groep.pictures.push(user2.icon)
                }else{
                  groep.pictures = [user2.icon]
                }
                groep.label = groep.label
              }
            }
          }
        }
      },
      async organiseerEtentje() {
        const userIds = this.checkedItems.map((item) => item.id);
        if (userIds.length < 1) {
          this.errorMessage = "Selecteer minstens 1 gebruikers om een etentje te organiseren.";
          return;
        }
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
          store.dispatch('setRestaurantData', data);
          if(data.error) {
            this.errorMessage = "Er ging iets mis bij het organiseren van het etentje. Probeer het later opnieuw.";
            return;
          }
          const id = data.restaurantId
          this.$router.push({
            name: "restaurant",
            query: {restaurant_id: id},
            path: "/restaurant",
          })
        } catch (error) {
          console.error(error);
        }
      },
      maakGroep(){
        this.$router.push('/maakgroep')
      },
      handleSearch(searchQuery: string) {
        this.searchQuery = searchQuery;
      },
      genereerLink(){
        this.$router.push('/createlink')
      }
    },
  
    async mounted() {
      if (!this.isLoggedIn) {
        this.$router.push('/login');
      }
      await this.fetchAllUsers();
      await this.fetchAllGroep();
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

  .buttons {
    display: flex;
    flex-direction: row;
  }

</style>  