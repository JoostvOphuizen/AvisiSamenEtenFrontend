<template>
  <div class="display">
    <div class="center">
      <Description
        :title="'Placeholder Restaurant'"
        :image="'https://cdn.discordapp.com/attachments/1096361791287738490/1108039901561233428/latest.png'"
        :adres="'1234AB' + ' ' + '5' + ' ' + 'straatnaam'"
        :link="'https://confluenceoosevt.aimsites.nl/display/XUSYOU/Home'"
      ></Description>
    </div>
    <div class="center">
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
.display {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-x: auto;
}

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

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.title {
  margin: 5px 30px 10px 30px;
}

@media screen and (max-width: 400px) {
  .glass {
    width: 100%;
    overflow-x: auto;
  }

}

@media screen and (max-width: 800px) {
  .display {
    flex-direction: column;
  }

}

</style>