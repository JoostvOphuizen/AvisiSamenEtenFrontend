<script lang="ts">

import {mapGetters} from "vuex";
import GlassTile from "@/components/GlassTile.vue";
import Description from "@/components/Description.vue";

export default{
  components: {
    Description,
    GlassTile,
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getRestaurantData']),
    restaurantData() {
      return this.getRestaurantData;
    },
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }

  },
}

</script>

<template>
  <div class="center">
    <Description
      v-if="restaurantData"
      :description="restaurantData.description"
      :title="restaurantData.title"
      :image="restaurantData.image"
      :adres="restaurantData.adres"
      :telefoonnummer="restaurantData.telefoonnummer"
    ></Description>
  </div>
</template>