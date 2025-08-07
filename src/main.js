import { createApp } from 'vue';
import App from './App.vue';

import { VueFire, VueFireDatabaseOptionsAPI } from 'vuefire';
import { firebaseApp, db } from './firebase';

const app = createApp(App);

app
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireDatabaseOptionsAPI({ database: db })],
  })
  .mount('#app');
