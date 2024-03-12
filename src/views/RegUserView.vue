<!-- cm-->

<template>
  <button><RouterLink to="/"></RouterLink></button>
  <h1>Stell dich vor!</h1>
  <form>
    <input type="email" name="email" placeholder="E-Mail Adresse" required />
    <input type="password" name="password" placeholder="Passwort" minlength="8" required />
    //Länge und Vorgaben des Passworts
    <input type="password" name="passwordConfirm" placeholder="Passwort bestätigen" required />
    <input
      type="text"
      name="firstname"
      placeholder="Vorname"
      maxlength="14"
      style="text-transform: capitalize"
      required
    />
    <input
      type="text"
      name="lastname"
      placeholder="Nachname"
      style="text-transform: capitalize"
      required
    />
  </form>
  <button><router-link to="/register/car">Auto-Gruppe erstellen</router-link></button>
  <button><router-link to="/join">Auto-Gruppe beitreten</router-link></button>
</template>

<script>
export default {}
</script>

<style scoped></style>
