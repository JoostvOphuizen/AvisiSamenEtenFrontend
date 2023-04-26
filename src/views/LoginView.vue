<script lang="ts">
import AppButton from '@/components/Button.vue'
import { decodeCredential, googleAuthCodeLogin, GoogleLogin } from 'vue3-google-login'
import GlassTile from '@/components/GlassTile.vue'
import type { CallbackTypes } from 'vue3-google-login'
import { mapActions } from 'vuex';
import store from '@/store'


export default ({
  components: {
    AppButton,
    GlassTile,

  },
  methods: {
    login (response: any) {

      const userData = decodeCredential(response.credential)
      console.log("Handle the userData", userData)
      var naam = userData.name
      var email = userData.email
      store.dispatch('login',{email,naam})
  }
  }
})


</script>

<template>
  <div class="center">
    <GlassTile class="glass" >
      <h1 class="titletext">Login</h1>
      <GoogleLogin :callback="login"/>
      <!-- <AppButton @click="login" label="Login with Google" iconLeft="src\assets\Google-modern-flat-icon.svg" class="button"></AppButton> -->
    </GlassTile>
  </div>
</template>

<style scoped>

.glass {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-width: 200px;
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

.button {
  margin: 20;
  width: 100%;
  min-width: 180px;
  overflow: hidden;
  white-space: nowrap;
}

/* media queries */
@media screen and (max-width: 350px) {
  .glass {
    width: 100%;
  }
}

</style>