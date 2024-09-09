import React from "react";
import { AddProducts } from "../Components/AddProducts";
import AdminNavbar from "../Components/Navbar/AdminNavbar";
import Footer from "../Components/Footer";
export function AddProduct(){
    return(
        <div className="flex flex-col min-h-screen">
        <header className="w-full">
          <AdminNavbar/>
        </header>
        <main className="flex-grow container mx-auto p-4">
        
        <AddProducts/>
        </main>
        <footer className="w-full">
        <Footer />
      </footer>

        </div>
    )
}