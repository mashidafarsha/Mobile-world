import React, { useEffect } from "react";
import { getProducts } from "../Services/UserApi";
import { BaseUrl } from "../BaseUrls/constance";
import { useState } from "react";
import "flowbite/dist/flowbite.css";
import { Card } from "flowbite-react";

import { useNavigate } from "react-router-dom";
export function Cards() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      let { data } = await getProducts();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (product) => {
    navigate(`/product/${product._id}`);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center mt-10">No products available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products &&
        products.map((pro, index) => (
          <Card key={index} className="max-w-sm mx-auto flex flex-col h-full">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={`${BaseUrl}/${pro.image}`}
              alt="Meaningful alt text for an image that is not purely decorative"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {pro.productName}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 mt-2 flex-grow">
                {pro.description}
              </p>
              <button
                onClick={() => handleClick(pro)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded self-start"
              >
                Add to Cart
              </button>
            </div>
          </Card>
        ))}
    </div>
  );
}
