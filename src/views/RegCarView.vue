<template>
  <section>
    <div class="bg-pre-bus-small">
      <button>
        <RouterLink to="/"><i class="fa-solid fa-circle-chevron-left"></i></RouterLink>
      </button>
      <h1>Stell dein Auto vor!</h1>
      <form @submit.prevent="regNewCar" class="input-container">
        <input
          type="text"
          v-model="name"
          placeholder="Gib deinem Auto einen Namen"
          required
          class="input-main"
        />
        <input
          type="text"
          v-model="licensePlate"
          placeholder="Autokennzeichen"
          maxlength="11"
          required
          class="input-main"
        />
        <input
          type="number"
          v-model="kilometer"
          placeholder="Aktueller Tachostand"
          required
          class="input-main"
        />
        <div class="btn-container">
          <button type="submit" class="btn-pre-large">los geht's!</button>
        </div>
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
          this.$router.push('/home')
        })
        .catch((error) => {
          console.error('Error posting data:', error)
        })
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

<style scoped>
.fa-solid {
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: var(--orange);
}

.input-container {
  display: flex;
  flex-direction: column;

  align-items: center;
  height: 44rem;

  position: relative;
}

.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: absolute;
  bottom: 3.5rem;
}
</style>
