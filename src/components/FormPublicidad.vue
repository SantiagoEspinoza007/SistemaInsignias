<template>
  <div class="form-publicidad rounded-md bg-white w-[600px] p-4 mb-4">
    <form @submit.prevent="onFormSubmit">
      <h3 class="font-bold text-lg">Publicidad</h3>
      <div class="contenido flex">
        <div class="publicidad-labels mt-4">
          <h4 class="mt-2">Imagen</h4>
          <h4 class="mt-36 ">Rutas</h4>
        </div>
        <div class="publicidad-inputs w-[75%] mb-4">
          <div class="cargarImagen flex">
            <div class="view-Imagen items-center">
              <canvas ref="canvas" width="160" height="160" style="display: none;"></canvas>
              <img v-if="imagenPrevia" :src="imagenPrevia" alt="Previsualización de la imagen">
            </div>
            <div class="ml-4 self-end">
              <label class="upload-buttom">
                <img src="../img/upload-bk.svg" alt="upload" class="icono">
                <span>Cargar</span>
                <input id="imagenPrevia" ref="imagenPreviaInput" type="file"
                       style="display: none" accept="image/*"
                       @change="previsualizarImagen($event)"/>
              </label>
            </div>
          </div>
          <DropdownMenuW :options="optionsRutas"
                         class="despegable-global w-[45%]"
                         id="rutas"
                         v-model="ruta"
                         placeholder="Selecciona una ruta"
                         @option-selected="updateRuta"
          />
        </div>
        <div class="publicidad-botones flex flex-col items-end mt-2">
          <button :disabled="!formularioCompleto"
                  :class="{'button-block': !formularioCompleto}"
                  class="button-global text-[#FF0000FF]" type="button"
                  @click="eliminarPublicidad"
          >
            <span>Eliminar</span>
          </button>
          <button :disabled="!formularioCompleto"
                  :class="{'button-block': !formularioCompleto}"
                  class="button-global text-[#2794F8]" type="submit">
            <span>Guardar</span>
          </button>
          <publicidad-modal @enviarPublicidad="actualizarPublicidad"></publicidad-modal>
        </div>
      </div>
    </form>
  </div>

</template>
<script>
import axios, {Axios} from "axios";
import publicidadModal from "@/components/publicidadModal.vue";
import DropdownMenuW from "@/components/DropdownMenuW.vue";

export default {
  components: {DropdownMenuW, publicidadModal},
  data() {
    return {
      ruta: "",
      imagenUrl: '',
      imagen: null,
      imagenPrevia: null,
      idPublicidad: null,
      optionsRutas: ['home', 'profile', 'badge', 'ktaxi', 'coupons', 'activities'],
    };
  },
  methods: {
    onFormSubmit(event) {
      // Realiza las acciones necesarias, por ejemplo, enviar datos al servidor
      this.submitForm();

      // Espera 1 segundo antes de recargar la página (ajusta el tiempo según sea necesario)
      setTimeout(() => {
        window.location.reload();
      }, 1500); // 1000 milisegundos = 1 segundo
    },
    submitForm() {
      console.log("Datos del formulario Publicidad: ", this.imagenUrl, this.ruta);

      const formData = new FormData();
      formData.append('imagenUrl', this.$refs.imagenPreviaInput.files[0]);
      formData.append('ruta', this.ruta);

      // Realizar la solicitud al backend utilizando axios u otra librería similar
      axios
          .post("http://backend-clipp-production-2fcb.up.railway.app/api/publicidad", formData)
          .then(response => {
            console.log("Publicidad Creada con exito:", response.data);
            this.imagenInput = null;
            this.imagenPrevia = null;
            this.ruta = "";
          })
          .catch(error => {
            console.error("Error al crear la publicidad", error);
          });

      console.log(formData)
    },
    previsualizarImagen(event) {
      const archivo = event.target.files[0];

      if (archivo) {
        const lector = new FileReader();

        lector.onload = (e) => {
          this.imagenPrevia = e.target.result;

          const canvas = this.$refs.canvas;
          const context = canvas.getContext('2d');
          const img = new Image();

          img.onload = () => {
            context.drawImage(img, 0, 0, 160, 160);
            this.imagenPrevia = canvas.toDataURL('image/png');
          };

          img.src = e.target.result;
        };

        lector.readAsDataURL(archivo);
      } else {
        this.imagenPrevia = null;
      }
      const archivoInputValue = this.$refs.imagenPreviaInput.value;
      // // Agregar console.log para verificar las propiedades
      console.log("imagenPrevia:", this.imagenPrevia);
    },
    actualizarPublicidad(publicidad) {
      this.idPublicidad = publicidad.id;

      axios
          .get(`http://backend-clipp-production-2fcb.up.railway.app/api/publicidad/${this.idPublicidad}`
          )
          .then((response) => {
            this.imagenPrevia = response.data.imagenUrl;
            this.ruta = response.data.ruta;
          })
          .catch((error) => {
            console.error("Error al obtener la publicidad: ", error);
          })
    },
    eliminarPublicidad() {
      if (!this.idPublicidad) {
        console.error("ID de publicidad no valido");
        return;
      }

      axios
          .delete(`http://backend-clipp-production-2fcb.up.railway.app/api/publicidad/${this.idPublicidad}`
          )
          .then((response) => {
            console.log("Solicitud de DELETE exitosa:", response.data);

            this.imagenPrevia = null;
          })
          .catch((error) => {
            console.error("Error en la solicitud DELETE")
          })
    },
    updateRuta(option) {
      this.ruta = option;
    }
  },
  computed: {
    formularioCompleto() {
      return (
          (this.imagenPrevia !== null) &&
          (this.ruta !== null)
      );
    }
  }
};
</script>

<style>
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

.hidden {
  display: none;
}

.despegable-global {
  margin-left: 25px;
  margin-top: 10px;
  position: relative;
}
</style>