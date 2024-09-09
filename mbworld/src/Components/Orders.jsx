import React, { useState, useEffect } from "react";
import { getOrders } from "../Services/UserApi";

function Orders() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    try {
      let { data } = await getOrders();
      console.log(data);

      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {order.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-4">
          {order.map((order) => (
            <div
              key={order._id}
              className="border-b border-gray-200 py-4 flex justify-between items-center"
            >
              <div>
                {order.products.map((product) => (
                  <h2 className="font-semibold text-xl">
                    {product.item?.productName}
                  </h2>
                ))}

                <p className="text-sm text-gray-500">
                  Order Date: {new Date(order.order_date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{order.totalprice}</p>
                <p
                  className={`${
                    order?.deliverystatus === "Delivered"
                      ? "text-green-600"
                      : order?.deliverystatus === "Shipped"
                      ? "text-yellow-500"
                      : order?.deliverystatus === "Ordered"
                      ? "text-blue-500"
                      : "text-gray-500"
                  } font-semibold`}
                >
                  {order.deliverystatus}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No orders available</p>
      )}
    </div>
  );
}

export default Orders;
