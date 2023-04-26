<script lang="ts">
import AppButton from '@/components/Button.vue'
import GlassTile from '@/components/GlassTile.vue'
import Notificatie from '@/components/Notificatie.vue'

export default ({
  components: {
    AppButton,
    GlassTile,
    Notificatie
  },
  methods: {
    gotoGroep () {
        this.$router.push("/groep")
    },
    gotoVoorkeuren () {
        this.$router.push("/voorkeur")
    }
  }  


})

</script>

<template>
  <!-- <div class="center">
      <Notificatie label="Notificatie, cool!" iconLeft="src\assets\warning 1.png" class="notificatie"></Notificatie>
    </div> -->
  <div class="center">

    <GlassTile class="glass">
      <span class="title">
        <h1 class="h1text">Samen eten</h1>
        <h1 class="blueText">?</h1>
      </span>
      <AppButton label="Selecteer groep" @click="gotoGroep" iconRight="src\assets\right-arrow.png" class="button"></AppButton>
    </GlassTile>

    <GlassTile class="glass">
      <span class="title">
        <h1 class="h1text">Voorkeuren</h1>
        <h1 class="blueText">?</h1>
      </span>
      <AppButton label="Aanpassen" @click="gotoVoorkeuren" iconRight="src\assets\right-arrow.png" class="button"></AppButton>
    </GlassTile>

  </div>
</template>

<style>

.center{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
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

.h1text {
    color: var(--vt-c-white);
    margin: 0;
    display: inline;
    font-weight: 600;
}

.blueText {
    color: var(--vt-c-blue);
    margin: 0;
    display: inline;
    font-weight: 600;
}

.title {
  margin: 5px 50px 30px 50px;
}

.button {
  margin: 0px 50px 15px 50px;
}

.notificatie {
  display: flex;
}


/* scale down if screen is too small */
@media screen and (max-width: 500px) {

  .title {
    margin: 5px 20px 30px 20px;
  }

  .button {
    margin: 0px 20px 15px 20px;
  }

  .glass{
    padding: 0;
  }

}

@media screen and (max-width: 275px) {

  .glass{
    scale: 0.9;
  }

  .main {
    padding: 0;
  }

  .title {
    font-size: .8rem;
    margin: 5px 10px 30px 10px;
  }

  .button {
    margin: 0px 10px 15px 10px;
  }

}

@media screen and (min-width: 800px) {

  .center{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

}


</style>

