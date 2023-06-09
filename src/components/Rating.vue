<template>
  <div class="rating">
    <input type="radio" id="star5" name="rating" value="5" @change="handleInput" v-model="beoordeling" />
    <label class="star" for="star5" title="Awesome" aria-hidden="true"></label>
    <input type="radio" id="star4" name="rating" value="4" @change="handleInput" v-model="beoordeling" />
    <label class="star" for="star4" title="Great" aria-hidden="true"></label>
    <input type="radio" id="star3" name="rating" value="3" @change="handleInput" v-model="beoordeling" />
    <label class="star" for="star3" title="Very good" aria-hidden="true"></label>
    <input type="radio" id="star2" name="rating" value="2" @change="handleInput" v-model="beoordeling" />
    <label class="star" for="star2" title="Good" aria-hidden="true"></label>
    <input type="radio" id="star1" name="rating" value="1" @change="handleInput" v-model="beoordeling" />
    <label class="star" for="star1" title="Bad" aria-hidden="true"></label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Rating',
  data() {
    return {
      beoordeling: 0,
    };
  },
  methods: {
    handleInput() {
      this.$emit('waarde', this.beoordeling);
    },
  },
});
</script>

<style scoped>
.rating {
  border: none;
  float: left;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: space-between;
  padding: 20px;
}

.rating > label {
  filter: grayscale(100%);
}

.rating > label:before {
  display: inline-block;
  margin: 5px;
  font-size: 2em;
  content: "";
  background-image: url("src/assets/ster.png");
  background-size: cover;
  width: 40px;
  height: 40px;
}


.rating > input {
  display: none;
}

.rating > input:checked ~ label,
.rating:not(:checked) > label:hover,
.rating:not(:checked) > label:hover ~ label {
  filter: grayscale(0%);
}

.rating > input:checked + label:hover,
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label,
.rating > input:checked ~ label:hover ~ label {
  filter: brightness(1.1);
}
</style>
