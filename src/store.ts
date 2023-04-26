import { createStore } from 'vuex'
import type { User } from '@/types'

const baseURL = "http://localhost:8080";


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
    async login({ commit }, { email, naam, picture }: { email: string, naam: string, picture: string }) {
      const user = { email, naam, picture } // create a new user object with the picture attribute
      commit('setUser', user) // commit the user object to the store
      console.log('login', email, naam)
      try {
        const res = await fetch(`${baseURL}/login?email=`+email+`naam=`+naam, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value"
          },
        });

        if (!res.ok) {
          console.log('error ')

          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
        };
      } catch (err) {
      }
    },
    async signup({ commit }, { name, email, password }: { name: string, email: string, password: string }) {
        console.log('signup')
    },
    async logout({ commit }) {
        console.log('logout')
    },
  },
  getters: {
    isLoggedIn(state) {
      return /*state.user !== null*/ false
    }
  }
})

export default store
