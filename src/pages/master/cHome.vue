<template>
  <div class="layout w-screen h-screen flex">
    <!--  Side Bar -->
    <div class="sideBar w-[400px] h-full">
      <div class="logo h-[200xp]">
        <img src="../../img/Clipp.png">
        <img src="../../img/LogoClipp.png">
      </div>
      <div class="menu">
        <ul>
          <li>
            <router-link to="/">
              <button :class="['button', { 'active-button': currentPage === '/' }]">
                <div class="button-content">
                  <img src="../../img/home-w.svg" alt="Inicio">
                  <span>Inicio</span>
                </div>
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/fidelizacion">
              <button :class="['button', { 'active-button': currentPage === '/fidelizacion' }]">
                <div class="button-content">
                  <img src="../../img/Fidelizacion-b.svg" alt="Fidelizacion">
                  <span>Fidelización</span>
                </div>
              </button>
            </router-link>
          </li>
          <li>
            <router-link to="/usabilidad">
              <button :class="['button', { 'active-button': currentPage === '/usabilidad' }]">
                <div class="button-content">
                  <img src="../../img/Usabilidad-b.svg" alt="Usabilidad">
                  <span>Usabilidad</span>
                </div>
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--  Main  -->
    <div class="main h-full w-full">
      <div class="border h-[calc(100vh-50px)] border-cyan-600 rounded-md border-2">
        <div class="cards mt-10 ml-9">
          <div class="insignias mb-4">
            <h3 class="text-2xl font-bold mb-4 text-center p-1">Insignias de Fidelización</h3>
            <p class="text-lg mb-2 text-center">TOP 5 más obtenidas</p>
            <div class="grid grid-cols-5">
              <div class="insignia">
                <p class="text-base text-center m-1">Ktaxi</p>
                <img src="../../img/20taxis.png" alt="20 Taxis" class="">
                <p class="text-xs text-center mt-2">Has completado 20 viajes en Taxis</p>
              </div>
              <div class="insignia">
                <p class="text-center text-base m-1">Delivery</p>
                <img src="../../img/formaPago.png" alt="Forma de Pago">
                <p class="text-xs text-center mt-2">Usaste una forma diferente de pago</p>
              </div>
              <div class="insignia">
                <p class="text-base text-center m-1">Servicio</p>
                <img src="../../img/30km.png" alt="30 Km">
                <p class="text-xs text-center mt-2">Llegaste a 30 Km recorridos</p>
              </div>
              <div class="insignia">
                <p class="text-base text-center m-1">Servicio</p>
                <img src="../../img/20taxis.png" alt="20 Taxis">
                <p class="text-xs text-center mt-2">Descripcion Actividad</p>
              </div>
              <div class="insignia">
                <p class="text-base text-center m-1">Servicio</p>
                <img src="../../img/30km.png" alt="30 Km">
                <p class="text-xs text-center mt-2">Llegaste a 30 Km recorridos</p>
              </div>
            </div>
            <router-link to="/fidelizacion" class="verInsignias">
              <div class="verInsignias-content">
                <a>Ver todas las insignias</a>
              </div>
            </router-link>
          </div>
          <div class="insignias mb-4">
            <h3 class="text-2xl font-bold mb-4 text-center p-1">Insignias de Usabilidad</h3>
            <p class="text-lg mb-2 text-center">TOP 5 más obtenidas</p>
            <div class="grid grid-cols-5">
              <div class="insignia">
                <img src="../../img/numCelular.png" alt="validar celular" class="">
                <p class="text-xs text-center mt-2">Validar número celular</p>
              </div>
              <div class="insignia">
                <img src="../../img/tarjetaDebito.png" alt="tarjeta credito/debito">
                <p class="text-xs text-center mt-2">Agregar tarjeta crédito/debito</p>
              </div>
              <div class="insignia">
                <img src="../../img/numCelular.png" alt="validar celular">
                <p class="text-xs text-center mt-2">Llegaste a 30 Km recorridos</p>
              </div>
              <div class="insignia">
                <img src="../../img/tarjetaDebito.png" alt="tarjeta credito/debito">
                <p class="text-xs text-center mt-2">Descripcion Actividad</p>
              </div>
              <div class="insignia">
                <img src="../../img/numCelular.png" alt="validar celular">
                <p class="text-xs text-center mt-2">Descripcion Actividad</p>
              </div>
            </div>
            <router-link to="/usabilidad" class="verInsignias">
              <div class="verInsignias-content">
                <a>Ver todas las insignias</a>
              </div>
            </router-link>
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

.menu {
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

.button img {
  margin-right: 10px;
}

.button {
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

.active-button {
  background-color: #202D8D;
  color: white;
}

.main {
  background-color: #202D8D;
}

.main .border {
  margin: 25px;
}

.insignias {
  width: 650px;
  height: auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}

.insignias img {
  width: 85px;
  height: auto;
  margin-bottom: 10px;
}

.insignias p {
  color: #6D6D6D;
  text-align: center;
  font-family: Lato, serif;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.insignia {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 5px 10px 5px;
}

.verInsignias {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 0;
  width: 100%;
}

.verInsignias-content {
  display: block;
  background-color: #F9F9F9;
  color: #2794F8;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  width: 100%;
  text-align: center;
}

.verInsignias-content:hover {
  background-color: #e9e9e9;
}

</style>