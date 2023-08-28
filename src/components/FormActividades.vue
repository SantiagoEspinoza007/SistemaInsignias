<template>
  <form @submit.prevent="submitForm">
    <h2 class="font-bold text-lg">Actividades</h2>
    <div class="contenido flex">
      <div class="actividades-labels mt-4">
        <h4 class="mb-6">Titulo</h4>
        <h4 class="mb-6">Cantidad</h4>
        <h4 class="mb-6">Descripción</h4>
      </div>
      <div class="actividades-inputs flex flex-col w-[75%]">
        <input class="input-global" type="text" id="titulo" v-model="titulo" placeholder="Titulo de la actividad">
        <input class="input-global" type="text" id="cantidad" v-model="cantidad"
               placeholder="# de acciones para completar actividad">
        <input class="input-global" type="text" id="descripcion" v-model="descripcion"
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
          <span>Editar</span>
        </button>
        <button :disabled="!formularioCompleto"
                :class="{'button-block': !formularioCompleto}"
                class="button-global text-[#2794F8]" type="submit">
          <span>Guardar</span>
        </button>
        <buscar-actividad @enviarActividad="cargarActividad"></buscar-actividad>
      </div>
    </div>
  </form>
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
      const apiUrl = "https://backend-clipp-production.up.railway.app/api/actividades";

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

      // if (this.idActividad) {
      //   // Hacer una solicitud GET al backend para obtener la actividad
      //   axios
      //       .get(
      //           `https://backend-clipp-production.up.railway.app/api/actividades/${this.idActividad}`
      //       )
      //       .then((response) => {
      //         // Rellenar los campos del formulario con la información obtenida
      //         this.titulo = response.data.nombre;
      //         this.cantidad = response.data.total.toString();
      //         this.descripcion = response.data.descripcion;
      //       })
      //       .catch((error) => {
      //         console.error("Error al obtener la actividad:", error);
      //         // Maneja el error según tus necesidades.
      //       });
      // }
    },
    cargarActividad(actividad) {
      // Aquí guardamos el ID de la actividad seleccionada
      this.idActividad = actividad.id;

      // Luego, hacemos una solicitud GET para obtener la información de la actividad
      axios
          .get(
              `https://backend-clipp-production.up.railway.app/api/actividades/${this.idActividad}`
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
              `https://backend-clipp-production.up.railway.app/api/actividades/${this.idActividad}`,
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
              `https://backend-clipp-production.up.railway.app/api/actividades/${this.idActividad}`
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