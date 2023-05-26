<template>
  <div class="center">
    <!-- <Description
      hierbinnen moet de restaurant data komen
    ></Description> -->
    <span class="title">
      <h1 class="h1text">Review</h1>
      <h1 class="blueText">.</h1>
    </span>
    <GlassTile class="glass">
      <Rating @waarde="getWaardeRating"></Rating>
      <Inputveld @search="getWaardeInput" :placeholder-name="'Geef een toelichting...'"></Inputveld>
    </GlassTile>
    <AppButton label="Verstuur" @click="verstuurReview"></AppButton>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import GlassTile from '@/components/GlassTile.vue';
import Description from '@/components/Description.vue';
import Rating from '@/components/Rating.vue';
import Inputveld from '@/components/Inputveld.vue';
import AppButton from '@/components/Button.vue';

const baseURL = "http://localhost:8080";

export default {
  data() {
    return {
      reviewText: "",
      rating: 0,
    };
  },
  components: {
    Description,
    GlassTile,
    Rating,
    Inputveld,
    AppButton,
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getRestaurantData']),
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login');
    }
  },
  methods: {
    getWaardeRating(value: number) {
      this.rating = value;
    },
    getWaardeInput(value: string) {
      this.reviewText = value;
    },
    //todo
    verstuurReview() {
      if(this.rating == 0 || this.reviewText == ""){
        alert("Vul alle velden in");
        return;
      } else {
        console.log("Verstuur Review")
        console.log("Rating:", this.rating);
        console.log("Review Text:", this.reviewText);
      }
    },
  },
};
</script>



<style scoped>
.h1text {
    color: var(--vt-c-white);
    margin: 0;
    display: inline;
    font-weight: bold;
}

.blueText {
    color: var(--vt-c-indigo);
    margin: 0;
    display: inline;
    font-weight: 600;
}
.glass {
    padding: 5px 10px 10px 10px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: fit-content;
    justify-content: space-between;
}


.flexbox {
  display: flex;
  flex-direction: column;
  align-items:  baseline;
  width: 60%;
  width: fit-content;
  overflow-x: auto;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.title {
  margin: 5px 50px 30px 50px;
}

</style>