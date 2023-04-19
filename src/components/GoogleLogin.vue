<script lang="ts">
import { googleAuthCodeLogin } from "vue3-google-login"
const login = () => {
  googleAuthCodeLogin().then((response) => {
    console.log("Handle the response", response)
  })
}
</script>

<template>
  <button @click="login">Login Using Google</button>
</template>
