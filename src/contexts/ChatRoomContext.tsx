import { createContext, useContext, useState } from 'react';
import { ChatRoom, ChatRoomCreateForm } from '../models/ChatRoom';

interface ChatRoomContextType {
  selectedChatRoom: ChatRoom;
  listChatRoom: () => Promise<ChatRoom[]>;
  getChatRoom: (chatRoomID: string) => Promise<ChatRoom>;
  createChatRoom: (chatRoomInfo: ChatRoomCreateForm) => Promise<string>;
  updateChatRoom: (chatRoomInfo: ChatRoom) => Promise<string>;
  deleteChatRoom: (chatRoomInfo: ChatRoom) => Promise<string>;
}

export const ChatRoomContext = createContext<ChatRoomContextType>(null!);

export const ChatRoomProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedChatRoom, setSelectedChatRoom] = useState<any>(null);

  const listChatRoom = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chatroom`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (!res.ok) {
        throw new Error('List ChatRoom Error');
      }

      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        },
        length: res.headers.get('Content-Length'),
        data: data
        // data: data.filter((x: any) => x['user']['id'] == localStorage.getItem('userID'))
      };
      return result.data;
    } catch (err: any) {
      console.log('List ChatRoom error:', err.message);
      return [];
    }
  };

  const getChatRoom = async (chatRoomID: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chatroom/${chatRoomID}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (!res.ok) {
        throw new Error('Get ChatRoom Error');
      }

      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        },
        length: res.headers.get('Content-Length'),
        data: data
      };

      return result.data;
    } catch (err: any) {
      console.log('Get ChatRoom error:', err.message);
      return null;
    }
  };

  const createChatRoom = async (chatRoomInfo: ChatRoomCreateForm) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chatroom`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(chatRoomInfo)
      });

      if (!res.ok) {
        throw new Error('Create ChatRoom Error');
      }

      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        },
        data: data
      };

      console.log('Create ChatRoom:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create ChatRoom error:', err.message);
      return 'Fail';
    }
  };

  const updateChatRoom = async (chatRoomInfo: ChatRoom) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chatroom/${chatRoomInfo.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(chatRoomInfo)
      });

      if (!res.ok) {
        throw new Error('Create ChatRoom Error');
      }

      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        },
        data: data
      };

      console.log('Create ChatRoom:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create ChatRoom error:', err.message);
      return 'Fail';
    }
  };

  const deleteChatRoom = async (chatRoomInfo: ChatRoom) => {
    chatRoomInfo.status == '0' ? (chatRoomInfo.status = '1') : (chatRoomInfo.status = '0');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chatroom/${chatRoomInfo.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(chatRoomInfo)
      });

      if (!res.ok) {
        throw new Error('Delete ChatRoom Error');
      }

      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        },
        data: data
      };

      console.log('Delete ChatRoom:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Delete ChatRoom error:', err.message);
      return 'Fail';
    }
  };

  return (
    <ChatRoomContext.Provider
      value={{
        selectedChatRoom,
        listChatRoom,
        getChatRoom,
        createChatRoom,
        updateChatRoom,
        deleteChatRoom
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  );
};

export const useChatRoom = () => {
  return useContext(ChatRoomContext);
};
