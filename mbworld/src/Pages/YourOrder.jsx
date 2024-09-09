import React from "react";
import Orders from "../Components/Orders";
import UserNavbar from "../Components/Navbar/UserNavbar";
import Footer from "../Components/Footer";
function YourOrder(){
    return(
        <div className="flex flex-col min-h-screen">
      <header className="w-full">
        <UserNavbar />
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Orders/>
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
    )
}

export default YourOrder