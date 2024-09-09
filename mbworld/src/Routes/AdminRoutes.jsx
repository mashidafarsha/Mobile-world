import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../loyout/AdminLayout";
import AdminLogin from "../Components/Admin/AdminLogin";
import { AdminHome } from "../Pages/AdminHome";
import { ProductManage } from "../Pages/ProductManage";
import { AddProduct } from "../Pages/AddProduct";
import OrderDataAdmin from "../Pages/OrderDataAdmin";
import PrivateRoute from "../protectedRoutes/PrivateRoutes";
function AdminRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute role={"admin"} route={"/admin"} />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<AdminHome />} />
          <Route path="/products" element={<ProductManage />} />
          <Route path="/addProducts" element={<AddProduct />} />
          <Route path="/order" element={<OrderDataAdmin />} />
        </Route>
      </Route>
      <Route path="/adminLogin" element={<AdminLogin />} />
    </Routes>
  );
}

export default AdminRoutes;
