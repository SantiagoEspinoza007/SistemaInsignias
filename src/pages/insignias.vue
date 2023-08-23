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
                  <img src="../img/Fidelizacion-b.svg" alt="Fidelizacion">
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
                  <img src="../img/upload-w.svg" alt="Insignias">
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
      <div class="border h-full border-cyan-600 rounded-md border-2 p-8 flex">
        <div class="col-cargarinfo">
          <div class="form-actividades rounded-md bg-white w-[600px] p-2 mb-4">
            <form>
              <h2>Actividades</h2>
              <div class="contenido flex">
                <div class="actividades-labels mt-4">
                  <h4 class="mb-6">Descripción</h4>
                  <h4 class="mb-6">Cantidad</h4>
                  <h4 class="mb-6">Progreso</h4>
                </div>
                <div class="actividades-inputs">
                  <input class="input-global" type="text" v-model="formularios[0].titulo" placeholder="Titulo de la actividad">
                  <input class="input-global" type="text" v-model="formularios[0].cantidad" placeholder= "# de acciones para completar actividad">
                  <input class="input-global" type="text" v-model="formularios[0].descripcion" placeholder="Descripción para completar la actividad">
                </div>
                <div class="actividades-botones flex flex-col items-end mt-2">
                  <button class="button-global text-[#FF0000FF]" type="button">
                    <span>Eliminar</span>
                  </button>
                  <button class="button-global text-[#2794F8]" type="button">
                    <span>Editar</span>
                  </button>
                  <button @click="enviarFormulario(0)"
                          :disabled="!formularioCompleto(0)"
                          :class="{'button-block': !formularioCompleto(0)}"
                          class="button-global text-[#2794F8]">
                    <span>Guardar</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="form-insignias rounded-md bg-white w-[600px] p-2 mb-4">
            <form>
              <h3>Insignias</h3>
              <div class="contenido flex">
                <div class="insignias-labels mt-4">
                  <label class="mb-6">Título</label>
                  <h4 class="mb-6">Tipo</h4>
                  <h4 class="mb-6">Actividad</h4>
                  <h4 class="mb-6">Servicio</h4>
                  <h4 class="mb-6">Imágen</h4>
                </div>
                <div class="insignias-inputs">
                  <input class="input-global" v-model="formularios[1].titulo" type="text" placeholder="Nombre de la insignia" name="descripcion">
                  <DropdownMenu :options="menuOptions" class="despegable-global" v-model="formularios[1].tipo" placeholder="Elige el tipo de insignia al que pertenece"/>
                  <input class="input-global" v-model="formularios[1].actividad" placeholder="Busca la actividad">
                  <DropdownMenu :options="menuOptions" class="despegable-global" v-model="formularios[1].servicio" />
                  <div class="cargarImagen flex">
                    <div class="view-Imagen">
                      <canvas ref="canvas" width="100" height="100" style="display: none;"></canvas>
                      <img v-if="formularios[1].imagenPrevia" :src="formularios[1].imagenPrevia" alt="Previsualización de la imagen">
                    </div>
                    <div class="self-end ml-4">
                      <label class="upload-buttom">
                        <img src="../img/upload-bk.svg" alt="upload" class="icono">
                        <span>Cargar</span>
                        <input type="file" style="display: none" accept="image/*" @change="previsualizarImagen($event, 1)"/>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="insignias-botones flex flex-col items-end mt-2 ml-auto">
                  <button class="button-global text-[#FF0000FF]" type="button">
                    <span>Eliminar</span>
                  </button>
                  <button class="button-global text-[#2794F8]" type="button">
                    <span>Editar</span>
                  </button>
                  <button @click="enviarFormulario(1)"
                          :disabled="!formularioCompleto(1)"
                          :class="{'button-block': !formularioCompleto(1)}"
                          class="button-global text-[#2794F8]">
                    <span>Guardar</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="form-publicidad rounded-md bg-white w-[600px] p-4 mb-4">
            <form >
              <h3 class="mb-4">Publicidad</h3>
              <div class="contenido flex">
                <div class="publicidad-labels mt-4">
                  <h4 class="mb-6">Imágen</h4>
                </div>
                <div class="publicidad-inputs w-[75%] mb-4">
                  <div class="cargarImagen flex">
                    <div class="view-Imagen items-center">
                      <canvas ref="canvas" width="100" height="10" style="display: none;"></canvas>
                      <img v-if="formularios[2].imagenPrevia" :src="formularios[2].imagenPrevia" alt="Previsualización de la imagen">
                    </div>
                    <div class="ml-4 self-end">
                      <label class="upload-buttom">
                        <img src="../img/upload-bk.svg" alt="upload" class="icono">
                        <span>Cargar</span>
                        <input type="file" style="display: none" accept="image/*" @change="previsualizarImagen($event,2)"/>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="publicidad-botones flex flex-col items-end mt-2">
                  <button class="button-global text-[#FF0000FF]" type="button">
                    <span>Eliminar</span>
                  </button>
                  <button @click="enviarFormulario(0)"
                          :disabled="!formularioCompleto(0)"
                          :class="{'button-block': !formularioCompleto(0)}"
                          class="button-global text-[#2794F8]">
                    <span>Guardar</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="publicidad-img rounded-md bg-white w-[600px] grid p-2">
            <img src="/img/Publicidad%20%23celular.png" width="75" alt="publicidad">
          </div>
        </div>
        <div class="col-tablas ml-8">
          <div>
            <!-- Barra de búsqueda -->
            <div class="search-bar">
              <input type="text" v-model="busqueda">
              <button @click="buscar"><i class="fas fa-search"></i></button>
            </div>
            <div class="despegables flex gap-1">
              <DropdownMenu :options="menuOptions" class="despegable-global" placeholder="Todos los servicios" />
              <DropdownMenu :options="menuOptions" class="despegable-global" placeholder="Tipo de insignia"/>
            </div>

            <!-- Tabla de datos -->
            <table class="data-table table-auto rounded-md bg-white mb-8">
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
              <!-- Aquí generas dinámicamente las filas de la tabla con v-for -->
              <tr v-for="item in filtrarItems">
                <td class="hidden">{{ item.id }}</td>
                <td>{{ item.insignias }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ item.actividad }}</td>
                <td>{{ item.cantidad }}</td>
              </tr>
              </tbody>
            </table>

            <!-- Paginación (puedes usar una biblioteca como vue-pagination) -->
            <pagination
                :current-page="paginaActual"
                :total-items="totalItems"
                @page-changed="cambiarPagina"
            ></pagination>
          </div>

          <div class="form-cupones rounded-md bg-white w-[600px] p-4 mb-4">
            <form>
              <h3 class="mb-4">Cupones</h3>
              <div class="contenido flex">
                <div class="cupones-labels ">
                  <h4 class="mb-6">% de Descuento</h4>
                  <h4 class="mb-6">Descripcion</h4>
                  <h4 class="mb-6">Fecha</h4>
                  <h4 class="mb-6">Tiempo</h4>
                  <h4 class="mb-6">Imágen</h4>
                </div>
                <div class="cupones-inputs mb-4">
                  <input class="input-global" v-model="formularios[3].porceDescuento" type="text" placeholder="%" name="descripcion">
                  <input class="input-global" v-model="formularios[3].descripcion" type="text" placeholder="Descuento de (...)">
                  <DropdownMenu :options="menuOptions" class="despegable-global" />
                  <DropdownMenu :options="menuOptions" class="despegable-global" />
                  <div class="cargarImagen flex">
                    <div class="view-Imagen">
                      <canvas ref="canvas" width="75" height="75" style="display: none;"></canvas>
                      <img v-if="formularios[3].imagenPrevia" :src="formularios[3].imagenPrevia" alt="Previsualización de la imagen">
                    </div>
                    <div class="self-end ml-4">
                      <label class="upload-buttom">
                        <img src="../img/upload-bk.svg" alt="upload" class="icono">
                        <span>Cargar</span>
                        <input type="file" style="display: none" accept="image/*" @change="previsualizarImagen($event,3)"/>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="cupones-botones flex flex-col items-end mt-2">
                  <button class="button-global text-[#FF0000FF]" type="button">
                    <span>Eliminar</span>
                  </button>
                  <button class="button-global text-[#2794F8]" type="button">
                    <span>Editar</span>
                  </button>
                  <button class="button-global text-[#2794F8]" type="button">
                    <span>Guardar</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="cont-Insignia block">
          <div class="buscar-input">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DropdownMenu from '@/components/DropdownMenu.vue';
