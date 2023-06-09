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
    },
    link: {
      type: String,
      required: false
    },
  },
}
</script>
<style scoped>
.Flexbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  width: fit-content;
  overflow-x: auto;
}
.row {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 0px 5px 0px;
  align-items: flex-end;
  flex-direction: column;
}
.leftItem {
  display: flex;
  flex-grow: 3;
  text-align: left;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  padding-top: 5px;
}
.rightItem {
  display: flex;
  flex-grow: 3;
  text-align: right;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  padding-top: 5px;
}
.plaatje {
  max-width: 400px;
  max-height: 400px;
  overflow: hidden;
  border-radius: 10px;
}
.picto {
  width: 15px;
  filter: invert(1);
}
.blok {
  display: inline-block;
  padding-right: 5px;
  padding-left: 5px;
  color: white;
  font-size: 12px;
}
.ItemHotBar{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.Title {
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin: 0px;
  padding: 0px;
  text-align: center;
  line-height: 36px;
}

a, a:hover, a:visited, a:link, a:active
{
    text-decoration: none none none;
    background-color: transparent;
}

/* at 400 px */
@media screen and (max-width: 400px) {
  .Flexbox {
    width: 100%;
  }
  .row {
    flex-direction: column;
    align-items: center;
  }
  .rightItem {
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    padding-top: 5px;
  }
  .plaatje {
    max-width: 100%;
    max-height: 100%;
  }
  .picto {
    width: 12px;
    filter: invert(1);
  }
  .blok {
    display: inline-block;
    padding-right: 5px;
    padding-left: 5px;
    color: white;
    font-size: 10px;
  }
  .ItemHotBar{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
}

</style>
<template>
  <div class="Flexbox">
    <h1 class="Title">{{ title }}</h1>
    <GlassTile class="row">
      <div class="row">
        <a :href="link" class="hyperlink">
          <div class="image">
            <img class="plaatje" alt="restaurant" :src="image"/>
          </div>
        </a>
        <div class="ItemHotBar">
          <span class="leftItem">
            <img class="picto" alt="restaurant" src="src/assets/link.png"/>
            <a class="blok" :href="link">{{ title }}</a>
          </span>
          <span class="rightItem">
            <img class="picto" alt="restaurant" src="src/assets/location.png"/>
            <p class="blok">{{ adres }}</p>
          </span>
        </div>
      </div>
    </GlassTile>
  </div>
</template>
