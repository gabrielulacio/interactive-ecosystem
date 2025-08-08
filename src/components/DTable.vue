<template>
  <transition name="table-fade" appear>
    <div v-if="switchView" class="table-wrapper">
      <table class="dashboard-table">
        <thead>
          <tr>
            <th>Fecha/hora</th>
            <th v-for="sensor in sensorKeys" :key="sensor">
              {{ capitalize(sensor) }}
            </th>
          </tr>
        </thead>

        <transition-group name="row-fade" tag="tbody">
          <tr
            v-for="(row, index) in processedRows"
            :key="row.fecha_hora"
            :style="{ animationDelay: (index * 100) + 'ms' }"
            class="row-fade-enter"
          >
            <td>{{ formatTime(row.fecha_hora) }}</td>
            <td v-for="sensor in sensorKeys" :key="sensor">
              {{ (row[sensor] !== undefined ? row[sensor] : '-') + ' ' + sensorUnits[sensor] }}
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  switchView: {
    type: Boolean,
    required: true
  }
})

const sensorUnits = {
  'humedad': 'gr/m³',
  'conductividad': 'v',
  'temperatura': '°C'
}

// Detectar todas las claves únicas de sensores
const sensorKeys = computed(() => {
  const allKeys = new Set()
  Object.values(props.data).forEach(entry => {
    Object.keys(entry).forEach(key => {
      if (key !== 'fecha_hora') allKeys.add(key)
    })
  })
  return Array.from(allKeys)
})

const processedRows = computed(() => {
  return Object.entries(props.data)
    .map(([fecha_hora, values]) => ({
      fecha_hora,
      ...values
    }))
    .sort((a, b) => new Date(a.fecha_hora) - new Date(b.fecha_hora))
})

function formatTime(timestamp) {
  const date = new Date(timestamp)
  return isNaN(date) ? timestamp : date.toLocaleString()
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>


<style scoped>
.table-wrapper {
  width: 100%;
  max-height: 100%;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  padding: 0.5rem 2.5rem 1rem 1.5rem;
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #999 transparent;
  box-sizing: border-box;
}

.table-wrapper::-webkit-scrollbar {
  width: 6px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 4px;
  border: none;
}

.table-wrapper::-webkit-scrollbar-button {
  display: none;
}

.dashboard-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.75rem;
  min-width: 600px;
}

.dashboard-table th {
  text-align: center;
  padding: 1rem 0.75rem;
  color: #4b543b;
  border-bottom: #e0e0e0 solid 1px;
  font-size: 0.95rem;
  font-weight: 500;
}

.dashboard-table td {
  background: #ffffff;
  padding: 0.9rem 0.75rem;
  font-size: 0.9rem;
  color: #2c3e50;
  text-align: center;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease;
}

.dashboard-table tr:hover td {
  background-color: #f0f8ff;
}

/* Animación global del contenedor */
.table-fade-enter-active {
  animation: fadeInTable 0.3s ease;
}
@keyframes fadeInTable {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animación para cada fila (en cascada) */
.row-fade-enter {
  opacity: 0;
  transform: translateY(20px);
  animation: rowFadeIn 0.4s ease forwards;
}

@keyframes rowFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
