import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCartDetails,
  getProductDetails,
  upadateQuantity,
  submitCartData,
} from "../Services/UserApi";
import MessageBox from "./MessageBox";
export function Cart() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); 
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id);
    }
    getCartProduct();
  }, [user]);

  const getCartProduct = async () => {
    try {
      const { data } = await getCartDetails();
      console.log("Cart details from backend:", data);

      const totalprice = Number(data.product.totalprice);
      console.log("Total price from backend:", totalprice);
      setTotalAmount(totalprice);

      const productsWithDetails = await Promise.all(
        data.product.products.map(async (pro) => {
          const productDetails = await getProductDetails(pro.item);
          return {
            ...pro,
            name: productDetails.data.product.productName,
            unitPrice: productDetails.data.product.price,
          };
        })
      );

      setProducts(productsWithDetails);
    } catch (error) {
      console.error("Error fetching cart details", error);
    }
  };

  const calculateTotalPrice = (updatedProducts) => {
    const total = updatedProducts.reduce(
      (acc, product) => acc + product.unitPrice * product.quantity,
      0
    );
    console.log("Calculated total price:", total);
    setTotalAmount(total);
  };

  const handleQuantityChange = async (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = value;
    updatedProducts[index].price = updatedProducts[index].unitPrice * value;
    setProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);

    try {
      const { data } = await upadateQuantity(updatedProducts[index]._id, value);
      console.log("Update quantity response:", data);

      const updatedTotalAmount = Number(data.cart.totalprice);
      console.log("Updated total price from backend:", updatedTotalAmount);
      setTotalAmount(updatedTotalAmount);
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const incrementQuantity = (index) => {
    handleQuantityChange(index, products[index].quantity + 1);
  };

  const decrementQuantity = (index) => {
    if (products[index].quantity > 1) {
      handleQuantityChange(index, products[index].quantity - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await submitCartData({ products, totalAmount });
      console.log("Cart data submitted successfully:", data);
      if (data.success) {
        navigate("/orderPlace");
      }
      setMessage("Order placed successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Error submitting cart data", error);
      setMessage("Failed to place the order. Please try again.");
      setMessageType("error");
    }
  };

  const handleCloseMessage = () => {
    setMessage(null);
  };

  return (
    <div className="container mx-auto p-4">
      {message && (
        <MessageBox
          message={message}
          type={messageType}
          onClose={handleCloseMessage}
        />
      )}
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      {products.length > 0 ? (
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/4 p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Product</th>
                    <th className="py-2 px-4 border">Price</th>
                    <th className="py-2 px-4 border">Quantity</th>
                    <th className="py-2 px-4 border">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((pro, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border">{pro.name}</td>
                      <td className="py-2 px-4 border">
                        {pro.unitPrice.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => decrementQuantity(index)}
                            className="px-2 bg-gray-300"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={pro.quantity}
                            readOnly
                            className="w-16 p-1 border mx-2 text-center"
                          />
                          <button
                            onClick={() => incrementQuantity(index)}
                            className="px-2 bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-4 border">
                        {(pro.unitPrice * pro.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="Coupon code"
                className="p-2 border w-full sm:w-1/2 mb-2 sm:mb-0"
              />
              <button className="p-2 bg-gray-800 text-white w-full sm:w-auto sm:ml-2">
                Apply Coupon
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/4 p-4 mt-4 lg:mt-0">
            <div className="bg-white p-4 border">
              <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span>
                  {typeof totalAmount === "number"
                    ? totalAmount.toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <button
                className="w-full p-2 bg-blue-500 text-white"
                onClick={handleSubmit}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p className="text-xl">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}
