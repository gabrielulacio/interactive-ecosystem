<template>
  <div class="card">
    <div class="sensor-name">{{ sensorName }}</div>

    <div class="sensor-data">
      <span class="sensor-value">{{ value }}</span>
      <span class="sensor-unit">{{ unit }}</span>
    </div>

    <div class="sensor-timestamp">Last measurement: {{ timestamp }}</div>
  </div>
</template>

<script setup>
defineProps({
  sensorName: String,
  value: [String, Number],
  unit: String,
  timestamp: String
})
</script>

<style scoped>
.card {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: 'Segoe UI', Roboto, sans-serif;

  background: #b4d2ba;
  box-shadow: 0 4px 20px rgba(0, 51, 102, 0.1),
    0 2px 10px rgba(0, 51, 102, 0.06),
    inset 0 0 0 1px rgba(0, 51, 102, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 51, 102, 0.15),
    0 4px 15px rgba(0, 51, 102, 0.1);
}

.sensor-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
  margin-bottom: 1rem;
}

.sensor-data {
  font-size: 2.8rem;
  font-weight: 700;
  color: #4b543b;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.sensor-unit {
  font-size: 1.1rem;
  color: #4b543b;
}

.sensor-timestamp {
  font-size: 0.9rem;
  color: white;
  font-weight: 400;
}

@media (max-width: 768px) {
    .card {
        width: 350px;
    }
}
</style>
