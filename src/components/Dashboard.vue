<template>
  <div>
    <h1>🌡️ Dashboard de Sensores</h1>
    <p><strong>Temperatura:</strong> {{ data?.temperatura }} °C</p>
    <p><strong>Humedad:</strong> {{ data?.humedad }} %</p>
  </div>
</template>

<script setup>
import { useDatabaseObject } from 'vuefire';
import { db } from '../firebase';
import { ref as dbRef } from 'firebase/database';

const data = useDatabaseObject(dbRef(db, 'realtime_sensors'));
</script>
