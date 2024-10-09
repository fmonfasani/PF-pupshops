export interface IUser {
  id: number; 
  name: string;
  lastname: string;
  email: string;
  password?: string;
  country: string;
  city: string;
  address: string;
  phone: number;
  isAdmin: boolean;
  isActive: boolean;
}


export interface IAdminRegisterUser extends IUserRegister {
  isAdmin: boolean;
  isActive?: boolean; 

}

export interface ILoginResponse {
  success: boolean;
  token: string;
  findUser: IUser | null;
}

export interface IUserResponse {
  id?:string;
  succes: boolean; 
  user: IUser | null;
  token: string; 
}

export interface IUserContextType {
  user: IUserResponse | null;
  setUser: React.Dispatch<React.SetStateAction<IUserResponse | null>>;
  isLogged: boolean;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsLogged: (isLogged: boolean) => void;
  signIn: (credentials: ILoginUser) => Promise<boolean>;
  signUp: (user: IUserRegister) => Promise<boolean>;
  signUpRegister: (user: IUserRegister) => Promise<boolean>;
  logOut: () => void;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
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
  isActive?: boolean; 
}

export interface IButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface IButtonPropsDelete {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface DeleteUserButtonProps {
  userId: string;
  onDeleteSuccess: () => void; 
}

export interface ILoginClientProps {
  setToken: (token: string | null) => void;
 
}

export interface IAppointment {
  id?: string; 
  appointmentDate: string; 
  appointmentTime: string; 
  serviceName: string; 
  isDeleted?:boolean;
  userId?: string;
  status?: string; 
}

export interface IUserUpdateData {
  name: string;
  lastname: string;
  email: string;
  password?: string; // Cambiar a opcional
  confirmPassword?: string; // Cambiar a opcional
  country: string;
  city: string;
  address: string;
  phone: number;
  isActive?: boolean; 
}
