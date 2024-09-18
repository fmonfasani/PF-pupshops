export interface IUser {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    country: string;
    city: string;
    address: string;
    phone: number;
  //  orders?: IOrderResponse[];
}

export interface ILoginUser {
    email: string;
    password:string;
}

export interface ILoginClientProps {
    setToken: (token: string | null) => void;
  }


export interface IUserRegister {
    name: string;
    lastname: string;
    email: string;
    password: string;
    country: string;
    city: string;
    address: string;
    phone: number;
  }

export interface IButtonProps {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    disabled?:boolean;
}

export interface IUserResponse {
    login: boolean,
    user: IUser | null,
    token:string
}

export interface IUserContextType {
    user: IUserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<IUserResponse | null>>;
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    signIn: (credentials: ILoginUser) => Promise<boolean>;
    signUp: (user: IUserRegister) => Promise<boolean>;
 //   getOrders: () => Promise<void>;
   // setOrders: (orders: IOrderResponse[]) => void; 
   // orders: IOrderResponse[] | [];
  //  logOut: () => void;
}