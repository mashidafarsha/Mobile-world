import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../Services/AdminApi";
import { EditProducts } from "./EditProducts";
import { BaseUrl } from "../BaseUrls/constance";
import DeleteConfirmation from "./DeleteConfirmation";
function Tables() {
  const [products, setProducts] = useState([]);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      let { data } = await getProducts();
      if (data) {
        setProducts(data.products);
      }
    } catch {}
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleClose = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDelete = async (proId) => {
    console.log("delete", proId);

    try {
      let { data } = await deleteProduct(proId);
      console.log(data);
      if (data.success) {
        console.log("ffff");

        getAllProducts();
      } else {
        alert("The department was not deleted.");
      }
    } catch {}

    setShowDeleteConfirmation(false);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  const handleEditClose = () => {
    setShowEditForm(false);
    setSelectedProduct(null);
  };

  const handleSave = async (product) => {
    console.log("qqqqq");
    try {
      let { data } = await updateProduct(product);
      if (data.success) {
        getAllProducts();
      } else {
        alert("The product was not updated.");
      }
    } catch {}
    setShowEditForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/admin/addProducts">
        <button
          type="button"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
        >
          Add Product
        </button>
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-2">Name</th>
              <th className="w-1/4 px-4 py-2">Email</th>
              <th className="w-1/4 px-4 py-2">Phone</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((pro, index) => {
                return (
                  <tr key={index} className="text-center">
                    <td className="border px-4 py-2">{pro.productName}</td>
                    <td className="border px-4 py-2">{pro.price}</td>
                    <td className="border px-4 py-2">{pro.description}</td>
                    <td>
                      <img
                        className="h-20 w-28"
                        src={`${BaseUrl}/${pro.image}`}
                        alt=""
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex flex-col items-center space-y-2">
                        <button
                          onClick={() => handleEditClick(pro)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDeleteClick}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Delete
                        </button>
                        
                        <DeleteConfirmation
                          show={showDeleteConfirmation}
                          onClose={handleClose}
                          onDelete={() => handleDelete(pro._id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {showEditForm && selectedProduct && (
        <EditProducts
          product={selectedProduct}
          onSave={handleSave}
          onCancel={handleEditClose}
        />
      )}
    </div>
  );
}
export default Tables;
