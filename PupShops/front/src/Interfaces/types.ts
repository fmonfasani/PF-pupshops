export interface ILoginProps {
  email: string;
  password: string;
}

export interface ILoginError {
  email?: string;
  password?: string;
}

export interface IRegisterProps {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

export type IRegisterError = Partial<IRegisterProps>;

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
