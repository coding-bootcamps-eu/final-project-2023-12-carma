<template>
  <section>
    <div class="bg-pre-bus-small">
      <button>
        <RouterLink to="/"><i class="fa-solid fa-circle-chevron-left"></i></RouterLink>
      </button>
      <button><RouterLink to="/register">back</RouterLink></button>
      <h1>Stell dein Auto vor!</h1>
      <form>
        <input type="text" name="autoname" placeholder="Gib deinem Auto einen Namen" required />
        <input
          type="text"
          name="autokennzeichen"
          placeholder="Autokennzeichen"
          maxlength="11"
          required
        />
        <input type="number" name="tachostand" placeholder="Aktueller Tachostand" required />
      </form>
      <button><router-link to="/home">los geht's!</router-link></button>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped></style>
