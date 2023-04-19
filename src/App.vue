<script setup lang="ts">
import AppButton from '@/components/Button.vue'
</script>

<template>
  <div class="wrapper">
    <header class="header">
     <img alt="Logo Samen Eten" class="logo" src="./assets/AvisiSamenEtenLogo.svg" />
    </header>

   <main class="main">
    <AppButton label="Inloggen met Google" icon="src/assets/Google-modern-flat-icon.svg"></AppButton>

    <GoogleLogin />
    
  </main>

  <footer class="footer">
      <img src="src/assets/AvisiSamenEtenLogo.svg" alt="Logo" class="footer-logo" />
    </footer>
  </div>
</template>


