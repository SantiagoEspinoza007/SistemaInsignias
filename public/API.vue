<template>
  <div>
    <h1>Listado de Usuarios</h1>

    <!-- Botón para cargar usuarios -->
    <button @click="cargarUsuarios">Cargar Usuarios</button>

    <!-- Lista de usuarios -->
    <ul v-if="usuarios.length">
      <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.name }}</li>
    </ul>

    <!-- Mensaje de carga -->
    <p v-if="cargando">Cargando...</p>

    <!-- Mensaje de error -->
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuarios: [],
      cargando: false,
      error: '',
    };
  },
  methods: {
    cargarUsuarios() {
      this.cargando = true;
      this.error = '';

      // Realizar una solicitud GET a la API
      fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => {
            // Verificar si la respuesta es exitosa (código de estado 200)
            if (!response.ok) {
              throw new Error('No se pudo cargar la lista de usuarios.');
            }
            return response.json();
          })
          .then(data => {
            // Almacenar los datos de usuario en la propiedad 'usuarios'
            this.usuarios = data;
          })
          .catch(error => {
            // Capturar errores y mostrar un mensaje de error
            this.error = 'Hubo un error al cargar los usuarios: ' + error.message;
          })
          .finally(() => {
            this.cargando = false;
          });
    },
  },
};
</script>
