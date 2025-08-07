<!-- <template>
  <div class="chart-wrapper">
    <LineChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup>
import { LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 🔧 Agrupar por sensorName
const groupedData = {}
props.data.forEach(entry => {
  if (!groupedData[entry.sensorName]) {
    groupedData[entry.sensorName] = []
  }
  groupedData[entry.sensorName].push({
    timestamp: entry.timestamp,
    value: entry.value
  })
})

// 📅 Usamos las etiquetas de tiempo de un sensor como eje X
const sampleSensor = Object.values(groupedData)[0]
const labels = sampleSensor.map(point => {
  return new Date(point.timestamp).toLocaleTimeString('es-VE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
})

// 🎨 Paleta de colores simple
const colors = [
  '#1E88E5', '#43A047', '#FB8C00', '#8E24AA',
  '#00ACC1', '#F4511E', '#3949AB', '#6D4C41'
]

// 📊 Construimos los datasets
const datasets = Object.entries(groupedData).map(([sensorName, values], index) => ({
  label: sensorName,
  data: values.map(point => point.value),
  borderColor: colors[index % colors.length],
  backgroundColor: colors[index % colors.length] + '33',
  fill: false,
  tension: 0.4,
  pointRadius: 2
}))

const chartData = {
  labels,
  datasets
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Histórico de Sensores'
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      title: {
        display: true,
        text: 'Valores'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Tiempo'
      }
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 500px;
}
</style> -->
