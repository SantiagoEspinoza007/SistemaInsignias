<template>
  <button type="button"
          class="button-Cupones text-[#2794F8]"
          @click="showModal = true"
>
    <span>Buscar</span>
  </button>

  <transition name="fade">
    <div class="modal-overlay" v-if="showModal">
    </div>
  </transition>

  <transition name="fade">
    <div class="modal" v-if="showModal">
      <p class="mb-4 font-extrabold">Buscar Cupón</p>
      <!-- Barra de búsqueda -->
      <div class="search-bar justify-center w-[700px]">
        <input type="text" v-model="busqueda" placeholder="Ingrese la descripción del cupón">
      </div>
      <div class="table-Modal flex flex-col">
        <table id="tabla" class="table-auto rounded-md bg-white mb-4">
          <thead>
          <tr>
            <th class="hidden px-8 py-2">ID</th>
            <th class="px-8 py-2">%</th>
            <th class="px-8 py-2">Descripción</th>
            <th class="px-8 py-2">Fecha</th>
            <th class="px-8 py-2">Imágen</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(beneficio, index) in itemsPaginaActual"
              :key="index"
              @dblclick="enviarTexto(beneficio), showModal = false"
          >
            <td class="hidden border px-8 py-2">{{ beneficio.id }}</td>
            <td class="titulo border px-8 py-2">{{ beneficio.descuento }}</td>
            <td class="border px-8 py-2">{{ beneficio.descripcion }}</td>
            <td class="border px-8 py-2">{{ beneficio.fecha }}</td>
            <td class="border px-8 py-2">
              <img :src="beneficio.imagenUrl" alt="Insignia" width="45" height="45">
            </td>
          </tr>
          </tbody>
        </table>
        <div class="paginacion">
          <button v-if="paginaActual > 1" @click="paginaActual--;">Anterior Pagina</button>
          <span>{{ paginaActual }}</span>
          <button v-if="paginaActual < paginas" @click="paginaActual++;">Siguiente Pagina</button>
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
import axios from "axios";
export default {
  components: {
    FormInsignias
  },

  data() {
    return {
      showModal: false,
      listaBeneficios: [],
      busqueda: '',
      paginaActual: 1,
      elementosPorPagina: 4,
      totalItems: 6,
      paginas: 0,
      itemsPaginaActual: [],
      modalVisible: false,
      actividad: '',
    };
  },
  computed: {
    filtrarBeneficios() {
      const busqueda = this.busqueda.toLowerCase();
      return this.listaBeneficios.filter(beneficio =>
          beneficio.descripcion.toLowerCase().includes(busqueda)
      );
    },
    totalPaginas() {
      return Math.ceil(this.filtrarBeneficios.length / this.elementosPorPagina);
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
      return this.filtrarBeneficios.length;
    },
    itemsPaginaActual() {
      return this.filtrarBeneficios.slice(this.primerIndicePagina, this.ultimoIndicePagina);
    },
  },
  mounted() {
    axios.get("http://backend-clipp-production-2fcb.up.railway.app/api/beneficios")
        .then((response) => {
          this.listaBeneficios = response.data
          this.paginas = this.totalPaginas;
        })
        .catch((error) => {
          console.error("Error al obtener la lista de beneficios: ", error);
        });
  },
  methods: {
    enviarTexto(beneficio) {
      this.$emit("enviarBeneficio", beneficio)
      this.showModal = false;
    },
  },
};

</script>

<style>
.modal-overlay {
  position: absolute;
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