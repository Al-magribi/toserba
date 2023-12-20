import { Box } from "@mui/material";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import DetailCart from "./DetailCart";
import Title from "../../Title";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProvinces } from "../../../redux/shipping_cost/shippingAction";
import User_protection from "../../../Protection/User";

const Cart = () => {
  User_protection();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProvinces());
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      <Title title="Keranjang Belanja" />
      <Navbar />

      {/* detail produk yang di dalam keranjang */}

      <Box
        sx={{
          position: "absolute",
          top: { xs: -80, md: 80 },
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            width: "80%",
            minHeight: "82vh",
            m: 1,
          }}
        >
          <DetailCart />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default Cart;
