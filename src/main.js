import { createApp } from 'vue';
import App from './App.vue';
import './style.css'

import { VueFire, VueFireDatabaseOptionsAPI } from 'vuefire';
import { firebaseApp, db } from './firebase';
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App);
app.component('apexchart', VueApexCharts);

app
  .use(VueFire, {
    VueApexCharts,
    firebaseApp,
    modules: [VueFireDatabaseOptionsAPI({ database: db })],
  })
  .mount('#app');
