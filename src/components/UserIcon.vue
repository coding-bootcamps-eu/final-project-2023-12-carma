<template>
  <div class="logout" :class="{ open: isLogoutOpen, closed: !isLogoutOpen }">
    <form @submit.prevent="logout">
      <button type="submit"><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</button>
    </form>
  </div>
  <div
    class="icon"
    @click="isLogoutOpen = !isLogoutOpen"
    :style="{
      backgroundColor:
        user.loggedInUser.id < 5 ? `var(--user-${user.loggedInUser.id})` : 'var(--green-light)'
    }"
  >
    {{ user.loggedInUser.firstName[0] }}
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
export default {
  data() {
    return {
      isLogoutOpen: false
    }
  },
  setup() {
    const user = useUserStore()

    return {
      user
    }
  },
  methods: {
    logout() {
      const userStore = useUserStore()
      userStore.logout()
      this.$router.push('/ciao')
    }
  }
}
</script>

<style scoped>
.icon {
  height: 30px;
  width: 30px;
  position: absolute;
  border-radius: 50%;
  color: var(--beige-light);
  text-align: center;
  line-height: 30px;
  right: 15px;
  padding: 3px;
  margin-top: 15px;
  z-index: 4;
}

.logout {
  height: 6rem;
  width: 70%;
  background-color: var(--green-dark);
  position: absolute;
  right: 0;
  text-align: center;
  line-height: 8rem;
  font-size: 18px;
  z-index: 4;
  overflow-x: hidden;
  color: var(--beige-light);
}

.logout a:hover {
  font-weight: bolder;
}

.open {
  width: 70%;
  transition: 0.5s;
}

.closed {
  width: 0;
  transition: 0.5s;
  overflow-x: hidden;
}

.fa-solid {
  margin-right: 1rem;
}
</style>
