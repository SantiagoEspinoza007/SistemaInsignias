<template>
  <div class="layout w-screen h-screen flex">
    <!--  Side Bar -->
    <div class="sideBar w-[400px] h-full">
      <div class="logo h-[200xp]">
        <img src="../img/Clipp.png">
        <img src="../img/LogoClipp.png">
      </div>
      <div class="menu h-[calc(100vh-50px)]">
        <!--        <div class="px - [20px] flex flex-col">-->
        <ul>
          <li>
            <router-link to="/">
              <button :class="['button', { 'active-button': currentPage === '/' }]">
                <div class="button-content">
                  <img src="../img/home-b.svg" alt="Inicio">
                  <span>Inicio</span>
                </div>
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/fidelizacion">
              <button :class="['button', { 'active-button': currentPage === '/fidelizacion' }]">
                <div class="button-content">
                  <img src="../img/Fidelizacion-b.svg" alt="Fidelizacion">
                  <span>Fidelización</span>
                </div>
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/usabilidad">
              <button :class="['button', { 'active-button': currentPage === '/usabilidad' }]">
                <div class="button-content">
                  <img src="../img/Usabilidad-w.svg" alt="Usabilidad">
                  <span>Usabilidad</span>
                </div>
              </button>
            </router-link>
          </li>
        </ul>
        <!--        </div>-->
      </div>
    </div>
    <!--  Main  -->
    <div class="main h-full w-full">
      <div class="border h-[calc(100vh-50px)] border-cyan-600 rounded-md border-2">
        <div class="cards mt-10 ml-9">
          <div class="insigniasU">
            <h3 class="text-2xl font-bold mb-4 text-center p-7">Insignias de Usabilidad</h3>
            <div v-for="index in 3" :key="index">
              <div class="grid grid-cols-6 gap-3">
                <div class="insignia">
                  <img src="../img/numCelular.png" alt="validar celular" class="">
                  <p class="text-xs text-center mt-2">Validar número celular</p>
                </div>
                <div class="insignia">
                  <img src="../img/tarjetaDebito.png" alt="tarjeta credito/debito">
                  <p class="text-xs text-center mt-2">Agregar tarjeta crédito/debito</p>
                </div>
                <div class="insignia">
                  <img src="../img/numCelular.png" alt="validar celular">
                  <p class="text-xs text-center mt-2">Llegaste a 30 Km recorridos</p>
                </div>
                <div class="insignia">
                  <img src="../img/tarjetaDebito.png" alt="tarjeta credito/debito">
                  <p class="text-xs text-center mt-2">Descripcion Actividad</p>
                </div>
                <div class="insignia">
                  <img src="../img/numCelular.png" alt="validar celular">
                  <p class="text-xs text-center mt-2">Descripcion Actividad</p>
                </div>
                <div class="insignia">
                  <img src="../img/tarjetaDebito.png" alt="tarjeta credito/debito">
                  <p class="text-xs text-center mt-2">Descripcion Actividad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: '',
    };
  },
  mounted() {
    this.currentPage = this.$route.path;
  },
};
</script>

<style>

.sideBar {
  align-items: center;
  padding: 30px;
}

.logo {
  display: flex;
  justify-content: center;
}

.logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.menu{
  padding-top: 20px;
}

.menu ul {
  list-style: none;
  padding: 10px;
  margin: 10px;
}

.menu li {
  margin-bottom: 30px;
}

.button img{
  margin-right: 10px;
}

.button{
  display: flex;
  justify-content: center;
  width: 230px;
  height: 75px;
  padding: 26px 84px 27px 76px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #202D8D;
}


.button-content {
  display: flex;
  align-items: center;
}

.main {
  background-color: #202D8D;
}

.insigniasU {
  width: 700px;
  height: auto;
  background-color: #ffffff; /* Color de fondo blanco para el card */
  padding: 20px;
  border-radius: 10px;
}

.insigniasU img {
  width: 85px;
  height: auto;
}

.insigniasU p {
  color: #6D6D6D;
  text-align: center;
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.insignia {
  padding: 10px 5px 10px 5px;
}
</style>