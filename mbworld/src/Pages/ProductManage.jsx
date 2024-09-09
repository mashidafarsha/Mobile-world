import React from "react";
import Tables from "../Components/Tables";
import AdminNavbar from "../Components/Navbar/AdminNavbar";
import Footer from "../Components/Footer";
export function ProductManage(){
    return(
        <div className="flex flex-col min-h-screen">
        <header className="w-full">
          <AdminNavbar/>
        </header>
  
        <main className="flex-grow container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <Tables />
        </main>
  
        <footer className="w-full">
        <Footer />
      </footer>
      </div>
    )
}