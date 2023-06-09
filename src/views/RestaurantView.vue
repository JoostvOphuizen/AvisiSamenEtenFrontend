<script lang="ts">

import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import GlassTile from '@/components/GlassTile.vue';
import Description from '@/components/Description.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { get } from '@/services/apiService';
import store from '@/store';

const baseURL = 'http://localhost:8080';

interface ReviewItem {
  score: number[];
  tekst: string;
}

export default defineComponent({
  components: {
    Description,
    GlassTile,
  },
  data() {
    return {
      id: '' as string | string[],
      naam: '' as string,
      foto: '' as string,
      postcode: '' as string,
      huisnummer: null as number | null,
      straatnaam: '' as string,
      link: '' as string,
      restricties: [] as { naam: string }[],
      reviews: [] as ReviewItem[],
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  props: ['restaurant_id'],
  mounted() {
    this.getRestaurantData();
  },
  methods: {
    hideMessage() {
      this.$emit('update:message', '');
    },
    async getRestaurantData() {
      const restaurantId = this.$router.currentRoute.value.params.id;
      const restaurant = await get(`${baseURL}/restaurant/getrestaurant?id=${this.restaurant_id}`);
      this.restricties = restaurant.restricties.restricties;
      this.id = restaurantId;
      this.naam = restaurant.restaurantNaam;
      this.foto = restaurant.foto;
      this.postcode = restaurant.postcode;
      this.huisnummer = restaurant.huisnummer;
      this.straatnaam = restaurant.straatnaam;
      this.link = restaurant.link;
      this.id = this.restaurant_id;
      this.getReviews();
    },
    async getReviews() {
      const reviews = await get(`${baseURL}/restaurant/getreviews?id=${this.restaurant_id}`);
      this.reviews = reviews;
    },
  },
});

</script>

<template>
  <div class="center">
    <Description
      v-if="id"
      :description="postcode"
      :title="naam"
      :image="foto || 'https://cdn.discordapp.com/attachments/1096361791287738490/1108039901561233428/latest.png'"
      :adres="postcode + ' ' + huisnummer + ' ' + straatnaam"
      :link="link"
    ></Description>
    <GlassTile v-if="restricties[0]">
      <div class="flexbox">
        <h3 class="Title">Let op! mogelijke voedingsrestricties aanwezig.</h3>
        <p v-for="item in restricties" class="restrictie">{{ item.naam }}</p>
      </div>
    </GlassTile>
    <GlassTile class="tile center">
      <div class="flexbox center reviews">
        <h3 class="Title">Reviews</h3>
        <div class="reviews">
          <div v-for="item in reviews" class="border">
            <img v-for="scoreItem in item.score" src="src/assets/star-svgrepo-com.svg" alt="ster">
            <p class="restrictie">{{ item.tekst }}</p>
          </div>
        </div>
      </div>
    </GlassTile>
  </div>
</template>

<style scoped>
.reviews {
  text-align: center;
  width: 100% !important;
}
.border {
  border-radius: 3px;
  box-shadow: 0 2px 0 #FFFFFF40;
  width: 100%;
  margin-bottom: 5px;
}
.reviews img {
  width: 20px;
  align-self: center;
  justify-self: center;
}
.Title{
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: #ffffff;
  text-align: center;
}

.flexbox {
  display: flex;
  flex-direction: column;
  align-items:  baseline;
  width: fit-content;
  overflow-x: auto;
}

.tile {
  width: 400px;
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
}

@media screen and (max-width: 400px) {
  .tile{
    width: 100%;
  }
}

</style>