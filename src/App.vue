<script>
export default {
  data() {
    return {
      isNavOpen: true
    }
  }
}
</script>

<template>
  <body class="app-container">
    <header>
      <nav v-if="$route.meta.hasMainMenu">
        <div class="navbar">
          <div @click="isNavOpen = !isNavOpen" class="container nav-container">
            <div class="hamburger-lines">
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>
            </div>

            <div class="menu-items" :class="{ open: isNavOpen, closed: !isNavOpen }">
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
  top: 17px;
  right: 20px;
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
  height: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 500px;
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
</style>
