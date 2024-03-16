<template>
  <div>
    <h1 class="h1-event">{{ eventDescription }}</h1>
  </div>

  <!--Anzeige des EventType mit Zusatzspruch, "Aber ist gut fürs Carma" oder
  "voraus!", evt mit v-if oder v-show?-->
  <div>
    <p>{{ eventType }}</p>
    <p>{{ eventTypeP }}</p>
  </div>
  <!--Als Block dargestellte Infos über das Event, Start und Ende, wer sind 
      die MitfahrerInnen(in der Darstellung als MitfahrerInnen-Icon) und evt
    ein Kommentar zur Fahrt als eventNote-->
  <div class="ride-info-block">
    <p>Von</p>
    <p>{{ eventStart }}</p>
    <p>Bis</p>
    <p>{{ eventEnd }}</p>
    <p>Du fährst mit</p>
    <p>{{ eventParticipants }}</p>
    <p>{{ eventNote }}</p>
  </div>
  <form v-if="isRideFinished" class="endride">
    <div class="popup">
      <p class="text1">Deine Fahrt ist zu Ende!</p>
      <p class="text2">Bis zum nächsten Mal</p>
      <br /><br />
      <input class="input-main" type="text" placeholder="Aktueller Tachostand *" required />
      <input class="input-main" type="text" placeholder="Hinterlasse eine Notiz" />
      <div>
        <button><i class="fa-regular fa-circle-check"></i></button>
      </div>
    </div>
  </form>
  <div class="btn-container">
    <button @click="isRideFinished = true" class="btn-main-long">
      FAHRT BEENDEN
      <div class="btn-main-long-mini-bus"></div>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventDescription: 'Fahrt zum Meer',
      eventTypeP: 'voraus!',
      eventStart: '',
      eventEnd: '',
      eventNote: '',
      selectedParticipants: [],
      drivers: [
        { id: 1, firstName: 'Maria' },
        { id: 2, firstName: 'Doro' },
        { id: 3, firstName: 'Christoph' },
        { id: 4, firstName: 'Lorenz' }
      ],
      isRideFinished: false
    }
  },
  methods: {
    submitForm() {},
    cancel() {}
  }
}
</script>

<style scoped>
.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: absolute;
  bottom: 6rem;
}

.popup {
  background-color: var(--green-dark);
  text-align: center;
  width: 25rem;
  height: 20rem;
  position: absolute;
  left: 1rem;
  top: 20rem;
}
.endride {
  position: absolute; /* Sit on top of the page content */
  /*display: none; /* Hidden by default */
  width: 428px;
  height: 926px;
  margin: auto;
  margin-top: 0.9rem;
  top: -4.4rem;
  left: -1.85rem;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}
.text1 {
  color: var(--beige-light);
  font-size: 1.5rem;
  margin-top: 2rem;
}

.text2 {
  color: var(--beige-light);
}

.fa-regular {
  color: var(--beige-light);
  margin-top: 1.5rem;
}
</style>
