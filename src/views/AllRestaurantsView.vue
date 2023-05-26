<template>
  <div class="categorybox">
    <SearchBar class="fitcontent" @search="handleSearch"></SearchBar>
    <CheckboxList v-if="!loading" :items="filteredCheckboxItems" @update:items="handleCheckboxItemsUpdate" title="Gebruikers" />

    <div v-if="loading" class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CheckboxList from '@/components/CheckboxList.vue';
import { get } from '@/services/apiService';
import { mapGetters } from 'vuex'
import SearchBar from "@/components/SearchBar.vue";

const baseURL = "http://localhost:8080";

interface CheckboxItem {
  restaurantId: number;
  restaurantNaam: string;
  postcode: string;
  straatnaam: string;
  huisnummer: number;
  link: string;
  foto: string;
  voorkeuren: string[];
  restricties: string[];
}

export default defineComponent({
  components: {
    SearchBar,
    CheckboxList,
  },
  data() {
    return {
      checkboxItems: [] as CheckboxItem[],
      searchQuery: '',
      errorMessage: '',
      userID: null,
      loading: false,
    };
  },
  computed: {
    checkedItems(): CheckboxItem[]{
      return this.checkboxItems
    },
    filteredCheckboxItems(): CheckboxItem[] {
      const searchQuery = this.searchQuery.toLowerCase();
      return this.checkboxItems.filter((item: CheckboxItem) =>
          item.restaurantNaam.toLowerCase().includes(searchQuery)
      );
    },
    ...mapGetters(['isLoggedIn', 'getUserID', 'userName', 'userEmail']),
  },
  methods: {
    handleCheckboxItemsUpdate() {

    },
    async fetchAllRestaurants() {
      try {
        const data = await get(`${baseURL}/restaurant/allerestaurants`);
        if (data.error) {
          this.errorMessage = "Er ging iets mis bij het ophalen van de restaurants. Probeer het later opnieuw.";
          return;
        }
        this.checkboxItems = data.map((item: any) => ({
          restaurantId: item.restaurantId,
          restaurantNaam: item.restaurantNaam,
          postcode: item.postcode,
          straatnaam: item.straatnaam,
          huisnummer: item.huisnummer,
          link: item.link,
          foto: item.foto,
          voorkeuren: item.voorkeuren,
          restricties: item.restricties,
        }));
        console.log(this.checkboxItems)
      } catch (error) {
        this.errorMessage = "Er ging iets mis bij het ophalen van de restaurants. Probeer het later opnieuw.";
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
    await this.fetchAllRestaurants();
  },
})
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
