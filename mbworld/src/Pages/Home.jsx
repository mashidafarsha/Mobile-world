
import React from "react";
import { Corousal } from "../Components/Corousal";
import UserNavbar from "../Components/Navbar/UserNavbar";
import { Cards } from "../Components/Cards";
import Footer from "../Components/Footer";
import { Brands } from "../Components/Brands";
export function Home() {
    return (
      <>
      <UserNavbar/>
      <Corousal/>
      <section className="p-4">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
      <Cards/>

      </section>
      <section className="p-4">
        <h2 className="text-2xl font-bold mb-4">Top Brands</h2>
        <Brands />
      </section>
      <Footer/>

      </>
    );
  }