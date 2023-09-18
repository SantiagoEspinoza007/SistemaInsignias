<template>
  <button class="mt-2"
          type="button"
          @click="showModal = true"
  >
    <img src="../img/search.svg" alt="search" width="24" height="24">
  </button>
  <transition name="fade">
    <div class="modal-overlay" v-if="showModal">
    </div>
  </transition>

  <transition name="fade">
    <div class="modal" v-if="showModal">
      <p class="mb-4 font-extrabold">Buscar Actividad</p>
      <!-- Barra de búsqueda -->
      <div class="search-bar justify-center w-[500px]">
        <input type="text" v-model="busqueda" placeholder="Ingrese el titulo de la actividad">
      </div>
      <div class="table-Modal flex flex-col">
        <table id="tabla" class="table-auto rounded-md bg-white mb-4">
          <thead>
          <tr>
            <th class="hidden px-8 py-2">ID</th>
            <th class="px-8 py-2">Titulo</th>
            <th class="px-8 py-2">Cantidad</th>
            <th class="px-8 py-2">Descripción</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(insignia, index) in itemsPaginaActual"
              :key="index"
              @dblclick="enviarTexto(insignia), showModal = false"
          >
            <td class="hidden border px-8 py-2">{{ insignia.id }}</td>
            <td class="titulo border px-8 py-2">{{ insignia.nombre }}</td>
            <td class="border px-8 py-2">{{ insignia.total }}</td>
            <td class="border px-8 py-2">{{ insignia.descripcion }}</td>
          </tr>
          </tbody>
        </table>
        <div class="paginacion">
          <button type="button" v-if="paginaActual > 1" @click="paginaActual--;">Anterior Pagina</button>
          <span>{{ paginaActual }}</span>
          <button type="button" v-if="paginaActual < paginas" @click="paginaActual++;">Siguiente Pagina</button>
        </div>
      </div>
      <button @click="showModal=false" class="modalButtom" type="button">
        <span>Cancelar</span>
      </button>
    </div>
  </transition>
</template>

<script>
import FormInsignias from "@/components/FormInsignias.vue";
import axios, {Axios} from "axios";

export default {
  components: {
    FormInsignias
  },
  props: {
    fila: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      listaInsignias: [],
      busqueda: '',
      paginaActual: 1,
      elementosPorPagina: 4,
      totalItems: 6,
      paginas: 0,
      itemsPaginaActual: [],
      modalVisible: false,
      actividad: '',
      actividadTitulo: '',
    };
  },
  computed: {
    filtrarInsignias() {
      const busqueda = this.busqueda.toLowerCase();
      return this.listaInsignias.filter(insignia =>
          insignia.id.toString().includes(busqueda) ||
          insignia.nombre.toLowerCase().includes(busqueda)
      );
    },
    totalPaginas() {
      return Math.ceil(this.filtrarInsignias.length / this.elementosPorPagina);
    },
    // Calcular el índice del último elemento en la página actual
    ultimoIndicePagina() {
      return this.paginaActual * this.elementosPorPagina;
    },
    // Calcular el índice del primer elemento en la página actual
    primerIndicePagina() {
      return this.ultimoIndicePagina - this.elementosPorPagina;
    },
    // Obtener el total de elementos después de la búsqueda
    totalItems() {
      return this.filtrarInsignias.length;
    },
    itemsPaginaActual() {
      return this.filtrarInsignias.slice(this.primerIndicePagina, this.ultimoIndicePagina);
    },
  },
  mounted() {
    axios.get("http://backend-clipp-production-2fcb.up.railway.app/api/actividades")
        .then((response) => {
          // Actualiza la lista de insignias con los datos obtenidos del backend
          this.listaInsignias = response.data;
          this.paginas = this.totalPaginas;
        })
        .catch((error) => {
          console.error("Error al obtener la lista de actividades:", error);
        });
  },
  methods: {
    enviarTexto(insignia) {
      this.$emit('enviarActividadId', insignia.id);
      this.$emit('enviarActividadTitulo', insignia.nombre);
      this.showModal = false;
    },
  },
};

</script>

<style>
.modal-overlay {
  position: absolute;
  height: 1000px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(243 244 246);
  padding: 20px;
  border-radius: 15px;
  z-index: 101;
}

.hidden {
  display: none;
}

.paginacion {
  color: #cccccc;
  display: flex;
  justify-content: space-between;
}

.paginacion button {
  color: #cccccc;
  margin-bottom: 20px;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  width: 150px;
  height: 35px;
}

.modalButtom {
  display: flex;
  justify-content: center;
  padding: 5px;
  color: #FF0000FF;
  border: 2px solid #FF0000FF;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  width: 125px;
  height: 40px;
  text-align: center;
  left: 75%;
}
</style>