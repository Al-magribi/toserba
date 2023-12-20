import { Box } from "@mui/material";
import Cards from "./Cards";
import OrdersData from "./OrdersData";

const Dashboard = () => {
  return (
    <Box
      sx={{
        width: { xs: "92%", md: "97.8%" },
        p: 2,
      }}
    >
      {/* CARD */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          borderRadius: "10px",
          boxShadow: 4,
        }}
      >
        <Cards />
      </Box>

      {/* Pesanan */}
      <Box
        sx={{
          width: { xs: "90%", md: "97.8%" },
          mt: 2,
          borderRadius: "10px",
          boxShadow: 4,
          p: 2,
        }}
      >
        <OrdersData />
      </Box>
    </Box>
  );
};

export default Dashboard;
