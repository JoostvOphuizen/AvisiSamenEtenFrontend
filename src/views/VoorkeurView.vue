<script lang="ts">
import VoorkeurenLijst from '@/components/VoorkeurenLijst.vue'
import { mapGetters } from 'vuex'
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    VoorkeurenLijst
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }
  }
}
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
