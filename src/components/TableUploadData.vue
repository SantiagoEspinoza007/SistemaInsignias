<template class="data-table">
  <!-- Barra de búsqueda -->
  <div class="search-bar justify-center">
    <input type="text" v-model="busqueda">
    <div class="despegables flex gap-1">
      <DropdownMenu :options="servicioOptions" class="despegable-global" placeholder="Todos los servicios" />
      <DropdownMenu :options="tipoInsigniaOptions" class="despegable-global" placeholder="Tipo de insignia"/>
    </div>
  </div>
  <div class="tableInsignias flex flex-col">
    <table id="tabla" class="data-table table-auto rounded-md bg-white mb-2">
      <thead>
      <tr>
        <th class="hidden">ID</th>
        <th>Insignias Cargadas</th>
        <th>Tipo</th>
        <th>Actividad Asignada</th>
        <th>Cantidad</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in itemsPaginaActual"
          :key="index"
          @dblclick="enviarItem(item)">
        <td class="hidden">{{ item.id }}</td>
        <td class="border px-8 py-2">{{ item.insignias }}</td>
        <td class="border px-8 py-2">{{ item.tipo }}</td>
        <td class="border px-8 py-2">{{ item.actividad }}</td>
        <td class="border px-8 py-2">{{ item.cantidad }}</td>
      </tr>
      </tbody>
    </table>
    <div class="paginacion">
      <button v-if="paginaActual > 1" @click="paginaActual--;">Anterior Pagina</button>
      <span>{{ paginaActual }}</span>
      <button v-if="paginaActual < paginas" @click="paginaActual++;">Siguiente Pagina</button>
    </div>
  </div>
</template>
<script>
import DropdownMenu from "@/components/DropdownMenu.vue";

export default {
  components: {DropdownMenu},
  data() {
    return{
      busqueda: '',
      servicioOptions: ['KTaxi'],
      tipoInsigniaOptions: ['Fidelizacion', 'Usabilidad'],
      insignia: '',
      paginaActual: 1,
      elementosPorPagina: 5,
      totalItems: 9,
      paginas: 0,
      itemsPaginaActual: [],
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    fila: {
      type: Object,
      required: true,
    },
  },
  methods: {
    cambiarPagina(numeroPagina) {
      this.paginaActual = numeroPagina;
    },
    enviarItem(fila) {
      this.actividad = fila;
      this.$emit("enviarActividad", this.actividad);
    },
  },
  computed: {
    filtrarItems() {
      const busqueda = this.busqueda.toLowerCase();
      return this.options.filter(item =>
          item.tipo.toLowerCase().includes(busqueda) ||
          item.actividad.toLowerCase().includes(busqueda) ||
          item.cantidad.toString().includes(busqueda)
      );
    },
    totalPaginas() {
      return Math.ceil(this.filtrarItems.length / this.elementosPorPagina);
    },
    // Calcular el índice del último elemento en la página actual
    ultimoIndicePagina() {
      return this.paginaActual * this.elementosPorPagina;
    },
    // Calcular el índice del primer elemento en la página actual
    primerIndicePagina() {
      return this.ultimoIndicePagina - this.elementosPorPagina;
    },
    // Obtener los elementos de la página actual
    itemsPaginaActual() {
      return this.filtrarItems.slice(this.primerIndicePagina, this.ultimoIndicePagina);
    },
    // Obtener el total de elementos después de la búsqueda
    totalItems() {
      return this.filtrarItems.length;
    }
  },
  mounted() {
    this.paginas = this.totalPaginas;
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

</style>