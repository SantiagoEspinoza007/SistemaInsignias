import { createApp, ref, provide } from 'vue';

// Crear una referencia reactiva para el bus de eventos
const eventBus = ref(createApp({}));

// Proporcionar el bus de eventos en la aplicación principal
provide('eventBus', eventBus);

// Exportar la referencia reactiva del bus de eventos
export default eventBus;
