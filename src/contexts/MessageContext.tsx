import { createContext, useContext, useState } from 'react';
import { Message, MessageCreateForm } from '../models/Message';

interface MessageContextType {
  selectedMessage: Message;
  listMessage: () => Promise<Message[]>;
  getMessage: (messageID: string) => Promise<Message>;
  createMessage: (messageInfo: MessageCreateForm) => Promise<string>;
  updateMessage: (messageInfo: Message) => Promise<string>;
  deleteMessage: (messageInfo: Message) => Promise<string>;
}

export const MessageContext = createContext<MessageContextType>(null!);

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const listMessage = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/message`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (!res.ok) {
        throw new Error('List Message Error');
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
      console.log('List Message error:', err.message);
      return [];
    }
  };

  const getMessage = async (messageID: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/message/${messageID}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (!res.ok) {
        throw new Error('Get Message Error');
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
      console.log('Get Message error:', err.message);
      return null;
    }
  };

  const createMessage = async (messageInfo: MessageCreateForm) => {
    console.log(messageInfo);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/message`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(messageInfo)
      });

      if (!res.ok) {
        throw new Error('Create Message Error');
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

      console.log('Create Message:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create Message error:', err.message);
      return 'Fail';
    }
  };

  const updateMessage = async (messageInfo: Message) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/message/${messageInfo.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(messageInfo)
      });

      if (!res.ok) {
        throw new Error('Create Message Error');
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

      console.log('Create Message:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create Message error:', err.message);
      return 'Fail';
    }
  };

  const deleteMessage = async (messageInfo: Message) => {
    messageInfo.status == '0' ? (messageInfo.status = '1') : (messageInfo.status = '0');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/message/${messageInfo.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(messageInfo)
      });

      if (!res.ok) {
        throw new Error('Delete Message Error');
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

      console.log('Delete Message:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Delete Message error:', err.message);
      return 'Fail';
    }
  };

  return (
    <MessageContext.Provider
      value={{
        selectedMessage,
        listMessage,
        getMessage,
        createMessage,
        updateMessage,
        deleteMessage
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  return useContext(MessageContext);
};
