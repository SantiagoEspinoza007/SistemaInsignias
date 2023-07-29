<template>
  <div class="layout w-screen h-screen flex">
    <!--  Side Bar -->
    <div class="sideBar w-[400px] h-full">
      <div class="logo h-[200xp]">
        <img src="../../img/Clipp.png">
        <img src="../../img/LogoClipp.png">
      </div>
      <div class="menu">
        <ul>
          <li>
            <router-link to="/">
              <button :class="['button', { 'active-button': currentPage === '/' }]">
                <div class="button-content">
                  <img src="../../img/home-w.svg" alt="Inicio">
                  <span>Inicio</span>
                </div>
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/fidelizacion">
              <button :class="['button', { 'active-button': currentPage === '/fidelizacion' }]">
                <div class="button-content">
                  <img src="../../img/Fidelizacion-b.svg" alt="Fidelizacion">
                  <span>Fidelización</span>
                </div>
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/usabilidad">
              <button :class="['button', { 'active-button': currentPage === '/usabilidad' }]">
                <div class="button-content">
                  <img src="../../img/Usabilidad-b.svg" alt="Usabilidad">
                  <span>Usabilidad</span>
                </div>
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--  Main  -->
    <div class="main h-full w-full bg-clipAzul">
      <div class="border h-full border-cyan-600 rounded-md border-2">
        <div class="cards p-8 flex">
          <div class="insigniasF-U mb-4 space-y-4">
            <div class="insignias mt-4">
              <h3 class="text-2xl font-bold mb-4 text-center p-1">Insignias de Fidelización</h3>
              <p class="text-lg mb-2 text-center">TOP 5 más obtenidas</p>
              <div class="grid grid-cols-5">
                <div class="insignia">
                  <p class="text-base text-center m-1">Ktaxi</p>
                  <img src="../../img/20taxis.png" alt="20 Taxis" class="">
                  <p class="text-xs text-center mt-2">Has completado 20 viajes en Taxis</p>
                </div>
                <div class="insignia">
                  <p class="text-center text-base m-1">Delivery</p>
                  <img src="../../img/formaPago.png" alt="Forma de Pago">
                  <p class="text-xs text-center mt-2">Usaste una forma diferente de pago</p>
                </div>
                <div class="insignia">
                  <p class="text-base text-center m-1">Servicio</p>
                  <img src="../../img/30km.png" alt="30 Km">
                  <p class="text-xs text-center mt-2">Llegaste a 30 Km recorridos</p>
                </div>
                <div class="insignia">
                  <p class="text-base text-center m-1">Servicio</p>
                  <img src="../../img/20taxis.png" alt="20 Taxis">
                  <p class="text-xs text-center mt-2">Descripcion Actividad</p>
                </div>
                <div class="insignia">
                  <p class="text-base text-center m-1">Servicio</p>
                  <img src="../../img/30km.png" alt="30 Km">
                  <p class="text-xs text-center mt-2">Llegaste a 30 Km recorridos</p>
                </div>
              </div>
              <router-link to="/fidelizacion" class="verInsignias">
                <div class="verInsignias-content">
                  <a>Ver todas las insignias</a>
                </div>
              </router-link>
            </div>
            <div class="insignias mb-4">
              <h3 class="text-2xl font-bold mb-4 text-center p-1">Insignias de Usabilidad</h3>
              <p class="text-lg mb-2 text-center">TOP 5 más obtenidas</p>
              <div class="grid grid-cols-5">
                <div class="insignia">
                  <img src="../../img/numCelular.png" alt="validar celular" class="">
                  <p class="text-xs text-center mt-2">Validar número celular</p>
                </div>
                <div class="insignia">
                  <img src="../../img/tarjetaDebito.png" alt="tarjeta credito/debito">
                  <p class="text-xs text-center mt-2">Agregar tarjeta crédito/debito</p>
                </div>
                <div class="insignia">
                  <img src="../../img/numCelular.png" alt="validar celular">
                  <p class="text-xs text-center mt-2">Llegaste a 30 Km recorridos</p>
                </div>
                <div class="insignia">
                  <img src="../../img/tarjetaDebito.png" alt="tarjeta credito/debito">
                  <p class="text-xs text-center mt-2">Descripcion Actividad</p>
                </div>
                <div class="insignia">
                  <img src="../../img/numCelular.png" alt="validar celular">
                  <p class="text-xs text-center mt-2">Descripcion Actividad</p>
                </div>
              </div>
              <router-link to="/usabilidad" class="verInsignias">
                <div class="verInsignias-content">
                  <a>Ver todas las insignias</a>
                </div>
              </router-link>
            </div>
          </div>
          <div class="chartsF-U w-full h-full p-5">
            <div class="chartF">
              <div class="menusCharts flex justify-between mb-16">
                <div class="despegable-SC">
                  <div class="select-DSC" @click="toggleDropdown('dropdownSCF')">
                    <span>Todos los Servicios</span>
                    <div :class="{'flecha-DSC': true, 'flecha-rotate-DSC': dropdowns.dropdownSCF}"></div>
                  </div>
                  <ul :class="{'menu-DSC': true, 'menu-DSC-open': dropdowns.dropdownSCF}">
                    <li>Servicio 1</li>
                    <li>Servicio 2</li>
                    <li>Servicio 3</li>
                    <li class="active-DSC">Todos los Servicios</li>
                  </ul>
                </div>
                <div class="despegable-FFC">
                  <div class="select-DSC" @click="toggleDropdown('dropdownFCF')">
                    <span>Fecha</span>
                    <div :class="{'flecha-DSC': true, 'flecha-rotate-DSC': dropdowns.dropdownFCF}"></div>
                  </div>
                  <ul :class="{'menu-DSC': true, 'menu-DSC-open': dropdowns.dropdownFCF}">
                    <li class="active-DSC">Fecha 1</li>
                    <li>Fecha 2</li>
                    <li>Fecha 2</li>
                    <li>Fecha 3</li>
                  </ul>
                </div>
              </div>
              <div class="cardChart">

              </div>
            </div>
            <div class="chartU">
              <div class="menusCharts flex justify-between mb-16">
                <div class="despegable-SC">
                  <div class="select-DSC" @click="toggleDropdown('dropdownSCU')">
                    <span>Todos los Servicios</span>
                    <div :class="{'flecha-DSC': true, 'flecha-rotate-DSC': dropdowns.dropdownSCU}"></div>
                  </div>
                  <ul :class="{'menu-DSC': true, 'menu-DSC-open': dropdowns.dropdownSCU}">
                    <li>Servicio 1</li>
                    <li>Servicio 2</li>
                    <li>Servicio 3</li>
                    <li class="active-DSC">Todos los Servicios</li>
                  </ul>
                </div>
                <div class="despegable-FFC">
                  <div class="select-DSC" @click="toggleDropdown('dropdownFCU')">
                    <span>Fecha</span>
                    <div :class="{'flecha-DSC': true, 'flecha-rotate-DSC': dropdowns.dropdownFCU}"></div>
                  </div>
                  <ul :class="{'menu-DSC': true, 'menu-DSC-open': dropdowns.dropdownFCU}">
                    <li class="active-DSC">Fecha 1</li>
                    <li>Fecha 2</li>
                    <li>Fecha 2</li>
                    <li>Fecha 3</li>
                  </ul>
                </div>
              </div>
              <div class="cardChart">
                (chart Usabilidad)
              </div>
            </div>
          </div>
        </div>
        <div class="table">
          <table class="table-auto bg-white">
            <thead>
            <tr>
              <th class="px-4 py-2">Usuarios</th>
              <th class="px-4 py-2">KTaxi</th>
              <th class="px-4 py-2">Delivery</th>
              <th class="px-4 py-2">Otro</th>
              <th class="px-4 py-2">Total Insiginias Obtenidas</th>
              <th class="px-4 py-2">Total Beneficios Obtenidos</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="border px-4 py-2">{{ user.id }}</td>
              <td class="border px-4 py-2">{{ user.KTaxi }}</td>
              <td class="border px-4 py-2">{{ user.Delivery }}</td>
              <td class="border px-4 py-2">{{ user.otro }}</td>
              <td class="border px-4 py-2">{{ totalInsigniasObtenidas(user) }}</td>
              <td class="border px-4 py-2">{{ user.TotalB_Obtenidos }}</td>
            </tr>
            </tbody>
          </table>
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
      dropdowns: {
        dropdownSCF: false,
        dropdownFCF: false,
        dropdownSCU: false,
        dropdownFCU: false,
      },
      users: [
        { id: 1, KTaxi: 20, Delivery: 10, otro: 0, TotalI_Obtenidas: 0, TotalB_Obtenidos: 0 },
        { id: 2, KTaxi: 0, Delivery: 0, otro: 0, TotalI_Obtenidas: 0, TotalB_Obtenidos: 0 },
      ],
    };
  },
  mounted() {
    this.currentPage = this.$route.path;
  },
  methods: {
    toggleDropdown(dropdown) {
      this.dropdowns[dropdown] = !this.dropdowns[dropdown];
    },
    totalInsigniasObtenidas(user) {
      return user.KTaxi + user.Delivery + user.otro;
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

/*Despegable Servicios Charts*/
.despegable-SC {
  position: absolute;
  width: 250px;
}

.select-DSC {
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px white solid;
  border-radius: 10px;
  padding: 8px 14px 8px 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.select-DSC:hover {
  background: #f2f2f2;
}

.flecha-DSC {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #000;
  transition: 0.3s;
}

.flecha-rotate-DSC {
  transform: rotate(180deg);
}

.menu-DSC {
  list-style: none;
  padding: 1px 2px;
  background: white;
  border: 1px #ffffff solid;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: relative;
  bottom: 100%;
  left: 50%;
  min-width: 100%;
  transform: translateX(-50%);
  opacity: 0;
  display: none;
  transition: 0.2s;
  z-index: 1;
}

.menu-servicio-DSC li {
  padding: 0.7em 0.5em;
  margin: 0.3em 0;
  border-radius: 0.5em;
  cursor: pointer;
}

.menu-servicio-DSC li:hover {
  background: #f2f2f2;
}

.active-DSC {
  background: white;
}

.menu-DSC-open {
  display: block;
  opacity: 1;
}

.despegable-FFC {
  margin-left: 300px;
  position: absolute;
  width: 150px;
}

.main {
  padding: 25px;
}

.insignias {
  width: 650px;
  height: 350px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}

.insignias img {
  width: 85px;
  height: auto;
  margin-bottom: 10px;
}

.insignias p {
  color: #6D6D6D;
  text-align: center;
  font-family: Lato, serif;
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

.verInsignias {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 0;
  width: 100%;
}

.verInsignias-content {
  display: block;
  background-color: #F9F9F9;
  color: #2794F8;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  width: 100%;
  text-align: center;
}

.verInsignias-content:hover {
  background-color: #e9e9e9;
}

.chartF {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.chartU {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.cardChart {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  margin-top: 7%;
  padding: 20px;
  border-radius: 10px;
}

.table {
  display: flex;
  justify-content: center;
}

</style>