import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  addProductReducer,
  createReviewReducer,
  detailProductReducer,
  getProductsReducer,
  upDelProductReducer,
  uploadFileReducer,
} from "./redux/product/productReducer";
import {
  changePasswordReducer,
  changeProfileReducer,
  deleteUserReducer,
  getUsersReducer,
  resetPasswordReducer,
  sendEmailReducer,
  userReducer,
} from "./redux/user/userReducer";
import {
  citiesReducer,
  couriersReducer,
  provincesReducer,
} from "./redux/shipping_cost/shippingReducer";
import {
  createPaymentReducer,
  getTokenReducer,
  updatePaymentReducer,
} from "./redux/payment/payment_reducer";
import {
  detailOrderReducer,
  getOrdersReducer,
  myOrderReducer,
  upDelOrderReducer,
} from "./redux/order/order_reducer";
import {
  addTocartReducer,
  delItemInCart,
  deleteCartReducer,
  getMyCartReducer,
} from "./redux/cart/cart_reducer";
import {
  getStoreReducer,
  updateStoreReducer,
} from "./redux/Store/Store_reducer";

const reducer = {
  store_data: getStoreReducer,
  update_store: updateStoreReducer,

  user: userReducer,
  users: getUsersReducer,
  delUser: deleteUserReducer,

  password: changePasswordReducer,
  profile: changeProfileReducer,

  email: sendEmailReducer,
  resetPassword: resetPasswordReducer,

  products: getProductsReducer,
  product: detailProductReducer,
  upDelProduct: upDelProductReducer,
  addProduct: addProductReducer,
  uploadFile: uploadFileReducer,

  provinces: provincesReducer,
  cities: citiesReducer,
  couriers: couriersReducer,

  token: getTokenReducer,
  new_payment: createPaymentReducer,
  upPayment: updatePaymentReducer,

  my_orders: myOrderReducer,
  detailOrder: detailOrderReducer,

  Orders: getOrdersReducer,
  upDelOrder: upDelOrderReducer,

  addCart: addTocartReducer,
  my_cart: getMyCartReducer,
  delItem: delItemInCart,
  delCart: deleteCartReducer,

  review: createReviewReducer,
};

const initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  initialState: initialState,
  middleware: middleware,
});

export default store;
