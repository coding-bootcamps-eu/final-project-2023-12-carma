import { defineStore } from 'pinia'

export const useUserStore = defineStore('counter', {
  state() {
    return {
      users: [
        {
          id: 1,
          pw: 'carma123',
          firstName: 'Lorenz',
          lastName: 'Kühl',
          email: 'lorenz.kuehl.coding@gmail.com',
          isLoggedIn: false
        },
        {
          id: 2,
          pw: 'carma12345',
          firstName: 'Maria',
          lastName: 'Lissel',
          email: 'maria@gmail.com',
          isLoggedIn: false
        },
        {
          id: 3,
          pw: '12345',
          firstName: 'Doro',
          lastName: 'Seitz',
          email: 'doro@gmail.com',
          isLoggedIn: true
        },
        {
          id: 4,
          pw: '54321',
          firstName: 'Christoph',
          lastName: 'Menningen',
          email: 'christoph@gmail.com',
          isLoggedIn: false
        }
      ]
    }
  },
  getters: {},
  actions: {}
})
