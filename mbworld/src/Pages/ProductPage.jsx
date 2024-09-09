import React from "react";
import UserNavbar from "../Components/Navbar/UserNavbar";
import { ProductDetals } from "../Components/ProductDetails";
// import { Specifications } from "../Components/Specifications"
import Footer from "../Components/Footer";
export function ProductPage(){
    return(
        <div className="flex flex-col min-h-screen">
        <header className="w-full">
          <UserNavbar />
        </header>
  
        <main className="flex-grow container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          < ProductDetals/>
        </main>
  
        <footer className="w-full">
        <Footer />
      </footer>
      </div>
    )
}