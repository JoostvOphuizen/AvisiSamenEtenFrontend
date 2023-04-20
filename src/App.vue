<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="wrapper">
    <header class="header">
    <img alt="Logo Samen Eten" class="logo" src="@/assets/AvisiSamenEtenLogo.svg" />
    </header>
    <main class="main">
    
    <div>
      <nav class="nav">
        <RouterLink to="/" class="nav-item">Home</RouterLink>
        <RouterLink to="/login" class="nav-item">Login</RouterLink>
        <RouterLink to="/voorkeur" class="nav-item">Voorkeur</RouterLink>
      </nav>
    </div>


    <RouterView />


  </main>
  <footer class="footer">
      <img src="@/assets/AvisiSamenEtenLogo.svg" alt="Logo" class="footer-logo" />
    </footer>
  </div>
</template>