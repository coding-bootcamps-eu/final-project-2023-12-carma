<template>
  <div class="btn-pre-small">
    <div>
      <h1>Ready for carma?</h1>
      <h2>ONE - TWO - YOU</h2>
    </div>
    <div>
      <!--<img src="kreis.png" alt="Kreis orang" class="kreis-orang" />-->
    </div>
    <button>
      <router-link to="/register" class="btn-pre-small-short">neu bei carma?</router-link>
    </button>
    <button><router-link to="/login" class="btn-pre-small-short">log in</router-link></button>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.kreis-orang {
  position: absolute; /* Absolute Positionierung für das Bild */
}
</style>
