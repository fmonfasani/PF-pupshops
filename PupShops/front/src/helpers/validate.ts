import { IUserRegister } from "@/Interfaces/interfaces";
import {
  ILoginError,
  ILoginProps,
} from "../Interfaces/types";

export function validateLoginForm(values: ILoginProps) {
  let errors:{email?: string; password?:string} = {};
    let formIsValid = true;

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return { formIsValid, errors };
}

export function validateRegisterForm(values: IUserRegister) {
  let errors: { name?: string; email?: string; password?: string; address?: string; phone?: string } = {};

  if (!values.name) {
    errors.name = "Full name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (!values.password) {
    errors.password = "Confirm password is required";
  } else if (values.password !== values.password) {
    errors.password = "Passwords do not match";
  }

  return errors;
}
