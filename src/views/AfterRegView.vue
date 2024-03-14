<template>
  <section>
    <div class="bg-pre-bus-small">
      <!--wo soll man durch den zurück-Button hinkommen? Auf home, oder? cm -->
      <!--<button>
        <RouterLink to="/home"><i class="fa-solid fa-circle-chevron-left"></i></RouterLink>
      </button>-->
      <!---carma-h1 sollte "carma" blau färben-->
      <h1 class="home-h1">Willkommen bei <span class="carma-h1">carma</span>!</h1>
      <form>
        <button>
          <router-link to="/register/car" class="btn-pre-small">Auto-Gruppe erstellen</router-link>
        </button>
        <button>
          <router-link to="/join" class="btn-pre-small">Auto-Gruppe beitreten</router-link>
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
.carma-h1 {
  color: var(--blue);
}
</style>
