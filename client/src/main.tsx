import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

import App from './App.tsx';
import Search from './pages/Search.tsx';
import TryIt from './pages/TryIt.tsx';
import Favorites from './pages/Favorites.tsx';
import Instructions from './pages/Instructions.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Search />
      },
      {
        path: '/try-it',
        element: <TryIt />
      },
      {
        path: '/favorites',
        element: <Favorites />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/instructions/:recipeId',
        element: <Instructions />
      },
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};
