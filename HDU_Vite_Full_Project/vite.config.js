import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define:{
    'process.env.VITE_KEY': JSON.stringify(process.env.VITE_KEY),
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    'process.env.VITE_AUTH_URL': JSON.stringify(process.env.VITE_AUTH_URL),
    'process.env.VITE_SOCKET_URL': JSON.stringify(process.env.VITE_SOCKET_URL),
    'process.env.VITE_ANALYTICS_ID': JSON.stringify(process.env.VITE_ANALYTICS_ID),
    'process.env.VITE_ANALYTICS_ENABLED': JSON.stringify(process.env.VITE_ANALYTICS_ENABLED),
    'process.env.VITE_TELEMEDICINE_ENABLED': JSON.stringify(process.env.VITE_TELEMEDICINE_ENABLED),
    'process.env.VITE_EHR_ENABLED': JSON.stringify(process.env.VITE_EHR_ENABLED),
    'process.env.VITE_APPOINTMENTS_ENABLED': JSON.stringify(process.env.VITE_APPOINTMENTS_ENABLED),
    'process.env.VITE_PATIENT_ID': JSON.stringify(process.env.VITE_PATIENT_ID),
    'process.env.VITE_ROOM_ID': JSON.stringify(process.env.VITE_ROOM_ID),
  },
  server: { port: 5173 },
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'src/main.jsx',
        dashboard: 'src/pages/DashboardDoctor.jsx',
        login: 'src/pages/Login.jsx',
        register: 'src/pages/Register.jsx',
        settings: 'src/pages/Settings.jsx',
        appointments: 'src/pages/Appointments.jsx',
        telemedicine: 'src/pages/Telemedicine.jsx',
        ehr: 'src/pages/EHR.jsx',
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'socket.io-client',
      'redux',
      'react-redux',
      'redux-thunk',
      'react-query',
      'react-toastify',
      'react-helmet',
      'react-router',
      'react-icons',
      'react-datepicker',
      'react-select',
      'react-dropzone',
      'react-hook-form',
      'react-querybuilder',
      'react-json-view',
      'react-chartjs-2',
      'chart.js',
      'moment',
      'lodash',
      'dayjs',
      'uuid',
      'classnames',
      'formik',
      'yup',
      'react-i18next',
      'i18next',
      'i18next-browser-languagedetector',
      'i18next-http-backend',
      'react-lottie',
      'lottie-web',
      'react-router-config',
      'react-helmet-async',
      'react-virtualized',
      'react-window',
      'react-dnd',
      'react-dnd-html5-backend',
      'react-beautiful-dnd',
      'react-grid-layout',
      'react-table',
      'react-bootstrap',
      'bootstrap',
      'reactstrap',
      'reactstrap-select',
      'reactstrap-validation',
    ]
  }
});
