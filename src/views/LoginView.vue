<script lang="ts">
import AppButton from '@/components/Button.vue'

export default ({
  components: {
    AppButton
},
  methods: {
    gotoLogin () {
      // @ts-ignore
        this.$router.push("/voorkeur")
    }
  }
})

</script>

<template>
  <div class="center">
    <h1>Login</h1>
    <AppButton label="Log in met Google" icon="src/assets/Google-modern-flat-icon.svg" @click="gotoLogin"></AppButton>
  </div>
</template>

<style>
.center{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>