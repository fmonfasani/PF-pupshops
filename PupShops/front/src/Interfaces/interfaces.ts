
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
  isActive: boolean; // Se puede agregar aquí si se quiere hacer opcional
}

export interface IAdminRegisterUser extends IUserRegister {
  isAdmin: boolean;
  isActive?: boolean; // Asumimos que esto es true por defecto
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
    isActive: true; // Esto también debe ser true por defecto al crear el usuario
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
  signUpRegister: (user: IUserRegister) => Promise<boolean>;
  //   getOrders: () => Promise<void>;
  // setOrders: (orders: IOrderResponse[]) => void;
  // orders: IOrderResponse[] | [];
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
  isActive?: boolean; // Esto indica que el usuario está activo por defecto
}

export interface IButtonProps {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    disabled?:boolean;
}


export interface ILoginClientProps {
  setToken: (token: string | null) => void;
}

export interface IAppointment {
  id?: string;
  date: string;
  time: string;
}