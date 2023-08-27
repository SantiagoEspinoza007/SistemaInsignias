<template>
  <form @submit.prevent="submitForm">
    <h3 class="mb-4">Cupones</h3>
    <div class="contenido flex">
      <div class="cupones-labels ">
        <h4 class="mb-6">% de Descuento</h4>
        <h4 class="mb-6">Descripcion</h4>
        <h4 class="mb-6">Fecha</h4>
        <h4 class="mb-6">Tiempo</h4>
        <h4 class="mb-6">Imágen</h4>
      </div>
      <div class="cupones-inputs w-[75%] mb-4">
        <input class="input-global" id="porceDescuento" v-model="porceDescuento" type="text" placeholder="%">
        <input class="input-global" id="descripcion" v-model="descripcion" type="text" placeholder="Descuento de (...)">
        <input class="input-global" id="fecha" v-model="fecha" type="date">
        <input class="input-global" id="tiempo" v-model="tiempo" type="time">
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
export default {
  data() {
    return {
      porceDescuento: '',
      descripcion: '',
      fecha: '',
      tiempo: '',
      imagen: null,
      imagenPrevia: null,
    };
  },
  methods: {
    submitForm() {
      // Aquí puedes realizar acciones con los datos del formulario,
      // como enviar una solicitud HTTP, procesar datos, etc.
      console.log("Datos del formulario:", this.porceDescuento, this.descripcion, this.fecha, this.tiempo, this.imagenPrevia);

      // Luego, puedes restablecer los datos del formulario si es necesario.
      this.porceDescuento = "";
      this.descripcion = "";
      this.fecha = "";
      this.tiempo = "";
      this.imagen = null;
      this.imagenPrevia = null;
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
      console.log("porcentaje descuento:", this.porceDescuento);
      console.log("descripción:", this.descripcion);
      console.log("fecha:", this.fecha);
      console.log("tiempo:", this.tiempo);
      console.log("imagenPrevia:", this.imagenPrevia);
    },
  },
  computed: {
    formularioCompleto() {
      return (
          (this.porceDescuento === undefined || this.porceDescuento.trim() !== '') &&
          (this.descripcion === undefined  || this.descripcion.trim() !== '') &&
          (this.fecha === undefined || this.fecha.trim() !== '') &&
          (this.tiempo === undefined  || this.tiempo.trim() !== '') &&
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