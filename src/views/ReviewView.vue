<template>
  <div class="display">
    <div class="center">
      <Description
        :title="restaurant.naam"
        :image="restaurant.foto"
        :adres="restaurant.postcode + ' ' + restaurant.huisnummer + ' ' + restaurant.straatnaam"
        :link="restaurant.link"
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
  import { get, post} from '@/services/apiService';

  const baseURL = "http://localhost:8080";

  interface Restaurant {
      naam: string;
      postcode: string;
      huisnummer: number;
      straatnaam: string;
      link: string;
      foto?: string;
  }

  interface ReviewDTO {
    gebruikerToken: string;
    score: number;
    tekst: string;
  }

  export default {
    data() {
      return {
        reviewText: "",
        rating: 0,
        restaurant: {} as Restaurant,
        form: {} as ReviewDTO,
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
      ...mapGetters(['isLoggedIn', 'getUserID']),
    },
    props: ['id'],
    mounted() {
      if (!this.isLoggedIn) {
        this.$router.push('/login');
      }
      if (this.id == null){
        this.$router.push('/login');
      }
      this.getRestaurantData();
    },
    methods: {
      getWaardeRating(value: number) {
        this.rating = value;
      },
      getWaardeInput(value: string) {
        this.reviewText = value;
      },
      async getRestaurantData() {
        try {
          const data = await get(`${baseURL}/restaurant/getrestaurantbaseinfo?id=${this.id}`);
          if(data != null){
            this.restaurant.naam = data.restaurantNaam;
            this.restaurant.postcode = data.postcode;
            this.restaurant.huisnummer = data.huisnummer;
            this.restaurant.straatnaam = data.straatnaam;
            this.restaurant.link = data.link;
            this.restaurant.foto = data.foto || 'https://cdn.discordapp.com/attachments/1096361791287738490/1108039901561233428/latest.png';
          }

          if (data.error) {
            console.log(data.error);
            return;
          }

        } catch (error) {
          console.log(error);
        }
      },
      //todo
      async verstuurReview() {
        if(this.rating == 0 || this.reviewText == ""){
          alert("Vul alle velden in");
          return;
        } else {
          this.form.gebruikerToken = this.getUserID;
          this.form.score = this.rating;
          this.form.tekst = this.reviewText;
          const data = await post(`${baseURL}/restaurant/review?id=${this.id}`,this.form);
          if(data != null){
            this.$router.push('/');
          }
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