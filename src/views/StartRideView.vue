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
  <div>
    <p>Von</p>
    <p>{{ eventStart }}</p>
    <p>Bis</p>
    <p>{{ eventEnd }}</p>
    <p>Du fährst mit</p>
    <p>{{ eventParticipants }}</p>
    <p>{{ eventNote }}</p>
  </div>
  <!--Evt einen ABBRECHEN-Button hinzufügen?-->
  <div><button>ABBRECHEN</button><button>FAHRT BEENDEN</button></div>
</template>

<script>
export default {}
</script>

<style scoped></style>
