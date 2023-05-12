<template>
    <div class="categorybox">
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
  
  const baseURL = "http://localhost:8080";
  
  interface CheckboxItem {
    label: string;
    value: boolean;
    icon: string;
  }
  
  export default defineComponent({
    components: {
      SearchBar,
      CheckboxList,
      AppButton,
    },
  
    data() {
      return {
        userCheckboxItems: [] as CheckboxItem[],
        searchQuery: '',
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
      ...mapGetters(['isLoggedIn', 'getUserID']),
    },
  
    methods: {
        handleCheckboxItemsUpdate(updatedItems: CheckboxItem[]) {
        for (const updatedItem of updatedItems) {
            const item = this.userCheckboxItems.find((i) => i.label === updatedItem.label);
            if (item) {
            item.value = updatedItem.value;
            }
        }
    },
      async fetchAllUsers() {
        // /* mock data */
        // this.userCheckboxItems = [
        //   {
        //     label: "Jantje",
        //     value: false,
        //     icon: "https://lh3.googleusercontent.com/a/AGNmyxahJx3TediH5qXNTiTKBnuvA6emSstPlwTWeRO3=s96-c",
        //   },
        //   {
        //     label: "Pietje",
        //     value: false,
        //     icon: "https://lh3.googleusercontent.com/a/AGNmyxahJx3TediH5qXNTiTKBnuvA6emSstPlwTWeRO3=s96-c",
        //   },
        //   {
        //     label: "Klaasje",
        //     value: false,
        //     icon: "https://lh3.googleusercontent.com/a/AGNmyxahJx3TediH5qXNTiTKBnuvA6emSstPlwTWeRO3=s96-c",
        //   },
        // ];

        const data = await get(`${baseURL}/gebruiker`);
        this.userCheckboxItems = data.gebruikers.map((item: any) => ({
          label: item.naam,
          value: false,
          icon: item.foto,
        }));
      },
      async organiseerEtentje() {
        console.log("organiseer etentje");
        var postData = {    
          "userID": this.getUserID,
        };
        console.log(postData);
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