import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import {SectionContextValue} from './context/context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SectionContextValue>
    <Router>
      <AuthProvider>
          <App />
      </AuthProvider>
    </Router>
    </SectionContextValue>
  </React.StrictMode>
);


