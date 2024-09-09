import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById, addToCart } from "../Services/UserApi";
import { BaseUrl } from "../BaseUrls/constance";

export function ProductDetals() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id);
    }
  }, [user]);

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try{
      const { data } = await getProductById(productId);
      setProduct(data.product);
    }catch{

    }
    
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = async () => {
    try{
      if (!userId) {
        console.log("User not logged in");
        return;
      }
      const { data } = await addToCart({ userId, productId });
      if (data.success) {
        console.log("Product added to cart successfully");
        navigate("/cart");
      } else {
        console.log("Failed to add product to cart");
      }
    }catch{}
    
  };

  const images = Array(3).fill(product.image);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row p-4">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            src={`${BaseUrl}/${product.image}`}
            alt="Product"
            className="w-full h-56 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-md border border-gray-200"
          />

          <div className="flex overflow-x-auto mt-4 space-x-2">
            {images.map((url, index) => (
              <img
                key={index}
                src={`${BaseUrl}/${url}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold">{product.productName}</h2>
          <p className="text-xl text-red-500 mt-2"> ₹ {product.price}</p>

          <p className="mt-4">{product.description}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Colour:</h3>
            <div className="flex flex-wrap space-x-2 mt-2">
              <button className="w-8 h-8 rounded-full bg-gray-200 border-2 border-gray-300"></button>
              <button className="w-8 h-8 rounded-full bg-red-500 border-2 border-gray-300"></button>
              <button className="w-8 h-8 rounded-full bg-green-500 border-2 border-gray-300"></button>
              <button className="w-8 h-8 rounded-full bg-blue-500 border-2 border-gray-300"></button>
              <button className="w-8 h-8 rounded-full bg-black border-2 border-gray-300"></button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Internal Memory:</h3>
            <div className="flex flex-wrap space-x-2 mt-2">
              <button className="px-4 py-2 rounded border border-gray-300 mb-2">
                256 GB
              </button>
              <button className="px-4 py-2 rounded border border-gray-300 mb-2">
                512 GB
              </button>
              <button className="px-4 py-2 rounded border border-gray-300 mb-2">
                1 TB
              </button>
              <button className="px-4 py-2 rounded border border-gray-300 mb-2">
                128 GB
              </button>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-blue-500 text-white rounded w-full md:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
