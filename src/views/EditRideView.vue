<template>
  <div>
    <!-- Einbetten in eine submit-form-->
    <form @submit.prevent="submitForm">
      <!--Dynamisches Ändern der Überschrift-->
      <h1>{{ eventDescription }}</h1>
      <input type="text" minlength="1" maxlength="18" v-model="eventDescription" />

      <!--Dynamische Auswahl des Fahrt-Typs-->
      <div>
        <input type="radio" id="freie-fahrt" value="voraus!" v-model="eventTypeP" />
        <label for="freie-fahrt">Freie Fahrt</label>

        <input type="radio" id="muss-sein" value="aber ist gut für's carma!" v-model="eventTypeP" />
        <label for="muss-sein">Muss sein</label>
      </div>

      <!--Ändern der Fahrt-Daten, am besten wahrscheinlich mit der Datepicker-Component vom
      V-Calendar-->
      <p>Von</p>
      <p>{{ eventStart }}</p>
      <Datepicker-Component v-model="eventStart" />

      <p>Bis</p>
      <p>{{ eventEnd }}</p>
      <Datepicker-Component v-model="eventEnd" />

      <!--Auswahlmöglichkeit der MitfahrerInnen durch dynamisch erzeugte option-Elemente 
        -> je nach pinia-Einbindung nochmal genau überprüfen, welche Daten abgefragt werden sollen-->
      <p>Du fährst mit</p>
      <select v-model="selectedParticipants" multiple>
        <option v-for="driver in drivers" :key="driver.id" :value="driver.id">
          {{ driver.firstName }}
        </option>
      </select>

      <!--Dynamisches Ändern des Kommentars zur Fahrt-->
      <p>{{ eventNote }}</p>
      <input type="text" v-model="eventNote" />

      <!--Im unteren options-Bereich müssen noch Funktionen eingebaut werden, was genau
      mit den eingebenen Daten passieren soll -> POST an pinia, bzw die DB oder routelink 
      zurück bei abbrechen-->
      <div>
        <button @click="cancel">ABBRECHEN</button>
        <button type="submit">FERTIG</button>
      </div>
    </form>
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

<style scoped></style>
