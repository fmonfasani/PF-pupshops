export interface ILoginProps {
  email: string;
  password: string;
}

export interface ILoginError {
  email?: string;
  password?: string;
}
export interface IRegisterError {
  name?: string;
  email?: string;
  password?: string;
}
export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
}

export interface IUserSession {
  token: string;
  user: {
    id: string;
    email: string;
    address?: string;
    phone?: string;
    name: string;
    role: string;
    lastname: string;
    orders: [];
  };
}
