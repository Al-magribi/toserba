import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Components/Login";
import ProductDetail from "./Pages/Product";
import ConfirmationPage from "./Pages/User/Confirmation";
import Cart from "./Pages/User/Cart";
import Profile from "./Pages/User/Profile/Profile";
import Transaction from "./Pages/User/Transaction";
import AdminDashboard from "./Pages/Admin/Dashboard";
import Users from "./Pages/Admin/Users";
import Products from "./Pages/Admin/Products";
import Orders from "./Pages/Admin/Orders";
import Report from "./Pages/Admin/Report";
import SignUp from "./Pages/Components/signUp";
import Forgot from "./Pages/Components/Forgot";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/user/userAction";
import { toast, ToastContainer } from "react-toastify";
import { RESET_STORE } from "./redux/user/userConst";
import Reset from "./Pages/Components/Reset";
import Success_page from "./Pages/Components/Success_page";
import AdminSetting from "./Pages/Admin/Setting/AdminSetting";
import { getStoreData } from "./redux/Store/Store_action";

function App() {
  const dispatch = useDispatch();

  const { logout, user } = useSelector((state) => state.user);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, [token]);

  useEffect(() => {
    if (logout) {
      toast.success(user);

      dispatch({ type: RESET_STORE });
    }
  });

  useEffect(() => {
    dispatch(getStoreData());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/daftar" element={<SignUp />} />

        <Route path="/lupa-password" element={<Forgot />} />

        <Route path="/reset/:token" element={<Reset />} />

        <Route path="/produk/:name" element={<ProductDetail />} />

        <Route path="/status-payment" element={<Success_page />} />

        {/* USER */}
        <Route path="/profile" element={<Profile />} />

        <Route path="/konfirmasi-pembayaran" element={<ConfirmationPage />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<Transaction />} />

        {/* ADMIN */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/admin-users" element={<Users />} />

        <Route path="/admin-products" element={<Products />} />

        <Route path="/admin-orders" element={<Orders />} />

        <Route path="/admin-report" element={<Report />} />

        <Route path="/admin-settings" element={<AdminSetting />} />
      </Routes>

      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
