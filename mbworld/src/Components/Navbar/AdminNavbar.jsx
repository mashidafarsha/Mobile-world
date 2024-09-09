import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../redux/features/adminSlice";
function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(setAdminDetails({}));
    navigate("/admin/adminLogin");
  };
  
  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">DEMO</h1>
        <div className="flex items-center">
          <Link to="/admin" className="text-white text-lg mr-4">
            Home
          </Link>

          <div className="relative">
            <Link to="/admin/order" className="text-white text-lg mr-4">
              Order
            </Link>
            <Link to="/admin/products" className="text-white text-lg mr-4">
              Products
            </Link>
          </div>

          <a
            onClick={handleLogout}
            className="text-white text-xl ml-2 cursor-pointer"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
export default AdminNavbar;
