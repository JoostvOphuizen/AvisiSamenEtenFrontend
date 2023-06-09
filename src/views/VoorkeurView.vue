<script lang="ts">
import VoorkeurenLijst from '@/components/VoorkeurenLijst.vue'

export default ({
  components: {
    VoorkeurenLijst
  }
})
</script>

<template>
  <div class="categorybox">
    <VoorkeurenLijst/>
  </div>
</template>

<style scoped>

/* fills screen */
.categorybox {
  width: 100%;
  height: 100%;
}

</style>