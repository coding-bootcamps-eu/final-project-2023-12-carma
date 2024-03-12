<!--Menü-Platzhalter, main, carma entfernt, required zugefügt cm-->
<template>
  <button><RouterLink to="/register">back</RouterLink></button>
  <h1>Gruppe beitreten</h1>
  <form>
    <input type="text" name="autoname" placeholder="Autoname" required />
    <input type="text" name="autokennzeichen" placeholder="Autokennzeichen" required />
  </form>
  <button><router-link to="/home">los geht's!</router-link></button>
</template>

<script>
export default {}
</script>

<style scoped></style>
