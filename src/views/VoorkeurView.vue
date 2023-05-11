<template>
  <div class="categorybox">
    <CheckboxList :items="voorkeurCheckboxItems" @update:items="handleCheckboxItemsUpdate" title="Voorkeuren" />
    <CheckboxList :items="voedingrestrictieCheckboxItems" @update:items="handleVoedingrestrictieCheckboxItemsUpdate" title="voedingsrestricties" />
    <AppButton label="Opslaan" @click="postUserVoorkeuren"></AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CheckboxList from '@/components/CheckboxList.vue';
import { get, post } from '@/services/apiService';
import { mapGetters } from 'vuex'
import AppButton from '@/components/Button.vue';

const baseURL = "http://localhost:8080";

interface CheckboxItem {
  label: string;
  value: boolean;
}

export default defineComponent({
  components: {
    CheckboxList,
    AppButton,
  },

  data() {
    return {
      voorkeurCheckboxItems: [] as CheckboxItem[],
      voedingrestrictieCheckboxItems: [] as CheckboxItem[],
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
        this.voorkeurCheckboxItems = data.voorkeuren.map((item: any) => ({
          label: item.naam,
          value: false,
        }));
      } catch (error) {
        // Handle error
        console.log(error);
      }
    },

    async fetchUserVoorkeuren(){
      try {
        const data = await get(`${baseURL}/gebruiker/haalvoorkeurenop?id=`+this.getUserID);
        for (let i = 0; i < this.voorkeurCheckboxItems.length; i++) {
          for (let j = 0; j < data.voorkeuren.length; j++) {
            if (this.voorkeurCheckboxItems[i].label == data.voorkeuren[j].naam) {
              this.voorkeurCheckboxItems[i].value = true;
            }
          }
        }
      } catch (error) {
        // Handle error
        console.log(error);
      }
    },

    async postUserVoorkeuren(){
      try {
        var checkedItemsWithoutValue = [];
        for (let i = 0; i < this.checkedItems.length; i++) {
          checkedItemsWithoutValue.push(this.checkedItems[i].label);
        }
        const postData = {
          voorkeuren: checkedItemsWithoutValue
        }
        const data = await post(`${baseURL}/gebruiker/slavoorkeurenop?id=${this.getUserID}`, postData);
      } catch (error) {
        // Handle error
        console.log(error);
      }
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
  },

  async mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }
    await this.fetchAllVoorkeuren();
    this.fetchUserVoorkeuren();
    await this.mockGetAllRestricties();
    this.mockGetUserRestricties();
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
</style>
