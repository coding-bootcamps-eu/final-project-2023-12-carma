<!-- an Figma angepasst cm -->
<template>
  <div>
    <!-- Überschrift -->
    <h1 class="h1-event">Deine <br />nächste Fahrt</h1>
  </div>
  <div class="flex-container">
    <form @submit.prevent="createNewRide">
      <div>
        <!-- Text-Input für die Event-Description, später POST zur API, evt noch einmal 
    auf die Darstellung der maxlength vom text-input schauen, z.B. mit popup 
    bei hovern lösen -->

        <input
          class="input-main"
          type="text"
          v-model="eventDescription"
          id="event-description"
          placeholder="Name der Fahrt"
          minlength="1"
          maxlength="30"
          required
        />
      </div>
      <!--bisher war die maximale Zeichenlänge 18-->
      <div>
        <!-- Datums-Input für das Event, Start und Ende, evt mit Datepicker und range, 
      später POST zur API, Format anpassen zur Darstellung in der Calendar-Component -->

        <div class="dates">
          <input
            class="input-date"
            type="datetime-local"
            v-model="eventStart"
            id="event-start"
            placeholder="Von"
            required
          />
          <input
            class="input-date"
            type="datetime-local"
            v-model="eventEnd"
            id="event-end"
            placeholder="Bis"
            required
          />
        </div>
      </div>
      <div>
        <!-- MitfahrerInnen-Input für das Event, am besten dynamisch erzeugt 
        aus der Auto-Gruppe anhand der driver_id, mit Darstellung des Buchstaben-
        Icons, später POST zur API, if checked -> eventParticipants -->
        <div class="input-pre" method="post">
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
        </div>
      </div>
      <div>
        <!--Möglichkeit einen Kommentar zur Fahrt zu hinterlassen, später POST 
      zur API, eventNotes -->

        <textarea
          class="comment-field"
          id="event-notes"
          v-model="eventNotes"
          rows="5"
          cols="33"
          placeholder="Kommentar"
        >
        </textarea>

        <div class="input-choose-container">
          <!-- Auswahl des EventType, später POST zur API, eventType -->

          <label for="freie-fahrt">
            <input
              class="input-choose"
              type="radio"
              v-model="eventType"
              id="freie-fahrt"
              value="freie-fahrt"
              name="radio"
              required
            />Freie Fahrt
          </label>
          <label for="muss-sein">
            <input
              class="input-choose"
              type="radio"
              v-model="eventType"
              id="muss-sein"
              value="muss-sein"
              name="radio"
            />Muss sein
          </label>
        </div>
      </div>
      <div class="btn-container">
        <button class="btn-main-short">ABBRECHEN</button
        ><button class="btn-main-short" type="submit">
          FERTIG
          <div class="btn-main-short-mini-bus"></div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      eventDescription: '',
      eventStart: '',
      eventEnd: '',
      eventNotes: '',
      eventType: '',
      driverId: ''
    }
  },
  setup() {
    const user = useUserStore()

    return {
      user
    }
  },
  methods: {
    createNewRide() {
      const newEvent = {
        description: this.eventDescription,
        start: this.eventStart,
        end: this.eventEnd,
        notes: this.eventNotes,
        type: this.eventType,
        driverId: this.user.loggedInUser.id,
        finished: false
      }
      fetch('http://localhost:4000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((responseData) => {
          console.log('Data posted successfully:', responseData)
        })
        .catch((error) => {
          console.error('Error posting data:', error)
        })
      return this.$router.push('/calendar')
    }
  }
}
</script>

<style scoped>
.create-event-box {
  border: solid green 2px;
  margin: auto;
}

.flex-container {
  border: solid red 1px;
  width: 372px;
  margin: auto;
}
.input-choose-container {
  border: solid blue 2px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.input-pre {
  margin-top: 15px;
}

.input-choose {
  background-color: var(--beige-light);
  border: solid 0.1rem var(--orange);
  border-radius: 50%;
  padding: 0.5rem;
  width: 0.5rem;
  height: 0.5rem;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
  text-align: center;
  margin-left: 2rem;
  margin-right: 0.5rem;
}

.input-date {
  background-color: var(--beige-light);
  border: solid 0.1rem var(--orange);
  border-radius: 0.4rem;
  padding: 0.5rem;
  width: 1.8rem;
  height: 1.8rem;

  color: var(--orange);
  font-size: 15px;
  font-weight: light;
  font-style: italic;
  text-align: center;
}

.dates {
  display: flex;
  justify-content: space-between;
}

#event-start {
  width: 152px;
}

#event-end {
  width: 152px;
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

/* .flex-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
} */
.align {
  text-align: left;
  margin-left: 2rem;
}

select {
  text-align: right;
}

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
