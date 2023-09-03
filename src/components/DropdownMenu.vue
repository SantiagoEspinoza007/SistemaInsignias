<template>
  <div class="despegable-servicio">
    <button type="button" class="select" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
      <span :class="selectedOption ? 'spanSelected' : 'spanDefault'">{{ selectedOption || placeholder }}</span>
      <span class="flecha" :class="{ 'flecha-rotate': isMenuOpen }"></span>
    </button>
    <ul v-if="isMenuOpen" :class="{ 'menuServicioOpen': isMenuOpen}" class="menuServicio">
      <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Seleccionar opción'
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isMenuOpen: false,
      selectedOption: null,
    };
  },
  watch: {
    value(newValue) {
      this.selectedOption = newValue;
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isMenuOpen = false;
      this.$emit('input', option);

      // Emitir un evento personalizado para notificar al formulario que se ha realizado una selección.
      this.$emit('option-selected', option);
    }
  }
};
</script>

<style>
.despegable-servicio {
  position: relative;
  font-size: small;
}

.despegable-servicio * {
  box-sizing: border-box;
}

.spanDefault {
  color: #000;
}

.spanSelected {
  color: #000;
}

.select {
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px #ccc solid;
  border-radius: 10px;
  padding: 8px 8px 8px 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.flecha {
  margin-left: 10px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #ccc;
  transition: 0.3s;
}

.flecha-rotate {
  transform: rotate(180deg);
}

.menuServicio {
  list-style: none;
  padding: 1px 2px;
  background: #fff;
  color: black;
  border: 1px #ccc solid;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: absolute;
  top: 3em;
  left: 50%;
  min-width: 100%;
  transform: translateX(-50%);
  opacity: 0;
  display: none;
  transition: 0.2s;
  z-index: 1;
}

.menuServicio li {
  padding: 0.7em 0.5em;
  margin: 0.3em 0;
  border-radius: 0.5em;
  cursor: pointer;
}

.menuServicioOpen li:hover {
  background: #DCDCDCDC;
}

.menuServicioOpen {
  display: block;
  opacity: 1;
}
</style>