import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from '@/styles/GlobalStyle';
import { router } from '@/routes';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
