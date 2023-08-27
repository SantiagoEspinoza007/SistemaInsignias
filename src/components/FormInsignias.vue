<template>
  <form @submit.prevent="submitForm">
    <h2 class="font-bold text-lg">Insignias</h2>
    <div class="contenido flex">
      <div class="insignias-labels mt-4">
        <h4 class="mb-6">Título</h4>
        <h4 class="mb-6">Tipo</h4>
        <h4 class="mb-6">Actividad</h4>
        <h4 class="mb-6">Servicio</h4>
        <h4 class="mb-6">Imágen</h4>
      </div>
      <div class="insignias-inputs w-[75%] mb-4">
        <input class="input-global" id="titulo" v-model="titulo" type="text" placeholder="Nombre de la insignia">
        <DropdownMenu :options="optionsTipo"
                      class="despegable-global w-[75%]"
                      id="tipo"
                      v-model="tipo"
                      placeholder="Elige el tipo de insignia al que pertenece"
                      @option-selected="updateTipo"
        />
        <div class="actividad flex">
          <input class="input-global mr-4"
                 type="text"
                 id="actividad"
                 v-model="actividad"
                 :readonly="bloquearInput"
                 placeholder="Busca la actividad">

          <insignia-modal  :fila="actividad" @enviarActividad="actualizarActividad" />
        </div>
        <DropdownMenu :options="optionsServicio"
                      class="despegable-global w-[75%]"
                      id="servicio"
                      v-model="servicio"
                      @option-selected="updateServicio"
        />
        <div class="cargarImagen flex">
          <div class="view-Imagen justify-center">
            <canvas ref="canvas" width="100" height="100" style="display: none;"></canvas>
            <img v-if="imagenPrevia" :src="imagenPrevia" alt="Previsualización de la imagen">
          </div>
          <div class="self-end ml-4">
            <label class="upload-buttom">
              <img src="../img/upload-bk.svg" alt="upload" class="icono">
              <span>Cargar</span>
              <input id="imagenPrevia" ref="imagenPreviaInput" type="file" style="display: none" accept="image/*" @change="previsualizarImagen($event)"/>
            </label>
          </div>
        </div>
      </div>
      <div class="insignias-botones flex flex-col items-end mt-2">
        <button :disabled="!formularioCompleto"
                :class="{'button-block': !formularioCompleto}"
                class="button-global text-[#FF0000FF]" type="button">
          <span>Eliminar</span>
        </button>
        <button :disabled="!formularioCompleto"
                :class="{'button-block': !formularioCompleto}"
                class="button-global text-[#2794F8]" type="button">
          <span>Editar</span>
        </button>
        <button :disabled="!formularioCompleto"
                :class="{'button-block': !formularioCompleto}"
                class="button-global text-[#2794F8]" type="submit">
          <span>Guardar</span>
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import DropdownMenu from "@/components/DropdownMenu.vue";
import InsigniaModal from "@/components/InsigniaModal.vue";
export default {
  components: {
    DropdownMenu,
    InsigniaModal
  },
  data() {
    return {
      titulo: '',
      tipo: null,
      actividad: '',
      servicio: null,
      imagen: null,
      imagenPrevia: null,
      optionsTipo: ['Fidelización', 'Usabilidad'],
      optionsServicio: ['KTaxi'],
      bloquearInput: true,
      showModal: false,
    };
  },
  methods: {
    submitForm() {
      // Aquí puedes realizar acciones con los datos del formulario,
      // como enviar una solicitud HTTP, procesar datos, etc.
      console.log("Datos del formulario:", this.titulo, this.cantidad, this.progreso);

      // Luego, puedes restablecer los datos del formulario si es necesario.
      this.titulo = "";
      this.tipo = "";
      this.actividad = "";
      this.servicio = "";
      this.imagen = null;
      this.imagenPrevia = null;
    },
    openModal() {
      this.showModal = true; // Abre el modal cuando se hace clic en el botón
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
            context.drawImage(img, 0, 0, 70, 70);
            this.imagenPrevia = canvas.toDataURL('image/png');
          };

          img.src = e.target.result;
        };

        lector.readAsDataURL(archivo);
      } else {
        this.imagenPrevia = null;
      }
      const archivoInputValue = this.$refs.imagenPreviaInput.value;
      // Agregar console.log para verificar las propiedades
      console.log("titulo:", this.titulo);
      console.log("tipo:", this.tipo);
      console.log("actividad:", this.actividad);
      console.log("servicio:", this.servicio);
      console.log("imagenPrevia:", this.imagenPrevia);
    },
    updateTipo(option) {
      this.tipo = option;
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
          (this.tipo !== null) &&
          (this.actividad === undefined || this.actividad.trim() !== '') &&
          (this.servicio !== null) &&
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