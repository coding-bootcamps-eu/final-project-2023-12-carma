<script>
import UserIcon from './components/UserIcon.vue'
export default {
  data() {
    return {
      isNavOpen: false
    }
  },
  components: {
    UserIcon
  }
}
</script>

<template>
  <body class="app-container">
    <header>
      <UserIcon v-if="$route.meta.hasUserIcon"></UserIcon>
      <nav v-if="$route.meta.hasMainMenu">
        <div class="navbar">
          <div @click="isNavOpen = !isNavOpen" class="container nav-container">
            <div class="hamburger-lines">
              <span class="line" :class="{ line1: isNavOpen }"></span>
              <span class="line" :class="{ line2: isNavOpen }"></span>
              <span class="line" :class="{ line3: isNavOpen }"></span>
            </div>

            <div
              class="menu-items"
              :class="{ open: isNavOpen, transform: isNavOpen, closed: !isNavOpen }"
            >
              <li><router-link to="/home">HOME</router-link></li>
              <li><router-link to="/calendar">FAHRT BUCHEN</router-link></li>
              <li><router-link to="/about">ABOUT</router-link></li>
              <li><a href="#">placeholder</a></li>
              <li><a href="#">placeholder</a></li>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <main></main>
    <footer></footer>
    <div>
      <RouterView />
    </div>
    <footer>
      <p
        class="carma-logo"
        :class="{ rosa: !$route.meta.hasBlueLogo, blue: $route.meta.hasBlueLogo }"
      >
        carma
      </p>
    </footer>
  </body>
</template>

<style scoped>
.app-container {
  position: relative;
}

.navbar .nav-container li {
  list-style: none;
}
.navbar .nav-container a {
  text-decoration: none;
  color: var(--orange);
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0.7rem;
}

.navbar .nav-container a:hover {
  font-weight: bolder;
}

.nav-container .hamburger-lines {
  display: block;
  height: 26px;
  width: 32px;
  position: absolute;
  top: 20px;
  right: 65px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nav-container .hamburger-lines .line {
  display: block;
  height: 4px;
  width: 100%;
  border-radius: 10px;
  background: var(--orange);
}

.navbar .menu-items {
  height: 40%;
  position: fixed;
  z-index: 1;
  top: 13px;
  right: 589px;
  background-color: var(--beige-light);
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;
}
.open {
  width: 300px;
}

.closed {
  width: 0;
}

.navbar .menu-items li {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}
.transform {
  transform: translateX(0);
}

.line1 {
  transform: rotate(45deg);
  transform-origin: 0% 0%;
  transition: transform 0.4s ease-in-out;
}
.line2 {
  transform: scaleY(0);
  transition: transform 0.2s ease-in-out;
}
.line3 {
  transform: rotate(-45deg);
  transform-origin: 0% 100%;
  transition: transform 0.4s ease-in-out;
}

.blue {
  color: var(--blue);
  position: absolute;
  left: 12.2rem;
  bottom: 0.6rem;
}
.blue::after {
  content: '';
  display: block;
  width: calc(100% - 10px);
  width: 53px;
  height: 2px;
  background-color: var(--blue);
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
}

.rosa {
  color: var(--rosa);
}
.rosa::after {
  content: '';
  display: block;
  width: calc(100% - 10px);
  width: 53px;
  height: 2px;
  background-color: var(--rosa);
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
