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
  isActive: boolean; // Este debe ser booleano, no true
}

export interface IAdminRegisterUser extends IUserRegister {
  isAdmin: boolean;
  isActive?: boolean; // Asumimos que esto es true por defecto
}

export interface ILoginResponse {
  success: boolean;
  token: string;
  findUser: IUser | null; // Esto es correcto, ya que findUser puede ser nulo
}

export interface IUserResponse {
  succes: boolean; // Asegurando que esta propiedad también esté en la interfaz
  user: IUser | null; // Cambiado para ser IUser
  token: string; // Esto debe ser un string
}

export interface IUserContextType {
  user: IUserResponse | null; // Esto está bien si user puede ser nulo
  setUser: React.Dispatch<React.SetStateAction<IUserResponse | null>>;
  isLogged: boolean;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void; // Cambié el tipo a isAdmin
  setIsLogged: (isLogged: boolean) => void;
  signIn: (credentials: ILoginUser) => Promise<boolean>;
  signUp: (user: IUserRegister) => Promise<boolean>;
  signUpRegister: (user: IUserRegister) => Promise<boolean>;
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
  disabled?: boolean;
}

export interface ILoginClientProps {
  setToken: (token: string | null) => void;
}

export interface IAppointment {
  id?: string;
  date: string;
  time: string;
}
