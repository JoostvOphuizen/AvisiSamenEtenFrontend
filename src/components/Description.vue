<script lang="ts">
import GlassTile from "@/components/GlassTile.vue";

export default {
  name: 'Description',
  components: {GlassTile},
  props: {
    title: {
      type: String,
      required: true,
    },
    telefoonnummer: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    },
    adres: {
      type: String,
      required: false
    }
  },
}
</script>
<style scoped>
.Flexbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  overflow-x: auto;
}
.row {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  align-items: flex-end;
}
.leftItem {
  flex-grow: 3;
  text-align: left;
}
.rightItem {
  flex-grow: 3;
  text-align: right;
}
.plaatje {
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  flex-wrap: wrap;
  align-items: stretch;
}
.picto {
  width: 15px;
  filter: invert(1);
}
.blok {
  display: inline-block;
}
</style>
<template>
  <div class="Flexbox">
  <h1>{{title}}</h1>
  <GlassTile class="row">
    <div class="row">
      <img class="plaatje" alt="restaurant" :src="this.image"/>
      <span class="leftItem">
        <img class="picto" alt="restaurant" src="src/assets/telephone.png"/>
        <p class="blok">{{telefoonnummer}}</p>
      </span>
      <span class="rightItem">
        <p class="blok">{{adres}}</p>
        <img class="picto" alt="restaurant" src="src/assets/location.png"/>
      </span>
    </div>
  </GlassTile>
  </div>
</template>