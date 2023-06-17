import { createContext, useContext, useState } from 'react';
import { Favourite, FavouriteCreateForm } from '../models/Favourite';

interface FavouriteContextType {
  selectedFavourite: Favourite;
  listFavourite: () => Promise<Favourite[]>;
  getFavourite: (favouriteID: string) => Promise<Favourite>;
  createFavourite: (favouriteInfo: FavouriteCreateForm) => Promise<string>;
  updateFavourite: (favouriteInfo: Favourite) => Promise<string>;
  deleteFavourite: (favouriteInfo: Favourite) => Promise<string>;
}

export const FavouriteContext = createContext<FavouriteContextType>(null!);

export const FavouriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedFavourite, setSelectedFavourite] = useState<any>(null);

  const listFavourite = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favourite`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (!res.ok) {
        throw new Error('List Favourite Error');
      }

      const data = await res.json();

      const result = {
        status: res.status + '-' + res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        },
        length: res.headers.get('Content-Length'),
        data: data.filter((x: any) => x['user']['id'] == localStorage.getItem('userID'))
      };

      return result.data;
    } catch (err: any) {
      console.log('List Favourite error:', err.message);
      return [];
    }
  };

  const getFavourite = async (favouriteID: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favourite/${favouriteID}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (!res.ok) {
        throw new Error('Get Favourite Error');
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
      console.log('Get Favourite error:', err.message);
      return null;
    }
  };

  const createFavourite = async (favouriteInfo: FavouriteCreateForm) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favourite`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(favouriteInfo)
      });

      if (!res.ok) {
        throw new Error('Create Favourite Error');
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

      console.log('Create Favourite:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create Favourite error:', err.message);
      return 'Fail';
    }
  };

  const updateFavourite = async (favouriteInfo: Favourite) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favourite/${favouriteInfo.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(favouriteInfo)
      });

      if (!res.ok) {
        throw new Error('Create Favourite Error');
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

      console.log('Create Favourite:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Create Favourite error:', err.message);
      return 'Fail';
    }
  };

  const deleteFavourite = async (favouriteInfo: Favourite) => {
    favouriteInfo.status == '0' ? (favouriteInfo.status = '1') : (favouriteInfo.status = '0');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favourite/${favouriteInfo.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(favouriteInfo)
      });

      if (!res.ok) {
        throw new Error('Delete Favourite Error');
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

      console.log('Delete Favourite:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Delete Favourite error:', err.message);
      return 'Fail';
    }
  };

  return (
    <FavouriteContext.Provider
      value={{
        selectedFavourite,
        listFavourite,
        getFavourite,
        createFavourite,
        updateFavourite,
        deleteFavourite
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => {
  return useContext(FavouriteContext);
};
