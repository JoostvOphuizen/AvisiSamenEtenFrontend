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
      <div class="rating">
        <input type="radio" id="star5" name="rating" value="5" />
        <label class="star" for="star5" title="Awesome" aria-hidden="true"></label>
        <input type="radio" id="star4" name="rating" value="4" />
        <label class="star" for="star4" title="Great" aria-hidden="true"></label>
        <input type="radio" id="star3" name="rating" value="3" />
        <label class="star" for="star3" title="Very good" aria-hidden="true"></label>
        <input type="radio" id="star2" name="rating" value="2" />
        <label class="star" for="star2" title="Good" aria-hidden="true"></label>
        <input type="radio" id="star1" name="rating" value="1" />
        <label class="star" for="star1" title="Bad" aria-hidden="true"></label>
      </div>
    </GlassTile>
  </div>


</template>




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
    ...mapGetters(['isLoggedIn', 'getRestaurantData'])
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    fun() {
    },
  },
}
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











.rating {
  margin-top: 40px;
  border: none;
  float: left;
}

.rating > label {
  color: #90A0A3;
  float: right;
}

.rating > label:before {
  margin: 5px;
  font-size: 2em;
  font-family: FontAwesome;
  content: "\f005";
  display: inline-block;
}

.rating > input {
  /* display: none; */
}

.rating > input:checked ~ label,
.rating:not(:checked) > label:hover,
.rating:not(:checked) > label:hover ~ label {
  color: #F79426;
}

.rating > input:checked + label:hover,
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label,
.rating > input:checked ~ label:hover ~ label {
  color: #FECE31;
}

</style>