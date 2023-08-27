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
              <canvas ref="canvas" width="100" height="100" style="display: none;"></canvas>
              <img v-if="imagenPrevia" :src="imagenPrevia" alt="Previsualización de la imagen">
            </div>
            <div class="ml-4 self-end">
              <label class="upload-buttom">
                <img src="../img/upload-bk.svg" alt="upload" class="icono">
                <span>Cargar</span>
                <input id="imagenPrevia" ref="imagenPreviaInput" type="file" style="display: none" accept="image/*" @change="previsualizarImagen($event)"/>
              </label>
            </div>
          </div>
        </div>
        <div class="publicidad-botones flex flex-col items-end mt-2">
          <button :disabled="!formularioCompleto"
                  :class="{'button-block': !formularioCompleto}"
                  class="button-global text-[#FF0000FF]" type="button">
            <span>Eliminar</span>
          </button>
          <button :disabled="!formularioCompleto"
                  :class="{'button-block': !formularioCompleto}"
                  class="button-global text-[#2794F8]" type="submit">
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </form>
  </div>

  <div class="publicidad-img rounded-md bg-white w-[300px] p-2">
    <table>
      <tr>
        <th class="hidden">ID</th>
        <td></td>
      </tr>
      <tr>
        <td class="border px-8" @dblclick="cargarImagenEnFormulario">
          <img
              src="/img/Publicidad%20%23celular.png"
              alt="Publicidad"
              width="75"
          >
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imagen: null,
      imagenPrevia: null,
    };
  },
  methods: {
    submitForm() {
      // Aquí puedes realizar acciones con los datos del formulario,
      // como enviar una solicitud HTTP, procesar datos, etc.
      console.log("Datos del formulario:", this.imagenPrevia);

      // Luego, puedes restablecer los datos del formulario si es necesario.
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
      console.log("imagenPrevia:", this.imagenPrevia);
    },
    cargarImagenEnFormulario() {
      // Aquí cargamos la imagen en el formulario al hacer doble clic en la celda <td>
      if (this.imagenPrevia) {
        // Obtener el input de imagen previa
        const inputImagenPrevia = this.$refs.imagenPreviaInput;

        // Crear un objeto File a partir de la imagen previa
        const archivo = this.dataURLtoFile(this.imagenPrevia, 'imagen.png');

        // Crear un objeto FileList para asignarlo al input
        const archivoLista = new DataTransfer();
        archivoLista.items.add(archivo);
        inputImagenPrevia.files = archivoLista.files;

        // Disparar el evento de cambio para que se actualice la previsualización
        inputImagenPrevia.dispatchEvent(new Event('change'));
      }
    },
    dataURLtoFile(dataURL, filename) {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
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