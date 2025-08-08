<template>
  <div class="screen-container">
    <div class="header-container screen-container-background">
      <div class="header-text">
        <h2>Check your performance</h2>
        <p>Your data, your advantage.</p>
      </div>
      <div class="header-button">
        <DButton v-model="switchView" />
      </div>
    </div>
    <div class="dashboard-container screen-container-background">
      <div class="column-1">
        <DTable :data="combinedData" :switchView="true" />
      </div>
      <div class="column-2">
        <div class="column-2-summary">
          <h3 class="graph-title">Conductivity</h3>
          <DGraph title="Conductivity (S/m)" :options="chartOptions" :series="conductivitySeries" />
        </div>
        <div class="plant-container">
          <DPlant></DPlant>
        </div>
        <div class="column-2-plant">
          <h3 class="graph-title">Temperature</h3>
          <DGraph title="Temperature (°C)" :options="chartOptions" :series="temperatureSeries" />
        </div>
        <div class="column-2-graphs">
          <h3 class="graph-title">Humidity</h3>
          <DGraph title="Humidity (gr/m³)" :options="chartOptions" :series="humiditySeries" />
        </div>
      </div>
      <div class="column-3">
        <DCard sensorName="Last distance with the plant" :value="realtimeData['distancia']" unit="cm"
          :timestamp="timestamp" class="card" />
        <DCard sensorName="Dirt Conductivity" :value="realtimeData['conductividad']" unit="v" :timestamp="timestamp" />
        <DCard sensorName="Ambience humidity" :value="realtimeData['humedad']" unit="gr/m³" :timestamp="timestamp" />
        <DCard sensorName="Ambience temperature" :value="realtimeData['temperatura']" unit="°C"
          :timestamp="timestamp" />
      </div>
    </div>
  </div>
</template>

<script setup>
import DCard from './components/DCard.vue';
import DPlant from './components/DPlant.vue';
import DTable from './components/DTable.vue';
import DGraph from './components/DGraph.vue';
import DButton from './components/DButton.vue';

import { useDatabaseObject } from 'vuefire';
import { db } from './firebase';
import { ref as dbRef, set as dbSet } from 'firebase/database';
import { ref as vueRef, watch as vueWatch, computed as computedVue } from 'vue'

const realtimeData = useDatabaseObject(dbRef(db, 'realtime_sensors'));
const historicalData = useDatabaseObject(dbRef(db, 'historical_sensors'));
const switchViewData = useDatabaseObject(dbRef(db, 'control/ultrasonic_led'));
const combinedData = vueRef({});

const conductivityData = vueRef([]);
const temperatureData = vueRef([]);
const humidityData = vueRef([]);

const conductivitySeries = vueRef([]);
const temperatureSeries = vueRef([]);
const humiditySeries = vueRef([]);

const switchView = vueRef(false);
const timestamp = vueRef(null);

vueWatch(switchView, (newValue) => {
  dbSet(dbRef(db, 'control/ultrasonic_led'), newValue);
}, { immediate: true });

const chartOptions = computedVue(() => ({
  chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
  colors: ['#8ED081'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  tooltip: {
    x: { format: 'dd MMM - HH:mm' },
    y: { formatter: (val) => val.toFixed(2) },
    theme: 'dark',
    offsetY: -50,
  },
  xaxis: { type: 'datetime', labels: { show: false } },
  yaxis: { labels: { show: false } },
  grid: { show: false }
}));

const filterHistoricalData = (data, clave) => {
  return Object.values(data)
    .filter(entry => entry && entry[clave] !== undefined && entry.fecha_hora)
    .map(entry => ({
      fecha_hora: entry.fecha_hora,
      valor: entry[clave]
    }));
}

vueWatch(realtimeData, (newData) => {
  timestamp.value = new Date().toLocaleTimeString()
});

vueWatch(switchViewData, (newValue) => {
  if (newValue != undefined) {
    switchView.value = newValue['$value']
  }
}, { immediate: true });

vueWatch(historicalData, (newData) => {
  if (newData && typeof newData === 'object') {
    const conductivity = filterHistoricalData(newData, 'conductividad');
    const temperature = filterHistoricalData(newData, 'temperatura');
    const humidity = filterHistoricalData(newData, 'humedad');

    conductivityData.value = conductivity;
    temperatureData.value = temperature;
    humidityData.value = humidity;

    const combinedMap = {};

    const mergeByFecha = (arr, key) => {
      arr.forEach(({ fecha_hora, valor }) => {
        if (!combinedMap[fecha_hora]) {
          combinedMap[fecha_hora] = {};
        }
        combinedMap[fecha_hora][key] = valor;
      });
    };

    mergeByFecha(conductivity, 'conductividad');
    mergeByFecha(temperature, 'temperatura');
    mergeByFecha(humidity, 'humedad');

    const combinedArray = Object.entries(combinedMap).map(([fecha_hora, data]) => ({
      fecha_hora,
      ...data,
    }));

    combinedArray.reverse();

    combinedData.value = combinedArray;

    conductivitySeries.value = [
      {
        name: 'Conductividad',
        data: conductivity.map(item => ({
          x: item.fecha_hora,
          y: item.valor
        }))
      }
    ];

    temperatureSeries.value = [
      {
        name: 'Temperatura',
        data: temperature.map(item => ({
          x: item.fecha_hora,
          y: item.valor
        }))
      }
    ];

    humiditySeries.value = [
      {
        name: 'Humedad',
        data: humidity.map(item => ({
          x: item.fecha_hora,
          y: item.valor
        }))
      }
    ];
  }
}, { immediate: true });

</script>

<style>
.screen-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f7f3e9 0%, #e8dcc6 100%);
}

