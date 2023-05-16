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
    if (!this.restaurantData) {
      this.$router.push('/')
    }

  },
}

</script>

<template>
  <div class="center">
    <Description
      v-if="restaurantData"
      :description="restaurantData.postcode"
      :title="restaurantData.naam"
      :image="restaurantData.foto"
      :adres="restaurantData.postcode + ' ' + restaurantData.huisnummer + ' ' + restaurantData.straatnaam"
      :link="restaurantData.link"
    ></Description>
  </div>
</template>