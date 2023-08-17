<template>
  <div class="sideBar w-[400px]">
    <div class="logo">
      <img src="../img/Clipp.png">
      <img src="../img/LogoClipp.png">
    </div>
    <div class="menu">
      <ul>
        <li>
          <router-link to="/">
            <button :class="['button', { 'active-button': currentPage === '/' }]">
              <div class="button-content">
                <img src="../img/home-b.svg" alt="Inicio">
                <span>Inicio</span>
              </div>
            </button>
          </router-link>
        </li>
        <li>
          <router-link to="/fidelizacion">
            <button :class="['button', { 'active-button': currentPage === '/fidelizacion' }]">
              <div class="button-content">
                <img src="../img/Fidelizacion-b.svg" alt="Fidelizacion">
                <span>Fidelización</span>
              </div>
            </button>
          </router-link>
        </li>
        <li>
          <router-link to="/usabilidad">
            <button :class="['button', { 'active-button': currentPage === '/usabilidad' }]">
              <div class="button-content">
                <img src="../img/Usabilidad-b.svg" alt="Usabilidad">
                <span>Usabilidad</span>
              </div>
            </button>
          </router-link>
        </li>
        <li class="mt-48">
          <router-link to="/insignias">
            <button :class="['button', { 'active-button': currentPage === '/insignias' }]">
              <div class="button-content">
                <img src="../img/upload-b.svg" alt="Insignias">
                <span>Insignias</span>
              </div>
            </button>
          </router-link>
        </li>
        <li>
          <router-link to="/publicidad">
            <button :class="['button', { 'active-button': currentPage === '/publicidad' }]">
              <div class="button-content">
                <img src="../img/upload-w.svg" alt="Publicidad">
                <span>Publicidad</span>
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
      currentPage: this.$route.path,
    };
  },
  watch: {
    '$route'(to, from) {
      this.currentPage = to.path;
    },
  },
};
</script>

<style scoped>
/* Estilos para los botones activos */
.active-button {
  background-color: #202D8D;
  color: white;
}

/* Estilos para los íconos activos */
.active-button img {
  filter: invert(1); /* Invierte los colores del ícono */
}
</style>
