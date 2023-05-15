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
    ...mapGetters(['isLoggedIn']),
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }
  }
}

</script>

<template>
  <div class="center">
      <Description description="
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
" title="Placeholder Restaurant" image="src/assets/AvisiSamenEtenLogo.svg" adres="Koningstraat 50, 6811 DH Arnhem" telefoonnummer="026 351 8927"></Description>
  </div>

</template>