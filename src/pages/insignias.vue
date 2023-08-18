<template>
  <div class="layout w-screen h-screen flex">
    <!--  Side Bar -->
    <div class="sideBar w-[400px] h-[1750px]">
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
    <div class="main w-[1800px] h-[1750px] bg-clipAzul p-6">
      <div class="border h-full border-cyan-600 rounded-md border-2 p-12 flex">
        <div class="col-cargarinfo">
          <div class="card-actividades rounded-md bg-white w-[600px] p-4 mb-4">
            <h3 class="mb-4">Actividades</h3>
            <div class="contenido flex">
              <div class="actividades-labels mt-4">
                <h4 class="mb-6">Descripción</h4>
                <h4 class="mb-6">Cantidad</h4>
                <h4 class="mb-6">Progreso</h4>
              </div>
              <div class="actividades-inputs mb-4">
                <input class="input-global" type="text" placeholder="Descripción general de la actividad" name="descripcion">
                <input class="input-global" type="number" placeholder="# de acciones para completar actividad" name="cantidad" min="1">
                <DropdownMenu :options="menuOptions" class="despegable-global" />
              </div>
              <div class="actividades-botones flex flex-col items-end mt-2">
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
          </div>
          <div class="card-insignias rounded-md bg-white w-[600px] p-4 mb-4">
            <h3 class="mb-4">Insignias</h3>
            <div class="contenido flex">
              <div class="insignias-labels mt-4">
                <h4 class="mb-6">Título</h4>
                <h4 class="mb-6">Tipo</h4>
                <h4 class="mb-6">Actividad</h4>
                <h4 class="mb-6">Servicio</h4>
                <h4 class="mb-6">Imágen</h4>
              </div>
              <div class="insignias-inputs mb-4">
                <input class="input-global" type="text" placeholder="Descripción general de la actividad" name="descripcion">
                <input class="input-global" type="number" placeholder="# de acciones para completar actividad" name="cantidad" min="1">
                <input class="input-global" type="text" placeholder="Cantidad para completar la actividad" name="descripcion">
                <DropdownMenu :options="menuOptions" class="despegable-global" />
                <div class="cargarImagen flex">
                  <div class="view-Imagen">
                    <canvas ref="canvas" width="100" height="100" style="display: none;"></canvas>
                    <img v-if="imagenPrevia" :src="imagenPrevia" alt="Previsualización de la imagen">
                  </div>
                  <div class="self-end ml-4">
                    <label class="upload-buttom">
                      <img src="../img/upload-bk.svg" alt="upload" class="icono">
                      <span>Cargar</span>
                      <input type="file" style="display: none" accept="image/*" @change="previsualizarImagen"/>
                    </label>
                  </div>
                </div>
              </div>
              <div class="insignias-botones flex flex-col items-end mt-2">
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
          </div>
          <div class="card-publicidad rounded-md bg-white w-[600px] p-4 mb-4">
            <h3 class="mb-4">Publicidad</h3>
            <div class="contenido flex">
              <div class="publicidad-labels mt-4">
                <h4 class="mb-6">Imágen</h4>
              </div>
              <div class="publicidad-inputs w-[75%] mb-4">
                <div class="cargarImagen flex">
                  <div class="view-Imagen">
                    <canvas ref="canvas" width="100" height="100" style="display: none;"></canvas>
                    <img v-if="imagenPrevia" :src="imagenPrevia" alt="Previsualización de la imagen">
                  </div>
                  <div class="ml-4 self-end">
                    <label class="upload-buttom">
                      <img src="../img/upload-bk.svg" alt="upload" class="icono">
                      <span>Cargar</span>
                      <input type="file" style="display: none" accept="image/*" @change="previsualizarImagen"/>
                    </label>
                  </div>
                </div>
              </div>
              <div class="publicidad-botones flex flex-col items-end mt-2">
                <button class="button-global text-[#FF0000FF]" type="button">
                  <span>Eliminar</span>
                </button>
                <button class="button-global text-[#2794F8]" type="button">
                  <span>Guardar</span>
                </button>
              </div>
            </div>
          </div>
          <div class="card-cupones rounded-md bg-white w-[600px] p-4 mb-4">
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
                <input class="input-global" type="text" placeholder="Descripción general de la actividad" name="descripcion">
                <input class="input-global" type="number" placeholder="# de acciones para completar actividad" name="cantidad" min="1">
                <input class="input-global" type="text" placeholder="Cantidad para completar la actividad" name="descripcion">
                <DropdownMenu :options="menuOptions" class="despegable-global" />
                <div class="cargarImagen flex">
                  <div class="view-Imagen">
                    <canvas ref="canvas" width="100" height="100" style="display: none;"></canvas>
                    <img v-if="imagenPrevia" :src="imagenPrevia" alt="Previsualización de la imagen">
                  </div>
                  <div class="self-end ml-4">
                    <label class="upload-buttom">
                      <img src="../img/upload-bk.svg" alt="upload" class="icono">
                      <span>Cargar</span>
                      <input type="file" style="display: none" accept="image/*" @change="previsualizarImagen"/>
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
      menuOptions: ['A', 'B', 'C'],
      currentPage: '',
      imagenPrevia: null,
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
    previsualizarImagen(event) {
      const archivo = event.target.files[0];

      if (archivo) {
        const lector = new FileReader();

        lector.onload = (e) => {
          this.imagenPrevia = e.target.result;

          // Ajustar la imagen a 100x100 píxeles usando un canvas
          const canvas = this.$refs.canvas;
          const context = canvas.getContext('2d');
          const img = new Image();

          img.onload = () => {
            context.drawImage(img, 0, 0, 100, 100);
            this.imagenPrevia = canvas.toDataURL('image/png');
          };

          img.src = e.target.result;
        };

        lector.readAsDataURL(archivo);
      } else {
        this.imagenPrevia = null;
      }
    },
  },
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
  width: 150px;
  height: 150px;
  padding: 5px;
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
.despegable-global {
  margin-left: 25px;
  margin-top: 10px;
  position: relative;
  width: 75%;
}

</style>