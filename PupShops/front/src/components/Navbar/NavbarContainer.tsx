"use client"
import { useUserContext } from "@/context/userContext";
import NavbarAdminComponent from "./NavbarAdmin";
import Navbar from "./Navbar";


const NavbarContainer = () => {
    const { user } = useUserContext(); 
    const isAdmin = user?.user?.isAdmin || false; 
  
    return isAdmin ? <NavbarAdminComponent /> : <Navbar />; 
  };
  
  export default NavbarContainer;