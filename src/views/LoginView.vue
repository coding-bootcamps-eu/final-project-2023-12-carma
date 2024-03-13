<!--button zurück angepasst, email statt benutzer:in, main, carma platzhalter entfernt, required zugefügt cm-->

<template>
  <button><RouterLink to="/"></RouterLink></button>
  <h1>Willkommen zurück</h1>
  <form @submit.prevent="login">
    <input type="email" v-model="email" placeholder="E-Mail Adresse" required />
    <!--Frage: Brauchen wir ein Label oder "reicht" ein placeholder?-->
    <input type="password" v-model="password" minlength="2" required placeholder="Passwort" />
    <!--Frage: Brauchen wir ein Label oder "reicht" ein placeholder?-->
    <button type="submit">Log in</button
    ><!--<RouterLink to="/home">Log in</RouterLink>-->
  </form>
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

<style scoped></style>

<!--Next Steps:
Einbinden Hintergrund Bild
Custom Styles (Schrift, Farben, Buttons)
Ausprobieren, ob die Links richtig funktionieren
Wie kommen die Daten in die Datenbank? (siehe "action" und "method" Attribut von html input tags)
-->
