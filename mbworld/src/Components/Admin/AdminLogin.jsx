import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../Services/AdminApi";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../redux/features/adminSlice";
function AdminLogin() {

  const dispatch=useDispatch()
    const navigate=useNavigate()
    const [values, setValues] = useState({
       
        email: "",
        password: "",
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let { data } = await adminLogin(values);
          console.log(data,"result");
          if (data.success) {
            localStorage.setItem("AdminToken", data.token);
            dispatch(
              setAdminDetails(
                {admin:data.admin}
              )
            );
            navigate("/admin");
          } else {
            console.log(data);
          }
        } catch (err) {
          console.log(err);
        }
      };
    
  return (
    <>
      <main className="flex flex-1 items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl mb-4">ADMIN Login/Register to your account</h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet consectetur. Sapien ut libero sed lacinia
            egestas placerat ut sagittis.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="email"
              placeholder="Email ID"
              className="p-2 mb-4 border border-gray-300 rounded"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 mb-4 border border-gray-300 rounded"
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
export default AdminLogin;