import React from "react";
import UserNavbar from "../Components/Navbar/UserNavbar";
import OrderSuccess from "../Components/OrderSuccess";
import Footer from "../Components/Footer";
function orderPlaced(){
    return(
<div className="flex flex-col min-h-screen">
<header className="w-full">
        <UserNavbar />
      </header>
      <main className="flex-grow container mx-auto p-4">
    <OrderSuccess/>
    </main>
    <footer className="w-full">
        <Footer />
      </footer>
</div>
    )
}

export default orderPlaced