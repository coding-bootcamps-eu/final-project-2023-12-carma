<template>
  <section>
    <div class="bg-pre-bus-large">
      <h1>Ready for <span class="carma-h1">carma</span>?</h1>
      <h2 class="header-two">ONE - TWO - YOU</h2>
      <div class="orange-circle">
        <!--<img src="kreis.png" alt="Kreis orang" class="kreis-orang" />-->
      </div>
      <div class="input-container">
        <button>
          <router-link to="/register" class="btn-pre-small">neu bei carma?</router-link>
        </button>
        <button><router-link to="/login" class="btn-pre-small">log in</router-link></button>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.header-two {
  position: relative;
}

.orange-circle {
  background-image: url('./public/kreis_sonne.png');
  width: 60px;
  height: 60px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 165px;
  left: 805px;
}

.input-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.carma-h1 {
  color: var(--blue);
}
</style>
