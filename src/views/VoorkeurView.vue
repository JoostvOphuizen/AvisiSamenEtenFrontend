<script lang="ts">
import VoorkeurenLijst from '@/components/VoorkeurenLijst.vue'
import { mapActions, mapGetters } from 'vuex'
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'

export default {
  data() {
    return {
      searchQuery: '',
    }
  },
  components: {
    VoorkeurenLijst,
    SearchBar
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    performSearch(searchTerm: string) {
      this.searchQuery = searchTerm
    }
  }
}
</script>

<template>
  <div class="categorybox">
    <!-- <SearchBar @search="performSearch" /> -->
    <VoorkeurenLijst v-if="isLoggedIn" />
  </div>
</template>

<style scoped>

/* fills screen */
.categorybox {
  width: 100%;
  height: 100%;
}

</style>
