<script lang="ts">

import {mapGetters} from "vuex";
import GlassTile from "@/components/GlassTile.vue";
import Description from "@/components/Description.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import {get} from "@/services/apiService";
import store from "@/store";

const baseURL = "http://localhost:8080";
export default{
  components: {
    Description,
    GlassTile,
  },
  data(){
    return {
      id: null,
      naam: null,
      foto: null,
      postcode: null,
      huisnummer: null,
      straatnaam: null,
      link: null,
      restricties: [],
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  props: ['restaurant_id'],
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }
    this.getRestaurantData()
  },
  methods: {
    hideMessage() {
      this.$emit('update:message', '');
    },
    async getRestaurantData() {
      const restaurantId = this.$router.currentRoute._value.params.id
      const restaurant = await get(`${baseURL}/restaurant/getrestaurant?id=${this.restaurant_id}`);
      this.restricties = restaurant.restricties.restricties
      this.id = restaurantId
      this.naam = restaurant.restaurantNaam
      this.foto = restaurant.foto
      this.postcode = restaurant.postcode
      this.huisnummer = restaurant.huisnummer
      this.straatnaam = restaurant.straatnaam
      this.link = restaurant.link
      this.id = this.restaurant_id
    },
  },
}

</script>

<template>
  <div class="center">
    <Description
        v-if="this.id"
        :description="this.postcode"
        :title="this.naam"
        :image="this.foto || 'https://cdn.discordapp.com/attachments/1096361791287738490/1108039901561233428/latest.png'"
        :adres="this.postcode + ' ' + this.huisnummer + ' ' + this.straatnaam"
        :link="this.link"
    ></Description>
    <GlassTile v-if="this.restricties[0]">
      <div class="flexbox">
        <h3 class="Title">Let op! mogelijke voedingsrestricties aanwezig.</h3>
        <p v-for="Items in this.restricties" class="restrictie">{{Items.naam}}</p>
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