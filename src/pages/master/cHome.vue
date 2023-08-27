<template>
  <div class="layout w-screen h-screen flex">
    <!--  Side Bar -->
    <div class="sideBar w-[400px] h-[1000px]">
      <div class="logo">
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
          <li class="absolute bottom-0">
            <router-link to="/insignias">
              <button :class="['button', { 'active-button': currentPage === '/insignias' }]">
                <div class="button-content">
                  <img src="../../img/upload-b.svg" alt="Insignias">
                  <span>Cargar</span>
                </div>
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--  Main  -->
    <div class="main w-[1800px] h-[1000px] bg-clipAzul p-6">
      <div class="border h-full border-cyan-600 rounded-md border-2 p-4 flex">
        <div class="insigniasF-U ml-8 mb-4 space-y-4 flex-col">
          <div class="insignias mt-2">
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
                <p class="text-xs text-center mt-2">Descripcion Actividad</p>
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
          <div class="table rounded-md">
            <table class="table-auto rounded-md bg-white">
              <thead>
              <tr>
                <th class="px-4 py-1">Usuarios</th>
                <th class="px-4 py-1">KTaxi</th>
                <th class="px-4 py-1">Delivery</th>
                <th class="px-4 py-1">Otro</th>
                <th class="px-4 py-1">Total Insiginias</th>
                <th class="px-4 py-1">Total Beneficios</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="user in users" :key="user.id">
                <td class="border px-4 py-1">{{ user.id }}</td>
                <td class="border px-4 py-1">{{ user.KTaxi }}</td>
                <td class="border px-4 py-1">{{ user.Delivery }}</td>
                <td class="border px-4 py-1">{{ user.otro }}</td>
                <td class="border px-4 py-1">{{ totalInsigniasObtenidas(user) }}</td>
                <td class="border px-4 py-1">{{ user.TotalB_Obtenidos }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="contF-U ml-16 p-5 space-y-10 flex-col justify-center">
          <div class="chartF mb-4 flex">
            <div class="headersF flex-col">
              <div class="despegable-SC absolute w-56">
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
              <div class="despegable-FFC absolute w-32 ml-80">
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
            <div class="cardChart flex-col mt-16">
              <Bar
                  ref="myChart"
                  :options="chartOptionsF"
                  :data="chartDataF"
              />
            </div>
          </div>
          <div class="chartU mb-4 flex">
            <div class="headersU flex-col mb-2">
              <div class="despegable-SC absolute w-56">
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
              <div class="despegable-FFC absolute w-32 ml-80">
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
            <div class="cardChart flex-col mt-16">
              <Bar
                  ref="myChart"
                  :options="chartOptionsU"
                  :data="chartDataU"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: {Bar},
  data() {
    return {
      insignias: [],
      chartDataF: {
        labels: [
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
        ],
        datasets: [
          {
            label: '20 Viajes',
            data: [125, 99, 150, 183],
            fill: false,
            backgroundColor: 'rgba(54, 162, 235, 0.4)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
          },
          {
            label: 'Forma de Pago',
            data: [99, 120, 78, 56],
            fill: false,
            backgroundColor: 'rgba(201, 203, 207, 0.4)',
            borderColor: 'rgb(201, 203, 207)',
            borderWidth: 1,
          },
          {
            label: '5 Recargas',
            data: [89, 40, 110, 75],
            fill: false,
            backgroundColor: 'rgba(102, 102, 255, 0.4)',
            borderColor: 'rgb(102, 102, 255)',
            borderWidth: 1,
          },
          {
            label: 'Evento asistido',
            data: [79, 89, 130, 105],
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
          },
        ],
      },
      chartDataU: {
        labels: [
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
        ],
        datasets: [
          {
            label: 'kTaxi',
            data: [150, 183, 125, 99],
            fill: false,
            backgroundColor: 'rgba(255, 99, 132, 0.4)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
          },
          {
            label: 'Delivery',
            data: [78, 56, 99, 120],
            fill: false,
            backgroundColor: 'rgba(249,140,35,0.4)',
            borderColor: 'rgb(255, 159, 64)',
            borderWidth: 1,
          },
          {
            label: 'Servicio 3',
            data: [110, 75, 89, 40],
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
          },
          {
            label: 'Servicio 4',
            data: [130, 105, 79, 89],
            fill: false,
            backgroundColor: 'rgba(153, 102, 255, 0.4)',
            borderColor: 'rgba(153, 102, 255)',
            borderWidth: 1,
          },
        ],
      },
      chartOptionsF: {
        responsive: true,
        plugins: {
          title: {
            fontSize: 25,
            display: true,
            text: 'Actividades completadas general en ultimos 4 meses',
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
            },
          },
        },
      },
      chartOptionsU: {
        responsive: true,
        plugins: {
          title: {
            fontSize: 25,
            display: true,
            text: 'Datos Insignias obtenidas por servicio en últimos 4 meses',
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
            },
          },
        },
      },
      currentPage: '',
      dropdowns: {
        dropdownSCF: false,
        dropdownFCF: false,
        dropdownSCU: false,
        dropdownFCU: false,
      },
      users: [
        {id: 1, KTaxi: 20, Delivery: 10, otro: 0, TotalI_Obtenidas: 0, TotalB_Obtenidos: 0},
        {id: 2, KTaxi: 0, Delivery: 0, otro: 0, TotalI_Obtenidas: 0, TotalB_Obtenidos: 0},
        {id: 3, KTaxi: 20, Delivery: 10, otro: 0, TotalI_Obtenidas: 0, TotalB_Obtenidos: 0},
      ],
      showModal: false,
      showModal2: false,
      cupones: [
        {num: 1, cupon: 20},
        {num: 2, cupon: 0},
        {num: 3, cupon: 20},
      ],
    };
  },
  mounted() {
    this.currentPage = this.$route.path;
    this.fetchInsignias();
  },
  methods: {
    toggleDropdown(dropdown) {
      this.dropdowns[dropdown] = !this.dropdowns[dropdown];
    },
    totalInsigniasObtenidas(user) {
      return user.KTaxi + user.Delivery + user.otro;
    },
    async fetchInsignias() {
      try {
        const response = await fetch('https://backend-clipp-production.up.railway.app/api/insignias');
        const data = await response.json();
        this.insignias = data; // Asegúrate de que tu API devuelve un array de objetos con los datos de las insignias
      } catch (error) {
        console.error('Error al cargar las insignias:', error);
      }
    }
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

.insignias {
  width: 650px;
  height: auto;
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

.cardChart {
  width: 500px;
  height: auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}
</style>