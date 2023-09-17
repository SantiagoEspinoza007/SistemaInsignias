<template>
  <div class="form-insignias rounded-md bg-white w-[600px] p-2">
    <form @submit.prevent="onFormSubmit">
      <h2 class="font-bold text-lg">Insignias</h2>
      <div class="contenido flex">
        <div class="insignias-labels mt-4">
          <h4 class="mb-6">Título</h4>
          <h4 class="mb-8 ">Descripción</h4>
          <h4 class="mb-8">Tipo/Servicio</h4>
          <h4 class="mb-6">Actividad</h4>
          <h4 class="mb-6">Imagen</h4>
        </div>
        <div class="insignias-inputs w-[75%] mb-4">
          <input class="input-global" id="titulo" v-model="titulo" type="text" placeholder="Nombre de la insignia">
          <input class="input-global" type="text" id="descripcion" v-model="descripcion"
                 placeholder="Descripción de la insignia">
          <div class="menus flex">
            <DropdownMenuW :options="optionsTipo"
                           class="despegable-global w-[35%]"
                           id="tipo"
                           v-model="tipo"
                           placeholder="Tipo"
                           @option-selected="updateTipo"
            />
            <DropdownMenuW :options="optionsServicio"
                           class="despegable-global w-[35%]"
                           id="servicio"
                           v-model="servicio"
                           placeholder="Servicio"
                           @option-selected="updateServicio"
            />
          </div>
          <div class="actividad flex mt-2">
            <input class="input-global mr-4"
                   type="text"
                   id="actividad"
                   v-model="actividad"
                   :readonly="bloquearInput"
                   placeholder="Busca la actividad">

            <insignia-modal v-if="showInsigniaModal" :fila="actividad"
                            @enviarActividadId="actualizarActividadId"
                            @enviarActividadTitulo="actualizarActividadTitulo"/>
          </div>
          <div class="cargarImagen flex">
            <div class="view-Imagen justify-center">
              <canvas ref="canvas" width="160" height="160" style="display: none;"></canvas>
              <img v-if="imagenPrevia" :src="imagenPrevia" alt="Previsualización de la imagen">
            </div>
            <div class="self-end ml-4">
              <label class="upload-buttom">
                <img src="../img/upload-bk.svg" alt="upload" class="icono">
                <span>Cargar</span>
                <input id="imagenPrevia" ref="imagenInput" type="file" style="display: none" accept="image/*"
                       @change="previsualizarImagen($event)"/>
              </label>
            </div>
          </div>
        </div>
        <div class="insignias-botones flex flex-col items-end mt-2">
          <button :disabled="!formularioCompleto"
                  :class="{'button-block': !formularioCompleto}"
                  class="button-global text-[#FF0000FF]" type="button"
                  @click="eliminarInsignia"
          >
            <span>Eliminar</span>
          </button>
          <button :disabled="!formularioCompleto"
                  :class="{'button-block': !formularioCompleto}"
                  class="button-global text-[#2794F8]" type="button"
                  @click="submitPatch"
          >
            <span>Actualizar</span>
          </button>
          <button :disabled="!formularioCompleto"
                  :class="{'button-block': !formularioCompleto}"
                  class="button-global text-[#2794F8]" type="submit">
            <span>Guardar</span>
          </button>
          <buscar-insginia-modal
              @enviarInsignia="actualizarInsignia"
              @enviarActividadTitulo="actualizarActividadTitulo"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import DropdownMenu from "@/components/DropdownMenu.vue";
import InsigniaModal from "@/components/InsigniaModal.vue";
import axios, {options} from "axios";
import buscarActividad from "@/components/BuscarActividad.vue";
import BuscarInsginiaModal from "@/components/BuscarInsginiaModal.vue";
import DropdownMenuW from "@/components/DropdownMenuW.vue";

