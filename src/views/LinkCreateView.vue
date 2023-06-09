<template>
</template>
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { get, post } from '@/services/apiService';
  import { useRoute } from 'vue-router'
  import { mapGetters } from 'vuex'

  const baseURL = "http://localhost:8080";

  interface CheckboxItem {
    label: string;
    value: boolean;
  }

  export default defineComponent({

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
      createUitnodiging() {
        const userID = this.getUserID;
        const data = {
          uitnodigingToken: userID,
        }
        post(`${baseURL}/uitnodiging`, data)
          .then((response) => {
            var uitnodigingToken = response.uitnodigingToken;
            this.$router.push({
              name: 'link-token',
              query: { token: uitnodigingToken },
              path: `/link`,
            })
            })
          .catch((error) => {
            console.log(error);
            this.errorMessage = error.message;
          })
      },
    },

    async mounted() {
        this.createUitnodiging();
    },
  });
  </script>
