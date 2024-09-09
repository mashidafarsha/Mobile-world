import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userSignup } from "../../Services/UserApi";
import { useNavigate } from "react-router-dom";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
function Signup() {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await userSignup(values);
      if (data.success) {
        navigate("/login");
      } else {
        console.log(data.error);
      }
    } catch (err) {
      setMessage(err.response.data.message);
      setShowAlert(!showAlert);
    }
  };

  return (
    <>
      <main className="flex flex-1 items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 shadow-lg max-w-md w-full text-center">
          {showAlert && message && (
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <HiX className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">{message}</div>
              <Toast.Toggle />
            </Toast>
          )}
          <h2 className="text-2xl mb-4">Register to your DEMO account</h2>
          <p className="text-gray-600 mb-6">
            "Join us today! Create an account to explore a wide selection of
            smartphones and accessories. Enjoy personalized recommendations and
            seamless shopping."
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="Name"
              className="p-2 mb-4 border border-gray-300 rounded"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
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
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Register
            </button>
          </form>

          <p className="mt-7">
            you have already register?<Link to="/login">Login</Link>
          </p>
        </div>
      </main>
    </>
  );
}
export default Signup;
