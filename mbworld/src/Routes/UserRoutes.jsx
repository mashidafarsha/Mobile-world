import React from "react";
import UserLayout from "../loyout/UserLayout";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import UserSignup from "../Pages/UserSignup";
import { Home } from "../Pages/Home";
import { ProductPage } from "../Pages/ProductPage";
import OrderPlaced from "../Pages/OrderPlaced";
import YourOrder from "../Pages/YourOrder";
import { ProductCart } from "../Pages/ProductCart";
import PrivateRoutes from "../protectedRoutes/PrivateRoutes";
function UserRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"user"} route={"/"} />}>
        <Route element={<UserLayout />}>
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<ProductCart />} />
          <Route path="/orderPlace" element={<OrderPlaced />} />
          <Route path="/orders" element={<YourOrder />} />
        </Route>
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<UserSignup />} />
    </Routes>
  );
}

export default UserRoutes;
