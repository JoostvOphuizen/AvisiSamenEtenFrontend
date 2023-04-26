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

function setUserIDCookie(id: string) {
  Cookies.set('user_id', id, { expires: 7 }) // Set the user picture as a cookie with a 7 day expiry
}

function getUserIDCookie() {
  const id = Cookies.get('user_id') // Get the user picture from the cookie
  return id
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
        const id = getUserIDCookie()
        state.user = { ...user, picture: pictureString, id: id }
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
    },
    setUserID(state, id: number) {
      state.user!.id = id
    }
  },
  actions: {
    async login({ commit }, { email, naam, picture }: { email: string, naam: string, picture: string }) {
      const user = { email, naam, picture }
      commit('setUser', user)
      commit('setSessionId', SESSIONID)
      setUserCookie(user)
      setUserPictureCookie(picture)

      const loginDTO = { naam, email }

      try {
        const responds = await fetch(`${baseURL}/gebruiker/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value"
          },
          body: JSON.stringify(loginDTO),
        });

        if (!responds.ok) {
          console.log('error ')

          const message = `An error has occured: ${responds.status} - ${responds.statusText}`;
          throw new Error(message);
        }
        const data = await responds.json();

        const result = {
          status: responds.status + "-" + responds.statusText,
          headers: {
            "Content-Type": responds.headers.get("Content-Type"),
            "Content-Length": responds.headers.get("Content-Length"),
          },
          data: data,
        };

        console.log(result);

        commit('setUserID', data.id)
        setUserIDCookie(result.data.id)

      } catch (err) {
      }
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
    },
    userEmail(state) {
      return state.user?.email || null
    },
    getUserID(state) {
      return state.user?.id || null
    }
  }
})

store.commit('init')


export default store



