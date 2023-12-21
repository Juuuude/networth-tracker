import { defineStore } from 'pinia'

interface State {
  isLoggedIn: boolean,
}
const initState: State = {
  isLoggedIn: false
}

export const useAppStore = defineStore('app', {
  state: (): State => ({ ...initState }),
  getters: {
  },
  actions: {
    reset() {
      Object.assign(this, initState);
    },
    updateIsLoggedInStatus(payload: boolean) {
      this.isLoggedIn = payload
    },
  },
  persist: true
})
