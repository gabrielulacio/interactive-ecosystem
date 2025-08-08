<template>
    <div class="screen-container">
        <div class="header-container">
            <h1>Good Morning</h1>
        </div>
        <div class="dashboard-container">
            <div class="column-1">
                <!-- <DTable :data="data" /> -->
                     {{ historicalData }}
            </div>
            <div class="column-2">
                <div class="column-2-summary">
                    <h2>Check your performance</h2>
                    <p>Your data, your advantage.</p>
                </div>
                <div class="column-2-plant">
                    <DPlant />
                </div>
                <div class="column-2-graphs">
                    <!-- <DChart :sensorHistory="data" /> -->
                </div>
            </div>
            <div class="column-3">
                <DCard sensorName="Distancia con la planta" :value="realtimeData['distancia']" unit="cm"
                    timestamp="10:45:32" />
                <DCard sensorName="Conductividad de la tierra" :value="realtimeData['conductividad']" unit="S/m"
                    timestamp="10:45:32" />
                <DCard sensorName="Humedad del ambiente" :value="realtimeData['humedad']" unit="gr/m³"
                    timestamp="10:45:32" />
                <DCard sensorName="Temperatura del Ambiente" :value="realtimeData['temperatura']" unit="°C"
                    timestamp="10:45:32" />
            </div>
        </div>
    </div>
</template>

<script setup>
import DCard from '../components/DCard.vue'

import { useDatabaseObject } from 'vuefire';
import { db } from '../firebase';
import { ref as dbRef } from 'firebase/database';
import { onMounted } from 'vue';

const realtimeData = useDatabaseObject(dbRef(db, 'realtime_sensors'));

onMounted(() => {
    console.log("DATA:")
    console.log(historicalData)
})
</script>

<style>
.screen-container {
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
}

.header-container {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #f0f6ff, #ffffff);
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 51, 102, 0.1),
        0 1px 4px rgba(0, 51, 102, 0.08);
    transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    >h1 {
        font-size: 1.75rem;
        font-weight: 600;
        line-height: 1.2;
        color: #084c89;
        font-family: 'Segoe UI', Roboto, sans-serif;
        margin: 0;
    }
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
    width: 50%;
}

.column-2 {
    width: 25%;
    display: flex;
    flex-direction: column;
}

.column-2-summary {
    flex: 0 0 20%;
    overflow: hidden;
}

.column-2-plant {
    flex: 0 0 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.column-2-graphs {
    flex: 0 0 40%;
    overflow: hidden;
}

.column-3 {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    overflow-y: auto;
    flex-shrink: 1;
}
</style>
