<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>
  
<script>
import { Bar } from "vue-chartjs";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "CharInsignias",
  extends: Bar,
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [],
      },

      chartOptions: {
        responsive: true,
        plugins: {
          title: {
            fontSize: 25,
            display: true,
            text: "Insignias obtenidas por servicio en últimos 4 meses",
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              usePointStyle: true,
            },
          },
        },
        scales: {
          y: {
            ticks: {
              display: false,
            },
          },
        },
      },
      dataLoaded: false,
    };
  },

  async mounted() {
    const ctx = document.getElementById("myChart");

    const myChart = new ChartJS(ctx, {
      type: "bar",
      data: this.chartData,
      options: this.chartOptions,
      backgroundColor: this.backgroundColor,
      borderColor: this.backgroundColor,
    });

    console.log("ANTES DEL FECHING");
    console.log(this.chartData);
    await this.fetchData();

    myChart.update();
    //  this.renderChart(this.chartData, this.chartOptions);
    console.log(this.chartData);
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "http://backend-clipp-production-2fcb.up.railway.app/api/consultas/insignias"
        );
        console.log(response.data)
        const data = response.data;
        console.log(data);

        const randomColor = () => {
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          return `rgb(${r}, ${g}, ${b})`;
        };

        this.chartData.labels = data.map((item) => item.mes);
        console.log(this.chartData.labels)
        data.forEach((item) => {
          const dataset = {
            label: 'Ktaxi', // Por ejemplo, "Forma de pago"
            data: [Number(item.cantidad_obtenida)], // Convirtiendo el valor numérico en un array
            backgroundColor: randomColor(),
            fill: false,

            borderWidth: 1,
          };

          this.chartData.datasets.push(dataset);
        });
        this.dataLoaded = true; // Indicar que los datos se han cargado
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
  