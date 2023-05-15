<template>
  <div class="wrapper">
    <header class="header">
      <router-link to="/" class="link">
        <img alt="Logo Samen Eten" class="logo" src="@/assets/AvisiSamenEtenLogo.svg" />
      </router-link>
      <div class="dropdown" v-if="isLoggedIn">
        <img
          alt="Profile icon"
          class="profileIcon"
          :src="userPicture"
          @click="toggleDropdown"
          :class="{ clicked: isProfileIconClicked }"
        />

        <transition name="dropdown-fade">
          <ul class="dropdown-menu" v-if="isDropdownOpen">
            <li><button class="dropdown-button" @click="logout">Logout</button></li>
          </ul>
        </transition>
      </div>
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
import store from '@/store'
import AppButton from '@/components/Button.vue'

export default defineComponent({
  data() {
    return {
      isDropdownOpen: false,
      isProfileIconClicked: false
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'userPicture', 'userName'])
  },
  components: {
    AppButton
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    return {
      route,
      router
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      this.isProfileIconClicked = !this.isProfileIconClicked;
    },
    logout() {
      this.isDropdownOpen = false;
      store.dispatch('logout')
      this.router.push('/login')
    }
  }
})
</script>


<style scoped>
.link {
  text-decoration: none;
}

.link:hover {
  background-color: transparent;
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
  cursor: pointer;
  animation: profileIcon-animation 0.5s;
  transform-origin: center; /* Add this line to set the transform origin */
}

@keyframes profileIcon-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Add this new animation for the profile icon click */
@keyframes profileIcon-click-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #ffffff;
  transform: translateY(-10px);
  transition: all 0.3s;
  z-index: 1;
  left: 2px;
}

.dropdown-menu.fade-enter-active,
.dropdown-menu.fade-leave-active {
  transition: all 0.3s;
}

.dropdown-menu.fade-enter,
.dropdown-menu.fade-leave-to {
  opacity: 0;
  visibility: hidden;
  animation: dropdown-close-animation 0.3s; /* Add this line */
}

@keyframes dropdown-close-animation {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.dropdown-menu li {
  padding: 5px;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

.dropdown-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.dropdown-button:hover {
  text-decoration: underline;
}

.dropdown-menu {
  /* ... */
  opacity: 0;
  animation: dropdown-animation 0.5s forwards;
}

.dropdown-button {
  animation: dropdown-button-animation 0.5s forwards;
}

@keyframes dropdown-animation {
  0% {
    opacity: 0;
    transform: translateY(-20%);
  }
  70% {
    opacity: 1;
    transform: translateY(55%);
  }
  100% {
    opacity: 1;
    transform: translateY(52%);
  }
}

@keyframes dropdown-button-animation {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Apply the profile icon click animation */
.profileIcon.clicked {
  animation: profileIcon-click-animation 0.3s ease-in-out;
}

.dropdown-menu  {
  border-bottom-left-radius: 5px;
}

</style>