import React, { useEffect, useState } from "react";
import { getOrders, updateStatus } from "../Services/AdminApi";
import { Toast } from "flowbite-react";

import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState({});
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    console.log(statusUpdate, "statusUpdate");
  }, [statusUpdate]);

  const getAllOrders = async () => {
    try {
      let { data } = await getOrders();
      console.log(data);
      if (data.success) {
        setOrders(data.order);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  const handleStatusChange = (orderId, status) => {
    setStatusUpdate((prevState) => ({
      ...prevState,
      [orderId]: status,
    }));
  };

  const updateOrderStatus = async () => {
    try {
      const payload = { statuses: statusUpdate };
      let { data } = await updateStatus(payload);
      if (data.success) {
        setMessage(data.message);
        setShowAlert(!showAlert);
      }
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  return (
    <div>
      {showAlert && message && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
          <Toast.Toggle />
        </Toast>
      )}
      <div className="container mx-auto p-4">
        <h1>Manage Orders</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="w-1/4 px-4 py-2">Order ID</th>
                <th className="w-1/4 px-4 py-2">User</th>
                <th className="w-1/4 px-4 py-2">Products</th>
                <th className="w-1/4 px-4 py-2">Status</th>
                <th className="w-1/4 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">
                    {order.user?.name} ({order.user?.email})
                  </td>
                  <td className="border px-4 py-2">
                    {order.products.map((product) => (
                      <div key={product.item._id}>
                        {product.item.productName} - {product.quantity} x{" "}
                        {product.item.price}
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      value={statusUpdate[order._id] || order.deliverystatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value="Ordered">Ordered</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <button onClick={() => updateOrderStatus(order._id)}>
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrder;
