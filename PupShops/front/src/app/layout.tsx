
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import { UserProvider as UserProviderContext } from "@/context/userContext";
import NavbarContainer from "@/components/Navbar/NavbarContainer";
import { CartProvider } from "@/context/cartContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Chatbot from "../components/ChatBot/chatbot"; 

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {

  title: "Pups PetShop",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <UserProviderContext>
            <CartProvider>
              <NavbarContainer />
              {children}
              <Footer />
              <Chatbot />
            </CartProvider>
          </UserProviderContext>
        </UserProvider>
      </body>
    </html>
  );
}