export default {
  components: {
    DropdownMenuW,
    DropdownMenu,
    InsigniaModal,
    buscarActividad,
    BuscarInsginiaModal
  },
  data() {
    return {
      titulo: '',
      descripcion: '',
      tipo: '',
      actividad: "",
      actividadId: null,
      servicio: null,
      imagenUrl: '',
      imagen: null,
      imagenPrevia: null,
      optionsTipo: ['Fidelización', 'Usabilidad'],
      optionsServicio: ['KTaxi'],
      bloquearInput: true,
      showInsigniaModal: true,
      idInsignia: null,
      insigniaSelect: null,
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
      // Crea un objeto con los datos del formulario
      console.log("Datos del formulario:", this.titulo,
          this.descripcion, this.imagenUrl, this.tipo, this.actividad);

      const formData = new FormData();
      formData.append('titulo', this.titulo);
      formData.append('descripcion', this.descripcion);
      formData.append('imagenUrl', this.$refs.imagenInput.files[0]);
      formData.append('tipo', this.tipo);
      if (this.tipo !== "usabilidad"){
        formData.append('actividadId', this.actividadId);
      }

      console.log(formData)

      // Realiza una solicitud POST al backend para crear el registro de insignia
      axios
          .post("http://backend-clipp-production-2fcb.up.railway.app/api/insignias", formData)
          .then((response) => {
            // Maneja la respuesta del backend, por ejemplo, muestra un mensaje de éxito
            console.log("Registro de insignia creado con éxito:", response.data);

            // Luego, puedes restablecer los datos del formulario si es necesario.
            this.titulo = "";
            this.descripcion = "";
            this.imagenInput = null;
            this.imagenPrevia = null;
            this.tipo = "";
            this.actividad = "";
            this.actividadId = "";

          })
          .catch((error) => {
            console.error("Error al crear el registro de insignia:", error);
            // Maneja el error
          });
    },
    submitPatch(){
      const insigniaActualizada = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        imageUrl: this.imagenInput,
        tipo: this.tipo,
        actividadId: this.actividadId,
      };

      if (!this.idInsignia) {
        console.error("ID de insignia no válido.");
        return;
      }

      axios
          .patch(
              `http://backend-clipp-production-2fcb.up.railway.app/api/insignias/${this.idInsignia}`,
              insigniaActualizada
          )
          .then((response) => {
            // Maneja la respuesta de éxito según tus necesidades
            console.log("Solicitud PATCH exitosa:", response.data);

            // Puedes restablecer el formulario después de la actualización
            this.titulo = "";
            this.descripcion = "";
            this.imagenInput = null;
            this.imagenPrevia = null;
            this.tipo = "";
            this.actividad = "";
            this.actividadId = null;
          })
          .catch((error) => {
            // Maneja los errores de la solicitud PATCH según tus necesidades
            console.error("Error en la solicitud PATCH:", error);
          });
    },
    actualizarActividadId(id) {
      this.actividadId = id;
      // Maneja el ID de la actividad aquí
    },
    actualizarActividadTitulo(titulo) {
      this.actividad = titulo;
      // Maneja el título de la actividad aquí
    },
    actualizarInsignia(insignia) {
      this.idInsignia = insignia.id;
      axios
          .get(`http://backend-clipp-production-2fcb.up.railway.app/api/insignias/${this.idInsignia}`
          )
          .then((response) => {
            this.titulo = response.data.titulo
            this.descripcion = response.data.descripcion;
            this.tipo = response.data.tipo;
            this.servicio = "KTaxi";
            if (this.tipo !== "Usabilidad") {
              this.actividad = response.data.actividad.nombre;
            }
            this.imagenPrevia = response.data.imagenUrl;
          })
          .catch((error) => {
            console.error("Error al obtener el beneficio:", error);
          })
      console.log("Actividad:", this.actividad)
    },
    eliminarInsignia(){
      if (!this.idInsignia){
        console.error("ID de insignia no valido.");
        return;
      }

      // Realiza la solicitud DELETE al servidor
      axios
          .delete(`http://backend-clipp-production-2fcb.up.railway.app/api/insignias/${this.idInsignia}`
          )
          .then((response) => {
            console.log("Solicitud DELETE exitosa: ", response.data);

            this.titulo = "";
            this.descripcion = "";
            this.imagenInput = null;
            this.imagenPrevia = null;
            this.tipo = "";
            this.actividad = "";
            this.actividadId = null;
          })
          .catch((error) => {
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
      const archivoInputValue = this.$refs.imagenInput.value;
      console.log("titulo:", this.titulo);
      console.log("descripcion:", this.descripcion);
      console.log("tipo:", this.tipo);
      console.log("actividad:", this.actividad);
      console.log("servicio:", this.servicio);
      console.log("imagenPrevia:", this.imagenPrevia);
    },
    updateTipo(option) {
      this.tipo = option.toLowerCase();
      if (option === "Usabilidad") {
        this.showInsigniaModal = false;
      } else {
        this.showInsigniaModal = true;
      }
    },
    updateServicio(option) {
      this.servicio = option;
    },
    actualizarActividad(fila) {
      this.actividad = fila;
    }

  },
  computed: {
    formularioCompleto() {
      return (
          (this.titulo === undefined || this.titulo.trim() !== '') &&
          (this.descripcion === undefined || this.descripcion.trim() !== '') &&
          (this.tipo !== null) &&
          (this.imagenPrevia !== null)
      );
    }
  },
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