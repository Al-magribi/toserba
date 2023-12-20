import { Box } from "@mui/material";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Confirmation from "./Confirmation";
import Title from "../../Title";
import User_protection from "../../../Protection/User";

const ConfirmationPage = () => {
  User_protection();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        position: "relative",
      }}
    >
      <Title title="Konfirmasi Pembayaran" />
      <Navbar />

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
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: { xs: "100vh", md: 610 },
          }}
        >
          <Confirmation />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default ConfirmationPage;
