import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CatProvider } from './contexts/CatContext';
import { router } from './router';
import { FavouriteProvider } from './contexts/FavouriteContext';
import { ChatRoomProvider } from './contexts/ChatRoomContext';
import { MessageProvider } from './contexts/MessageContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ChatRoomProvider>
        <MessageProvider>
          <FavouriteProvider>
            <CatProvider>
              <RouterProvider router={router} />
            </CatProvider>
          </FavouriteProvider>
        </MessageProvider>
      </ChatRoomProvider>
    </AuthProvider>
  </React.StrictMode>
);
