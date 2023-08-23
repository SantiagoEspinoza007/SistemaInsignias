<template>
  <div class="despegable-servicio">
    <button class="select" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
      <span>{{ selectedOption || placeholder }}</span>
      <span class="flecha" :class="{ 'flecha-rotate': isMenuOpen }"></span>
    </button>
    <ul v-if="isMenuOpen" class="menu-servicio">
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
    }
  },
  data() {
    return {
      isMenuOpen: false,
      selectedOption: null
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isMenuOpen = false;
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

.select {
  color: #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px #ccc solid;
  border-radius: 10px;
  padding: 8px 14px 8px 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.flecha {
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

.menu-servicio {
  list-style: none;
  padding: 1px 2px;
  background: #fff;
  color: #ccc;
  border: 1px #ccc solid;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: absolute;
  top: 3em;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  opacity: 0;
  display: none;
  transition: 0.2s;
  z-index: 1;
}

.menu-servicio li {
  padding: 0.7em 0.5em;
  margin: 0.3em 0;
  border-radius: 0.5em;
  cursor: pointer;
}

.menu-servicio li:hover {
  background: #b8b8b8;
}

.active {
  background: #ccc;
}

.menu-servicio-open {
  display: block;
  opacity: 1;
}
</style>