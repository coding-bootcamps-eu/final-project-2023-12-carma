<!-- cm-->

<template>
  <div class="bg-pre-bus-small">
    <button><RouterLink to="/"></RouterLink></button>
    <h1>Stell dich vor!</h1>
    <form>
      <input type="email" name="email" placeholder="E-Mail Adresse" required class="input-pre" />
      <input
        type="password"
        name="password"
        placeholder="Passwort"
        minlength="8"
        required
        class="input-pre"
      />
      <input
        type="password"
        name="passwordConfirm"
        placeholder="Passwort bestätigen"
        required
        class="input-pre"
      />
      <input
        type="text"
        name="firstname"
        placeholder="Vorname"
        maxlength="14"
        style="text-transform: capitalize"
        required
        class="input-pre"
      />
      <input
        type="text"
        name="lastname"
        placeholder="Nachname"
        style="text-transform: capitalize"
        required
        class="input-pre"
      />
    </form>
    <div class="input-container">
      <button>
        <router-link to="/register/car" class="btn-pre-small">Auto-Gruppe erstellen</router-link>
      </button>
      <button>
        <router-link to="/join" class="btn-pre-small">Auto-Gruppe beitreten</router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
