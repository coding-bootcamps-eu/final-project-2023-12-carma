<template>
  <div>
    <!-- Überschrift -->
    <h1>Deine nächste Fahrt</h1>
  </div>
  <div>
    <!-- Text-Input für die Event-Description, später POST zur API -->
    <input
      type="text"
      name="eventDescription"
      id="event-description"
      placeholder="Name der Fahrt"
    />
  </div>
  <div>
    <!-- Datums-Input für das Event, Start und Ende, evt mit Datepicker und range, 
      später POST zur API, Format anpassen zur Darstellung in der Calendar-Component -->
    <input type="datetime" name="eventStart" id="event-start" />
    <input type="datetime" name="eventEnd" id="event-end" />
  </div>
  <div>
    <!-- MitfahrerInnen-Input für das Event, am besten dynamisch erzeugt 
        aus der Auto-Gruppe anhand der driver_id, mit Darstellung des Buchstaben-
        Icons, später POST zur API, if checked -> eventParticipants -->
    <select name="eventParticipants" id="event-participants">
      <option value="MitfahrerInnen hinzufügen"></option>
      <option value="driver_id = 1">
        <input type="checkbox" name="eventParticipants" id="driver-1" />
      </option>
      <option value="driver_id = 2">
        <input type="checkbox" name="eventParticipants" id="driver-2" />
      </option>
      <option value="driver_id = 3">
        <input type="checkbox" name="eventParticipants" id="driver-3" />
      </option>
      <option value="driver_id = 4">
        <input type="checkbox" name="eventParticipants" id="driver-4" />
      </option>
    </select>
  </div>
  <div>
    <!--Möglichkeit einen Kommentar zur Fahrt zu hinterlassen, später POST 
      zur API, eventNotes -->
    <textarea id="event-notes" name="eventNotes" rows="5" cols="33" placeholder="Kommentar">
    </textarea>
  </div>
  <div>
    <!--Auswahl des EventType, später POST zur API, eventType -->
    <input type="radio" name="eventType" id="freie-fahrt" /><span>oder</span
    ><input type="radio" name="eventType" id="muss-sein" />
  </div>
  <div>
    <!-- Evt. Button zum Abbrechen einfügen? + Submit -Button um die Fahrt zu erstellen-->
    <button>ABBRECHEN</button><button type="submit">FAHRT ERSTELLEN</button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
