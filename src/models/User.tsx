export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  organization?: string;
  staffID?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
  token?: string;
  isLogin: boolean;
}

export interface UserRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  organization?: string;
  staffID?: string;
  signupCode?: string;
}

export interface UserLoginForm {
  email: string;
  password: string;
}
