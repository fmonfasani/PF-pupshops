"use client"
import {UserContext } from "@/context/userContext";
import NavbarAdminComponent from "./NavbarAdmin";
import Navbar from "./Navbar";
import { useContext } from "react";


const NavbarContainer = () => {
  const { user,isAdmin } = useContext(UserContext);
     
  
    return isAdmin ? <NavbarAdminComponent /> : <Navbar />; 
  };
  
  export default NavbarContainer;