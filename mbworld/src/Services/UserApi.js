import userAxiosInstance from "../Axios/UserAxios";

const authUser = () => {
  return userAxiosInstance("userToken").get("/auth");
};

const userSignup = (values) => {
  return userAxiosInstance().post("/signup", { ...values });
};

const userLogin = (values) => {
  return userAxiosInstance().post("/login", { ...values });
};

const getProducts = () => {
  return userAxiosInstance("userToken").get("/getProduct");
};

const getProductById = (proId) => {
  return userAxiosInstance().get(`/getProductById/${proId}`);
};

const addToCart = (cartDetails) => {
  console.log(cartDetails, "cart");

  return userAxiosInstance().post("/addTocart", cartDetails);
};

const getCartDetails = () => {
  return userAxiosInstance("userToken").get("/getCartPro");
};
const getProductDetails = (proId) => {
  return userAxiosInstance("userToken").get(`/getProDetails/${proId}`);
};
const upadateQuantity = (itemId, value) => {
  return userAxiosInstance("userToken").post(`/updateQuantity/${itemId}`, {
    value,
  });
};
const submitCartData = (data) => {
  return userAxiosInstance("userToken").post("/checkout", { ...data });
};
const getOrders = () => {
  return userAxiosInstance("userToken").get("/getMyOrder");
};

export {
  authUser,
  userSignup,
  userLogin,
  getProducts,
  getProductById,
  addToCart,
  getCartDetails,
  getProductDetails,
  upadateQuantity,
  submitCartData,
  getOrders,
};
