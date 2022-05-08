import { reactive } from 'vue'

const userInititalState = {
  currentUser: {}
}

let state = reactive(userInititalState)

export default state

export function resetUserStore () {
  state = reactive(userInititalState)
}

export function cleanCurrentUser () {
  state.currentUser = {}
}

export function setCurrentUser (user) {
  state.currentUser = user
}

export function setApiKey (apiKey) {
  const currentUser = {
    ...state.currentUser,
    apiKey
  }
  state.currentUser = currentUser
}
