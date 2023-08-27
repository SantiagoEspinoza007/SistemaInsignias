<template>
  <div class="layout w-screen h-screen flex">
    <!--  Side Bar -->
    <div class="sideBar w-[400px] h-[1000px]">
      <div class="logo">
        <img src="../img/Clipp.png" />
        <img src="../img/LogoClipp.png" />
      </div>
      <div class="menu">
        <ul>
          <li>
            <router-link to="/">
              <button
                :class="['button', { 'active-button': currentPage === '/' }]"
              >
                <div class="button-content">
                  <img src="../img/home-b.svg" alt="Inicio" />
                  <span>Inicio</span>
                </div>
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/fidelizacion">
              <button
                :class="[
                  'button',
                  { 'active-button': currentPage === '/fidelizacion' },
                ]"
              >
                <div class="button-content">
                  <img src="../img/Fidelizacion-b.svg" alt="Fidelizacion" />
                  <span>Fidelización</span>
                </div>
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/usabilidad">
              <button
                :class="[
                  'button',
                  { 'active-button': currentPage === '/usabilidad' },
                ]"
              >
                <div class="button-content">
                  <img src="../img/Usabilidad-w.svg" alt="Usabilidad" />
                  <span>Usabilidad</span>
                </div>
              </button>
            </router-link>
          </li>
          <li class="absolute bottom-0">
            <router-link to="/insignias">
              <button
                :class="[
                  'button',
                  { 'active-button': currentPage === '/insignias' },
                ]"
              >
                <div class="button-content">
                  <img src="../img/upload-b.svg" alt="Insignias" />
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
      <div class="border h-full border-cyan-600 rounded-md border-2 p-12 flex">
        <div class="card-insignias flex-col justify-center">
          <div class="insigniasU mt-20">
            <h3 class="text-2xl font-bold mb-4 text-center p-7">
              Insignias de Usabilidad
            </h3>

            <div v-for="insignia in usabilidadInsignias" :key="insignia.id">
              <div class="grid grid-cols-6 gap-3">
                <div class="insignia">
                  <img
                    :src="insignia.imagenUrl"
                    :alt="insignia.titulo"
                    class=""
                  />
                  <p class="text-xs text-center mt-2">
                    {{ insignia.descripcion }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cont-f flex-col ml-10 justify-center">
          <div class="despegable-FFC w-40 mb-10">
            <div class="select-DSC" @click="toggleDropdown('dropdownFFC')">
              <span>Fecha</span>
              <div
                :class="{
                  'flecha-DSC': true,
                  'flecha-rotate-DSC': dropdowns.dropdownFFC,
                }"
              ></div>
            </div>
            <ul
              :class="{
                'menu-DSC': true,
                'menu-DSC-open': dropdowns.dropdownFFC,
              }"
            >
              <li class="active-DSC">Fecha 1</li>
              <li>Fecha 2</li>
              <li>Fecha 2</li>
              <li>Fecha 3</li>
            </ul>
          </div>
          <div class="FchartCard text-gray-600 mb-10">
            <Bar ref="myChart" :options="chartOptions" :data="chartData" />
          </div>
          <table class="table-auto bg-white rounded-md">
            <thead>
              <tr>
                <th class="px-8 py-2 text-sm">Insiginias usabilidad</th>
                <th class="px-4 py-2 text-sm">Cantidad usuarios</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td class="border px-8 py-2">
                  {{ user.Insignias_Usabilidad }}
                </td>
                <td class="border px-4 py-2">{{ user.Cantidad_Usuarios }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: { Bar },
  data() {
    return {
      insignias: [],
      chartData: {
        labels: ["Insignias Fidelización"],
        datasets: [
          {
            label: "20 Viajes",
            data: [15],
            fill: false,
            backgroundColor: "rgba(255, 99, 132, 0.4)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
          },
          {
            label: "Recomendar 1",
            data: [21],
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
          },
          {
            label: "60km",
            data: [15],
            fill: false,
            backgroundColor: "rgba(54, 162, 235, 0.4)",
            borderColor: "rgb(54, 162, 235)",
            barPercentage: 0.8,
            borderWidth: 1,
          },
          {
            label: "100km",
            data: [20],
            fill: false,
            backgroundColor: "rgba(153, 102, 255, 0.4)",
            borderColor: "rgb(153, 102, 255)",
            barPercentage: 0.8,
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        indexAxis: "y",
        plugins: {
          title: {
            fontSize: 25,
            display: true,
            text: "Insignias usabilidad más conseguidas por los usuarios",
          },
          legend: {
            display: true,
            position: "bottom",
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
      currentPage: "",
      dropdowns: {
        dropdownSC: false,
        dropdownFFC: false,
        dropdownS: false,
      },
      users: [
        { Insignias_Usabilidad: "Nombre Insignia", Cantidad_Usuarios: 10 },
        { Insignias_Usabilidad: "Nombre Insignia", Cantidad_Usuarios: 5 },
        { Insignias_Usabilidad: "Nombre Insignia", Cantidad_Usuarios: 15 },
        { Insignias_Usabilidad: "Nombre Insignia", Cantidad_Usuarios: 2 },
      ],
      showModal: false,
      showModal2: false,
      cupones: [
        { num: 1, cupon: 20 },
        { num: 2, cupon: 0 },
        { num: 3, cupon: 20 },
      ],
    };
  },
  computed: {
    usabilidadInsignias() {
      return this.insignias.filter(
        (insignia) => insignia.tipo === "usabilidad"
      );
    },
  },
  mounted() {
    const apiUrl =
      "https://backend-clipp-production.up.railway.app/api/insignias";

    axios.get(apiUrl).then((response) => {
      this.insignias = response.data;
    });
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
  border: 1px solid #202d8d;
}

.button-content {
  display: flex;
  align-items: center;
}

.insigniasU {
  width: 700px;
  height: auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}

.insigniasU img {
  width: 85px;
  height: auto;
}

.insigniasU p {
  color: #6d6d6d;
  text-align: center;
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.insignia {
  padding: 10px 5px 10px 5px;
}
</style>