
import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { authUser } from "../Services/UserApi";
import { useDispatch } from "react-redux";
import { authAdmin } from "../Services/AdminApi";
import { setUserDetails } from "../redux/features/userSlice";
import { setAdminDetails } from "../redux/features/adminSlice";

function PrivateRoute({ role, route }) {
  const [auth, setAuth] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "user") {
      authUser()
        .then((response) => {
          console.log("Login response:", response);
          if (response.data.status === false) {
            localStorage.removeItem("userToken");
            dispatch(setUserDetails({ user: null }));
            navigate("/login");
          } else {
            console.log("Setting user data:", response.data.userData);
            dispatch(setUserDetails({ user: response.data.userData }));
            setAuth(response.data?.status);
          }
        })
        .catch((error) => {
          console.log("Login error:", error);
          setAuth(false);
          navigate("/");
        });
    } else if (role === "admin") {
      authAdmin()
        .then((response) => {
          console.log(response);
          if (response.data.status === false) {
            localStorage.removeItem("adminToken");
            dispatch(setAdminDetails({}));
            navigate("/admin/adminLogin");
          } else {
            console.log(response.data.adminData, "response.data.adminData");
            dispatch(setAdminDetails({ admin: response.data.adminData }));
            setAuth(response.data?.status);
          }
        })
        .catch((error) => {
          console.log(error);
          setAuth(false);
          navigate("/admin/adminLogin");
        });
    }
  }, [role, dispatch, navigate]);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  return auth ? <Outlet /> : <Navigate to={route} />;
}

export default PrivateRoute;
