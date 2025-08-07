<template>
  <div class="table-wrapper">
    <table class="dashboard-table">
      <thead>
        <tr>
          <th>Sensor</th>
          <th>Valor</th>
          <th>Unidad</th>
          <th>Fecha</th>
          <th>Hora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ item.sensorName }}</td>
          <td>{{ item.value }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ formatDate(item.timestamp) }}</td>
          <td>{{ formatTime(item.timestamp) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  }
})

function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleDateString()
}

function formatTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}
</script>

<style scoped lang="scss">
.table-wrapper {
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  padding: 1rem 1.5rem;
  overflow-x: auto;
  box-sizing: border-box;
}

.dashboard-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', Roboto, sans-serif;
  min-width: 600px;

  th {
    text-align: left;
    padding: 1rem 0.75rem;
    background-color: #e8f1fb;
    color: #084c89;
    font-size: 0.95rem;
    font-weight: 600;
    border-bottom: 2px solid #d0e2f5;
  }

  td {
    padding: 0.9rem 0.75rem;
    font-size: 0.9rem;
    color: #2c3e50;
    border-bottom: 1px solid #eef3f9;
  }

  tr:hover {
    background-color: #f0f8ff;
    transition: background-color 0.2s ease;
  }
}
</style>
