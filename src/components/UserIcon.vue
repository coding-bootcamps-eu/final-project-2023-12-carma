<template>
  <div class="icon">{{ user.loggedInUser.firstName[0] }}</div>
  <!--muss dynamisiert werden mit API-Anbindung-->
</template>

<script>
import { useUserStore } from '@/stores/user'
export default {
  setup() {
    const user = useUserStore()

    return {
      user
    }
  }
}
</script>

<style scoped>
.icon {
  height: 30px;
  width: 30px;
  position: absolute;
  background-color: var(--green-dark);
  border-radius: 50%;
  color: var(--beige-light);
  text-align: center;
  line-height: 30px;
  right: 10px;
  padding: 3px;
  margin-top: 15px;
}
</style>
