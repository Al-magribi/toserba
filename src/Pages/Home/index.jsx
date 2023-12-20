import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Box } from "@mui/material";
import Hero from "./Hero";
import ProductList from "./ProductList";
import Footer from "./Footer";
import Title from "../Title";

const Home = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Title title="TOSERBA -  SERBA ADA" />
      <Navbar />
      <Hero />
      <ProductList />
      <Footer />
    </Box>
  );
};

export default Home;
