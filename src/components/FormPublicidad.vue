<template>
  <div class="form-publicidad rounded-md bg-white w-[600px] p-4 mb-4">
    <form @submit.prevent="submitForm">
      <h3 class="font-bold text-lg">Publicidad</h3>
      <div class="contenido flex">
        <div class="publicidad-labels mt-4">
          <h4 class="mb-6">Imágen</h4>
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

export default {
  components: {publicidadModal},
  data() {
    return {
      imagen: null,
      imagenPrevia: null,
      idPublicidad: null,
    };
  },
  methods: {
    submitForm() {
      const formData = new FormData();
      formData.append('imagenUrl', this.$refs.imagenPreviaInput.files[0]);

      // Realizar la solicitud al backend utilizando axios u otra librería similar
      axios.post("https://backend-clipp-production.up.railway.app/api/publicidad", formData)
          .then(response => {
            console.log("Publicidad Creada con exito:", response.data);
            this.imagenPrevia = null;
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
      // console.log("imagenPrevia:", this.imagenPrevia);
    },
    actualizarPublicidad(publicidad){
      this.idPublicidad = publicidad.id;

      axios
          .get(`https://backend-clipp-production.up.railway.app/api/publicidad/${this.idPublicidad}`
          )
          .then((response) => {
            this.imagenPrevia = response.data.imagenUrl;
          })
          .catch((error) => {
            console.error("Error al obtener la publicidad: ", error);
          })
    },
    eliminarPublicidad(){
      if(!this.idPublicidad){
        console.error("ID de publicidad no valido");
        return;
      }

      axios
          .delete(`https://backend-clipp-production.up.railway.app/api/publicidad/${this.idPublicidad}`
          )
          .then((response) => {
            console.log("Solicitud de DELETE exitosa:", response.data);

            this.imagenPrevia = null;
          })
          .catch((error) => {
            console.error("Error en la solicitud DELETE")
          })
    }
  },
  computed: {
    formularioCompleto() {
      return (
          (this.imagenPrevia !== null)
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
</style>