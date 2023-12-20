import { Box, getCircularProgressUtilityClass } from "@mui/material";
import Navbar from "../Components/Navbar";
import Title from "../../Title";
import Footer from "../Components/Footer";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../../redux/product/productAction";
import { getOrders } from "../../../redux/order/order_action";
import Admin_protection from "../../../Protection/Admin";

const AdminDashboard = () => {
  Admin_protection();

  const dispatch = useDispatch();

  const name = "";

  useEffect(() => {
    dispatch(getProducts(name));

    dispatch(getOrders());
  }, [dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Title title={"Admin Dashboard"} />
      <Navbar />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: { xs: 900, md: 685 },
          top: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* Dashboard */}
        <Box sx={{ width: "95%", mt: 2, mb: 2 }}>
          <Dashboard />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
