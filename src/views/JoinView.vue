<template>
  <section>
    <div class="bg-pre-bus-small">
      <button>
        <RouterLink to="/"><i class="fa-solid fa-circle-chevron-left"></i></RouterLink>
      </button>
      <h1>Gruppe beitreten</h1>
      <form @submit.prevent="joinCar">
        <div class="input-container">
          <input
            type="text"
            v-model="licensePlate"
            placeholder="Autokennzeichen"
            required
            class="input-pre"
          />
        </div>
        <div class="btn-container">
          <button type="submit" class="btn-pre-large">los geht's!</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      licensePlate: '',
      participants: []
    }
  },
  setup() {
    const user = useUserStore()

    return {
      user
    }
  },
  methods: {
    joinCar() {
      fetch('http://localhost:4000/cars')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          const foundCar = data.find((car) => car.licensePlate === this.licensePlate)
          const foundCarId = foundCar.id
          this.participants = foundCar.participants
          if (foundCar) {
            const user = useUserStore()
            this.participants.push(user.loggedInUser.id)
            console.log(this.participants[0])
            console.log(foundCarId)
            fetch(`http://localhost:4000/cars/${foundCarId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                participants: this.participants
              })
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Failed to update car participants')
                }
                return response.json()
              })
              .then((updatedCar) => {
                console.log('Car participants updated:', updatedCar)
              })
              .catch((error) => {
                console.error('Error updating car participants:', error)
              })
          } else {
            throw new Error('Dieses Auto gibt es anscheinend nicht')
          }
        })
        .catch((error) => {
          console.error('Es gab ein Problem mit der Autosuche:', error)
        })
    }
  }
}
</script>

<style scoped>
.fa-solid {
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: var(--orange);
}

.input-container {
  display: flex;
  flex-direction: column;

  align-items: center;
  height: 44rem;

  position: relative;
}

.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  position: absolute;
  bottom: 5.8rem;
}
</style>
