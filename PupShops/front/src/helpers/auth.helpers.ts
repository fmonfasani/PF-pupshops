import { ILoginProps, IRegisterProps } from "../Interfaces/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;
export async function register(userData: IRegisterProps) {
  try {
    const res = await fetch(${APIURL}/users/register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    if (res.ok) {
      return res.json();
    } else {
      throw Error("Failed to register email already exists");
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function login(userData: ILoginProps) {
  try {
    const res = await fetch(${APIURL}/auth/signin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    if (res.ok) {
      return res.json();
    } else {
      throw Error("Failed to Login");
    }
  } catch (error: any) {
    throw new Error(error);
  }
}