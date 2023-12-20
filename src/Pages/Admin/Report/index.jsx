import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Title from "../../Title";
import Footer from "../Components/Footer";
import Reports from "./Reports";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrders } from "../../../redux/order/order_action";
import Admin_protection from "../../../Protection/Admin";

const Report = () => {
  Admin_protection();

  const dispatch = useDispatch();

  useEffect(() => {
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
      <Title title={"Admin Laporan"} />
      <Navbar />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          minHeight: { xs: 900, md: 690 },
          top: { xs: 80, md: 80 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* Dashboard */}
        <Box sx={{ width: "95%", minHeight: 650 }}>
          <Reports />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Report;
