<template>
  <div class="sideBar w-[400px] h-[1750px]">
    <div class="logo">
      <img src="../img/Clipp.png" alt="Clipp">
      <img src="../img/LogoClipp.png" alt="LogoClipp">
    </div>
    <div class="menu">
      <ul>
        <li v-for="page in pages" :key="page.path">
          <router-link :to="page.path">
            <button :class="['button', { 'active-button': currentPage === page.path }]">
              <div class="button-content">
                <img :src="page.icon" :alt="page.name">
                <span>{{ page.name }}</span>
              </div>
            </button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: '',
      pages: [
        { path: '/', name: 'Inicio', icon: '../img/home-b.svg' },
        { path: '/fidelizacion', name: 'Fidelización', icon: '../img/Fidelizacion-b.svg' },
        { path: '/usabilidad', name: 'Usabilidad', icon: '../img/Usabilidad-b.svg' },
        { path: '/insignias', name: 'Cargar', icon: '../img/upload-w.svg' }
      ]
    };
  },
  mounted() {
    this.currentPage = this.$route.path;
  }
};
</script>

<style scoped>
.sideBar {
  align-items: center;
  padding: 30px;
}

.logo {
  display: flex;
  justify-content: center;
}

.logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.menu {
  padding-top: 20px;
}

.menu ul {
  list-style: none;
  padding: 10px;
  margin: 10px;
}

.menu li {
  margin-bottom: 30px;
}

.button img {
  margin-right: 10px;
}

.button {
  display: flex;
  justify-content: center;
  width: 230px;
  height: 75px;
  padding: 26px 84px 27px 76px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #202D8D;
}

.button-content {
  display: flex;
  align-items: center;
}

.active-button {
  background-color: #202D8D;
  color: white;
}
</style>

