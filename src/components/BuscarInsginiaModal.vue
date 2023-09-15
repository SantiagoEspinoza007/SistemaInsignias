<template class="data-table">
  <button type="button"
          class="button-Insignias text-[#2794F8]"
          @click="showModal2 = true"
  >
    <span>Buscar</span>
  </button>
  <transition name="fade">
    <div class="modal-overlay" v-if="showModal2">
    </div>
  </transition>

  <transition name="fade">
    <div class="modal" v-if="showModal2">
      <p class="mb-4 font-extrabold">Buscar Insignias</p>
      <!-- Barra de búsqueda -->
      <div class="search-bar justify-center">
        <input type="text" v-model="busqueda" placeholder="Ingrese el titulo de la Insignia">
        <div class="despegables flex gap-1">
          <DropdownMenu :options="servicioOptions"
                         class="despegable-global"
                         placeholder="Todos los servicios"
          />
          <DropdownMenu v-model="tipoInsigniaSeleccionada"
                         :options="tipoInsigniaOptions"
                         id="tipoInsigniaSeleccionada"
                         class="despegable-global"
                         placeholder="Tipo de insignia"
                         @option-selected="updateTipo"
          />
        </div>
      </div>
      <div class="tableInsignias flex flex-col">
        <table id="tabla" class="data-table table-auto rounded-md bg-white mb-2">
          <thead>
          <tr>
            <th class="hidden">ID</th>
            <th>Insignia</th>
            <th>Titulo</th>
            <th>Tipo</th>
            <th class="hidden">IDActividad</th>
            <th>Actividad Asignada</th>
            <th>Cantidad</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in itemsPaginaActual1"
              :key="index"
              @dblclick="enviarItem(item), showModal2 = false"
          >
            <td class="hidden">{{ item.id }}</td>
            <td class="border px-8">
              <img :src="item.imagenUrl" alt="Insignia" width="45" height="45">
            </td>
            <td class="border px-8 py-2">{{ item.titulo }}</td>
            <td class="border px-8 py-2">{{ item.tipo }}</td>
            <td class="hidden">{{ item.actividad.id }}</td>
            <td class="border px-8 py-2">{{ item.actividad.nombre }}</td>
            <td class="border px-8 py-2">{{ item.actividad.total }}</td>
          </tr>
          </tbody>
        </table>
        <div class="paginacion1">
          <button v-if="paginaActual1 > 1" @click="paginaActual1--;">Anterior Pagina</button>
          <button v-if="paginaActual1 < paginas1" @click="paginaActual1++;">Siguiente Pagina</button>
        </div>
      </div>
      <button @click="showModal2=false" class="modalButtom" type="button">
        <span>Cancelar</span>
      </button>
    </div>
  </transition>

</template>
<script>
import DropdownMenuW from "@/components/DropdownMenuW.vue";
import axios from "axios";
import DropdownMenu from "@/components/DropdownMenu.vue";


export default {
  components: {DropdownMenu, DropdownMenuW},
  data() {
    return{
      showModal2: false,
      modalVisible: false,
      busqueda: '',
      servicioOptions: ['KTaxi'],
      tipoInsigniaOptions: ['fidelización', 'usabilidad'],
      tipoInsigniaSeleccionada: '',
      insignia: '',
      paginaActual1: 1,
      elementosPorPagina1: 4,
      totalItems1: [],
      paginas1: 0,
      itemsPaginaActual1: [],
      tableOptions: [],
    }
  },
  methods: {
    cambiarPagina(numeroPagina) {
      this.paginaActual1 = numeroPagina;
    },
    enviarItem(insignia) {
      this.$emit("enviarInsignia", insignia)
      this.$emit('enviarActividadTitulo', insignia.actividad.nombre);
      this.showModal2 = false;
    },
    updateTipo(option) {
      this.tipoInsigniaSeleccionada = option.toLowerCase();
    },
  },

  computed: {
    filtrarItems() {
      const busqueda = this.busqueda.toLowerCase();
      // console.log("Busqueda:", busqueda);
      // console.log("TipoInsigniaSeleccionada:", this.tipoInsigniaSeleccionada);
      return this.tableOptions.filter(item =>
          (item.titulo.toLowerCase().includes(busqueda) || busqueda === '') &&
          (this.tipoInsigniaSeleccionada === '' || item.tipo.toLowerCase() === this.tipoInsigniaSeleccionada)
      );
    },
    totalPaginas1() {
      return Math.ceil(this.filtrarItems.length / this.elementosPorPagina1);
    },
    // Calcular el índice del último elemento en la página actual
    ultimoIndicePagina1() {
      return this.paginaActual1 * this.elementosPorPagina1;
    },
    // Calcular el índice del primer elemento en la página actual
    primerIndicePagina1() {
      return this.ultimoIndicePagina1 - this.elementosPorPagina1;
    },
    // Obtener los elementos de la página actual
    itemsPaginaActual1() {
      return this.filtrarItems.slice(this.primerIndicePagina1, this.ultimoIndicePagina1);
    },
    // Obtener el total de elementos después de la búsqueda
    totalItems1() {
      return this.filtrarItems.length;
    }
  },
  mounted() {
    axios.get("http://backend-clipp-production-2fcb.up.railway.app/api/insignias")
        .then((response) => {
          this.tableOptions = response.data;
          this.paginas1 = this.totalPaginas1;
        })
        .catch((error) =>{
          console.error("Error al obtener las insignias: ", error)
        });
  },
};
</script>
<style>
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.data-table th,
.data-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.paginacion1 {
  color: #cccccc;
  display: flex;
  justify-content: space-between;
}

.paginacion1 button {
  color: #202D8D;
  margin-bottom: 20px;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  width: 150px;
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

.button-Insignias{
  margin-bottom: 12px;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  width: 100px;
  height: 35px;
}
</style>