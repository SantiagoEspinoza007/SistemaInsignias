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
      <div class="actividades-botones flex flex-col items-end mt-2">
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
      titulo: "",
      cantidad: "",
      descripcion: ""
    };
  },
  methods: {
    submitForm() {
      // Aquí puedes realizar acciones con los datos del formulario,
      // como enviar una solicitud HTTP, procesar datos, etc.
      console.log("Datos del formulario:", this.titulo, this.cantidad, this.descripcion);

      // Luego, puedes restablecer los datos del formulario si es necesario.
      this.titulo = "";
      this.cantidad = "";
      this.descripcion = "";
    },
  },
  computed: {
    formularioCompleto() {
      return (
          (this.titulo === undefined || this.titulo.trim() !== '') &&
          (this.cantidad === undefined || this.cantidad.trim() !== '') &&
          (this.descripcion === undefined || this.descripcion.trim() !== '')
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