import adminAxiosInstance from "../Axios/AdminAxios";

const authAdmin = () => {
  return adminAxiosInstance("AdminToken").get("/auth");
};

const adminLogin = (values) => {
  return adminAxiosInstance().post("/adminLogin", { ...values });
};

const AddProduct = (formData) => {
  return adminAxiosInstance("AdminToken").post("/addProduct", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const getProducts = () => {
  return adminAxiosInstance("AdminToken").get("/getProducts");
};

const deleteProduct = (proId) => {
  return adminAxiosInstance("AdminToken").put(`/delProducts/${proId}`);
};

const updateProduct = (product) => {
  return adminAxiosInstance("AdminToken").post("/editProducts", { ...product });
};

const getOrders = () => {
  return adminAxiosInstance("AdminToken").get("/getAllOrder");
};
const updateStatus = (data) => {
  return adminAxiosInstance("AdminToken").put("/updateStatus", data);
};

export {
  authAdmin,
  adminLogin,
  AddProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getOrders,
  updateStatus,
};
