<template>
  <div class="layout w-screen h-screen flex">
    <!--  Side Bar -->
    <div class="sideBar w-[400px] h-[1000px]">
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
          <li class="absolute bottom-0">
            <router-link to="/insignias">
              <button :class="['button', { 'active-button': currentPage === '/insignias' }]">
                <div class="button-content">
                  <img src="../img/upload-b.svg" alt="Insignias">
                  <span>Cargar</span>
                </div>
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--  Main  -->
    <div class="main w-[1800px] h-[1000px]  bg-clipAzul p-6">
      <div class="border h-full border-cyan-600 rounded-md border-2 p-12 flex">
        <div class="card-insignias flex-col justify-center">
          <DropdownMenu :options="optionsFidelizacion" class="w-[250px] mb-10"></DropdownMenu>
<!--          <div class="despegable-servicio mb-10">-->
<!--            <div class="select" @click="toggleDropdown('dropdownS')">-->
<!--              <span>KTaxi</span>-->
<!--              <div :class="{'flecha': true, 'flecha-rotate': dropdowns.dropdownS}"></div>-->
<!--            </div>-->
<!--            <ul :class="{'menu-servicio': true, 'menu-servicio-open': dropdowns.dropdownS}">-->
<!--              <li>Servicio 1</li>-->
<!--              <li>Servicio 2</li>-->
<!--              <li>Servicio 3</li>-->
<!--              <li class="active">KTaxi</li>-->
<!--            </ul>-->
<!--          </div>-->
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
        <div class="cont-f flex-col ml-10 justify-center">
          <div class="despegable-FFC absolute w-32">
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
          <div class="FchartCard text-gray-600 mt-20 mb-10">
            <Bar
                ref="myChart"
                :options="chartOptions"
                :data="chartData"
            />
          </div>
          <table class="table-auto bg-white absolute">
            <thead>
            <tr>
              <th class="px-4 py-2 text-sm">Usuarios</th>
              <th class="px-4 py-2 text-sm">Insiginias obtenidas</th>
              <th class="px-4 py-2 text-sm">Beneficios reclamados</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="border px-4 py-2">{{ user.id }}</td>
              <td class="border px-4 py-2">{{ user.Inisgnias_Obtenidas }}</td>
              <td class="border px-4 py-2">{{ user.Beneficios_Reclamados }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import DropdownMenu from "@/components/DropdownMenu.vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: {
    Bar,
    DropdownMenu
  },
  data() {
    return {
      optionsFidelizacion: [
        'KTaxi',
        'Servicio 1',
        'Servicio 2',
      ],
      chartData: {
        labels: [
          'Insignias Fidelización',
        ],
        datasets: [
          {
            label: '20 Viajes',
            data: [150],
            fill: false,
            backgroundColor:
                'rgba(255, 99, 132, 0.4)',
            borderColor:
                'rgb(255, 99, 132)',
            borderWidth: 1,
          },
          {
            label: 'Forma Pago',
            data: [123],
            fill: false,
            backgroundColor:
                'rgba(249,140,35,0.4)',
            borderColor:
                'rgb(255, 159, 64)',
            borderWidth: 1,
          },
          {
            label: '30km',
            data: [160],
            fill: false,
            backgroundColor: 'rgba(255, 205, 86, 0.4)',
            borderColor: 'rgb(255, 205, 86)',
            borderWidth: 1,
          },
          {
            label: 'Recomendar 1',
            data: [155],
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
          },
          {
            label: '60km',
            data: [127],
            fill: false,
            backgroundColor: 'rgba(54, 162, 235, 0.4)',
            borderColor: 'rgb(54, 162, 235)',
            barPercentage: 0.8,
            borderWidth: 1,
          },
          {
            label: '100km',
            data: [110],
            fill: false,
            backgroundColor: 'rgba(153, 102, 255, 0.4)',
            borderColor: 'rgb(153, 102, 255)',
            barPercentage: 0.8,
            borderWidth: 1,
          },
          {
            label: 'Recomendar 2',
            data: [100],
            fill: false,
            backgroundColor: 'rgba(201, 203, 207, 0.4)',
            borderColor: 'rgb(201, 203, 207)',
            barPercentage: 0.8,
            borderWidth: 1,
          },
          {
            axis: 'y',
            label: '10 Viajes',
            data: [95],
            fill: false,
            backgroundColor: 'rgba(255, 102, 255, 0.4)',
            borderColor: 'rgb(255, 102, 255)',
            borderWidth: 1,
            barPercentage: 0.8,
          },
          {
            axis: 'y',
            label: 'Opinion',
            data: [105],
            fill: false,
            backgroundColor: 'rgba(102, 102, 255, 0.4)',
            borderColor: 'rgb(102, 102, 255)',
            borderWidth: 1,
            barPercentage: 0.8,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        indexAxis: 'y',
        plugins: {
          title: {
            fontSize: 25,
            display: true,
            text: 'Insignias Fidelización mas conseguidas',
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
            },
          },
        },
        scales: {
          y: {
            ticks: {
              display: false,
            },
          },
        },
      },
      currentPage: '',
      dropdowns: {
        dropdownSC: false,
        dropdownFFC: false,
        dropdownS: false,
      },
      users: [
        {id: 1, Inisgnias_Obtenidas: 150, Beneficios_Reclamados: 10},
        {id: 2, Inisgnias_Obtenidas: 123, Beneficios_Reclamados: 5},
        {id: 3, Inisgnias_Obtenidas: 160, Beneficios_Reclamados: 15},
        {id: 4, Inisgnias_Obtenidas: 155, Beneficios_Reclamados: 2},
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
  },
  methods: {
    toggleDropdown(dropdown) {
      this.dropdowns[dropdown] = !this.dropdowns[dropdown];
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

.insigniasF {
  width: 750px;
  height: 650px;
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

.FchartCard {
  width: 625px;
  height: 350px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}
</style>