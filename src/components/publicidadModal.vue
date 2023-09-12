<template>
  <button class="buscarButton"
          type="button"
          @click="showModal = true"
  >
    Buscar
  </button>
  <transition name="fade">
    <div class="modal-overlay" v-if="showModal">
    </div>
  </transition>

  <transition name="fade">
    <div class="modal w-[500px] h-[300px]" v-if="showModal">
      <p class="mb-4 font-extrabold">Buscar Publicidad</p>
      <div class="publicidad-img rounded-md bg-white w-[450px] p-2">
        <table id="tabla" class="table-auto rounded-md bg-white p-4">
          <tr>
            <th class="hidden">ID</th>
          </tr>
          <tr>
            <td class="border px-8"
                v-for="(publicidad, index) in itemsPaginaActual"
                :key="index"
                @dblclick="enviarTexto(publicidad), showModal = false">
              <img :src="publicidad.imagenUrl" alt="publicidad" width="75" height="75">
            </td>
          </tr>
        </table>
        <div class="paginacion">
          <button type="button" v-if="paginaActual > 1" @click="paginaActual--;">Anterior Pagina</button>
          <span>{{ paginaActual }}</span>
          <button type="button" v-if="paginaActual < totalPaginas" @click="paginaActual++;">Siguiente Pagina</button>
        </div>
      </div>
      <button @click="showModal=false" class="modalButtom mt-6" type="button">
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
  data() {
    return {
      showModal: false,
      listaPublicidad: [],
      modalVisible: false,
      paginaActual: 1,
      elementosPorPagina: 3,
    };
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.listaPublicidad.length / this.elementosPorPagina);
    },
    primerIndicePagina() {
      return (this.paginaActual - 1) * this.elementosPorPagina;
    },
    ultimoIndicePagina() {
      return this.paginaActual * this.elementosPorPagina;
    },
    itemsPaginaActual() {
      return this.listaPublicidad.slice(this.primerIndicePagina, this.ultimoIndicePagina);
    },
  },
  mounted() {
    axios.get("http://backend-clipp-production-2fcb.up.railway.app/api/publicidad")
        .then((response) => {
          this.listaPublicidad = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener la lista de publicidad:", error);
        });
  },
  methods: {
    enviarTexto(publicidad) {
      this.$emit("enviarPublicidad", publicidad);
      this.showModal = false;
    },
  },
};

</script>

<style>
.buscarButton {
  color: #2794F8;
  margin-bottom: 12px;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  width: 100px;
  height: 35px;
}

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