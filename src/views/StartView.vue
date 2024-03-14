<template>
  <section>
    <div class="bg-pre-bus-large">
      <h1 class="start-h1">
        <span>Ready</span> <span>for</span> <span class="carma-h1">carma</span><span>?</span>
      </h1>
      <h2 class="header-two">
        <span>ONE</span> <span>-</span> <span>TWO</span> <span>-</span> <span>YOU</span>
        <div class="orange-circle"></div>
      </h2>
      <div class="btn-container">
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
.start-h1 {
  font-family: 'Raleway', sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: var(--orange);
  text-align: center;
  margin-top: 6rem;

  text-align: center;
  transform: scale(0.94);
  animation: scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1);
}
@keyframes scale {
  100% {
    transform: scale(1);
  }
}
span {
  display: inline-block;
  opacity: 0;
  filter: blur(4px);
}
span:nth-child(1) {
  animation: fade-in 0.8s 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
}
span:nth-child(2) {
  animation: fade-in 0.8s 0.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
}
span:nth-child(3) {
  animation: fade-in 0.8s 0.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
}
span:nth-child(4) {
  animation: fade-in 0.8s 0.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
}
span:nth-child(5) {
  animation: fade-in 0.8s 0.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
}
@keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

.header-two {
  position: relative;
  top: -4%;
}

.orange-circle {
  background-image: url('./public/kreis_sonne.png');
  width: 50px;
  height: 50px;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: -0.6rem;
  left: 61%;
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

.carma-h1 {
  color: var(--blue);
}

button {
  opacity: 0;
  transition: opacity 1s ease;
  animation: fadeIn 2s ease forwards;
  animation-delay: 1s; /* Verzögerung von 1 Sekunde */
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
