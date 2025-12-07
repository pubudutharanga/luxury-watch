import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import './styles/components.css';

// Remove loading screen once app is loaded
const loadingElement = document.createElement('div');
loadingElement.className = 'app-loading';
loadingElement.innerHTML = '<div class="loading-spinner"></div>';
document.body.appendChild(loadingElement);

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove loading screen
setTimeout(() => {
  loadingElement.style.opacity = '0';
  setTimeout(() => {
    document.body.removeChild(loadingElement);
  }, 300);
}, 500);