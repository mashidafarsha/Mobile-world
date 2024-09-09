import React from "react";
import AdminNavbar from "../Components/Navbar/AdminNavbar";

export const AdminHome = () => {

  return (
    <div>
      <AdminNavbar/>
<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800">Hello Admin</h1>
        <p className="mt-4 text-gray-600">Welcome to the admin dashboard.</p>
      </div>
    </div>
   
    </div>
   
    
  );
};
