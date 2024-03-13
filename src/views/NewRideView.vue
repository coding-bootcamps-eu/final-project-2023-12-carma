<!-- an Figma angepasst cm -->
<template>
  <div>
    <!-- Überschrift -->
    <h1 class="align">Deine <br />nächste Fahrt</h1>
  </div>
  <div class="flex-container">
    <div>
      <!-- Text-Input für die Event-Description, später POST zur API, evt noch einmal 
    auf die Darstellung der maxlength vom text-input schauen, z.B. mit popup 
    bei hovern lösen -->
      <form method="post">
        <input
          class="input-pre"
          type="text"
          name="eventDescription"
          id="event-description"
          placeholder="Name der Fahrt"
          minlength="1"
          maxlength="18"
        />
      </form>
    </div>
    <div>
      <!-- Datums-Input für das Event, Start und Ende, evt mit Datepicker und range, 
      später POST zur API, Format anpassen zur Darstellung in der Calendar-Component -->
      <form method="post">
        <input
          class="input-date"
          type="datetime-local"
          name="eventStart"
          id="event-start"
          placeholder="Von"
        />
        <input
          class="input-date"
          type="datetime-local"
          name="eventEnd"
          id="event-end"
          placeholder="Bis"
        />
      </form>
    </div>
    <div>
      <!-- MitfahrerInnen-Input für das Event, am besten dynamisch erzeugt 
        aus der Auto-Gruppe anhand der driver_id, mit Darstellung des Buchstaben-
        Icons, später POST zur API, if checked -> eventParticipants -->
      <form class="input-pre" method="post">
        <label for="event-participants">Mitfahrer*innen hinzufügen</label>
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
      </form>
    </div>
    <div>
      <!--Möglichkeit einen Kommentar zur Fahrt zu hinterlassen, später POST 
      zur API, eventNotes -->
      <form method="post">
        <textarea
          class="comment-field"
          id="event-notes"
          name="eventNotes"
          rows="5"
          cols="33"
          placeholder="Kommentar"
        >
        </textarea>
      </form>
    </div>
    <div>
      <!--Auswahl des EventType, später POST zur API, eventType -->
      <form method="post">
        <label
          ><input class="input-date" type="radio" name="eventType" id="freie-fahrt" />Freie
          Fahrt</label
        >
        <p>oder</p>
        <label
          ><input class="input-date" type="radio" name="eventType" id="muss-sein" />Muss sein</label
        >
      </form>
    </div>
    <div>
      <!-- Evt. Button zum Abbrechen einfügen? + Submit -Button um die Fahrt zu erstellen-->
      <button class="btn-main-short">ABBRECHEN</button
      ><button class="btn-main-short" type="submit">
        FERTIG
        <div class="btn-main-short-mini-bus"></div>
      </button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.input-date {
  background-color: var(--beige-light);
  border: solid 0.1rem var(--orange);
  border-radius: 0.4rem;
  padding: 0.5rem;
  width: 10.5rem;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
  text-align: center;
}
.comment-field {
  background-color: var(--beige-light);
  border: solid 0.1rem var(--orange);
  border-radius: 0.4rem;
  padding: 0.5rem;
  width: 22.25rem;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
}

.flex-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-evenly;
  align-items: center;
}
.align {
  text-align: left;
  margin-left: 2rem;
}

select {
  text-align: right;
}
</style>
