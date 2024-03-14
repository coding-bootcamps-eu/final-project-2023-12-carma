<template>
  <section>
    <div class="bg-pre-bus-small">
      <button>
        <RouterLink to="/"><i class="fa-solid fa-circle-chevron-left"></i></RouterLink>
      </button>
      <h1>Willkommen zurück</h1>
      <form @submit.prevent="login">
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
            minlength="2"
            required
            placeholder="Passwort"
            class="input-pre"
          />
          <div class="btn-container">
            <button type="submit" class="btn-pre-large">log in</button>
          </div>
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
      email: '',
      password: ''
    }
  },
  setup() {
    const userStore = useUserStore()

    return {
      userStore
    }
  },
  methods: {
    login() {
      const userStore = useUserStore()
      userStore.login(this.email, this.password)
      this.$router.push('/home')
    }
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
