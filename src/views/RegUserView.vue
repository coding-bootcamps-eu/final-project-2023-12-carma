<!-- cm-->

<template>
  <div class="bg-pre-bus-small">
    <button><RouterLink to="/"></RouterLink></button>
    <h1>Stell dich vor!</h1>
    <form @submit.prevent="regNewUser">
      <input type="email" v-model="email" placeholder="E-Mail Adresse" required class="input-pre" />
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
      /><button type="submit" class="btn-pre-small">Registrieren</button>
      <!-- <button type="submit" name="weiter" @click="goToJoin" class="btn-pre-small">
        Auto-Gruppe beitreten
      </button> -->
    </form>
    <div class="input-container"></div>
  </div>
</template>
<!---->
<script>
export default {
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
        .then((responseData) => {
          console.log('Data posted successfully:', responseData)
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

<style scoped></style>
