/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { VueDraggableNext } from 'vue-draggable-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { MotionPlugin } from '@vueuse/motion';

// Components
import App from './App.vue';

import GlobalComponents from '@/reusables/components/globalComponents';

// Composables
import { createApp } from 'vue';

//Fonts
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

const app = createApp(App);

registerPlugins(app);

app.use(VueSweetalert2);
app.use(VueDraggableNext);
app.use(GlobalComponents);
app.use(MotionPlugin);

app.mount('#app');
