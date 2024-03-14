<template>
  <section>
    <div class="bg-pre-bus-small">
      <!--wo soll man durch den zurück-Button hinkommen? Auf home, oder? cm -->
      <!--<button>
        <RouterLink to="/home"><i class="fa-solid fa-circle-chevron-left"></i></RouterLink>
      </button>-->
      <h1>Willkommen bei <br /><span class="carma-h1">carma</span>!</h1>
      <form>
        <div class="btn-container">
          <button>
            <router-link to="/register/car" class="btn-pre-small"
              >Auto-Gruppe erstellen</router-link
            >
          </button>
          <button>
            <router-link to="/join" class="btn-pre-small">Auto-Gruppe beitreten</router-link>
          </button>
        </div>
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

.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: absolute;
  bottom: 3.5rem;
}
</style>
