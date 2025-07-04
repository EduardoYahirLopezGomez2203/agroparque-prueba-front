import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from "./routes/AppRouter";
import reportWebVitals from './reportWebVitals';
import AppStyle from './AppStyle';
import { CssBaseline, ThemeProvider } from '@mui/material';
import '@fontsource/raleway' // Fuente principal


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <CssBaseline /> {/* Normaliza los estilos */}
    <ThemeProvider theme={ AppStyle }>
        <AppRouter/>
    </ThemeProvider>
  </>
);

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
