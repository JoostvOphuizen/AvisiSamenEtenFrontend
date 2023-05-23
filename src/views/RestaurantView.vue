<script lang="ts">

import {mapGetters} from "vuex";
import GlassTile from "@/components/GlassTile.vue";
import Description from "@/components/Description.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

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
  methods: {
    hideMessage() {
      this.$emit('update:message', '');
    },
  },
}

</script>

<template>
  <div class="center">
    <Description
      v-if="restaurantData"
      :description="restaurantData.postcode"
      :title="restaurantData.naam"
      :image="restaurantData.foto || 'https://cdn.discordapp.com/attachments/1096361791287738490/1108039901561233428/latest.png'"
      :adres="restaurantData.postcode + ' ' + restaurantData.huisnummer + ' ' + restaurantData.straatnaam"
      :link="restaurantData.link"
    ></Description>
    <GlassTile v-if="restaurantData.VoedingsRestricties[0]">
      <div class="flexbox">
        <h3 class="Title">Let op! mogelijke voedingsrestricties aanwezig.</h3>
        <p v-for="Items in restaurantData.VoedingsRestricties" class="restrictie">{{Items.naam}}</p>
      </div>
    </GlassTile>
  </div>
</template>

<style scoped>


.Title{
  font-size: 1.2em;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
  color: #ffffff;
  text-align: center;
}

.flexbox {
  display: flex;
  flex-direction: column;
  align-items:  baseline;
  width: 60%;
  width: fit-content;
  overflow-x: auto;
}

.restrictie {
  font-size: 0.8em;
  margin: 0px;
  padding: 0px;
  color: #ffffffd2;
  text-align: center;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

</style>