export default {
  components: {
    DropdownMenu
  },
  data() {
    return {
      busqueda: '',
      paginaActual: 1,
      elementosPorPagina: 5,
      items: [
        { id: 1, insignias: 'Insignia 1', tipo: 'Tipo A', actividad: 'Actividad 1', cantidad: 10 },
        { id: 2, insignias: 'Insignia 2', tipo: 'Tipo B', actividad: 'Actividad 2', cantidad: 5 },
        { id: 3, insignias: 'Insignia 3', tipo: 'Tipo A', actividad: 'Actividad 1', cantidad: 41 },
        { id: 4, insignias: 'Insignia 4', tipo: 'Tipo B', actividad: 'Actividad 2', cantidad: 25 },
        { id: 5, insignias: 'Insignia 5', tipo: 'Tipo A', actividad: 'Actividad 1', cantidad: 13 },
      ],
      formularios: [
        {
          titulo: '',
          cantidad: '',
          descripcion: '',
        },
        {
          titulo: '',
          tipo: '',
          actividad: '',
          servicio: '',
          imagen: null,
          imagenPrevia: null,
        },
        {
          imagen: null,
          imagenPrevia: null,
        },
        {
          porceDescuento: '',
          descripcion: '',
          fecha: '',
          tiempo: '',
          imagen: null,
          imagenPrevia: null,
        }
      ],
      menuOptions: ['A', 'B', 'C'],
      currentPage: '',
      showModal: false,
      showModal2: false,
      cupones: [
        {num: 1, cupon: 20},
        {num: 2, cupon: 0},
        {num: 3, cupon: 20},
      ],
    }
  },
  mounted() {
    this.currentPage = this.$route.path;
  },
  methods: {
    previsualizarImagen(event, index) {
      const archivo = event.target.files[0];
      const formulario = this.formularios[index];

      if (archivo) {
        const lector = new FileReader();

        lector.onload = (e) => {
          formulario.imagenPrevia = e.target.result;

          const canvas = this.$refs.canvas;
          const context = canvas.getContext('2d');
          const img = new Image();

          img.onload = () => {
            context.drawImage(img, 0, 0, 70, 70);
            formulario.imagenPrevia = canvas.toDataURL('image/png');
          };

          img.src = e.target.result;
        };

        lector.readAsDataURL(archivo);
      } else {
        formulario.imagenPrevia = null;
      }
    },
    enviarFormulario: function (index) {
      const formulario = this.formularios[index];
      console.log(formulario);
    },
    buscar() {
      // vincular API
    },
    cambiarPagina(numeroPagina) {
      this.paginaActual = numeroPagina;
    }
  },
  computed: {
    formularioCompleto() {
      return (index) => {
        const formulario = this.formularios[index];
        return formulario.titulo.trim() !== '' &&
            formulario.cantidad.trim() !== '' &&
            formulario.descripcion.trim() !== ''
      };
    },
    filtrarItems() {
      const busqueda = this.busqueda.toLowerCase();
      return this.items.filter(item =>
          item.insignias.toLowerCase().includes(busqueda) ||
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
  }
};
</script>
<style>
.aggCupon {
  background-color: white;
  padding: 10px;
  border-bottom: 25px;
}

.upload-buttom {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  width: 100px;
  height: 50px;
}

.icono {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.texto {
  margin-left: 5px;
}

.cargarInsignia {
  display: flex;
  align-items: flex-end;
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

.view-Imagen {
  position: relative;
  margin-top: 20px;
  margin-left: 25px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 160px;
  height: 75px;
}

.modal-buttom {
  display: flex;
  align-items: center;
  padding: 5px;
  color: #2794F8;
  border: 2px solid #2794F8;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  width: 75px;
  height: 25px;
  text-align: center;
  margin-top: 10px;
  left: 80%;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.submit-Button {
  margin-top: 25px;
  background-color: white;
  border: 2px solid rgb(243 244 246);
  border-radius: 8px;
  color: #2794F8;
  cursor: pointer;
  position: relative;
  width: 100px;
  height: 50px;
}

.input-global {
  margin-left: 25px;
  margin-top: 10px;
  position: relative;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 75%;
  padding: 5px;
}

input[type="file"]{
  color: transparent;
}

.button-global {
  margin-bottom: 12px;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  width: 100px;
  height: 35px;
}

.button-block {
  margin-bottom: 12px;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  width: 100px;
  height: 35px;
  color: #ccc;
}

.despegable-global {
  margin-left: 25px;
  margin-top: 10px;
  position: relative;
  width: 100%;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.search-bar input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-bar button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

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

.hidden {
  display: none;
}
</style>