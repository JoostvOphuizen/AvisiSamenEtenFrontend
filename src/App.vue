<template>
  <div class="wrapper">
    <header class="header">
      <router-link to="/" class="link">
        <img alt="Logo Samen Eten" class="logo" src="@/assets/AvisiSamenEtenLogo.svg" />
      </router-link>
      <p v-if="isLoggedIn" >{{ userName }}</p>
      <img v-if="isLoggedIn" alt="Profile icon" class="profileIcon" :src="userPicture" />
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <router-link to="/" class="link">
        <img src="@/assets/AvisiSamenEtenLogo.svg" alt="Logo" class="footer-logo" />
      </router-link>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapGetters } from 'vuex'

export default defineComponent({
  computed: {
    ...mapGetters(['isLoggedIn', 'userPicture', 'userName'])
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    return {
      route,
      router
    }
  }
})
</script>

<style scoped>
.link {
  text-decoration: none;
}
.link:hover {
  background-color: #ffffff00;
}

.logo {
  width: 150px;
  height: 150px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.profileIcon {
  width: 35px;
  height: 35px;
  margin-right: 20px;
  border-radius: 20px;
}

</style>
