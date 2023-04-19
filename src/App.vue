<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="wrapper">
    <header class="header">
     <img alt="Logo Samen Eten" class="logo" src="./assets/Avisi.png" />
    </header>

   <main class="main">
    <GoogleLogin />
    
  </main>

  <footer class="footer">
      <img src="src/assets/avisi.png" alt="Logo" class="footer-logo" />
    </footer>
  </div>
</template>


