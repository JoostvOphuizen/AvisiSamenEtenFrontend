import { createStore } from 'vuex'
import type { User } from '@/types'


interface State {
  user: User | null
}

const store = createStore<State>({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user
    }
  },
  actions: {
    async login({ commit }, { email, password, picture }: { email: string, password: string, picture: string }) {
      const user = { email, password, picture } // create a new user object with the picture attribute
      commit('setUser', user) // commit the user object to the store
      console.log('login', email, password)
    },
    async signup({ commit }, { name, email, password }: { name: string, email: string, password: string }) {
        console.log('signup')
    },
    async logout({ commit }) {
        console.log('logout')
    }
  },
  getters: {
    isLoggedIn(state) {
      return /*state.user !== null*/ false
    }
  }
})

export default store
