<template>
  <div class="categorybox">
    <CheckboxList :items="checkboxItems" @update:items="handleCheckboxItemsUpdate" />
    <div>
      Updated items:
      <ul>
        <li v-for="(item, index) in checkedItems" :key="index">{{ item.label }}</li>
      </ul>
    </div>
  </div>
  <AppButton label="Opslaan" @click="postUserVoorkeuren"></AppButton>
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
      checkboxItems: [] as CheckboxItem[], // Empty array to be populated with fetched data
    }
  },
  computed: {
    checkedItems(): CheckboxItem[] {
      return this.checkboxItems.filter((item: CheckboxItem) => item.value);
    },
    ...mapGetters(['isLoggedIn', 'getUserID']),
  },
  methods: {
    handleCheckboxItemsUpdate(updatedItems: CheckboxItem[]) { 
      this.checkboxItems = updatedItems;
    },
    async fetchAllVoorkeuren() {
      try {
        const data = await get(`${baseURL}/voorkeuren`);
        this.checkboxItems = data.voorkeuren.map((item: any) => ({
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
        for (let i = 0; i < this.checkboxItems.length; i++) {
          for (let j = 0; j < data.voorkeuren.length; j++) {
            if (this.checkboxItems[i].label == data.voorkeuren[j].naam) {
              this.checkboxItems[i].value = true;
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
        console.log(data);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    }
  },
  async mounted() {
    await this.fetchAllVoorkeuren();
    this.fetchUserVoorkeuren();
  },
});
</script>

<style scoped>
/* fills screen */
.categorybox {
  width: 100%;
  height: 100%;
}
</style>
