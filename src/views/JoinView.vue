<!--Menü-Platzhalter, main, carma entfernt, required zugefügt cm-->
<template>
  <button><RouterLink to="/register">back</RouterLink></button>
  <h1>Gruppe beitreten</h1>
  <form>
    <input
      type="text"
      name="autokennzeichen"
      placeholder="Autokennzeichen"
      required
      class="input-pre"
    />
  </form>
  <button><router-link to="/home" class="btn-pre-large">los geht's!</router-link></button>
</template>

<script>
export default {}
</script>

<style scoped></style>
