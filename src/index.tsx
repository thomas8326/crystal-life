import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'src/shared/auth-provider';
import App from './App';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  rootElement,
);
