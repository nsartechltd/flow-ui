import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<ClipLoader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
