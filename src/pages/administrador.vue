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
            <router-link to="/administrador">
              <button :class="['button', { 'active-button': currentPage === '/administrador' }]">
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
      <div class="border h-full border-cyan-600 rounded-md border-2 flex justify-between pt-14 pl-24 pr-24">
        <div class="col-cargarinfo">
          
          <FormActividades></FormActividades>

          <form-insignias></form-insignias>
        </div>
        <div class="col-tablas">

          <form-publicidad></form-publicidad>

          <form-cupones></form-cupones>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import DropdownMenu from '@/components/DropdownMenu.vue';
import TableUploadData from "@/components/TableUploadData.vue";
import FormActividades from "@/components/FormActividades.vue";
import FormInsignias from "@/components/FormInsignias.vue";
import FormPublicidad from "@/components/FormPublicidad.vue";
import FormCupones from "@/components/FormCupones.vue";
import CuponesModal from "@/components/CuponesModal.vue";
import axios from "axios";

export default {
  components: {
    DropdownMenu,
    TableUploadData,
    FormActividades,
    FormInsignias,
    FormPublicidad,
    FormCupones,
    CuponesModal
  },
  data() {
    return {
      idInsignia: '',
      busqueda: '',
      paginaActual: 1,
      elementosPorPagina: 5,
      idActividad: null,
      items: [],
      formularios: [],
      currentPage: '',
      showModal: false,
      showModal2: false,
      cupones: [],
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
    idInsignia(id) {
      this.idInsignia(id);
    }
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
  width: 160px;
  height: 160px;
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

input[type="file"] {
  color: transparent;
}

.button-Cupones {
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
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.search-bar input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 24px;
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