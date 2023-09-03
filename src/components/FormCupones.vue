<template>
  <div class="form-cupones rounded-md bg-white w-[600px] p-4">
    <form @submit.prevent="submitForm">
      <h3 class="mb-4 font-bold text-lg">Cupones</h3>
      <div class="contenido flex">
        <div class="cupones-labels ">
          <h4 class="mt-2 mb-4">Titulo</h4>
          <h4 class="mb-6">% de Descuento</h4>
          <h4 class="mb-6">Descripcion</h4>
          <h4 class="mb-6">Fecha/Tiempo</h4>
          <h4 class="mb-6">Imágen</h4>
        </div>
        <div class="cupones-inputs w-[75%] mb-4">
          <input class="input-global" type="text" id="titulo" v-model="titulo" placeholder="Titulo del Beneficio">
          <input class="input-global" id="porceDescuento" v-model="porceDescuento" type="text" placeholder="%">
          <input class="input-global" id="descripcion" v-model="descripcion" type="text" placeholder="Descuento de (...)">
          <input class="input-global" id="fecha" v-model="fecha" type="datetime-local">
          <div class="cargarImagen flex">
            <div class="view-Imagen justify-center">
              <canvas ref="canvas" width="160" height="160" style="display: none;"></canvas>
              <img v-if="imagenPrevia" :src="imagenPrevia" alt="Previsualización de la imagen">
            </div>
            <div class="self-end ml-4">
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
        <div class="insignias-botones flex flex-col items-end mt-2">
          <button :disabled="!formularioCompleto"
                  :class="{'button-block': !formularioCompleto}"
                  class="button-global text-[#FF0000FF]" type="button"
                  @click="eliminarBeneficio"
          >
            <span>Eliminar</span>
          </button>
          <button :disabled="!formularioCompleto"
                  :class="{'button-block': !formularioCompleto}"
                  class="button-global text-[#2794F8]" type="button"
                  @click="editarBeneficio"
          >
            <span>Editar</span>
          </button>
          <button :disabled="!formularioCompleto"
                  :class="{'button-block': !formularioCompleto}"
                  class="button-global text-[#2794F8]" type="submit">
            <span>Guardar</span>
          </button>
          <CuponesModal @enviarBeneficio="actualizarBeneficio"></CuponesModal>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import CuponesModal from "@/components/CuponesModal.vue";
import axios from "axios";

export default {
  components: {CuponesModal},
  data() {
    return {
      titulo: '',
      porceDescuento: '',
      descripcion: '',
      cupon: "KTaxi",
      fecha: '',
      tiempo: '',
      imagen: null,
      imagenPrevia: null,
      idBeneficio: null,
    };
  },
  methods: {
    submitForm() {
      // Aquí puedes realizar acciones con los datos del formulario,
      // como enviar una solicitud HTTP, procesar datos, etc.
      console.log("Datos del formulario:", this.titulo, this.porceDescuento,
          this.descripcion, this.fecha, this.tiempo, this.imagenPrevia);

      const formData = new FormData();
      formData.append('titulo', this.titulo);
      formData.append('descuento', this.porceDescuento);
      formData.append('descripcion', this.descripcion);
      formData.append('cupon', this.cupon);
      formData.append('imagenUrl', this.$refs.imagenPreviaInput.files[0]);
      formData.append('fecha', this.fecha);


      console.log(formData)

      // Realiza una solicitud POST al backend para crear el registro de insignia
      axios
          .post("https://backend-clipp-production.up.railway.app/api/beneficios", formData)
          .then((response) => {
            // Maneja la respuesta del backend, por ejemplo, muestra un mensaje de éxito
            console.log("Beneficio creado con éxito:", response.data);

            // Luego, puedes restablecer los datos del formulario si es necesario.
            this.titulo = "";
            this.porceDescuento = "";
            this.descripcion = "";
            this.fecha = "";
            this.imagen = null;
            this.imagenPrevia = null;
          })
          .catch((error) => {
            console.error("Error al crear el registro de insignia:", error);
            // Maneja el error de acuerdo a tus necesidades.
          });
    },
    actualizarBeneficio(beneficio) {
      this.idBeneficio = beneficio.id;

      axios
          .get(`https://backend-clipp-production.up.railway.app/api/beneficios/${this.idBeneficio}`
          )
          .then((response) => {
            this.titulo = response.data.titulo
            this.porceDescuento = response.data.descuento;
            this.descripcion = response.data.descripcion;
            // Formatear la fecha y hora al formato ISO 8601
            const fechaHora = new Date(response.data.fecha);
            this.fecha = fechaHora.toISOString().slice(0, 16);
            this.imagenPrevia = response.data.imagenUrl;
          })
          .catch((error) => {
            console.error("Error al obtener el beneficio:", error);
          })
    },
    editarBeneficio(){
      const beneficioActualizado = {
        titulo: this.titulo,
        descuento: this.porceDescuento,
        descripcion: this.descripcion,
        cupon: this.cupon,
        fecha: this.fecha,
        imageUrl: this.imagenPrevia,
      };

      // Asegúrate de que tengas un ID de actividad válido
      if (!this.idBeneficio) {
        console.error("ID de beneficio no válido.");
        return;
      }

      // Realiza la solicitud PATCH al servidor
      axios
          .patch(
              `https://backend-clipp-production.up.railway.app/api/beneficios/${this.idBeneficio}`,
              beneficioActualizado
          )
          .then((response) => {
            // Maneja la respuesta de éxito según tus necesidades
            console.log("Solicitud PATCH exitosa:", response.data);

            this.titulo = "";
            this.porceDescuento = "";
            this.descripcion = "";
            this.fecha = "";
            this.imagen = null;
            this.imagenPrevia = null;
          })
          .catch((error) => {
            // Maneja los errores de la solicitud PATCH según tus necesidades
            console.error("Error en la solicitud PATCH:", error);
          });
    },
    eliminarBeneficio(){
      // Asegúrate de que tengas un ID de actividad válido
      if (!this.idBeneficio) {
        console.error("ID de beneficio no válido.");
        return;
      }

      // Realiza la solicitud PATCH al servidor
      axios
          .delete(
              `https://backend-clipp-production.up.railway.app/api/beneficios/${this.idBeneficio}`
          )
          .then((response) => {
            // Maneja la respuesta de éxito según tus necesidades
            console.log("Solicitud DELETE exitosa:", response.data);

            this.titulo = "";
            this.porceDescuento = "";
            this.descripcion = "";
            this.fecha = "";
            this.imagen = null;
            this.imagenPrevia = null;
          })
          .catch((error) => {
            // Maneja los errores de la solicitud PATCH según tus necesidades
            console.error("Error en la solicitud DELETE:", error);
          });
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
    },
  },
  computed: {
    formularioCompleto() {
      return (
          (this.porceDescuento === undefined || this.porceDescuento.trim() !== '') &&
          (this.descripcion === undefined  || this.descripcion.trim() !== '') &&
          (this.fecha === undefined || this.fecha.trim() !== '') &&
          (this.imagenPrevia !== null)
      );
    }
  }
};
</script>

<style>
.input-global {
  margin-left: 25px;
  margin-top: 10px;
  position: relative;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 75%;
  height: 38px;
  padding: 5px;
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
</style>