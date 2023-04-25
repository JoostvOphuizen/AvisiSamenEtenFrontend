<script lang="ts">
import AppButton from '@/components/Button.vue'
import { decodeCredential, googleAuthCodeLogin } from 'vue3-google-login'
import GlassTile from '@/components/GlassTile.vue'

export default ({
  components: {
    AppButton,
    GlassTile
},
  methods: {
    login (response: any) {
      googleAuthCodeLogin().then((response) => {
        console.log("Handle the response", response)
      })
    }
  },
})

</script>

<template>
  <div class="center">
    <GlassTile class="glass" >
      <h1 class="titletext">Login</h1>
      <AppButton @click="login" label="Login with Google" iconLeft="src\assets\Google-modern-flat-icon.svg"></AppButton>
    </GlassTile>
  </div>
</template>

<style scoped>

.glass {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  width: 40%;
}

.center{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.titletext {
  font-size: 30px;
  font-weight: 500;
  color: var(--vt-c-white);
  margin: 0 0 20px 0;
}

</style>