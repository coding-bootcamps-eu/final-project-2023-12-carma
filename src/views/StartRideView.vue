<template>
  <!--Überschrift ist die eventDescription-->
  <div>
    <h1>{{ eventDescription }}</h1>
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

  <button class="btn-main-long">
    FAHRT BEENDEN
    <div class="btn-main-long-mini-bus"></div>
  </button>
</template>

<script>
export default {}
</script>

<style scoped></style>
