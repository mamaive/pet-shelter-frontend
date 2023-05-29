import { createContext, useContext, useState } from 'react';
import { Cat, CatCreateForm } from '../models/Cat';

interface CatContextType {
  selectedCat: Cat;
  listCat: () => Promise<Cat[]>;
  getCat: (catID: string) => Promise<Cat>;
  createCat: (catInfo: CatCreateForm) => Promise<string>;
  updateCat: (catInfo: Cat) => Promise<string>;
  deleteCat: (catInfo: Cat) => Promise<string>;
  uploadCat: (file: Blob) => Promise<string>;
}

export const CatContext = createContext<CatContextType>(null!);

export const CatProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCat, setSelectedCat] = useState<any>(null);

  const listCat = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cats`);

      if (!res.ok) {
        throw new Error('List Cat Error');
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
      console.log('List Cat error:', err.message);
      return [];
    }
  };

  const getCat = async (catID: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cats/${catID}`);

      if (!res.ok) {
        throw new Error('Get Cat Error');
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
      console.log('Get Cat error:', err.message);
      return null;
    }
  };

  const createCat = async (catInfo: CatCreateForm) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cats`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(catInfo)
      });

      if (!res.ok) {
        throw new Error('Create Cat Error');
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

      console.log('Create Cat:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create Cat error:', err.message);
      return 'Fail';
    }
  };

  const updateCat = async (catInfo: Cat) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cats/${catInfo.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(catInfo)
      });

      if (!res.ok) {
        throw new Error('Create Cat Error');
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

      console.log('Create Cat:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create Cat error:', err.message);
      return 'Fail';
    }
  };

  const deleteCat = async (catInfo: Cat) => {
    catInfo.status = '0';
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cats/${catInfo.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(catInfo)
      });

      if (!res.ok) {
        throw new Error('Delete Cat Error');
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

      console.log('Delete Cat:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Delete Cat error:', err.message);
      return 'Fail';
    }
  };

  const uploadCat = async (file: Blob) => {
    try {
      const formData = new FormData();

      formData.append('image', file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload-cat`, {
        method: 'post',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Create Cat Error');
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

      console.log('Upload Cat:', result.data.filename);
      return result.data.filename;
    } catch (err: any) {
      console.log('Upload Cat error:', err.message);
      return 'Fail';
    }
  };

  return (
    <CatContext.Provider value={{ selectedCat, listCat, getCat, createCat, updateCat, deleteCat, uploadCat }}>
      {children}
    </CatContext.Provider>
  );
};

export const useCat = () => {
  return useContext(CatContext);
};
