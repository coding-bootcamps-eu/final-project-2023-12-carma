<!-- cm-->

<template>
  <div class="bg-pre-bus-small">
    <button>
      <RouterLink to="/"><i class="fa-solid fa-circle-chevron-left"></i></RouterLink>
    </button>
    <h1>Stell dich vor!</h1>
    <form @submit.prevent="regNewUser">
      <div class="input-container">
        <input
          type="email"
          v-model="email"
          placeholder="E-Mail Adresse"
          required
          class="input-pre"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Passwort"
          minlength="5"
          required
          class="input-pre"
        />
        <input
          type="password"
          v-model="passwordConfirm"
          placeholder="Passwort bestätigen"
          required
          class="input-pre"
        />
        <input
          type="text"
          v-model="firstName"
          placeholder="Vorname"
          maxlength="14"
          style="text-transform: capitalize"
          required
          class="input-pre"
        />
        <input
          type="text"
          v-model="lastName"
          placeholder="Nachname"
          style="text-transform: capitalize"
          required
          class="input-pre"
        />
      </div>
      <div class="btn-container">
        <button type="submit" class="btn-pre-small">Registrieren</button>
      </div>
    </form>
    <div class="input-container"></div>
  </div>
</template>
<!---->
<script>
import { useUserStore } from '@/stores/user'

export default {
  setup() {
    const userStore = useUserStore()

    return {
      userStore
    }
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    regNewUser() {
      const newUser = {
        id: Date.now(),
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      }
      fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })

        .then((user) => {
          this.userStore.loggedInUser = user
        })

        .then((responseData) => {
          console.log('Data posted successfully:', responseData)
          this.$router.push('/registered')
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

.fa-solid {
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: var(--orange);
}
</style>
