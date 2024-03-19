import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state() {
    return {
      loggedInUser: null
    }
  },
  getters: {
    isLoggedIn: (state) => state.loggedInUser !== null
  },
  actions: {
    login(email, password) {
      fetch(`${import.meta.env.VITE_API_URL}/users`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          const foundUser = data.find((user) => user.email === email && user.password === password)
          if (foundUser) {
            this.loggedInUser = foundUser
          } else {
            throw new Error('Ungültige Email oder Passwort')
          }
        })
        .catch((error) => {
          console.error('Es gab ein Problem mit dem login:', error)
        })
    },
    logout() {
      this.loggedInUser = null
      console.log('Logout erfolgreich')
    }
  },
  persist: true
})
