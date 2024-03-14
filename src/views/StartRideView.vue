<template>
  <div class="app-container-small">
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
  </div>
  <div class="btn-container">
    <button class="btn-main-long">
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
      ]
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
</style>
