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
                  <img src="../img/Fidelizacion-w.svg" alt="Fidelizacion" />
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
                  <img src="../img/Usabilidad-b.svg" alt="Usabilidad" />
                  <span>Usabilidad</span>
                </div>
              </button>
            </router-link>
          </li>
          <li class="absolute bottom-0">
            <router-link to="/administrador">
              <button
                :class="[
                  'button',
                  { 'active-button': currentPage === '/administrador' },
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
          <dropdown-menu :options="optionsF" class="w-[200px]"></dropdown-menu>

          <div class="insigniasF mt-10">
            <h3 class="text-2xl font-bold mb-4 text-center p-7">
              Insignias de Fidelización
            </h3>
            <div class="grid grid-cols-6 gap-4">
              <div v-for="insignia in fidelizacionInsignias" :key="insignia.id">
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
          <input class="inputFechaF w-56" type="date">
          <div class="FchartCard text-gray-600 mt-20 mb-10">
            <!-- <Bar ref="myChart" :options="chartOptions" :data="chartData" /> -->
            <ChartComponent />
          </div>

          <table class="table-auto bg-white absolute">
            <thead>
              <tr>
                <th class="px-4 py-2 text-sm">Usuarios</th>
                <th class="px-4 py-2 text-sm">Insignias obtenidas</th>
                <th class="px-4 py-2 text-sm">Beneficios reclamados</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td class="border px-4 py-2">{{ user.nombre_usuario }}</td>
                <td class="border px-4 py-2">{{ user.total_insignias_fidelizacion }}</td>
                <td class="border px-4 py-2">
                  {{ user.total_beneficios }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartComponent from "../components/ChartComponent.vue";
import axios from "axios";

export default {
  components: { ChartComponent },
  data() {
    return {
      users: [],
      insignias: [],
      currentPage: "",
      dropdowns: {
        dropdownSC: false,
        dropdownFFC: false,
        dropdownS: false,
      },
      
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
    fidelizacionInsignias() {
      return this.insignias.filter(
        (insignia) => insignia.tipo === "fidelización"
      );
    },
  },
  mounted() {
    this.fetchUsersData();
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
    async fetchUsersData() {
      try {
        const response = await axios.get("https://backend-clipp-production.up.railway.app/api/consultas/tabla");
        console.log(response.data)
        this.users = response.data;
      } catch (error) {
        console.error(error);
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
.inputFechaF {
  position: absolute;
  border: 2px solid #ffffff;
  border-radius: 8px;
  height: 45px;
  padding: 5px;
}
</style>