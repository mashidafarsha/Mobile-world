import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../Services/UserApi";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/features/userSlice";
import { Toast } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await userLogin(values);

      if (data.errors) {
        if (data.errors.email) {
          setMessage(data.errors.email);
          setShowAlert(!showAlert);
        } else if (data.errors.password) {
          setMessage(data.errors.password);
          setShowAlert(!showAlert);
        }
      } else {
        localStorage.setItem("userToken", data.token);
        dispatch(setUserDetails({ user: data.user }));
        navigate("/");
      }
    } catch (err) {
      console.log(err);

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
          <h2 className="text-2xl mb-4">Login to your DEMO account</h2>
          <p className="text-gray-600 mb-6">
            "Welcome back! Sign in to access the best deals on the latest mobile
            phones and accessories. Stay updated on new arrivals and exclusive
            offers."
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
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          <p className="mt-7">
            you don't already account?<Link to="/signup">Register</Link>
          </p>
        </div>
      </main>
    </>
  );
}
export default Form;
