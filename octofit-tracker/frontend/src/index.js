import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const resolveApiBaseUrl = () => {
  const host = window.location.hostname;

  if (host.includes('github.dev')) {
    return '/api';
  }

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  if (host.includes('-3000.')) {
    return `https://${host.replace('-3000.', '-8000.')}/api`;
  }

  return 'http://localhost:8000/api';
};

console.log('[App] Backend REST API base URL:', resolveApiBaseUrl());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