.screen-container-background {}

.header-container {
  display: flex;
  align-items: end;
  justify-content: space-between;
  flex: 0 0 auto;
  padding: 0rem 1rem;
  gap: 0.5rem;
  border-bottom: #e0e0e0 solid 1px;

  >h1 {
    font-weight: 600;
    line-height: 0;
    color: #B57F50;
    font-family: 'Segoe UI', Roboto, sans-serif;
    margin: 0;
  }
}

.header-text {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
}

.header-button {
  display: inline-block;
  transform: scale(0.5);
  transform-origin: center right;
  align-self: end;
}

.dashboard-container {
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
}

.column-1,
.column-2,
.column-3 {
  height: 100%;
  padding: 1rem;
}

.column-1 {
  width: 45%;
}

.column-2 {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #999 transparent;
}

.column-2::-webkit-scrollbar,
.column-3::-webkit-scrollbar {
  width: 6px;
}

.column-2::-webkit-scrollbar-track,
.column-3::-webkit-scrollbar-track {
  background: transparent;
}

.column-2::-webkit-scrollbar-thumb,
.column-3::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 4px;
  border: none;
}

.column-2::-webkit-scrollbar-button,
.column-3::-webkit-scrollbar-button {
  display: none;
}

.column-2-summary {
  flex: 0 0 33.3%;
  overflow: hidden;
  padding: 0rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  background: #B57F50;
  box-shadow: 0 8px 30px rgba(0, 51, 102, 0.15),
    0 4px 15px rgba(0, 51, 102, 0.1);
}

.column-2-plant {
  flex: 0 0 33.3%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  overflow: hidden;
  padding: 0rem 0.5rem;
  background: #B57F50;
  box-shadow: 0 8px 30px rgba(0, 51, 102, 0.15),
    0 4px 15px rgba(0, 51, 102, 0.1);
}

.column-2-graphs {
  flex: 0 0 33.3%;
  overflow: hidden;
  padding: 0rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  background: #B57F50;
  box-shadow: 0 8px 30px rgba(0, 51, 102, 0.15),
    0 4px 15px rgba(0, 51, 102, 0.1);
}

.column-3 {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #999 transparent;
  flex-shrink: 1;
}

.apexcharts-tooltip {
  transform-origin: bottom center !important;
  transform: translateY(-100%) !important;
  /* desplaza tooltip hacia arriba */
}

.graph-title {
  color: white;
  margin-left: 1rem;
}

.card {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ground-class {
  background: linear-gradient(#795738, #5b3c11);
  width: 100%;
  height: 10%;
}

.plant-dashboard-container {
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 100%;
}

.plant-layout {
  display: flex;
}

.plant-info {
  display: flex;
  padding: 0rem 2rem;
}

.plant-container {
  min-height: 250px;
}

@media (max-width: 768px) {
  .screen-container {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  .screen-container::-webkit-scrollbar {
    width: 6px;
  }

  .screen-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .screen-container::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 4px;
    border: none;
  }

  .screen-container::-webkit-scrollbar-button {
    display: none;
  }

  .dashboard-container {
    all: unset;
    display: flex;
    flex-direction: column;
  }

  .column-1,
  .column-2,
  .column-3 {
    height: 300px;
    /* Alto fijo para que el scroll horizontal sea visible */
    width: 100%;
    display: flex;
    flex-direction: row;
    /* Items en fila dentro de cada columna */
    overflow-x: auto;
    /* Scroll horizontal */
    overflow-y: hidden;
    /* No scroll vertical */
    gap: 1rem;
    padding: 1rem 0;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .column-1>*,
  .column-2>*,
  .column-3>* {
    flex: 0 0 auto;
    /* Items no se expanden, para scroll correcto */
    scroll-snap-align: start;
  }
}
</style>
