<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="wrapper">
    <header class="header">
    <RouterLink to="/" class="link">
      <img alt="Logo Samen Eten" class="logo" src="@/assets/AvisiSamenEtenLogo.svg" />
    </RouterLink>
    </header>
    <main class="main">

    <RouterView />


  </main>

  <footer class="footer">
    <RouterLink to="/" class="link">
      <img src="@/assets/AvisiSamenEtenLogo.svg" alt="Logo" class="footer-logo" />
    </RouterLink>
    </footer>
  </div>
</template>

<style scoped>

.link {
  text-decoration: none;

}
.link:hover {
  background-color: #ffffff00;
}

</style>