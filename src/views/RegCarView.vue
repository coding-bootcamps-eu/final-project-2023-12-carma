<template>
  <section>
    <div class="bg-pre-bus-small">
      <button>
        <RouterLink to="/"><i class="fa-solid fa-circle-chevron-left"></i></RouterLink>
      </button>
      <button><RouterLink to="/register">back</RouterLink></button>
      <h1>Stell dein Auto vor!</h1>
      <form @submit.prevent="regNewCar">
        <input type="text" v-model="name" placeholder="Gib deinem Auto einen Namen" required />
        <input
          type="text"
          v-model="licensePlate"
          placeholder="Autokennzeichen"
          maxlength="11"
          required
        />
        <input type="number" v-model="kilometer" placeholder="Aktueller Tachostand" required />
        <button type="submit" class="btn-pre-large">los geht's!</button>
      </form>
    </div>
  </section>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      name: '',
      licensePlate: '',
      kilometer: ''
    }
  },
  setup() {
    const userStore = useUserStore()

    return {
      userStore
    }
  },
  methods: {
    regNewCar() {
      const newCar = {
        name: this.name,
        kilometer: this.firstName,
        licensePlate: this.licensePlate,
        participants: [this.userStore.loggedInUser.id]
      }
      fetch('http://localhost:4000/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((responseData) => {
          console.log('Data posted successfully:', responseData)
        })
        .catch((error) => {
          console.error('Error posting data:', error)
        })
      return this.$router.push('/home')
    }
    // goToRegCar() {
    //   this.$router.push('/register/car')
    // },
    // goToJoin() {
    //   this.$router.push('/join')
    // }
  }
}
</script>

<style scoped></style>
