import { createContext, useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Profile, UserLoginForm, UserRegisterForm } from '../models/User';

interface AuthContextType {
  profile: Profile | undefined;
  register: (registerInfo: UserRegisterForm) => Promise<string>;
  login: (loginInfo: UserLoginForm) => Promise<string>;
  logout: () => string;
  getProfile: (userID: string) => Promise<string>;
  getToken: () => string;
  getRole: () => string;
  getID: () => string;
  isLogin: () => boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  const register = async (registerInfo: UserRegisterForm) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerInfo)
      });

      if (!res.ok) {
        throw new Error('Register Error');
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

      console.log('Auth - register:', result.data);

      return 'Success';
    } catch (err: any) {
      console.log('Auth - register error:', err.message);
      return 'Fail';
    }
  };

  const login = async (loginInfo: UserLoginForm) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      if (!res.ok) {
        throw new Error('Login Error');
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

      localStorage.setItem('token', result.data.token);
      localStorage.setItem('userID', result.data.id);
      localStorage.setItem('userRole', result.data.role);

      console.log('Auth - login:', result.data);
      return 'Success';
    } catch (err: any) {
      console.log('Auth - login error:', err.message);
      return 'Fail';
    }
  };

  const logout = () => {
    localStorage.clear();
    console.log('Auth - Logout');
    return 'Success';
  };

  const getProfile = async (userID: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userID}`);

      if (!res.ok) {
        throw new Error('Get profile error');
      }

      const data = await res.json();

      const result = {
        data: data,
        status: res.status,
        statusText: res.statusText,
        headers: {
          'Content-Type': res.headers.get('Content-Type'),
          'Content-Length': res.headers.get('Content-Length')
        }
      };

      setProfile(result.data);

      return 'Success';
    } catch (err: any) {
      console.log('Auth - get profile error:', err.message);
      return 'Fail';
    }
  };

  const getToken = () => {
    return localStorage.getItem('token') || '';
  };

  const getID = () => {
    return localStorage.getItem('userID') || '';
  };

  const getRole = () => {
    return localStorage.getItem('userRole') || '';
  };

  const isLogin = () => {
    return localStorage.getItem('token') ? true : false;
  };

  return (
    <AuthContext.Provider value={{ profile, register, login, logout, getProfile, getToken, getID, getRole, isLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.isLogin()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
