import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { RequireAuth } from './contexts/AuthContext';
import App from './App';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import CatPage from './pages/CatPage';
import CatCreatePage from './pages/CatCreatePage';
import HomePage from './pages/HomePage';
import CatDetailPage from './pages/CatDetailPage';
import CatEditPage from './pages/CatEditPage';
import FavouritePage from './pages/FavouritePage';
import ChatRoomPage from './pages/ChatRoomPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/registration',
        element: <RegistrationPage />
      },
      {
        path: '/cat/',
        element: (
          <RequireAuth>
            <CatPage />
          </RequireAuth>
        )
      },
      {
        path: '/cat/create',
        element: (
          <RequireAuth>
            <CatCreatePage />
          </RequireAuth>
        )
      },
      {
        path: '/cat/edit/:id',
        element: (
          <RequireAuth>
            <CatEditPage />
          </RequireAuth>
        )
      },
      {
        path: '/cat/:id',
        element: (
          <RequireAuth>
            <CatDetailPage />
          </RequireAuth>
        )
      },
      {
        path: '/favourite',
        element: (
          <RequireAuth>
            <FavouritePage />
          </RequireAuth>
        )
      },
      {
        path: '/chatroom',
        element: (
          <RequireAuth>
            <ChatRoomPage />
          </RequireAuth>
        )
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
