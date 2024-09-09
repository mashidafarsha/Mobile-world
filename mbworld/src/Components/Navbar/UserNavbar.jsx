import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { getCartDetails } from "../../Services/UserApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/features/userSlice";

function UserNavbar() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [count,setCount]=useState("")
 
  let {user} = useSelector((state) => state.user);

  
  useEffect(() => {

    if (user && user.email) {
      
      getCount();
    } 
  }, [user]);


  const getCount=async()=>{
    let {data}=await getCartDetails()
    setCount(data.count)
    
  }


  const handleLogout = () => {
    localStorage.removeItem("userToken");
    dispatch(setUserDetails({}));
    navigate("/login");
  };

 

  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">DEMO</h1>
        <div className="flex items-center">
          <Link to="/" className="text-white text-lg mr-4">
            Home
          </Link>
          {user ? (
              <div className="relative">
                  <Link to="/orders" className="text-white text-lg ">
            Order
          </Link>
              <a
                className="text-white text-lg ml-4"
               
              >
                <Link to="/cart" className="text-white text-lg mr-4">
                <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          
              </a>
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
               {count}
              </span>
            </div>
          ) : (
           ""
          )}
        
        
          {user ? (
            <a
              onClick={handleLogout}
              className="text-white text-xl ml-2 cursor-pointer"
            >
              Logout
            </a>
          ) : (
            <Link to="/login" className="text-white text-xl ml-2">
              Login
            </Link>
          )}
   
        </div>
      </div>
    </div>
  );
}

export default UserNavbar;
