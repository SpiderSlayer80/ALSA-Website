// ENTRY POINT — this is the first file that runs.
// It mounts the whole app into the <div id="root"> in → index.html
// Global styles are loaded here → src/styles/global.css
// The entire page lives inside → src/App.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css'; // → src/styles/global.css  (fonts, colours, base CSS)
import App from './App.jsx';  // → src/App.jsx            (root component, assembles all sections)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
