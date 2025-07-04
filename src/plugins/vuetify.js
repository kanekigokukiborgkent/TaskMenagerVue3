/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';

const theme = localStorage.getItem('userTheme') || 'light';

const myLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
  },
  customStyles: {
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 10px !important',
  },
};
const myDarkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#484444',
  },
  customStyles: {
    boxShadow: 'rgba(98, 176, 39, 0.6) 2px 4px 8px !important',
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: theme,
    themes: {
      light: myLightTheme,
      dark: myDarkTheme,
    },
  },
});
