<template>
  <div class="icon">M</div>
</template>

<script>
import { useUserStore } from '@/stores/user'
export default {
  setup() {
    const userStore = useUserStore()

    return {
      userStore
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
  right: 20px;
  padding: 5px;
}
</style>
