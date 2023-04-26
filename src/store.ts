import { createStore } from 'vuex'
import type { User } from '@/types'
import Cookies from 'js-cookie'

const COOKIE_NAME = 'user'
const USER_PICTURE_COOKIE_NAME = 'user_picture'

function setUserCookie(user: any) {
  Cookies.set(COOKIE_NAME, user, { expires: 7 }) // Set the user object as a cookie with a 7 day expiry
}

function getUserCookie() {
  const userCookie = Cookies.get(COOKIE_NAME);
  if (!userCookie) return null;
  const user = JSON.parse(decodeURIComponent(JSON.stringify(userCookie)))
  // convert the string to an object
  return user
}


function deleteUserCookie() {
  Cookies.remove(COOKIE_NAME) // Delete the user cookie
}

function setUserPictureCookie(picture: string) {
  Cookies.set(USER_PICTURE_COOKIE_NAME, picture, { expires: 7 }) // Set the user picture as a cookie with a 7 day expiry
}

function getUserPictureCookie() {
  const picture = Cookies.get(USER_PICTURE_COOKIE_NAME) // Get the user picture from the cookie
  return picture
}

const SESSIONID = '1234567890'
const baseURL = "http://localhost:8080";


interface State {
  user: User | null
  sessionId: string | null
}

const store = createStore<State>({
  state: {
    user: null,
    sessionId: null
  },
  mutations: {
    init(state) {
      const user = getUserCookie() 
      if (user) {
        const pictureString = getUserPictureCookie()
        state.user = { ...user, picture: pictureString }
      }
    },
    setUser(state, user: User) {
      state.user = user
    },
    setSessionId(state, sessionId: string) {
      state.sessionId = sessionId
    },
    clearSessionId(state) {
      state.sessionId = null
    }
  },
  actions: {
    async login({ commit }, { email, naam, picture }: { email: string, naam: string, picture: string }) {
      const user = { email, naam, picture }
      commit('setUser', user)
      commit('setSessionId', SESSIONID)
      setUserCookie(user)
      setUserPictureCookie(picture)
      // try {
      //   const res = await fetch(`${baseURL}/login?email=`+email+`naam=`+naam, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-access-token": "token-value"
      //     },
      //   });

      //   if (!res.ok) {
      //     console.log('error ')

      //     const message = `An error has occured: ${res.status} - ${res.statusText}`;
      //     throw new Error(message);
      //   }
      //   const data = await res.json();

      //   const result = {
      //     status: res.status + "-" + res.statusText,
      //     headers: {
      //       "Content-Type": res.headers.get("Content-Type"),
      //       "Content-Length": res.headers.get("Content-Length"),
      //     },
      //     data: data,
      //   };
      // } catch (err) {
      // }
    },
    async signup({ commit }, { name, email, password }: { name: string, email: string, password: string }) {
        console.log('signup')
    },
    async logout({ commit }) {
      // Clear user and session ID from state and cookie
      commit('setUser', null)
      commit('clearSessionId')
      deleteUserCookie()
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.user !== null
    },
    userPicture(state) {
      return state.user?.picture || null
    },
    userName(state) {
      return state.user?.name || null
    }
  }
})

store.commit('init')


export default store



