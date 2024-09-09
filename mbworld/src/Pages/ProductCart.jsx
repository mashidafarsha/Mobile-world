import React from "react";
import UserNavbar from "../Components/Navbar/UserNavbar";
import { Cart } from "../Components/Cart";
import Footer from "../Components/Footer";



export function ProductCart() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full">
        <UserNavbar />
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Cart />
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
   
 
  );
}
