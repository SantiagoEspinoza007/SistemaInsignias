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
          <li class="mt-48">
            <router-link to="/insignias">
              <button :class="['button', { 'active-button': currentPage === '/insignias' }]">
                <div class="button-content">
                  <img src="../img/upload-b.svg" alt="Insignias">
                  <span>Insignias</span>
                </div>
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/publicidad">
              <button :class="['button', { 'active-button': currentPage === '/publicidad' }]">
                <div class="button-content">
                  <img src="../img/upload-w.svg" alt="Publicidad">
                  <span>Publicidad</span>
                </div>
              </button>
            </router-link>
          </li>
          <li>
            <button @click="showModal2 = true" class="menu-button" type="button">
              <img src="../img/upload-b.svg" alt="upload" class="icono">
              <span class="texto">Agregar Cupón</span>
            </button>
            <transition name="fade">
              <div class="modal-overlay" v-if="showModal2">
              </div>
            </transition>
            <transition name="fade">
              <div class="modal" v-if="showModal2">
                <div class="aggCupon">
                  <p class="mb-4">Agregar Cupón</p>
                  <label>Porcentaje de descuento</label>
                  <input id="input-Pdescuento" type="number" name="porcentaje" placeholder="%" min="0">
                </div>
                <div class="table-Modal">
                  <table class="table-auto rounded-md bg-white">
                    <thead>
                    <tr>
                      <th class="px-8 py-2">Número</th>
                      <th class="px-8 py-2">Cupón</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="cupon in cupones" :key="cupon.num">
                      <td class="border px-8 py-2">{{ cupon.num }}</td>
                      <td class="border px-8 py-2">{{ cupon.cupon}}</td>
                    </tr>
                    </tbody>
                  </table>
                  <button class="button-Eliminar" type="button">
                    <span>Eliminar</span>
                  </button>
                  <button class="button-Editar" type="button">
                    <span>Editar</span>
                  </button>
                </div>
                <button @click="showModal2= false" class="modal-buttom" type="button">
                  <span class="texto">Cerrar</span>
                </button>
              </div>
            </transition>
          </li>
        </ul>
      </div>
    </div>
    <!--  Main  -->
    <div class="main w-[1800px] h-[1000px] bg-clipAzul p-6">
      <div class="border h-full border-cyan-600 rounded-md border-2 p-12 flex">
        <div class="card rounded-md bg-gray-100 w-[600px] p-8">
          <form>
            <div class="card-Publicidad rounded-md bg-white w-[550px] p-6 block">
              <h3>Publicidad</h3>
              <div class="actividad m-4">
                <p>Actividad</p>
                <input id="input-actividad" type="text" name="actividad"
                       placeholder="Escribe la actividad que tendrán que completar para conseguir la nueva publicidad..."/><br/>
                <div class="cargarPublicidad flex">
                  <div class="view-Publicidad">
                    <canvas ref="canvas" width="100" height="100" style="display: none;"></canvas>
                    <img v-if="imagenPrevia" :src="imagenPrevia" alt="Previsualización de la imagen">
                  </div>
                  <transition name="fade">
                    <div class="modal-overlay" v-if="showModal">
                    </div>
                  </transition>
                  <transition name="fade">
                    <div class="modal" v-if="showModal">
                      <h2>Sube el diseño de la publicidad que quieres añadir</h2>
                      <div class="view-PublicidadModal">
                        <input id="input-Publicidad" type="file" name="imagen" accept="image/*"
                               @change="previsualizarImagen">
                        <canvas ref="canvas" width="100" height="100" style="display: none;"></canvas>
                        <img v-if="imagenPrevia" :src="imagenPrevia" alt="Previsualización de la imagen">
                      </div>
                      <button @click="showModal = false" class="modal-buttom" type="button">
                        <span class="texto">Listo</span>
                      </button>
                    </div>
                  </transition>
                  <button @click="showModal = true" class="upload-buttom" type="button">
                    <img src="../img/upload-bk.svg" alt="upload" class="icono">
                    <span class="texto">Cargar</span>
                  </button>
                </div>
              </div>
            </div>
            <button @click="submitForm" class="submit-Button">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imagenPrevia: null,
      currentPage: '',
      dropdowns: {
        dropdownSC: false,
        dropdownFFC: false,
        dropdownS: false,
      },
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
    toggleDropdown(dropdown) {
      this.dropdowns[dropdown] = !this.dropdowns[dropdown];
    },
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
  padding: 20px;
  margin-bottom: 25px;
  border-radius: 8px;
}

.aggCupon input {
  position: relative;
  margin-top: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 100%;
  height: 50px;
  padding: 5px;
}
.menu-button{
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

#input-actividad {
  position: relative;
  margin-top: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 100%;
  height: 300px;
  padding: 5px;
}

#input-actividad::placeholder {
  position: absolute;
  top: 10px;
  left: 10px;
}

.view-Publicidad {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 20px 0 0;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 50%;
  height: 200px;
  padding: 5px;
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

.cargarPublicidad {
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

.view-PublicidadModal {
  position: relative;
  margin-top: 20px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  width: 100%;
  height: 300px;
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
</style>