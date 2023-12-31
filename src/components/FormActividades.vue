<template>
  <div class="form-actividades rounded-md bg-white w-[600px] pt-6 pb-8 p-4 mb-4">
    <form @submit.prevent="onFormSubmit">
      <h2 class="font-bold text-lg pb-2">Actividades</h2>
      <div class="contenido flex">
        <div class="actividades-labels mt-4">
          <h4 class="mb-10">Título</h4>
          <h4 class="mb-10">Cantidad</h4>
          <h4 class="mb-10">Descripción</h4>
        </div>
        <div class="actividades-inputs flex flex-col w-[75%]">
          <input class="input-globalA" type="text" id="titulo" v-model="titulo" placeholder="Titulo de la actividad">
          <input class="input-globalA" type="text" id="cantidad" v-model="cantidad"
                 placeholder="# de acciones para completar actividad">
          <input class="input-globalA" type="text" id="descripcion" v-model="descripcion"
                 placeholder="Descripción para completar la actividad">
          <a class="text-xs text-gray-400 ml-[25px]">Ej: Llevas 0/# ... para tu siguiente insignia</a>
        </div>
        <div class="actividades-botones flex flex-col items-end">
          <button :disabled="!formularioCompleto"
                  :class="{'button-block': !formularioCompleto}"
                  class="button-global text-[#FF0000FF]" type="button"
                  @click="eliminarActividad"
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
                  class="button-global text-[#2794F8]"
                  type="submit"
          >
            <span>Guardar</span>
          </button>
          <buscar-actividad @enviarActividad="cargarActividad"></buscar-actividad>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios, {Axios} from "axios";
import buscarActividad from "@/components/BuscarActividad.vue";

export default {
  components: {buscarActividad},
  data() {
    return {
      titulo: "",
      cantidad: "",
      descripcion: "",
      idActividad: null,
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
      // Aquí puedes realizar acciones con los datos del formulario,
      // como enviar una solicitud HTTP, procesar datos, etc.
      console.log("Datos del formulario:", this.titulo, this.cantidad, this.descripcion);

      const formData = {
        nombre: this.titulo,
        total: parseInt(this.cantidad), // Asegúrate de que cantidad sea un número
        descripcion: this.descripcion
      };

      // URL de tu endpoint POST
      const apiUrl = "http://backend-clipp-production-2fcb.up.railway.app/api/actividades";

      // Realiza la solicitud POST
      axios.post(apiUrl, formData)
          .then(response => {
            // La solicitud se ha completado con éxito
            console.log("Solicitud POST exitosa:", response.data);

            // Luego de guardar los datos, puedes restablecer el formulario si es necesario
            this.titulo = "";
            this.cantidad = "";
            this.descripcion = "";
          })
          .catch(error => {
            // Si hay un error en la solicitud POST
            console.error("Error en la solicitud POST:", error);
          });

    },
    cargarActividad(actividad) {
      // Aquí guardamos el ID de la actividad seleccionada
      this.idActividad = actividad.id;

      // Luego, hacemos una solicitud GET para obtener la información de la actividad
      axios
          .get(
              `http://backend-clipp-production-2fcb.up.railway.app/api/actividades/${this.idActividad}`
          )
          .then((response) => {
            // Asignamos la información de la actividad a las propiedades del formulario
            this.titulo = response.data.nombre;
            this.cantidad = response.data.total;
            this.descripcion = response.data.descripcion;
          })
          .catch((error) => {
            console.error("Error al obtener la actividad:", error);
            // Maneja el error según tus necesidades.
          });
    },
    submitPatch() {
      // Crea un objeto con los datos que deseas actualizar
      const actividadActualizada = {
        nombre: this.titulo,
        total: this.cantidad,
        descripcion: this.descripcion,
      };

      // Asegúrate de que tengas un ID de actividad válido
      if (!this.idActividad) {
        console.error("ID de actividad no válido.");
        return;
      }

      // Realiza la solicitud PATCH al servidor
      axios
          .patch(
              `http://backend-clipp-production-2fcb.up.railway.app/api/actividades/${this.idActividad}`,
              actividadActualizada
          )
          .then((response) => {
            // Maneja la respuesta de éxito según tus necesidades
            console.log("Solicitud PATCH exitosa:", response.data);

            // Puedes restablecer el formulario después de la actualización
            this.titulo = "";
            this.cantidad = "";
            this.descripcion = "";
            this.idActividad = null;
          })
          .catch((error) => {
            // Maneja los errores de la solicitud PATCH según tus necesidades
            console.error("Error en la solicitud PATCH:", error);
          });
    },
    eliminarActividad() {
      // Asegúrate de que tengas un ID de actividad válido
      if (!this.idActividad) {
        console.error("ID de actividad no válido.");
        return;
      }

      // Realiza la solicitud DELETE al servidor
      axios
          .delete(
              `http://backend-clipp-production-2fcb.up.railway.app/api/actividades/${this.idActividad}`
          )
          .then((response) => {
            // Maneja la respuesta de éxito según tus necesidades
            console.log("Solicitud DELETE exitosa:", response.data);

            // Por ejemplo, puedes restablecer el formulario y limpiar el ID de la actividad
            this.titulo = "";
            this.cantidad = "";
            this.descripcion = "";
          })
          .catch((error) => {
            // Maneja los errores de la solicitud DELETE según tus necesidades
            console.error("Error en la solicitud DELETE:", error);
          });
    },
  },
  computed: {
    formularioCompleto() {
      return (
          (this.titulo === undefined || this.titulo.trim() !== '') &&
          (!isNaN(this.cantidad) && parseInt(this.cantidad) > 0) &&
          (this.descripcion === undefined || this.descripcion.trim() !== '')
      );
    }
  },
  mounted() {
    this.currentPage = this.$route.path;
  },
};
</script>

<style>
.input-globalA {
  margin-left: 25px;
  margin-top: 20px;
  position: relative;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 75%;
  height: 38px;
  padding: 5px;
}

.button-global {
  margin-bottom: 6px;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  width: 100px;
  height: 35px;
}

.button-block {
  margin-bottom: 6px;
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