<template>
  <div class="layout w-screen h-screen flex">
    <!--  Side Bar -->
    <div class="sideBar w-[400px] h-full">
      <div class="logo h-[200xp]">
        <img src="../img/Clipp.png">
        <img src="../img/LogoClipp.png">
      </div>
      <div class="menu h-[calc(100vh-50px)]">
        <ul>
          <li>
            <router-link to="/">
              <button :class="['button', { 'active-button': currentPage === '/' }]">
                <div class="button-content">
                  <img src="../img/home-b.svg" alt="Inicio">
                  <span>Home</span>
                </div>
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/fidelizacion">
              <button :class="['button', { 'active-button': currentPage === '/fidelizacion' }]">
                <div class="button-content">
                  <img src="../img/Fidelizacion-w.svg" alt="Fidelizacion">
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
        </ul>
      </div>
    </div>
    <!--  Main  -->
    <div class="main h-full w-full">
      <div class="border h-[calc(100vh-50px)] border-cyan-600 rounded-md border-2">
        <div class="despegable-servicio">
          <div class="select" @click="toggleDropdown">
            <span class="selected">KTaxi</span>
            <div :class="{'flecha': true, 'flecha-rotate': dropdownOpen}"></div>
          </div>
          <ul :class="{'menu-servicio': true, 'menu-servicio-open': dropdownOpen}">
            <li>Servicio 1</li>
            <li>Servicio 2</li>
            <li>Servicio 3</li>
            <li class="active">KTaxi</li>
          </ul>
        </div>
        <div class="cards mt-10 ml-9">
          <div class="insigniasF">
            <h3 class="text-2xl font-bold mb-4 text-center p-7">Insignias de Fidelización</h3>
            <div v-for="index in 3" :key="index">
              <div class="grid grid-cols-6 gap-3">
                <div class="insignia">
                  <img src="../img/20taxis.png" alt="20 Taxis" class="">
                  <p class="text-xs text-center mt-2">Has completado 20 viajes en Taxis</p>
                </div>
                <div class="insignia">
                  <img src="../img/formaPago.png" alt="Forma de Pago">
                  <p class="text-xs text-center mt-2">Usaste una forma diferente de pago</p>
                </div>
                <div class="insignia">
                  <img src="../img/30km.png" alt="30 Km">
                  <p class="text-xs text-center mt-2">Llegaste a 30 Km recorridos</p>
                </div>
                <div class="insignia">
                  <img src="../img/20taxis.png" alt="20 Taxis">
                  <p class="text-xs text-center mt-2">Descripcion Actividad</p>
                </div>
                <div class="insignia">
                  <img src="../img/formaPago.png" alt="Forma de Pago">
                  <p class="text-xs text-center mt-2">Descripcion Actividad</p>
                </div>
                <div class="insignia">
                  <img src="../img/30km.png" alt="30 Km">
                  <p class="text-xs text-center mt-2">Descripcion Actividad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: '',
      dropdownOpen: false,
    };
  },
  mounted() {
    this.currentPage = this.$route.path;
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
};
</script>

<style>

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

.main {
  background-color: #202D8D;
  min-height: 100vh;
}

.despegable-servicio {
  width: 75px;
  min-width: 15em;
  position: relative;
  margin: 2em;
}

.despegable-servicio * {
  box-sizing: border-box;
}

.select {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px white solid;
  border-radius: 10px;
  padding: 8px 14px 8px 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.select-clicked {
  border: 2px #202D8D solid;
  box-shadow: 0 0 0.8em #202D8D;
}

.select:hover {
  background: #1d2883;
}

.flecha {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #fff;
  transition: 0.3s;
}

.flecha-rotate {
  transform: rotate(180deg);
}

.menu-servicio {
  list-style: none;
  padding: 1px 2px;
  background: #202D8D;
  color: white;
  border: 1px #ffffff solid;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: absolute;
  top: 3em;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  opacity: 0;
  display: none;
  transition: 0.2s;
  z-index: 1;
}

.menu-servicio li {
  padding: 0.7em 0.5em;
  margin: 0.3em 0;
  border-radius: 0.5em;
  cursor: pointer;
}

.menu-servicio li:hover {
  background: #1d2883;
}

.active {
  background: #202D8D;
}

.menu-servicio-open {
  display: block;
  opacity: 1;
}

.insigniasF {
  width: 750px;
  height: auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}

.insigniasF img {
  width: 85px;
  height: auto;
}

.insigniasF p {
  color: #6D6D6D;
  text-align: center;
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.insignia {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 5px 10px 5px;
}
</style>
