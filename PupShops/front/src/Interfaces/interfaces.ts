export interface ILoginUser {
    email: string;
    password:string;
}

export interface IUserRegister {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirmpassword: string;
    country: string;
    city: string;
    address: string;
    phone: string;
  }

export interface IButtonProps {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    disabled?:boolean;
}

