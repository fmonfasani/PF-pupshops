export interface IUser {
  id: number; // ID del usuario
  name: string;
  lastname: string;
  email: string;
  password?: string;
  country: string;
  city: string;
  address: string;
  phone: number;
  isAdmin: boolean;
}

export interface IUserResponse {
  login: boolean; // Asumiendo que esta propiedad también está en la interfaz
  user: {
    id: number; // Este campo debe estar presente
    name: string;
    lastname: string;
    email: string;
    country: string;
    city: string;
    address: string;
    phone: number; // Asegúrate de que sea 'number'
    isAdmin: boolean; // Asegúrate de que esto sea del tipo correcto
  };
  token: string; // Este también debe ser el tipo correcto
}

export interface IUserContextType {
  user: IUserResponse | null;
  setUser: React.Dispatch<React.SetStateAction<IUserResponse | null>>;
  isLogged: boolean;
  isAdmin: boolean;
  setIsAdmin: (isLogged: boolean) => void;
  setIsLogged: (isLogged: boolean) => void;
  signIn: (credentials: ILoginUser) => Promise<boolean>;
  signUp: (user: IUserRegister) => Promise<boolean>;
  logOut: () => void;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
  address: string;
  phone: number;
}

export interface IButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface IAppointment {
  id?: string;
  date: string;
  time: string;
}
